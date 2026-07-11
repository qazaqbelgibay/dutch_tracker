#!/usr/bin/env python3
"""
Convert Anki .apkg exports (collection.anki21b, i.e. zstd-compressed SQLite)
into the tracker's bundled-deck JSON format (decks/*.json).

The cards' FSRS memory state (stability `s`, difficulty `d`, last review
`lrt` inside cards.data) is copied verbatim, so study progress made in Anki
carries over losslessly into the app's FSRS scheduler.

Requires: pip install zstandard
Usage:    python3 tools/apkg_to_json.py <freq_dict.apkg> <refold.apkg>
"""

import io
import json
import re
import sqlite3
import sys
import zipfile

import zstandard

DAY = 86400


def load_collection(path):
    z = zipfile.ZipFile(path)
    raw = bytearray(zstandard.ZstdDecompressor()
                    .stream_reader(io.BytesIO(z.read('collection.anki21b'))).read())
    # Patch header bytes 18/19 (file format version) from WAL to legacy
    # journal mode; sqlite3's in-memory deserialize cannot serve WAL files.
    raw[18] = raw[19] = 1
    conn = sqlite3.connect(':memory:')
    conn.deserialize(bytes(raw))
    return conn


def clean(v):
    """Python port of cleanAnkiField() in study.js — keep behavior identical."""
    v = v or ''
    v = re.sub(r'\[sound:[^\]]*\]', '', v, flags=re.I)
    v = re.sub(r'\{\{c\d+::(.*?)(?:::[^}]*)?\}\}', r'\1', v)
    v = re.sub(r'<br\s*/?>', '\n', v, flags=re.I)
    v = re.sub(r'</(div|p)>', '\n', v, flags=re.I)
    v = re.sub(r'<img[^>]*>', '', v, flags=re.I)
    v = re.sub(r'<[^>]+>', '', v)
    v = (v.replace('&nbsp;', ' ').replace('&amp;', '&')
          .replace('&lt;', '<').replace('&gt;', '>')
          .replace('&quot;', '"').replace('&#39;', "'"))
    v = re.sub(r'[ \t]+', ' ', v)
    v = re.sub(r'\n{2,}', '\n', v)
    return v.strip()


def convert_card(row, crt):
    """Map one Anki card row to the app's card schema (sans front/back/deck)."""
    ctype, queue, due, ivl, reps, lapses, data = row
    try:
        d = json.loads(data) if data else {}
    except ValueError:
        d = {}

    state = ctype if ctype in (0, 1, 2, 3) else 0
    if queue in (2, 3):
        due_ms = (crt + due * DAY) * 1000
    elif queue == 1:
        due_ms = due * 1000
    elif ctype == 0 or queue == 0:
        due_ms = 0          # installer replaces 0 with install time
    else:                   # suspended/buried: fall back to type semantics
        due_ms = (crt + due * DAY) * 1000 if ctype in (2, 3) else 0

    stability = round(float(d['s']), 4) if 's' in d else 0
    difficulty = min(10.0, max(1.0, round(float(d['d']), 3))) if 'd' in d else 0

    last_review = None
    if 'lrt' in d:
        last_review = int(d['lrt']) * 1000
    elif state in (2, 3) and ivl > 0:
        last_review = (crt + (due - ivl) * DAY) * 1000

    card = {'state': state, 'due': due_ms, 'stability': stability,
            'difficulty': difficulty, 'reps': reps, 'lapses': lapses,
            'lastReview': last_review}
    return card


def convert(path, deck_id, deck_name, deck_label, front_back):
    conn = load_collection(path)
    cur = conn.cursor()
    crt = cur.execute('SELECT crt FROM col').fetchone()[0]
    src_total = cur.execute('SELECT count(*) FROM cards').fetchone()[0]

    rows = cur.execute(
        'SELECT c.type, c.queue, c.due, c.ivl, c.reps, c.lapses, c.data, n.flds '
        'FROM cards c JOIN notes n ON c.nid = n.id').fetchall()

    cards = []
    for (ctype, queue, due, ivl, reps, lapses, data, flds) in rows:
        card = convert_card((ctype, queue, due, ivl, reps, lapses, data), crt)
        front, back = front_back(flds.split('\x1f'))
        if not front or not back:
            raise SystemExit(f'ABORT: empty front/back in {deck_id}: {flds[:80]!r}')
        card['front'] = front
        card['back'] = back
        # Sort key: studied cards first (stable), then new cards by Anki
        # position (cards.due for type 0) = frequency order.
        card['_pos'] = due if ctype == 0 else -1
        cards.append(card)
    conn.close()

    cards.sort(key=lambda c: c['_pos'])
    for c in cards:
        del c['_pos']

    states = {}
    for c in cards:
        states[c['state']] = states.get(c['state'], 0) + 1
    if len(cards) != src_total:
        raise SystemExit(f'ABORT: {deck_id} card count mismatch: {len(cards)} != {src_total}')

    out = {'id': deck_id, 'name': deck_name, 'deck': deck_label,
           'count': len(cards), 'cards': cards}
    dest = f'decks/{deck_id}.json'
    with open(dest, 'w', encoding='utf-8') as f:
        json.dump(out, f, ensure_ascii=False, separators=(',', ':'))
    print(f'{deck_id}: {len(cards)} cards -> {dest}')
    print(f'  per state (0=new 1=lrn 2=rev 3=relrn): {dict(sorted(states.items()))}')
    return out


def freq_front_back(f):
    # 0 Rank, 1 Word, 2 Part-of-Speech, 3 Definition, 4 Dutch, 5 English, 6 Freq, 7 Audio
    word, pos = clean(f[1]), clean(f[2])
    front = word + (f' ({pos})' if pos else '') + '\n' + clean(f[4])
    back = clean(f[3]) + '\n' + clean(f[5])
    return front.strip(), back.strip()


def refold_front_back(f):
    return clean(f[0]), clean(f[1])


if __name__ == '__main__':
    if len(sys.argv) != 3:
        raise SystemExit(__doc__)
    convert(sys.argv[1], 'nl_freq_dict', 'A Frequency Dictionary of Dutch',
            'Frequentie NL', freq_front_back)
    convert(sys.argv[2], 'nl_refold', 'Dutch Refold', 'Dutch Refold',
            refold_front_back)

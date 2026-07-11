/* ════════════════════════════════════════════════════════════
   Built-in grammar course — Dutch (Flemish) · A1 → C1
   Explanations in English, examples in Dutch with English gloss.
   Flemish (Belgian Dutch) usage notes are marked with 🦁.
   Quiz types: mc (multiple choice, a = index) ·
               fill (typed answer, a = accepted variants)
   ════════════════════════════════════════════════════════════ */

const GRAMMAR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'];

const GRAMMAR_COURSE = {
  fr: [],
  nl: [

/* ═══════════════════════ A1 ═══════════════════════ */
{ id: 'a1_01', level: 'A1', title: 'Word order: the verb comes second (V2)',
  read: [
    { h: 'The V2 rule', p: 'In a Dutch main clause the conjugated verb is always the SECOND element. The first position can hold the subject, a time word, a place — anything — but the verb never moves from slot two. If something other than the subject comes first, subject and verb swap places (inversion).',
      ex: [['Ik werk vandaag thuis.', 'I work at home today.'],
           ['Vandaag werk ik thuis.', 'Today I work at home.'],
           ['In Gent woont mijn zus.', 'My sister lives in Ghent.']] },
    { h: 'Everything else moves back', p: 'Other verb parts (infinitives, participles) go to the very end of the clause. This creates the typical Dutch "verbal bracket": conjugated verb second, the rest last.',
      ex: [['Ik ga morgen Nederlands studeren.', 'I am going to study Dutch tomorrow.'],
           ['Zij heeft gisteren gewerkt.', 'She worked yesterday.']] }
  ],
  quiz: [
    { t: 'mc', q: 'Pick the correct sentence:', o: ['Vandaag ik werk thuis.', 'Vandaag werk ik thuis.', 'Vandaag thuis werk ik.'], a: 1, why: 'After a fronted time word the verb stays second, so subject and verb invert: "Vandaag werk ik…".' },
    { t: 'fill', q: 'Morgen ___ wij naar Gent. (gaan)', a: ['gaan'], why: 'V2: the finite verb follows "Morgen" directly — "Morgen gaan wij…".' },
    { t: 'mc', q: 'Where does "gekocht" go? "Ik heb een boek ___ "', o: ['after "heb"', 'at the end of the sentence', 'before "Ik"'], a: 1, why: 'Participles go to the end: "Ik heb een boek gekocht."' },
    { t: 'fill', q: 'Rewrite starting with "Nu": "Ik begrijp het." → Nu ___ ik het.', a: ['begrijp'], why: 'Inversion after a fronted element: "Nu begrijp ik het."' }
  ] },

{ id: 'a1_02', level: 'A1', title: 'Pronouns + zijn & hebben',
  read: [
    { h: 'The two key verbs', p: 'Zijn (to be): ik ben, jij bent, hij/zij is, wij zijn, jullie zijn, zij zijn. Hebben (to have): ik heb, jij hebt, hij/zij heeft, wij hebben, jullie hebben, zij hebben. With jij AFTER the verb, the -t drops: "ben jij?", "heb jij?".',
      ex: [['Ik ben moe en ik heb honger.', 'I am tired and I am hungry.'],
           ['Heb jij een fiets? — Ja, ik heb er een.', 'Do you have a bike? — Yes, I have one.']] },
    { h: '🦁 Flemish: ge / gij', p: 'In Flanders you will constantly hear ge/gij instead of je/jij in speech: "Ge zijt", "Hebt ge…?". It is informal spoken Belgian Dutch. Understand it, but in writing and standard situations use je/jij; polite form is u (u bent / u hebt or u heeft).',
      ex: [['Gij zijt zot! (spoken Flemish)', 'You are crazy!'],
           ['U bent van harte welkom.', 'You are most welcome. (polite)']] }
  ],
  quiz: [
    { t: 'fill', q: 'Hij ___ twee broers. (hebben)', a: ['heeft'], why: 'Third person singular: hij heeft.' },
    { t: 'fill', q: '___ jij vandaag thuis? (zijn)', a: ['ben'], why: 'With jij after the verb the -t drops: "Ben jij…?".' },
    { t: 'mc', q: 'Polite form of "je bent":', o: ['u bent', 'u zijt', 'u ben'], a: 0, why: '"U bent" is the standard polite form ("u zijt" is dialect).' },
    { t: 'mc', q: '"Ge zijt braaf" is…', o: ['wrong Dutch', 'informal spoken Flemish', 'formal written Dutch'], a: 1, why: 'Ge/gij + zijt is typical informal Belgian Dutch speech.' }
  ] },

{ id: 'a1_03', level: 'A1', title: 'Present tense: stem + t',
  read: [
    { h: 'Building the present', p: 'Find the stem (infinitive minus -en): werken → werk. Then: ik = stem, jij/hij/zij/u = stem + t, wij/jullie/zij = infinitive. Spelling guards the vowel sound: lopen → ik loop (double the vowel), schrijven → ik schrijf (v→f), reizen → ik reis (z→s).',
      ex: [['Ik werk, jij werkt, hij werkt, wij werken.', 'I work, you work, he works, we work.'],
           ['Ik schrijf een brief; zij schrijft ook.', 'I write a letter; she writes too.']] },
    { h: 'No double t', p: 'If the stem already ends in -t, nothing is added: praten → hij praat. Stems never end in a written -d + t issue in the present: rijden → hij rijdt (d + t is fine, dt).',
      ex: [['Zij praat veel en hij antwoordt niet.', 'She talks a lot and he does not answer.'],
           ['Hij rijdt te snel.', 'He drives too fast.']] }
  ],
  quiz: [
    { t: 'fill', q: 'Hij ___ in Antwerpen. (wonen)', a: ['woont'], why: 'Stem woon + t → woont (vowel doubled to keep the long o).' },
    { t: 'fill', q: 'Ik ___ elke dag. (lezen)', a: ['lees'], why: 'Stem of lezen = lees (z→s, vowel doubled).' },
    { t: 'fill', q: 'Zij ___ met de fiets. (rijden)', a: ['rijdt'], why: 'Stem rijd + t = rijdt.' },
    { t: 'mc', q: 'Correct form: "Wat ___ jij?"', o: ['vindt', 'vind', 'vinden'], a: 1, why: 'Jij after the verb loses the -t: "Wat vind jij?".' }
  ] },

{ id: 'a1_04', level: 'A1', title: 'De, het & een',
  read: [
    { h: 'Two definite articles', p: 'Dutch has de (common gender, ±75% of nouns) and het (neuter). All plurals take de. All diminutives take het. The indefinite article is always een. There is no perfect rule — learn nouns WITH their article, like vocabulary.',
      ex: [['de man, de vrouw, de stad', 'the man, the woman, the city'],
           ['het kind, het huis, het meisje', 'the child, the house, the girl'],
           ['de huizen, de kinderen (plural → de)', 'the houses, the children']] },
    { h: 'Useful patterns', p: 'Het-words: diminutives (-je), infinitives used as nouns (het eten), languages (het Nederlands), words in -um/-isme, most words with prefixes ge-/be-/ver- without plural -en meaning. De-words: people, fruits, trees, numbers and letters, most -ing/-heid/-ij words.',
      ex: [['het huisje, het zwemmen, het Frans', 'the little house, swimming, French'],
           ['de verwarming, de vrijheid, de bakkerij', 'the heating, the freedom, the bakery']] }
  ],
  quiz: [
    { t: 'mc', q: '___ meisje speelt buiten.', o: ['De', 'Het'], a: 1, why: 'All diminutives (-je) are het-words: het meisje.' },
    { t: 'mc', q: '___ boeken liggen op tafel.', o: ['De', 'Het'], a: 0, why: 'Plurals always take de.' },
    { t: 'fill', q: '"___ Nederlands is niet zo moeilijk." (article)', a: ['het'], why: 'Languages are het-words: het Nederlands.' },
    { t: 'mc', q: 'Which set is fully correct?', o: ['de huis, het stad', 'het huis, de stad', 'het huis, het stad'], a: 1, why: 'Het huis, de stad — learn article + noun together.' }
  ] },

{ id: 'a1_05', level: 'A1', title: 'Plurals: -en and -s',
  read: [
    { h: 'The default: -en', p: 'Most nouns take -en: boek → boeken, stad → steden (irregular vowel). Watch spelling: open vowel closes (maan → manen keeps the sound long with one a? No — maan → manen; boot → boten), consonant doubles after a short vowel (man → mannen, kat → katten), f→v and s→z (brief → brieven, huis → huizen).',
      ex: [['man → mannen · kat → katten', 'men · cats'],
           ['brief → brieven · huis → huizen', 'letters · houses']] },
    { h: 'When -s', p: 'Nouns ending in unstressed -el, -er, -en, -em, -je take -s: tafels, kamers, meisjes. Also most loanwords and words ending in a vowel — after a long vowel written as one letter use an apostrophe: foto’s, baby’s, auto’s.',
      ex: [['de tafel → de tafels', 'the tables'],
           ['de foto → de foto’s', 'the photos']] }
  ],
  quiz: [
    { t: 'fill', q: 'Plural of "man":', a: ['mannen'], why: 'Short vowel → double consonant: mannen.' },
    { t: 'fill', q: 'Plural of "huis":', a: ['huizen'], why: 's → z between vowels: huizen.' },
    { t: 'fill', q: 'Plural of "foto":', a: ["foto's", 'foto’s'], why: 'Vowel-final loanword → apostrophe + s.' },
    { t: 'mc', q: 'Plural of "tafel":', o: ['tafelen', 'tafels', 'tafel’s'], a: 1, why: 'Unstressed -el → -s: tafels.' }
  ] },

{ id: 'a1_06', level: 'A1', title: 'Negation: niet vs geen',
  read: [
    { h: 'Geen', p: 'Geen negates a noun with een or with no article at all — it means "not a / no": Ik heb geen auto. Ik drink geen koffie. If you would say "een X" or a bare noun in the positive sentence, negate with geen.',
      ex: [['Ik heb geen tijd.', 'I have no time.'],
           ['Zij drinkt geen alcohol.', 'She does not drink alcohol.']] },
    { h: 'Niet', p: 'Everything else takes niet: verbs, adjectives, definite nouns, adverbs. Position: niet goes after the direct object but before prepositional phrases, adjectives and verb parts at the end.',
      ex: [['Ik ken die man niet.', 'I do not know that man.'],
           ['Hij woont niet in Brussel.', 'He does not live in Brussels.'],
           ['Het is niet duur.', 'It is not expensive.']] }
  ],
  quiz: [
    { t: 'mc', q: 'Ik heb ___ fiets.', o: ['niet', 'geen'], a: 1, why: 'Positive would be "een fiets" → negate with geen.' },
    { t: 'mc', q: 'Ik zie de bus ___.', o: ['niet', 'geen'], a: 0, why: 'Definite noun (de bus) → niet, placed after the object.' },
    { t: 'fill', q: 'Negate: "Hij werkt vandaag." → Hij werkt vandaag ___.', a: ['niet'], why: 'Negating the verb/whole clause → niet at the end.' },
    { t: 'mc', q: 'Correct sentence:', o: ['Ik spreek geen Frans.', 'Ik spreek niet Frans.', 'Ik geen spreek Frans.'], a: 0, why: 'Bare noun (Frans) → geen: "Ik spreek geen Frans."' }
  ] },

{ id: 'a1_07', level: 'A1', title: 'Questions',
  read: [
    { h: 'Yes/no questions', p: 'Put the verb first, subject second — no "do" needed: Werk jij morgen? Heeft hij kinderen? Remember: jij directly after the verb loses -t.',
      ex: [['Kom je vanavond?', 'Are you coming tonight?'],
           ['Spreekt u Nederlands?', 'Do you speak Dutch?']] },
    { h: 'Question words', p: 'Wie (who), wat (what), waar (where), wanneer (when), waarom (why), hoe (how), welk/welke (which), hoeveel (how many). Question word first, verb second, subject third.',
      ex: [['Waar woon je?', 'Where do you live?'],
           ['Hoeveel kost dat?', 'How much does that cost?'],
           ['Welke tram neem je?', 'Which tram do you take?']] }
  ],
  quiz: [
    { t: 'fill', q: '___ woon jij? — In Leuven.', a: ['waar'], why: '"Waar" asks about place.' },
    { t: 'mc', q: 'Correct yes/no question:', o: ['Jij komt morgen?', 'Kom jij morgen?', 'Komt jij morgen?'], a: 1, why: 'Verb first; jij after the verb → no -t: "Kom jij…?".' },
    { t: 'fill', q: '___ kinderen heeft zij? — Drie.', a: ['hoeveel'], why: '"Hoeveel" asks about quantity.' },
    { t: 'mc', q: '"___ boek lees je?" (which)', o: ['Welke', 'Welk', 'Wat'], a: 1, why: 'Het boek → welk (no -e before het-words in the singular).' }
  ] },

{ id: 'a1_08', level: 'A1', title: 'Adjectives: the -e ending',
  read: [
    { h: 'Almost always -e', p: 'An adjective before a noun takes -e: de grote stad, het grote huis, de grote huizen. Spelling changes apply: groot → grote, dik → dikke, lief → lieve, grijs → grijze.',
      ex: [['de kleine man, de kleine vrouw', 'the small man, the small woman'],
           ['dik → een dikke boterham', 'a thick sandwich']] },
    { h: 'The one exception', p: 'No -e only with: een (or geen/no article) + het-word in the singular: een groot huis, but: het grote huis, grote huizen. After the noun (predicate) the adjective never changes: Het huis is groot.',
      ex: [['een mooi huis (het-word) vs een mooie tuin (de-word)', 'a beautiful house vs a beautiful garden'],
           ['Het huis is mooi.', 'The house is beautiful.']] }
  ],
  quiz: [
    { t: 'fill', q: 'een ___ huis (groot)', a: ['groot'], why: 'Een + het-word singular → no -e: een groot huis.' },
    { t: 'fill', q: 'de ___ auto (snel)', a: ['snelle'], why: 'De-word → -e, consonant doubles: snelle.' },
    { t: 'fill', q: 'het ___ kind (lief)', a: ['lieve'], why: 'Definite article → -e; f→v: lieve.' },
    { t: 'mc', q: 'Correct:', o: ['De koffie is warme.', 'De koffie is warm.', 'De warm koffie.'], a: 1, why: 'Predicate adjectives never inflect: "De koffie is warm."' }
  ] },

{ id: 'a1_09', level: 'A1', title: 'Possessives & demonstratives',
  read: [
    { h: 'Possessives', p: 'mijn (my), jouw/je (your), zijn (his), haar (her), ons/onze (our), jullie (your pl.), hun (their). Only ons changes: ons + het-word singular (ons huis), onze everywhere else (onze auto, onze kinderen).',
      ex: [['mijn broer, haar fiets, hun huis', 'my brother, her bike, their house'],
           ['ons huis maar onze tuin', 'our house but our garden']] },
    { h: 'Demonstratives', p: 'For de-words: deze (this) and die (that). For het-words singular: dit (this) and dat (that). Plurals always: deze/die.',
      ex: [['deze man, die vrouw', 'this man, that woman'],
           ['dit huis, dat kind', 'this house, that child'],
           ['deze boeken, die huizen', 'these books, those houses']] }
  ],
  quiz: [
    { t: 'mc', q: '___ huis is groot. (our)', o: ['Onze', 'Ons'], a: 1, why: 'Het huis → ons huis.' },
    { t: 'mc', q: '___ boek is interessant. (this)', o: ['Deze', 'Dit'], a: 1, why: 'Het boek → dit.' },
    { t: 'fill', q: '___ vrouw daar is mijn tante. (that)', a: ['die'], why: 'De vrouw → die.' },
    { t: 'mc', q: '___ kinderen spelen buiten. (these)', o: ['Dit', 'Deze', 'Dat'], a: 1, why: 'Plural → deze, regardless of gender.' }
  ] },

{ id: 'a1_10', level: 'A1', title: 'Er is / er zijn & place prepositions',
  read: [
    { h: 'There is / there are', p: 'Er is + singular, er zijn + plural — used to introduce something new or indefinite: Er is een probleem. Er zijn veel studenten.',
      ex: [['Er is koffie in de keuken.', 'There is coffee in the kitchen.'],
           ['Er zijn twee stations in de stad.', 'There are two stations in the city.']] },
    { h: 'Core place prepositions', p: 'in (in), op (on), onder (under), boven (above), naast (next to), tussen (between), achter (behind), voor (in front of), bij (at/near), tegenover (opposite).',
      ex: [['De kat zit onder de tafel.', 'The cat sits under the table.'],
           ['Ik woon bij het station.', 'I live near the station.']] }
  ],
  quiz: [
    { t: 'mc', q: '___ veel mensen op straat.', o: ['Er is', 'Er zijn'], a: 1, why: 'Plural (mensen) → er zijn.' },
    { t: 'fill', q: 'De lamp hangt ___ de tafel. (above)', a: ['boven'], why: 'Boven = above.' },
    { t: 'fill', q: '___ is een pakje voor jou.', a: ['er'], why: 'Introducing something indefinite: "Er is een pakje…".' },
    { t: 'mc', q: 'De bakkerij is ___ het station. (opposite)', o: ['tegenover', 'tussen', 'onder'], a: 0, why: 'Tegenover = opposite/across from.' }
  ] },

/* ═══════════════════════ A2 ═══════════════════════
   Expanded A2 module — 18 lessons.
   Same evidence-based recipe as B1: retrieval practice (8-question
   quizzes with feedback), contrastive noticing (⚠️ trap sections),
   chunking (fixed expressions as units) and pattern families.   */
{ id: 'a2_01', level: 'A2', title: 'Perfect tense & ’t kofschip',
  read: [
    { h: 'hebben/zijn + participle', p: 'The perfect = hebben or zijn + past participle at the END: Ik heb gewerkt. Regular participle: ge + stem + t or d. Use -t if the infinitive stem ends in a ’t kofschip consonant (t, k, f, s, ch, p) — else -d: werken → gewerkt, wonen → gewoond.',
      ex: [['Ik heb gisteren gewerkt.', 'I worked yesterday.'],
           ['Wij hebben in Gent gewoond.', 'We lived in Ghent.']] },
    { h: 'Zijn instead of hebben', p: 'Verbs of movement to a destination and change of state take zijn: gaan, komen, vertrekken, beginnen, worden, blijven, zijn itself: Ik ben naar huis gegaan. No ge- for verbs starting with be-, ge-, ver-, ont-, her-: betalen → betaald.',
      ex: [['Zij is om acht uur vertrokken.', 'She left at eight.'],
           ['Ik heb de rekening betaald.', 'I paid the bill.']] },
    { h: '💡 The real rule is your voice', p: 'The kofschip letters are simply the VOICELESS consonants — say the sound with a hand on your throat: no vibration → t, vibration → d. (English mnemonic: SoFT KeTCHuP, plus x: faxen → gefaxt.) One trap: judge by the INFINITIVE, not the stem spelling. Reizen and leven have voiced z and v, so even though the stems are spelled reis and leef, the participles take -d: gereisd, geleefd.',
      ex: [['reizen → gereisd · leven → geleefd', 'to travel → travelled · to live → lived'],
           ['verhuizen → verhuisd · geloven → geloofd', 'to move house → moved · to believe → believed']] },
    { h: 'The participle parks at the end', p: 'However long the sentence gets, the participle stays at the very end of the clause: Ik heb gisteren de hele dag thuis gewerkt. Questions and inversion change nothing at the end: Heb je al gegeten? Wat heb je vandaag gedaan? Train the reflex: as soon as you say heb/ben, plan the participle for the final slot.',
      ex: [['Ik heb gisteren de hele dag thuis gewerkt.', 'I worked at home all day yesterday.'],
           ['Wat heb je dit weekend gedaan?', 'What did you do this weekend?']] }
  ],
  quiz: [
    { t: 'fill', q: 'Ik heb hard ___. (werken)', a: ['gewerkt'], why: 'Stem werk ends in k (’t kofschip) → gewerkt.' },
    { t: 'fill', q: 'Wij hebben daar drie jaar ___. (wonen)', a: ['gewoond'], why: 'n is not in ’t kofschip → -d: gewoond.' },
    { t: 'mc', q: 'Zij ___ naar Brugge gegaan.', o: ['heeft', 'is'], a: 1, why: 'Movement to a destination → zijn: zij is gegaan.' },
    { t: 'fill', q: 'Hij heeft de huur ___. (betalen)', a: ['betaald'], why: 'Verbs in be- take no ge-: betaald.' },
    { t: 'fill', q: 'Wij hebben veel ___. (reizen)', a: ['gereisd'], why: 'Infinitive has voiced z → -d: gereisd (despite the s in the stem spelling).' },
    { t: 'fill', q: 'Mijn oma heeft lang ___. (leven)', a: ['geleefd'], why: 'Infinitive has voiced v → -d: geleefd.' },
    { t: 'mc', q: 'Participle of "fietsen":', o: ['gefietst', 'gefietsd'], a: 0, why: 'Voiceless s (’t kofschip) → -t: gefietst.' },
    { t: 'fill', q: 'Hij heeft het pakket gisteren ___. (versturen)', a: ['verstuurd'], why: 'ver- verbs take no ge-; r is voiced → -d: verstuurd.' }
  ] },

{ id: 'a2_02', level: 'A2', title: 'Simple past: regular verbs',
  read: [
    { h: '-te(n) or -de(n)', p: 'Same ’t kofschip logic: stem + te/ten if the stem ends in t, k, f, s, ch, p; otherwise stem + de/den. werken → werkte(n); wonen → woonde(n).',
      ex: [['Ik werkte vroeger in Brussel.', 'I used to work in Brussels.'],
           ['Zij woonden naast ons.', 'They lived next to us.']] },
    { h: 'When to use which past', p: 'Dutch mostly uses the PERFECT for single completed events in conversation ("Ik heb gegeten"), and the simple past for descriptions, habits and stories: "Het regende en we zaten binnen."',
      ex: [['Vroeger speelde ik elke dag voetbal.', 'I used to play football every day.'],
           ['Ik heb vanmorgen gesport.', 'I exercised this morning.']] },
    { h: '⚠️ The z/v trap returns', p: 'Exactly like in the perfect, judge by the infinitive: reizen (voiced z) → reisde, leven (voiced v) → leefde, verhuizen → verhuisde, geloven → geloofde. The stem spelling (reis, leef) tricks you into -te — resist it. Quick self-check: say the infinitive out loud; buzz = -de.',
      ex: [['Wij reisden elke zomer naar zee.', 'We travelled to the seaside every summer.'],
           ['Hij geloofde het verhaal niet.', 'He did not believe the story.']] },
    { h: 'praatte, zette, antwoordde', p: 'If the stem already ends in -t or -d, you STILL add -te/-de: praten → praatte, zetten → zette, antwoorden → antwoordde. The past then sounds identical to the present — only context and time words reveal the tense. In the participle nothing doubles: gepraat, geantwoord.',
      ex: [['Hij praatte urenlang met de buurman.', 'He talked with the neighbour for hours.'],
           ['Zij antwoordde niet op mijn bericht.', 'She did not reply to my message.']] }
  ],
  quiz: [
    { t: 'fill', q: 'Hij ___ vroeger veel. (roken)', a: ['rookte'], why: 'Stem rook ends in k → -te: rookte.' },
    { t: 'fill', q: 'Wij ___ in een klein dorp. (wonen)', a: ['woonden'], why: 'Stem woon → -den (plural): woonden.' },
    { t: 'fill', q: 'Zij ___ de deur. (openen)', a: ['opende'], why: 'Stem open + de: opende.' },
    { t: 'mc', q: 'Best tense in conversation for "I ate at noon":', o: ['Ik at om twaalf uur.', 'Ik heb om twaalf uur gegeten.'], a: 1, why: 'Single completed event in speech → perfect.' },
    { t: 'fill', q: 'Vroeger ___ wij elk jaar naar Spanje. (reizen)', a: ['reisden'], why: 'Infinitive reizen has voiced z → -den: reisden.' },
    { t: 'fill', q: 'Als kind ___ ik in Sinterklaas. (geloven)', a: ['geloofde'], why: 'Voiced v in geloven → -de: geloofde.' },
    { t: 'fill', q: 'Hij ___ uren met zijn buurman. (praten)', a: ['praatte'], why: 'Stem praat + te → praatte (double t, sounds like the present).' },
    { t: 'fill', q: 'Zij ___ de vaas op de tafel. (zetten)', a: ['zette'], why: 'Stem zet + te → zette.' }
  ] },

{ id: 'a2_03', level: 'A2', title: 'Irregular past: the core verbs',
  read: [
    { h: 'Learn these cold', p: 'zijn → was/waren → geweest · hebben → had/hadden → gehad · gaan → ging → gegaan · komen → kwam → gekomen · zien → zag → gezien · doen → deed → gedaan · eten → at → gegeten · drinken → dronk → gedronken · kopen → kocht → gekocht · weten → wist → geweten.',
      ex: [['Ik was moe en ging vroeg slapen.', 'I was tired and went to sleep early.'],
           ['Hij kocht brood en at het meteen.', 'He bought bread and ate it right away.']] },
    { h: 'Vowel-change families', p: 'Many strong verbs follow patterns: ij → ee (schrijven, schreef, geschreven), ie → oo (kiezen? koos, gekozen), i/e → o (drinken, dronk, gedronken; vinden, vond, gevonden). Spotting the family halves the memorising.',
      ex: [['schrijven — schreef — geschreven', 'to write — wrote — written'],
           ['vinden — vond — gevonden', 'to find — found — found']] },
    { h: 'The -cht family & mixed verbs', p: 'A tight little club shares the past in -cht: kopen → kocht → gekocht, zoeken → zocht → gezocht, brengen → bracht → gebracht, denken → dacht → gedacht. And two "mixed" verbs pair an irregular past with a regular participle: zeggen → zei (zeiden!) → gezegd, vragen → vroeg → gevraagd. 💡 Learning families instead of single verbs is classic pattern learning — one hook stores four verbs.',
      ex: [['Hij bracht me naar het station en dacht na.', 'He took me to the station and reflected.'],
           ['Ze zei niets en vroeg ook niets.', 'She said nothing and asked nothing either.']] },
    { h: 'Singular short, plural long', p: 'Watch the vowel switch between singular and plural past: ik was / wij waren, ik at / wij aten, ik gaf / wij gaven, ik nam / wij namen, ik las / wij lazen. The plural stretches the vowel — say the pairs out loud, the rhythm (kort–lang) is easy to remember.',
      ex: [['Ik at alleen, maar zij aten samen.', 'I ate alone, but they ate together.'],
           ['Hij gaf niets, wij gaven alles.', 'He gave nothing, we gave everything.']] }
  ],
  quiz: [
    { t: 'fill', q: 'Gisteren ___ ik naar de markt. (gaan, past)', a: ['ging'], why: 'gaan → ging.' },
    { t: 'fill', q: 'Zij ___ een mooie film. (zien, past)', a: ['zag'], why: 'zien → zag.' },
    { t: 'fill', q: 'Wij ___ te veel koffie. (drinken, past)', a: ['dronken'], why: 'drinken → dronk(en).' },
    { t: 'fill', q: 'Participle of "schrijven": Hij heeft een boek ___.', a: ['geschreven'], why: 'ij → ee family: geschreven.' },
    { t: 'fill', q: 'Hij ___ me gisteren naar het station. (brengen, past)', a: ['bracht'], why: '-cht family: brengen → bracht.' },
    { t: 'fill', q: 'Zij ___ niets tegen mij. (zeggen, past)', a: ['zei'], why: 'Mixed verb: zeggen → zei (plural zeiden).' },
    { t: 'fill', q: 'Wij ___ elke zondag bij oma. (eten, past)', a: ['aten'], why: 'Plural past stretches the vowel: ik at → wij aten.' },
    { t: 'fill', q: 'Ik ___ een cadeau van mijn collega. (krijgen, past)', a: ['kreeg'], why: 'ij → ee family: krijgen → kreeg → gekregen.' }
  ] },

{ id: 'a2_04', level: 'A2', title: 'Separable verbs',
  read: [
    { h: 'The prefix splits off', p: 'Verbs like opstaan, meenemen, aankomen split in main clauses: the prefix flies to the end. Ik sta om zeven uur op. In the infinitive and participle they close up again: opstaan, opgestaan (ge- goes between!).',
      ex: [['Ik neem mijn laptop mee.', 'I take my laptop along.'],
           ['De trein komt om tien uur aan.', 'The train arrives at ten.'],
           ['Ik ben vroeg opgestaan.', 'I got up early.']] },
    { h: 'With te and in subclauses', p: 'With om…te the te goes inside: om mee te nemen. In subclauses the verb doesn’t split: …omdat ik vroeg opsta.',
      ex: [['Vergeet niet om je paraplu mee te nemen.', 'Don’t forget to bring your umbrella.'],
           ['…omdat de trein laat aankomt.', '…because the train arrives late.']] },
    { h: '💡 Meet the prefix families', p: 'Prefixes carry meaning — learn the prefix, unlock dozens of verbs: op- (up/start: opstaan, opbellen), aan- (on/towards: aankomen, aandoen), uit- (out/finish: uitnodigen, uitgaan), mee- (along: meenemen, meegaan), terug- (back: terugkomen, terugbellen), af- (off/done: afwassen, afspreken), weg- (away: weggaan). Store each verb as ONE word with its stress on the prefix: ÓPstaan.',
      ex: [['Ik nodig je uit voor mijn feest.', 'I invite you to my party.'],
           ['Zij belt me morgen terug.', 'She will call me back tomorrow.']] },
    { h: 'After a modal: stays glued', p: 'After kunnen/moeten/mogen/willen the separable verb sits WHOLE at the end: Ik moet mijn oma terugbellen. Wil je meegaan? Compare the split main clause: Ik bel mijn oma terug. Two shapes, one verb — drill both until switching feels automatic.',
      ex: [['Ik moet vanavond mijn oma terugbellen.', 'I have to call my grandma back tonight.'],
           ['Wil je morgen meegaan naar de markt?', 'Do you want to come along to the market tomorrow?']] }
  ],
  quiz: [
    { t: 'fill', q: 'Ik ___ elke dag om 7 uur ___. (opstaan)', a: ['sta ... op', 'sta op', 'sta...op', 'sta … op'], why: 'Main clause: "Ik sta … op." — prefix at the end.' },
    { t: 'mc', q: 'Participle of "aankomen":', o: ['geaankomen', 'aangekomen', 'aankomd'], a: 1, why: 'ge- goes between prefix and verb: aangekomen.' },
    { t: 'mc', q: 'Correct with om…te:', o: ['om op te staan', 'om te opstaan'], a: 0, why: 'Te splits the separable verb: om op te staan.' },
    { t: 'mc', q: '…omdat hij zijn zus ___.', o: ['belt op', 'opbelt'], a: 1, why: 'In a subclause the verb stays whole: opbelt.' },
    { t: 'fill', q: 'Ik nodig je ___ voor mijn verjaardag. (uitnodigen)', a: ['uit'], why: 'Main clause: prefix to the end — "Ik nodig je uit."' },
    { t: 'mc', q: 'Ik wil vanavond ___.', o: ['meegaan', 'ga mee'], a: 0, why: 'After a modal the separable verb stays whole at the end: wil … meegaan.' },
    { t: 'fill', q: 'Hij heeft me nog niet ___. (terugbellen, participle)', a: ['teruggebeld'], why: 'ge- between the parts: terug + ge + beld.' },
    { t: 'fill', q: 'Wij wassen na het eten altijd ___. (afwassen)', a: ['af'], why: 'Split in the main clause: "Wij wassen … af."' }
  ] },

{ id: 'a2_05', level: 'A2', title: 'Modal verbs',
  read: [
    { h: 'kunnen · moeten · mogen · willen · zullen', p: 'Modals are conjugated in second position; the main verb goes to the end as a bare infinitive (no te): Ik kan morgen niet komen. Irregular singulars: ik kan, ik mag, ik wil, ik moet, ik zal.',
      ex: [['Ik moet vandaag werken.', 'I have to work today.'],
           ['Mag ik hier parkeren?', 'May I park here?'],
           ['Wij willen Nederlands leren.', 'We want to learn Dutch.']] },
    { h: 'Meaning nuances', p: 'kunnen = ability/possibility · moeten = must · mogen = permission · willen = want · zullen = shall (future, offers: "Zal ik helpen?"). Hoeven replaces moeten in negatives: Je hoeft niet te komen (note: with te!).',
      ex: [['Je hoeft dat niet te doen.', 'You don’t have to do that.'],
           ['Zal ik de deur openen?', 'Shall I open the door?']] },
    { h: 'The past: kon, moest, mocht, wilde', p: 'kunnen → kon/konden · moeten → moest(en) · mogen → mocht(en) · willen → wilde(n) · zullen → zou(den). Ik kon gisteren niet komen. Als kind mocht ik nooit laat opblijven. 🦁 In Flemish (and casual Dutch) speech you will constantly hear wou for wilde: "Ik wou het net zeggen!"',
      ex: [['Ik kon gisteren niet naar de les komen.', 'I could not come to class yesterday.'],
           ['Als kind mocht ik geen cola drinken.', 'As a child I was not allowed to drink cola.']] },
    { h: 'Dropping the main verb', p: 'When the action is obvious, Dutch drops the infinitive after a modal: Ik moet naar huis (no "gaan" needed). Ik wil graag een koffie. Dat mag niet. Hij kan dat niet. Sounding natural at A2 is often about leaving this verb OUT.',
      ex: [['Ik moet nu echt naar huis.', 'I really have to go home now.'],
           ['Wil je ook een koffie? — Nee, dat mag ik niet.', 'Do you want a coffee too? — No, I’m not allowed.']] }
  ],
  quiz: [
    { t: 'fill', q: '___ ik het raam openen? (permission)', a: ['mag'], why: 'Permission → mogen: "Mag ik…?".' },
    { t: 'mc', q: 'Correct:', o: ['Ik kan niet te komen.', 'Ik kan niet komen.', 'Ik kan niet kom.'], a: 1, why: 'Modal + bare infinitive at the end: "Ik kan niet komen."' },
    { t: 'mc', q: '"You don’t have to pay" =', o: ['Je moet niet betalen. (NL standard)', 'Je hoeft niet te betalen.'], a: 1, why: 'Negated obligation → hoeven + te. (🦁 In Flanders "ge moet niet" is common speech, but standard is hoeven.)' },
    { t: 'fill', q: 'Hij ___ goed koken. (ability)', a: ['kan'], why: 'Ability → kunnen: hij kan.' },
    { t: 'fill', q: 'Ik ___ gisteren niet komen. (kunnen, past)', a: ['kon'], why: 'kunnen → kon in the simple past.' },
    { t: 'fill', q: 'Als kind ___ ik geen cola drinken. (mogen, past)', a: ['mocht'], why: 'mogen → mocht: was (not) allowed to.' },
    { t: 'fill', q: 'Zij ___ vroeger dokter worden. (willen, past)', a: ['wilde', 'wou'], why: 'willen → wilde (spoken also wou).' },
    { t: 'mc', q: 'Natural Dutch for "I have to go home":', o: ['Ik moet naar huis gaan lopen.', 'Ik moet naar huis.', 'Ik moet naar huis te gaan.'], a: 1, why: 'With a direction the infinitive is dropped: "Ik moet naar huis."' }
  ] },

{ id: 'a2_06', level: 'A2', title: 'Subclauses: verb to the end',
  read: [
    { h: 'omdat, als, dat…', p: 'After subordinating conjunctions (omdat, dat, als, terwijl, hoewel, toen, voordat, nadat, zodat…) ALL verbs move to the end of the clause: Ik blijf thuis omdat ik ziek ben.',
      ex: [['Ik denk dat hij gelijk heeft.', 'I think that he is right.'],
           ['Als het regent, blijven we binnen.', 'If it rains, we stay inside.']] },
    { h: 'Subclause first → inversion', p: 'If the subclause comes first, it fills position 1 of the main clause, so the main verb comes immediately after the comma: Omdat ik ziek ben, blijf ik thuis.',
      ex: [['Omdat het laat was, ging ik slapen.', 'Because it was late, I went to sleep.'],
           ['Terwijl ik kook, dekt hij de tafel.', 'While I cook, he sets the table.']] },
    { h: 'Two verbs at the end: both orders OK', p: 'With a perfect tense in the subclause, two verbs pile up at the end — and BOTH orders are correct: …dat ik hard gewerkt heb = …dat ik hard heb gewerkt. 🦁 Flanders leans towards "gewerkt heb", the Netherlands towards "heb gewerkt"; exams accept both, so pick one and be consistent.',
      ex: [['Ik denk dat zij de bus gemist heeft.', 'I think she has missed the bus.'],
           ['Hij zegt dat hij nog nooit in Gent is geweest.', 'He says he has never been to Ghent.']] },
    { h: 'The time crew: voordat, nadat, zodra, terwijl', p: 'Four time conjunctions carry half of daily conversation: voordat (before), nadat (after), zodra (as soon as), terwijl (while): Voordat ik ga slapen, lees ik een half uur. Zodra ik thuis ben, bel ik je. All of them send the verb to the end, like every subordinating conjunction.',
      ex: [['Voordat ik ga slapen, lees ik nog even.', 'Before I go to sleep, I read for a bit.'],
           ['Zodra de les klaar is, gaan we lunchen.', 'As soon as the class is finished, we go for lunch.']] }
  ],
  quiz: [
    { t: 'mc', q: 'Ik blijf thuis omdat ik ___.', o: ['ben ziek', 'ziek ben'], a: 1, why: 'Verb-final in the omdat-clause: "…omdat ik ziek ben."' },
    { t: 'fill', q: 'Zij zegt dat ze morgen ___. (komen)', a: ['komt'], why: 'Verb at the end of the dat-clause: "…dat ze morgen komt."' },
    { t: 'mc', q: 'Als het regent, ___ we binnen.', o: ['we blijven', 'blijven'], a: 1, why: 'Subclause first → inversion: "…, blijven we binnen."' },
    { t: 'mc', q: 'Which conjunction does NOT send the verb to the end?', o: ['omdat', 'want', 'hoewel'], a: 1, why: '"Want" is coordinating — normal V2 word order follows.' },
    { t: 'mc', q: '…dat ik hard gewerkt heb / …dat ik hard heb gewerkt:', o: ['only the first is correct', 'only the second is correct', 'both are correct'], a: 2, why: 'Both end-orders are standard (🦁 Flanders prefers "gewerkt heb", NL "heb gewerkt").' },
    { t: 'fill', q: 'Ik lees nog even ___ ik ga slapen. (before)', a: ['voordat', 'voor'], why: 'voordat = before + clause, verb final.' },
    { t: 'fill', q: '___ ik thuis ben, bel ik je. (as soon as)', a: ['zodra'], why: 'zodra = as soon as, subordinating.' },
    { t: 'fill', q: 'Zij blijft thuis omdat ze zich niet goed ___. (voelen)', a: ['voelt'], why: 'Verb final: "…omdat ze zich niet goed voelt."' }
  ] },

{ id: 'a2_07', level: 'A2', title: 'Comparative & superlative',
  read: [
    { h: '-er and -st', p: 'groot → groter → grootst; snel → sneller → snelst. Adjectives ending in -r insert d: duur → duurder. Than = dan: Hij is groter dan ik. As…as = even…als.',
      ex: [['Deze fiets is duurder dan die.', 'This bike is more expensive than that one.'],
           ['Zij is even oud als ik.', 'She is as old as me.']] },
    { h: 'Irregulars & usage', p: 'goed → beter → best · veel → meer → meest · weinig → minder → minst · graag → liever → liefst ("Ik drink liever thee" = I prefer tea). Superlative usually with het: het grootst / de grootste stad.',
      ex: [['Ik sport graag, maar ik lees liever.', 'I like sports, but I prefer reading.'],
           ['Antwerpen is de grootste stad van Vlaanderen.', 'Antwerp is the largest city of Flanders.']] },
    { h: 'Adverbs: no -e, ever', p: 'The same word describes a noun (adjective) or a verb (adverb) — but after a verb it NEVER inflects: een snelle auto vs Hij rijdt snel. Ze zingt mooi. English adds -ly, Dutch adds nothing. This also holds for comparatives: Hij loopt sneller dan ik.',
      ex: [['Zij zingt mooi en danst goed.', 'She sings beautifully and dances well.'],
           ['Een langzame trein rijdt langzaam.', 'A slow train drives slowly.']] },
    { h: 'Long words still take -er', p: 'Unlike English, Dutch happily glues -er/-st onto long adjectives: interessanter, belangrijkste. Use meer/meest mainly with participle-adjectives: meer geïnteresseerd, het meest gelezen boek. Attributive superlative always gets -ste: de grootste stad, het mooiste huis.',
      ex: [['Dit boek is interessanter dan dat.', 'This book is more interesting than that one.'],
           ['Wat is het belangrijkste woord in deze zin?', 'What is the most important word in this sentence?']] }
  ],
  quiz: [
    { t: 'fill', q: 'Brussel is ___ dan Leuven. (groot)', a: ['groter'], why: 'Comparative: groter + dan.' },
    { t: 'fill', q: 'Deze jas is ___ dan die. (duur)', a: ['duurder'], why: 'Adjectives in -r insert d: duurder.' },
    { t: 'fill', q: 'Ik drink ___ koffie dan thee. (graag, comparative)', a: ['liever'], why: 'graag → liever: expressing preference.' },
    { t: 'mc', q: '"the best idea" =', o: ['het goedste idee', 'het beste idee'], a: 1, why: 'goed → best is irregular: het beste idee.' },
    { t: 'mc', q: 'Ze zingt ___ .', o: ['mooi', 'mooie'], a: 0, why: 'Adverbs never take -e: ze zingt mooi.' },
    { t: 'fill', q: 'Dit boek is ___ dan de film. (interessant)', a: ['interessanter'], why: 'Dutch adds -er even to long adjectives: interessanter.' },
    { t: 'fill', q: 'Antwerpen is de ___ stad van Vlaanderen. (groot)', a: ['grootste'], why: 'Attributive superlative → -ste: de grootste stad.' },
    { t: 'fill', q: 'Hij is ___ oud als ik. (just as)', a: ['even'], why: 'Equality: even + adjective + als.' }
  ] },

{ id: 'a2_08', level: 'A2', title: 'om + te + infinitive',
  read: [
    { h: 'Purpose and after adjectives', p: 'Om…te + infinitive expresses purpose ("in order to") and follows many adjectives: Ik leer Nederlands om in Gent te studeren. Het is moeilijk om vroeg op te staan.',
      ex: [['Ik spaar om een huis te kopen.', 'I save (money) to buy a house.'],
           ['Het is leuk om nieuwe mensen te ontmoeten.', 'It is nice to meet new people.']] },
    { h: 'Verbs with te (no om)', p: 'Some verbs link directly with te: proberen, beginnen, vergeten, beloven, hoeven: Ik probeer elke dag te oefenen. Separable verbs wrap te inside: op te staan.',
      ex: [['Vergeet niet te bellen!', 'Don’t forget to call!'],
           ['Hij begint te begrijpen.', 'He is starting to understand.']] },
    { h: 'noun + om te', p: 'Nouns love the pattern too: tijd om te sporten, zin om uit te gaan, geld om op reis te gaan, een kans om te oefenen. The om…te block always comes after the noun it belongs to, and the infinitive closes the sentence.',
      ex: [['Ik heb geen tijd om te sporten.', 'I have no time to exercise.'],
           ['Heb je zin om mee te gaan?', 'Do you feel like coming along?']] },
    { h: '💡 Is om required?', p: 'Rule of thumb: purpose → om is required (Ik spaar om te reizen). After adjectives and nouns om is standard and never wrong: Het is fijn om te zwemmen. After te-verbs like proberen/vergeten/beloven, use plain te. When in doubt at A2: include om in the adjective/noun patterns, drop it after the te-verbs.',
      ex: [['Ik bel om een afspraak te maken.', 'I am calling (in order) to make an appointment.'],
           ['Ze probeert minder snoep te eten.', 'She is trying to eat fewer sweets.']] }
  ],
  quiz: [
    { t: 'fill', q: 'Ik ga naar de winkel ___ brood ___ kopen.', a: ['om ... te', 'om te', 'om...te', 'om … te'], why: 'Purpose → om … te + infinitive at the end.' },
    { t: 'mc', q: 'Correct:', o: ['Ik probeer te elke dag oefenen.', 'Ik probeer elke dag te oefenen.'], a: 1, why: 'Te comes directly before the final infinitive.' },
    { t: 'mc', q: 'With separable "opbellen":', o: ['om op te bellen', 'om te opbellen'], a: 0, why: 'Te goes inside the separable verb.' },
    { t: 'fill', q: 'Het is fijn ___ in de zon ___ zitten.', a: ['om ... te', 'om te', 'om...te', 'om … te'], why: 'After adjectives: Het is fijn om … te zitten.' },
    { t: 'fill', q: 'Ik heb geen tijd ___ te sporten.', a: ['om'], why: 'noun + om te: geen tijd om te sporten.' },
    { t: 'fill', q: 'Heb je zin ___ mee te gaan?', a: ['om'], why: 'zin om te + infinitive: feel like doing.' },
    { t: 'mc', q: 'Purpose — which is correct?', o: ['Ik spaar om een auto te kopen.', 'Ik spaar een auto te kopen.'], a: 0, why: 'Purpose requires om: om … te kopen.' },
    { t: 'mc', q: 'Ze vergeet vaak ___ .', o: ['te bellen', 'om bellen'], a: 0, why: 'vergeten + te + infinitive (om optional, te obligatory).' }
  ] },

{ id: 'a2_09', level: 'A2', title: 'Reflexives & the imperative',
  read: [
    { h: 'Reflexive verbs', p: 'me, je, zich, ons, je, zich: Ik was me. Hij vergist zich. Some verbs are always reflexive: zich herinneren, zich vergissen, zich haasten. Stressed forms with -zelf only for contrast: Ik was mezelf.',
      ex: [['Ik herinner me die dag goed.', 'I remember that day well.'],
           ['Zij haast zich naar het werk.', 'She hurries to work.']] },
    { h: 'Imperative', p: 'Use the stem: Kom hier! Wacht even! Polite with u: Komt u binnen. Softeners: eens, even, maar — "Kom eens kijken!" 🦁 Flemish speech often softens with "… hé" or "… zeker".',
      ex: [['Wacht even!', 'Wait a moment!'],
           ['Neemt u plaats.', 'Please take a seat. (polite)']] },
    { h: 'Your day in reflexives', p: 'Daily routine runs on reflexives: zich wassen, zich aankleden (separable + reflexive: Hij kleedt zich aan), zich scheren, zich voelen (Ik voel me niet zo goed), zich vervelen (De kinderen vervelen zich), zich haasten. The pronoun comes right after the verb, before everything else.',
      ex: [['Ik voel me vandaag niet zo goed.', 'I don’t feel so good today.'],
           ['Hij kleedt zich snel aan en vertrekt.', 'He gets dressed quickly and leaves.']] },
    { h: 'Wees! & don’t-commands', p: 'Zijn has an irregular imperative: wees — Wees voorzichtig! Wees niet bang! Negative commands use niet/geen as usual: Maak je geen zorgen (don’t worry), Vergeet niet te bellen. Very polite: Gaat u zitten. Maakt u zich geen zorgen.',
      ex: [['Wees niet bang, de hond is lief.', 'Don’t be afraid, the dog is sweet.'],
           ['Maak je geen zorgen, het komt goed.', 'Don’t worry, it will be fine.']] }
  ],
  quiz: [
    { t: 'fill', q: 'Hij vergist ___ vaak.', a: ['zich'], why: 'Third person reflexive → zich.' },
    { t: 'fill', q: 'Wij herinneren ___ dat feest nog.', a: ['ons'], why: 'First person plural reflexive → ons.' },
    { t: 'mc', q: 'Imperative of "komen":', o: ['Komt hier!', 'Kom hier!', 'Komen hier!'], a: 1, why: 'Imperative = stem: Kom!' },
    { t: 'mc', q: '"Ik was ___ elke ochtend."', o: ['me', 'mezelf', 'mij zelf'], a: 0, why: 'Routine action → unstressed reflexive me.' },
    { t: 'fill', q: 'Ik voel ___ vandaag niet zo goed.', a: ['me'], why: 'zich voelen: ik voel me.' },
    { t: 'fill', q: 'De kinderen vervelen ___ in de vakantie.', a: ['zich'], why: 'zich vervelen = to be bored: de kinderen vervelen zich.' },
    { t: 'mc', q: 'Imperative of "zijn": ___ voorzichtig!', o: ['Ben', 'Wees', 'Zijn'], a: 1, why: 'Irregular imperative: wees.' },
    { t: 'fill', q: 'Kleed je snel ___, we vertrekken! (aankleden)', a: ['aan'], why: 'Separable + reflexive: "Kleed je … aan!"' }
  ] },

{ id: 'a2_10', level: 'A2', title: 'Future & diminutives',
  read: [
    { h: 'Talking about the future', p: 'Three ways: present + time word (Ik vertrek morgen), gaan + infinitive for plans (Ik ga morgen sporten), zullen for promises/predictions/proposals (Ik zal je helpen. Zullen we gaan?).',
      ex: [['Morgen ga ik mijn cv schrijven.', 'Tomorrow I’m going to write my CV.'],
           ['Zullen we samen studeren?', 'Shall we study together?']] },
    { h: 'Diminutives -je', p: 'Every diminutive is a het-word: het huisje. Endings: -je (huisje), -tje (autootje, vrouwtje), -etje (zonnetje), -pje (boompje), -kje (koninkje). 🦁 Flanders loves -ke in speech: een pintje/pintke, een koffieke — informal, warm, extremely common.',
      ex: [['een biertje, een terrasje, een momentje', 'a beer, a terrace visit, a moment'],
           ['🦁 een koffieke doen (spoken Flemish)', 'to grab a coffee']] },
    { h: 'Predictions you can see coming', p: 'Gaan is also for predictions based on evidence in front of you: Kijk, donkere wolken — het gaat regenen! Pas op, je gaat vallen! Zullen stays for promises and neutral predictions: Het zal wel lukken (it will probably work out). Wel + zullen = reassurance.',
      ex: [['Kijk die lucht — het gaat regenen.', 'Look at that sky — it is going to rain.'],
           ['Maak je geen zorgen, het zal wel lukken.', 'Don’t worry, it will work out.']] },
    { h: 'Diminutive spelling gym', p: 'Vowel at the end doubles first: auto → autootje, foto → fotootje. Short vowel + single consonant → double consonant + -etje: zon → zonnetje, ring → ringetje, kam → kammetje. After -m comes -pje: boom → boompje, film → filmpje. Diminutives also soften and warm up your Dutch: een uurtje (a casual hour), een momentje (just a sec).',
      ex: [['een autootje, een fotootje', 'a little car, a little photo'],
           ['Ik kom over een uurtje.', 'I’ll come in an hour or so.']] }
  ],
  quiz: [
    { t: 'mc', q: 'A plan for tomorrow — most natural:', o: ['Ik zal morgen lopen.', 'Ik ga morgen lopen.'], a: 1, why: 'Plans/intentions → gaan + infinitive.' },
    { t: 'fill', q: '___ we vanavond samen eten? (proposal)', a: ['zullen'], why: 'Proposals → "Zullen we…?".' },
    { t: 'fill', q: 'Diminutive of "huis": het ___', a: ['huisje'], why: 'huis → huisje.' },
    { t: 'mc', q: 'Diminutives are always…', o: ['de-words', 'het-words'], a: 1, why: 'All diminutives are neuter: het huisje, het meisje.' },
    { t: 'fill', q: 'Kijk, donkere wolken! Het ___ regenen.', a: ['gaat'], why: 'Visible-evidence prediction → gaan: het gaat regenen.' },
    { t: 'fill', q: 'Diminutive of "auto": het ___', a: ['autootje'], why: 'Final vowel doubles: auto → autootje.' },
    { t: 'fill', q: 'Diminutive of "zon": het ___', a: ['zonnetje'], why: 'Short vowel doubles the consonant: zonnetje.' },
    { t: 'fill', q: 'Diminutive of "boom": het ___', a: ['boompje'], why: 'After -m → -pje: boompje.' }
  ] },

{ id: 'a2_11', level: 'A2', title: 'Object pronouns: mij, jou, hem, haar, ze…',
  read: [
    { h: 'The object forms', p: 'me/mij, je/jou, u, hem, haar, het, ons, jullie, ze/hen/hun. Unstressed forms (me, je, ze) are the everyday default: Ik zie je morgen. Bel me! The full forms add stress or contrast: Hij kiest MIJ, niet jou. Same logic as subject je/jij.',
      ex: [['Ik bel je vanavond, oké?', 'I’ll call you tonight, okay?'],
           ['Ze heeft mij gekozen, niet jou!', 'She chose ME, not you!']] },
    { h: 'Things are hem, het or ze', p: 'Surprise: things follow their article. A de-word thing → hem: Waar is mijn sleutel? Ik kan hem niet vinden. A het-word → het: Waar is het boek? Ik zie het niet. Plural things → ze (NEVER hen — hen is only for people): Mooie schoenen! Waar heb je ze gekocht?',
      ex: [['Waar is de sleutel? Ik kan hem niet vinden.', 'Where is the key? I can’t find it.'],
           ['Mooie schoenen! Waar heb je ze gekocht?', 'Nice shoes! Where did you buy them?']] },
    { h: 'They: hen, hun of ze?', p: 'In speech ze is the safe all-rounder for people: Ik help ze wel. The written rules: hen as direct object and after prepositions (ik zie hen, voor hen), hun as indirect object without preposition (ik geef hun het boek). 🦁 Bonus: with ge/gij, Flemish speech uses u as the object form — "Ik bel u straks" can be perfectly informal in Flanders.',
      ex: [['Ik heb een cadeau voor hen gekocht.', 'I bought a present for them.'],
           ['Ik geef hun morgen het geld. / Ik geef ze morgen het geld.', 'I’ll give them the money tomorrow.']] }
  ],
  quiz: [
    { t: 'fill', q: 'Dat is mijn boek — geef het aan ___! (me, stressed)', a: ['mij'], why: 'Stressed object form: aan mij.' },
    { t: 'mc', q: 'Waar is de sleutel? — Ik kan ___ niet vinden.', o: ['het', 'hem', 'haar'], a: 1, why: 'De sleutel is a de-word → hem, even for a thing.' },
    { t: 'mc', q: 'Waar zijn je schoenen? — Ik heb ___ aangedaan.', o: ['hen', 'ze', 'hun'], a: 1, why: 'Plural things → ze (hen/hun are only for people).' },
    { t: 'fill', q: 'Wij helpen ___ met de verhuizing. (them — people, natural)', a: ['ze', 'hen'], why: 'Spoken: ze; written direct object: hen. Both correct.' },
    { t: 'mc', q: 'Written standard: Ik heb een cadeau voor ___ .', o: ['hun', 'hen', 'zij'], a: 1, why: 'After a preposition → hen: voor hen.' },
    { t: 'fill', q: 'Zie ik ___ morgen? (you — informal, unstressed)', a: ['je'], why: 'Everyday unstressed object: je.' },
    { t: 'mc', q: 'HIJ heeft het gedaan, niet ___!', o: ['ze', 'zij', 'haar'], a: 1, why: 'Contrast on the subject → stressed subject form zij.' },
    { t: 'mc', q: '🦁 With ge/gij, Flemish friends say:', o: ['Ik bel u straks.', 'Ik bel jij straks.', 'Ik bel hen straks.'], a: 0, why: 'U is the object form of ge/gij — informal in Flanders.' }
  ] },

{ id: 'a2_12', level: 'A2', title: 'liggen, staan, zitten, hangen — where things are',
  read: [
    { h: 'Dutch things have posture', p: 'Where English says "is", Dutch picks a position verb: ligt (lying — flat things: boek, krant), staat (standing — upright things: fles, vaas, auto), zit (inside something: sleutels in je zak), hangt (jas, schilderij). Het boek ligt op tafel — never "is op tafel".',
      ex: [['Het boek ligt op de tafel.', 'The book is (lying) on the table.'],
           ['De fles staat in de koelkast.', 'The bottle is (standing) in the fridge.'],
           ['De jas hangt aan de kapstok.', 'The coat is (hanging) on the coat rack.']] },
    { h: 'Putting things: leggen & zetten', p: 'The moving versions: leggen = put flat (result: it lies), zetten = put upright (result: it stands), hangen = hang, doen/stoppen in = put in. Ik leg de krant op tafel. Zet de borden maar in de kast. Doe de melk in de koelkast. Pairs to chunk: liggen↔leggen, staan↔zetten.',
      ex: [['Ik leg de krant op de tafel.', 'I put the newspaper on the table.'],
           ['Zet de glazen maar in de kast.', 'Just put the glasses in the cupboard.']] },
    { h: 'staan for words & pictures', p: 'Text and images "stand": Wat staat er in de brief? (What does the letter say?) Er staat een foto van jou op Instagram. Dat staat op pagina tien. And people sit in institutions: De kinderen zitten op school. Mijn zoon zit in het derde jaar.',
      ex: [['Wat staat er in de e-mail?', 'What does the email say?'],
           ['De kinderen zitten op school.', 'The children are at school.']] }
  ],
  quiz: [
    { t: 'mc', q: 'De fles wijn ___ op tafel.', o: ['ligt', 'staat', 'zit'], a: 1, why: 'Bottles stand upright → staat.' },
    { t: 'mc', q: 'De krant ___ op de stoel.', o: ['ligt', 'staat'], a: 0, why: 'Flat things lie → ligt.' },
    { t: 'fill', q: 'Mijn sleutels ___ in mijn jaszak. (position verb)', a: ['zitten'], why: 'Inside something → zitten: de sleutels zitten in je zak.' },
    { t: 'fill', q: 'De jas ___ aan de kapstok. (position verb)', a: ['hangt'], why: 'Coats hang: hangt aan de kapstok.' },
    { t: 'mc', q: 'Put the book flat on the table: Ik ___ het boek op tafel.', o: ['zet', 'leg'], a: 1, why: 'Result is lying → leggen.' },
    { t: 'mc', q: 'Ik ___ de glazen in de kast.', o: ['leg', 'zet'], a: 1, why: 'Glasses end up standing → zetten.' },
    { t: 'fill', q: 'Wat ___ er in de e-mail? (says)', a: ['staat'], why: 'Text "stands": Wat staat er in…?' },
    { t: 'mc', q: '"Er staat een foto van jou in de krant" means…', o: ['There is a photo of you in the paper', 'You must pose for a photo', 'Your photo is standing on the paper'], a: 0, why: 'Images "stand" in/on media: er staat een foto in de krant.' }
  ] },

{ id: 'a2_13', level: 'A2', title: 'op school, aan zee, naar huis: tricky place words',
  read: [
    { h: 'op, in, aan — learn the chunks', p: 'Some place phrases are fixed — memorise them as chunks, don’t translate: op school, op het werk, op kantoor, op straat, op de markt, op vakantie, op internet · in de klas, in bed, in de tuin · aan zee, aan tafel, aan de telefoon. 💡 Chunk learning: store "op school" as one word, exactly like natives do.',
      ex: [['De kinderen zijn op school en papa is op het werk.', 'The kids are at school and dad is at work.'],
           ['We zitten aan tafel — kom je?', 'We are at the table — are you coming?']] },
    { h: 'naar huis vs thuis', p: 'Movement → naar: Ik ga naar huis (I am going home). Being there → thuis: Ik ben thuis. Ik blijf thuis. Origin → uit: Ik kom uit Kazachstan. Coming from a place you visited → van: Ik kom net van het werk.',
      ex: [['Ik ga om vijf uur naar huis.', 'I am going home at five.'],
           ['Blijf je vanavond thuis?', 'Are you staying home tonight?'],
           ['Zij komt uit Marokko.', 'She is from Morocco.']] },
    { h: '🦁 op de trein', p: 'The Netherlands sits IN vehicles: in de trein, in de bus. Belgium sits ON them: op de trein, op de bus — both are correct standard usage in their country. Travelling is always met: met de trein, met de fiets. 🦁 More Belgian: in/met verlof (on leave) where NL says met vakantie.',
      ex: [['🦁 Ik zat op de trein naar Leuven.', 'I was on the train to Leuven. (BE)'],
           ['Ik ga altijd met de fiets naar het werk.', 'I always cycle to work.']] }
  ],
  quiz: [
    { t: 'fill', q: 'De kinderen zijn ___ school.', a: ['op'], why: 'Fixed chunk: op school.' },
    { t: 'fill', q: 'We eten samen ___ tafel.', a: ['aan'], why: 'Fixed chunk: aan tafel.' },
    { t: 'mc', q: 'Het is al laat, ik ga ___ .', o: ['thuis', 'naar huis'], a: 1, why: 'Movement → naar huis.' },
    { t: 'mc', q: 'Hij werkt vandaag ___ .', o: ['thuis', 'naar huis'], a: 0, why: 'No movement → thuis: hij werkt thuis.' },
    { t: 'fill', q: 'Zij komt ___ Marokko. (origin)', a: ['uit'], why: 'Country of origin → uit: komen uit.' },
    { t: 'fill', q: 'Mama kan nu niet praten, ze is ___ de telefoon.', a: ['aan'], why: 'Fixed chunk: aan de telefoon.' },
    { t: 'mc', q: '🦁 Typically Belgian:', o: ['op de trein zitten', 'in de trein zitten'], a: 0, why: 'BE: op de trein/bus; NL: in de trein/bus. Both standard in their country.' },
    { t: 'fill', q: 'Wij gaan in juli twee weken ___ vakantie.', a: ['op'], why: 'Fixed chunk: op vakantie gaan.' }
  ] },

{ id: 'a2_14', level: 'A2', title: 'Clock times & dates',
  read: [
    { h: '⚠️ The half-trick', p: 'Dutch half looks FORWARD to the next hour: half vier = 3:30 (half an hour before four!). The rest is friendly: drie uur (3:00), kwart over drie (3:15), kwart voor vier (3:45). At = om: De les begint om half negen (8:30).',
      ex: [['Het is half vier.', 'It is half past three (3:30!).'],
           ['De film begint om kwart over acht.', 'The film starts at a quarter past eight.']] },
    { h: 'Minutes cluster around half', p: 'Within ten minutes of the half hour, Dutch anchors on half: vijf voor half vier = 3:25, vijf over half vier = 3:35, tien voor half vier = 3:20. Close to the full hour it anchors on the hour: tien over drie (3:10), tien voor vier (3:50). Sounds wild, becomes automatic with practice — say the time out loud every time you check your phone (free retrieval practice!).',
      ex: [['vijf voor half zes = 5:25', 'five to half six = 5:25'],
           ['tien over half vier = 3:40', 'ten past half four = 3:40']] },
    { h: 'Parts of the day & dates', p: 'The apostrophe-s words (from old Dutch "des"): ’s morgens/’s ochtends, ’s middags, ’s avonds, ’s nachts. Days: op maandag, maandagochtend. Dates use plain numbers: één mei, elf juli — Vandaag is het elf juli. Ordinals for rankings: de eerste, de tweede, de derde.',
      ex: [['Ik sport ’s morgens en ik lees ’s avonds.', 'I exercise in the morning and read in the evening.'],
           ['Op maandagochtend heb ik les.', 'I have class on Monday morning.']] }
  ],
  quiz: [
    { t: 'mc', q: '"Half vier" =', o: ['4:30', '3:30', '4:15'], a: 1, why: 'Half looks forward: half vier = half an hour before four = 3:30.' },
    { t: 'fill', q: '3:15 → Het is kwart ___ drie.', a: ['over'], why: 'Quarter past → kwart over.' },
    { t: 'fill', q: '7:45 → Het is kwart ___ acht.', a: ['voor'], why: 'Quarter to → kwart voor acht.' },
    { t: 'mc', q: '"Vijf voor half zes" =', o: ['5:25', '5:35', '6:25'], a: 0, why: 'Five minutes before half six (5:30) = 5:25.' },
    { t: 'fill', q: 'De les begint ___ negen uur. (at)', a: ['om'], why: 'At + clock time → om: om negen uur.' },
    { t: 'fill', q: 'Ik kijk ___ graag een film. (in the evening — two words)', a: ["'s avonds", 's avonds', 'savonds'], why: '’s avonds = in the evening (from old "des avonds").' },
    { t: 'mc', q: '___ zaterdag ga ik naar de markt.', o: ['Op', 'In', 'Aan'], a: 0, why: 'Days take op: op zaterdag.' },
    { t: 'mc', q: '"’s Nachts" means…', o: ['at night', 'tonight', 'last night'], a: 0, why: '’s nachts = at night (in general).' }
  ] },

{ id: 'a2_15', level: 'A2', title: 'vaak, nooit, graag, heel & te',
  read: [
    { h: 'How often? The ladder', p: 'altijd → meestal → vaak → soms → af en toe → zelden → bijna nooit → nooit. Position: after the finite verb and any pronouns: Ik sport vaak. Ik zie hem nooit. ⚠️ Nooit is already negative — never add niet: Ik ga nooit (not "nooit niet").',
      ex: [['Ik ga meestal met de fiets, maar soms met de bus.', 'I usually cycle, but sometimes take the bus.'],
           ['Hij komt altijd te laat.', 'He is always late.']] },
    { h: 'graag = like doing', p: 'Verb + graag = to like doing it: Ik zwem graag (I like swimming). Ik drink graag koffie. It sits in the same slot as vaak. You already know its comparative ladder: graag → liever → het liefst. Ordering politely: Ik wil graag…',
      ex: [['Ik kook graag, maar ik bak liever.', 'I like cooking, but I prefer baking.'],
           ['Zij werkt graag in de tuin.', 'She likes working in the garden.']] },
    { h: '⚠️ heel vs veel + te', p: 'Degree words tune adjectives: heel/erg/echt = very (heel lekker), best = quite, te = too — always negative (te duur = too expensive, sadly). The classic mix-up: heel = very (before adjectives), veel = much/many (before nouns): heel lekker ✓, veel koekjes ✓ — never "veel lekker".',
      ex: [['De soep is heel lekker, maar te zout.', 'The soup is very tasty, but too salty.'],
           ['Veel mensen vinden Nederlands heel moeilijk.', 'Many people find Dutch very difficult.']] }
  ],
  quiz: [
    { t: 'fill', q: 'Ik drink ___ een cappuccino in de ochtend. (like to)', a: ['graag'], why: 'Verb + graag = like doing: Ik drink graag…' },
    { t: 'mc', q: 'Correct:', o: ['Ik ga nooit niet naar de disco.', 'Ik ga nooit naar de disco.'], a: 1, why: 'Nooit is already negative — no extra niet.' },
    { t: 'mc', q: '___ mensen leren Nederlands. (many)', o: ['Heel', 'Veel'], a: 1, why: 'Before a noun → veel (many); heel = very, before adjectives.' },
    { t: 'mc', q: 'De soep is ___ lekker. (very)', o: ['veel', 'heel'], a: 1, why: 'Before an adjective → heel (very).' },
    { t: 'fill', q: 'Deze jas is ___ duur — ik koop hem niet. (too)', a: ['te'], why: 'te = too (negative): te duur.' },
    { t: 'mc', q: 'Word order:', o: ['Ik vaak ga naar de bioscoop.', 'Ik ga vaak naar de bioscoop.'], a: 1, why: 'V2 first, then the frequency adverb: Ik ga vaak…' },
    { t: 'fill', q: 'Hij komt ___ te laat — elke dag weer! (always)', a: ['altijd'], why: 'altijd = always: Hij komt altijd te laat.' },
    { t: 'mc', q: '"Ik zwem graag" =', o: ['I swim well', 'I like swimming', 'I want to swim now'], a: 1, why: 'graag = enjoy doing: I like swimming.' }
  ] },

{ id: 'a2_16', level: 'A2', title: 'veel, een beetje, een paar, genoeg, allebei',
  read: [
    { h: 'veel, weinig, een beetje, een paar', p: 'Veel (much/many) and weinig (little/few) work everywhere. Een beetje only with uncountables: een beetje suiker, een beetje tijd. Een paar only with countables: een paar vragen, een paar dagen. Test: can you count it? → een paar; can’t you? → een beetje.',
      ex: [['Mag ik een beetje melk in mijn koffie?', 'May I have a little milk in my coffee?'],
           ['Ik heb nog een paar vragen.', 'I still have a few questions.']] },
    { h: 'genoeg, te veel, nog', p: 'Genoeg can stand before or after its noun: genoeg tijd = tijd genoeg. Te veel / te weinig = too much / too little. Nog een = another: Nog een koffie? Mag ik nog wat water? (some more water).',
      ex: [['Heb je genoeg geld bij je? / Geld genoeg!', 'Do you have enough money on you? / Plenty!'],
           ['Ik heb te veel gegeten.', 'I have eaten too much.']] },
    { h: 'allebei & beide', p: 'Both: allebei stands on its own after the verb (Wij komen allebei. Ik wil ze allebei!), beide comes before a noun (Beide boeken zijn goed). In doubt, allebei is the natural spoken choice. And to ask amounts: Hoeveel kost dat? Hoeveel mensen komen er?',
      ex: [['Mijn broer en ik houden allebei van voetbal.', 'My brother and I both love football.'],
           ['Beide antwoorden zijn juist.', 'Both answers are correct.']] }
  ],
  quiz: [
    { t: 'mc', q: 'Wil je ___ melk in je koffie?', o: ['een paar', 'een beetje'], a: 1, why: 'Milk is uncountable → een beetje.' },
    { t: 'mc', q: 'Ik heb nog ___ vragen.', o: ['een beetje', 'een paar'], a: 1, why: 'Questions are countable → een paar.' },
    { t: 'fill', q: 'Heb je ___ geld bij je? Het restaurant is duur. (enough)', a: ['genoeg'], why: 'genoeg = enough: genoeg geld / geld genoeg.' },
    { t: 'fill', q: 'Au, mijn buik — ik heb ___ veel gegeten! (too)', a: ['te'], why: 'te veel = too much.' },
    { t: 'fill', q: 'Mag ik ___ een koffie? (another)', a: ['nog'], why: 'nog een = another: Nog een koffie?' },
    { t: 'mc', q: 'Mijn broer en ik houden ___ van voetbal.', o: ['beide', 'allebei'], a: 1, why: 'Standing alone after the verb → allebei.' },
    { t: 'mc', q: '___ boeken zijn interessant.', o: ['Allebei', 'Beide'], a: 1, why: 'Before a noun → beide: beide boeken.' },
    { t: 'fill', q: '___ mensen komen er vanavond? (how many)', a: ['hoeveel'], why: 'hoeveel = how many/much.' }
  ] },

{ id: 'a2_17', level: 'A2', title: 'Polite Dutch: u, mag ik, alstublieft',
  read: [
    { h: 'je or u?', p: 'U for strangers, older people, officials, customers: u bent, u hebt/heeft (both fine). Address people as meneer/mevrouw. When someone says "Zeg maar je/jij", you are officially invited to switch to informal. Flanders switches to informal a bit slower than the Netherlands — with ge/gij taking over among friends.',
      ex: [['Mevrouw, u bent de volgende.', 'Madam, you are next.'],
           ['Zeg maar gewoon je, hoor!', 'Just call me "je", really!']] },
    { h: 'The request ladder', p: 'From casual to very polite: Mag ik…? → Kan ik…? → Kunt u…? → Zou u … kunnen…? Each step adds distance and politeness. Ordering: Ik wil graag twee croissants. 🦁 The classic Flemish shop phrase uses a past tense for extra softness: Ik had graag een pistolet (gehad) — learn it, you will hear it every day in Belgium.',
      ex: [['Mag ik de rekening, alstublieft?', 'May I have the bill, please?'],
           ['🦁 Ik had graag twee pistolets gehad.', 'I would like two bread rolls. (BE shop style)']] },
    { h: 'alstublieft, bedankt & merci', p: 'Please: alstublieft (with u) / alsjeblieft (with je) — also said when HANDING something over ("here you are"). Thanks: dank u wel / dank je wel / bedankt; answer with graag gedaan (you’re welcome). 🦁 In Flanders merci is everywhere ("Merci, hé!"), often answered with graag gedaan or 🦁 "geen dank".',
      ex: [['Alstublieft, meneer. — Dank u wel!', 'Here you are, sir. — Thank you!'],
           ['🦁 Merci hé! — Graag gedaan.', 'Thanks! — You’re welcome. (BE)']] }
  ],
  quiz: [
    { t: 'fill', q: 'Formeel: ___ bent van harte welkom, mevrouw.', a: ['u'], why: 'Formal address → u bent.' },
    { t: 'fill', q: 'In de bakkerij: Ik wil ___ twee croissants.', a: ['graag'], why: 'Ordering politely: Ik wil graag…' },
    { t: 'mc', q: 'The politest request:', o: ['Geef me dat brood.', 'Mag ik dat brood?', 'Zou u mij dat brood kunnen geven?'], a: 2, why: 'Zou u … kunnen…? tops the politeness ladder.' },
    { t: 'mc', q: 'You hand a pen to a stranger:', o: ['alsjeblieft', 'alstublieft'], a: 1, why: 'Formal situation → alstublieft (also when handing something over).' },
    { t: 'mc', q: '🦁 The Flemish bakery classic:', o: ['Ik had graag een pistolet gehad.', 'Ik zal een pistolet gehad hebben.', 'Ik was graag een pistolet.'], a: 0, why: '"Ik had graag … (gehad)" = soft, very Belgian way to order.' },
    { t: 'fill', q: '"You’re welcome" = ___ gedaan.', a: ['graag'], why: 'graag gedaan = you’re welcome / my pleasure.' },
    { t: 'mc', q: '"Zeg maar jij" means…', o: ['Please address me informally', 'Say "jij" out loud now', 'Goodbye'], a: 0, why: 'An invitation to drop u and switch to je/jij.' },
    { t: 'fill', q: '___ ik u iets vragen, meneer? (may)', a: ['mag'], why: 'Polite question: Mag ik u iets vragen?' }
  ] },

{ id: 'a2_18', level: 'A2', title: 'honger hebben, jarig zijn: fixed expressions',
  read: [
    { h: 'hebben + bare noun', p: 'Dutch HAS what English IS: honger hebben (to be hungry), dorst, slaap, haast, gelijk (to be right), geluk (to be lucky), pijn, koorts — all without an article: Ik heb honger. Heb je haast? Plus the star pattern zin hebben in + noun / zin hebben om te + infinitive (to feel like).',
      ex: [['Ik heb honger én dorst.', 'I am hungry AND thirsty.'],
           ['Jij hebt gelijk — het is woensdag.', 'You are right — it is Wednesday.']] },
    { h: 'het + hebben', p: 'A small het sneaks into: het koud/warm hebben (Ik heb het koud = I am cold — never "Ik ben koud"!), het druk hebben (to be busy), het naar je zin hebben (to have a good time). Chunk the whole thing: HET-KOUD-HEBBEN.',
      ex: [['Brr, ik heb het koud!', 'Brr, I am cold!'],
           ['Sorry, ik heb het vandaag heel druk.', 'Sorry, I am very busy today.']] },
    { h: 'zijn-expressions', p: 'And some states ARE: jarig zijn (Ik ben jarig = it is my birthday!), klaar zijn (met) (to be finished), op zijn (used up: De melk is op), weg zijn (gone), open/dicht zijn, aan de beurt zijn (Wie is er aan de beurt? = whose turn is it?).',
      ex: [['Hij is vandaag jarig — proficiat!', 'It is his birthday today — congratulations!'],
           ['De melk is op, we moeten naar de winkel.', 'The milk is finished, we need to go to the shop.']] }
  ],
  quiz: [
    { t: 'fill', q: 'Ik heb ___ — is er nog brood? (hungry)', a: ['honger'], why: 'honger hebben = to be hungry.' },
    { t: 'mc', q: '"I am cold" =', o: ['Ik ben koud.', 'Ik heb het koud.'], a: 1, why: 'Fixed chunk: het koud hebben — "Ik ben koud" describes your personality!' },
    { t: 'fill', q: 'Hij is vandaag ___ — hij wordt dertig! (birthday)', a: ['jarig'], why: 'jarig zijn = to have your birthday.' },
    { t: 'fill', q: 'De melk is ___ — we moeten naar de winkel. (used up)', a: ['op'], why: 'op zijn = to be finished/used up.' },
    { t: 'fill', q: 'Heb je ___ in een pizza vanavond? (feel like)', a: ['zin'], why: 'zin hebben in + noun = to feel like.' },
    { t: 'mc', q: 'Jij hebt ___ — het is inderdaad woensdag.', o: ['gelijk', 'recht', 'juist'], a: 0, why: 'gelijk hebben = to be right.' },
    { t: 'mc', q: '"Ik heb het druk" =', o: ['I am busy', 'I feel pressure on me', 'The printer is working'], a: 0, why: 'het druk hebben = to be busy.' },
    { t: 'fill', q: 'Wie is er aan de ___? (whose turn is it)', a: ['beurt'], why: 'aan de beurt zijn = to be next / your turn.' }
  ] },

/* ═══════════════════════ B1 ═══════════════════════
   Expanded B1 module — 18 lessons.
   Built on evidence-based learning principles: retrieval practice
   (bigger quizzes with elaborative feedback), contrastive noticing
   (⚠️ error sections), chunking (fixed expressions taught as units)
   and spacing (feed hard items into the Anki tab).            */
{ id: 'b1_01', level: 'B1', title: 'The word "er" — five jobs',
  read: [
    { h: 'Place, subject, quantity', p: '1) Place (= daar, unstressed): Ik woon er al jaren. 2) Dummy subject with indefinite subjects: Er loopt een kat in de tuin. 3) Quantity, with numbers: Hoeveel heb je er? Ik heb er drie ("of them" — obligatory in Dutch!).',
      ex: [['Er staat een man aan de deur.', 'There is a man at the door.'],
           ['Ik heb er twee.', 'I have two (of them).']] },
    { h: 'With prepositions & passive', p: '4) Er + preposition replaces preposition + thing: Ik denk eraan. Ik ben er trots op. 5) Impersonal passive: Er wordt gelachen (there is laughing). Combining: prepositional er merges with another er — "Er wordt veel over gepraat", never "er wordt erover" — but quantitative er may sit next to one: Er zitten er twee in de doos.',
      ex: [['Denk je aan je afspraak? — Ja, ik denk eraan.', 'Are you thinking of your appointment? — Yes, I am.'],
           ['Er wordt hier hard gewerkt.', 'People work hard here.']] },
    { h: 'Where does er go?', p: 'Unstressed er hugs the finite verb: directly after it (Ik woon er al jaren), or directly after the subject in questions and inversion (Woon je er nog? Sinds 2020 woon ik er). Test: if you could stress the word in English ("I live THERE"), Dutch wants daar; if it is a colourless little "there", it is er. Er can never carry stress, never start an answer alone, and never be pointed at.',
      ex: [['Ik werk er sinds maart.', 'I have been working there since March.'],
           ['Ken je Brugge? — Ja, ik kom er vaak.', 'Do you know Bruges? — Yes, I go there often.'],
           ['Daar wil ik wonen, precies daar!', 'THERE is where I want to live, right there!']] },
    { h: '⚠️ The three classic mistakes', p: 'Hunt these in your own speech: 1) dropping quantitative er — "Ik heb drie" ✗ → Ik heb er drie ✓; 2) preposition + het for a thing — "Ik ben blij met het" ✗ → Ik ben er blij mee ✓; 3) opening with het instead of er — "Het is een pakje voor jou" ✗ → Er is een pakje voor jou ✓. 💡 Learning science: errors you notice and immediately repair are remembered best (error-driven learning) — say the wrong and the right version out loud as a pair.',
      ex: [['Hoeveel broers heb je? — Ik heb er één.', 'How many brothers do you have? — I have one.'],
           ['Ben je tevreden met je score? — Ja, ik ben er tevreden mee.', 'Happy with your score? — Yes, I am happy with it.']] }
  ],
  quiz: [
    { t: 'fill', q: 'Hoeveel katten heb je? — Ik heb ___ twee.', a: ['er'], why: 'Quantitative er is obligatory with numbers: "Ik heb er twee."' },
    { t: 'mc', q: '___ staat een fiets voor de deur.', o: ['Het', 'Er', 'Daar (unstressed)'], a: 1, why: 'Indefinite subject introduced → er.' },
    { t: 'fill', q: 'Ben je tevreden met het resultaat? — Ja, ik ben ___ tevreden mee.', a: ['er'], why: 'Er + preposition (er…mee) replaces "met het resultaat".' },
    { t: 'mc', q: '"Er wordt gedanst" means…', o: ['It is being danced (nonsense)', 'People are dancing', 'The dance happens tomorrow'], a: 1, why: 'Impersonal passive: an activity without a specific subject.' },
    { t: 'fill', q: 'Ik woon al vijf jaar in Gent en ik woon ___ heel graag.', a: ['er'], why: 'Unstressed place er replaces "in Gent": "ik woon er graag".' },
    { t: 'mc', q: 'Which answer to "Hoeveel kinderen hebben ze?" is wrong?', o: ['Ze hebben er drie.', 'Ze hebben drie.', 'Drie.'], a: 1, why: 'When the noun is dropped after a number, er is obligatory: "Ze hebben er drie."' },
    { t: 'fill', q: 'Praten jullie over de film? — Ja, we praten ___. (over + het, one word)', a: ['erover'], why: 'over + het → erover: "We praten erover."' },
    { t: 'mc', q: '"Er zitten er twee in de doos." The second er is…', o: ['place er', 'quantity er (= of them)', 'a mistake'], a: 1, why: 'Presentative er + quantitative er can co-occur: there are two of them in the box.' }
  ] },

{ id: 'b1_02', level: 'B1', title: 'Relative clauses: die & dat',
  read: [
    { h: 'die or dat', p: 'The relative pronoun matches the noun: de-words and all plurals → die; het-words singular → dat. The relative clause has subclause word order (verb final): De man die daar staat, is mijn buur.',
      ex: [['Het boek dat ik lees, is spannend.', 'The book I’m reading is exciting.'],
           ['De mensen die hier wonen, zijn vriendelijk.', 'The people who live here are friendly.']] },
    { h: 'wie and wat', p: 'Wat after alles, iets, niets, dat and after a whole clause: Alles wat je zegt… Dat is iets wat ik niet begrijp. Wie for people after a preposition: de vrouw met wie ik werk.',
      ex: [['Er is niets wat ik liever doe.', 'There is nothing I’d rather do.'],
           ['De collega met wie ik samenwerk, is ziek.', 'The colleague I work with is ill.']] },
    { h: 'Position: glue it to the noun', p: 'The relative clause comes immediately after its noun, even when the main clause has to wait: De koffie die ik gemaakt heb, is koud. Never let the main verb sneak into the relative clause — inside it the verbs pile up at the end (gemaakt heb / heb gemaakt: both orders are correct). A comma usually closes the clause before the main sentence resumes.',
      ex: [['De koffie die ik gemaakt heb, is al koud.', 'The coffee I made is already cold.'],
           ['De buurman die naast ons woont, heeft twee honden.', 'The neighbour who lives next to us has two dogs.']] },
    { h: '⚠️ dat vs wat — the exam traps', p: 'After a concrete het-word the standard language wants dat, not wat: het boek dat ik lees (spoken Dutch often says wat — exams count it wrong). But after a superlative used without a noun → wat: het mooiste wat ik ooit gezien heb. 💡 Contrast pairs like "het boek dat…" vs "het beste wat…" are ideal flashcards: your brain learns categories fastest from minimal pairs.',
      ex: [['Dat is het beste wat me ooit is overkomen.', 'That is the best thing that ever happened to me.'],
           ['Het liedje dat je hoorde, is van Stromae.', 'The song you heard is by Stromae.']] }
  ],
  quiz: [
    { t: 'mc', q: 'Het huis ___ te koop staat, is oud.', o: ['die', 'dat', 'wat'], a: 1, why: 'Het huis → dat.' },
    { t: 'mc', q: 'De trein ___ naar Brussel rijdt, heeft vertraging.', o: ['die', 'dat'], a: 0, why: 'De trein → die.' },
    { t: 'fill', q: 'Alles ___ hij zegt, is waar.', a: ['wat'], why: 'After alles → wat.' },
    { t: 'mc', q: 'De vriend ___ ik op reis ga…', o: ['met die', 'met wie', 'waarmee'], a: 1, why: 'Person after preposition → met wie (waarmee is for things).' },
    { t: 'mc', q: 'Dat is het mooiste ___ ik ooit heb gezien.', o: ['dat', 'wat', 'die'], a: 1, why: 'After a superlative without a noun → wat.' },
    { t: 'fill', q: 'Het meisje ___ daar fietst, is mijn nichtje.', a: ['dat'], why: 'Het meisje is grammatically neuter → dat (grammar beats natural gender).' },
    { t: 'mc', q: 'Which is correct standard Dutch?', o: ['De koffie die heb ik gemaakt, is koud.', 'De koffie die ik gemaakt heb, is koud.'], a: 1, why: 'Relative clause = subclause order: verbs at the end, no inversion inside.' },
    { t: 'mc', q: 'Er is iets ___ ik je moet vertellen.', o: ['dat', 'wat', 'die'], a: 1, why: 'After iets → wat.' }
  ] },

{ id: 'b1_03', level: 'B1', title: 'Relatives with prepositions: waar + prep',
  read: [
    { h: 'Things: waar + preposition', p: 'For things, preposition + die/dat is impossible — merge into waar+prep: het project waaraan ik werk; de stoel waarop je zit. The parts may split: de stoel waar je op zit.',
      ex: [['De cursus waarvoor ik betaal, is goed.', 'The course I pay for is good.'],
           ['Het liedje waarnaar we luisteren…', 'The song we’re listening to…']] },
    { h: 'met → waarmee, tot → waartoe', p: 'Note the fused forms: met → waarmee, tot → waartoe. Same logic for question words: Waarmee schrijf je? (With what do you write?). For people keep prep + wie: met wie, voor wie.',
      ex: [['De pen waarmee ik schrijf, is leeg.', 'The pen I write with is empty.'],
           ['Waarover praten jullie?', 'What are you talking about?']] },
    { h: 'Pure place: waar alone', p: 'When the meaning is simply location, waar stands on its own — no preposition needed: de stad waar ik woon, het land waar zij vandaan komt (waar … vandaan = where … from). Compare: de stad waar ik woon (place) vs de baan waarvoor ik verhuis (verhuizen voor iets).',
      ex: [['De stad waar ik geboren ben, ligt aan de kust.', 'The city where I was born lies on the coast.'],
           ['Het dorp waar hij vandaan komt, is piepklein.', 'The village he comes from is tiny.']] },
    { h: '💡 Split or fused? Register', p: 'Fused (waarmee, waarover) sounds neutral-to-formal and is the safe choice in writing; split (waar … mee, waar … over) is what you hear in conversation. For people, standard writing wants prep + wie (de man met wie ik praat); spoken Flemish happily says "de man waarmee ik praat" — understand it, avoid it in exam writing. Memory hook: things → WAAR, people → WIE.',
      ex: [['Waar denk je aan? = Waaraan denk je?', 'What are you thinking about? (split = spoken, fused = written)'],
           ['de klant voor wie ik dit maak', 'the client I am making this for']] }
  ],
  quiz: [
    { t: 'fill', q: 'Het bedrijf ___ ik werk, groeit snel. (voor)', a: ['waarvoor'], why: 'Thing + voor → waarvoor.' },
    { t: 'mc', q: 'De muziek ___ we dansen…', o: ['op die', 'waarop', 'op wat'], a: 1, why: 'Thing + op → waarop.' },
    { t: 'fill', q: 'De vork ___ ik eet… (met)', a: ['waarmee'], why: 'met fuses to waarmee.' },
    { t: 'mc', q: 'Correct for a person:', o: ['de man waarmee ik praat', 'de man met wie ik praat'], a: 1, why: 'Standard language prefers met wie for people (waarmee is common in speech but informal).' },
    { t: 'fill', q: 'De stad ___ ik geboren ben, ligt in Vlaanderen. (place)', a: ['waar'], why: 'Pure location → waar alone, no preposition.' },
    { t: 'fill', q: 'Waar kijk je ___? (naar — split question)', a: ['naar'], why: 'Split pronominal question: "Waar kijk je naar?" = What are you looking at?' },
    { t: 'mc', q: 'Formal writing, about a laptop:', o: ['de laptop waarmee ik werk', 'de laptop met wie ik werk', 'de laptop met die ik werk'], a: 0, why: 'Thing → waarmee; met wie is only for people.' },
    { t: 'fill', q: 'Het land ___ zij vandaan komt, is Marokko.', a: ['waar'], why: '"waar … vandaan" = where … from: waar alone before vandaan.' }
  ] },

{ id: 'b1_04', level: 'B1', title: 'The passive: worden & zijn',
  read: [
    { h: 'worden + participle', p: 'Active: De bakker bakt het brood. Passive: Het brood wordt (door de bakker) gebakken. Imperfect: werd gebakken. The doer takes door.',
      ex: [['De huizen worden volgend jaar gerenoveerd.', 'The houses will be renovated next year.'],
           ['Ik werd door een vriend uitgenodigd.', 'I was invited by a friend.']] },
    { h: 'Perfect passive: zijn (no geworden)', p: 'In the perfect, Dutch drops "geworden": Het brood is gebakken (= has been baked). So "is + participle" can be a completed passive — context tells you whether it’s a state or an event.',
      ex: [['De fout is gisteren ontdekt.', 'The mistake was discovered yesterday.'],
           ['De deur is al gesloten.', 'The door is already closed / has been closed.']] },
    { h: 'When natives reach for it', p: 'Use the passive when the doer is unknown, obvious or unimportant, and the action itself is the news: Mijn fiets is gestolen (who cares who did it — the bike is gone!). Typical habitats: news reports, instructions, formal letters. With an indefinite subject the sentence starts with er: Er worden hier veel huizen gebouwd. In casual speech an active sentence with ze or men often sounds more natural.',
      ex: [['Mijn fiets is gisteren gestolen.', 'My bike was stolen yesterday.'],
           ['Er worden hier veel appartementen gebouwd.', 'A lot of flats are being built here.']] },
    { h: '💡 The full tense map', p: 'One frame, four tenses: het huis wordt gebouwd (is being built) · werd gebouwd (was being built) · is gebouwd (has been built) · was gebouwd (had been built). Future/modal: zal worden gebouwd, moet worden gebouwd. Drill the frame with one verb until it is automatic, then swap verbs in — pattern drills with variation beat memorising isolated sentences.',
      ex: [['De brug werd in 1930 gebouwd en is nooit gerenoveerd.', 'The bridge was built in 1930 and has never been renovated.'],
           ['De brief was al verstuurd toen ik het merkte.', 'The letter had already been sent when I noticed.']] }
  ],
  quiz: [
    { t: 'fill', q: 'Deze kerk ___ in 1300 gebouwd. (past)', a: ['werd'], why: 'Simple past passive → werd + participle.' },
    { t: 'mc', q: '"The email has been sent" =', o: ['De e-mail is verstuurd geworden.', 'De e-mail is verstuurd.'], a: 1, why: 'Perfect passive drops geworden: "is verstuurd".' },
    { t: 'fill', q: 'Het gras wordt elke week ___. (maaien)', a: ['gemaaid'], why: 'worden + participle: gemaaid.' },
    { t: 'mc', q: 'The doer in a passive sentence is introduced by…', o: ['van', 'door', 'bij'], a: 1, why: '"door": Het boek werd door haar geschreven.' },
    { t: 'fill', q: '___ worden hier veel appartementen gebouwd.', a: ['er'], why: 'Indefinite subject in the passive → the sentence opens with er.' },
    { t: 'mc', q: '"De brief was al verstuurd toen ik aankwam." The tense is…', o: ['perfect passive', 'past perfect passive', 'present passive'], a: 1, why: 'was + participle = past perfect passive: had already been sent.' },
    { t: 'fill', q: 'De regels moeten ___ gevolgd. (infinitive of the passive auxiliary)', a: ['worden'], why: 'Modal + worden + participle: moeten worden gevolgd.' },
    { t: 'mc', q: 'Most natural report of a theft:', o: ['Mijn fiets is gisteren gestolen.', 'Iemand heeft gisteren door iemand mijn fiets gestolen.'], a: 0, why: 'Unknown doer, the event is the news → passive.' }
  ] },

{ id: 'b1_05', level: 'B1', title: 'Conjunctions: two word orders',
  read: [
    { h: 'Coordinating: no change', p: 'en, maar, of, want, dus join two MAIN clauses — word order stays V2: Ik blijf thuis, want ik ben ziek.',
      ex: [['Hij is moe, maar hij werkt door.', 'He is tired, but he keeps working.'],
           ['Het regent, dus nemen we de bus. / dus we nemen de bus.', 'It’s raining, so we take the bus.']] },
    { h: 'Subordinating: verb final', p: 'omdat, hoewel, terwijl, zodra, voordat, nadat, zodat, tenzij, toen… → verb to the end. Meaning pairs to watch: want/omdat (because), maar/hoewel (but/although), of = "or" ánd "whether/if".',
      ex: [['Ik weet niet of hij komt.', 'I don’t know whether he’s coming.'],
           ['Zodra ik thuis ben, bel ik je.', 'As soon as I’m home, I’ll call you.']] },
    { h: '💡 Position zero', p: 'Why no inversion after maar/want/en? They sit in "position 0" — outside the sentence — so position 1 is still free: Maar (0) ik (1) blijf (2) thuis. Adverbs like daarom, toch, daarna DO fill position 1 → inversion follows: Daarom blijf ik thuis. This single insight solves the classic exam trap want vs daarom and maar vs toch. Note dus is a hybrid: both "dus we nemen de bus" (position 0) and "dus nemen we de bus" (position 1) are correct.',
      ex: [['Hij is ziek, dus hij komt niet. / dus komt hij niet.', 'He is ill, so he is not coming. (both orders fine)'],
           ['Ik was moe. Toch ben ik gekomen.', 'I was tired. Still, I came.']] },
    { h: 'Pair conjunctions', p: 'B1 texts love correlative pairs: zowel … als (both … and), niet alleen … maar ook (not only … but also), of … of (either … or), noch … noch (neither … nor, formal). The verb agrees with the nearest subject in of…of / noch…noch; zowel…als usually takes a plural verb.',
      ex: [['Ze leert niet alleen Nederlands, maar ook Frans.', 'She learns not only Dutch but also French.'],
           ['Zowel mijn broer als mijn zus woont in Gent.', 'Both my brother and my sister live in Ghent.']] }
  ],
  quiz: [
    { t: 'mc', q: 'Ik blijf binnen, want ___.', o: ['het regent', 'het regent hard vandaag → regent het', 'regent het'], a: 0, why: 'Want = coordinating → normal V2: "want het regent".' },
    { t: 'mc', q: 'Ik blijf binnen omdat ___.', o: ['het regent', 'regent het', 'het aan het regenen'], a: 0, why: 'Omdat sends the verb to the end: "omdat het regent" — here that happens to look identical; the verb regent is final.' },
    { t: 'fill', q: 'Ik weet niet ___ zij morgen komt. (whether)', a: ['of'], why: '"Of" = whether in indirect questions.' },
    { t: 'mc', q: '___ hij rijk is, leeft hij zuinig. (although)', o: ['Maar', 'Hoewel', 'Want'], a: 1, why: 'Hoewel = although (subordinating).' },
    { t: 'mc', q: 'After "dus" you may use…', o: ['only inversion (dus nemen we…)', 'only normal order (dus we nemen…)', 'both orders'], a: 2, why: 'Dus works as coordinator (position 0) and as adverb (position 1) — both are standard.' },
    { t: 'mc', q: 'Ze spreekt niet alleen Engels, ___ ook Spaans.', o: ['maar', 'en', 'of'], a: 0, why: 'Correlative pair: niet alleen … maar ook.' },
    { t: 'fill', q: 'Hij is ziek, ___ hij komt niet. (so — no inversion follows)', a: ['dus'], why: 'Dus in position 0 → normal order: "dus hij komt niet".' },
    { t: 'mc', q: 'Which word forces inversion when it opens the sentence?', o: ['maar', 'want', 'daarom'], a: 2, why: 'Daarom is an adverb in position 1 → verb second, subject third.' }
  ] },

{ id: 'b1_06', level: 'B1', title: 'Indirect speech & questions',
  read: [
    { h: 'dat / of', p: 'Statements → dat-clause: Hij zegt dat hij moe is. Yes/no questions → of: Ze vraagt of ik kom. Verb goes to the end; watch pronoun and tense shifts like in English.',
      ex: [['Ze zei dat ze geen tijd had.', 'She said she had no time.'],
           ['Hij vraagt of we morgen vrij zijn.', 'He asks whether we are free tomorrow.']] },
    { h: 'Question-word clauses', p: 'WH-questions keep their question word, subclause order: Ik weet niet waar hij woont. Never invert inside: NOT "waar woont hij" as a subclause.',
      ex: [['Weet jij hoe laat de winkel opengaat?', 'Do you know what time the shop opens?'],
           ['Ik vraag me af waarom dat gebeurd is.', 'I wonder why that happened.']] },
    { h: 'Tense: shift or keep?', p: 'After a past reporting verb, shift the tense back like in English: "Ik ben moe" → Ze zei dat ze moe was; zal → zou. But Dutch happily keeps the present when the fact is still true now: Ze zei dat ze in Gent woont (she still lives there). English forces the shift; Dutch lets you choose based on meaning — a nuance examiners love.',
      ex: [['Ze zei dat ze zou komen.', 'She said she would come.'],
           ['Hij zei dat hij in Antwerpen woont.', 'He said he lives in Antwerp. (still true)']] },
    { h: 'Reporting requests & commands', p: 'A question about willingness: vragen of — Hij vroeg of ik wilde helpen. A polite request: vragen om te + infinitive — Ze vroeg me om haar te helpen. A command or advice: zeggen/moeten — De dokter zei dat ik moest rusten. Learn these three frames as chunks; they cover nearly every reported interaction at B1.',
      ex: [['Ze vroeg me om de deur dicht te doen.', 'She asked me to close the door.'],
           ['De leraar zei dat we stil moesten zijn.', 'The teacher said we had to be quiet.']] }
  ],
  quiz: [
    { t: 'fill', q: 'Hij zegt ___ hij ziek is.', a: ['dat'], why: 'Indirect statement → dat.' },
    { t: 'fill', q: 'Zij vraagt ___ ik morgen kan komen.', a: ['of'], why: 'Indirect yes/no question → of.' },
    { t: 'mc', q: 'Correct indirect question:', o: ['Ik weet niet waar woont hij.', 'Ik weet niet waar hij woont.'], a: 1, why: 'Subclause order: subject before verb, verb final.' },
    { t: 'mc', q: '"Ze zei dat ze morgen ___ komen."', o: ['zal', 'zou'], a: 1, why: 'Past reporting verb → zou (tense shift).' },
    { t: 'fill', q: '"Woon je hier?" → Hij vroeg ___ ik hier woonde.', a: ['of'], why: 'Reported yes/no question → of.' },
    { t: 'fill', q: 'De leraar zei dat we stil ___ zijn. (reported command, past)', a: ['moesten'], why: 'Commands are reported with moeten: "…dat we stil moesten zijn".' },
    { t: 'mc', q: '"Hij zei dat hij in Gent woont." This is…', o: ['wrong — must be woonde', 'fine — the fact is still true', 'only correct in Flanders'], a: 1, why: 'Dutch may keep the present tense when the reported fact still holds.' },
    { t: 'mc', q: '"She asked me to call her" =', o: ['Ze vroeg me om haar te bellen.', 'Ze vroeg me haar bellen.', 'Ze vroeg dat ik bel haar.'], a: 0, why: 'Polite request → vragen om te + infinitive.' }
  ] },

{ id: 'b1_07', level: 'B1', title: 'Conditionals with zou',
  read: [
    { h: 'zou = would', p: 'Zou/zouden + infinitive expresses hypothesis, politeness and desire: Ik zou graag een koffie willen. Dat zou leuk zijn. Polite requests: Zou je me kunnen helpen?',
      ex: [['Ik zou dat nooit doen.', 'I would never do that.'],
           ['Zou u dat kunnen herhalen?', 'Could you repeat that, please?']] },
    { h: 'Als-sentences', p: 'Realistic: Als het regent, blijven we thuis (present). Hypothetical: Als ik rijk was, zou ik reizen (past tense in the als-clause + zou). Very common alternative: double past — Als ik rijk was, reisde ik de wereld rond.',
      ex: [['Als ik jou was, zou ik het vragen.', 'If I were you, I would ask.'],
           ['Als we tijd hadden, zouden we langskomen.', 'If we had time, we would drop by.']] },
    { h: 'Regret: past hypotheticals', p: 'For things that did NOT happen, use the past perfect in the als-clause and zou(den) + hebben/zijn + infinitive — or simply a second past perfect: Als ik het had geweten, zou ik gekomen zijn / was ik gekomen. Both are standard; the double past perfect is shorter and very common in speech.',
      ex: [['Als ik het had geweten, was ik gekomen.', 'If I had known, I would have come.'],
           ['Als je harder had gestudeerd, zou je geslaagd zijn.', 'If you had studied harder, you would have passed.']] },
    { h: '💡 dan & the word-order reflex', p: 'After a fronted als-clause the main clause inverts — the whole als-clause counts as position 1: Als het regent, (dan) blijven we thuis. The little dan is optional and just echoes the condition. Train the reflex: als-clause → comma → verb. Say five of your own als-sentences out loud today; producing them (retrieval practice) cements the pattern far better than rereading rules.',
      ex: [['Als het sneeuwt, dan nemen we de trein.', 'If it snows, (then) we take the train.'],
           ['Als je wint, krijg je een prijs.', 'If you win, you get a prize.']] }
  ],
  quiz: [
    { t: 'fill', q: 'Als ik jou ___, zou ik gaan. (zijn, past)', a: ['was'], why: 'Hypothetical als-clause takes the simple past: "Als ik jou was…".' },
    { t: 'fill', q: '___ je het raam kunnen sluiten? (polite)', a: ['zou'], why: 'Polite request: "Zou je … kunnen …?".' },
    { t: 'mc', q: '"Dat ___ fantastisch zijn!"', o: ['zal', 'zou', 'zult'], a: 1, why: 'Hypothetical → zou: "Dat zou fantastisch zijn!"' },
    { t: 'mc', q: 'Realistic condition:', o: ['Als het sneeuwt, zouden we skiën gingen.', 'Als het sneeuwt, gaan we skiën.'], a: 1, why: 'Realistic conditions use the present in both halves.' },
    { t: 'fill', q: 'Als ik het had geweten, ___ ik je geholpen hebben.', a: ['zou'], why: 'Past hypothetical: zou + hebben + participle group.' },
    { t: 'mc', q: 'Which sentence talks about something that did NOT happen?', o: ['Als ik tijd heb, kom ik.', 'Als ik tijd had gehad, was ik gekomen.'], a: 1, why: 'Past perfect in both halves = unreal past: I did not have time, so I did not come.' },
    { t: 'fill', q: 'Als je wint, ___ je een prijs. (krijgen)', a: ['krijg'], why: 'Als-clause first → inversion in the main clause: "…, krijg je een prijs."' },
    { t: 'mc', q: 'Very polite: "___ ik u iets mogen vragen?"', o: ['Zou', 'Zal', 'Wil'], a: 0, why: 'Zou + mogen = the politest request frame in Dutch.' }
  ] },

{ id: 'b1_08', level: 'B1', title: 'te + infinitive constructions',
  read: [
    { h: 'Verbs that need te', p: 'proberen, beloven, vergeten, weigeren, besluiten, hopen, hoeven + te: Hij weigert te betalen. With separable verbs te goes inside: Ze besluit mee te doen.',
      ex: [['Ik hoop je snel te zien.', 'I hope to see you soon.'],
           ['Je hoeft niet te wachten.', 'You don’t need to wait.']] },
    { h: 'Without te / zonder te', p: 'No te after modals, laten, gaan, komen, blijven, zien, horen: Ik laat mijn fiets repareren. Ik zie hem lopen. Fixed: zonder te (without -ing), in plaats van te (instead of -ing).',
      ex: [['Hij vertrok zonder iets te zeggen.', 'He left without saying anything.'],
           ['Ik hoor de buren zingen.', 'I hear the neighbours singing.']] },
    { h: 'door te = by …-ing', p: 'Door te + infinitive says HOW something is achieved: Je leert een taal door veel te luisteren (by listening a lot). Same family: zonder te (without …-ing), in plaats van te (instead of …-ing), om te (in order to). These four preposition + te frames carry a huge share of B1 writing tasks — learn them as one set.',
      ex: [['Je wordt beter door elke dag te oefenen.', 'You get better by practising every day.'],
           ['Hij nam de auto in plaats van te fietsen.', 'He took the car instead of cycling.']] },
    { h: '💡 Chunk strategy', p: 'Do not memorise a rule list — memorise chunks: proberen te, vergeten te, beloven te, weigeren te, besluiten te, hopen te, hoeven te (only with negation!). Native speakers store these as single units (collocational chunking), which is why they never hesitate. Put each chunk on a card with your own example sentence and let the app’s spaced repetition do the scheduling.',
      ex: [['Ik probeer elke dag Nederlands te spreken.', 'I try to speak Dutch every day.'],
           ['Ze beloofde op tijd te komen.', 'She promised to come on time.']] }
  ],
  quiz: [
    { t: 'mc', q: 'Ik probeer elke dag ___ .', o: ['sporten', 'te sporten'], a: 1, why: 'proberen + te + infinitive.' },
    { t: 'mc', q: 'Ik laat mijn haar ___ .', o: ['knippen', 'te knippen'], a: 0, why: 'laten + bare infinitive: "laten knippen".' },
    { t: 'fill', q: 'Hij ging weg zonder gedag ___ zeggen.', a: ['te'], why: 'zonder te + infinitive.' },
    { t: 'mc', q: 'With separable "opgeven":', o: ['Ze belooft niet op te geven.', 'Ze belooft niet te opgeven.'], a: 0, why: 'Te goes inside separable verbs: op te geven.' },
    { t: 'fill', q: 'Je wordt beter ___ elke dag te oefenen. (by)', a: ['door'], why: 'door te + infinitive = by …-ing.' },
    { t: 'mc', q: 'Hij nam de lift in plaats van ___ .', o: ['de trap te nemen', 'de trap nemen'], a: 0, why: 'in plaats van te + infinitive.' },
    { t: 'mc', q: 'Ik hoef vandaag niet ___ .', o: ['werken', 'te werken'], a: 1, why: 'hoeven always takes te: niet hoeven te werken.' },
    { t: 'fill', q: 'Zij vergat de deur ___ sluiten.', a: ['te'], why: 'vergeten + te + infinitive.' }
  ] },

{ id: 'b1_09', level: 'B1', title: 'Pronominal adverbs: eraan, ermee, waarvan',
  read: [
    { h: 'Never "aan het" for things', p: 'Preposition + het/dat/dit is replaced: aan het → eraan (or daaraan/hieraan stressed). Ik denk eraan. Daar ben ik trots op. In questions: waaraan/waarvan (or split: Waar denk je aan?).',
      ex: [['Ik ben ermee akkoord.', 'I agree with it.'],
           ['Daar heb ik geen zin in.', 'I don’t feel like that.']] },
    { h: 'Splitting', p: 'The parts usually split around other material: Ik denk er vaak aan. Waar ben je mee bezig? The er-part comes early, the preposition lands near the end.',
      ex: [['Ik kijk er echt naar uit.', 'I’m really looking forward to it.'],
           ['Waar ben je bang voor?', 'What are you afraid of?']] },
    { h: '⚠️ People keep their pronoun', p: 'Er/daar/waar + preposition is for THINGS and ideas only. For people, keep preposition + pronoun: Ik denk aan hem (not eraan), Ik ben trots op haar (not erop). Mixed cases (a team, a company) can go either way, but when in doubt about a human: aan hem, op haar, met hen.',
      ex: [['Ik denk vaak aan haar.', 'I often think of her.'],
           ['Ik werk graag met hem samen.', 'I like working together with him.']] },
    { h: 'The full ladder: er / daar / hier + ergens / nergens / overal', p: 'Unstressed er, pointing daar (that), nearby hier (this): Daar hou ik niet van (THAT I don’t like). The indefinites join the same system: ergens/nergens/overal + preposition — Ik ben nergens bang voor (I fear nothing), Zij weet overal iets van (she knows something about everything).',
      ex: [['Wil je suiker? — Nee, daar hou ik niet van.', 'Sugar? — No, I don’t like that.'],
           ['Ik ben nergens bang voor.', 'I’m not afraid of anything.']] }
  ],
  quiz: [
    { t: 'mc', q: '"I agree with it" =', o: ['Ik ben akkoord met het.', 'Ik ben ermee akkoord.'], a: 1, why: 'met + het → ermee.' },
    { t: 'fill', q: 'Ik kijk ___ naar uit. (split, unstressed)', a: ['er'], why: 'Split pronominal adverb: "Ik kijk er … naar uit."' },
    { t: 'fill', q: '___ denk je aan? (question, split)', a: ['waar'], why: '"Waar denk je aan?" = What are you thinking about?' },
    { t: 'mc', q: 'Stressed variant of "eraan" pointing to something just mentioned:', o: ['hieraan/daaraan', 'eraan blijft', 'aan dat'], a: 0, why: 'Stressed: daaraan (that) / hieraan (this).' },
    { t: 'mc', q: '"I often think of her" =', o: ['Ik denk er vaak aan.', 'Ik denk vaak aan haar.'], a: 1, why: 'People keep preposition + pronoun: aan haar, never eraan.' },
    { t: 'fill', q: 'Ik ben ___ bang voor — echt helemaal niets! (afraid of nothing)', a: ['nergens'], why: 'nergens + preposition: "Ik ben nergens bang voor."' },
    { t: 'mc', q: 'Wil je melk in je thee? — Nee, ___ hou ik niet van.', o: ['daar', 'er', 'het'], a: 0, why: 'Stressed, pointing back at the idea → daar: "Daar hou ik niet van."' },
    { t: 'fill', q: 'Ik ben er al de hele dag ___ bezig. (met)', a: ['mee'], why: 'Split er + met → er … mee: "Ik ben er … mee bezig."' }
  ] },

{ id: 'b1_10', level: 'B1', title: 'Fixed verb + preposition pairs',
  read: [
    { h: 'Learn verb + prep as one unit', p: 'wachten op (wait for), denken aan (think of), houden van (love), zoeken naar (search for), luisteren naar, kijken naar, vragen om, geloven in, lijken op (resemble), zorgen voor (take care of).',
      ex: [['Ik wacht al een uur op de bus.', 'I’ve been waiting for the bus for an hour.'],
           ['Zij lijkt op haar moeder.', 'She resembles her mother.']] },
    { h: 'More pairs + usage', p: 'zich verheugen op (look forward to), afhangen van (depend on), deelnemen aan (participate in), twijfelen aan (doubt), genieten van (enjoy). Combine with er/waar: Waar wacht je op? Ik geniet ervan.',
      ex: [['Dat hangt van het weer af.', 'That depends on the weather.'],
           ['Ik neem deel aan de cursus.', 'I take part in the course.']] },
    { h: 'Adjective + preposition', p: 'Adjectives pick fixed prepositions too: trots op (proud of), bang voor (afraid of), blij met (happy with), tevreden over/met (satisfied with), geïnteresseerd in, goed/slecht in (good/bad at), gek op (crazy about), jaloers op, verantwoordelijk voor. Notice the mismatches with English: good AT = goed IN, afraid OF = bang VOOR.',
      ex: [['Ik ben trots op mijn dochter.', 'I am proud of my daughter.'],
           ['Hij is goed in wiskunde, maar slecht in talen.', 'He is good at maths but bad at languages.']] },
    { h: '💡 How to actually memorise these', p: 'Cognitive science, applied: 1) Chunk — store "wachten op" as ONE word, never as verb + separate preposition. 2) Personalise — write your own true sentence for each pair (self-generated examples stick far better). 3) Test, don’t reread — retrieval practice beats reviewing lists (the testing effect). 4) Space it — add each pair as a card in the Anki tab and let FSRS schedule the review right before you would forget (the spacing effect). 5) Group by preposition: the op-family (wachten op, trots op, gek op, jaloers op) becomes one mental drawer.',
      ex: [['Waar ben je gek op? — Ik ben gek op frieten.', 'What are you crazy about? — I love fries.'],
           ['Ik ben tevreden over mijn vooruitgang.', 'I am satisfied with my progress.']] }
  ],
  quiz: [
    { t: 'fill', q: 'Ik wacht ___ de trein.', a: ['op'], why: 'wachten op = to wait for.' },
    { t: 'fill', q: 'Zij houdt ___ chocolade.', a: ['van'], why: 'houden van = to love.' },
    { t: 'fill', q: 'Dat hangt ___ jou af.', a: ['van'], why: 'afhangen van = to depend on.' },
    { t: 'fill', q: 'Hij lijkt ___ zijn vader.', a: ['op'], why: 'lijken op = to resemble.' },
    { t: 'fill', q: 'Ik ben trots ___ jou.', a: ['op'], why: 'trots op = proud of.' },
    { t: 'fill', q: 'Zij is geïnteresseerd ___ geschiedenis.', a: ['in'], why: 'geïnteresseerd in = interested in.' },
    { t: 'fill', q: 'Hij is bang ___ spinnen.', a: ['voor'], why: 'bang voor = afraid of.' },
    { t: 'fill', q: 'Mijn zoon is heel goed ___ wiskunde. (at)', a: ['in'], why: 'goed in = good at — Dutch uses in, not "at".' }
  ] },

{ id: 'b1_11', level: 'B1', title: 'Word order: the middle field (Time–Manner–Place)',
  read: [
    { h: 'TeMPo: Time – Manner – Place', p: 'Between the verb in position 2 and the verbs at the end lies the "middle field". Its default order is Time, then Manner, then Place: Ik ga morgen (T) met de trein (M) naar Brussel (P). English does the opposite (place before time), which produces the number-one interference error: "Ik ga naar school morgen" ✗. Memory hook: Dutch keeps the TeMPo.',
      ex: [['Ik ga morgen met de trein naar Brussel.', 'I am going to Brussels by train tomorrow.'],
           ['Wij eten vanavond gezellig in de keuken.', 'Tonight we are having a cosy dinner in the kitchen.']] },
    { h: 'Pronouns race to the front', p: 'Unstressed object pronouns (me, je, het, hem, haar, ze) and er come as early as possible — right after the finite verb (or after the subject in inversion): Ik heb het gisteren gekocht. Ik zie hem vaak in de stad. Full nouns follow later: Ik heb gisteren een boek gekocht. Rule of thumb: known & light information early, new & heavy information late.',
      ex: [['Ik heb het gisteren gekocht.', 'I bought it yesterday.'],
           ['Ik heb haar vorige week in Gent gezien.', 'I saw her in Ghent last week.']] },
    { h: '⚠️ Interference errors', p: 'Three to unlearn: 1) time after place — "Ik was in Brussel gisteren" ✗ → Ik was gisteren in Brussel ✓; 2) pronoun left late — "Ik heb gisteren het gekocht" ✗ → Ik heb het gisteren gekocht ✓; 3) breaking the verbal bracket — "Ik heb gekocht een boek" ✗ → the participle stays at the end. 💡 Contrastive noticing: your brain only fixes word order once it consciously registers the difference — read a Dutch sentence, predict the order, then check.',
      ex: [['Ik was gisteren met vrienden in Antwerpen.', 'I was in Antwerp with friends yesterday.'],
           ['Zij heeft het me nooit verteld.', 'She never told me (it).']] }
  ],
  quiz: [
    { t: 'mc', q: 'Pick the natural sentence:', o: ['Ik ga morgen met de fiets naar het werk.', 'Ik ga naar het werk morgen met de fiets.', 'Ik ga met de fiets morgen naar het werk.'], a: 0, why: 'Time – Manner – Place: morgen · met de fiets · naar het werk.' },
    { t: 'mc', q: 'Where does "haar" go? ', o: ['Ik heb gisteren haar gezien.', 'Ik heb haar gisteren gezien.'], a: 1, why: 'Unstressed pronouns come right after the finite verb, before time.' },
    { t: 'mc', q: 'The standard middle-field order is…', o: ['place – manner – time', 'time – manner – place', 'manner – time – place'], a: 1, why: 'TeMPo: Time, Manner, Place.' },
    { t: 'mc', q: 'Zij reist ___ naar Spanje.', o: ['volgende week met het vliegtuig', 'met het vliegtuig volgende week'], a: 0, why: 'Time (volgende week) before manner (met het vliegtuig).' },
    { t: 'mc', q: 'Which sentence is wrong?', o: ['Ik zie hem vaak in de stad.', 'Ik zie vaak hem in de stad.'], a: 1, why: 'The unstressed pronoun hem must come before the adverb vaak.' },
    { t: 'fill', q: 'Wij eten vanavond ___ in de keuken. (manner slot: cosily)', a: ['gezellig'], why: 'Manner sits between time (vanavond) and place (in de keuken).' },
    { t: 'fill', q: 'Hij gaat elke dag ___ de bus naar school. (preposition of manner)', a: ['met'], why: 'Transport = met: met de bus, met de trein, met de fiets.' },
    { t: 'mc', q: '"I was in Ghent yesterday" =', o: ['Ik was in Gent gisteren.', 'Ik was gisteren in Gent.'], a: 1, why: 'Time before place — English order is the trap.' }
  ] },

{ id: 'b1_12', level: 'B1', title: 'al, nog, pas, net & niet meer',
  read: [
    { h: 'al & nog niet', p: 'Al = already; its negative partner is nog niet (not yet): Ben je al klaar? — Nee, nog niet. Crucial bonus use: al + duration with the PRESENT tense for something still going on: Ik woon hier al drie jaar (I have lived here for three years). Never translate that English perfect literally.',
      ex: [['Heb je al gegeten? — Nee, nog niet.', 'Have you eaten yet? — No, not yet.'],
           ['Ik leer al zes maanden Nederlands.', 'I have been learning Dutch for six months.']] },
    { h: 'nog, niet meer, geen … meer', p: 'Nog = still: Woon je nog in Gent? Its negative is niet meer (not anymore): Ik rook niet meer. With a noun the negation wraps around meer: geen geld meer, geen zin meer. The pairs to drill: al ↔ nog niet, nog ↔ niet meer / geen … meer.',
      ex: [['Zij woont hier niet meer.', 'She no longer lives here.'],
           ['Ik heb geen geld meer.', 'I have no money left.']] },
    { h: 'pas & net', p: 'Pas = only/not until, later than expected: De winkel gaat pas om tien uur open (not until ten). Ik ben pas begonnen (I have only just started). Net = just now, moments ago: Hij is net vertrokken. 🦁 In Flanders you will constantly hear juist for net: "Hij is juist weg."',
      ex: [['De film begint pas om negen uur.', 'The film does not start until nine.'],
           ['Ze is net thuisgekomen.', 'She has just come home.']] }
  ],
  quiz: [
    { t: 'fill', q: 'Ben je al klaar? — Nee, ___ ___. (two words)', a: ['nog niet'], why: 'The negative of al is nog niet: not yet.' },
    { t: 'fill', q: 'Ik heb ___ geld meer.', a: ['geen'], why: 'Noun negation with meer: geen geld meer.' },
    { t: 'mc', q: '"Zij woont hier niet meer" means…', o: ['She does not live here yet', 'She no longer lives here', 'She still lives here'], a: 1, why: 'niet meer = not anymore.' },
    { t: 'mc', q: '"De film begint pas om 21 uur" means the film starts…', o: ['already at 9 pm', 'not until 9 pm', 'exactly at 9 pm'], a: 1, why: 'pas = later than you might expect: not until nine.' },
    { t: 'fill', q: 'De trein is ___ vertrokken — twee minuten geleden! (just)', a: ['net', 'juist'], why: 'net = just now (🦁 Flemish speech often uses juist).' },
    { t: 'mc', q: '"I have been living here for two years" =', o: ['Ik woon hier al twee jaar.', 'Ik heb hier voor twee jaar gewoond.', 'Ik woon hier voor twee jaar.'], a: 0, why: 'Ongoing duration → present tense + al: "Ik woon hier al twee jaar."' },
    { t: 'fill', q: 'Werk je ___ bij die bakkerij? (still)', a: ['nog'], why: 'nog = still: "Werk je nog…?"' },
    { t: 'mc', q: 'The opposite pair of "al" is…', o: ['nog niet', 'niet meer', 'geen'], a: 0, why: 'al (already) ↔ nog niet (not yet); nog (still) ↔ niet meer (not anymore).' }
  ] },

{ id: 'b1_13', level: 'B1', title: 'Cause & contrast: omdat, doordat, vanwege, hoewel…',
  read: [
    { h: 'Three ways to say because', p: 'Want (coordinating, V2 stays), omdat (subclause, gives a reason/motive — answers waarom?), doordat (subclause, pure cause, no one chose it): Het feest is afgelast doordat het stormde. In practice omdat is winning ground from doordat, but exams still reward the distinction: intention → omdat, mechanism → doordat.',
      ex: [['Ik blijf thuis omdat ik moe ben.', 'I am staying home because I am tired.'],
           ['De trein had vertraging doordat er een boom op het spoor lag.', 'The train was delayed because a tree lay on the track.']] },
    { h: 'With a noun: door, vanwege, dankzij', p: 'No verb needed: door de storm (cause), vanwege het weer (because of, neutral), dankzij jouw hulp (thanks to — positive). And as sentence adverbs with inversion: daarom (reason, chosen) vs daardoor (cause, mechanical): Ik wil slagen; daarom studeer ik. Het regende; daardoor was de weg glad.',
      ex: [['Dankzij jouw hulp is het gelukt.', 'Thanks to your help it worked out.'],
           ['Vanwege de staking rijden er geen treinen.', 'Because of the strike no trains are running.']] },
    { h: 'Contrast: hoewel / ondanks / toch', p: 'Same meaning, three grammars: hoewel + full clause, verb final (Hoewel het regende, gingen we wandelen); ondanks + noun only (Ondanks de regen gingen we wandelen); toch = adverb in position 1 with inversion (Het regende. Toch gingen we wandelen). Choose by what follows: clause → hoewel, noun → ondanks, new sentence → toch.',
      ex: [['Hoewel hij weinig slaapt, is hij altijd vrolijk.', 'Although he sleeps little, he is always cheerful.'],
           ['Ondanks het slechte weer ging de match door.', 'Despite the bad weather the match went ahead.']] }
  ],
  quiz: [
    { t: 'mc', q: 'Ik blijf thuis ___ ik moe ben.', o: ['want', 'omdat'], a: 1, why: '"ik moe ben" is verb-final = a subclause → omdat (want would keep V2: "want ik ben moe").' },
    { t: 'fill', q: '___ jouw hulp is het gelukt! (thanks to)', a: ['dankzij'], why: 'dankzij + noun = thanks to (positive cause).' },
    { t: 'mc', q: '___ het slechte weer ging de wedstrijd door.', o: ['Hoewel', 'Ondanks', 'Toch'], a: 1, why: 'A noun follows → ondanks. Hoewel needs a clause, toch starts its own sentence.' },
    { t: 'mc', q: 'Hij is ziek. ___ komt hij werken.', o: ['Toch', 'Ondanks', 'Hoewel'], a: 0, why: 'New sentence, adverb + inversion → toch = nevertheless.' },
    { t: 'fill', q: 'De trein had vertraging ___ een ongeval. (because of — one word)', a: ['vanwege', 'door'], why: 'vanwege/door + noun = because of.' },
    { t: 'mc', q: 'Ik wil het examen halen; ___ studeer ik elke dag.', o: ['daardoor', 'daarom'], a: 1, why: 'A chosen reason/goal → daarom; daardoor is for mechanical causes.' },
    { t: 'mc', q: '___ hij weinig verdient, is hij gelukkig. (although)', o: ['Hoewel', 'Omdat', 'Doordat'], a: 0, why: 'hoewel = although, verb-final clause follows.' },
    { t: 'mc', q: 'After "ondanks" you can only put…', o: ['a full clause', 'a noun (group)', 'an infinitive with te'], a: 1, why: 'ondanks is a preposition: ondanks de regen. For a clause use hoewel.' }
  ] },

{ id: 'b1_14', level: 'B1', title: 'laten: have it done, allow, suggest',
  read: [
    { h: 'Have something done', p: 'Laten + infinitive = you don’t do it yourself: Ik laat mijn haar knippen (I have my hair cut). Ik laat mijn fiets repareren. In the perfect, laten joins the double-infinitive club: Ik heb mijn haar laten knippen (never "gelaten").',
      ex: [['Wij laten ons huis schilderen.', 'We are having our house painted.'],
           ['Ik heb mijn telefoon laten repareren.', 'I had my phone repaired.']] },
    { h: 'Allow, leave & fixed chunks', p: 'Laten also means letting/allowing: Ze laten de kinderen buiten spelen. And it lives in must-know chunks: iets laten vallen (to drop), iemand iets laten weten (to let someone know), iets laten zien (to show), iemand met rust laten (to leave alone), Laat maar! (never mind).',
      ex: [['Laat me even weten of je komt.', 'Let me know if you are coming.'],
           ['Hij liet zijn glas vallen.', 'He dropped his glass.']] },
    { h: 'Suggestions: laten we', p: 'First-person suggestions start with laten we + infinitive at the end: Laten we beginnen! Laten we vanavond samen koken! 🦁 In Flanders you will just as often hear "Laat ons beginnen!" — same meaning, typically Belgian; both are fine in speech, laten we is the safest in writing.',
      ex: [['Laten we een pauze nemen.', 'Let’s take a break.'],
           ['🦁 Laat ons eerlijk zijn…', 'Let’s be honest… (typically Belgian)']] }
  ],
  quiz: [
    { t: 'mc', q: '"I have my bike repaired" =', o: ['Ik repareer mijn fiets.', 'Ik laat mijn fiets repareren.'], a: 1, why: 'laten + infinitive = someone else does it for you.' },
    { t: 'fill', q: '___ we vanavond samen koken! (suggestion)', a: ['laten'], why: 'Suggestion frame: "Laten we … koken!"' },
    { t: 'fill', q: 'Kun je me ___ weten of je komt?', a: ['laten'], why: 'Chunk: iemand iets laten weten = to let someone know.' },
    { t: 'mc', q: 'Perfect tense: Ik heb mijn haar ___ .', o: ['laten knippen', 'gelaten knippen', 'laten geknipt'], a: 0, why: 'Double infinitive: heb laten knippen — no participle.' },
    { t: 'fill', q: 'Ze ___ hun zoon alleen naar school gaan. (allow, present)', a: ['laten'], why: 'laten = to let/allow: "Ze laten hun zoon … gaan."' },
    { t: 'mc', q: '"Laat maar!" means…', o: ['Never mind / don’t bother', 'Hurry up!', 'Watch out!'], a: 0, why: 'Fixed chunk: Laat maar = forget it, never mind.' },
    { t: 'fill', q: 'Oeps! Hij liet zijn telefoon ___ . (fall)', a: ['vallen'], why: 'Chunk: iets laten vallen = to drop something.' },
    { t: 'mc', q: '🦁 The typically Belgian suggestion form is…', o: ['Laat ons gaan!', 'Laten wij gegaan!', 'Wij laten gaan!'], a: 0, why: '"Laat ons + infinitive" is the common Flemish variant of "Laten we…".' }
  ] },

{ id: 'b1_15', level: 'B1', title: 'Time prepositions: sinds, geleden, over, binnen, tijdens…',
  read: [
    { h: 'Since & for', p: 'Sinds + starting point: sinds 2020, sinds januari, sinds de verhuizing. Al + duration: al drie jaar. Both combine with the PRESENT tense when it is still going on: Ik werk hier sinds maart / al vier maanden. ⚠️ Never "voor drie jaar" for ongoing duration — that is the classic English calque.',
      ex: [['Ik woon hier sinds 2019.', 'I have lived here since 2019.'],
           ['Wij kennen elkaar al tien jaar.', 'We have known each other for ten years.']] },
    { h: 'Ago, in, within', p: 'Geleden comes AFTER the time phrase: drie jaar geleden (three years ago). Over + time = that much time from now: De trein vertrekt over tien minuten. Binnen + time = within a deadline: Antwoord binnen vijf dagen. Contrast: over een week (in a week’s time) vs binnen een week (before the week is over).',
      ex: [['We zijn twee jaar geleden verhuisd.', 'We moved two years ago.'],
           ['De vergadering begint over een kwartier.', 'The meeting starts in fifteen minutes.']] },
    { h: 'During, until, from', p: 'Tijdens + noun (tijdens de les) vs terwijl + clause (terwijl ik les had). Tot = until: tot zes uur; with a clause: tot(dat) de regen stopt. Vanaf = from/starting: vanaf maandag. Range: van negen tot zes. These preposition/conjunction twins (tijdens/terwijl, tot/totdat, door/doordat) all follow the same logic: noun → preposition, clause → conjunction.',
      ex: [['Tijdens de vergadering mag je niet bellen.', 'You may not phone during the meeting.'],
           ['De winkel is open van negen tot zes.', 'The shop is open from nine to six.']] }
  ],
  quiz: [
    { t: 'fill', q: 'Ik woon hier ___ 2019. (since)', a: ['sinds'], why: 'sinds + starting point, present tense.' },
    { t: 'fill', q: 'Wij zijn twee jaar ___ verhuisd. (ago)', a: ['geleden'], why: 'geleden follows the time phrase: twee jaar geleden.' },
    { t: 'mc', q: '"The train leaves in ten minutes" =', o: ['De trein vertrekt binnen tien minuten.', 'De trein vertrekt over tien minuten.', 'De trein vertrekt sinds tien minuten.'], a: 1, why: 'A point in the future measured from now → over.' },
    { t: 'mc', q: 'Je moet dit formulier ___ vijf dagen opsturen. (deadline)', o: ['over', 'binnen', 'sinds'], a: 1, why: 'Deadline = within → binnen vijf dagen.' },
    { t: 'mc', q: '___ de vergadering mag je niet bellen.', o: ['Terwijl', 'Tijdens', 'Totdat'], a: 1, why: 'A noun follows → tijdens; terwijl needs a clause.' },
    { t: 'mc', q: 'Correct sentence:', o: ['Ik studeer Nederlands voor zes maanden.', 'Ik studeer al zes maanden Nederlands.'], a: 1, why: 'Ongoing duration → al + present tense, never voor.' },
    { t: 'fill', q: 'We wachten ___ de regen stopt. (until + clause)', a: ['totdat', 'tot'], why: 'Clause follows → tot(dat): "totdat de regen stopt".' },
    { t: 'fill', q: 'De winkel is open van negen ___ zes.', a: ['tot'], why: 'Range: van … tot …' }
  ] },

{ id: 'b1_16', level: 'B1', title: 'iets leuks, iedereen, elk, alle & wat voor',
  read: [
    { h: 'iets/niets + adjective-s', p: 'After iets, niets, wat, veel and weinig the adjective takes -s: iets lekkers, niets bijzonders, wat nieuws, veel moois. (Adjectives already ending in -s stay put: iets anders.) This tiny -s is a favourite exam point because English has nothing like it.',
      ex: [['Wil je iets lekkers bij de koffie?', 'Would you like something tasty with the coffee?'],
           ['Er is niets bijzonders gebeurd.', 'Nothing special happened.']] },
    { h: 'People: iemand, niemand, iedereen', p: 'Iemand (someone), niemand (nobody), iedereen (everyone) — all take a SINGULAR verb: Iedereen is welkom. Niemand weet het. Combine with anders: iemand anders (someone else). Alles (everything) is also singular: Alles is klaar.',
      ex: [['Iedereen is welkom op het feest.', 'Everyone is welcome at the party.'],
           ['Niemand heeft iets gezien.', 'Nobody saw anything.']] },
    { h: 'elk/ieder, alle, sommige, allemaal', p: 'Elke/iedere + singular (elke dag, ieder kind); alle + plural (alle kinderen); sommige/enkele + plural (some/a few). Allemaal comes AFTER the word it belongs to: De koekjes zijn allemaal op. Wij gaan allemaal mee.',
      ex: [['Elk kind krijgt een cadeautje.', 'Each child gets a little present.'],
           ['De studenten waren allemaal geslaagd.', 'The students had all passed.']] },
    { h: 'wat voor (een)?', p: 'Wat voor (een) asks about the KIND of thing: Wat voor muziek luister je graag? Wat voor een auto heb je? Welk(e) asks to choose from a known set: Welke film kies je (of these three)? Type → wat voor; choice from a set → welke.',
      ex: [['Wat voor werk doe je?', 'What kind of work do you do?'],
           ['Welke jas is van jou — de blauwe of de zwarte?', 'Which coat is yours — the blue or the black one?']] }
  ],
  quiz: [
    { t: 'fill', q: 'Wil je iets ___ drinken? (lekker)', a: ['lekkers'], why: 'After iets the adjective takes -s: iets lekkers.' },
    { t: 'fill', q: 'Ik heb niets ___ te melden. (bijzonder)', a: ['bijzonders'], why: 'niets + adjective-s: niets bijzonders.' },
    { t: 'mc', q: 'Iedereen ___ welkom.', o: ['is', 'zijn'], a: 0, why: 'iedereen takes a singular verb.' },
    { t: 'mc', q: '___ kind krijgt een cadeautje. (each)', o: ['Alle', 'Elk', 'Sommige'], a: 1, why: 'elk + singular het-word: elk kind (alle needs a plural).' },
    { t: 'mc', q: 'De studenten waren ___ geslaagd. (all)', o: ['allemaal', 'alle', 'elk'], a: 0, why: 'allemaal follows the subject: "De studenten waren allemaal geslaagd."' },
    { t: 'mc', q: 'You see three coats and ask which one: "___ jas is van jou?"', o: ['Wat voor', 'Welke'], a: 1, why: 'Choice from a visible set → welke.' },
    { t: 'mc', q: '"___ muziek luister je graag?" (what kind of)', o: ['Welke', 'Wat voor'], a: 1, why: 'Asking about a type/kind → wat voor.' },
    { t: 'fill', q: 'Er is ___ aan de deur. (someone)', a: ['iemand'], why: 'iemand = someone: "Er is iemand aan de deur."' }
  ] },

{ id: 'b1_17', level: 'B1', title: 'Comparison II: hoe…hoe, steeds, net zo…als',
  read: [
    { h: 'hoe … hoe … & steeds', p: 'Growing together: Hoe meer je oefent, hoe beter je wordt (the more…, the better…) — both halves take subclause order (verb final). Gradual change: steeds + comparative: De dagen worden steeds langer (longer and longer). Also: almaar langer, langer en langer.',
      ex: [['Hoe meer je leest, hoe groter je woordenschat wordt.', 'The more you read, the bigger your vocabulary gets.'],
           ['Het wordt steeds kouder.', 'It keeps getting colder.']] },
    { h: 'Equality: net zo … als', p: 'Equal degree: net zo groot als / even groot als (just as big as). The same + noun: dezelfde (de-words & plural) / hetzelfde (het-words): dezelfde auto, hetzelfde huis. As a pronoun always hetzelfde: Wij willen hetzelfde.',
      ex: [['Gent is net zo mooi als Brugge.', 'Ghent is just as beautiful as Bruges.'],
           ['Wij hebben dezelfde leraar.', 'We have the same teacher.']] },
    { h: 'Superlative in action + ⚠️ dan/als', p: 'Eén van de + superlative + PLURAL: één van de mooiste steden van België. Superlative as adverb takes het: Zij loopt het snelst. ⚠️ Standard comparative uses dan: groter dan ik. In speech (🦁 very much in Flanders too) you will hear "groter als" — understand it, but write dan: exams mark als wrong here.',
      ex: [['Antwerpen is één van de grootste steden van België.', 'Antwerp is one of the biggest cities in Belgium.'],
           ['Zij zingt het mooist van iedereen.', 'She sings the most beautifully of all.']] }
  ],
  quiz: [
    { t: 'fill', q: 'Hoe meer je leest, hoe ___ je woordenschat wordt. (groot)', a: ['groter'], why: 'hoe + comparative in both halves: hoe meer …, hoe groter …' },
    { t: 'fill', q: 'Het wordt ___ kouder. (increasingly)', a: ['steeds'], why: 'steeds + comparative = more and more.' },
    { t: 'mc', q: 'Gent is ___ mooi als Brugge.', o: ['net zo', 'meer', 'steeds'], a: 0, why: 'Equality: net zo + adjective + als.' },
    { t: 'mc', q: 'Standard written Dutch:', o: ['Hij is groter als ik.', 'Hij is groter dan ik.'], a: 1, why: 'Comparative + dan is the standard; als is spoken/substandard here.' },
    { t: 'fill', q: 'Antwerpen is één van de ___ steden van België. (groot)', a: ['grootste'], why: 'één van de + superlative + plural noun.' },
    { t: 'mc', q: 'Wij hebben ___ auto als jullie. (the same — de auto)', o: ['dezelfde', 'hetzelfde'], a: 0, why: 'de auto → dezelfde; hetzelfde is for het-words.' },
    { t: 'mc', q: 'Zij loopt ___ snelst van de klas.', o: ['de', 'het', 'een'], a: 1, why: 'Superlative as adverb → het: het snelst.' },
    { t: 'mc', q: '"Hoe eerder, hoe beter" means…', o: ['the sooner the better', 'how early is it?', 'always earlier'], a: 0, why: 'Fixed hoe…hoe… chunk: the sooner, the better.' }
  ] },

{ id: 'b1_18', level: 'B1', title: 'Perfect tense: hebben or zijn?',
  read: [
    { h: 'The zijn-club', p: 'Zijn goes with movement to a destination and change of state: gaan, komen, vertrekken, aankomen, vallen, worden, blijven, beginnen, stoppen, gebeuren, lukken, sterven, trouwen, verhuizen — plus zijn itself (ik ben geweest). Everything else defaults to hebben. Learn the club as a story: you go, arrive, fall, change, stay, and in the end… you have been.',
      ex: [['Zij is vorig jaar naar Gent verhuisd.', 'She moved to Ghent last year.'],
           ['Wat is er gebeurd?', 'What happened?']] },
    { h: 'Motion verbs: both!', p: 'Fietsen, lopen, rijden, zwemmen, wandelen take BOTH auxiliaries — meaning decides. Destination mentioned → zijn: Ik ben naar huis gefietst. Just the activity/duration → hebben: Ik heb twee uur gefietst. Quick test: is there a "naar …" (or another endpoint) in the sentence? Then zijn.',
      ex: [['Ik ben naar het station gewandeld.', 'I walked to the station.'],
           ['Ik heb twee uur gewandeld.', 'I walked for two hours.']] },
    { h: 'Meaning switchers: vergeten & co', p: 'Some verbs switch auxiliary with meaning. Vergeten: Ik ben je naam vergeten (it slipped from memory) / Ik ben mijn sleutels vergeten (left them behind) — but Ik heb vergeten de deur te sluiten (neglected to DO something) prefers hebben. Verliezen always takes hebben: Ik heb mijn sleutels verloren. When unsure, ask: state change (zijn) or action (hebben)?',
      ex: [['Ik ben je naam even vergeten, sorry!', 'I have forgotten your name for a moment, sorry!'],
           ['Ik heb vergeten brood te kopen.', 'I forgot to buy bread.']] }
  ],
  quiz: [
    { t: 'mc', q: 'Ik ___ twee uur gewandeld.', o: ['heb', 'ben'], a: 0, why: 'Only duration, no destination → hebben.' },
    { t: 'mc', q: 'Ik ___ naar het station gewandeld.', o: ['heb', 'ben'], a: 1, why: 'Destination (naar het station) → zijn.' },
    { t: 'fill', q: 'Zij ___ vorig jaar naar Gent verhuisd.', a: ['is'], why: 'verhuizen = change of place/state → zijn.' },
    { t: 'fill', q: 'Het concert ___ om middernacht gestopt.', a: ['is'], why: 'stoppen (come to an end) → zijn: het concert is gestopt.' },
    { t: 'mc', q: 'Wat ___ er gebeurd?', o: ['is', 'heeft'], a: 0, why: 'gebeuren always takes zijn: Wat is er gebeurd?' },
    { t: 'mc', q: 'Ik ___ vergeten de deur te sluiten.', o: ['ben', 'heb'], a: 1, why: 'Forgetting to DO something → hebben: heb vergeten te…' },
    { t: 'mc', q: 'Ik ___ je naam vergeten.', o: ['ben', 'heb'], a: 0, why: 'No longer knowing → zijn: ik ben je naam vergeten.' },
    { t: 'fill', q: 'Wij ___ gisteren gewoon thuis gebleven.', a: ['zijn'], why: 'blijven belongs to the zijn-club: wij zijn gebleven.' }
  ] },

/* ═══════════════════════ B2 ═══════════════════════ */
{ id: 'b2_01', level: 'B2', title: 'Past perfect & tense sequencing',
  read: [
    { h: 'had/was + participle', p: 'The plusquamperfectum places one past event before another: Toen ik aankwam, was de trein al vertrokken. Same hebben/zijn choice as the perfect.',
      ex: [['Ik had nog nooit zoiets gezien.', 'I had never seen anything like it.'],
           ['Nadat hij gegeten had, ging hij slapen.', 'After he had eaten, he went to sleep.']] },
    { h: 'toen vs als vs wanneer', p: 'Toen = single moment/period in the PAST (subclause): Toen ik klein was… Als = whenever/if (present, habits, conditions). Wanneer = when in questions and formal alternatives to als.',
      ex: [['Toen ik in Gent woonde, fietste ik overal.', 'When I lived in Ghent, I cycled everywhere.'],
           ['Als ik moe ben, drink ik koffie.', 'When(ever) I’m tired, I drink coffee.']] }
  ],
  quiz: [
    { t: 'fill', q: 'De film ___ al begonnen toen we aankwamen. (zijn, past perfect)', a: ['was'], why: 'Past-before-past → was begonnen.' },
    { t: 'mc', q: '___ ik student was, had ik weinig geld.', o: ['Als', 'Toen', 'Wanneer'], a: 1, why: 'Single past period → toen.' },
    { t: 'fill', q: 'Nadat zij de brief ___ gelezen, belde ze mij. (hebben, past)', a: ['had'], why: 'Nadat + past perfect: had gelezen.' },
    { t: 'mc', q: '"Whenever it rains, we stay in" =', o: ['Toen het regent…', 'Als het regent…'], a: 1, why: 'Habits/repetition in the present → als.' }
  ] },

{ id: 'b2_02', level: 'B2', title: 'Double infinitive (heeft kunnen komen)',
  read: [
    { h: 'Modals in the perfect', p: 'When a modal has its own infinitive, the perfect uses TWO infinitives instead of a participle: Ik heb niet kunnen komen (NOT "gekund"). Same with laten, zien, horen, gaan: Ik heb mijn fiets laten repareren.',
      ex: [['Zij heeft niet willen betalen.', 'She refused to pay.'],
           ['We hebben hem zien vertrekken.', 'We saw him leave.']] },
    { h: 'Verb clusters at the end', p: 'In subclauses these verbs pile up at the end. Standard order: …dat ik niet heb kunnen komen. 🦁 In Belgium you’ll also hear "…dat ik niet heb kunnen komen" reordered as "…dat ik niet kunnen komen heb" in dialect — stick to the standard cluster in writing.',
      ex: [['…omdat ik de vergadering heb moeten afzeggen.', '…because I had to cancel the meeting.'],
           ['…dat hij het huis heeft laten schilderen.', '…that he had the house painted.']] }
  ],
  quiz: [
    { t: 'mc', q: 'Ik heb gisteren niet ___ .', o: ['gekund komen', 'kunnen komen', 'gekomen kunnen'], a: 1, why: 'Modal + infinitive in the perfect → double infinitive: kunnen komen.' },
    { t: 'fill', q: 'Wij hebben de auto ___ repareren. (laten)', a: ['laten'], why: 'laten also joins the double-infinitive rule: hebben laten repareren.' },
    { t: 'mc', q: 'Subclause: …dat zij vroeg ___ .', o: ['heeft moeten vertrekken', 'gemoeten heeft vertrekken', 'heeft vertrekken moeten'], a: 0, why: 'Cluster order: heeft moeten vertrekken.' },
    { t: 'mc', q: 'Correct perfect of "ik kan het doen":', o: ['Ik heb het gekund doen.', 'Ik heb het kunnen doen.'], a: 1, why: 'kunnen replaces gekund before an infinitive.' }
  ] },

{ id: 'b2_03', level: 'B2', title: 'Progressive: aan het + inf, zitten te',
  read: [
    { h: 'aan het + infinitive', p: 'Ongoing action: Ik ben aan het koken. Past: Ik was aan het werken toen je belde. More vivid than the simple present, used when the activity is happening right now.',
      ex: [['Stil! De baby is aan het slapen.', 'Quiet! The baby is sleeping.'],
           ['Ze zijn de keuken aan het verbouwen.', 'They are renovating the kitchen.']] },
    { h: 'zitten/staan/liggen/lopen te', p: 'Posture verbs + te + infinitive express ongoing activity with position: Hij zit te lezen. Ze staat te wachten. In the perfect: double infinitive — Hij heeft zitten lezen.',
      ex: [['Ik zat urenlang te studeren.', 'I sat studying for hours.'],
           ['Loop niet zo te zeuren!', 'Stop whining!']] }
  ],
  quiz: [
    { t: 'fill', q: 'Ik kan nu niet praten, ik ben ___ ___ koken.', a: ['aan het'], why: 'Progressive: aan het + infinitive.' },
    { t: 'mc', q: '"He sits reading" =', o: ['Hij zit te lezen.', 'Hij zit lezen.', 'Hij is zitten lezen.'], a: 0, why: 'Posture verb + te + infinitive.' },
    { t: 'fill', q: 'Zij stond een uur ___ wachten.', a: ['te'], why: 'staan te wachten.' },
    { t: 'mc', q: 'Perfect: "Hij heeft de hele avond ___."', o: ['zitten te lezen → zitten lezen', 'gezeten te lezen', 'te zitten lezen'], a: 0, why: 'Double infinitive in the perfect: heeft zitten lezen.' }
  ] },

{ id: 'b2_04', level: 'B2', title: 'Passive with modals & impersonal passive',
  read: [
    { h: 'moet worden gedaan', p: 'Modal + worden + participle: Het formulier moet worden ingevuld / moet ingevuld worden (both orders fine). Future: zal worden gebouwd.',
      ex: [['De fout moet snel worden hersteld.', 'The mistake must be fixed quickly.'],
           ['Dit mag niet vergeten worden.', 'This must not be forgotten.']] },
    { h: 'Er wordt…', p: 'Impersonal passive describes activity without a subject: Er wordt gebeld (someone’s ringing). Er werd veel gelachen. Typically with intransitive action verbs; very Dutch, very useful.',
      ex: [['Er wordt hier veel gefietst.', 'People cycle a lot here.'],
           ['Er werd tot laat gedanst.', 'There was dancing until late.']] }
  ],
  quiz: [
    { t: 'mc', q: 'Het verslag ___ morgen ___ ingeleverd.', o: ['moet / worden', 'wordt / moeten', 'moet / zijn'], a: 0, why: 'Modal passive: moet worden ingeleverd.' },
    { t: 'fill', q: '___ wordt op de deur geklopt.', a: ['er'], why: 'Impersonal passive starts with er.' },
    { t: 'mc', q: '"The bridge will be built in 2030" =', o: ['De brug zal in 2030 worden gebouwd.', 'De brug zal in 2030 gebouwd.', 'De brug wordt zal bouwen.'], a: 0, why: 'zullen + worden + participle.' },
    { t: 'mc', q: '"Er werd veel gepraat" implies…', o: ['a specific person talked', 'people in general talked a lot'], a: 1, why: 'Impersonal passive = unspecified people.' }
  ] },

{ id: 'b2_05', level: 'B2', title: 'Position of niet — fine-tuning',
  read: [
    { h: 'The default slots', p: 'Niet comes: after definite objects (Ik ken die man niet), before adjectives/adverbs (niet duur, niet snel), before prepositional phrases (niet in Gent), before final verb parts (niet gezien). It never splits verb clusters.',
      ex: [['Ik heb de sleutels niet gevonden.', 'I didn’t find the keys.'],
           ['Zij woont niet in Antwerpen.', 'She doesn’t live in Antwerp.']] },
    { h: 'Contrast focus', p: 'Placing niet directly before a word negates just that word (contrastive): Ik ga niet vandaag, maar morgen. Compare: Ik ga vandaag niet (= not going at all today).',
      ex: [['Niet ik heb dat gezegd, maar hij.', 'It wasn’t me who said that, it was him.'],
           ['Ik drink niet veel, maar wel graag.', 'I don’t drink much, but I do enjoy it.']] }
  ],
  quiz: [
    { t: 'mc', q: 'Correct:', o: ['Ik heb niet de film gezien.', 'Ik heb de film niet gezien.'], a: 1, why: 'Definite object → niet after it: de film niet gezien.' },
    { t: 'mc', q: '"She doesn’t live in Ghent" =', o: ['Zij woont in Gent niet.', 'Zij woont niet in Gent.'], a: 1, why: 'Niet before prepositional phrases.' },
    { t: 'mc', q: '"Ik ga niet morgen, maar overmorgen" means…', o: ['I’m not going at all', 'I’m going, just not tomorrow'], a: 1, why: 'Contrastive niet negates only "morgen".' },
    { t: 'fill', q: 'Ik begrijp het ___ . (negate)', a: ['niet'], why: 'Pronoun object (het) → niet after it, end of clause.' }
  ] },

{ id: 'b2_06', level: 'B2', title: 'Separable vs inseparable prefixes',
  read: [
    { h: 'Stress decides', p: 'Prefixes door-, om-, over-, onder-, voor- can be either. Stressed prefix = separable, literal meaning: óverkomen (cross over) → Hij komt over. Unstressed = inseparable, figurative: overkómen (happen to) → Het overkwam mij. Inseparable verbs take no ge- in the participle.',
      ex: [['Ik neem het werk over. (óvernemen)', 'I take over the work.'],
           ['Zij ondergáát een operatie.', 'She undergoes surgery.']] },
    { h: 'Classic pairs', p: 'vóórkomen (occur) vs voorkómen (prevent) · dóórlopen (walk on) vs doorlópen (go through) · ómleiden (divert) is separable; omhélzen (embrace) inseparable. Participles: doorgelopen (sep.) vs doorlopen (insep., no ge-).',
      ex: [['Dat komt vaak voor.', 'That occurs often.'],
           ['We willen problemen voorkomen.', 'We want to prevent problems.']] }
  ],
  quiz: [
    { t: 'mc', q: '"To prevent": Dit moet ongelukken ___ .', o: ['voorkomen', 'voor komen'], a: 0, why: 'voorkómen (prevent) is inseparable.' },
    { t: 'mc', q: 'Participle of separable "opbellen":', o: ['opgebeld', 'geopbeld', 'opbeld'], a: 0, why: 'Separable: ge- between the parts → opgebeld.' },
    { t: 'mc', q: 'Participle of inseparable "ondergaan":', o: ['ondergegaan', 'ondergaan'], a: 1, why: 'Inseparable verbs take no ge-: Zij heeft een operatie ondergaan.' },
    { t: 'mc', q: '"Dat komt hier vaak voor" — voorkomen here means:', o: ['to prevent', 'to occur'], a: 1, why: 'Separated prefix → the separable (literal) verb: to occur.' }
  ] },

{ id: 'b2_07', level: 'B2', title: 'Connectors & inversion (bovendien, echter…)',
  read: [
    { h: 'Adverbial connectors trigger inversion', p: 'Words like daarom, daarna, bovendien, toch, dus (fronted) count as position 1 → verb second, subject third: Daarom blijf ik thuis. Bovendien is het te duur.',
      ex: [['Daarna gingen we naar huis.', 'After that we went home.'],
           ['Toch begrijp ik zijn keuze.', 'Still, I understand his choice.']] },
    { h: 'Register palette', p: 'Cause: daarom, daardoor, dus. Contrast: toch, echter (formal, often after the verb: "Het is echter…"), niettemin. Addition: bovendien, daarnaast. Time: vervolgens, intussen, ten slotte. These make your B2 writing flow.',
      ex: [['Het plan is duur; bovendien is het riskant.', 'The plan is expensive; moreover it is risky.'],
           ['Er was echter één probleem.', 'There was, however, one problem.']] }
  ],
  quiz: [
    { t: 'mc', q: 'Daarom ___ wij vroeg vertrokken.', o: ['wij zijn', 'zijn'], a: 1, why: 'Fronted connector → inversion: "Daarom zijn wij…".' },
    { t: 'fill', q: 'Het regende; ___ gingen we wandelen. (nevertheless)', a: ['toch'], why: 'Toch = nevertheless, triggers inversion.' },
    { t: 'mc', q: 'Formal "however":', o: ['maar', 'echter', 'want'], a: 1, why: 'Echter is the formal written contrast marker.' },
    { t: 'mc', q: '"Bovendien" adds…', o: ['a contrast', 'an extra argument', 'a cause'], a: 1, why: 'Bovendien = moreover / in addition.' }
  ] },

{ id: 'b2_08', level: 'B2', title: 'Word formation: nouns from verbs',
  read: [
    { h: 'Productive suffixes', p: '-ing (de verbouwing — from verbouwen), -er (de loper — doer), -heid (de vrijheid — from adjectives), ge- + stem (het gezeur — annoying repeated action), -atie/-tie (de organisatie). Infinitive as noun is always het: het lezen.',
      ex: [['de vergadering, de beslissing', 'the meeting, the decision'],
           ['het gepraat, het gedoe', 'the (endless) talking, the hassle']] },
    { h: 'Compounds', p: 'Dutch glues nouns together, last part decides gender: de fiets + het pad → het fietspad. Linking sounds -s- or -en-: stationsplein, boekenkast. Write compounds as ONE word — "taal niveau" is wrong, "taalniveau" is right.',
      ex: [['het taalniveau, de studieplanning', 'the language level, the study planning'],
           ['de boekenkast, het stationsplein', 'the bookcase, the station square']] }
  ],
  quiz: [
    { t: 'fill', q: 'Noun from "beslissen": de ___', a: ['beslissing'], why: 'Verb → -ing noun: de beslissing.' },
    { t: 'mc', q: 'Article: ___ fietspad.', o: ['de', 'het'], a: 1, why: 'Last element decides: het pad → het fietspad.' },
    { t: 'mc', q: 'Correct spelling:', o: ['studie planning', 'studieplanning'], a: 1, why: 'Compounds are written as one word.' },
    { t: 'mc', q: '"Het geklaag" suggests…', o: ['a single complaint', 'continuous annoying complaining'], a: 1, why: 'ge- + stem = repeated, often irritating activity.' }
  ] },

/* ═══════════════════════ C1 ═══════════════════════ */
{ id: 'c1_01', level: 'C1', title: 'Modal particles: wel, toch, eens, maar, even',
  read: [
    { h: 'The flavour words', p: 'Untranslatable particles tune the tone. wel = contradiction/reassurance (Het lukt wel). toch = seeking agreement or contradiction (Je komt toch?). eens = softening (Kom eens hier). maar = permission/resignation (Doe maar). even = briefly, casually (Wacht even).',
      ex: [['Het komt wel goed.', 'It’ll be fine, don’t worry.'],
           ['Je weet toch dat het pas een gedacht is?', 'You do know it’s just an idea, right?']] },
    { h: 'Stacking', p: 'Natives stack them: "Kom maar eens even kijken." Each particle adds nuance: maar (go ahead) + eens (softener) + even (just briefly). Mastering these is what makes you sound genuinely fluent. 🦁 Flemish also loves "zeker" and final "hé": "Da’s goed, hé?"',
      ex: [['Zeg het maar.', 'Go ahead, tell me / your order.'],
           ['Probeer het toch eens.', 'Come on, just give it a try.']] }
  ],
  quiz: [
    { t: 'mc', q: '"Het komt ___ goed." (reassurance)', o: ['wel', 'toch', 'eens'], a: 0, why: 'Wel counters worry: it WILL be fine.' },
    { t: 'mc', q: '"Je komt ___ naar het feest?" (expecting yes)', o: ['maar', 'toch', 'even'], a: 1, why: 'Toch seeks confirmation: you’re coming, right?' },
    { t: 'mc', q: '"Ga ___ zitten." (friendly invitation)', o: ['maar', 'wel', 'toch wel'], a: 0, why: 'Maar signals permission: go ahead and sit.' },
    { t: 'mc', q: '"Wacht ___!" (just a sec)', o: ['eens', 'even', 'wel'], a: 1, why: 'Even = briefly: Wacht even!' }
  ] },

{ id: 'c1_02', level: 'C1', title: 'The verbal bracket & extraposition',
  read: [
    { h: 'De tangconstructie', p: 'Main clauses clamp their content between the finite verb and the final verb parts: "Ik heb [gisteren op de trein een oude vriend] gezien." Learning to keep the bracket closed — and what may escape it — is key to natural C1 Dutch.',
      ex: [['Ik heb gisteren in Gent een lezing bijgewoond.', 'Yesterday I attended a lecture in Ghent.'],
           ['Zij wil volgend jaar in Leuven geneeskunde studeren.', 'She wants to study medicine in Leuven next year.']] },
    { h: 'What may follow the final verb', p: 'Extraposition: prepositional phrases and comparison phrases may move behind the verbal end-group for balance: "Ik heb een boek gekocht over de geschiedenis van Vlaanderen." Long/heavy elements go last; objects may not: NOT "Ik heb gezien de film."',
      ex: [['We hebben lang gepraat over de toekomst.', 'We talked for a long time about the future.'],
           ['Hij werkt harder dan ik had verwacht.', 'He works harder than I had expected.']] }
  ],
  quiz: [
    { t: 'mc', q: 'Which is natural?', o: ['Ik heb gezien de film.', 'Ik heb de film gezien.'], a: 1, why: 'Objects must stay inside the bracket: de film gezien.' },
    { t: 'mc', q: 'Acceptable extraposition:', o: ['Ik heb een artikel gelezen over FSRS.', 'Ik heb gelezen een artikel over FSRS.'], a: 0, why: 'A PP may follow the participle; the object may not.' },
    { t: 'mc', q: 'The "tang" is formed by…', o: ['subject + object', 'finite verb + final verb parts', 'two commas'], a: 1, why: 'The finite verb (2nd position) and the end-group clamp the middle field.' },
    { t: 'mc', q: 'Best placement of a heavy comparison:', o: ['Hij is sneller dan iedereen dacht gegroeid.', 'Hij is sneller gegroeid dan iedereen dacht.'], a: 1, why: 'Heavy comparisons extrapose after the participle.' }
  ] },

{ id: 'c1_03', level: 'C1', title: 'Cleft sentences & fronting for focus',
  read: [
    { h: 'Het is … die/dat', p: 'Clefting highlights one element: "Het is Jan die de sleutel heeft." (It’s Jan who has the key.) Pseudo-cleft: "Wat ik nodig heb, is tijd." (What I need is time.) Powerful in argumentation and formal writing.',
      ex: [['Het was pas in 2019 dat het probleem werd erkend.', 'It was only in 2019 that the problem was acknowledged.'],
           ['Wat mij stoort, is het lawaai.', 'What bothers me is the noise.']] },
    { h: 'Fronting', p: 'Dutch can front almost anything for contrast — object, PP, even participles: "Gezegd heb ik dat nooit." (Said it, I never did.) Use sparingly; it carries heavy emphasis.',
      ex: [['Die film heb ik al drie keer gezien.', 'That film I’ve already seen three times.'],
           ['Mooi vind ik het niet.', 'Beautiful, I don’t find it.']] }
  ],
  quiz: [
    { t: 'mc', q: '"It’s the teacher who decides" =', o: ['Het is de leraar die beslist.', 'Het is de leraar wie beslist.'], a: 0, why: 'Cleft with de-word → die.' },
    { t: 'fill', q: '___ ik echt nodig heb, is rust. (pseudo-cleft)', a: ['wat'], why: 'Pseudo-cleft starts with wat: "Wat ik nodig heb…".' },
    { t: 'mc', q: '"Die fout maak ik nooit meer." The object is fronted to…', o: ['ask a question', 'add contrastive emphasis', 'follow a fixed rule'], a: 1, why: 'Fronting = focus/contrast on "die fout".' },
    { t: 'mc', q: 'After a fronted object the verb…', o: ['stays second', 'moves to the end'], a: 0, why: 'V2 always holds in main clauses: "Die film heb ik gezien."' }
  ] },

{ id: 'c1_04', level: 'C1', title: 'Participle & infinitive clauses',
  read: [
    { h: 'Compressed subclauses', p: 'Formal Dutch compresses clauses: "Gezien de omstandigheden…" (Given the circumstances), "Vergeleken met vorig jaar…", "Al doende leert men." Present participles as adjectives: de stijgende prijzen, een slapende hond.',
      ex: [['Gezien de resultaten stellen wij een wijziging voor.', 'In view of the results we propose a change.'],
           ['Een goed voorbereide student slaagt sneller.', 'A well-prepared student passes faster.']] },
    { h: 'Te + infinitive as adjective', p: 'The "gerundivum": een te verwachten probleem (a problem to be expected), de te volgen procedure (the procedure to be followed). Typical of official and academic texts — recognise and deploy it.',
      ex: [['De te nemen maatregelen zijn duidelijk.', 'The measures to be taken are clear.'],
           ['Dat is een niet te onderschatten risico.', 'That is a risk not to be underestimated.']] }
  ],
  quiz: [
    { t: 'mc', q: '"___ de kosten stellen we het project uit." (given)', o: ['Gezien', 'Ziende', 'Gezien worden'], a: 0, why: 'Fixed absolute participle: Gezien de kosten…' },
    { t: 'mc', q: '"the rising prices" =', o: ['de stijgende prijzen', 'de gestegen prijzen'], a: 0, why: 'Ongoing → present participle stijgende (gestegen = already risen).' },
    { t: 'mc', q: '"De ___ documenten" (to be signed)', o: ['te ondertekenen', 'ondertekende', 'ondertekenende'], a: 0, why: 'Gerundive: de te ondertekenen documenten.' },
    { t: 'mc', q: '"Al doende leert men" means…', o: ['One learns by doing', 'Everyone must do it', 'Doing is learning’s enemy'], a: 0, why: 'Fixed expression: practice makes perfect.' }
  ] },

{ id: 'c1_05', level: 'C1', title: 'Formal register & subjunctive remnants',
  read: [
    { h: 'Written-formal vocabulary', p: 'Formal texts swap everyday words: reeds (al), thans (nu), tevens (ook), alsmede (en ook), hetgeen (wat), inzake (over), middels/door middel van (met). Overusing them sounds stiff; recognising them is essential for C1 reading.',
      ex: [['De vergadering is reeds begonnen.', 'The meeting has already begun.'],
           ['…hetgeen grote gevolgen heeft.', '…which has major consequences.']] },
    { h: 'Frozen subjunctives', p: 'The old subjunctive survives in fixed formulas: Leve de koning! · Het zij zo (so be it) · als het ware (as it were) · Moge de beste winnen · ware het niet dat… (were it not that). Learn them as chunks.',
      ex: [['Kome wat komt.', 'Come what may.'],
           ['Dat ware beter geweest.', 'That would have been better. (very formal)']] }
  ],
  quiz: [
    { t: 'mc', q: 'Formal equivalent of "nu":', o: ['thans', 'reeds', 'tevens'], a: 0, why: 'thans = now (formal).' },
    { t: 'mc', q: '"…, hetgeen ons verbaasde." Hetgeen replaces…', o: ['dat/wat referring to the whole clause', 'de man', 'daarom'], a: 0, why: 'Hetgeen = formal "which (fact)", referring to the whole preceding clause.' },
    { t: 'fill', q: '"Het ___ zo." (so be it)', a: ['zij'], why: 'Frozen subjunctive: Het zij zo.' },
    { t: 'mc', q: '"als het ware" means…', o: ['as it were', 'as it was', 'if it is true'], a: 0, why: 'Fixed hedge: as it were / so to speak.' }
  ] },

{ id: 'c1_06', level: 'C1', title: '🦁 Belgian vs Netherlands Dutch',
  read: [
    { h: 'Same language, own flavour', p: 'Standard Dutch is shared, but Belgium differs in: pronouns (spoken ge/gij; u as unstressed object pronoun), softer g, French-influenced vocabulary. Typical Flemish words: goesting (zin), ambetant (vervelend), proper (schoon/netjes), (brood)bakker → bij de bakker "gaan halen", solden (uitverkoop), kot (studentenkamer), gsm (mobiel).',
      ex: [['Ik heb geen goesting om te koken.', 'I don’t feel like cooking. (BE)'],
           ['Zij zit op kot in Leuven.', 'She lives in student housing in Leuven. (BE)']] },
    { h: 'Grammar tendencies', p: 'Flemish speech: "Ge moet dat niet doen" where NL says "Dat hoef je niet te doen"; more frequent double negation in dialect; diminutive -ke; "Da’s" for "dat is". In formal writing both countries follow the same Taalunie standard — exams (ITNA/CNaVT) accept standard Belgian Dutch.',
      ex: [['Da’s ambetant, zenne! (spoken)', 'That’s annoying, I tell you!'],
           ['Hij is proper op zichzelf.', 'He keeps himself neat. (BE)']] }
  ],
  quiz: [
    { t: 'mc', q: '"Goesting" is Flemish for…', o: ['zin', 'angst', 'haast'], a: 0, why: 'Goesting hebben in = zin hebben in (to feel like).' },
    { t: 'mc', q: '"Op kot zitten" means…', o: ['to be in prison', 'to live in a student room', 'to be ill'], a: 1, why: 'Kot = student room (Belgian Dutch).' },
    { t: 'mc', q: 'Standard-Dutch version of spoken "Ge zijt te laat":', o: ['Je bent te laat.', 'U zijn te laat.', 'Jij zijt te laat.'], a: 0, why: 'ge/gij + zijt → je/jij + bent in standard language.' },
    { t: 'mc', q: '"Ambetant" =', o: ['talented', 'annoying', 'ambitious'], a: 1, why: 'Ambetant (from French embêtant) = vervelend.' }
  ] },

{ id: 'c1_07', level: 'C1', title: 'Nominal style, men & hedging',
  read: [
    { h: 'Nominal style', p: 'Academic Dutch prefers nouns over verbs: "de invoering van de maatregel" vs "toen de maatregel werd ingevoerd". Learn to build and to UNPACK these: heavy noun chains are typical of official Belgian documents.',
      ex: [['De verbetering van de resultaten is opvallend.', 'The improvement of the results is striking.'],
           ['Na de goedkeuring van het plan begon de bouw.', 'After the plan’s approval, construction began.']] },
    { h: 'Distance & hedging', p: 'men = one/people (formal): Men zegt dat… Passives and hedges create distance: naar verluidt (reportedly), vermoedelijk, in zekere zin, het lijkt erop dat…, er wordt gesteld dat… Essential for C1 writing where you must weigh claims.',
      ex: [['Men neemt aan dat de regel verdwijnt.', 'It is assumed the rule will disappear.'],
           ['Naar verluidt komt er een akkoord.', 'Reportedly an agreement is coming.']] }
  ],
  quiz: [
    { t: 'mc', q: 'Nominal version of "toen het verslag werd gepubliceerd":', o: ['na de publicatie van het verslag', 'na het gepubliceerd', 'na de verslaggeving publiceren'], a: 0, why: 'Verb → noun: de publicatie van het verslag.' },
    { t: 'mc', q: '"Men zegt dat…" =', o: ['The men say that…', 'People say that…', 'He says that…'], a: 1, why: 'Men = impersonal "one/people".' },
    { t: 'mc', q: '"Naar verluidt" signals…', o: ['certainty', 'hearsay/reportedness', 'a conclusion'], a: 1, why: 'Naar verluidt = reportedly (unverified).' },
    { t: 'mc', q: 'Best hedge for an academic claim:', o: ['Het is 100% zeker dat…', 'Het lijkt erop dat…', 'Iedereen weet dat…'], a: 1, why: '"Het lijkt erop dat…" weighs the claim appropriately.' }
  ] }

  ]
};

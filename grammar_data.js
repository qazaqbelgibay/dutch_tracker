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

/* ═══════════════════════ A2 ═══════════════════════ */
{ id: 'a2_01', level: 'A2', title: 'Perfect tense & ’t kofschip',
  read: [
    { h: 'hebben/zijn + participle', p: 'The perfect = hebben or zijn + past participle at the END: Ik heb gewerkt. Regular participle: ge + stem + t or d. Use -t if the infinitive stem ends in a ’t kofschip consonant (t, k, f, s, ch, p) — else -d: werken → gewerkt, wonen → gewoond.',
      ex: [['Ik heb gisteren gewerkt.', 'I worked yesterday.'],
           ['Wij hebben in Gent gewoond.', 'We lived in Ghent.']] },
    { h: 'Zijn instead of hebben', p: 'Verbs of movement to a destination and change of state take zijn: gaan, komen, vertrekken, beginnen, worden, blijven, zijn itself: Ik ben naar huis gegaan. No ge- for verbs starting with be-, ge-, ver-, ont-, her-: betalen → betaald.',
      ex: [['Zij is om acht uur vertrokken.', 'She left at eight.'],
           ['Ik heb de rekening betaald.', 'I paid the bill.']] }
  ],
  quiz: [
    { t: 'fill', q: 'Ik heb hard ___. (werken)', a: ['gewerkt'], why: 'Stem werk ends in k (’t kofschip) → gewerkt.' },
    { t: 'fill', q: 'Wij hebben daar drie jaar ___. (wonen)', a: ['gewoond'], why: 'n is not in ’t kofschip → -d: gewoond.' },
    { t: 'mc', q: 'Zij ___ naar Brugge gegaan.', o: ['heeft', 'is'], a: 1, why: 'Movement to a destination → zijn: zij is gegaan.' },
    { t: 'fill', q: 'Hij heeft de huur ___. (betalen)', a: ['betaald'], why: 'Verbs in be- take no ge-: betaald.' }
  ] },

{ id: 'a2_02', level: 'A2', title: 'Simple past: regular verbs',
  read: [
    { h: '-te(n) or -de(n)', p: 'Same ’t kofschip logic: stem + te/ten if the stem ends in t, k, f, s, ch, p; otherwise stem + de/den. werken → werkte(n); wonen → woonde(n).',
      ex: [['Ik werkte vroeger in Brussel.', 'I used to work in Brussels.'],
           ['Zij woonden naast ons.', 'They lived next to us.']] },
    { h: 'When to use which past', p: 'Dutch mostly uses the PERFECT for single completed events in conversation ("Ik heb gegeten"), and the simple past for descriptions, habits and stories: "Het regende en we zaten binnen."',
      ex: [['Vroeger speelde ik elke dag voetbal.', 'I used to play football every day.'],
           ['Ik heb vanmorgen gesport.', 'I exercised this morning.']] }
  ],
  quiz: [
    { t: 'fill', q: 'Hij ___ vroeger veel. (roken)', a: ['rookte'], why: 'Stem rook ends in k → -te: rookte.' },
    { t: 'fill', q: 'Wij ___ in een klein dorp. (wonen)', a: ['woonden'], why: 'Stem woon → -den (plural): woonden.' },
    { t: 'fill', q: 'Zij ___ de deur. (openen)', a: ['opende'], why: 'Stem open + de: opende.' },
    { t: 'mc', q: 'Best tense in conversation for "I ate at noon":', o: ['Ik at om twaalf uur.', 'Ik heb om twaalf uur gegeten.'], a: 1, why: 'Single completed event in speech → perfect.' }
  ] },

{ id: 'a2_03', level: 'A2', title: 'Irregular past: the core verbs',
  read: [
    { h: 'Learn these cold', p: 'zijn → was/waren → geweest · hebben → had/hadden → gehad · gaan → ging → gegaan · komen → kwam → gekomen · zien → zag → gezien · doen → deed → gedaan · eten → at → gegeten · drinken → dronk → gedronken · kopen → kocht → gekocht · weten → wist → geweten.',
      ex: [['Ik was moe en ging vroeg slapen.', 'I was tired and went to sleep early.'],
           ['Hij kocht brood en at het meteen.', 'He bought bread and ate it right away.']] },
    { h: 'Vowel-change families', p: 'Many strong verbs follow patterns: ij → ee (schrijven, schreef, geschreven), ie → oo (kiezen? koos, gekozen), i/e → o (drinken, dronk, gedronken; vinden, vond, gevonden). Spotting the family halves the memorising.',
      ex: [['schrijven — schreef — geschreven', 'to write — wrote — written'],
           ['vinden — vond — gevonden', 'to find — found — found']] }
  ],
  quiz: [
    { t: 'fill', q: 'Gisteren ___ ik naar de markt. (gaan, past)', a: ['ging'], why: 'gaan → ging.' },
    { t: 'fill', q: 'Zij ___ een mooie film. (zien, past)', a: ['zag'], why: 'zien → zag.' },
    { t: 'fill', q: 'Wij ___ te veel koffie. (drinken, past)', a: ['dronken'], why: 'drinken → dronk(en).' },
    { t: 'fill', q: 'Participle of "schrijven": Hij heeft een boek ___.', a: ['geschreven'], why: 'ij → ee family: geschreven.' }
  ] },

{ id: 'a2_04', level: 'A2', title: 'Separable verbs',
  read: [
    { h: 'The prefix splits off', p: 'Verbs like opstaan, meenemen, aankomen split in main clauses: the prefix flies to the end. Ik sta om zeven uur op. In the infinitive and participle they close up again: opstaan, opgestaan (ge- goes between!).',
      ex: [['Ik neem mijn laptop mee.', 'I take my laptop along.'],
           ['De trein komt om tien uur aan.', 'The train arrives at ten.'],
           ['Ik ben vroeg opgestaan.', 'I got up early.']] },
    { h: 'With te and in subclauses', p: 'With om…te the te goes inside: om mee te nemen. In subclauses the verb doesn’t split: …omdat ik vroeg opsta.',
      ex: [['Vergeet niet om je paraplu mee te nemen.', 'Don’t forget to bring your umbrella.'],
           ['…omdat de trein laat aankomt.', '…because the train arrives late.']] }
  ],
  quiz: [
    { t: 'fill', q: 'Ik ___ elke dag om 7 uur ___. (opstaan)', a: ['sta ... op', 'sta op', 'sta...op', 'sta … op'], why: 'Main clause: "Ik sta … op." — prefix at the end.' },
    { t: 'mc', q: 'Participle of "aankomen":', o: ['geaankomen', 'aangekomen', 'aankomd'], a: 1, why: 'ge- goes between prefix and verb: aangekomen.' },
    { t: 'mc', q: 'Correct with om…te:', o: ['om op te staan', 'om te opstaan'], a: 0, why: 'Te splits the separable verb: om op te staan.' },
    { t: 'mc', q: '…omdat hij zijn zus ___.', o: ['belt op', 'opbelt'], a: 1, why: 'In a subclause the verb stays whole: opbelt.' }
  ] },

{ id: 'a2_05', level: 'A2', title: 'Modal verbs',
  read: [
    { h: 'kunnen · moeten · mogen · willen · zullen', p: 'Modals are conjugated in second position; the main verb goes to the end as a bare infinitive (no te): Ik kan morgen niet komen. Irregular singulars: ik kan, ik mag, ik wil, ik moet, ik zal.',
      ex: [['Ik moet vandaag werken.', 'I have to work today.'],
           ['Mag ik hier parkeren?', 'May I park here?'],
           ['Wij willen Nederlands leren.', 'We want to learn Dutch.']] },
    { h: 'Meaning nuances', p: 'kunnen = ability/possibility · moeten = must · mogen = permission · willen = want · zullen = shall (future, offers: "Zal ik helpen?"). Hoeven replaces moeten in negatives: Je hoeft niet te komen (note: with te!).',
      ex: [['Je hoeft dat niet te doen.', 'You don’t have to do that.'],
           ['Zal ik de deur openen?', 'Shall I open the door?']] }
  ],
  quiz: [
    { t: 'fill', q: '___ ik het raam openen? (permission)', a: ['mag'], why: 'Permission → mogen: "Mag ik…?".' },
    { t: 'mc', q: 'Correct:', o: ['Ik kan niet te komen.', 'Ik kan niet komen.', 'Ik kan niet kom.'], a: 1, why: 'Modal + bare infinitive at the end: "Ik kan niet komen."' },
    { t: 'mc', q: '"You don’t have to pay" =', o: ['Je moet niet betalen. (NL standard)', 'Je hoeft niet te betalen.'], a: 1, why: 'Negated obligation → hoeven + te. (🦁 In Flanders "ge moet niet" is common speech, but standard is hoeven.)' },
    { t: 'fill', q: 'Hij ___ goed koken. (ability)', a: ['kan'], why: 'Ability → kunnen: hij kan.' }
  ] },

{ id: 'a2_06', level: 'A2', title: 'Subclauses: verb to the end',
  read: [
    { h: 'omdat, als, dat…', p: 'After subordinating conjunctions (omdat, dat, als, terwijl, hoewel, toen, voordat, nadat, zodat…) ALL verbs move to the end of the clause: Ik blijf thuis omdat ik ziek ben.',
      ex: [['Ik denk dat hij gelijk heeft.', 'I think that he is right.'],
           ['Als het regent, blijven we binnen.', 'If it rains, we stay inside.']] },
    { h: 'Subclause first → inversion', p: 'If the subclause comes first, it fills position 1 of the main clause, so the main verb comes immediately after the comma: Omdat ik ziek ben, blijf ik thuis.',
      ex: [['Omdat het laat was, ging ik slapen.', 'Because it was late, I went to sleep.'],
           ['Terwijl ik kook, dekt hij de tafel.', 'While I cook, he sets the table.']] }
  ],
  quiz: [
    { t: 'mc', q: 'Ik blijf thuis omdat ik ___.', o: ['ben ziek', 'ziek ben'], a: 1, why: 'Verb-final in the omdat-clause: "…omdat ik ziek ben."' },
    { t: 'fill', q: 'Zij zegt dat ze morgen ___. (komen)', a: ['komt'], why: 'Verb at the end of the dat-clause: "…dat ze morgen komt."' },
    { t: 'mc', q: 'Als het regent, ___ we binnen.', o: ['we blijven', 'blijven'], a: 1, why: 'Subclause first → inversion: "…, blijven we binnen."' },
    { t: 'mc', q: 'Which conjunction does NOT send the verb to the end?', o: ['omdat', 'want', 'hoewel'], a: 1, why: '"Want" is coordinating — normal V2 word order follows.' }
  ] },

{ id: 'a2_07', level: 'A2', title: 'Comparative & superlative',
  read: [
    { h: '-er and -st', p: 'groot → groter → grootst; snel → sneller → snelst. Adjectives ending in -r insert d: duur → duurder. Than = dan: Hij is groter dan ik. As…as = even…als.',
      ex: [['Deze fiets is duurder dan die.', 'This bike is more expensive than that one.'],
           ['Zij is even oud als ik.', 'She is as old as me.']] },
    { h: 'Irregulars & usage', p: 'goed → beter → best · veel → meer → meest · weinig → minder → minst · graag → liever → liefst ("Ik drink liever thee" = I prefer tea). Superlative usually with het: het grootst / de grootste stad.',
      ex: [['Ik sport graag, maar ik lees liever.', 'I like sports, but I prefer reading.'],
           ['Antwerpen is de grootste stad van Vlaanderen.', 'Antwerp is the largest city of Flanders.']] }
  ],
  quiz: [
    { t: 'fill', q: 'Brussel is ___ dan Leuven. (groot)', a: ['groter'], why: 'Comparative: groter + dan.' },
    { t: 'fill', q: 'Deze jas is ___ dan die. (duur)', a: ['duurder'], why: 'Adjectives in -r insert d: duurder.' },
    { t: 'fill', q: 'Ik drink ___ koffie dan thee. (graag, comparative)', a: ['liever'], why: 'graag → liever: expressing preference.' },
    { t: 'mc', q: '"the best idea" =', o: ['het goedste idee', 'het beste idee'], a: 1, why: 'goed → best is irregular: het beste idee.' }
  ] },

{ id: 'a2_08', level: 'A2', title: 'om + te + infinitive',
  read: [
    { h: 'Purpose and after adjectives', p: 'Om…te + infinitive expresses purpose ("in order to") and follows many adjectives: Ik leer Nederlands om in Gent te studeren. Het is moeilijk om vroeg op te staan.',
      ex: [['Ik spaar om een huis te kopen.', 'I save (money) to buy a house.'],
           ['Het is leuk om nieuwe mensen te ontmoeten.', 'It is nice to meet new people.']] },
    { h: 'Verbs with te (no om)', p: 'Some verbs link directly with te: proberen, beginnen, vergeten, beloven, hoeven: Ik probeer elke dag te oefenen. Separable verbs wrap te inside: op te staan.',
      ex: [['Vergeet niet te bellen!', 'Don’t forget to call!'],
           ['Hij begint te begrijpen.', 'He is starting to understand.']] }
  ],
  quiz: [
    { t: 'fill', q: 'Ik ga naar de winkel ___ brood ___ kopen.', a: ['om ... te', 'om te', 'om...te', 'om … te'], why: 'Purpose → om … te + infinitive at the end.' },
    { t: 'mc', q: 'Correct:', o: ['Ik probeer te elke dag oefenen.', 'Ik probeer elke dag te oefenen.'], a: 1, why: 'Te comes directly before the final infinitive.' },
    { t: 'mc', q: 'With separable "opbellen":', o: ['om op te bellen', 'om te opbellen'], a: 0, why: 'Te goes inside the separable verb.' },
    { t: 'fill', q: 'Het is fijn ___ in de zon ___ zitten.', a: ['om ... te', 'om te', 'om...te', 'om … te'], why: 'After adjectives: Het is fijn om … te zitten.' }
  ] },

{ id: 'a2_09', level: 'A2', title: 'Reflexives & the imperative',
  read: [
    { h: 'Reflexive verbs', p: 'me, je, zich, ons, je, zich: Ik was me. Hij vergist zich. Some verbs are always reflexive: zich herinneren, zich vergissen, zich haasten. Stressed forms with -zelf only for contrast: Ik was mezelf.',
      ex: [['Ik herinner me die dag goed.', 'I remember that day well.'],
           ['Zij haast zich naar het werk.', 'She hurries to work.']] },
    { h: 'Imperative', p: 'Use the stem: Kom hier! Wacht even! Polite with u: Komt u binnen. Softeners: eens, even, maar — "Kom eens kijken!" 🦁 Flemish speech often softens with "… hé" or "… zeker".',
      ex: [['Wacht even!', 'Wait a moment!'],
           ['Neemt u plaats.', 'Please take a seat. (polite)']] }
  ],
  quiz: [
    { t: 'fill', q: 'Hij vergist ___ vaak.', a: ['zich'], why: 'Third person reflexive → zich.' },
    { t: 'fill', q: 'Wij herinneren ___ dat feest nog.', a: ['ons'], why: 'First person plural reflexive → ons.' },
    { t: 'mc', q: 'Imperative of "komen":', o: ['Komt hier!', 'Kom hier!', 'Komen hier!'], a: 1, why: 'Imperative = stem: Kom!' },
    { t: 'mc', q: '"Ik was ___ elke ochtend."', o: ['me', 'mezelf', 'mij zelf'], a: 0, why: 'Routine action → unstressed reflexive me.' }
  ] },

{ id: 'a2_10', level: 'A2', title: 'Future & diminutives',
  read: [
    { h: 'Talking about the future', p: 'Three ways: present + time word (Ik vertrek morgen), gaan + infinitive for plans (Ik ga morgen sporten), zullen for promises/predictions/proposals (Ik zal je helpen. Zullen we gaan?).',
      ex: [['Morgen ga ik mijn cv schrijven.', 'Tomorrow I’m going to write my CV.'],
           ['Zullen we samen studeren?', 'Shall we study together?']] },
    { h: 'Diminutives -je', p: 'Every diminutive is a het-word: het huisje. Endings: -je (huisje), -tje (autootje, vrouwtje), -etje (zonnetje), -pje (boompje), -kje (koninkje). 🦁 Flanders loves -ke in speech: een pintje/pintke, een koffieke — informal, warm, extremely common.',
      ex: [['een biertje, een terrasje, een momentje', 'a beer, a terrace visit, a moment'],
           ['🦁 een koffieke doen (spoken Flemish)', 'to grab a coffee']] }
  ],
  quiz: [
    { t: 'mc', q: 'A plan for tomorrow — most natural:', o: ['Ik zal morgen lopen.', 'Ik ga morgen lopen.'], a: 1, why: 'Plans/intentions → gaan + infinitive.' },
    { t: 'fill', q: '___ we vanavond samen eten? (proposal)', a: ['zullen'], why: 'Proposals → "Zullen we…?".' },
    { t: 'fill', q: 'Diminutive of "huis": het ___', a: ['huisje'], why: 'huis → huisje.' },
    { t: 'mc', q: 'Diminutives are always…', o: ['de-words', 'het-words'], a: 1, why: 'All diminutives are neuter: het huisje, het meisje.' }
  ] },

/* ═══════════════════════ B1 ═══════════════════════ */
{ id: 'b1_01', level: 'B1', title: 'The word "er" — five jobs',
  read: [
    { h: 'Place, subject, quantity', p: '1) Place (= daar, unstressed): Ik woon er al jaren. 2) Dummy subject with indefinite subjects: Er loopt een kat in de tuin. 3) Quantity, with numbers: Hoeveel heb je er? Ik heb er drie ("of them" — obligatory in Dutch!).',
      ex: [['Er staat een man aan de deur.', 'There is a man at the door.'],
           ['Ik heb er twee.', 'I have two (of them).']] },
    { h: 'With prepositions & passive', p: '4) Er + preposition replaces preposition + thing: Ik denk eraan. Ik ben er trots op. 5) Impersonal passive: Er wordt gelachen (there is laughing). Combinations: max one er — "Er wordt er…" collapses.',
      ex: [['Denk je aan je afspraak? — Ja, ik denk eraan.', 'Are you thinking of your appointment? — Yes, I am.'],
           ['Er wordt hier hard gewerkt.', 'People work hard here.']] }
  ],
  quiz: [
    { t: 'fill', q: 'Hoeveel katten heb je? — Ik heb ___ twee.', a: ['er'], why: 'Quantitative er is obligatory with numbers: "Ik heb er twee."' },
    { t: 'mc', q: '___ staat een fiets voor de deur.', o: ['Het', 'Er', 'Daar (unstressed)'], a: 1, why: 'Indefinite subject introduced → er.' },
    { t: 'fill', q: 'Ben je tevreden met het resultaat? — Ja, ik ben ___ tevreden mee.', a: ['er'], why: 'Er + preposition (er…mee) replaces "met het resultaat".' },
    { t: 'mc', q: '"Er wordt gedanst" means…', o: ['It is being danced (nonsense)', 'People are dancing', 'The dance happens tomorrow'], a: 1, why: 'Impersonal passive: an activity without a specific subject.' }
  ] },

{ id: 'b1_02', level: 'B1', title: 'Relative clauses: die & dat',
  read: [
    { h: 'die or dat', p: 'The relative pronoun matches the noun: de-words and all plurals → die; het-words singular → dat. The relative clause has subclause word order (verb final): De man die daar staat, is mijn buur.',
      ex: [['Het boek dat ik lees, is spannend.', 'The book I’m reading is exciting.'],
           ['De mensen die hier wonen, zijn vriendelijk.', 'The people who live here are friendly.']] },
    { h: 'wie and wat', p: 'Wat after alles, iets, niets, dat and after a whole clause: Alles wat je zegt… Dat is iets wat ik niet begrijp. Wie for people after a preposition: de vrouw met wie ik werk.',
      ex: [['Er is niets wat ik liever doe.', 'There is nothing I’d rather do.'],
           ['De collega met wie ik samenwerk, is ziek.', 'The colleague I work with is ill.']] }
  ],
  quiz: [
    { t: 'mc', q: 'Het huis ___ te koop staat, is oud.', o: ['die', 'dat', 'wat'], a: 1, why: 'Het huis → dat.' },
    { t: 'mc', q: 'De trein ___ naar Brussel rijdt, heeft vertraging.', o: ['die', 'dat'], a: 0, why: 'De trein → die.' },
    { t: 'fill', q: 'Alles ___ hij zegt, is waar.', a: ['wat'], why: 'After alles → wat.' },
    { t: 'mc', q: 'De vriend ___ ik op reis ga…', o: ['met die', 'met wie', 'waarmee'], a: 1, why: 'Person after preposition → met wie (waarmee is for things).' }
  ] },

{ id: 'b1_03', level: 'B1', title: 'Relatives with prepositions: waar + prep',
  read: [
    { h: 'Things: waar + preposition', p: 'For things, preposition + die/dat is impossible — merge into waar+prep: het project waaraan ik werk; de stoel waarop je zit. The parts may split: de stoel waar je op zit.',
      ex: [['De cursus waarvoor ik betaal, is goed.', 'The course I pay for is good.'],
           ['Het liedje waarnaar we luisteren…', 'The song we’re listening to…']] },
    { h: 'met → waarmee, tot → waartoe', p: 'Note the fused forms: met → waarmee, tot → waartoe. Same logic for question words: Waarmee schrijf je? (With what do you write?). For people keep prep + wie: met wie, voor wie.',
      ex: [['De pen waarmee ik schrijf, is leeg.', 'The pen I write with is empty.'],
           ['Waarover praten jullie?', 'What are you talking about?']] }
  ],
  quiz: [
    { t: 'fill', q: 'Het bedrijf ___ ik werk, groeit snel. (voor)', a: ['waarvoor'], why: 'Thing + voor → waarvoor.' },
    { t: 'mc', q: 'De muziek ___ we dansen…', o: ['op die', 'waarop', 'op wat'], a: 1, why: 'Thing + op → waarop.' },
    { t: 'fill', q: 'De vork ___ ik eet… (met)', a: ['waarmee'], why: 'met fuses to waarmee.' },
    { t: 'mc', q: 'Correct for a person:', o: ['de man waarmee ik praat', 'de man met wie ik praat'], a: 1, why: 'Standard language prefers met wie for people (waarmee is common in speech but informal).' }
  ] },

{ id: 'b1_04', level: 'B1', title: 'The passive: worden & zijn',
  read: [
    { h: 'worden + participle', p: 'Active: De bakker bakt het brood. Passive: Het brood wordt (door de bakker) gebakken. Imperfect: werd gebakken. The doer takes door.',
      ex: [['De huizen worden volgend jaar gerenoveerd.', 'The houses will be renovated next year.'],
           ['Ik werd door een vriend uitgenodigd.', 'I was invited by a friend.']] },
    { h: 'Perfect passive: zijn (no geworden)', p: 'In the perfect, Dutch drops "geworden": Het brood is gebakken (= has been baked). So "is + participle" can be a completed passive — context tells you whether it’s a state or an event.',
      ex: [['De fout is gisteren ontdekt.', 'The mistake was discovered yesterday.'],
           ['De deur is al gesloten.', 'The door is already closed / has been closed.']] }
  ],
  quiz: [
    { t: 'fill', q: 'Deze kerk ___ in 1300 gebouwd. (past)', a: ['werd'], why: 'Simple past passive → werd + participle.' },
    { t: 'mc', q: '"The email has been sent" =', o: ['De e-mail is verstuurd geworden.', 'De e-mail is verstuurd.'], a: 1, why: 'Perfect passive drops geworden: "is verstuurd".' },
    { t: 'fill', q: 'Het gras wordt elke week ___. (maaien)', a: ['gemaaid'], why: 'worden + participle: gemaaid.' },
    { t: 'mc', q: 'The doer in a passive sentence is introduced by…', o: ['van', 'door', 'bij'], a: 1, why: '"door": Het boek werd door haar geschreven.' }
  ] },

{ id: 'b1_05', level: 'B1', title: 'Conjunctions: two word orders',
  read: [
    { h: 'Coordinating: no change', p: 'en, maar, of, want, dus join two MAIN clauses — word order stays V2: Ik blijf thuis, want ik ben ziek.',
      ex: [['Hij is moe, maar hij werkt door.', 'He is tired, but he keeps working.'],
           ['Het regent, dus nemen we de bus. / dus we nemen de bus.', 'It’s raining, so we take the bus.']] },
    { h: 'Subordinating: verb final', p: 'omdat, hoewel, terwijl, zodra, voordat, nadat, zodat, tenzij, toen… → verb to the end. Meaning pairs to watch: want/omdat (because), maar/hoewel (but/although), of = "or" ánd "whether/if".',
      ex: [['Ik weet niet of hij komt.', 'I don’t know whether he’s coming.'],
           ['Zodra ik thuis ben, bel ik je.', 'As soon as I’m home, I’ll call you.']] }
  ],
  quiz: [
    { t: 'mc', q: 'Ik blijf binnen, want ___.', o: ['het regent', 'het regent hard vandaag → regent het', 'regent het'], a: 0, why: 'Want = coordinating → normal V2: "want het regent".' },
    { t: 'mc', q: 'Ik blijf binnen omdat ___.', o: ['het regent', 'regent het', 'het aan het regenen'], a: 0, why: 'Omdat sends the verb to the end: "omdat het regent" — here that happens to look identical; the verb regent is final.' },
    { t: 'fill', q: 'Ik weet niet ___ zij morgen komt. (whether)', a: ['of'], why: '"Of" = whether in indirect questions.' },
    { t: 'mc', q: '___ hij rijk is, leeft hij zuinig. (although)', o: ['Maar', 'Hoewel', 'Want'], a: 1, why: 'Hoewel = although (subordinating).' }
  ] },

{ id: 'b1_06', level: 'B1', title: 'Indirect speech & questions',
  read: [
    { h: 'dat / of', p: 'Statements → dat-clause: Hij zegt dat hij moe is. Yes/no questions → of: Ze vraagt of ik kom. Verb goes to the end; watch pronoun and tense shifts like in English.',
      ex: [['Ze zei dat ze geen tijd had.', 'She said she had no time.'],
           ['Hij vraagt of we morgen vrij zijn.', 'He asks whether we are free tomorrow.']] },
    { h: 'Question-word clauses', p: 'WH-questions keep their question word, subclause order: Ik weet niet waar hij woont. Never invert inside: NOT "waar woont hij" as a subclause.',
      ex: [['Weet jij hoe laat de winkel opengaat?', 'Do you know what time the shop opens?'],
           ['Ik vraag me af waarom dat gebeurd is.', 'I wonder why that happened.']] }
  ],
  quiz: [
    { t: 'fill', q: 'Hij zegt ___ hij ziek is.', a: ['dat'], why: 'Indirect statement → dat.' },
    { t: 'fill', q: 'Zij vraagt ___ ik morgen kan komen.', a: ['of'], why: 'Indirect yes/no question → of.' },
    { t: 'mc', q: 'Correct indirect question:', o: ['Ik weet niet waar woont hij.', 'Ik weet niet waar hij woont.'], a: 1, why: 'Subclause order: subject before verb, verb final.' },
    { t: 'mc', q: '"Ze zei dat ze morgen ___ komen."', o: ['zal', 'zou'], a: 1, why: 'Past reporting verb → zou (tense shift).' }
  ] },

{ id: 'b1_07', level: 'B1', title: 'Conditionals with zou',
  read: [
    { h: 'zou = would', p: 'Zou/zouden + infinitive expresses hypothesis, politeness and desire: Ik zou graag een koffie willen. Dat zou leuk zijn. Polite requests: Zou je me kunnen helpen?',
      ex: [['Ik zou dat nooit doen.', 'I would never do that.'],
           ['Zou u dat kunnen herhalen?', 'Could you repeat that, please?']] },
    { h: 'Als-sentences', p: 'Realistic: Als het regent, blijven we thuis (present). Hypothetical: Als ik rijk was, zou ik reizen (past tense in the als-clause + zou). Very common alternative: double past — Als ik rijk was, reisde ik de wereld rond.',
      ex: [['Als ik jou was, zou ik het vragen.', 'If I were you, I would ask.'],
           ['Als we tijd hadden, zouden we langskomen.', 'If we had time, we would drop by.']] }
  ],
  quiz: [
    { t: 'fill', q: 'Als ik jou ___, zou ik gaan. (zijn, past)', a: ['was'], why: 'Hypothetical als-clause takes the simple past: "Als ik jou was…".' },
    { t: 'fill', q: '___ je het raam kunnen sluiten? (polite)', a: ['zou'], why: 'Polite request: "Zou je … kunnen …?".' },
    { t: 'mc', q: '"Dat ___ fantastisch zijn!"', o: ['zal', 'zou', 'zult'], a: 1, why: 'Hypothetical → zou: "Dat zou fantastisch zijn!"' },
    { t: 'mc', q: 'Realistic condition:', o: ['Als het sneeuwt, zouden we skiën gingen.', 'Als het sneeuwt, gaan we skiën.'], a: 1, why: 'Realistic conditions use the present in both halves.' }
  ] },

{ id: 'b1_08', level: 'B1', title: 'te + infinitive constructions',
  read: [
    { h: 'Verbs that need te', p: 'proberen, beloven, vergeten, weigeren, besluiten, hopen, hoeven + te: Hij weigert te betalen. With separable verbs te goes inside: Ze besluit mee te doen.',
      ex: [['Ik hoop je snel te zien.', 'I hope to see you soon.'],
           ['Je hoeft niet te wachten.', 'You don’t need to wait.']] },
    { h: 'Without te / zonder te', p: 'No te after modals, laten, gaan, komen, blijven, zien, horen: Ik laat mijn fiets repareren. Ik zie hem lopen. Fixed: zonder te (without -ing), in plaats van te (instead of -ing).',
      ex: [['Hij vertrok zonder iets te zeggen.', 'He left without saying anything.'],
           ['Ik hoor de buren zingen.', 'I hear the neighbours singing.']] }
  ],
  quiz: [
    { t: 'mc', q: 'Ik probeer elke dag ___ .', o: ['sporten', 'te sporten'], a: 1, why: 'proberen + te + infinitive.' },
    { t: 'mc', q: 'Ik laat mijn haar ___ .', o: ['knippen', 'te knippen'], a: 0, why: 'laten + bare infinitive: "laten knippen".' },
    { t: 'fill', q: 'Hij ging weg zonder gedag ___ zeggen.', a: ['te'], why: 'zonder te + infinitive.' },
    { t: 'mc', q: 'With separable "opgeven":', o: ['Ze belooft niet op te geven.', 'Ze belooft niet te opgeven.'], a: 0, why: 'Te goes inside separable verbs: op te geven.' }
  ] },

{ id: 'b1_09', level: 'B1', title: 'Pronominal adverbs: eraan, ermee, waarvan',
  read: [
    { h: 'Never "aan het" for things', p: 'Preposition + het/dat/dit is replaced: aan het → eraan (or daaraan/hieraan stressed). Ik denk eraan. Daar ben ik trots op. In questions: waaraan/waarvan (or split: Waar denk je aan?).',
      ex: [['Ik ben ermee akkoord.', 'I agree with it.'],
           ['Daar heb ik geen zin in.', 'I don’t feel like that.']] },
    { h: 'Splitting', p: 'The parts usually split around other material: Ik denk er vaak aan. Waar ben je mee bezig? The er-part comes early, the preposition lands near the end.',
      ex: [['Ik kijk er echt naar uit.', 'I’m really looking forward to it.'],
           ['Waar ben je bang voor?', 'What are you afraid of?']] }
  ],
  quiz: [
    { t: 'mc', q: '"I agree with it" =', o: ['Ik ben akkoord met het.', 'Ik ben ermee akkoord.'], a: 1, why: 'met + het → ermee.' },
    { t: 'fill', q: 'Ik kijk ___ naar uit. (split, unstressed)', a: ['er'], why: 'Split pronominal adverb: "Ik kijk er … naar uit."' },
    { t: 'fill', q: '___ denk je aan? (question, split)', a: ['waar'], why: '"Waar denk je aan?" = What are you thinking about?' },
    { t: 'mc', q: 'Stressed variant of "eraan" pointing to something just mentioned:', o: ['hieraan/daaraan', 'eraan blijft', 'aan dat'], a: 0, why: 'Stressed: daaraan (that) / hieraan (this).' }
  ] },

{ id: 'b1_10', level: 'B1', title: 'Fixed verb + preposition pairs',
  read: [
    { h: 'Learn verb + prep as one unit', p: 'wachten op (wait for), denken aan (think of), houden van (love), zoeken naar (search for), luisteren naar, kijken naar, vragen om, geloven in, lijken op (resemble), zorgen voor (take care of).',
      ex: [['Ik wacht al een uur op de bus.', 'I’ve been waiting for the bus for an hour.'],
           ['Zij lijkt op haar moeder.', 'She resembles her mother.']] },
    { h: 'More pairs + usage', p: 'zich verheugen op (look forward to), afhangen van (depend on), deelnemen aan (participate in), twijfelen aan (doubt), genieten van (enjoy). Combine with er/waar: Waar wacht je op? Ik geniet ervan.',
      ex: [['Dat hangt van het weer af.', 'That depends on the weather.'],
           ['Ik neem deel aan de cursus.', 'I take part in the course.']] }
  ],
  quiz: [
    { t: 'fill', q: 'Ik wacht ___ de trein.', a: ['op'], why: 'wachten op = to wait for.' },
    { t: 'fill', q: 'Zij houdt ___ chocolade.', a: ['van'], why: 'houden van = to love.' },
    { t: 'fill', q: 'Dat hangt ___ jou af.', a: ['van'], why: 'afhangen van = to depend on.' },
    { t: 'fill', q: 'Hij lijkt ___ zijn vader.', a: ['op'], why: 'lijken op = to resemble.' }
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

/* ════════════════════════════════════════════════════════════
   Language Tracker — language registry, translations & resources
   Each tracked language has its own IndexedDB, visual identity
   and UI language (immersion: the app speaks the target language).
   ════════════════════════════════════════════════════════════ */

const LANGS = {
  nl: {
    code: 'nl',
    dbName: 'DutchTrackerDB',      // pre-existing DB: keeps all current data
    locale: 'nl-BE',
    name: 'Nederlands',
    short: 'NL',
    flag: '🇧🇪',
    wordmark: 'NL_TRACKER',
    title: 'Dutch Tracker',
    stripes: ['#000000', '#fdda24'],            // Flemish black & yellow
    tags: ['podcast', 'boek', 'artikel', 'video', 'gesprek', 'tutor', 'oefening', 'cursus', 'app'],
    hoursUnit: 'uur',
    unitOptions: [
      { value: 'uur', key: 'u_hours' },
      { value: 'kaarten', key: 'u_cards' },
      { value: 'pagina', key: 'u_pages' },
      { value: 'les', key: 'u_lessons' },
      { value: 'stuk', key: 'u_pieces' }
    ],
    recurringUnitOptions: [
      { value: 'min', key: 'u_min' },
      { value: 'kaarten', key: 'u_cards' },
      { value: 'pagina', key: 'u_pages' },
      { value: 'stuk', key: 'u_pieces' }
    ],
    dayNames: ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo']
  },
  fr: {
    code: 'fr',
    dbName: 'FrenchTrackerDB',
    locale: 'fr-FR',
    name: 'Français',
    short: 'FR',
    flag: '🇫🇷',
    wordmark: 'FR_TRACKER',
    title: 'French Tracker',
    stripes: ['#002395', '#ffffff', '#ed2939'], // tricolore
    tags: ['podcast', 'livre', 'article', 'vidéo', 'conversation', 'tuteur', 'exercice', 'cours', 'appli'],
    hoursUnit: 'h',
    unitOptions: [
      { value: 'h', key: 'u_hours' },
      { value: 'cartes', key: 'u_cards' },
      { value: 'pages', key: 'u_pages' },
      { value: 'leçons', key: 'u_lessons' },
      { value: 'unités', key: 'u_pieces' }
    ],
    recurringUnitOptions: [
      { value: 'min', key: 'u_min' },
      { value: 'cartes', key: 'u_cards' },
      { value: 'pages', key: 'u_pages' },
      { value: 'unités', key: 'u_pieces' }
    ],
    dayNames: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di']
  }
};

/* Skill metadata shared across languages (labels live in I18N). */
const SKILLS = ['listening', 'reading', 'writing', 'speaking', 'grammar'];
const SKILL_META = {
  listening: { color: 'var(--teal)',   bg: 'var(--teal-dim)',   icon: '🎧' },
  reading:   { color: 'var(--blue)',   bg: 'var(--blue-dim)',   icon: '📖' },
  writing:   { color: 'var(--purple)', bg: 'var(--purple-dim)', icon: '✍️' },
  speaking:  { color: 'var(--red)',    bg: 'var(--red-dim)',    icon: '🗣️' },
  grammar:   { color: 'var(--amber)',  bg: 'var(--amber-glow)', icon: '📐' }
};

const I18N = {
  /* ─────────────── Nederlands ─────────────── */
  nl: {
    // navigation
    nav_dashboard: 'Overzicht', nav_log: 'Loggen', nav_stats: 'Stats', nav_more: 'Meer',
    // dashboard
    today: 'Vandaag',
    hours_unit: 'uur', hours_short: 'u',
    streak_title: 'Reeks 🔥', days_unit: 'dagen', best_streak: 'beste: {n}',
    anki_today: 'Anki vandaag', cards_unit: 'kaarten',
    total_hours: 'Totale studie-uren',
    sessions_title: 'Vandaag · Sessies',
    sessions_empty: 'Nog geen sessies vandaag — start de stopwatch!',
    goals_title: 'Doelen', goal_new: '+ Nieuw doel',
    week_label: 'Week {n}', week_now: 'Week {n} · nu',
    week_goal: 'Weekdoel', week_total: 'Totaal: {n}u', left_to_go: '{n}u nog te gaan',
    skills_total_title: 'Totaal per vaardigheid', total_label: 'Totaal',
    goal_msg_0: 'Begin met studeren!', goal_msg_25: 'Goed begin!',
    goal_msg_50: 'Je bent op weg!', goal_msg_75: 'Meer dan halverwege!',
    goal_msg_99: 'Bijna daar!', goal_msg_100: 'Doel bereikt!',
    quick_add: 'Snel loggen', quick_add_hint: 'Kies minuten, tik een vaardigheid — direct opgeslagen',
    risk_banner: '🔥 Reeks van {n} dagen in gevaar — studeer vandaag nog!',
    // skills
    skill_listening: 'Luisteren', skill_reading: 'Lezen', skill_writing: 'Schrijven',
    skill_speaking: 'Spreken', skill_grammar: 'Grammatica',
    skill_listening_s: 'L', skill_reading_s: 'R', skill_writing_s: 'W',
    skill_speaking_s: 'S', skill_grammar_s: 'G',
    active_label: 'Actief', passive_label: 'Passief', passive_tag: 'passief',
    // log view
    stopwatch: 'Stopwatch', start: 'Start', pause: 'Pauze', stop: 'Stop',
    skill: 'Vaardigheid', time_label: 'Tijd:',
    passive_title: 'Passief luisteren', passive_sub: 'Achtergrondpodcast tijdens afwas, wandelen…',
    passive_short: 'Passief',
    cancel: 'Annuleer', save: 'Opslaan', clear: 'Wissen', undo: 'Ongedaan',
    calc_title: 'Video calculator', calc_ph: '12:34 of 24.5',
    calc_hint: 'Tip: typ <span class="mono">12:34</span> voor 12 min 34 sec, <span class="mono">1:02:30</span> voor uren — of gewoon minuten als getal.',
    calc_save: 'Opslaan als sessie', calc_transfer: '→ Minuten veld',
    manual_title: 'Handmatige invoer', date: 'Datum', minutes: 'Minuten',
    tags: 'Tags', notes: 'Notities', optional_ph: 'Optioneel…',
    anki_title: 'Anki kaarten', anki_reviewed: 'Kaarten herhaald',
    // stats
    period_week: 'Week', period_month: 'Maand', period_all: 'Alles',
    chart_hours_title: 'Studietijd · uren per dag',
    chart_skill_title: 'Vaardigheid verdeling',
    chart_tag_title: 'Verdeling per tag',
    history_title: 'Geschiedenis', search_ph: 'Zoek in notities, tags…',
    all_label: 'Alles', no_tags: 'Geen tags', no_data: 'Nog geen data',
    goal_line: 'doel', total_chart: 'totaal',
    heatmap_title: 'Activiteit · laatste 16 weken', hm_less: 'minder', hm_more: 'meer',
    summary_week: 'Deze week', summary_vs: 'vs vorige week',
    summary_avg: 'Gem. per dag · 30d', summary_active: 'Actieve dagen · 30d',
    summary_top: 'Top vaardigheid · 30d',
    badges_title: 'Prestaties',
    // settings
    prefs_title: 'Voorkeuren',
    dark_mode: 'Donkere modus', dark_mode_desc: 'Schakel tussen licht en donker',
    daily_goal: 'Dagelijks doel (uren)', daily_goal_desc: 'Standaard: 2 uur',
    extend_day: 'Dag verlengen na middernacht', extend_day_desc: 'Tot 03:00 als gisteren meetellen',
    reminder: 'Dagelijkse herinnering', reminder_desc: 'Melding als je nog niet studeerde (app open)',
    reminder_msg: 'Tijd voor Nederlands! 🇧🇪 Nog geen studie vandaag.',
    data_title: 'Gegevens',
    data_note: 'Gegevens zijn per taal gescheiden — je beheert nu <b>{lang}</b>.',
    export_btn: 'Gegevens exporteren (JSON)', import_btn: 'Gegevens importeren',
    reset_btn: 'Alle gegevens wissen',
    install_title: 'Installatie als app',
    install_android: 'Menu (⋮) → "Toevoegen aan startscherm"',
    install_ios: 'Deel-knop (↑) → "Zet op beginscherm"',
    install_note: 'De app werkt dan volledig offline, geen internet nodig.',
    footer_quote: '"Een taal leer je met je oren."',
    // goals
    goal_modal_new: 'Nieuw doel', goal_modal_edit: 'Doel bewerken',
    goal_name: 'Naam', goal_name_ph: 'bijv. B1 Examen', goal_type: 'Type',
    goal_type_total: 'Totaal doel', goal_type_recurring: 'Terugkerend doel', goal_type_streak: 'Streak doel',
    goal_target: 'Doel waarde', goal_unit: 'Eenheid', goal_source: 'Bron',
    src_hours: 'Automatisch (studie-uren)', src_anki: 'Automatisch (Anki kaarten)', src_manual: 'Handmatig bijwerken',
    src_hours_short: 'Auto (studie-uren)', src_anki_short: 'Auto (Anki)', src_manual_short: 'Handmatig',
    goal_skill_filter: 'Vaardigheid filter (optioneel)', goal_skill_filter2: 'Vaardigheid filter',
    all_skills: 'Alle vaardigheden',
    goal_per_period: 'Doel per periode', goal_period: 'Periode',
    per_day: 'Per dag', per_week: 'Per week',
    goal_streak_target: 'Streak doel (dagen)', goal_streak_min: 'Min. minuten/dag',
    goal_include_passive: 'Passief luisteren meetellen',
    goal_deadline: 'Deadline (optioneel)', milestones: 'Mijlpalen', ms_add: '+ Toevoegen',
    ms_name_ph: 'Naam', ms_value_ph: 'Waarde',
    color: 'Kleur', c_amber: 'Amber', c_teal: 'Teal', c_blue: 'Blauw', c_purple: 'Paars', c_red: 'Rood',
    u_hours: 'Uren', u_cards: 'Kaarten', u_pages: "Pagina's", u_lessons: 'Lessen', u_pieces: 'Stuks', u_min: 'Minuten',
    goal_pace: '{n} {unit}/dag nodig ({d} dagen over)', goal_reached: 'Doel bereikt!',
    deadline_passed: 'Deadline verstreken',
    streak_days_label: 'dagen streak', streak_target_label: ' / {n} doel',
    goal_progress_title: 'Voortgang bijwerken', goal_progress_prefix: 'Voortgang: ',
    value_label: 'Waarde',
    update_progress: 'Voortgang bijwerken', edit_action: 'Bewerken', archive_action: 'Archiveren',
    delete_action: 'Verwijderen', restore_action: 'Terugzetten',
    archived_goals: 'Gearchiveerd ({n})',
    // edit modal
    edit_title: 'Invoer bewerken',
    // toasts & confirms
    t_saved: 'Sessie opgeslagen', t_undone: 'Ongedaan gemaakt!',
    t_pick_date: 'Kies een datum!', t_fill_minutes: 'Vul minuten in!',
    t_fill_cards: 'Vul kaarten in!', t_anki_saved: 'Anki kaarten opgeslagen!',
    t_manual_undo: 'Handmatige invoer', t_anki_undo: 'Anki invoer',
    t_fill_time: 'Vul een tijd in! bijv. 12:34', t_no_values: 'Nog geen waarden!',
    t_transferred: '{n} min overgenomen',
    t_not_found: 'Item niet gevonden', t_updated: 'Bijgewerkt!',
    t_fill_date_min: 'Vul datum en minuten in!', t_edit_undo: 'Bewerking ongedaan',
    t_deleted: 'Verwijderd', t_delete_undo: 'Item verwijderd',
    c_delete_entry: 'Dit item verwijderen?',
    t_fill_name: 'Vul een naam in!', t_fill_target: 'Vul een doelwaarde in!',
    t_goal_created: 'Doel aangemaakt!', t_goal_updated: 'Doel bijgewerkt!',
    c_archive_goal: 'Dit doel archiveren?', t_goal_archived: 'Doel gearchiveerd',
    c_delete_goal: 'Dit doel definitief verwijderen?', t_goal_deleted: 'Doel verwijderd',
    t_goal_restored: 'Doel teruggezet',
    t_progress_saved: 'Voortgang opgeslagen!', t_fill_date_value: 'Vul datum en waarde in!',
    t_exported: 'Gegevens geëxporteerd!', t_imported: 'Gegevens geïmporteerd!',
    t_import_err: 'Fout bij importeren!',
    c_reset1: 'Alle gegevens van {lang} wissen? Dit kan niet ongedaan worden!',
    c_reset2: 'Weet je het zeker? Alle studie-data van {lang} wordt verwijderd.',
    t_reset_done: 'Alle gegevens gewist',
    t_stop_timer: 'Stop eerst de stopwatch!',
    t_new_badge: 'Nieuwe prestatie: {name}',
    // badges
    badge_first_name: 'Eerste stap', badge_first_desc: 'Eerste sessie gelogd',
    badge_s7_name: 'Volle week', badge_s7_desc: '7 dagen op rij',
    badge_s30_name: 'IJzeren wil', badge_s30_desc: '30 dagen op rij',
    badge_s100_name: 'Onverzettelijk', badge_s100_desc: '100 dagen op rij',
    badge_h10_name: 'Op dreef', badge_h10_desc: '10 uur totaal',
    badge_h50_name: 'Boekenwurm', badge_h50_desc: '50 uur totaal',
    badge_h100_name: 'Century', badge_h100_desc: '100 uur totaal',
    badge_h250_name: 'Meesterschap', badge_h250_desc: '250 uur totaal',
    badge_day5_name: 'Marathon', badge_day5_desc: '5 uur op één dag',
    badge_all_name: 'Allrounder', badge_all_desc: 'Alle 5 vaardigheden in één week',
    badge_anki_name: 'Kaartenhaai', badge_anki_desc: '1000 Anki-kaarten',
    badge_pw_name: 'Perfecte week', badge_pw_desc: 'Dagdoel 7 dagen op rij gehaald'
  },

  /* ─────────────── Français ─────────────── */
  fr: {
    nav_dashboard: 'Aperçu', nav_log: 'Journal', nav_stats: 'Stats', nav_more: 'Plus',
    today: "Aujourd'hui",
    hours_unit: 'heures', hours_short: 'h',
    streak_title: 'Série 🔥', days_unit: 'jours', best_streak: 'record : {n}',
    anki_today: "Anki aujourd'hui", cards_unit: 'cartes',
    total_hours: "Total d'heures d'étude",
    sessions_title: "Aujourd'hui · Séances",
    sessions_empty: "Pas encore de séance aujourd'hui — lance le chrono !",
    goals_title: 'Objectifs', goal_new: '+ Nouvel objectif',
    week_label: 'Semaine {n}', week_now: 'Semaine {n} · en cours',
    week_goal: 'Objectif hebdo', week_total: 'Total : {n}h', left_to_go: '{n}h restantes',
    skills_total_title: 'Total par compétence', total_label: 'Total',
    goal_msg_0: 'Commence à étudier !', goal_msg_25: "C'est parti !",
    goal_msg_50: 'Tu es bien lancé !', goal_msg_75: 'Plus de la moitié !',
    goal_msg_99: 'Presque au but !', goal_msg_100: 'Objectif atteint !',
    quick_add: 'Ajout rapide', quick_add_hint: 'Choisis les minutes, touche une compétence — enregistré direct',
    risk_banner: '🔥 Série de {n} jours en jeu — étudie encore aujourd\'hui !',
    skill_listening: 'Écoute', skill_reading: 'Lecture', skill_writing: 'Écriture',
    skill_speaking: 'Oral', skill_grammar: 'Grammaire',
    skill_listening_s: 'E', skill_reading_s: 'L', skill_writing_s: 'É',
    skill_speaking_s: 'O', skill_grammar_s: 'G',
    active_label: 'Active', passive_label: 'Passive', passive_tag: 'passive',
    stopwatch: 'Chronomètre', start: 'Démarrer', pause: 'Pause', stop: 'Stop',
    skill: 'Compétence', time_label: 'Temps :',
    passive_title: 'Écoute passive', passive_sub: 'Podcast en fond pendant la vaisselle, la marche…',
    passive_short: 'Passive',
    cancel: 'Annuler', save: 'Enregistrer', clear: 'Effacer', undo: 'Annuler',
    calc_title: 'Calculatrice vidéo', calc_ph: '12:34 ou 24.5',
    calc_hint: 'Astuce : tape <span class="mono">12:34</span> pour 12 min 34 s, <span class="mono">1:02:30</span> pour les heures — ou simplement les minutes en chiffres.',
    calc_save: 'Enregistrer comme séance', calc_transfer: '→ Champ minutes',
    manual_title: 'Saisie manuelle', date: 'Date', minutes: 'Minutes',
    tags: 'Tags', notes: 'Notes', optional_ph: 'Facultatif…',
    anki_title: 'Cartes Anki', anki_reviewed: 'Cartes révisées',
    period_week: 'Semaine', period_month: 'Mois', period_all: 'Tout',
    chart_hours_title: "Temps d'étude · heures par jour",
    chart_skill_title: 'Répartition par compétence',
    chart_tag_title: 'Répartition par tag',
    history_title: 'Historique', search_ph: 'Chercher dans les notes, tags…',
    all_label: 'Tout', no_tags: 'Aucun tag', no_data: 'Pas encore de données',
    goal_line: 'objectif', total_chart: 'total',
    heatmap_title: 'Activité · 16 dernières semaines', hm_less: 'moins', hm_more: 'plus',
    summary_week: 'Cette semaine', summary_vs: 'vs sem. dernière',
    summary_avg: 'Moy. par jour · 30 j', summary_active: 'Jours actifs · 30 j',
    summary_top: 'Compétence n°1 · 30 j',
    badges_title: 'Trophées',
    prefs_title: 'Préférences',
    dark_mode: 'Mode sombre', dark_mode_desc: 'Basculer entre clair et sombre',
    daily_goal: 'Objectif quotidien (heures)', daily_goal_desc: 'Par défaut : 2 h',
    extend_day: 'Prolonger la journée après minuit', extend_day_desc: "Compter jusqu'à 3 h comme la veille",
    reminder: 'Rappel quotidien', reminder_desc: "Notification si tu n'as pas encore étudié (appli ouverte)",
    reminder_msg: "C'est l'heure du français ! 🇫🇷 Pas encore d'étude aujourd'hui.",
    data_title: 'Données',
    data_note: 'Les données sont séparées par langue — tu gères actuellement <b>{lang}</b>.',
    export_btn: 'Exporter les données (JSON)', import_btn: 'Importer des données',
    reset_btn: 'Effacer toutes les données',
    install_title: 'Installer comme appli',
    install_android: 'Menu (⋮) → « Ajouter à l\'écran d\'accueil »',
    install_ios: 'Bouton partager (↑) → « Sur l\'écran d\'accueil »',
    install_note: "L'appli fonctionne ensuite entièrement hors ligne, sans internet.",
    footer_quote: '« Petit à petit, l\'oiseau fait son nid. »',
    goal_modal_new: 'Nouvel objectif', goal_modal_edit: "Modifier l'objectif",
    goal_name: 'Nom', goal_name_ph: 'ex. Examen B1', goal_type: 'Type',
    goal_type_total: 'Objectif total', goal_type_recurring: 'Objectif récurrent', goal_type_streak: 'Objectif de série',
    goal_target: 'Valeur cible', goal_unit: 'Unité', goal_source: 'Source',
    src_hours: "Automatique (heures d'étude)", src_anki: 'Automatique (cartes Anki)', src_manual: 'Mise à jour manuelle',
    src_hours_short: 'Auto (heures)', src_anki_short: 'Auto (Anki)', src_manual_short: 'Manuel',
    goal_skill_filter: 'Filtre de compétence (facultatif)', goal_skill_filter2: 'Filtre de compétence',
    all_skills: 'Toutes les compétences',
    goal_per_period: 'Cible par période', goal_period: 'Période',
    per_day: 'Par jour', per_week: 'Par semaine',
    goal_streak_target: 'Objectif de série (jours)', goal_streak_min: 'Min. minutes/jour',
    goal_include_passive: "Compter l'écoute passive",
    goal_deadline: 'Échéance (facultatif)', milestones: 'Jalons', ms_add: '+ Ajouter',
    ms_name_ph: 'Nom', ms_value_ph: 'Valeur',
    color: 'Couleur', c_amber: 'Ambre', c_teal: 'Turquoise', c_blue: 'Bleu', c_purple: 'Violet', c_red: 'Rouge',
    u_hours: 'Heures', u_cards: 'Cartes', u_pages: 'Pages', u_lessons: 'Leçons', u_pieces: 'Unités', u_min: 'Minutes',
    goal_pace: '{n} {unit}/jour requis ({d} jours restants)', goal_reached: 'Objectif atteint !',
    deadline_passed: 'Échéance dépassée',
    streak_days_label: 'jours de série', streak_target_label: ' / objectif {n}',
    goal_progress_title: 'Mettre à jour la progression', goal_progress_prefix: 'Progression : ',
    value_label: 'Valeur',
    update_progress: 'Mettre à jour', edit_action: 'Modifier', archive_action: 'Archiver',
    delete_action: 'Supprimer', restore_action: 'Restaurer',
    archived_goals: 'Archivés ({n})',
    edit_title: "Modifier l'entrée",
    t_saved: 'Séance enregistrée', t_undone: 'Annulé !',
    t_pick_date: 'Choisis une date !', t_fill_minutes: 'Indique les minutes !',
    t_fill_cards: 'Indique les cartes !', t_anki_saved: 'Cartes Anki enregistrées !',
    t_manual_undo: 'Saisie manuelle', t_anki_undo: 'Saisie Anki',
    t_fill_time: 'Entre une durée ! ex. 12:34', t_no_values: 'Aucune valeur !',
    t_transferred: '{n} min transférées',
    t_not_found: 'Élément introuvable', t_updated: 'Mis à jour !',
    t_fill_date_min: 'Indique la date et les minutes !', t_edit_undo: 'Modification annulée',
    t_deleted: 'Supprimé', t_delete_undo: 'Élément supprimé',
    c_delete_entry: 'Supprimer cet élément ?',
    t_fill_name: 'Indique un nom !', t_fill_target: 'Indique une valeur cible !',
    t_goal_created: 'Objectif créé !', t_goal_updated: 'Objectif mis à jour !',
    c_archive_goal: 'Archiver cet objectif ?', t_goal_archived: 'Objectif archivé',
    c_delete_goal: 'Supprimer définitivement cet objectif ?', t_goal_deleted: 'Objectif supprimé',
    t_goal_restored: 'Objectif restauré',
    t_progress_saved: 'Progression enregistrée !', t_fill_date_value: 'Indique la date et la valeur !',
    t_exported: 'Données exportées !', t_imported: 'Données importées !',
    t_import_err: "Erreur d'importation !",
    c_reset1: 'Effacer toutes les données de {lang} ? Action irréversible !',
    c_reset2: "Vraiment sûr ? Toutes les données d'étude de {lang} seront supprimées.",
    t_reset_done: 'Toutes les données effacées',
    t_stop_timer: "Arrête d'abord le chronomètre !",
    t_new_badge: 'Nouveau trophée : {name}',
    badge_first_name: 'Premier pas', badge_first_desc: 'Première séance enregistrée',
    badge_s7_name: 'Semaine pleine', badge_s7_desc: "7 jours d'affilée",
    badge_s30_name: 'Volonté de fer', badge_s30_desc: "30 jours d'affilée",
    badge_s100_name: 'Inébranlable', badge_s100_desc: "100 jours d'affilée",
    badge_h10_name: 'En route', badge_h10_desc: '10 h au total',
    badge_h50_name: 'Rat de bibliothèque', badge_h50_desc: '50 h au total',
    badge_h100_name: 'Centurion', badge_h100_desc: '100 h au total',
    badge_h250_name: 'Maîtrise', badge_h250_desc: '250 h au total',
    badge_day5_name: 'Marathon', badge_day5_desc: '5 h en une journée',
    badge_all_name: 'Polyvalent', badge_all_desc: 'Les 5 compétences en une semaine',
    badge_anki_name: 'As des cartes', badge_anki_desc: '1000 cartes Anki',
    badge_pw_name: 'Semaine parfaite', badge_pw_desc: 'Objectif quotidien atteint 7 jours de suite'
  }
};

/* Achievement badge definitions. `metric` is computed in app.js. */
const BADGE_DEFS = [
  { id: 'first', icon: '🐣', nameKey: 'badge_first_name', descKey: 'badge_first_desc', metric: 'sessions', target: 1 },
  { id: 's7',    icon: '🔥', nameKey: 'badge_s7_name',    descKey: 'badge_s7_desc',    metric: 'streak',   target: 7 },
  { id: 's30',   icon: '⚡', nameKey: 'badge_s30_name',   descKey: 'badge_s30_desc',   metric: 'streak',   target: 30 },
  { id: 's100',  icon: '🏆', nameKey: 'badge_s100_name',  descKey: 'badge_s100_desc',  metric: 'streak',   target: 100 },
  { id: 'h10',   icon: '⏱️', nameKey: 'badge_h10_name',   descKey: 'badge_h10_desc',   metric: 'hours',    target: 10 },
  { id: 'h50',   icon: '📚', nameKey: 'badge_h50_name',   descKey: 'badge_h50_desc',   metric: 'hours',    target: 50 },
  { id: 'h100',  icon: '🎓', nameKey: 'badge_h100_name',  descKey: 'badge_h100_desc',  metric: 'hours',    target: 100 },
  { id: 'h250',  icon: '👑', nameKey: 'badge_h250_name',  descKey: 'badge_h250_desc',  metric: 'hours',    target: 250 },
  { id: 'day5',  icon: '🌟', nameKey: 'badge_day5_name',  descKey: 'badge_day5_desc',  metric: 'maxday',   target: 5 },
  { id: 'all5',  icon: '🎯', nameKey: 'badge_all_name',   descKey: 'badge_all_desc',   metric: 'allskills', target: 5 },
  { id: 'anki1k',icon: '🃏', nameKey: 'badge_anki_name',  descKey: 'badge_anki_desc',  metric: 'anki',     target: 1000 },
  { id: 'pweek', icon: '📅', nameKey: 'badge_pw_name',    descKey: 'badge_pw_desc',    metric: 'perfectweek', target: 7 }
];

/* ── Background artwork (inline SVG path data) ──
   NL: heraldic Flemish Lion (rampant), stylized angular silhouette.
   FR: fleur-de-lis. Rendered as faint watermarks via CSS. */
const ART = {
  lion: `
    <path d="M96,88 L114,72 L120,56 L132,44 L140,26 L150,44 L166,50
             L156,66 L178,72 L166,90 L188,98 L176,114 L194,122
             L200,148 L206,180 L210,206 L204,234 L212,260
             L206,286 L190,290 L195,301 L180,305 L185,316 L170,318 L172,328 L144,327
             L157,297 L163,272 L157,252
             L136,266 L123,289 L106,307 L90,304 L95,315 L78,312 L83,323 L62,318
             L69,305 L84,295 L98,277 L110,253 L119,231 L117,205 L111,186
             L84,196 L55,197 L38,191 L25,180 L34,172 L21,163 L32,157 L24,146
             L45,151 L67,165 L89,171 L94,151
             L65,131 L39,111 L27,95 L38,91 L25,81 L38,77 L33,64
             L52,75 L73,95 L92,114 L90,126 Z"/>
    <path d="M78,103 L94,105 L86,116 L70,113 Z"/>
    <path d="M206,182 L230,168 L221,142 L245,128 L235,102 L254,89 L249,66
             L262,45 L275,61 L270,85 L258,96 L267,119 L246,132 L255,158
             L232,171 L218,192 Z"/>`,
  fleur: `
    <path d="M50,4 C58,20 64,36 60,54 C58,64 54,73 50,82 C46,73 42,64 40,54 C36,36 42,20 50,4 Z"/>
    <path d="M43,62 C32,49 18,44 9,51 C0,59 3,73 13,79 C23,85 36,81 43,71 Z"/>
    <path d="M57,62 C68,49 82,44 91,51 C100,59 97,73 87,79 C77,85 64,81 57,71 Z"/>
    <path d="M29,88 L71,88 L71,100 L29,100 Z"/>
    <path d="M50,104 C55,117 55,131 50,146 C45,131 45,117 50,104 Z"/>
    <path d="M42,104 C36,116 26,124 15,127 C21,116 30,107 42,104 Z"/>
    <path d="M58,104 C64,116 74,124 85,127 C79,116 70,107 58,104 Z"/>`
};

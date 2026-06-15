/**
 * Gen 3 — Hoenn regional Pokédex (Ruby / Sapphire / Emerald)
 * 202 entries, ordered by the RSE Hoenn dex number.
 * This IS the complete pool for Gen 3 — the in-game Pokédex as it appeared
 * in the Hoenn games, including returning Kanto/Johto Pokémon interleaved in
 * their Hoenn-dex positions.
 */
export const GEN3_DEX: string[] = [
  // #001–009 Hoenn starters
  'treecko', 'grovyle', 'sceptile',
  'torchic', 'combusken', 'blaziken',
  'mudkip', 'marshtomp', 'swampert',

  // #010–013 Poochyena / Zigzagoon lines
  'poochyena', 'mightyena',
  'zigzagoon', 'linoone',

  // #014–018 Wurmple branch
  'wurmple', 'silcoon', 'beautifly',
  'cascoon', 'dustox',

  // #019–024 Lotad / Seedot lines
  'lotad', 'lombre', 'ludicolo',
  'seedot', 'nuzleaf', 'shiftry',

  // #025–028 Taillow / Wingull lines
  'taillow', 'swellow',
  'wingull', 'pelipper',

  // #029–031 Ralts line
  'ralts', 'kirlia', 'gardevoir',

  // #032–033 Surskit line
  'surskit', 'masquerain',

  // #034–035 Shroomish line
  'shroomish', 'breloom',

  // #036–038 Slakoth line
  'slakoth', 'vigoroth', 'slaking',

  // #039–041 Abra line (returning)
  'abra', 'kadabra', 'alakazam',

  // #042–044 Nincada line
  'nincada', 'ninjask', 'shedinja',

  // #045–047 Whismur line
  'whismur', 'loudred', 'exploud',

  // #048–049 Makuhita line
  'makuhita', 'hariyama',

  // #050–053 Goldeen / Magikarp lines (returning)
  'goldeen', 'seaking',
  'magikarp', 'gyarados',

  // #054–056 Azurill / Marill line
  'azurill', 'marill', 'azumarill',

  // #057–059 Geodude line (returning)
  'geodude', 'graveler', 'golem',

  // #060 Nosepass
  'nosepass',

  // #061–062 Skitty line
  'skitty', 'delcatty',

  // #063–065 Zubat line (returning)
  'zubat', 'golbat', 'crobat',

  // #066–067 Tentacool line (returning)
  'tentacool', 'tentacruel',

  // #068–069 Sableye / Mawile
  'sableye', 'mawile',

  // #070–072 Aron line
  'aron', 'lairon', 'aggron',

  // #073–075 Machop line (returning)
  'machop', 'machoke', 'machamp',

  // #076–077 Meditite line
  'meditite', 'medicham',

  // #078–079 Electrike line
  'electrike', 'manectric',

  // #080–081 Plusle / Minun
  'plusle', 'minun',

  // #082–085 Magnemite / Voltorb lines (returning)
  'magnemite', 'magneton',
  'voltorb', 'electrode',

  // #086–087 Volbeat / Illumise
  'volbeat', 'illumise',

  // #088–091 Oddish line (returning)
  'oddish', 'gloom', 'vileplume', 'bellossom',

  // #092–093 Doduo line (returning)
  'doduo', 'dodrio',

  // #094 Roselia
  'roselia',

  // #095–096 Gulpin line
  'gulpin', 'swalot',

  // #097–098 Carvanha line
  'carvanha', 'sharpedo',

  // #099–100 Wailmer line
  'wailmer', 'wailord',

  // #101–102 Numel line
  'numel', 'camerupt',

  // #103–104 Slugma line (returning)
  'slugma', 'magcargo',

  // #105 Torkoal
  'torkoal',

  // #106–109 Grimer / Koffing lines (returning)
  'grimer', 'muk',
  'koffing', 'weezing',

  // #110–111 Spoink line
  'spoink', 'grumpig',

  // #112–113 Sandshrew line (returning)
  'sandshrew', 'sandslash',

  // #114 Spinda
  'spinda',

  // #115 Skarmory (returning)
  'skarmory',

  // #116–118 Trapinch line
  'trapinch', 'vibrava', 'flygon',

  // #119–120 Cacnea line
  'cacnea', 'cacturne',

  // #121–122 Swablu line
  'swablu', 'altaria',

  // #123–124 Zangoose / Seviper
  'zangoose', 'seviper',

  // #125–126 Lunatone / Solrock
  'lunatone', 'solrock',

  // #127–128 Barboach line
  'barboach', 'whiscash',

  // #129–130 Corphish line
  'corphish', 'crawdaunt',

  // #131–132 Baltoy line
  'baltoy', 'claydol',

  // #133–134 Lileep line
  'lileep', 'cradily',

  // #135–136 Anorith line
  'anorith', 'armaldo',

  // #137–139 Igglybuff line (returning)
  'igglybuff', 'jigglypuff', 'wigglytuff',

  // #140–141 Feebas line
  'feebas', 'milotic',

  // #142 Castform
  'castform',

  // #143–144 Staryu line (returning)
  'staryu', 'starmie',

  // #145 Kecleon
  'kecleon',

  // #146–147 Shuppet line
  'shuppet', 'banette',

  // #148–149 Duskull line
  'duskull', 'dusclops',

  // #150 Tropius
  'tropius',

  // #151 Chimecho
  'chimecho',

  // #152 Absol
  'absol',

  // #153–154 Vulpix line (returning)
  'vulpix', 'ninetales',

  // #155–157 Pichu / Pikachu line (returning)
  'pichu', 'pikachu', 'raichu',

  // #158–159 Psyduck line (returning)
  'psyduck', 'golduck',

  // #160–161 Wynaut / Wobbuffet
  'wynaut', 'wobbuffet',

  // #162–163 Natu line (returning)
  'natu', 'xatu',

  // #164 Girafarig (returning)
  'girafarig',

  // #165–166 Phanpy line (returning)
  'phanpy', 'donphan',

  // #167 Pinsir (returning)
  'pinsir',

  // #168 Heracross (returning)
  'heracross',

  // #169–170 Rhyhorn line (returning)
  'rhyhorn', 'rhydon',

  // #171–172 Snorunt line
  'snorunt', 'glalie',

  // #173–175 Spheal line
  'spheal', 'sealeo', 'walrein',

  // #176–178 Clamperl line
  'clamperl', 'huntail', 'gorebyss',

  // #179 Relicanth
  'relicanth',

  // #180 Corsola (returning)
  'corsola',

  // #181–182 Chinchou line (returning)
  'chinchou', 'lanturn',

  // #183 Luvdisc
  'luvdisc',

  // #184–186 Horsea line (returning)
  'horsea', 'seadra', 'kingdra',

  // #187–189 Bagon line
  'bagon', 'shelgon', 'salamence',

  // #190–192 Beldum line
  'beldum', 'metang', 'metagross',

  // #193–195 Regi trio
  'regirock', 'regice', 'registeel',

  // #196–197 Latias / Latios
  'latias', 'latios',

  // #198–200 Weather trio
  'kyogre', 'groudon', 'rayquaza',

  // #201 Jirachi
  'jirachi',

  // #202 Deoxys
  'deoxys',
];

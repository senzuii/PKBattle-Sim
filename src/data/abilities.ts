import { Ability } from '../types/Pokemon';

import { stall } from './abilities/list/stall';
import { levitate } from './abilities/list/levitate';
import { waterabsorb } from './abilities/list/waterabsorb';
import { voltabsorb } from './abilities/list/voltabsorb';
import { flashfire } from './abilities/list/flashfire';
import { staticAbility } from './abilities/list/static';
import { poisonpoint } from './abilities/list/poisonpoint';
import { chlorophyll } from './abilities/list/chlorophyll';
import { swiftswim } from './abilities/list/swiftswim';
import { keeneye } from './abilities/list/keeneye';
import { shellarmor } from './abilities/list/shellarmor';
import { battlearmor } from './abilities/list/battlearmor';
import { clearbody } from './abilities/list/clearbody';
import { whitesmoke } from './abilities/list/whitesmoke';
import { insomnia } from './abilities/list/insomnia';
import { owntempo } from './abilities/list/owntempo';
import { limber } from './abilities/list/limber';
import { oblivious } from './abilities/list/oblivious';
import { immunity } from './abilities/list/immunity';
import { damp } from './abilities/list/damp';
import { sturdy } from './abilities/list/sturdy';
import { synchronize } from './abilities/list/synchronize';
import { illuminate } from './abilities/list/illuminate';
import { runaway } from './abilities/list/runaway';
import { pickup } from './abilities/list/pickup';
import { hypercutter } from './abilities/list/hypercutter';
import { magnetpull } from './abilities/list/magnetpull';
import { soundproof } from './abilities/list/soundproof';
import { cloudnine } from './abilities/list/cloudnine';
import { solarpower } from './abilities/list/solarpower';
import { hustle } from './abilities/list/hustle';
import { serenegrace } from './abilities/list/serenegrace';
import { shielddust } from './abilities/list/shielddust';
import { none } from './abilities/list/none';
import { adaptability } from './abilities/list/adaptability';
import { airlock } from './abilities/list/airlock';
import { angerpoint } from './abilities/list/angerpoint';
import { anticipation } from './abilities/list/anticipation';
import { arenatrap } from './abilities/list/arenatrap';
import { blaze } from './abilities/list/blaze';
import { colorchange } from './abilities/list/colorchange';
import { competitive } from './abilities/list/competitive';
import { compoundeyes } from './abilities/list/compoundeyes';
import { contrary } from './abilities/list/contrary';
import { cursedbody } from './abilities/list/cursedbody';
import { cutecharm } from './abilities/list/cutecharm';
import { drizzle } from './abilities/list/drizzle';
import { drought } from './abilities/list/drought';
import { earlybird } from './abilities/list/earlybird';
import { effectspore } from './abilities/list/effectspore';
import { forecast } from './abilities/list/forecast';
import { frisk } from './abilities/list/frisk';
import { gluttony } from './abilities/list/gluttony';
import { guts } from './abilities/list/guts';
import { harvest } from './abilities/list/harvest';
import { heavymetal } from './abilities/list/heavymetal';
import { hugepower } from './abilities/list/hugepower';
import { hydration } from './abilities/list/hydration';
import { icebody } from './abilities/list/icebody';
import { infiltrator } from './abilities/list/infiltrator';
import { innerfocus } from './abilities/list/innerfocus';
import { intimidate } from './abilities/list/intimidate';
import { justified } from './abilities/list/justified';
import { leafguard } from './abilities/list/leafguard';
import { lightmetal } from './abilities/list/lightmetal';
import { lightningrod } from './abilities/list/lightningrod';
import { liquidooze } from './abilities/list/liquidooze';
import { magmaarmor } from './abilities/list/magmaarmor';
import { marvelscale } from './abilities/list/marvelscale';
import { minus } from './abilities/list/minus';
import { moody } from './abilities/list/moody';
import { moxie } from './abilities/list/moxie';
import { naturalcure } from './abilities/list/naturalcure';
import { normalize } from './abilities/list/normalize';
import { overcoat } from './abilities/list/overcoat';
import { overgrow } from './abilities/list/overgrow';
import { pickpocket } from './abilities/list/pickpocket';
import { plus } from './abilities/list/plus';
import { poisonheal } from './abilities/list/poisonheal';
import { prankster } from './abilities/list/prankster';
import { pressure } from './abilities/list/pressure';
import { protean } from './abilities/list/protean';
import { purepower } from './abilities/list/purepower';
import { quickfeet } from './abilities/list/quickfeet';
import { raindish } from './abilities/list/raindish';
import { rattled } from './abilities/list/rattled';
import { rivalry } from './abilities/list/rivalry';
import { rockhead } from './abilities/list/rockhead';
import { roughskin } from './abilities/list/roughskin';
import { sandforce } from './abilities/list/sandforce';
import { sandveil } from './abilities/list/sandveil';
import { sapsipper } from './abilities/list/sapsipper';
import { scrappy } from './abilities/list/scrappy';
import { shadowtag } from './abilities/list/shadowtag';
import { shedskin } from './abilities/list/shedskin';
import { sheerforce } from './abilities/list/sheerforce';
import { simple } from './abilities/list/simple';
import { solidrock } from './abilities/list/solidrock';
import { speedboost } from './abilities/list/speedboost';
import { stickyhold } from './abilities/list/stickyhold';
import { stormdrain } from './abilities/list/stormdrain';
import { suctioncups } from './abilities/list/suctioncups';
import { superluck } from './abilities/list/superluck';
import { swarm } from './abilities/list/swarm';
import { tangledfeet } from './abilities/list/tangledfeet';
import { technician } from './abilities/list/technician';
import { telepathy } from './abilities/list/telepathy';
import { thickfat } from './abilities/list/thickfat';
import { tintedlens } from './abilities/list/tintedlens';
import { torrent } from './abilities/list/torrent';
import { toxicboost } from './abilities/list/toxicboost';
import { trace } from './abilities/list/trace';
import { truant } from './abilities/list/truant';
import { unburden } from './abilities/list/unburden';
import { unnerve } from './abilities/list/unnerve';
import { vitalspirit } from './abilities/list/vitalspirit';
import { waterveil } from './abilities/list/waterveil';
import { windrider } from './abilities/list/windrider';
import { wonderguard } from './abilities/list/wonderguard';
import { wonderskin } from './abilities/list/wonderskin';

export const ABILITIES: Record<string, Ability> = {
  'Levitate': levitate,
  'Water Absorb': waterabsorb,
  'Volt Absorb': voltabsorb,
  'Flash Fire': flashfire,
  'Static': staticAbility,
  'Poison Point': poisonpoint,
  'Chlorophyll': chlorophyll,
  'Swift Swim': swiftswim,
  'Keen Eye': keeneye,
  'Shell Armor': shellarmor,
  'Battle Armor': battlearmor,
  'Clear Body': clearbody,
  'White Smoke': whitesmoke,
  'Insomnia': insomnia,
  'Own Tempo': owntempo,
  'Limber': limber,
  'Oblivious': oblivious,
  'Immunity': immunity,
  'Damp': damp,
  'Sturdy': sturdy,
  'Synchronize': synchronize,
  'Illuminate': illuminate,
  'Run Away': runaway,
  'Pickup': pickup,
  'Hyper Cutter': hypercutter,
  'Magnet Pull': magnetpull,
  'Soundproof': soundproof,
  'Cloud Nine': cloudnine,
  'Solar Power': solarpower,
  'Hustle': hustle,
  'Serene Grace': serenegrace,
  'Shield Dust': shielddust,
  "Adaptability": adaptability,
  "Air Lock": airlock,
  "Anger Point": angerpoint,
  "Anticipation": anticipation,
  "Arena Trap": arenatrap,
  "Blaze": blaze,
  "Color Change": colorchange,
  "Competitive": competitive,
  "Compound Eyes": compoundeyes,
  "Contrary": contrary,
  "Cursed Body": cursedbody,
  "Cute Charm": cutecharm,
  "Drizzle": drizzle,
  "Drought": drought,
  "Early Bird": earlybird,
  "Effect Spore": effectspore,
  "Forecast": forecast,
  "Frisk": frisk,
  "Gluttony": gluttony,
  "Guts": guts,
  "Harvest": harvest,
  "Heavy Metal": heavymetal,
  "Huge Power": hugepower,
  "Hydration": hydration,
  "Ice Body": icebody,
  "Infiltrator": infiltrator,
  "Inner Focus": innerfocus,
  "Intimidate": intimidate,
  "Justified": justified,
  "Leaf Guard": leafguard,
  "Light Metal": lightmetal,
  "Lightning Rod": lightningrod,
  "Liquid Ooze": liquidooze,
  "Magma Armor": magmaarmor,
  "Marvel Scale": marvelscale,
  "Minus": minus,
  "Moody": moody,
  "Moxie": moxie,
  "Natural Cure": naturalcure,
  "Normalize": normalize,
  "Overcoat": overcoat,
  "Overgrow": overgrow,
  "Pickpocket": pickpocket,
  "Plus": plus,
  "Poison Heal": poisonheal,
  "Prankster": prankster,
  "Pressure": pressure,
  "Protean": protean,
  "Pure Power": purepower,
  "Quick Feet": quickfeet,
  "Rain Dish": raindish,
  "Rattled": rattled,
  "Rivalry": rivalry,
  "Rock Head": rockhead,
  "Rough Skin": roughskin,
  "Sand Force": sandforce,
  "Sand Veil": sandveil,
  "Sap Sipper": sapsipper,
  "Scrappy": scrappy,
  "Shadow Tag": shadowtag,
  "Shed Skin": shedskin,
  "Sheer Force": sheerforce,
  "Simple": simple,
  "Solid Rock": solidrock,
  "Speed Boost": speedboost,
  "Sticky Hold": stickyhold,
  "Storm Drain": stormdrain,
  "Suction Cups": suctioncups,
  "Super Luck": superluck,
  "Swarm": swarm,
  "Tangled Feet": tangledfeet,
  "Technician": technician,
  "Telepathy": telepathy,
  "Thick Fat": thickfat,
  "Tinted Lens": tintedlens,
  "Torrent": torrent,
  "Toxic Boost": toxicboost,
  "Trace": trace,
  "Truant": truant,
  "Unburden": unburden,
  "Unnerve": unnerve,
  "Vital Spirit": vitalspirit,
  "Water Veil": waterveil,
  "Wind Rider": windrider,
  "Wonder Guard": wonderguard,
  "Wonder Skin": wonderskin,
  "Stall": stall,
  'None': none,
};

export const ABILITY_IDS = Object.keys(ABILITIES);
export function getAbilityName(id: string): string {
  return ABILITIES[id]?.name ?? id;
}
export function getAbilityDescription(id: string): string {
  return ABILITIES[id]?.description ?? 'No information available.';
}

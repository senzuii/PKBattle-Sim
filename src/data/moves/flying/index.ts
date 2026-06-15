import { Move } from '../../../types/Pokemon';
import aeroblast from './aeroblast';
import acrobatics from './acrobatics';
import aerialace from './aerialace';
import aircutter from './aircutter';
import airslash from './airslash';
import bounce from './bounce';
import bravebird from './bravebird';
import defog from './defog';
import drillpeck from './drillpeck';
import dualwingbeat from './dualwingbeat';
import featherdance from './featherdance';
import fly from './fly';
import gust from './gust';
import hurricane from './hurricane';
import mirrormove from './mirrormove';
import peck from './peck';
import pluck from './pluck';
import roost from './roost';
import skyattack from './skyattack';
import skydrop from './skydrop';
import tailwind from './tailwind';
import wingattack from './wingattack';

export const flyingMoves: Record<string, Move> = {
  "aeroblast": aeroblast,
  "acrobatics": acrobatics,
  "aerialace": aerialace,
  "aircutter": aircutter,
  "airslash": airslash,
  "bounce": bounce,
  "bravebird": bravebird,
  "defog": defog,
  "drillpeck": drillpeck,
  "dualwingbeat": dualwingbeat,
  "featherdance": featherdance,
  "fly": fly,
  "gust": gust,
  "hurricane": hurricane,
  "mirrormove": mirrormove,
  "peck": peck,
  "pluck": pluck,
  "roost": roost,
  "skyattack": skyattack,
  "skydrop": skydrop,
  "tailwind": tailwind,
  "wingattack": wingattack,
};

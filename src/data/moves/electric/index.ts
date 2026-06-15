import { Move } from '../../../types/Pokemon';
import charge from './charge';
import chargebeam from './chargebeam';
import discharge from './discharge';
import eerieimpulse from './eerieimpulse';
import electricterrain from './electricterrain';
import electroball from './electroball';
import electroweb from './electroweb';
import magneticflux from './magneticflux';
import magnetrise from './magnetrise';
import nuzzle from './nuzzle';
import risingvoltage from './risingvoltage';
import shockwave from './shockwave';
import spark from './spark';
import supercellslam from './supercellslam';
import thunder from './thunder';
import thunderbolt from './thunderbolt';
import thunderfang from './thunderfang';
import thunderpunch from './thunderpunch';
import thundershock from './thundershock';
import thunderwave from './thunderwave';
import voltswitch from './voltswitch';
import volttackle from './volttackle';
import wildcharge from './wildcharge';
import zapcannon from './zapcannon';

export const electricMoves: Record<string, Move> = {
  "charge": charge,
  "chargebeam": chargebeam,
  "discharge": discharge,
  "eerieimpulse": eerieimpulse,
  "electricterrain": electricterrain,
  "electroball": electroball,
  "electroweb": electroweb,
  "magneticflux": magneticflux,
  "magnetrise": magnetrise,
  "nuzzle": nuzzle,
  "risingvoltage": risingvoltage,
  "shockwave": shockwave,
  "spark": spark,
  "supercellslam": supercellslam,
  "thunder": thunder,
  "thunderbolt": thunderbolt,
  "thunderfang": thunderfang,
  "thunderpunch": thunderpunch,
  "thundershock": thundershock,
  "thunderwave": thunderwave,
  "voltswitch": voltswitch,
  "volttackle": volttackle,
  "wildcharge": wildcharge,
  "zapcannon": zapcannon,
};

import { Move } from '../../../types/Pokemon';
import boneclub from './boneclub';
import bonemerang from './bonemerang';
import bonerush from './bonerush';
import bulldoze from './bulldoze';
import dig from './dig';
import drillrun from './drillrun';
import earthpower from './earthpower';
import earthquake from './earthquake';
import fissure from './fissure';
import highhorsepower from './highhorsepower';
import magnitude from './magnitude';
import mudbomb from './mudbomb';
import mudshot from './mudshot';
import mudslap from './mudslap';
import mudsport from './mudsport';
import rototiller from './rototiller';
import sandattack from './sandattack';
import sandtomb from './sandtomb';
import scorchingsands from './scorchingsands';
import spikes from './spikes';
import stompingtantrum from './stompingtantrum';

export const groundMoves: Record<string, Move> = {
  "boneclub": boneclub,
  "bonemerang": bonemerang,
  "bonerush": bonerush,
  "bulldoze": bulldoze,
  "dig": dig,
  "drillrun": drillrun,
  "earthpower": earthpower,
  "earthquake": earthquake,
  "fissure": fissure,
  "highhorsepower": highhorsepower,
  "magnitude": magnitude,
  "mudbomb": mudbomb,
  "mudshot": mudshot,
  "mudslap": mudslap,
  "mudsport": mudsport,
  "rototiller": rototiller,
  "sandattack": sandattack,
  "sandtomb": sandtomb,
  "scorchingsands": scorchingsands,
  "spikes": spikes,
  "stompingtantrum": stompingtantrum,
};

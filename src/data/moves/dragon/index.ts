import { Move } from '../../../types/Pokemon';
import breakingswipe from './breakingswipe';
import dracometeor from './dracometeor';
import dragonbreath from './dragonbreath';
import dragoncheer from './dragoncheer';
import dragonclaw from './dragonclaw';
import dragondance from './dragondance';
import dragonpulse from './dragonpulse';
import dragonrage from './dragonrage';
import dragonrush from './dragonrush';
import dragontail from './dragontail';
import dualchop from './dualchop';
import outrage from './outrage';
import scaleshot from './scaleshot';
import twister from './twister';

export const dragonMoves: Record<string, Move> = {
  "breakingswipe": breakingswipe,
  "dracometeor": dracometeor,
  "dragonbreath": dragonbreath,
  "dragoncheer": dragoncheer,
  "dragonclaw": dragonclaw,
  "dragondance": dragondance,
  "dragonpulse": dragonpulse,
  "dragonrage": dragonrage,
  "dragonrush": dragonrush,
  "dragontail": dragontail,
  "dualchop": dualchop,
  "outrage": outrage,
  "scaleshot": scaleshot,
  "twister": twister,
};

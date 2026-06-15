export interface LearnsetDataTable {
  [k: string]: {
    learnset?: {
      [moveid: string]: string[];
    };
  };
}

export interface SpeciesDataTable {
  [k: string]: {
    num?: number;
    name?: string;
    types?: string[];
    baseStats?: {
      hp: number;
      atk: number;
      def: number;
      spa: number;
      spd: number;
      spe: number;
    };
    [key: string]: any;
  };
}

export interface MoveDataTable {
  [k: string]: {
    num: number;
    accuracy: number | boolean;
    basePower: number;
    category: string;
    name: string;
    pp: number;
    priority: number;
    flags: Record<string, number>;
    target: string;
    type: string;
    [key: string]: any;
  };
}

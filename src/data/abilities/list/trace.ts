import { Ability } from '../../../types/Pokemon';

const UNCOPYABLE = new Set(['Trace', 'Wonder Guard', 'Multitype', 'Illusion', 'Forecast', 'None']);

export const trace: Ability = {
  id: 'Trace',
  name: 'Trace',
  description: 'Copies a foe’s ability on entering battle.',
  onSwitchIn: (pokemon, opponent, logs) => {
    if (!opponent || opponent.currentHp <= 0) return;
    const copied = opponent.ability;
    if (copied && !UNCOPYABLE.has(copied)) {
      pokemon.ability = copied;
      logs.push(`${pokemon.name} traced ${opponent.name}'s ${copied}!`);
    }
  },
};

import { Ability } from '../../../types/Pokemon';

export const shedskin: Ability = {
  id: 'Shed Skin',
  name: 'Shed Skin',
  description: 'May heal its own status conditions each turn.',
  onEndOfTurn: (pokemon, logs) => {
    if (pokemon.status && Math.random() < 1 / 3) {
      const old = pokemon.status;
      pokemon.status = undefined;
      pokemon.statusTurns = 0;
      pokemon.toxicCounter = 0;
      logs.push(`${pokemon.name}'s Shed Skin cured its ${old.toLowerCase()}!`);
    }
  },
};

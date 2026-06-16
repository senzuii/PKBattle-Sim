import { Move } from '../../../types/Pokemon';

const uturn: Move = {
  id: 'uturn',
  name: 'U-turn',
  type: 'Bug',
  category: 'Physical',
  power: 70,
  accuracy: 100,
  pp: 20,
  description: 'After making its attack, the user rushes back to switch places with a party Pokémon in waiting.',
  flags: { selfSwitch: true },
};

export default uturn;

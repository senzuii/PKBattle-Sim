import { Move } from '../../../types/Pokemon';

const slackoff: Move = {
  id: 'slackoff',
  name: 'Slack Off',
  type: 'Normal',
  category: 'Status',
  power: 0,
  accuracy: 100,
  pp: 5,
  description: 'Slacks off and restores half the maximum HP.',
  effect: {
    type: 'heal',
    target: 'self',
    percent: Math.floor((1 / 2) * 100)
  },
};

export default slackoff;

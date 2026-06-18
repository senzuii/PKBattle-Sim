# PKBattler

A Pokémon battle simulator for mobile, built with React Native and Expo. Pick a
generation, build a team, and battle a turn-based AI with mechanics modeled on the
mainline games — types, natures, abilities, statuses, weather, entry hazards, crits,
animated sprites, and cries.

> Fan project for educational/personal use. Not affiliated with or endorsed by
> Nintendo, Game Freak, or The Pokémon Company. All Pokémon names, sprites, and
> audio are property of their respective owners.

## Features

- **Generations 1–3** — ~380 species with gen-accurate movepools and base stats.
- **Battle engine** — turn order, damage calc, STAB/type effectiveness, criticals,
  accuracy, status conditions, abilities, weather, and entry hazards.
- **Field mechanics** — weather, hazards, Future Sight, and Wish (see
  [docs/](docs/) for the in-progress roadmap on terrains, screens, and Protect).
- **AI opponents** — selectable difficulty (Easy / Medium / Hard / Cheating).
- **Game modes**
  - *Quick Play* — pick a generation and fight the AI.
  - *Sandbox* — no rules; custom enemies and all-out battles.
  - *Team Builder* — customize moves with legality validation.
  - *Sprite Gallery* — browse the animated Pokémon sprites.

## Tech stack

- [Expo](https://docs.expo.dev/) `~56` + React Native `0.85` (React `19`)
- TypeScript (strict)
- [Zustand](https://github.com/pmndrs/zustand) for state
- React Navigation (native stack)
- `expo-image` (animated GIF sprites) and `expo-audio` (cries)

## Getting started

Requires [Node.js](https://nodejs.org/) and the Expo tooling.

```bash
npm install
npm start          # start the Metro dev server
```

Then run on a platform:

```bash
npm run android    # Android device/emulator
npm run ios        # iOS simulator
npm run web        # browser
```

This project uses native modules (`expo-audio`, `expo-dev-client`), so a
[development build](https://docs.expo.dev/develop/development-builds/introduction/)
is recommended over Expo Go.

## Building

Builds are produced with [EAS Build](https://docs.expo.dev/build/introduction/):

```bash
# Development client (Android)
eas build --profile development --platform android

# Standalone preview (Android)
eas build --profile preview --platform android
```

See [eas.json](eas.json) for the build profiles.

## Project structure

```
App.tsx              App shell + navigation stack
index.ts             Entry point
src/
  screens/           Menu, gen select, setup, battle, results, team builder, gallery
  engine/            Battle engine
    battle/          Turn engine, turn order, actions, field, RNG
    damage/          Damage calculation
    effects/         Move effects
    abilities/       Ability hooks
    ai/              AI difficulty tiers
  data/              Pokémon, moves, abilities, per-generation dex
  store/             Zustand store
  components/        Reusable UI
  hooks/ theme/ types/
assets/              Animated sprites, cries, icons
learnsets/           Showdown-derived movepool/dex data
scripts/             Asset download/generation + headless battle sim
docs/                Design notes and feature roadmaps
```

## Scripts

The `scripts/` folder contains tooling for assets and testing:

- `downloadAniSprites.mjs` / `genAniSprites.mjs` — fetch and process animated sprites
- `downloadCries.mjs` / `genCries.mjs` — fetch and process cries
- `simBattle.ts` — headless battle simulation for engine testing

## License

[MIT](LICENSE) © senzuii — for the original code only. Pokémon assets are excluded
(see the disclaimer above).

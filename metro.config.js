// Learn more: https://docs.expo.dev/guides/customizing-metro/

// This project has thousands of tiny module files (per-species Pokémon, per-move,
// per-ability) plus the large learnset data dumps — ~4,400 modules total. On
// Windows the default file-handle limit gets exhausted while Metro reads its
// cache, throwing `EMFILE: too many open files`.
//
// `graceful-fs` queues and retries fs operations instead of crashing on EMFILE,
// and we cap worker concurrency to keep the number of simultaneously-open files
// well under the OS limit.
const fs = require('fs');
require('graceful-fs').gracefulify(fs);

const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// 4 CPUs here — 2 transform workers is plenty and roughly halves peak open files.
config.maxWorkers = 2;

module.exports = config;

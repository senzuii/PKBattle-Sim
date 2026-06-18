// Learn more: https://docs.expo.dev/guides/customizing-metro/

// This project has thousands of tiny module files (per-species Pokémon, per-move,
// per-ability) plus the large learnset data dumps — ~4,400 modules total. On
// Windows the default file-handle limit gets exhausted while Metro reads its
// cache, throwing `EMFILE: too many open files`.
//
// `graceful-fs` queues and retries the CALLBACK fs API, and we cap worker
// concurrency to keep the number of simultaneously-open files under the OS limit.
const fs = require('fs');
require('graceful-fs').gracefulify(fs);

// graceful-fs does NOT gate the PROMISE API (`fs.promises.*`). After adding the
// animated sprites (~6.6k GIFs) and cries (~1.2k MP3s), Metro's binary cache
// store fans out thousands of concurrent `fs.promises.readFile` calls across the
// whole module graph at once — each holds a Windows handle for its full read, so
// the process blows past the handle limit and throws EMFILE. Bound the number of
// in-flight promise reads/opens and retry on EMFILE so the storm drains safely.
(() => {
  const p = fs.promises;
  const MAX_INFLIGHT = 64;
  let active = 0;
  const queue = [];
  const pump = () => { while (active < MAX_INFLIGHT && queue.length) { active++; queue.shift()(); } };
  const schedule = (fn) => new Promise((resolve, reject) => {
    const run = () => fn().then(
      (v) => { active--; pump(); resolve(v); },
      (e) => {
        if (e && e.code === 'EMFILE') { active--; queue.push(run); setTimeout(pump, 25); }
        else { active--; pump(); reject(e); }
      },
    );
    queue.push(run); pump();
  });
  for (const name of ['readFile', 'open', 'stat', 'lstat', 'readlink']) {
    const orig = p[name].bind(p);
    p[name] = (...args) => schedule(() => orig(...args));
  }
})();

const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// 4 CPUs here — 2 transform workers is plenty and roughly halves peak open files.
config.maxWorkers = 2;

module.exports = config;

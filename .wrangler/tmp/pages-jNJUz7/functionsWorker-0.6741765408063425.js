var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __commonJS = (cb, mod) => function __require2() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// E:/TraeData/ModularData/ai-agent/vm/tools/node/node_modules/wrangler/node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
var init_utils = __esm({
  "E:/TraeData/ModularData/ai-agent/vm/tools/node/node_modules/wrangler/node_modules/unenv/dist/runtime/_internal/utils.mjs"() {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name(createNotImplementedError, "createNotImplementedError");
    __name(notImplemented, "notImplemented");
    __name(notImplementedClass, "notImplementedClass");
  }
});

// E:/TraeData/ModularData/ai-agent/vm/tools/node/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin, _performanceNow, nodeTiming, PerformanceEntry, PerformanceMark, PerformanceMeasure, PerformanceResourceTiming, PerformanceObserverEntryList, Performance, PerformanceObserver, performance;
var init_performance = __esm({
  "E:/TraeData/ModularData/ai-agent/vm/tools/node/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs"() {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
    _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
    nodeTiming = {
      name: "node",
      entryType: "node",
      startTime: 0,
      duration: 0,
      nodeStart: 0,
      v8Start: 0,
      bootstrapComplete: 0,
      environment: 0,
      loopStart: 0,
      loopExit: 0,
      idleTime: 0,
      uvMetricsInfo: {
        loopCount: 0,
        events: 0,
        eventsWaiting: 0
      },
      detail: void 0,
      toJSON() {
        return this;
      }
    };
    PerformanceEntry = class {
      static {
        __name(this, "PerformanceEntry");
      }
      __unenv__ = true;
      detail;
      entryType = "event";
      name;
      startTime;
      constructor(name, options) {
        this.name = name;
        this.startTime = options?.startTime || _performanceNow();
        this.detail = options?.detail;
      }
      get duration() {
        return _performanceNow() - this.startTime;
      }
      toJSON() {
        return {
          name: this.name,
          entryType: this.entryType,
          startTime: this.startTime,
          duration: this.duration,
          detail: this.detail
        };
      }
    };
    PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
      static {
        __name(this, "PerformanceMark");
      }
      entryType = "mark";
      constructor() {
        super(...arguments);
      }
      get duration() {
        return 0;
      }
    };
    PerformanceMeasure = class extends PerformanceEntry {
      static {
        __name(this, "PerformanceMeasure");
      }
      entryType = "measure";
    };
    PerformanceResourceTiming = class extends PerformanceEntry {
      static {
        __name(this, "PerformanceResourceTiming");
      }
      entryType = "resource";
      serverTiming = [];
      connectEnd = 0;
      connectStart = 0;
      decodedBodySize = 0;
      domainLookupEnd = 0;
      domainLookupStart = 0;
      encodedBodySize = 0;
      fetchStart = 0;
      initiatorType = "";
      name = "";
      nextHopProtocol = "";
      redirectEnd = 0;
      redirectStart = 0;
      requestStart = 0;
      responseEnd = 0;
      responseStart = 0;
      secureConnectionStart = 0;
      startTime = 0;
      transferSize = 0;
      workerStart = 0;
      responseStatus = 0;
    };
    PerformanceObserverEntryList = class {
      static {
        __name(this, "PerformanceObserverEntryList");
      }
      __unenv__ = true;
      getEntries() {
        return [];
      }
      getEntriesByName(_name, _type) {
        return [];
      }
      getEntriesByType(type) {
        return [];
      }
    };
    Performance = class {
      static {
        __name(this, "Performance");
      }
      __unenv__ = true;
      timeOrigin = _timeOrigin;
      eventCounts = /* @__PURE__ */ new Map();
      _entries = [];
      _resourceTimingBufferSize = 0;
      navigation = void 0;
      timing = void 0;
      timerify(_fn, _options) {
        throw createNotImplementedError("Performance.timerify");
      }
      get nodeTiming() {
        return nodeTiming;
      }
      eventLoopUtilization() {
        return {};
      }
      markResourceTiming() {
        return new PerformanceResourceTiming("");
      }
      onresourcetimingbufferfull = null;
      now() {
        if (this.timeOrigin === _timeOrigin) {
          return _performanceNow();
        }
        return Date.now() - this.timeOrigin;
      }
      clearMarks(markName) {
        this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
      }
      clearMeasures(measureName) {
        this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
      }
      clearResourceTimings() {
        this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
      }
      getEntries() {
        return this._entries;
      }
      getEntriesByName(name, type) {
        return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
      }
      getEntriesByType(type) {
        return this._entries.filter((e) => e.entryType === type);
      }
      mark(name, options) {
        const entry = new PerformanceMark(name, options);
        this._entries.push(entry);
        return entry;
      }
      measure(measureName, startOrMeasureOptions, endMark) {
        let start;
        let end;
        if (typeof startOrMeasureOptions === "string") {
          start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
          end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
        } else {
          start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
          end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
        }
        const entry = new PerformanceMeasure(measureName, {
          startTime: start,
          detail: {
            start,
            end
          }
        });
        this._entries.push(entry);
        return entry;
      }
      setResourceTimingBufferSize(maxSize) {
        this._resourceTimingBufferSize = maxSize;
      }
      addEventListener(type, listener, options) {
        throw createNotImplementedError("Performance.addEventListener");
      }
      removeEventListener(type, listener, options) {
        throw createNotImplementedError("Performance.removeEventListener");
      }
      dispatchEvent(event) {
        throw createNotImplementedError("Performance.dispatchEvent");
      }
      toJSON() {
        return this;
      }
    };
    PerformanceObserver = class {
      static {
        __name(this, "PerformanceObserver");
      }
      __unenv__ = true;
      static supportedEntryTypes = [];
      _callback = null;
      constructor(callback) {
        this._callback = callback;
      }
      takeRecords() {
        return [];
      }
      disconnect() {
        throw createNotImplementedError("PerformanceObserver.disconnect");
      }
      observe(options) {
        throw createNotImplementedError("PerformanceObserver.observe");
      }
      bind(fn) {
        return fn;
      }
      runInAsyncScope(fn, thisArg, ...args) {
        return fn.call(thisArg, ...args);
      }
      asyncId() {
        return 0;
      }
      triggerAsyncId() {
        return 0;
      }
      emitDestroy() {
        return this;
      }
    };
    performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();
  }
});

// E:/TraeData/ModularData/ai-agent/vm/tools/node/node_modules/wrangler/node_modules/unenv/dist/runtime/node/perf_hooks.mjs
var init_perf_hooks = __esm({
  "E:/TraeData/ModularData/ai-agent/vm/tools/node/node_modules/wrangler/node_modules/unenv/dist/runtime/node/perf_hooks.mjs"() {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_performance();
  }
});

// E:/TraeData/ModularData/ai-agent/vm/tools/node/node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
var init_performance2 = __esm({
  "E:/TraeData/ModularData/ai-agent/vm/tools/node/node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs"() {
    init_perf_hooks();
    if (!("__unenv__" in performance)) {
      const proto = Performance.prototype;
      for (const key of Object.getOwnPropertyNames(proto)) {
        if (key !== "constructor" && !(key in performance)) {
          const desc = Object.getOwnPropertyDescriptor(proto, key);
          if (desc) {
            Object.defineProperty(performance, key, desc);
          }
        }
      }
    }
    globalThis.performance = performance;
    globalThis.Performance = Performance;
    globalThis.PerformanceEntry = PerformanceEntry;
    globalThis.PerformanceMark = PerformanceMark;
    globalThis.PerformanceMeasure = PerformanceMeasure;
    globalThis.PerformanceObserver = PerformanceObserver;
    globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
    globalThis.PerformanceResourceTiming = PerformanceResourceTiming;
  }
});

// E:/TraeData/ModularData/ai-agent/vm/tools/node/node_modules/wrangler/node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default;
var init_noop = __esm({
  "E:/TraeData/ModularData/ai-agent/vm/tools/node/node_modules/wrangler/node_modules/unenv/dist/runtime/mock/noop.mjs"() {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    noop_default = Object.assign(() => {
    }, { __unenv__: true });
  }
});

// E:/TraeData/ModularData/ai-agent/vm/tools/node/node_modules/wrangler/node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";
var _console, _ignoreErrors, _stderr, _stdout, log, info, trace, debug, table, error, warn, createTask, clear, count, countReset, dir, dirxml, group, groupEnd, groupCollapsed, profile, profileEnd, time, timeEnd, timeLog, timeStamp, Console, _times, _stdoutErrorHandler, _stderrErrorHandler;
var init_console = __esm({
  "E:/TraeData/ModularData/ai-agent/vm/tools/node/node_modules/wrangler/node_modules/unenv/dist/runtime/node/console.mjs"() {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_noop();
    init_utils();
    _console = globalThis.console;
    _ignoreErrors = true;
    _stderr = new Writable();
    _stdout = new Writable();
    log = _console?.log ?? noop_default;
    info = _console?.info ?? log;
    trace = _console?.trace ?? info;
    debug = _console?.debug ?? log;
    table = _console?.table ?? log;
    error = _console?.error ?? log;
    warn = _console?.warn ?? error;
    createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
    clear = _console?.clear ?? noop_default;
    count = _console?.count ?? noop_default;
    countReset = _console?.countReset ?? noop_default;
    dir = _console?.dir ?? noop_default;
    dirxml = _console?.dirxml ?? noop_default;
    group = _console?.group ?? noop_default;
    groupEnd = _console?.groupEnd ?? noop_default;
    groupCollapsed = _console?.groupCollapsed ?? noop_default;
    profile = _console?.profile ?? noop_default;
    profileEnd = _console?.profileEnd ?? noop_default;
    time = _console?.time ?? noop_default;
    timeEnd = _console?.timeEnd ?? noop_default;
    timeLog = _console?.timeLog ?? noop_default;
    timeStamp = _console?.timeStamp ?? noop_default;
    Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
    _times = /* @__PURE__ */ new Map();
    _stdoutErrorHandler = noop_default;
    _stderrErrorHandler = noop_default;
  }
});

// E:/TraeData/ModularData/ai-agent/vm/tools/node/node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole, assert, clear2, context, count2, countReset2, createTask2, debug2, dir2, dirxml2, error2, group2, groupCollapsed2, groupEnd2, info2, log2, profile2, profileEnd2, table2, time2, timeEnd2, timeLog2, timeStamp2, trace2, warn2, console_default;
var init_console2 = __esm({
  "E:/TraeData/ModularData/ai-agent/vm/tools/node/node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs"() {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_console();
    workerdConsole = globalThis["console"];
    ({
      assert,
      clear: clear2,
      context: (
        // @ts-expect-error undocumented public API
        context
      ),
      count: count2,
      countReset: countReset2,
      createTask: (
        // @ts-expect-error undocumented public API
        createTask2
      ),
      debug: debug2,
      dir: dir2,
      dirxml: dirxml2,
      error: error2,
      group: group2,
      groupCollapsed: groupCollapsed2,
      groupEnd: groupEnd2,
      info: info2,
      log: log2,
      profile: profile2,
      profileEnd: profileEnd2,
      table: table2,
      time: time2,
      timeEnd: timeEnd2,
      timeLog: timeLog2,
      timeStamp: timeStamp2,
      trace: trace2,
      warn: warn2
    } = workerdConsole);
    Object.assign(workerdConsole, {
      Console,
      _ignoreErrors,
      _stderr,
      _stderrErrorHandler,
      _stdout,
      _stdoutErrorHandler,
      _times
    });
    console_default = workerdConsole;
  }
});

// E:/TraeData/ModularData/ai-agent/vm/tools/node/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
var init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console = __esm({
  "E:/TraeData/ModularData/ai-agent/vm/tools/node/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console"() {
    init_console2();
    globalThis.console = console_default;
  }
});

// E:/TraeData/ModularData/ai-agent/vm/tools/node/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime;
var init_hrtime = __esm({
  "E:/TraeData/ModularData/ai-agent/vm/tools/node/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs"() {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
      const now = Date.now();
      const seconds = Math.trunc(now / 1e3);
      const nanos = now % 1e3 * 1e6;
      if (startTime) {
        let diffSeconds = seconds - startTime[0];
        let diffNanos = nanos - startTime[0];
        if (diffNanos < 0) {
          diffSeconds = diffSeconds - 1;
          diffNanos = 1e9 + diffNanos;
        }
        return [diffSeconds, diffNanos];
      }
      return [seconds, nanos];
    }, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
      return BigInt(Date.now() * 1e6);
    }, "bigint") });
  }
});

// E:/TraeData/ModularData/ai-agent/vm/tools/node/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream;
var init_read_stream = __esm({
  "E:/TraeData/ModularData/ai-agent/vm/tools/node/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs"() {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    ReadStream = class {
      static {
        __name(this, "ReadStream");
      }
      fd;
      isRaw = false;
      isTTY = false;
      constructor(fd) {
        this.fd = fd;
      }
      setRawMode(mode) {
        this.isRaw = mode;
        return this;
      }
    };
  }
});

// E:/TraeData/ModularData/ai-agent/vm/tools/node/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream;
var init_write_stream = __esm({
  "E:/TraeData/ModularData/ai-agent/vm/tools/node/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs"() {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    WriteStream = class {
      static {
        __name(this, "WriteStream");
      }
      fd;
      columns = 80;
      rows = 24;
      isTTY = false;
      constructor(fd) {
        this.fd = fd;
      }
      clearLine(dir3, callback) {
        callback && callback();
        return false;
      }
      clearScreenDown(callback) {
        callback && callback();
        return false;
      }
      cursorTo(x, y, callback) {
        callback && typeof callback === "function" && callback();
        return false;
      }
      moveCursor(dx, dy, callback) {
        callback && callback();
        return false;
      }
      getColorDepth(env2) {
        return 1;
      }
      hasColors(count3, env2) {
        return false;
      }
      getWindowSize() {
        return [this.columns, this.rows];
      }
      write(str, encoding, cb) {
        if (str instanceof Uint8Array) {
          str = new TextDecoder().decode(str);
        }
        try {
          console.log(str);
        } catch {
        }
        cb && typeof cb === "function" && cb();
        return false;
      }
    };
  }
});

// E:/TraeData/ModularData/ai-agent/vm/tools/node/node_modules/wrangler/node_modules/unenv/dist/runtime/node/tty.mjs
var init_tty = __esm({
  "E:/TraeData/ModularData/ai-agent/vm/tools/node/node_modules/wrangler/node_modules/unenv/dist/runtime/node/tty.mjs"() {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_read_stream();
    init_write_stream();
  }
});

// E:/TraeData/ModularData/ai-agent/vm/tools/node/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION;
var init_node_version = __esm({
  "E:/TraeData/ModularData/ai-agent/vm/tools/node/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs"() {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    NODE_VERSION = "22.14.0";
  }
});

// E:/TraeData/ModularData/ai-agent/vm/tools/node/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";
var Process;
var init_process = __esm({
  "E:/TraeData/ModularData/ai-agent/vm/tools/node/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/process.mjs"() {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_tty();
    init_utils();
    init_node_version();
    Process = class _Process extends EventEmitter {
      static {
        __name(this, "Process");
      }
      env;
      hrtime;
      nextTick;
      constructor(impl) {
        super();
        this.env = impl.env;
        this.hrtime = impl.hrtime;
        this.nextTick = impl.nextTick;
        for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
          const value = this[prop];
          if (typeof value === "function") {
            this[prop] = value.bind(this);
          }
        }
      }
      // --- event emitter ---
      emitWarning(warning, type, code) {
        console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
      }
      emit(...args) {
        return super.emit(...args);
      }
      listeners(eventName) {
        return super.listeners(eventName);
      }
      // --- stdio (lazy initializers) ---
      #stdin;
      #stdout;
      #stderr;
      get stdin() {
        return this.#stdin ??= new ReadStream(0);
      }
      get stdout() {
        return this.#stdout ??= new WriteStream(1);
      }
      get stderr() {
        return this.#stderr ??= new WriteStream(2);
      }
      // --- cwd ---
      #cwd = "/";
      chdir(cwd2) {
        this.#cwd = cwd2;
      }
      cwd() {
        return this.#cwd;
      }
      // --- dummy props and getters ---
      arch = "";
      platform = "";
      argv = [];
      argv0 = "";
      execArgv = [];
      execPath = "";
      title = "";
      pid = 200;
      ppid = 100;
      get version() {
        return `v${NODE_VERSION}`;
      }
      get versions() {
        return { node: NODE_VERSION };
      }
      get allowedNodeEnvironmentFlags() {
        return /* @__PURE__ */ new Set();
      }
      get sourceMapsEnabled() {
        return false;
      }
      get debugPort() {
        return 0;
      }
      get throwDeprecation() {
        return false;
      }
      get traceDeprecation() {
        return false;
      }
      get features() {
        return {};
      }
      get release() {
        return {};
      }
      get connected() {
        return false;
      }
      get config() {
        return {};
      }
      get moduleLoadList() {
        return [];
      }
      constrainedMemory() {
        return 0;
      }
      availableMemory() {
        return 0;
      }
      uptime() {
        return 0;
      }
      resourceUsage() {
        return {};
      }
      // --- noop methods ---
      ref() {
      }
      unref() {
      }
      // --- unimplemented methods ---
      umask() {
        throw createNotImplementedError("process.umask");
      }
      getBuiltinModule() {
        return void 0;
      }
      getActiveResourcesInfo() {
        throw createNotImplementedError("process.getActiveResourcesInfo");
      }
      exit() {
        throw createNotImplementedError("process.exit");
      }
      reallyExit() {
        throw createNotImplementedError("process.reallyExit");
      }
      kill() {
        throw createNotImplementedError("process.kill");
      }
      abort() {
        throw createNotImplementedError("process.abort");
      }
      dlopen() {
        throw createNotImplementedError("process.dlopen");
      }
      setSourceMapsEnabled() {
        throw createNotImplementedError("process.setSourceMapsEnabled");
      }
      loadEnvFile() {
        throw createNotImplementedError("process.loadEnvFile");
      }
      disconnect() {
        throw createNotImplementedError("process.disconnect");
      }
      cpuUsage() {
        throw createNotImplementedError("process.cpuUsage");
      }
      setUncaughtExceptionCaptureCallback() {
        throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
      }
      hasUncaughtExceptionCaptureCallback() {
        throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
      }
      initgroups() {
        throw createNotImplementedError("process.initgroups");
      }
      openStdin() {
        throw createNotImplementedError("process.openStdin");
      }
      assert() {
        throw createNotImplementedError("process.assert");
      }
      binding() {
        throw createNotImplementedError("process.binding");
      }
      // --- attached interfaces ---
      permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
      report = {
        directory: "",
        filename: "",
        signal: "SIGUSR2",
        compact: false,
        reportOnFatalError: false,
        reportOnSignal: false,
        reportOnUncaughtException: false,
        getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
        writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
      };
      finalization = {
        register: /* @__PURE__ */ notImplemented("process.finalization.register"),
        unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
        registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
      };
      memoryUsage = Object.assign(() => ({
        arrayBuffers: 0,
        rss: 0,
        external: 0,
        heapTotal: 0,
        heapUsed: 0
      }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
      // --- undefined props ---
      mainModule = void 0;
      domain = void 0;
      // optional
      send = void 0;
      exitCode = void 0;
      channel = void 0;
      getegid = void 0;
      geteuid = void 0;
      getgid = void 0;
      getgroups = void 0;
      getuid = void 0;
      setegid = void 0;
      seteuid = void 0;
      setgid = void 0;
      setgroups = void 0;
      setuid = void 0;
      // internals
      _events = void 0;
      _eventsCount = void 0;
      _exiting = void 0;
      _maxListeners = void 0;
      _debugEnd = void 0;
      _debugProcess = void 0;
      _fatalException = void 0;
      _getActiveHandles = void 0;
      _getActiveRequests = void 0;
      _kill = void 0;
      _preload_modules = void 0;
      _rawDebug = void 0;
      _startProfilerIdleNotifier = void 0;
      _stopProfilerIdleNotifier = void 0;
      _tickCallback = void 0;
      _disconnect = void 0;
      _handleQueue = void 0;
      _pendingMessage = void 0;
      _channel = void 0;
      _send = void 0;
      _linkedBinding = void 0;
    };
  }
});

// E:/TraeData/ModularData/ai-agent/vm/tools/node/node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess, getBuiltinModule, workerdProcess, unenvProcess, exit, features, platform, _channel, _debugEnd, _debugProcess, _disconnect, _events, _eventsCount, _exiting, _fatalException, _getActiveHandles, _getActiveRequests, _handleQueue, _kill, _linkedBinding, _maxListeners, _pendingMessage, _preload_modules, _rawDebug, _send, _startProfilerIdleNotifier, _stopProfilerIdleNotifier, _tickCallback, abort, addListener, allowedNodeEnvironmentFlags, arch, argv, argv0, assert2, availableMemory, binding, channel, chdir, config, connected, constrainedMemory, cpuUsage, cwd, debugPort, disconnect, dlopen, domain, emit, emitWarning, env, eventNames, execArgv, execPath, exitCode, finalization, getActiveResourcesInfo, getegid, geteuid, getgid, getgroups, getMaxListeners, getuid, hasUncaughtExceptionCaptureCallback, hrtime3, initgroups, kill, listenerCount, listeners, loadEnvFile, mainModule, memoryUsage, moduleLoadList, nextTick, off, on, once, openStdin, permission, pid, ppid, prependListener, prependOnceListener, rawListeners, reallyExit, ref, release, removeAllListeners, removeListener, report, resourceUsage, send, setegid, seteuid, setgid, setgroups, setMaxListeners, setSourceMapsEnabled, setuid, setUncaughtExceptionCaptureCallback, sourceMapsEnabled, stderr, stdin, stdout, throwDeprecation, title, traceDeprecation, umask, unref, uptime, version, versions, _process, process_default;
var init_process2 = __esm({
  "E:/TraeData/ModularData/ai-agent/vm/tools/node/node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs"() {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_hrtime();
    init_process();
    globalProcess = globalThis["process"];
    getBuiltinModule = globalProcess.getBuiltinModule;
    workerdProcess = getBuiltinModule("node:process");
    unenvProcess = new Process({
      env: globalProcess.env,
      hrtime,
      // `nextTick` is available from workerd process v1
      nextTick: workerdProcess.nextTick
    });
    ({ exit, features, platform } = workerdProcess);
    ({
      _channel,
      _debugEnd,
      _debugProcess,
      _disconnect,
      _events,
      _eventsCount,
      _exiting,
      _fatalException,
      _getActiveHandles,
      _getActiveRequests,
      _handleQueue,
      _kill,
      _linkedBinding,
      _maxListeners,
      _pendingMessage,
      _preload_modules,
      _rawDebug,
      _send,
      _startProfilerIdleNotifier,
      _stopProfilerIdleNotifier,
      _tickCallback,
      abort,
      addListener,
      allowedNodeEnvironmentFlags,
      arch,
      argv,
      argv0,
      assert: assert2,
      availableMemory,
      binding,
      channel,
      chdir,
      config,
      connected,
      constrainedMemory,
      cpuUsage,
      cwd,
      debugPort,
      disconnect,
      dlopen,
      domain,
      emit,
      emitWarning,
      env,
      eventNames,
      execArgv,
      execPath,
      exitCode,
      finalization,
      getActiveResourcesInfo,
      getegid,
      geteuid,
      getgid,
      getgroups,
      getMaxListeners,
      getuid,
      hasUncaughtExceptionCaptureCallback,
      hrtime: hrtime3,
      initgroups,
      kill,
      listenerCount,
      listeners,
      loadEnvFile,
      mainModule,
      memoryUsage,
      moduleLoadList,
      nextTick,
      off,
      on,
      once,
      openStdin,
      permission,
      pid,
      ppid,
      prependListener,
      prependOnceListener,
      rawListeners,
      reallyExit,
      ref,
      release,
      removeAllListeners,
      removeListener,
      report,
      resourceUsage,
      send,
      setegid,
      seteuid,
      setgid,
      setgroups,
      setMaxListeners,
      setSourceMapsEnabled,
      setuid,
      setUncaughtExceptionCaptureCallback,
      sourceMapsEnabled,
      stderr,
      stdin,
      stdout,
      throwDeprecation,
      title,
      traceDeprecation,
      umask,
      unref,
      uptime,
      version,
      versions
    } = unenvProcess);
    _process = {
      abort,
      addListener,
      allowedNodeEnvironmentFlags,
      hasUncaughtExceptionCaptureCallback,
      setUncaughtExceptionCaptureCallback,
      loadEnvFile,
      sourceMapsEnabled,
      arch,
      argv,
      argv0,
      chdir,
      config,
      connected,
      constrainedMemory,
      availableMemory,
      cpuUsage,
      cwd,
      debugPort,
      dlopen,
      disconnect,
      emit,
      emitWarning,
      env,
      eventNames,
      execArgv,
      execPath,
      exit,
      finalization,
      features,
      getBuiltinModule,
      getActiveResourcesInfo,
      getMaxListeners,
      hrtime: hrtime3,
      kill,
      listeners,
      listenerCount,
      memoryUsage,
      nextTick,
      on,
      off,
      once,
      pid,
      platform,
      ppid,
      prependListener,
      prependOnceListener,
      rawListeners,
      release,
      removeAllListeners,
      removeListener,
      report,
      resourceUsage,
      setMaxListeners,
      setSourceMapsEnabled,
      stderr,
      stdin,
      stdout,
      title,
      throwDeprecation,
      traceDeprecation,
      umask,
      uptime,
      version,
      versions,
      // @ts-expect-error old API
      domain,
      initgroups,
      moduleLoadList,
      reallyExit,
      openStdin,
      assert: assert2,
      binding,
      send,
      exitCode,
      channel,
      getegid,
      geteuid,
      getgid,
      getgroups,
      getuid,
      setegid,
      seteuid,
      setgid,
      setgroups,
      setuid,
      permission,
      mainModule,
      _events,
      _eventsCount,
      _exiting,
      _maxListeners,
      _debugEnd,
      _debugProcess,
      _fatalException,
      _getActiveHandles,
      _getActiveRequests,
      _kill,
      _preload_modules,
      _rawDebug,
      _startProfilerIdleNotifier,
      _stopProfilerIdleNotifier,
      _tickCallback,
      _disconnect,
      _handleQueue,
      _pendingMessage,
      _channel,
      _send,
      _linkedBinding
    };
    process_default = _process;
  }
});

// E:/TraeData/ModularData/ai-agent/vm/tools/node/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
var init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process = __esm({
  "E:/TraeData/ModularData/ai-agent/vm/tools/node/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process"() {
    init_process2();
    globalThis.process = process_default;
  }
});

// node-built-in-modules:buffer
import libDefault from "buffer";
var require_buffer = __commonJS({
  "node-built-in-modules:buffer"(exports, module) {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault;
  }
});

// ../node_modules/safe-buffer/index.js
var require_safe_buffer = __commonJS({
  "../node_modules/safe-buffer/index.js"(exports, module) {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var buffer = require_buffer();
    var Buffer2 = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    __name(copyProps, "copyProps");
    if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
      module.exports = buffer;
    } else {
      copyProps(buffer, exports);
      exports.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer2(arg, encodingOrOffset, length);
    }
    __name(SafeBuffer, "SafeBuffer");
    SafeBuffer.prototype = Object.create(Buffer2.prototype);
    copyProps(Buffer2, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer2(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer2(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer2(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer.SlowBuffer(size);
    };
  }
});

// node-built-in-modules:stream
import libDefault2 from "stream";
var require_stream = __commonJS({
  "node-built-in-modules:stream"(exports, module) {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault2;
  }
});

// node-built-in-modules:util
import libDefault3 from "util";
var require_util = __commonJS({
  "node-built-in-modules:util"(exports, module) {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault3;
  }
});

// ../node_modules/jws/lib/data-stream.js
var require_data_stream = __commonJS({
  "../node_modules/jws/lib/data-stream.js"(exports, module) {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var Buffer2 = require_safe_buffer().Buffer;
    var Stream = require_stream();
    var util = require_util();
    function DataStream(data) {
      this.buffer = null;
      this.writable = true;
      this.readable = true;
      if (!data) {
        this.buffer = Buffer2.alloc(0);
        return this;
      }
      if (typeof data.pipe === "function") {
        this.buffer = Buffer2.alloc(0);
        data.pipe(this);
        return this;
      }
      if (data.length || typeof data === "object") {
        this.buffer = data;
        this.writable = false;
        process.nextTick(function() {
          this.emit("end", data);
          this.readable = false;
          this.emit("close");
        }.bind(this));
        return this;
      }
      throw new TypeError("Unexpected data type (" + typeof data + ")");
    }
    __name(DataStream, "DataStream");
    util.inherits(DataStream, Stream);
    DataStream.prototype.write = /* @__PURE__ */ __name(function write(data) {
      this.buffer = Buffer2.concat([this.buffer, Buffer2.from(data)]);
      this.emit("data", data);
    }, "write");
    DataStream.prototype.end = /* @__PURE__ */ __name(function end(data) {
      if (data)
        this.write(data);
      this.emit("end", data);
      this.emit("close");
      this.writable = false;
      this.readable = false;
    }, "end");
    module.exports = DataStream;
  }
});

// node-built-in-modules:crypto
import libDefault4 from "crypto";
var require_crypto = __commonJS({
  "node-built-in-modules:crypto"(exports, module) {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault4;
  }
});

// ../node_modules/ecdsa-sig-formatter/src/param-bytes-for-alg.js
var require_param_bytes_for_alg = __commonJS({
  "../node_modules/ecdsa-sig-formatter/src/param-bytes-for-alg.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    function getParamSize(keySize) {
      var result = (keySize / 8 | 0) + (keySize % 8 === 0 ? 0 : 1);
      return result;
    }
    __name(getParamSize, "getParamSize");
    var paramBytesForAlg = {
      ES256: getParamSize(256),
      ES384: getParamSize(384),
      ES512: getParamSize(521)
    };
    function getParamBytesForAlg(alg) {
      var paramBytes = paramBytesForAlg[alg];
      if (paramBytes) {
        return paramBytes;
      }
      throw new Error('Unknown algorithm "' + alg + '"');
    }
    __name(getParamBytesForAlg, "getParamBytesForAlg");
    module.exports = getParamBytesForAlg;
  }
});

// ../node_modules/ecdsa-sig-formatter/src/ecdsa-sig-formatter.js
var require_ecdsa_sig_formatter = __commonJS({
  "../node_modules/ecdsa-sig-formatter/src/ecdsa-sig-formatter.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var Buffer2 = require_safe_buffer().Buffer;
    var getParamBytesForAlg = require_param_bytes_for_alg();
    var MAX_OCTET = 128;
    var CLASS_UNIVERSAL = 0;
    var PRIMITIVE_BIT = 32;
    var TAG_SEQ = 16;
    var TAG_INT = 2;
    var ENCODED_TAG_SEQ = TAG_SEQ | PRIMITIVE_BIT | CLASS_UNIVERSAL << 6;
    var ENCODED_TAG_INT = TAG_INT | CLASS_UNIVERSAL << 6;
    function base64Url(base64) {
      return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    }
    __name(base64Url, "base64Url");
    function signatureAsBuffer(signature) {
      if (Buffer2.isBuffer(signature)) {
        return signature;
      } else if ("string" === typeof signature) {
        return Buffer2.from(signature, "base64");
      }
      throw new TypeError("ECDSA signature must be a Base64 string or a Buffer");
    }
    __name(signatureAsBuffer, "signatureAsBuffer");
    function derToJose(signature, alg) {
      signature = signatureAsBuffer(signature);
      var paramBytes = getParamBytesForAlg(alg);
      var maxEncodedParamLength = paramBytes + 1;
      var inputLength = signature.length;
      var offset = 0;
      if (signature[offset++] !== ENCODED_TAG_SEQ) {
        throw new Error('Could not find expected "seq"');
      }
      var seqLength = signature[offset++];
      if (seqLength === (MAX_OCTET | 1)) {
        seqLength = signature[offset++];
      }
      if (inputLength - offset < seqLength) {
        throw new Error('"seq" specified length of "' + seqLength + '", only "' + (inputLength - offset) + '" remaining');
      }
      if (signature[offset++] !== ENCODED_TAG_INT) {
        throw new Error('Could not find expected "int" for "r"');
      }
      var rLength = signature[offset++];
      if (inputLength - offset - 2 < rLength) {
        throw new Error('"r" specified length of "' + rLength + '", only "' + (inputLength - offset - 2) + '" available');
      }
      if (maxEncodedParamLength < rLength) {
        throw new Error('"r" specified length of "' + rLength + '", max of "' + maxEncodedParamLength + '" is acceptable');
      }
      var rOffset = offset;
      offset += rLength;
      if (signature[offset++] !== ENCODED_TAG_INT) {
        throw new Error('Could not find expected "int" for "s"');
      }
      var sLength = signature[offset++];
      if (inputLength - offset !== sLength) {
        throw new Error('"s" specified length of "' + sLength + '", expected "' + (inputLength - offset) + '"');
      }
      if (maxEncodedParamLength < sLength) {
        throw new Error('"s" specified length of "' + sLength + '", max of "' + maxEncodedParamLength + '" is acceptable');
      }
      var sOffset = offset;
      offset += sLength;
      if (offset !== inputLength) {
        throw new Error('Expected to consume entire buffer, but "' + (inputLength - offset) + '" bytes remain');
      }
      var rPadding = paramBytes - rLength, sPadding = paramBytes - sLength;
      var dst = Buffer2.allocUnsafe(rPadding + rLength + sPadding + sLength);
      for (offset = 0; offset < rPadding; ++offset) {
        dst[offset] = 0;
      }
      signature.copy(dst, offset, rOffset + Math.max(-rPadding, 0), rOffset + rLength);
      offset = paramBytes;
      for (var o = offset; offset < o + sPadding; ++offset) {
        dst[offset] = 0;
      }
      signature.copy(dst, offset, sOffset + Math.max(-sPadding, 0), sOffset + sLength);
      dst = dst.toString("base64");
      dst = base64Url(dst);
      return dst;
    }
    __name(derToJose, "derToJose");
    function countPadding(buf, start, stop) {
      var padding = 0;
      while (start + padding < stop && buf[start + padding] === 0) {
        ++padding;
      }
      var needsSign = buf[start + padding] >= MAX_OCTET;
      if (needsSign) {
        --padding;
      }
      return padding;
    }
    __name(countPadding, "countPadding");
    function joseToDer(signature, alg) {
      signature = signatureAsBuffer(signature);
      var paramBytes = getParamBytesForAlg(alg);
      var signatureBytes = signature.length;
      if (signatureBytes !== paramBytes * 2) {
        throw new TypeError('"' + alg + '" signatures must be "' + paramBytes * 2 + '" bytes, saw "' + signatureBytes + '"');
      }
      var rPadding = countPadding(signature, 0, paramBytes);
      var sPadding = countPadding(signature, paramBytes, signature.length);
      var rLength = paramBytes - rPadding;
      var sLength = paramBytes - sPadding;
      var rsBytes = 1 + 1 + rLength + 1 + 1 + sLength;
      var shortLength = rsBytes < MAX_OCTET;
      var dst = Buffer2.allocUnsafe((shortLength ? 2 : 3) + rsBytes);
      var offset = 0;
      dst[offset++] = ENCODED_TAG_SEQ;
      if (shortLength) {
        dst[offset++] = rsBytes;
      } else {
        dst[offset++] = MAX_OCTET | 1;
        dst[offset++] = rsBytes & 255;
      }
      dst[offset++] = ENCODED_TAG_INT;
      dst[offset++] = rLength;
      if (rPadding < 0) {
        dst[offset++] = 0;
        offset += signature.copy(dst, offset, 0, paramBytes);
      } else {
        offset += signature.copy(dst, offset, rPadding, paramBytes);
      }
      dst[offset++] = ENCODED_TAG_INT;
      dst[offset++] = sLength;
      if (sPadding < 0) {
        dst[offset++] = 0;
        signature.copy(dst, offset, paramBytes);
      } else {
        signature.copy(dst, offset, paramBytes + sPadding);
      }
      return dst;
    }
    __name(joseToDer, "joseToDer");
    module.exports = {
      derToJose,
      joseToDer
    };
  }
});

// ../node_modules/buffer-equal-constant-time/index.js
var require_buffer_equal_constant_time = __commonJS({
  "../node_modules/buffer-equal-constant-time/index.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var Buffer2 = require_buffer().Buffer;
    var SlowBuffer = require_buffer().SlowBuffer;
    module.exports = bufferEq;
    function bufferEq(a, b) {
      if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b)) {
        return false;
      }
      if (a.length !== b.length) {
        return false;
      }
      var c = 0;
      for (var i = 0; i < a.length; i++) {
        c |= a[i] ^ b[i];
      }
      return c === 0;
    }
    __name(bufferEq, "bufferEq");
    bufferEq.install = function() {
      Buffer2.prototype.equal = SlowBuffer.prototype.equal = /* @__PURE__ */ __name(function equal(that) {
        return bufferEq(this, that);
      }, "equal");
    };
    var origBufEqual = Buffer2.prototype.equal;
    var origSlowBufEqual = SlowBuffer.prototype.equal;
    bufferEq.restore = function() {
      Buffer2.prototype.equal = origBufEqual;
      SlowBuffer.prototype.equal = origSlowBufEqual;
    };
  }
});

// ../node_modules/jwa/index.js
var require_jwa = __commonJS({
  "../node_modules/jwa/index.js"(exports, module) {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var Buffer2 = require_safe_buffer().Buffer;
    var crypto = require_crypto();
    var formatEcdsa = require_ecdsa_sig_formatter();
    var util = require_util();
    var MSG_INVALID_ALGORITHM = '"%s" is not a valid algorithm.\n  Supported algorithms are:\n  "HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384", "ES512" and "none".';
    var MSG_INVALID_SECRET = "secret must be a string or buffer";
    var MSG_INVALID_VERIFIER_KEY = "key must be a string or a buffer";
    var MSG_INVALID_SIGNER_KEY = "key must be a string, a buffer or an object";
    var supportsKeyObjects = typeof crypto.createPublicKey === "function";
    if (supportsKeyObjects) {
      MSG_INVALID_VERIFIER_KEY += " or a KeyObject";
      MSG_INVALID_SECRET += "or a KeyObject";
    }
    function checkIsPublicKey(key) {
      if (Buffer2.isBuffer(key)) {
        return;
      }
      if (typeof key === "string") {
        return;
      }
      if (!supportsKeyObjects) {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
      }
      if (typeof key !== "object") {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
      }
      if (typeof key.type !== "string") {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
      }
      if (typeof key.asymmetricKeyType !== "string") {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
      }
      if (typeof key.export !== "function") {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
      }
    }
    __name(checkIsPublicKey, "checkIsPublicKey");
    function checkIsPrivateKey(key) {
      if (Buffer2.isBuffer(key)) {
        return;
      }
      if (typeof key === "string") {
        return;
      }
      if (typeof key === "object") {
        return;
      }
      throw typeError(MSG_INVALID_SIGNER_KEY);
    }
    __name(checkIsPrivateKey, "checkIsPrivateKey");
    function checkIsSecretKey(key) {
      if (Buffer2.isBuffer(key)) {
        return;
      }
      if (typeof key === "string") {
        return key;
      }
      if (!supportsKeyObjects) {
        throw typeError(MSG_INVALID_SECRET);
      }
      if (typeof key !== "object") {
        throw typeError(MSG_INVALID_SECRET);
      }
      if (key.type !== "secret") {
        throw typeError(MSG_INVALID_SECRET);
      }
      if (typeof key.export !== "function") {
        throw typeError(MSG_INVALID_SECRET);
      }
    }
    __name(checkIsSecretKey, "checkIsSecretKey");
    function fromBase64(base64) {
      return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    }
    __name(fromBase64, "fromBase64");
    function toBase64(base64url) {
      base64url = base64url.toString();
      var padding = 4 - base64url.length % 4;
      if (padding !== 4) {
        for (var i = 0; i < padding; ++i) {
          base64url += "=";
        }
      }
      return base64url.replace(/\-/g, "+").replace(/_/g, "/");
    }
    __name(toBase64, "toBase64");
    function typeError(template) {
      var args = [].slice.call(arguments, 1);
      var errMsg = util.format.bind(util, template).apply(null, args);
      return new TypeError(errMsg);
    }
    __name(typeError, "typeError");
    function bufferOrString(obj) {
      return Buffer2.isBuffer(obj) || typeof obj === "string";
    }
    __name(bufferOrString, "bufferOrString");
    function normalizeInput(thing) {
      if (!bufferOrString(thing))
        thing = JSON.stringify(thing);
      return thing;
    }
    __name(normalizeInput, "normalizeInput");
    function createHmacSigner(bits) {
      return /* @__PURE__ */ __name(function sign(thing, secret) {
        checkIsSecretKey(secret);
        thing = normalizeInput(thing);
        var hmac = crypto.createHmac("sha" + bits, secret);
        var sig = (hmac.update(thing), hmac.digest("base64"));
        return fromBase64(sig);
      }, "sign");
    }
    __name(createHmacSigner, "createHmacSigner");
    var bufferEqual;
    var timingSafeEqual = "timingSafeEqual" in crypto ? /* @__PURE__ */ __name(function timingSafeEqual2(a, b) {
      if (a.byteLength !== b.byteLength) {
        return false;
      }
      return crypto.timingSafeEqual(a, b);
    }, "timingSafeEqual") : /* @__PURE__ */ __name(function timingSafeEqual2(a, b) {
      if (!bufferEqual) {
        bufferEqual = require_buffer_equal_constant_time();
      }
      return bufferEqual(a, b);
    }, "timingSafeEqual");
    function createHmacVerifier(bits) {
      return /* @__PURE__ */ __name(function verify(thing, signature, secret) {
        var computedSig = createHmacSigner(bits)(thing, secret);
        return timingSafeEqual(Buffer2.from(signature), Buffer2.from(computedSig));
      }, "verify");
    }
    __name(createHmacVerifier, "createHmacVerifier");
    function createKeySigner(bits) {
      return /* @__PURE__ */ __name(function sign(thing, privateKey) {
        checkIsPrivateKey(privateKey);
        thing = normalizeInput(thing);
        var signer = crypto.createSign("RSA-SHA" + bits);
        var sig = (signer.update(thing), signer.sign(privateKey, "base64"));
        return fromBase64(sig);
      }, "sign");
    }
    __name(createKeySigner, "createKeySigner");
    function createKeyVerifier(bits) {
      return /* @__PURE__ */ __name(function verify(thing, signature, publicKey) {
        checkIsPublicKey(publicKey);
        thing = normalizeInput(thing);
        signature = toBase64(signature);
        var verifier = crypto.createVerify("RSA-SHA" + bits);
        verifier.update(thing);
        return verifier.verify(publicKey, signature, "base64");
      }, "verify");
    }
    __name(createKeyVerifier, "createKeyVerifier");
    function createPSSKeySigner(bits) {
      return /* @__PURE__ */ __name(function sign(thing, privateKey) {
        checkIsPrivateKey(privateKey);
        thing = normalizeInput(thing);
        var signer = crypto.createSign("RSA-SHA" + bits);
        var sig = (signer.update(thing), signer.sign({
          key: privateKey,
          padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
          saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST
        }, "base64"));
        return fromBase64(sig);
      }, "sign");
    }
    __name(createPSSKeySigner, "createPSSKeySigner");
    function createPSSKeyVerifier(bits) {
      return /* @__PURE__ */ __name(function verify(thing, signature, publicKey) {
        checkIsPublicKey(publicKey);
        thing = normalizeInput(thing);
        signature = toBase64(signature);
        var verifier = crypto.createVerify("RSA-SHA" + bits);
        verifier.update(thing);
        return verifier.verify({
          key: publicKey,
          padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
          saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST
        }, signature, "base64");
      }, "verify");
    }
    __name(createPSSKeyVerifier, "createPSSKeyVerifier");
    function createECDSASigner(bits) {
      var inner = createKeySigner(bits);
      return /* @__PURE__ */ __name(function sign() {
        var signature = inner.apply(null, arguments);
        signature = formatEcdsa.derToJose(signature, "ES" + bits);
        return signature;
      }, "sign");
    }
    __name(createECDSASigner, "createECDSASigner");
    function createECDSAVerifer(bits) {
      var inner = createKeyVerifier(bits);
      return /* @__PURE__ */ __name(function verify(thing, signature, publicKey) {
        signature = formatEcdsa.joseToDer(signature, "ES" + bits).toString("base64");
        var result = inner(thing, signature, publicKey);
        return result;
      }, "verify");
    }
    __name(createECDSAVerifer, "createECDSAVerifer");
    function createNoneSigner() {
      return /* @__PURE__ */ __name(function sign() {
        return "";
      }, "sign");
    }
    __name(createNoneSigner, "createNoneSigner");
    function createNoneVerifier() {
      return /* @__PURE__ */ __name(function verify(thing, signature) {
        return signature === "";
      }, "verify");
    }
    __name(createNoneVerifier, "createNoneVerifier");
    module.exports = /* @__PURE__ */ __name(function jwa(algorithm) {
      var signerFactories = {
        hs: createHmacSigner,
        rs: createKeySigner,
        ps: createPSSKeySigner,
        es: createECDSASigner,
        none: createNoneSigner
      };
      var verifierFactories = {
        hs: createHmacVerifier,
        rs: createKeyVerifier,
        ps: createPSSKeyVerifier,
        es: createECDSAVerifer,
        none: createNoneVerifier
      };
      var match2 = algorithm.match(/^(RS|PS|ES|HS)(256|384|512)$|^(none)$/);
      if (!match2)
        throw typeError(MSG_INVALID_ALGORITHM, algorithm);
      var algo = (match2[1] || match2[3]).toLowerCase();
      var bits = match2[2];
      return {
        sign: signerFactories[algo](bits),
        verify: verifierFactories[algo](bits)
      };
    }, "jwa");
  }
});

// ../node_modules/jws/lib/tostring.js
var require_tostring = __commonJS({
  "../node_modules/jws/lib/tostring.js"(exports, module) {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var Buffer2 = require_buffer().Buffer;
    module.exports = /* @__PURE__ */ __name(function toString(obj) {
      if (typeof obj === "string")
        return obj;
      if (typeof obj === "number" || Buffer2.isBuffer(obj))
        return obj.toString();
      return JSON.stringify(obj);
    }, "toString");
  }
});

// ../node_modules/jws/lib/sign-stream.js
var require_sign_stream = __commonJS({
  "../node_modules/jws/lib/sign-stream.js"(exports, module) {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var Buffer2 = require_safe_buffer().Buffer;
    var DataStream = require_data_stream();
    var jwa = require_jwa();
    var Stream = require_stream();
    var toString = require_tostring();
    var util = require_util();
    function base64url(string, encoding) {
      return Buffer2.from(string, encoding).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    }
    __name(base64url, "base64url");
    function jwsSecuredInput(header, payload, encoding) {
      encoding = encoding || "utf8";
      var encodedHeader = base64url(toString(header), "binary");
      var encodedPayload = base64url(toString(payload), encoding);
      return util.format("%s.%s", encodedHeader, encodedPayload);
    }
    __name(jwsSecuredInput, "jwsSecuredInput");
    function jwsSign(opts) {
      var header = opts.header;
      var payload = opts.payload;
      var secretOrKey = opts.secret || opts.privateKey;
      var encoding = opts.encoding;
      var algo = jwa(header.alg);
      var securedInput = jwsSecuredInput(header, payload, encoding);
      var signature = algo.sign(securedInput, secretOrKey);
      return util.format("%s.%s", securedInput, signature);
    }
    __name(jwsSign, "jwsSign");
    function SignStream(opts) {
      var secret = opts.secret;
      secret = secret == null ? opts.privateKey : secret;
      secret = secret == null ? opts.key : secret;
      if (/^hs/i.test(opts.header.alg) === true && secret == null) {
        throw new TypeError("secret must be a string or buffer or a KeyObject");
      }
      var secretStream = new DataStream(secret);
      this.readable = true;
      this.header = opts.header;
      this.encoding = opts.encoding;
      this.secret = this.privateKey = this.key = secretStream;
      this.payload = new DataStream(opts.payload);
      this.secret.once("close", function() {
        if (!this.payload.writable && this.readable)
          this.sign();
      }.bind(this));
      this.payload.once("close", function() {
        if (!this.secret.writable && this.readable)
          this.sign();
      }.bind(this));
    }
    __name(SignStream, "SignStream");
    util.inherits(SignStream, Stream);
    SignStream.prototype.sign = /* @__PURE__ */ __name(function sign() {
      try {
        var signature = jwsSign({
          header: this.header,
          payload: this.payload.buffer,
          secret: this.secret.buffer,
          encoding: this.encoding
        });
        this.emit("done", signature);
        this.emit("data", signature);
        this.emit("end");
        this.readable = false;
        return signature;
      } catch (e) {
        this.readable = false;
        this.emit("error", e);
        this.emit("close");
      }
    }, "sign");
    SignStream.sign = jwsSign;
    module.exports = SignStream;
  }
});

// ../node_modules/jws/lib/verify-stream.js
var require_verify_stream = __commonJS({
  "../node_modules/jws/lib/verify-stream.js"(exports, module) {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var Buffer2 = require_safe_buffer().Buffer;
    var DataStream = require_data_stream();
    var jwa = require_jwa();
    var Stream = require_stream();
    var toString = require_tostring();
    var util = require_util();
    var JWS_REGEX = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;
    function isObject(thing) {
      return Object.prototype.toString.call(thing) === "[object Object]";
    }
    __name(isObject, "isObject");
    function safeJsonParse(thing) {
      if (isObject(thing))
        return thing;
      try {
        return JSON.parse(thing);
      } catch (e) {
        return void 0;
      }
    }
    __name(safeJsonParse, "safeJsonParse");
    function headerFromJWS(jwsSig) {
      var encodedHeader = jwsSig.split(".", 1)[0];
      return safeJsonParse(Buffer2.from(encodedHeader, "base64").toString("binary"));
    }
    __name(headerFromJWS, "headerFromJWS");
    function securedInputFromJWS(jwsSig) {
      return jwsSig.split(".", 2).join(".");
    }
    __name(securedInputFromJWS, "securedInputFromJWS");
    function signatureFromJWS(jwsSig) {
      return jwsSig.split(".")[2];
    }
    __name(signatureFromJWS, "signatureFromJWS");
    function payloadFromJWS(jwsSig, encoding) {
      encoding = encoding || "utf8";
      var payload = jwsSig.split(".")[1];
      return Buffer2.from(payload, "base64").toString(encoding);
    }
    __name(payloadFromJWS, "payloadFromJWS");
    function isValidJws(string) {
      return JWS_REGEX.test(string) && !!headerFromJWS(string);
    }
    __name(isValidJws, "isValidJws");
    function jwsVerify(jwsSig, algorithm, secretOrKey) {
      if (!algorithm) {
        var err = new Error("Missing algorithm parameter for jws.verify");
        err.code = "MISSING_ALGORITHM";
        throw err;
      }
      jwsSig = toString(jwsSig);
      var signature = signatureFromJWS(jwsSig);
      var securedInput = securedInputFromJWS(jwsSig);
      var algo = jwa(algorithm);
      return algo.verify(securedInput, signature, secretOrKey);
    }
    __name(jwsVerify, "jwsVerify");
    function jwsDecode(jwsSig, opts) {
      opts = opts || {};
      jwsSig = toString(jwsSig);
      if (!isValidJws(jwsSig))
        return null;
      var header = headerFromJWS(jwsSig);
      if (!header)
        return null;
      var payload = payloadFromJWS(jwsSig);
      if (header.typ === "JWT" || opts.json)
        payload = JSON.parse(payload, opts.encoding);
      return {
        header,
        payload,
        signature: signatureFromJWS(jwsSig)
      };
    }
    __name(jwsDecode, "jwsDecode");
    function VerifyStream(opts) {
      opts = opts || {};
      var secretOrKey = opts.secret;
      secretOrKey = secretOrKey == null ? opts.publicKey : secretOrKey;
      secretOrKey = secretOrKey == null ? opts.key : secretOrKey;
      if (/^hs/i.test(opts.algorithm) === true && secretOrKey == null) {
        throw new TypeError("secret must be a string or buffer or a KeyObject");
      }
      var secretStream = new DataStream(secretOrKey);
      this.readable = true;
      this.algorithm = opts.algorithm;
      this.encoding = opts.encoding;
      this.secret = this.publicKey = this.key = secretStream;
      this.signature = new DataStream(opts.signature);
      this.secret.once("close", function() {
        if (!this.signature.writable && this.readable)
          this.verify();
      }.bind(this));
      this.signature.once("close", function() {
        if (!this.secret.writable && this.readable)
          this.verify();
      }.bind(this));
    }
    __name(VerifyStream, "VerifyStream");
    util.inherits(VerifyStream, Stream);
    VerifyStream.prototype.verify = /* @__PURE__ */ __name(function verify() {
      try {
        var valid = jwsVerify(this.signature.buffer, this.algorithm, this.key.buffer);
        var obj = jwsDecode(this.signature.buffer, this.encoding);
        this.emit("done", valid, obj);
        this.emit("data", valid);
        this.emit("end");
        this.readable = false;
        return valid;
      } catch (e) {
        this.readable = false;
        this.emit("error", e);
        this.emit("close");
      }
    }, "verify");
    VerifyStream.decode = jwsDecode;
    VerifyStream.isValid = isValidJws;
    VerifyStream.verify = jwsVerify;
    module.exports = VerifyStream;
  }
});

// ../node_modules/jws/index.js
var require_jws = __commonJS({
  "../node_modules/jws/index.js"(exports) {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var SignStream = require_sign_stream();
    var VerifyStream = require_verify_stream();
    var ALGORITHMS = [
      "HS256",
      "HS384",
      "HS512",
      "RS256",
      "RS384",
      "RS512",
      "PS256",
      "PS384",
      "PS512",
      "ES256",
      "ES384",
      "ES512"
    ];
    exports.ALGORITHMS = ALGORITHMS;
    exports.sign = SignStream.sign;
    exports.verify = VerifyStream.verify;
    exports.decode = VerifyStream.decode;
    exports.isValid = VerifyStream.isValid;
    exports.createSign = /* @__PURE__ */ __name(function createSign(opts) {
      return new SignStream(opts);
    }, "createSign");
    exports.createVerify = /* @__PURE__ */ __name(function createVerify(opts) {
      return new VerifyStream(opts);
    }, "createVerify");
  }
});

// ../node_modules/jsonwebtoken/decode.js
var require_decode = __commonJS({
  "../node_modules/jsonwebtoken/decode.js"(exports, module) {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var jws = require_jws();
    module.exports = function(jwt2, options) {
      options = options || {};
      var decoded = jws.decode(jwt2, options);
      if (!decoded) {
        return null;
      }
      var payload = decoded.payload;
      if (typeof payload === "string") {
        try {
          var obj = JSON.parse(payload);
          if (obj !== null && typeof obj === "object") {
            payload = obj;
          }
        } catch (e) {
        }
      }
      if (options.complete === true) {
        return {
          header: decoded.header,
          payload,
          signature: decoded.signature
        };
      }
      return payload;
    };
  }
});

// ../node_modules/jsonwebtoken/lib/JsonWebTokenError.js
var require_JsonWebTokenError = __commonJS({
  "../node_modules/jsonwebtoken/lib/JsonWebTokenError.js"(exports, module) {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var JsonWebTokenError = /* @__PURE__ */ __name(function(message, error3) {
      Error.call(this, message);
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }
      this.name = "JsonWebTokenError";
      this.message = message;
      if (error3) this.inner = error3;
    }, "JsonWebTokenError");
    JsonWebTokenError.prototype = Object.create(Error.prototype);
    JsonWebTokenError.prototype.constructor = JsonWebTokenError;
    module.exports = JsonWebTokenError;
  }
});

// ../node_modules/jsonwebtoken/lib/NotBeforeError.js
var require_NotBeforeError = __commonJS({
  "../node_modules/jsonwebtoken/lib/NotBeforeError.js"(exports, module) {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var JsonWebTokenError = require_JsonWebTokenError();
    var NotBeforeError = /* @__PURE__ */ __name(function(message, date) {
      JsonWebTokenError.call(this, message);
      this.name = "NotBeforeError";
      this.date = date;
    }, "NotBeforeError");
    NotBeforeError.prototype = Object.create(JsonWebTokenError.prototype);
    NotBeforeError.prototype.constructor = NotBeforeError;
    module.exports = NotBeforeError;
  }
});

// ../node_modules/jsonwebtoken/lib/TokenExpiredError.js
var require_TokenExpiredError = __commonJS({
  "../node_modules/jsonwebtoken/lib/TokenExpiredError.js"(exports, module) {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var JsonWebTokenError = require_JsonWebTokenError();
    var TokenExpiredError = /* @__PURE__ */ __name(function(message, expiredAt) {
      JsonWebTokenError.call(this, message);
      this.name = "TokenExpiredError";
      this.expiredAt = expiredAt;
    }, "TokenExpiredError");
    TokenExpiredError.prototype = Object.create(JsonWebTokenError.prototype);
    TokenExpiredError.prototype.constructor = TokenExpiredError;
    module.exports = TokenExpiredError;
  }
});

// ../node_modules/jsonwebtoken/node_modules/ms/index.js
var require_ms = __commonJS({
  "../node_modules/jsonwebtoken/node_modules/ms/index.js"(exports, module) {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse2(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse2(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match2 = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match2) {
        return;
      }
      var n = parseFloat(match2[1]);
      var type = (match2[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    __name(parse2, "parse");
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    __name(fmtShort, "fmtShort");
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    __name(fmtLong, "fmtLong");
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
    __name(plural, "plural");
  }
});

// ../node_modules/jsonwebtoken/lib/timespan.js
var require_timespan = __commonJS({
  "../node_modules/jsonwebtoken/lib/timespan.js"(exports, module) {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var ms = require_ms();
    module.exports = function(time3, iat) {
      var timestamp = iat || Math.floor(Date.now() / 1e3);
      if (typeof time3 === "string") {
        var milliseconds = ms(time3);
        if (typeof milliseconds === "undefined") {
          return;
        }
        return Math.floor(timestamp + milliseconds / 1e3);
      } else if (typeof time3 === "number") {
        return timestamp + time3;
      } else {
        return;
      }
    };
  }
});

// ../node_modules/semver/internal/constants.js
var require_constants = __commonJS({
  "../node_modules/semver/internal/constants.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var SEMVER_SPEC_VERSION = "2.0.0";
    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
    9007199254740991;
    var MAX_SAFE_COMPONENT_LENGTH = 16;
    var MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
    var RELEASE_TYPES = [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ];
    module.exports = {
      MAX_LENGTH,
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_SAFE_INTEGER,
      RELEASE_TYPES,
      SEMVER_SPEC_VERSION,
      FLAG_INCLUDE_PRERELEASE: 1,
      FLAG_LOOSE: 2
    };
  }
});

// ../node_modules/semver/internal/debug.js
var require_debug = __commonJS({
  "../node_modules/semver/internal/debug.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var debug3 = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
    };
    module.exports = debug3;
  }
});

// ../node_modules/semver/internal/re.js
var require_re = __commonJS({
  "../node_modules/semver/internal/re.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var {
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_LENGTH
    } = require_constants();
    var debug3 = require_debug();
    exports = module.exports = {};
    var re = exports.re = [];
    var safeRe = exports.safeRe = [];
    var src = exports.src = [];
    var safeSrc = exports.safeSrc = [];
    var t = exports.t = {};
    var R = 0;
    var LETTERDASHNUMBER = "[a-zA-Z0-9-]";
    var safeRegexReplacements = [
      ["\\s", 1],
      ["\\d", MAX_LENGTH],
      [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH]
    ];
    var makeSafeRegex = /* @__PURE__ */ __name((value) => {
      for (const [token, max] of safeRegexReplacements) {
        value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
      }
      return value;
    }, "makeSafeRegex");
    var createToken = /* @__PURE__ */ __name((name, value, isGlobal) => {
      const safe = makeSafeRegex(value);
      const index = R++;
      debug3(name, index, value);
      t[name] = index;
      src[index] = value;
      safeSrc[index] = safe;
      re[index] = new RegExp(value, isGlobal ? "g" : void 0);
      safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
    }, "createToken");
    createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
    createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
    createToken("MAINVERSION", `(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})`);
    createToken("MAINVERSIONLOOSE", `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASEIDENTIFIER", `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIER]})`);
    createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASE", `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
    createToken("PRERELEASELOOSE", `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
    createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
    createToken("BUILD", `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
    createToken("FULLPLAIN", `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
    createToken("FULL", `^${src[t.FULLPLAIN]}$`);
    createToken("LOOSEPLAIN", `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
    createToken("LOOSE", `^${src[t.LOOSEPLAIN]}$`);
    createToken("GTLT", "((?:<|>)?=?)");
    createToken("XRANGEIDENTIFIERLOOSE", `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    createToken("XRANGEIDENTIFIER", `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
    createToken("XRANGEPLAIN", `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
    createToken("XRANGELOOSE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COERCEPLAIN", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
    createToken("COERCE", `${src[t.COERCEPLAIN]}(?:$|[^\\d])`);
    createToken("COERCEFULL", src[t.COERCEPLAIN] + `(?:${src[t.PRERELEASE]})?(?:${src[t.BUILD]})?(?:$|[^\\d])`);
    createToken("COERCERTL", src[t.COERCE], true);
    createToken("COERCERTLFULL", src[t.COERCEFULL], true);
    createToken("LONETILDE", "(?:~>?)");
    createToken("TILDETRIM", `(\\s*)${src[t.LONETILDE]}\\s+`, true);
    exports.tildeTrimReplace = "$1~";
    createToken("TILDE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
    createToken("TILDELOOSE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("LONECARET", "(?:\\^)");
    createToken("CARETTRIM", `(\\s*)${src[t.LONECARET]}\\s+`, true);
    exports.caretTrimReplace = "$1^";
    createToken("CARET", `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
    createToken("CARETLOOSE", `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COMPARATORLOOSE", `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
    createToken("COMPARATOR", `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
    createToken("COMPARATORTRIM", `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
    exports.comparatorTrimReplace = "$1$2$3";
    createToken("HYPHENRANGE", `^\\s*(${src[t.XRANGEPLAIN]})\\s+-\\s+(${src[t.XRANGEPLAIN]})\\s*$`);
    createToken("HYPHENRANGELOOSE", `^\\s*(${src[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t.XRANGEPLAINLOOSE]})\\s*$`);
    createToken("STAR", "(<|>)?=?\\s*\\*");
    createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }
});

// ../node_modules/semver/internal/parse-options.js
var require_parse_options = __commonJS({
  "../node_modules/semver/internal/parse-options.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var looseOption = Object.freeze({ loose: true });
    var emptyOpts = Object.freeze({});
    var parseOptions = /* @__PURE__ */ __name((options) => {
      if (!options) {
        return emptyOpts;
      }
      if (typeof options !== "object") {
        return looseOption;
      }
      return options;
    }, "parseOptions");
    module.exports = parseOptions;
  }
});

// ../node_modules/semver/internal/identifiers.js
var require_identifiers = __commonJS({
  "../node_modules/semver/internal/identifiers.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var numeric = /^[0-9]+$/;
    var compareIdentifiers = /* @__PURE__ */ __name((a, b) => {
      if (typeof a === "number" && typeof b === "number") {
        return a === b ? 0 : a < b ? -1 : 1;
      }
      const anum = numeric.test(a);
      const bnum = numeric.test(b);
      if (anum && bnum) {
        a = +a;
        b = +b;
      }
      return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
    }, "compareIdentifiers");
    var rcompareIdentifiers = /* @__PURE__ */ __name((a, b) => compareIdentifiers(b, a), "rcompareIdentifiers");
    module.exports = {
      compareIdentifiers,
      rcompareIdentifiers
    };
  }
});

// ../node_modules/semver/classes/semver.js
var require_semver = __commonJS({
  "../node_modules/semver/classes/semver.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var debug3 = require_debug();
    var { MAX_LENGTH, MAX_SAFE_INTEGER } = require_constants();
    var { safeRe: re, t } = require_re();
    var parseOptions = require_parse_options();
    var { compareIdentifiers } = require_identifiers();
    var isPrereleaseIdentifier = /* @__PURE__ */ __name((prerelease, identifier) => {
      const identifiers = identifier.split(".");
      if (identifiers.length > prerelease.length) {
        return false;
      }
      for (let i = 0; i < identifiers.length; i++) {
        if (compareIdentifiers(prerelease[i], identifiers[i]) !== 0) {
          return false;
        }
      }
      return true;
    }, "isPrereleaseIdentifier");
    var SemVer = class _SemVer {
      static {
        __name(this, "SemVer");
      }
      constructor(version2, options) {
        options = parseOptions(options);
        if (version2 instanceof _SemVer) {
          if (version2.loose === !!options.loose && version2.includePrerelease === !!options.includePrerelease) {
            return version2;
          } else {
            version2 = version2.version;
          }
        } else if (typeof version2 !== "string") {
          throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version2}".`);
        }
        if (version2.length > MAX_LENGTH) {
          throw new TypeError(
            `version is longer than ${MAX_LENGTH} characters`
          );
        }
        debug3("SemVer", version2, options);
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        const m = version2.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
        if (!m) {
          throw new TypeError(`Invalid Version: ${version2}`);
        }
        this.raw = version2;
        this.major = +m[1];
        this.minor = +m[2];
        this.patch = +m[3];
        if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
          throw new TypeError("Invalid major version");
        }
        if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
          throw new TypeError("Invalid minor version");
        }
        if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
          throw new TypeError("Invalid patch version");
        }
        if (!m[4]) {
          this.prerelease = [];
        } else {
          this.prerelease = m[4].split(".").map((id) => {
            if (/^[0-9]+$/.test(id)) {
              const num = +id;
              if (num >= 0 && num < MAX_SAFE_INTEGER) {
                return num;
              }
            }
            return id;
          });
        }
        this.build = m[5] ? m[5].split(".") : [];
        this.format();
      }
      format() {
        this.version = `${this.major}.${this.minor}.${this.patch}`;
        if (this.prerelease.length) {
          this.version += `-${this.prerelease.join(".")}`;
        }
        return this.version;
      }
      toString() {
        return this.version;
      }
      compare(other) {
        debug3("SemVer.compare", this.version, this.options, other);
        if (!(other instanceof _SemVer)) {
          if (typeof other === "string" && other === this.version) {
            return 0;
          }
          other = new _SemVer(other, this.options);
        }
        if (other.version === this.version) {
          return 0;
        }
        return this.compareMain(other) || this.comparePre(other);
      }
      compareMain(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        if (this.major < other.major) {
          return -1;
        }
        if (this.major > other.major) {
          return 1;
        }
        if (this.minor < other.minor) {
          return -1;
        }
        if (this.minor > other.minor) {
          return 1;
        }
        if (this.patch < other.patch) {
          return -1;
        }
        if (this.patch > other.patch) {
          return 1;
        }
        return 0;
      }
      comparePre(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        if (this.prerelease.length && !other.prerelease.length) {
          return -1;
        } else if (!this.prerelease.length && other.prerelease.length) {
          return 1;
        } else if (!this.prerelease.length && !other.prerelease.length) {
          return 0;
        }
        let i = 0;
        do {
          const a = this.prerelease[i];
          const b = other.prerelease[i];
          debug3("prerelease compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      compareBuild(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        let i = 0;
        do {
          const a = this.build[i];
          const b = other.build[i];
          debug3("build compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      // preminor will bump the version up to the next minor release, and immediately
      // down to pre-release. premajor and prepatch work the same way.
      inc(release2, identifier, identifierBase) {
        if (release2.startsWith("pre")) {
          if (!identifier && identifierBase === false) {
            throw new Error("invalid increment argument: identifier is empty");
          }
          if (identifier) {
            const match2 = `-${identifier}`.match(this.options.loose ? re[t.PRERELEASELOOSE] : re[t.PRERELEASE]);
            if (!match2 || match2[1] !== identifier) {
              throw new Error(`invalid identifier: ${identifier}`);
            }
          }
        }
        switch (release2) {
          case "premajor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor = 0;
            this.major++;
            this.inc("pre", identifier, identifierBase);
            break;
          case "preminor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor++;
            this.inc("pre", identifier, identifierBase);
            break;
          case "prepatch":
            this.prerelease.length = 0;
            this.inc("patch", identifier, identifierBase);
            this.inc("pre", identifier, identifierBase);
            break;
          // If the input is a non-prerelease version, this acts the same as
          // prepatch.
          case "prerelease":
            if (this.prerelease.length === 0) {
              this.inc("patch", identifier, identifierBase);
            }
            this.inc("pre", identifier, identifierBase);
            break;
          case "release":
            if (this.prerelease.length === 0) {
              throw new Error(`version ${this.raw} is not a prerelease`);
            }
            this.prerelease.length = 0;
            break;
          case "major":
            if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
              this.major++;
            }
            this.minor = 0;
            this.patch = 0;
            this.prerelease = [];
            break;
          case "minor":
            if (this.patch !== 0 || this.prerelease.length === 0) {
              this.minor++;
            }
            this.patch = 0;
            this.prerelease = [];
            break;
          case "patch":
            if (this.prerelease.length === 0) {
              this.patch++;
            }
            this.prerelease = [];
            break;
          // This probably shouldn't be used publicly.
          // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
          case "pre": {
            const base = Number(identifierBase) ? 1 : 0;
            if (this.prerelease.length === 0) {
              this.prerelease = [base];
            } else {
              let i = this.prerelease.length;
              while (--i >= 0) {
                if (typeof this.prerelease[i] === "number") {
                  this.prerelease[i]++;
                  i = -2;
                }
              }
              if (i === -1) {
                if (identifier === this.prerelease.join(".") && identifierBase === false) {
                  throw new Error("invalid increment argument: identifier already exists");
                }
                this.prerelease.push(base);
              }
            }
            if (identifier) {
              let prerelease = [identifier, base];
              if (identifierBase === false) {
                prerelease = [identifier];
              }
              if (isPrereleaseIdentifier(this.prerelease, identifier)) {
                const prereleaseBase = this.prerelease[identifier.split(".").length];
                if (isNaN(prereleaseBase)) {
                  this.prerelease = prerelease;
                }
              } else {
                this.prerelease = prerelease;
              }
            }
            break;
          }
          default:
            throw new Error(`invalid increment argument: ${release2}`);
        }
        this.raw = this.format();
        if (this.build.length) {
          this.raw += `+${this.build.join(".")}`;
        }
        return this;
      }
    };
    module.exports = SemVer;
  }
});

// ../node_modules/semver/functions/parse.js
var require_parse = __commonJS({
  "../node_modules/semver/functions/parse.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var SemVer = require_semver();
    var parse2 = /* @__PURE__ */ __name((version2, options, throwErrors = false) => {
      if (version2 instanceof SemVer) {
        return version2;
      }
      try {
        return new SemVer(version2, options);
      } catch (er) {
        if (!throwErrors) {
          return null;
        }
        throw er;
      }
    }, "parse");
    module.exports = parse2;
  }
});

// ../node_modules/semver/functions/valid.js
var require_valid = __commonJS({
  "../node_modules/semver/functions/valid.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var parse2 = require_parse();
    var valid = /* @__PURE__ */ __name((version2, options) => {
      const v = parse2(version2, options);
      return v ? v.version : null;
    }, "valid");
    module.exports = valid;
  }
});

// ../node_modules/semver/functions/clean.js
var require_clean = __commonJS({
  "../node_modules/semver/functions/clean.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var parse2 = require_parse();
    var clean = /* @__PURE__ */ __name((version2, options) => {
      const s = parse2(version2.trim().replace(/^[=v]+/, ""), options);
      return s ? s.version : null;
    }, "clean");
    module.exports = clean;
  }
});

// ../node_modules/semver/functions/inc.js
var require_inc = __commonJS({
  "../node_modules/semver/functions/inc.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var SemVer = require_semver();
    var inc = /* @__PURE__ */ __name((version2, release2, options, identifier, identifierBase) => {
      if (typeof options === "string") {
        identifierBase = identifier;
        identifier = options;
        options = void 0;
      }
      try {
        return new SemVer(
          version2 instanceof SemVer ? version2.version : version2,
          options
        ).inc(release2, identifier, identifierBase).version;
      } catch (er) {
        return null;
      }
    }, "inc");
    module.exports = inc;
  }
});

// ../node_modules/semver/functions/diff.js
var require_diff = __commonJS({
  "../node_modules/semver/functions/diff.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var parse2 = require_parse();
    var diff = /* @__PURE__ */ __name((version1, version2) => {
      const v1 = parse2(version1, null, true);
      const v2 = parse2(version2, null, true);
      const comparison = v1.compare(v2);
      if (comparison === 0) {
        return null;
      }
      const v1Higher = comparison > 0;
      const highVersion = v1Higher ? v1 : v2;
      const lowVersion = v1Higher ? v2 : v1;
      const highHasPre = !!highVersion.prerelease.length;
      const lowHasPre = !!lowVersion.prerelease.length;
      if (lowHasPre && !highHasPre) {
        if (!lowVersion.patch && !lowVersion.minor) {
          return "major";
        }
        if (lowVersion.compareMain(highVersion) === 0) {
          if (lowVersion.minor && !lowVersion.patch) {
            return "minor";
          }
          return "patch";
        }
      }
      const prefix = highHasPre ? "pre" : "";
      if (v1.major !== v2.major) {
        return prefix + "major";
      }
      if (v1.minor !== v2.minor) {
        return prefix + "minor";
      }
      if (v1.patch !== v2.patch) {
        return prefix + "patch";
      }
      return "prerelease";
    }, "diff");
    module.exports = diff;
  }
});

// ../node_modules/semver/functions/major.js
var require_major = __commonJS({
  "../node_modules/semver/functions/major.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var SemVer = require_semver();
    var major = /* @__PURE__ */ __name((a, loose) => new SemVer(a, loose).major, "major");
    module.exports = major;
  }
});

// ../node_modules/semver/functions/minor.js
var require_minor = __commonJS({
  "../node_modules/semver/functions/minor.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var SemVer = require_semver();
    var minor = /* @__PURE__ */ __name((a, loose) => new SemVer(a, loose).minor, "minor");
    module.exports = minor;
  }
});

// ../node_modules/semver/functions/patch.js
var require_patch = __commonJS({
  "../node_modules/semver/functions/patch.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var SemVer = require_semver();
    var patch = /* @__PURE__ */ __name((a, loose) => new SemVer(a, loose).patch, "patch");
    module.exports = patch;
  }
});

// ../node_modules/semver/functions/prerelease.js
var require_prerelease = __commonJS({
  "../node_modules/semver/functions/prerelease.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var parse2 = require_parse();
    var prerelease = /* @__PURE__ */ __name((version2, options) => {
      const parsed = parse2(version2, options);
      return parsed && parsed.prerelease.length ? parsed.prerelease : null;
    }, "prerelease");
    module.exports = prerelease;
  }
});

// ../node_modules/semver/functions/compare.js
var require_compare = __commonJS({
  "../node_modules/semver/functions/compare.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var SemVer = require_semver();
    var compare = /* @__PURE__ */ __name((a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose)), "compare");
    module.exports = compare;
  }
});

// ../node_modules/semver/functions/rcompare.js
var require_rcompare = __commonJS({
  "../node_modules/semver/functions/rcompare.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var compare = require_compare();
    var rcompare = /* @__PURE__ */ __name((a, b, loose) => compare(b, a, loose), "rcompare");
    module.exports = rcompare;
  }
});

// ../node_modules/semver/functions/compare-loose.js
var require_compare_loose = __commonJS({
  "../node_modules/semver/functions/compare-loose.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var compare = require_compare();
    var compareLoose = /* @__PURE__ */ __name((a, b) => compare(a, b, true), "compareLoose");
    module.exports = compareLoose;
  }
});

// ../node_modules/semver/functions/compare-build.js
var require_compare_build = __commonJS({
  "../node_modules/semver/functions/compare-build.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var SemVer = require_semver();
    var compareBuild = /* @__PURE__ */ __name((a, b, loose) => {
      const versionA = new SemVer(a, loose);
      const versionB = new SemVer(b, loose);
      return versionA.compare(versionB) || versionA.compareBuild(versionB);
    }, "compareBuild");
    module.exports = compareBuild;
  }
});

// ../node_modules/semver/functions/sort.js
var require_sort = __commonJS({
  "../node_modules/semver/functions/sort.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var compareBuild = require_compare_build();
    var sort = /* @__PURE__ */ __name((list, loose) => list.sort((a, b) => compareBuild(a, b, loose)), "sort");
    module.exports = sort;
  }
});

// ../node_modules/semver/functions/rsort.js
var require_rsort = __commonJS({
  "../node_modules/semver/functions/rsort.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var compareBuild = require_compare_build();
    var rsort = /* @__PURE__ */ __name((list, loose) => list.sort((a, b) => compareBuild(b, a, loose)), "rsort");
    module.exports = rsort;
  }
});

// ../node_modules/semver/functions/gt.js
var require_gt = __commonJS({
  "../node_modules/semver/functions/gt.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var compare = require_compare();
    var gt = /* @__PURE__ */ __name((a, b, loose) => compare(a, b, loose) > 0, "gt");
    module.exports = gt;
  }
});

// ../node_modules/semver/functions/lt.js
var require_lt = __commonJS({
  "../node_modules/semver/functions/lt.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var compare = require_compare();
    var lt = /* @__PURE__ */ __name((a, b, loose) => compare(a, b, loose) < 0, "lt");
    module.exports = lt;
  }
});

// ../node_modules/semver/functions/eq.js
var require_eq = __commonJS({
  "../node_modules/semver/functions/eq.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var compare = require_compare();
    var eq = /* @__PURE__ */ __name((a, b, loose) => compare(a, b, loose) === 0, "eq");
    module.exports = eq;
  }
});

// ../node_modules/semver/functions/neq.js
var require_neq = __commonJS({
  "../node_modules/semver/functions/neq.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var compare = require_compare();
    var neq = /* @__PURE__ */ __name((a, b, loose) => compare(a, b, loose) !== 0, "neq");
    module.exports = neq;
  }
});

// ../node_modules/semver/functions/gte.js
var require_gte = __commonJS({
  "../node_modules/semver/functions/gte.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var compare = require_compare();
    var gte = /* @__PURE__ */ __name((a, b, loose) => compare(a, b, loose) >= 0, "gte");
    module.exports = gte;
  }
});

// ../node_modules/semver/functions/lte.js
var require_lte = __commonJS({
  "../node_modules/semver/functions/lte.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var compare = require_compare();
    var lte = /* @__PURE__ */ __name((a, b, loose) => compare(a, b, loose) <= 0, "lte");
    module.exports = lte;
  }
});

// ../node_modules/semver/functions/cmp.js
var require_cmp = __commonJS({
  "../node_modules/semver/functions/cmp.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var eq = require_eq();
    var neq = require_neq();
    var gt = require_gt();
    var gte = require_gte();
    var lt = require_lt();
    var lte = require_lte();
    var cmp = /* @__PURE__ */ __name((a, op, b, loose) => {
      switch (op) {
        case "===":
          if (typeof a === "object") {
            a = a.version;
          }
          if (typeof b === "object") {
            b = b.version;
          }
          return a === b;
        case "!==":
          if (typeof a === "object") {
            a = a.version;
          }
          if (typeof b === "object") {
            b = b.version;
          }
          return a !== b;
        case "":
        case "=":
        case "==":
          return eq(a, b, loose);
        case "!=":
          return neq(a, b, loose);
        case ">":
          return gt(a, b, loose);
        case ">=":
          return gte(a, b, loose);
        case "<":
          return lt(a, b, loose);
        case "<=":
          return lte(a, b, loose);
        default:
          throw new TypeError(`Invalid operator: ${op}`);
      }
    }, "cmp");
    module.exports = cmp;
  }
});

// ../node_modules/semver/functions/coerce.js
var require_coerce = __commonJS({
  "../node_modules/semver/functions/coerce.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var SemVer = require_semver();
    var parse2 = require_parse();
    var { safeRe: re, t } = require_re();
    var coerce = /* @__PURE__ */ __name((version2, options) => {
      if (version2 instanceof SemVer) {
        return version2;
      }
      if (typeof version2 === "number") {
        version2 = String(version2);
      }
      if (typeof version2 !== "string") {
        return null;
      }
      options = options || {};
      let match2 = null;
      if (!options.rtl) {
        match2 = version2.match(options.includePrerelease ? re[t.COERCEFULL] : re[t.COERCE]);
      } else {
        const coerceRtlRegex = options.includePrerelease ? re[t.COERCERTLFULL] : re[t.COERCERTL];
        let next;
        while ((next = coerceRtlRegex.exec(version2)) && (!match2 || match2.index + match2[0].length !== version2.length)) {
          if (!match2 || next.index + next[0].length !== match2.index + match2[0].length) {
            match2 = next;
          }
          coerceRtlRegex.lastIndex = next.index + next[1].length + next[2].length;
        }
        coerceRtlRegex.lastIndex = -1;
      }
      if (match2 === null) {
        return null;
      }
      const major = match2[2];
      const minor = match2[3] || "0";
      const patch = match2[4] || "0";
      const prerelease = options.includePrerelease && match2[5] ? `-${match2[5]}` : "";
      const build = options.includePrerelease && match2[6] ? `+${match2[6]}` : "";
      return parse2(`${major}.${minor}.${patch}${prerelease}${build}`, options);
    }, "coerce");
    module.exports = coerce;
  }
});

// ../node_modules/semver/functions/truncate.js
var require_truncate = __commonJS({
  "../node_modules/semver/functions/truncate.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var parse2 = require_parse();
    var constants = require_constants();
    var SemVer = require_semver();
    var truncate = /* @__PURE__ */ __name((version2, truncation, options) => {
      if (!constants.RELEASE_TYPES.includes(truncation)) {
        return null;
      }
      const clonedVersion = cloneInputVersion(version2, options);
      return clonedVersion && doTruncation(clonedVersion, truncation);
    }, "truncate");
    var cloneInputVersion = /* @__PURE__ */ __name((version2, options) => {
      const versionStringToParse = version2 instanceof SemVer ? version2.version : version2;
      return parse2(versionStringToParse, options);
    }, "cloneInputVersion");
    var doTruncation = /* @__PURE__ */ __name((version2, truncation) => {
      if (isPrerelease(truncation)) {
        return version2.version;
      }
      version2.prerelease = [];
      switch (truncation) {
        case "major":
          version2.minor = 0;
          version2.patch = 0;
          break;
        case "minor":
          version2.patch = 0;
          break;
      }
      return version2.format();
    }, "doTruncation");
    var isPrerelease = /* @__PURE__ */ __name((type) => {
      return type.startsWith("pre");
    }, "isPrerelease");
    module.exports = truncate;
  }
});

// ../node_modules/semver/internal/lrucache.js
var require_lrucache = __commonJS({
  "../node_modules/semver/internal/lrucache.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var LRUCache = class {
      static {
        __name(this, "LRUCache");
      }
      constructor() {
        this.max = 1e3;
        this.map = /* @__PURE__ */ new Map();
      }
      get(key) {
        const value = this.map.get(key);
        if (value === void 0) {
          return void 0;
        } else {
          this.map.delete(key);
          this.map.set(key, value);
          return value;
        }
      }
      delete(key) {
        return this.map.delete(key);
      }
      set(key, value) {
        const deleted = this.delete(key);
        if (!deleted && value !== void 0) {
          if (this.map.size >= this.max) {
            const firstKey = this.map.keys().next().value;
            this.delete(firstKey);
          }
          this.map.set(key, value);
        }
        return this;
      }
    };
    module.exports = LRUCache;
  }
});

// ../node_modules/semver/classes/range.js
var require_range = __commonJS({
  "../node_modules/semver/classes/range.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var SPACE_CHARACTERS = /\s+/g;
    var Range = class _Range {
      static {
        __name(this, "Range");
      }
      constructor(range, options) {
        options = parseOptions(options);
        if (range instanceof _Range) {
          if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
            return range;
          } else {
            return new _Range(range.raw, options);
          }
        }
        if (range instanceof Comparator) {
          this.raw = range.value;
          this.set = [[range]];
          this.formatted = void 0;
          return this;
        }
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        this.raw = range.trim().replace(SPACE_CHARACTERS, " ");
        this.set = this.raw.split("||").map((r) => this.parseRange(r.trim())).filter((c) => c.length);
        if (!this.set.length) {
          throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
        }
        if (this.set.length > 1) {
          const first = this.set[0];
          this.set = this.set.filter((c) => !isNullSet(c[0]));
          if (this.set.length === 0) {
            this.set = [first];
          } else if (this.set.length > 1) {
            for (const c of this.set) {
              if (c.length === 1 && isAny(c[0])) {
                this.set = [c];
                break;
              }
            }
          }
        }
        this.formatted = void 0;
      }
      get range() {
        if (this.formatted === void 0) {
          this.formatted = "";
          for (let i = 0; i < this.set.length; i++) {
            if (i > 0) {
              this.formatted += "||";
            }
            const comps = this.set[i];
            for (let k = 0; k < comps.length; k++) {
              if (k > 0) {
                this.formatted += " ";
              }
              this.formatted += comps[k].toString().trim();
            }
          }
        }
        return this.formatted;
      }
      format() {
        return this.range;
      }
      toString() {
        return this.range;
      }
      parseRange(range) {
        range = range.replace(BUILDSTRIPRE, "");
        const memoOpts = (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) | (this.options.loose && FLAG_LOOSE);
        const memoKey = memoOpts + ":" + range;
        const cached = cache.get(memoKey);
        if (cached) {
          return cached;
        }
        const loose = this.options.loose;
        const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
        range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
        debug3("hyphen replace", range);
        range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
        debug3("comparator trim", range);
        range = range.replace(re[t.TILDETRIM], tildeTrimReplace);
        debug3("tilde trim", range);
        range = range.replace(re[t.CARETTRIM], caretTrimReplace);
        debug3("caret trim", range);
        let rangeList = range.split(" ").map((comp) => parseComparator(comp, this.options)).join(" ").split(/\s+/).map((comp) => replaceGTE0(comp, this.options));
        if (loose) {
          rangeList = rangeList.filter((comp) => {
            debug3("loose invalid filter", comp, this.options);
            return !!comp.match(re[t.COMPARATORLOOSE]);
          });
        }
        debug3("range list", rangeList);
        const rangeMap = /* @__PURE__ */ new Map();
        const comparators = rangeList.map((comp) => new Comparator(comp, this.options));
        for (const comp of comparators) {
          if (isNullSet(comp)) {
            return [comp];
          }
          rangeMap.set(comp.value, comp);
        }
        if (rangeMap.size > 1 && rangeMap.has("")) {
          rangeMap.delete("");
        }
        const result = [...rangeMap.values()];
        cache.set(memoKey, result);
        return result;
      }
      intersects(range, options) {
        if (!(range instanceof _Range)) {
          throw new TypeError("a Range is required");
        }
        return this.set.some((thisComparators) => {
          return isSatisfiable(thisComparators, options) && range.set.some((rangeComparators) => {
            return isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator) => {
              return rangeComparators.every((rangeComparator) => {
                return thisComparator.intersects(rangeComparator, options);
              });
            });
          });
        });
      }
      // if ANY of the sets match ALL of its comparators, then pass
      test(version2) {
        if (!version2) {
          return false;
        }
        if (typeof version2 === "string") {
          try {
            version2 = new SemVer(version2, this.options);
          } catch (er) {
            return false;
          }
        }
        for (let i = 0; i < this.set.length; i++) {
          if (testSet(this.set[i], version2, this.options)) {
            return true;
          }
        }
        return false;
      }
    };
    module.exports = Range;
    var LRU = require_lrucache();
    var cache = new LRU();
    var parseOptions = require_parse_options();
    var Comparator = require_comparator();
    var debug3 = require_debug();
    var SemVer = require_semver();
    var {
      safeRe: re,
      src,
      t,
      comparatorTrimReplace,
      tildeTrimReplace,
      caretTrimReplace
    } = require_re();
    var { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = require_constants();
    var BUILDSTRIPRE = new RegExp(src[t.BUILD], "g");
    var isNullSet = /* @__PURE__ */ __name((c) => c.value === "<0.0.0-0", "isNullSet");
    var isAny = /* @__PURE__ */ __name((c) => c.value === "", "isAny");
    var isSatisfiable = /* @__PURE__ */ __name((comparators, options) => {
      let result = true;
      const remainingComparators = comparators.slice();
      let testComparator = remainingComparators.pop();
      while (result && remainingComparators.length) {
        result = remainingComparators.every((otherComparator) => {
          return testComparator.intersects(otherComparator, options);
        });
        testComparator = remainingComparators.pop();
      }
      return result;
    }, "isSatisfiable");
    var parseComparator = /* @__PURE__ */ __name((comp, options) => {
      comp = comp.replace(re[t.BUILD], "");
      debug3("comp", comp, options);
      comp = replaceCarets(comp, options);
      debug3("caret", comp);
      comp = replaceTildes(comp, options);
      debug3("tildes", comp);
      comp = replaceXRanges(comp, options);
      debug3("xrange", comp);
      comp = replaceStars(comp, options);
      debug3("stars", comp);
      return comp;
    }, "parseComparator");
    var isX = /* @__PURE__ */ __name((id) => !id || id.toLowerCase() === "x" || id === "*", "isX");
    var invalidXRangeOrder = /* @__PURE__ */ __name((M, m, p) => isX(M) && !isX(m) || isX(m) && p && !isX(p), "invalidXRangeOrder");
    var replaceTildes = /* @__PURE__ */ __name((comp, options) => {
      return comp.trim().split(/\s+/).map((c) => replaceTilde(c, options)).join(" ");
    }, "replaceTildes");
    var replaceTilde = /* @__PURE__ */ __name((comp, options) => {
      const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
      const z = options.includePrerelease ? "-0" : "";
      return comp.replace(r, (_, M, m, p, pr) => {
        debug3("tilde", comp, _, M, m, p, pr);
        let ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
        } else if (pr) {
          debug3("replaceTilde pr", pr);
          ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
        } else {
          ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
        }
        debug3("tilde return", ret);
        return ret;
      });
    }, "replaceTilde");
    var replaceCarets = /* @__PURE__ */ __name((comp, options) => {
      return comp.trim().split(/\s+/).map((c) => replaceCaret(c, options)).join(" ");
    }, "replaceCarets");
    var replaceCaret = /* @__PURE__ */ __name((comp, options) => {
      debug3("caret", comp, options);
      const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
      const z = options.includePrerelease ? "-0" : "";
      return comp.replace(r, (_, M, m, p, pr) => {
        debug3("caret", comp, _, M, m, p, pr);
        let ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          if (M === "0") {
            ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
          } else {
            ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
          }
        } else if (pr) {
          debug3("replaceCaret pr", pr);
          if (M === "0") {
            if (m === "0") {
              ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
          }
        } else {
          debug3("no pr");
          if (M === "0") {
            if (m === "0") {
              ret = `>=${M}.${m}.${p} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
          }
        }
        debug3("caret return", ret);
        return ret;
      });
    }, "replaceCaret");
    var replaceXRanges = /* @__PURE__ */ __name((comp, options) => {
      debug3("replaceXRanges", comp, options);
      return comp.split(/\s+/).map((c) => replaceXRange(c, options)).join(" ");
    }, "replaceXRanges");
    var replaceXRange = /* @__PURE__ */ __name((comp, options) => {
      comp = comp.trim();
      const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
      return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
        debug3("xRange", comp, ret, gtlt, M, m, p, pr);
        if (invalidXRangeOrder(M, m, p)) {
          return comp;
        }
        const xM = isX(M);
        const xm = xM || isX(m);
        const xp = xm || isX(p);
        const anyX = xp;
        if (gtlt === "=" && anyX) {
          gtlt = "";
        }
        pr = options.includePrerelease ? "-0" : "";
        if (xM) {
          if (gtlt === ">" || gtlt === "<") {
            ret = "<0.0.0-0";
          } else {
            ret = "*";
          }
        } else if (gtlt && anyX) {
          if (xm) {
            m = 0;
          }
          p = 0;
          if (gtlt === ">") {
            gtlt = ">=";
            if (xm) {
              M = +M + 1;
              m = 0;
              p = 0;
            } else {
              m = +m + 1;
              p = 0;
            }
          } else if (gtlt === "<=") {
            gtlt = "<";
            if (xm) {
              M = +M + 1;
            } else {
              m = +m + 1;
            }
          }
          if (gtlt === "<") {
            pr = "-0";
          }
          ret = `${gtlt + M}.${m}.${p}${pr}`;
        } else if (xm) {
          ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
        } else if (xp) {
          ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
        }
        debug3("xRange return", ret);
        return ret;
      });
    }, "replaceXRange");
    var replaceStars = /* @__PURE__ */ __name((comp, options) => {
      debug3("replaceStars", comp, options);
      return comp.trim().replace(re[t.STAR], "");
    }, "replaceStars");
    var replaceGTE0 = /* @__PURE__ */ __name((comp, options) => {
      debug3("replaceGTE0", comp, options);
      return comp.trim().replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], "");
    }, "replaceGTE0");
    var hyphenReplace = /* @__PURE__ */ __name((incPr) => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr) => {
      if (isX(fM)) {
        from = "";
      } else if (isX(fm)) {
        from = `>=${fM}.0.0${incPr ? "-0" : ""}`;
      } else if (isX(fp)) {
        from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`;
      } else if (fpr) {
        from = `>=${from}`;
      } else {
        from = `>=${from}${incPr ? "-0" : ""}`;
      }
      if (isX(tM)) {
        to = "";
      } else if (isX(tm)) {
        to = `<${+tM + 1}.0.0-0`;
      } else if (isX(tp)) {
        to = `<${tM}.${+tm + 1}.0-0`;
      } else if (tpr) {
        to = `<=${tM}.${tm}.${tp}-${tpr}`;
      } else if (incPr) {
        to = `<${tM}.${tm}.${+tp + 1}-0`;
      } else {
        to = `<=${to}`;
      }
      return `${from} ${to}`.trim();
    }, "hyphenReplace");
    var testSet = /* @__PURE__ */ __name((set, version2, options) => {
      for (let i = 0; i < set.length; i++) {
        if (!set[i].test(version2)) {
          return false;
        }
      }
      if (version2.prerelease.length && !options.includePrerelease) {
        for (let i = 0; i < set.length; i++) {
          debug3(set[i].semver);
          if (set[i].semver === Comparator.ANY) {
            continue;
          }
          if (set[i].semver.prerelease.length > 0) {
            const allowed = set[i].semver;
            if (allowed.major === version2.major && allowed.minor === version2.minor && allowed.patch === version2.patch) {
              return true;
            }
          }
        }
        return false;
      }
      return true;
    }, "testSet");
  }
});

// ../node_modules/semver/classes/comparator.js
var require_comparator = __commonJS({
  "../node_modules/semver/classes/comparator.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var ANY = /* @__PURE__ */ Symbol("SemVer ANY");
    var Comparator = class _Comparator {
      static {
        __name(this, "Comparator");
      }
      static get ANY() {
        return ANY;
      }
      constructor(comp, options) {
        options = parseOptions(options);
        if (comp instanceof _Comparator) {
          if (comp.loose === !!options.loose) {
            return comp;
          } else {
            comp = comp.value;
          }
        }
        comp = comp.trim().split(/\s+/).join(" ");
        debug3("comparator", comp, options);
        this.options = options;
        this.loose = !!options.loose;
        this.parse(comp);
        if (this.semver === ANY) {
          this.value = "";
        } else {
          this.value = this.operator + this.semver.version;
        }
        debug3("comp", this);
      }
      parse(comp) {
        const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
        const m = comp.match(r);
        if (!m) {
          throw new TypeError(`Invalid comparator: ${comp}`);
        }
        this.operator = m[1] !== void 0 ? m[1] : "";
        if (this.operator === "=") {
          this.operator = "";
        }
        if (!m[2]) {
          this.semver = ANY;
        } else {
          this.semver = new SemVer(m[2], this.options.loose);
        }
      }
      toString() {
        return this.value;
      }
      test(version2) {
        debug3("Comparator.test", version2, this.options.loose);
        if (this.semver === ANY || version2 === ANY) {
          return true;
        }
        if (typeof version2 === "string") {
          try {
            version2 = new SemVer(version2, this.options);
          } catch (er) {
            return false;
          }
        }
        return cmp(version2, this.operator, this.semver, this.options);
      }
      intersects(comp, options) {
        if (!(comp instanceof _Comparator)) {
          throw new TypeError("a Comparator is required");
        }
        if (this.operator === "") {
          if (this.value === "") {
            return true;
          }
          return new Range(comp.value, options).test(this.value);
        } else if (comp.operator === "") {
          if (comp.value === "") {
            return true;
          }
          return new Range(this.value, options).test(comp.semver);
        }
        options = parseOptions(options);
        if (options.includePrerelease && (this.value === "<0.0.0-0" || comp.value === "<0.0.0-0")) {
          return false;
        }
        if (!options.includePrerelease && (this.value.startsWith("<0.0.0") || comp.value.startsWith("<0.0.0"))) {
          return false;
        }
        if (this.operator.startsWith(">") && comp.operator.startsWith(">")) {
          return true;
        }
        if (this.operator.startsWith("<") && comp.operator.startsWith("<")) {
          return true;
        }
        if (this.semver.version === comp.semver.version && this.operator.includes("=") && comp.operator.includes("=")) {
          return true;
        }
        if (cmp(this.semver, "<", comp.semver, options) && this.operator.startsWith(">") && comp.operator.startsWith("<")) {
          return true;
        }
        if (cmp(this.semver, ">", comp.semver, options) && this.operator.startsWith("<") && comp.operator.startsWith(">")) {
          return true;
        }
        return false;
      }
    };
    module.exports = Comparator;
    var parseOptions = require_parse_options();
    var { safeRe: re, t } = require_re();
    var cmp = require_cmp();
    var debug3 = require_debug();
    var SemVer = require_semver();
    var Range = require_range();
  }
});

// ../node_modules/semver/functions/satisfies.js
var require_satisfies = __commonJS({
  "../node_modules/semver/functions/satisfies.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var Range = require_range();
    var satisfies = /* @__PURE__ */ __name((version2, range, options) => {
      try {
        range = new Range(range, options);
      } catch (er) {
        return false;
      }
      return range.test(version2);
    }, "satisfies");
    module.exports = satisfies;
  }
});

// ../node_modules/semver/ranges/to-comparators.js
var require_to_comparators = __commonJS({
  "../node_modules/semver/ranges/to-comparators.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var Range = require_range();
    var toComparators = /* @__PURE__ */ __name((range, options) => new Range(range, options).set.map((comp) => comp.map((c) => c.value).join(" ").trim().split(" ")), "toComparators");
    module.exports = toComparators;
  }
});

// ../node_modules/semver/ranges/max-satisfying.js
var require_max_satisfying = __commonJS({
  "../node_modules/semver/ranges/max-satisfying.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var SemVer = require_semver();
    var Range = require_range();
    var maxSatisfying = /* @__PURE__ */ __name((versions2, range, options) => {
      let max = null;
      let maxSV = null;
      let rangeObj = null;
      try {
        rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }
      versions2.forEach((v) => {
        if (rangeObj.test(v)) {
          if (!max || maxSV.compare(v) === -1) {
            max = v;
            maxSV = new SemVer(max, options);
          }
        }
      });
      return max;
    }, "maxSatisfying");
    module.exports = maxSatisfying;
  }
});

// ../node_modules/semver/ranges/min-satisfying.js
var require_min_satisfying = __commonJS({
  "../node_modules/semver/ranges/min-satisfying.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var SemVer = require_semver();
    var Range = require_range();
    var minSatisfying = /* @__PURE__ */ __name((versions2, range, options) => {
      let min = null;
      let minSV = null;
      let rangeObj = null;
      try {
        rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }
      versions2.forEach((v) => {
        if (rangeObj.test(v)) {
          if (!min || minSV.compare(v) === 1) {
            min = v;
            minSV = new SemVer(min, options);
          }
        }
      });
      return min;
    }, "minSatisfying");
    module.exports = minSatisfying;
  }
});

// ../node_modules/semver/ranges/min-version.js
var require_min_version = __commonJS({
  "../node_modules/semver/ranges/min-version.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var SemVer = require_semver();
    var Range = require_range();
    var gt = require_gt();
    var minVersion = /* @__PURE__ */ __name((range, loose) => {
      range = new Range(range, loose);
      let minver = new SemVer("0.0.0");
      if (range.test(minver)) {
        return minver;
      }
      minver = new SemVer("0.0.0-0");
      if (range.test(minver)) {
        return minver;
      }
      minver = null;
      for (let i = 0; i < range.set.length; ++i) {
        const comparators = range.set[i];
        let setMin = null;
        comparators.forEach((comparator) => {
          const compver = new SemVer(comparator.semver.version);
          switch (comparator.operator) {
            case ">":
              if (compver.prerelease.length === 0) {
                compver.patch++;
              } else {
                compver.prerelease.push(0);
              }
              compver.raw = compver.format();
            /* fallthrough */
            case "":
            case ">=":
              if (!setMin || gt(compver, setMin)) {
                setMin = compver;
              }
              break;
            case "<":
            case "<=":
              break;
            /* istanbul ignore next */
            default:
              throw new Error(`Unexpected operation: ${comparator.operator}`);
          }
        });
        if (setMin && (!minver || gt(minver, setMin))) {
          minver = setMin;
        }
      }
      if (minver && range.test(minver)) {
        return minver;
      }
      return null;
    }, "minVersion");
    module.exports = minVersion;
  }
});

// ../node_modules/semver/ranges/valid.js
var require_valid2 = __commonJS({
  "../node_modules/semver/ranges/valid.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var Range = require_range();
    var validRange = /* @__PURE__ */ __name((range, options) => {
      try {
        return new Range(range, options).range || "*";
      } catch (er) {
        return null;
      }
    }, "validRange");
    module.exports = validRange;
  }
});

// ../node_modules/semver/ranges/outside.js
var require_outside = __commonJS({
  "../node_modules/semver/ranges/outside.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var SemVer = require_semver();
    var Comparator = require_comparator();
    var { ANY } = Comparator;
    var Range = require_range();
    var satisfies = require_satisfies();
    var gt = require_gt();
    var lt = require_lt();
    var lte = require_lte();
    var gte = require_gte();
    var outside = /* @__PURE__ */ __name((version2, range, hilo, options) => {
      version2 = new SemVer(version2, options);
      range = new Range(range, options);
      let gtfn, ltefn, ltfn, comp, ecomp;
      switch (hilo) {
        case ">":
          gtfn = gt;
          ltefn = lte;
          ltfn = lt;
          comp = ">";
          ecomp = ">=";
          break;
        case "<":
          gtfn = lt;
          ltefn = gte;
          ltfn = gt;
          comp = "<";
          ecomp = "<=";
          break;
        default:
          throw new TypeError('Must provide a hilo val of "<" or ">"');
      }
      if (satisfies(version2, range, options)) {
        return false;
      }
      for (let i = 0; i < range.set.length; ++i) {
        const comparators = range.set[i];
        let high = null;
        let low = null;
        comparators.forEach((comparator) => {
          if (comparator.semver === ANY) {
            comparator = new Comparator(">=0.0.0");
          }
          high = high || comparator;
          low = low || comparator;
          if (gtfn(comparator.semver, high.semver, options)) {
            high = comparator;
          } else if (ltfn(comparator.semver, low.semver, options)) {
            low = comparator;
          }
        });
        if (high.operator === comp || high.operator === ecomp) {
          return false;
        }
        if ((!low.operator || low.operator === comp) && ltefn(version2, low.semver)) {
          return false;
        } else if (low.operator === ecomp && ltfn(version2, low.semver)) {
          return false;
        }
      }
      return true;
    }, "outside");
    module.exports = outside;
  }
});

// ../node_modules/semver/ranges/gtr.js
var require_gtr = __commonJS({
  "../node_modules/semver/ranges/gtr.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var outside = require_outside();
    var gtr = /* @__PURE__ */ __name((version2, range, options) => outside(version2, range, ">", options), "gtr");
    module.exports = gtr;
  }
});

// ../node_modules/semver/ranges/ltr.js
var require_ltr = __commonJS({
  "../node_modules/semver/ranges/ltr.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var outside = require_outside();
    var ltr = /* @__PURE__ */ __name((version2, range, options) => outside(version2, range, "<", options), "ltr");
    module.exports = ltr;
  }
});

// ../node_modules/semver/ranges/intersects.js
var require_intersects = __commonJS({
  "../node_modules/semver/ranges/intersects.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var Range = require_range();
    var intersects = /* @__PURE__ */ __name((r1, r2, options) => {
      r1 = new Range(r1, options);
      r2 = new Range(r2, options);
      return r1.intersects(r2, options);
    }, "intersects");
    module.exports = intersects;
  }
});

// ../node_modules/semver/ranges/simplify.js
var require_simplify = __commonJS({
  "../node_modules/semver/ranges/simplify.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var satisfies = require_satisfies();
    var compare = require_compare();
    module.exports = (versions2, range, options) => {
      const set = [];
      let first = null;
      let prev = null;
      const v = versions2.sort((a, b) => compare(a, b, options));
      for (const version2 of v) {
        const included = satisfies(version2, range, options);
        if (included) {
          prev = version2;
          if (!first) {
            first = version2;
          }
        } else {
          if (prev) {
            set.push([first, prev]);
          }
          prev = null;
          first = null;
        }
      }
      if (first) {
        set.push([first, null]);
      }
      const ranges = [];
      for (const [min, max] of set) {
        if (min === max) {
          ranges.push(min);
        } else if (!max && min === v[0]) {
          ranges.push("*");
        } else if (!max) {
          ranges.push(`>=${min}`);
        } else if (min === v[0]) {
          ranges.push(`<=${max}`);
        } else {
          ranges.push(`${min} - ${max}`);
        }
      }
      const simplified = ranges.join(" || ");
      const original = typeof range.raw === "string" ? range.raw : String(range);
      return simplified.length < original.length ? simplified : range;
    };
  }
});

// ../node_modules/semver/ranges/subset.js
var require_subset = __commonJS({
  "../node_modules/semver/ranges/subset.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var Range = require_range();
    var Comparator = require_comparator();
    var { ANY } = Comparator;
    var satisfies = require_satisfies();
    var compare = require_compare();
    var subset = /* @__PURE__ */ __name((sub, dom, options = {}) => {
      if (sub === dom) {
        return true;
      }
      sub = new Range(sub, options);
      dom = new Range(dom, options);
      let sawNonNull = false;
      OUTER: for (const simpleSub of sub.set) {
        for (const simpleDom of dom.set) {
          const isSub = simpleSubset(simpleSub, simpleDom, options);
          sawNonNull = sawNonNull || isSub !== null;
          if (isSub) {
            continue OUTER;
          }
        }
        if (sawNonNull) {
          return false;
        }
      }
      return true;
    }, "subset");
    var minimumVersionWithPreRelease = [new Comparator(">=0.0.0-0")];
    var minimumVersion = [new Comparator(">=0.0.0")];
    var simpleSubset = /* @__PURE__ */ __name((sub, dom, options) => {
      if (sub === dom) {
        return true;
      }
      if (sub.length === 1 && sub[0].semver === ANY) {
        if (dom.length === 1 && dom[0].semver === ANY) {
          return true;
        } else if (options.includePrerelease) {
          sub = minimumVersionWithPreRelease;
        } else {
          sub = minimumVersion;
        }
      }
      if (dom.length === 1 && dom[0].semver === ANY) {
        if (options.includePrerelease) {
          return true;
        } else {
          dom = minimumVersion;
        }
      }
      const eqSet = /* @__PURE__ */ new Set();
      let gt, lt;
      for (const c of sub) {
        if (c.operator === ">" || c.operator === ">=") {
          gt = higherGT(gt, c, options);
        } else if (c.operator === "<" || c.operator === "<=") {
          lt = lowerLT(lt, c, options);
        } else {
          eqSet.add(c.semver);
        }
      }
      if (eqSet.size > 1) {
        return null;
      }
      let gtltComp;
      if (gt && lt) {
        gtltComp = compare(gt.semver, lt.semver, options);
        if (gtltComp > 0) {
          return null;
        } else if (gtltComp === 0 && (gt.operator !== ">=" || lt.operator !== "<=")) {
          return null;
        }
      }
      for (const eq of eqSet) {
        if (gt && !satisfies(eq, String(gt), options)) {
          return null;
        }
        if (lt && !satisfies(eq, String(lt), options)) {
          return null;
        }
        for (const c of dom) {
          if (!satisfies(eq, String(c), options)) {
            return false;
          }
        }
        return true;
      }
      let higher, lower;
      let hasDomLT, hasDomGT;
      let needDomLTPre = lt && !options.includePrerelease && lt.semver.prerelease.length ? lt.semver : false;
      let needDomGTPre = gt && !options.includePrerelease && gt.semver.prerelease.length ? gt.semver : false;
      if (needDomLTPre && needDomLTPre.prerelease.length === 1 && lt.operator === "<" && needDomLTPre.prerelease[0] === 0) {
        needDomLTPre = false;
      }
      for (const c of dom) {
        hasDomGT = hasDomGT || c.operator === ">" || c.operator === ">=";
        hasDomLT = hasDomLT || c.operator === "<" || c.operator === "<=";
        if (gt) {
          if (needDomGTPre) {
            if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomGTPre.major && c.semver.minor === needDomGTPre.minor && c.semver.patch === needDomGTPre.patch) {
              needDomGTPre = false;
            }
          }
          if (c.operator === ">" || c.operator === ">=") {
            higher = higherGT(gt, c, options);
            if (higher === c && higher !== gt) {
              return false;
            }
          } else if (gt.operator === ">=" && !c.test(gt.semver)) {
            return false;
          }
        }
        if (lt) {
          if (needDomLTPre) {
            if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomLTPre.major && c.semver.minor === needDomLTPre.minor && c.semver.patch === needDomLTPre.patch) {
              needDomLTPre = false;
            }
          }
          if (c.operator === "<" || c.operator === "<=") {
            lower = lowerLT(lt, c, options);
            if (lower === c && lower !== lt) {
              return false;
            }
          } else if (lt.operator === "<=" && !c.test(lt.semver)) {
            return false;
          }
        }
        if (!c.operator && (lt || gt) && gtltComp !== 0) {
          return false;
        }
      }
      if (gt && hasDomLT && !lt && gtltComp !== 0) {
        return false;
      }
      if (lt && hasDomGT && !gt && gtltComp !== 0) {
        return false;
      }
      if (needDomGTPre || needDomLTPre) {
        return false;
      }
      return true;
    }, "simpleSubset");
    var higherGT = /* @__PURE__ */ __name((a, b, options) => {
      if (!a) {
        return b;
      }
      const comp = compare(a.semver, b.semver, options);
      return comp > 0 ? a : comp < 0 ? b : b.operator === ">" && a.operator === ">=" ? b : a;
    }, "higherGT");
    var lowerLT = /* @__PURE__ */ __name((a, b, options) => {
      if (!a) {
        return b;
      }
      const comp = compare(a.semver, b.semver, options);
      return comp < 0 ? a : comp > 0 ? b : b.operator === "<" && a.operator === "<=" ? b : a;
    }, "lowerLT");
    module.exports = subset;
  }
});

// ../node_modules/semver/index.js
var require_semver2 = __commonJS({
  "../node_modules/semver/index.js"(exports, module) {
    "use strict";
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var internalRe = require_re();
    var constants = require_constants();
    var SemVer = require_semver();
    var identifiers = require_identifiers();
    var parse2 = require_parse();
    var valid = require_valid();
    var clean = require_clean();
    var inc = require_inc();
    var diff = require_diff();
    var major = require_major();
    var minor = require_minor();
    var patch = require_patch();
    var prerelease = require_prerelease();
    var compare = require_compare();
    var rcompare = require_rcompare();
    var compareLoose = require_compare_loose();
    var compareBuild = require_compare_build();
    var sort = require_sort();
    var rsort = require_rsort();
    var gt = require_gt();
    var lt = require_lt();
    var eq = require_eq();
    var neq = require_neq();
    var gte = require_gte();
    var lte = require_lte();
    var cmp = require_cmp();
    var coerce = require_coerce();
    var truncate = require_truncate();
    var Comparator = require_comparator();
    var Range = require_range();
    var satisfies = require_satisfies();
    var toComparators = require_to_comparators();
    var maxSatisfying = require_max_satisfying();
    var minSatisfying = require_min_satisfying();
    var minVersion = require_min_version();
    var validRange = require_valid2();
    var outside = require_outside();
    var gtr = require_gtr();
    var ltr = require_ltr();
    var intersects = require_intersects();
    var simplifyRange = require_simplify();
    var subset = require_subset();
    module.exports = {
      parse: parse2,
      valid,
      clean,
      inc,
      diff,
      major,
      minor,
      patch,
      prerelease,
      compare,
      rcompare,
      compareLoose,
      compareBuild,
      sort,
      rsort,
      gt,
      lt,
      eq,
      neq,
      gte,
      lte,
      cmp,
      coerce,
      truncate,
      Comparator,
      Range,
      satisfies,
      toComparators,
      maxSatisfying,
      minSatisfying,
      minVersion,
      validRange,
      outside,
      gtr,
      ltr,
      intersects,
      simplifyRange,
      subset,
      SemVer,
      re: internalRe.re,
      src: internalRe.src,
      tokens: internalRe.t,
      SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
      RELEASE_TYPES: constants.RELEASE_TYPES,
      compareIdentifiers: identifiers.compareIdentifiers,
      rcompareIdentifiers: identifiers.rcompareIdentifiers
    };
  }
});

// ../node_modules/jsonwebtoken/lib/asymmetricKeyDetailsSupported.js
var require_asymmetricKeyDetailsSupported = __commonJS({
  "../node_modules/jsonwebtoken/lib/asymmetricKeyDetailsSupported.js"(exports, module) {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var semver = require_semver2();
    module.exports = semver.satisfies(process.version, ">=15.7.0");
  }
});

// ../node_modules/jsonwebtoken/lib/rsaPssKeyDetailsSupported.js
var require_rsaPssKeyDetailsSupported = __commonJS({
  "../node_modules/jsonwebtoken/lib/rsaPssKeyDetailsSupported.js"(exports, module) {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var semver = require_semver2();
    module.exports = semver.satisfies(process.version, ">=16.9.0");
  }
});

// ../node_modules/jsonwebtoken/lib/validateAsymmetricKey.js
var require_validateAsymmetricKey = __commonJS({
  "../node_modules/jsonwebtoken/lib/validateAsymmetricKey.js"(exports, module) {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var ASYMMETRIC_KEY_DETAILS_SUPPORTED = require_asymmetricKeyDetailsSupported();
    var RSA_PSS_KEY_DETAILS_SUPPORTED = require_rsaPssKeyDetailsSupported();
    var allowedAlgorithmsForKeys = {
      "ec": ["ES256", "ES384", "ES512"],
      "rsa": ["RS256", "PS256", "RS384", "PS384", "RS512", "PS512"],
      "rsa-pss": ["PS256", "PS384", "PS512"]
    };
    var allowedCurves = {
      ES256: "prime256v1",
      ES384: "secp384r1",
      ES512: "secp521r1"
    };
    module.exports = function(algorithm, key) {
      if (!algorithm || !key) return;
      const keyType = key.asymmetricKeyType;
      if (!keyType) return;
      const allowedAlgorithms = allowedAlgorithmsForKeys[keyType];
      if (!allowedAlgorithms) {
        throw new Error(`Unknown key type "${keyType}".`);
      }
      if (!allowedAlgorithms.includes(algorithm)) {
        throw new Error(`"alg" parameter for "${keyType}" key type must be one of: ${allowedAlgorithms.join(", ")}.`);
      }
      if (ASYMMETRIC_KEY_DETAILS_SUPPORTED) {
        switch (keyType) {
          case "ec":
            const keyCurve = key.asymmetricKeyDetails.namedCurve;
            const allowedCurve = allowedCurves[algorithm];
            if (keyCurve !== allowedCurve) {
              throw new Error(`"alg" parameter "${algorithm}" requires curve "${allowedCurve}".`);
            }
            break;
          case "rsa-pss":
            if (RSA_PSS_KEY_DETAILS_SUPPORTED) {
              const length = parseInt(algorithm.slice(-3), 10);
              const { hashAlgorithm, mgf1HashAlgorithm, saltLength } = key.asymmetricKeyDetails;
              if (hashAlgorithm !== `sha${length}` || mgf1HashAlgorithm !== hashAlgorithm) {
                throw new Error(`Invalid key for this operation, its RSA-PSS parameters do not meet the requirements of "alg" ${algorithm}.`);
              }
              if (saltLength !== void 0 && saltLength > length >> 3) {
                throw new Error(`Invalid key for this operation, its RSA-PSS parameter saltLength does not meet the requirements of "alg" ${algorithm}.`);
              }
            }
            break;
        }
      }
    };
  }
});

// ../node_modules/jsonwebtoken/lib/psSupported.js
var require_psSupported = __commonJS({
  "../node_modules/jsonwebtoken/lib/psSupported.js"(exports, module) {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var semver = require_semver2();
    module.exports = semver.satisfies(process.version, "^6.12.0 || >=8.0.0");
  }
});

// ../node_modules/jsonwebtoken/verify.js
var require_verify = __commonJS({
  "../node_modules/jsonwebtoken/verify.js"(exports, module) {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var JsonWebTokenError = require_JsonWebTokenError();
    var NotBeforeError = require_NotBeforeError();
    var TokenExpiredError = require_TokenExpiredError();
    var decode = require_decode();
    var timespan = require_timespan();
    var validateAsymmetricKey = require_validateAsymmetricKey();
    var PS_SUPPORTED = require_psSupported();
    var jws = require_jws();
    var { KeyObject, createSecretKey, createPublicKey } = require_crypto();
    var PUB_KEY_ALGS = ["RS256", "RS384", "RS512"];
    var EC_KEY_ALGS = ["ES256", "ES384", "ES512"];
    var RSA_KEY_ALGS = ["RS256", "RS384", "RS512"];
    var HS_ALGS = ["HS256", "HS384", "HS512"];
    if (PS_SUPPORTED) {
      PUB_KEY_ALGS.splice(PUB_KEY_ALGS.length, 0, "PS256", "PS384", "PS512");
      RSA_KEY_ALGS.splice(RSA_KEY_ALGS.length, 0, "PS256", "PS384", "PS512");
    }
    module.exports = function(jwtString, secretOrPublicKey, options, callback) {
      if (typeof options === "function" && !callback) {
        callback = options;
        options = {};
      }
      if (!options) {
        options = {};
      }
      options = Object.assign({}, options);
      let done;
      if (callback) {
        done = callback;
      } else {
        done = /* @__PURE__ */ __name(function(err, data) {
          if (err) throw err;
          return data;
        }, "done");
      }
      if (options.clockTimestamp && typeof options.clockTimestamp !== "number") {
        return done(new JsonWebTokenError("clockTimestamp must be a number"));
      }
      if (options.nonce !== void 0 && (typeof options.nonce !== "string" || options.nonce.trim() === "")) {
        return done(new JsonWebTokenError("nonce must be a non-empty string"));
      }
      if (options.allowInvalidAsymmetricKeyTypes !== void 0 && typeof options.allowInvalidAsymmetricKeyTypes !== "boolean") {
        return done(new JsonWebTokenError("allowInvalidAsymmetricKeyTypes must be a boolean"));
      }
      const clockTimestamp = options.clockTimestamp || Math.floor(Date.now() / 1e3);
      if (!jwtString) {
        return done(new JsonWebTokenError("jwt must be provided"));
      }
      if (typeof jwtString !== "string") {
        return done(new JsonWebTokenError("jwt must be a string"));
      }
      const parts = jwtString.split(".");
      if (parts.length !== 3) {
        return done(new JsonWebTokenError("jwt malformed"));
      }
      let decodedToken;
      try {
        decodedToken = decode(jwtString, { complete: true });
      } catch (err) {
        return done(err);
      }
      if (!decodedToken) {
        return done(new JsonWebTokenError("invalid token"));
      }
      const header = decodedToken.header;
      let getSecret;
      if (typeof secretOrPublicKey === "function") {
        if (!callback) {
          return done(new JsonWebTokenError("verify must be called asynchronous if secret or public key is provided as a callback"));
        }
        getSecret = secretOrPublicKey;
      } else {
        getSecret = /* @__PURE__ */ __name(function(header2, secretCallback) {
          return secretCallback(null, secretOrPublicKey);
        }, "getSecret");
      }
      return getSecret(header, function(err, secretOrPublicKey2) {
        if (err) {
          return done(new JsonWebTokenError("error in secret or public key callback: " + err.message));
        }
        const hasSignature = parts[2].trim() !== "";
        if (!hasSignature && secretOrPublicKey2) {
          return done(new JsonWebTokenError("jwt signature is required"));
        }
        if (hasSignature && !secretOrPublicKey2) {
          return done(new JsonWebTokenError("secret or public key must be provided"));
        }
        if (!hasSignature && !options.algorithms) {
          return done(new JsonWebTokenError('please specify "none" in "algorithms" to verify unsigned tokens'));
        }
        if (secretOrPublicKey2 != null && !(secretOrPublicKey2 instanceof KeyObject)) {
          try {
            secretOrPublicKey2 = createPublicKey(secretOrPublicKey2);
          } catch (_) {
            try {
              secretOrPublicKey2 = createSecretKey(typeof secretOrPublicKey2 === "string" ? Buffer.from(secretOrPublicKey2) : secretOrPublicKey2);
            } catch (_2) {
              return done(new JsonWebTokenError("secretOrPublicKey is not valid key material"));
            }
          }
        }
        if (!options.algorithms) {
          if (secretOrPublicKey2.type === "secret") {
            options.algorithms = HS_ALGS;
          } else if (["rsa", "rsa-pss"].includes(secretOrPublicKey2.asymmetricKeyType)) {
            options.algorithms = RSA_KEY_ALGS;
          } else if (secretOrPublicKey2.asymmetricKeyType === "ec") {
            options.algorithms = EC_KEY_ALGS;
          } else {
            options.algorithms = PUB_KEY_ALGS;
          }
        }
        if (options.algorithms.indexOf(decodedToken.header.alg) === -1) {
          return done(new JsonWebTokenError("invalid algorithm"));
        }
        if (header.alg.startsWith("HS") && secretOrPublicKey2.type !== "secret") {
          return done(new JsonWebTokenError(`secretOrPublicKey must be a symmetric key when using ${header.alg}`));
        } else if (/^(?:RS|PS|ES)/.test(header.alg) && secretOrPublicKey2.type !== "public") {
          return done(new JsonWebTokenError(`secretOrPublicKey must be an asymmetric key when using ${header.alg}`));
        }
        if (!options.allowInvalidAsymmetricKeyTypes) {
          try {
            validateAsymmetricKey(header.alg, secretOrPublicKey2);
          } catch (e) {
            return done(e);
          }
        }
        let valid;
        try {
          valid = jws.verify(jwtString, decodedToken.header.alg, secretOrPublicKey2);
        } catch (e) {
          return done(e);
        }
        if (!valid) {
          return done(new JsonWebTokenError("invalid signature"));
        }
        const payload = decodedToken.payload;
        if (typeof payload.nbf !== "undefined" && !options.ignoreNotBefore) {
          if (typeof payload.nbf !== "number") {
            return done(new JsonWebTokenError("invalid nbf value"));
          }
          if (payload.nbf > clockTimestamp + (options.clockTolerance || 0)) {
            return done(new NotBeforeError("jwt not active", new Date(payload.nbf * 1e3)));
          }
        }
        if (typeof payload.exp !== "undefined" && !options.ignoreExpiration) {
          if (typeof payload.exp !== "number") {
            return done(new JsonWebTokenError("invalid exp value"));
          }
          if (clockTimestamp >= payload.exp + (options.clockTolerance || 0)) {
            return done(new TokenExpiredError("jwt expired", new Date(payload.exp * 1e3)));
          }
        }
        if (options.audience) {
          const audiences = Array.isArray(options.audience) ? options.audience : [options.audience];
          const target = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
          const match2 = target.some(function(targetAudience) {
            return audiences.some(function(audience) {
              return audience instanceof RegExp ? audience.test(targetAudience) : audience === targetAudience;
            });
          });
          if (!match2) {
            return done(new JsonWebTokenError("jwt audience invalid. expected: " + audiences.join(" or ")));
          }
        }
        if (options.issuer) {
          const invalid_issuer = typeof options.issuer === "string" && payload.iss !== options.issuer || Array.isArray(options.issuer) && options.issuer.indexOf(payload.iss) === -1;
          if (invalid_issuer) {
            return done(new JsonWebTokenError("jwt issuer invalid. expected: " + options.issuer));
          }
        }
        if (options.subject) {
          if (payload.sub !== options.subject) {
            return done(new JsonWebTokenError("jwt subject invalid. expected: " + options.subject));
          }
        }
        if (options.jwtid) {
          if (payload.jti !== options.jwtid) {
            return done(new JsonWebTokenError("jwt jwtid invalid. expected: " + options.jwtid));
          }
        }
        if (options.nonce) {
          if (payload.nonce !== options.nonce) {
            return done(new JsonWebTokenError("jwt nonce invalid. expected: " + options.nonce));
          }
        }
        if (options.maxAge) {
          if (typeof payload.iat !== "number") {
            return done(new JsonWebTokenError("iat required when maxAge is specified"));
          }
          const maxAgeTimestamp = timespan(options.maxAge, payload.iat);
          if (typeof maxAgeTimestamp === "undefined") {
            return done(new JsonWebTokenError('"maxAge" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
          }
          if (clockTimestamp >= maxAgeTimestamp + (options.clockTolerance || 0)) {
            return done(new TokenExpiredError("maxAge exceeded", new Date(maxAgeTimestamp * 1e3)));
          }
        }
        if (options.complete === true) {
          const signature = decodedToken.signature;
          return done(null, {
            header,
            payload,
            signature
          });
        }
        return done(null, payload);
      });
    };
  }
});

// ../node_modules/lodash.includes/index.js
var require_lodash = __commonJS({
  "../node_modules/lodash.includes/index.js"(exports, module) {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var INFINITY = 1 / 0;
    var MAX_SAFE_INTEGER = 9007199254740991;
    var MAX_INTEGER = 17976931348623157e292;
    var NAN = 0 / 0;
    var argsTag = "[object Arguments]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var stringTag = "[object String]";
    var symbolTag = "[object Symbol]";
    var reTrim = /^\s+|\s+$/g;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    var freeParseInt = parseInt;
    function arrayMap(array, iteratee) {
      var index = -1, length = array ? array.length : 0, result = Array(length);
      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }
    __name(arrayMap, "arrayMap");
    function baseFindIndex(array, predicate, fromIndex, fromRight) {
      var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
      while (fromRight ? index-- : ++index < length) {
        if (predicate(array[index], index, array)) {
          return index;
        }
      }
      return -1;
    }
    __name(baseFindIndex, "baseFindIndex");
    function baseIndexOf(array, value, fromIndex) {
      if (value !== value) {
        return baseFindIndex(array, baseIsNaN, fromIndex);
      }
      var index = fromIndex - 1, length = array.length;
      while (++index < length) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }
    __name(baseIndexOf, "baseIndexOf");
    function baseIsNaN(value) {
      return value !== value;
    }
    __name(baseIsNaN, "baseIsNaN");
    function baseTimes(n, iteratee) {
      var index = -1, result = Array(n);
      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }
    __name(baseTimes, "baseTimes");
    function baseValues(object, props) {
      return arrayMap(props, function(key) {
        return object[key];
      });
    }
    __name(baseValues, "baseValues");
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    __name(overArg, "overArg");
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var objectToString = objectProto.toString;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var nativeKeys = overArg(Object.keys, Object);
    var nativeMax = Math.max;
    function arrayLikeKeys(value, inherited) {
      var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];
      var length = result.length, skipIndexes = !!length;
      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isIndex(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }
    __name(arrayLikeKeys, "arrayLikeKeys");
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != "constructor") {
          result.push(key);
        }
      }
      return result;
    }
    __name(baseKeys, "baseKeys");
    function isIndex(value, length) {
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (typeof value == "number" || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    __name(isIndex, "isIndex");
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto;
    }
    __name(isPrototype, "isPrototype");
    function includes(collection, value, fromIndex, guard) {
      collection = isArrayLike(collection) ? collection : values(collection);
      fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
      var length = collection.length;
      if (fromIndex < 0) {
        fromIndex = nativeMax(length + fromIndex, 0);
      }
      return isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
    }
    __name(includes, "includes");
    function isArguments(value) {
      return isArrayLikeObject(value) && hasOwnProperty.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString.call(value) == argsTag);
    }
    __name(isArguments, "isArguments");
    var isArray = Array.isArray;
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    __name(isArrayLike, "isArrayLike");
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }
    __name(isArrayLikeObject, "isArrayLikeObject");
    function isFunction(value) {
      var tag = isObject(value) ? objectToString.call(value) : "";
      return tag == funcTag || tag == genTag;
    }
    __name(isFunction, "isFunction");
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    __name(isLength, "isLength");
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    __name(isObject, "isObject");
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    __name(isObjectLike, "isObjectLike");
    function isString(value) {
      return typeof value == "string" || !isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag;
    }
    __name(isString, "isString");
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    __name(isSymbol, "isSymbol");
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY || value === -INFINITY) {
        var sign = value < 0 ? -1 : 1;
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }
    __name(toFinite, "toFinite");
    function toInteger(value) {
      var result = toFinite(value), remainder = result % 1;
      return result === result ? remainder ? result - remainder : result : 0;
    }
    __name(toInteger, "toInteger");
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, "");
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    __name(toNumber, "toNumber");
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    __name(keys, "keys");
    function values(object) {
      return object ? baseValues(object, keys(object)) : [];
    }
    __name(values, "values");
    module.exports = includes;
  }
});

// ../node_modules/lodash.isboolean/index.js
var require_lodash2 = __commonJS({
  "../node_modules/lodash.isboolean/index.js"(exports, module) {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var boolTag = "[object Boolean]";
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    function isBoolean(value) {
      return value === true || value === false || isObjectLike(value) && objectToString.call(value) == boolTag;
    }
    __name(isBoolean, "isBoolean");
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    __name(isObjectLike, "isObjectLike");
    module.exports = isBoolean;
  }
});

// ../node_modules/lodash.isinteger/index.js
var require_lodash3 = __commonJS({
  "../node_modules/lodash.isinteger/index.js"(exports, module) {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var INFINITY = 1 / 0;
    var MAX_INTEGER = 17976931348623157e292;
    var NAN = 0 / 0;
    var symbolTag = "[object Symbol]";
    var reTrim = /^\s+|\s+$/g;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    function isInteger(value) {
      return typeof value == "number" && value == toInteger(value);
    }
    __name(isInteger, "isInteger");
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    __name(isObject, "isObject");
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    __name(isObjectLike, "isObjectLike");
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    __name(isSymbol, "isSymbol");
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY || value === -INFINITY) {
        var sign = value < 0 ? -1 : 1;
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }
    __name(toFinite, "toFinite");
    function toInteger(value) {
      var result = toFinite(value), remainder = result % 1;
      return result === result ? remainder ? result - remainder : result : 0;
    }
    __name(toInteger, "toInteger");
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, "");
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    __name(toNumber, "toNumber");
    module.exports = isInteger;
  }
});

// ../node_modules/lodash.isnumber/index.js
var require_lodash4 = __commonJS({
  "../node_modules/lodash.isnumber/index.js"(exports, module) {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var numberTag = "[object Number]";
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    __name(isObjectLike, "isObjectLike");
    function isNumber(value) {
      return typeof value == "number" || isObjectLike(value) && objectToString.call(value) == numberTag;
    }
    __name(isNumber, "isNumber");
    module.exports = isNumber;
  }
});

// ../node_modules/lodash.isplainobject/index.js
var require_lodash5 = __commonJS({
  "../node_modules/lodash.isplainobject/index.js"(exports, module) {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var objectTag = "[object Object]";
    function isHostObject(value) {
      var result = false;
      if (value != null && typeof value.toString != "function") {
        try {
          result = !!(value + "");
        } catch (e) {
        }
      }
      return result;
    }
    __name(isHostObject, "isHostObject");
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    __name(overArg, "overArg");
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var objectCtorString = funcToString.call(Object);
    var objectToString = objectProto.toString;
    var getPrototype = overArg(Object.getPrototypeOf, Object);
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    __name(isObjectLike, "isObjectLike");
    function isPlainObject(value) {
      if (!isObjectLike(value) || objectToString.call(value) != objectTag || isHostObject(value)) {
        return false;
      }
      var proto = getPrototype(value);
      if (proto === null) {
        return true;
      }
      var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
      return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
    }
    __name(isPlainObject, "isPlainObject");
    module.exports = isPlainObject;
  }
});

// ../node_modules/lodash.isstring/index.js
var require_lodash6 = __commonJS({
  "../node_modules/lodash.isstring/index.js"(exports, module) {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var stringTag = "[object String]";
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    var isArray = Array.isArray;
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    __name(isObjectLike, "isObjectLike");
    function isString(value) {
      return typeof value == "string" || !isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag;
    }
    __name(isString, "isString");
    module.exports = isString;
  }
});

// ../node_modules/lodash.once/index.js
var require_lodash7 = __commonJS({
  "../node_modules/lodash.once/index.js"(exports, module) {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var FUNC_ERROR_TEXT = "Expected a function";
    var INFINITY = 1 / 0;
    var MAX_INTEGER = 17976931348623157e292;
    var NAN = 0 / 0;
    var symbolTag = "[object Symbol]";
    var reTrim = /^\s+|\s+$/g;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    function before(n, func) {
      var result;
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      n = toInteger(n);
      return function() {
        if (--n > 0) {
          result = func.apply(this, arguments);
        }
        if (n <= 1) {
          func = void 0;
        }
        return result;
      };
    }
    __name(before, "before");
    function once2(func) {
      return before(2, func);
    }
    __name(once2, "once");
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    __name(isObject, "isObject");
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    __name(isObjectLike, "isObjectLike");
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    __name(isSymbol, "isSymbol");
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY || value === -INFINITY) {
        var sign = value < 0 ? -1 : 1;
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }
    __name(toFinite, "toFinite");
    function toInteger(value) {
      var result = toFinite(value), remainder = result % 1;
      return result === result ? remainder ? result - remainder : result : 0;
    }
    __name(toInteger, "toInteger");
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, "");
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    __name(toNumber, "toNumber");
    module.exports = once2;
  }
});

// ../node_modules/jsonwebtoken/sign.js
var require_sign = __commonJS({
  "../node_modules/jsonwebtoken/sign.js"(exports, module) {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var timespan = require_timespan();
    var PS_SUPPORTED = require_psSupported();
    var validateAsymmetricKey = require_validateAsymmetricKey();
    var jws = require_jws();
    var includes = require_lodash();
    var isBoolean = require_lodash2();
    var isInteger = require_lodash3();
    var isNumber = require_lodash4();
    var isPlainObject = require_lodash5();
    var isString = require_lodash6();
    var once2 = require_lodash7();
    var { KeyObject, createSecretKey, createPrivateKey } = require_crypto();
    var SUPPORTED_ALGS = ["RS256", "RS384", "RS512", "ES256", "ES384", "ES512", "HS256", "HS384", "HS512", "none"];
    if (PS_SUPPORTED) {
      SUPPORTED_ALGS.splice(3, 0, "PS256", "PS384", "PS512");
    }
    var sign_options_schema = {
      expiresIn: { isValid: /* @__PURE__ */ __name(function(value) {
        return isInteger(value) || isString(value) && value;
      }, "isValid"), message: '"expiresIn" should be a number of seconds or string representing a timespan' },
      notBefore: { isValid: /* @__PURE__ */ __name(function(value) {
        return isInteger(value) || isString(value) && value;
      }, "isValid"), message: '"notBefore" should be a number of seconds or string representing a timespan' },
      audience: { isValid: /* @__PURE__ */ __name(function(value) {
        return isString(value) || Array.isArray(value);
      }, "isValid"), message: '"audience" must be a string or array' },
      algorithm: { isValid: includes.bind(null, SUPPORTED_ALGS), message: '"algorithm" must be a valid string enum value' },
      header: { isValid: isPlainObject, message: '"header" must be an object' },
      encoding: { isValid: isString, message: '"encoding" must be a string' },
      issuer: { isValid: isString, message: '"issuer" must be a string' },
      subject: { isValid: isString, message: '"subject" must be a string' },
      jwtid: { isValid: isString, message: '"jwtid" must be a string' },
      noTimestamp: { isValid: isBoolean, message: '"noTimestamp" must be a boolean' },
      keyid: { isValid: isString, message: '"keyid" must be a string' },
      mutatePayload: { isValid: isBoolean, message: '"mutatePayload" must be a boolean' },
      allowInsecureKeySizes: { isValid: isBoolean, message: '"allowInsecureKeySizes" must be a boolean' },
      allowInvalidAsymmetricKeyTypes: { isValid: isBoolean, message: '"allowInvalidAsymmetricKeyTypes" must be a boolean' }
    };
    var registered_claims_schema = {
      iat: { isValid: isNumber, message: '"iat" should be a number of seconds' },
      exp: { isValid: isNumber, message: '"exp" should be a number of seconds' },
      nbf: { isValid: isNumber, message: '"nbf" should be a number of seconds' }
    };
    function validate(schema, allowUnknown, object, parameterName) {
      if (!isPlainObject(object)) {
        throw new Error('Expected "' + parameterName + '" to be a plain object.');
      }
      Object.keys(object).forEach(function(key) {
        const validator = schema[key];
        if (!validator) {
          if (!allowUnknown) {
            throw new Error('"' + key + '" is not allowed in "' + parameterName + '"');
          }
          return;
        }
        if (!validator.isValid(object[key])) {
          throw new Error(validator.message);
        }
      });
    }
    __name(validate, "validate");
    function validateOptions(options) {
      return validate(sign_options_schema, false, options, "options");
    }
    __name(validateOptions, "validateOptions");
    function validatePayload(payload) {
      return validate(registered_claims_schema, true, payload, "payload");
    }
    __name(validatePayload, "validatePayload");
    var options_to_payload = {
      "audience": "aud",
      "issuer": "iss",
      "subject": "sub",
      "jwtid": "jti"
    };
    var options_for_objects = [
      "expiresIn",
      "notBefore",
      "noTimestamp",
      "audience",
      "issuer",
      "subject",
      "jwtid"
    ];
    module.exports = function(payload, secretOrPrivateKey, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = {};
      } else {
        options = options || {};
      }
      const isObjectPayload = typeof payload === "object" && !Buffer.isBuffer(payload);
      const header = Object.assign({
        alg: options.algorithm || "HS256",
        typ: isObjectPayload ? "JWT" : void 0,
        kid: options.keyid
      }, options.header);
      function failure(err) {
        if (callback) {
          return callback(err);
        }
        throw err;
      }
      __name(failure, "failure");
      if (!secretOrPrivateKey && options.algorithm !== "none") {
        return failure(new Error("secretOrPrivateKey must have a value"));
      }
      if (secretOrPrivateKey != null && !(secretOrPrivateKey instanceof KeyObject)) {
        try {
          secretOrPrivateKey = createPrivateKey(secretOrPrivateKey);
        } catch (_) {
          try {
            secretOrPrivateKey = createSecretKey(typeof secretOrPrivateKey === "string" ? Buffer.from(secretOrPrivateKey) : secretOrPrivateKey);
          } catch (_2) {
            return failure(new Error("secretOrPrivateKey is not valid key material"));
          }
        }
      }
      if (header.alg.startsWith("HS") && secretOrPrivateKey.type !== "secret") {
        return failure(new Error(`secretOrPrivateKey must be a symmetric key when using ${header.alg}`));
      } else if (/^(?:RS|PS|ES)/.test(header.alg)) {
        if (secretOrPrivateKey.type !== "private") {
          return failure(new Error(`secretOrPrivateKey must be an asymmetric key when using ${header.alg}`));
        }
        if (!options.allowInsecureKeySizes && !header.alg.startsWith("ES") && secretOrPrivateKey.asymmetricKeyDetails !== void 0 && //KeyObject.asymmetricKeyDetails is supported in Node 15+
        secretOrPrivateKey.asymmetricKeyDetails.modulusLength < 2048) {
          return failure(new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${header.alg}`));
        }
      }
      if (typeof payload === "undefined") {
        return failure(new Error("payload is required"));
      } else if (isObjectPayload) {
        try {
          validatePayload(payload);
        } catch (error3) {
          return failure(error3);
        }
        if (!options.mutatePayload) {
          payload = Object.assign({}, payload);
        }
      } else {
        const invalid_options = options_for_objects.filter(function(opt) {
          return typeof options[opt] !== "undefined";
        });
        if (invalid_options.length > 0) {
          return failure(new Error("invalid " + invalid_options.join(",") + " option for " + typeof payload + " payload"));
        }
      }
      if (typeof payload.exp !== "undefined" && typeof options.expiresIn !== "undefined") {
        return failure(new Error('Bad "options.expiresIn" option the payload already has an "exp" property.'));
      }
      if (typeof payload.nbf !== "undefined" && typeof options.notBefore !== "undefined") {
        return failure(new Error('Bad "options.notBefore" option the payload already has an "nbf" property.'));
      }
      try {
        validateOptions(options);
      } catch (error3) {
        return failure(error3);
      }
      if (!options.allowInvalidAsymmetricKeyTypes) {
        try {
          validateAsymmetricKey(header.alg, secretOrPrivateKey);
        } catch (error3) {
          return failure(error3);
        }
      }
      const timestamp = payload.iat || Math.floor(Date.now() / 1e3);
      if (options.noTimestamp) {
        delete payload.iat;
      } else if (isObjectPayload) {
        payload.iat = timestamp;
      }
      if (typeof options.notBefore !== "undefined") {
        try {
          payload.nbf = timespan(options.notBefore, timestamp);
        } catch (err) {
          return failure(err);
        }
        if (typeof payload.nbf === "undefined") {
          return failure(new Error('"notBefore" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
        }
      }
      if (typeof options.expiresIn !== "undefined" && typeof payload === "object") {
        try {
          payload.exp = timespan(options.expiresIn, timestamp);
        } catch (err) {
          return failure(err);
        }
        if (typeof payload.exp === "undefined") {
          return failure(new Error('"expiresIn" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
        }
      }
      Object.keys(options_to_payload).forEach(function(key) {
        const claim = options_to_payload[key];
        if (typeof options[key] !== "undefined") {
          if (typeof payload[claim] !== "undefined") {
            return failure(new Error('Bad "options.' + key + '" option. The payload already has an "' + claim + '" property.'));
          }
          payload[claim] = options[key];
        }
      });
      const encoding = options.encoding || "utf8";
      if (typeof callback === "function") {
        callback = callback && once2(callback);
        jws.createSign({
          header,
          privateKey: secretOrPrivateKey,
          payload,
          encoding
        }).once("error", callback).once("done", function(signature) {
          if (!options.allowInsecureKeySizes && /^(?:RS|PS)/.test(header.alg) && signature.length < 256) {
            return callback(new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${header.alg}`));
          }
          callback(null, signature);
        });
      } else {
        let signature = jws.sign({ header, payload, secret: secretOrPrivateKey, encoding });
        if (!options.allowInsecureKeySizes && /^(?:RS|PS)/.test(header.alg) && signature.length < 256) {
          throw new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${header.alg}`);
        }
        return signature;
      }
    };
  }
});

// ../node_modules/jsonwebtoken/index.js
var require_jsonwebtoken = __commonJS({
  "../node_modules/jsonwebtoken/index.js"(exports, module) {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = {
      decode: require_decode(),
      verify: require_verify(),
      sign: require_sign(),
      JsonWebTokenError: require_JsonWebTokenError(),
      NotBeforeError: require_NotBeforeError(),
      TokenExpiredError: require_TokenExpiredError()
    };
  }
});

// ../node_modules/bcryptjs/dist/bcrypt.js
var require_bcrypt = __commonJS({
  "../node_modules/bcryptjs/dist/bcrypt.js"(exports, module) {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    (function(global, factory) {
      if (typeof define === "function" && define["amd"])
        define([], factory);
      else if (typeof __require === "function" && typeof module === "object" && module && module["exports"])
        module["exports"] = factory();
      else
        (global["dcodeIO"] = global["dcodeIO"] || {})["bcrypt"] = factory();
    })(exports, function() {
      "use strict";
      var bcrypt2 = {};
      var randomFallback = null;
      function random(len) {
        if (typeof module !== "undefined" && module && module["exports"])
          try {
            return require_crypto()["randomBytes"](len);
          } catch (e) {
          }
        try {
          var a;
          (self["crypto"] || self["msCrypto"])["getRandomValues"](a = new Uint32Array(len));
          return Array.prototype.slice.call(a);
        } catch (e) {
        }
        if (!randomFallback)
          throw Error("Neither WebCryptoAPI nor a crypto module is available. Use bcrypt.setRandomFallback to set an alternative");
        return randomFallback(len);
      }
      __name(random, "random");
      var randomAvailable = false;
      try {
        random(1);
        randomAvailable = true;
      } catch (e) {
      }
      randomFallback = null;
      bcrypt2.setRandomFallback = function(random2) {
        randomFallback = random2;
      };
      bcrypt2.genSaltSync = function(rounds, seed_length) {
        rounds = rounds || GENSALT_DEFAULT_LOG2_ROUNDS;
        if (typeof rounds !== "number")
          throw Error("Illegal arguments: " + typeof rounds + ", " + typeof seed_length);
        if (rounds < 4)
          rounds = 4;
        else if (rounds > 31)
          rounds = 31;
        var salt = [];
        salt.push("$2a$");
        if (rounds < 10)
          salt.push("0");
        salt.push(rounds.toString());
        salt.push("$");
        salt.push(base64_encode(random(BCRYPT_SALT_LEN), BCRYPT_SALT_LEN));
        return salt.join("");
      };
      bcrypt2.genSalt = function(rounds, seed_length, callback) {
        if (typeof seed_length === "function")
          callback = seed_length, seed_length = void 0;
        if (typeof rounds === "function")
          callback = rounds, rounds = void 0;
        if (typeof rounds === "undefined")
          rounds = GENSALT_DEFAULT_LOG2_ROUNDS;
        else if (typeof rounds !== "number")
          throw Error("illegal arguments: " + typeof rounds);
        function _async(callback2) {
          nextTick2(function() {
            try {
              callback2(null, bcrypt2.genSaltSync(rounds));
            } catch (err) {
              callback2(err);
            }
          });
        }
        __name(_async, "_async");
        if (callback) {
          if (typeof callback !== "function")
            throw Error("Illegal callback: " + typeof callback);
          _async(callback);
        } else
          return new Promise(function(resolve, reject) {
            _async(function(err, res) {
              if (err) {
                reject(err);
                return;
              }
              resolve(res);
            });
          });
      };
      bcrypt2.hashSync = function(s, salt) {
        if (typeof salt === "undefined")
          salt = GENSALT_DEFAULT_LOG2_ROUNDS;
        if (typeof salt === "number")
          salt = bcrypt2.genSaltSync(salt);
        if (typeof s !== "string" || typeof salt !== "string")
          throw Error("Illegal arguments: " + typeof s + ", " + typeof salt);
        return _hash(s, salt);
      };
      bcrypt2.hash = function(s, salt, callback, progressCallback) {
        function _async(callback2) {
          if (typeof s === "string" && typeof salt === "number")
            bcrypt2.genSalt(salt, function(err, salt2) {
              _hash(s, salt2, callback2, progressCallback);
            });
          else if (typeof s === "string" && typeof salt === "string")
            _hash(s, salt, callback2, progressCallback);
          else
            nextTick2(callback2.bind(this, Error("Illegal arguments: " + typeof s + ", " + typeof salt)));
        }
        __name(_async, "_async");
        if (callback) {
          if (typeof callback !== "function")
            throw Error("Illegal callback: " + typeof callback);
          _async(callback);
        } else
          return new Promise(function(resolve, reject) {
            _async(function(err, res) {
              if (err) {
                reject(err);
                return;
              }
              resolve(res);
            });
          });
      };
      function safeStringCompare(known, unknown) {
        var right = 0, wrong = 0;
        for (var i = 0, k = known.length; i < k; ++i) {
          if (known.charCodeAt(i) === unknown.charCodeAt(i))
            ++right;
          else
            ++wrong;
        }
        if (right < 0)
          return false;
        return wrong === 0;
      }
      __name(safeStringCompare, "safeStringCompare");
      bcrypt2.compareSync = function(s, hash) {
        if (typeof s !== "string" || typeof hash !== "string")
          throw Error("Illegal arguments: " + typeof s + ", " + typeof hash);
        if (hash.length !== 60)
          return false;
        return safeStringCompare(bcrypt2.hashSync(s, hash.substr(0, hash.length - 31)), hash);
      };
      bcrypt2.compare = function(s, hash, callback, progressCallback) {
        function _async(callback2) {
          if (typeof s !== "string" || typeof hash !== "string") {
            nextTick2(callback2.bind(this, Error("Illegal arguments: " + typeof s + ", " + typeof hash)));
            return;
          }
          if (hash.length !== 60) {
            nextTick2(callback2.bind(this, null, false));
            return;
          }
          bcrypt2.hash(s, hash.substr(0, 29), function(err, comp) {
            if (err)
              callback2(err);
            else
              callback2(null, safeStringCompare(comp, hash));
          }, progressCallback);
        }
        __name(_async, "_async");
        if (callback) {
          if (typeof callback !== "function")
            throw Error("Illegal callback: " + typeof callback);
          _async(callback);
        } else
          return new Promise(function(resolve, reject) {
            _async(function(err, res) {
              if (err) {
                reject(err);
                return;
              }
              resolve(res);
            });
          });
      };
      bcrypt2.getRounds = function(hash) {
        if (typeof hash !== "string")
          throw Error("Illegal arguments: " + typeof hash);
        return parseInt(hash.split("$")[2], 10);
      };
      bcrypt2.getSalt = function(hash) {
        if (typeof hash !== "string")
          throw Error("Illegal arguments: " + typeof hash);
        if (hash.length !== 60)
          throw Error("Illegal hash length: " + hash.length + " != 60");
        return hash.substring(0, 29);
      };
      var nextTick2 = typeof process !== "undefined" && process && typeof process.nextTick === "function" ? typeof setImmediate === "function" ? setImmediate : process.nextTick : setTimeout;
      function stringToBytes(str) {
        var out = [], i = 0;
        utfx.encodeUTF16toUTF8(function() {
          if (i >= str.length) return null;
          return str.charCodeAt(i++);
        }, function(b) {
          out.push(b);
        });
        return out;
      }
      __name(stringToBytes, "stringToBytes");
      var BASE64_CODE = "./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");
      var BASE64_INDEX = [
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        0,
        1,
        54,
        55,
        56,
        57,
        58,
        59,
        60,
        61,
        62,
        63,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        46,
        47,
        48,
        49,
        50,
        51,
        52,
        53,
        -1,
        -1,
        -1,
        -1,
        -1
      ];
      var stringFromCharCode = String.fromCharCode;
      function base64_encode(b, len) {
        var off2 = 0, rs = [], c1, c2;
        if (len <= 0 || len > b.length)
          throw Error("Illegal len: " + len);
        while (off2 < len) {
          c1 = b[off2++] & 255;
          rs.push(BASE64_CODE[c1 >> 2 & 63]);
          c1 = (c1 & 3) << 4;
          if (off2 >= len) {
            rs.push(BASE64_CODE[c1 & 63]);
            break;
          }
          c2 = b[off2++] & 255;
          c1 |= c2 >> 4 & 15;
          rs.push(BASE64_CODE[c1 & 63]);
          c1 = (c2 & 15) << 2;
          if (off2 >= len) {
            rs.push(BASE64_CODE[c1 & 63]);
            break;
          }
          c2 = b[off2++] & 255;
          c1 |= c2 >> 6 & 3;
          rs.push(BASE64_CODE[c1 & 63]);
          rs.push(BASE64_CODE[c2 & 63]);
        }
        return rs.join("");
      }
      __name(base64_encode, "base64_encode");
      function base64_decode(s, len) {
        var off2 = 0, slen = s.length, olen = 0, rs = [], c1, c2, c3, c4, o, code;
        if (len <= 0)
          throw Error("Illegal len: " + len);
        while (off2 < slen - 1 && olen < len) {
          code = s.charCodeAt(off2++);
          c1 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
          code = s.charCodeAt(off2++);
          c2 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
          if (c1 == -1 || c2 == -1)
            break;
          o = c1 << 2 >>> 0;
          o |= (c2 & 48) >> 4;
          rs.push(stringFromCharCode(o));
          if (++olen >= len || off2 >= slen)
            break;
          code = s.charCodeAt(off2++);
          c3 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
          if (c3 == -1)
            break;
          o = (c2 & 15) << 4 >>> 0;
          o |= (c3 & 60) >> 2;
          rs.push(stringFromCharCode(o));
          if (++olen >= len || off2 >= slen)
            break;
          code = s.charCodeAt(off2++);
          c4 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
          o = (c3 & 3) << 6 >>> 0;
          o |= c4;
          rs.push(stringFromCharCode(o));
          ++olen;
        }
        var res = [];
        for (off2 = 0; off2 < olen; off2++)
          res.push(rs[off2].charCodeAt(0));
        return res;
      }
      __name(base64_decode, "base64_decode");
      var utfx = (function() {
        "use strict";
        var utfx2 = {};
        utfx2.MAX_CODEPOINT = 1114111;
        utfx2.encodeUTF8 = function(src, dst) {
          var cp = null;
          if (typeof src === "number")
            cp = src, src = /* @__PURE__ */ __name(function() {
              return null;
            }, "src");
          while (cp !== null || (cp = src()) !== null) {
            if (cp < 128)
              dst(cp & 127);
            else if (cp < 2048)
              dst(cp >> 6 & 31 | 192), dst(cp & 63 | 128);
            else if (cp < 65536)
              dst(cp >> 12 & 15 | 224), dst(cp >> 6 & 63 | 128), dst(cp & 63 | 128);
            else
              dst(cp >> 18 & 7 | 240), dst(cp >> 12 & 63 | 128), dst(cp >> 6 & 63 | 128), dst(cp & 63 | 128);
            cp = null;
          }
        };
        utfx2.decodeUTF8 = function(src, dst) {
          var a, b, c, d, fail = /* @__PURE__ */ __name(function(b2) {
            b2 = b2.slice(0, b2.indexOf(null));
            var err = Error(b2.toString());
            err.name = "TruncatedError";
            err["bytes"] = b2;
            throw err;
          }, "fail");
          while ((a = src()) !== null) {
            if ((a & 128) === 0)
              dst(a);
            else if ((a & 224) === 192)
              (b = src()) === null && fail([a, b]), dst((a & 31) << 6 | b & 63);
            else if ((a & 240) === 224)
              ((b = src()) === null || (c = src()) === null) && fail([a, b, c]), dst((a & 15) << 12 | (b & 63) << 6 | c & 63);
            else if ((a & 248) === 240)
              ((b = src()) === null || (c = src()) === null || (d = src()) === null) && fail([a, b, c, d]), dst((a & 7) << 18 | (b & 63) << 12 | (c & 63) << 6 | d & 63);
            else throw RangeError("Illegal starting byte: " + a);
          }
        };
        utfx2.UTF16toUTF8 = function(src, dst) {
          var c1, c2 = null;
          while (true) {
            if ((c1 = c2 !== null ? c2 : src()) === null)
              break;
            if (c1 >= 55296 && c1 <= 57343) {
              if ((c2 = src()) !== null) {
                if (c2 >= 56320 && c2 <= 57343) {
                  dst((c1 - 55296) * 1024 + c2 - 56320 + 65536);
                  c2 = null;
                  continue;
                }
              }
            }
            dst(c1);
          }
          if (c2 !== null) dst(c2);
        };
        utfx2.UTF8toUTF16 = function(src, dst) {
          var cp = null;
          if (typeof src === "number")
            cp = src, src = /* @__PURE__ */ __name(function() {
              return null;
            }, "src");
          while (cp !== null || (cp = src()) !== null) {
            if (cp <= 65535)
              dst(cp);
            else
              cp -= 65536, dst((cp >> 10) + 55296), dst(cp % 1024 + 56320);
            cp = null;
          }
        };
        utfx2.encodeUTF16toUTF8 = function(src, dst) {
          utfx2.UTF16toUTF8(src, function(cp) {
            utfx2.encodeUTF8(cp, dst);
          });
        };
        utfx2.decodeUTF8toUTF16 = function(src, dst) {
          utfx2.decodeUTF8(src, function(cp) {
            utfx2.UTF8toUTF16(cp, dst);
          });
        };
        utfx2.calculateCodePoint = function(cp) {
          return cp < 128 ? 1 : cp < 2048 ? 2 : cp < 65536 ? 3 : 4;
        };
        utfx2.calculateUTF8 = function(src) {
          var cp, l = 0;
          while ((cp = src()) !== null)
            l += utfx2.calculateCodePoint(cp);
          return l;
        };
        utfx2.calculateUTF16asUTF8 = function(src) {
          var n = 0, l = 0;
          utfx2.UTF16toUTF8(src, function(cp) {
            ++n;
            l += utfx2.calculateCodePoint(cp);
          });
          return [n, l];
        };
        return utfx2;
      })();
      Date.now = Date.now || function() {
        return +/* @__PURE__ */ new Date();
      };
      var BCRYPT_SALT_LEN = 16;
      var GENSALT_DEFAULT_LOG2_ROUNDS = 10;
      var BLOWFISH_NUM_ROUNDS = 16;
      var MAX_EXECUTION_TIME = 100;
      var P_ORIG = [
        608135816,
        2242054355,
        320440878,
        57701188,
        2752067618,
        698298832,
        137296536,
        3964562569,
        1160258022,
        953160567,
        3193202383,
        887688300,
        3232508343,
        3380367581,
        1065670069,
        3041331479,
        2450970073,
        2306472731
      ];
      var S_ORIG = [
        3509652390,
        2564797868,
        805139163,
        3491422135,
        3101798381,
        1780907670,
        3128725573,
        4046225305,
        614570311,
        3012652279,
        134345442,
        2240740374,
        1667834072,
        1901547113,
        2757295779,
        4103290238,
        227898511,
        1921955416,
        1904987480,
        2182433518,
        2069144605,
        3260701109,
        2620446009,
        720527379,
        3318853667,
        677414384,
        3393288472,
        3101374703,
        2390351024,
        1614419982,
        1822297739,
        2954791486,
        3608508353,
        3174124327,
        2024746970,
        1432378464,
        3864339955,
        2857741204,
        1464375394,
        1676153920,
        1439316330,
        715854006,
        3033291828,
        289532110,
        2706671279,
        2087905683,
        3018724369,
        1668267050,
        732546397,
        1947742710,
        3462151702,
        2609353502,
        2950085171,
        1814351708,
        2050118529,
        680887927,
        999245976,
        1800124847,
        3300911131,
        1713906067,
        1641548236,
        4213287313,
        1216130144,
        1575780402,
        4018429277,
        3917837745,
        3693486850,
        3949271944,
        596196993,
        3549867205,
        258830323,
        2213823033,
        772490370,
        2760122372,
        1774776394,
        2652871518,
        566650946,
        4142492826,
        1728879713,
        2882767088,
        1783734482,
        3629395816,
        2517608232,
        2874225571,
        1861159788,
        326777828,
        3124490320,
        2130389656,
        2716951837,
        967770486,
        1724537150,
        2185432712,
        2364442137,
        1164943284,
        2105845187,
        998989502,
        3765401048,
        2244026483,
        1075463327,
        1455516326,
        1322494562,
        910128902,
        469688178,
        1117454909,
        936433444,
        3490320968,
        3675253459,
        1240580251,
        122909385,
        2157517691,
        634681816,
        4142456567,
        3825094682,
        3061402683,
        2540495037,
        79693498,
        3249098678,
        1084186820,
        1583128258,
        426386531,
        1761308591,
        1047286709,
        322548459,
        995290223,
        1845252383,
        2603652396,
        3431023940,
        2942221577,
        3202600964,
        3727903485,
        1712269319,
        422464435,
        3234572375,
        1170764815,
        3523960633,
        3117677531,
        1434042557,
        442511882,
        3600875718,
        1076654713,
        1738483198,
        4213154764,
        2393238008,
        3677496056,
        1014306527,
        4251020053,
        793779912,
        2902807211,
        842905082,
        4246964064,
        1395751752,
        1040244610,
        2656851899,
        3396308128,
        445077038,
        3742853595,
        3577915638,
        679411651,
        2892444358,
        2354009459,
        1767581616,
        3150600392,
        3791627101,
        3102740896,
        284835224,
        4246832056,
        1258075500,
        768725851,
        2589189241,
        3069724005,
        3532540348,
        1274779536,
        3789419226,
        2764799539,
        1660621633,
        3471099624,
        4011903706,
        913787905,
        3497959166,
        737222580,
        2514213453,
        2928710040,
        3937242737,
        1804850592,
        3499020752,
        2949064160,
        2386320175,
        2390070455,
        2415321851,
        4061277028,
        2290661394,
        2416832540,
        1336762016,
        1754252060,
        3520065937,
        3014181293,
        791618072,
        3188594551,
        3933548030,
        2332172193,
        3852520463,
        3043980520,
        413987798,
        3465142937,
        3030929376,
        4245938359,
        2093235073,
        3534596313,
        375366246,
        2157278981,
        2479649556,
        555357303,
        3870105701,
        2008414854,
        3344188149,
        4221384143,
        3956125452,
        2067696032,
        3594591187,
        2921233993,
        2428461,
        544322398,
        577241275,
        1471733935,
        610547355,
        4027169054,
        1432588573,
        1507829418,
        2025931657,
        3646575487,
        545086370,
        48609733,
        2200306550,
        1653985193,
        298326376,
        1316178497,
        3007786442,
        2064951626,
        458293330,
        2589141269,
        3591329599,
        3164325604,
        727753846,
        2179363840,
        146436021,
        1461446943,
        4069977195,
        705550613,
        3059967265,
        3887724982,
        4281599278,
        3313849956,
        1404054877,
        2845806497,
        146425753,
        1854211946,
        1266315497,
        3048417604,
        3681880366,
        3289982499,
        290971e4,
        1235738493,
        2632868024,
        2414719590,
        3970600049,
        1771706367,
        1449415276,
        3266420449,
        422970021,
        1963543593,
        2690192192,
        3826793022,
        1062508698,
        1531092325,
        1804592342,
        2583117782,
        2714934279,
        4024971509,
        1294809318,
        4028980673,
        1289560198,
        2221992742,
        1669523910,
        35572830,
        157838143,
        1052438473,
        1016535060,
        1802137761,
        1753167236,
        1386275462,
        3080475397,
        2857371447,
        1040679964,
        2145300060,
        2390574316,
        1461121720,
        2956646967,
        4031777805,
        4028374788,
        33600511,
        2920084762,
        1018524850,
        629373528,
        3691585981,
        3515945977,
        2091462646,
        2486323059,
        586499841,
        988145025,
        935516892,
        3367335476,
        2599673255,
        2839830854,
        265290510,
        3972581182,
        2759138881,
        3795373465,
        1005194799,
        847297441,
        406762289,
        1314163512,
        1332590856,
        1866599683,
        4127851711,
        750260880,
        613907577,
        1450815602,
        3165620655,
        3734664991,
        3650291728,
        3012275730,
        3704569646,
        1427272223,
        778793252,
        1343938022,
        2676280711,
        2052605720,
        1946737175,
        3164576444,
        3914038668,
        3967478842,
        3682934266,
        1661551462,
        3294938066,
        4011595847,
        840292616,
        3712170807,
        616741398,
        312560963,
        711312465,
        1351876610,
        322626781,
        1910503582,
        271666773,
        2175563734,
        1594956187,
        70604529,
        3617834859,
        1007753275,
        1495573769,
        4069517037,
        2549218298,
        2663038764,
        504708206,
        2263041392,
        3941167025,
        2249088522,
        1514023603,
        1998579484,
        1312622330,
        694541497,
        2582060303,
        2151582166,
        1382467621,
        776784248,
        2618340202,
        3323268794,
        2497899128,
        2784771155,
        503983604,
        4076293799,
        907881277,
        423175695,
        432175456,
        1378068232,
        4145222326,
        3954048622,
        3938656102,
        3820766613,
        2793130115,
        2977904593,
        26017576,
        3274890735,
        3194772133,
        1700274565,
        1756076034,
        4006520079,
        3677328699,
        720338349,
        1533947780,
        354530856,
        688349552,
        3973924725,
        1637815568,
        332179504,
        3949051286,
        53804574,
        2852348879,
        3044236432,
        1282449977,
        3583942155,
        3416972820,
        4006381244,
        1617046695,
        2628476075,
        3002303598,
        1686838959,
        431878346,
        2686675385,
        1700445008,
        1080580658,
        1009431731,
        832498133,
        3223435511,
        2605976345,
        2271191193,
        2516031870,
        1648197032,
        4164389018,
        2548247927,
        300782431,
        375919233,
        238389289,
        3353747414,
        2531188641,
        2019080857,
        1475708069,
        455242339,
        2609103871,
        448939670,
        3451063019,
        1395535956,
        2413381860,
        1841049896,
        1491858159,
        885456874,
        4264095073,
        4001119347,
        1565136089,
        3898914787,
        1108368660,
        540939232,
        1173283510,
        2745871338,
        3681308437,
        4207628240,
        3343053890,
        4016749493,
        1699691293,
        1103962373,
        3625875870,
        2256883143,
        3830138730,
        1031889488,
        3479347698,
        1535977030,
        4236805024,
        3251091107,
        2132092099,
        1774941330,
        1199868427,
        1452454533,
        157007616,
        2904115357,
        342012276,
        595725824,
        1480756522,
        206960106,
        497939518,
        591360097,
        863170706,
        2375253569,
        3596610801,
        1814182875,
        2094937945,
        3421402208,
        1082520231,
        3463918190,
        2785509508,
        435703966,
        3908032597,
        1641649973,
        2842273706,
        3305899714,
        1510255612,
        2148256476,
        2655287854,
        3276092548,
        4258621189,
        236887753,
        3681803219,
        274041037,
        1734335097,
        3815195456,
        3317970021,
        1899903192,
        1026095262,
        4050517792,
        356393447,
        2410691914,
        3873677099,
        3682840055,
        3913112168,
        2491498743,
        4132185628,
        2489919796,
        1091903735,
        1979897079,
        3170134830,
        3567386728,
        3557303409,
        857797738,
        1136121015,
        1342202287,
        507115054,
        2535736646,
        337727348,
        3213592640,
        1301675037,
        2528481711,
        1895095763,
        1721773893,
        3216771564,
        62756741,
        2142006736,
        835421444,
        2531993523,
        1442658625,
        3659876326,
        2882144922,
        676362277,
        1392781812,
        170690266,
        3921047035,
        1759253602,
        3611846912,
        1745797284,
        664899054,
        1329594018,
        3901205900,
        3045908486,
        2062866102,
        2865634940,
        3543621612,
        3464012697,
        1080764994,
        553557557,
        3656615353,
        3996768171,
        991055499,
        499776247,
        1265440854,
        648242737,
        3940784050,
        980351604,
        3713745714,
        1749149687,
        3396870395,
        4211799374,
        3640570775,
        1161844396,
        3125318951,
        1431517754,
        545492359,
        4268468663,
        3499529547,
        1437099964,
        2702547544,
        3433638243,
        2581715763,
        2787789398,
        1060185593,
        1593081372,
        2418618748,
        4260947970,
        69676912,
        2159744348,
        86519011,
        2512459080,
        3838209314,
        1220612927,
        3339683548,
        133810670,
        1090789135,
        1078426020,
        1569222167,
        845107691,
        3583754449,
        4072456591,
        1091646820,
        628848692,
        1613405280,
        3757631651,
        526609435,
        236106946,
        48312990,
        2942717905,
        3402727701,
        1797494240,
        859738849,
        992217954,
        4005476642,
        2243076622,
        3870952857,
        3732016268,
        765654824,
        3490871365,
        2511836413,
        1685915746,
        3888969200,
        1414112111,
        2273134842,
        3281911079,
        4080962846,
        172450625,
        2569994100,
        980381355,
        4109958455,
        2819808352,
        2716589560,
        2568741196,
        3681446669,
        3329971472,
        1835478071,
        660984891,
        3704678404,
        4045999559,
        3422617507,
        3040415634,
        1762651403,
        1719377915,
        3470491036,
        2693910283,
        3642056355,
        3138596744,
        1364962596,
        2073328063,
        1983633131,
        926494387,
        3423689081,
        2150032023,
        4096667949,
        1749200295,
        3328846651,
        309677260,
        2016342300,
        1779581495,
        3079819751,
        111262694,
        1274766160,
        443224088,
        298511866,
        1025883608,
        3806446537,
        1145181785,
        168956806,
        3641502830,
        3584813610,
        1689216846,
        3666258015,
        3200248200,
        1692713982,
        2646376535,
        4042768518,
        1618508792,
        1610833997,
        3523052358,
        4130873264,
        2001055236,
        3610705100,
        2202168115,
        4028541809,
        2961195399,
        1006657119,
        2006996926,
        3186142756,
        1430667929,
        3210227297,
        1314452623,
        4074634658,
        4101304120,
        2273951170,
        1399257539,
        3367210612,
        3027628629,
        1190975929,
        2062231137,
        2333990788,
        2221543033,
        2438960610,
        1181637006,
        548689776,
        2362791313,
        3372408396,
        3104550113,
        3145860560,
        296247880,
        1970579870,
        3078560182,
        3769228297,
        1714227617,
        3291629107,
        3898220290,
        166772364,
        1251581989,
        493813264,
        448347421,
        195405023,
        2709975567,
        677966185,
        3703036547,
        1463355134,
        2715995803,
        1338867538,
        1343315457,
        2802222074,
        2684532164,
        233230375,
        2599980071,
        2000651841,
        3277868038,
        1638401717,
        4028070440,
        3237316320,
        6314154,
        819756386,
        300326615,
        590932579,
        1405279636,
        3267499572,
        3150704214,
        2428286686,
        3959192993,
        3461946742,
        1862657033,
        1266418056,
        963775037,
        2089974820,
        2263052895,
        1917689273,
        448879540,
        3550394620,
        3981727096,
        150775221,
        3627908307,
        1303187396,
        508620638,
        2975983352,
        2726630617,
        1817252668,
        1876281319,
        1457606340,
        908771278,
        3720792119,
        3617206836,
        2455994898,
        1729034894,
        1080033504,
        976866871,
        3556439503,
        2881648439,
        1522871579,
        1555064734,
        1336096578,
        3548522304,
        2579274686,
        3574697629,
        3205460757,
        3593280638,
        3338716283,
        3079412587,
        564236357,
        2993598910,
        1781952180,
        1464380207,
        3163844217,
        3332601554,
        1699332808,
        1393555694,
        1183702653,
        3581086237,
        1288719814,
        691649499,
        2847557200,
        2895455976,
        3193889540,
        2717570544,
        1781354906,
        1676643554,
        2592534050,
        3230253752,
        1126444790,
        2770207658,
        2633158820,
        2210423226,
        2615765581,
        2414155088,
        3127139286,
        673620729,
        2805611233,
        1269405062,
        4015350505,
        3341807571,
        4149409754,
        1057255273,
        2012875353,
        2162469141,
        2276492801,
        2601117357,
        993977747,
        3918593370,
        2654263191,
        753973209,
        36408145,
        2530585658,
        25011837,
        3520020182,
        2088578344,
        530523599,
        2918365339,
        1524020338,
        1518925132,
        3760827505,
        3759777254,
        1202760957,
        3985898139,
        3906192525,
        674977740,
        4174734889,
        2031300136,
        2019492241,
        3983892565,
        4153806404,
        3822280332,
        352677332,
        2297720250,
        60907813,
        90501309,
        3286998549,
        1016092578,
        2535922412,
        2839152426,
        457141659,
        509813237,
        4120667899,
        652014361,
        1966332200,
        2975202805,
        55981186,
        2327461051,
        676427537,
        3255491064,
        2882294119,
        3433927263,
        1307055953,
        942726286,
        933058658,
        2468411793,
        3933900994,
        4215176142,
        1361170020,
        2001714738,
        2830558078,
        3274259782,
        1222529897,
        1679025792,
        2729314320,
        3714953764,
        1770335741,
        151462246,
        3013232138,
        1682292957,
        1483529935,
        471910574,
        1539241949,
        458788160,
        3436315007,
        1807016891,
        3718408830,
        978976581,
        1043663428,
        3165965781,
        1927990952,
        4200891579,
        2372276910,
        3208408903,
        3533431907,
        1412390302,
        2931980059,
        4132332400,
        1947078029,
        3881505623,
        4168226417,
        2941484381,
        1077988104,
        1320477388,
        886195818,
        18198404,
        3786409e3,
        2509781533,
        112762804,
        3463356488,
        1866414978,
        891333506,
        18488651,
        661792760,
        1628790961,
        3885187036,
        3141171499,
        876946877,
        2693282273,
        1372485963,
        791857591,
        2686433993,
        3759982718,
        3167212022,
        3472953795,
        2716379847,
        445679433,
        3561995674,
        3504004811,
        3574258232,
        54117162,
        3331405415,
        2381918588,
        3769707343,
        4154350007,
        1140177722,
        4074052095,
        668550556,
        3214352940,
        367459370,
        261225585,
        2610173221,
        4209349473,
        3468074219,
        3265815641,
        314222801,
        3066103646,
        3808782860,
        282218597,
        3406013506,
        3773591054,
        379116347,
        1285071038,
        846784868,
        2669647154,
        3771962079,
        3550491691,
        2305946142,
        453669953,
        1268987020,
        3317592352,
        3279303384,
        3744833421,
        2610507566,
        3859509063,
        266596637,
        3847019092,
        517658769,
        3462560207,
        3443424879,
        370717030,
        4247526661,
        2224018117,
        4143653529,
        4112773975,
        2788324899,
        2477274417,
        1456262402,
        2901442914,
        1517677493,
        1846949527,
        2295493580,
        3734397586,
        2176403920,
        1280348187,
        1908823572,
        3871786941,
        846861322,
        1172426758,
        3287448474,
        3383383037,
        1655181056,
        3139813346,
        901632758,
        1897031941,
        2986607138,
        3066810236,
        3447102507,
        1393639104,
        373351379,
        950779232,
        625454576,
        3124240540,
        4148612726,
        2007998917,
        544563296,
        2244738638,
        2330496472,
        2058025392,
        1291430526,
        424198748,
        50039436,
        29584100,
        3605783033,
        2429876329,
        2791104160,
        1057563949,
        3255363231,
        3075367218,
        3463963227,
        1469046755,
        985887462
      ];
      var C_ORIG = [
        1332899944,
        1700884034,
        1701343084,
        1684370003,
        1668446532,
        1869963892
      ];
      function _encipher(lr, off2, P, S) {
        var n, l = lr[off2], r = lr[off2 + 1];
        l ^= P[0];
        n = S[l >>> 24];
        n += S[256 | l >> 16 & 255];
        n ^= S[512 | l >> 8 & 255];
        n += S[768 | l & 255];
        r ^= n ^ P[1];
        n = S[r >>> 24];
        n += S[256 | r >> 16 & 255];
        n ^= S[512 | r >> 8 & 255];
        n += S[768 | r & 255];
        l ^= n ^ P[2];
        n = S[l >>> 24];
        n += S[256 | l >> 16 & 255];
        n ^= S[512 | l >> 8 & 255];
        n += S[768 | l & 255];
        r ^= n ^ P[3];
        n = S[r >>> 24];
        n += S[256 | r >> 16 & 255];
        n ^= S[512 | r >> 8 & 255];
        n += S[768 | r & 255];
        l ^= n ^ P[4];
        n = S[l >>> 24];
        n += S[256 | l >> 16 & 255];
        n ^= S[512 | l >> 8 & 255];
        n += S[768 | l & 255];
        r ^= n ^ P[5];
        n = S[r >>> 24];
        n += S[256 | r >> 16 & 255];
        n ^= S[512 | r >> 8 & 255];
        n += S[768 | r & 255];
        l ^= n ^ P[6];
        n = S[l >>> 24];
        n += S[256 | l >> 16 & 255];
        n ^= S[512 | l >> 8 & 255];
        n += S[768 | l & 255];
        r ^= n ^ P[7];
        n = S[r >>> 24];
        n += S[256 | r >> 16 & 255];
        n ^= S[512 | r >> 8 & 255];
        n += S[768 | r & 255];
        l ^= n ^ P[8];
        n = S[l >>> 24];
        n += S[256 | l >> 16 & 255];
        n ^= S[512 | l >> 8 & 255];
        n += S[768 | l & 255];
        r ^= n ^ P[9];
        n = S[r >>> 24];
        n += S[256 | r >> 16 & 255];
        n ^= S[512 | r >> 8 & 255];
        n += S[768 | r & 255];
        l ^= n ^ P[10];
        n = S[l >>> 24];
        n += S[256 | l >> 16 & 255];
        n ^= S[512 | l >> 8 & 255];
        n += S[768 | l & 255];
        r ^= n ^ P[11];
        n = S[r >>> 24];
        n += S[256 | r >> 16 & 255];
        n ^= S[512 | r >> 8 & 255];
        n += S[768 | r & 255];
        l ^= n ^ P[12];
        n = S[l >>> 24];
        n += S[256 | l >> 16 & 255];
        n ^= S[512 | l >> 8 & 255];
        n += S[768 | l & 255];
        r ^= n ^ P[13];
        n = S[r >>> 24];
        n += S[256 | r >> 16 & 255];
        n ^= S[512 | r >> 8 & 255];
        n += S[768 | r & 255];
        l ^= n ^ P[14];
        n = S[l >>> 24];
        n += S[256 | l >> 16 & 255];
        n ^= S[512 | l >> 8 & 255];
        n += S[768 | l & 255];
        r ^= n ^ P[15];
        n = S[r >>> 24];
        n += S[256 | r >> 16 & 255];
        n ^= S[512 | r >> 8 & 255];
        n += S[768 | r & 255];
        l ^= n ^ P[16];
        lr[off2] = r ^ P[BLOWFISH_NUM_ROUNDS + 1];
        lr[off2 + 1] = l;
        return lr;
      }
      __name(_encipher, "_encipher");
      function _streamtoword(data, offp) {
        for (var i = 0, word = 0; i < 4; ++i)
          word = word << 8 | data[offp] & 255, offp = (offp + 1) % data.length;
        return { key: word, offp };
      }
      __name(_streamtoword, "_streamtoword");
      function _key(key, P, S) {
        var offset = 0, lr = [0, 0], plen = P.length, slen = S.length, sw;
        for (var i = 0; i < plen; i++)
          sw = _streamtoword(key, offset), offset = sw.offp, P[i] = P[i] ^ sw.key;
        for (i = 0; i < plen; i += 2)
          lr = _encipher(lr, 0, P, S), P[i] = lr[0], P[i + 1] = lr[1];
        for (i = 0; i < slen; i += 2)
          lr = _encipher(lr, 0, P, S), S[i] = lr[0], S[i + 1] = lr[1];
      }
      __name(_key, "_key");
      function _ekskey(data, key, P, S) {
        var offp = 0, lr = [0, 0], plen = P.length, slen = S.length, sw;
        for (var i = 0; i < plen; i++)
          sw = _streamtoword(key, offp), offp = sw.offp, P[i] = P[i] ^ sw.key;
        offp = 0;
        for (i = 0; i < plen; i += 2)
          sw = _streamtoword(data, offp), offp = sw.offp, lr[0] ^= sw.key, sw = _streamtoword(data, offp), offp = sw.offp, lr[1] ^= sw.key, lr = _encipher(lr, 0, P, S), P[i] = lr[0], P[i + 1] = lr[1];
        for (i = 0; i < slen; i += 2)
          sw = _streamtoword(data, offp), offp = sw.offp, lr[0] ^= sw.key, sw = _streamtoword(data, offp), offp = sw.offp, lr[1] ^= sw.key, lr = _encipher(lr, 0, P, S), S[i] = lr[0], S[i + 1] = lr[1];
      }
      __name(_ekskey, "_ekskey");
      function _crypt(b, salt, rounds, callback, progressCallback) {
        var cdata = C_ORIG.slice(), clen = cdata.length, err;
        if (rounds < 4 || rounds > 31) {
          err = Error("Illegal number of rounds (4-31): " + rounds);
          if (callback) {
            nextTick2(callback.bind(this, err));
            return;
          } else
            throw err;
        }
        if (salt.length !== BCRYPT_SALT_LEN) {
          err = Error("Illegal salt length: " + salt.length + " != " + BCRYPT_SALT_LEN);
          if (callback) {
            nextTick2(callback.bind(this, err));
            return;
          } else
            throw err;
        }
        rounds = 1 << rounds >>> 0;
        var P, S, i = 0, j;
        if (Int32Array) {
          P = new Int32Array(P_ORIG);
          S = new Int32Array(S_ORIG);
        } else {
          P = P_ORIG.slice();
          S = S_ORIG.slice();
        }
        _ekskey(salt, b, P, S);
        function next() {
          if (progressCallback)
            progressCallback(i / rounds);
          if (i < rounds) {
            var start = Date.now();
            for (; i < rounds; ) {
              i = i + 1;
              _key(b, P, S);
              _key(salt, P, S);
              if (Date.now() - start > MAX_EXECUTION_TIME)
                break;
            }
          } else {
            for (i = 0; i < 64; i++)
              for (j = 0; j < clen >> 1; j++)
                _encipher(cdata, j << 1, P, S);
            var ret = [];
            for (i = 0; i < clen; i++)
              ret.push((cdata[i] >> 24 & 255) >>> 0), ret.push((cdata[i] >> 16 & 255) >>> 0), ret.push((cdata[i] >> 8 & 255) >>> 0), ret.push((cdata[i] & 255) >>> 0);
            if (callback) {
              callback(null, ret);
              return;
            } else
              return ret;
          }
          if (callback)
            nextTick2(next);
        }
        __name(next, "next");
        if (typeof callback !== "undefined") {
          next();
        } else {
          var res;
          while (true)
            if (typeof (res = next()) !== "undefined")
              return res || [];
        }
      }
      __name(_crypt, "_crypt");
      function _hash(s, salt, callback, progressCallback) {
        var err;
        if (typeof s !== "string" || typeof salt !== "string") {
          err = Error("Invalid string / salt: Not a string");
          if (callback) {
            nextTick2(callback.bind(this, err));
            return;
          } else
            throw err;
        }
        var minor, offset;
        if (salt.charAt(0) !== "$" || salt.charAt(1) !== "2") {
          err = Error("Invalid salt version: " + salt.substring(0, 2));
          if (callback) {
            nextTick2(callback.bind(this, err));
            return;
          } else
            throw err;
        }
        if (salt.charAt(2) === "$")
          minor = String.fromCharCode(0), offset = 3;
        else {
          minor = salt.charAt(2);
          if (minor !== "a" && minor !== "b" && minor !== "y" || salt.charAt(3) !== "$") {
            err = Error("Invalid salt revision: " + salt.substring(2, 4));
            if (callback) {
              nextTick2(callback.bind(this, err));
              return;
            } else
              throw err;
          }
          offset = 4;
        }
        if (salt.charAt(offset + 2) > "$") {
          err = Error("Missing salt rounds");
          if (callback) {
            nextTick2(callback.bind(this, err));
            return;
          } else
            throw err;
        }
        var r1 = parseInt(salt.substring(offset, offset + 1), 10) * 10, r2 = parseInt(salt.substring(offset + 1, offset + 2), 10), rounds = r1 + r2, real_salt = salt.substring(offset + 3, offset + 25);
        s += minor >= "a" ? "\0" : "";
        var passwordb = stringToBytes(s), saltb = base64_decode(real_salt, BCRYPT_SALT_LEN);
        function finish(bytes) {
          var res = [];
          res.push("$2");
          if (minor >= "a")
            res.push(minor);
          res.push("$");
          if (rounds < 10)
            res.push("0");
          res.push(rounds.toString());
          res.push("$");
          res.push(base64_encode(saltb, saltb.length));
          res.push(base64_encode(bytes, C_ORIG.length * 4 - 1));
          return res.join("");
        }
        __name(finish, "finish");
        if (typeof callback == "undefined")
          return finish(_crypt(passwordb, saltb, rounds));
        else {
          _crypt(passwordb, saltb, rounds, function(err2, bytes) {
            if (err2)
              callback(err2, null);
            else
              callback(null, finish(bytes));
          }, progressCallback);
        }
      }
      __name(_hash, "_hash");
      bcrypt2.encodeBase64 = base64_encode;
      bcrypt2.decodeBase64 = base64_decode;
      return bcrypt2;
    });
  }
});

// ../database.js
var require_database = __commonJS({
  "../database.js"(exports, module) {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var bcrypt2 = require_bcrypt();
    var _env = {};
    var db = null;
    var _dirty = false;
    function setEnv2(env2) {
      _env = env2;
      db = null;
      _dirty = false;
    }
    __name(setEnv2, "setEnv");
    function useKV() {
      return !!_env.FORUM_DB;
    }
    __name(useKV, "useKV");
    function getSupabaseUrl() {
      return _env.SUPABASE_URL || typeof process !== "undefined" && process.env?.SUPABASE_URL || "";
    }
    __name(getSupabaseUrl, "getSupabaseUrl");
    function getSupabaseKey() {
      return _env.SUPABASE_SERVICE_KEY || typeof process !== "undefined" && process.env?.SUPABASE_SERVICE_KEY || "";
    }
    __name(getSupabaseKey, "getSupabaseKey");
    function useSupabase() {
      return !!(getSupabaseUrl() && getSupabaseKey());
    }
    __name(useSupabase, "useSupabase");
    var BUCKET_NAME = "forum-data";
    var FILE_NAME = "forum_db.json";
    var KV_KEY = "forum_db_v4";
    function getDefaultData() {
      return {
        users: [],
        categories: [],
        posts: [],
        comments: [],
        post_likes: [],
        post_votes: [],
        comment_likes: [],
        suggestions: [],
        suggestion_supports: [],
        notifications: [],
        favorites: [],
        post_polls: [],
        poll_votes: [],
        announcements: [],
        banned_users: [],
        nextId: { users: 1, categories: 1, posts: 1, comments: 1, suggestions: 1, notifications: 1, post_likes: 1, post_votes: 1, comment_likes: 1, suggestion_supports: 1, favorites: 1, post_polls: 1, poll_votes: 1, announcements: 1, banned_users: 1 }
      };
    }
    __name(getDefaultData, "getDefaultData");
    async function initSupabaseStorage() {
      if (!useSupabase()) return;
      try {
        const res = await fetch(`${getSupabaseUrl()}/storage/v1/bucket`, { headers: { Authorization: `Bearer ${getSupabaseKey()}` } });
        if (res.ok) {
          const buckets = await res.json();
          if (!buckets.find((b) => b.name === BUCKET_NAME)) {
            await fetch(`${getSupabaseUrl()}/storage/v1/bucket`, {
              method: "POST",
              headers: { Authorization: `Bearer ${getSupabaseKey()}`, "Content-Type": "application/json" },
              body: JSON.stringify({ name: BUCKET_NAME, public: false })
            });
          }
        }
      } catch (e) {
        console.error("[DB] bucket init:", e.message);
      }
    }
    __name(initSupabaseStorage, "initSupabaseStorage");
    async function loadFromSupabase() {
      const res = await fetch(`${getSupabaseUrl()}/storage/v1/object/${BUCKET_NAME}/${FILE_NAME}`, { headers: { Authorization: `Bearer ${getSupabaseKey()}` } });
      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error(`download: ${res.status}`);
      }
      return JSON.parse(await res.text());
    }
    __name(loadFromSupabase, "loadFromSupabase");
    async function saveToSupabase() {
      if (!db) return;
      const res = await fetch(`${getSupabaseUrl()}/storage/v1/object/${BUCKET_NAME}/${FILE_NAME}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${getSupabaseKey()}`, "Content-Type": "application/json", "x-upsert": "true" },
        body: JSON.stringify(db, null, 2)
      });
      if (!res.ok) console.error("[DB] save failed:", res.status);
    }
    __name(saveToSupabase, "saveToSupabase");
    async function loadFromKV() {
      const data = await _env.FORUM_DB.get(KV_KEY, "json");
      return data;
    }
    __name(loadFromKV, "loadFromKV");
    async function saveToKV() {
      if (!db) return;
      await _env.FORUM_DB.put(KV_KEY, JSON.stringify(db));
    }
    __name(saveToKV, "saveToKV");
    async function loadDB2() {
      if (db) return db;
      if (useKV()) {
        try {
          const cloud = await loadFromKV();
          if (cloud) {
            db = cloud;
            const defaults = getDefaultData();
            Object.keys(defaults).forEach((k) => {
              if (db[k] === void 0) db[k] = defaults[k];
            });
            Object.keys(defaults.nextId).forEach((k) => {
              if (db.nextId[k] === void 0) db.nextId[k] = defaults.nextId[k];
            });
          } else {
            db = getDefaultData();
            seedData();
            _dirty = true;
            await saveToKV();
            _dirty = false;
          }
          return db;
        } catch (e) {
          console.error("[DB] KV load failed:", e.message);
        }
      }
      if (useSupabase()) {
        await initSupabaseStorage();
        try {
          const cloud = await loadFromSupabase();
          if (cloud) {
            db = cloud;
            const defaults = getDefaultData();
            Object.keys(defaults).forEach((k) => {
              if (db[k] === void 0) db[k] = defaults[k];
            });
            Object.keys(defaults.nextId).forEach((k) => {
              if (db.nextId[k] === void 0) db.nextId[k] = defaults.nextId[k];
            });
          } else {
            db = getDefaultData();
            seedData();
            _dirty = true;
            await saveToSupabase();
            _dirty = false;
          }
          return db;
        } catch (e) {
          console.error("[DB] Supabase load failed, using memory:", e.message);
        }
      }
      db = getDefaultData();
      seedData();
      return db;
    }
    __name(loadDB2, "loadDB");
    async function saveDB2() {
      if (!db || !_dirty) return;
      if (useKV()) {
        try {
          await saveToKV();
          _dirty = false;
        } catch (e) {
          console.error("[DB] KV save failed:", e.message);
        }
        return;
      }
      if (useSupabase()) {
        try {
          await saveToSupabase();
          _dirty = false;
        } catch (e) {
          console.error("[DB] Supabase save failed:", e.message);
        }
      }
    }
    __name(saveDB2, "saveDB");
    async function ensureDB() {
      return loadDB2();
    }
    __name(ensureDB, "ensureDB");
    async function initDB() {
      return loadDB2();
    }
    __name(initDB, "initDB");
    function markDirty2() {
      _dirty = true;
    }
    __name(markDirty2, "markDirty");
    function getNextId(t) {
      if (!db.nextId[t]) db.nextId[t] = 1;
      return db.nextId[t]++;
    }
    __name(getNextId, "getNextId");
    var AVATAR_COLORS = ["#8B2323", "#C9A227", "#6B1A1A", "#D4AF37", "#A52A2A", "#B8860B", "#CD853F", "#DA8A2C", "#8B4513", "#BDB76B", "#9B2226", "#BB9457", "#6D1A1A", "#CFA636", "#7A1F1F", "#DAA520", "#A0522D", "#BC8F8F", "#8B6914", "#D2691E"];
    var SEED_USERS = [
      { username: "15118312809", nickname: "\u8BBA\u575B\u7BA1\u7406\u5458", department: "\u7BA1\u7406\u56E2\u961F", role: "admin" },
      { username: "night_owl_2026", nickname: "\u6DF1\u591C\u5237\u9898\u4EBA", department: "\u9AD8\u4E2D\u90E8", role: "student" },
      { username: "canteen_critic", nickname: "\u98DF\u5802\u6D4B\u8BC4\u5458", department: "\u9AD8\u4E2D\u90E8", role: "student" },
      { username: "sleep_deprived_g3", nickname: "\u9AD8\u4E09\u4E0D\u7720\u8005", department: "\u9AD8\u4E2D\u90E8", role: "student" },
      { username: "math_struggler", nickname: "\u6570\u5B66\u56F0\u96BE\u6237", department: "\u9AD8\u4E2D\u90E8", role: "student" },
      { username: "dream_chaser_g3", nickname: "\u8FFD\u68A6\u9AD8\u4E09\u515A", department: "\u9AD8\u4E2D\u90E8", role: "student" },
      { username: "library_ghost", nickname: "\u56FE\u4E66\u9986\u5E7D\u7075", department: "\u9AD8\u4E2D\u90E8", role: "student" },
      { username: "exam_anxiety", nickname: "\u8003\u8BD5\u7126\u8651\u75C7", department: "\u9AD8\u4E2D\u90E8", role: "student" },
      { username: "coffee_addict_g3", nickname: "\u5496\u5561\u7EED\u547D\u515A", department: "\u9AD8\u4E2D\u90E8", role: "student" },
      { username: "quiet_observer", nickname: "\u6C89\u9ED8\u56F4\u89C2\u8005", department: "\u9AD8\u4E2D\u90E8", role: "student" },
      { username: "dorm_snack_king", nickname: "\u5BBF\u820D\u96F6\u98DF\u738B", department: "\u9AD8\u4E2D\u90E8", role: "student" },
      { username: "rebel_without_cause", nickname: "\u53DB\u9006\u521D\u4E2D\u751F", department: "\u521D\u4E2D\u90E8", role: "student" },
      { username: "homework_drowner", nickname: "\u4F5C\u4E1A\u6EBA\u6C34\u8005", department: "\u521D\u4E2D\u90E8", role: "student" },
      { username: "basketball_fan_j2", nickname: "\u7BEE\u7403\u5C11\u5E74J2", department: "\u521D\u4E2D\u90E8", role: "student" },
      { username: "anime_lover_j3", nickname: "\u4E8C\u6B21\u5143\u521D\u4E09\u515A", department: "\u521D\u4E2D\u90E8", role: "student" },
      { username: "growing_pains_j1", nickname: "\u6210\u957F\u7684\u70E6\u607C", department: "\u521D\u4E2D\u90E8", role: "student" },
      { username: "science_geek_j2", nickname: "\u79D1\u5B66\u5C0F\u602A\u4EBA", department: "\u521D\u4E2D\u90E8", role: "student" },
      { username: "shy_bookworm_j", nickname: "\u817C\u8146\u4E66\u866B", department: "\u521D\u4E2D\u90E8", role: "student" },
      { username: "class_clown_j3", nickname: "\u73ED\u7EA7\u6D3B\u5B9D", department: "\u521D\u4E2D\u90E8", role: "student" },
      { username: "early_bloomer_j1", nickname: "\u65E9\u8D77\u9E1F\u521D\u4E00", department: "\u521D\u4E2D\u90E8", role: "student" },
      { username: "little_scientist", nickname: "\u5C0F\u5C0F\u79D1\u5B66\u5BB6", department: "\u5C0F\u5B66\u90E8", role: "student" },
      { username: "jump_rope_champ", nickname: "\u8DF3\u7EF3\u51A0\u519B", department: "\u5C0F\u5B66\u90E8", role: "student" },
      { username: "drawing_master_p", nickname: "\u753B\u753B\u5C0F\u8FBE\u4EBA", department: "\u5C0F\u5B66\u90E8", role: "student" },
      { username: "cartoon_fan_p5", nickname: "\u52A8\u753B\u8FF7\u4E94\u5E74\u7EA7", department: "\u5C0F\u5B66\u90E8", role: "student" },
      { username: "milk_lover_p3", nickname: "\u725B\u5976\u7231\u597D\u8005", department: "\u5C0F\u5B66\u90E8", role: "student" },
      { username: "recess_runner_p", nickname: "\u8BFE\u95F4\u98DE\u6BDB\u817F", department: "\u5C0F\u5B66\u90E8", role: "student" },
      { username: "puzzle_solver_p4", nickname: "\u8C1C\u9898\u7834\u89E3\u8005", department: "\u5C0F\u5B66\u90E8", role: "student" },
      { username: "story_teller_p6", nickname: "\u6545\u4E8B\u5927\u738B", department: "\u5C0F\u5B66\u90E8", role: "student" },
      { username: "little_singer_p", nickname: "\u5C0F\u5C0F\u6B4C\u5531\u5BB6", department: "\u5C0F\u5B66\u90E8", role: "student" },
      { username: "curious_cat_p2", nickname: "\u597D\u5947\u5C0F\u732B", department: "\u5C0F\u5B66\u90E8", role: "student" },
      { username: "global_citizen_i", nickname: "\u4E16\u754C\u516C\u6C11", department: "\u56FD\u9645\u90E8", role: "student" },
      { username: "ielts_fighter", nickname: "\u96C5\u601D\u6597\u58EB", department: "\u56FD\u9645\u90E8", role: "student" },
      { username: "culture_bridge_i", nickname: "\u6587\u5316\u6865\u6881", department: "\u56FD\u9645\u90E8", role: "student" },
      { username: "toefl_dreamer_i", nickname: "\u6258\u798F\u8FFD\u68A6\u4EBA", department: "\u56FD\u9645\u90E8", role: "student" },
      { username: "multilingual_i", nickname: "\u591A\u8BED\u79CD\u7231\u597D\u8005", department: "\u56FD\u9645\u90E8", role: "student" },
      { username: "strict_but_caring", nickname: "\u4E25\u5E08\u51FA\u9AD8\u5F92", department: "\u9AD8\u4E2D\u90E8", role: "teacher" },
      { username: "homeroom_teacher_g", nickname: "\u9AD8\u4E09\u73ED\u4E3B\u4EFB", department: "\u9AD8\u4E2D\u90E8", role: "teacher" },
      { username: "young_teacher_j", nickname: "\u65B0\u9510\u6559\u5E08", department: "\u521D\u4E2D\u90E8", role: "teacher" },
      { username: "patient_teacher_p", nickname: "\u8010\u5FC3\u56ED\u4E01", department: "\u5C0F\u5B66\u90E8", role: "teacher" },
      { username: "international_edu", nickname: "\u56FD\u9645\u6559\u80B2\u8005", department: "\u56FD\u9645\u90E8", role: "teacher" },
      { username: "lurker_no1", nickname: "\u6F5C\u6C34\u4E00\u53F7", department: "\u9AD8\u4E2D\u90E8", role: "student" },
      { username: "lurker_no2", nickname: "\u5403\u74DC\u7FA4\u4F17\u7532", department: "\u521D\u4E2D\u90E8", role: "student" },
      { username: "lurker_no3", nickname: "\u5403\u74DC\u7FA4\u4F17\u4E59", department: "\u9AD8\u4E2D\u90E8", role: "student" },
      { username: "lurker_no4", nickname: "\u5403\u74DC\u7FA4\u4F17\u4E19", department: "\u5C0F\u5B66\u90E8", role: "student" },
      { username: "lurker_no5", nickname: "\u5403\u74DC\u7FA4\u4F17\u4E01", department: "\u56FD\u9645\u90E8", role: "student" },
      { username: "occasional_poster", nickname: "\u5076\u5C14\u5192\u6CE1", department: "\u9AD8\u4E2D\u90E8", role: "student" },
      { username: "silent_reader", nickname: "\u9ED8\u9ED8\u9605\u8BFB\u8005", department: "\u521D\u4E2D\u90E8", role: "student" },
      { username: "weekend_sleeper", nickname: "\u5468\u672B\u8865\u89C9\u4E13\u5BB6", department: "\u9AD8\u4E2D\u90E8", role: "student" },
      { username: "stationery_hoarder", nickname: "\u6587\u5177\u56E4\u79EF\u72C2", department: "\u521D\u4E2D\u90E8", role: "student" },
      { username: "hallway_walker", nickname: "\u8D70\u5ECA\u6563\u6B65\u5BB6", department: "\u9AD8\u4E2D\u90E8", role: "student" }
    ];
    var CATEGORIES = [
      { name: "\u5B66\u4E60\u4EA4\u6D41", slug: "study", icon: "book-open", color: "#C9A227", description: "\u5206\u4EAB\u5B66\u4E60\u5FC3\u5F97\uFF0C\u8BA8\u8BBA\u96BE\u9898\uFF0C\u4E92\u52A9\u8FDB\u6B65", sort_order: 1 },
      { name: "\u6821\u56ED\u751F\u6D3B", slug: "campus-life", icon: "school", color: "#8B2323", description: "\u8BB0\u5F55\u6821\u56ED\u65E5\u5E38\uFF0C\u5206\u4EAB\u751F\u6D3B\u70B9\u6EF4", sort_order: 2 },
      { name: "\u793E\u56E2\u6D3B\u52A8", slug: "clubs", icon: "users", color: "#BB9457", description: "\u793E\u56E2\u62DB\u65B0\u3001\u6D3B\u52A8\u901A\u77E5\u3001\u6210\u679C\u5C55\u793A", sort_order: 3 },
      { name: "\u4F53\u80B2\u7ADE\u6280", slug: "sports", icon: "trophy", color: "#DA8A2C", description: "\u8D5B\u4E8B\u8BA8\u8BBA\u3001\u8FD0\u52A8\u5065\u8EAB\u3001\u4F53\u80B2\u7CBE\u795E", sort_order: 4 },
      { name: "\u827A\u672F\u5929\u5730", slug: "arts", icon: "palette", color: "#A52A2A", description: "\u97F3\u4E50\u3001\u7F8E\u672F\u3001\u821E\u8E48\u3001\u6444\u5F71\u7B49\u827A\u672F\u5206\u4EAB", sort_order: 5 },
      { name: "\u5347\u5B66\u5C31\u4E1A", slug: "future", icon: "graduation-cap", color: "#6B1A1A", description: "\u9AD8\u8003\u5907\u8003\u3001\u5FD7\u613F\u586B\u62A5\u3001\u804C\u4E1A\u89C4\u5212", sort_order: 6 },
      { name: "\u5931\u7269\u62DB\u9886", slug: "lost-found", icon: "search", color: "#B8860B", description: "\u4E22\u5931\u7269\u54C1\u5BFB\u56DE\uFF0C\u62FE\u5230\u7269\u54C1\u5F52\u8FD8", sort_order: 7 },
      { name: "\u5EFA\u8BAE\u53CD\u9988", slug: "suggestions", icon: "lightbulb", color: "#D4AF37", description: "\u5BF9\u5B66\u6821\u548C\u8BBA\u575B\u7684\u5EFA\u8BAE\u4E0E\u53CD\u9988", sort_order: 8 }
    ];
    var SAMPLE_POSTS = [
      { user_idx: 4, cat_slug: "campus-life", title: "\u51C6\u9AD8\u4E09\u60F3\u95EE\u95EE\uFF0C\u9AD8\u4E09\u8FDE\u5468\u653E\u5047\u90A3\u5468\u80FD\u4E0D\u80FD\u5468\u4E94\u4E0B\u5348\u5C31\u56DE\u5BB6\uFF1F", content: "\u9A6C\u4E0A\u5347\u9AD8\u4E09\u4E86\uFF0C\u8FD8\u6CA1\u5F00\u5B66\uFF0C\u4F46\u542C\u5B66\u957F\u5B66\u59D0\u8BF4\u9AD8\u4E09\u4F1A\u8FDE\u5468\u4E0A\u8BFE\u3002\n\n\u610F\u601D\u662F\u8FDE\u7EED\u4E0A\u4E24\u5468\u6216\u4E09\u5468\u624D\u653E\u4E00\u6B21\u5047\uFF0C\u800C\u4E14\u653E\u5047\u90A3\u5468\u516D\u4E0B\u5348\u624D\u8BA9\u8D70\uFF0C\u5468\u65E5\u665A\u4E0A\u53C8\u8981\u56DE\u6765\u3002\n\n\u5728\u5BB6\u5F85\u4E0D\u523024\u5C0F\u65F6\uFF0C\u8FD9\u4E5F\u592A\u77ED\u4E86\u5427\uFF1F\n\n\u60F3\u95EE\u95EE\u5927\u5BB6\uFF0C\u653E\u5047\u90A3\u5468\u80FD\u4E0D\u80FD\u5468\u4E94\u4E0B\u5348\u5C31\u8BA9\u8D70\uFF1F\u591A\u5728\u5BB6\u5F85\u4E00\u665A\uFF0C\u5468\u4E00\u56DE\u6765\u72B6\u6001\u4E5F\u597D\u4E00\u4E9B\u3002\n\n\u5B66\u957F\u5B66\u59D0\u4EEC\u89C9\u5F97\u8FD9\u4E2A\u63D0\u8BAE\u5408\u7406\u5417\uFF1F\u5982\u679C\u5408\u7406\u7684\u8BDD\u6211\u60F3\u5F00\u5B66\u540E\u8DDF\u8001\u5E08\u53CD\u6620\u4E00\u4E0B\u3002", tags: ["\u9AD8\u4E09", "\u8FDE\u5468", "\u653E\u5047", "\u51C6\u9AD8\u4E09"], is_hot_post: true, poll: { question: "\u4F60\u652F\u6301\u653E\u5047\u90A3\u5468\u63D0\u524D\u5230\u5468\u4E94\u4E0B\u5348\u79BB\u6821\u5417\uFF1F", agree: 32, disagree: 8 } },
      { user_idx: 2, cat_slug: "campus-life", title: "\u98DF\u5802\u4F19\u98DF\u4E00\u822C\u822C\uFF0C\u8BF4\u8BF4\u6211\u7684\u771F\u5B9E\u611F\u53D7", content: "\u5403\u4E86\u4E00\u5B66\u671F\u4E86\uFF0C\u8BF4\u70B9\u5B9E\u8BDD\uFF1A\n\n\u4E00\u697C\u5957\u9910\uFF1A\u83DC\u54C1\u5C31\u90A3\u51E0\u6837\u8F6E\u6362\uFF0C\u7EA2\u70E7\u8089\u6709\u65F6\u5019\u80A5\u8089\u6BD4\u8089\u591A\uFF0C\u9752\u83DC\u7ECF\u5E38\u7092\u8FC7\u5934\u53D1\u9EC4\u3002\n\n\u4E8C\u697C\u98CE\u5473\uFF1A\u7CD6\u918B\u6392\u9AA8\u8FD8\u884C\u4F46\u662F\u91CF\u5C11\uFF0C\u4E00\u7897\u976212\u5757\u5C31\u90A3\u4E48\u51E0\u6839\u3002\n\n\u65E9\u9910\u8C46\u6D46\u5151\u6C34\u592A\u591A\u4E86\uFF0C\u5305\u5B50\u9985\u513F\u4E5F\u8D8A\u6765\u8D8A\u5C11\u3002\n\n\u4E0D\u662F\u8BF4\u96BE\u5403\u5230\u4E0D\u80FD\u5403\uFF0C\u5C31\u662F\u89C9\u5F97\u4F19\u98DF\u8D39\u4E00\u5B66\u671F\u4EA4\u90A3\u4E48\u591A\uFF0C\u8D28\u91CF\u80FD\u4E0D\u80FD\u63D0\u4E00\u4E0B\uFF1F", tags: ["\u98DF\u5802", "\u4F19\u98DF", "\u5410\u69FD"] },
      { user_idx: 1, cat_slug: "study", title: "\u5BFC\u6570\u538B\u8F74\u9898\u505A\u4E86\u4E00\u665A\u4E0A\u8FD8\u662F\u4E0D\u4F1A\uFF0C\u6709\u6CA1\u6709\u5927\u4F6C\u8BB2\u8BB2\u601D\u8DEF", content: "\u9898\u76EE\uFF1A\u5DF2\u77E5f(x)=lnx-ax\xB2\uFF0C\u82E5f(x)\u22640\u6052\u6210\u7ACB\uFF0C\u6C42a\u7684\u8303\u56F4\u3002\n\n\u6211\u8BD5\u7740\u5206\u79BB\u53C2\u6570\uFF0C\u4F46lnx/x\xB2\u6C42\u5BFC\u4EE5\u540E\u641E\u4E0D\u4E0B\u53BB\u4E86\u3002\u770B\u7B54\u6848\u8BF4\u8981\u7528\u5230\u6D1B\u5FC5\u8FBE\u6CD5\u5219\u4F46\u6211\u4EEC\u6CA1\u5B66\u8FC7\u3002\n\n\u6709\u6CA1\u6709\u4E0D\u8D85\u7EB2\u7684\u89E3\u6CD5\uFF1F\u6216\u8005\u6709\u8C01\u80FD\u8BB2\u8BB2\u8FD9\u4E2A\u601D\u8DEF\uFF1F", tags: ["\u6570\u5B66", "\u5BFC\u6570", "\u9AD8\u4E09"] },
      { user_idx: 4, cat_slug: "study", title: "\u5706\u9525\u66F2\u7EBF\u771F\u7684\u8981\u653E\u5F03\u4E86\uFF0C\u6BCF\u6B21\u8003\u8BD5\u90FD\u7A7A\u7740", content: "\u4ECE\u9AD8\u4E8C\u5230\u73B0\u5728\uFF0C\u5706\u9525\u66F2\u7EBF\u5927\u9898\u6CA1\u6709\u4E00\u6B21\u505A\u5B8C\u6574\u8FC7\u3002\n\n\u8054\u7ACB\u65B9\u7A0B\u7B97\u5230\u4E00\u534A\u5C31\u7B97\u9519\uFF0C\u97E6\u8FBE\u5B9A\u7406\u4EE3\u8FDB\u53BB\u4EE5\u540E\u5316\u7B80\u4E0D\u51FA\u6765\u3002\n\n\u611F\u89C9\u8FD9\u9898\u5C31\u662F\u7ED9\u5B66\u9738\u51C6\u5907\u7684\uFF0C\u666E\u901A\u5B66\u751F\u8FD8\u662F\u8001\u8001\u5B9E\u5B9E\u62FF\u524D\u9762\u7684\u5206\u5427\u3002\n\n\u6709\u6CA1\u6709\u540C\u611F\u7684\uFF1F", tags: ["\u6570\u5B66", "\u5706\u9525\u66F2\u7EBF", "\u653E\u5F03"] },
      { user_idx: 6, cat_slug: "campus-life", title: "\u56FE\u4E66\u9986\u81EA\u4E60\u5BA4\u80FD\u4E0D\u80FD\u7BA1\u7BA1\u5360\u5EA7\u7684", content: "\u6BCF\u5929\u65E9\u4E0A\u53BB\u56FE\u4E66\u9986\uFF0C\u4E00\u534A\u5EA7\u4F4D\u653E\u7740\u4E66\u6CA1\u4EBA\u3002\u6709\u4E9B\u4EBA\u4E00\u672C\u4E66\u653E\u90A3\u513F\u5360\u4E00\u5929\uFF0C\u4E0B\u5348\u624D\u6765\u3002\n\n\u80FD\u4E0D\u80FD\u8DDF\u5B66\u6821\u5EFA\u8BAE\u4E00\u4E0B\uFF0C\u8D85\u8FC730\u5206\u949F\u4E0D\u5728\u5EA7\u4F4D\u4E0A\u7684\u5C31\u7B97\u81EA\u52A8\u653E\u5F03\uFF1F\n\n\u671F\u672B\u4E86\u5927\u5BB6\u90FD\u9700\u8981\u81EA\u4E60\u4F4D\u7F6E\uFF0C\u8FD9\u6837\u592A\u4E0D\u516C\u5E73\u4E86\u3002", tags: ["\u56FE\u4E66\u9986", "\u5360\u5EA7", "\u81EA\u4E60"] },
      { user_idx: 10, cat_slug: "campus-life", title: "\u5BBF\u820D\u67E5\u8FDD\u7981\u54C1\u8D8A\u6765\u8D8A\u4E25\u4E86\uFF0C\u5C0F\u98CE\u6247\u4E5F\u88AB\u6CA1\u6536", content: "\u4E0A\u5468\u5BBF\u7BA1\u7A81\u51FB\u68C0\u67E5\uFF0C\u6211\u7684USB\u5C0F\u98CE\u6247\u88AB\u6536\u4E86\uFF0C\u8BF4\u662F\u8FDD\u7981\u7535\u5668\u3002\n\n\u5C31\u4E00\u4E2A\u5DF4\u638C\u5927\u7684\u5C0F\u98CE\u6247\uFF0C5V\u7684\uFF0C\u80FD\u6709\u4EC0\u4E48\u5B89\u5168\u9690\u60A3\uFF1F\n\n\u590F\u5929\u5BBF\u820D\u7A7A\u8C0326\u5EA6\u4EE5\u4E0A\u624D\u5F00\uFF0C\u4E0A\u94FA\u70ED\u7684\u7761\u4E0D\u7740\uFF0C\u4E0D\u5E26\u4E2A\u5C0F\u98CE\u6247\u600E\u4E48\u6D3B\uFF1F\n\n\u6709\u6CA1\u6709\u4EBA\u77E5\u9053\u54EA\u91CC\u80FD\u7533\u8BC9\u62FF\u56DE\u6765\u7684\uFF1F", tags: ["\u5BBF\u820D", "\u8FDD\u7981\u54C1", "\u5C0F\u98CE\u6247"] },
      { user_idx: 7, cat_slug: "campus-life", title: "\u4E00\u6A21\u8003\u5B8C\u5FC3\u6001\u5D29\u4E86\uFF0C\u6BD4\u6708\u8003\u9000\u6B65\u4E8650\u5206", content: "\u4E00\u6A21\u6210\u7EE9\u51FA\u6765\u4E86\uFF0C\u603B\u5206\u6BD4\u4E0A\u6B21\u6708\u8003\u9000\u4E8650\u5206\u3002\n\n\u6570\u5B66\u6700\u540E\u4E00\u9053\u5927\u9898\u5B8C\u5168\u6CA1\u601D\u8DEF\uFF0C\u82F1\u8BED\u9605\u8BFB\u7406\u89E3\u9519\u4E865\u4E2A\uFF0C\u7406\u7EFC\u65F6\u95F4\u4E0D\u591F\u6700\u540E\u4E00\u9053\u5B9E\u9A8C\u9898\u7A7A\u7740\u3002\n\n\u8D8A\u60F3\u8D8A\u614C\uFF0C\u611F\u89C9\u9AD8\u8003\u5B8C\u4E86\u3002\u6709\u6CA1\u6709\u8FC7\u6765\u4EBA\u8BF4\u8BF4\u4E00\u6A21\u548C\u9AD8\u8003\u5DEE\u8DDD\u5927\u4E0D\u5927\uFF1F", tags: ["\u4E00\u6A21", "\u5FC3\u6001", "\u9000\u6B65"] },
      { user_idx: 8, cat_slug: "campus-life", title: "\u5C0F\u5356\u90E8\u5496\u5561\u6DA8\u4EF7\u4E86\uFF0C\u4ECE5\u5757\u6DA8\u52307\u5757", content: "\u5F00\u5B66\u7684\u65F6\u5019\u96C0\u5DE2\u901F\u6EB65\u5757\u4E00\u5305\uFF0C\u8FD9\u5468\u53BB\u53D87\u5757\u4E86\u3002\n\n\u9AD8\u4E09\u515A\u6BCF\u5929\u9760\u5496\u5561\u7EED\u547D\uFF0C\u4E00\u4E2A\u6708\u591A\u82B1\u56DB\u4E94\u5341\u5757\u3002\n\n\u6709\u6CA1\u6709\u4EBA\u77E5\u9053\u5C0F\u5356\u90E8\u5B9A\u4EF7\u662F\u8C01\u7BA1\u7684\uFF1F\u80FD\u4E0D\u80FD\u63D0\u4E2A\u610F\u89C1\u3002", tags: ["\u5C0F\u5356\u90E8", "\u5496\u5561", "\u6DA8\u4EF7"] },
      { user_idx: 5, cat_slug: "future", title: "\u5F3A\u57FA\u8BA1\u5212\u5230\u5E95\u503C\u4E0D\u503C\u5F97\u62A5\uFF1F\u6709\u6CA1\u6709\u4E86\u89E3\u7684", content: "\u73ED\u4E3B\u4EFB\u5EFA\u8BAE\u6211\u62A5\u5F3A\u57FA\u8BA1\u5212\uFF0C\u8BF4\u662F\u591A\u4E00\u6B21\u673A\u4F1A\u3002\n\n\u4F46\u6211\u770B\u4E86\u4E0B\u4E13\u4E1A\u90FD\u662F\u57FA\u7840\u5B66\u79D1\uFF0C\u6570\u5B66\u3001\u7269\u7406\u3001\u5316\u5B66\u8FD9\u4E9B\uFF0C\u6211\u60F3\u5B66\u8BA1\u7B97\u673A\u3002\n\n\u5982\u679C\u9AD8\u8003\u6B63\u5E38\u53D1\u6325\u80FD\u4E0A985\u7684\u8BDD\uFF0C\u662F\u4E0D\u662F\u5C31\u4E0D\u7528\u8D70\u5F3A\u57FA\u4E86\uFF1F\n\n\u6709\u6CA1\u6709\u5B66\u957F\u5B66\u59D0\u4E86\u89E3\u7684\u7ED9\u70B9\u5EFA\u8BAE\uFF1F", tags: ["\u5F3A\u57FA\u8BA1\u5212", "\u9AD8\u8003", "\u5FD7\u613F"] },
      { user_idx: 12, cat_slug: "campus-life", title: "\u521D\u4E8C\u4F5C\u4E1A\u4E5F\u592A\u591A\u4E86\u5427\uFF0C\u5199\u523011\u70B9\u8FD8\u6CA1\u5B8C", content: "\u8BED\u6587\u4E00\u5F20\u5377\u5B50+\u4F5C\u6587\uFF0C\u6570\u5B66\u4E24\u9875\u7EC3\u4E60\u518C\uFF0C\u82F1\u8BED\u80CC50\u4E2A\u5355\u8BCD+\u5B8C\u5F62\u586B\u7A7A\uFF0C\u7269\u7406\u4E00\u5F20\u5377\u5B50\u3002\n\n\u8FD9\u8FD8\u662F\u4E00\u5929\u7684\u91CF\uFF0C\u660E\u5929\u8FD8\u6709\u3002\n\n\u624D\u521D\u4E8C\u5C31\u8FD9\u6837\uFF0C\u521D\u4E09\u600E\u4E48\u529E\uFF1F\u6709\u6CA1\u6709\u4EBA\u89C9\u5F97\u4F5C\u4E1A\u91CF\u4E0D\u5408\u7406\uFF1F", tags: ["\u521D\u4E8C", "\u4F5C\u4E1A", "\u51CF\u8D1F"] },
      { user_idx: 14, cat_slug: "clubs", title: "\u5B66\u6821\u80FD\u4E0D\u80FD\u641E\u4E2A\u52A8\u6F2B\u793E\u56E2\uFF0C\u60F3\u8BA4\u8BC6\u540C\u597D", content: "\u770B\u4E86\u4E0B\u793E\u56E2\u5217\u8868\uFF0C\u6709\u8FA9\u8BBA\u793E\u3001\u6587\u5B66\u793E\u3001\u822A\u6A21\u793E\uFF0C\u5C31\u662F\u6CA1\u6709\u52A8\u6F2B\u793E\u3002\n\n\u559C\u6B22\u770B\u756A\u7684\u540C\u5B66\u5176\u5B9E\u633A\u591A\u7684\uFF0C\u8BFE\u95F4\u8BA8\u8BBA\u7684\u4E5F\u4E0D\u5C11\u3002\n\n\u80FD\u4E0D\u80FD\u8DDF\u5B66\u6821\u7533\u8BF7\u4E00\u4E2A\uFF1F\u5927\u5BB6\u89C9\u5F97\u6709\u5FC5\u8981\u5417\uFF1F", tags: ["\u52A8\u6F2B\u793E", "\u793E\u56E2", "\u7533\u8BF7"] },
      { user_idx: 32, cat_slug: "future", title: "\u96C5\u601D\u7B2C\u4E09\u6B21\u8003\u4E866.0\uFF0C\u53E3\u8BED\u8FD8\u662F\u4E0A\u4E0D\u53BB", content: "\u542C\u529B7.0\u9605\u8BFB7.0\u5199\u4F5C6.0\uFF0C\u53E3\u8BED5.0\u62D6\u540E\u817F\u3002\n\n\u6BCF\u6B21\u8003\u5B98\u95EE\u95EE\u9898\u6211\u8111\u5B50\u91CC\u5C31\u7A7A\u767D\uFF0C\u51C6\u5907\u7684\u7D20\u6750\u4E00\u4E2A\u90FD\u7528\u4E0D\u4E0A\u3002\n\n\u6709\u6CA1\u6709\u53E3\u8BED\u4E0A7\u7684\u5927\u4F6C\u5206\u4EAB\u4E0B\u7ECF\u9A8C\uFF1F\u8981\u4E0D\u8981\u62A5\u4E2A\u4E00\u5BF9\u4E00\uFF1F", tags: ["\u96C5\u601D", "\u53E3\u8BED", "\u56FD\u9645\u90E8"] },
      { user_idx: 36, cat_slug: "study", title: "\u770B\u5230\u540C\u5B66\u4EEC\u5410\u69FD\u8FDE\u5468\u4E0A\u5B66\uFF0C\u4F5C\u4E3A\u8001\u5E08\u8BF4\u4E24\u53E5", content: "\u770B\u5230\u6709\u540C\u5B66\u53D1\u5E16\u8BF4\u8FDE\u5468\u8F9B\u82E6\uFF0C\u7406\u89E3\u5927\u5BB6\u7684\u611F\u53D7\u3002\n\n\u4F46\u8BF4\u4E00\u4E0B\u5B66\u6821\u7684\u89D2\u5EA6\uFF1A\u9AD8\u4E09\u51B2\u523A\u9636\u6BB5\uFF0C\u8FDE\u7EED\u5B66\u4E60\u786E\u5B9E\u6709\u52A9\u4E8E\u4FDD\u6301\u8282\u594F\u3002\u5982\u679C\u9891\u7E41\u653E\u5047\uFF0C\u5F88\u591A\u540C\u5B66\u56DE\u5BB6\u4EE5\u540E\u5B66\u4E60\u72B6\u6001\u4F1A\u65AD\u6389\u3002\n\n\u5F53\u7136\u4E5F\u4E0D\u662F\u4E0D\u80FD\u5546\u91CF\uFF0C\u5982\u679C\u5927\u5BB6\u6709\u5408\u7406\u5EFA\u8BAE\u53EF\u4EE5\u8D70\u5EFA\u8BAE\u53CD\u9988\u6E20\u9053\uFF0C\u5B66\u6821\u4F1A\u8003\u8651\u7684\u3002", tags: ["\u8001\u5E08", "\u8FDE\u5468", "\u56DE\u5E94"] },
      { user_idx: 13, cat_slug: "sports", title: "\u7BEE\u7403\u573A\u80FD\u4E0D\u80FD\u5EF6\u957F\u5F00\u653E\u65F6\u95F4\uFF0C\u665A\u81EA\u4E60\u524D\u6839\u672C\u62A2\u4E0D\u5230", content: "\u7BEE\u7403\u573A5\u70B9\u534A\u5F00\u653E6\u70B9\u534A\u5173\u95ED\uFF0C\u4E2D\u95F4\u5C31\u4E00\u4E2A\u5C0F\u65F6\u3002\n\n\u521D\u4E8C\u665A\u81EA\u4E606\u70B940\uFF0C\u6253\u4E0D\u4E86\u51E0\u5206\u949F\u5C31\u5F97\u8D70\u3002\n\n\u80FD\u4E0D\u80FD\u8DDF\u5B66\u6821\u8BF4\u8BF4\u5EF6\u957F\u52306\u70B920\uFF1F\u591A\u625320\u5206\u949F\u4E5F\u597D\u554A\u3002", tags: ["\u7BEE\u7403\u573A", "\u5F00\u653E\u65F6\u95F4", "\u4F53\u80B2"] },
      { user_idx: 46, cat_slug: "lost-found", title: "\u5728\u7BEE\u7403\u573A\u6361\u5230\u4E00\u526F\u9ED1\u8272\u534A\u6846\u773C\u955C", content: "\u4ECA\u5929\u4E0B\u5348\u5728\u7BEE\u7403\u573A\u8FB9\u6361\u5230\u4E00\u526F\u9ED1\u8272\u534A\u6846\u773C\u955C\uFF0C\u5EA6\u6570\u633A\u9AD8\u7684\u3002\n\n\u653E\u5728\u95E8\u536B\u5BA4\u4E86\uFF0C\u4E22\u7684\u540C\u5B66\u53BB\u62FF\u5C31\u884C\u3002", tags: ["\u5931\u7269\u62DB\u9886", "\u773C\u955C"] },
      { user_idx: 9, cat_slug: "study", title: "\u80CC\u5355\u8BCD\u7528APP\u8FD8\u662F\u7EB8\u8D28\u4E66\uFF1F\u8BD5\u4E86\u4E00\u4E2A\u6708\u8BF4\u8BF4\u6548\u679C", content: "\u4E4B\u524D\u4E00\u76F4\u7528\u767E\u8BCD\u65A9\uFF0C\u6BCF\u5929\u5237100\u4E2A\uFF0C\u4F46\u611F\u89C9\u8BB0\u4E0D\u4F4F\u3002\n\n\u8FD9\u4E2A\u6708\u6539\u7528\u7EB8\u8D28\u8BCD\u6C47\u4E66+\u827E\u5BBE\u6D69\u65AF\u8BB0\u5FC6\u6CD5\uFF0C\u6BCF\u592930\u4E2A\u4F46\u53CD\u590D\u590D\u4E60\u3002\n\n\u6548\u679C\u660E\u663E\u597D\u5F88\u591A\uFF0C\u505A\u9605\u8BFB\u7684\u65F6\u5019\u80FD\u8BA4\u51FA\u6765\u7684\u8BCD\u591A\u4E86\u3002\n\n\u4E2A\u4EBA\u611F\u89C9APP\u9002\u5408\u5FEB\u901F\u8FC7\u4E00\u904D\uFF0C\u771F\u6B63\u8BB0\u4F4F\u8FD8\u662F\u5F97\u9760\u53CD\u590D\u770B\u7EB8\u8D28\u4E66\u3002", tags: ["\u80CC\u5355\u8BCD", "\u82F1\u8BED", "\u65B9\u6CD5"] },
      { user_idx: 49, cat_slug: "campus-life", title: "\u5B66\u6821\u95E8\u53E3\u6587\u5177\u5E97\u6BD4\u7F51\u4E0A\u8D35\u597D\u591A\uFF0C\u5927\u5BB6\u90FD\u5728\u54EA\u4E70", content: "\u540C\u6837\u7684\u6591\u9A6C\u4E2D\u6027\u7B14\uFF0C\u95E8\u53E3\u6587\u5177\u5E978\u5757\uFF0C\u7F51\u4E0A4\u57575\u3002\n\n\u7B14\u8BB0\u672C\u4E5F\u8D35\uFF0C\u4E00\u672C\u666E\u901AB5\u672C\u5B50\u95E8\u53E312\u5757\uFF0C\u62FC\u591A\u591A6\u5757\u5305\u90AE\u3002\n\n\u4F46\u7F51\u4E0A\u4E70\u8981\u7B492-3\u5929\uFF0C\u6025\u7528\u7684\u65F6\u5019\u53EA\u80FD\u95E8\u53E3\u4E70\u3002\n\n\u5927\u5BB6\u6709\u6CA1\u6709\u4EC0\u4E48\u597D\u7684\u8D2D\u4E70\u6E20\u9053\u63A8\u8350\uFF1F", tags: ["\u6587\u5177", "\u4EF7\u683C", "\u8D2D\u7269"] },
      { user_idx: 48, cat_slug: "campus-life", title: "\u5BBF\u820D\u7A7A\u8C03\u80FD\u4E0D\u80FD\u7EDF\u4E00\u8C03\u523025\u5EA6\uFF0C\u4E0A\u94FA\u5FEB\u70ED\u6B7B\u4E86", content: "\u5BBF\u820D\u7A7A\u8C03\u9065\u63A7\u5668\u5728\u5BBF\u7BA1\u90A3\u91CC\uFF0C\u7EDF\u4E00\u8BBE\u768427\u5EA6\u3002\n\n\u4E0B\u94FA\u8FD8\u884C\uFF0C\u4E0A\u94FA\u79BB\u5929\u82B1\u677F\u8FD1\uFF0C\u70ED\u5F97\u8DDF\u84B8\u7B3C\u4E00\u6837\u3002\n\n\u80FD\u4E0D\u80FD\u8C03\u523025\u5EA6\uFF1F\u6216\u8005\u81F3\u5C1126\u5EA6\uFF1F27\u5EA6\u771F\u7684\u592A\u70ED\u4E86\u3002\n\n\u4F4F\u8FC7\u4E0A\u94FA\u7684\u90FD\u61C2\u8FD9\u79CD\u611F\u89C9\u3002", tags: ["\u5BBF\u820D", "\u7A7A\u8C03", "\u6E29\u5EA6"] },
      { user_idx: 42, cat_slug: "campus-life", title: "\u8FD0\u52A8\u4F1A\u4ECA\u5E74\u80FD\u4E0D\u80FD\u641E\u4E2A\u8DA3\u5473\u9879\u76EE\u591A\u4E00\u4E9B\u7684", content: "\u53BB\u5E74\u8FD0\u52A8\u4F1A\u5C31\u8DD1\u6B65\u8DF3\u8FDC\u94C5\u7403\uFF0C\u5927\u90E8\u5206\u540C\u5B66\u90FD\u53EA\u80FD\u770B\u7740\u3002\n\n\u80FD\u4E0D\u80FD\u52A0\u70B9\u8DA3\u5473\u9879\u76EE\uFF1F\u6BD4\u5982\u4E24\u4EBA\u4E09\u8DB3\u3001\u62D4\u6CB3\u3001\u4E22\u6C99\u5305\u4E4B\u7C7B\u7684\uFF0C\u53C2\u4E0E\u5EA6\u9AD8\u4E00\u70B9\u3002\n\n\u4E0D\u7231\u8FD0\u52A8\u7684\u540C\u5B66\u4E5F\u60F3\u53C2\u52A0\u8FD0\u52A8\u4F1A\u554A\u3002", tags: ["\u8FD0\u52A8\u4F1A", "\u8DA3\u5473\u9879\u76EE", "\u5EFA\u8BAE"] },
      { user_idx: 20, cat_slug: "campus-life", title: "\u6691\u5047\u5FEB\u7ED3\u675F\u4E86\uFF0C\u4F5C\u4E1A\u8FD8\u6709\u4E00\u5927\u534A\u6CA1\u5199\u600E\u4E48\u529E", content: "\u5982\u9898\uFF0C\u653E\u5047\u524D\u4FE1\u8A93\u65E6\u65E6\u8981\u597D\u597D\u5B66\u4E60\uFF0C\u7ED3\u679C\u5929\u5929\u6253\u6E38\u620F\u7761\u5230\u4E2D\u5348\u3002\n\n\u73B0\u5728\u8FD8\u5269\u4E24\u5468\uFF0C\u6570\u5B66\u5377\u5B50\u6CA1\u5199\uFF0C\u82F1\u8BED\u9605\u8BFB\u6CA1\u505A\uFF0C\u7269\u7406\u7EC3\u4E60\u518C\u7A7A\u767D\u3002\n\n\u6709\u6CA1\u6709\u4EBA\u8DDF\u6211\u4E00\u6837\u7684\uFF1F\u5927\u5BB6\u90FD\u662F\u600E\u4E48\u8865\u4F5C\u4E1A\u7684\uFF1F\n\n\u6025\u6025\u6025\uFF0C\u5728\u7EBF\u7B49\uFF01", tags: ["\u6691\u5047", "\u4F5C\u4E1A", "\u8865\u4F5C\u4E1A"] },
      { user_idx: 11, cat_slug: "campus-life", title: "\u63A8\u8350\u51E0\u6B3E\u5BBF\u820D\u795E\u5668\uFF0C\u4EB2\u6D4B\u597D\u7528", content: "\u4F4F\u6821\u4E09\u5E74\u4E86\uFF0C\u5206\u4EAB\u51E0\u4E2A\u6211\u89C9\u5F97\u7279\u522B\u597D\u7528\u7684\u5BBF\u820D\u795E\u5668\uFF1A\n\n1. \u5E8A\u8FB9\u6302\u7BEE\uFF1A\u653E\u624B\u673A\u3001\u773C\u955C\u3001\u8033\u673A\uFF0C\u4E0D\u7528\u5F2F\u8170\u62FF\u4E1C\u897F\n2. \u906E\u5149\u5E8A\u5E18\uFF1A\u5348\u4F11\u4E0D\u88AB\u5149\u7EBF\u5F71\u54CD\uFF0C\u9690\u79C1\u611F\u62C9\u6EE1\n3. USB\u5C0F\u98CE\u6247\uFF1A\u590F\u5929\u7EED\u547D\u795E\u5668\uFF08\u6CE8\u610F\u522B\u88AB\u6CA1\u6536\uFF09\n4. \u6298\u53E0\u6536\u7EB3\u7BB1\uFF1A\u653E\u6362\u5B63\u8863\u670D\uFF0C\u7701\u7A7A\u95F4\n5. \u7761\u7720\u8033\u585E\uFF1A\u820D\u53CB\u6253\u547C\u565C\u4E5F\u4E0D\u6015\n\n\u5927\u5BB6\u8FD8\u6709\u4EC0\u4E48\u597D\u7269\u63A8\u8350\u5417\uFF1F", tags: ["\u5BBF\u820D", "\u597D\u7269", "\u63A8\u8350"] },
      { user_idx: 22, cat_slug: "study", title: "\u5C0F\u5B66\u4E94\u5E74\u7EA7\u6570\u5B66\u5E94\u7528\u9898\u592A\u96BE\u4E86\uFF0C\u6709\u6CA1\u6709\u7B80\u5355\u7684\u89E3\u9898\u65B9\u6CD5", content: "\u59B9\u59B9\u4ECA\u5E74\u4E94\u5E74\u7EA7\uFF0C\u5E94\u7528\u9898\u603B\u662F\u505A\u4E0D\u51FA\u6765\uFF0C\u7279\u522B\u662F\u884C\u7A0B\u95EE\u9898\u548C\u5DE5\u7A0B\u95EE\u9898\u3002\n\n\u6BD4\u5982\uFF1A\u7532\u4E59\u4E24\u4EBA\u4ECEAB\u4E24\u5730\u76F8\u5411\u800C\u884C...\u8FD9\u79CD\u9898\u5979\u4E00\u770B\u5230\u5C31\u61F5\u3002\n\n\u6709\u6CA1\u6709\u9002\u5408\u5C0F\u5B66\u751F\u7406\u89E3\u7684\u89E3\u9898\u6280\u5DE7\uFF1F\u6216\u8005\u63A8\u8350\u4EC0\u4E48\u7EC3\u4E60\u518C\uFF1F\n\n\u4F5C\u4E3A\u54E5\u54E5\u60F3\u5E2E\u5979\u4F46\u4E0D\u77E5\u9053\u600E\u4E48\u6559\u3002", tags: ["\u5C0F\u5B66", "\u6570\u5B66", "\u5E94\u7528\u9898"] },
      { user_idx: 33, cat_slug: "campus-life", title: "\u56FD\u9645\u90E8AP\u8003\u8BD5\u51FA\u5206\u4E86\uFF0C\u5206\u4EAB\u4E0B\u6211\u7684\u7ECF\u9A8C", content: "\u4ECA\u5E74\u8003\u4E86\u5FAE\u79EF\u5206BC\u3001\u7269\u7406C\u529B\u5B66\u3001\u5B8F\u89C2\u7ECF\u6D4E\u4E09\u95E8\uFF0C\u90FD\u662F5\u5206\u3002\n\n\u5206\u4EAB\u51E0\u70B9\u7ECF\u9A8C\uFF1A\n1. \u5FAE\u79EF\u5206BC\u91CD\u70B9\u7EC3FRQ\uFF0C\u9009\u62E9\u9898\u5237Barron\u5C31\u591F\u4E86\n2. \u7269\u7406C\u529B\u5B66\u628A\u516C\u5F0F\u63A8\u5BFC\u5F04\u61C2\uFF0C\u4E0D\u7528\u6B7B\u8BB0\n3. \u5B8F\u89C2\u7ECF\u6D4E\u7406\u89E3AD-AS\u6A21\u578B\uFF0C\u5176\u4ED6\u90FD\u662F\u5EF6\u4F38\n\n\u6709\u60F3\u8003AP\u7684\u540C\u5B66\u53EF\u4EE5\u95EE\u6211\uFF0C\u77E5\u65E0\u4E0D\u8A00\uFF01", tags: ["AP", "\u56FD\u9645\u90E8", "\u7ECF\u9A8C"] },
      { user_idx: 8, cat_slug: "campus-life", title: "\u5B66\u6821\u5C0F\u5356\u90E8\u65B0\u8FDB\u4E86\u51E0\u6B3E\u96F6\u98DF\uFF0C\u6D4B\u8BC4\u4E00\u4E0B", content: "\u4ECA\u5929\u53BB\u5C0F\u5356\u90E8\u53D1\u73B0\u591A\u4E86\u51E0\u79CD\u65B0\u96F6\u98DF\uFF0C\u4E70\u6765\u8BD5\u8BD5\uFF1A\n\n\u536B\u9F99\u9B54\u828B\u723D\uFF1A\u8FA3\u5EA6\u521A\u597D\uFF0C3\u5757\u4E00\u5305\u6027\u4EF7\u6BD4\u9AD8\n\n\u65FA\u65FA\u4ED9\u8D1D\uFF1A\u7ECF\u5178\u8001\u6B3E\uFF0C\u4F46\u6BD4\u5916\u9762\u8D351\u5757\n\n\u8FDB\u53E3\u85AF\u7247\uFF1A12\u5757\u4E00\u7B52\uFF0C\u6709\u70B9\u8D35\u4F46\u5473\u9053\u786E\u5B9E\u597D\n\n\u603B\u7ED3\uFF1A\u9B54\u828B\u723D\u63A8\u8350\uFF0C\u5176\u4ED6\u770B\u4E2A\u4EBA\u559C\u597D\u3002\n\n\u5927\u5BB6\u8FD8\u6709\u4EC0\u4E48\u5C0F\u5356\u90E8\u597D\u7269\u63A8\u8350\u5417\uFF1F", tags: ["\u5C0F\u5356\u90E8", "\u96F6\u98DF", "\u6D4B\u8BC4"] }
    ];
    var SAMPLE_COMMENTS = [
      { post_idx: 0, user_idx: 1, content: "\u592A\u771F\u5B9E\u4E86\uFF0C\u5468\u4E94\u4E0B\u5348\u8BA9\u8D70\u591A\u597D\uFF0C\u591A\u7761\u4E00\u665A\u7B2C\u4E8C\u5929\u72B6\u6001\u5B8C\u5168\u4E0D\u4E00\u6837" },
      { post_idx: 0, user_idx: 2, content: "\u8BA4\u540C+1\uFF0C\u5468\u516D\u4E0A\u5348\u4E0A\u8BFE\u6548\u7387\u4F4E\u5F97\u8981\u547D\uFF0C\u5927\u5BB6\u90FD\u5728\u5012\u6570\u653E\u5047" },
      { post_idx: 0, user_idx: 4, content: "\u5176\u5B9E\u5B66\u6821\u4E5F\u662F\u4E3A\u4E86\u6211\u4EEC\u597D\uFF0C\u4F46\u65B9\u5F0F\u53EF\u4EE5\u6539\u6539" },
      { post_idx: 0, user_idx: 5, content: "\u56DE\u5BB6\u4E5F\u5C31\u7761\u4E00\u89C9\uFF0C\u4E0D\u5982\u5728\u5B66\u6821\u591A\u5237\u4E24\u5957\u9898" },
      { post_idx: 0, user_idx: 6, content: "\u697C\u4E0A\u4F60\u662F\u5377\u738B\u5427\uFF0C\u6B63\u5E38\u4EBA\u90FD\u60F3\u591A\u56DE\u5BB6\u5F85\u4F1A\u513F" },
      { post_idx: 0, user_idx: 7, content: "\u8FDE\u5468\u7B2C\u4E09\u5468\u4E86\uFF0C\u6211\u611F\u89C9\u6211\u5FEB\u6291\u90C1\u4E86\uFF0C\u6BCF\u5929\u5C31\u662F\u505A\u9898\u505A\u9898\u505A\u9898" },
      { post_idx: 0, user_idx: 8, content: "\u652F\u6301\u697C\u4E3B\uFF0C\u5DF2\u6295\u7968" },
      { post_idx: 0, user_idx: 9, content: "\u5173\u952E\u4E0D\u662F\u56DE\u5BB6\u4E0D\u56DE\u5BB6\u7684\u95EE\u9898\uFF0C\u662F\u8FDE\u5468\u8FDE\u592A\u4E45\u6CA1\u6709\u7F13\u51B2\u671F" },
      { post_idx: 0, user_idx: 10, content: "\u4E0A\u6B21\u8DDF\u73ED\u4E3B\u4EFB\u53CD\u6620\u4E86\uFF0C\u8BF4\u662F\u5E74\u7EA7\u7EDF\u4E00\u5B89\u6392\uFF0C\u6539\u4E0D\u4E86" },
      { post_idx: 0, user_idx: 11, content: "\u5EFA\u8BAE\u8D70\u5EFA\u8BAE\u53CD\u9988\u6E20\u9053\u6B63\u5F0F\u63D0\uFF0C\u5149\u5728\u8BBA\u575B\u8BF4\u6CA1\u7528" },
      { post_idx: 0, user_idx: 12, content: "\u521D\u4E09\u4E5F\u8FDE\u5468\uFF0C\u4F46\u53EA\u6709\u4E24\u5468\uFF0C\u9AD8\u4E09\u4E09\u5468\u786E\u5B9E\u591A\u4E86" },
      { post_idx: 0, user_idx: 13, content: "\u5728\u5BB624\u5C0F\u65F6\u786E\u5B9E\u592A\u77ED\u4E86\uFF0C\u5149\u8DEF\u4E0A\u5C31\u82B1\u4E86\u4E24\u4E09\u4E2A\u5C0F\u65F6" },
      { post_idx: 0, user_idx: 14, content: "\u6211\u4EEC\u56FD\u9645\u90E8\u4E0D\u8FDE\u5468\uFF0C\u4F46\u770B\u4F60\u4EEC\u8FD9\u6837\u4E5F\u633A\u60E8\u7684" },
      { post_idx: 0, user_idx: 15, content: "\u5176\u5B9E\u6700\u75DB\u82E6\u7684\u662F\u653E\u5047\u90A3\u5468\u516D\u4E0A\u5348\u8FD8\u8981\u8003\u8BD5" },
      { post_idx: 0, user_idx: 16, content: "\u8003\u5B8C\u8BD5\u4E0B\u5348\u8D70\uFF0C\u5230\u5BB6\u5929\u90FD\u9ED1\u4E86\uFF0C\u7B2C\u4E8C\u5929\u4E0B\u5348\u53C8\u8981\u56DE\u6765" },
      { post_idx: 0, user_idx: 17, content: "\u6295\u4E86\u8BA4\u540C\uFF0C\u867D\u7136\u6211\u89C9\u5F97\u63D0\u4E86\u4E5F\u6CA1\u7528" },
      { post_idx: 0, user_idx: 18, content: "\u53BB\u5E74\u4E5F\u662F\u8FD9\u6837\uFF0C\u63D0\u4E86\u4E00\u5B66\u671F\u4E5F\u6CA1\u6539" },
      { post_idx: 0, user_idx: 19, content: "\u652F\u6301\u652F\u6301\u652F\u6301\uFF0C\u8FDE\u5468\u592A\u6298\u78E8\u4EBA\u4E86" },
      { post_idx: 0, user_idx: 20, content: "\u5C0F\u5B66\u90E8\u8DEF\u8FC7\uFF0C\u4F60\u4EEC\u597D\u8F9B\u82E6" },
      { post_idx: 0, user_idx: 21, content: "\u7B49\u9AD8\u8003\u5B8C\u5C31\u597D\u4E86\uFF0C\u518D\u575A\u6301\u575A\u6301" },
      { post_idx: 0, user_idx: 22, content: "\u575A\u6301\u4E2A\u9B3C\uFF0C\u8BE5\u63D0\u610F\u89C1\u5C31\u63D0\uFF0C\u8EAB\u4F53\u6700\u91CD\u8981" },
      { post_idx: 0, user_idx: 23, content: "\u6211\u4EEC\u73ED\u597D\u51E0\u4E2A\u540C\u5B66\u751F\u75C5\u4E86\uFF0C\u5C31\u662F\u8FDE\u5468\u7D2F\u7684" },
      { post_idx: 0, user_idx: 24, content: "\u5468\u4E94\u4E0B\u5348\u8D70\u7684\u8BDD\uFF0C\u5468\u516D\u4E0A\u5348\u7684\u8BFE\u600E\u4E48\u529E\uFF1F\u8865\u4E0D\u8865\uFF1F" },
      { post_idx: 0, user_idx: 25, content: "\u53EF\u4EE5\u5468\u516D\u4E0A\u5348\u7528\u6765\u81EA\u4E60\uFF0C\u4E0D\u5B89\u6392\u65B0\u8BFE\uFF0C\u613F\u610F\u8D70\u7684\u8D70" },
      { post_idx: 0, user_idx: 26, content: "\u8FD9\u4E2A\u65B9\u6848\u597D\uFF0C\u81EA\u4E3B\u9009\u62E9" },
      { post_idx: 0, user_idx: 27, content: "\u4F46\u8001\u5E08\u4F1A\u8BF4\u4E0D\u7EDF\u4E00\u5B89\u6392\u4F1A\u5F71\u54CD\u6559\u5B66\u8FDB\u5EA6" },
      { post_idx: 0, user_idx: 28, content: "\u8FDB\u5EA6\u8FDB\u5EA6\u8FDB\u5EA6\uFF0C\u5929\u5929\u8FDB\u5EA6\uFF0C\u5B66\u8FDB\u53BB\u624D\u7B97\u6570\u554A" },
      { post_idx: 0, user_idx: 29, content: "\u6295\u4E86\u8BA4\u540C\uFF0C\u5E0C\u671B\u5B66\u6821\u80FD\u770B\u5230\u8FD9\u4E2A\u5E16\u5B50" },
      { post_idx: 0, user_idx: 30, content: "\u5DF2\u8F6C\u53D1\u5230\u73ED\u7FA4\u8BA9\u5927\u5BB6\u6765\u6295" },
      { post_idx: 0, user_idx: 31, content: "85%\u8BA4\u540C\u4E86\u5427\uFF0C\u5E0C\u671B\u6821\u9886\u5BFC\u91CD\u89C6" },
      { post_idx: 0, user_idx: 40, content: "\u540C\u611F\uFF0C\u6BCF\u6B21\u653E\u5047\u5728\u5BB6\u4E0D\u5230\u4E00\u5929\u53C8\u8981\u6536\u62FE\u4E1C\u897F\u56DE\u6765" },
      { post_idx: 0, user_idx: 47, content: "\u8BF4\u5B9E\u8BDD\u8FDE\u5468\u6700\u5927\u7684\u95EE\u9898\u662F\u7761\u7720\u4E0D\u8DB3\uFF0C\u4E0A\u8BFE\u6253\u778C\u7761\u7684\u8D8A\u6765\u8D8A\u591A" },
      { post_idx: 0, user_idx: 36, content: "\u770B\u5230\u5927\u5BB6\u7684\u53CD\u9988\u4E86\uFF0C\u6211\u4F1A\u8DDF\u5E74\u7EA7\u7EC4\u53CD\u6620\u8FD9\u4E2A\u95EE\u9898\uFF0C\u611F\u8C22\u540C\u5B66\u4EEC\u7684\u5408\u7406\u8868\u8FBE" },
      { post_idx: 0, user_idx: 37, content: "\u4F5C\u4E3A\u73ED\u4E3B\u4EFB\u4E5F\u7406\u89E3\u540C\u5B66\u4EEC\u7684\u8F9B\u82E6\uFF0C\u6211\u4F1A\u5E2E\u5FD9\u6C9F\u901A" },
      { post_idx: 1, user_idx: 3, content: "\u7EA2\u70E7\u8089\u786E\u5B9E\u80A5\u8089\u591A\uFF0C\u4E0A\u6B21\u5403\u4E86\u4E00\u5757\u5168\u662F\u80A5\u7684" },
      { post_idx: 1, user_idx: 4, content: "\u65E9\u9910\u8C46\u6D46\u771F\u7684\u662F\u5151\u6C34\u5151\u5230\u6CA1\u5473\u4E86" },
      { post_idx: 1, user_idx: 5, content: "\u4E8C\u697C\u9762\u786E\u5B9E\u5C11\uFF0C\u4F46\u5473\u9053\u8FD8\u884C\u5427" },
      { post_idx: 1, user_idx: 6, content: "\u6211\u89C9\u5F97\u4E00\u697C\u5957\u9910\u6027\u4EF7\u6BD4\u8FD8\u884C\uFF0C\u4E0D\u80FD\u8981\u6C42\u592A\u9AD8" },
      { post_idx: 1, user_idx: 37, content: "\u98DF\u5802\u95EE\u9898\u4F1A\u53CD\u9988\u7ED9\u540E\u52E4\uFF0C\u611F\u8C22\u540C\u5B66\u7684\u5177\u4F53\u53CD\u9988" },
      { post_idx: 2, user_idx: 5, content: "\u5206\u79BB\u53C2\u6570\u6CD5\u8981\u6CE8\u610Fx\u7684\u8303\u56F4\uFF0Cx>0" },
      { post_idx: 2, user_idx: 4, content: "\u540C\u4E0D\u4F1A\uFF0C\u5BFC\u6570\u5927\u9898\u592A\u53D8\u6001\u4E86" },
      { post_idx: 2, user_idx: 10, content: "\u53EF\u4EE5\u7528\u7AEF\u70B9\u6548\u5E94\u8BD5\u8BD5\uFF0Cf(1)=0\u8FD9\u4E2A\u70B9\u5F88\u5173\u952E" },
      { post_idx: 3, user_idx: 7, content: "\u5706\u9525\u66F2\u7EBF\u6211\u653E\u5F03\u4E86\uFF0C\u65F6\u95F4\u82B1\u5728\u5BFC\u6570\u4E0A\u66F4\u5212\u7B97" },
      { post_idx: 3, user_idx: 9, content: "\u8054\u7ACB\u65B9\u7A0B\u7528\u97E6\u8FBE\u5B9A\u7406\u4EE5\u540E\u522B\u6025\u7740\u5C55\u5F00\uFF0C\u5148\u6574\u4F53\u4EE3\u6362" },
      { post_idx: 4, user_idx: 1, content: "\u5360\u5EA7\u592A\u70E6\u4E86\uFF0C\u5EFA\u8BAE\u626B\u7801\u7B7E\u5230\uFF0C\u79BB\u5F00\u8D8530\u5206\u949F\u81EA\u52A8\u91CA\u653E" },
      { post_idx: 4, user_idx: 6, content: "\u53BB\u6559\u5B66\u697C\u7A7A\u6559\u5BA4\u5427\uFF0C\u56FE\u4E66\u9986\u53C8\u70ED\u53C8\u6324" },
      { post_idx: 5, user_idx: 2, content: "\u6211\u7684\u4E5F\u88AB\u6536\u8FC7\uFF0C\u627E\u73ED\u4E3B\u4EFB\u7B7E\u5B57\u5C31\u80FD\u62FF\u56DE\u6765" },
      { post_idx: 5, user_idx: 8, content: "\u4E70\u90A3\u79CD\u5145\u7535\u5F0F\u7684\u5C0F\u98CE\u6247\uFF0C\u4E0D\u5E26\u7EBF\u7684\u5C31\u4E0D\u7B97\u8FDD\u7981" },
      { post_idx: 6, user_idx: 3, content: "\u4E00\u6A21\u672C\u6765\u5C31\u662F\u4E3A\u4E86\u66B4\u9732\u95EE\u9898\u7684\uFF0C\u522B\u592A\u7070\u5FC3" },
      { post_idx: 6, user_idx: 11, content: "\u6211\u4E00\u6A21\u6BD4\u9AD8\u8003\u4F4E\u4E8680\u5206\uFF0C\u6700\u540E\u9AD8\u8003\u8D85\u5E38\u53D1\u6325\u4E86" },
      { post_idx: 6, user_idx: 36, content: "\u4E00\u6A21\u96BE\u5EA6\u901A\u5E38\u9AD8\u4E8E\u9AD8\u8003\uFF0C\u67E5\u6F0F\u8865\u7F3A\u624D\u662F\u5173\u952E\uFF0C\u522B\u76EF\u7740\u5206\u6570" },
      { post_idx: 7, user_idx: 9, content: "7\u5757\u4E5F\u592A\u8D35\u4E86\uFF0C\u6211\u4ECE\u7F51\u4E0A\u4E70\u4E86\u4E00\u7BB1\u653E\u5BBF\u820D" },
      { post_idx: 7, user_idx: 10, content: "\u5C0F\u5356\u90E8\u79DF\u91D1\u8D35\uFF0C\u6DA8\u4EF7\u4E5F\u6B63\u5E38\u5427" },
      { post_idx: 8, user_idx: 5, content: "\u5F3A\u57FA\u5F55\u53D6\u4E86\u5C31\u4E0D\u80FD\u8F6C\u4E13\u4E1A\uFF0C\u60F3\u5B66\u8BA1\u7B97\u673A\u7684\u8BDD\u614E\u91CD\u8003\u8651" },
      { post_idx: 8, user_idx: 11, content: "\u5F53\u4FDD\u5E95\u53EF\u4EE5\uFF0C\u4F46\u522B\u62B1\u592A\u5927\u671F\u671B" },
      { post_idx: 9, user_idx: 13, content: "\u521D\u4E8C\u8FD8\u597D\uFF0C\u521D\u4E09\u66F4\u6050\u6016" },
      { post_idx: 9, user_idx: 15, content: "\u8BED\u6587\u4F5C\u4E1A\u6700\u6D6A\u8D39\u65F6\u95F4\uFF0C\u6284\u5199\u751F\u8BCD\u8FD9\u79CD\u6BEB\u65E0\u610F\u4E49" },
      { post_idx: 10, user_idx: 14, content: "\u652F\u6301\uFF01\u6211\u4E5F\u60F3\u52A0\u52A8\u6F2B\u793E" },
      { post_idx: 10, user_idx: 18, content: "\u5B66\u6821\u5927\u6982\u7387\u4E0D\u4F1A\u6279\uFF0C\u4E4B\u524D\u6709\u4EBA\u63D0\u8FC7" },
      { post_idx: 11, user_idx: 33, content: "\u53E3\u8BED\u5EFA\u8BAE\u627E\u5916\u6559\u591A\u7EC3\uFF0C\u6216\u8005\u8DDF\u540C\u5B66\u7528\u82F1\u8BED\u5BF9\u8BDD" },
      { post_idx: 11, user_idx: 35, content: "P2\u9898\u5E93\u5237\u5B8C\u53E3\u8BED\u80FD\u4E0A6.5\uFF0C\u63A8\u8350\u8BD5\u8BD5" },
      { post_idx: 12, user_idx: 1, content: "\u8C22\u8C22\u8001\u5E08\u7406\u89E3\uFF0C\u5E0C\u671B\u771F\u7684\u80FD\u6539\u6539" },
      { post_idx: 12, user_idx: 7, content: "\u8001\u5E08\u8BF4\u5F97\u5BF9\uFF0C\u4F46\u8FDE\u5468\u786E\u5B9E\u592A\u957F\u4E86" },
      { post_idx: 13, user_idx: 11, content: "5\u70B9\u534A\u52306\u70B9\u534A\u786E\u5B9E\u592A\u77ED\u4E86" },
      { post_idx: 13, user_idx: 12, content: "\u53EF\u4EE5\u4E2D\u5348\u53BB\u6253\uFF0C\u4E2D\u5348\u4EBA\u5C11" },
      { post_idx: 14, user_idx: 46, content: "\u8C22\u8C22\u697C\u4E3B\uFF0C\u662F\u6211\u7684\u773C\u955C" },
      { post_idx: 15, user_idx: 4, content: "\u767E\u8BCD\u65A9\u786E\u5B9E\u8BB0\u4E0D\u4F4F\uFF0C\u56FE\u5F62\u5E72\u6270\u592A\u5927" },
      { post_idx: 15, user_idx: 8, content: "\u58A8\u58A8\u80CC\u5355\u8BCD\u4E0D\u9519\uFF0C\u6709\u9057\u5FD8\u66F2\u7EBF\u63D0\u9192" },
      { post_idx: 16, user_idx: 49, content: "\u62FC\u591A\u591A\u771F\u7684\u9999\uFF0C\u51D1\u5355\u4E70\u4E00\u5B66\u671F\u91CF\u66F4\u4FBF\u5B9C" },
      { post_idx: 16, user_idx: 43, content: "\u6025\u7528\u5C31\u95E8\u53E3\u4E70\uFF0C\u4E0D\u6025\u5C31\u7F51\u4E0A\u4E70\uFF0C\u4E24\u5168\u5176\u7F8E" },
      { post_idx: 17, user_idx: 48, content: "\u4E0A\u94FA+1\uFF0C27\u5EA6\u771F\u7684\u7761\u4E0D\u7740" },
      { post_idx: 17, user_idx: 3, content: "\u4E70\u4E2Ausb\u98CE\u6247\u5077\u5077\u7528\uFF0C\u522B\u88AB\u67E5\u5230\u5C31\u884C" },
      { post_idx: 18, user_idx: 44, content: "\u62D4\u6CB3\u5FC5\u987B\u6709\uFF01\u53BB\u5E74\u6211\u4EEC\u73ED\u8F93\u4E86\u4E0D\u670D\u6C14" },
      { post_idx: 18, user_idx: 46, content: "\u4E24\u4EBA\u4E09\u8DB3\u597D\u73A9\uFF0C\u652F\u6301\u52A0\u8DA3\u5473\u9879\u76EE" },
      { post_idx: 19, user_idx: 3, content: "\u540C\u611F\uFF01\u6211\u73B0\u5728\u8FD8\u5728\u8865\u6570\u5B66\uFF0C\u611F\u89C9\u5199\u4E0D\u5B8C\u4E86" },
      { post_idx: 19, user_idx: 11, content: "\u6211\u53BB\u5E74\u4E5F\u662F\u8FD9\u6837\uFF0C\u6700\u540E\u4E24\u5929\u901A\u5BB5\u8865\u5B8C\u7684\uFF0C\u522B\u5B66\u6211" },
      { post_idx: 19, user_idx: 15, content: "\u5EFA\u8BAE\u5148\u5199\u91CD\u8981\u7684\u79D1\u76EE\uFF0C\u8BED\u6587\u4F5C\u6587\u8FD9\u79CD\u53EF\u4EE5\u6700\u540E\u8D76" },
      { post_idx: 20, user_idx: 10, content: "\u906E\u5149\u5E8A\u5E18\u771F\u7684\u521A\u9700\uFF01\u6CA1\u6709\u5B83\u5348\u4F11\u6839\u672C\u7761\u4E0D\u7740" },
      { post_idx: 20, user_idx: 12, content: "\u6298\u53E0\u6536\u7EB3\u7BB1\u5728\u54EA\u4E70\u7684\uFF1F\u6C42\u94FE\u63A5" },
      { post_idx: 20, user_idx: 8, content: "USB\u98CE\u6247\u5EFA\u8BAE\u4E70\u9759\u97F3\u7684\uFF0C\u4E0D\u7136\u820D\u53CB\u4F1A\u6295\u8BC9" },
      { post_idx: 21, user_idx: 24, content: "\u753B\u7EBF\u6BB5\u56FE\uFF01\u884C\u7A0B\u95EE\u9898\u753B\u56FE\u5C31\u7B80\u5355\u4E86" },
      { post_idx: 21, user_idx: 39, content: "\u63A8\u8350\u300A\u4E3E\u4E00\u53CD\u4E09\u300B\u7CFB\u5217\uFF0C\u9002\u5408\u5C0F\u5B66\u751F" },
      { post_idx: 22, user_idx: 31, content: "\u5FAE\u79EF\u5206BC\u786E\u5B9E\u8981\u91CD\u70B9\u7EC3FRQ\uFF0C\u9009\u62E9\u9898\u6BD4\u8F83\u7B80\u5355" },
      { post_idx: 22, user_idx: 34, content: "\u5B8F\u89C2\u7ECF\u6D4E\u7406\u89E3IS-LM\u548CAD-AS\u5C31\u7A33\u4E86\uFF0C\u606D\u559C5\u5206\uFF01" },
      { post_idx: 23, user_idx: 9, content: "\u9B54\u828B\u723D\u786E\u5B9E\u597D\u5403\uFF013\u5757\u94B1\u5FEB\u4E50" },
      { post_idx: 23, user_idx: 49, content: "\u8FDB\u53E3\u85AF\u7247\u592A\u8D35\u4E86\uFF0C\u5076\u5C14\u5403\u5403\u8FD8\u884C" }
    ];
    var SAMPLE_SUGGESTIONS = [
      { user_idx: 1, title: "\u5EFA\u8BAE\u5EF6\u957F\u56FE\u4E66\u9986\u5F00\u653E\u65F6\u95F4\u81F3\u665A\u4E0A10\u70B9", content: "\u671F\u672B\u8003\u8BD5\u671F\u95F4\uFF0C\u5F88\u591A\u540C\u5B66\u5E0C\u671B\u80FD\u5728\u56FE\u4E66\u9986\u81EA\u4E60\u5230\u66F4\u665A\u3002\u76EE\u524D9\u70B9\u95ED\u9986\uFF0C\u5EFA\u8BAE\u5EF6\u957F\u81F310\u70B9\uFF0C\u65B9\u4FBF\u540C\u5B66\u4EEC\u590D\u4E60\u3002", category: "campus", priority: 2 },
      { user_idx: 2, title: "\u5EFA\u8BAE\u589E\u52A0\u98DF\u5802\u83DC\u54C1\u79CD\u7C7B\uFF0C\u7279\u522B\u662F\u7D20\u98DF\u9009\u9879", content: "\u76EE\u524D\u98DF\u5802\u7D20\u98DF\u79CD\u7C7B\u8F83\u5C11\uFF0C\u5EFA\u8BAE\u589E\u52A0\u7D20\u83DC\u7A97\u53E3\uFF0C\u6EE1\u8DB3\u4E0D\u540C\u996E\u98DF\u4E60\u60EF\u540C\u5B66\u7684\u9700\u6C42\u3002", category: "canteen", priority: 1 },
      { user_idx: 3, title: "\u5EFA\u8BAE\u5728\u6559\u5B66\u697C\u589E\u8BBE\u996E\u6C34\u673A", content: "B\u680B\u6559\u5B66\u697C\u76EE\u524D\u53EA\u6709\u4E00\u697C\u6709\u996E\u6C34\u673A\uFF0C\u4E09\u697C\u56DB\u697C\u7684\u540C\u5B66\u63A5\u6C34\u4E0D\u65B9\u4FBF\uFF0C\u5EFA\u8BAE\u6BCF\u5C42\u90FD\u589E\u8BBE\u3002", category: "facility", priority: 2 },
      { user_idx: 4, title: "\u5EFA\u8BAE\u5F00\u8BBE\u5FC3\u7406\u5065\u5EB7\u54A8\u8BE2\u9884\u7EA6\u7EBF\u4E0A\u901A\u9053", content: "\u76EE\u524D\u5FC3\u7406\u54A8\u8BE2\u9700\u8981\u7EBF\u4E0B\u9884\u7EA6\uFF0C\u5F88\u591A\u540C\u5B66\u89C9\u5F97\u4E0D\u597D\u610F\u601D\u3002\u5EFA\u8BAE\u5F00\u901A\u7EBF\u4E0A\u533F\u540D\u9884\u7EA6\u901A\u9053\uFF0C\u4FDD\u62A4\u9690\u79C1\u3002", category: "welfare", priority: 3 },
      { user_idx: 5, title: "\u5EFA\u8BAE\u6821\u56EDWiFi\u8986\u76D6\u64CD\u573A\u533A\u57DF", content: "\u64CD\u573A\u533A\u57DF\u76EE\u524D\u6CA1\u6709WiFi\u4FE1\u53F7\uFF0C\u4F53\u80B2\u8BFE\u7528\u624B\u673A\u67E5\u8D44\u6599\u4E0D\u65B9\u4FBF\uFF0C\u5EFA\u8BAE\u589E\u52A0AP\u8986\u76D6\u3002", category: "facility", priority: 1 },
      { user_idx: 6, title: "\u5EFA\u8BAE\u4E3E\u529E\u8DF3\u86A4\u5E02\u573A\u6D3B\u52A8", content: "\u6BD5\u4E1A\u5B63\u5F88\u591A\u540C\u5B66\u6709\u95F2\u7F6E\u7269\u54C1\uFF0C\u5EFA\u8BAE\u5B66\u6821\u7EC4\u7EC7\u8DF3\u86A4\u5E02\u573A\uFF0C\u65E2\u73AF\u4FDD\u53C8\u80FD\u4FC3\u8FDB\u4EA4\u6D41\u3002", category: "activity", priority: 1 }
    ];
    var SAMPLE_ANNOUNCEMENTS = [
      { user_idx: 0, title: "\u5173\u4E8E\u671F\u672B\u8003\u8BD5\u5B89\u6392\u7684\u901A\u77E5", content: "\u671F\u672B\u8003\u8BD5\u5C06\u4E8E\u4E0B\u5468\u4E00\u81F3\u5468\u4E09\u8FDB\u884C\uFF0C\u8BF7\u540C\u5B66\u4EEC\u5408\u7406\u5B89\u6392\u590D\u4E60\u65F6\u95F4\u3002\u5177\u4F53\u5B89\u6392\u8BF7\u67E5\u770B\u6559\u52A1\u5904\u901A\u77E5\u3002", type: "info" }
    ];
    function seedData() {
      const pw = bcrypt2.hashSync("123456", 8);
      const adminPw = bcrypt2.hashSync("Qq65318320", 8);
      const now = Date.now();
      SEED_USERS.forEach((u, i) => {
        const bios = ["\u8BBA\u575B\u7BA1\u7406\u5458", "\u9AD8\u4E09\u751F\u6D3B\u5206\u4EAB", "\u7F8E\u98DF\u7231\u597D\u8005", "\u575A\u6301\u5C31\u662F\u80DC\u5229", "\u597D\u597D\u5B66\u4E60", "\u8BB0\u5F55\u6821\u56ED\u65E5\u5E38", "\u8003\u8BD5\u52A0\u6CB9", "\u5496\u5561\u56E0\u4F9D\u8D56", "\u9ED8\u9ED8\u52AA\u529B", "\u70ED\u7231\u751F\u6D3B"];
        db.users.push({ id: getNextId("users"), username: u.username, password: u.role === "admin" ? adminPw : pw, nickname: u.nickname, avatar_color: AVATAR_COLORS[i % AVATAR_COLORS.length], bio: bios[i % bios.length], department: u.department, created_at: new Date(now - (50 - i) * 864e5).toISOString(), post_count: 0, comment_count: 0, like_received: 0, role: u.role || "student" });
      });
      CATEGORIES.forEach((c) => db.categories.push({ id: getNextId("categories"), ...c }));
      SAMPLE_POSTS.forEach((p, idx) => {
        const u = db.users[p.user_idx], c = db.categories.find((x) => x.slug === p.cat_slug);
        const hot = p.is_hot_post;
        const cc = SAMPLE_COMMENTS.filter((x) => x.post_idx === idx).length;
        db.posts.push({ id: getNextId("posts"), user_id: u.id, category_id: c.id, title: p.title, content: p.content, images: "[]", created_at: new Date(now - (SAMPLE_POSTS.length - idx) * 36e5 * 6).toISOString(), views: hot ? Math.floor(Math.random() * 200) + 800 : Math.floor(Math.random() * 300) + 50, likes: hot ? Math.floor(Math.random() * 20) + 80 : Math.floor(Math.random() * 30) + 5, upvotes: hot ? Math.floor(Math.random() * 20) + 60 : Math.floor(Math.random() * 20) + 3, downvotes: hot ? Math.floor(Math.random() * 3) + 2 : Math.floor(Math.random() * 3), comment_count: cc, is_pinned: hot ? 1 : 0, is_hot: hot ? 1 : 0, tags: JSON.stringify(p.tags || []) });
        if (p.poll) db.post_polls.push({ id: getNextId("post_polls"), post_id: db.posts[db.posts.length - 1].id, question: p.poll.question, agree: p.poll.agree, disagree: p.poll.disagree });
      });
      SAMPLE_COMMENTS.forEach((c, i) => {
        const p = db.posts[c.post_idx], u = db.users[c.user_idx];
        db.comments.push({ id: getNextId("comments"), post_id: p.id, user_id: u.id, parent_id: null, content: c.content, created_at: new Date(now - (SAMPLE_POSTS.length - c.post_idx) * 36e5 * 5 + i * 6e5).toISOString(), likes: Math.floor(Math.random() * 8) });
      });
      SAMPLE_SUGGESTIONS.forEach((s) => {
        const u = db.users[s.user_idx];
        db.suggestions.push({ id: getNextId("suggestions"), user_id: u.id, title: s.title, content: s.content, category: s.category, status: s.priority >= 3 ? "reviewing" : s.priority >= 2 ? "accepted" : "pending", priority: s.priority, created_at: new Date(now - Math.random() * 7 * 864e5).toISOString(), support_count: Math.floor(Math.random() * 30) + 5, admin_reply: "" });
      });
      SAMPLE_ANNOUNCEMENTS.forEach((a) => {
        const u = db.users[a.user_idx];
        db.announcements.push({ id: getNextId("announcements"), user_id: u.id, title: a.title, content: a.content, type: a.type || "info", created_at: new Date(now - 2 * 864e5).toISOString() });
      });
      db.users.forEach((u) => {
        u.post_count = db.posts.filter((p) => p.user_id === u.id).length;
        u.comment_count = db.comments.filter((c) => c.user_id === u.id).length;
        u.like_received = db.posts.filter((p) => p.user_id === u.id).reduce((s, p) => s + p.likes, 0);
      });
    }
    __name(seedData, "seedData");
    function getDB2() {
      return db;
    }
    __name(getDB2, "getDB");
    function findById2(t, id) {
      return db[t].find((r) => r.id === id);
    }
    __name(findById2, "findById");
    function findOne2(t, c) {
      return db[t].find((r) => Object.entries(c).every(([k, v]) => r[k] === v));
    }
    __name(findOne2, "findOne");
    function findAll2(t, c) {
      if (!c) return [...db[t]];
      return db[t].filter((r) => Object.entries(c).every(([k, v]) => r[k] === v));
    }
    __name(findAll2, "findAll");
    function insert2(t, d) {
      const r = { id: getNextId(t), ...d };
      db[t].push(r);
      _dirty = true;
      return r;
    }
    __name(insert2, "insert");
    function update2(t, id, u) {
      const r = findById2(t, id);
      if (r) {
        Object.assign(r, u);
        _dirty = true;
      }
      return r;
    }
    __name(update2, "update");
    function remove2(t, c) {
      const before = db[t].length;
      db[t] = db[t].filter((r) => !Object.entries(c).every(([k, v]) => r[k] === v));
      if (db[t].length !== before) _dirty = true;
    }
    __name(remove2, "remove");
    function increment2(t, id, f, a = 1) {
      const r = findById2(t, id);
      if (r) {
        r[f] = (r[f] || 0) + a;
        _dirty = true;
      }
    }
    __name(increment2, "increment");
    module.exports = { loadDB: loadDB2, saveDB: saveDB2, getDB: getDB2, ensureDB, initDB, findById: findById2, findOne: findOne2, findAll: findAll2, insert: insert2, update: update2, remove: remove2, increment: increment2, markDirty: markDirty2, setEnv: setEnv2 };
  }
});

// api/[[route]].js
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}
function getIP(request) {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return request.headers.get("cf-connecting-ip") || "unknown";
}
async function getBody(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}
function checkLoginRate(ip) {
  const now = Date.now();
  const attempts = loginAttempts.get(ip) || [];
  const recent = attempts.filter((t) => now - t < 9e5);
  if (recent.length >= 10) return false;
  recent.push(now);
  loginAttempts.set(ip, recent);
  return true;
}
function getAuthUser(request) {
  let token = request.headers.get("x-auth-token");
  if (!token) {
    const auth = request.headers.get("authorization");
    if (auth) token = auth.replace("Bearer ", "");
  }
  if (!token) {
    try {
      token = new URL(request.url).searchParams.get("token");
    } catch {
    }
  }
  if (!token) return null;
  try {
    return import_jsonwebtoken.default.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}
function requireAuth(request) {
  const user = getAuthUser(request);
  if (!user) return { user: null, error: json({ error: "\u672A\u767B\u5F55" }, 401) };
  return { user, error: null };
}
function requireAdmin(request) {
  const { user, error: error3 } = requireAuth(request);
  if (error3) return { user: null, error: error3 };
  if (user.role !== "admin") return { user: null, error: json({ error: "Not Found" }, 404) };
  return { user, error: null };
}
function formatPost(post, currentUserId) {
  const db = (0, import_database.getDB)();
  const author = (0, import_database.findById)("users", post.user_id);
  const category = (0, import_database.findById)("categories", post.category_id);
  let liked = false, voted = 0, favorited = false;
  if (currentUserId) {
    liked = !!(0, import_database.findOne)("post_likes", { post_id: post.id, user_id: currentUserId });
    const vote = (0, import_database.findOne)("post_votes", { post_id: post.id, user_id: currentUserId });
    voted = vote ? vote.vote_type : 0;
    favorited = !!(0, import_database.findOne)("favorites", { post_id: post.id, user_id: currentUserId });
  }
  const poll = (0, import_database.findOne)("post_polls", { post_id: post.id });
  let pollData = null, pollVoted = null;
  if (poll) {
    pollData = { id: poll.id, question: poll.question, agree: poll.agree, disagree: poll.disagree };
    if (currentUserId) {
      const pollVote = (0, import_database.findOne)("poll_votes", { poll_id: poll.id, user_id: currentUserId });
      pollVoted = pollVote ? pollVote.choice : null;
    }
  }
  return {
    ...post,
    tags: typeof post.tags === "string" ? JSON.parse(post.tags || "[]") : post.tags || [],
    images: typeof post.images === "string" ? JSON.parse(post.images || "[]") : post.images || [],
    author: author ? { id: author.id, nickname: author.nickname, avatar_color: author.avatar_color, department: author.department, role: author.role === "admin" ? "student" : author.role } : null,
    category: category ? { id: category.id, name: category.name, slug: category.slug, color: category.color } : null,
    liked,
    voted,
    favorited,
    poll: pollData,
    poll_voted: pollVoted,
    score: (post.upvotes || 0) - (post.downvotes || 0),
    is_hot: post.is_hot || 0
  };
}
function formatComment(comment, currentUserId) {
  const author = (0, import_database.findById)("users", comment.user_id);
  let liked = false;
  if (currentUserId) {
    liked = !!(0, import_database.findOne)("comment_likes", { comment_id: comment.id, user_id: currentUserId });
  }
  const replies = (0, import_database.findAll)("comments", { parent_id: comment.id }).sort((a, b) => new Date(a.created_at) - new Date(b.created_at)).map((r) => formatComment(r, currentUserId));
  return {
    ...comment,
    author: author ? { id: author.id, nickname: author.nickname, avatar_color: author.avatar_color, department: author.department, role: author.role === "admin" ? "student" : author.role } : null,
    liked,
    replies
  };
}
function publicUser(user, viewerRole) {
  if (!user) return null;
  const showRole = viewerRole === "admin" || user.role !== "admin" ? user.role : "student";
  return {
    id: user.id,
    username: user.username,
    nickname: user.nickname,
    avatar_color: user.avatar_color,
    bio: user.bio,
    department: user.department,
    role: showRole,
    post_count: user.post_count || 0,
    comment_count: user.comment_count || 0,
    like_received: user.like_received || 0,
    created_at: user.created_at
  };
}
async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;
  try {
    await (0, import_database.loadDB)();
    if (method === "POST") {
      if (path === "/api/auth/login") {
        const { username, password } = await getBody(request);
        if (!username || !password) return json({ error: "\u8BF7\u8F93\u5165\u8D26\u53F7\u548C\u5BC6\u7801" }, 400);
        if (!checkLoginRate(getIP(request))) return json({ error: "\u5C1D\u8BD5\u8FC7\u4E8E\u9891\u7E41\uFF0C\u8BF715\u5206\u949F\u540E\u518D\u8BD5" }, 429);
        const user = (0, import_database.findOne)("users", { username });
        if (!user) return json({ error: "\u8D26\u53F7\u4E0D\u5B58\u5728" }, 401);
        if (!import_bcryptjs.default.compareSync(password, user.password)) return json({ error: "\u5BC6\u7801\u9519\u8BEF" }, 401);
        const banned = (0, import_database.findOne)("banned_users", { user_id: user.id });
        if (banned) return json({ error: "\u8BE5\u8D26\u53F7\u5DF2\u88AB\u7981\u8A00" }, 403);
        const token = import_jsonwebtoken.default.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
        return json({ token, user: publicUser(user, user.role) });
      }
      if (path === "/api/auth/register") {
        const { username, password, nickname, department, role } = await getBody(request);
        if (!username || !password || !nickname) return json({ error: "\u8BF7\u586B\u5199\u5B8C\u6574\u4FE1\u606F" }, 400);
        if (username.length < 3) return json({ error: "\u8D26\u53F7\u81F3\u5C113\u4E2A\u5B57\u7B26" }, 400);
        if (password.length < 6) return json({ error: "\u5BC6\u7801\u81F3\u5C116\u4E2A\u5B57\u7B26" }, 400);
        const existing = (0, import_database.findOne)("users", { username });
        if (existing) return json({ error: "\u8D26\u53F7\u5DF2\u5B58\u5728" }, 409);
        const colors = ["#8B2323", "#C9A227", "#6B1A1A", "#D4AF37", "#A52A2A", "#B8860B", "#CD853F", "#DA8A2C"];
        const avatar_color = colors[Math.floor(Math.random() * colors.length)];
        const hashed = import_bcryptjs.default.hashSync(password, 8);
        const user = (0, import_database.insert)("users", {
          username,
          password: hashed,
          nickname,
          avatar_color,
          bio: "\u6B22\u8FCE\u6765\u5230\u7FF0\u6797\u6821\u56ED\u8BBA\u575B",
          department: department || "",
          created_at: (/* @__PURE__ */ new Date()).toISOString(),
          post_count: 0,
          comment_count: 0,
          like_received: 0,
          role: role === "teacher" ? "teacher" : "student"
        });
        const token = import_jsonwebtoken.default.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
        return json({ token, user: publicUser(user, user.role) });
      }
      if (path === "/api/posts") {
        const { user, error: error3 } = requireAuth(request);
        if (error3) return error3;
        const { title: title2, content, category_id, tags, images, poll_question } = await getBody(request);
        if (!title2 || !content || !category_id) return json({ error: "\u8BF7\u586B\u5199\u6807\u9898\u3001\u5185\u5BB9\u548C\u5206\u7C7B" }, 400);
        const post = (0, import_database.insert)("posts", {
          user_id: user.id,
          category_id,
          title: title2,
          content,
          tags: JSON.stringify(tags || []),
          images: JSON.stringify(images || []),
          created_at: (/* @__PURE__ */ new Date()).toISOString(),
          views: 0,
          likes: 0,
          upvotes: 0,
          downvotes: 0,
          comment_count: 0,
          is_pinned: 0,
          is_hot: 0
        });
        (0, import_database.increment)("users", user.id, "post_count", 1);
        if (poll_question && poll_question.trim()) {
          (0, import_database.insert)("post_polls", {
            post_id: post.id,
            question: poll_question.trim(),
            agree: 0,
            disagree: 0
          });
        }
        return json({ post: formatPost(post, user.id) });
      }
      let m;
      if (m = path.match(/^\/api\/posts\/(\d+)\/like$/)) {
        const { user, error: error3 } = requireAuth(request);
        if (error3) return error3;
        const postId = parseInt(m[1]);
        const existing = (0, import_database.findOne)("post_likes", { post_id: postId, user_id: user.id });
        if (existing) {
          (0, import_database.remove)("post_likes", { post_id: postId, user_id: user.id });
          (0, import_database.increment)("posts", postId, "likes", -1);
          const post = (0, import_database.findById)("posts", postId);
          if (post) (0, import_database.increment)("users", post.user_id, "like_received", -1);
          return json({ liked: false, likes: (0, import_database.findById)("posts", postId).likes });
        } else {
          (0, import_database.insert)("post_likes", { post_id: postId, user_id: user.id, created_at: (/* @__PURE__ */ new Date()).toISOString() });
          (0, import_database.increment)("posts", postId, "likes", 1);
          const post = (0, import_database.findById)("posts", postId);
          if (post) (0, import_database.increment)("users", post.user_id, "like_received", 1);
          if (post && post.user_id !== user.id) {
            const liker = (0, import_database.findById)("users", user.id);
            (0, import_database.insert)("notifications", {
              user_id: post.user_id,
              type: "like",
              content: `${liker.nickname} \u8D5E\u4E86\u4F60\u7684\u5E16\u5B50\u300C${post.title}\u300D`,
              link: `/post/${postId}`,
              is_read: 0,
              created_at: (/* @__PURE__ */ new Date()).toISOString()
            });
          }
          return json({ liked: true, likes: (0, import_database.findById)("posts", postId).likes });
        }
      }
      if (m = path.match(/^\/api\/posts\/(\d+)\/vote$/)) {
        const { user, error: error3 } = requireAuth(request);
        if (error3) return error3;
        const { vote_type } = await getBody(request);
        if (![1, -1].includes(vote_type)) return json({ error: "\u65E0\u6548\u7684\u6295\u7968\u7C7B\u578B" }, 400);
        const postId = parseInt(m[1]);
        const existing = (0, import_database.findOne)("post_votes", { post_id: postId, user_id: user.id });
        const post = (0, import_database.findById)("posts", postId);
        if (!post) return json({ error: "\u5E16\u5B50\u4E0D\u5B58\u5728" }, 404);
        if (existing) {
          if (existing.vote_type === vote_type) {
            (0, import_database.remove)("post_votes", { post_id: postId, user_id: user.id });
            if (vote_type === 1) (0, import_database.increment)("posts", postId, "upvotes", -1);
            else (0, import_database.increment)("posts", postId, "downvotes", -1);
            return json({ voted: 0, upvotes: post.upvotes, downvotes: post.downvotes });
          } else {
            (0, import_database.update)("post_votes", existing.id, { vote_type });
            if (vote_type === 1) {
              (0, import_database.increment)("posts", postId, "upvotes", 1);
              (0, import_database.increment)("posts", postId, "downvotes", -1);
            } else {
              (0, import_database.increment)("posts", postId, "upvotes", -1);
              (0, import_database.increment)("posts", postId, "downvotes", 1);
            }
            return json({ voted: vote_type, upvotes: post.upvotes, downvotes: post.downvotes });
          }
        } else {
          (0, import_database.insert)("post_votes", { post_id: postId, user_id: user.id, vote_type, created_at: (/* @__PURE__ */ new Date()).toISOString() });
          if (vote_type === 1) (0, import_database.increment)("posts", postId, "upvotes", 1);
          else (0, import_database.increment)("posts", postId, "downvotes", 1);
          return json({ voted: vote_type, upvotes: post.upvotes, downvotes: post.downvotes });
        }
      }
      if (m = path.match(/^\/api\/posts\/(\d+)\/favorite$/)) {
        const { user, error: error3 } = requireAuth(request);
        if (error3) return error3;
        const postId = parseInt(m[1]);
        const existing = (0, import_database.findOne)("favorites", { post_id: postId, user_id: user.id });
        if (existing) {
          (0, import_database.remove)("favorites", { post_id: postId, user_id: user.id });
          return json({ favorited: false });
        } else {
          (0, import_database.insert)("favorites", { post_id: postId, user_id: user.id, created_at: (/* @__PURE__ */ new Date()).toISOString() });
          return json({ favorited: true });
        }
      }
      if (m = path.match(/^\/api\/posts\/(\d+)\/poll$/)) {
        const { user, error: error3 } = requireAuth(request);
        if (error3) return error3;
        const { choice } = await getBody(request);
        if (!["agree", "disagree"].includes(choice)) return json({ error: "\u65E0\u6548\u7684\u6295\u7968\u9009\u9879" }, 400);
        const postId = parseInt(m[1]);
        const poll = (0, import_database.findOne)("post_polls", { post_id: postId });
        if (!poll) return json({ error: "\u8BE5\u5E16\u5B50\u6CA1\u6709\u6295\u7968" }, 404);
        const existing = (0, import_database.findOne)("poll_votes", { poll_id: poll.id, user_id: user.id });
        if (existing) return json({ error: "\u4F60\u5DF2\u7ECF\u6295\u8FC7\u7968\u4E86" }, 400);
        (0, import_database.insert)("poll_votes", { poll_id: poll.id, user_id: user.id, choice, created_at: (/* @__PURE__ */ new Date()).toISOString() });
        (0, import_database.increment)("post_polls", poll.id, choice, 1);
        const updated = (0, import_database.findById)("post_polls", poll.id);
        return json({ poll: updated, voted: choice });
      }
      if (m = path.match(/^\/api\/posts\/(\d+)\/comments$/)) {
        const { user, error: error3 } = requireAuth(request);
        if (error3) return error3;
        const { content, parent_id } = await getBody(request);
        if (!content) return json({ error: "\u8BF7\u8F93\u5165\u8BC4\u8BBA\u5185\u5BB9" }, 400);
        const postId = parseInt(m[1]);
        const comment = (0, import_database.insert)("comments", {
          post_id: postId,
          user_id: user.id,
          parent_id: parent_id || null,
          content,
          created_at: (/* @__PURE__ */ new Date()).toISOString(),
          likes: 0
        });
        (0, import_database.increment)("posts", postId, "comment_count", 1);
        (0, import_database.increment)("users", user.id, "comment_count", 1);
        const post = (0, import_database.findById)("posts", postId);
        if (post && post.user_id !== user.id) {
          const commenter = (0, import_database.findById)("users", user.id);
          (0, import_database.insert)("notifications", {
            user_id: post.user_id,
            type: "comment",
            content: `${commenter.nickname} \u8BC4\u8BBA\u4E86\u4F60\u7684\u5E16\u5B50\u300C${post.title}\u300D`,
            link: `/post/${postId}`,
            is_read: 0,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          });
        }
        return json({ comment: formatComment(comment, user.id) });
      }
      if (m = path.match(/^\/api\/comments\/(\d+)\/like$/)) {
        const { user, error: error3 } = requireAuth(request);
        if (error3) return error3;
        const commentId = parseInt(m[1]);
        const existing = (0, import_database.findOne)("comment_likes", { comment_id: commentId, user_id: user.id });
        if (existing) {
          (0, import_database.remove)("comment_likes", { comment_id: commentId, user_id: user.id });
          (0, import_database.increment)("comments", commentId, "likes", -1);
          return json({ liked: false, likes: (0, import_database.findById)("comments", commentId).likes });
        } else {
          (0, import_database.insert)("comment_likes", { comment_id: commentId, user_id: user.id });
          (0, import_database.increment)("comments", commentId, "likes", 1);
          return json({ liked: true, likes: (0, import_database.findById)("comments", commentId).likes });
        }
      }
      if (path === "/api/suggestions") {
        const { user, error: error3 } = requireAuth(request);
        if (error3) return error3;
        const { title: title2, content, category } = await getBody(request);
        if (!title2 || !content) return json({ error: "\u8BF7\u586B\u5199\u6807\u9898\u548C\u5185\u5BB9" }, 400);
        const sug = (0, import_database.insert)("suggestions", {
          user_id: user.id,
          title: title2,
          content,
          category: category || "general",
          status: "pending",
          priority: 0,
          created_at: (/* @__PURE__ */ new Date()).toISOString(),
          support_count: 0,
          admin_reply: ""
        });
        const author = (0, import_database.findById)("users", user.id);
        return json({ suggestion: { ...sug, nickname: author.nickname, avatar_color: author.avatar_color, department: author.department, supported: false } });
      }
      if (m = path.match(/^\/api\/suggestions\/(\d+)\/support$/)) {
        const { user, error: error3 } = requireAuth(request);
        if (error3) return error3;
        const sugId = parseInt(m[1]);
        const existing = (0, import_database.findOne)("suggestion_supports", { suggestion_id: sugId, user_id: user.id });
        if (existing) {
          (0, import_database.remove)("suggestion_supports", { suggestion_id: sugId, user_id: user.id });
          (0, import_database.increment)("suggestions", sugId, "support_count", -1);
          return json({ supported: false, support_count: (0, import_database.findById)("suggestions", sugId).support_count });
        } else {
          (0, import_database.insert)("suggestion_supports", { suggestion_id: sugId, user_id: user.id });
          (0, import_database.increment)("suggestions", sugId, "support_count", 1);
          return json({ supported: true, support_count: (0, import_database.findById)("suggestions", sugId).support_count });
        }
      }
      if (path === "/api/admin/announce") {
        const { user, error: error3 } = requireAdmin(request);
        if (error3) return error3;
        const { title: title2, content, type } = await getBody(request);
        if (!title2 || !content) return json({ error: "\u8BF7\u586B\u5199\u516C\u544A\u6807\u9898\u548C\u5185\u5BB9" }, 400);
        const announcement = (0, import_database.insert)("announcements", {
          user_id: user.id,
          title: title2,
          content,
          type: type || "info",
          created_at: (/* @__PURE__ */ new Date()).toISOString()
        });
        return json({ announcement });
      }
      if (m = path.match(/^\/api\/admin\/ban\/(\d+)$/)) {
        const { user, error: error3 } = requireAdmin(request);
        if (error3) return error3;
        const userId = parseInt(m[1]);
        const targetUser = (0, import_database.findById)("users", userId);
        if (!targetUser) return json({ error: "\u7528\u6237\u4E0D\u5B58\u5728" }, 404);
        if (targetUser.role === "admin") return json({ error: "\u4E0D\u80FD\u7981\u8A00\u7BA1\u7406\u5458" }, 400);
        const existing = (0, import_database.findOne)("banned_users", { user_id: userId });
        if (existing) return json({ error: "\u8BE5\u7528\u6237\u5DF2\u88AB\u7981\u8A00" }, 400);
        const record = (0, import_database.insert)("banned_users", {
          user_id: userId,
          created_at: (/* @__PURE__ */ new Date()).toISOString()
        });
        return json({ success: true, banned: record });
      }
      if (path === "/api/admin/poll") {
        const { user, error: error3 } = requireAdmin(request);
        if (error3) return error3;
        const { post_id, question } = await getBody(request);
        if (!post_id || !question) return json({ error: "\u8BF7\u63D0\u4F9B\u5E16\u5B50ID\u548C\u6295\u7968\u95EE\u9898" }, 400);
        const post = (0, import_database.findById)("posts", parseInt(post_id));
        if (!post) return json({ error: "\u5E16\u5B50\u4E0D\u5B58\u5728" }, 404);
        const existing = (0, import_database.findOne)("post_polls", { post_id: parseInt(post_id) });
        if (existing) return json({ error: "\u8BE5\u5E16\u5B50\u5DF2\u6709\u6295\u7968" }, 400);
        const poll = (0, import_database.insert)("post_polls", {
          post_id: parseInt(post_id),
          question,
          agree: 0,
          disagree: 0
        });
        return json({ poll });
      }
      if (path === "/api/admin/posts/batch") {
        const { user, error: error3 } = requireAdmin(request);
        if (error3) return error3;
        const { action, post_ids } = await getBody(request);
        if (!action || !Array.isArray(post_ids) || post_ids.length === 0) return json({ error: "\u53C2\u6570\u4E0D\u5B8C\u6574" }, 400);
        const db = (0, import_database.getDB)();
        let count3 = 0;
        if (action === "delete") {
          for (const pid2 of post_ids) {
            const post = (0, import_database.findById)("posts", parseInt(pid2));
            if (!post) continue;
            const commentIds = db.comments.filter((c) => c.post_id === parseInt(pid2)).map((c) => c.id);
            const pollIds = db.post_polls.filter((p) => p.post_id === parseInt(pid2)).map((p) => p.id);
            db.poll_votes = db.poll_votes.filter((v) => !pollIds.includes(v.poll_id));
            db.post_polls = db.post_polls.filter((p) => p.post_id !== parseInt(pid2));
            db.comment_likes = db.comment_likes.filter((cl) => !commentIds.includes(cl.comment_id));
            db.comments = db.comments.filter((c) => c.post_id !== parseInt(pid2));
            db.post_likes = db.post_likes.filter((l) => l.post_id !== parseInt(pid2));
            db.post_votes = db.post_votes.filter((v) => v.post_id !== parseInt(pid2));
            db.favorites = db.favorites.filter((f) => f.post_id !== parseInt(pid2));
            db.posts = db.posts.filter((p) => p.id !== parseInt(pid2));
            if (post.user_id) {
              const author = (0, import_database.findById)("users", post.user_id);
              if (author && author.post_count > 0) author.post_count -= 1;
            }
            count3++;
          }
          (0, import_database.markDirty)();
          return json({ success: true, count: count3, message: `\u5DF2\u5220\u9664${count3}\u7BC7\u5E16\u5B50` });
        }
        if (action === "pin" || action === "unpin") {
          for (const pid2 of post_ids) {
            (0, import_database.update)("posts", parseInt(pid2), { is_pinned: action === "pin" ? 1 : 0 });
            count3++;
          }
          return json({ success: true, count: count3, message: `${action === "pin" ? "\u7F6E\u9876" : "\u53D6\u6D88\u7F6E\u9876"}${count3}\u7BC7\u5E16\u5B50` });
        }
        if (action === "hot" || action === "unhot") {
          for (const pid2 of post_ids) {
            (0, import_database.update)("posts", parseInt(pid2), { is_hot: action === "hot" ? 1 : 0 });
            count3++;
          }
          return json({ success: true, count: count3, message: `${action === "hot" ? "\u8BBE\u7F6E" : "\u53D6\u6D88"}\u70ED\u5EA6${count3}\u7BC7\u5E16\u5B50` });
        }
        return json({ error: "\u672A\u77E5\u64CD\u4F5C" }, 400);
      }
      if (path === "/api/admin/create-user") {
        const { user, error: error3 } = requireAdmin(request);
        if (error3) return error3;
        const { username, password, nickname, department, role, bio } = await getBody(request);
        if (!username || !password || !nickname) return json({ error: "\u8BF7\u586B\u5199\u5B8C\u6574\u4FE1\u606F" }, 400);
        if (username.length < 3) return json({ error: "\u8D26\u53F7\u81F3\u5C113\u4E2A\u5B57\u7B26" }, 400);
        if (password.length < 6) return json({ error: "\u5BC6\u7801\u81F3\u5C116\u4E2A\u5B57\u7B26" }, 400);
        const existing = (0, import_database.findOne)("users", { username });
        if (existing) return json({ error: "\u8D26\u53F7\u5DF2\u5B58\u5728" }, 409);
        const colors = ["#8B2323", "#C9A227", "#6B1A1A", "#D4AF37", "#A52A2A", "#B8860B", "#CD853F", "#DA8A2C", "#8B4513", "#BDB76B", "#9B2226", "#BB9457", "#6D1A1A", "#CFA636", "#7A1F1F", "#DAA520", "#A0522D", "#BC8F8F", "#8B6914", "#D2691E"];
        const avatar_color = colors[Math.floor(Math.random() * colors.length)];
        const hashed = import_bcryptjs.default.hashSync(password, 8);
        const userRole = role === "teacher" ? "teacher" : "student";
        const newUser = (0, import_database.insert)("users", {
          username,
          password: hashed,
          nickname,
          avatar_color,
          bio: bio || "\u6B22\u8FCE\u6765\u5230\u7FF0\u6797\u6821\u56ED\u8BBA\u575B",
          department: department || "\u9AD8\u4E2D\u90E8",
          created_at: new Date(Date.now() - Math.random() * 864e5 * 30).toISOString(),
          post_count: 0,
          comment_count: 0,
          like_received: 0,
          role: userRole
        });
        return json({ success: true, user: { id: newUser.id, username: newUser.username, nickname: newUser.nickname, department: newUser.department, role: newUser.role } });
      }
      if (path === "/api/admin/post-as-user") {
        const { user, error: error3 } = requireAdmin(request);
        if (error3) return error3;
        const { user_id, title: title2, content, category_id, tags, images } = await getBody(request);
        if (!user_id || !title2 || !content || !category_id) return json({ error: "\u53C2\u6570\u4E0D\u5B8C\u6574" }, 400);
        const targetUser = (0, import_database.findById)("users", parseInt(user_id));
        if (!targetUser) return json({ error: "\u7528\u6237\u4E0D\u5B58\u5728" }, 404);
        const post = (0, import_database.insert)("posts", {
          user_id: parseInt(user_id),
          category_id,
          title: title2,
          content,
          tags: JSON.stringify(tags || []),
          images: JSON.stringify(images || []),
          created_at: new Date(Date.now() - Math.random() * 36e5 * 24).toISOString(),
          views: Math.floor(Math.random() * 50) + 10,
          likes: 0,
          upvotes: 0,
          downvotes: 0,
          comment_count: 0,
          is_pinned: 0
        });
        (0, import_database.increment)("users", parseInt(user_id), "post_count", 1);
        return json({ success: true, post: formatPost(post, user.id) });
      }
    } else if (method === "GET") {
      if (path === "/api/auth/me") {
        const { user, error: error3 } = requireAuth(request);
        if (error3) return error3;
        const fullUser = (0, import_database.findById)("users", user.id);
        if (!fullUser) return json({ error: "\u7528\u6237\u4E0D\u5B58\u5728" }, 404);
        return json({ user: publicUser(fullUser, user.role) });
      }
      if (path === "/api/categories") {
        const db = (0, import_database.getDB)();
        const cats = [...db.categories].sort((a, b) => a.sort_order - b.sort_order);
        const result = cats.map((cat) => ({
          ...cat,
          post_count: db.posts.filter((p) => p.category_id === cat.id).length
        }));
        return json({ categories: result });
      }
      if (path === "/api/posts") {
        const currentUser = getAuthUser(request);
        const currentUserId = currentUser?.id;
        const db = (0, import_database.getDB)();
        const category = url.searchParams.get("category");
        const sort = url.searchParams.get("sort") || "latest";
        const search = url.searchParams.get("search");
        const page = parseInt(url.searchParams.get("page") || "1");
        const limit = parseInt(url.searchParams.get("limit") || "20");
        const offset = (page - 1) * limit;
        let posts = [...db.posts];
        if (category && category !== "all") {
          const cat = db.categories.find((c) => c.slug === category);
          if (cat) posts = posts.filter((p) => p.category_id === cat.id);
        }
        if (search) {
          const q = search.toLowerCase();
          posts = posts.filter((p) => p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q));
        }
        if (sort === "hot") {
          posts.sort((a, b) => b.is_pinned - a.is_pinned || b.upvotes + b.likes + b.comment_count * 2 - (a.upvotes + a.likes + a.comment_count * 2));
        } else if (sort === "top") {
          posts.sort((a, b) => b.is_pinned - a.is_pinned || b.upvotes - a.upvotes);
        } else {
          posts.sort((a, b) => b.is_pinned - a.is_pinned || new Date(b.created_at) - new Date(a.created_at));
        }
        const total = posts.length;
        const paged = posts.slice(offset, offset + limit);
        const formatted = paged.map((p) => formatPost(p, currentUserId));
        return json({ posts: formatted, total, page, hasMore: offset + formatted.length < total });
      }
      if (path === "/api/announcements") {
        const db = (0, import_database.getDB)();
        const announcements = [...db.announcements].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((ann) => {
          const author = (0, import_database.findById)("users", ann.user_id);
          return {
            ...ann,
            author: author ? { id: author.id, nickname: author.nickname, avatar_color: author.avatar_color, role: author.role } : null
          };
        });
        return json({ announcements });
      }
      if (path === "/api/stats") {
        const db = (0, import_database.getDB)();
        const today = (/* @__PURE__ */ new Date()).toDateString();
        return json({
          users: db.users.length,
          posts: db.posts.length,
          comments: db.comments.length,
          todayPosts: db.posts.filter((p) => new Date(p.created_at).toDateString() === today).length
        });
      }
      if (path === "/api/notifications") {
        const { user, error: error3 } = requireAuth(request);
        if (error3) return error3;
        const db = (0, import_database.getDB)();
        const notifications = db.notifications.filter((n) => n.user_id === user.id).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 20);
        const unread = db.notifications.filter((n) => n.user_id === user.id && n.is_read === 0).length;
        return json({ notifications, unread });
      }
      if (path === "/api/users/me/favorites") {
        const { user, error: error3 } = requireAuth(request);
        if (error3) return error3;
        const db = (0, import_database.getDB)();
        const favs = db.favorites.filter((f) => f.user_id === user.id).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        const posts = favs.map((f) => formatPost((0, import_database.findById)("posts", f.post_id), user.id)).filter(Boolean);
        return json({ posts });
      }
      if (path === "/api/suggestions") {
        const currentUser = getAuthUser(request);
        const db = (0, import_database.getDB)();
        const status = url.searchParams.get("status");
        const sort = url.searchParams.get("sort") || "support";
        let suggestions = [...db.suggestions];
        if (status && status !== "all") suggestions = suggestions.filter((s) => s.status === status);
        if (sort === "latest") {
          suggestions.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        } else {
          suggestions.sort((a, b) => b.support_count - a.support_count);
        }
        const result = suggestions.map((s) => {
          const author = (0, import_database.findById)("users", s.user_id);
          let supported = false;
          if (currentUser) supported = !!(0, import_database.findOne)("suggestion_supports", { suggestion_id: s.id, user_id: currentUser.id });
          return { ...s, nickname: author?.nickname, avatar_color: author?.avatar_color, department: author?.department, supported };
        });
        return json({ suggestions: result });
      }
      if (path === "/api/admin/users") {
        const { user, error: error3 } = requireAdmin(request);
        if (error3) return error3;
        const db = (0, import_database.getDB)();
        const users = db.users.map((u) => {
          const banned = (0, import_database.findOne)("banned_users", { user_id: u.id });
          return {
            id: u.id,
            username: u.username,
            nickname: u.nickname,
            avatar_color: u.avatar_color,
            department: u.department,
            role: u.role,
            created_at: u.created_at,
            post_count: u.post_count || 0,
            comment_count: u.comment_count || 0,
            like_received: u.like_received || 0,
            banned: !!banned,
            banned_at: banned ? banned.created_at : null
          };
        });
        return json({ users });
      }
      if (path === "/api/admin/suggestions") {
        const { user, error: error3 } = requireAdmin(request);
        if (error3) return error3;
        const db = (0, import_database.getDB)();
        const suggestions = [...db.suggestions].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        const result = suggestions.map((s) => {
          const author = (0, import_database.findById)("users", s.user_id);
          const supports = db.suggestion_supports.filter((ss) => ss.suggestion_id === s.id);
          return {
            ...s,
            nickname: author?.nickname,
            avatar_color: author?.avatar_color,
            department: author?.department,
            username: author?.username,
            support_count: supports.length
          };
        });
        return json({ suggestions: result });
      }
      if (path === "/api/admin/stats") {
        const { user, error: error3 } = requireAdmin(request);
        if (error3) return error3;
        const db = (0, import_database.getDB)();
        const now = /* @__PURE__ */ new Date();
        const today = now.toDateString();
        const sevenDaysAgo = new Date(now.getTime() - 7 * 864e5);
        const todayNewUsers = db.users.filter((u) => new Date(u.created_at).toDateString() === today).length;
        const todayNewPosts = db.posts.filter((p) => new Date(p.created_at).toDateString() === today).length;
        const activeUserIds = new Set(db.posts.filter((p) => new Date(p.created_at) >= sevenDaysAgo).map((p) => p.user_id));
        return json({
          total_users: db.users.length,
          total_posts: db.posts.length,
          total_comments: db.comments.length,
          today_new_users: todayNewUsers,
          today_new_posts: todayNewPosts,
          active_users: activeUserIds.size,
          banned_users: db.banned_users.length
        });
      }
      let m;
      if (m = path.match(/^\/api\/posts\/(\d+)$/)) {
        const postId = parseInt(m[1]);
        const post = (0, import_database.findById)("posts", postId);
        if (!post) return json({ error: "\u5E16\u5B50\u4E0D\u5B58\u5728" }, 404);
        (0, import_database.increment)("posts", postId, "views", 1);
        const currentUser = getAuthUser(request);
        return json({ post: formatPost(post, currentUser?.id) });
      }
      if (m = path.match(/^\/api\/posts\/(\d+)\/comments$/)) {
        const postId = parseInt(m[1]);
        const db = (0, import_database.getDB)();
        const currentUser = getAuthUser(request);
        const comments = db.comments.filter((c) => c.post_id === postId && c.parent_id === null).sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        return json({ comments: comments.map((c) => formatComment(c, currentUser?.id)) });
      }
      if (m = path.match(/^\/api\/users\/(\d+)$/)) {
        const userId = parseInt(m[1]);
        const targetUser = (0, import_database.findById)("users", userId);
        if (!targetUser) return json({ error: "\u7528\u6237\u4E0D\u5B58\u5728" }, 404);
        const db = (0, import_database.getDB)();
        const currentUser = getAuthUser(request);
        const posts = db.posts.filter((p) => p.user_id === userId).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 10).map((p) => formatPost(p, currentUser?.id));
        return json({ user: publicUser(targetUser, currentUser?.role), posts });
      }
    } else if (method === "PUT") {
      let putM;
      if (putM = path.match(/^\/api\/admin\/posts\/(\d+)$/)) {
        const { user, error: error3 } = requireAdmin(request);
        if (error3) return error3;
        const postId = parseInt(putM[1]);
        const post = (0, import_database.findById)("posts", postId);
        if (!post) return json({ error: "\u5E16\u5B50\u4E0D\u5B58\u5728" }, 404);
        const { is_pinned, is_hot } = await getBody(request);
        const updates = {};
        if (is_pinned !== void 0) updates.is_pinned = is_pinned ? 1 : 0;
        if (is_hot !== void 0) updates.is_hot = is_hot ? 1 : 0;
        (0, import_database.update)("posts", postId, updates);
        return json({ success: true, post: (0, import_database.findById)("posts", postId) });
      }
      if (putM = path.match(/^\/api\/admin\/suggestions\/(\d+)$/)) {
        const { user, error: error3 } = requireAdmin(request);
        if (error3) return error3;
        const sugId = parseInt(putM[1]);
        const sug = (0, import_database.findById)("suggestions", sugId);
        if (!sug) return json({ error: "\u5EFA\u8BAE\u4E0D\u5B58\u5728" }, 404);
        const { status, admin_reply, priority } = await getBody(request);
        const updates = {};
        if (status) updates.status = status;
        if (admin_reply !== void 0) updates.admin_reply = admin_reply;
        if (priority !== void 0) updates.priority = priority;
        (0, import_database.update)("suggestions", sugId, updates);
        return json({ success: true, suggestion: (0, import_database.findById)("suggestions", sugId) });
      }
      if (path === "/api/users/profile") {
        const { user, error: error3 } = requireAuth(request);
        if (error3) return error3;
        const { nickname, bio, department } = await getBody(request);
        (0, import_database.update)("users", user.id, { nickname, bio, department });
        return json({ user: publicUser((0, import_database.findById)("users", user.id), user.role) });
      }
      if (path === "/api/notifications/read") {
        const { user, error: error3 } = requireAuth(request);
        if (error3) return error3;
        const db = (0, import_database.getDB)();
        db.notifications.forEach((n) => {
          if (n.user_id === user.id) n.is_read = 1;
        });
        (0, import_database.markDirty)();
        return json({ success: true });
      }
    } else if (method === "DELETE") {
      let m;
      if (m = path.match(/^\/api\/admin\/posts\/(\d+)$/)) {
        const { user, error: error3 } = requireAdmin(request);
        if (error3) return error3;
        const db = (0, import_database.getDB)();
        const postId = parseInt(m[1]);
        const post = (0, import_database.findById)("posts", postId);
        if (!post) return json({ error: "\u5E16\u5B50\u4E0D\u5B58\u5728" }, 404);
        const commentIds = db.comments.filter((c) => c.post_id === postId).map((c) => c.id);
        const pollIds = db.post_polls.filter((p) => p.post_id === postId).map((p) => p.id);
        db.poll_votes = db.poll_votes.filter((v) => !pollIds.includes(v.poll_id));
        db.post_polls = db.post_polls.filter((p) => p.post_id !== postId);
        db.comment_likes = db.comment_likes.filter((cl) => !commentIds.includes(cl.comment_id));
        db.comments = db.comments.filter((c) => c.post_id !== postId);
        db.post_likes = db.post_likes.filter((l) => l.post_id !== postId);
        db.post_votes = db.post_votes.filter((v) => v.post_id !== postId);
        db.favorites = db.favorites.filter((f) => f.post_id !== postId);
        db.posts = db.posts.filter((p) => p.id !== postId);
        if (post.user_id) {
          const author = (0, import_database.findById)("users", post.user_id);
          if (author && author.post_count > 0) author.post_count -= 1;
        }
        (0, import_database.markDirty)();
        return json({ success: true });
      }
      if (m = path.match(/^\/api\/admin\/ban\/(\d+)$/)) {
        const { user, error: error3 } = requireAdmin(request);
        if (error3) return error3;
        const userId = parseInt(m[1]);
        const existing = (0, import_database.findOne)("banned_users", { user_id: userId });
        if (!existing) return json({ error: "\u8BE5\u7528\u6237\u672A\u88AB\u7981\u8A00" }, 404);
        (0, import_database.remove)("banned_users", { user_id: userId });
        return json({ success: true });
      }
    }
    return json({ error: "Not Found" }, 404);
  } catch (e) {
    return json({ error: e.message, stack: e.stack?.split("\n").slice(0, 3).join(" ") }, 500);
  }
}
async function onRequest(context2) {
  const { request, env: env2, waitUntil } = context2;
  (0, import_database.setEnv)(env2);
  const response = await handleRequest(request);
  if (waitUntil) {
    waitUntil((0, import_database.saveDB)());
  } else {
    await (0, import_database.saveDB)();
  }
  return response;
}
var import_jsonwebtoken, import_bcryptjs, import_database, JWT_SECRET, loginAttempts;
var init_route = __esm({
  "api/[[route]].js"() {
    init_functionsRoutes_0_7309934772454185();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    import_jsonwebtoken = __toESM(require_jsonwebtoken());
    import_bcryptjs = __toESM(require_bcrypt());
    import_database = __toESM(require_database());
    JWT_SECRET = "hanlin-forum-secret-2026";
    __name(json, "json");
    __name(getIP, "getIP");
    __name(getBody, "getBody");
    loginAttempts = /* @__PURE__ */ new Map();
    __name(checkLoginRate, "checkLoginRate");
    __name(getAuthUser, "getAuthUser");
    __name(requireAuth, "requireAuth");
    __name(requireAdmin, "requireAdmin");
    __name(formatPost, "formatPost");
    __name(formatComment, "formatComment");
    __name(publicUser, "publicUser");
    __name(handleRequest, "handleRequest");
    __name(onRequest, "onRequest");
  }
});

// ../.wrangler/tmp/pages-jNJUz7/functionsRoutes-0.7309934772454185.mjs
var routes;
var init_functionsRoutes_0_7309934772454185 = __esm({
  "../.wrangler/tmp/pages-jNJUz7/functionsRoutes-0.7309934772454185.mjs"() {
    init_route();
    routes = [
      {
        routePath: "/api/:route*",
        mountPath: "/api",
        method: "",
        middlewares: [],
        modules: [onRequest]
      }
    ];
  }
});

// E:/TraeData/ModularData/ai-agent/vm/tools/node/node_modules/wrangler/templates/pages-template-worker.ts
init_functionsRoutes_0_7309934772454185();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// E:/TraeData/ModularData/ai-agent/vm/tools/node/node_modules/wrangler/node_modules/path-to-regexp/dist.es2015/index.js
init_functionsRoutes_0_7309934772454185();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count3 = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count3--;
          if (count3 === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count3++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count3)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");

// E:/TraeData/ModularData/ai-agent/vm/tools/node/node_modules/wrangler/templates/pages-template-worker.ts
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env2, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context2 = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env: env2,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context2);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env2["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error3) {
      if (isFailOpen) {
        const response = await env2["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error3;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");
export {
  pages_template_worker_default as default
};
/*! Bundled license information:

safe-buffer/index.js:
  (*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)

bcryptjs/dist/bcrypt.js:
  (**
   * @license bcrypt.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
   * Released under the Apache License, Version 2.0
   * see: https://github.com/dcodeIO/bcrypt.js for details
   *)
*/

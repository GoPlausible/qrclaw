var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
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
var PerformanceEntry = class {
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
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
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
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
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
var PerformanceObserverEntryList = class {
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
var Performance = class {
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
var PerformanceObserver = class {
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
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
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
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
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

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
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

// node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
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

// node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process extends EventEmitter {
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

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var workerdProcess = getBuiltinModule("node:process");
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
var { exit, features, platform } = workerdProcess;
var {
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
} = unenvProcess;
var _process = {
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
var process_default = _process;

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// node_modules/@cf-wasm/internals/dist/polyfills/image-data.js
var globalObject = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : self;
if (!("ImageData" in globalObject)) {
  let getColorSpaceFromImageSettings = /* @__PURE__ */ __name(function(imageSettings) {
    if (typeof imageSettings !== "undefined") {
      if (typeof imageSettings !== "object") {
        throw new TypeError("Failed to construct 'ImageData': The provided value is not of type 'ImageDataSettings'.");
      }
      if (imageSettings && "colorSpace" in imageSettings && typeof imageSettings.colorSpace !== "undefined") {
        if (typeof imageSettings.colorSpace !== "string" || !colorSpaceEnum.includes(imageSettings.colorSpace)) {
          throw new TypeError(
            `Failed to construct 'ImageData': Failed to read the 'colorSpace' property from 'ImageDataSettings': The provided value '${imageSettings.colorSpace}' is not a valid enum value of type PredefinedColorSpace.`
          );
        }
        return imageSettings.colorSpace;
      }
    }
    return "srgb";
  }, "getColorSpaceFromImageSettings");
  getColorSpaceFromImageSettings2 = getColorSpaceFromImageSettings;
  const widthMap = /* @__PURE__ */ new WeakMap();
  const heightMap = /* @__PURE__ */ new WeakMap();
  const colorSpaceMap = /* @__PURE__ */ new WeakMap();
  const colorSpaceEnum = ["display-p3", "srgb"];
  class ImageData22 {
    static {
      __name(this, "ImageData2");
    }
    constructor(...args) {
      let imageWidth;
      let imageHeight;
      let imageData;
      let imageColorSpace;
      const [arg1, arg2, arg3, arg4] = args;
      if (args.length < 2) {
        throw new TypeError(`Failed to construct 'ImageData': 2 arguments required, but only ${args.length} present.`);
      }
      if (typeof arg1 === "object") {
        if (!(arg1 instanceof Uint8ClampedArray)) {
          throw new TypeError("Failed to construct 'ImageData': parameter 1 is not of type 'Uint8ClampedArray'.");
        }
        if (typeof arg2 !== "number" || arg2 === 0) {
          throw new Error("Failed to construct 'ImageData': The source width is zero or not a number.");
        }
        imageData = arg1;
        imageWidth = arg2 >>> 0;
        if (imageWidth * 4 > imageData.length) {
          throw new Error("Failed to construct 'ImageData': The requested image size exceeds the supported range.");
        }
        if (imageData.length % 4 !== 0) {
          throw new Error("Failed to construct 'ImageData': The input data length is not a multiple of 4.");
        }
        if (imageData.length % (4 * imageWidth) !== 0) {
          throw new Error("Failed to construct 'ImageData': The input data length is not a multiple of (4 * width).");
        }
        if (typeof arg3 !== "undefined") {
          if (typeof arg3 !== "number" || arg3 === 0) {
            throw new Error("Failed to construct 'ImageData': The source height is zero or not a number.");
          }
          imageHeight = arg3 >>> 0;
          if (imageData.length % (4 * imageWidth * imageHeight) !== 0) {
            throw new Error("Failed to construct 'ImageData': The input data length is not equal to (4 * width * height).");
          }
        } else {
          imageHeight = imageData.byteLength / imageWidth / 4;
        }
        imageColorSpace = getColorSpaceFromImageSettings(arg4);
      } else {
        if (typeof arg1 !== "number" || arg1 === 0) {
          throw new Error("Failed to construct 'ImageData': The source width is zero or not a number.");
        }
        imageWidth = arg1 >>> 0;
        if (typeof arg2 !== "number" || arg2 === 0) {
          throw new Error("Failed to construct 'ImageData': The source height is zero or not a number.");
        }
        imageHeight = arg2 >>> 0;
        if (imageWidth * imageHeight >= 1 << 30) {
          throw new Error("Failed to construct 'ImageData': The requested image size exceeds the supported range.");
        }
        imageData = new Uint8ClampedArray(imageWidth * imageHeight * 4);
        imageColorSpace = getColorSpaceFromImageSettings(arg3);
      }
      widthMap.set(this, imageWidth);
      heightMap.set(this, imageHeight);
      colorSpaceMap.set(this, imageColorSpace);
      Object.defineProperty(this, "data", {
        configurable: true,
        enumerable: true,
        value: imageData,
        writable: false
      });
    }
  }
  Object.defineProperty(ImageData22.prototype, "width", {
    enumerable: true,
    configurable: true,
    get() {
      return widthMap.get(this);
    }
  });
  Object.defineProperty(ImageData22.prototype, "height", {
    enumerable: true,
    configurable: true,
    get() {
      return heightMap.get(this);
    }
  });
  Object.defineProperty(ImageData22.prototype, "colorSpace", {
    enumerable: true,
    configurable: true,
    get() {
      return colorSpaceMap.get(this);
    }
  });
  globalObject.ImageData = ImageData22;
}
var getColorSpaceFromImageSettings2;
var ImageData2 = globalObject.ImageData;

// node_modules/@cf-wasm/photon/dist/chunk-3HOZTLH2.js
var wasm;
function addToExternrefTable0(obj) {
  const idx = wasm.__externref_table_alloc();
  wasm.__wbindgen_export_2.set(idx, obj);
  return idx;
}
__name(addToExternrefTable0, "addToExternrefTable0");
function handleError(f, args) {
  try {
    return f.apply(this, args);
  } catch (e) {
    const idx = addToExternrefTable0(e);
    wasm.__wbindgen_exn_store(idx);
  }
}
__name(handleError, "handleError");
function isLikeNone(x) {
  return x === void 0 || x === null;
}
__name(isLikeNone, "isLikeNone");
var cachedTextDecoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-8", { ignoreBOM: true, fatal: true }) : { decode: /* @__PURE__ */ __name(() => {
  throw Error("TextDecoder not available");
}, "decode") };
if (typeof TextDecoder !== "undefined") {
  cachedTextDecoder.decode();
}
var cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
  if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
    cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8ArrayMemory0;
}
__name(getUint8ArrayMemory0, "getUint8ArrayMemory0");
function getStringFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}
__name(getStringFromWasm0, "getStringFromWasm0");
var WASM_VECTOR_LEN = 0;
function passArray8ToWasm0(arg, malloc) {
  const ptr = malloc(arg.length * 1, 1) >>> 0;
  getUint8ArrayMemory0().set(arg, ptr / 1);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}
__name(passArray8ToWasm0, "passArray8ToWasm0");
var cachedDataViewMemory0 = null;
function getDataViewMemory0() {
  if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || cachedDataViewMemory0.buffer.detached === void 0 && cachedDataViewMemory0.buffer !== wasm.memory.buffer) {
    cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
  }
  return cachedDataViewMemory0;
}
__name(getDataViewMemory0, "getDataViewMemory0");
var cachedUint8ClampedArrayMemory0 = null;
function getUint8ClampedArrayMemory0() {
  if (cachedUint8ClampedArrayMemory0 === null || cachedUint8ClampedArrayMemory0.byteLength === 0) {
    cachedUint8ClampedArrayMemory0 = new Uint8ClampedArray(wasm.memory.buffer);
  }
  return cachedUint8ClampedArrayMemory0;
}
__name(getUint8ClampedArrayMemory0, "getUint8ClampedArrayMemory0");
function getClampedArrayU8FromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return getUint8ClampedArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}
__name(getClampedArrayU8FromWasm0, "getClampedArrayU8FromWasm0");
var cachedTextEncoder = typeof TextEncoder !== "undefined" ? new TextEncoder("utf-8") : { encode: /* @__PURE__ */ __name(() => {
  throw Error("TextEncoder not available");
}, "encode") };
var encodeString = typeof cachedTextEncoder.encodeInto === "function" ? function(arg, view) {
  return cachedTextEncoder.encodeInto(arg, view);
} : function(arg, view) {
  const buf = cachedTextEncoder.encode(arg);
  view.set(buf);
  return {
    read: arg.length,
    written: buf.length
  };
};
function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === void 0) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr2 = malloc(buf.length, 1) >>> 0;
    getUint8ArrayMemory0().subarray(ptr2, ptr2 + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr2;
  }
  let len = arg.length;
  let ptr = malloc(len, 1) >>> 0;
  const mem = getUint8ArrayMemory0();
  let offset2 = 0;
  for (; offset2 < len; offset2++) {
    const code = arg.charCodeAt(offset2);
    if (code > 127) break;
    mem[ptr + offset2] = code;
  }
  if (offset2 !== len) {
    if (offset2 !== 0) {
      arg = arg.slice(offset2);
    }
    ptr = realloc(ptr, len, len = offset2 + arg.length * 3, 1) >>> 0;
    const view = getUint8ArrayMemory0().subarray(ptr + offset2, ptr + len);
    const ret = encodeString(arg, view);
    offset2 += ret.written;
    ptr = realloc(ptr, len, offset2, 1) >>> 0;
  }
  WASM_VECTOR_LEN = offset2;
  return ptr;
}
__name(passStringToWasm0, "passStringToWasm0");
function debugString(val) {
  const type = typeof val;
  if (type == "number" || type == "boolean" || val == null) {
    return `${val}`;
  }
  if (type == "string") {
    return `"${val}"`;
  }
  if (type == "symbol") {
    const description = val.description;
    if (description == null) {
      return "Symbol";
    } else {
      return `Symbol(${description})`;
    }
  }
  if (type == "function") {
    const name = val.name;
    if (typeof name == "string" && name.length > 0) {
      return `Function(${name})`;
    } else {
      return "Function";
    }
  }
  if (Array.isArray(val)) {
    const length = val.length;
    let debug3 = "[";
    if (length > 0) {
      debug3 += debugString(val[0]);
    }
    for (let i = 1; i < length; i++) {
      debug3 += ", " + debugString(val[i]);
    }
    debug3 += "]";
    return debug3;
  }
  const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
  let className;
  if (builtInMatches && builtInMatches.length > 1) {
    className = builtInMatches[1];
  } else {
    return toString.call(val);
  }
  if (className == "Object") {
    try {
      return "Object(" + JSON.stringify(val) + ")";
    } catch (_) {
      return "Object";
    }
  }
  if (val instanceof Error) {
    return `${val.name}: ${val.message}
${val.stack}`;
  }
  return className;
}
__name(debugString, "debugString");
function getArrayU8FromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}
__name(getArrayU8FromWasm0, "getArrayU8FromWasm0");
var SamplingFilter = Object.freeze({
  Nearest: 1,
  "1": "Nearest",
  Triangle: 2,
  "2": "Triangle",
  CatmullRom: 3,
  "3": "CatmullRom",
  Gaussian: 4,
  "4": "Gaussian",
  Lanczos3: 5,
  "5": "Lanczos3"
});
var PhotonImageFinalization = typeof FinalizationRegistry === "undefined" ? { register: /* @__PURE__ */ __name(() => {
}, "register"), unregister: /* @__PURE__ */ __name(() => {
}, "unregister") } : new FinalizationRegistry((ptr) => wasm.__wbg_photonimage_free(ptr >>> 0, 1));
var PhotonImage = class _PhotonImage {
  static {
    __name(this, "_PhotonImage");
  }
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_PhotonImage.prototype);
    obj.__wbg_ptr = ptr;
    PhotonImageFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    PhotonImageFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_photonimage_free(ptr, 0);
  }
  /**
   * Create a new PhotonImage from a Vec of u8s, which represent raw pixels.
   * @param {Uint8Array} raw_pixels
   * @param {number} width
   * @param {number} height
   */
  constructor(raw_pixels, width, height) {
    const ptr0 = passArray8ToWasm0(raw_pixels, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.photonimage_new(ptr0, len0, width, height);
    this.__wbg_ptr = ret >>> 0;
    PhotonImageFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * Create a new PhotonImage from a base64 string.
   * @param {string} base64
   * @returns {PhotonImage}
   */
  static new_from_base64(base64) {
    const ptr0 = passStringToWasm0(base64, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.base64_to_image(ptr0, len0);
    return _PhotonImage.__wrap(ret);
  }
  /**
   * Create a new PhotonImage from a byteslice.
   * @param {Uint8Array} vec
   * @returns {PhotonImage}
   */
  static new_from_byteslice(vec) {
    const ptr0 = passArray8ToWasm0(vec, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.photonimage_new_from_byteslice(ptr0, len0);
    return _PhotonImage.__wrap(ret);
  }
  /**
   * Create a new PhotonImage from a Blob/File.
   * @param {Blob} blob
   * @returns {PhotonImage}
   */
  static new_from_blob(blob) {
    const ret = wasm.photonimage_new_from_blob(blob);
    return _PhotonImage.__wrap(ret);
  }
  /**
   * Create a new PhotonImage from a HTMLImageElement
   * @param {HTMLImageElement} image
   * @returns {PhotonImage}
   */
  static new_from_image(image) {
    const ret = wasm.photonimage_new_from_image(image);
    return _PhotonImage.__wrap(ret);
  }
  /**
   * Get the width of the PhotonImage.
   * @returns {number}
   */
  get_width() {
    const ret = wasm.photonimage_get_width(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * Get the PhotonImage's pixels as a Vec of u8s.
   * @returns {Uint8Array}
   */
  get_raw_pixels() {
    const ret = wasm.photonimage_get_raw_pixels(this.__wbg_ptr);
    var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    return v1;
  }
  /**
   * Get the height of the PhotonImage.
   * @returns {number}
   */
  get_height() {
    const ret = wasm.photonimage_get_height(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * Convert the PhotonImage to base64.
   * @returns {string}
   */
  get_base64() {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.photonimage_get_base64(this.__wbg_ptr);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * Convert the PhotonImage to raw bytes. Returns PNG.
   * @returns {Uint8Array}
   */
  get_bytes() {
    const ret = wasm.photonimage_get_bytes(this.__wbg_ptr);
    var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    return v1;
  }
  /**
   * Convert the PhotonImage to raw bytes. Returns a JPEG.
   * @param {number} quality
   * @returns {Uint8Array}
   */
  get_bytes_jpeg(quality) {
    const ret = wasm.photonimage_get_bytes_jpeg(this.__wbg_ptr, quality);
    var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    return v1;
  }
  /**
   * Convert the PhotonImage to raw bytes. Returns a WEBP.
   * @returns {Uint8Array}
   */
  get_bytes_webp() {
    const ret = wasm.photonimage_get_bytes_webp(this.__wbg_ptr);
    var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    return v1;
  }
  /**
   * Convert the PhotonImage's raw pixels to JS-compatible ImageData.
   * @returns {ImageData}
   */
  get_image_data() {
    const ret = wasm.photonimage_get_image_data(this.__wbg_ptr);
    return ret;
  }
  /**
   * Convert ImageData to raw pixels, and update the PhotonImage's raw pixels to this.
   * @param {ImageData} img_data
   */
  set_imgdata(img_data) {
    wasm.photonimage_set_imgdata(this.__wbg_ptr, img_data);
  }
  /**
   * Calculates estimated filesize and returns number of bytes
   * @returns {bigint}
   */
  get_estimated_filesize() {
    const ret = wasm.photonimage_get_estimated_filesize(this.__wbg_ptr);
    return BigInt.asUintN(64, ret);
  }
};
var RgbFinalization = typeof FinalizationRegistry === "undefined" ? { register: /* @__PURE__ */ __name(() => {
}, "register"), unregister: /* @__PURE__ */ __name(() => {
}, "unregister") } : new FinalizationRegistry((ptr) => wasm.__wbg_rgb_free(ptr >>> 0, 1));
var RgbaFinalization = typeof FinalizationRegistry === "undefined" ? { register: /* @__PURE__ */ __name(() => {
}, "register"), unregister: /* @__PURE__ */ __name(() => {
}, "unregister") } : new FinalizationRegistry((ptr) => wasm.__wbg_rgba_free(ptr >>> 0, 1));
async function __wbg_load(module, imports) {
  if (typeof Response === "function" && module instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming === "function") {
      try {
        return await WebAssembly.instantiateStreaming(module, imports);
      } catch (e) {
        if (module.headers.get("Content-Type") != "application/wasm") {
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
        } else {
          throw e;
        }
      }
    }
    const bytes = await module.arrayBuffer();
    return await WebAssembly.instantiate(bytes, imports);
  } else {
    const instance = await WebAssembly.instantiate(module, imports);
    if (instance instanceof WebAssembly.Instance) {
      return { instance, module };
    } else {
      return instance;
    }
  }
}
__name(__wbg_load, "__wbg_load");
function __wbg_get_imports() {
  const imports = {};
  imports.wbg = {};
  imports.wbg.__wbg_appendChild_8204974b7328bf98 = function() {
    return handleError(function(arg0, arg1) {
      const ret = arg0.appendChild(arg1);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_body_942ea927546a04ba = function(arg0) {
    const ret = arg0.body;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
  };
  imports.wbg.__wbg_buffer_609cc3eee51ed158 = function(arg0) {
    const ret = arg0.buffer;
    return ret;
  };
  imports.wbg.__wbg_call_672a4d21634d4a24 = function() {
    return handleError(function(arg0, arg1) {
      const ret = arg0.call(arg1);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_createElement_8c9931a732ee2fea = function() {
    return handleError(function(arg0, arg1, arg2) {
      const ret = arg0.createElement(getStringFromWasm0(arg1, arg2));
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_data_d1ed736c1e42b10e = function(arg0, arg1) {
    const ret = arg1.data;
    const ptr1 = passArray8ToWasm0(ret, wasm.__wbindgen_malloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.__wbg_document_d249400bd7bd996d = function(arg0) {
    const ret = arg0.document;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
  };
  imports.wbg.__wbg_drawImage_03f7ae2a95a9605f = function() {
    return handleError(function(arg0, arg1, arg2, arg3) {
      arg0.drawImage(arg1, arg2, arg3);
    }, arguments);
  };
  imports.wbg.__wbg_drawImage_2603e2b61e66d571 = function() {
    return handleError(function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
      arg0.drawImage(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
    }, arguments);
  };
  imports.wbg.__wbg_error_7534b8e9a36f1ab4 = function(arg0, arg1) {
    let deferred0_0;
    let deferred0_1;
    try {
      deferred0_0 = arg0;
      deferred0_1 = arg1;
      console.error(getStringFromWasm0(arg0, arg1));
    } finally {
      wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
    }
  };
  imports.wbg.__wbg_getContext_e9cf379449413580 = function() {
    return handleError(function(arg0, arg1, arg2) {
      const ret = arg0.getContext(getStringFromWasm0(arg1, arg2));
      return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments);
  };
  imports.wbg.__wbg_getImageData_c02374a30b126dab = function() {
    return handleError(function(arg0, arg1, arg2, arg3, arg4) {
      const ret = arg0.getImageData(arg1, arg2, arg3, arg4);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_height_1d93eb7f5e355d97 = function(arg0) {
    const ret = arg0.height;
    return ret;
  };
  imports.wbg.__wbg_height_838cee19ba8597db = function(arg0) {
    const ret = arg0.height;
    return ret;
  };
  imports.wbg.__wbg_height_d3f39e12f0f62121 = function(arg0) {
    const ret = arg0.height;
    return ret;
  };
  imports.wbg.__wbg_instanceof_CanvasRenderingContext2d_df82a4d3437bf1cc = function(arg0) {
    let result;
    try {
      result = arg0 instanceof CanvasRenderingContext2D;
    } catch (_) {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_instanceof_HtmlCanvasElement_2ea67072a7624ac5 = function(arg0) {
    let result;
    try {
      result = arg0 instanceof HTMLCanvasElement;
    } catch (_) {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_instanceof_Window_def73ea0955fc569 = function(arg0) {
    let result;
    try {
      result = arg0 instanceof Window;
    } catch (_) {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_length_a446193dc22c12f8 = function(arg0) {
    const ret = arg0.length;
    return ret;
  };
  imports.wbg.__wbg_new_8a6f238a6ece86ea = function() {
    const ret = new Error();
    return ret;
  };
  imports.wbg.__wbg_new_a12002a7f91c75be = function(arg0) {
    const ret = new Uint8Array(arg0);
    return ret;
  };
  imports.wbg.__wbg_newnoargs_105ed471475aaf50 = function(arg0, arg1) {
    const ret = new Function(getStringFromWasm0(arg0, arg1));
    return ret;
  };
  imports.wbg.__wbg_newwithu8clampedarrayandsh_7ea6ee082a25bc85 = function() {
    return handleError(function(arg0, arg1, arg2, arg3) {
      const ret = new ImageData(getClampedArrayU8FromWasm0(arg0, arg1), arg2 >>> 0, arg3 >>> 0);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_putImageData_4c5aa10f3b3e4924 = function() {
    return handleError(function(arg0, arg1, arg2, arg3) {
      arg0.putImageData(arg1, arg2, arg3);
    }, arguments);
  };
  imports.wbg.__wbg_set_65595bdd868b3009 = function(arg0, arg1, arg2) {
    arg0.set(arg1, arg2 >>> 0);
  };
  imports.wbg.__wbg_setheight_da683a33fa99843c = function(arg0, arg1) {
    arg0.height = arg1 >>> 0;
  };
  imports.wbg.__wbg_settextContent_d29397f7b994d314 = function(arg0, arg1, arg2) {
    arg0.textContent = arg1 === 0 ? void 0 : getStringFromWasm0(arg1, arg2);
  };
  imports.wbg.__wbg_setwidth_c5fed9f5e7f0b406 = function(arg0, arg1) {
    arg0.width = arg1 >>> 0;
  };
  imports.wbg.__wbg_stack_0ed75d68575b0f3c = function(arg0, arg1) {
    const ret = arg1.stack;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.__wbg_static_accessor_GLOBAL_88a902d13a557d07 = function() {
    const ret = typeof global === "undefined" ? null : global;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
  };
  imports.wbg.__wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0 = function() {
    const ret = typeof globalThis === "undefined" ? null : globalThis;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
  };
  imports.wbg.__wbg_static_accessor_SELF_37c5d418e4bf5819 = function() {
    const ret = typeof self === "undefined" ? null : self;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
  };
  imports.wbg.__wbg_static_accessor_WINDOW_5de37043a91a9c40 = function() {
    const ret = typeof window === "undefined" ? null : window;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
  };
  imports.wbg.__wbg_width_4f334fc47ef03de1 = function(arg0) {
    const ret = arg0.width;
    return ret;
  };
  imports.wbg.__wbg_width_5dde457d606ba683 = function(arg0) {
    const ret = arg0.width;
    return ret;
  };
  imports.wbg.__wbg_width_b0c1d9f437a95799 = function(arg0) {
    const ret = arg0.width;
    return ret;
  };
  imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
    const ret = debugString(arg1);
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.__wbindgen_init_externref_table = function() {
    const table3 = wasm.__wbindgen_export_2;
    const offset2 = table3.grow(4);
    table3.set(0, void 0);
    table3.set(offset2 + 0, void 0);
    table3.set(offset2 + 1, null);
    table3.set(offset2 + 2, true);
    table3.set(offset2 + 3, false);
    ;
  };
  imports.wbg.__wbindgen_is_undefined = function(arg0) {
    const ret = arg0 === void 0;
    return ret;
  };
  imports.wbg.__wbindgen_memory = function() {
    const ret = wasm.memory;
    return ret;
  };
  imports.wbg.__wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
  };
  return imports;
}
__name(__wbg_get_imports, "__wbg_get_imports");
function __wbg_init_memory(imports, memory) {
}
__name(__wbg_init_memory, "__wbg_init_memory");
function __wbg_finalize_init(instance, module) {
  wasm = instance.exports;
  __wbg_init.__wbindgen_wasm_module = module;
  cachedDataViewMemory0 = null;
  cachedUint8ArrayMemory0 = null;
  cachedUint8ClampedArrayMemory0 = null;
  wasm.__wbindgen_start();
  return wasm;
}
__name(__wbg_finalize_init, "__wbg_finalize_init");
function initSync(module) {
  if (wasm !== void 0) return wasm;
  if (typeof module !== "undefined") {
    if (Object.getPrototypeOf(module) === Object.prototype) {
      ({ module } = module);
    } else {
      console.warn("using deprecated parameters for `initSync()`; pass a single object instead");
    }
  }
  const imports = __wbg_get_imports();
  __wbg_init_memory(imports);
  const instance = new WebAssembly.Instance(module, imports);
  return __wbg_finalize_init(instance, module);
}
__name(initSync, "initSync");
async function __wbg_init(module_or_path) {
  if (wasm !== void 0) return wasm;
  if (typeof module_or_path !== "undefined") {
    if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
      ({ module_or_path } = module_or_path);
    } else {
      console.warn("using deprecated parameters for the initialization function; pass a single object instead");
    }
  }
  const imports = __wbg_get_imports();
  if (typeof module_or_path === "string" || typeof Request === "function" && module_or_path instanceof Request || typeof URL === "function" && module_or_path instanceof URL) {
    module_or_path = fetch(module_or_path);
  }
  __wbg_init_memory(imports);
  const { instance, module } = await __wbg_load(await module_or_path, imports);
  return __wbg_finalize_init(instance, module);
}
__name(__wbg_init, "__wbg_init");
var photon_rs_default = __wbg_init;
async function initPhoton(input) {
  if (initPhoton.initialized) {
    throw new Error("(@cf-wasm/photon): Function already called. The `initPhoton()` function can be used only once.");
  }
  if (!input) {
    throw new Error("(@cf-wasm/photon): Argument `input` is not valid.");
  }
  initPhoton.initialized = true;
  initPhoton.promise = (async () => {
    const output = await photon_rs_default(await input);
    initPhoton.ready = true;
    return output;
  })();
  return initPhoton.promise;
}
__name(initPhoton, "initPhoton");
initPhoton.sync = (input) => {
  if (initPhoton.initialized) {
    throw new Error("(@cf-wasm/photon): Function already called. The `initPhoton()` function can be used only once.");
  }
  if (!input) {
    throw new Error("(@cf-wasm/photon): Argument `input` is not valid.");
  }
  initPhoton.initialized = true;
  const output = initSync(input);
  initPhoton.promise = Promise.resolve(output);
  initPhoton.ready = true;
  return output;
};
initPhoton.promise = null;
initPhoton.initialized = false;
initPhoton.ready = false;
initPhoton.ensure = async () => {
  if (!initPhoton.promise) {
    throw new Error("(@cf-wasm/photon): Function not called. Call `initPhoton()` function first.");
  }
  return initPhoton.promise;
};

// node_modules/@cf-wasm/photon/dist/workerd.js
import photonWasmModule from "./66794212c353f6819275a12dfe4a559e9f206c23-photon_rs_bg.wasm";
initPhoton.sync({ module: photonWasmModule });

// node_modules/@juit/qrcode/dist/encode.mjs
var ALPHANUM = (function(s) {
  const res = {};
  for (let i = 0; i < s.length; i++) {
    res[s[i]] = i;
  }
  return res;
})("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:");
function pushBits(arr, n, value) {
  for (let bit = 1 << n - 1; bit; bit = bit >>> 1) {
    arr.push(!!(bit & value));
  }
  return arr;
}
__name(pushBits, "pushBits");
function binaryEncode(data) {
  const len = data.length;
  const bits = [];
  for (let i = 0; i < len; i++) {
    pushBits(bits, 8, data[i]);
  }
  const d = pushBits([false, true, false, false], 16, len);
  const res = {
    data27: d.concat(bits)
  };
  res.data10 = res.data27;
  if (len < 256) {
    const d2 = pushBits([false, true, false, false], 8, len);
    res.data1 = d2.concat(bits);
  }
  return res;
}
__name(binaryEncode, "binaryEncode");
function alphanumEncode(str) {
  const len = str.length;
  const bits = [];
  for (let i = 0; i < len; i += 2) {
    let b = 6;
    let n = ALPHANUM[str[i]];
    if (str[i + 1]) {
      b = 11;
      n = n * 45 + ALPHANUM[str[i + 1]];
    }
    pushBits(bits, b, n);
  }
  const d = pushBits([false, false, true, false], 13, len);
  const res = {
    data27: d.concat(bits)
  };
  if (len < 2048) {
    const d2 = pushBits([false, false, true, false], 11, len);
    res.data10 = d2.concat(bits);
  }
  if (len < 512) {
    const d2 = pushBits([false, false, true, false], 9, len);
    res.data1 = d2.concat(bits);
  }
  return res;
}
__name(alphanumEncode, "alphanumEncode");
function numericEncode(str) {
  const len = str.length;
  const bits = [];
  for (let i = 0; i < len; i += 3) {
    const s = str.substring(i, i + 3);
    const b = Math.ceil(s.length * 10 / 3);
    pushBits(bits, b, parseInt(s, 10));
  }
  const d = pushBits([false, false, false, true], 14, len);
  const res = {
    data27: d.concat(bits)
  };
  if (len < 4096) {
    const d2 = pushBits([false, false, false, true], 12, len);
    res.data10 = d2.concat(bits);
  }
  if (len < 1024) {
    const d2 = pushBits([false, false, false, true], 10, len);
    res.data1 = d2.concat(bits);
  }
  return res;
}
__name(numericEncode, "numericEncode");
function urlEncode(str) {
  const slash = str.indexOf("/", 8) + 1 || str.length;
  const res = encodeQrCodeMessage(str.slice(0, slash).toUpperCase(), false);
  if (slash >= str.length) return res;
  const path = encodeQrCodeMessage(str.slice(slash), false);
  res.data27 = res.data27.concat(path.data27);
  if (res.data10 && path.data10) {
    res.data10 = res.data10.concat(path.data10);
  }
  if (res.data1 && path.data1) {
    res.data1 = res.data1.concat(path.data1);
  }
  return res;
}
__name(urlEncode, "urlEncode");
function encodeQrCodeMessage(message, url) {
  let data;
  if (typeof message === "string") {
    data = new TextEncoder().encode(message);
    if (/^[0-9]+$/.test(message)) {
      if (data.length > 7089) throw new Error(`Too much numeric data (len=${data.length})`);
      return numericEncode(message);
    }
    if (/^[0-9A-Z $%*+./:-]+$/.test(message)) {
      if (data.length > 4296) throw new Error(`Too much alphanumeric data (len=${data.length})`);
      return alphanumEncode(message);
    }
    if (url && /^https?:/i.test(message)) {
      return urlEncode(message);
    }
  } else {
    data = message;
  }
  if (data.length > 2953) throw new Error(`Too much binary data (len=${data.length})`);
  return binaryEncode(data);
}
__name(encodeQrCodeMessage, "encodeQrCodeMessage");

// node_modules/@juit/qrcode/dist/utils/deflate.mjs
function deflate(data) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    const writer = new WritableStream({
      write: /* @__PURE__ */ __name((chunk) => void chunks.push(chunk), "write")
    });
    return new Blob([data]).stream().pipeThrough(new CompressionStream("deflate")).pipeTo(writer).then(() => new Blob(chunks).arrayBuffer()).then((buffer) => new Uint8Array(buffer)).then(resolve, reject);
  });
}
__name(deflate, "deflate");

// node_modules/@juit/qrcode/dist/utils/merge.mjs
function mergeArrays(...arrays) {
  const chunks = [];
  const size = arrays.reduce((size2, array) => {
    chunks.push([size2, array]);
    return size2 + array.length;
  }, 0);
  const result = new Uint8Array(size);
  for (const [offset2, array] of chunks) result.set(array, offset2);
  return result;
}
__name(mergeArrays, "mergeArrays");

// node_modules/@juit/qrcode/dist/images/path.mjs
function generatePaths(code) {
  const { matrix, size } = code;
  const filled = [];
  for (let row = -1; row <= size; row++) {
    filled[row] = [];
  }
  const path = [];
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (filled[row][col]) continue;
      filled[row][col] = true;
      if (isDark(row, col)) {
        if (!isDark(row - 1, col)) {
          path.push(plot(row, col, "right"));
        }
      } else {
        if (isDark(row, col - 1)) {
          path.push(plot(row, col, "down"));
        }
      }
    }
  }
  return path;
  function isDark(row, col) {
    if (row < 0 || col < 0 || row >= size || col >= size) return false;
    return !!matrix[row][col];
  }
  __name(isDark, "isDark");
  function plot(row0, col0, dir3) {
    filled[row0][col0] = true;
    const res = [];
    res.push(["M", col0, row0]);
    let row = row0;
    let col = col0;
    let len = 0;
    do {
      switch (dir3) {
        case "right":
          filled[row][col] = true;
          if (isDark(row, col)) {
            filled[row - 1][col] = true;
            if (isDark(row - 1, col)) {
              res.push(["h", len]);
              len = 0;
              dir3 = "up";
            } else {
              len++;
              col++;
            }
          } else {
            res.push(["h", len]);
            len = 0;
            dir3 = "down";
          }
          break;
        case "left":
          filled[row - 1][col - 1] = true;
          if (isDark(row - 1, col - 1)) {
            filled[row][col - 1] = true;
            if (isDark(row, col - 1)) {
              res.push(["h", -len]);
              len = 0;
              dir3 = "down";
            } else {
              len++;
              col--;
            }
          } else {
            res.push(["h", -len]);
            len = 0;
            dir3 = "up";
          }
          break;
        case "down":
          filled[row][col - 1] = true;
          if (isDark(row, col - 1)) {
            filled[row][col] = true;
            if (isDark(row, col)) {
              res.push(["v", len]);
              len = 0;
              dir3 = "right";
            } else {
              len++;
              row++;
            }
          } else {
            res.push(["v", len]);
            len = 0;
            dir3 = "left";
          }
          break;
        case "up":
          filled[row - 1][col] = true;
          if (isDark(row - 1, col)) {
            filled[row - 1][col - 1] = true;
            if (isDark(row - 1, col - 1)) {
              res.push(["v", -len]);
              len = 0;
              dir3 = "left";
            } else {
              len++;
              row--;
            }
          } else {
            res.push(["v", -len]);
            len = 0;
            dir3 = "right";
          }
          break;
      }
    } while (row != row0 || col != col0);
    return res;
  }
  __name(plot, "plot");
}
__name(generatePaths, "generatePaths");

// node_modules/@juit/qrcode/dist/images/pdf.mjs
async function generatePdf(code, options) {
  const { margin = 4, scale = 9 } = { ...options };
  const size = (code.size + 2 * margin) * scale;
  const encoder = new TextEncoder();
  const chunks = [
    encoder.encode("%PDF-1.0\n\n"),
    // PDF header
    encoder.encode("1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj\n"),
    encoder.encode("2 0 obj << /Type /Pages /Count 1 /Kids [ 3 0 R ] >> endobj\n"),
    encoder.encode(`3 0 obj << /Type /Page /Parent 2 0 R /Resources <<>> /Contents 4 0 R /MediaBox [ 0 0 ${size} ${size} ] >> endobj
`)
  ];
  let path = `${scale} 0 0 ${scale} 0 0 cm
`;
  path += generatePaths(code).map(function(subpath) {
    let x = NaN;
    let y = NaN;
    let res = "";
    for (let k = 0; k < subpath.length; k++) {
      const item = subpath[k];
      switch (item[0]) {
        case "M":
          x = item[1] + margin;
          y = code.size - item[2] + margin;
          res += x + " " + y + " m ";
          break;
        case "h":
          x += item[1];
          res += x + " " + y + " l ";
          break;
        case "v":
          y -= item[1];
          res += x + " " + y + " l ";
          break;
      }
    }
    res += "h";
    return res;
  }).join("\n");
  path += "\nf\n";
  const deflated = await deflate(encoder.encode(path));
  chunks.push(mergeArrays(
    encoder.encode(`4 0 obj << /Length ${deflated.length} /Filter /FlateDecode >> stream
`),
    // start the stream
    deflated,
    // the path is deflated
    encoder.encode("\nendstream\nendobj\n")
    // end the stream
  ));
  let xref = "xref\n0 5\n0000000000 65535 f \n";
  let offset2 = chunks[0].length;
  for (let i = 1; i < 5; i++) {
    xref += `0000000000${offset2}`.slice(-10) + " 00000 n \n";
    offset2 += chunks[i].length;
  }
  chunks.push(
    encoder.encode(xref),
    encoder.encode("trailer << /Root 1 0 R /Size 5 >>\n"),
    encoder.encode("startxref\n" + offset2 + "\n%%EOF\n")
  );
  return mergeArrays(...chunks);
}
__name(generatePdf, "generatePdf");

// node_modules/@juit/qrcode/dist/utils/crc32.mjs
var CRC_TABLE = (() => {
  const table3 = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) {
        c = 3988292384 ^ c >>> 1;
      } else {
        c = c >>> 1;
      }
    }
    table3[n] = c >>> 0;
  }
  return table3;
})();
function crc32(array, offset2 = 0, length) {
  let crc = -1;
  const end = length === void 0 ? array.length : length > 0 ? offset2 + length : array.length + length;
  for (let i = offset2; i < end; i++) {
    crc = CRC_TABLE[(crc ^ array[i]) & 255] ^ crc >>> 8;
  }
  return (crc ^ -1) >>> 0;
}
__name(crc32, "crc32");

// node_modules/@juit/qrcode/dist/images/png.mjs
var PNG_HEAD = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);
var PNG_IHDR = new Uint8Array([0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0]);
var PNG_IDAT = new Uint8Array([0, 0, 0, 0, 73, 68, 65, 84]);
var PNG_IEND = new Uint8Array([0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130]);
async function png(bitmap2) {
  const chunks = [];
  chunks.push(PNG_HEAD);
  const imageHeader = new Uint8Array(PNG_IHDR);
  const imageHeaderView = new DataView(imageHeader.buffer);
  imageHeaderView.setUint32(8, bitmap2.size, false);
  imageHeaderView.setUint32(12, bitmap2.size, false);
  imageHeaderView.setUint32(21, crc32(imageHeader, 4, -4), false);
  chunks.push(imageHeader);
  const data = await deflate(bitmap2.data);
  const imageData = new Uint8Array(PNG_IDAT.length + data.length + 4);
  const imageDataView = new DataView(imageData.buffer);
  imageData.set(PNG_IDAT, 0);
  imageData.set(data, PNG_IDAT.length);
  imageDataView.setUint32(0, imageData.length - 12, false);
  imageDataView.setUint32(imageData.length - 4, crc32(imageData, 4, -4), false);
  chunks.push(imageData);
  chunks.push(PNG_IEND);
  return new Uint8Array(await new Blob(chunks).arrayBuffer());
}
__name(png, "png");
function bitmap(matrix, scale, margin) {
  const n = matrix.length;
  const x = (n + 2 * margin) * scale;
  const data = new Uint8Array((x + 1) * x).fill(255);
  for (let i = 0; i < x; i++) {
    data[i * (x + 1)] = 0;
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j]) {
        const offset2 = ((margin + i) * (x + 1) + (margin + j)) * scale + 1;
        data.fill(0, offset2, offset2 + scale);
        for (let c = 1; c < scale; c++) {
          const chunk = data.subarray(offset2, offset2 + scale);
          data.set(chunk, offset2 + c * (x + 1));
        }
      }
    }
  }
  return {
    data,
    size: x
  };
}
__name(bitmap, "bitmap");
async function generatePng(code, options) {
  const { margin = 4, scale = 1 } = { ...options };
  const result = bitmap(code.matrix, scale, margin);
  const image = await png(result);
  return image;
}
__name(generatePng, "generatePng");

// node_modules/@juit/qrcode/dist/images/svg.mjs
function convertPath(chunks, code, margin) {
  generatePaths(code).forEach((path) => {
    for (let k = 0; k < path.length; k++) {
      const item = path[k];
      switch (item[0]) {
        case "M":
          chunks.push(`M${item[1] + margin} ${item[2] + margin}`);
          break;
        default:
          chunks.push(...item);
      }
    }
    chunks.push("z");
  });
  return chunks;
}
__name(convertPath, "convertPath");
function generateSvg(code, options) {
  const { margin = 4, scale = 1 } = { ...options };
  const size = code.size + 2 * margin;
  const scaled = size * scale;
  const chunks = convertPath([
    `<svg xmlns="http://www.w3.org/2000/svg" width="${scaled}" height="${scaled}" viewBox="0 0 ${size} ${size}">`,
    '<path d="'
    // beginning of the path "d" attribute...
  ], code, margin);
  chunks.push('"/></svg>');
  return chunks.join("");
}
__name(generateSvg, "generateSvg");

// node_modules/@juit/qrcode/dist/matrix.mjs
function init(version2) {
  const n = version2 * 4 + 17;
  const matrix = new Array(n);
  for (let i = 0; i < n; i++) {
    matrix[i] = new Array(n).fill(0);
  }
  return matrix;
}
__name(init, "init");
function fillFinders(matrix) {
  const n = matrix.length;
  for (let i = -3; i <= 3; i++) {
    for (let j = -3; j <= 3; j++) {
      const max = Math.max(i, j);
      const min = Math.min(i, j);
      const pixel = max == 2 && min >= -2 || min == -2 && max <= 2 ? 128 : 129;
      matrix[3 + i][3 + j] = pixel;
      matrix[3 + i][n - 4 + j] = pixel;
      matrix[n - 4 + i][3 + j] = pixel;
    }
  }
  for (let i = 0; i < 8; i++) {
    matrix[7][i] = matrix[i][7] = matrix[7][n - i - 1] = matrix[i][n - 8] = matrix[n - 8][i] = matrix[n - 1 - i][7] = 128;
  }
}
__name(fillFinders, "fillFinders");
function fillAlignAndTiming(matrix) {
  const n = matrix.length;
  if (n > 21) {
    const len = n - 13;
    let delta = Math.round(len / Math.ceil(len / 28));
    if (delta % 2) delta++;
    const res = [];
    for (let p = len + 6; p > 10; p -= delta) {
      res.unshift(p);
    }
    res.unshift(6);
    for (let i = 0; i < res.length; i++) {
      for (let j = 0; j < res.length; j++) {
        const x = res[i];
        const y = res[j];
        if (matrix[x][y]) continue;
        for (let r = -2; r <= 2; r++) {
          for (let c = -2; c <= 2; c++) {
            const max = Math.max(r, c);
            const min = Math.min(r, c);
            const pixel = max == 1 && min >= -1 || min == -1 && max <= 1 ? 128 : 129;
            matrix[x + r][y + c] = pixel;
          }
        }
      }
    }
  }
  for (let i = 8; i < n - 8; i++) {
    matrix[6][i] = matrix[i][6] = i % 2 ? 128 : 129;
  }
}
__name(fillAlignAndTiming, "fillAlignAndTiming");
function fillStub(matrix) {
  const n = matrix.length;
  for (let i = 0; i < 8; i++) {
    if (i != 6) {
      matrix[8][i] = matrix[i][8] = 128;
    }
    matrix[8][n - 1 - i] = 128;
    matrix[n - 1 - i][8] = 128;
  }
  matrix[8][8] = 128;
  matrix[n - 8][8] = 129;
  if (n < 45) return;
  for (let i = n - 11; i < n - 8; i++) {
    for (let j = 0; j < 6; j++) {
      matrix[i][j] = matrix[j][i] = 128;
    }
  }
}
__name(fillStub, "fillStub");
var fillReserved = (() => {
  const FORMATS = new Array(32);
  const VERSIONS2 = new Array(40);
  const gf15 = 1335;
  const gf18 = 7973;
  const formatsMask = 21522;
  for (let format = 0; format < 32; format++) {
    let res = format << 10;
    for (let i = 5; i > 0; i--) {
      if (res >>> 9 + i) {
        res = res ^ gf15 << i - 1;
      }
    }
    FORMATS[format] = (res | format << 10) ^ formatsMask;
  }
  for (let version2 = 7; version2 <= 40; version2++) {
    let res = version2 << 12;
    for (let i = 6; i > 0; i--) {
      if (res >>> 11 + i) {
        res = res ^ gf18 << i - 1;
      }
    }
    VERSIONS2[version2] = res | version2 << 12;
  }
  const EC_LEVELS2 = { L: 1, M: 0, Q: 3, H: 2 };
  return /* @__PURE__ */ __name(function fillReserved2(matrix, ecLevel, mask) {
    const N = matrix.length;
    const format = FORMATS[EC_LEVELS2[ecLevel] << 3 | mask];
    function _f(k) {
      return format >> k & 1 ? 129 : 128;
    }
    __name(_f, "_f");
    for (let i = 0; i < 8; i++) {
      matrix[8][N - 1 - i] = _f(i);
      if (i < 6) matrix[i][8] = _f(i);
    }
    for (let i = 8; i < 15; i++) {
      matrix[N - 15 + i][8] = _f(i);
      if (i > 8) matrix[8][14 - i] = _f(i);
    }
    matrix[7][8] = _f(6);
    matrix[8][8] = _f(7);
    matrix[8][7] = _f(8);
    const version2 = VERSIONS2[(N - 17) / 4];
    if (!version2) return;
    function _v(k) {
      return version2 >> k & 1 ? 129 : 128;
    }
    __name(_v, "_v");
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 3; j++) {
        matrix[N - 11 + j][i] = matrix[i][N - 11 + j] = _v(i * 3 + j);
      }
    }
  }, "fillReserved2");
})();
var fillData = /* @__PURE__ */ (() => {
  const MASK_FUNCTIONS = [
    function(i, j) {
      return (i + j) % 2 == 0;
    },
    function(i, j) {
      void j;
      return i % 2 == 0;
    },
    function(i, j) {
      void i;
      return j % 3 == 0;
    },
    function(i, j) {
      return (i + j) % 3 == 0;
    },
    function(i, j) {
      return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
    },
    function(i, j) {
      return i * j % 2 + i * j % 3 == 0;
    },
    function(i, j) {
      return (i * j % 2 + i * j % 3) % 2 == 0;
    },
    function(i, j) {
      return (i * j % 3 + (i + j) % 2) % 2 == 0;
    }
  ];
  return /* @__PURE__ */ __name(function fillData2(matrix, data, mask) {
    const N = matrix.length;
    let row;
    let col;
    let dir3 = -1;
    row = col = N - 1;
    const maskFn = MASK_FUNCTIONS[mask];
    let len = data.blockData[data.blockData.length - 1].length;
    for (let i = 0; i < len; i++) {
      for (let b = 0; b < data.blockData.length; b++) {
        if (data.blockData[b].length <= i) continue;
        put(data.blockData[b][i]);
      }
    }
    len = data.ecData[0].length;
    for (let i = 0; i < len; i++) {
      for (let b = 0; b < data.ecData.length; b++) {
        put(data.ecData[b][i]);
      }
    }
    if (col > -1) {
      do {
        matrix[row][col] = maskFn(row, col) ? 1 : 0;
      } while (next());
    }
    function put(byte) {
      for (let mask2 = 128; mask2; mask2 = mask2 >> 1) {
        let pixel = !!(mask2 & byte);
        if (maskFn(row, col)) pixel = !pixel;
        matrix[row][col] = pixel ? 1 : 0;
        next();
      }
    }
    __name(put, "put");
    function next() {
      do {
        if (col % 2 ^ (col < 6 ? 1 : 0)) {
          if (dir3 < 0 && row == 0 || dir3 > 0 && row == N - 1) {
            col--;
            dir3 = -dir3;
          } else {
            col++;
            row += dir3;
          }
        } else {
          col--;
        }
        if (col == 6) {
          col--;
        }
        if (col < 0) {
          return false;
        }
      } while (matrix[row][col] & 240);
      return true;
    }
    __name(next, "next");
  }, "fillData2");
})();
function calculatePenalty(matrix) {
  const N = matrix.length;
  let penalty = 0;
  for (let i2 = 0; i2 < N; i2++) {
    let pixel = matrix[i2][0] & 1;
    let len = 1;
    for (let j2 = 1; j2 < N; j2++) {
      const p = matrix[i2][j2] & 1;
      if (p == pixel) {
        len++;
        continue;
      }
      if (len >= 5) {
        penalty += len - 2;
      }
      pixel = p;
      len = 1;
    }
    if (len >= 5) {
      penalty += len - 2;
    }
  }
  for (let j2 = 0; j2 < N; j2++) {
    let pixel = matrix[0][j2] & 1;
    let len = 1;
    for (let i2 = 1; i2 < N; i2++) {
      const p = matrix[i2][j2] & 1;
      if (p == pixel) {
        len++;
        continue;
      }
      if (len >= 5) {
        penalty += len - 2;
      }
      pixel = p;
      len = 1;
    }
    if (len >= 5) {
      penalty += len - 2;
    }
  }
  for (let i2 = 0; i2 < N - 1; i2++) {
    for (let j2 = 0; j2 < N - 1; j2++) {
      const s = matrix[i2][j2] + matrix[i2][j2 + 1] + matrix[i2 + 1][j2] + matrix[i2 + 1][j2 + 1] & 7;
      if (s == 0 || s == 4) {
        penalty += 3;
      }
    }
  }
  let i;
  let j;
  function _i(k) {
    return matrix[i][j + k] & 1;
  }
  __name(_i, "_i");
  function _j(k) {
    return matrix[i + k][j] & 1;
  }
  __name(_j, "_j");
  for (i = 0; i < N; i++) {
    for (j = 0; j < N; j++) {
      if (j < N - 6 && _i(0) && !_i(1) && _i(2) && _i(3) && _i(4) && !_i(5) && _i(6)) {
        if (j >= 4 && !(_i(-4) || _i(-3) || _i(-2) || _i(-1))) {
          penalty += 40;
        }
        if (j < N - 10 && !(_i(7) || _i(8) || _i(9) || _i(10))) {
          penalty += 40;
        }
      }
      if (i < N - 6 && _j(0) && !_j(1) && _j(2) && _j(3) && _j(4) && !_j(5) && _j(6)) {
        if (i >= 4 && !(_j(-4) || _j(-3) || _j(-2) || _j(-1))) {
          penalty += 40;
        }
        if (i < N - 10 && !(_j(7) || _j(8) || _j(9) || _j(10))) {
          penalty += 40;
        }
      }
    }
  }
  let numDark = 0;
  for (let i2 = 0; i2 < N; i2++) {
    for (let j2 = 0; j2 < N; j2++) {
      if (matrix[i2][j2] & 1) numDark++;
    }
  }
  penalty += 10 * Math.floor(Math.abs(10 - 20 * numDark / (N * N)));
  return penalty;
}
__name(calculatePenalty, "calculatePenalty");
function generateQrCodeMatrix(code) {
  const matrix = init(code.version);
  fillFinders(matrix);
  fillAlignAndTiming(matrix);
  fillStub(matrix);
  let penalty = Infinity;
  let bestMask = 0;
  for (let mask = 0; mask < 8; mask++) {
    fillData(matrix, code, mask);
    fillReserved(matrix, code.ecLevel, mask);
    const p = calculatePenalty(matrix);
    if (p < penalty) {
      penalty = p;
      bestMask = mask;
    }
  }
  fillData(matrix, code, bestMask);
  fillReserved(matrix, code.ecLevel, bestMask);
  return matrix.map((row) => {
    return row.map((cell) => {
      return !!(cell & 1);
    });
  });
}
__name(generateQrCodeMatrix, "generateQrCodeMatrix");

// node_modules/@juit/qrcode/dist/utils/ecc.mjs
var GF256_BASE = 285;
var EXP_TABLE = [1];
var LOG_TABLE = [];
var POLYNOMIALS = [
  [0],
  // a^0 x^0
  [0, 0],
  // a^0 x^1 + a^0 x^0
  [0, 25, 1]
  // a^0 x^2 + a^25 x^1 + a^1 x^0
  // and so on...
];
for (let i = 1; i < 256; i++) {
  let n = EXP_TABLE[i - 1] << 1;
  if (n > 255) n = n ^ GF256_BASE;
  EXP_TABLE[i] = n;
}
for (let i = 0; i < 255; i++) {
  LOG_TABLE[EXP_TABLE[i]] = i;
}
function exp(k) {
  while (k < 0) k += 255;
  while (k > 255) k -= 255;
  return EXP_TABLE[k];
}
__name(exp, "exp");
function log3(k) {
  if (k < 0 || k > 255) throw new Error(`Bad log(${k})`);
  return LOG_TABLE[k];
}
__name(log3, "log");
function generatePolynomial(num) {
  const poly = POLYNOMIALS[num];
  if (poly) return poly;
  const prev = generatePolynomial(num - 1);
  const res = [];
  res[0] = prev[0];
  for (let i = 1; i <= num; i++) {
    res[i] = log3(exp(prev[i]) ^ exp(prev[i - 1] + num - 1));
  }
  return POLYNOMIALS[num] = res;
}
__name(generatePolynomial, "generatePolynomial");
function calculateEcc(buf, length) {
  const msg = [].slice.call(buf);
  const poly = generatePolynomial(length);
  for (let i = 0; i < length; i++) msg.push(0);
  while (msg.length > length) {
    if (!msg[0]) {
      msg.shift();
      continue;
    }
    const logK = log3(msg[0]);
    for (let i = 0; i <= length; i++) {
      msg[i] = msg[i] ^ exp(poly[i] + logK);
    }
    msg.shift();
  }
  return msg;
}
__name(calculateEcc, "calculateEcc");

// node_modules/@juit/qrcode/dist/qrcode.mjs
var EC_LEVELS = ["L", "M", "Q", "H"];
var CODEWORDS = [
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  // there is no version 0
  [26, 7, 1, 10, 1, 13, 1, 17, 1],
  [44, 10, 1, 16, 1, 22, 1, 28, 1],
  [70, 15, 1, 26, 1, 36, 2, 44, 2],
  [100, 20, 1, 36, 2, 52, 2, 64, 4],
  [134, 26, 1, 48, 2, 72, 4, 88, 4],
  // 5
  [172, 36, 2, 64, 4, 96, 4, 112, 4],
  [196, 40, 2, 72, 4, 108, 6, 130, 5],
  [242, 48, 2, 88, 4, 132, 6, 156, 6],
  [292, 60, 2, 110, 5, 160, 8, 192, 8],
  [346, 72, 4, 130, 5, 192, 8, 224, 8],
  // 10
  [404, 80, 4, 150, 5, 224, 8, 264, 11],
  [466, 96, 4, 176, 8, 260, 10, 308, 11],
  [532, 104, 4, 198, 9, 288, 12, 352, 16],
  [581, 120, 4, 216, 9, 320, 16, 384, 16],
  [655, 132, 6, 240, 10, 360, 12, 432, 18],
  // 15
  [733, 144, 6, 280, 10, 408, 17, 480, 16],
  [815, 168, 6, 308, 11, 448, 16, 532, 19],
  [901, 180, 6, 338, 13, 504, 18, 588, 21],
  [991, 196, 7, 364, 14, 546, 21, 650, 25],
  [1085, 224, 8, 416, 16, 600, 20, 700, 25],
  // 20
  [1156, 224, 8, 442, 17, 644, 23, 750, 25],
  [1258, 252, 9, 476, 17, 690, 23, 816, 34],
  [1364, 270, 9, 504, 18, 750, 25, 900, 30],
  [1474, 300, 10, 560, 20, 810, 27, 960, 32],
  [1588, 312, 12, 588, 21, 870, 29, 1050, 35],
  // 25
  [1706, 336, 12, 644, 23, 952, 34, 1110, 37],
  [1828, 360, 12, 700, 25, 1020, 34, 1200, 40],
  [1921, 390, 13, 728, 26, 1050, 35, 1260, 42],
  [2051, 420, 14, 784, 28, 1140, 38, 1350, 45],
  [2185, 450, 15, 812, 29, 1200, 40, 1440, 48],
  // 30
  [2323, 480, 16, 868, 31, 1290, 43, 1530, 51],
  [2465, 510, 17, 924, 33, 1350, 45, 1620, 54],
  [2611, 540, 18, 980, 35, 1440, 48, 1710, 57],
  [2761, 570, 19, 1036, 37, 1530, 51, 1800, 60],
  [2876, 570, 19, 1064, 38, 1590, 53, 1890, 63],
  // 35
  [3034, 600, 20, 1120, 40, 1680, 56, 1980, 66],
  [3196, 630, 21, 1204, 43, 1770, 59, 2100, 70],
  [3362, 660, 22, 1260, 45, 1860, 62, 2220, 74],
  [3532, 720, 24, 1316, 47, 1950, 65, 2310, 77],
  [3706, 750, 25, 1372, 49, 2040, 68, 2430, 81]
  // 40
];
var VERSIONS = CODEWORDS.map((v, index) => {
  if (!index) return null;
  const res = {};
  for (let i = 1; i < 8; i += 2) {
    const length = v[0] - v[i];
    const template = v[i + 1];
    const ecLevel = EC_LEVELS[i / 2 | 0];
    const blocks = [];
    for (let k = template, n = length; k > 0; k--) {
      const block = n / k | 0;
      blocks.push(block);
      n -= block;
    }
    res[ecLevel] = {
      version: index,
      ecLevel,
      dataLen: length,
      ecLen: v[i] / template,
      blockLengths: blocks
    };
  }
  return res;
});
function getTemplate(message, ecLevel) {
  let len = NaN;
  let i = 1;
  if (message.data1) {
    len = Math.ceil(message.data1.length / 8);
  } else {
    i = 10;
  }
  for (; i < 10; i++) {
    const version2 = VERSIONS[i][ecLevel];
    if (version2.dataLen >= len) {
      return structuredClone(version2);
    }
  }
  if (message.data10) {
    len = Math.ceil(message.data10.length / 8);
  } else {
    i = 27;
  }
  for (; i < 27; i++) {
    const version2 = VERSIONS[i][ecLevel];
    if (version2.dataLen >= len) {
      return structuredClone(version2);
    }
  }
  len = Math.ceil(message.data27.length / 8);
  for (; i < 41; i++) {
    const version2 = VERSIONS[i][ecLevel];
    if (version2.dataLen >= len) {
      return structuredClone(version2);
    }
  }
  throw new Error("Too much data to encode in QR code");
}
__name(getTemplate, "getTemplate");
function fillTemplate(encoded, template) {
  const blocks = new Array(template.dataLen).fill(0);
  let message;
  if (template.version < 10) {
    message = encoded.data1;
  } else if (template.version < 27) {
    message = encoded.data10;
  } else {
    message = encoded.data27;
  }
  const len = message.length;
  for (let i = 0; i < len; i += 8) {
    let b = 0;
    for (let j = 0; j < 8; j++) {
      b = b << 1 | (message[i + j] ? 1 : 0);
    }
    blocks[i / 8] = b;
  }
  let pad = 236;
  for (let i = Math.ceil((len + 4) / 8); i < blocks.length; i++) {
    blocks[i] = pad;
    pad = pad == 236 ? 17 : 236;
  }
  let offset2 = 0;
  const ecData = [];
  const blockData = template.blockLengths.map((n) => {
    const b = blocks.slice(offset2, offset2 + n);
    offset2 += n;
    ecData.push(calculateEcc(b, template.ecLen));
    return b;
  });
  return {
    version: template.version,
    ecLevel: template.ecLevel,
    ecData,
    blockData
  };
}
__name(fillTemplate, "fillTemplate");
function generateQrCodeData(data, ecLevel) {
  return fillTemplate(data, getTemplate(data, ecLevel));
}
__name(generateQrCodeData, "generateQrCodeData");

// node_modules/@juit/qrcode/dist/utils/dataurl.mjs
function generateDataUrl(data, mimeType) {
  const string = typeof data === "string" ? data : String.fromCharCode(...data);
  const encoded = btoa(string);
  return `data:${mimeType};base64,${encoded}`;
}
__name(generateDataUrl, "generateDataUrl");

// node_modules/@juit/qrcode/dist/index.mjs
function generateQrCode(message, options) {
  const { ecLevel = "M", url = false } = { ...options };
  const encoded = encodeQrCodeMessage(message, url);
  const qrcode = generateQrCodeData(encoded, ecLevel);
  const matrix = generateQrCodeMatrix(qrcode);
  return {
    version: qrcode.version,
    ecLevel: qrcode.ecLevel,
    size: matrix.length,
    matrix
  };
}
__name(generateQrCode, "generateQrCode");
async function generatePngQrCode(message, options) {
  return await generatePng(generateQrCode(message, options), options);
}
__name(generatePngQrCode, "generatePngQrCode");
async function generatePdfQrCode(message, options) {
  return await generatePdf(generateQrCode(message, options), options);
}
__name(generatePdfQrCode, "generatePdfQrCode");
function generateSvgQrCode(message, options) {
  return generateSvg(generateQrCode(message, options), options);
}
__name(generateSvgQrCode, "generateSvgQrCode");
async function generatePngDataQrCode(message, options) {
  return generateDataUrl(await generatePng(generateQrCode(message, options), options), "image/png");
}
__name(generatePngDataQrCode, "generatePngDataQrCode");
async function generatePdfDataQrCode(message, options) {
  return generateDataUrl(await generatePdf(generateQrCode(message, options), options), "application/pdf");
}
__name(generatePdfDataQrCode, "generatePdfDataQrCode");
function generateSvgDataQrCode(message, options) {
  return generateDataUrl(generateSvg(generateQrCode(message, options), options), "image/svg+xml");
}
__name(generateSvgDataQrCode, "generateSvgDataQrCode");
async function generate(message, format, options) {
  switch (format) {
    // plain images
    case "png":
      return await generatePngQrCode(message, options);
    case "pdf":
      return await generatePdfQrCode(message, options);
    case "svg":
      return generateSvgQrCode(message, options);
    // images as data URLs
    case "pngData":
      return await generatePngDataQrCode(message, options);
    case "pdfData":
      return await generatePdfDataQrCode(message, options);
    case "svgData":
      return generateSvgDataQrCode(message, options);
    // coverage ignore next
    default:
      throw new Error(`Unsupported format "${format}"`);
  }
}
__name(generate, "generate");

// src/index.ts
async function generateQrJpegBase64(data) {
  const pngBuffer = await generate(data, "png", {
    ecLevel: "H",
    scale: 8,
    margin: 2
  });
  const img = PhotonImage.new_from_byteslice(new Uint8Array(pngBuffer));
  const jpegBytes = img.get_bytes_jpeg(100);
  img.free();
  return btoa(String.fromCharCode(...new Uint8Array(jpegBytes)));
}
__name(generateQrJpegBase64, "generateQrJpegBase64");
function buildHTMLPage({
  data,
  uuid,
  qrImageUrl,
  baseUrl
}) {
  const truncated = data.length > 80 ? data.slice(0, 77) + "..." : data;
  const title2 = `QR Code \u2014 ${truncated}`;
  const description = `Scan or click to open: ${truncated}`;
  const pageUrl = `${baseUrl}/q/${uuid}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(title2)}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" />
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="robots" content="index, follow" />
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title2)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${qrImageUrl}" />
  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:title" content="${escapeHtml(title2)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:image" content="${qrImageUrl}" />
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, sans-serif;
      background: #f9f9f9;
      padding: 2rem;
      text-align: center;
      color: #2d3748;
    }
    .card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 14px rgba(0,0,0,0.1);
      max-width: 500px;
      margin: 0 auto;
    }
    h1 { font-size: 1.4rem; margin-bottom: 1rem; }
    .qr { margin-bottom: 1.5rem; }
    .qr img {
      width: 100%;
      max-width: 360px;
      box-shadow: 0 4px 14px #607D8B;
      border-radius: 16px;
    }
    .data {
      font-size: 0.85rem;
      font-family: monospace;
      word-break: break-all;
      background: #f1f5f9;
      padding: 0.75rem;
      border-radius: 6px;
      margin-top: 1rem;
    }
    .footer {
      margin-top: 1.5rem;
      font-size: 0.7rem;
      color: #718096;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>QR Code</h1>
    <div class="qr">
      <img src="${qrImageUrl}" alt="QR Code" />
    </div>
    <div class="data">${escapeHtml(data)}</div>
    <div class="footer">Powered by QRClaw</div>
  </div>
</body>
</html>`;
}
__name(buildHTMLPage, "buildHTMLPage");
function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
__name(escapeHtml, "escapeHtml");
var index_default = {
  async fetch(request, env2) {
    const url = new URL(request.url);
    const baseUrl = env2.BASE_URL || url.origin;
    const pageMatch = url.pathname.match(/^\/q\/([a-f0-9]{32})$/);
    if (pageMatch) {
      const uuid = pageMatch[1];
      const html = await env2.QRCLAW_KV.get(`page--${uuid}`);
      if (!html) return new Response("Not found", { status: 404 });
      return new Response(html, {
        headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=3600" }
      });
    }
    const imgMatch = url.pathname.match(/^\/image\/([a-f0-9]{32})\.jpeg$/);
    if (imgMatch) {
      const uuid = imgMatch[1];
      const b64 = await env2.QRCLAW_KV.get(`image--${uuid}`);
      if (!b64) return new Response("Not found", { status: 404 });
      const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
      return new Response(bytes, {
        headers: { "Content-Type": "image/jpeg", "Cache-Control": "public, max-age=3600" }
      });
    }
    if (url.pathname === "/" || url.pathname === "") {
      const q = url.searchParams.get("q");
      if (!q) {
        return new Response(
          JSON.stringify({ error: "Missing required query parameter: q" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      const uuid = crypto.randomUUID().replaceAll("-", "");
      const qrBase64 = await generateQrJpegBase64(q);
      const qrImageUrl = `${baseUrl}/image/${uuid}.jpeg`;
      const smartLink = `${baseUrl}/q/${uuid}`;
      const html = buildHTMLPage({ data: q, uuid, qrImageUrl, baseUrl });
      await Promise.all([
        env2.QRCLAW_KV.put(`image--${uuid}`, qrBase64, { expirationTtl: 86400 }),
        env2.QRCLAW_KV.put(`page--${uuid}`, html, { expirationTtl: 86400 })
      ]);
      return new Response(
        JSON.stringify({ link: smartLink, expires_in: "24h" }),
        { headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response("Not found", { status: 404 });
  }
};
export {
  index_default as default
};
/*! Bundled license information:

@cf-wasm/photon/dist/chunk-3HOZTLH2.js:
  (*! Needed to remove these lines in order to make it work on next.js *)
  (*! Needed to remove these lines in order to make it work on node.js *)
*/
//# sourceMappingURL=index.js.map

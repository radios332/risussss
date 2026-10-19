//@name PocketRisu Paper Reader
//@display-name 종이책 테마
//@api 3.0
//@version 0.2.0
// PocketRisu 1.14.0. Reads chats; only device-local reader preferences are written.
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name50 in all)
      __defProp(target, name50, { get: all[name50], enumerable: true });
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

  // node_modules/.pnpm/source-map-js@1.2.2/node_modules/source-map-js/lib/base64.js
  var require_base64 = __commonJS({
    "node_modules/.pnpm/source-map-js@1.2.2/node_modules/source-map-js/lib/base64.js"(exports) {
      var intToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
      exports.encode = function(number2) {
        if (0 <= number2 && number2 < intToCharMap.length) {
          return intToCharMap[number2];
        }
        throw new TypeError("Must be between 0 and 63: " + number2);
      };
      exports.decode = function(charCode) {
        var bigA = 65;
        var bigZ = 90;
        var littleA = 97;
        var littleZ = 122;
        var zero2 = 48;
        var nine = 57;
        var plus = 43;
        var slash = 47;
        var littleOffset = 26;
        var numberOffset = 52;
        if (bigA <= charCode && charCode <= bigZ) {
          return charCode - bigA;
        }
        if (littleA <= charCode && charCode <= littleZ) {
          return charCode - littleA + littleOffset;
        }
        if (zero2 <= charCode && charCode <= nine) {
          return charCode - zero2 + numberOffset;
        }
        if (charCode == plus) {
          return 62;
        }
        if (charCode == slash) {
          return 63;
        }
        return -1;
      };
    }
  });

  // node_modules/.pnpm/source-map-js@1.2.2/node_modules/source-map-js/lib/base64-vlq.js
  var require_base64_vlq = __commonJS({
    "node_modules/.pnpm/source-map-js@1.2.2/node_modules/source-map-js/lib/base64-vlq.js"(exports) {
      var base64 = require_base64();
      var VLQ_BASE_SHIFT = 5;
      var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
      var VLQ_BASE_MASK = VLQ_BASE - 1;
      var VLQ_CONTINUATION_BIT = VLQ_BASE;
      function toVLQSigned(aValue) {
        return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
      }
      function fromVLQSigned(aValue) {
        var isNegative = (aValue & 1) === 1;
        var shifted = aValue >> 1;
        return isNegative ? -shifted : shifted;
      }
      exports.encode = function base64VLQ_encode(aValue) {
        var encoded = "";
        var digit;
        var vlq = toVLQSigned(aValue);
        do {
          digit = vlq & VLQ_BASE_MASK;
          vlq >>>= VLQ_BASE_SHIFT;
          if (vlq > 0) {
            digit |= VLQ_CONTINUATION_BIT;
          }
          encoded += base64.encode(digit);
        } while (vlq > 0);
        return encoded;
      };
      exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
        var strLen = aStr.length;
        var result = 0;
        var shift = 0;
        var continuation, digit;
        do {
          if (aIndex >= strLen) {
            throw new Error("Expected more digits in base 64 VLQ value.");
          }
          digit = base64.decode(aStr.charCodeAt(aIndex++));
          if (digit === -1) {
            throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
          }
          continuation = !!(digit & VLQ_CONTINUATION_BIT);
          digit &= VLQ_BASE_MASK;
          result = result + (digit << shift);
          shift += VLQ_BASE_SHIFT;
        } while (continuation);
        aOutParam.value = fromVLQSigned(result);
        aOutParam.rest = aIndex;
      };
    }
  });

  // node_modules/.pnpm/source-map-js@1.2.2/node_modules/source-map-js/lib/util.js
  var require_util = __commonJS({
    "node_modules/.pnpm/source-map-js@1.2.2/node_modules/source-map-js/lib/util.js"(exports) {
      function getArg(aArgs, aName, aDefaultValue) {
        if (aName in aArgs) {
          return aArgs[aName];
        } else if (arguments.length === 3) {
          return aDefaultValue;
        } else {
          throw new Error('"' + aName + '" is a required argument.');
        }
      }
      exports.getArg = getArg;
      var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
      var dataUrlRegexp = /^data:.+\,.+$/;
      function urlParse2(aUrl) {
        var match2 = aUrl.match(urlRegexp);
        if (!match2) {
          return null;
        }
        return {
          scheme: match2[1],
          auth: match2[2],
          host: match2[3],
          port: match2[4],
          path: match2[5]
        };
      }
      exports.urlParse = urlParse2;
      function urlGenerate(aParsedUrl) {
        var url = "";
        if (aParsedUrl.scheme) {
          url += aParsedUrl.scheme + ":";
        }
        url += "//";
        if (aParsedUrl.auth) {
          url += aParsedUrl.auth + "@";
        }
        if (aParsedUrl.host) {
          url += aParsedUrl.host;
        }
        if (aParsedUrl.port) {
          url += ":" + aParsedUrl.port;
        }
        if (aParsedUrl.path) {
          url += aParsedUrl.path;
        }
        return url;
      }
      exports.urlGenerate = urlGenerate;
      var MAX_CACHED_INPUTS = 32;
      function lruMemoize(f) {
        var cache = [];
        return function(input) {
          for (var i = 0; i < cache.length; i++) {
            if (cache[i].input === input) {
              var temp = cache[0];
              cache[0] = cache[i];
              cache[i] = temp;
              return cache[0].result;
            }
          }
          var result = f(input);
          cache.unshift({
            input,
            result
          });
          if (cache.length > MAX_CACHED_INPUTS) {
            cache.pop();
          }
          return result;
        };
      }
      var normalize3 = lruMemoize(function normalize4(aPath) {
        var path = aPath;
        var url = urlParse2(aPath);
        if (url) {
          if (!url.path) {
            return aPath;
          }
          path = url.path;
        }
        var isAbsolute = exports.isAbsolute(path);
        var parts = [];
        var start = 0;
        var i = 0;
        while (true) {
          start = i;
          i = path.indexOf("/", start);
          if (i === -1) {
            parts.push(path.slice(start));
            break;
          } else {
            parts.push(path.slice(start, i));
            while (i < path.length && path[i] === "/") {
              i++;
            }
          }
        }
        for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
          part = parts[i];
          if (part === ".") {
            parts.splice(i, 1);
          } else if (part === "..") {
            up++;
          } else if (up > 0) {
            if (part === "") {
              parts.splice(i + 1, up);
              up = 0;
            } else {
              parts.splice(i, 2);
              up--;
            }
          }
        }
        path = parts.join("/");
        if (path === "") {
          path = isAbsolute ? "/" : ".";
        }
        if (url) {
          url.path = path;
          return urlGenerate(url);
        }
        return path;
      });
      exports.normalize = normalize3;
      function join(aRoot, aPath) {
        if (aRoot === "") {
          aRoot = ".";
        }
        if (aPath === "") {
          aPath = ".";
        }
        var aPathUrl = urlParse2(aPath);
        var aRootUrl = urlParse2(aRoot);
        if (aRootUrl) {
          aRoot = aRootUrl.path || "/";
        }
        if (aPathUrl && !aPathUrl.scheme) {
          if (aRootUrl) {
            aPathUrl.scheme = aRootUrl.scheme;
          }
          return urlGenerate(aPathUrl);
        }
        if (aPathUrl || aPath.match(dataUrlRegexp)) {
          return aPath;
        }
        if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
          aRootUrl.host = aPath;
          return urlGenerate(aRootUrl);
        }
        var joined = aPath.charAt(0) === "/" ? aPath : normalize3(aRoot.replace(/\/+$/, "") + "/" + aPath);
        if (aRootUrl) {
          aRootUrl.path = joined;
          return urlGenerate(aRootUrl);
        }
        return joined;
      }
      exports.join = join;
      exports.isAbsolute = function(aPath) {
        return aPath.charAt(0) === "/" || urlRegexp.test(aPath);
      };
      function relative(aRoot, aPath) {
        if (aRoot === "") {
          aRoot = ".";
        }
        aRoot = aRoot.replace(/\/$/, "");
        var level = 0;
        while (aPath.indexOf(aRoot + "/") !== 0) {
          var index = aRoot.lastIndexOf("/");
          if (index < 0) {
            return aPath;
          }
          aRoot = aRoot.slice(0, index);
          if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
            return aPath;
          }
          ++level;
        }
        return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
      }
      exports.relative = relative;
      var supportsNullProto = (function() {
        var obj = /* @__PURE__ */ Object.create(null);
        return !("__proto__" in obj);
      })();
      function identity(s) {
        return s;
      }
      function toSetString(aStr) {
        if (isProtoString(aStr)) {
          return "$" + aStr;
        }
        return aStr;
      }
      exports.toSetString = supportsNullProto ? identity : toSetString;
      function fromSetString(aStr) {
        if (isProtoString(aStr)) {
          return aStr.slice(1);
        }
        return aStr;
      }
      exports.fromSetString = supportsNullProto ? identity : fromSetString;
      function isProtoString(s) {
        if (!s) {
          return false;
        }
        var length2 = s.length;
        if (length2 < 9) {
          return false;
        }
        if (s.charCodeAt(length2 - 1) !== 95 || s.charCodeAt(length2 - 2) !== 95 || s.charCodeAt(length2 - 3) !== 111 || s.charCodeAt(length2 - 4) !== 116 || s.charCodeAt(length2 - 5) !== 111 || s.charCodeAt(length2 - 6) !== 114 || s.charCodeAt(length2 - 7) !== 112 || s.charCodeAt(length2 - 8) !== 95 || s.charCodeAt(length2 - 9) !== 95) {
          return false;
        }
        for (var i = length2 - 10; i >= 0; i--) {
          if (s.charCodeAt(i) !== 36) {
            return false;
          }
        }
        return true;
      }
      function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
        var cmp = strcmp(mappingA.source, mappingB.source);
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.originalLine - mappingB.originalLine;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.originalColumn - mappingB.originalColumn;
        if (cmp !== 0 || onlyCompareOriginal) {
          return cmp;
        }
        cmp = mappingA.generatedColumn - mappingB.generatedColumn;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.generatedLine - mappingB.generatedLine;
        if (cmp !== 0) {
          return cmp;
        }
        return strcmp(mappingA.name, mappingB.name);
      }
      exports.compareByOriginalPositions = compareByOriginalPositions;
      function compareByOriginalPositionsNoSource(mappingA, mappingB, onlyCompareOriginal) {
        var cmp;
        cmp = mappingA.originalLine - mappingB.originalLine;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.originalColumn - mappingB.originalColumn;
        if (cmp !== 0 || onlyCompareOriginal) {
          return cmp;
        }
        cmp = mappingA.generatedColumn - mappingB.generatedColumn;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.generatedLine - mappingB.generatedLine;
        if (cmp !== 0) {
          return cmp;
        }
        return strcmp(mappingA.name, mappingB.name);
      }
      exports.compareByOriginalPositionsNoSource = compareByOriginalPositionsNoSource;
      function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
        var cmp = mappingA.generatedLine - mappingB.generatedLine;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.generatedColumn - mappingB.generatedColumn;
        if (cmp !== 0 || onlyCompareGenerated) {
          return cmp;
        }
        cmp = strcmp(mappingA.source, mappingB.source);
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.originalLine - mappingB.originalLine;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.originalColumn - mappingB.originalColumn;
        if (cmp !== 0) {
          return cmp;
        }
        return strcmp(mappingA.name, mappingB.name);
      }
      exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;
      function compareByGeneratedPositionsDeflatedNoLine(mappingA, mappingB, onlyCompareGenerated) {
        var cmp = mappingA.generatedColumn - mappingB.generatedColumn;
        if (cmp !== 0 || onlyCompareGenerated) {
          return cmp;
        }
        cmp = strcmp(mappingA.source, mappingB.source);
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.originalLine - mappingB.originalLine;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.originalColumn - mappingB.originalColumn;
        if (cmp !== 0) {
          return cmp;
        }
        return strcmp(mappingA.name, mappingB.name);
      }
      exports.compareByGeneratedPositionsDeflatedNoLine = compareByGeneratedPositionsDeflatedNoLine;
      function strcmp(aStr1, aStr2) {
        if (aStr1 === aStr2) {
          return 0;
        }
        if (aStr1 === null) {
          return 1;
        }
        if (aStr2 === null) {
          return -1;
        }
        if (aStr1 > aStr2) {
          return 1;
        }
        return -1;
      }
      function compareByGeneratedPositionsInflated(mappingA, mappingB) {
        var cmp = mappingA.generatedLine - mappingB.generatedLine;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.generatedColumn - mappingB.generatedColumn;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = strcmp(mappingA.source, mappingB.source);
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.originalLine - mappingB.originalLine;
        if (cmp !== 0) {
          return cmp;
        }
        cmp = mappingA.originalColumn - mappingB.originalColumn;
        if (cmp !== 0) {
          return cmp;
        }
        return strcmp(mappingA.name, mappingB.name);
      }
      exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;
      function parseSourceMapInput(str) {
        return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ""));
      }
      exports.parseSourceMapInput = parseSourceMapInput;
      function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
        sourceURL = sourceURL || "";
        if (sourceRoot) {
          if (sourceRoot[sourceRoot.length - 1] !== "/" && sourceURL[0] !== "/") {
            sourceRoot += "/";
          }
          sourceURL = sourceRoot + sourceURL;
        }
        if (sourceMapURL) {
          var parsed = urlParse2(sourceMapURL);
          if (!parsed) {
            throw new Error("sourceMapURL could not be parsed");
          }
          if (parsed.path) {
            var index = parsed.path.lastIndexOf("/");
            if (index >= 0) {
              parsed.path = parsed.path.substring(0, index + 1);
            }
          }
          sourceURL = join(urlGenerate(parsed), sourceURL);
        }
        return normalize3(sourceURL);
      }
      exports.computeSourceURL = computeSourceURL;
    }
  });

  // node_modules/.pnpm/source-map-js@1.2.2/node_modules/source-map-js/lib/array-set.js
  var require_array_set = __commonJS({
    "node_modules/.pnpm/source-map-js@1.2.2/node_modules/source-map-js/lib/array-set.js"(exports) {
      var util = require_util();
      var has2 = Object.prototype.hasOwnProperty;
      var hasNativeMap = typeof Map !== "undefined";
      function ArraySet() {
        this._array = [];
        this._set = hasNativeMap ? /* @__PURE__ */ new Map() : /* @__PURE__ */ Object.create(null);
      }
      ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
        var set2 = new ArraySet();
        for (var i = 0, len = aArray.length; i < len; i++) {
          set2.add(aArray[i], aAllowDuplicates);
        }
        return set2;
      };
      ArraySet.prototype.size = function ArraySet_size() {
        return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
      };
      ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
        var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
        var isDuplicate = hasNativeMap ? this.has(aStr) : has2.call(this._set, sStr);
        var idx = this._array.length;
        if (!isDuplicate || aAllowDuplicates) {
          this._array.push(aStr);
        }
        if (!isDuplicate) {
          if (hasNativeMap) {
            this._set.set(aStr, idx);
          } else {
            this._set[sStr] = idx;
          }
        }
      };
      ArraySet.prototype.has = function ArraySet_has(aStr) {
        if (hasNativeMap) {
          return this._set.has(aStr);
        } else {
          var sStr = util.toSetString(aStr);
          return has2.call(this._set, sStr);
        }
      };
      ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
        if (hasNativeMap) {
          var idx = this._set.get(aStr);
          if (idx >= 0) {
            return idx;
          }
        } else {
          var sStr = util.toSetString(aStr);
          if (has2.call(this._set, sStr)) {
            return this._set[sStr];
          }
        }
        throw new Error('"' + aStr + '" is not in the set.');
      };
      ArraySet.prototype.at = function ArraySet_at(aIdx) {
        if (aIdx >= 0 && aIdx < this._array.length) {
          return this._array[aIdx];
        }
        throw new Error("No element indexed by " + aIdx);
      };
      ArraySet.prototype.toArray = function ArraySet_toArray() {
        return this._array.slice();
      };
      exports.ArraySet = ArraySet;
    }
  });

  // node_modules/.pnpm/source-map-js@1.2.2/node_modules/source-map-js/lib/mapping-list.js
  var require_mapping_list = __commonJS({
    "node_modules/.pnpm/source-map-js@1.2.2/node_modules/source-map-js/lib/mapping-list.js"(exports) {
      var util = require_util();
      function generatedPositionAfter(mappingA, mappingB) {
        var lineA = mappingA.generatedLine;
        var lineB = mappingB.generatedLine;
        var columnA = mappingA.generatedColumn;
        var columnB = mappingB.generatedColumn;
        return lineB > lineA || lineB == lineA && columnB >= columnA || util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
      }
      function MappingList() {
        this._array = [];
        this._sorted = true;
        this._last = { generatedLine: -1, generatedColumn: 0 };
      }
      MappingList.prototype.unsortedForEach = function MappingList_forEach(aCallback, aThisArg) {
        this._array.forEach(aCallback, aThisArg);
      };
      MappingList.prototype.add = function MappingList_add(aMapping) {
        if (generatedPositionAfter(this._last, aMapping)) {
          this._last = aMapping;
          this._array.push(aMapping);
        } else {
          this._sorted = false;
          this._array.push(aMapping);
        }
      };
      MappingList.prototype.toArray = function MappingList_toArray() {
        if (!this._sorted) {
          this._array.sort(util.compareByGeneratedPositionsInflated);
          this._sorted = true;
        }
        return this._array;
      };
      exports.MappingList = MappingList;
    }
  });

  // node_modules/.pnpm/source-map-js@1.2.2/node_modules/source-map-js/lib/source-map-generator.js
  var require_source_map_generator = __commonJS({
    "node_modules/.pnpm/source-map-js@1.2.2/node_modules/source-map-js/lib/source-map-generator.js"(exports) {
      var base64VLQ = require_base64_vlq();
      var util = require_util();
      var ArraySet = require_array_set().ArraySet;
      var MappingList = require_mapping_list().MappingList;
      function SourceMapGenerator2(aArgs) {
        if (!aArgs) {
          aArgs = {};
        }
        this._file = util.getArg(aArgs, "file", null);
        this._sourceRoot = util.getArg(aArgs, "sourceRoot", null);
        this._skipValidation = util.getArg(aArgs, "skipValidation", false);
        this._ignoreInvalidMapping = util.getArg(aArgs, "ignoreInvalidMapping", false);
        this._sources = new ArraySet();
        this._names = new ArraySet();
        this._mappings = new MappingList();
        this._sourcesContents = null;
      }
      SourceMapGenerator2.prototype._version = 3;
      SourceMapGenerator2.fromSourceMap = function SourceMapGenerator_fromSourceMap(aSourceMapConsumer, generatorOps) {
        var sourceRoot = aSourceMapConsumer.sourceRoot;
        var generator = new SourceMapGenerator2(Object.assign(generatorOps || {}, {
          file: aSourceMapConsumer.file,
          sourceRoot
        }));
        aSourceMapConsumer.eachMapping(function(mapping) {
          var newMapping = {
            generated: {
              line: mapping.generatedLine,
              column: mapping.generatedColumn
            }
          };
          if (mapping.source != null) {
            newMapping.source = mapping.source;
            if (sourceRoot != null) {
              newMapping.source = util.relative(sourceRoot, newMapping.source);
            }
            newMapping.original = {
              line: mapping.originalLine,
              column: mapping.originalColumn
            };
            if (mapping.name != null) {
              newMapping.name = mapping.name;
            }
          }
          generator.addMapping(newMapping);
        });
        aSourceMapConsumer.sources.forEach(function(sourceFile) {
          var sourceRelative = sourceFile;
          if (sourceRoot !== null) {
            sourceRelative = util.relative(sourceRoot, sourceFile);
          }
          if (!generator._sources.has(sourceRelative)) {
            generator._sources.add(sourceRelative);
          }
          var content = aSourceMapConsumer.sourceContentFor(sourceFile);
          if (content != null) {
            generator.setSourceContent(sourceFile, content);
          }
        });
        return generator;
      };
      SourceMapGenerator2.prototype.addMapping = function SourceMapGenerator_addMapping(aArgs) {
        var generated = util.getArg(aArgs, "generated");
        var original = util.getArg(aArgs, "original", null);
        var source = util.getArg(aArgs, "source", null);
        var name50 = util.getArg(aArgs, "name", null);
        if (!this._skipValidation) {
          if (this._validateMapping(generated, original, source, name50) === false) {
            return;
          }
        }
        if (source != null) {
          source = String(source);
          if (!this._sources.has(source)) {
            this._sources.add(source);
          }
        }
        if (name50 != null) {
          name50 = String(name50);
          if (!this._names.has(name50)) {
            this._names.add(name50);
          }
        }
        this._mappings.add({
          generatedLine: generated.line,
          generatedColumn: generated.column,
          originalLine: original != null && original.line,
          originalColumn: original != null && original.column,
          source,
          name: name50
        });
      };
      SourceMapGenerator2.prototype.setSourceContent = function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
        var source = aSourceFile;
        if (this._sourceRoot != null) {
          source = util.relative(this._sourceRoot, source);
        }
        if (aSourceContent != null) {
          if (!this._sourcesContents) {
            this._sourcesContents = /* @__PURE__ */ Object.create(null);
          }
          this._sourcesContents[util.toSetString(source)] = aSourceContent;
        } else if (this._sourcesContents) {
          delete this._sourcesContents[util.toSetString(source)];
          if (Object.keys(this._sourcesContents).length === 0) {
            this._sourcesContents = null;
          }
        }
      };
      SourceMapGenerator2.prototype.applySourceMap = function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
        var sourceFile = aSourceFile;
        if (aSourceFile == null) {
          if (aSourceMapConsumer.file == null) {
            throw new Error(
              `SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`
            );
          }
          sourceFile = aSourceMapConsumer.file;
        }
        var sourceRoot = this._sourceRoot;
        if (sourceRoot != null) {
          sourceFile = util.relative(sourceRoot, sourceFile);
        }
        var newSources = new ArraySet();
        var newNames = new ArraySet();
        this._mappings.unsortedForEach(function(mapping) {
          if (mapping.source === sourceFile && mapping.originalLine != null) {
            var original = aSourceMapConsumer.originalPositionFor({
              line: mapping.originalLine,
              column: mapping.originalColumn
            });
            if (original.source != null) {
              mapping.source = original.source;
              if (aSourceMapPath != null) {
                mapping.source = util.join(aSourceMapPath, mapping.source);
              }
              if (sourceRoot != null) {
                mapping.source = util.relative(sourceRoot, mapping.source);
              }
              mapping.originalLine = original.line;
              mapping.originalColumn = original.column;
              if (original.name != null) {
                mapping.name = original.name;
              }
            }
          }
          var source = mapping.source;
          if (source != null && !newSources.has(source)) {
            newSources.add(source);
          }
          var name50 = mapping.name;
          if (name50 != null && !newNames.has(name50)) {
            newNames.add(name50);
          }
        }, this);
        this._sources = newSources;
        this._names = newNames;
        aSourceMapConsumer.sources.forEach(function(sourceFile2) {
          var content = aSourceMapConsumer.sourceContentFor(sourceFile2);
          if (content != null) {
            if (aSourceMapPath != null) {
              sourceFile2 = util.join(aSourceMapPath, sourceFile2);
            }
            if (sourceRoot != null) {
              sourceFile2 = util.relative(sourceRoot, sourceFile2);
            }
            this.setSourceContent(sourceFile2, content);
          }
        }, this);
      };
      SourceMapGenerator2.prototype._validateMapping = function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName) {
        if (aOriginal && typeof aOriginal.line !== "number" && typeof aOriginal.column !== "number") {
          var message = "original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.";
          if (this._ignoreInvalidMapping) {
            if (typeof console !== "undefined" && console.warn) {
              console.warn(message);
            }
            return false;
          } else {
            throw new Error(message);
          }
        }
        if (aGenerated && "line" in aGenerated && "column" in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName) {
          return;
        } else if (aGenerated && "line" in aGenerated && "column" in aGenerated && aOriginal && "line" in aOriginal && "column" in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource) {
          return;
        } else {
          var message = "Invalid mapping: " + JSON.stringify({
            generated: aGenerated,
            source: aSource,
            original: aOriginal,
            name: aName
          });
          if (this._ignoreInvalidMapping) {
            if (typeof console !== "undefined" && console.warn) {
              console.warn(message);
            }
            return false;
          } else {
            throw new Error(message);
          }
        }
      };
      SourceMapGenerator2.prototype._serializeMappings = function SourceMapGenerator_serializeMappings() {
        var previousGeneratedColumn = 0;
        var previousGeneratedLine = 1;
        var previousOriginalColumn = 0;
        var previousOriginalLine = 0;
        var previousName = 0;
        var previousSource = 0;
        var result = "";
        var next;
        var mapping;
        var nameIdx;
        var sourceIdx;
        var mappings = this._mappings.toArray();
        for (var i = 0, len = mappings.length; i < len; i++) {
          mapping = mappings[i];
          next = "";
          if (mapping.generatedLine !== previousGeneratedLine) {
            previousGeneratedColumn = 0;
            var lineDelta = mapping.generatedLine - previousGeneratedLine;
            next += lineDelta === 1 ? ";" : ";".repeat(lineDelta);
            previousGeneratedLine = mapping.generatedLine;
          } else {
            if (i > 0) {
              if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
                continue;
              }
              next += ",";
            }
          }
          next += base64VLQ.encode(mapping.generatedColumn - previousGeneratedColumn);
          previousGeneratedColumn = mapping.generatedColumn;
          if (mapping.source != null) {
            sourceIdx = this._sources.indexOf(mapping.source);
            next += base64VLQ.encode(sourceIdx - previousSource);
            previousSource = sourceIdx;
            next += base64VLQ.encode(mapping.originalLine - 1 - previousOriginalLine);
            previousOriginalLine = mapping.originalLine - 1;
            next += base64VLQ.encode(mapping.originalColumn - previousOriginalColumn);
            previousOriginalColumn = mapping.originalColumn;
            if (mapping.name != null) {
              nameIdx = this._names.indexOf(mapping.name);
              next += base64VLQ.encode(nameIdx - previousName);
              previousName = nameIdx;
            }
          }
          result += next;
        }
        return result;
      };
      SourceMapGenerator2.prototype._generateSourcesContent = function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
        return aSources.map(function(source) {
          if (!this._sourcesContents) {
            return null;
          }
          if (aSourceRoot != null) {
            source = util.relative(aSourceRoot, source);
          }
          var key = util.toSetString(source);
          return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
        }, this);
      };
      SourceMapGenerator2.prototype.toJSON = function SourceMapGenerator_toJSON() {
        var map2 = {
          version: this._version,
          sources: this._sources.toArray(),
          names: this._names.toArray(),
          mappings: this._serializeMappings()
        };
        if (this._file != null) {
          map2.file = this._file;
        }
        if (this._sourceRoot != null) {
          map2.sourceRoot = this._sourceRoot;
        }
        if (this._sourcesContents) {
          map2.sourcesContent = this._generateSourcesContent(map2.sources, map2.sourceRoot);
        }
        return map2;
      };
      SourceMapGenerator2.prototype.toString = function SourceMapGenerator_toString() {
        return JSON.stringify(this.toJSON());
      };
      exports.SourceMapGenerator = SourceMapGenerator2;
    }
  });

  // src/theme.css
  var theme_default = '/* Only conversation display changes; keep the original composer mounted. */\n.default-chat-screen[x-paper-theme="on"]{overflow:hidden!important}\n.default-chat-screen[x-paper-theme="on"] > :not([x-paper-composer]):not([x-paper-mount]){display:none!important}\n.default-chat-screen[x-paper-theme="on"] > [x-paper-composer]{flex:none}\n.default-chat-screen > [x-paper-mount]{flex:none;min-width:0;order:-1;position:relative;z-index:28}\n.default-chat-screen[x-paper-theme="on"] > [x-paper-mount]{position:relative;bottom:0!important;flex:1 1 0;min-height:0;overflow:hidden}\n.x-risu-pr-root{--pr-paper:#f5f1e8;--pr-ink:#33362f;--pr-line:#d8d4c8;--pr-soft:#e5e8dc;--pr-muted:#797c70;color:var(--pr-ink);background:var(--pr-paper);font-family:Arial,sans-serif;display:flex;flex-direction:column;height:100%;min-width:0;min-height:0;box-sizing:border-box;container-type:inline-size}\n.x-risu-pr-root[x-palette="white"]{--pr-paper:#fafaf7;--pr-ink:#242823;--pr-line:#d6d9d0;--pr-soft:#e6e9e1}\n.x-risu-pr-root[x-palette="night"]{--pr-paper:#252923;--pr-ink:#e0e0d3;--pr-line:#454c40;--pr-soft:#373e31;--pr-muted:#a4ac9b}\n.x-risu-pr-root button,.x-risu-pr-root summary{font:inherit;font-size:12px;cursor:pointer;color:inherit;border:1px solid var(--pr-line);background:var(--pr-paper);border-radius:5px;padding:7px 10px;line-height:1.4;white-space:nowrap}\n.x-risu-pr-root button:hover{background:var(--pr-soft)}.x-risu-pr-root :focus-visible{outline:2px solid #849568;outline-offset:-2px}\n.x-risu-pr-toolbar{display:flex;align-items:center;gap:8px;padding:7px 12px;border-bottom:1px solid var(--pr-line);flex:none;position:relative;z-index:3}\n.x-risu-pr-toolbar strong{font-size:12px;letter-spacing:.1em}.x-risu-pr-room{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:11px;color:var(--pr-muted)}\n.x-risu-pr-settings>div{position:absolute;right:8px;top:100%;padding:12px;display:flex;gap:6px;flex-wrap:wrap;max-width:320px;background:var(--pr-paper);border:1px solid var(--pr-line);box-shadow:0 4px 10px #0002}.x-risu-pr-settings summary{list-style:none}\n.x-risu-pr-reading{display:flex;flex-direction:column;flex:1;min-height:0;position:relative}\n.x-risu-pr-paper{display:flex;flex-direction:column;flex:1;min-height:0;min-width:0;width:min(100%,850px);box-sizing:border-box;margin:0 auto;padding:16px 36px 0}\n.x-risu-pr-head{font-size:10px;color:var(--pr-muted);padding-bottom:10px;border-bottom:1px solid var(--pr-line);margin-bottom:14px;flex:none}\n.x-risu-pr-viewport{flex:1;min-height:0;min-width:0;overflow:hidden;position:relative;contain:layout paint;touch-action:pan-y;overscroll-behavior:none}\n.x-risu-pr-root .x-risu-pr-entry{display:block!important;height:100%;padding:0!important;margin:0!important;border:0!important;min-width:0}\n.x-risu-pr-root .x-risu-pr-book{display:block;column-count:1;column-gap:32px;column-fill:auto;box-sizing:border-box;padding:0;margin:0;max-width:none;min-width:0;overflow:visible;transform-origin:0 0}\n:where(.x-risu-pr-book){font-family:"Noto Serif KR","Noto Serif CJK KR","Nanum Myeongjo","Batang",Georgia,serif;font-size:var(--pr-font);line-height:1.85;color:var(--pr-ink);overflow-wrap:anywhere}\n:where(.x-risu-pr-book p){margin:0 0 1em;orphans:2;widows:2}\n:where(.x-risu-pr-book h1,.x-risu-pr-book h2,.x-risu-pr-book h3){font-size:1.2em;line-height:1.5;break-after:avoid;margin:0 0 .7em}\n:where(.x-risu-pr-book blockquote){margin:.5em 0 1em;padding-left:1em;border-left:2px solid var(--pr-line)}\n:where(.x-risu-pr-book pre){white-space:pre-wrap;overflow-wrap:anywhere;background:var(--pr-soft);padding:8px}\n:where(.x-risu-pr-book table){width:100%;table-layout:fixed;border-collapse:collapse}\n:where(.x-risu-pr-book td,.x-risu-pr-book th){border:1px solid var(--pr-line);padding:5px}\n.x-risu-pr-book img,.x-risu-pr-book video{max-width:100%!important;max-height:calc(var(--pr-height) - 48px)!important;object-fit:contain;break-inside:avoid;height:auto}\n.x-risu-pr-end{display:inline-block;width:0;height:1px;padding:0;margin:0}\n.x-risu-pr-status{flex:none;font-size:11px;color:var(--pr-muted);min-height:0;margin:0}\n.x-risu-pr-status:not(:empty){padding:6px}\n.x-risu-pr-footer{flex:none;display:flex;align-items:center;justify-content:center;gap:8px;padding:10px 8px;border-top:1px solid var(--pr-line)}\n.x-risu-pr-footer span{font-size:11px;min-width:135px;text-align:center;font-variant-numeric:tabular-nums}\n.x-risu-pr-toc{flex:none;padding:0 12px 8px}.x-risu-pr-toc>summary{font-size:11px;padding:4px 8px;display:inline-block}\n.x-risu-pr-toc>div{position:absolute;bottom:38px;left:12px;right:12px;max-height:65%;overflow:auto;background:var(--pr-paper);padding:8px;z-index:4;border:1px solid var(--pr-line);box-shadow:0 4px 10px #0002}\n.x-risu-pr-toc button{display:block;width:100%;text-align:left;overflow:hidden;text-overflow:ellipsis;margin:3px 0}\n@container(max-width:600px){.x-risu-pr-paper{padding:12px 18px 0}.x-risu-pr-toolbar{padding:6px 8px;gap:6px}.x-risu-pr-footer{gap:3px;padding:8px 4px;flex-wrap:wrap}.x-risu-pr-footer button{padding:6px}.x-risu-pr-footer span{min-width:114px;font-size:10px}.x-risu-pr-room{max-width:45cqw}}\n\n.default-chat-screen > [x-paper-composer]{order:-2}\n.x-risu-pr-root{--risu-theme-bgcolor:var(--pr-paper);--risu-theme-darkbg:var(--pr-paper);--risu-theme-textcolor:var(--pr-ink);--FontColorStandard:var(--pr-ink);--FontColorBold:var(--pr-ink);--FontColorItalic:var(--pr-muted);--FontColorItalicBold:var(--pr-muted);--tw-prose-body:var(--pr-ink);--tw-prose-headings:var(--pr-ink);--tw-prose-bold:var(--pr-ink);--tw-prose-links:var(--pr-ink)}\n';

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/common/utils.mjs
  var utils_exports = {};
  __export(utils_exports, {
    arrayReplaceAt: () => arrayReplaceAt,
    assign: () => assign,
    escapeHtml: () => escapeHtml,
    escapeRE: () => escapeRE,
    fromCodePoint: () => fromCodePoint2,
    has: () => has,
    isMdAsciiPunct: () => isMdAsciiPunct,
    isPunctChar: () => isPunctChar,
    isSpace: () => isSpace,
    isString: () => isString,
    isValidEntityCode: () => isValidEntityCode,
    isWhiteSpace: () => isWhiteSpace,
    lib: () => lib,
    normalizeReference: () => normalizeReference,
    unescapeAll: () => unescapeAll,
    unescapeMd: () => unescapeMd
  });

  // node_modules/.pnpm/mdurl@2.1.0/node_modules/mdurl/index.mjs
  var mdurl_exports = {};
  __export(mdurl_exports, {
    decode: () => decode_default,
    encode: () => encode_default,
    format: () => format,
    parse: () => parse_default
  });

  // node_modules/.pnpm/mdurl@2.1.0/node_modules/mdurl/lib/decode.mjs
  var decodeCache = {};
  function getDecodeCache(exclude) {
    let cache = decodeCache[exclude];
    if (cache) {
      return cache;
    }
    cache = decodeCache[exclude] = [];
    for (let i = 0; i < 128; i++) {
      const ch = String.fromCharCode(i);
      cache.push(ch);
    }
    for (let i = 0; i < exclude.length; i++) {
      const ch = exclude.charCodeAt(i);
      cache[ch] = "%" + ("0" + ch.toString(16).toUpperCase()).slice(-2);
    }
    return cache;
  }
  function decode(string, exclude) {
    if (typeof exclude !== "string") {
      exclude = decode.defaultChars;
    }
    const cache = getDecodeCache(exclude);
    return string.replace(/(%[a-f0-9]{2})+/gi, function(seq) {
      let result = "";
      for (let i = 0, l = seq.length; i < l; i += 3) {
        const b1 = parseInt(seq.slice(i + 1, i + 3), 16);
        if (b1 < 128) {
          result += cache[b1];
          continue;
        }
        if ((b1 & 224) === 192 && i + 3 < l) {
          const b2 = parseInt(seq.slice(i + 4, i + 6), 16);
          if ((b2 & 192) === 128) {
            const chr = b1 << 6 & 1984 | b2 & 63;
            if (chr < 128) {
              result += "\uFFFD\uFFFD";
            } else {
              result += String.fromCharCode(chr);
            }
            i += 3;
            continue;
          }
        }
        if ((b1 & 240) === 224 && i + 6 < l) {
          const b2 = parseInt(seq.slice(i + 4, i + 6), 16);
          const b3 = parseInt(seq.slice(i + 7, i + 9), 16);
          if ((b2 & 192) === 128 && (b3 & 192) === 128) {
            const chr = b1 << 12 & 61440 | b2 << 6 & 4032 | b3 & 63;
            if (chr < 2048 || chr >= 55296 && chr <= 57343) {
              result += "\uFFFD\uFFFD\uFFFD";
            } else {
              result += String.fromCharCode(chr);
            }
            i += 6;
            continue;
          }
        }
        if ((b1 & 248) === 240 && i + 9 < l) {
          const b2 = parseInt(seq.slice(i + 4, i + 6), 16);
          const b3 = parseInt(seq.slice(i + 7, i + 9), 16);
          const b4 = parseInt(seq.slice(i + 10, i + 12), 16);
          if ((b2 & 192) === 128 && (b3 & 192) === 128 && (b4 & 192) === 128) {
            let chr = b1 << 18 & 1835008 | b2 << 12 & 258048 | b3 << 6 & 4032 | b4 & 63;
            if (chr < 65536 || chr > 1114111) {
              result += "\uFFFD\uFFFD\uFFFD\uFFFD";
            } else {
              chr -= 65536;
              result += String.fromCharCode(55296 + (chr >> 10), 56320 + (chr & 1023));
            }
            i += 9;
            continue;
          }
        }
        result += "\uFFFD";
      }
      return result;
    });
  }
  decode.defaultChars = ";/?:@&=+$,#";
  decode.componentChars = "";
  var decode_default = decode;

  // node_modules/.pnpm/mdurl@2.1.0/node_modules/mdurl/lib/encode.mjs
  var encodeCache = {};
  function getEncodeCache(exclude) {
    let cache = encodeCache[exclude];
    if (cache) {
      return cache;
    }
    cache = encodeCache[exclude] = [];
    for (let i = 0; i < 128; i++) {
      const ch = String.fromCharCode(i);
      if (/^[0-9a-z]$/i.test(ch)) {
        cache.push(ch);
      } else {
        cache.push("%" + ("0" + i.toString(16).toUpperCase()).slice(-2));
      }
    }
    for (let i = 0; i < exclude.length; i++) {
      cache[exclude.charCodeAt(i)] = exclude[i];
    }
    return cache;
  }
  function encode(string, exclude, keepEscaped) {
    if (typeof exclude !== "string") {
      keepEscaped = exclude;
      exclude = encode.defaultChars;
    }
    if (typeof keepEscaped === "undefined") {
      keepEscaped = true;
    }
    const cache = getEncodeCache(exclude);
    let result = "";
    for (let i = 0, l = string.length; i < l; i++) {
      const code3 = string.charCodeAt(i);
      if (keepEscaped && code3 === 37 && i + 2 < l) {
        if (/^[0-9a-f]{2}$/i.test(string.slice(i + 1, i + 3))) {
          result += string.slice(i, i + 3);
          i += 2;
          continue;
        }
      }
      if (code3 < 128) {
        result += cache[code3];
        continue;
      }
      if (code3 >= 55296 && code3 <= 57343) {
        if (code3 >= 55296 && code3 <= 56319 && i + 1 < l) {
          const nextCode = string.charCodeAt(i + 1);
          if (nextCode >= 56320 && nextCode <= 57343) {
            result += encodeURIComponent(string[i] + string[i + 1]);
            i++;
            continue;
          }
        }
        result += "%EF%BF%BD";
        continue;
      }
      result += encodeURIComponent(string[i]);
    }
    return result;
  }
  encode.defaultChars = ";/?:@&=+$,-_.!~*'()#";
  encode.componentChars = "-_.!~*'()";
  var encode_default = encode;

  // node_modules/.pnpm/mdurl@2.1.0/node_modules/mdurl/lib/format.mjs
  function format(url) {
    let result = "";
    result += url.protocol || "";
    result += url.slashes ? "//" : "";
    result += url.auth ? url.auth + "@" : "";
    if (url.hostname && url.hostname.indexOf(":") !== -1) {
      result += "[" + url.hostname + "]";
    } else {
      result += url.hostname || "";
    }
    result += url.port ? ":" + url.port : "";
    result += url.pathname || "";
    result += url.search || "";
    result += url.hash || "";
    return result;
  }

  // node_modules/.pnpm/mdurl@2.1.0/node_modules/mdurl/lib/parse.mjs
  function Url() {
    this.protocol = null;
    this.slashes = null;
    this.auth = null;
    this.port = null;
    this.hostname = null;
    this.hash = null;
    this.search = null;
    this.pathname = null;
  }
  var protocolPattern = /^([a-z0-9.+-]+:)/i;
  var portPattern = /:[0-9]*$/;
  var simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/;
  var delims = ["<", ">", '"', "`", " ", "\r", "\n", "	"];
  var unwise = ["{", "}", "|", "\\", "^", "`"].concat(delims);
  var autoEscape = ["'"].concat(unwise);
  var nonHostChars = ["%", "/", "?", ";", "#"].concat(autoEscape);
  var hostEndingChars = ["/", "?", "#"];
  var hostnameMaxLen = 255;
  var hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/;
  var hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/;
  var hostlessProtocol = {
    javascript: true,
    "javascript:": true
  };
  var slashedProtocol = {
    http: true,
    https: true,
    ftp: true,
    gopher: true,
    file: true,
    "http:": true,
    "https:": true,
    "ftp:": true,
    "gopher:": true,
    "file:": true
  };
  function urlParse(url, slashesDenoteHost) {
    if (url && url instanceof Url) return url;
    const u = new Url();
    u.parse(url, slashesDenoteHost);
    return u;
  }
  Url.prototype.parse = function(url, slashesDenoteHost) {
    let lowerProto, hec, slashes;
    let rest = url;
    rest = rest.trim();
    if (!slashesDenoteHost && url.split("#").length === 1) {
      const simplePath = simplePathPattern.exec(rest);
      if (simplePath) {
        this.pathname = simplePath[1];
        if (simplePath[2]) {
          this.search = simplePath[2];
        }
        return this;
      }
    }
    let proto = protocolPattern.exec(rest);
    if (proto) {
      proto = proto[0];
      lowerProto = proto.toLowerCase();
      this.protocol = proto;
      rest = rest.substr(proto.length);
    }
    if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
      slashes = rest.substr(0, 2) === "//";
      if (slashes && !(proto && hostlessProtocol[proto])) {
        rest = rest.substr(2);
        this.slashes = true;
      }
    }
    if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
      let hostEnd = -1;
      for (let i = 0; i < hostEndingChars.length; i++) {
        hec = rest.indexOf(hostEndingChars[i]);
        if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
          hostEnd = hec;
        }
      }
      let auth, atSign;
      if (hostEnd === -1) {
        atSign = rest.lastIndexOf("@");
      } else {
        atSign = rest.lastIndexOf("@", hostEnd);
      }
      if (atSign !== -1) {
        auth = rest.slice(0, atSign);
        rest = rest.slice(atSign + 1);
        this.auth = auth;
      }
      hostEnd = -1;
      for (let i = 0; i < nonHostChars.length; i++) {
        hec = rest.indexOf(nonHostChars[i]);
        if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
          hostEnd = hec;
        }
      }
      if (hostEnd === -1) {
        hostEnd = rest.length;
      }
      if (rest[hostEnd - 1] === ":") {
        hostEnd--;
      }
      const host = rest.slice(0, hostEnd);
      rest = rest.slice(hostEnd);
      this.parseHost(host);
      this.hostname = this.hostname || "";
      const ipv6Hostname = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
      if (!ipv6Hostname) {
        const hostparts = this.hostname.split(/\./);
        for (let i = 0, l = hostparts.length; i < l; i++) {
          const part = hostparts[i];
          if (!part) {
            continue;
          }
          if (!part.match(hostnamePartPattern)) {
            let newpart = "";
            for (let j = 0, k = part.length; j < k; j++) {
              if (part.charCodeAt(j) > 127) {
                newpart += "x";
              } else {
                newpart += part[j];
              }
            }
            if (!newpart.match(hostnamePartPattern)) {
              const validParts = hostparts.slice(0, i);
              const notHost = hostparts.slice(i + 1);
              const bit = part.match(hostnamePartStart);
              if (bit) {
                validParts.push(bit[1]);
                notHost.unshift(bit[2]);
              }
              if (notHost.length) {
                rest = notHost.join(".") + rest;
              }
              this.hostname = validParts.join(".");
              break;
            }
          }
        }
      }
      if (this.hostname.length > hostnameMaxLen) {
        this.hostname = "";
      }
      if (ipv6Hostname) {
        this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      }
    }
    const hash = rest.indexOf("#");
    if (hash !== -1) {
      this.hash = rest.substr(hash);
      rest = rest.slice(0, hash);
    }
    const qm = rest.indexOf("?");
    if (qm !== -1) {
      this.search = rest.substr(qm);
      rest = rest.slice(0, qm);
    }
    if (rest) {
      this.pathname = rest;
    }
    if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
      this.pathname = "";
    }
    return this;
  };
  Url.prototype.parseHost = function(host) {
    let port = portPattern.exec(host);
    if (port) {
      port = port[0];
      if (port !== ":") {
        this.port = port.substr(1);
      }
      host = host.substr(0, host.length - port.length);
    }
    if (host) {
      this.hostname = host;
    }
  };
  var parse_default = urlParse;

  // node_modules/.pnpm/uc.micro@2.1.0/node_modules/uc.micro/index.mjs
  var uc_exports = {};
  __export(uc_exports, {
    Any: () => regex_default,
    Cc: () => regex_default2,
    Cf: () => regex_default3,
    P: () => regex_default4,
    S: () => regex_default5,
    Z: () => regex_default6
  });

  // node_modules/.pnpm/uc.micro@2.1.0/node_modules/uc.micro/properties/Any/regex.mjs
  var regex_default = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;

  // node_modules/.pnpm/uc.micro@2.1.0/node_modules/uc.micro/categories/Cc/regex.mjs
  var regex_default2 = /[\0-\x1F\x7F-\x9F]/;

  // node_modules/.pnpm/uc.micro@2.1.0/node_modules/uc.micro/categories/Cf/regex.mjs
  var regex_default3 = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/;

  // node_modules/.pnpm/uc.micro@2.1.0/node_modules/uc.micro/categories/P/regex.mjs
  var regex_default4 = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/;

  // node_modules/.pnpm/uc.micro@2.1.0/node_modules/uc.micro/categories/S/regex.mjs
  var regex_default5 = /[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/;

  // node_modules/.pnpm/uc.micro@2.1.0/node_modules/uc.micro/categories/Z/regex.mjs
  var regex_default6 = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;

  // node_modules/.pnpm/entities@4.5.0/node_modules/entities/lib/esm/generated/decode-data-html.js
  var decode_data_html_default = new Uint16Array(
    // prettier-ignore
    '\u1D41<\xD5\u0131\u028A\u049D\u057B\u05D0\u0675\u06DE\u07A2\u07D6\u080F\u0A4A\u0A91\u0DA1\u0E6D\u0F09\u0F26\u10CA\u1228\u12E1\u1415\u149D\u14C3\u14DF\u1525\0\0\0\0\0\0\u156B\u16CD\u198D\u1C12\u1DDD\u1F7E\u2060\u21B0\u228D\u23C0\u23FB\u2442\u2824\u2912\u2D08\u2E48\u2FCE\u3016\u32BA\u3639\u37AC\u38FE\u3A28\u3A71\u3AE0\u3B2E\u0800EMabcfglmnoprstu\\bfms\x7F\x84\x8B\x90\x95\x98\xA6\xB3\xB9\xC8\xCFlig\u803B\xC6\u40C6P\u803B&\u4026cute\u803B\xC1\u40C1reve;\u4102\u0100iyx}rc\u803B\xC2\u40C2;\u4410r;\uC000\u{1D504}rave\u803B\xC0\u40C0pha;\u4391acr;\u4100d;\u6A53\u0100gp\x9D\xA1on;\u4104f;\uC000\u{1D538}plyFunction;\u6061ing\u803B\xC5\u40C5\u0100cs\xBE\xC3r;\uC000\u{1D49C}ign;\u6254ilde\u803B\xC3\u40C3ml\u803B\xC4\u40C4\u0400aceforsu\xE5\xFB\xFE\u0117\u011C\u0122\u0127\u012A\u0100cr\xEA\xF2kslash;\u6216\u0176\xF6\xF8;\u6AE7ed;\u6306y;\u4411\u0180crt\u0105\u010B\u0114ause;\u6235noullis;\u612Ca;\u4392r;\uC000\u{1D505}pf;\uC000\u{1D539}eve;\u42D8c\xF2\u0113mpeq;\u624E\u0700HOacdefhilorsu\u014D\u0151\u0156\u0180\u019E\u01A2\u01B5\u01B7\u01BA\u01DC\u0215\u0273\u0278\u027Ecy;\u4427PY\u803B\xA9\u40A9\u0180cpy\u015D\u0162\u017Aute;\u4106\u0100;i\u0167\u0168\u62D2talDifferentialD;\u6145leys;\u612D\u0200aeio\u0189\u018E\u0194\u0198ron;\u410Cdil\u803B\xC7\u40C7rc;\u4108nint;\u6230ot;\u410A\u0100dn\u01A7\u01ADilla;\u40B8terDot;\u40B7\xF2\u017Fi;\u43A7rcle\u0200DMPT\u01C7\u01CB\u01D1\u01D6ot;\u6299inus;\u6296lus;\u6295imes;\u6297o\u0100cs\u01E2\u01F8kwiseContourIntegral;\u6232eCurly\u0100DQ\u0203\u020FoubleQuote;\u601Duote;\u6019\u0200lnpu\u021E\u0228\u0247\u0255on\u0100;e\u0225\u0226\u6237;\u6A74\u0180git\u022F\u0236\u023Aruent;\u6261nt;\u622FourIntegral;\u622E\u0100fr\u024C\u024E;\u6102oduct;\u6210nterClockwiseContourIntegral;\u6233oss;\u6A2Fcr;\uC000\u{1D49E}p\u0100;C\u0284\u0285\u62D3ap;\u624D\u0580DJSZacefios\u02A0\u02AC\u02B0\u02B4\u02B8\u02CB\u02D7\u02E1\u02E6\u0333\u048D\u0100;o\u0179\u02A5trahd;\u6911cy;\u4402cy;\u4405cy;\u440F\u0180grs\u02BF\u02C4\u02C7ger;\u6021r;\u61A1hv;\u6AE4\u0100ay\u02D0\u02D5ron;\u410E;\u4414l\u0100;t\u02DD\u02DE\u6207a;\u4394r;\uC000\u{1D507}\u0100af\u02EB\u0327\u0100cm\u02F0\u0322ritical\u0200ADGT\u0300\u0306\u0316\u031Ccute;\u40B4o\u0174\u030B\u030D;\u42D9bleAcute;\u42DDrave;\u4060ilde;\u42DCond;\u62C4ferentialD;\u6146\u0470\u033D\0\0\0\u0342\u0354\0\u0405f;\uC000\u{1D53B}\u0180;DE\u0348\u0349\u034D\u40A8ot;\u60DCqual;\u6250ble\u0300CDLRUV\u0363\u0372\u0382\u03CF\u03E2\u03F8ontourIntegra\xEC\u0239o\u0274\u0379\0\0\u037B\xBB\u0349nArrow;\u61D3\u0100eo\u0387\u03A4ft\u0180ART\u0390\u0396\u03A1rrow;\u61D0ightArrow;\u61D4e\xE5\u02CAng\u0100LR\u03AB\u03C4eft\u0100AR\u03B3\u03B9rrow;\u67F8ightArrow;\u67FAightArrow;\u67F9ight\u0100AT\u03D8\u03DErrow;\u61D2ee;\u62A8p\u0241\u03E9\0\0\u03EFrrow;\u61D1ownArrow;\u61D5erticalBar;\u6225n\u0300ABLRTa\u0412\u042A\u0430\u045E\u047F\u037Crrow\u0180;BU\u041D\u041E\u0422\u6193ar;\u6913pArrow;\u61F5reve;\u4311eft\u02D2\u043A\0\u0446\0\u0450ightVector;\u6950eeVector;\u695Eector\u0100;B\u0459\u045A\u61BDar;\u6956ight\u01D4\u0467\0\u0471eeVector;\u695Fector\u0100;B\u047A\u047B\u61C1ar;\u6957ee\u0100;A\u0486\u0487\u62A4rrow;\u61A7\u0100ct\u0492\u0497r;\uC000\u{1D49F}rok;\u4110\u0800NTacdfglmopqstux\u04BD\u04C0\u04C4\u04CB\u04DE\u04E2\u04E7\u04EE\u04F5\u0521\u052F\u0536\u0552\u055D\u0560\u0565G;\u414AH\u803B\xD0\u40D0cute\u803B\xC9\u40C9\u0180aiy\u04D2\u04D7\u04DCron;\u411Arc\u803B\xCA\u40CA;\u442Dot;\u4116r;\uC000\u{1D508}rave\u803B\xC8\u40C8ement;\u6208\u0100ap\u04FA\u04FEcr;\u4112ty\u0253\u0506\0\0\u0512mallSquare;\u65FBerySmallSquare;\u65AB\u0100gp\u0526\u052Aon;\u4118f;\uC000\u{1D53C}silon;\u4395u\u0100ai\u053C\u0549l\u0100;T\u0542\u0543\u6A75ilde;\u6242librium;\u61CC\u0100ci\u0557\u055Ar;\u6130m;\u6A73a;\u4397ml\u803B\xCB\u40CB\u0100ip\u056A\u056Fsts;\u6203onentialE;\u6147\u0280cfios\u0585\u0588\u058D\u05B2\u05CCy;\u4424r;\uC000\u{1D509}lled\u0253\u0597\0\0\u05A3mallSquare;\u65FCerySmallSquare;\u65AA\u0370\u05BA\0\u05BF\0\0\u05C4f;\uC000\u{1D53D}All;\u6200riertrf;\u6131c\xF2\u05CB\u0600JTabcdfgorst\u05E8\u05EC\u05EF\u05FA\u0600\u0612\u0616\u061B\u061D\u0623\u066C\u0672cy;\u4403\u803B>\u403Emma\u0100;d\u05F7\u05F8\u4393;\u43DCreve;\u411E\u0180eiy\u0607\u060C\u0610dil;\u4122rc;\u411C;\u4413ot;\u4120r;\uC000\u{1D50A};\u62D9pf;\uC000\u{1D53E}eater\u0300EFGLST\u0635\u0644\u064E\u0656\u065B\u0666qual\u0100;L\u063E\u063F\u6265ess;\u62DBullEqual;\u6267reater;\u6AA2ess;\u6277lantEqual;\u6A7Eilde;\u6273cr;\uC000\u{1D4A2};\u626B\u0400Aacfiosu\u0685\u068B\u0696\u069B\u069E\u06AA\u06BE\u06CARDcy;\u442A\u0100ct\u0690\u0694ek;\u42C7;\u405Eirc;\u4124r;\u610ClbertSpace;\u610B\u01F0\u06AF\0\u06B2f;\u610DizontalLine;\u6500\u0100ct\u06C3\u06C5\xF2\u06A9rok;\u4126mp\u0144\u06D0\u06D8ownHum\xF0\u012Fqual;\u624F\u0700EJOacdfgmnostu\u06FA\u06FE\u0703\u0707\u070E\u071A\u071E\u0721\u0728\u0744\u0778\u078B\u078F\u0795cy;\u4415lig;\u4132cy;\u4401cute\u803B\xCD\u40CD\u0100iy\u0713\u0718rc\u803B\xCE\u40CE;\u4418ot;\u4130r;\u6111rave\u803B\xCC\u40CC\u0180;ap\u0720\u072F\u073F\u0100cg\u0734\u0737r;\u412AinaryI;\u6148lie\xF3\u03DD\u01F4\u0749\0\u0762\u0100;e\u074D\u074E\u622C\u0100gr\u0753\u0758ral;\u622Bsection;\u62C2isible\u0100CT\u076C\u0772omma;\u6063imes;\u6062\u0180gpt\u077F\u0783\u0788on;\u412Ef;\uC000\u{1D540}a;\u4399cr;\u6110ilde;\u4128\u01EB\u079A\0\u079Ecy;\u4406l\u803B\xCF\u40CF\u0280cfosu\u07AC\u07B7\u07BC\u07C2\u07D0\u0100iy\u07B1\u07B5rc;\u4134;\u4419r;\uC000\u{1D50D}pf;\uC000\u{1D541}\u01E3\u07C7\0\u07CCr;\uC000\u{1D4A5}rcy;\u4408kcy;\u4404\u0380HJacfos\u07E4\u07E8\u07EC\u07F1\u07FD\u0802\u0808cy;\u4425cy;\u440Cppa;\u439A\u0100ey\u07F6\u07FBdil;\u4136;\u441Ar;\uC000\u{1D50E}pf;\uC000\u{1D542}cr;\uC000\u{1D4A6}\u0580JTaceflmost\u0825\u0829\u082C\u0850\u0863\u09B3\u09B8\u09C7\u09CD\u0A37\u0A47cy;\u4409\u803B<\u403C\u0280cmnpr\u0837\u083C\u0841\u0844\u084Dute;\u4139bda;\u439Bg;\u67EAlacetrf;\u6112r;\u619E\u0180aey\u0857\u085C\u0861ron;\u413Ddil;\u413B;\u441B\u0100fs\u0868\u0970t\u0500ACDFRTUVar\u087E\u08A9\u08B1\u08E0\u08E6\u08FC\u092F\u095B\u0390\u096A\u0100nr\u0883\u088FgleBracket;\u67E8row\u0180;BR\u0899\u089A\u089E\u6190ar;\u61E4ightArrow;\u61C6eiling;\u6308o\u01F5\u08B7\0\u08C3bleBracket;\u67E6n\u01D4\u08C8\0\u08D2eeVector;\u6961ector\u0100;B\u08DB\u08DC\u61C3ar;\u6959loor;\u630Aight\u0100AV\u08EF\u08F5rrow;\u6194ector;\u694E\u0100er\u0901\u0917e\u0180;AV\u0909\u090A\u0910\u62A3rrow;\u61A4ector;\u695Aiangle\u0180;BE\u0924\u0925\u0929\u62B2ar;\u69CFqual;\u62B4p\u0180DTV\u0937\u0942\u094CownVector;\u6951eeVector;\u6960ector\u0100;B\u0956\u0957\u61BFar;\u6958ector\u0100;B\u0965\u0966\u61BCar;\u6952ight\xE1\u039Cs\u0300EFGLST\u097E\u098B\u0995\u099D\u09A2\u09ADqualGreater;\u62DAullEqual;\u6266reater;\u6276ess;\u6AA1lantEqual;\u6A7Dilde;\u6272r;\uC000\u{1D50F}\u0100;e\u09BD\u09BE\u62D8ftarrow;\u61DAidot;\u413F\u0180npw\u09D4\u0A16\u0A1Bg\u0200LRlr\u09DE\u09F7\u0A02\u0A10eft\u0100AR\u09E6\u09ECrrow;\u67F5ightArrow;\u67F7ightArrow;\u67F6eft\u0100ar\u03B3\u0A0Aight\xE1\u03BFight\xE1\u03CAf;\uC000\u{1D543}er\u0100LR\u0A22\u0A2CeftArrow;\u6199ightArrow;\u6198\u0180cht\u0A3E\u0A40\u0A42\xF2\u084C;\u61B0rok;\u4141;\u626A\u0400acefiosu\u0A5A\u0A5D\u0A60\u0A77\u0A7C\u0A85\u0A8B\u0A8Ep;\u6905y;\u441C\u0100dl\u0A65\u0A6FiumSpace;\u605Flintrf;\u6133r;\uC000\u{1D510}nusPlus;\u6213pf;\uC000\u{1D544}c\xF2\u0A76;\u439C\u0480Jacefostu\u0AA3\u0AA7\u0AAD\u0AC0\u0B14\u0B19\u0D91\u0D97\u0D9Ecy;\u440Acute;\u4143\u0180aey\u0AB4\u0AB9\u0ABEron;\u4147dil;\u4145;\u441D\u0180gsw\u0AC7\u0AF0\u0B0Eative\u0180MTV\u0AD3\u0ADF\u0AE8ediumSpace;\u600Bhi\u0100cn\u0AE6\u0AD8\xEB\u0AD9eryThi\xEE\u0AD9ted\u0100GL\u0AF8\u0B06reaterGreate\xF2\u0673essLes\xF3\u0A48Line;\u400Ar;\uC000\u{1D511}\u0200Bnpt\u0B22\u0B28\u0B37\u0B3Areak;\u6060BreakingSpace;\u40A0f;\u6115\u0680;CDEGHLNPRSTV\u0B55\u0B56\u0B6A\u0B7C\u0BA1\u0BEB\u0C04\u0C5E\u0C84\u0CA6\u0CD8\u0D61\u0D85\u6AEC\u0100ou\u0B5B\u0B64ngruent;\u6262pCap;\u626DoubleVerticalBar;\u6226\u0180lqx\u0B83\u0B8A\u0B9Bement;\u6209ual\u0100;T\u0B92\u0B93\u6260ilde;\uC000\u2242\u0338ists;\u6204reater\u0380;EFGLST\u0BB6\u0BB7\u0BBD\u0BC9\u0BD3\u0BD8\u0BE5\u626Fqual;\u6271ullEqual;\uC000\u2267\u0338reater;\uC000\u226B\u0338ess;\u6279lantEqual;\uC000\u2A7E\u0338ilde;\u6275ump\u0144\u0BF2\u0BFDownHump;\uC000\u224E\u0338qual;\uC000\u224F\u0338e\u0100fs\u0C0A\u0C27tTriangle\u0180;BE\u0C1A\u0C1B\u0C21\u62EAar;\uC000\u29CF\u0338qual;\u62ECs\u0300;EGLST\u0C35\u0C36\u0C3C\u0C44\u0C4B\u0C58\u626Equal;\u6270reater;\u6278ess;\uC000\u226A\u0338lantEqual;\uC000\u2A7D\u0338ilde;\u6274ested\u0100GL\u0C68\u0C79reaterGreater;\uC000\u2AA2\u0338essLess;\uC000\u2AA1\u0338recedes\u0180;ES\u0C92\u0C93\u0C9B\u6280qual;\uC000\u2AAF\u0338lantEqual;\u62E0\u0100ei\u0CAB\u0CB9verseElement;\u620CghtTriangle\u0180;BE\u0CCB\u0CCC\u0CD2\u62EBar;\uC000\u29D0\u0338qual;\u62ED\u0100qu\u0CDD\u0D0CuareSu\u0100bp\u0CE8\u0CF9set\u0100;E\u0CF0\u0CF3\uC000\u228F\u0338qual;\u62E2erset\u0100;E\u0D03\u0D06\uC000\u2290\u0338qual;\u62E3\u0180bcp\u0D13\u0D24\u0D4Eset\u0100;E\u0D1B\u0D1E\uC000\u2282\u20D2qual;\u6288ceeds\u0200;EST\u0D32\u0D33\u0D3B\u0D46\u6281qual;\uC000\u2AB0\u0338lantEqual;\u62E1ilde;\uC000\u227F\u0338erset\u0100;E\u0D58\u0D5B\uC000\u2283\u20D2qual;\u6289ilde\u0200;EFT\u0D6E\u0D6F\u0D75\u0D7F\u6241qual;\u6244ullEqual;\u6247ilde;\u6249erticalBar;\u6224cr;\uC000\u{1D4A9}ilde\u803B\xD1\u40D1;\u439D\u0700Eacdfgmoprstuv\u0DBD\u0DC2\u0DC9\u0DD5\u0DDB\u0DE0\u0DE7\u0DFC\u0E02\u0E20\u0E22\u0E32\u0E3F\u0E44lig;\u4152cute\u803B\xD3\u40D3\u0100iy\u0DCE\u0DD3rc\u803B\xD4\u40D4;\u441Eblac;\u4150r;\uC000\u{1D512}rave\u803B\xD2\u40D2\u0180aei\u0DEE\u0DF2\u0DF6cr;\u414Cga;\u43A9cron;\u439Fpf;\uC000\u{1D546}enCurly\u0100DQ\u0E0E\u0E1AoubleQuote;\u601Cuote;\u6018;\u6A54\u0100cl\u0E27\u0E2Cr;\uC000\u{1D4AA}ash\u803B\xD8\u40D8i\u016C\u0E37\u0E3Cde\u803B\xD5\u40D5es;\u6A37ml\u803B\xD6\u40D6er\u0100BP\u0E4B\u0E60\u0100ar\u0E50\u0E53r;\u603Eac\u0100ek\u0E5A\u0E5C;\u63DEet;\u63B4arenthesis;\u63DC\u0480acfhilors\u0E7F\u0E87\u0E8A\u0E8F\u0E92\u0E94\u0E9D\u0EB0\u0EFCrtialD;\u6202y;\u441Fr;\uC000\u{1D513}i;\u43A6;\u43A0usMinus;\u40B1\u0100ip\u0EA2\u0EADncareplan\xE5\u069Df;\u6119\u0200;eio\u0EB9\u0EBA\u0EE0\u0EE4\u6ABBcedes\u0200;EST\u0EC8\u0EC9\u0ECF\u0EDA\u627Aqual;\u6AAFlantEqual;\u627Cilde;\u627Eme;\u6033\u0100dp\u0EE9\u0EEEuct;\u620Fortion\u0100;a\u0225\u0EF9l;\u621D\u0100ci\u0F01\u0F06r;\uC000\u{1D4AB};\u43A8\u0200Ufos\u0F11\u0F16\u0F1B\u0F1FOT\u803B"\u4022r;\uC000\u{1D514}pf;\u611Acr;\uC000\u{1D4AC}\u0600BEacefhiorsu\u0F3E\u0F43\u0F47\u0F60\u0F73\u0FA7\u0FAA\u0FAD\u1096\u10A9\u10B4\u10BEarr;\u6910G\u803B\xAE\u40AE\u0180cnr\u0F4E\u0F53\u0F56ute;\u4154g;\u67EBr\u0100;t\u0F5C\u0F5D\u61A0l;\u6916\u0180aey\u0F67\u0F6C\u0F71ron;\u4158dil;\u4156;\u4420\u0100;v\u0F78\u0F79\u611Cerse\u0100EU\u0F82\u0F99\u0100lq\u0F87\u0F8Eement;\u620Builibrium;\u61CBpEquilibrium;\u696Fr\xBB\u0F79o;\u43A1ght\u0400ACDFTUVa\u0FC1\u0FEB\u0FF3\u1022\u1028\u105B\u1087\u03D8\u0100nr\u0FC6\u0FD2gleBracket;\u67E9row\u0180;BL\u0FDC\u0FDD\u0FE1\u6192ar;\u61E5eftArrow;\u61C4eiling;\u6309o\u01F5\u0FF9\0\u1005bleBracket;\u67E7n\u01D4\u100A\0\u1014eeVector;\u695Dector\u0100;B\u101D\u101E\u61C2ar;\u6955loor;\u630B\u0100er\u102D\u1043e\u0180;AV\u1035\u1036\u103C\u62A2rrow;\u61A6ector;\u695Biangle\u0180;BE\u1050\u1051\u1055\u62B3ar;\u69D0qual;\u62B5p\u0180DTV\u1063\u106E\u1078ownVector;\u694FeeVector;\u695Cector\u0100;B\u1082\u1083\u61BEar;\u6954ector\u0100;B\u1091\u1092\u61C0ar;\u6953\u0100pu\u109B\u109Ef;\u611DndImplies;\u6970ightarrow;\u61DB\u0100ch\u10B9\u10BCr;\u611B;\u61B1leDelayed;\u69F4\u0680HOacfhimoqstu\u10E4\u10F1\u10F7\u10FD\u1119\u111E\u1151\u1156\u1161\u1167\u11B5\u11BB\u11BF\u0100Cc\u10E9\u10EEHcy;\u4429y;\u4428FTcy;\u442Ccute;\u415A\u0280;aeiy\u1108\u1109\u110E\u1113\u1117\u6ABCron;\u4160dil;\u415Erc;\u415C;\u4421r;\uC000\u{1D516}ort\u0200DLRU\u112A\u1134\u113E\u1149ownArrow\xBB\u041EeftArrow\xBB\u089AightArrow\xBB\u0FDDpArrow;\u6191gma;\u43A3allCircle;\u6218pf;\uC000\u{1D54A}\u0272\u116D\0\0\u1170t;\u621Aare\u0200;ISU\u117B\u117C\u1189\u11AF\u65A1ntersection;\u6293u\u0100bp\u118F\u119Eset\u0100;E\u1197\u1198\u628Fqual;\u6291erset\u0100;E\u11A8\u11A9\u6290qual;\u6292nion;\u6294cr;\uC000\u{1D4AE}ar;\u62C6\u0200bcmp\u11C8\u11DB\u1209\u120B\u0100;s\u11CD\u11CE\u62D0et\u0100;E\u11CD\u11D5qual;\u6286\u0100ch\u11E0\u1205eeds\u0200;EST\u11ED\u11EE\u11F4\u11FF\u627Bqual;\u6AB0lantEqual;\u627Dilde;\u627FTh\xE1\u0F8C;\u6211\u0180;es\u1212\u1213\u1223\u62D1rset\u0100;E\u121C\u121D\u6283qual;\u6287et\xBB\u1213\u0580HRSacfhiors\u123E\u1244\u1249\u1255\u125E\u1271\u1276\u129F\u12C2\u12C8\u12D1ORN\u803B\xDE\u40DEADE;\u6122\u0100Hc\u124E\u1252cy;\u440By;\u4426\u0100bu\u125A\u125C;\u4009;\u43A4\u0180aey\u1265\u126A\u126Fron;\u4164dil;\u4162;\u4422r;\uC000\u{1D517}\u0100ei\u127B\u1289\u01F2\u1280\0\u1287efore;\u6234a;\u4398\u0100cn\u128E\u1298kSpace;\uC000\u205F\u200ASpace;\u6009lde\u0200;EFT\u12AB\u12AC\u12B2\u12BC\u623Cqual;\u6243ullEqual;\u6245ilde;\u6248pf;\uC000\u{1D54B}ipleDot;\u60DB\u0100ct\u12D6\u12DBr;\uC000\u{1D4AF}rok;\u4166\u0AE1\u12F7\u130E\u131A\u1326\0\u132C\u1331\0\0\0\0\0\u1338\u133D\u1377\u1385\0\u13FF\u1404\u140A\u1410\u0100cr\u12FB\u1301ute\u803B\xDA\u40DAr\u0100;o\u1307\u1308\u619Fcir;\u6949r\u01E3\u1313\0\u1316y;\u440Eve;\u416C\u0100iy\u131E\u1323rc\u803B\xDB\u40DB;\u4423blac;\u4170r;\uC000\u{1D518}rave\u803B\xD9\u40D9acr;\u416A\u0100di\u1341\u1369er\u0100BP\u1348\u135D\u0100ar\u134D\u1350r;\u405Fac\u0100ek\u1357\u1359;\u63DFet;\u63B5arenthesis;\u63DDon\u0100;P\u1370\u1371\u62C3lus;\u628E\u0100gp\u137B\u137Fon;\u4172f;\uC000\u{1D54C}\u0400ADETadps\u1395\u13AE\u13B8\u13C4\u03E8\u13D2\u13D7\u13F3rrow\u0180;BD\u1150\u13A0\u13A4ar;\u6912ownArrow;\u61C5ownArrow;\u6195quilibrium;\u696Eee\u0100;A\u13CB\u13CC\u62A5rrow;\u61A5own\xE1\u03F3er\u0100LR\u13DE\u13E8eftArrow;\u6196ightArrow;\u6197i\u0100;l\u13F9\u13FA\u43D2on;\u43A5ing;\u416Ecr;\uC000\u{1D4B0}ilde;\u4168ml\u803B\xDC\u40DC\u0480Dbcdefosv\u1427\u142C\u1430\u1433\u143E\u1485\u148A\u1490\u1496ash;\u62ABar;\u6AEBy;\u4412ash\u0100;l\u143B\u143C\u62A9;\u6AE6\u0100er\u1443\u1445;\u62C1\u0180bty\u144C\u1450\u147Aar;\u6016\u0100;i\u144F\u1455cal\u0200BLST\u1461\u1465\u146A\u1474ar;\u6223ine;\u407Ceparator;\u6758ilde;\u6240ThinSpace;\u600Ar;\uC000\u{1D519}pf;\uC000\u{1D54D}cr;\uC000\u{1D4B1}dash;\u62AA\u0280cefos\u14A7\u14AC\u14B1\u14B6\u14BCirc;\u4174dge;\u62C0r;\uC000\u{1D51A}pf;\uC000\u{1D54E}cr;\uC000\u{1D4B2}\u0200fios\u14CB\u14D0\u14D2\u14D8r;\uC000\u{1D51B};\u439Epf;\uC000\u{1D54F}cr;\uC000\u{1D4B3}\u0480AIUacfosu\u14F1\u14F5\u14F9\u14FD\u1504\u150F\u1514\u151A\u1520cy;\u442Fcy;\u4407cy;\u442Ecute\u803B\xDD\u40DD\u0100iy\u1509\u150Drc;\u4176;\u442Br;\uC000\u{1D51C}pf;\uC000\u{1D550}cr;\uC000\u{1D4B4}ml;\u4178\u0400Hacdefos\u1535\u1539\u153F\u154B\u154F\u155D\u1560\u1564cy;\u4416cute;\u4179\u0100ay\u1544\u1549ron;\u417D;\u4417ot;\u417B\u01F2\u1554\0\u155BoWidt\xE8\u0AD9a;\u4396r;\u6128pf;\u6124cr;\uC000\u{1D4B5}\u0BE1\u1583\u158A\u1590\0\u15B0\u15B6\u15BF\0\0\0\0\u15C6\u15DB\u15EB\u165F\u166D\0\u1695\u169B\u16B2\u16B9\0\u16BEcute\u803B\xE1\u40E1reve;\u4103\u0300;Ediuy\u159C\u159D\u15A1\u15A3\u15A8\u15AD\u623E;\uC000\u223E\u0333;\u623Frc\u803B\xE2\u40E2te\u80BB\xB4\u0306;\u4430lig\u803B\xE6\u40E6\u0100;r\xB2\u15BA;\uC000\u{1D51E}rave\u803B\xE0\u40E0\u0100ep\u15CA\u15D6\u0100fp\u15CF\u15D4sym;\u6135\xE8\u15D3ha;\u43B1\u0100ap\u15DFc\u0100cl\u15E4\u15E7r;\u4101g;\u6A3F\u0264\u15F0\0\0\u160A\u0280;adsv\u15FA\u15FB\u15FF\u1601\u1607\u6227nd;\u6A55;\u6A5Clope;\u6A58;\u6A5A\u0380;elmrsz\u1618\u1619\u161B\u161E\u163F\u164F\u1659\u6220;\u69A4e\xBB\u1619sd\u0100;a\u1625\u1626\u6221\u0461\u1630\u1632\u1634\u1636\u1638\u163A\u163C\u163E;\u69A8;\u69A9;\u69AA;\u69AB;\u69AC;\u69AD;\u69AE;\u69AFt\u0100;v\u1645\u1646\u621Fb\u0100;d\u164C\u164D\u62BE;\u699D\u0100pt\u1654\u1657h;\u6222\xBB\xB9arr;\u637C\u0100gp\u1663\u1667on;\u4105f;\uC000\u{1D552}\u0380;Eaeiop\u12C1\u167B\u167D\u1682\u1684\u1687\u168A;\u6A70cir;\u6A6F;\u624Ad;\u624Bs;\u4027rox\u0100;e\u12C1\u1692\xF1\u1683ing\u803B\xE5\u40E5\u0180cty\u16A1\u16A6\u16A8r;\uC000\u{1D4B6};\u402Amp\u0100;e\u12C1\u16AF\xF1\u0288ilde\u803B\xE3\u40E3ml\u803B\xE4\u40E4\u0100ci\u16C2\u16C8onin\xF4\u0272nt;\u6A11\u0800Nabcdefiklnoprsu\u16ED\u16F1\u1730\u173C\u1743\u1748\u1778\u177D\u17E0\u17E6\u1839\u1850\u170D\u193D\u1948\u1970ot;\u6AED\u0100cr\u16F6\u171Ek\u0200ceps\u1700\u1705\u170D\u1713ong;\u624Cpsilon;\u43F6rime;\u6035im\u0100;e\u171A\u171B\u623Dq;\u62CD\u0176\u1722\u1726ee;\u62BDed\u0100;g\u172C\u172D\u6305e\xBB\u172Drk\u0100;t\u135C\u1737brk;\u63B6\u0100oy\u1701\u1741;\u4431quo;\u601E\u0280cmprt\u1753\u175B\u1761\u1764\u1768aus\u0100;e\u010A\u0109ptyv;\u69B0s\xE9\u170Cno\xF5\u0113\u0180ahw\u176F\u1771\u1773;\u43B2;\u6136een;\u626Cr;\uC000\u{1D51F}g\u0380costuvw\u178D\u179D\u17B3\u17C1\u17D5\u17DB\u17DE\u0180aiu\u1794\u1796\u179A\xF0\u0760rc;\u65EFp\xBB\u1371\u0180dpt\u17A4\u17A8\u17ADot;\u6A00lus;\u6A01imes;\u6A02\u0271\u17B9\0\0\u17BEcup;\u6A06ar;\u6605riangle\u0100du\u17CD\u17D2own;\u65BDp;\u65B3plus;\u6A04e\xE5\u1444\xE5\u14ADarow;\u690D\u0180ako\u17ED\u1826\u1835\u0100cn\u17F2\u1823k\u0180lst\u17FA\u05AB\u1802ozenge;\u69EBriangle\u0200;dlr\u1812\u1813\u1818\u181D\u65B4own;\u65BEeft;\u65C2ight;\u65B8k;\u6423\u01B1\u182B\0\u1833\u01B2\u182F\0\u1831;\u6592;\u65914;\u6593ck;\u6588\u0100eo\u183E\u184D\u0100;q\u1843\u1846\uC000=\u20E5uiv;\uC000\u2261\u20E5t;\u6310\u0200ptwx\u1859\u185E\u1867\u186Cf;\uC000\u{1D553}\u0100;t\u13CB\u1863om\xBB\u13CCtie;\u62C8\u0600DHUVbdhmptuv\u1885\u1896\u18AA\u18BB\u18D7\u18DB\u18EC\u18FF\u1905\u190A\u1910\u1921\u0200LRlr\u188E\u1890\u1892\u1894;\u6557;\u6554;\u6556;\u6553\u0280;DUdu\u18A1\u18A2\u18A4\u18A6\u18A8\u6550;\u6566;\u6569;\u6564;\u6567\u0200LRlr\u18B3\u18B5\u18B7\u18B9;\u655D;\u655A;\u655C;\u6559\u0380;HLRhlr\u18CA\u18CB\u18CD\u18CF\u18D1\u18D3\u18D5\u6551;\u656C;\u6563;\u6560;\u656B;\u6562;\u655Fox;\u69C9\u0200LRlr\u18E4\u18E6\u18E8\u18EA;\u6555;\u6552;\u6510;\u650C\u0280;DUdu\u06BD\u18F7\u18F9\u18FB\u18FD;\u6565;\u6568;\u652C;\u6534inus;\u629Flus;\u629Eimes;\u62A0\u0200LRlr\u1919\u191B\u191D\u191F;\u655B;\u6558;\u6518;\u6514\u0380;HLRhlr\u1930\u1931\u1933\u1935\u1937\u1939\u193B\u6502;\u656A;\u6561;\u655E;\u653C;\u6524;\u651C\u0100ev\u0123\u1942bar\u803B\xA6\u40A6\u0200ceio\u1951\u1956\u195A\u1960r;\uC000\u{1D4B7}mi;\u604Fm\u0100;e\u171A\u171Cl\u0180;bh\u1968\u1969\u196B\u405C;\u69C5sub;\u67C8\u016C\u1974\u197El\u0100;e\u1979\u197A\u6022t\xBB\u197Ap\u0180;Ee\u012F\u1985\u1987;\u6AAE\u0100;q\u06DC\u06DB\u0CE1\u19A7\0\u19E8\u1A11\u1A15\u1A32\0\u1A37\u1A50\0\0\u1AB4\0\0\u1AC1\0\0\u1B21\u1B2E\u1B4D\u1B52\0\u1BFD\0\u1C0C\u0180cpr\u19AD\u19B2\u19DDute;\u4107\u0300;abcds\u19BF\u19C0\u19C4\u19CA\u19D5\u19D9\u6229nd;\u6A44rcup;\u6A49\u0100au\u19CF\u19D2p;\u6A4Bp;\u6A47ot;\u6A40;\uC000\u2229\uFE00\u0100eo\u19E2\u19E5t;\u6041\xEE\u0693\u0200aeiu\u19F0\u19FB\u1A01\u1A05\u01F0\u19F5\0\u19F8s;\u6A4Don;\u410Ddil\u803B\xE7\u40E7rc;\u4109ps\u0100;s\u1A0C\u1A0D\u6A4Cm;\u6A50ot;\u410B\u0180dmn\u1A1B\u1A20\u1A26il\u80BB\xB8\u01ADptyv;\u69B2t\u8100\xA2;e\u1A2D\u1A2E\u40A2r\xE4\u01B2r;\uC000\u{1D520}\u0180cei\u1A3D\u1A40\u1A4Dy;\u4447ck\u0100;m\u1A47\u1A48\u6713ark\xBB\u1A48;\u43C7r\u0380;Ecefms\u1A5F\u1A60\u1A62\u1A6B\u1AA4\u1AAA\u1AAE\u65CB;\u69C3\u0180;el\u1A69\u1A6A\u1A6D\u42C6q;\u6257e\u0261\u1A74\0\0\u1A88rrow\u0100lr\u1A7C\u1A81eft;\u61BAight;\u61BB\u0280RSacd\u1A92\u1A94\u1A96\u1A9A\u1A9F\xBB\u0F47;\u64C8st;\u629Birc;\u629Aash;\u629Dnint;\u6A10id;\u6AEFcir;\u69C2ubs\u0100;u\u1ABB\u1ABC\u6663it\xBB\u1ABC\u02EC\u1AC7\u1AD4\u1AFA\0\u1B0Aon\u0100;e\u1ACD\u1ACE\u403A\u0100;q\xC7\xC6\u026D\u1AD9\0\0\u1AE2a\u0100;t\u1ADE\u1ADF\u402C;\u4040\u0180;fl\u1AE8\u1AE9\u1AEB\u6201\xEE\u1160e\u0100mx\u1AF1\u1AF6ent\xBB\u1AE9e\xF3\u024D\u01E7\u1AFE\0\u1B07\u0100;d\u12BB\u1B02ot;\u6A6Dn\xF4\u0246\u0180fry\u1B10\u1B14\u1B17;\uC000\u{1D554}o\xE4\u0254\u8100\xA9;s\u0155\u1B1Dr;\u6117\u0100ao\u1B25\u1B29rr;\u61B5ss;\u6717\u0100cu\u1B32\u1B37r;\uC000\u{1D4B8}\u0100bp\u1B3C\u1B44\u0100;e\u1B41\u1B42\u6ACF;\u6AD1\u0100;e\u1B49\u1B4A\u6AD0;\u6AD2dot;\u62EF\u0380delprvw\u1B60\u1B6C\u1B77\u1B82\u1BAC\u1BD4\u1BF9arr\u0100lr\u1B68\u1B6A;\u6938;\u6935\u0270\u1B72\0\0\u1B75r;\u62DEc;\u62DFarr\u0100;p\u1B7F\u1B80\u61B6;\u693D\u0300;bcdos\u1B8F\u1B90\u1B96\u1BA1\u1BA5\u1BA8\u622Arcap;\u6A48\u0100au\u1B9B\u1B9Ep;\u6A46p;\u6A4Aot;\u628Dr;\u6A45;\uC000\u222A\uFE00\u0200alrv\u1BB5\u1BBF\u1BDE\u1BE3rr\u0100;m\u1BBC\u1BBD\u61B7;\u693Cy\u0180evw\u1BC7\u1BD4\u1BD8q\u0270\u1BCE\0\0\u1BD2re\xE3\u1B73u\xE3\u1B75ee;\u62CEedge;\u62CFen\u803B\xA4\u40A4earrow\u0100lr\u1BEE\u1BF3eft\xBB\u1B80ight\xBB\u1BBDe\xE4\u1BDD\u0100ci\u1C01\u1C07onin\xF4\u01F7nt;\u6231lcty;\u632D\u0980AHabcdefhijlorstuwz\u1C38\u1C3B\u1C3F\u1C5D\u1C69\u1C75\u1C8A\u1C9E\u1CAC\u1CB7\u1CFB\u1CFF\u1D0D\u1D7B\u1D91\u1DAB\u1DBB\u1DC6\u1DCDr\xF2\u0381ar;\u6965\u0200glrs\u1C48\u1C4D\u1C52\u1C54ger;\u6020eth;\u6138\xF2\u1133h\u0100;v\u1C5A\u1C5B\u6010\xBB\u090A\u016B\u1C61\u1C67arow;\u690Fa\xE3\u0315\u0100ay\u1C6E\u1C73ron;\u410F;\u4434\u0180;ao\u0332\u1C7C\u1C84\u0100gr\u02BF\u1C81r;\u61CAtseq;\u6A77\u0180glm\u1C91\u1C94\u1C98\u803B\xB0\u40B0ta;\u43B4ptyv;\u69B1\u0100ir\u1CA3\u1CA8sht;\u697F;\uC000\u{1D521}ar\u0100lr\u1CB3\u1CB5\xBB\u08DC\xBB\u101E\u0280aegsv\u1CC2\u0378\u1CD6\u1CDC\u1CE0m\u0180;os\u0326\u1CCA\u1CD4nd\u0100;s\u0326\u1CD1uit;\u6666amma;\u43DDin;\u62F2\u0180;io\u1CE7\u1CE8\u1CF8\u40F7de\u8100\xF7;o\u1CE7\u1CF0ntimes;\u62C7n\xF8\u1CF7cy;\u4452c\u026F\u1D06\0\0\u1D0Arn;\u631Eop;\u630D\u0280lptuw\u1D18\u1D1D\u1D22\u1D49\u1D55lar;\u4024f;\uC000\u{1D555}\u0280;emps\u030B\u1D2D\u1D37\u1D3D\u1D42q\u0100;d\u0352\u1D33ot;\u6251inus;\u6238lus;\u6214quare;\u62A1blebarwedg\xE5\xFAn\u0180adh\u112E\u1D5D\u1D67ownarrow\xF3\u1C83arpoon\u0100lr\u1D72\u1D76ef\xF4\u1CB4igh\xF4\u1CB6\u0162\u1D7F\u1D85karo\xF7\u0F42\u026F\u1D8A\0\0\u1D8Ern;\u631Fop;\u630C\u0180cot\u1D98\u1DA3\u1DA6\u0100ry\u1D9D\u1DA1;\uC000\u{1D4B9};\u4455l;\u69F6rok;\u4111\u0100dr\u1DB0\u1DB4ot;\u62F1i\u0100;f\u1DBA\u1816\u65BF\u0100ah\u1DC0\u1DC3r\xF2\u0429a\xF2\u0FA6angle;\u69A6\u0100ci\u1DD2\u1DD5y;\u445Fgrarr;\u67FF\u0900Dacdefglmnopqrstux\u1E01\u1E09\u1E19\u1E38\u0578\u1E3C\u1E49\u1E61\u1E7E\u1EA5\u1EAF\u1EBD\u1EE1\u1F2A\u1F37\u1F44\u1F4E\u1F5A\u0100Do\u1E06\u1D34o\xF4\u1C89\u0100cs\u1E0E\u1E14ute\u803B\xE9\u40E9ter;\u6A6E\u0200aioy\u1E22\u1E27\u1E31\u1E36ron;\u411Br\u0100;c\u1E2D\u1E2E\u6256\u803B\xEA\u40EAlon;\u6255;\u444Dot;\u4117\u0100Dr\u1E41\u1E45ot;\u6252;\uC000\u{1D522}\u0180;rs\u1E50\u1E51\u1E57\u6A9Aave\u803B\xE8\u40E8\u0100;d\u1E5C\u1E5D\u6A96ot;\u6A98\u0200;ils\u1E6A\u1E6B\u1E72\u1E74\u6A99nters;\u63E7;\u6113\u0100;d\u1E79\u1E7A\u6A95ot;\u6A97\u0180aps\u1E85\u1E89\u1E97cr;\u4113ty\u0180;sv\u1E92\u1E93\u1E95\u6205et\xBB\u1E93p\u01001;\u1E9D\u1EA4\u0133\u1EA1\u1EA3;\u6004;\u6005\u6003\u0100gs\u1EAA\u1EAC;\u414Bp;\u6002\u0100gp\u1EB4\u1EB8on;\u4119f;\uC000\u{1D556}\u0180als\u1EC4\u1ECE\u1ED2r\u0100;s\u1ECA\u1ECB\u62D5l;\u69E3us;\u6A71i\u0180;lv\u1EDA\u1EDB\u1EDF\u43B5on\xBB\u1EDB;\u43F5\u0200csuv\u1EEA\u1EF3\u1F0B\u1F23\u0100io\u1EEF\u1E31rc\xBB\u1E2E\u0269\u1EF9\0\0\u1EFB\xED\u0548ant\u0100gl\u1F02\u1F06tr\xBB\u1E5Dess\xBB\u1E7A\u0180aei\u1F12\u1F16\u1F1Als;\u403Dst;\u625Fv\u0100;D\u0235\u1F20D;\u6A78parsl;\u69E5\u0100Da\u1F2F\u1F33ot;\u6253rr;\u6971\u0180cdi\u1F3E\u1F41\u1EF8r;\u612Fo\xF4\u0352\u0100ah\u1F49\u1F4B;\u43B7\u803B\xF0\u40F0\u0100mr\u1F53\u1F57l\u803B\xEB\u40EBo;\u60AC\u0180cip\u1F61\u1F64\u1F67l;\u4021s\xF4\u056E\u0100eo\u1F6C\u1F74ctatio\xEE\u0559nential\xE5\u0579\u09E1\u1F92\0\u1F9E\0\u1FA1\u1FA7\0\0\u1FC6\u1FCC\0\u1FD3\0\u1FE6\u1FEA\u2000\0\u2008\u205Allingdotse\xF1\u1E44y;\u4444male;\u6640\u0180ilr\u1FAD\u1FB3\u1FC1lig;\u8000\uFB03\u0269\u1FB9\0\0\u1FBDg;\u8000\uFB00ig;\u8000\uFB04;\uC000\u{1D523}lig;\u8000\uFB01lig;\uC000fj\u0180alt\u1FD9\u1FDC\u1FE1t;\u666Dig;\u8000\uFB02ns;\u65B1of;\u4192\u01F0\u1FEE\0\u1FF3f;\uC000\u{1D557}\u0100ak\u05BF\u1FF7\u0100;v\u1FFC\u1FFD\u62D4;\u6AD9artint;\u6A0D\u0100ao\u200C\u2055\u0100cs\u2011\u2052\u03B1\u201A\u2030\u2038\u2045\u2048\0\u2050\u03B2\u2022\u2025\u2027\u202A\u202C\0\u202E\u803B\xBD\u40BD;\u6153\u803B\xBC\u40BC;\u6155;\u6159;\u615B\u01B3\u2034\0\u2036;\u6154;\u6156\u02B4\u203E\u2041\0\0\u2043\u803B\xBE\u40BE;\u6157;\u615C5;\u6158\u01B6\u204C\0\u204E;\u615A;\u615D8;\u615El;\u6044wn;\u6322cr;\uC000\u{1D4BB}\u0880Eabcdefgijlnorstv\u2082\u2089\u209F\u20A5\u20B0\u20B4\u20F0\u20F5\u20FA\u20FF\u2103\u2112\u2138\u0317\u213E\u2152\u219E\u0100;l\u064D\u2087;\u6A8C\u0180cmp\u2090\u2095\u209Dute;\u41F5ma\u0100;d\u209C\u1CDA\u43B3;\u6A86reve;\u411F\u0100iy\u20AA\u20AErc;\u411D;\u4433ot;\u4121\u0200;lqs\u063E\u0642\u20BD\u20C9\u0180;qs\u063E\u064C\u20C4lan\xF4\u0665\u0200;cdl\u0665\u20D2\u20D5\u20E5c;\u6AA9ot\u0100;o\u20DC\u20DD\u6A80\u0100;l\u20E2\u20E3\u6A82;\u6A84\u0100;e\u20EA\u20ED\uC000\u22DB\uFE00s;\u6A94r;\uC000\u{1D524}\u0100;g\u0673\u061Bmel;\u6137cy;\u4453\u0200;Eaj\u065A\u210C\u210E\u2110;\u6A92;\u6AA5;\u6AA4\u0200Eaes\u211B\u211D\u2129\u2134;\u6269p\u0100;p\u2123\u2124\u6A8Arox\xBB\u2124\u0100;q\u212E\u212F\u6A88\u0100;q\u212E\u211Bim;\u62E7pf;\uC000\u{1D558}\u0100ci\u2143\u2146r;\u610Am\u0180;el\u066B\u214E\u2150;\u6A8E;\u6A90\u8300>;cdlqr\u05EE\u2160\u216A\u216E\u2173\u2179\u0100ci\u2165\u2167;\u6AA7r;\u6A7Aot;\u62D7Par;\u6995uest;\u6A7C\u0280adels\u2184\u216A\u2190\u0656\u219B\u01F0\u2189\0\u218Epro\xF8\u209Er;\u6978q\u0100lq\u063F\u2196les\xF3\u2088i\xED\u066B\u0100en\u21A3\u21ADrtneqq;\uC000\u2269\uFE00\xC5\u21AA\u0500Aabcefkosy\u21C4\u21C7\u21F1\u21F5\u21FA\u2218\u221D\u222F\u2268\u227Dr\xF2\u03A0\u0200ilmr\u21D0\u21D4\u21D7\u21DBrs\xF0\u1484f\xBB\u2024il\xF4\u06A9\u0100dr\u21E0\u21E4cy;\u444A\u0180;cw\u08F4\u21EB\u21EFir;\u6948;\u61ADar;\u610Firc;\u4125\u0180alr\u2201\u220E\u2213rts\u0100;u\u2209\u220A\u6665it\xBB\u220Alip;\u6026con;\u62B9r;\uC000\u{1D525}s\u0100ew\u2223\u2229arow;\u6925arow;\u6926\u0280amopr\u223A\u223E\u2243\u225E\u2263rr;\u61FFtht;\u623Bk\u0100lr\u2249\u2253eftarrow;\u61A9ightarrow;\u61AAf;\uC000\u{1D559}bar;\u6015\u0180clt\u226F\u2274\u2278r;\uC000\u{1D4BD}as\xE8\u21F4rok;\u4127\u0100bp\u2282\u2287ull;\u6043hen\xBB\u1C5B\u0AE1\u22A3\0\u22AA\0\u22B8\u22C5\u22CE\0\u22D5\u22F3\0\0\u22F8\u2322\u2367\u2362\u237F\0\u2386\u23AA\u23B4cute\u803B\xED\u40ED\u0180;iy\u0771\u22B0\u22B5rc\u803B\xEE\u40EE;\u4438\u0100cx\u22BC\u22BFy;\u4435cl\u803B\xA1\u40A1\u0100fr\u039F\u22C9;\uC000\u{1D526}rave\u803B\xEC\u40EC\u0200;ino\u073E\u22DD\u22E9\u22EE\u0100in\u22E2\u22E6nt;\u6A0Ct;\u622Dfin;\u69DCta;\u6129lig;\u4133\u0180aop\u22FE\u231A\u231D\u0180cgt\u2305\u2308\u2317r;\u412B\u0180elp\u071F\u230F\u2313in\xE5\u078Ear\xF4\u0720h;\u4131f;\u62B7ed;\u41B5\u0280;cfot\u04F4\u232C\u2331\u233D\u2341are;\u6105in\u0100;t\u2338\u2339\u621Eie;\u69DDdo\xF4\u2319\u0280;celp\u0757\u234C\u2350\u235B\u2361al;\u62BA\u0100gr\u2355\u2359er\xF3\u1563\xE3\u234Darhk;\u6A17rod;\u6A3C\u0200cgpt\u236F\u2372\u2376\u237By;\u4451on;\u412Ff;\uC000\u{1D55A}a;\u43B9uest\u803B\xBF\u40BF\u0100ci\u238A\u238Fr;\uC000\u{1D4BE}n\u0280;Edsv\u04F4\u239B\u239D\u23A1\u04F3;\u62F9ot;\u62F5\u0100;v\u23A6\u23A7\u62F4;\u62F3\u0100;i\u0777\u23AElde;\u4129\u01EB\u23B8\0\u23BCcy;\u4456l\u803B\xEF\u40EF\u0300cfmosu\u23CC\u23D7\u23DC\u23E1\u23E7\u23F5\u0100iy\u23D1\u23D5rc;\u4135;\u4439r;\uC000\u{1D527}ath;\u4237pf;\uC000\u{1D55B}\u01E3\u23EC\0\u23F1r;\uC000\u{1D4BF}rcy;\u4458kcy;\u4454\u0400acfghjos\u240B\u2416\u2422\u2427\u242D\u2431\u2435\u243Bppa\u0100;v\u2413\u2414\u43BA;\u43F0\u0100ey\u241B\u2420dil;\u4137;\u443Ar;\uC000\u{1D528}reen;\u4138cy;\u4445cy;\u445Cpf;\uC000\u{1D55C}cr;\uC000\u{1D4C0}\u0B80ABEHabcdefghjlmnoprstuv\u2470\u2481\u2486\u248D\u2491\u250E\u253D\u255A\u2580\u264E\u265E\u2665\u2679\u267D\u269A\u26B2\u26D8\u275D\u2768\u278B\u27C0\u2801\u2812\u0180art\u2477\u247A\u247Cr\xF2\u09C6\xF2\u0395ail;\u691Barr;\u690E\u0100;g\u0994\u248B;\u6A8Bar;\u6962\u0963\u24A5\0\u24AA\0\u24B1\0\0\0\0\0\u24B5\u24BA\0\u24C6\u24C8\u24CD\0\u24F9ute;\u413Amptyv;\u69B4ra\xEE\u084Cbda;\u43BBg\u0180;dl\u088E\u24C1\u24C3;\u6991\xE5\u088E;\u6A85uo\u803B\xAB\u40ABr\u0400;bfhlpst\u0899\u24DE\u24E6\u24E9\u24EB\u24EE\u24F1\u24F5\u0100;f\u089D\u24E3s;\u691Fs;\u691D\xEB\u2252p;\u61ABl;\u6939im;\u6973l;\u61A2\u0180;ae\u24FF\u2500\u2504\u6AABil;\u6919\u0100;s\u2509\u250A\u6AAD;\uC000\u2AAD\uFE00\u0180abr\u2515\u2519\u251Drr;\u690Crk;\u6772\u0100ak\u2522\u252Cc\u0100ek\u2528\u252A;\u407B;\u405B\u0100es\u2531\u2533;\u698Bl\u0100du\u2539\u253B;\u698F;\u698D\u0200aeuy\u2546\u254B\u2556\u2558ron;\u413E\u0100di\u2550\u2554il;\u413C\xEC\u08B0\xE2\u2529;\u443B\u0200cqrs\u2563\u2566\u256D\u257Da;\u6936uo\u0100;r\u0E19\u1746\u0100du\u2572\u2577har;\u6967shar;\u694Bh;\u61B2\u0280;fgqs\u258B\u258C\u0989\u25F3\u25FF\u6264t\u0280ahlrt\u2598\u25A4\u25B7\u25C2\u25E8rrow\u0100;t\u0899\u25A1a\xE9\u24F6arpoon\u0100du\u25AF\u25B4own\xBB\u045Ap\xBB\u0966eftarrows;\u61C7ight\u0180ahs\u25CD\u25D6\u25DErrow\u0100;s\u08F4\u08A7arpoon\xF3\u0F98quigarro\xF7\u21F0hreetimes;\u62CB\u0180;qs\u258B\u0993\u25FAlan\xF4\u09AC\u0280;cdgs\u09AC\u260A\u260D\u261D\u2628c;\u6AA8ot\u0100;o\u2614\u2615\u6A7F\u0100;r\u261A\u261B\u6A81;\u6A83\u0100;e\u2622\u2625\uC000\u22DA\uFE00s;\u6A93\u0280adegs\u2633\u2639\u263D\u2649\u264Bppro\xF8\u24C6ot;\u62D6q\u0100gq\u2643\u2645\xF4\u0989gt\xF2\u248C\xF4\u099Bi\xED\u09B2\u0180ilr\u2655\u08E1\u265Asht;\u697C;\uC000\u{1D529}\u0100;E\u099C\u2663;\u6A91\u0161\u2669\u2676r\u0100du\u25B2\u266E\u0100;l\u0965\u2673;\u696Alk;\u6584cy;\u4459\u0280;acht\u0A48\u2688\u268B\u2691\u2696r\xF2\u25C1orne\xF2\u1D08ard;\u696Bri;\u65FA\u0100io\u269F\u26A4dot;\u4140ust\u0100;a\u26AC\u26AD\u63B0che\xBB\u26AD\u0200Eaes\u26BB\u26BD\u26C9\u26D4;\u6268p\u0100;p\u26C3\u26C4\u6A89rox\xBB\u26C4\u0100;q\u26CE\u26CF\u6A87\u0100;q\u26CE\u26BBim;\u62E6\u0400abnoptwz\u26E9\u26F4\u26F7\u271A\u272F\u2741\u2747\u2750\u0100nr\u26EE\u26F1g;\u67ECr;\u61FDr\xEB\u08C1g\u0180lmr\u26FF\u270D\u2714eft\u0100ar\u09E6\u2707ight\xE1\u09F2apsto;\u67FCight\xE1\u09FDparrow\u0100lr\u2725\u2729ef\xF4\u24EDight;\u61AC\u0180afl\u2736\u2739\u273Dr;\u6985;\uC000\u{1D55D}us;\u6A2Dimes;\u6A34\u0161\u274B\u274Fst;\u6217\xE1\u134E\u0180;ef\u2757\u2758\u1800\u65CAnge\xBB\u2758ar\u0100;l\u2764\u2765\u4028t;\u6993\u0280achmt\u2773\u2776\u277C\u2785\u2787r\xF2\u08A8orne\xF2\u1D8Car\u0100;d\u0F98\u2783;\u696D;\u600Eri;\u62BF\u0300achiqt\u2798\u279D\u0A40\u27A2\u27AE\u27BBquo;\u6039r;\uC000\u{1D4C1}m\u0180;eg\u09B2\u27AA\u27AC;\u6A8D;\u6A8F\u0100bu\u252A\u27B3o\u0100;r\u0E1F\u27B9;\u601Arok;\u4142\u8400<;cdhilqr\u082B\u27D2\u2639\u27DC\u27E0\u27E5\u27EA\u27F0\u0100ci\u27D7\u27D9;\u6AA6r;\u6A79re\xE5\u25F2mes;\u62C9arr;\u6976uest;\u6A7B\u0100Pi\u27F5\u27F9ar;\u6996\u0180;ef\u2800\u092D\u181B\u65C3r\u0100du\u2807\u280Dshar;\u694Ahar;\u6966\u0100en\u2817\u2821rtneqq;\uC000\u2268\uFE00\xC5\u281E\u0700Dacdefhilnopsu\u2840\u2845\u2882\u288E\u2893\u28A0\u28A5\u28A8\u28DA\u28E2\u28E4\u0A83\u28F3\u2902Dot;\u623A\u0200clpr\u284E\u2852\u2863\u287Dr\u803B\xAF\u40AF\u0100et\u2857\u2859;\u6642\u0100;e\u285E\u285F\u6720se\xBB\u285F\u0100;s\u103B\u2868to\u0200;dlu\u103B\u2873\u2877\u287Bow\xEE\u048Cef\xF4\u090F\xF0\u13D1ker;\u65AE\u0100oy\u2887\u288Cmma;\u6A29;\u443Cash;\u6014asuredangle\xBB\u1626r;\uC000\u{1D52A}o;\u6127\u0180cdn\u28AF\u28B4\u28C9ro\u803B\xB5\u40B5\u0200;acd\u1464\u28BD\u28C0\u28C4s\xF4\u16A7ir;\u6AF0ot\u80BB\xB7\u01B5us\u0180;bd\u28D2\u1903\u28D3\u6212\u0100;u\u1D3C\u28D8;\u6A2A\u0163\u28DE\u28E1p;\u6ADB\xF2\u2212\xF0\u0A81\u0100dp\u28E9\u28EEels;\u62A7f;\uC000\u{1D55E}\u0100ct\u28F8\u28FDr;\uC000\u{1D4C2}pos\xBB\u159D\u0180;lm\u2909\u290A\u290D\u43BCtimap;\u62B8\u0C00GLRVabcdefghijlmoprstuvw\u2942\u2953\u297E\u2989\u2998\u29DA\u29E9\u2A15\u2A1A\u2A58\u2A5D\u2A83\u2A95\u2AA4\u2AA8\u2B04\u2B07\u2B44\u2B7F\u2BAE\u2C34\u2C67\u2C7C\u2CE9\u0100gt\u2947\u294B;\uC000\u22D9\u0338\u0100;v\u2950\u0BCF\uC000\u226B\u20D2\u0180elt\u295A\u2972\u2976ft\u0100ar\u2961\u2967rrow;\u61CDightarrow;\u61CE;\uC000\u22D8\u0338\u0100;v\u297B\u0C47\uC000\u226A\u20D2ightarrow;\u61CF\u0100Dd\u298E\u2993ash;\u62AFash;\u62AE\u0280bcnpt\u29A3\u29A7\u29AC\u29B1\u29CCla\xBB\u02DEute;\u4144g;\uC000\u2220\u20D2\u0280;Eiop\u0D84\u29BC\u29C0\u29C5\u29C8;\uC000\u2A70\u0338d;\uC000\u224B\u0338s;\u4149ro\xF8\u0D84ur\u0100;a\u29D3\u29D4\u666El\u0100;s\u29D3\u0B38\u01F3\u29DF\0\u29E3p\u80BB\xA0\u0B37mp\u0100;e\u0BF9\u0C00\u0280aeouy\u29F4\u29FE\u2A03\u2A10\u2A13\u01F0\u29F9\0\u29FB;\u6A43on;\u4148dil;\u4146ng\u0100;d\u0D7E\u2A0Aot;\uC000\u2A6D\u0338p;\u6A42;\u443Dash;\u6013\u0380;Aadqsx\u0B92\u2A29\u2A2D\u2A3B\u2A41\u2A45\u2A50rr;\u61D7r\u0100hr\u2A33\u2A36k;\u6924\u0100;o\u13F2\u13F0ot;\uC000\u2250\u0338ui\xF6\u0B63\u0100ei\u2A4A\u2A4Ear;\u6928\xED\u0B98ist\u0100;s\u0BA0\u0B9Fr;\uC000\u{1D52B}\u0200Eest\u0BC5\u2A66\u2A79\u2A7C\u0180;qs\u0BBC\u2A6D\u0BE1\u0180;qs\u0BBC\u0BC5\u2A74lan\xF4\u0BE2i\xED\u0BEA\u0100;r\u0BB6\u2A81\xBB\u0BB7\u0180Aap\u2A8A\u2A8D\u2A91r\xF2\u2971rr;\u61AEar;\u6AF2\u0180;sv\u0F8D\u2A9C\u0F8C\u0100;d\u2AA1\u2AA2\u62FC;\u62FAcy;\u445A\u0380AEadest\u2AB7\u2ABA\u2ABE\u2AC2\u2AC5\u2AF6\u2AF9r\xF2\u2966;\uC000\u2266\u0338rr;\u619Ar;\u6025\u0200;fqs\u0C3B\u2ACE\u2AE3\u2AEFt\u0100ar\u2AD4\u2AD9rro\xF7\u2AC1ightarro\xF7\u2A90\u0180;qs\u0C3B\u2ABA\u2AEAlan\xF4\u0C55\u0100;s\u0C55\u2AF4\xBB\u0C36i\xED\u0C5D\u0100;r\u0C35\u2AFEi\u0100;e\u0C1A\u0C25i\xE4\u0D90\u0100pt\u2B0C\u2B11f;\uC000\u{1D55F}\u8180\xAC;in\u2B19\u2B1A\u2B36\u40ACn\u0200;Edv\u0B89\u2B24\u2B28\u2B2E;\uC000\u22F9\u0338ot;\uC000\u22F5\u0338\u01E1\u0B89\u2B33\u2B35;\u62F7;\u62F6i\u0100;v\u0CB8\u2B3C\u01E1\u0CB8\u2B41\u2B43;\u62FE;\u62FD\u0180aor\u2B4B\u2B63\u2B69r\u0200;ast\u0B7B\u2B55\u2B5A\u2B5Flle\xEC\u0B7Bl;\uC000\u2AFD\u20E5;\uC000\u2202\u0338lint;\u6A14\u0180;ce\u0C92\u2B70\u2B73u\xE5\u0CA5\u0100;c\u0C98\u2B78\u0100;e\u0C92\u2B7D\xF1\u0C98\u0200Aait\u2B88\u2B8B\u2B9D\u2BA7r\xF2\u2988rr\u0180;cw\u2B94\u2B95\u2B99\u619B;\uC000\u2933\u0338;\uC000\u219D\u0338ghtarrow\xBB\u2B95ri\u0100;e\u0CCB\u0CD6\u0380chimpqu\u2BBD\u2BCD\u2BD9\u2B04\u0B78\u2BE4\u2BEF\u0200;cer\u0D32\u2BC6\u0D37\u2BC9u\xE5\u0D45;\uC000\u{1D4C3}ort\u026D\u2B05\0\0\u2BD6ar\xE1\u2B56m\u0100;e\u0D6E\u2BDF\u0100;q\u0D74\u0D73su\u0100bp\u2BEB\u2BED\xE5\u0CF8\xE5\u0D0B\u0180bcp\u2BF6\u2C11\u2C19\u0200;Ees\u2BFF\u2C00\u0D22\u2C04\u6284;\uC000\u2AC5\u0338et\u0100;e\u0D1B\u2C0Bq\u0100;q\u0D23\u2C00c\u0100;e\u0D32\u2C17\xF1\u0D38\u0200;Ees\u2C22\u2C23\u0D5F\u2C27\u6285;\uC000\u2AC6\u0338et\u0100;e\u0D58\u2C2Eq\u0100;q\u0D60\u2C23\u0200gilr\u2C3D\u2C3F\u2C45\u2C47\xEC\u0BD7lde\u803B\xF1\u40F1\xE7\u0C43iangle\u0100lr\u2C52\u2C5Ceft\u0100;e\u0C1A\u2C5A\xF1\u0C26ight\u0100;e\u0CCB\u2C65\xF1\u0CD7\u0100;m\u2C6C\u2C6D\u43BD\u0180;es\u2C74\u2C75\u2C79\u4023ro;\u6116p;\u6007\u0480DHadgilrs\u2C8F\u2C94\u2C99\u2C9E\u2CA3\u2CB0\u2CB6\u2CD3\u2CE3ash;\u62ADarr;\u6904p;\uC000\u224D\u20D2ash;\u62AC\u0100et\u2CA8\u2CAC;\uC000\u2265\u20D2;\uC000>\u20D2nfin;\u69DE\u0180Aet\u2CBD\u2CC1\u2CC5rr;\u6902;\uC000\u2264\u20D2\u0100;r\u2CCA\u2CCD\uC000<\u20D2ie;\uC000\u22B4\u20D2\u0100At\u2CD8\u2CDCrr;\u6903rie;\uC000\u22B5\u20D2im;\uC000\u223C\u20D2\u0180Aan\u2CF0\u2CF4\u2D02rr;\u61D6r\u0100hr\u2CFA\u2CFDk;\u6923\u0100;o\u13E7\u13E5ear;\u6927\u1253\u1A95\0\0\0\0\0\0\0\0\0\0\0\0\0\u2D2D\0\u2D38\u2D48\u2D60\u2D65\u2D72\u2D84\u1B07\0\0\u2D8D\u2DAB\0\u2DC8\u2DCE\0\u2DDC\u2E19\u2E2B\u2E3E\u2E43\u0100cs\u2D31\u1A97ute\u803B\xF3\u40F3\u0100iy\u2D3C\u2D45r\u0100;c\u1A9E\u2D42\u803B\xF4\u40F4;\u443E\u0280abios\u1AA0\u2D52\u2D57\u01C8\u2D5Alac;\u4151v;\u6A38old;\u69BClig;\u4153\u0100cr\u2D69\u2D6Dir;\u69BF;\uC000\u{1D52C}\u036F\u2D79\0\0\u2D7C\0\u2D82n;\u42DBave\u803B\xF2\u40F2;\u69C1\u0100bm\u2D88\u0DF4ar;\u69B5\u0200acit\u2D95\u2D98\u2DA5\u2DA8r\xF2\u1A80\u0100ir\u2D9D\u2DA0r;\u69BEoss;\u69BBn\xE5\u0E52;\u69C0\u0180aei\u2DB1\u2DB5\u2DB9cr;\u414Dga;\u43C9\u0180cdn\u2DC0\u2DC5\u01CDron;\u43BF;\u69B6pf;\uC000\u{1D560}\u0180ael\u2DD4\u2DD7\u01D2r;\u69B7rp;\u69B9\u0380;adiosv\u2DEA\u2DEB\u2DEE\u2E08\u2E0D\u2E10\u2E16\u6228r\xF2\u1A86\u0200;efm\u2DF7\u2DF8\u2E02\u2E05\u6A5Dr\u0100;o\u2DFE\u2DFF\u6134f\xBB\u2DFF\u803B\xAA\u40AA\u803B\xBA\u40BAgof;\u62B6r;\u6A56lope;\u6A57;\u6A5B\u0180clo\u2E1F\u2E21\u2E27\xF2\u2E01ash\u803B\xF8\u40F8l;\u6298i\u016C\u2E2F\u2E34de\u803B\xF5\u40F5es\u0100;a\u01DB\u2E3As;\u6A36ml\u803B\xF6\u40F6bar;\u633D\u0AE1\u2E5E\0\u2E7D\0\u2E80\u2E9D\0\u2EA2\u2EB9\0\0\u2ECB\u0E9C\0\u2F13\0\0\u2F2B\u2FBC\0\u2FC8r\u0200;ast\u0403\u2E67\u2E72\u0E85\u8100\xB6;l\u2E6D\u2E6E\u40B6le\xEC\u0403\u0269\u2E78\0\0\u2E7Bm;\u6AF3;\u6AFDy;\u443Fr\u0280cimpt\u2E8B\u2E8F\u2E93\u1865\u2E97nt;\u4025od;\u402Eil;\u6030enk;\u6031r;\uC000\u{1D52D}\u0180imo\u2EA8\u2EB0\u2EB4\u0100;v\u2EAD\u2EAE\u43C6;\u43D5ma\xF4\u0A76ne;\u660E\u0180;tv\u2EBF\u2EC0\u2EC8\u43C0chfork\xBB\u1FFD;\u43D6\u0100au\u2ECF\u2EDFn\u0100ck\u2ED5\u2EDDk\u0100;h\u21F4\u2EDB;\u610E\xF6\u21F4s\u0480;abcdemst\u2EF3\u2EF4\u1908\u2EF9\u2EFD\u2F04\u2F06\u2F0A\u2F0E\u402Bcir;\u6A23ir;\u6A22\u0100ou\u1D40\u2F02;\u6A25;\u6A72n\u80BB\xB1\u0E9Dim;\u6A26wo;\u6A27\u0180ipu\u2F19\u2F20\u2F25ntint;\u6A15f;\uC000\u{1D561}nd\u803B\xA3\u40A3\u0500;Eaceinosu\u0EC8\u2F3F\u2F41\u2F44\u2F47\u2F81\u2F89\u2F92\u2F7E\u2FB6;\u6AB3p;\u6AB7u\xE5\u0ED9\u0100;c\u0ECE\u2F4C\u0300;acens\u0EC8\u2F59\u2F5F\u2F66\u2F68\u2F7Eppro\xF8\u2F43urlye\xF1\u0ED9\xF1\u0ECE\u0180aes\u2F6F\u2F76\u2F7Approx;\u6AB9qq;\u6AB5im;\u62E8i\xED\u0EDFme\u0100;s\u2F88\u0EAE\u6032\u0180Eas\u2F78\u2F90\u2F7A\xF0\u2F75\u0180dfp\u0EEC\u2F99\u2FAF\u0180als\u2FA0\u2FA5\u2FAAlar;\u632Eine;\u6312urf;\u6313\u0100;t\u0EFB\u2FB4\xEF\u0EFBrel;\u62B0\u0100ci\u2FC0\u2FC5r;\uC000\u{1D4C5};\u43C8ncsp;\u6008\u0300fiopsu\u2FDA\u22E2\u2FDF\u2FE5\u2FEB\u2FF1r;\uC000\u{1D52E}pf;\uC000\u{1D562}rime;\u6057cr;\uC000\u{1D4C6}\u0180aeo\u2FF8\u3009\u3013t\u0100ei\u2FFE\u3005rnion\xF3\u06B0nt;\u6A16st\u0100;e\u3010\u3011\u403F\xF1\u1F19\xF4\u0F14\u0A80ABHabcdefhilmnoprstux\u3040\u3051\u3055\u3059\u30E0\u310E\u312B\u3147\u3162\u3172\u318E\u3206\u3215\u3224\u3229\u3258\u326E\u3272\u3290\u32B0\u32B7\u0180art\u3047\u304A\u304Cr\xF2\u10B3\xF2\u03DDail;\u691Car\xF2\u1C65ar;\u6964\u0380cdenqrt\u3068\u3075\u3078\u307F\u308F\u3094\u30CC\u0100eu\u306D\u3071;\uC000\u223D\u0331te;\u4155i\xE3\u116Emptyv;\u69B3g\u0200;del\u0FD1\u3089\u308B\u308D;\u6992;\u69A5\xE5\u0FD1uo\u803B\xBB\u40BBr\u0580;abcfhlpstw\u0FDC\u30AC\u30AF\u30B7\u30B9\u30BC\u30BE\u30C0\u30C3\u30C7\u30CAp;\u6975\u0100;f\u0FE0\u30B4s;\u6920;\u6933s;\u691E\xEB\u225D\xF0\u272El;\u6945im;\u6974l;\u61A3;\u619D\u0100ai\u30D1\u30D5il;\u691Ao\u0100;n\u30DB\u30DC\u6236al\xF3\u0F1E\u0180abr\u30E7\u30EA\u30EEr\xF2\u17E5rk;\u6773\u0100ak\u30F3\u30FDc\u0100ek\u30F9\u30FB;\u407D;\u405D\u0100es\u3102\u3104;\u698Cl\u0100du\u310A\u310C;\u698E;\u6990\u0200aeuy\u3117\u311C\u3127\u3129ron;\u4159\u0100di\u3121\u3125il;\u4157\xEC\u0FF2\xE2\u30FA;\u4440\u0200clqs\u3134\u3137\u313D\u3144a;\u6937dhar;\u6969uo\u0100;r\u020E\u020Dh;\u61B3\u0180acg\u314E\u315F\u0F44l\u0200;ips\u0F78\u3158\u315B\u109Cn\xE5\u10BBar\xF4\u0FA9t;\u65AD\u0180ilr\u3169\u1023\u316Esht;\u697D;\uC000\u{1D52F}\u0100ao\u3177\u3186r\u0100du\u317D\u317F\xBB\u047B\u0100;l\u1091\u3184;\u696C\u0100;v\u318B\u318C\u43C1;\u43F1\u0180gns\u3195\u31F9\u31FCht\u0300ahlrst\u31A4\u31B0\u31C2\u31D8\u31E4\u31EErrow\u0100;t\u0FDC\u31ADa\xE9\u30C8arpoon\u0100du\u31BB\u31BFow\xEE\u317Ep\xBB\u1092eft\u0100ah\u31CA\u31D0rrow\xF3\u0FEAarpoon\xF3\u0551ightarrows;\u61C9quigarro\xF7\u30CBhreetimes;\u62CCg;\u42DAingdotse\xF1\u1F32\u0180ahm\u320D\u3210\u3213r\xF2\u0FEAa\xF2\u0551;\u600Foust\u0100;a\u321E\u321F\u63B1che\xBB\u321Fmid;\u6AEE\u0200abpt\u3232\u323D\u3240\u3252\u0100nr\u3237\u323Ag;\u67EDr;\u61FEr\xEB\u1003\u0180afl\u3247\u324A\u324Er;\u6986;\uC000\u{1D563}us;\u6A2Eimes;\u6A35\u0100ap\u325D\u3267r\u0100;g\u3263\u3264\u4029t;\u6994olint;\u6A12ar\xF2\u31E3\u0200achq\u327B\u3280\u10BC\u3285quo;\u603Ar;\uC000\u{1D4C7}\u0100bu\u30FB\u328Ao\u0100;r\u0214\u0213\u0180hir\u3297\u329B\u32A0re\xE5\u31F8mes;\u62CAi\u0200;efl\u32AA\u1059\u1821\u32AB\u65B9tri;\u69CEluhar;\u6968;\u611E\u0D61\u32D5\u32DB\u32DF\u332C\u3338\u3371\0\u337A\u33A4\0\0\u33EC\u33F0\0\u3428\u3448\u345A\u34AD\u34B1\u34CA\u34F1\0\u3616\0\0\u3633cute;\u415Bqu\xEF\u27BA\u0500;Eaceinpsy\u11ED\u32F3\u32F5\u32FF\u3302\u330B\u330F\u331F\u3326\u3329;\u6AB4\u01F0\u32FA\0\u32FC;\u6AB8on;\u4161u\xE5\u11FE\u0100;d\u11F3\u3307il;\u415Frc;\u415D\u0180Eas\u3316\u3318\u331B;\u6AB6p;\u6ABAim;\u62E9olint;\u6A13i\xED\u1204;\u4441ot\u0180;be\u3334\u1D47\u3335\u62C5;\u6A66\u0380Aacmstx\u3346\u334A\u3357\u335B\u335E\u3363\u336Drr;\u61D8r\u0100hr\u3350\u3352\xEB\u2228\u0100;o\u0A36\u0A34t\u803B\xA7\u40A7i;\u403Bwar;\u6929m\u0100in\u3369\xF0nu\xF3\xF1t;\u6736r\u0100;o\u3376\u2055\uC000\u{1D530}\u0200acoy\u3382\u3386\u3391\u33A0rp;\u666F\u0100hy\u338B\u338Fcy;\u4449;\u4448rt\u026D\u3399\0\0\u339Ci\xE4\u1464ara\xEC\u2E6F\u803B\xAD\u40AD\u0100gm\u33A8\u33B4ma\u0180;fv\u33B1\u33B2\u33B2\u43C3;\u43C2\u0400;deglnpr\u12AB\u33C5\u33C9\u33CE\u33D6\u33DE\u33E1\u33E6ot;\u6A6A\u0100;q\u12B1\u12B0\u0100;E\u33D3\u33D4\u6A9E;\u6AA0\u0100;E\u33DB\u33DC\u6A9D;\u6A9Fe;\u6246lus;\u6A24arr;\u6972ar\xF2\u113D\u0200aeit\u33F8\u3408\u340F\u3417\u0100ls\u33FD\u3404lsetm\xE9\u336Ahp;\u6A33parsl;\u69E4\u0100dl\u1463\u3414e;\u6323\u0100;e\u341C\u341D\u6AAA\u0100;s\u3422\u3423\u6AAC;\uC000\u2AAC\uFE00\u0180flp\u342E\u3433\u3442tcy;\u444C\u0100;b\u3438\u3439\u402F\u0100;a\u343E\u343F\u69C4r;\u633Ff;\uC000\u{1D564}a\u0100dr\u344D\u0402es\u0100;u\u3454\u3455\u6660it\xBB\u3455\u0180csu\u3460\u3479\u349F\u0100au\u3465\u346Fp\u0100;s\u1188\u346B;\uC000\u2293\uFE00p\u0100;s\u11B4\u3475;\uC000\u2294\uFE00u\u0100bp\u347F\u348F\u0180;es\u1197\u119C\u3486et\u0100;e\u1197\u348D\xF1\u119D\u0180;es\u11A8\u11AD\u3496et\u0100;e\u11A8\u349D\xF1\u11AE\u0180;af\u117B\u34A6\u05B0r\u0165\u34AB\u05B1\xBB\u117Car\xF2\u1148\u0200cemt\u34B9\u34BE\u34C2\u34C5r;\uC000\u{1D4C8}tm\xEE\xF1i\xEC\u3415ar\xE6\u11BE\u0100ar\u34CE\u34D5r\u0100;f\u34D4\u17BF\u6606\u0100an\u34DA\u34EDight\u0100ep\u34E3\u34EApsilo\xEE\u1EE0h\xE9\u2EAFs\xBB\u2852\u0280bcmnp\u34FB\u355E\u1209\u358B\u358E\u0480;Edemnprs\u350E\u350F\u3511\u3515\u351E\u3523\u352C\u3531\u3536\u6282;\u6AC5ot;\u6ABD\u0100;d\u11DA\u351Aot;\u6AC3ult;\u6AC1\u0100Ee\u3528\u352A;\u6ACB;\u628Alus;\u6ABFarr;\u6979\u0180eiu\u353D\u3552\u3555t\u0180;en\u350E\u3545\u354Bq\u0100;q\u11DA\u350Feq\u0100;q\u352B\u3528m;\u6AC7\u0100bp\u355A\u355C;\u6AD5;\u6AD3c\u0300;acens\u11ED\u356C\u3572\u3579\u357B\u3326ppro\xF8\u32FAurlye\xF1\u11FE\xF1\u11F3\u0180aes\u3582\u3588\u331Bppro\xF8\u331Aq\xF1\u3317g;\u666A\u0680123;Edehlmnps\u35A9\u35AC\u35AF\u121C\u35B2\u35B4\u35C0\u35C9\u35D5\u35DA\u35DF\u35E8\u35ED\u803B\xB9\u40B9\u803B\xB2\u40B2\u803B\xB3\u40B3;\u6AC6\u0100os\u35B9\u35BCt;\u6ABEub;\u6AD8\u0100;d\u1222\u35C5ot;\u6AC4s\u0100ou\u35CF\u35D2l;\u67C9b;\u6AD7arr;\u697Bult;\u6AC2\u0100Ee\u35E4\u35E6;\u6ACC;\u628Blus;\u6AC0\u0180eiu\u35F4\u3609\u360Ct\u0180;en\u121C\u35FC\u3602q\u0100;q\u1222\u35B2eq\u0100;q\u35E7\u35E4m;\u6AC8\u0100bp\u3611\u3613;\u6AD4;\u6AD6\u0180Aan\u361C\u3620\u362Drr;\u61D9r\u0100hr\u3626\u3628\xEB\u222E\u0100;o\u0A2B\u0A29war;\u692Alig\u803B\xDF\u40DF\u0BE1\u3651\u365D\u3660\u12CE\u3673\u3679\0\u367E\u36C2\0\0\0\0\0\u36DB\u3703\0\u3709\u376C\0\0\0\u3787\u0272\u3656\0\0\u365Bget;\u6316;\u43C4r\xEB\u0E5F\u0180aey\u3666\u366B\u3670ron;\u4165dil;\u4163;\u4442lrec;\u6315r;\uC000\u{1D531}\u0200eiko\u3686\u369D\u36B5\u36BC\u01F2\u368B\0\u3691e\u01004f\u1284\u1281a\u0180;sv\u3698\u3699\u369B\u43B8ym;\u43D1\u0100cn\u36A2\u36B2k\u0100as\u36A8\u36AEppro\xF8\u12C1im\xBB\u12ACs\xF0\u129E\u0100as\u36BA\u36AE\xF0\u12C1rn\u803B\xFE\u40FE\u01EC\u031F\u36C6\u22E7es\u8180\xD7;bd\u36CF\u36D0\u36D8\u40D7\u0100;a\u190F\u36D5r;\u6A31;\u6A30\u0180eps\u36E1\u36E3\u3700\xE1\u2A4D\u0200;bcf\u0486\u36EC\u36F0\u36F4ot;\u6336ir;\u6AF1\u0100;o\u36F9\u36FC\uC000\u{1D565}rk;\u6ADA\xE1\u3362rime;\u6034\u0180aip\u370F\u3712\u3764d\xE5\u1248\u0380adempst\u3721\u374D\u3740\u3751\u3757\u375C\u375Fngle\u0280;dlqr\u3730\u3731\u3736\u3740\u3742\u65B5own\xBB\u1DBBeft\u0100;e\u2800\u373E\xF1\u092E;\u625Cight\u0100;e\u32AA\u374B\xF1\u105Aot;\u65ECinus;\u6A3Alus;\u6A39b;\u69CDime;\u6A3Bezium;\u63E2\u0180cht\u3772\u377D\u3781\u0100ry\u3777\u377B;\uC000\u{1D4C9};\u4446cy;\u445Brok;\u4167\u0100io\u378B\u378Ex\xF4\u1777head\u0100lr\u3797\u37A0eftarro\xF7\u084Fightarrow\xBB\u0F5D\u0900AHabcdfghlmoprstuw\u37D0\u37D3\u37D7\u37E4\u37F0\u37FC\u380E\u381C\u3823\u3834\u3851\u385D\u386B\u38A9\u38CC\u38D2\u38EA\u38F6r\xF2\u03EDar;\u6963\u0100cr\u37DC\u37E2ute\u803B\xFA\u40FA\xF2\u1150r\u01E3\u37EA\0\u37EDy;\u445Eve;\u416D\u0100iy\u37F5\u37FArc\u803B\xFB\u40FB;\u4443\u0180abh\u3803\u3806\u380Br\xF2\u13ADlac;\u4171a\xF2\u13C3\u0100ir\u3813\u3818sht;\u697E;\uC000\u{1D532}rave\u803B\xF9\u40F9\u0161\u3827\u3831r\u0100lr\u382C\u382E\xBB\u0957\xBB\u1083lk;\u6580\u0100ct\u3839\u384D\u026F\u383F\0\0\u384Arn\u0100;e\u3845\u3846\u631Cr\xBB\u3846op;\u630Fri;\u65F8\u0100al\u3856\u385Acr;\u416B\u80BB\xA8\u0349\u0100gp\u3862\u3866on;\u4173f;\uC000\u{1D566}\u0300adhlsu\u114B\u3878\u387D\u1372\u3891\u38A0own\xE1\u13B3arpoon\u0100lr\u3888\u388Cef\xF4\u382Digh\xF4\u382Fi\u0180;hl\u3899\u389A\u389C\u43C5\xBB\u13FAon\xBB\u389Aparrows;\u61C8\u0180cit\u38B0\u38C4\u38C8\u026F\u38B6\0\0\u38C1rn\u0100;e\u38BC\u38BD\u631Dr\xBB\u38BDop;\u630Eng;\u416Fri;\u65F9cr;\uC000\u{1D4CA}\u0180dir\u38D9\u38DD\u38E2ot;\u62F0lde;\u4169i\u0100;f\u3730\u38E8\xBB\u1813\u0100am\u38EF\u38F2r\xF2\u38A8l\u803B\xFC\u40FCangle;\u69A7\u0780ABDacdeflnoprsz\u391C\u391F\u3929\u392D\u39B5\u39B8\u39BD\u39DF\u39E4\u39E8\u39F3\u39F9\u39FD\u3A01\u3A20r\xF2\u03F7ar\u0100;v\u3926\u3927\u6AE8;\u6AE9as\xE8\u03E1\u0100nr\u3932\u3937grt;\u699C\u0380eknprst\u34E3\u3946\u394B\u3952\u395D\u3964\u3996app\xE1\u2415othin\xE7\u1E96\u0180hir\u34EB\u2EC8\u3959op\xF4\u2FB5\u0100;h\u13B7\u3962\xEF\u318D\u0100iu\u3969\u396Dgm\xE1\u33B3\u0100bp\u3972\u3984setneq\u0100;q\u397D\u3980\uC000\u228A\uFE00;\uC000\u2ACB\uFE00setneq\u0100;q\u398F\u3992\uC000\u228B\uFE00;\uC000\u2ACC\uFE00\u0100hr\u399B\u399Fet\xE1\u369Ciangle\u0100lr\u39AA\u39AFeft\xBB\u0925ight\xBB\u1051y;\u4432ash\xBB\u1036\u0180elr\u39C4\u39D2\u39D7\u0180;be\u2DEA\u39CB\u39CFar;\u62BBq;\u625Alip;\u62EE\u0100bt\u39DC\u1468a\xF2\u1469r;\uC000\u{1D533}tr\xE9\u39AEsu\u0100bp\u39EF\u39F1\xBB\u0D1C\xBB\u0D59pf;\uC000\u{1D567}ro\xF0\u0EFBtr\xE9\u39B4\u0100cu\u3A06\u3A0Br;\uC000\u{1D4CB}\u0100bp\u3A10\u3A18n\u0100Ee\u3980\u3A16\xBB\u397En\u0100Ee\u3992\u3A1E\xBB\u3990igzag;\u699A\u0380cefoprs\u3A36\u3A3B\u3A56\u3A5B\u3A54\u3A61\u3A6Airc;\u4175\u0100di\u3A40\u3A51\u0100bg\u3A45\u3A49ar;\u6A5Fe\u0100;q\u15FA\u3A4F;\u6259erp;\u6118r;\uC000\u{1D534}pf;\uC000\u{1D568}\u0100;e\u1479\u3A66at\xE8\u1479cr;\uC000\u{1D4CC}\u0AE3\u178E\u3A87\0\u3A8B\0\u3A90\u3A9B\0\0\u3A9D\u3AA8\u3AAB\u3AAF\0\0\u3AC3\u3ACE\0\u3AD8\u17DC\u17DFtr\xE9\u17D1r;\uC000\u{1D535}\u0100Aa\u3A94\u3A97r\xF2\u03C3r\xF2\u09F6;\u43BE\u0100Aa\u3AA1\u3AA4r\xF2\u03B8r\xF2\u09EBa\xF0\u2713is;\u62FB\u0180dpt\u17A4\u3AB5\u3ABE\u0100fl\u3ABA\u17A9;\uC000\u{1D569}im\xE5\u17B2\u0100Aa\u3AC7\u3ACAr\xF2\u03CEr\xF2\u0A01\u0100cq\u3AD2\u17B8r;\uC000\u{1D4CD}\u0100pt\u17D6\u3ADCr\xE9\u17D4\u0400acefiosu\u3AF0\u3AFD\u3B08\u3B0C\u3B11\u3B15\u3B1B\u3B21c\u0100uy\u3AF6\u3AFBte\u803B\xFD\u40FD;\u444F\u0100iy\u3B02\u3B06rc;\u4177;\u444Bn\u803B\xA5\u40A5r;\uC000\u{1D536}cy;\u4457pf;\uC000\u{1D56A}cr;\uC000\u{1D4CE}\u0100cm\u3B26\u3B29y;\u444El\u803B\xFF\u40FF\u0500acdefhiosw\u3B42\u3B48\u3B54\u3B58\u3B64\u3B69\u3B6D\u3B74\u3B7A\u3B80cute;\u417A\u0100ay\u3B4D\u3B52ron;\u417E;\u4437ot;\u417C\u0100et\u3B5D\u3B61tr\xE6\u155Fa;\u43B6r;\uC000\u{1D537}cy;\u4436grarr;\u61DDpf;\uC000\u{1D56B}cr;\uC000\u{1D4CF}\u0100jn\u3B85\u3B87;\u600Dj;\u600C'.split("").map((c) => c.charCodeAt(0))
  );

  // node_modules/.pnpm/entities@4.5.0/node_modules/entities/lib/esm/generated/decode-data-xml.js
  var decode_data_xml_default = new Uint16Array(
    // prettier-ignore
    "\u0200aglq	\x1B\u026D\0\0p;\u4026os;\u4027t;\u403Et;\u403Cuot;\u4022".split("").map((c) => c.charCodeAt(0))
  );

  // node_modules/.pnpm/entities@4.5.0/node_modules/entities/lib/esm/decode_codepoint.js
  var _a;
  var decodeMap = /* @__PURE__ */ new Map([
    [0, 65533],
    // C1 Unicode control character reference replacements
    [128, 8364],
    [130, 8218],
    [131, 402],
    [132, 8222],
    [133, 8230],
    [134, 8224],
    [135, 8225],
    [136, 710],
    [137, 8240],
    [138, 352],
    [139, 8249],
    [140, 338],
    [142, 381],
    [145, 8216],
    [146, 8217],
    [147, 8220],
    [148, 8221],
    [149, 8226],
    [150, 8211],
    [151, 8212],
    [152, 732],
    [153, 8482],
    [154, 353],
    [155, 8250],
    [156, 339],
    [158, 382],
    [159, 376]
  ]);
  var fromCodePoint = (
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
    (_a = String.fromCodePoint) !== null && _a !== void 0 ? _a : function(codePoint) {
      let output = "";
      if (codePoint > 65535) {
        codePoint -= 65536;
        output += String.fromCharCode(codePoint >>> 10 & 1023 | 55296);
        codePoint = 56320 | codePoint & 1023;
      }
      output += String.fromCharCode(codePoint);
      return output;
    }
  );
  function replaceCodePoint(codePoint) {
    var _a2;
    if (codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111) {
      return 65533;
    }
    return (_a2 = decodeMap.get(codePoint)) !== null && _a2 !== void 0 ? _a2 : codePoint;
  }

  // node_modules/.pnpm/entities@4.5.0/node_modules/entities/lib/esm/decode.js
  var CharCodes;
  (function(CharCodes2) {
    CharCodes2[CharCodes2["NUM"] = 35] = "NUM";
    CharCodes2[CharCodes2["SEMI"] = 59] = "SEMI";
    CharCodes2[CharCodes2["EQUALS"] = 61] = "EQUALS";
    CharCodes2[CharCodes2["ZERO"] = 48] = "ZERO";
    CharCodes2[CharCodes2["NINE"] = 57] = "NINE";
    CharCodes2[CharCodes2["LOWER_A"] = 97] = "LOWER_A";
    CharCodes2[CharCodes2["LOWER_F"] = 102] = "LOWER_F";
    CharCodes2[CharCodes2["LOWER_X"] = 120] = "LOWER_X";
    CharCodes2[CharCodes2["LOWER_Z"] = 122] = "LOWER_Z";
    CharCodes2[CharCodes2["UPPER_A"] = 65] = "UPPER_A";
    CharCodes2[CharCodes2["UPPER_F"] = 70] = "UPPER_F";
    CharCodes2[CharCodes2["UPPER_Z"] = 90] = "UPPER_Z";
  })(CharCodes || (CharCodes = {}));
  var TO_LOWER_BIT = 32;
  var BinTrieFlags;
  (function(BinTrieFlags2) {
    BinTrieFlags2[BinTrieFlags2["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
    BinTrieFlags2[BinTrieFlags2["BRANCH_LENGTH"] = 16256] = "BRANCH_LENGTH";
    BinTrieFlags2[BinTrieFlags2["JUMP_TABLE"] = 127] = "JUMP_TABLE";
  })(BinTrieFlags || (BinTrieFlags = {}));
  function isNumber(code3) {
    return code3 >= CharCodes.ZERO && code3 <= CharCodes.NINE;
  }
  function isHexadecimalCharacter(code3) {
    return code3 >= CharCodes.UPPER_A && code3 <= CharCodes.UPPER_F || code3 >= CharCodes.LOWER_A && code3 <= CharCodes.LOWER_F;
  }
  function isAsciiAlphaNumeric(code3) {
    return code3 >= CharCodes.UPPER_A && code3 <= CharCodes.UPPER_Z || code3 >= CharCodes.LOWER_A && code3 <= CharCodes.LOWER_Z || isNumber(code3);
  }
  function isEntityInAttributeInvalidEnd(code3) {
    return code3 === CharCodes.EQUALS || isAsciiAlphaNumeric(code3);
  }
  var EntityDecoderState;
  (function(EntityDecoderState2) {
    EntityDecoderState2[EntityDecoderState2["EntityStart"] = 0] = "EntityStart";
    EntityDecoderState2[EntityDecoderState2["NumericStart"] = 1] = "NumericStart";
    EntityDecoderState2[EntityDecoderState2["NumericDecimal"] = 2] = "NumericDecimal";
    EntityDecoderState2[EntityDecoderState2["NumericHex"] = 3] = "NumericHex";
    EntityDecoderState2[EntityDecoderState2["NamedEntity"] = 4] = "NamedEntity";
  })(EntityDecoderState || (EntityDecoderState = {}));
  var DecodingMode;
  (function(DecodingMode2) {
    DecodingMode2[DecodingMode2["Legacy"] = 0] = "Legacy";
    DecodingMode2[DecodingMode2["Strict"] = 1] = "Strict";
    DecodingMode2[DecodingMode2["Attribute"] = 2] = "Attribute";
  })(DecodingMode || (DecodingMode = {}));
  var EntityDecoder = class {
    constructor(decodeTree, emitCodePoint, errors2) {
      this.decodeTree = decodeTree;
      this.emitCodePoint = emitCodePoint;
      this.errors = errors2;
      this.state = EntityDecoderState.EntityStart;
      this.consumed = 1;
      this.result = 0;
      this.treeIndex = 0;
      this.excess = 1;
      this.decodeMode = DecodingMode.Strict;
    }
    /** Resets the instance to make it reusable. */
    startEntity(decodeMode) {
      this.decodeMode = decodeMode;
      this.state = EntityDecoderState.EntityStart;
      this.result = 0;
      this.treeIndex = 0;
      this.excess = 1;
      this.consumed = 1;
    }
    /**
     * Write an entity to the decoder. This can be called multiple times with partial entities.
     * If the entity is incomplete, the decoder will return -1.
     *
     * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
     * entity is incomplete, and resume when the next string is written.
     *
     * @param string The string containing the entity (or a continuation of the entity).
     * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    write(str, offset) {
      switch (this.state) {
        case EntityDecoderState.EntityStart: {
          if (str.charCodeAt(offset) === CharCodes.NUM) {
            this.state = EntityDecoderState.NumericStart;
            this.consumed += 1;
            return this.stateNumericStart(str, offset + 1);
          }
          this.state = EntityDecoderState.NamedEntity;
          return this.stateNamedEntity(str, offset);
        }
        case EntityDecoderState.NumericStart: {
          return this.stateNumericStart(str, offset);
        }
        case EntityDecoderState.NumericDecimal: {
          return this.stateNumericDecimal(str, offset);
        }
        case EntityDecoderState.NumericHex: {
          return this.stateNumericHex(str, offset);
        }
        case EntityDecoderState.NamedEntity: {
          return this.stateNamedEntity(str, offset);
        }
      }
    }
    /**
     * Switches between the numeric decimal and hexadecimal states.
     *
     * Equivalent to the `Numeric character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    stateNumericStart(str, offset) {
      if (offset >= str.length) {
        return -1;
      }
      if ((str.charCodeAt(offset) | TO_LOWER_BIT) === CharCodes.LOWER_X) {
        this.state = EntityDecoderState.NumericHex;
        this.consumed += 1;
        return this.stateNumericHex(str, offset + 1);
      }
      this.state = EntityDecoderState.NumericDecimal;
      return this.stateNumericDecimal(str, offset);
    }
    addToNumericResult(str, start, end, base2) {
      if (start !== end) {
        const digitCount = end - start;
        this.result = this.result * Math.pow(base2, digitCount) + parseInt(str.substr(start, digitCount), base2);
        this.consumed += digitCount;
      }
    }
    /**
     * Parses a hexadecimal numeric entity.
     *
     * Equivalent to the `Hexademical character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    stateNumericHex(str, offset) {
      const startIdx = offset;
      while (offset < str.length) {
        const char = str.charCodeAt(offset);
        if (isNumber(char) || isHexadecimalCharacter(char)) {
          offset += 1;
        } else {
          this.addToNumericResult(str, startIdx, offset, 16);
          return this.emitNumericEntity(char, 3);
        }
      }
      this.addToNumericResult(str, startIdx, offset, 16);
      return -1;
    }
    /**
     * Parses a decimal numeric entity.
     *
     * Equivalent to the `Decimal character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    stateNumericDecimal(str, offset) {
      const startIdx = offset;
      while (offset < str.length) {
        const char = str.charCodeAt(offset);
        if (isNumber(char)) {
          offset += 1;
        } else {
          this.addToNumericResult(str, startIdx, offset, 10);
          return this.emitNumericEntity(char, 2);
        }
      }
      this.addToNumericResult(str, startIdx, offset, 10);
      return -1;
    }
    /**
     * Validate and emit a numeric entity.
     *
     * Implements the logic from the `Hexademical character reference start
     * state` and `Numeric character reference end state` in the HTML spec.
     *
     * @param lastCp The last code point of the entity. Used to see if the
     *               entity was terminated with a semicolon.
     * @param expectedLength The minimum number of characters that should be
     *                       consumed. Used to validate that at least one digit
     *                       was consumed.
     * @returns The number of characters that were consumed.
     */
    emitNumericEntity(lastCp, expectedLength) {
      var _a2;
      if (this.consumed <= expectedLength) {
        (_a2 = this.errors) === null || _a2 === void 0 ? void 0 : _a2.absenceOfDigitsInNumericCharacterReference(this.consumed);
        return 0;
      }
      if (lastCp === CharCodes.SEMI) {
        this.consumed += 1;
      } else if (this.decodeMode === DecodingMode.Strict) {
        return 0;
      }
      this.emitCodePoint(replaceCodePoint(this.result), this.consumed);
      if (this.errors) {
        if (lastCp !== CharCodes.SEMI) {
          this.errors.missingSemicolonAfterCharacterReference();
        }
        this.errors.validateNumericCharacterReference(this.result);
      }
      return this.consumed;
    }
    /**
     * Parses a named entity.
     *
     * Equivalent to the `Named character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    stateNamedEntity(str, offset) {
      const { decodeTree } = this;
      let current = decodeTree[this.treeIndex];
      let valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
      for (; offset < str.length; offset++, this.excess++) {
        const char = str.charCodeAt(offset);
        this.treeIndex = determineBranch(decodeTree, current, this.treeIndex + Math.max(1, valueLength), char);
        if (this.treeIndex < 0) {
          return this.result === 0 || // If we are parsing an attribute
          this.decodeMode === DecodingMode.Attribute && // We shouldn't have consumed any characters after the entity,
          (valueLength === 0 || // And there should be no invalid characters.
          isEntityInAttributeInvalidEnd(char)) ? 0 : this.emitNotTerminatedNamedEntity();
        }
        current = decodeTree[this.treeIndex];
        valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
        if (valueLength !== 0) {
          if (char === CharCodes.SEMI) {
            return this.emitNamedEntityData(this.treeIndex, valueLength, this.consumed + this.excess);
          }
          if (this.decodeMode !== DecodingMode.Strict) {
            this.result = this.treeIndex;
            this.consumed += this.excess;
            this.excess = 0;
          }
        }
      }
      return -1;
    }
    /**
     * Emit a named entity that was not terminated with a semicolon.
     *
     * @returns The number of characters consumed.
     */
    emitNotTerminatedNamedEntity() {
      var _a2;
      const { result, decodeTree } = this;
      const valueLength = (decodeTree[result] & BinTrieFlags.VALUE_LENGTH) >> 14;
      this.emitNamedEntityData(result, valueLength, this.consumed);
      (_a2 = this.errors) === null || _a2 === void 0 ? void 0 : _a2.missingSemicolonAfterCharacterReference();
      return this.consumed;
    }
    /**
     * Emit a named entity.
     *
     * @param result The index of the entity in the decode tree.
     * @param valueLength The number of bytes in the entity.
     * @param consumed The number of characters consumed.
     *
     * @returns The number of characters consumed.
     */
    emitNamedEntityData(result, valueLength, consumed) {
      const { decodeTree } = this;
      this.emitCodePoint(valueLength === 1 ? decodeTree[result] & ~BinTrieFlags.VALUE_LENGTH : decodeTree[result + 1], consumed);
      if (valueLength === 3) {
        this.emitCodePoint(decodeTree[result + 2], consumed);
      }
      return consumed;
    }
    /**
     * Signal to the parser that the end of the input was reached.
     *
     * Remaining data will be emitted and relevant errors will be produced.
     *
     * @returns The number of characters consumed.
     */
    end() {
      var _a2;
      switch (this.state) {
        case EntityDecoderState.NamedEntity: {
          return this.result !== 0 && (this.decodeMode !== DecodingMode.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
        }
        // Otherwise, emit a numeric entity if we have one.
        case EntityDecoderState.NumericDecimal: {
          return this.emitNumericEntity(0, 2);
        }
        case EntityDecoderState.NumericHex: {
          return this.emitNumericEntity(0, 3);
        }
        case EntityDecoderState.NumericStart: {
          (_a2 = this.errors) === null || _a2 === void 0 ? void 0 : _a2.absenceOfDigitsInNumericCharacterReference(this.consumed);
          return 0;
        }
        case EntityDecoderState.EntityStart: {
          return 0;
        }
      }
    }
  };
  function getDecoder(decodeTree) {
    let ret = "";
    const decoder = new EntityDecoder(decodeTree, (str) => ret += fromCodePoint(str));
    return function decodeWithTrie(str, decodeMode) {
      let lastIndex = 0;
      let offset = 0;
      while ((offset = str.indexOf("&", offset)) >= 0) {
        ret += str.slice(lastIndex, offset);
        decoder.startEntity(decodeMode);
        const len = decoder.write(
          str,
          // Skip the "&"
          offset + 1
        );
        if (len < 0) {
          lastIndex = offset + decoder.end();
          break;
        }
        lastIndex = offset + len;
        offset = len === 0 ? lastIndex + 1 : lastIndex;
      }
      const result = ret + str.slice(lastIndex);
      ret = "";
      return result;
    };
  }
  function determineBranch(decodeTree, current, nodeIdx, char) {
    const branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
    const jumpOffset = current & BinTrieFlags.JUMP_TABLE;
    if (branchCount === 0) {
      return jumpOffset !== 0 && char === jumpOffset ? nodeIdx : -1;
    }
    if (jumpOffset) {
      const value = char - jumpOffset;
      return value < 0 || value >= branchCount ? -1 : decodeTree[nodeIdx + value] - 1;
    }
    let lo = nodeIdx;
    let hi = lo + branchCount - 1;
    while (lo <= hi) {
      const mid = lo + hi >>> 1;
      const midVal = decodeTree[mid];
      if (midVal < char) {
        lo = mid + 1;
      } else if (midVal > char) {
        hi = mid - 1;
      } else {
        return decodeTree[mid + branchCount];
      }
    }
    return -1;
  }
  var htmlDecoder = getDecoder(decode_data_html_default);
  var xmlDecoder = getDecoder(decode_data_xml_default);
  function decodeHTML(str, mode = DecodingMode.Legacy) {
    return htmlDecoder(str, mode);
  }

  // node_modules/.pnpm/entities@4.5.0/node_modules/entities/lib/esm/generated/encode-html.js
  function restoreDiff(arr) {
    for (let i = 1; i < arr.length; i++) {
      arr[i][0] += arr[i - 1][0] + 1;
    }
    return arr;
  }
  var encode_html_default = new Map(/* @__PURE__ */ restoreDiff([[9, "&Tab;"], [0, "&NewLine;"], [22, "&excl;"], [0, "&quot;"], [0, "&num;"], [0, "&dollar;"], [0, "&percnt;"], [0, "&amp;"], [0, "&apos;"], [0, "&lpar;"], [0, "&rpar;"], [0, "&ast;"], [0, "&plus;"], [0, "&comma;"], [1, "&period;"], [0, "&sol;"], [10, "&colon;"], [0, "&semi;"], [0, { v: "&lt;", n: 8402, o: "&nvlt;" }], [0, { v: "&equals;", n: 8421, o: "&bne;" }], [0, { v: "&gt;", n: 8402, o: "&nvgt;" }], [0, "&quest;"], [0, "&commat;"], [26, "&lbrack;"], [0, "&bsol;"], [0, "&rbrack;"], [0, "&Hat;"], [0, "&lowbar;"], [0, "&DiacriticalGrave;"], [5, { n: 106, o: "&fjlig;" }], [20, "&lbrace;"], [0, "&verbar;"], [0, "&rbrace;"], [34, "&nbsp;"], [0, "&iexcl;"], [0, "&cent;"], [0, "&pound;"], [0, "&curren;"], [0, "&yen;"], [0, "&brvbar;"], [0, "&sect;"], [0, "&die;"], [0, "&copy;"], [0, "&ordf;"], [0, "&laquo;"], [0, "&not;"], [0, "&shy;"], [0, "&circledR;"], [0, "&macr;"], [0, "&deg;"], [0, "&PlusMinus;"], [0, "&sup2;"], [0, "&sup3;"], [0, "&acute;"], [0, "&micro;"], [0, "&para;"], [0, "&centerdot;"], [0, "&cedil;"], [0, "&sup1;"], [0, "&ordm;"], [0, "&raquo;"], [0, "&frac14;"], [0, "&frac12;"], [0, "&frac34;"], [0, "&iquest;"], [0, "&Agrave;"], [0, "&Aacute;"], [0, "&Acirc;"], [0, "&Atilde;"], [0, "&Auml;"], [0, "&angst;"], [0, "&AElig;"], [0, "&Ccedil;"], [0, "&Egrave;"], [0, "&Eacute;"], [0, "&Ecirc;"], [0, "&Euml;"], [0, "&Igrave;"], [0, "&Iacute;"], [0, "&Icirc;"], [0, "&Iuml;"], [0, "&ETH;"], [0, "&Ntilde;"], [0, "&Ograve;"], [0, "&Oacute;"], [0, "&Ocirc;"], [0, "&Otilde;"], [0, "&Ouml;"], [0, "&times;"], [0, "&Oslash;"], [0, "&Ugrave;"], [0, "&Uacute;"], [0, "&Ucirc;"], [0, "&Uuml;"], [0, "&Yacute;"], [0, "&THORN;"], [0, "&szlig;"], [0, "&agrave;"], [0, "&aacute;"], [0, "&acirc;"], [0, "&atilde;"], [0, "&auml;"], [0, "&aring;"], [0, "&aelig;"], [0, "&ccedil;"], [0, "&egrave;"], [0, "&eacute;"], [0, "&ecirc;"], [0, "&euml;"], [0, "&igrave;"], [0, "&iacute;"], [0, "&icirc;"], [0, "&iuml;"], [0, "&eth;"], [0, "&ntilde;"], [0, "&ograve;"], [0, "&oacute;"], [0, "&ocirc;"], [0, "&otilde;"], [0, "&ouml;"], [0, "&div;"], [0, "&oslash;"], [0, "&ugrave;"], [0, "&uacute;"], [0, "&ucirc;"], [0, "&uuml;"], [0, "&yacute;"], [0, "&thorn;"], [0, "&yuml;"], [0, "&Amacr;"], [0, "&amacr;"], [0, "&Abreve;"], [0, "&abreve;"], [0, "&Aogon;"], [0, "&aogon;"], [0, "&Cacute;"], [0, "&cacute;"], [0, "&Ccirc;"], [0, "&ccirc;"], [0, "&Cdot;"], [0, "&cdot;"], [0, "&Ccaron;"], [0, "&ccaron;"], [0, "&Dcaron;"], [0, "&dcaron;"], [0, "&Dstrok;"], [0, "&dstrok;"], [0, "&Emacr;"], [0, "&emacr;"], [2, "&Edot;"], [0, "&edot;"], [0, "&Eogon;"], [0, "&eogon;"], [0, "&Ecaron;"], [0, "&ecaron;"], [0, "&Gcirc;"], [0, "&gcirc;"], [0, "&Gbreve;"], [0, "&gbreve;"], [0, "&Gdot;"], [0, "&gdot;"], [0, "&Gcedil;"], [1, "&Hcirc;"], [0, "&hcirc;"], [0, "&Hstrok;"], [0, "&hstrok;"], [0, "&Itilde;"], [0, "&itilde;"], [0, "&Imacr;"], [0, "&imacr;"], [2, "&Iogon;"], [0, "&iogon;"], [0, "&Idot;"], [0, "&imath;"], [0, "&IJlig;"], [0, "&ijlig;"], [0, "&Jcirc;"], [0, "&jcirc;"], [0, "&Kcedil;"], [0, "&kcedil;"], [0, "&kgreen;"], [0, "&Lacute;"], [0, "&lacute;"], [0, "&Lcedil;"], [0, "&lcedil;"], [0, "&Lcaron;"], [0, "&lcaron;"], [0, "&Lmidot;"], [0, "&lmidot;"], [0, "&Lstrok;"], [0, "&lstrok;"], [0, "&Nacute;"], [0, "&nacute;"], [0, "&Ncedil;"], [0, "&ncedil;"], [0, "&Ncaron;"], [0, "&ncaron;"], [0, "&napos;"], [0, "&ENG;"], [0, "&eng;"], [0, "&Omacr;"], [0, "&omacr;"], [2, "&Odblac;"], [0, "&odblac;"], [0, "&OElig;"], [0, "&oelig;"], [0, "&Racute;"], [0, "&racute;"], [0, "&Rcedil;"], [0, "&rcedil;"], [0, "&Rcaron;"], [0, "&rcaron;"], [0, "&Sacute;"], [0, "&sacute;"], [0, "&Scirc;"], [0, "&scirc;"], [0, "&Scedil;"], [0, "&scedil;"], [0, "&Scaron;"], [0, "&scaron;"], [0, "&Tcedil;"], [0, "&tcedil;"], [0, "&Tcaron;"], [0, "&tcaron;"], [0, "&Tstrok;"], [0, "&tstrok;"], [0, "&Utilde;"], [0, "&utilde;"], [0, "&Umacr;"], [0, "&umacr;"], [0, "&Ubreve;"], [0, "&ubreve;"], [0, "&Uring;"], [0, "&uring;"], [0, "&Udblac;"], [0, "&udblac;"], [0, "&Uogon;"], [0, "&uogon;"], [0, "&Wcirc;"], [0, "&wcirc;"], [0, "&Ycirc;"], [0, "&ycirc;"], [0, "&Yuml;"], [0, "&Zacute;"], [0, "&zacute;"], [0, "&Zdot;"], [0, "&zdot;"], [0, "&Zcaron;"], [0, "&zcaron;"], [19, "&fnof;"], [34, "&imped;"], [63, "&gacute;"], [65, "&jmath;"], [142, "&circ;"], [0, "&caron;"], [16, "&breve;"], [0, "&DiacriticalDot;"], [0, "&ring;"], [0, "&ogon;"], [0, "&DiacriticalTilde;"], [0, "&dblac;"], [51, "&DownBreve;"], [127, "&Alpha;"], [0, "&Beta;"], [0, "&Gamma;"], [0, "&Delta;"], [0, "&Epsilon;"], [0, "&Zeta;"], [0, "&Eta;"], [0, "&Theta;"], [0, "&Iota;"], [0, "&Kappa;"], [0, "&Lambda;"], [0, "&Mu;"], [0, "&Nu;"], [0, "&Xi;"], [0, "&Omicron;"], [0, "&Pi;"], [0, "&Rho;"], [1, "&Sigma;"], [0, "&Tau;"], [0, "&Upsilon;"], [0, "&Phi;"], [0, "&Chi;"], [0, "&Psi;"], [0, "&ohm;"], [7, "&alpha;"], [0, "&beta;"], [0, "&gamma;"], [0, "&delta;"], [0, "&epsi;"], [0, "&zeta;"], [0, "&eta;"], [0, "&theta;"], [0, "&iota;"], [0, "&kappa;"], [0, "&lambda;"], [0, "&mu;"], [0, "&nu;"], [0, "&xi;"], [0, "&omicron;"], [0, "&pi;"], [0, "&rho;"], [0, "&sigmaf;"], [0, "&sigma;"], [0, "&tau;"], [0, "&upsi;"], [0, "&phi;"], [0, "&chi;"], [0, "&psi;"], [0, "&omega;"], [7, "&thetasym;"], [0, "&Upsi;"], [2, "&phiv;"], [0, "&piv;"], [5, "&Gammad;"], [0, "&digamma;"], [18, "&kappav;"], [0, "&rhov;"], [3, "&epsiv;"], [0, "&backepsilon;"], [10, "&IOcy;"], [0, "&DJcy;"], [0, "&GJcy;"], [0, "&Jukcy;"], [0, "&DScy;"], [0, "&Iukcy;"], [0, "&YIcy;"], [0, "&Jsercy;"], [0, "&LJcy;"], [0, "&NJcy;"], [0, "&TSHcy;"], [0, "&KJcy;"], [1, "&Ubrcy;"], [0, "&DZcy;"], [0, "&Acy;"], [0, "&Bcy;"], [0, "&Vcy;"], [0, "&Gcy;"], [0, "&Dcy;"], [0, "&IEcy;"], [0, "&ZHcy;"], [0, "&Zcy;"], [0, "&Icy;"], [0, "&Jcy;"], [0, "&Kcy;"], [0, "&Lcy;"], [0, "&Mcy;"], [0, "&Ncy;"], [0, "&Ocy;"], [0, "&Pcy;"], [0, "&Rcy;"], [0, "&Scy;"], [0, "&Tcy;"], [0, "&Ucy;"], [0, "&Fcy;"], [0, "&KHcy;"], [0, "&TScy;"], [0, "&CHcy;"], [0, "&SHcy;"], [0, "&SHCHcy;"], [0, "&HARDcy;"], [0, "&Ycy;"], [0, "&SOFTcy;"], [0, "&Ecy;"], [0, "&YUcy;"], [0, "&YAcy;"], [0, "&acy;"], [0, "&bcy;"], [0, "&vcy;"], [0, "&gcy;"], [0, "&dcy;"], [0, "&iecy;"], [0, "&zhcy;"], [0, "&zcy;"], [0, "&icy;"], [0, "&jcy;"], [0, "&kcy;"], [0, "&lcy;"], [0, "&mcy;"], [0, "&ncy;"], [0, "&ocy;"], [0, "&pcy;"], [0, "&rcy;"], [0, "&scy;"], [0, "&tcy;"], [0, "&ucy;"], [0, "&fcy;"], [0, "&khcy;"], [0, "&tscy;"], [0, "&chcy;"], [0, "&shcy;"], [0, "&shchcy;"], [0, "&hardcy;"], [0, "&ycy;"], [0, "&softcy;"], [0, "&ecy;"], [0, "&yucy;"], [0, "&yacy;"], [1, "&iocy;"], [0, "&djcy;"], [0, "&gjcy;"], [0, "&jukcy;"], [0, "&dscy;"], [0, "&iukcy;"], [0, "&yicy;"], [0, "&jsercy;"], [0, "&ljcy;"], [0, "&njcy;"], [0, "&tshcy;"], [0, "&kjcy;"], [1, "&ubrcy;"], [0, "&dzcy;"], [7074, "&ensp;"], [0, "&emsp;"], [0, "&emsp13;"], [0, "&emsp14;"], [1, "&numsp;"], [0, "&puncsp;"], [0, "&ThinSpace;"], [0, "&hairsp;"], [0, "&NegativeMediumSpace;"], [0, "&zwnj;"], [0, "&zwj;"], [0, "&lrm;"], [0, "&rlm;"], [0, "&dash;"], [2, "&ndash;"], [0, "&mdash;"], [0, "&horbar;"], [0, "&Verbar;"], [1, "&lsquo;"], [0, "&CloseCurlyQuote;"], [0, "&lsquor;"], [1, "&ldquo;"], [0, "&CloseCurlyDoubleQuote;"], [0, "&bdquo;"], [1, "&dagger;"], [0, "&Dagger;"], [0, "&bull;"], [2, "&nldr;"], [0, "&hellip;"], [9, "&permil;"], [0, "&pertenk;"], [0, "&prime;"], [0, "&Prime;"], [0, "&tprime;"], [0, "&backprime;"], [3, "&lsaquo;"], [0, "&rsaquo;"], [3, "&oline;"], [2, "&caret;"], [1, "&hybull;"], [0, "&frasl;"], [10, "&bsemi;"], [7, "&qprime;"], [7, { v: "&MediumSpace;", n: 8202, o: "&ThickSpace;" }], [0, "&NoBreak;"], [0, "&af;"], [0, "&InvisibleTimes;"], [0, "&ic;"], [72, "&euro;"], [46, "&tdot;"], [0, "&DotDot;"], [37, "&complexes;"], [2, "&incare;"], [4, "&gscr;"], [0, "&hamilt;"], [0, "&Hfr;"], [0, "&Hopf;"], [0, "&planckh;"], [0, "&hbar;"], [0, "&imagline;"], [0, "&Ifr;"], [0, "&lagran;"], [0, "&ell;"], [1, "&naturals;"], [0, "&numero;"], [0, "&copysr;"], [0, "&weierp;"], [0, "&Popf;"], [0, "&Qopf;"], [0, "&realine;"], [0, "&real;"], [0, "&reals;"], [0, "&rx;"], [3, "&trade;"], [1, "&integers;"], [2, "&mho;"], [0, "&zeetrf;"], [0, "&iiota;"], [2, "&bernou;"], [0, "&Cayleys;"], [1, "&escr;"], [0, "&Escr;"], [0, "&Fouriertrf;"], [1, "&Mellintrf;"], [0, "&order;"], [0, "&alefsym;"], [0, "&beth;"], [0, "&gimel;"], [0, "&daleth;"], [12, "&CapitalDifferentialD;"], [0, "&dd;"], [0, "&ee;"], [0, "&ii;"], [10, "&frac13;"], [0, "&frac23;"], [0, "&frac15;"], [0, "&frac25;"], [0, "&frac35;"], [0, "&frac45;"], [0, "&frac16;"], [0, "&frac56;"], [0, "&frac18;"], [0, "&frac38;"], [0, "&frac58;"], [0, "&frac78;"], [49, "&larr;"], [0, "&ShortUpArrow;"], [0, "&rarr;"], [0, "&darr;"], [0, "&harr;"], [0, "&updownarrow;"], [0, "&nwarr;"], [0, "&nearr;"], [0, "&LowerRightArrow;"], [0, "&LowerLeftArrow;"], [0, "&nlarr;"], [0, "&nrarr;"], [1, { v: "&rarrw;", n: 824, o: "&nrarrw;" }], [0, "&Larr;"], [0, "&Uarr;"], [0, "&Rarr;"], [0, "&Darr;"], [0, "&larrtl;"], [0, "&rarrtl;"], [0, "&LeftTeeArrow;"], [0, "&mapstoup;"], [0, "&map;"], [0, "&DownTeeArrow;"], [1, "&hookleftarrow;"], [0, "&hookrightarrow;"], [0, "&larrlp;"], [0, "&looparrowright;"], [0, "&harrw;"], [0, "&nharr;"], [1, "&lsh;"], [0, "&rsh;"], [0, "&ldsh;"], [0, "&rdsh;"], [1, "&crarr;"], [0, "&cularr;"], [0, "&curarr;"], [2, "&circlearrowleft;"], [0, "&circlearrowright;"], [0, "&leftharpoonup;"], [0, "&DownLeftVector;"], [0, "&RightUpVector;"], [0, "&LeftUpVector;"], [0, "&rharu;"], [0, "&DownRightVector;"], [0, "&dharr;"], [0, "&dharl;"], [0, "&RightArrowLeftArrow;"], [0, "&udarr;"], [0, "&LeftArrowRightArrow;"], [0, "&leftleftarrows;"], [0, "&upuparrows;"], [0, "&rightrightarrows;"], [0, "&ddarr;"], [0, "&leftrightharpoons;"], [0, "&Equilibrium;"], [0, "&nlArr;"], [0, "&nhArr;"], [0, "&nrArr;"], [0, "&DoubleLeftArrow;"], [0, "&DoubleUpArrow;"], [0, "&DoubleRightArrow;"], [0, "&dArr;"], [0, "&DoubleLeftRightArrow;"], [0, "&DoubleUpDownArrow;"], [0, "&nwArr;"], [0, "&neArr;"], [0, "&seArr;"], [0, "&swArr;"], [0, "&lAarr;"], [0, "&rAarr;"], [1, "&zigrarr;"], [6, "&larrb;"], [0, "&rarrb;"], [15, "&DownArrowUpArrow;"], [7, "&loarr;"], [0, "&roarr;"], [0, "&hoarr;"], [0, "&forall;"], [0, "&comp;"], [0, { v: "&part;", n: 824, o: "&npart;" }], [0, "&exist;"], [0, "&nexist;"], [0, "&empty;"], [1, "&Del;"], [0, "&Element;"], [0, "&NotElement;"], [1, "&ni;"], [0, "&notni;"], [2, "&prod;"], [0, "&coprod;"], [0, "&sum;"], [0, "&minus;"], [0, "&MinusPlus;"], [0, "&dotplus;"], [1, "&Backslash;"], [0, "&lowast;"], [0, "&compfn;"], [1, "&radic;"], [2, "&prop;"], [0, "&infin;"], [0, "&angrt;"], [0, { v: "&ang;", n: 8402, o: "&nang;" }], [0, "&angmsd;"], [0, "&angsph;"], [0, "&mid;"], [0, "&nmid;"], [0, "&DoubleVerticalBar;"], [0, "&NotDoubleVerticalBar;"], [0, "&and;"], [0, "&or;"], [0, { v: "&cap;", n: 65024, o: "&caps;" }], [0, { v: "&cup;", n: 65024, o: "&cups;" }], [0, "&int;"], [0, "&Int;"], [0, "&iiint;"], [0, "&conint;"], [0, "&Conint;"], [0, "&Cconint;"], [0, "&cwint;"], [0, "&ClockwiseContourIntegral;"], [0, "&awconint;"], [0, "&there4;"], [0, "&becaus;"], [0, "&ratio;"], [0, "&Colon;"], [0, "&dotminus;"], [1, "&mDDot;"], [0, "&homtht;"], [0, { v: "&sim;", n: 8402, o: "&nvsim;" }], [0, { v: "&backsim;", n: 817, o: "&race;" }], [0, { v: "&ac;", n: 819, o: "&acE;" }], [0, "&acd;"], [0, "&VerticalTilde;"], [0, "&NotTilde;"], [0, { v: "&eqsim;", n: 824, o: "&nesim;" }], [0, "&sime;"], [0, "&NotTildeEqual;"], [0, "&cong;"], [0, "&simne;"], [0, "&ncong;"], [0, "&ap;"], [0, "&nap;"], [0, "&ape;"], [0, { v: "&apid;", n: 824, o: "&napid;" }], [0, "&backcong;"], [0, { v: "&asympeq;", n: 8402, o: "&nvap;" }], [0, { v: "&bump;", n: 824, o: "&nbump;" }], [0, { v: "&bumpe;", n: 824, o: "&nbumpe;" }], [0, { v: "&doteq;", n: 824, o: "&nedot;" }], [0, "&doteqdot;"], [0, "&efDot;"], [0, "&erDot;"], [0, "&Assign;"], [0, "&ecolon;"], [0, "&ecir;"], [0, "&circeq;"], [1, "&wedgeq;"], [0, "&veeeq;"], [1, "&triangleq;"], [2, "&equest;"], [0, "&ne;"], [0, { v: "&Congruent;", n: 8421, o: "&bnequiv;" }], [0, "&nequiv;"], [1, { v: "&le;", n: 8402, o: "&nvle;" }], [0, { v: "&ge;", n: 8402, o: "&nvge;" }], [0, { v: "&lE;", n: 824, o: "&nlE;" }], [0, { v: "&gE;", n: 824, o: "&ngE;" }], [0, { v: "&lnE;", n: 65024, o: "&lvertneqq;" }], [0, { v: "&gnE;", n: 65024, o: "&gvertneqq;" }], [0, { v: "&ll;", n: new Map(/* @__PURE__ */ restoreDiff([[824, "&nLtv;"], [7577, "&nLt;"]])) }], [0, { v: "&gg;", n: new Map(/* @__PURE__ */ restoreDiff([[824, "&nGtv;"], [7577, "&nGt;"]])) }], [0, "&between;"], [0, "&NotCupCap;"], [0, "&nless;"], [0, "&ngt;"], [0, "&nle;"], [0, "&nge;"], [0, "&lesssim;"], [0, "&GreaterTilde;"], [0, "&nlsim;"], [0, "&ngsim;"], [0, "&LessGreater;"], [0, "&gl;"], [0, "&NotLessGreater;"], [0, "&NotGreaterLess;"], [0, "&pr;"], [0, "&sc;"], [0, "&prcue;"], [0, "&sccue;"], [0, "&PrecedesTilde;"], [0, { v: "&scsim;", n: 824, o: "&NotSucceedsTilde;" }], [0, "&NotPrecedes;"], [0, "&NotSucceeds;"], [0, { v: "&sub;", n: 8402, o: "&NotSubset;" }], [0, { v: "&sup;", n: 8402, o: "&NotSuperset;" }], [0, "&nsub;"], [0, "&nsup;"], [0, "&sube;"], [0, "&supe;"], [0, "&NotSubsetEqual;"], [0, "&NotSupersetEqual;"], [0, { v: "&subne;", n: 65024, o: "&varsubsetneq;" }], [0, { v: "&supne;", n: 65024, o: "&varsupsetneq;" }], [1, "&cupdot;"], [0, "&UnionPlus;"], [0, { v: "&sqsub;", n: 824, o: "&NotSquareSubset;" }], [0, { v: "&sqsup;", n: 824, o: "&NotSquareSuperset;" }], [0, "&sqsube;"], [0, "&sqsupe;"], [0, { v: "&sqcap;", n: 65024, o: "&sqcaps;" }], [0, { v: "&sqcup;", n: 65024, o: "&sqcups;" }], [0, "&CirclePlus;"], [0, "&CircleMinus;"], [0, "&CircleTimes;"], [0, "&osol;"], [0, "&CircleDot;"], [0, "&circledcirc;"], [0, "&circledast;"], [1, "&circleddash;"], [0, "&boxplus;"], [0, "&boxminus;"], [0, "&boxtimes;"], [0, "&dotsquare;"], [0, "&RightTee;"], [0, "&dashv;"], [0, "&DownTee;"], [0, "&bot;"], [1, "&models;"], [0, "&DoubleRightTee;"], [0, "&Vdash;"], [0, "&Vvdash;"], [0, "&VDash;"], [0, "&nvdash;"], [0, "&nvDash;"], [0, "&nVdash;"], [0, "&nVDash;"], [0, "&prurel;"], [1, "&LeftTriangle;"], [0, "&RightTriangle;"], [0, { v: "&LeftTriangleEqual;", n: 8402, o: "&nvltrie;" }], [0, { v: "&RightTriangleEqual;", n: 8402, o: "&nvrtrie;" }], [0, "&origof;"], [0, "&imof;"], [0, "&multimap;"], [0, "&hercon;"], [0, "&intcal;"], [0, "&veebar;"], [1, "&barvee;"], [0, "&angrtvb;"], [0, "&lrtri;"], [0, "&bigwedge;"], [0, "&bigvee;"], [0, "&bigcap;"], [0, "&bigcup;"], [0, "&diam;"], [0, "&sdot;"], [0, "&sstarf;"], [0, "&divideontimes;"], [0, "&bowtie;"], [0, "&ltimes;"], [0, "&rtimes;"], [0, "&leftthreetimes;"], [0, "&rightthreetimes;"], [0, "&backsimeq;"], [0, "&curlyvee;"], [0, "&curlywedge;"], [0, "&Sub;"], [0, "&Sup;"], [0, "&Cap;"], [0, "&Cup;"], [0, "&fork;"], [0, "&epar;"], [0, "&lessdot;"], [0, "&gtdot;"], [0, { v: "&Ll;", n: 824, o: "&nLl;" }], [0, { v: "&Gg;", n: 824, o: "&nGg;" }], [0, { v: "&leg;", n: 65024, o: "&lesg;" }], [0, { v: "&gel;", n: 65024, o: "&gesl;" }], [2, "&cuepr;"], [0, "&cuesc;"], [0, "&NotPrecedesSlantEqual;"], [0, "&NotSucceedsSlantEqual;"], [0, "&NotSquareSubsetEqual;"], [0, "&NotSquareSupersetEqual;"], [2, "&lnsim;"], [0, "&gnsim;"], [0, "&precnsim;"], [0, "&scnsim;"], [0, "&nltri;"], [0, "&NotRightTriangle;"], [0, "&nltrie;"], [0, "&NotRightTriangleEqual;"], [0, "&vellip;"], [0, "&ctdot;"], [0, "&utdot;"], [0, "&dtdot;"], [0, "&disin;"], [0, "&isinsv;"], [0, "&isins;"], [0, { v: "&isindot;", n: 824, o: "&notindot;" }], [0, "&notinvc;"], [0, "&notinvb;"], [1, { v: "&isinE;", n: 824, o: "&notinE;" }], [0, "&nisd;"], [0, "&xnis;"], [0, "&nis;"], [0, "&notnivc;"], [0, "&notnivb;"], [6, "&barwed;"], [0, "&Barwed;"], [1, "&lceil;"], [0, "&rceil;"], [0, "&LeftFloor;"], [0, "&rfloor;"], [0, "&drcrop;"], [0, "&dlcrop;"], [0, "&urcrop;"], [0, "&ulcrop;"], [0, "&bnot;"], [1, "&profline;"], [0, "&profsurf;"], [1, "&telrec;"], [0, "&target;"], [5, "&ulcorn;"], [0, "&urcorn;"], [0, "&dlcorn;"], [0, "&drcorn;"], [2, "&frown;"], [0, "&smile;"], [9, "&cylcty;"], [0, "&profalar;"], [7, "&topbot;"], [6, "&ovbar;"], [1, "&solbar;"], [60, "&angzarr;"], [51, "&lmoustache;"], [0, "&rmoustache;"], [2, "&OverBracket;"], [0, "&bbrk;"], [0, "&bbrktbrk;"], [37, "&OverParenthesis;"], [0, "&UnderParenthesis;"], [0, "&OverBrace;"], [0, "&UnderBrace;"], [2, "&trpezium;"], [4, "&elinters;"], [59, "&blank;"], [164, "&circledS;"], [55, "&boxh;"], [1, "&boxv;"], [9, "&boxdr;"], [3, "&boxdl;"], [3, "&boxur;"], [3, "&boxul;"], [3, "&boxvr;"], [7, "&boxvl;"], [7, "&boxhd;"], [7, "&boxhu;"], [7, "&boxvh;"], [19, "&boxH;"], [0, "&boxV;"], [0, "&boxdR;"], [0, "&boxDr;"], [0, "&boxDR;"], [0, "&boxdL;"], [0, "&boxDl;"], [0, "&boxDL;"], [0, "&boxuR;"], [0, "&boxUr;"], [0, "&boxUR;"], [0, "&boxuL;"], [0, "&boxUl;"], [0, "&boxUL;"], [0, "&boxvR;"], [0, "&boxVr;"], [0, "&boxVR;"], [0, "&boxvL;"], [0, "&boxVl;"], [0, "&boxVL;"], [0, "&boxHd;"], [0, "&boxhD;"], [0, "&boxHD;"], [0, "&boxHu;"], [0, "&boxhU;"], [0, "&boxHU;"], [0, "&boxvH;"], [0, "&boxVh;"], [0, "&boxVH;"], [19, "&uhblk;"], [3, "&lhblk;"], [3, "&block;"], [8, "&blk14;"], [0, "&blk12;"], [0, "&blk34;"], [13, "&square;"], [8, "&blacksquare;"], [0, "&EmptyVerySmallSquare;"], [1, "&rect;"], [0, "&marker;"], [2, "&fltns;"], [1, "&bigtriangleup;"], [0, "&blacktriangle;"], [0, "&triangle;"], [2, "&blacktriangleright;"], [0, "&rtri;"], [3, "&bigtriangledown;"], [0, "&blacktriangledown;"], [0, "&dtri;"], [2, "&blacktriangleleft;"], [0, "&ltri;"], [6, "&loz;"], [0, "&cir;"], [32, "&tridot;"], [2, "&bigcirc;"], [8, "&ultri;"], [0, "&urtri;"], [0, "&lltri;"], [0, "&EmptySmallSquare;"], [0, "&FilledSmallSquare;"], [8, "&bigstar;"], [0, "&star;"], [7, "&phone;"], [49, "&female;"], [1, "&male;"], [29, "&spades;"], [2, "&clubs;"], [1, "&hearts;"], [0, "&diamondsuit;"], [3, "&sung;"], [2, "&flat;"], [0, "&natural;"], [0, "&sharp;"], [163, "&check;"], [3, "&cross;"], [8, "&malt;"], [21, "&sext;"], [33, "&VerticalSeparator;"], [25, "&lbbrk;"], [0, "&rbbrk;"], [84, "&bsolhsub;"], [0, "&suphsol;"], [28, "&LeftDoubleBracket;"], [0, "&RightDoubleBracket;"], [0, "&lang;"], [0, "&rang;"], [0, "&Lang;"], [0, "&Rang;"], [0, "&loang;"], [0, "&roang;"], [7, "&longleftarrow;"], [0, "&longrightarrow;"], [0, "&longleftrightarrow;"], [0, "&DoubleLongLeftArrow;"], [0, "&DoubleLongRightArrow;"], [0, "&DoubleLongLeftRightArrow;"], [1, "&longmapsto;"], [2, "&dzigrarr;"], [258, "&nvlArr;"], [0, "&nvrArr;"], [0, "&nvHarr;"], [0, "&Map;"], [6, "&lbarr;"], [0, "&bkarow;"], [0, "&lBarr;"], [0, "&dbkarow;"], [0, "&drbkarow;"], [0, "&DDotrahd;"], [0, "&UpArrowBar;"], [0, "&DownArrowBar;"], [2, "&Rarrtl;"], [2, "&latail;"], [0, "&ratail;"], [0, "&lAtail;"], [0, "&rAtail;"], [0, "&larrfs;"], [0, "&rarrfs;"], [0, "&larrbfs;"], [0, "&rarrbfs;"], [2, "&nwarhk;"], [0, "&nearhk;"], [0, "&hksearow;"], [0, "&hkswarow;"], [0, "&nwnear;"], [0, "&nesear;"], [0, "&seswar;"], [0, "&swnwar;"], [8, { v: "&rarrc;", n: 824, o: "&nrarrc;" }], [1, "&cudarrr;"], [0, "&ldca;"], [0, "&rdca;"], [0, "&cudarrl;"], [0, "&larrpl;"], [2, "&curarrm;"], [0, "&cularrp;"], [7, "&rarrpl;"], [2, "&harrcir;"], [0, "&Uarrocir;"], [0, "&lurdshar;"], [0, "&ldrushar;"], [2, "&LeftRightVector;"], [0, "&RightUpDownVector;"], [0, "&DownLeftRightVector;"], [0, "&LeftUpDownVector;"], [0, "&LeftVectorBar;"], [0, "&RightVectorBar;"], [0, "&RightUpVectorBar;"], [0, "&RightDownVectorBar;"], [0, "&DownLeftVectorBar;"], [0, "&DownRightVectorBar;"], [0, "&LeftUpVectorBar;"], [0, "&LeftDownVectorBar;"], [0, "&LeftTeeVector;"], [0, "&RightTeeVector;"], [0, "&RightUpTeeVector;"], [0, "&RightDownTeeVector;"], [0, "&DownLeftTeeVector;"], [0, "&DownRightTeeVector;"], [0, "&LeftUpTeeVector;"], [0, "&LeftDownTeeVector;"], [0, "&lHar;"], [0, "&uHar;"], [0, "&rHar;"], [0, "&dHar;"], [0, "&luruhar;"], [0, "&ldrdhar;"], [0, "&ruluhar;"], [0, "&rdldhar;"], [0, "&lharul;"], [0, "&llhard;"], [0, "&rharul;"], [0, "&lrhard;"], [0, "&udhar;"], [0, "&duhar;"], [0, "&RoundImplies;"], [0, "&erarr;"], [0, "&simrarr;"], [0, "&larrsim;"], [0, "&rarrsim;"], [0, "&rarrap;"], [0, "&ltlarr;"], [1, "&gtrarr;"], [0, "&subrarr;"], [1, "&suplarr;"], [0, "&lfisht;"], [0, "&rfisht;"], [0, "&ufisht;"], [0, "&dfisht;"], [5, "&lopar;"], [0, "&ropar;"], [4, "&lbrke;"], [0, "&rbrke;"], [0, "&lbrkslu;"], [0, "&rbrksld;"], [0, "&lbrksld;"], [0, "&rbrkslu;"], [0, "&langd;"], [0, "&rangd;"], [0, "&lparlt;"], [0, "&rpargt;"], [0, "&gtlPar;"], [0, "&ltrPar;"], [3, "&vzigzag;"], [1, "&vangrt;"], [0, "&angrtvbd;"], [6, "&ange;"], [0, "&range;"], [0, "&dwangle;"], [0, "&uwangle;"], [0, "&angmsdaa;"], [0, "&angmsdab;"], [0, "&angmsdac;"], [0, "&angmsdad;"], [0, "&angmsdae;"], [0, "&angmsdaf;"], [0, "&angmsdag;"], [0, "&angmsdah;"], [0, "&bemptyv;"], [0, "&demptyv;"], [0, "&cemptyv;"], [0, "&raemptyv;"], [0, "&laemptyv;"], [0, "&ohbar;"], [0, "&omid;"], [0, "&opar;"], [1, "&operp;"], [1, "&olcross;"], [0, "&odsold;"], [1, "&olcir;"], [0, "&ofcir;"], [0, "&olt;"], [0, "&ogt;"], [0, "&cirscir;"], [0, "&cirE;"], [0, "&solb;"], [0, "&bsolb;"], [3, "&boxbox;"], [3, "&trisb;"], [0, "&rtriltri;"], [0, { v: "&LeftTriangleBar;", n: 824, o: "&NotLeftTriangleBar;" }], [0, { v: "&RightTriangleBar;", n: 824, o: "&NotRightTriangleBar;" }], [11, "&iinfin;"], [0, "&infintie;"], [0, "&nvinfin;"], [4, "&eparsl;"], [0, "&smeparsl;"], [0, "&eqvparsl;"], [5, "&blacklozenge;"], [8, "&RuleDelayed;"], [1, "&dsol;"], [9, "&bigodot;"], [0, "&bigoplus;"], [0, "&bigotimes;"], [1, "&biguplus;"], [1, "&bigsqcup;"], [5, "&iiiint;"], [0, "&fpartint;"], [2, "&cirfnint;"], [0, "&awint;"], [0, "&rppolint;"], [0, "&scpolint;"], [0, "&npolint;"], [0, "&pointint;"], [0, "&quatint;"], [0, "&intlarhk;"], [10, "&pluscir;"], [0, "&plusacir;"], [0, "&simplus;"], [0, "&plusdu;"], [0, "&plussim;"], [0, "&plustwo;"], [1, "&mcomma;"], [0, "&minusdu;"], [2, "&loplus;"], [0, "&roplus;"], [0, "&Cross;"], [0, "&timesd;"], [0, "&timesbar;"], [1, "&smashp;"], [0, "&lotimes;"], [0, "&rotimes;"], [0, "&otimesas;"], [0, "&Otimes;"], [0, "&odiv;"], [0, "&triplus;"], [0, "&triminus;"], [0, "&tritime;"], [0, "&intprod;"], [2, "&amalg;"], [0, "&capdot;"], [1, "&ncup;"], [0, "&ncap;"], [0, "&capand;"], [0, "&cupor;"], [0, "&cupcap;"], [0, "&capcup;"], [0, "&cupbrcap;"], [0, "&capbrcup;"], [0, "&cupcup;"], [0, "&capcap;"], [0, "&ccups;"], [0, "&ccaps;"], [2, "&ccupssm;"], [2, "&And;"], [0, "&Or;"], [0, "&andand;"], [0, "&oror;"], [0, "&orslope;"], [0, "&andslope;"], [1, "&andv;"], [0, "&orv;"], [0, "&andd;"], [0, "&ord;"], [1, "&wedbar;"], [6, "&sdote;"], [3, "&simdot;"], [2, { v: "&congdot;", n: 824, o: "&ncongdot;" }], [0, "&easter;"], [0, "&apacir;"], [0, { v: "&apE;", n: 824, o: "&napE;" }], [0, "&eplus;"], [0, "&pluse;"], [0, "&Esim;"], [0, "&Colone;"], [0, "&Equal;"], [1, "&ddotseq;"], [0, "&equivDD;"], [0, "&ltcir;"], [0, "&gtcir;"], [0, "&ltquest;"], [0, "&gtquest;"], [0, { v: "&leqslant;", n: 824, o: "&nleqslant;" }], [0, { v: "&geqslant;", n: 824, o: "&ngeqslant;" }], [0, "&lesdot;"], [0, "&gesdot;"], [0, "&lesdoto;"], [0, "&gesdoto;"], [0, "&lesdotor;"], [0, "&gesdotol;"], [0, "&lap;"], [0, "&gap;"], [0, "&lne;"], [0, "&gne;"], [0, "&lnap;"], [0, "&gnap;"], [0, "&lEg;"], [0, "&gEl;"], [0, "&lsime;"], [0, "&gsime;"], [0, "&lsimg;"], [0, "&gsiml;"], [0, "&lgE;"], [0, "&glE;"], [0, "&lesges;"], [0, "&gesles;"], [0, "&els;"], [0, "&egs;"], [0, "&elsdot;"], [0, "&egsdot;"], [0, "&el;"], [0, "&eg;"], [2, "&siml;"], [0, "&simg;"], [0, "&simlE;"], [0, "&simgE;"], [0, { v: "&LessLess;", n: 824, o: "&NotNestedLessLess;" }], [0, { v: "&GreaterGreater;", n: 824, o: "&NotNestedGreaterGreater;" }], [1, "&glj;"], [0, "&gla;"], [0, "&ltcc;"], [0, "&gtcc;"], [0, "&lescc;"], [0, "&gescc;"], [0, "&smt;"], [0, "&lat;"], [0, { v: "&smte;", n: 65024, o: "&smtes;" }], [0, { v: "&late;", n: 65024, o: "&lates;" }], [0, "&bumpE;"], [0, { v: "&PrecedesEqual;", n: 824, o: "&NotPrecedesEqual;" }], [0, { v: "&sce;", n: 824, o: "&NotSucceedsEqual;" }], [2, "&prE;"], [0, "&scE;"], [0, "&precneqq;"], [0, "&scnE;"], [0, "&prap;"], [0, "&scap;"], [0, "&precnapprox;"], [0, "&scnap;"], [0, "&Pr;"], [0, "&Sc;"], [0, "&subdot;"], [0, "&supdot;"], [0, "&subplus;"], [0, "&supplus;"], [0, "&submult;"], [0, "&supmult;"], [0, "&subedot;"], [0, "&supedot;"], [0, { v: "&subE;", n: 824, o: "&nsubE;" }], [0, { v: "&supE;", n: 824, o: "&nsupE;" }], [0, "&subsim;"], [0, "&supsim;"], [2, { v: "&subnE;", n: 65024, o: "&varsubsetneqq;" }], [0, { v: "&supnE;", n: 65024, o: "&varsupsetneqq;" }], [2, "&csub;"], [0, "&csup;"], [0, "&csube;"], [0, "&csupe;"], [0, "&subsup;"], [0, "&supsub;"], [0, "&subsub;"], [0, "&supsup;"], [0, "&suphsub;"], [0, "&supdsub;"], [0, "&forkv;"], [0, "&topfork;"], [0, "&mlcp;"], [8, "&Dashv;"], [1, "&Vdashl;"], [0, "&Barv;"], [0, "&vBar;"], [0, "&vBarv;"], [1, "&Vbar;"], [0, "&Not;"], [0, "&bNot;"], [0, "&rnmid;"], [0, "&cirmid;"], [0, "&midcir;"], [0, "&topcir;"], [0, "&nhpar;"], [0, "&parsim;"], [9, { v: "&parsl;", n: 8421, o: "&nparsl;" }], [44343, { n: new Map(/* @__PURE__ */ restoreDiff([[56476, "&Ascr;"], [1, "&Cscr;"], [0, "&Dscr;"], [2, "&Gscr;"], [2, "&Jscr;"], [0, "&Kscr;"], [2, "&Nscr;"], [0, "&Oscr;"], [0, "&Pscr;"], [0, "&Qscr;"], [1, "&Sscr;"], [0, "&Tscr;"], [0, "&Uscr;"], [0, "&Vscr;"], [0, "&Wscr;"], [0, "&Xscr;"], [0, "&Yscr;"], [0, "&Zscr;"], [0, "&ascr;"], [0, "&bscr;"], [0, "&cscr;"], [0, "&dscr;"], [1, "&fscr;"], [1, "&hscr;"], [0, "&iscr;"], [0, "&jscr;"], [0, "&kscr;"], [0, "&lscr;"], [0, "&mscr;"], [0, "&nscr;"], [1, "&pscr;"], [0, "&qscr;"], [0, "&rscr;"], [0, "&sscr;"], [0, "&tscr;"], [0, "&uscr;"], [0, "&vscr;"], [0, "&wscr;"], [0, "&xscr;"], [0, "&yscr;"], [0, "&zscr;"], [52, "&Afr;"], [0, "&Bfr;"], [1, "&Dfr;"], [0, "&Efr;"], [0, "&Ffr;"], [0, "&Gfr;"], [2, "&Jfr;"], [0, "&Kfr;"], [0, "&Lfr;"], [0, "&Mfr;"], [0, "&Nfr;"], [0, "&Ofr;"], [0, "&Pfr;"], [0, "&Qfr;"], [1, "&Sfr;"], [0, "&Tfr;"], [0, "&Ufr;"], [0, "&Vfr;"], [0, "&Wfr;"], [0, "&Xfr;"], [0, "&Yfr;"], [1, "&afr;"], [0, "&bfr;"], [0, "&cfr;"], [0, "&dfr;"], [0, "&efr;"], [0, "&ffr;"], [0, "&gfr;"], [0, "&hfr;"], [0, "&ifr;"], [0, "&jfr;"], [0, "&kfr;"], [0, "&lfr;"], [0, "&mfr;"], [0, "&nfr;"], [0, "&ofr;"], [0, "&pfr;"], [0, "&qfr;"], [0, "&rfr;"], [0, "&sfr;"], [0, "&tfr;"], [0, "&ufr;"], [0, "&vfr;"], [0, "&wfr;"], [0, "&xfr;"], [0, "&yfr;"], [0, "&zfr;"], [0, "&Aopf;"], [0, "&Bopf;"], [1, "&Dopf;"], [0, "&Eopf;"], [0, "&Fopf;"], [0, "&Gopf;"], [1, "&Iopf;"], [0, "&Jopf;"], [0, "&Kopf;"], [0, "&Lopf;"], [0, "&Mopf;"], [1, "&Oopf;"], [3, "&Sopf;"], [0, "&Topf;"], [0, "&Uopf;"], [0, "&Vopf;"], [0, "&Wopf;"], [0, "&Xopf;"], [0, "&Yopf;"], [1, "&aopf;"], [0, "&bopf;"], [0, "&copf;"], [0, "&dopf;"], [0, "&eopf;"], [0, "&fopf;"], [0, "&gopf;"], [0, "&hopf;"], [0, "&iopf;"], [0, "&jopf;"], [0, "&kopf;"], [0, "&lopf;"], [0, "&mopf;"], [0, "&nopf;"], [0, "&oopf;"], [0, "&popf;"], [0, "&qopf;"], [0, "&ropf;"], [0, "&sopf;"], [0, "&topf;"], [0, "&uopf;"], [0, "&vopf;"], [0, "&wopf;"], [0, "&xopf;"], [0, "&yopf;"], [0, "&zopf;"]])) }], [8906, "&fflig;"], [0, "&filig;"], [0, "&fllig;"], [0, "&ffilig;"], [0, "&ffllig;"]]));

  // node_modules/.pnpm/entities@4.5.0/node_modules/entities/lib/esm/escape.js
  var xmlCodeMap = /* @__PURE__ */ new Map([
    [34, "&quot;"],
    [38, "&amp;"],
    [39, "&apos;"],
    [60, "&lt;"],
    [62, "&gt;"]
  ]);
  var getCodePoint = (
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    String.prototype.codePointAt != null ? (str, index) => str.codePointAt(index) : (
      // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
      (c, index) => (c.charCodeAt(index) & 64512) === 55296 ? (c.charCodeAt(index) - 55296) * 1024 + c.charCodeAt(index + 1) - 56320 + 65536 : c.charCodeAt(index)
    )
  );
  function getEscaper(regex, map2) {
    return function escape5(data) {
      let match2;
      let lastIdx = 0;
      let result = "";
      while (match2 = regex.exec(data)) {
        if (lastIdx !== match2.index) {
          result += data.substring(lastIdx, match2.index);
        }
        result += map2.get(match2[0].charCodeAt(0));
        lastIdx = match2.index + 1;
      }
      return result + data.substring(lastIdx);
    };
  }
  var escapeUTF8 = getEscaper(/[&<>'"]/g, xmlCodeMap);
  var escapeAttribute = getEscaper(/["&\u00A0]/g, /* @__PURE__ */ new Map([
    [34, "&quot;"],
    [38, "&amp;"],
    [160, "&nbsp;"]
  ]));
  var escapeText = getEscaper(/[&<>\u00A0]/g, /* @__PURE__ */ new Map([
    [38, "&amp;"],
    [60, "&lt;"],
    [62, "&gt;"],
    [160, "&nbsp;"]
  ]));

  // node_modules/.pnpm/entities@4.5.0/node_modules/entities/lib/esm/index.js
  var EntityLevel;
  (function(EntityLevel2) {
    EntityLevel2[EntityLevel2["XML"] = 0] = "XML";
    EntityLevel2[EntityLevel2["HTML"] = 1] = "HTML";
  })(EntityLevel || (EntityLevel = {}));
  var EncodingMode;
  (function(EncodingMode2) {
    EncodingMode2[EncodingMode2["UTF8"] = 0] = "UTF8";
    EncodingMode2[EncodingMode2["ASCII"] = 1] = "ASCII";
    EncodingMode2[EncodingMode2["Extensive"] = 2] = "Extensive";
    EncodingMode2[EncodingMode2["Attribute"] = 3] = "Attribute";
    EncodingMode2[EncodingMode2["Text"] = 4] = "Text";
  })(EncodingMode || (EncodingMode = {}));

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/common/utils.mjs
  function _class(obj) {
    return Object.prototype.toString.call(obj);
  }
  function isString(obj) {
    return _class(obj) === "[object String]";
  }
  var _hasOwnProperty = Object.prototype.hasOwnProperty;
  function has(object, key) {
    return _hasOwnProperty.call(object, key);
  }
  function assign(obj) {
    const sources = Array.prototype.slice.call(arguments, 1);
    sources.forEach(function(source) {
      if (!source) {
        return;
      }
      if (typeof source !== "object") {
        throw new TypeError(source + "must be object");
      }
      Object.keys(source).forEach(function(key) {
        obj[key] = source[key];
      });
    });
    return obj;
  }
  function arrayReplaceAt(src, pos, newElements) {
    return [].concat(src.slice(0, pos), newElements, src.slice(pos + 1));
  }
  function isValidEntityCode(c) {
    if (c >= 55296 && c <= 57343) {
      return false;
    }
    if (c >= 64976 && c <= 65007) {
      return false;
    }
    if ((c & 65535) === 65535 || (c & 65535) === 65534) {
      return false;
    }
    if (c >= 0 && c <= 8) {
      return false;
    }
    if (c === 11) {
      return false;
    }
    if (c >= 14 && c <= 31) {
      return false;
    }
    if (c >= 127 && c <= 159) {
      return false;
    }
    if (c > 1114111) {
      return false;
    }
    return true;
  }
  function fromCodePoint2(c) {
    if (c > 65535) {
      c -= 65536;
      const surrogate1 = 55296 + (c >> 10);
      const surrogate2 = 56320 + (c & 1023);
      return String.fromCharCode(surrogate1, surrogate2);
    }
    return String.fromCharCode(c);
  }
  var UNESCAPE_MD_RE = /\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g;
  var ENTITY_RE = /&([a-z#][a-z0-9]{1,31});/gi;
  var UNESCAPE_ALL_RE = new RegExp(UNESCAPE_MD_RE.source + "|" + ENTITY_RE.source, "gi");
  var DIGITAL_ENTITY_TEST_RE = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;
  function replaceEntityPattern(match2, name50) {
    if (name50.charCodeAt(0) === 35 && DIGITAL_ENTITY_TEST_RE.test(name50)) {
      const code3 = name50[1].toLowerCase() === "x" ? parseInt(name50.slice(2), 16) : parseInt(name50.slice(1), 10);
      if (isValidEntityCode(code3)) {
        return fromCodePoint2(code3);
      }
      return match2;
    }
    const decoded = decodeHTML(match2);
    if (decoded !== match2) {
      return decoded;
    }
    return match2;
  }
  function unescapeMd(str) {
    if (str.indexOf("\\") < 0) {
      return str;
    }
    return str.replace(UNESCAPE_MD_RE, "$1");
  }
  function unescapeAll(str) {
    if (str.indexOf("\\") < 0 && str.indexOf("&") < 0) {
      return str;
    }
    return str.replace(UNESCAPE_ALL_RE, function(match2, escaped, entity2) {
      if (escaped) {
        return escaped;
      }
      return replaceEntityPattern(match2, entity2);
    });
  }
  var HTML_ESCAPE_TEST_RE = /[&<>"]/;
  var HTML_ESCAPE_REPLACE_RE = /[&<>"]/g;
  var HTML_REPLACEMENTS = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;"
  };
  function replaceUnsafeChar(ch) {
    return HTML_REPLACEMENTS[ch];
  }
  function escapeHtml(str) {
    if (HTML_ESCAPE_TEST_RE.test(str)) {
      return str.replace(HTML_ESCAPE_REPLACE_RE, replaceUnsafeChar);
    }
    return str;
  }
  var REGEXP_ESCAPE_RE = /[.?*+^$[\]\\(){}|-]/g;
  function escapeRE(str) {
    return str.replace(REGEXP_ESCAPE_RE, "\\$&");
  }
  function isSpace(code3) {
    switch (code3) {
      case 9:
      case 32:
        return true;
    }
    return false;
  }
  function isWhiteSpace(code3) {
    if (code3 >= 8192 && code3 <= 8202) {
      return true;
    }
    switch (code3) {
      case 9:
      // \t
      case 10:
      // \n
      case 11:
      // \v
      case 12:
      // \f
      case 13:
      // \r
      case 32:
      case 160:
      case 5760:
      case 8239:
      case 8287:
      case 12288:
        return true;
    }
    return false;
  }
  function isPunctChar(ch) {
    return regex_default4.test(ch) || regex_default5.test(ch);
  }
  function isMdAsciiPunct(ch) {
    switch (ch) {
      case 33:
      case 34:
      case 35:
      case 36:
      case 37:
      case 38:
      case 39:
      case 40:
      case 41:
      case 42:
      case 43:
      case 44:
      case 45:
      case 46:
      case 47:
      case 58:
      case 59:
      case 60:
      case 61:
      case 62:
      case 63:
      case 64:
      case 91:
      case 92:
      case 93:
      case 94:
      case 95:
      case 96:
      case 123:
      case 124:
      case 125:
      case 126:
        return true;
      default:
        return false;
    }
  }
  function normalizeReference(str) {
    str = str.trim().replace(/\s+/g, " ");
    if ("\u1E9E".toLowerCase() === "\u1E7E") {
      str = str.replace(/ẞ/g, "\xDF");
    }
    return str.toLowerCase().toUpperCase();
  }
  var lib = { mdurl: mdurl_exports, ucmicro: uc_exports };

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/helpers/index.mjs
  var helpers_exports = {};
  __export(helpers_exports, {
    parseLinkDestination: () => parseLinkDestination,
    parseLinkLabel: () => parseLinkLabel,
    parseLinkTitle: () => parseLinkTitle
  });

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/helpers/parse_link_label.mjs
  function parseLinkLabel(state, start, disableNested) {
    let level, found, marker, prevPos;
    const max = state.posMax;
    const oldPos = state.pos;
    state.pos = start + 1;
    level = 1;
    while (state.pos < max) {
      marker = state.src.charCodeAt(state.pos);
      if (marker === 93) {
        level--;
        if (level === 0) {
          found = true;
          break;
        }
      }
      prevPos = state.pos;
      state.md.inline.skipToken(state);
      if (marker === 91) {
        if (prevPos === state.pos - 1) {
          level++;
        } else if (disableNested) {
          state.pos = oldPos;
          return -1;
        }
      }
    }
    let labelEnd = -1;
    if (found) {
      labelEnd = state.pos;
    }
    state.pos = oldPos;
    return labelEnd;
  }

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/helpers/parse_link_destination.mjs
  function parseLinkDestination(str, start, max) {
    let code3;
    let pos = start;
    const result = {
      ok: false,
      pos: 0,
      str: ""
    };
    if (str.charCodeAt(pos) === 60) {
      pos++;
      while (pos < max) {
        code3 = str.charCodeAt(pos);
        if (code3 === 10) {
          return result;
        }
        if (code3 === 60) {
          return result;
        }
        if (code3 === 62) {
          result.pos = pos + 1;
          result.str = unescapeAll(str.slice(start + 1, pos));
          result.ok = true;
          return result;
        }
        if (code3 === 92 && pos + 1 < max) {
          pos += 2;
          continue;
        }
        pos++;
      }
      return result;
    }
    let level = 0;
    while (pos < max) {
      code3 = str.charCodeAt(pos);
      if (code3 === 32) {
        break;
      }
      if (code3 < 32 || code3 === 127) {
        break;
      }
      if (code3 === 92 && pos + 1 < max) {
        if (str.charCodeAt(pos + 1) === 32) {
          break;
        }
        pos += 2;
        continue;
      }
      if (code3 === 40) {
        level++;
        if (level > 32) {
          return result;
        }
      }
      if (code3 === 41) {
        if (level === 0) {
          break;
        }
        level--;
      }
      pos++;
    }
    if (start === pos) {
      return result;
    }
    if (level !== 0) {
      return result;
    }
    result.str = unescapeAll(str.slice(start, pos));
    result.pos = pos;
    result.ok = true;
    return result;
  }

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/helpers/parse_link_title.mjs
  function parseLinkTitle(str, start, max, prev_state) {
    let code3;
    let pos = start;
    const state = {
      // if `true`, this is a valid link title
      ok: false,
      // if `true`, this link can be continued on the next line
      can_continue: false,
      // if `ok`, it's the position of the first character after the closing marker
      pos: 0,
      // if `ok`, it's the unescaped title
      str: "",
      // expected closing marker character code
      marker: 0
    };
    if (prev_state) {
      state.str = prev_state.str;
      state.marker = prev_state.marker;
    } else {
      if (pos >= max) {
        return state;
      }
      let marker = str.charCodeAt(pos);
      if (marker !== 34 && marker !== 39 && marker !== 40) {
        return state;
      }
      start++;
      pos++;
      if (marker === 40) {
        marker = 41;
      }
      state.marker = marker;
    }
    while (pos < max) {
      code3 = str.charCodeAt(pos);
      if (code3 === state.marker) {
        state.pos = pos + 1;
        state.str += unescapeAll(str.slice(start, pos));
        state.ok = true;
        return state;
      } else if (code3 === 40 && state.marker === 41) {
        return state;
      } else if (code3 === 92 && pos + 1 < max) {
        pos++;
      }
      pos++;
    }
    state.can_continue = true;
    state.str += unescapeAll(str.slice(start, pos));
    return state;
  }

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/renderer.mjs
  var default_rules = {};
  default_rules.code_inline = function(tokens, idx, options, env, slf) {
    const token = tokens[idx];
    return "<code" + slf.renderAttrs(token) + ">" + escapeHtml(token.content) + "</code>";
  };
  default_rules.code_block = function(tokens, idx, options, env, slf) {
    const token = tokens[idx];
    return "<pre" + slf.renderAttrs(token) + "><code>" + escapeHtml(tokens[idx].content) + "</code></pre>\n";
  };
  default_rules.fence = function(tokens, idx, options, env, slf) {
    const token = tokens[idx];
    const info = token.info ? unescapeAll(token.info).trim() : "";
    let langName = "";
    let langAttrs = "";
    if (info) {
      const arr = info.split(/(\s+)/g);
      langName = arr[0];
      langAttrs = arr.slice(2).join("");
    }
    let highlighted;
    if (options.highlight) {
      highlighted = options.highlight(token.content, langName, langAttrs) || escapeHtml(token.content);
    } else {
      highlighted = escapeHtml(token.content);
    }
    if (highlighted.indexOf("<pre") === 0) {
      return highlighted + "\n";
    }
    if (info) {
      const i = token.attrIndex("class");
      const tmpAttrs = token.attrs ? token.attrs.slice() : [];
      if (i < 0) {
        tmpAttrs.push(["class", options.langPrefix + langName]);
      } else {
        tmpAttrs[i] = tmpAttrs[i].slice();
        tmpAttrs[i][1] += " " + options.langPrefix + langName;
      }
      const tmpToken = {
        attrs: tmpAttrs
      };
      return `<pre><code${slf.renderAttrs(tmpToken)}>${highlighted}</code></pre>
`;
    }
    return `<pre><code${slf.renderAttrs(token)}>${highlighted}</code></pre>
`;
  };
  default_rules.image = function(tokens, idx, options, env, slf) {
    const token = tokens[idx];
    token.attrs[token.attrIndex("alt")][1] = slf.renderInlineAsText(token.children, options, env);
    return slf.renderToken(tokens, idx, options);
  };
  default_rules.hardbreak = function(tokens, idx, options) {
    return options.xhtmlOut ? "<br />\n" : "<br>\n";
  };
  default_rules.softbreak = function(tokens, idx, options) {
    return options.breaks ? options.xhtmlOut ? "<br />\n" : "<br>\n" : "\n";
  };
  default_rules.text = function(tokens, idx) {
    return escapeHtml(tokens[idx].content);
  };
  default_rules.html_block = function(tokens, idx) {
    return tokens[idx].content;
  };
  default_rules.html_inline = function(tokens, idx) {
    return tokens[idx].content;
  };
  function Renderer() {
    this.rules = assign({}, default_rules);
  }
  Renderer.prototype.renderAttrs = function renderAttrs(token) {
    let i, l, result;
    if (!token.attrs) {
      return "";
    }
    result = "";
    for (i = 0, l = token.attrs.length; i < l; i++) {
      result += " " + escapeHtml(token.attrs[i][0]) + '="' + escapeHtml(token.attrs[i][1]) + '"';
    }
    return result;
  };
  Renderer.prototype.renderToken = function renderToken(tokens, idx, options) {
    const token = tokens[idx];
    let result = "";
    if (token.hidden) {
      return "";
    }
    if (token.block && token.nesting !== -1 && idx && tokens[idx - 1].hidden) {
      result += "\n";
    }
    result += (token.nesting === -1 ? "</" : "<") + token.tag;
    result += this.renderAttrs(token);
    if (token.nesting === 0 && options.xhtmlOut) {
      result += " /";
    }
    let needLf = false;
    if (token.block) {
      needLf = true;
      if (token.nesting === 1) {
        if (idx + 1 < tokens.length) {
          const nextToken = tokens[idx + 1];
          if (nextToken.type === "inline" || nextToken.hidden) {
            needLf = false;
          } else if (nextToken.nesting === -1 && nextToken.tag === token.tag) {
            needLf = false;
          }
        }
      }
    }
    result += needLf ? ">\n" : ">";
    return result;
  };
  Renderer.prototype.renderInline = function(tokens, options, env) {
    let result = "";
    const rules = this.rules;
    for (let i = 0, len = tokens.length; i < len; i++) {
      const type = tokens[i].type;
      if (typeof rules[type] !== "undefined") {
        result += rules[type](tokens, i, options, env, this);
      } else {
        result += this.renderToken(tokens, i, options);
      }
    }
    return result;
  };
  Renderer.prototype.renderInlineAsText = function(tokens, options, env) {
    let result = "";
    for (let i = 0, len = tokens.length; i < len; i++) {
      switch (tokens[i].type) {
        case "text":
          result += tokens[i].content;
          break;
        case "image":
          result += this.renderInlineAsText(tokens[i].children, options, env);
          break;
        case "html_inline":
        case "html_block":
          result += tokens[i].content;
          break;
        case "softbreak":
        case "hardbreak":
          result += "\n";
          break;
        default:
      }
    }
    return result;
  };
  Renderer.prototype.render = function(tokens, options, env) {
    let result = "";
    const rules = this.rules;
    for (let i = 0, len = tokens.length; i < len; i++) {
      const type = tokens[i].type;
      if (type === "inline") {
        result += this.renderInline(tokens[i].children, options, env);
      } else if (typeof rules[type] !== "undefined") {
        result += rules[type](tokens, i, options, env, this);
      } else {
        result += this.renderToken(tokens, i, options, env);
      }
    }
    return result;
  };
  var renderer_default = Renderer;

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/ruler.mjs
  function Ruler() {
    this.__rules__ = [];
    this.__cache__ = null;
  }
  Ruler.prototype.__find__ = function(name50) {
    for (let i = 0; i < this.__rules__.length; i++) {
      if (this.__rules__[i].name === name50) {
        return i;
      }
    }
    return -1;
  };
  Ruler.prototype.__compile__ = function() {
    const self = this;
    const chains = [""];
    self.__rules__.forEach(function(rule) {
      if (!rule.enabled) {
        return;
      }
      rule.alt.forEach(function(altName) {
        if (chains.indexOf(altName) < 0) {
          chains.push(altName);
        }
      });
    });
    self.__cache__ = {};
    chains.forEach(function(chain) {
      self.__cache__[chain] = [];
      self.__rules__.forEach(function(rule) {
        if (!rule.enabled) {
          return;
        }
        if (chain && rule.alt.indexOf(chain) < 0) {
          return;
        }
        self.__cache__[chain].push(rule.fn);
      });
    });
  };
  Ruler.prototype.at = function(name50, fn, options) {
    const index = this.__find__(name50);
    const opt = options || {};
    if (index === -1) {
      throw new Error("Parser rule not found: " + name50);
    }
    this.__rules__[index].fn = fn;
    this.__rules__[index].alt = opt.alt || [];
    this.__cache__ = null;
  };
  Ruler.prototype.before = function(beforeName, ruleName, fn, options) {
    const index = this.__find__(beforeName);
    const opt = options || {};
    if (index === -1) {
      throw new Error("Parser rule not found: " + beforeName);
    }
    this.__rules__.splice(index, 0, {
      name: ruleName,
      enabled: true,
      fn,
      alt: opt.alt || []
    });
    this.__cache__ = null;
  };
  Ruler.prototype.after = function(afterName, ruleName, fn, options) {
    const index = this.__find__(afterName);
    const opt = options || {};
    if (index === -1) {
      throw new Error("Parser rule not found: " + afterName);
    }
    this.__rules__.splice(index + 1, 0, {
      name: ruleName,
      enabled: true,
      fn,
      alt: opt.alt || []
    });
    this.__cache__ = null;
  };
  Ruler.prototype.push = function(ruleName, fn, options) {
    const opt = options || {};
    this.__rules__.push({
      name: ruleName,
      enabled: true,
      fn,
      alt: opt.alt || []
    });
    this.__cache__ = null;
  };
  Ruler.prototype.enable = function(list2, ignoreInvalid) {
    if (!Array.isArray(list2)) {
      list2 = [list2];
    }
    const result = [];
    list2.forEach(function(name50) {
      const idx = this.__find__(name50);
      if (idx < 0) {
        if (ignoreInvalid) {
          return;
        }
        throw new Error("Rules manager: invalid rule name " + name50);
      }
      this.__rules__[idx].enabled = true;
      result.push(name50);
    }, this);
    this.__cache__ = null;
    return result;
  };
  Ruler.prototype.enableOnly = function(list2, ignoreInvalid) {
    if (!Array.isArray(list2)) {
      list2 = [list2];
    }
    this.__rules__.forEach(function(rule) {
      rule.enabled = false;
    });
    this.enable(list2, ignoreInvalid);
  };
  Ruler.prototype.disable = function(list2, ignoreInvalid) {
    if (!Array.isArray(list2)) {
      list2 = [list2];
    }
    const result = [];
    list2.forEach(function(name50) {
      const idx = this.__find__(name50);
      if (idx < 0) {
        if (ignoreInvalid) {
          return;
        }
        throw new Error("Rules manager: invalid rule name " + name50);
      }
      this.__rules__[idx].enabled = false;
      result.push(name50);
    }, this);
    this.__cache__ = null;
    return result;
  };
  Ruler.prototype.getRules = function(chainName) {
    if (this.__cache__ === null) {
      this.__compile__();
    }
    return this.__cache__[chainName] || [];
  };
  var ruler_default = Ruler;

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/token.mjs
  function Token(type, tag, nesting) {
    this.type = type;
    this.tag = tag;
    this.attrs = null;
    this.map = null;
    this.nesting = nesting;
    this.level = 0;
    this.children = null;
    this.content = "";
    this.markup = "";
    this.info = "";
    this.meta = null;
    this.block = false;
    this.hidden = false;
  }
  Token.prototype.attrIndex = function attrIndex(name50) {
    if (!this.attrs) {
      return -1;
    }
    const attrs = this.attrs;
    for (let i = 0, len = attrs.length; i < len; i++) {
      if (attrs[i][0] === name50) {
        return i;
      }
    }
    return -1;
  };
  Token.prototype.attrPush = function attrPush(attrData) {
    if (this.attrs) {
      this.attrs.push(attrData);
    } else {
      this.attrs = [attrData];
    }
  };
  Token.prototype.attrSet = function attrSet(name50, value) {
    const idx = this.attrIndex(name50);
    const attrData = [name50, value];
    if (idx < 0) {
      this.attrPush(attrData);
    } else {
      this.attrs[idx] = attrData;
    }
  };
  Token.prototype.attrGet = function attrGet(name50) {
    const idx = this.attrIndex(name50);
    let value = null;
    if (idx >= 0) {
      value = this.attrs[idx][1];
    }
    return value;
  };
  Token.prototype.attrJoin = function attrJoin(name50, value) {
    const idx = this.attrIndex(name50);
    if (idx < 0) {
      this.attrPush([name50, value]);
    } else {
      this.attrs[idx][1] = this.attrs[idx][1] + " " + value;
    }
  };
  var token_default = Token;

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/rules_core/state_core.mjs
  function StateCore(src, md2, env) {
    this.src = src;
    this.env = env;
    this.tokens = [];
    this.inlineMode = false;
    this.md = md2;
  }
  StateCore.prototype.Token = token_default;
  var state_core_default = StateCore;

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/rules_core/normalize.mjs
  var NEWLINES_RE = /\r\n?|\n/g;
  var NULL_RE = /\0/g;
  function normalize(state) {
    let str;
    str = state.src.replace(NEWLINES_RE, "\n");
    str = str.replace(NULL_RE, "\uFFFD");
    state.src = str;
  }

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/rules_core/block.mjs
  function block(state) {
    let token;
    if (state.inlineMode) {
      token = new state.Token("inline", "", 0);
      token.content = state.src;
      token.map = [0, 1];
      token.children = [];
      state.tokens.push(token);
    } else {
      state.md.block.parse(state.src, state.md, state.env, state.tokens);
    }
  }

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/rules_core/inline.mjs
  function inline(state) {
    const tokens = state.tokens;
    for (let i = 0, l = tokens.length; i < l; i++) {
      const tok = tokens[i];
      if (tok.type === "inline") {
        state.md.inline.parse(tok.content, state.md, state.env, tok.children);
      }
    }
  }

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/rules_core/linkify.mjs
  function isLinkOpen(str) {
    return /^<a[>\s]/i.test(str);
  }
  function isLinkClose(str) {
    return /^<\/a\s*>/i.test(str);
  }
  function linkify(state) {
    const blockTokens = state.tokens;
    if (!state.md.options.linkify) {
      return;
    }
    for (let j = 0, l = blockTokens.length; j < l; j++) {
      if (blockTokens[j].type !== "inline" || !state.md.linkify.pretest(blockTokens[j].content)) {
        continue;
      }
      let tokens = blockTokens[j].children;
      let htmlLinkLevel = 0;
      for (let i = tokens.length - 1; i >= 0; i--) {
        const currentToken = tokens[i];
        if (currentToken.type === "link_close") {
          i--;
          while (tokens[i].level !== currentToken.level && tokens[i].type !== "link_open") {
            i--;
          }
          continue;
        }
        if (currentToken.type === "html_inline") {
          if (isLinkOpen(currentToken.content) && htmlLinkLevel > 0) {
            htmlLinkLevel--;
          }
          if (isLinkClose(currentToken.content)) {
            htmlLinkLevel++;
          }
        }
        if (htmlLinkLevel > 0) {
          continue;
        }
        if (currentToken.type === "text" && state.md.linkify.test(currentToken.content)) {
          const text3 = currentToken.content;
          let links = state.md.linkify.match(text3);
          const nodes = [];
          let level = currentToken.level;
          let lastPos = 0;
          if (links.length > 0 && links[0].index === 0 && i > 0 && tokens[i - 1].type === "text_special") {
            links = links.slice(1);
          }
          for (let ln = 0; ln < links.length; ln++) {
            const url = links[ln].url;
            const fullUrl = state.md.normalizeLink(url);
            if (!state.md.validateLink(fullUrl)) {
              continue;
            }
            let urlText = links[ln].text;
            if (!links[ln].schema) {
              urlText = state.md.normalizeLinkText("http://" + urlText).replace(/^http:\/\//, "");
            } else if (links[ln].schema === "mailto:" && !/^mailto:/i.test(urlText)) {
              urlText = state.md.normalizeLinkText("mailto:" + urlText).replace(/^mailto:/, "");
            } else {
              urlText = state.md.normalizeLinkText(urlText);
            }
            const pos = links[ln].index;
            if (pos > lastPos) {
              const token = new state.Token("text", "", 0);
              token.content = text3.slice(lastPos, pos);
              token.level = level;
              nodes.push(token);
            }
            const token_o = new state.Token("link_open", "a", 1);
            token_o.attrs = [["href", fullUrl]];
            token_o.level = level++;
            token_o.markup = "linkify";
            token_o.info = "auto";
            nodes.push(token_o);
            const token_t = new state.Token("text", "", 0);
            token_t.content = urlText;
            token_t.level = level;
            nodes.push(token_t);
            const token_c = new state.Token("link_close", "a", -1);
            token_c.level = --level;
            token_c.markup = "linkify";
            token_c.info = "auto";
            nodes.push(token_c);
            lastPos = links[ln].lastIndex;
          }
          if (lastPos < text3.length) {
            const token = new state.Token("text", "", 0);
            token.content = text3.slice(lastPos);
            token.level = level;
            nodes.push(token);
          }
          blockTokens[j].children = tokens = arrayReplaceAt(tokens, i, nodes);
        }
      }
    }
  }

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/rules_core/replacements.mjs
  var RARE_RE = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/;
  var SCOPED_ABBR_TEST_RE = /\((c|tm|r)\)/i;
  var SCOPED_ABBR_RE = /\((c|tm|r)\)/ig;
  var SCOPED_ABBR = {
    c: "\xA9",
    r: "\xAE",
    tm: "\u2122"
  };
  function replaceFn(match2, name50) {
    return SCOPED_ABBR[name50.toLowerCase()];
  }
  function replace_scoped(inlineTokens) {
    let inside_autolink = 0;
    for (let i = inlineTokens.length - 1; i >= 0; i--) {
      const token = inlineTokens[i];
      if (token.type === "text" && !inside_autolink) {
        token.content = token.content.replace(SCOPED_ABBR_RE, replaceFn);
      }
      if (token.type === "link_open" && token.info === "auto") {
        inside_autolink--;
      }
      if (token.type === "link_close" && token.info === "auto") {
        inside_autolink++;
      }
    }
  }
  function replace_rare(inlineTokens) {
    let inside_autolink = 0;
    for (let i = inlineTokens.length - 1; i >= 0; i--) {
      const token = inlineTokens[i];
      if (token.type === "text" && !inside_autolink) {
        if (RARE_RE.test(token.content)) {
          token.content = token.content.replace(/\+-/g, "\xB1").replace(/\.{2,}/g, "\u2026").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---(?=[^-]|$)/mg, "$1\u2014").replace(/(^|\s)--(?=\s|$)/mg, "$1\u2013").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg, "$1\u2013");
        }
      }
      if (token.type === "link_open" && token.info === "auto") {
        inside_autolink--;
      }
      if (token.type === "link_close" && token.info === "auto") {
        inside_autolink++;
      }
    }
  }
  function replace(state) {
    let blkIdx;
    if (!state.md.options.typographer) {
      return;
    }
    for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
      if (state.tokens[blkIdx].type !== "inline") {
        continue;
      }
      if (SCOPED_ABBR_TEST_RE.test(state.tokens[blkIdx].content)) {
        replace_scoped(state.tokens[blkIdx].children);
      }
      if (RARE_RE.test(state.tokens[blkIdx].content)) {
        replace_rare(state.tokens[blkIdx].children);
      }
    }
  }

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/rules_core/smartquotes.mjs
  var QUOTE_TEST_RE = /['"]/;
  var QUOTE_RE = /['"]/g;
  var APOSTROPHE = "\u2019";
  function replaceAt(str, index, ch) {
    return str.slice(0, index) + ch + str.slice(index + 1);
  }
  function process_inlines(tokens, state) {
    let j;
    const stack = [];
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      const thisLevel = tokens[i].level;
      for (j = stack.length - 1; j >= 0; j--) {
        if (stack[j].level <= thisLevel) {
          break;
        }
      }
      stack.length = j + 1;
      if (token.type !== "text") {
        continue;
      }
      let text3 = token.content;
      let pos = 0;
      let max = text3.length;
      OUTER:
        while (pos < max) {
          QUOTE_RE.lastIndex = pos;
          const t = QUOTE_RE.exec(text3);
          if (!t) {
            break;
          }
          let canOpen = true;
          let canClose = true;
          pos = t.index + 1;
          const isSingle = t[0] === "'";
          let lastChar = 32;
          if (t.index - 1 >= 0) {
            lastChar = text3.charCodeAt(t.index - 1);
          } else {
            for (j = i - 1; j >= 0; j--) {
              if (tokens[j].type === "softbreak" || tokens[j].type === "hardbreak") break;
              if (!tokens[j].content) continue;
              lastChar = tokens[j].content.charCodeAt(tokens[j].content.length - 1);
              break;
            }
          }
          let nextChar = 32;
          if (pos < max) {
            nextChar = text3.charCodeAt(pos);
          } else {
            for (j = i + 1; j < tokens.length; j++) {
              if (tokens[j].type === "softbreak" || tokens[j].type === "hardbreak") break;
              if (!tokens[j].content) continue;
              nextChar = tokens[j].content.charCodeAt(0);
              break;
            }
          }
          const isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
          const isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));
          const isLastWhiteSpace = isWhiteSpace(lastChar);
          const isNextWhiteSpace = isWhiteSpace(nextChar);
          if (isNextWhiteSpace) {
            canOpen = false;
          } else if (isNextPunctChar) {
            if (!(isLastWhiteSpace || isLastPunctChar)) {
              canOpen = false;
            }
          }
          if (isLastWhiteSpace) {
            canClose = false;
          } else if (isLastPunctChar) {
            if (!(isNextWhiteSpace || isNextPunctChar)) {
              canClose = false;
            }
          }
          if (nextChar === 34 && t[0] === '"') {
            if (lastChar >= 48 && lastChar <= 57) {
              canClose = canOpen = false;
            }
          }
          if (canOpen && canClose) {
            canOpen = isLastPunctChar;
            canClose = isNextPunctChar;
          }
          if (!canOpen && !canClose) {
            if (isSingle) {
              token.content = replaceAt(token.content, t.index, APOSTROPHE);
            }
            continue;
          }
          if (canClose) {
            for (j = stack.length - 1; j >= 0; j--) {
              let item = stack[j];
              if (stack[j].level < thisLevel) {
                break;
              }
              if (item.single === isSingle && stack[j].level === thisLevel) {
                item = stack[j];
                let openQuote;
                let closeQuote;
                if (isSingle) {
                  openQuote = state.md.options.quotes[2];
                  closeQuote = state.md.options.quotes[3];
                } else {
                  openQuote = state.md.options.quotes[0];
                  closeQuote = state.md.options.quotes[1];
                }
                token.content = replaceAt(token.content, t.index, closeQuote);
                tokens[item.token].content = replaceAt(
                  tokens[item.token].content,
                  item.pos,
                  openQuote
                );
                pos += closeQuote.length - 1;
                if (item.token === i) {
                  pos += openQuote.length - 1;
                }
                text3 = token.content;
                max = text3.length;
                stack.length = j;
                continue OUTER;
              }
            }
          }
          if (canOpen) {
            stack.push({
              token: i,
              pos: t.index,
              single: isSingle,
              level: thisLevel
            });
          } else if (canClose && isSingle) {
            token.content = replaceAt(token.content, t.index, APOSTROPHE);
          }
        }
    }
  }
  function smartquotes(state) {
    if (!state.md.options.typographer) {
      return;
    }
    for (let blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
      if (state.tokens[blkIdx].type !== "inline" || !QUOTE_TEST_RE.test(state.tokens[blkIdx].content)) {
        continue;
      }
      process_inlines(state.tokens[blkIdx].children, state);
    }
  }

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/rules_core/text_join.mjs
  function text_join(state) {
    let curr, last;
    const blockTokens = state.tokens;
    const l = blockTokens.length;
    for (let j = 0; j < l; j++) {
      if (blockTokens[j].type !== "inline") continue;
      const tokens = blockTokens[j].children;
      const max = tokens.length;
      for (curr = 0; curr < max; curr++) {
        if (tokens[curr].type === "text_special") {
          tokens[curr].type = "text";
        }
      }
      for (curr = last = 0; curr < max; curr++) {
        if (tokens[curr].type === "text" && curr + 1 < max && tokens[curr + 1].type === "text") {
          tokens[curr + 1].content = tokens[curr].content + tokens[curr + 1].content;
        } else {
          if (curr !== last) {
            tokens[last] = tokens[curr];
          }
          last++;
        }
      }
      if (curr !== last) {
        tokens.length = last;
      }
    }
  }

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/parser_core.mjs
  var _rules = [
    ["normalize", normalize],
    ["block", block],
    ["inline", inline],
    ["linkify", linkify],
    ["replacements", replace],
    ["smartquotes", smartquotes],
    // `text_join` finds `text_special` tokens (for escape sequences)
    // and joins them with the rest of the text
    ["text_join", text_join]
  ];
  function Core() {
    this.ruler = new ruler_default();
    for (let i = 0; i < _rules.length; i++) {
      this.ruler.push(_rules[i][0], _rules[i][1]);
    }
  }
  Core.prototype.process = function(state) {
    const rules = this.ruler.getRules("");
    for (let i = 0, l = rules.length; i < l; i++) {
      rules[i](state);
    }
  };
  Core.prototype.State = state_core_default;
  var parser_core_default = Core;

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/rules_block/state_block.mjs
  function StateBlock(src, md2, env, tokens) {
    this.src = src;
    this.md = md2;
    this.env = env;
    this.tokens = tokens;
    this.bMarks = [];
    this.eMarks = [];
    this.tShift = [];
    this.sCount = [];
    this.bsCount = [];
    this.blkIndent = 0;
    this.line = 0;
    this.lineMax = 0;
    this.tight = false;
    this.ddIndent = -1;
    this.listIndent = -1;
    this.parentType = "root";
    this.level = 0;
    const s = this.src;
    for (let start = 0, pos = 0, indent = 0, offset = 0, len = s.length, indent_found = false; pos < len; pos++) {
      const ch = s.charCodeAt(pos);
      if (!indent_found) {
        if (isSpace(ch)) {
          indent++;
          if (ch === 9) {
            offset += 4 - offset % 4;
          } else {
            offset++;
          }
          continue;
        } else {
          indent_found = true;
        }
      }
      if (ch === 10 || pos === len - 1) {
        if (ch !== 10) {
          pos++;
        }
        this.bMarks.push(start);
        this.eMarks.push(pos);
        this.tShift.push(indent);
        this.sCount.push(offset);
        this.bsCount.push(0);
        indent_found = false;
        indent = 0;
        offset = 0;
        start = pos + 1;
      }
    }
    this.bMarks.push(s.length);
    this.eMarks.push(s.length);
    this.tShift.push(0);
    this.sCount.push(0);
    this.bsCount.push(0);
    this.lineMax = this.bMarks.length - 1;
  }
  StateBlock.prototype.push = function(type, tag, nesting) {
    const token = new token_default(type, tag, nesting);
    token.block = true;
    if (nesting < 0) this.level--;
    token.level = this.level;
    if (nesting > 0) this.level++;
    this.tokens.push(token);
    return token;
  };
  StateBlock.prototype.isEmpty = function isEmpty(line) {
    return this.bMarks[line] + this.tShift[line] >= this.eMarks[line];
  };
  StateBlock.prototype.skipEmptyLines = function skipEmptyLines(from) {
    for (let max = this.lineMax; from < max; from++) {
      if (this.bMarks[from] + this.tShift[from] < this.eMarks[from]) {
        break;
      }
    }
    return from;
  };
  StateBlock.prototype.skipSpaces = function skipSpaces(pos) {
    for (let max = this.src.length; pos < max; pos++) {
      const ch = this.src.charCodeAt(pos);
      if (!isSpace(ch)) {
        break;
      }
    }
    return pos;
  };
  StateBlock.prototype.skipSpacesBack = function skipSpacesBack(pos, min) {
    if (pos <= min) {
      return pos;
    }
    while (pos > min) {
      if (!isSpace(this.src.charCodeAt(--pos))) {
        return pos + 1;
      }
    }
    return pos;
  };
  StateBlock.prototype.skipChars = function skipChars(pos, code3) {
    for (let max = this.src.length; pos < max; pos++) {
      if (this.src.charCodeAt(pos) !== code3) {
        break;
      }
    }
    return pos;
  };
  StateBlock.prototype.skipCharsBack = function skipCharsBack(pos, code3, min) {
    if (pos <= min) {
      return pos;
    }
    while (pos > min) {
      if (code3 !== this.src.charCodeAt(--pos)) {
        return pos + 1;
      }
    }
    return pos;
  };
  StateBlock.prototype.getLines = function getLines(begin, end, indent, keepLastLF) {
    if (begin >= end) {
      return "";
    }
    const queue = new Array(end - begin);
    for (let i = 0, line = begin; line < end; line++, i++) {
      let lineIndent = 0;
      const lineStart = this.bMarks[line];
      let first = lineStart;
      let last;
      if (line + 1 < end || keepLastLF) {
        last = this.eMarks[line] + 1;
      } else {
        last = this.eMarks[line];
      }
      while (first < last && lineIndent < indent) {
        const ch = this.src.charCodeAt(first);
        if (isSpace(ch)) {
          if (ch === 9) {
            lineIndent += 4 - (lineIndent + this.bsCount[line]) % 4;
          } else {
            lineIndent++;
          }
        } else if (first - lineStart < this.tShift[line]) {
          lineIndent++;
        } else {
          break;
        }
        first++;
      }
      if (lineIndent > indent) {
        queue[i] = new Array(lineIndent - indent + 1).join(" ") + this.src.slice(first, last);
      } else {
        queue[i] = this.src.slice(first, last);
      }
    }
    return queue.join("");
  };
  StateBlock.prototype.Token = token_default;
  var state_block_default = StateBlock;

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/rules_block/table.mjs
  var MAX_AUTOCOMPLETED_CELLS = 65536;
  function getLine(state, line) {
    const pos = state.bMarks[line] + state.tShift[line];
    const max = state.eMarks[line];
    return state.src.slice(pos, max);
  }
  function escapedSplit(str) {
    const result = [];
    const max = str.length;
    let pos = 0;
    let ch = str.charCodeAt(pos);
    let isEscaped = false;
    let lastPos = 0;
    let current = "";
    while (pos < max) {
      if (ch === 124) {
        if (!isEscaped) {
          result.push(current + str.substring(lastPos, pos));
          current = "";
          lastPos = pos + 1;
        } else {
          current += str.substring(lastPos, pos - 1);
          lastPos = pos;
        }
      }
      isEscaped = ch === 92;
      pos++;
      ch = str.charCodeAt(pos);
    }
    result.push(current + str.substring(lastPos));
    return result;
  }
  function table(state, startLine, endLine, silent) {
    if (startLine + 2 > endLine) {
      return false;
    }
    let nextLine = startLine + 1;
    if (state.sCount[nextLine] < state.blkIndent) {
      return false;
    }
    if (state.sCount[nextLine] - state.blkIndent >= 4) {
      return false;
    }
    let pos = state.bMarks[nextLine] + state.tShift[nextLine];
    if (pos >= state.eMarks[nextLine]) {
      return false;
    }
    const firstCh = state.src.charCodeAt(pos++);
    if (firstCh !== 124 && firstCh !== 45 && firstCh !== 58) {
      return false;
    }
    if (pos >= state.eMarks[nextLine]) {
      return false;
    }
    const secondCh = state.src.charCodeAt(pos++);
    if (secondCh !== 124 && secondCh !== 45 && secondCh !== 58 && !isSpace(secondCh)) {
      return false;
    }
    if (firstCh === 45 && isSpace(secondCh)) {
      return false;
    }
    while (pos < state.eMarks[nextLine]) {
      const ch = state.src.charCodeAt(pos);
      if (ch !== 124 && ch !== 45 && ch !== 58 && !isSpace(ch)) {
        return false;
      }
      pos++;
    }
    let lineText = getLine(state, startLine + 1);
    let columns = lineText.split("|");
    const aligns = [];
    for (let i = 0; i < columns.length; i++) {
      const t = columns[i].trim();
      if (!t) {
        if (i === 0 || i === columns.length - 1) {
          continue;
        } else {
          return false;
        }
      }
      if (!/^:?-+:?$/.test(t)) {
        return false;
      }
      if (t.charCodeAt(t.length - 1) === 58) {
        aligns.push(t.charCodeAt(0) === 58 ? "center" : "right");
      } else if (t.charCodeAt(0) === 58) {
        aligns.push("left");
      } else {
        aligns.push("");
      }
    }
    lineText = getLine(state, startLine).trim();
    if (lineText.indexOf("|") === -1) {
      return false;
    }
    if (state.sCount[startLine] - state.blkIndent >= 4) {
      return false;
    }
    columns = escapedSplit(lineText);
    if (columns.length && columns[0] === "") columns.shift();
    if (columns.length && columns[columns.length - 1] === "") columns.pop();
    const columnCount = columns.length;
    if (columnCount === 0 || columnCount !== aligns.length) {
      return false;
    }
    if (silent) {
      return true;
    }
    const oldParentType = state.parentType;
    state.parentType = "table";
    const terminatorRules = state.md.block.ruler.getRules("blockquote");
    const token_to = state.push("table_open", "table", 1);
    const tableLines = [startLine, 0];
    token_to.map = tableLines;
    const token_tho = state.push("thead_open", "thead", 1);
    token_tho.map = [startLine, startLine + 1];
    const token_htro = state.push("tr_open", "tr", 1);
    token_htro.map = [startLine, startLine + 1];
    for (let i = 0; i < columns.length; i++) {
      const token_ho = state.push("th_open", "th", 1);
      if (aligns[i]) {
        token_ho.attrs = [["style", "text-align:" + aligns[i]]];
      }
      const token_il = state.push("inline", "", 0);
      token_il.content = columns[i].trim();
      token_il.children = [];
      state.push("th_close", "th", -1);
    }
    state.push("tr_close", "tr", -1);
    state.push("thead_close", "thead", -1);
    let tbodyLines;
    let autocompletedCells = 0;
    for (nextLine = startLine + 2; nextLine < endLine; nextLine++) {
      if (state.sCount[nextLine] < state.blkIndent) {
        break;
      }
      let terminate = false;
      for (let i = 0, l = terminatorRules.length; i < l; i++) {
        if (terminatorRules[i](state, nextLine, endLine, true)) {
          terminate = true;
          break;
        }
      }
      if (terminate) {
        break;
      }
      lineText = getLine(state, nextLine).trim();
      if (!lineText) {
        break;
      }
      if (state.sCount[nextLine] - state.blkIndent >= 4) {
        break;
      }
      columns = escapedSplit(lineText);
      if (columns.length && columns[0] === "") columns.shift();
      if (columns.length && columns[columns.length - 1] === "") columns.pop();
      autocompletedCells += columnCount - columns.length;
      if (autocompletedCells > MAX_AUTOCOMPLETED_CELLS) {
        break;
      }
      if (nextLine === startLine + 2) {
        const token_tbo = state.push("tbody_open", "tbody", 1);
        token_tbo.map = tbodyLines = [startLine + 2, 0];
      }
      const token_tro = state.push("tr_open", "tr", 1);
      token_tro.map = [nextLine, nextLine + 1];
      for (let i = 0; i < columnCount; i++) {
        const token_tdo = state.push("td_open", "td", 1);
        if (aligns[i]) {
          token_tdo.attrs = [["style", "text-align:" + aligns[i]]];
        }
        const token_il = state.push("inline", "", 0);
        token_il.content = columns[i] ? columns[i].trim() : "";
        token_il.children = [];
        state.push("td_close", "td", -1);
      }
      state.push("tr_close", "tr", -1);
    }
    if (tbodyLines) {
      state.push("tbody_close", "tbody", -1);
      tbodyLines[1] = nextLine;
    }
    state.push("table_close", "table", -1);
    tableLines[1] = nextLine;
    state.parentType = oldParentType;
    state.line = nextLine;
    return true;
  }

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/rules_block/code.mjs
  function code(state, startLine, endLine) {
    if (state.sCount[startLine] - state.blkIndent < 4) {
      return false;
    }
    let nextLine = startLine + 1;
    let last = nextLine;
    while (nextLine < endLine) {
      if (state.isEmpty(nextLine)) {
        nextLine++;
        continue;
      }
      if (state.sCount[nextLine] - state.blkIndent >= 4) {
        nextLine++;
        last = nextLine;
        continue;
      }
      break;
    }
    state.line = last;
    const token = state.push("code_block", "code", 0);
    token.content = state.getLines(startLine, last, 4 + state.blkIndent, false) + "\n";
    token.map = [startLine, state.line];
    return true;
  }

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/rules_block/fence.mjs
  function fence(state, startLine, endLine, silent) {
    let pos = state.bMarks[startLine] + state.tShift[startLine];
    let max = state.eMarks[startLine];
    if (state.sCount[startLine] - state.blkIndent >= 4) {
      return false;
    }
    if (pos + 3 > max) {
      return false;
    }
    const marker = state.src.charCodeAt(pos);
    if (marker !== 126 && marker !== 96) {
      return false;
    }
    let mem = pos;
    pos = state.skipChars(pos, marker);
    let len = pos - mem;
    if (len < 3) {
      return false;
    }
    const markup = state.src.slice(mem, pos);
    const params = state.src.slice(pos, max);
    if (marker === 96) {
      if (params.indexOf(String.fromCharCode(marker)) >= 0) {
        return false;
      }
    }
    if (silent) {
      return true;
    }
    let nextLine = startLine;
    let haveEndMarker = false;
    for (; ; ) {
      nextLine++;
      if (nextLine >= endLine) {
        break;
      }
      pos = mem = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];
      if (pos < max && state.sCount[nextLine] < state.blkIndent) {
        break;
      }
      if (state.src.charCodeAt(pos) !== marker) {
        continue;
      }
      if (state.sCount[nextLine] - state.blkIndent >= 4) {
        continue;
      }
      pos = state.skipChars(pos, marker);
      if (pos - mem < len) {
        continue;
      }
      pos = state.skipSpaces(pos);
      if (pos < max) {
        continue;
      }
      haveEndMarker = true;
      break;
    }
    len = state.sCount[startLine];
    state.line = nextLine + (haveEndMarker ? 1 : 0);
    const token = state.push("fence", "code", 0);
    token.info = params;
    token.content = state.getLines(startLine + 1, nextLine, len, true);
    token.markup = markup;
    token.map = [startLine, state.line];
    return true;
  }

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/rules_block/blockquote.mjs
  function blockquote(state, startLine, endLine, silent) {
    let pos = state.bMarks[startLine] + state.tShift[startLine];
    let max = state.eMarks[startLine];
    const oldLineMax = state.lineMax;
    if (state.sCount[startLine] - state.blkIndent >= 4) {
      return false;
    }
    if (state.src.charCodeAt(pos) !== 62) {
      return false;
    }
    if (silent) {
      return true;
    }
    const oldBMarks = [];
    const oldBSCount = [];
    const oldSCount = [];
    const oldTShift = [];
    const terminatorRules = state.md.block.ruler.getRules("blockquote");
    const oldParentType = state.parentType;
    state.parentType = "blockquote";
    let lastLineEmpty = false;
    let nextLine;
    for (nextLine = startLine; nextLine < endLine; nextLine++) {
      const isOutdented = state.sCount[nextLine] < state.blkIndent;
      pos = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];
      if (pos >= max) {
        break;
      }
      if (state.src.charCodeAt(pos++) === 62 && !isOutdented) {
        let initial = state.sCount[nextLine] + 1;
        let spaceAfterMarker;
        let adjustTab;
        if (state.src.charCodeAt(pos) === 32) {
          pos++;
          initial++;
          adjustTab = false;
          spaceAfterMarker = true;
        } else if (state.src.charCodeAt(pos) === 9) {
          spaceAfterMarker = true;
          if ((state.bsCount[nextLine] + initial) % 4 === 3) {
            pos++;
            initial++;
            adjustTab = false;
          } else {
            adjustTab = true;
          }
        } else {
          spaceAfterMarker = false;
        }
        let offset = initial;
        oldBMarks.push(state.bMarks[nextLine]);
        state.bMarks[nextLine] = pos;
        while (pos < max) {
          const ch = state.src.charCodeAt(pos);
          if (isSpace(ch)) {
            if (ch === 9) {
              offset += 4 - (offset + state.bsCount[nextLine] + (adjustTab ? 1 : 0)) % 4;
            } else {
              offset++;
            }
          } else {
            break;
          }
          pos++;
        }
        lastLineEmpty = pos >= max;
        oldBSCount.push(state.bsCount[nextLine]);
        state.bsCount[nextLine] = state.sCount[nextLine] + 1 + (spaceAfterMarker ? 1 : 0);
        oldSCount.push(state.sCount[nextLine]);
        state.sCount[nextLine] = offset - initial;
        oldTShift.push(state.tShift[nextLine]);
        state.tShift[nextLine] = pos - state.bMarks[nextLine];
        continue;
      }
      if (lastLineEmpty) {
        break;
      }
      let terminate = false;
      for (let i = 0, l = terminatorRules.length; i < l; i++) {
        if (terminatorRules[i](state, nextLine, endLine, true)) {
          terminate = true;
          break;
        }
      }
      if (terminate) {
        state.lineMax = nextLine;
        if (state.blkIndent !== 0) {
          oldBMarks.push(state.bMarks[nextLine]);
          oldBSCount.push(state.bsCount[nextLine]);
          oldTShift.push(state.tShift[nextLine]);
          oldSCount.push(state.sCount[nextLine]);
          state.sCount[nextLine] -= state.blkIndent;
        }
        break;
      }
      oldBMarks.push(state.bMarks[nextLine]);
      oldBSCount.push(state.bsCount[nextLine]);
      oldTShift.push(state.tShift[nextLine]);
      oldSCount.push(state.sCount[nextLine]);
      state.sCount[nextLine] = -1;
    }
    const oldIndent = state.blkIndent;
    state.blkIndent = 0;
    const token_o = state.push("blockquote_open", "blockquote", 1);
    token_o.markup = ">";
    const lines = [startLine, 0];
    token_o.map = lines;
    state.md.block.tokenize(state, startLine, nextLine);
    const token_c = state.push("blockquote_close", "blockquote", -1);
    token_c.markup = ">";
    state.lineMax = oldLineMax;
    state.parentType = oldParentType;
    lines[1] = state.line;
    for (let i = 0; i < oldTShift.length; i++) {
      state.bMarks[i + startLine] = oldBMarks[i];
      state.tShift[i + startLine] = oldTShift[i];
      state.sCount[i + startLine] = oldSCount[i];
      state.bsCount[i + startLine] = oldBSCount[i];
    }
    state.blkIndent = oldIndent;
    return true;
  }

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/rules_block/hr.mjs
  function hr(state, startLine, endLine, silent) {
    const max = state.eMarks[startLine];
    if (state.sCount[startLine] - state.blkIndent >= 4) {
      return false;
    }
    let pos = state.bMarks[startLine] + state.tShift[startLine];
    const marker = state.src.charCodeAt(pos++);
    if (marker !== 42 && marker !== 45 && marker !== 95) {
      return false;
    }
    let cnt = 1;
    while (pos < max) {
      const ch = state.src.charCodeAt(pos++);
      if (ch !== marker && !isSpace(ch)) {
        return false;
      }
      if (ch === marker) {
        cnt++;
      }
    }
    if (cnt < 3) {
      return false;
    }
    if (silent) {
      return true;
    }
    state.line = startLine + 1;
    const token = state.push("hr", "hr", 0);
    token.map = [startLine, state.line];
    token.markup = Array(cnt + 1).join(String.fromCharCode(marker));
    return true;
  }

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/rules_block/list.mjs
  function skipBulletListMarker(state, startLine) {
    const max = state.eMarks[startLine];
    let pos = state.bMarks[startLine] + state.tShift[startLine];
    const marker = state.src.charCodeAt(pos++);
    if (marker !== 42 && marker !== 45 && marker !== 43) {
      return -1;
    }
    if (pos < max) {
      const ch = state.src.charCodeAt(pos);
      if (!isSpace(ch)) {
        return -1;
      }
    }
    return pos;
  }
  function skipOrderedListMarker(state, startLine) {
    const start = state.bMarks[startLine] + state.tShift[startLine];
    const max = state.eMarks[startLine];
    let pos = start;
    if (pos + 1 >= max) {
      return -1;
    }
    let ch = state.src.charCodeAt(pos++);
    if (ch < 48 || ch > 57) {
      return -1;
    }
    for (; ; ) {
      if (pos >= max) {
        return -1;
      }
      ch = state.src.charCodeAt(pos++);
      if (ch >= 48 && ch <= 57) {
        if (pos - start >= 10) {
          return -1;
        }
        continue;
      }
      if (ch === 41 || ch === 46) {
        break;
      }
      return -1;
    }
    if (pos < max) {
      ch = state.src.charCodeAt(pos);
      if (!isSpace(ch)) {
        return -1;
      }
    }
    return pos;
  }
  function markTightParagraphs(state, idx) {
    const level = state.level + 2;
    for (let i = idx + 2, l = state.tokens.length - 2; i < l; i++) {
      if (state.tokens[i].level === level && state.tokens[i].type === "paragraph_open") {
        state.tokens[i + 2].hidden = true;
        state.tokens[i].hidden = true;
        i += 2;
      }
    }
  }
  function list(state, startLine, endLine, silent) {
    let max, pos, start, token;
    let nextLine = startLine;
    let tight = true;
    if (state.sCount[nextLine] - state.blkIndent >= 4) {
      return false;
    }
    if (state.listIndent >= 0 && state.sCount[nextLine] - state.listIndent >= 4 && state.sCount[nextLine] < state.blkIndent) {
      return false;
    }
    let isTerminatingParagraph = false;
    if (silent && state.parentType === "paragraph") {
      if (state.sCount[nextLine] >= state.blkIndent) {
        isTerminatingParagraph = true;
      }
    }
    let isOrdered;
    let markerValue;
    let posAfterMarker;
    if ((posAfterMarker = skipOrderedListMarker(state, nextLine)) >= 0) {
      isOrdered = true;
      start = state.bMarks[nextLine] + state.tShift[nextLine];
      markerValue = Number(state.src.slice(start, posAfterMarker - 1));
      if (isTerminatingParagraph && markerValue !== 1) return false;
    } else if ((posAfterMarker = skipBulletListMarker(state, nextLine)) >= 0) {
      isOrdered = false;
    } else {
      return false;
    }
    if (isTerminatingParagraph) {
      if (state.skipSpaces(posAfterMarker) >= state.eMarks[nextLine]) return false;
    }
    if (silent) {
      return true;
    }
    const markerCharCode = state.src.charCodeAt(posAfterMarker - 1);
    const listTokIdx = state.tokens.length;
    if (isOrdered) {
      token = state.push("ordered_list_open", "ol", 1);
      if (markerValue !== 1) {
        token.attrs = [["start", markerValue]];
      }
    } else {
      token = state.push("bullet_list_open", "ul", 1);
    }
    const listLines = [nextLine, 0];
    token.map = listLines;
    token.markup = String.fromCharCode(markerCharCode);
    let prevEmptyEnd = false;
    const terminatorRules = state.md.block.ruler.getRules("list");
    const oldParentType = state.parentType;
    state.parentType = "list";
    while (nextLine < endLine) {
      pos = posAfterMarker;
      max = state.eMarks[nextLine];
      const initial = state.sCount[nextLine] + posAfterMarker - (state.bMarks[nextLine] + state.tShift[nextLine]);
      let offset = initial;
      while (pos < max) {
        const ch = state.src.charCodeAt(pos);
        if (ch === 9) {
          offset += 4 - (offset + state.bsCount[nextLine]) % 4;
        } else if (ch === 32) {
          offset++;
        } else {
          break;
        }
        pos++;
      }
      const contentStart = pos;
      let indentAfterMarker;
      if (contentStart >= max) {
        indentAfterMarker = 1;
      } else {
        indentAfterMarker = offset - initial;
      }
      if (indentAfterMarker > 4) {
        indentAfterMarker = 1;
      }
      const indent = initial + indentAfterMarker;
      token = state.push("list_item_open", "li", 1);
      token.markup = String.fromCharCode(markerCharCode);
      const itemLines = [nextLine, 0];
      token.map = itemLines;
      if (isOrdered) {
        token.info = state.src.slice(start, posAfterMarker - 1);
      }
      const oldTight = state.tight;
      const oldTShift = state.tShift[nextLine];
      const oldSCount = state.sCount[nextLine];
      const oldListIndent = state.listIndent;
      state.listIndent = state.blkIndent;
      state.blkIndent = indent;
      state.tight = true;
      state.tShift[nextLine] = contentStart - state.bMarks[nextLine];
      state.sCount[nextLine] = offset;
      if (contentStart >= max && state.isEmpty(nextLine + 1)) {
        state.line = Math.min(state.line + 2, endLine);
      } else {
        state.md.block.tokenize(state, nextLine, endLine, true);
      }
      if (!state.tight || prevEmptyEnd) {
        tight = false;
      }
      prevEmptyEnd = state.line - nextLine > 1 && state.isEmpty(state.line - 1);
      state.blkIndent = state.listIndent;
      state.listIndent = oldListIndent;
      state.tShift[nextLine] = oldTShift;
      state.sCount[nextLine] = oldSCount;
      state.tight = oldTight;
      token = state.push("list_item_close", "li", -1);
      token.markup = String.fromCharCode(markerCharCode);
      nextLine = state.line;
      itemLines[1] = nextLine;
      if (nextLine >= endLine) {
        break;
      }
      if (state.sCount[nextLine] < state.blkIndent) {
        break;
      }
      if (state.sCount[nextLine] - state.blkIndent >= 4) {
        break;
      }
      let terminate = false;
      for (let i = 0, l = terminatorRules.length; i < l; i++) {
        if (terminatorRules[i](state, nextLine, endLine, true)) {
          terminate = true;
          break;
        }
      }
      if (terminate) {
        break;
      }
      if (isOrdered) {
        posAfterMarker = skipOrderedListMarker(state, nextLine);
        if (posAfterMarker < 0) {
          break;
        }
        start = state.bMarks[nextLine] + state.tShift[nextLine];
      } else {
        posAfterMarker = skipBulletListMarker(state, nextLine);
        if (posAfterMarker < 0) {
          break;
        }
      }
      if (markerCharCode !== state.src.charCodeAt(posAfterMarker - 1)) {
        break;
      }
    }
    if (isOrdered) {
      token = state.push("ordered_list_close", "ol", -1);
    } else {
      token = state.push("bullet_list_close", "ul", -1);
    }
    token.markup = String.fromCharCode(markerCharCode);
    listLines[1] = nextLine;
    state.line = nextLine;
    state.parentType = oldParentType;
    if (tight) {
      markTightParagraphs(state, listTokIdx);
    }
    return true;
  }

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/rules_block/reference.mjs
  function reference(state, startLine, _endLine, silent) {
    let pos = state.bMarks[startLine] + state.tShift[startLine];
    let max = state.eMarks[startLine];
    let nextLine = startLine + 1;
    if (state.sCount[startLine] - state.blkIndent >= 4) {
      return false;
    }
    if (state.src.charCodeAt(pos) !== 91) {
      return false;
    }
    function getNextLine(nextLine2) {
      const endLine = state.lineMax;
      if (nextLine2 >= endLine || state.isEmpty(nextLine2)) {
        return null;
      }
      let isContinuation = false;
      if (state.sCount[nextLine2] - state.blkIndent > 3) {
        isContinuation = true;
      }
      if (state.sCount[nextLine2] < 0) {
        isContinuation = true;
      }
      if (!isContinuation) {
        const terminatorRules = state.md.block.ruler.getRules("reference");
        const oldParentType = state.parentType;
        state.parentType = "reference";
        let terminate = false;
        for (let i = 0, l = terminatorRules.length; i < l; i++) {
          if (terminatorRules[i](state, nextLine2, endLine, true)) {
            terminate = true;
            break;
          }
        }
        state.parentType = oldParentType;
        if (terminate) {
          return null;
        }
      }
      const pos2 = state.bMarks[nextLine2] + state.tShift[nextLine2];
      const max2 = state.eMarks[nextLine2];
      return state.src.slice(pos2, max2 + 1);
    }
    let str = state.src.slice(pos, max + 1);
    max = str.length;
    let labelEnd = -1;
    for (pos = 1; pos < max; pos++) {
      const ch = str.charCodeAt(pos);
      if (ch === 91) {
        return false;
      } else if (ch === 93) {
        labelEnd = pos;
        break;
      } else if (ch === 10) {
        const lineContent = getNextLine(nextLine);
        if (lineContent !== null) {
          str += lineContent;
          max = str.length;
          nextLine++;
        }
      } else if (ch === 92) {
        pos++;
        if (pos < max && str.charCodeAt(pos) === 10) {
          const lineContent = getNextLine(nextLine);
          if (lineContent !== null) {
            str += lineContent;
            max = str.length;
            nextLine++;
          }
        }
      }
    }
    if (labelEnd < 0 || str.charCodeAt(labelEnd + 1) !== 58) {
      return false;
    }
    for (pos = labelEnd + 2; pos < max; pos++) {
      const ch = str.charCodeAt(pos);
      if (ch === 10) {
        const lineContent = getNextLine(nextLine);
        if (lineContent !== null) {
          str += lineContent;
          max = str.length;
          nextLine++;
        }
      } else if (isSpace(ch)) {
      } else {
        break;
      }
    }
    const destRes = state.md.helpers.parseLinkDestination(str, pos, max);
    if (!destRes.ok) {
      return false;
    }
    const href = state.md.normalizeLink(destRes.str);
    if (!state.md.validateLink(href)) {
      return false;
    }
    pos = destRes.pos;
    const destEndPos = pos;
    const destEndLineNo = nextLine;
    const start = pos;
    for (; pos < max; pos++) {
      const ch = str.charCodeAt(pos);
      if (ch === 10) {
        const lineContent = getNextLine(nextLine);
        if (lineContent !== null) {
          str += lineContent;
          max = str.length;
          nextLine++;
        }
      } else if (isSpace(ch)) {
      } else {
        break;
      }
    }
    let titleRes = state.md.helpers.parseLinkTitle(str, pos, max);
    while (titleRes.can_continue) {
      const lineContent = getNextLine(nextLine);
      if (lineContent === null) break;
      str += lineContent;
      pos = max;
      max = str.length;
      nextLine++;
      titleRes = state.md.helpers.parseLinkTitle(str, pos, max, titleRes);
    }
    let title;
    if (pos < max && start !== pos && titleRes.ok) {
      title = titleRes.str;
      pos = titleRes.pos;
    } else {
      title = "";
      pos = destEndPos;
      nextLine = destEndLineNo;
    }
    while (pos < max) {
      const ch = str.charCodeAt(pos);
      if (!isSpace(ch)) {
        break;
      }
      pos++;
    }
    if (pos < max && str.charCodeAt(pos) !== 10) {
      if (title) {
        title = "";
        pos = destEndPos;
        nextLine = destEndLineNo;
        while (pos < max) {
          const ch = str.charCodeAt(pos);
          if (!isSpace(ch)) {
            break;
          }
          pos++;
        }
      }
    }
    if (pos < max && str.charCodeAt(pos) !== 10) {
      return false;
    }
    const label = normalizeReference(str.slice(1, labelEnd));
    if (!label) {
      return false;
    }
    if (silent) {
      return true;
    }
    if (typeof state.env.references === "undefined") {
      state.env.references = {};
    }
    if (typeof state.env.references[label] === "undefined") {
      state.env.references[label] = { title, href };
    }
    state.line = nextLine;
    return true;
  }

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/common/html_blocks.mjs
  var html_blocks_default = [
    "address",
    "article",
    "aside",
    "base",
    "basefont",
    "blockquote",
    "body",
    "caption",
    "center",
    "col",
    "colgroup",
    "dd",
    "details",
    "dialog",
    "dir",
    "div",
    "dl",
    "dt",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "frame",
    "frameset",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hr",
    "html",
    "iframe",
    "legend",
    "li",
    "link",
    "main",
    "menu",
    "menuitem",
    "nav",
    "noframes",
    "ol",
    "optgroup",
    "option",
    "p",
    "param",
    "search",
    "section",
    "summary",
    "table",
    "tbody",
    "td",
    "tfoot",
    "th",
    "thead",
    "title",
    "tr",
    "track",
    "ul"
  ];

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/common/html_re.mjs
  var attr_name = "[a-zA-Z_:][a-zA-Z0-9:._-]*";
  var unquoted = "[^\"'=<>`\\x00-\\x20]+";
  var single_quoted = "'[^']*'";
  var double_quoted = '"[^"]*"';
  var attr_value = "(?:" + unquoted + "|" + single_quoted + "|" + double_quoted + ")";
  var attribute = "(?:\\s+" + attr_name + "(?:\\s*=\\s*" + attr_value + ")?)";
  var open_tag = "<[A-Za-z][A-Za-z0-9\\-]*" + attribute + "*\\s*\\/?>";
  var close_tag = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>";
  var comment = "<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->";
  var processing = "<[?][\\s\\S]*?[?]>";
  var declaration = "<![A-Za-z][^>]*>";
  var cdata = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>";
  var HTML_TAG_RE = new RegExp("^(?:" + open_tag + "|" + close_tag + "|" + comment + "|" + processing + "|" + declaration + "|" + cdata + ")");
  var HTML_OPEN_CLOSE_TAG_RE = new RegExp("^(?:" + open_tag + "|" + close_tag + ")");

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/rules_block/html_block.mjs
  var HTML_SEQUENCES = [
    [/^<(script|pre|style|textarea)(?=(\s|>|$))/i, /<\/(script|pre|style|textarea)>/i, true],
    [/^<!--/, /-->/, true],
    [/^<\?/, /\?>/, true],
    [/^<![A-Z]/, />/, true],
    [/^<!\[CDATA\[/, /\]\]>/, true],
    [new RegExp("^</?(" + html_blocks_default.join("|") + ")(?=(\\s|/?>|$))", "i"), /^$/, true],
    [new RegExp(HTML_OPEN_CLOSE_TAG_RE.source + "\\s*$"), /^$/, false]
  ];
  function html_block(state, startLine, endLine, silent) {
    let pos = state.bMarks[startLine] + state.tShift[startLine];
    let max = state.eMarks[startLine];
    if (state.sCount[startLine] - state.blkIndent >= 4) {
      return false;
    }
    if (!state.md.options.html) {
      return false;
    }
    if (state.src.charCodeAt(pos) !== 60) {
      return false;
    }
    let lineText = state.src.slice(pos, max);
    let i = 0;
    for (; i < HTML_SEQUENCES.length; i++) {
      if (HTML_SEQUENCES[i][0].test(lineText)) {
        break;
      }
    }
    if (i === HTML_SEQUENCES.length) {
      return false;
    }
    if (silent) {
      return HTML_SEQUENCES[i][2];
    }
    let nextLine = startLine + 1;
    if (!HTML_SEQUENCES[i][1].test(lineText)) {
      for (; nextLine < endLine; nextLine++) {
        if (state.sCount[nextLine] < state.blkIndent) {
          break;
        }
        pos = state.bMarks[nextLine] + state.tShift[nextLine];
        max = state.eMarks[nextLine];
        lineText = state.src.slice(pos, max);
        if (HTML_SEQUENCES[i][1].test(lineText)) {
          if (lineText.length !== 0) {
            nextLine++;
          }
          break;
        }
      }
    }
    state.line = nextLine;
    const token = state.push("html_block", "", 0);
    token.map = [startLine, nextLine];
    token.content = state.getLines(startLine, nextLine, state.blkIndent, true);
    return true;
  }

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/rules_block/heading.mjs
  function heading(state, startLine, endLine, silent) {
    let pos = state.bMarks[startLine] + state.tShift[startLine];
    let max = state.eMarks[startLine];
    if (state.sCount[startLine] - state.blkIndent >= 4) {
      return false;
    }
    let ch = state.src.charCodeAt(pos);
    if (ch !== 35 || pos >= max) {
      return false;
    }
    let level = 1;
    ch = state.src.charCodeAt(++pos);
    while (ch === 35 && pos < max && level <= 6) {
      level++;
      ch = state.src.charCodeAt(++pos);
    }
    if (level > 6 || pos < max && !isSpace(ch)) {
      return false;
    }
    if (silent) {
      return true;
    }
    max = state.skipSpacesBack(max, pos);
    const tmp = state.skipCharsBack(max, 35, pos);
    if (tmp > pos && isSpace(state.src.charCodeAt(tmp - 1))) {
      max = tmp;
    }
    state.line = startLine + 1;
    const token_o = state.push("heading_open", "h" + String(level), 1);
    token_o.markup = "########".slice(0, level);
    token_o.map = [startLine, state.line];
    const token_i = state.push("inline", "", 0);
    token_i.content = state.src.slice(pos, max).trim();
    token_i.map = [startLine, state.line];
    token_i.children = [];
    const token_c = state.push("heading_close", "h" + String(level), -1);
    token_c.markup = "########".slice(0, level);
    return true;
  }

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/rules_block/lheading.mjs
  function lheading(state, startLine, endLine) {
    const terminatorRules = state.md.block.ruler.getRules("paragraph");
    if (state.sCount[startLine] - state.blkIndent >= 4) {
      return false;
    }
    const oldParentType = state.parentType;
    state.parentType = "paragraph";
    let level = 0;
    let marker;
    let nextLine = startLine + 1;
    for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
      if (state.sCount[nextLine] - state.blkIndent > 3) {
        continue;
      }
      if (state.sCount[nextLine] >= state.blkIndent) {
        let pos = state.bMarks[nextLine] + state.tShift[nextLine];
        const max = state.eMarks[nextLine];
        if (pos < max) {
          marker = state.src.charCodeAt(pos);
          if (marker === 45 || marker === 61) {
            pos = state.skipChars(pos, marker);
            pos = state.skipSpaces(pos);
            if (pos >= max) {
              level = marker === 61 ? 1 : 2;
              break;
            }
          }
        }
      }
      if (state.sCount[nextLine] < 0) {
        continue;
      }
      let terminate = false;
      for (let i = 0, l = terminatorRules.length; i < l; i++) {
        if (terminatorRules[i](state, nextLine, endLine, true)) {
          terminate = true;
          break;
        }
      }
      if (terminate) {
        break;
      }
    }
    if (!level) {
      return false;
    }
    const content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
    state.line = nextLine + 1;
    const token_o = state.push("heading_open", "h" + String(level), 1);
    token_o.markup = String.fromCharCode(marker);
    token_o.map = [startLine, state.line];
    const token_i = state.push("inline", "", 0);
    token_i.content = content;
    token_i.map = [startLine, state.line - 1];
    token_i.children = [];
    const token_c = state.push("heading_close", "h" + String(level), -1);
    token_c.markup = String.fromCharCode(marker);
    state.parentType = oldParentType;
    return true;
  }

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/rules_block/paragraph.mjs
  function paragraph(state, startLine, endLine) {
    const terminatorRules = state.md.block.ruler.getRules("paragraph");
    const oldParentType = state.parentType;
    let nextLine = startLine + 1;
    state.parentType = "paragraph";
    for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
      if (state.sCount[nextLine] - state.blkIndent > 3) {
        continue;
      }
      if (state.sCount[nextLine] < 0) {
        continue;
      }
      let terminate = false;
      for (let i = 0, l = terminatorRules.length; i < l; i++) {
        if (terminatorRules[i](state, nextLine, endLine, true)) {
          terminate = true;
          break;
        }
      }
      if (terminate) {
        break;
      }
    }
    const content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
    state.line = nextLine;
    const token_o = state.push("paragraph_open", "p", 1);
    token_o.map = [startLine, state.line];
    const token_i = state.push("inline", "", 0);
    token_i.content = content;
    token_i.map = [startLine, state.line];
    token_i.children = [];
    state.push("paragraph_close", "p", -1);
    state.parentType = oldParentType;
    return true;
  }

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/parser_block.mjs
  var _rules2 = [
    // First 2 params - rule name & source. Secondary array - list of rules,
    // which can be terminated by this one.
    ["table", table, ["paragraph", "reference"]],
    ["code", code],
    ["fence", fence, ["paragraph", "reference", "blockquote", "list"]],
    ["blockquote", blockquote, ["paragraph", "reference", "blockquote", "list"]],
    ["hr", hr, ["paragraph", "reference", "blockquote", "list"]],
    ["list", list, ["paragraph", "reference", "blockquote"]],
    ["reference", reference],
    ["html_block", html_block, ["paragraph", "reference", "blockquote"]],
    ["heading", heading, ["paragraph", "reference", "blockquote"]],
    ["lheading", lheading],
    ["paragraph", paragraph]
  ];
  function ParserBlock() {
    this.ruler = new ruler_default();
    for (let i = 0; i < _rules2.length; i++) {
      this.ruler.push(_rules2[i][0], _rules2[i][1], { alt: (_rules2[i][2] || []).slice() });
    }
  }
  ParserBlock.prototype.tokenize = function(state, startLine, endLine) {
    const rules = this.ruler.getRules("");
    const len = rules.length;
    const maxNesting = state.md.options.maxNesting;
    let line = startLine;
    let hasEmptyLines = false;
    while (line < endLine) {
      state.line = line = state.skipEmptyLines(line);
      if (line >= endLine) {
        break;
      }
      if (state.sCount[line] < state.blkIndent) {
        break;
      }
      if (state.level >= maxNesting) {
        state.line = endLine;
        break;
      }
      const prevLine = state.line;
      let ok = false;
      for (let i = 0; i < len; i++) {
        ok = rules[i](state, line, endLine, false);
        if (ok) {
          if (prevLine >= state.line) {
            throw new Error("block rule didn't increment state.line");
          }
          break;
        }
      }
      if (!ok) throw new Error("none of the block rules matched");
      state.tight = !hasEmptyLines;
      if (state.isEmpty(state.line - 1)) {
        hasEmptyLines = true;
      }
      line = state.line;
      if (line < endLine && state.isEmpty(line)) {
        hasEmptyLines = true;
        line++;
        state.line = line;
      }
    }
  };
  ParserBlock.prototype.parse = function(src, md2, env, outTokens) {
    if (!src) {
      return;
    }
    const state = new this.State(src, md2, env, outTokens);
    this.tokenize(state, state.line, state.lineMax);
  };
  ParserBlock.prototype.State = state_block_default;
  var parser_block_default = ParserBlock;

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/rules_inline/state_inline.mjs
  function StateInline(src, md2, env, outTokens) {
    this.src = src;
    this.env = env;
    this.md = md2;
    this.tokens = outTokens;
    this.tokens_meta = Array(outTokens.length);
    this.pos = 0;
    this.posMax = this.src.length;
    this.level = 0;
    this.pending = "";
    this.pendingLevel = 0;
    this.cache = {};
    this.delimiters = [];
    this._prev_delimiters = [];
    this.backticks = {};
    this.backticksScanned = false;
    this.linkLevel = 0;
  }
  StateInline.prototype.pushPending = function() {
    const token = new token_default("text", "", 0);
    token.content = this.pending;
    token.level = this.pendingLevel;
    this.tokens.push(token);
    this.pending = "";
    return token;
  };
  StateInline.prototype.push = function(type, tag, nesting) {
    if (this.pending) {
      this.pushPending();
    }
    const token = new token_default(type, tag, nesting);
    let token_meta = null;
    if (nesting < 0) {
      this.level--;
      this.delimiters = this._prev_delimiters.pop();
    }
    token.level = this.level;
    if (nesting > 0) {
      this.level++;
      this._prev_delimiters.push(this.delimiters);
      this.delimiters = [];
      token_meta = { delimiters: this.delimiters };
    }
    this.pendingLevel = this.level;
    this.tokens.push(token);
    this.tokens_meta.push(token_meta);
    return token;
  };
  StateInline.prototype.scanDelims = function(start, canSplitWord) {
    const max = this.posMax;
    const marker = this.src.charCodeAt(start);
    const lastChar = start > 0 ? this.src.charCodeAt(start - 1) : 32;
    let pos = start;
    while (pos < max && this.src.charCodeAt(pos) === marker) {
      pos++;
    }
    const count = pos - start;
    const nextChar = pos < max ? this.src.charCodeAt(pos) : 32;
    const isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
    const isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));
    const isLastWhiteSpace = isWhiteSpace(lastChar);
    const isNextWhiteSpace = isWhiteSpace(nextChar);
    const left_flanking = !isNextWhiteSpace && (!isNextPunctChar || isLastWhiteSpace || isLastPunctChar);
    const right_flanking = !isLastWhiteSpace && (!isLastPunctChar || isNextWhiteSpace || isNextPunctChar);
    const can_open = left_flanking && (canSplitWord || !right_flanking || isLastPunctChar);
    const can_close = right_flanking && (canSplitWord || !left_flanking || isNextPunctChar);
    return { can_open, can_close, length: count };
  };
  StateInline.prototype.Token = token_default;
  var state_inline_default = StateInline;

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/rules_inline/text.mjs
  function isTerminatorChar(ch) {
    switch (ch) {
      case 10:
      case 33:
      case 35:
      case 36:
      case 37:
      case 38:
      case 42:
      case 43:
      case 45:
      case 58:
      case 60:
      case 61:
      case 62:
      case 64:
      case 91:
      case 92:
      case 93:
      case 94:
      case 95:
      case 96:
      case 123:
      case 125:
      case 126:
        return true;
      default:
        return false;
    }
  }
  function text(state, silent) {
    let pos = state.pos;
    while (pos < state.posMax && !isTerminatorChar(state.src.charCodeAt(pos))) {
      pos++;
    }
    if (pos === state.pos) {
      return false;
    }
    if (!silent) {
      state.pending += state.src.slice(state.pos, pos);
    }
    state.pos = pos;
    return true;
  }

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/rules_inline/linkify.mjs
  var SCHEME_RE = /(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;
  function linkify2(state, silent) {
    if (!state.md.options.linkify) return false;
    if (state.linkLevel > 0) return false;
    const pos = state.pos;
    const max = state.posMax;
    if (pos + 3 > max) return false;
    if (state.src.charCodeAt(pos) !== 58) return false;
    if (state.src.charCodeAt(pos + 1) !== 47) return false;
    if (state.src.charCodeAt(pos + 2) !== 47) return false;
    const match2 = state.pending.match(SCHEME_RE);
    if (!match2) return false;
    const proto = match2[1];
    const link2 = state.md.linkify.matchAtStart(state.src.slice(pos - proto.length));
    if (!link2) return false;
    let url = link2.url;
    if (url.length <= proto.length) return false;
    url = url.replace(/\*+$/, "");
    const fullUrl = state.md.normalizeLink(url);
    if (!state.md.validateLink(fullUrl)) return false;
    if (!silent) {
      state.pending = state.pending.slice(0, -proto.length);
      const token_o = state.push("link_open", "a", 1);
      token_o.attrs = [["href", fullUrl]];
      token_o.markup = "linkify";
      token_o.info = "auto";
      const token_t = state.push("text", "", 0);
      token_t.content = state.md.normalizeLinkText(url);
      const token_c = state.push("link_close", "a", -1);
      token_c.markup = "linkify";
      token_c.info = "auto";
    }
    state.pos += url.length - proto.length;
    return true;
  }

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/rules_inline/newline.mjs
  function newline(state, silent) {
    let pos = state.pos;
    if (state.src.charCodeAt(pos) !== 10) {
      return false;
    }
    const pmax = state.pending.length - 1;
    const max = state.posMax;
    if (!silent) {
      if (pmax >= 0 && state.pending.charCodeAt(pmax) === 32) {
        if (pmax >= 1 && state.pending.charCodeAt(pmax - 1) === 32) {
          let ws = pmax - 1;
          while (ws >= 1 && state.pending.charCodeAt(ws - 1) === 32) ws--;
          state.pending = state.pending.slice(0, ws);
          state.push("hardbreak", "br", 0);
        } else {
          state.pending = state.pending.slice(0, -1);
          state.push("softbreak", "br", 0);
        }
      } else {
        state.push("softbreak", "br", 0);
      }
    }
    pos++;
    while (pos < max && isSpace(state.src.charCodeAt(pos))) {
      pos++;
    }
    state.pos = pos;
    return true;
  }

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/rules_inline/escape.mjs
  var ESCAPED = [];
  for (let i = 0; i < 256; i++) {
    ESCAPED.push(0);
  }
  "\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(ch) {
    ESCAPED[ch.charCodeAt(0)] = 1;
  });
  function escape2(state, silent) {
    let pos = state.pos;
    const max = state.posMax;
    if (state.src.charCodeAt(pos) !== 92) return false;
    pos++;
    if (pos >= max) return false;
    let ch1 = state.src.charCodeAt(pos);
    if (ch1 === 10) {
      if (!silent) {
        state.push("hardbreak", "br", 0);
      }
      pos++;
      while (pos < max) {
        ch1 = state.src.charCodeAt(pos);
        if (!isSpace(ch1)) break;
        pos++;
      }
      state.pos = pos;
      return true;
    }
    let escapedStr = state.src[pos];
    if (ch1 >= 55296 && ch1 <= 56319 && pos + 1 < max) {
      const ch2 = state.src.charCodeAt(pos + 1);
      if (ch2 >= 56320 && ch2 <= 57343) {
        escapedStr += state.src[pos + 1];
        pos++;
      }
    }
    const origStr = "\\" + escapedStr;
    if (!silent) {
      const token = state.push("text_special", "", 0);
      if (ch1 < 256 && ESCAPED[ch1] !== 0) {
        token.content = escapedStr;
      } else {
        token.content = origStr;
      }
      token.markup = origStr;
      token.info = "escape";
    }
    state.pos = pos + 1;
    return true;
  }

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/rules_inline/backticks.mjs
  function backtick(state, silent) {
    let pos = state.pos;
    const ch = state.src.charCodeAt(pos);
    if (ch !== 96) {
      return false;
    }
    const start = pos;
    pos++;
    const max = state.posMax;
    while (pos < max && state.src.charCodeAt(pos) === 96) {
      pos++;
    }
    const marker = state.src.slice(start, pos);
    const openerLength = marker.length;
    if (state.backticksScanned && (state.backticks[openerLength] || 0) <= start) {
      if (!silent) state.pending += marker;
      state.pos += openerLength;
      return true;
    }
    let matchEnd = pos;
    let matchStart;
    while ((matchStart = state.src.indexOf("`", matchEnd)) !== -1) {
      matchEnd = matchStart + 1;
      while (matchEnd < max && state.src.charCodeAt(matchEnd) === 96) {
        matchEnd++;
      }
      const closerLength = matchEnd - matchStart;
      if (closerLength === openerLength) {
        if (!silent) {
          const token = state.push("code_inline", "code", 0);
          token.markup = marker;
          token.content = state.src.slice(pos, matchStart).replace(/\n/g, " ").replace(/^ (.+) $/, "$1");
        }
        state.pos = matchEnd;
        return true;
      }
      state.backticks[closerLength] = matchStart;
    }
    state.backticksScanned = true;
    if (!silent) state.pending += marker;
    state.pos += openerLength;
    return true;
  }

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/rules_inline/strikethrough.mjs
  function strikethrough_tokenize(state, silent) {
    const start = state.pos;
    const marker = state.src.charCodeAt(start);
    if (silent) {
      return false;
    }
    if (marker !== 126) {
      return false;
    }
    const scanned = state.scanDelims(state.pos, true);
    let len = scanned.length;
    const ch = String.fromCharCode(marker);
    if (len < 2) {
      return false;
    }
    let token;
    if (len % 2) {
      token = state.push("text", "", 0);
      token.content = ch;
      len--;
    }
    for (let i = 0; i < len; i += 2) {
      token = state.push("text", "", 0);
      token.content = ch + ch;
      state.delimiters.push({
        marker,
        length: 0,
        // disable "rule of 3" length checks meant for emphasis
        token: state.tokens.length - 1,
        end: -1,
        open: scanned.can_open,
        close: scanned.can_close
      });
    }
    state.pos += scanned.length;
    return true;
  }
  function postProcess(state, delimiters) {
    let token;
    const loneMarkers = [];
    const max = delimiters.length;
    for (let i = 0; i < max; i++) {
      const startDelim = delimiters[i];
      if (startDelim.marker !== 126) {
        continue;
      }
      if (startDelim.end === -1) {
        continue;
      }
      const endDelim = delimiters[startDelim.end];
      token = state.tokens[startDelim.token];
      token.type = "s_open";
      token.tag = "s";
      token.nesting = 1;
      token.markup = "~~";
      token.content = "";
      token = state.tokens[endDelim.token];
      token.type = "s_close";
      token.tag = "s";
      token.nesting = -1;
      token.markup = "~~";
      token.content = "";
      if (state.tokens[endDelim.token - 1].type === "text" && state.tokens[endDelim.token - 1].content === "~") {
        loneMarkers.push(endDelim.token - 1);
      }
    }
    while (loneMarkers.length) {
      const i = loneMarkers.pop();
      let j = i + 1;
      while (j < state.tokens.length && state.tokens[j].type === "s_close") {
        j++;
      }
      j--;
      if (i !== j) {
        token = state.tokens[j];
        state.tokens[j] = state.tokens[i];
        state.tokens[i] = token;
      }
    }
  }
  function strikethrough_postProcess(state) {
    const tokens_meta = state.tokens_meta;
    const max = state.tokens_meta.length;
    postProcess(state, state.delimiters);
    for (let curr = 0; curr < max; curr++) {
      if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
        postProcess(state, tokens_meta[curr].delimiters);
      }
    }
  }
  var strikethrough_default = {
    tokenize: strikethrough_tokenize,
    postProcess: strikethrough_postProcess
  };

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/rules_inline/emphasis.mjs
  function emphasis_tokenize(state, silent) {
    const start = state.pos;
    const marker = state.src.charCodeAt(start);
    if (silent) {
      return false;
    }
    if (marker !== 95 && marker !== 42) {
      return false;
    }
    const scanned = state.scanDelims(state.pos, marker === 42);
    for (let i = 0; i < scanned.length; i++) {
      const token = state.push("text", "", 0);
      token.content = String.fromCharCode(marker);
      state.delimiters.push({
        // Char code of the starting marker (number).
        //
        marker,
        // Total length of these series of delimiters.
        //
        length: scanned.length,
        // A position of the token this delimiter corresponds to.
        //
        token: state.tokens.length - 1,
        // If this delimiter is matched as a valid opener, `end` will be
        // equal to its position, otherwise it's `-1`.
        //
        end: -1,
        // Boolean flags that determine if this delimiter could open or close
        // an emphasis.
        //
        open: scanned.can_open,
        close: scanned.can_close
      });
    }
    state.pos += scanned.length;
    return true;
  }
  function postProcess2(state, delimiters) {
    const max = delimiters.length;
    for (let i = max - 1; i >= 0; i--) {
      const startDelim = delimiters[i];
      if (startDelim.marker !== 95 && startDelim.marker !== 42) {
        continue;
      }
      if (startDelim.end === -1) {
        continue;
      }
      const endDelim = delimiters[startDelim.end];
      const isStrong = i > 0 && delimiters[i - 1].end === startDelim.end + 1 && // check that first two markers match and adjacent
      delimiters[i - 1].marker === startDelim.marker && delimiters[i - 1].token === startDelim.token - 1 && // check that last two markers are adjacent (we can safely assume they match)
      delimiters[startDelim.end + 1].token === endDelim.token + 1;
      const ch = String.fromCharCode(startDelim.marker);
      const token_o = state.tokens[startDelim.token];
      token_o.type = isStrong ? "strong_open" : "em_open";
      token_o.tag = isStrong ? "strong" : "em";
      token_o.nesting = 1;
      token_o.markup = isStrong ? ch + ch : ch;
      token_o.content = "";
      const token_c = state.tokens[endDelim.token];
      token_c.type = isStrong ? "strong_close" : "em_close";
      token_c.tag = isStrong ? "strong" : "em";
      token_c.nesting = -1;
      token_c.markup = isStrong ? ch + ch : ch;
      token_c.content = "";
      if (isStrong) {
        state.tokens[delimiters[i - 1].token].content = "";
        state.tokens[delimiters[startDelim.end + 1].token].content = "";
        i--;
      }
    }
  }
  function emphasis_post_process(state) {
    const tokens_meta = state.tokens_meta;
    const max = state.tokens_meta.length;
    postProcess2(state, state.delimiters);
    for (let curr = 0; curr < max; curr++) {
      if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
        postProcess2(state, tokens_meta[curr].delimiters);
      }
    }
  }
  var emphasis_default = {
    tokenize: emphasis_tokenize,
    postProcess: emphasis_post_process
  };

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/rules_inline/link.mjs
  function link(state, silent) {
    let code3, label, res, ref;
    let href = "";
    let title = "";
    let start = state.pos;
    let parseReference = true;
    if (state.src.charCodeAt(state.pos) !== 91) {
      return false;
    }
    const oldPos = state.pos;
    const max = state.posMax;
    const labelStart = state.pos + 1;
    const labelEnd = state.md.helpers.parseLinkLabel(state, state.pos, true);
    if (labelEnd < 0) {
      return false;
    }
    let pos = labelEnd + 1;
    if (pos < max && state.src.charCodeAt(pos) === 40) {
      parseReference = false;
      pos++;
      for (; pos < max; pos++) {
        code3 = state.src.charCodeAt(pos);
        if (!isSpace(code3) && code3 !== 10) {
          break;
        }
      }
      if (pos >= max) {
        return false;
      }
      start = pos;
      res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
      if (res.ok) {
        href = state.md.normalizeLink(res.str);
        if (state.md.validateLink(href)) {
          pos = res.pos;
        } else {
          href = "";
        }
        start = pos;
        for (; pos < max; pos++) {
          code3 = state.src.charCodeAt(pos);
          if (!isSpace(code3) && code3 !== 10) {
            break;
          }
        }
        res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
        if (pos < max && start !== pos && res.ok) {
          title = res.str;
          pos = res.pos;
          for (; pos < max; pos++) {
            code3 = state.src.charCodeAt(pos);
            if (!isSpace(code3) && code3 !== 10) {
              break;
            }
          }
        }
      }
      if (pos >= max || state.src.charCodeAt(pos) !== 41) {
        parseReference = true;
      }
      pos++;
    }
    if (parseReference) {
      if (typeof state.env.references === "undefined") {
        return false;
      }
      if (pos < max && state.src.charCodeAt(pos) === 91) {
        start = pos + 1;
        pos = state.md.helpers.parseLinkLabel(state, pos);
        if (pos >= 0) {
          label = state.src.slice(start, pos++);
        } else {
          pos = labelEnd + 1;
        }
      } else {
        pos = labelEnd + 1;
      }
      if (!label) {
        label = state.src.slice(labelStart, labelEnd);
      }
      ref = state.env.references[normalizeReference(label)];
      if (!ref) {
        state.pos = oldPos;
        return false;
      }
      href = ref.href;
      title = ref.title;
    }
    if (!silent) {
      state.pos = labelStart;
      state.posMax = labelEnd;
      const token_o = state.push("link_open", "a", 1);
      const attrs = [["href", href]];
      token_o.attrs = attrs;
      if (title) {
        attrs.push(["title", title]);
      }
      state.linkLevel++;
      state.md.inline.tokenize(state);
      state.linkLevel--;
      state.push("link_close", "a", -1);
    }
    state.pos = pos;
    state.posMax = max;
    return true;
  }

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/rules_inline/image.mjs
  function image(state, silent) {
    let code3, content, label, pos, ref, res, title, start;
    let href = "";
    const oldPos = state.pos;
    const max = state.posMax;
    if (state.src.charCodeAt(state.pos) !== 33) {
      return false;
    }
    if (state.src.charCodeAt(state.pos + 1) !== 91) {
      return false;
    }
    const labelStart = state.pos + 2;
    const labelEnd = state.md.helpers.parseLinkLabel(state, state.pos + 1, false);
    if (labelEnd < 0) {
      return false;
    }
    pos = labelEnd + 1;
    if (pos < max && state.src.charCodeAt(pos) === 40) {
      pos++;
      for (; pos < max; pos++) {
        code3 = state.src.charCodeAt(pos);
        if (!isSpace(code3) && code3 !== 10) {
          break;
        }
      }
      if (pos >= max) {
        return false;
      }
      start = pos;
      res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
      if (res.ok) {
        href = state.md.normalizeLink(res.str);
        if (state.md.validateLink(href)) {
          pos = res.pos;
        } else {
          href = "";
        }
      }
      start = pos;
      for (; pos < max; pos++) {
        code3 = state.src.charCodeAt(pos);
        if (!isSpace(code3) && code3 !== 10) {
          break;
        }
      }
      res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
      if (pos < max && start !== pos && res.ok) {
        title = res.str;
        pos = res.pos;
        for (; pos < max; pos++) {
          code3 = state.src.charCodeAt(pos);
          if (!isSpace(code3) && code3 !== 10) {
            break;
          }
        }
      } else {
        title = "";
      }
      if (pos >= max || state.src.charCodeAt(pos) !== 41) {
        state.pos = oldPos;
        return false;
      }
      pos++;
    } else {
      if (typeof state.env.references === "undefined") {
        return false;
      }
      if (pos < max && state.src.charCodeAt(pos) === 91) {
        start = pos + 1;
        pos = state.md.helpers.parseLinkLabel(state, pos);
        if (pos >= 0) {
          label = state.src.slice(start, pos++);
        } else {
          pos = labelEnd + 1;
        }
      } else {
        pos = labelEnd + 1;
      }
      if (!label) {
        label = state.src.slice(labelStart, labelEnd);
      }
      ref = state.env.references[normalizeReference(label)];
      if (!ref) {
        state.pos = oldPos;
        return false;
      }
      href = ref.href;
      title = ref.title;
    }
    if (!silent) {
      content = state.src.slice(labelStart, labelEnd);
      const tokens = [];
      state.md.inline.parse(
        content,
        state.md,
        state.env,
        tokens
      );
      const token = state.push("image", "img", 0);
      const attrs = [["src", href], ["alt", ""]];
      token.attrs = attrs;
      token.children = tokens;
      token.content = content;
      if (title) {
        attrs.push(["title", title]);
      }
    }
    state.pos = pos;
    state.posMax = max;
    return true;
  }

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/rules_inline/autolink.mjs
  var EMAIL_RE = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/;
  var AUTOLINK_RE = /^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;
  function autolink(state, silent) {
    let pos = state.pos;
    if (state.src.charCodeAt(pos) !== 60) {
      return false;
    }
    const start = state.pos;
    const max = state.posMax;
    for (; ; ) {
      if (++pos >= max) return false;
      const ch = state.src.charCodeAt(pos);
      if (ch === 60) return false;
      if (ch === 62) break;
    }
    const url = state.src.slice(start + 1, pos);
    if (AUTOLINK_RE.test(url)) {
      const fullUrl = state.md.normalizeLink(url);
      if (!state.md.validateLink(fullUrl)) {
        return false;
      }
      if (!silent) {
        const token_o = state.push("link_open", "a", 1);
        token_o.attrs = [["href", fullUrl]];
        token_o.markup = "autolink";
        token_o.info = "auto";
        const token_t = state.push("text", "", 0);
        token_t.content = state.md.normalizeLinkText(url);
        const token_c = state.push("link_close", "a", -1);
        token_c.markup = "autolink";
        token_c.info = "auto";
      }
      state.pos += url.length + 2;
      return true;
    }
    if (EMAIL_RE.test(url)) {
      const fullUrl = state.md.normalizeLink("mailto:" + url);
      if (!state.md.validateLink(fullUrl)) {
        return false;
      }
      if (!silent) {
        const token_o = state.push("link_open", "a", 1);
        token_o.attrs = [["href", fullUrl]];
        token_o.markup = "autolink";
        token_o.info = "auto";
        const token_t = state.push("text", "", 0);
        token_t.content = state.md.normalizeLinkText(url);
        const token_c = state.push("link_close", "a", -1);
        token_c.markup = "autolink";
        token_c.info = "auto";
      }
      state.pos += url.length + 2;
      return true;
    }
    return false;
  }

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/rules_inline/html_inline.mjs
  function isLinkOpen2(str) {
    return /^<a[>\s]/i.test(str);
  }
  function isLinkClose2(str) {
    return /^<\/a\s*>/i.test(str);
  }
  function isLetter(ch) {
    const lc = ch | 32;
    return lc >= 97 && lc <= 122;
  }
  function html_inline(state, silent) {
    if (!state.md.options.html) {
      return false;
    }
    const max = state.posMax;
    const pos = state.pos;
    if (state.src.charCodeAt(pos) !== 60 || pos + 2 >= max) {
      return false;
    }
    const ch = state.src.charCodeAt(pos + 1);
    if (ch !== 33 && ch !== 63 && ch !== 47 && !isLetter(ch)) {
      return false;
    }
    const match2 = state.src.slice(pos).match(HTML_TAG_RE);
    if (!match2) {
      return false;
    }
    if (!silent) {
      const token = state.push("html_inline", "", 0);
      token.content = match2[0];
      if (isLinkOpen2(token.content)) state.linkLevel++;
      if (isLinkClose2(token.content)) state.linkLevel--;
    }
    state.pos += match2[0].length;
    return true;
  }

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/rules_inline/entity.mjs
  var DIGITAL_RE = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i;
  var NAMED_RE = /^&([a-z][a-z0-9]{1,31});/i;
  function entity(state, silent) {
    const pos = state.pos;
    const max = state.posMax;
    if (state.src.charCodeAt(pos) !== 38) return false;
    if (pos + 1 >= max) return false;
    const ch = state.src.charCodeAt(pos + 1);
    if (ch === 35) {
      const match2 = state.src.slice(pos).match(DIGITAL_RE);
      if (match2) {
        if (!silent) {
          const code3 = match2[1][0].toLowerCase() === "x" ? parseInt(match2[1].slice(1), 16) : parseInt(match2[1], 10);
          const token = state.push("text_special", "", 0);
          token.content = isValidEntityCode(code3) ? fromCodePoint2(code3) : fromCodePoint2(65533);
          token.markup = match2[0];
          token.info = "entity";
        }
        state.pos += match2[0].length;
        return true;
      }
    } else {
      const match2 = state.src.slice(pos).match(NAMED_RE);
      if (match2) {
        const decoded = decodeHTML(match2[0]);
        if (decoded !== match2[0]) {
          if (!silent) {
            const token = state.push("text_special", "", 0);
            token.content = decoded;
            token.markup = match2[0];
            token.info = "entity";
          }
          state.pos += match2[0].length;
          return true;
        }
      }
    }
    return false;
  }

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/rules_inline/balance_pairs.mjs
  function processDelimiters(delimiters) {
    const openersBottom = {};
    const max = delimiters.length;
    if (!max) return;
    let headerIdx = 0;
    let lastTokenIdx = -2;
    const jumps = [];
    for (let closerIdx = 0; closerIdx < max; closerIdx++) {
      const closer = delimiters[closerIdx];
      jumps.push(0);
      if (delimiters[headerIdx].marker !== closer.marker || lastTokenIdx !== closer.token - 1) {
        headerIdx = closerIdx;
      }
      lastTokenIdx = closer.token;
      closer.length = closer.length || 0;
      if (!closer.close) continue;
      if (!openersBottom.hasOwnProperty(closer.marker)) {
        openersBottom[closer.marker] = [-1, -1, -1, -1, -1, -1];
      }
      const minOpenerIdx = openersBottom[closer.marker][(closer.open ? 3 : 0) + closer.length % 3];
      let openerIdx = headerIdx - jumps[headerIdx] - 1;
      let newMinOpenerIdx = openerIdx;
      for (; openerIdx > minOpenerIdx; openerIdx -= jumps[openerIdx] + 1) {
        const opener = delimiters[openerIdx];
        if (opener.marker !== closer.marker) continue;
        if (opener.open && opener.end < 0) {
          let isOddMatch = false;
          if (opener.close || closer.open) {
            if ((opener.length + closer.length) % 3 === 0) {
              if (opener.length % 3 !== 0 || closer.length % 3 !== 0) {
                isOddMatch = true;
              }
            }
          }
          if (!isOddMatch) {
            const lastJump = openerIdx > 0 && !delimiters[openerIdx - 1].open ? jumps[openerIdx - 1] + 1 : 0;
            jumps[closerIdx] = closerIdx - openerIdx + lastJump;
            jumps[openerIdx] = lastJump;
            closer.open = false;
            opener.end = closerIdx;
            opener.close = false;
            newMinOpenerIdx = -1;
            lastTokenIdx = -2;
            break;
          }
        }
      }
      if (newMinOpenerIdx !== -1) {
        openersBottom[closer.marker][(closer.open ? 3 : 0) + (closer.length || 0) % 3] = newMinOpenerIdx;
      }
    }
  }
  function link_pairs(state) {
    const tokens_meta = state.tokens_meta;
    const max = state.tokens_meta.length;
    processDelimiters(state.delimiters);
    for (let curr = 0; curr < max; curr++) {
      if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
        processDelimiters(tokens_meta[curr].delimiters);
      }
    }
  }

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/rules_inline/fragments_join.mjs
  function fragments_join(state) {
    let curr, last;
    let level = 0;
    const tokens = state.tokens;
    const max = state.tokens.length;
    for (curr = last = 0; curr < max; curr++) {
      if (tokens[curr].nesting < 0) level--;
      tokens[curr].level = level;
      if (tokens[curr].nesting > 0) level++;
      if (tokens[curr].type === "text" && curr + 1 < max && tokens[curr + 1].type === "text") {
        tokens[curr + 1].content = tokens[curr].content + tokens[curr + 1].content;
      } else {
        if (curr !== last) {
          tokens[last] = tokens[curr];
        }
        last++;
      }
    }
    if (curr !== last) {
      tokens.length = last;
    }
  }

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/parser_inline.mjs
  var _rules3 = [
    ["text", text],
    ["linkify", linkify2],
    ["newline", newline],
    ["escape", escape2],
    ["backticks", backtick],
    ["strikethrough", strikethrough_default.tokenize],
    ["emphasis", emphasis_default.tokenize],
    ["link", link],
    ["image", image],
    ["autolink", autolink],
    ["html_inline", html_inline],
    ["entity", entity]
  ];
  var _rules22 = [
    ["balance_pairs", link_pairs],
    ["strikethrough", strikethrough_default.postProcess],
    ["emphasis", emphasis_default.postProcess],
    // rules for pairs separate '**' into its own text tokens, which may be left unused,
    // rule below merges unused segments back with the rest of the text
    ["fragments_join", fragments_join]
  ];
  function ParserInline() {
    this.ruler = new ruler_default();
    for (let i = 0; i < _rules3.length; i++) {
      this.ruler.push(_rules3[i][0], _rules3[i][1]);
    }
    this.ruler2 = new ruler_default();
    for (let i = 0; i < _rules22.length; i++) {
      this.ruler2.push(_rules22[i][0], _rules22[i][1]);
    }
  }
  ParserInline.prototype.skipToken = function(state) {
    const pos = state.pos;
    const rules = this.ruler.getRules("");
    const len = rules.length;
    const maxNesting = state.md.options.maxNesting;
    const cache = state.cache;
    if (typeof cache[pos] !== "undefined") {
      state.pos = cache[pos];
      return;
    }
    let ok = false;
    if (state.level < maxNesting) {
      for (let i = 0; i < len; i++) {
        state.level++;
        ok = rules[i](state, true);
        state.level--;
        if (ok) {
          if (pos >= state.pos) {
            throw new Error("inline rule didn't increment state.pos");
          }
          break;
        }
      }
    } else {
      state.pos = state.posMax;
    }
    if (!ok) {
      state.pos++;
    }
    cache[pos] = state.pos;
  };
  ParserInline.prototype.tokenize = function(state) {
    const rules = this.ruler.getRules("");
    const len = rules.length;
    const end = state.posMax;
    const maxNesting = state.md.options.maxNesting;
    while (state.pos < end) {
      const prevPos = state.pos;
      let ok = false;
      if (state.level < maxNesting) {
        for (let i = 0; i < len; i++) {
          ok = rules[i](state, false);
          if (ok) {
            if (prevPos >= state.pos) {
              throw new Error("inline rule didn't increment state.pos");
            }
            break;
          }
        }
      }
      if (ok) {
        if (state.pos >= end) {
          break;
        }
        continue;
      }
      state.pending += state.src[state.pos++];
    }
    if (state.pending) {
      state.pushPending();
    }
  };
  ParserInline.prototype.parse = function(str, md2, env, outTokens) {
    const state = new this.State(str, md2, env, outTokens);
    this.tokenize(state);
    const rules = this.ruler2.getRules("");
    const len = rules.length;
    for (let i = 0; i < len; i++) {
      rules[i](state);
    }
  };
  ParserInline.prototype.State = state_inline_default;
  var parser_inline_default = ParserInline;

  // node_modules/.pnpm/linkify-it@5.0.2/node_modules/linkify-it/lib/re.mjs
  function re_default(opts) {
    const re = {};
    opts = opts || {};
    re.src_Any = regex_default.source;
    re.src_Cc = regex_default2.source;
    re.src_Z = regex_default6.source;
    re.src_P = regex_default4.source;
    re.src_ZPCc = [re.src_Z, re.src_P, re.src_Cc].join("|");
    re.src_ZCc = [re.src_Z, re.src_Cc].join("|");
    const text_separators = "[><\uFF5C]";
    re.src_pseudo_letter = `(?:(?!${text_separators}|${re.src_ZPCc})${re.src_Any})`;
    re.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
    re.src_auth = `(?:(?:(?!${re.src_ZCc}|[@/\\[\\]()]).){1,50}@)?`;
    re.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?";
    re.src_host_terminator = `(?=$|${text_separators}|${re.src_ZPCc})(?!${opts["---"] ? "-(?!--)|" : "-|"}_|:\\d|\\.-|\\.(?!$|${re.src_ZPCc}))`;
    re.src_path = `(?:[/?#](?:(?!${re.src_ZCc}|${text_separators}|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!${re.src_ZCc}|\\]).)*\\]|\\((?:(?!${re.src_ZCc}|[)]).)*\\)|\\{(?:(?!${re.src_ZCc}|[}]).)*\\}|\\"(?:(?!${re.src_ZCc}|["]).)+\\"|\\'(?:(?!${re.src_ZCc}|[']).)+\\'|\\'(?=${re.src_pseudo_letter}|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!${re.src_ZCc}|[.]|$)|` + (opts["---"] ? "\\-(?!--(?:[^-]|$))(?:-*)|" : "\\-+|") + // allow `,,,` in paths
    `,(?!${re.src_ZCc}|$)|;(?!${re.src_ZCc}|$)|\\!+(?!${re.src_ZCc}|[!]|$)|\\?(?!${re.src_ZCc}|[?]|$))+|\\/)?`;
    re.src_email_name = '[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]{0,63}';
    re.src_xn = "xn--[a-z0-9\\-]{1,59}";
    re.src_domain_root = // Allow letters & digits (http://test1)
    "(?:" + re.src_xn + `|${re.src_pseudo_letter}{1,63})`;
    re.src_domain = "(?:" + re.src_xn + `|(?:${re.src_pseudo_letter})|(?:${re.src_pseudo_letter}(?:-|${re.src_pseudo_letter}){0,61}${re.src_pseudo_letter}))`;
    re.src_host = `(?:(?:(?:(?:${re.src_domain})\\.)*${re.src_domain}))`;
    re.tpl_host_fuzzy = "(?:" + re.src_ip4 + `|(?:(?:(?:${re.src_domain})\\.)+(?:%TLDS%)))`;
    re.tpl_host_no_ip_fuzzy = `(?:(?:(?:${re.src_domain})\\.)+(?:%TLDS%))`;
    re.src_host_strict = re.src_host + re.src_host_terminator;
    re.tpl_host_fuzzy_strict = re.tpl_host_fuzzy + re.src_host_terminator;
    re.src_host_port_strict = re.src_host + re.src_port + re.src_host_terminator;
    re.tpl_host_port_fuzzy_strict = re.tpl_host_fuzzy + re.src_port + re.src_host_terminator;
    re.tpl_host_port_no_ip_fuzzy_strict = re.tpl_host_no_ip_fuzzy + re.src_port + re.src_host_terminator;
    re.tpl_host_fuzzy_test = `localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:${re.src_ZPCc}|>|$))`;
    re.tpl_email_fuzzy = `(^|${text_separators}|"|\\(|${re.src_ZCc})(${re.src_email_name}@${re.tpl_host_fuzzy_strict})`;
    re.tpl_link_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
    // but can start with > (markdown blockquote)
    `(^|(?![.:/\\-_@])(?:[$+<=>^\`|\uFF5C]|${re.src_ZPCc}))((?![$+<=>^\`|\uFF5C])${re.tpl_host_port_fuzzy_strict}${re.src_path})`;
    re.tpl_link_no_ip_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
    // but can start with > (markdown blockquote)
    `(^|(?![.:/\\-_@])(?:[$+<=>^\`|\uFF5C]|${re.src_ZPCc}))((?![$+<=>^\`|\uFF5C])${re.tpl_host_port_no_ip_fuzzy_strict}${re.src_path})`;
    return re;
  }

  // node_modules/.pnpm/linkify-it@5.0.2/node_modules/linkify-it/index.mjs
  function assign2(obj) {
    const sources = Array.prototype.slice.call(arguments, 1);
    sources.forEach(function(source) {
      if (!source) {
        return;
      }
      Object.keys(source).forEach(function(key) {
        obj[key] = source[key];
      });
    });
    return obj;
  }
  function _class2(obj) {
    return Object.prototype.toString.call(obj);
  }
  function isString2(obj) {
    return _class2(obj) === "[object String]";
  }
  function isObject(obj) {
    return _class2(obj) === "[object Object]";
  }
  function isRegExp(obj) {
    return _class2(obj) === "[object RegExp]";
  }
  function isFunction(obj) {
    return _class2(obj) === "[object Function]";
  }
  function escapeRE2(str) {
    return str.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
  }
  var defaultOptions = {
    fuzzyLink: true,
    fuzzyEmail: true,
    fuzzyIP: false
  };
  function isOptionsObj(obj) {
    return Object.keys(obj || {}).reduce(function(acc, k) {
      return acc || defaultOptions.hasOwnProperty(k);
    }, false);
  }
  var defaultSchemas = {
    "http:": {
      validate: function(text3, pos, self) {
        const tail = text3.slice(pos);
        if (!self.re.http) {
          self.re.http = new RegExp(
            `^\\/\\/${self.re.src_auth}${self.re.src_host_port_strict}${self.re.src_path}`,
            "i"
          );
        }
        if (self.re.http.test(tail)) {
          return tail.match(self.re.http)[0].length;
        }
        return 0;
      }
    },
    "https:": "http:",
    "ftp:": "http:",
    "//": {
      validate: function(text3, pos, self) {
        const tail = text3.slice(pos);
        if (!self.re.no_http) {
          self.re.no_http = new RegExp(
            "^" + self.re.src_auth + // Don't allow single-level domains, because of false positives like '//test'
            // with code comments
            `(?:localhost|(?:(?:${self.re.src_domain})\\.)+${self.re.src_domain_root})` + self.re.src_port + self.re.src_host_terminator + self.re.src_path,
            "i"
          );
        }
        if (self.re.no_http.test(tail)) {
          if (pos >= 3 && text3[pos - 3] === ":") {
            return 0;
          }
          if (pos >= 3 && text3[pos - 3] === "/") {
            return 0;
          }
          return tail.match(self.re.no_http)[0].length;
        }
        return 0;
      }
    },
    "mailto:": {
      validate: function(text3, pos, self) {
        const tail = text3.slice(pos);
        if (!self.re.mailto) {
          self.re.mailto = new RegExp(
            `^${self.re.src_email_name}@${self.re.src_host_strict}`,
            "i"
          );
        }
        if (self.re.mailto.test(tail)) {
          return tail.match(self.re.mailto)[0].length;
        }
        return 0;
      }
    }
  };
  var tlds_2ch_src_re = "a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]";
  var tlds_default = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|\u0440\u0444".split("|");
  function createValidator(re) {
    return function(text3, pos) {
      const tail = text3.slice(pos);
      if (re.test(tail)) {
        return tail.match(re)[0].length;
      }
      return 0;
    };
  }
  function createNormalizer() {
    return function(match2, self) {
      self.normalize(match2);
    };
  }
  function compile(self) {
    const re = self.re = re_default(self.__opts__);
    const tlds2 = self.__tlds__.slice();
    self.onCompile();
    if (!self.__tlds_replaced__) {
      tlds2.push(tlds_2ch_src_re);
    }
    tlds2.push(re.src_xn);
    re.src_tlds = tlds2.join("|");
    function untpl(tpl) {
      return tpl.replace("%TLDS%", re.src_tlds);
    }
    re.email_fuzzy = RegExp(untpl(re.tpl_email_fuzzy), "i");
    re.email_fuzzy_global = RegExp(untpl(re.tpl_email_fuzzy), "ig");
    re.link_fuzzy = RegExp(untpl(re.tpl_link_fuzzy), "i");
    re.link_fuzzy_global = RegExp(untpl(re.tpl_link_fuzzy), "ig");
    re.link_no_ip_fuzzy = RegExp(untpl(re.tpl_link_no_ip_fuzzy), "i");
    re.link_no_ip_fuzzy_global = RegExp(untpl(re.tpl_link_no_ip_fuzzy), "ig");
    re.host_fuzzy_test = RegExp(untpl(re.tpl_host_fuzzy_test), "i");
    const aliases = [];
    self.__compiled__ = {};
    function schemaError(name50, val) {
      throw new Error(`(LinkifyIt) Invalid schema "${name50}": ${val}`);
    }
    Object.keys(self.__schemas__).forEach(function(name50) {
      const val = self.__schemas__[name50];
      if (val === null) {
        return;
      }
      const compiled = { validate: null, link: null };
      self.__compiled__[name50] = compiled;
      if (isObject(val)) {
        if (isRegExp(val.validate)) {
          compiled.validate = createValidator(val.validate);
        } else if (isFunction(val.validate)) {
          compiled.validate = val.validate;
        } else {
          schemaError(name50, val);
        }
        if (isFunction(val.normalize)) {
          compiled.normalize = val.normalize;
        } else if (!val.normalize) {
          compiled.normalize = createNormalizer();
        } else {
          schemaError(name50, val);
        }
        return;
      }
      if (isString2(val)) {
        aliases.push(name50);
        return;
      }
      schemaError(name50, val);
    });
    aliases.forEach(function(alias) {
      if (!self.__compiled__[self.__schemas__[alias]]) {
        return;
      }
      self.__compiled__[alias].validate = self.__compiled__[self.__schemas__[alias]].validate;
      self.__compiled__[alias].normalize = self.__compiled__[self.__schemas__[alias]].normalize;
    });
    self.__compiled__[""] = { validate: null, normalize: createNormalizer() };
    const slist = Object.keys(self.__compiled__).filter(function(name50) {
      return name50.length > 0 && self.__compiled__[name50];
    }).map(escapeRE2).join("|");
    self.re.schema_test = RegExp(`(^|(?!_)(?:[><\uFF5C]|${re.src_ZPCc}))(${slist})`, "i");
    self.re.schema_search = RegExp(`(^|(?!_)(?:[><\uFF5C]|${re.src_ZPCc}))(${slist})`, "ig");
    self.re.schema_at_start = RegExp(`^${self.re.schema_search.source}`, "i");
    self.re.pretest = RegExp(
      `(${self.re.schema_test.source})|(${self.re.host_fuzzy_test.source})|@`,
      "i"
    );
  }
  function Match(text3, schema, index, lastIndex) {
    const raw = text3.slice(index, lastIndex);
    this.schema = schema.toLowerCase();
    this.index = index;
    this.lastIndex = lastIndex;
    this.raw = raw;
    this.text = raw;
    this.url = raw;
  }
  function LinkifyIt(schemas, options) {
    if (!(this instanceof LinkifyIt)) {
      return new LinkifyIt(schemas, options);
    }
    if (!options) {
      if (isOptionsObj(schemas)) {
        options = schemas;
        schemas = {};
      }
    }
    this.__opts__ = assign2({}, defaultOptions, options);
    this.__schemas__ = assign2({}, defaultSchemas, schemas);
    this.__compiled__ = {};
    this.__tlds__ = tlds_default;
    this.__tlds_replaced__ = false;
    this.re = {};
    compile(this);
  }
  LinkifyIt.prototype.add = function add(schema, definition) {
    this.__schemas__[schema] = definition;
    compile(this);
    return this;
  };
  LinkifyIt.prototype.set = function set(options) {
    this.__opts__ = assign2(this.__opts__, options);
    return this;
  };
  LinkifyIt.prototype.test = function test(text3) {
    if (!text3.length) {
      return false;
    }
    let m, re;
    if (this.re.schema_test.test(text3)) {
      re = this.re.schema_search;
      re.lastIndex = 0;
      while ((m = re.exec(text3)) !== null) {
        if (this.testSchemaAt(text3, m[2], re.lastIndex)) {
          return true;
        }
      }
    }
    if (this.__opts__.fuzzyLink && this.__compiled__["http:"]) {
      if (text3.search(this.re.host_fuzzy_test) >= 0) {
        if (text3.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy) !== null) {
          return true;
        }
      }
    }
    if (this.__opts__.fuzzyEmail && this.__compiled__["mailto:"]) {
      if (text3.indexOf("@") >= 0) {
        if (text3.match(this.re.email_fuzzy) !== null) {
          return true;
        }
      }
    }
    return false;
  };
  LinkifyIt.prototype.pretest = function pretest(text3) {
    return this.re.pretest.test(text3);
  };
  LinkifyIt.prototype.testSchemaAt = function testSchemaAt(text3, schema, pos) {
    if (!this.__compiled__[schema.toLowerCase()]) {
      return 0;
    }
    return this.__compiled__[schema.toLowerCase()].validate(text3, pos, this);
  };
  LinkifyIt.prototype.match = function match(text3) {
    const result = [];
    const type_schemed = [];
    const type_fuzzy_link = [];
    const type_fuzzy_email = [];
    let m, len, re;
    function choose(a, b) {
      if (!a) {
        return b;
      }
      if (!b) {
        return a;
      }
      if (a.index !== b.index) {
        return a.index < b.index ? a : b;
      }
      return a.lastIndex >= b.lastIndex ? a : b;
    }
    if (!text3.length) {
      return null;
    }
    if (this.re.schema_test.test(text3)) {
      re = this.re.schema_search;
      re.lastIndex = 0;
      while ((m = re.exec(text3)) !== null) {
        len = this.testSchemaAt(text3, m[2], re.lastIndex);
        if (len) {
          type_schemed.push({
            schema: m[2],
            index: m.index + m[1].length,
            lastIndex: m.index + m[0].length + len
          });
        }
      }
    }
    if (this.__opts__.fuzzyLink && this.__compiled__["http:"]) {
      re = this.__opts__.fuzzyIP ? this.re.link_fuzzy_global : this.re.link_no_ip_fuzzy_global;
      re.lastIndex = 0;
      while ((m = re.exec(text3)) !== null) {
        type_fuzzy_link.push({
          schema: "",
          index: m.index + m[1].length,
          lastIndex: m.index + m[0].length
        });
      }
    }
    if (this.__opts__.fuzzyEmail && this.__compiled__["mailto:"]) {
      re = this.re.email_fuzzy_global;
      re.lastIndex = 0;
      while ((m = re.exec(text3)) !== null) {
        type_fuzzy_email.push({
          schema: "mailto:",
          index: m.index + m[1].length,
          lastIndex: m.index + m[0].length
        });
      }
    }
    const indexes = [0, 0, 0];
    let lastIndex = 0;
    for (; ; ) {
      const candidates = [
        type_schemed[indexes[0]],
        type_fuzzy_email[indexes[1]],
        type_fuzzy_link[indexes[2]]
      ];
      const candidate = choose(choose(candidates[0], candidates[1]), candidates[2]);
      if (!candidate) {
        break;
      }
      if (candidate === candidates[0]) {
        indexes[0]++;
      } else if (candidate === candidates[1]) {
        indexes[1]++;
      } else {
        indexes[2]++;
      }
      if (candidate.index < lastIndex) {
        continue;
      }
      const match2 = new Match(text3, candidate.schema, candidate.index, candidate.lastIndex);
      this.__compiled__[match2.schema].normalize(match2, this);
      result.push(match2);
      lastIndex = candidate.lastIndex;
    }
    if (result.length) {
      return result;
    }
    return null;
  };
  LinkifyIt.prototype.matchAtStart = function matchAtStart(text3) {
    if (!text3.length) return null;
    const m = this.re.schema_at_start.exec(text3);
    if (!m) return null;
    const len = this.testSchemaAt(text3, m[2], m[0].length);
    if (!len) return null;
    const match2 = new Match(text3, m[2], m.index + m[1].length, m.index + m[0].length + len);
    this.__compiled__[match2.schema].normalize(match2, this);
    return match2;
  };
  LinkifyIt.prototype.tlds = function tlds(list2, keepOld) {
    list2 = Array.isArray(list2) ? list2 : [list2];
    if (!keepOld) {
      this.__tlds__ = list2.slice();
      this.__tlds_replaced__ = true;
      compile(this);
      return this;
    }
    this.__tlds__ = this.__tlds__.concat(list2).sort().filter(function(el, idx, arr) {
      return el !== arr[idx - 1];
    }).reverse();
    compile(this);
    return this;
  };
  LinkifyIt.prototype.normalize = function normalize2(match2) {
    if (!match2.schema) {
      match2.url = `http://${match2.url}`;
    }
    if (match2.schema === "mailto:" && !/^mailto:/i.test(match2.url)) {
      match2.url = `mailto:${match2.url}`;
    }
  };
  LinkifyIt.prototype.onCompile = function onCompile() {
  };
  var linkify_it_default = LinkifyIt;

  // node_modules/.pnpm/punycode.js@2.3.1/node_modules/punycode.js/punycode.es6.js
  var maxInt = 2147483647;
  var base = 36;
  var tMin = 1;
  var tMax = 26;
  var skew = 38;
  var damp = 700;
  var initialBias = 72;
  var initialN = 128;
  var delimiter = "-";
  var regexPunycode = /^xn--/;
  var regexNonASCII = /[^\0-\x7F]/;
  var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g;
  var errors = {
    "overflow": "Overflow: input needs wider integers to process",
    "not-basic": "Illegal input >= 0x80 (not a basic code point)",
    "invalid-input": "Invalid input"
  };
  var baseMinusTMin = base - tMin;
  var floor = Math.floor;
  var stringFromCharCode = String.fromCharCode;
  function error(type) {
    throw new RangeError(errors[type]);
  }
  function map(array, callback) {
    const result = [];
    let length2 = array.length;
    while (length2--) {
      result[length2] = callback(array[length2]);
    }
    return result;
  }
  function mapDomain(domain, callback) {
    const parts = domain.split("@");
    let result = "";
    if (parts.length > 1) {
      result = parts[0] + "@";
      domain = parts[1];
    }
    domain = domain.replace(regexSeparators, ".");
    const labels = domain.split(".");
    const encoded = map(labels, callback).join(".");
    return result + encoded;
  }
  function ucs2decode(string) {
    const output = [];
    let counter = 0;
    const length2 = string.length;
    while (counter < length2) {
      const value = string.charCodeAt(counter++);
      if (value >= 55296 && value <= 56319 && counter < length2) {
        const extra = string.charCodeAt(counter++);
        if ((extra & 64512) == 56320) {
          output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
        } else {
          output.push(value);
          counter--;
        }
      } else {
        output.push(value);
      }
    }
    return output;
  }
  var ucs2encode = (codePoints) => String.fromCodePoint(...codePoints);
  var basicToDigit = function(codePoint) {
    if (codePoint >= 48 && codePoint < 58) {
      return 26 + (codePoint - 48);
    }
    if (codePoint >= 65 && codePoint < 91) {
      return codePoint - 65;
    }
    if (codePoint >= 97 && codePoint < 123) {
      return codePoint - 97;
    }
    return base;
  };
  var digitToBasic = function(digit, flag) {
    return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
  };
  var adapt = function(delta, numPoints, firstTime) {
    let k = 0;
    delta = firstTime ? floor(delta / damp) : delta >> 1;
    delta += floor(delta / numPoints);
    for (; delta > baseMinusTMin * tMax >> 1; k += base) {
      delta = floor(delta / baseMinusTMin);
    }
    return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
  };
  var decode2 = function(input) {
    const output = [];
    const inputLength = input.length;
    let i = 0;
    let n = initialN;
    let bias = initialBias;
    let basic = input.lastIndexOf(delimiter);
    if (basic < 0) {
      basic = 0;
    }
    for (let j = 0; j < basic; ++j) {
      if (input.charCodeAt(j) >= 128) {
        error("not-basic");
      }
      output.push(input.charCodeAt(j));
    }
    for (let index = basic > 0 ? basic + 1 : 0; index < inputLength; ) {
      const oldi = i;
      for (let w = 1, k = base; ; k += base) {
        if (index >= inputLength) {
          error("invalid-input");
        }
        const digit = basicToDigit(input.charCodeAt(index++));
        if (digit >= base) {
          error("invalid-input");
        }
        if (digit > floor((maxInt - i) / w)) {
          error("overflow");
        }
        i += digit * w;
        const t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
        if (digit < t) {
          break;
        }
        const baseMinusT = base - t;
        if (w > floor(maxInt / baseMinusT)) {
          error("overflow");
        }
        w *= baseMinusT;
      }
      const out = output.length + 1;
      bias = adapt(i - oldi, out, oldi == 0);
      if (floor(i / out) > maxInt - n) {
        error("overflow");
      }
      n += floor(i / out);
      i %= out;
      output.splice(i++, 0, n);
    }
    return String.fromCodePoint(...output);
  };
  var encode2 = function(input) {
    const output = [];
    input = ucs2decode(input);
    const inputLength = input.length;
    let n = initialN;
    let delta = 0;
    let bias = initialBias;
    for (const currentValue of input) {
      if (currentValue < 128) {
        output.push(stringFromCharCode(currentValue));
      }
    }
    const basicLength = output.length;
    let handledCPCount = basicLength;
    if (basicLength) {
      output.push(delimiter);
    }
    while (handledCPCount < inputLength) {
      let m = maxInt;
      for (const currentValue of input) {
        if (currentValue >= n && currentValue < m) {
          m = currentValue;
        }
      }
      const handledCPCountPlusOne = handledCPCount + 1;
      if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
        error("overflow");
      }
      delta += (m - n) * handledCPCountPlusOne;
      n = m;
      for (const currentValue of input) {
        if (currentValue < n && ++delta > maxInt) {
          error("overflow");
        }
        if (currentValue === n) {
          let q = delta;
          for (let k = base; ; k += base) {
            const t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
            if (q < t) {
              break;
            }
            const qMinusT = q - t;
            const baseMinusT = base - t;
            output.push(
              stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
            );
            q = floor(qMinusT / baseMinusT);
          }
          output.push(stringFromCharCode(digitToBasic(q, 0)));
          bias = adapt(delta, handledCPCountPlusOne, handledCPCount === basicLength);
          delta = 0;
          ++handledCPCount;
        }
      }
      ++delta;
      ++n;
    }
    return output.join("");
  };
  var toUnicode = function(input) {
    return mapDomain(input, function(string) {
      return regexPunycode.test(string) ? decode2(string.slice(4).toLowerCase()) : string;
    });
  };
  var toASCII = function(input) {
    return mapDomain(input, function(string) {
      return regexNonASCII.test(string) ? "xn--" + encode2(string) : string;
    });
  };
  var punycode = {
    /**
     * A string representing the current Punycode.js version number.
     * @memberOf punycode
     * @type String
     */
    "version": "2.3.1",
    /**
     * An object of methods to convert from JavaScript's internal character
     * representation (UCS-2) to Unicode code points, and back.
     * @see <https://mathiasbynens.be/notes/javascript-encoding>
     * @memberOf punycode
     * @type Object
     */
    "ucs2": {
      "decode": ucs2decode,
      "encode": ucs2encode
    },
    "decode": decode2,
    "encode": encode2,
    "toASCII": toASCII,
    "toUnicode": toUnicode
  };
  var punycode_es6_default = punycode;

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/presets/default.mjs
  var default_default = {
    options: {
      // Enable HTML tags in source
      html: false,
      // Use '/' to close single tags (<br />)
      xhtmlOut: false,
      // Convert '\n' in paragraphs into <br>
      breaks: false,
      // CSS language prefix for fenced blocks
      langPrefix: "language-",
      // autoconvert URL-like texts to links
      linkify: false,
      // Enable some language-neutral replacements + quotes beautification
      typographer: false,
      // Double + single quotes replacement pairs, when typographer enabled,
      // and smartquotes on. Could be either a String or an Array.
      //
      // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
      // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
      quotes: "\u201C\u201D\u2018\u2019",
      /* “”‘’ */
      // Highlighter function. Should return escaped HTML,
      // or '' if the source string is not changed and should be escaped externaly.
      // If result starts with <pre... internal wrapper is skipped.
      //
      // function (/*str, lang*/) { return ''; }
      //
      highlight: null,
      // Internal protection, recursion limit
      maxNesting: 100
    },
    components: {
      core: {},
      block: {},
      inline: {}
    }
  };

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/presets/zero.mjs
  var zero_default = {
    options: {
      // Enable HTML tags in source
      html: false,
      // Use '/' to close single tags (<br />)
      xhtmlOut: false,
      // Convert '\n' in paragraphs into <br>
      breaks: false,
      // CSS language prefix for fenced blocks
      langPrefix: "language-",
      // autoconvert URL-like texts to links
      linkify: false,
      // Enable some language-neutral replacements + quotes beautification
      typographer: false,
      // Double + single quotes replacement pairs, when typographer enabled,
      // and smartquotes on. Could be either a String or an Array.
      //
      // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
      // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
      quotes: "\u201C\u201D\u2018\u2019",
      /* “”‘’ */
      // Highlighter function. Should return escaped HTML,
      // or '' if the source string is not changed and should be escaped externaly.
      // If result starts with <pre... internal wrapper is skipped.
      //
      // function (/*str, lang*/) { return ''; }
      //
      highlight: null,
      // Internal protection, recursion limit
      maxNesting: 20
    },
    components: {
      core: {
        rules: [
          "normalize",
          "block",
          "inline",
          "text_join"
        ]
      },
      block: {
        rules: [
          "paragraph"
        ]
      },
      inline: {
        rules: [
          "text"
        ],
        rules2: [
          "balance_pairs",
          "fragments_join"
        ]
      }
    }
  };

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/presets/commonmark.mjs
  var commonmark_default = {
    options: {
      // Enable HTML tags in source
      html: true,
      // Use '/' to close single tags (<br />)
      xhtmlOut: true,
      // Convert '\n' in paragraphs into <br>
      breaks: false,
      // CSS language prefix for fenced blocks
      langPrefix: "language-",
      // autoconvert URL-like texts to links
      linkify: false,
      // Enable some language-neutral replacements + quotes beautification
      typographer: false,
      // Double + single quotes replacement pairs, when typographer enabled,
      // and smartquotes on. Could be either a String or an Array.
      //
      // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
      // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
      quotes: "\u201C\u201D\u2018\u2019",
      /* “”‘’ */
      // Highlighter function. Should return escaped HTML,
      // or '' if the source string is not changed and should be escaped externaly.
      // If result starts with <pre... internal wrapper is skipped.
      //
      // function (/*str, lang*/) { return ''; }
      //
      highlight: null,
      // Internal protection, recursion limit
      maxNesting: 20
    },
    components: {
      core: {
        rules: [
          "normalize",
          "block",
          "inline",
          "text_join"
        ]
      },
      block: {
        rules: [
          "blockquote",
          "code",
          "fence",
          "heading",
          "hr",
          "html_block",
          "lheading",
          "list",
          "reference",
          "paragraph"
        ]
      },
      inline: {
        rules: [
          "autolink",
          "backticks",
          "emphasis",
          "entity",
          "escape",
          "html_inline",
          "image",
          "link",
          "newline",
          "text"
        ],
        rules2: [
          "balance_pairs",
          "emphasis",
          "fragments_join"
        ]
      }
    }
  };

  // node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/lib/index.mjs
  var config = {
    default: default_default,
    zero: zero_default,
    commonmark: commonmark_default
  };
  var BAD_PROTO_RE = /^(vbscript|javascript|file|data):/;
  var GOOD_DATA_RE = /^data:image\/(gif|png|jpeg|webp);/;
  function validateLink(url) {
    const str = url.trim().toLowerCase();
    return BAD_PROTO_RE.test(str) ? GOOD_DATA_RE.test(str) : true;
  }
  var RECODE_HOSTNAME_FOR = ["http:", "https:", "mailto:"];
  function normalizeLink(url) {
    const parsed = parse_default(url, true);
    if (parsed.hostname) {
      if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
        try {
          parsed.hostname = punycode_es6_default.toASCII(parsed.hostname);
        } catch (er) {
        }
      }
    }
    return encode_default(format(parsed));
  }
  function normalizeLinkText(url) {
    const parsed = parse_default(url, true);
    if (parsed.hostname) {
      if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
        try {
          parsed.hostname = punycode_es6_default.toUnicode(parsed.hostname);
        } catch (er) {
        }
      }
    }
    return decode_default(format(parsed), decode_default.defaultChars + "%");
  }
  function MarkdownIt(presetName, options) {
    if (!(this instanceof MarkdownIt)) {
      return new MarkdownIt(presetName, options);
    }
    if (!options) {
      if (!isString(presetName)) {
        options = presetName || {};
        presetName = "default";
      }
    }
    this.inline = new parser_inline_default();
    this.block = new parser_block_default();
    this.core = new parser_core_default();
    this.renderer = new renderer_default();
    this.linkify = new linkify_it_default();
    this.validateLink = validateLink;
    this.normalizeLink = normalizeLink;
    this.normalizeLinkText = normalizeLinkText;
    this.utils = utils_exports;
    this.helpers = assign({}, helpers_exports);
    this.options = {};
    this.configure(presetName);
    if (options) {
      this.set(options);
    }
  }
  MarkdownIt.prototype.set = function(options) {
    assign(this.options, options);
    return this;
  };
  MarkdownIt.prototype.configure = function(presets) {
    const self = this;
    if (isString(presets)) {
      const presetName = presets;
      presets = config[presetName];
      if (!presets) {
        throw new Error('Wrong `markdown-it` preset "' + presetName + '", check name');
      }
    }
    if (!presets) {
      throw new Error("Wrong `markdown-it` preset, can't be empty");
    }
    if (presets.options) {
      self.set(presets.options);
    }
    if (presets.components) {
      Object.keys(presets.components).forEach(function(name50) {
        if (presets.components[name50].rules) {
          self[name50].ruler.enableOnly(presets.components[name50].rules);
        }
        if (presets.components[name50].rules2) {
          self[name50].ruler2.enableOnly(presets.components[name50].rules2);
        }
      });
    }
    return this;
  };
  MarkdownIt.prototype.enable = function(list2, ignoreInvalid) {
    let result = [];
    if (!Array.isArray(list2)) {
      list2 = [list2];
    }
    ["core", "block", "inline"].forEach(function(chain) {
      result = result.concat(this[chain].ruler.enable(list2, true));
    }, this);
    result = result.concat(this.inline.ruler2.enable(list2, true));
    const missed = list2.filter(function(name50) {
      return result.indexOf(name50) < 0;
    });
    if (missed.length && !ignoreInvalid) {
      throw new Error("MarkdownIt. Failed to enable unknown rule(s): " + missed);
    }
    return this;
  };
  MarkdownIt.prototype.disable = function(list2, ignoreInvalid) {
    let result = [];
    if (!Array.isArray(list2)) {
      list2 = [list2];
    }
    ["core", "block", "inline"].forEach(function(chain) {
      result = result.concat(this[chain].ruler.disable(list2, true));
    }, this);
    result = result.concat(this.inline.ruler2.disable(list2, true));
    const missed = list2.filter(function(name50) {
      return result.indexOf(name50) < 0;
    });
    if (missed.length && !ignoreInvalid) {
      throw new Error("MarkdownIt. Failed to disable unknown rule(s): " + missed);
    }
    return this;
  };
  MarkdownIt.prototype.use = function(plugin) {
    const args = [this].concat(Array.prototype.slice.call(arguments, 1));
    plugin.apply(plugin, args);
    return this;
  };
  MarkdownIt.prototype.parse = function(src, env) {
    if (typeof src !== "string") {
      throw new Error("Input data should be a String");
    }
    const state = new this.core.State(src, this, env);
    this.core.process(state);
    return state.tokens;
  };
  MarkdownIt.prototype.render = function(src, env) {
    env = env || {};
    return this.renderer.render(this.parse(src, env), this.options, env);
  };
  MarkdownIt.prototype.parseInline = function(src, env) {
    const state = new this.core.State(src, this, env);
    state.inlineMode = true;
    this.core.process(state);
    return state.tokens;
  };
  MarkdownIt.prototype.renderInline = function(src, env) {
    env = env || {};
    return this.renderer.render(this.parseInline(src, env), this.options, env);
  };
  var lib_default = MarkdownIt;

  // node_modules/.pnpm/dompurify@3.4.17/node_modules/dompurify/dist/purify.es.mjs
  function _OverloadYield(e, d) {
    this.v = e, this.k = d;
  }
  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
  }
  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e, n, i, u, a = [], f = true, o = false;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = false;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
      } catch (r2) {
        o = true, n = r2;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }
  function AsyncGenerator(e) {
    var t, n;
    function resume(t2, n2) {
      try {
        var r = e[t2](n2), o = r.value, u = o instanceof _OverloadYield;
        Promise.resolve(u ? o.v : o).then(function(n3) {
          if (u) {
            var i = "return" === t2 && o.k ? t2 : "next";
            if (!o.k || n3.done) return resume(i, n3);
            n3 = e[i](n3).value;
          }
          settle(!!r.done, n3);
        }, function(e2) {
          resume("throw", e2);
        });
      } catch (e2) {
        settle(2, e2);
      }
    }
    function settle(e2, r) {
      2 === e2 ? t.reject(r) : t.resolve({
        value: r,
        done: e2
      }), (t = t.next) ? resume(t.key, t.arg) : n = null;
    }
    this._invoke = function(e2, r) {
      return new Promise(function(o, u) {
        var i = {
          key: e2,
          arg: r,
          resolve: o,
          reject: u,
          next: null
        };
        n ? n = n.next = i : (t = n = i, resume(e2, r));
      });
    }, "function" != typeof e.return && (this.return = void 0);
  }
  AsyncGenerator.prototype["function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator"] = function() {
    return this;
  }, AsyncGenerator.prototype.next = function(e) {
    return this._invoke("next", e);
  }, AsyncGenerator.prototype.throw = function(e) {
    return this._invoke("throw", e);
  }, AsyncGenerator.prototype.return = function(e) {
    return this._invoke("return", e);
  };
  var entries = Object.entries;
  var setPrototypeOf = Object.setPrototypeOf;
  var isFrozen = Object.isFrozen;
  var getPrototypeOf = Object.getPrototypeOf;
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  var freeze = Object.freeze;
  var seal = Object.seal;
  var create = Object.create;
  var _ref = typeof Reflect !== "undefined" && Reflect;
  var apply = _ref.apply;
  var construct = _ref.construct;
  if (!freeze) freeze = function freeze2(x) {
    return x;
  };
  if (!seal) seal = function seal2(x) {
    return x;
  };
  if (!apply) apply = function apply2(func, thisArg) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) args[_key - 2] = arguments[_key];
    return func.apply(thisArg, args);
  };
  if (!construct) construct = function construct2(Func) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) args[_key2 - 1] = arguments[_key2];
    return new Func(...args);
  };
  var arrayForEach = unapply(Array.prototype.forEach);
  Array.prototype.indexOf;
  var arrayLastIndexOf = unapply(Array.prototype.lastIndexOf);
  var arrayPop = unapply(Array.prototype.pop);
  var arrayPush = unapply(Array.prototype.push);
  var arraySlice = unapply(Array.prototype.slice);
  var arraySplice = unapply(Array.prototype.splice);
  var arrayIsArray = Array.isArray;
  var setCreate = unconstruct(Set);
  var setAdd = unapply(Set.prototype.add);
  var setHas = unapply(Set.prototype.has);
  var stringToLowerCase = unapply(String.prototype.toLowerCase);
  var stringToString = unapply(String.prototype.toString);
  var stringMatch = unapply(String.prototype.match);
  var stringReplace = unapply(String.prototype.replace);
  var stringIndexOf = unapply(String.prototype.indexOf);
  var stringTrim = unapply(String.prototype.trim);
  var numberToString = unapply(Number.prototype.toString);
  var booleanToString = unapply(Boolean.prototype.toString);
  var bigintToString = typeof BigInt === "undefined" ? null : unapply(BigInt.prototype.toString);
  var symbolToString = typeof Symbol === "undefined" ? null : unapply(Symbol.prototype.toString);
  var objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
  var objectToString = unapply(Object.prototype.toString);
  var regExpTest = unapply(RegExp.prototype.test);
  var typeErrorCreate = unconstruct(TypeError);
  function unapply(func) {
    return function(thisArg) {
      if (thisArg instanceof RegExp) thisArg.lastIndex = 0;
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) args[_key3 - 1] = arguments[_key3];
      return apply(func, thisArg, args);
    };
  }
  function unconstruct(Func) {
    return function() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) args[_key4] = arguments[_key4];
      return construct(Func, args);
    };
  }
  function addToSet(set2, array) {
    let transformCaseFunc = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : stringToLowerCase;
    if (setPrototypeOf) setPrototypeOf(set2, null);
    if (!arrayIsArray(array)) return set2;
    let l = array.length;
    while (l--) {
      let element = array[l];
      if (typeof element === "string") {
        const lcElement = transformCaseFunc(element);
        if (lcElement !== element) {
          if (!isFrozen(array)) array[l] = lcElement;
          element = lcElement;
        }
      }
      set2[element] = true;
    }
    return set2;
  }
  function cleanArray(array) {
    for (let index = 0; index < array.length; index++) if (!objectHasOwnProperty(array, index)) array[index] = null;
    return array;
  }
  function clone(object) {
    const newObject = create(null);
    for (const _ref2 of entries(object)) {
      var _ref3 = _slicedToArray(_ref2, 2);
      const property2 = _ref3[0];
      const value = _ref3[1];
      if (objectHasOwnProperty(object, property2)) {
        if (arrayIsArray(value)) newObject[property2] = cleanArray(value);
        else if (value && typeof value === "object" && value.constructor === Object) newObject[property2] = clone(value);
        else newObject[property2] = value;
      }
    }
    return newObject;
  }
  function stringifyValue(value) {
    switch (typeof value) {
      case "string":
        return value;
      case "number":
        return numberToString(value);
      case "boolean":
        return booleanToString(value);
      case "bigint":
        return bigintToString ? bigintToString(value) : "0";
      case "symbol":
        return symbolToString ? symbolToString(value) : "Symbol()";
      case "undefined":
        return objectToString(value);
      case "function":
      case "object": {
        if (value === null) return objectToString(value);
        const valueAsRecord = value;
        const valueToString = lookupGetter(valueAsRecord, "toString");
        if (typeof valueToString === "function") {
          const stringified = valueToString(valueAsRecord);
          return typeof stringified === "string" ? stringified : objectToString(stringified);
        }
        return objectToString(value);
      }
      default:
        return objectToString(value);
    }
  }
  function lookupGetter(object, prop) {
    while (object !== null) {
      const desc = getOwnPropertyDescriptor(object, prop);
      if (desc) {
        if (desc.get) return unapply(desc.get);
        if (typeof desc.value === "function") return unapply(desc.value);
      }
      object = getPrototypeOf(object);
    }
    function fallbackValue() {
      return null;
    }
    return fallbackValue;
  }
  function lookupAccessor(object, prop) {
    while (object !== null) {
      const desc = getOwnPropertyDescriptor(object, prop);
      if (desc) return desc.get ? unapply(desc.get) : null;
      object = getPrototypeOf(object);
    }
    return null;
  }
  function isRegex(value) {
    try {
      regExpTest(value, "");
      return true;
    } catch (_unused) {
      return false;
    }
  }
  var html$1 = freeze([
    "a",
    "abbr",
    "acronym",
    "address",
    "area",
    "article",
    "aside",
    "audio",
    "b",
    "bdi",
    "bdo",
    "big",
    "blink",
    "blockquote",
    "body",
    "br",
    "button",
    "canvas",
    "caption",
    "center",
    "cite",
    "code",
    "col",
    "colgroup",
    "content",
    "data",
    "datalist",
    "dd",
    "decorator",
    "del",
    "details",
    "dfn",
    "dialog",
    "dir",
    "div",
    "dl",
    "dt",
    "element",
    "em",
    "fieldset",
    "figcaption",
    "figure",
    "font",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hgroup",
    "hr",
    "html",
    "i",
    "img",
    "input",
    "ins",
    "kbd",
    "label",
    "legend",
    "li",
    "main",
    "map",
    "mark",
    "marquee",
    "menu",
    "menuitem",
    "meter",
    "nav",
    "nobr",
    "ol",
    "optgroup",
    "option",
    "output",
    "p",
    "picture",
    "pre",
    "progress",
    "q",
    "rp",
    "rt",
    "ruby",
    "s",
    "samp",
    "search",
    "section",
    "select",
    "shadow",
    "slot",
    "small",
    "source",
    "spacer",
    "span",
    "strike",
    "strong",
    "style",
    "sub",
    "summary",
    "sup",
    "table",
    "tbody",
    "td",
    "template",
    "textarea",
    "tfoot",
    "th",
    "thead",
    "time",
    "tr",
    "track",
    "tt",
    "u",
    "ul",
    "var",
    "video",
    "wbr"
  ]);
  var svg$1 = freeze([
    "svg",
    "a",
    "altglyph",
    "altglyphdef",
    "altglyphitem",
    "animatecolor",
    "animatemotion",
    "animatetransform",
    "circle",
    "clippath",
    "defs",
    "desc",
    "ellipse",
    "enterkeyhint",
    "exportparts",
    "filter",
    "font",
    "g",
    "glyph",
    "glyphref",
    "hkern",
    "image",
    "inputmode",
    "line",
    "lineargradient",
    "marker",
    "mask",
    "metadata",
    "mpath",
    "part",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "radialgradient",
    "rect",
    "stop",
    "style",
    "switch",
    "symbol",
    "text",
    "textpath",
    "title",
    "tref",
    "tspan",
    "view",
    "vkern"
  ]);
  var svgFilters = freeze([
    "feBlend",
    "feColorMatrix",
    "feComponentTransfer",
    "feComposite",
    "feConvolveMatrix",
    "feDiffuseLighting",
    "feDisplacementMap",
    "feDistantLight",
    "feDropShadow",
    "feFlood",
    "feFuncA",
    "feFuncB",
    "feFuncG",
    "feFuncR",
    "feGaussianBlur",
    "feImage",
    "feMerge",
    "feMergeNode",
    "feMorphology",
    "feOffset",
    "fePointLight",
    "feSpecularLighting",
    "feSpotLight",
    "feTile",
    "feTurbulence"
  ]);
  var svgDisallowed = freeze([
    "animate",
    "color-profile",
    "cursor",
    "discard",
    "font-face",
    "font-face-format",
    "font-face-name",
    "font-face-src",
    "font-face-uri",
    "foreignobject",
    "hatch",
    "hatchpath",
    "mesh",
    "meshgradient",
    "meshpatch",
    "meshrow",
    "missing-glyph",
    "script",
    "set",
    "solidcolor",
    "unknown",
    "use"
  ]);
  var mathMl$1 = freeze([
    "math",
    "menclose",
    "merror",
    "mfenced",
    "mfrac",
    "mglyph",
    "mi",
    "mlabeledtr",
    "mmultiscripts",
    "mn",
    "mo",
    "mover",
    "mpadded",
    "mphantom",
    "mroot",
    "mrow",
    "ms",
    "mspace",
    "msqrt",
    "mstyle",
    "msub",
    "msup",
    "msubsup",
    "mtable",
    "mtd",
    "mtext",
    "mtr",
    "munder",
    "munderover",
    "mprescripts"
  ]);
  var mathMlDisallowed = freeze([
    "maction",
    "maligngroup",
    "malignmark",
    "mlongdiv",
    "mscarries",
    "mscarry",
    "msgroup",
    "mstack",
    "msline",
    "msrow",
    "semantics",
    "annotation",
    "annotation-xml",
    "mprescripts",
    "none"
  ]);
  var text2 = freeze(["#text"]);
  var html = freeze([
    "accept",
    "action",
    "align",
    "alt",
    "autocapitalize",
    "autocomplete",
    "autopictureinpicture",
    "autoplay",
    "background",
    "bgcolor",
    "border",
    "capture",
    "cellpadding",
    "cellspacing",
    "checked",
    "cite",
    "class",
    "clear",
    "color",
    "cols",
    "colspan",
    "command",
    "commandfor",
    "controls",
    "controlslist",
    "coords",
    "crossorigin",
    "datetime",
    "decoding",
    "default",
    "dir",
    "disabled",
    "disablepictureinpicture",
    "disableremoteplayback",
    "download",
    "draggable",
    "enctype",
    "enterkeyhint",
    "exportparts",
    "face",
    "for",
    "headers",
    "height",
    "hidden",
    "high",
    "href",
    "hreflang",
    "id",
    "inert",
    "inputmode",
    "integrity",
    "ismap",
    "kind",
    "label",
    "lang",
    "list",
    "loading",
    "loop",
    "low",
    "max",
    "maxlength",
    "media",
    "method",
    "min",
    "minlength",
    "multiple",
    "muted",
    "name",
    "nonce",
    "noshade",
    "novalidate",
    "nowrap",
    "open",
    "optimum",
    "part",
    "pattern",
    "placeholder",
    "playsinline",
    "popover",
    "popovertarget",
    "popovertargetaction",
    "poster",
    "preload",
    "pubdate",
    "radiogroup",
    "readonly",
    "rel",
    "required",
    "rev",
    "reversed",
    "role",
    "rows",
    "rowspan",
    "spellcheck",
    "scope",
    "selected",
    "shape",
    "size",
    "sizes",
    "slot",
    "span",
    "srclang",
    "start",
    "src",
    "srcset",
    "step",
    "style",
    "summary",
    "tabindex",
    "title",
    "translate",
    "type",
    "usemap",
    "valign",
    "value",
    "width",
    "wrap",
    "xmlns"
  ]);
  var svg = freeze([
    "accent-height",
    "accumulate",
    "additive",
    "alignment-baseline",
    "amplitude",
    "ascent",
    "attributename",
    "attributetype",
    "azimuth",
    "basefrequency",
    "baseline-shift",
    "begin",
    "bias",
    "by",
    "class",
    "clip",
    "clippathunits",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "cx",
    "cy",
    "d",
    "dx",
    "dy",
    "diffuseconstant",
    "direction",
    "display",
    "divisor",
    "dominant-baseline",
    "dur",
    "edgemode",
    "elevation",
    "end",
    "exponent",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "filterunits",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "fx",
    "fy",
    "g1",
    "g2",
    "glyph-name",
    "glyphref",
    "gradientunits",
    "gradienttransform",
    "height",
    "href",
    "id",
    "image-rendering",
    "in",
    "in2",
    "intercept",
    "k",
    "k1",
    "k2",
    "k3",
    "k4",
    "kerning",
    "keypoints",
    "keysplines",
    "keytimes",
    "lang",
    "lengthadjust",
    "letter-spacing",
    "kernelmatrix",
    "kernelunitlength",
    "lighting-color",
    "local",
    "marker-end",
    "marker-mid",
    "marker-start",
    "markerheight",
    "markerunits",
    "markerwidth",
    "maskcontentunits",
    "maskunits",
    "max",
    "mask",
    "mask-type",
    "media",
    "method",
    "mode",
    "min",
    "name",
    "numoctaves",
    "offset",
    "operator",
    "opacity",
    "order",
    "orient",
    "orientation",
    "origin",
    "overflow",
    "paint-order",
    "path",
    "pathlength",
    "patterncontentunits",
    "patterntransform",
    "patternunits",
    "pointer-events",
    "points",
    "preservealpha",
    "preserveaspectratio",
    "primitiveunits",
    "r",
    "rx",
    "ry",
    "radius",
    "refx",
    "refy",
    "repeatcount",
    "repeatdur",
    "restart",
    "result",
    "rotate",
    "scale",
    "seed",
    "shape-rendering",
    "slope",
    "specularconstant",
    "specularexponent",
    "spreadmethod",
    "startoffset",
    "stddeviation",
    "stitchtiles",
    "stop-color",
    "stop-opacity",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke",
    "stroke-width",
    "style",
    "surfacescale",
    "systemlanguage",
    "tabindex",
    "tablevalues",
    "targetx",
    "targety",
    "transform",
    "transform-origin",
    "text-anchor",
    "text-decoration",
    "text-orientation",
    "text-rendering",
    "textlength",
    "type",
    "u1",
    "u2",
    "unicode",
    "values",
    "vector-effect",
    "viewbox",
    "visibility",
    "version",
    "vert-adv-y",
    "vert-origin-x",
    "vert-origin-y",
    "width",
    "word-spacing",
    "wrap",
    "writing-mode",
    "xchannelselector",
    "ychannelselector",
    "x",
    "x1",
    "x2",
    "xmlns",
    "y",
    "y1",
    "y2",
    "z",
    "zoomandpan"
  ]);
  var mathMl = freeze([
    "accent",
    "accentunder",
    "align",
    "bevelled",
    "close",
    "columnalign",
    "columnlines",
    "columnspacing",
    "columnspan",
    "denomalign",
    "depth",
    "dir",
    "display",
    "displaystyle",
    "encoding",
    "fence",
    "frame",
    "height",
    "href",
    "id",
    "largeop",
    "length",
    "linethickness",
    "lquote",
    "lspace",
    "mathbackground",
    "mathcolor",
    "mathsize",
    "mathvariant",
    "maxsize",
    "minsize",
    "movablelimits",
    "notation",
    "numalign",
    "open",
    "rowalign",
    "rowlines",
    "rowspacing",
    "rowspan",
    "rspace",
    "rquote",
    "scriptlevel",
    "scriptminsize",
    "scriptsizemultiplier",
    "selection",
    "separator",
    "separators",
    "stretchy",
    "subscriptshift",
    "supscriptshift",
    "symmetric",
    "voffset",
    "width",
    "xmlns"
  ]);
  var xml = freeze([
    "xlink:href",
    "xml:id",
    "xlink:title",
    "xml:space",
    "xmlns:xlink"
  ]);
  var MUSTACHE_EXPR = seal(/{{[\w\W]*|^[\w\W]*}}/g);
  var ERB_EXPR = seal(/<%[\w\W]*|^[\w\W]*%>/g);
  var TMPLIT_EXPR = seal(/\${[\w\W]*/g);
  var DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]+$/);
  var ARIA_ATTR = seal(/^aria-[\-\w]+$/);
  var IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i);
  var IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
  var ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g);
  var DOCTYPE_NAME = seal(/^html$/i);
  var CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);
  var ELEMENT_MARKUP_PROBE = seal(/<[/\w!]/g);
  var COMMENT_MARKUP_PROBE = seal(/<[/\w]/g);
  var FALLBACK_TAG_CLOSE = seal(/<\/no(script|embed|frames)/i);
  var SELF_CLOSING_TAG = seal(/\/>/i);
  var NODE_TYPE = {
    element: 1,
    attribute: 2,
    text: 3,
    cdataSection: 4,
    entityReference: 5,
    entityNode: 6,
    processingInstruction: 7,
    comment: 8,
    document: 9,
    documentType: 10,
    documentFragment: 11,
    notation: 12
  };
  var LITERAL_TEXT_ELEMENTS = freeze(addToSet({}, [
    "style",
    "script",
    "xmp",
    "iframe",
    "noembed",
    "noframes",
    "plaintext",
    "noscript"
  ]));
  var getGlobal = function getGlobal2() {
    return typeof window === "undefined" ? null : window;
  };
  var _createTrustedTypesPolicy = function _createTrustedTypesPolicy2(trustedTypes, purifyHostElement) {
    if (typeof trustedTypes !== "object" || typeof trustedTypes.createPolicy !== "function") return null;
    let suffix = null;
    const ATTR_NAME = "data-tt-policy-suffix";
    if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) suffix = purifyHostElement.getAttribute(ATTR_NAME);
    const policyName = "dompurify" + (suffix ? "#" + suffix : "");
    try {
      return trustedTypes.createPolicy(policyName, {
        createHTML(html2) {
          return html2;
        },
        createScriptURL(scriptUrl) {
          return scriptUrl;
        }
      });
    } catch (_) {
      console.warn("TrustedTypes policy " + policyName + " could not be created.");
      return null;
    }
  };
  var _createHooksMap = function _createHooksMap2() {
    return {
      afterSanitizeAttributes: [],
      afterSanitizeElements: [],
      afterSanitizeShadowDOM: [],
      beforeSanitizeAttributes: [],
      beforeSanitizeElements: [],
      beforeSanitizeShadowDOM: [],
      uponSanitizeAttribute: [],
      uponSanitizeElement: [],
      uponSanitizeShadowNode: []
    };
  };
  var _resolveSetOption = function _resolveSetOption2(cfg, key, fallback, options) {
    return objectHasOwnProperty(cfg, key) && arrayIsArray(cfg[key]) ? addToSet(options.base ? clone(options.base) : {}, cfg[key], options.transform) : fallback;
  };
  var _resolveObjectOption = function _resolveObjectOption2(cfg, key, makeFallback) {
    const value = objectHasOwnProperty(cfg, key) ? cfg[key] : void 0;
    return value && typeof value === "object" ? clone(value) : makeFallback();
  };
  function createDOMPurify() {
    let window2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getGlobal();
    const DOMPurify = (root) => createDOMPurify(root);
    DOMPurify.version = "3.4.17";
    DOMPurify.removed = [];
    if (!window2 || !window2.document || window2.document.nodeType !== NODE_TYPE.document || !window2.Element) {
      DOMPurify.isSupported = false;
      return DOMPurify;
    }
    let document = window2.document;
    const originalDocument = document;
    const currentScript = originalDocument.currentScript;
    window2.DocumentFragment;
    const HTMLTemplateElement = window2.HTMLTemplateElement, Node = window2.Node, Element = window2.Element, NodeFilter = window2.NodeFilter;
    window2.NamedNodeMap === void 0 && (window2.NamedNodeMap || window2.MozNamedAttrMap);
    window2.HTMLFormElement;
    const DOMParser2 = window2.DOMParser, trustedTypes = window2.trustedTypes;
    const ElementPrototype = Element.prototype;
    const cloneNode = lookupGetter(ElementPrototype, "cloneNode");
    const remove = lookupGetter(ElementPrototype, "remove");
    const removeAttributeNode = lookupGetter(ElementPrototype, "removeAttributeNode");
    const getNextSibling = lookupGetter(ElementPrototype, "nextSibling");
    const getChildNodes = lookupGetter(ElementPrototype, "childNodes");
    const getParentNode = lookupGetter(ElementPrototype, "parentNode");
    const getShadowRoot = lookupGetter(ElementPrototype, "shadowRoot");
    const getAttributes = lookupGetter(ElementPrototype, "attributes");
    const getNodeType = Node && Node.prototype ? lookupGetter(Node.prototype, "nodeType") : null;
    const getNodeName = Node && Node.prototype ? lookupGetter(Node.prototype, "nodeName") : null;
    const getOwnerDocument = Node && Node.prototype ? lookupGetter(Node.prototype, "ownerDocument") : null;
    const _readNodeType = function _readNodeType2(node) {
      return getNodeType ? getNodeType(node) : node.nodeType;
    };
    const _readNodeName = function _readNodeName2(node) {
      return getNodeName ? getNodeName(node) : node.nodeName;
    };
    const getNamespaceURI = lookupAccessor(ElementPrototype, "namespaceURI");
    const _readNamespaceURI = function _readNamespaceURI2(element) {
      return getNamespaceURI ? getNamespaceURI(element) : element.namespaceURI;
    };
    if (typeof HTMLTemplateElement === "function") {
      const template = document.createElement("template");
      if (template.content && template.content.ownerDocument) document = template.content.ownerDocument;
    }
    let trustedTypesPolicy;
    let emptyHTML = "";
    let defaultTrustedTypesPolicy;
    let defaultTrustedTypesPolicyResolved = false;
    let IN_TRUSTED_TYPES_POLICY = 0;
    const _assertNotInTrustedTypesPolicy = function _assertNotInTrustedTypesPolicy2() {
      if (IN_TRUSTED_TYPES_POLICY > 0) throw typeErrorCreate('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.');
    };
    const _createTrustedHTML = function _createTrustedHTML2(html2) {
      _assertNotInTrustedTypesPolicy();
      IN_TRUSTED_TYPES_POLICY++;
      try {
        return trustedTypesPolicy.createHTML(html2);
      } finally {
        IN_TRUSTED_TYPES_POLICY--;
      }
    };
    const _createTrustedScriptURL = function _createTrustedScriptURL2(scriptUrl) {
      _assertNotInTrustedTypesPolicy();
      IN_TRUSTED_TYPES_POLICY++;
      try {
        return trustedTypesPolicy.createScriptURL(scriptUrl);
      } finally {
        IN_TRUSTED_TYPES_POLICY--;
      }
    };
    const _getDefaultTrustedTypesPolicy = function _getDefaultTrustedTypesPolicy2() {
      if (!defaultTrustedTypesPolicyResolved) {
        defaultTrustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
        defaultTrustedTypesPolicyResolved = true;
      }
      return defaultTrustedTypesPolicy;
    };
    const _document = document, implementation = _document.implementation, createNodeIterator = _document.createNodeIterator, createDocumentFragment = _document.createDocumentFragment, getElementsByTagName = _document.getElementsByTagName;
    const importNode = originalDocument.importNode;
    let hooks = _createHooksMap();
    DOMPurify.isSupported = typeof entries === "function" && typeof getParentNode === "function" && implementation && implementation.createHTMLDocument !== void 0;
    const MUSTACHE_EXPR$1 = MUSTACHE_EXPR, ERB_EXPR$1 = ERB_EXPR, TMPLIT_EXPR$1 = TMPLIT_EXPR, DATA_ATTR$1 = DATA_ATTR, ARIA_ATTR$1 = ARIA_ATTR, IS_SCRIPT_OR_DATA$1 = IS_SCRIPT_OR_DATA, ATTR_WHITESPACE$1 = ATTR_WHITESPACE, CUSTOM_ELEMENT$1 = CUSTOM_ELEMENT;
    let IS_ALLOWED_URI$1 = IS_ALLOWED_URI;
    let ALLOWED_TAGS = null;
    const DEFAULT_ALLOWED_TAGS = addToSet({}, [
      ...html$1,
      ...svg$1,
      ...svgFilters,
      ...mathMl$1,
      ...text2
    ]);
    let ALLOWED_ATTR = null;
    const DEFAULT_ALLOWED_ATTR = addToSet({}, [
      ...html,
      ...svg,
      ...mathMl,
      ...xml
    ]);
    let CUSTOM_ELEMENT_HANDLING = Object.seal(create(null, {
      tagNameCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      },
      attributeNameCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      },
      allowCustomizedBuiltInElements: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: false
      }
    }));
    let FORBID_TAGS = null;
    let FORBID_ATTR = null;
    const EXTRA_ELEMENT_HANDLING = Object.seal(create(null, {
      tagCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      },
      attributeCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      }
    }));
    let ALLOW_ARIA_ATTR = true;
    let ALLOW_DATA_ATTR = true;
    let ALLOW_UNKNOWN_PROTOCOLS = false;
    let ALLOW_SELF_CLOSE_IN_ATTR = true;
    let SAFE_FOR_TEMPLATES = false;
    let SAFE_FOR_XML = true;
    let WHOLE_DOCUMENT = false;
    let SET_CONFIG = false;
    let SET_CONFIG_ALLOWED_TAGS = null;
    let SET_CONFIG_ALLOWED_ATTR = null;
    let FORCE_BODY = false;
    let RETURN_DOM = false;
    let RETURN_DOM_FRAGMENT = false;
    let RETURN_TRUSTED_TYPE = false;
    let SANITIZE_DOM = true;
    let SANITIZE_NAMED_PROPS = false;
    const SANITIZE_NAMED_PROPS_PREFIX = "user-content-";
    let KEEP_CONTENT = true;
    let IN_PLACE = false;
    let IN_PLACE_VISITED = null;
    let USE_PROFILES = {};
    let FORBID_CONTENTS = null;
    const DEFAULT_FORBID_CONTENTS = addToSet({}, [
      "annotation-xml",
      "audio",
      "colgroup",
      "desc",
      "foreignobject",
      "head",
      "iframe",
      "math",
      "mi",
      "mn",
      "mo",
      "ms",
      "mtext",
      "noembed",
      "noframes",
      "noscript",
      "plaintext",
      "script",
      "selectedcontent",
      "style",
      "svg",
      "template",
      "thead",
      "title",
      "video",
      "xmp"
    ]);
    let DATA_URI_TAGS = null;
    const DEFAULT_DATA_URI_TAGS = addToSet({}, [
      "audio",
      "video",
      "img",
      "source",
      "image",
      "track"
    ]);
    let URI_SAFE_ATTRIBUTES = null;
    const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, [
      "alt",
      "class",
      "for",
      "id",
      "label",
      "name",
      "pattern",
      "placeholder",
      "role",
      "summary",
      "title",
      "value",
      "style",
      "xmlns"
    ]);
    const MATHML_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
    const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
    const HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
    let NAMESPACE = HTML_NAMESPACE;
    let IS_EMPTY_INPUT = false;
    let ALLOWED_NAMESPACES = null;
    const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [
      MATHML_NAMESPACE,
      SVG_NAMESPACE,
      HTML_NAMESPACE
    ], stringToString);
    const DEFAULT_MATHML_TEXT_INTEGRATION_POINTS = freeze([
      "mi",
      "mo",
      "mn",
      "ms",
      "mtext"
    ]);
    let MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, DEFAULT_MATHML_TEXT_INTEGRATION_POINTS);
    const DEFAULT_HTML_INTEGRATION_POINTS = freeze(["annotation-xml"]);
    let HTML_INTEGRATION_POINTS = addToSet({}, DEFAULT_HTML_INTEGRATION_POINTS);
    const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, [
      "title",
      "style",
      "font",
      "a",
      "script"
    ]);
    let PARSER_MEDIA_TYPE = null;
    const SUPPORTED_PARSER_MEDIA_TYPES = ["application/xhtml+xml", "text/html"];
    const DEFAULT_PARSER_MEDIA_TYPE = "text/html";
    let transformCaseFunc = null;
    let CONFIG = null;
    const formElement = document.createElement("form");
    const isRegexOrFunction = function isRegexOrFunction2(testValue) {
      return testValue instanceof RegExp || testValue instanceof Function;
    };
    const _parseConfig = function _parseConfig2() {
      let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      if (CONFIG && CONFIG === cfg) return;
      if (!cfg || typeof cfg !== "object") cfg = {};
      cfg = clone(cfg);
      PARSER_MEDIA_TYPE = SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;
      transformCaseFunc = PARSER_MEDIA_TYPE === "application/xhtml+xml" ? stringToString : stringToLowerCase;
      ALLOWED_TAGS = _resolveSetOption(cfg, "ALLOWED_TAGS", DEFAULT_ALLOWED_TAGS, { transform: transformCaseFunc });
      ALLOWED_ATTR = _resolveSetOption(cfg, "ALLOWED_ATTR", DEFAULT_ALLOWED_ATTR, { transform: transformCaseFunc });
      ALLOWED_NAMESPACES = _resolveSetOption(cfg, "ALLOWED_NAMESPACES", DEFAULT_ALLOWED_NAMESPACES, { transform: stringToString });
      URI_SAFE_ATTRIBUTES = _resolveSetOption(cfg, "ADD_URI_SAFE_ATTR", DEFAULT_URI_SAFE_ATTRIBUTES, {
        transform: transformCaseFunc,
        base: DEFAULT_URI_SAFE_ATTRIBUTES
      });
      DATA_URI_TAGS = _resolveSetOption(cfg, "ADD_DATA_URI_TAGS", DEFAULT_DATA_URI_TAGS, {
        transform: transformCaseFunc,
        base: DEFAULT_DATA_URI_TAGS
      });
      FORBID_CONTENTS = _resolveSetOption(cfg, "FORBID_CONTENTS", DEFAULT_FORBID_CONTENTS, { transform: transformCaseFunc });
      FORBID_TAGS = _resolveSetOption(cfg, "FORBID_TAGS", clone({}), { transform: transformCaseFunc });
      FORBID_ATTR = _resolveSetOption(cfg, "FORBID_ATTR", clone({}), { transform: transformCaseFunc });
      USE_PROFILES = objectHasOwnProperty(cfg, "USE_PROFILES") ? cfg.USE_PROFILES && typeof cfg.USE_PROFILES === "object" ? clone(cfg.USE_PROFILES) : cfg.USE_PROFILES : false;
      ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false;
      ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false;
      ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false;
      ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false;
      SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false;
      SAFE_FOR_XML = cfg.SAFE_FOR_XML !== false;
      WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false;
      RETURN_DOM = cfg.RETURN_DOM || false;
      RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false;
      RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false;
      FORCE_BODY = cfg.FORCE_BODY || false;
      SANITIZE_DOM = cfg.SANITIZE_DOM !== false;
      SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false;
      KEEP_CONTENT = cfg.KEEP_CONTENT !== false;
      IN_PLACE = cfg.IN_PLACE || false;
      IS_ALLOWED_URI$1 = isRegex(cfg.ALLOWED_URI_REGEXP) ? cfg.ALLOWED_URI_REGEXP : IS_ALLOWED_URI;
      NAMESPACE = typeof cfg.NAMESPACE === "string" ? cfg.NAMESPACE : HTML_NAMESPACE;
      MATHML_TEXT_INTEGRATION_POINTS = _resolveObjectOption(cfg, "MATHML_TEXT_INTEGRATION_POINTS", () => addToSet({}, DEFAULT_MATHML_TEXT_INTEGRATION_POINTS));
      HTML_INTEGRATION_POINTS = _resolveObjectOption(cfg, "HTML_INTEGRATION_POINTS", () => addToSet({}, DEFAULT_HTML_INTEGRATION_POINTS));
      const customElementHandling = _resolveObjectOption(cfg, "CUSTOM_ELEMENT_HANDLING", () => create(null));
      CUSTOM_ELEMENT_HANDLING = create(null);
      if (objectHasOwnProperty(customElementHandling, "tagNameCheck") && isRegexOrFunction(customElementHandling.tagNameCheck)) CUSTOM_ELEMENT_HANDLING.tagNameCheck = customElementHandling.tagNameCheck;
      if (objectHasOwnProperty(customElementHandling, "attributeNameCheck") && isRegexOrFunction(customElementHandling.attributeNameCheck)) CUSTOM_ELEMENT_HANDLING.attributeNameCheck = customElementHandling.attributeNameCheck;
      if (objectHasOwnProperty(customElementHandling, "allowCustomizedBuiltInElements") && typeof customElementHandling.allowCustomizedBuiltInElements === "boolean") CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = customElementHandling.allowCustomizedBuiltInElements;
      seal(CUSTOM_ELEMENT_HANDLING);
      if (SAFE_FOR_TEMPLATES) ALLOW_DATA_ATTR = false;
      if (RETURN_DOM_FRAGMENT) RETURN_DOM = true;
      if (USE_PROFILES) {
        ALLOWED_TAGS = addToSet({}, text2);
        ALLOWED_ATTR = create(null);
        if (USE_PROFILES.html === true) {
          addToSet(ALLOWED_TAGS, html$1);
          addToSet(ALLOWED_ATTR, html);
        }
        if (USE_PROFILES.svg === true) {
          addToSet(ALLOWED_TAGS, svg$1);
          addToSet(ALLOWED_ATTR, svg);
          addToSet(ALLOWED_ATTR, xml);
        }
        if (USE_PROFILES.svgFilters === true) {
          addToSet(ALLOWED_TAGS, svgFilters);
          addToSet(ALLOWED_ATTR, svg);
          addToSet(ALLOWED_ATTR, xml);
        }
        if (USE_PROFILES.mathMl === true) {
          addToSet(ALLOWED_TAGS, mathMl$1);
          addToSet(ALLOWED_ATTR, mathMl);
          addToSet(ALLOWED_ATTR, xml);
        }
      }
      EXTRA_ELEMENT_HANDLING.tagCheck = null;
      EXTRA_ELEMENT_HANDLING.attributeCheck = null;
      if (objectHasOwnProperty(cfg, "ADD_TAGS")) {
        if (typeof cfg.ADD_TAGS === "function") EXTRA_ELEMENT_HANDLING.tagCheck = cfg.ADD_TAGS;
        else if (arrayIsArray(cfg.ADD_TAGS)) {
          if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) ALLOWED_TAGS = clone(ALLOWED_TAGS);
          addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
        }
      }
      if (objectHasOwnProperty(cfg, "ADD_ATTR")) {
        if (typeof cfg.ADD_ATTR === "function") EXTRA_ELEMENT_HANDLING.attributeCheck = cfg.ADD_ATTR;
        else if (arrayIsArray(cfg.ADD_ATTR)) {
          if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) ALLOWED_ATTR = clone(ALLOWED_ATTR);
          addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
        }
      }
      if (objectHasOwnProperty(cfg, "ADD_FORBID_CONTENTS") && arrayIsArray(cfg.ADD_FORBID_CONTENTS)) {
        if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) FORBID_CONTENTS = clone(FORBID_CONTENTS);
        addToSet(FORBID_CONTENTS, cfg.ADD_FORBID_CONTENTS, transformCaseFunc);
      }
      if (KEEP_CONTENT) ALLOWED_TAGS["#text"] = true;
      if (WHOLE_DOCUMENT) addToSet(ALLOWED_TAGS, [
        "html",
        "head",
        "body"
      ]);
      if (ALLOWED_TAGS.table) {
        addToSet(ALLOWED_TAGS, ["tbody"]);
        delete FORBID_TAGS.tbody;
      }
      if (cfg.TRUSTED_TYPES_POLICY) {
        if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== "function") throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== "function") throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        const previousTrustedTypesPolicy = trustedTypesPolicy;
        trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;
        try {
          emptyHTML = _createTrustedHTML("");
        } catch (error2) {
          trustedTypesPolicy = previousTrustedTypesPolicy;
          throw error2;
        }
      } else if (cfg.TRUSTED_TYPES_POLICY === null) {
        trustedTypesPolicy = void 0;
        emptyHTML = "";
      } else {
        if (trustedTypesPolicy === void 0) trustedTypesPolicy = _getDefaultTrustedTypesPolicy();
        if (trustedTypesPolicy && typeof emptyHTML === "string") emptyHTML = _createTrustedHTML("");
      }
      if (freeze) freeze(cfg);
      CONFIG = cfg;
    };
    const ALL_SVG_TAGS = addToSet({}, [
      ...svg$1,
      ...svgFilters,
      ...svgDisallowed
    ]);
    const ALL_MATHML_TAGS = addToSet({}, [...mathMl$1, ...mathMlDisallowed]);
    const _checkSvgNamespace = function _checkSvgNamespace2(tagName, parent, parentTagName) {
      if (parent.namespaceURI === HTML_NAMESPACE) return tagName === "svg";
      if (parent.namespaceURI === MATHML_NAMESPACE) return tagName === "svg" && (parentTagName === "annotation-xml" || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
      return Boolean(ALL_SVG_TAGS[tagName]);
    };
    const _checkMathMlNamespace = function _checkMathMlNamespace2(tagName, parent, parentTagName) {
      if (parent.namespaceURI === HTML_NAMESPACE) return tagName === "math";
      if (parent.namespaceURI === SVG_NAMESPACE) return tagName === "math" && HTML_INTEGRATION_POINTS[parentTagName];
      return Boolean(ALL_MATHML_TAGS[tagName]);
    };
    const _checkHtmlNamespace = function _checkHtmlNamespace2(tagName, parent, parentTagName) {
      if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) return false;
      if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) return false;
      return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
    };
    const _checkValidNamespace = function _checkValidNamespace2(element) {
      const elementNamespace = _readNamespaceURI(element);
      const tagName = stringToLowerCase(_readNodeName(element));
      const parentNode = getParentNode(element);
      let parent;
      let parentTagName;
      if (parentNode && _readNodeType(parentNode) === NODE_TYPE.element) {
        parent = { namespaceURI: _readNamespaceURI(parentNode) };
        parentTagName = stringToLowerCase(_readNodeName(parentNode));
      } else {
        parent = { namespaceURI: NAMESPACE };
        parentTagName = "template";
      }
      if (!ALLOWED_NAMESPACES[elementNamespace]) return false;
      if (elementNamespace === SVG_NAMESPACE) return _checkSvgNamespace(tagName, parent, parentTagName);
      if (elementNamespace === MATHML_NAMESPACE) return _checkMathMlNamespace(tagName, parent, parentTagName);
      if (elementNamespace === HTML_NAMESPACE) return _checkHtmlNamespace(tagName, parent, parentTagName);
      if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && ALLOWED_NAMESPACES[elementNamespace]) return true;
      return false;
    };
    const _forceRemove = function _forceRemove2(node) {
      arrayPush(DOMPurify.removed, { element: node });
      try {
        getParentNode(node).removeChild(node);
      } catch (_) {
        remove(node);
        if (!getParentNode(node)) throw typeErrorCreate("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place");
      }
    };
    const _stripAttributeNode = function _stripAttributeNode2(element, attribute2, name50) {
      try {
        removeAttributeNode(element, attribute2);
      } catch (_) {
        try {
          element.removeAttribute(name50);
        } catch (_2) {
        }
      }
    };
    const _neutralizeRoot = function _neutralizeRoot2(root) {
      _neutralizeSubtree(root);
      const childNodes = getChildNodes(root);
      if (childNodes) arrayForEach(arraySlice(childNodes), (child) => {
        try {
          remove(child);
        } catch (_) {
        }
      });
      const attributes = _readNodeType(root) === NODE_TYPE.element ? getAttributes(root) : null;
      if (attributes) for (let i = attributes.length - 1; i >= 0; --i) {
        const attribute2 = attributes[i];
        const name50 = attribute2 && attribute2.name;
        if (typeof name50 === "string") _stripAttributeNode(root, attribute2, name50);
      }
    };
    const _removeAttribute = function _removeAttribute2(name50, element, attr) {
      if (!attr) try {
        attr = element.getAttributeNode(name50);
      } catch (_) {
        attr = null;
      }
      arrayPush(DOMPurify.removed, {
        attribute: attr || null,
        from: element
      });
      try {
        if (attr) removeAttributeNode(element, attr);
        else element.removeAttribute(name50);
      } catch (_) {
        try {
          element.removeAttribute(name50);
        } catch (_2) {
        }
      }
      if (name50 === "is") {
        if (RETURN_DOM || RETURN_DOM_FRAGMENT) try {
          _forceRemove(element);
        } catch (_) {
        }
        else try {
          element.setAttribute(name50, "");
        } catch (_) {
        }
      }
    };
    const _stripDisallowedAttributes = function _stripDisallowedAttributes2(element) {
      const attributes = getAttributes(element);
      if (!attributes) return;
      for (let i = attributes.length - 1; i >= 0; --i) {
        const attribute2 = attributes[i];
        const name50 = attribute2 && attribute2.name;
        if (typeof name50 !== "string" || ALLOWED_ATTR[transformCaseFunc(name50)]) continue;
        _stripAttributeNode(element, attribute2, name50);
      }
    };
    const _walkTree = function _walkTree2(root, visit) {
      let intoShadow = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      const stack = [root];
      while (stack.length > 0) {
        const node = stack.pop();
        if (visit(node) === false) continue;
        if (intoShadow && _readNodeType(node) === NODE_TYPE.element) {
          const shadowRoot = getShadowRoot(node);
          if (_isDocumentFragment(shadowRoot)) stack.push(shadowRoot);
        }
        const childNodes = getChildNodes(node);
        if (childNodes) for (let i = childNodes.length - 1; i >= 0; --i) stack.push(childNodes[i]);
      }
    };
    const _neutralizeSubtree = function _neutralizeSubtree2(root) {
      _walkTree(root, (node) => {
        if (_readNodeType(node) === NODE_TYPE.element) _stripDisallowedAttributes(node);
      });
    };
    const _collectLiveNodes = function _collectLiveNodes2(root) {
      const nodes = [];
      _walkTree(root, (node) => {
        nodes.push(node);
      }, true);
      return nodes;
    };
    const _neutralizeEscapedElements = function _neutralizeEscapedElements2(root, before) {
      const reachable = setCreate();
      arrayForEach(_collectLiveNodes(root), (node) => {
        if (_readNodeType(node) === NODE_TYPE.element) setAdd(reachable, node);
      });
      arrayForEach(before, (node) => {
        if (_readNodeType(node) === NODE_TYPE.element && !setHas(reachable, node)) _stripDisallowedAttributes(node);
      });
    };
    const _neutralizeDiscarded = function _neutralizeDiscarded2(root, before) {
      let rootRemoved = false;
      arrayForEach(DOMPurify.removed, (entry) => {
        if (entry.element) {
          rootRemoved = rootRemoved || entry.element === root;
          _neutralizeSubtree(entry.element);
        }
      });
      _neutralizeEscapedElements(root, before);
      return rootRemoved;
    };
    const MAX_UNVISITED_ROUNDS = 8;
    const _sanitizeUnvisitedNodes = function _sanitizeUnvisitedNodes2(root, before) {
      const visited = IN_PLACE_VISITED;
      let original = null;
      const getOriginal = () => {
        if (!original) {
          original = setCreate();
          arrayForEach(before, (beforeNode) => {
            setAdd(original, beforeNode);
          });
        }
        return original;
      };
      for (let round = 0; ; round++) {
        const live = _collectLiveNodes(root);
        const containers = [root];
        let pending = false;
        arrayForEach(live, (node) => {
          if (_readNodeType(node) === NODE_TYPE.documentFragment) arrayPush(containers, node);
          else if (!pending && !setHas(visited, node)) pending = setHas(getOriginal(), node);
        });
        if (!pending) return;
        if (round >= MAX_UNVISITED_ROUNDS) throw typeErrorCreate("the tree kept changing during in-place sanitization; refusing to return it");
        arrayForEach(containers, (container, index) => {
          _sanitizeUnvisitedIn(container, index > 0, root, getOriginal());
        });
      }
    };
    const _sanitizeUnvisitedIn = function _sanitizeUnvisitedIn2(container, inShadow, root, original) {
      const iterator = _createNodeIterator(container);
      let node;
      while (node = iterator.nextNode()) {
        if (!setHas(original, node) || setHas(IN_PLACE_VISITED, node)) continue;
        if (inShadow) _executeHooks(hooks.uponSanitizeShadowNode, node, null);
        _sanitizeElements(node, root);
        _sanitizeAttributes(node, root);
        if (_isDocumentFragment(node.content)) _sanitizeShadowDOM2(node.content);
      }
    };
    const _markVisited = function _markVisited2(node) {
      if (IN_PLACE_VISITED) setAdd(IN_PLACE_VISITED, node);
    };
    const _isPatchLinkageAttribute = function _isPatchLinkageAttribute2(lcName, lcTag) {
      if (!SAFE_FOR_XML) return false;
      if (lcName === "patchsrc") return true;
      return lcName === "for" && lcTag !== "label" && lcTag !== "output";
    };
    const _neutralizePatchLinkage = function _neutralizePatchLinkage2(root) {
      if (!SAFE_FOR_XML) return;
      _walkTree(root, (node) => {
        const nodeType = _readNodeType(node);
        if (nodeType === NODE_TYPE.processingInstruction || nodeType === NODE_TYPE.comment && regExpTest(COMMENT_MARKUP_PROBE, node.data)) {
          try {
            remove(node);
          } catch (_) {
          }
          return false;
        }
        if (nodeType === NODE_TYPE.element) {
          const element = node;
          const lcTag = transformCaseFunc(_readNodeName(node));
          try {
            if (element.hasAttribute && element.hasAttribute("patchsrc")) element.removeAttribute("patchsrc");
            if (element.hasAttribute && element.hasAttribute("for") && _isPatchLinkageAttribute("for", lcTag)) element.removeAttribute("for");
          } catch (_) {
          }
        }
        return true;
      });
    };
    const _initDocument = function _initDocument2(dirty) {
      let doc = null;
      let leadingWhitespace = null;
      if (FORCE_BODY) dirty = "<remove></remove>" + dirty;
      else {
        const matches = stringMatch(dirty, /^[\r\n\t ]+/);
        leadingWhitespace = matches && matches[0];
      }
      if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && NAMESPACE === HTML_NAMESPACE) dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + "</body></html>";
      const dirtyPayload = trustedTypesPolicy ? _createTrustedHTML(dirty) : dirty;
      if (NAMESPACE === HTML_NAMESPACE) try {
        doc = new DOMParser2().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
      } catch (_) {
      }
      if (!doc || !doc.documentElement) {
        doc = implementation.createDocument(NAMESPACE, "template", null);
        try {
          doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
        } catch (_) {
        }
      }
      const body = doc.body || doc.documentElement;
      if (dirty && leadingWhitespace) body.insertBefore(document.createTextNode(leadingWhitespace), body.childNodes[0] || null);
      if (NAMESPACE === HTML_NAMESPACE) return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? "html" : "body")[0];
      return WHOLE_DOCUMENT ? doc.documentElement : body;
    };
    const _createNodeIterator = function _createNodeIterator2(root) {
      const doc = getOwnerDocument ? getOwnerDocument(root) : root.ownerDocument;
      return createNodeIterator.call(doc || root, root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_PROCESSING_INSTRUCTION | NodeFilter.SHOW_CDATA_SECTION, null);
    };
    const _stripTemplateExpressions = function _stripTemplateExpressions2(value) {
      value = stringReplace(value, MUSTACHE_EXPR$1, " ");
      value = stringReplace(value, ERB_EXPR$1, " ");
      value = stringReplace(value, TMPLIT_EXPR$1, " ");
      return value;
    };
    const _scrubTemplateExpressions2 = function _scrubTemplateExpressions(node) {
      var _node$querySelectorAl;
      _scrubOwnCharacterData(node);
      const templates = (_node$querySelectorAl = node.querySelectorAll) === null || _node$querySelectorAl === void 0 ? void 0 : _node$querySelectorAl.call(node, "template");
      if (templates) arrayForEach(templates, (tmpl) => {
        if (_isDocumentFragment(tmpl.content)) _scrubTemplateExpressions2(tmpl.content);
      });
    };
    const _scrubOwnCharacterData = function _scrubOwnCharacterData2(node) {
      node.normalize();
      const doc = getOwnerDocument ? getOwnerDocument(node) : node.ownerDocument;
      const walker = createNodeIterator.call(doc || node, node, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_CDATA_SECTION | NodeFilter.SHOW_PROCESSING_INSTRUCTION, null);
      let currentNode = walker.nextNode();
      while (currentNode) {
        currentNode.data = _stripTemplateExpressions(currentNode.data);
        currentNode = walker.nextNode();
      }
    };
    const _isClobbered = function _isClobbered2(element) {
      const realTagName = getNodeName ? getNodeName(element) : null;
      if (typeof realTagName !== "string") return false;
      if (transformCaseFunc(realTagName) !== "form") return false;
      return typeof element.nodeName !== "string" || typeof element.textContent !== "string" || typeof element.removeChild !== "function" || element.attributes !== getAttributes(element) || typeof element.removeAttribute !== "function" || typeof element.removeAttributeNode !== "function" || typeof element.getAttributeNode !== "function" || typeof element.setAttribute !== "function" || typeof element.namespaceURI !== "string" || typeof element.insertBefore !== "function" || typeof element.hasChildNodes !== "function" || element.nodeType !== getNodeType(element) || element.childNodes !== getChildNodes(element);
    };
    const _isDocumentFragment = function _isDocumentFragment2(value) {
      if (!getNodeType || typeof value !== "object" || value === null) return false;
      try {
        return getNodeType(value) === NODE_TYPE.documentFragment;
      } catch (_) {
        return false;
      }
    };
    const _isNode = function _isNode2(value) {
      if (!getNodeType || typeof value !== "object" || value === null) return false;
      try {
        return typeof getNodeType(value) === "number";
      } catch (_) {
        return false;
      }
    };
    function _executeHooks(hooks2, currentNode, data) {
      if (hooks2.length === 0) return;
      arrayForEach(hooks2, (hook) => {
        hook.call(DOMPurify, currentNode, data, CONFIG);
      });
    }
    const _isUnsafeNode = function _isUnsafeNode2(currentNode, tagName) {
      if (SAFE_FOR_XML && currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(ELEMENT_MARKUP_PROBE, currentNode.textContent) && regExpTest(ELEMENT_MARKUP_PROBE, currentNode.innerHTML)) return true;
      if (SAFE_FOR_XML && LITERAL_TEXT_ELEMENTS[tagName] && _readNodeType(currentNode) === NODE_TYPE.element && _readNamespaceURI(currentNode) === HTML_NAMESPACE && (_isNode(currentNode.firstElementChild) || typeof currentNode.textContent === "string" && regExpTest(ELEMENT_MARKUP_PROBE, currentNode.textContent))) return true;
      if (currentNode.nodeType === NODE_TYPE.processingInstruction) return true;
      if (SAFE_FOR_XML && currentNode.nodeType === NODE_TYPE.comment && regExpTest(COMMENT_MARKUP_PROBE, currentNode.data)) return true;
      return false;
    };
    const _matchesNameCheck = function _matchesNameCheck2(check, name50) {
      if (check instanceof RegExp) return regExpTest(check, name50);
      if (check instanceof Function) {
        for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) args[_key - 2] = arguments[_key];
        return Boolean(check(name50, ...args));
      }
      return false;
    };
    const _sanitizeDisallowedNode = function _sanitizeDisallowedNode2(currentNode, tagName, root) {
      if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName) && _matchesNameCheck(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) return false;
      if (KEEP_CONTENT && !FORBID_CONTENTS[tagName] && !FORBID_CONTENTS[stringToLowerCase(tagName)]) {
        const parentNode = getParentNode(currentNode);
        const childNodes = getChildNodes(currentNode);
        if (childNodes && parentNode) {
          const childCount = childNodes.length;
          for (let i = childCount - 1; i >= 0; --i) {
            const hoisted = currentNode === root ? cloneNode(childNodes[i], true) : childNodes[i];
            parentNode.insertBefore(hoisted, getNextSibling(currentNode));
          }
        }
      }
      _forceRemove(currentNode);
      return true;
    };
    const _forkSharedAllowlist = function _forkSharedAllowlist2(hookList, set2, defaultSet, setConfigSet) {
      if (hookList.length === 0) return set2;
      return set2 === defaultSet || set2 === setConfigSet ? clone(set2) : set2;
    };
    const _handleHookDetachedNode = function _handleHookDetachedNode2(currentNode, root) {
      if (currentNode === root || getParentNode(currentNode) !== null) return false;
      if (IN_PLACE) _neutralizeSubtree(currentNode);
      return true;
    };
    const _sanitizeElements = function _sanitizeElements2(currentNode, root) {
      _markVisited(currentNode);
      _executeHooks(hooks.beforeSanitizeElements, currentNode, null);
      if (_handleHookDetachedNode(currentNode, root)) return true;
      if (_isClobbered(currentNode)) {
        _forceRemove(currentNode);
        return true;
      }
      const tagName = transformCaseFunc(_readNodeName(currentNode));
      ALLOWED_TAGS = _forkSharedAllowlist(hooks.uponSanitizeElement, ALLOWED_TAGS, DEFAULT_ALLOWED_TAGS, SET_CONFIG_ALLOWED_TAGS);
      _executeHooks(hooks.uponSanitizeElement, currentNode, {
        tagName,
        allowedTags: ALLOWED_TAGS
      });
      if (_handleHookDetachedNode(currentNode, root)) return true;
      if (_isUnsafeNode(currentNode, tagName)) {
        _forceRemove(currentNode);
        return true;
      }
      if (FORBID_TAGS[tagName] || !(EXTRA_ELEMENT_HANDLING.tagCheck instanceof Function && EXTRA_ELEMENT_HANDLING.tagCheck(tagName)) && !ALLOWED_TAGS[tagName]) {
        const removed = _sanitizeDisallowedNode(currentNode, tagName, root);
        if (removed === false) {
          _executeHooks(hooks.afterSanitizeElements, currentNode, null);
          if (_handleHookDetachedNode(currentNode, root)) return true;
        }
        return removed;
      }
      if (_readNodeType(currentNode) === NODE_TYPE.element && !_checkValidNamespace(currentNode)) {
        _forceRemove(currentNode);
        return true;
      }
      if ((tagName === "noscript" || tagName === "noembed" || tagName === "noframes") && regExpTest(FALLBACK_TAG_CLOSE, currentNode.innerHTML)) {
        _forceRemove(currentNode);
        return true;
      }
      if (SAFE_FOR_TEMPLATES && currentNode.nodeType === NODE_TYPE.text) {
        const content = _stripTemplateExpressions(currentNode.textContent);
        if (currentNode.textContent !== content) {
          arrayPush(DOMPurify.removed, { element: currentNode.cloneNode() });
          currentNode.textContent = content;
        }
      }
      _executeHooks(hooks.afterSanitizeElements, currentNode, null);
      return _handleHookDetachedNode(currentNode, root);
    };
    const _isValidAttribute = function _isValidAttribute2(lcTag, lcName, value) {
      if (FORBID_ATTR[lcName]) return false;
      if (_isPatchLinkageAttribute(lcName, lcTag)) return false;
      if (SANITIZE_DOM && (lcName === "id" || lcName === "name") && (value in document || value in formElement)) return false;
      const nameIsPermitted = ALLOWED_ATTR[lcName] || EXTRA_ELEMENT_HANDLING.attributeCheck instanceof Function && EXTRA_ELEMENT_HANDLING.attributeCheck(lcName, lcTag);
      if (ALLOW_DATA_ATTR && regExpTest(DATA_ATTR$1, lcName)) return true;
      if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR$1, lcName)) return true;
      if (!nameIsPermitted) return _isBasicCustomElement(lcTag) && _matchesNameCheck(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) && _matchesNameCheck(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName, lcTag) || lcName === "is" && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && _matchesNameCheck(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value);
      if (URI_SAFE_ATTRIBUTES[lcName]) return true;
      if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE$1, ""))) return true;
      if ((lcName === "src" || lcName === "xlink:href" || lcName === "href") && lcTag !== "script" && stringIndexOf(value, "data:") === 0 && DATA_URI_TAGS[lcTag]) return true;
      if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA$1, stringReplace(value, ATTR_WHITESPACE$1, ""))) return true;
      return !value;
    };
    const RESERVED_CUSTOM_ELEMENT_NAMES = addToSet({}, [
      "annotation-xml",
      "color-profile",
      "font-face",
      "font-face-format",
      "font-face-name",
      "font-face-src",
      "font-face-uri",
      "missing-glyph"
    ]);
    const _isBasicCustomElement = function _isBasicCustomElement2(tagName) {
      return !RESERVED_CUSTOM_ELEMENT_NAMES[stringToLowerCase(tagName)] && regExpTest(CUSTOM_ELEMENT$1, tagName);
    };
    const _applyTrustedTypesToAttribute = function _applyTrustedTypesToAttribute2(lcTag, lcName, namespaceURI, value) {
      if (trustedTypesPolicy && typeof trustedTypes === "object" && typeof trustedTypes.getAttributeType === "function" && !namespaceURI) switch (trustedTypes.getAttributeType(lcTag, lcName)) {
        case "TrustedHTML":
          return _createTrustedHTML(value);
        case "TrustedScriptURL":
          return _createTrustedScriptURL(value);
      }
      return value;
    };
    const _setAttributeValue = function _setAttributeValue2(currentNode, name50, namespaceURI, value) {
      try {
        if (namespaceURI) currentNode.setAttributeNS(namespaceURI, name50, value);
        else currentNode.setAttribute(name50, value);
        if (_isClobbered(currentNode)) {
          _forceRemove(currentNode);
          return false;
        }
        return true;
      } catch (_) {
        _removeAttribute(name50, currentNode);
        return false;
      }
    };
    const _isUnsafeAttributeValue = function _isUnsafeAttributeValue2(name50, value) {
      if (SAFE_FOR_XML && regExpTest(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, value)) return true;
      return stringToLowerCase(name50) === "attributename" && stringMatch(value, "href") !== null;
    };
    const _sanitizeAttributes = function _sanitizeAttributes2(currentNode, root) {
      _executeHooks(hooks.beforeSanitizeAttributes, currentNode, null);
      if (_handleHookDetachedNode(currentNode, root)) return;
      const attributes = currentNode.attributes;
      if (!attributes || _isClobbered(currentNode)) return;
      ALLOWED_ATTR = _forkSharedAllowlist(hooks.uponSanitizeAttribute, ALLOWED_ATTR, DEFAULT_ALLOWED_ATTR, SET_CONFIG_ALLOWED_ATTR);
      const hookEvent = {
        attrName: "",
        attrValue: "",
        keepAttr: true,
        allowedAttributes: ALLOWED_ATTR,
        forceKeepAttr: void 0
      };
      let l = attributes.length;
      const lcTag = transformCaseFunc(currentNode.nodeName);
      while (l--) {
        const attr = attributes[l];
        const name50 = attr.name, namespaceURI = attr.namespaceURI, attrValue = attr.value;
        const lcName = transformCaseFunc(name50);
        const initValue = attrValue;
        let value = name50 === "value" ? initValue : stringTrim(initValue);
        let recreatedNamedProp = false;
        hookEvent.attrName = lcName;
        hookEvent.attrValue = value;
        hookEvent.keepAttr = true;
        hookEvent.forceKeepAttr = void 0;
        _executeHooks(hooks.uponSanitizeAttribute, currentNode, hookEvent);
        value = hookEvent.attrValue;
        if (SANITIZE_NAMED_PROPS && (lcName === "id" || lcName === "name") && stringIndexOf(value, SANITIZE_NAMED_PROPS_PREFIX) !== 0) {
          _removeAttribute(name50, currentNode, attr);
          value = SANITIZE_NAMED_PROPS_PREFIX + value;
          recreatedNamedProp = true;
        }
        if (_isUnsafeAttributeValue(name50, value)) {
          _removeAttribute(name50, currentNode, attr);
          continue;
        }
        if (hookEvent.forceKeepAttr) continue;
        if (!hookEvent.keepAttr) {
          _removeAttribute(name50, currentNode, attr);
          continue;
        }
        if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(SELF_CLOSING_TAG, value)) {
          _removeAttribute(name50, currentNode, attr);
          continue;
        }
        if (SAFE_FOR_TEMPLATES) value = _stripTemplateExpressions(value);
        if (!_isValidAttribute(lcTag, lcName, value)) {
          _removeAttribute(name50, currentNode, attr);
          continue;
        }
        value = _applyTrustedTypesToAttribute(lcTag, lcName, namespaceURI, value);
        if (value !== initValue) {
          if (_setAttributeValue(currentNode, name50, namespaceURI, value) && recreatedNamedProp) arrayPop(DOMPurify.removed);
        }
      }
      _executeHooks(hooks.afterSanitizeAttributes, currentNode, null);
      _handleHookDetachedNode(currentNode, root);
    };
    const _sanitizeShadowDOM2 = function _sanitizeShadowDOM(fragment) {
      let shadowNode = null;
      const shadowIterator = _createNodeIterator(fragment);
      _executeHooks(hooks.beforeSanitizeShadowDOM, fragment, null);
      while (shadowNode = shadowIterator.nextNode()) {
        _executeHooks(hooks.uponSanitizeShadowNode, shadowNode, null);
        _sanitizeElements(shadowNode, fragment);
        _sanitizeAttributes(shadowNode, fragment);
        if (_isDocumentFragment(shadowNode.content)) _sanitizeShadowDOM2(shadowNode.content);
        if (_readNodeType(shadowNode) === NODE_TYPE.element) {
          const innerSr = getShadowRoot(shadowNode);
          if (_isDocumentFragment(innerSr)) {
            _sanitizeAttachedShadowRoots(innerSr);
            _sanitizeShadowDOM2(innerSr);
          }
        }
      }
      if (SAFE_FOR_TEMPLATES) _scrubOwnCharacterData(fragment);
      _executeHooks(hooks.afterSanitizeShadowDOM, fragment, null);
    };
    const _sanitizeAttachedShadowRoots = function _sanitizeAttachedShadowRoots2(root) {
      const stack = [{
        node: root,
        shadow: null
      }];
      while (stack.length > 0) {
        const item = stack.pop();
        if (item.shadow) {
          _sanitizeShadowDOM2(item.shadow);
          continue;
        }
        const node = item.node;
        const isElement = _readNodeType(node) === NODE_TYPE.element;
        const childNodes = getChildNodes(node);
        if (childNodes) for (let i = childNodes.length - 1; i >= 0; --i) stack.push({
          node: childNodes[i],
          shadow: null
        });
        if (isElement) {
          const rootName = getNodeName ? getNodeName(node) : null;
          if (typeof rootName === "string" && transformCaseFunc(rootName) === "template") {
            const content = node.content;
            if (_isDocumentFragment(content)) stack.push({
              node: content,
              shadow: null
            });
          }
        }
        if (isElement) {
          const sr = getShadowRoot(node);
          if (_isDocumentFragment(sr)) stack.push({
            node: null,
            shadow: sr
          }, {
            node: sr,
            shadow: null
          });
        }
      }
    };
    DOMPurify.sanitize = function(dirty) {
      let cfg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      let body = null;
      let importedNode = null;
      let currentNode = null;
      let returnNode = null;
      IS_EMPTY_INPUT = !dirty;
      if (IS_EMPTY_INPUT) dirty = "<!-->";
      if (typeof dirty !== "string" && !_isNode(dirty)) {
        dirty = stringifyValue(dirty);
        if (typeof dirty !== "string") throw typeErrorCreate("dirty is not a string, aborting");
      }
      if (!DOMPurify.isSupported) return dirty;
      if (SET_CONFIG) {
        ALLOWED_TAGS = SET_CONFIG_ALLOWED_TAGS;
        ALLOWED_ATTR = SET_CONFIG_ALLOWED_ATTR;
      } else _parseConfig(cfg);
      if (hooks.uponSanitizeElement.length > 0 || hooks.uponSanitizeAttribute.length > 0) ALLOWED_TAGS = clone(ALLOWED_TAGS);
      if (hooks.uponSanitizeAttribute.length > 0) ALLOWED_ATTR = clone(ALLOWED_ATTR);
      DOMPurify.removed = [];
      const inPlace = IN_PLACE && typeof dirty !== "string" && _isNode(dirty);
      let inPlaceNodes = [];
      const outerVisited = IN_PLACE_VISITED;
      if (inPlace) {
        _neutralizePatchLinkage(dirty);
        const nn = _readNodeName(dirty);
        if (typeof nn === "string") {
          const tagName = transformCaseFunc(nn);
          if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
            _neutralizeRoot(dirty);
            throw typeErrorCreate("root node is forbidden and cannot be sanitized in-place");
          }
        }
        if (_isClobbered(dirty)) {
          _neutralizeRoot(dirty);
          throw typeErrorCreate("root node is clobbered and cannot be sanitized in-place");
        }
        inPlaceNodes = _collectLiveNodes(dirty);
        IN_PLACE_VISITED = setCreate();
      } else if (_isNode(dirty)) {
        body = _initDocument("<!---->");
        importedNode = body.ownerDocument.importNode(dirty, true);
        if (importedNode.nodeType === NODE_TYPE.element && importedNode.nodeName === "BODY") body = importedNode;
        else if (importedNode.nodeName === "HTML") body = importedNode;
        else body.appendChild(importedNode);
        _sanitizeAttachedShadowRoots(body);
      } else {
        if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && dirty.indexOf("<") === -1) return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? _createTrustedHTML(dirty) : dirty;
        body = _initDocument(dirty);
        if (!body) return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : "";
      }
      if (body && FORCE_BODY) _forceRemove(body.firstChild);
      const walkRoot = inPlace ? dirty : body;
      try {
        if (inPlace) _sanitizeAttachedShadowRoots(dirty);
        const nodeIterator = _createNodeIterator(walkRoot);
        while (currentNode = nodeIterator.nextNode()) {
          _sanitizeElements(currentNode, walkRoot);
          _sanitizeAttributes(currentNode, walkRoot);
          if (_isDocumentFragment(currentNode.content)) _sanitizeShadowDOM2(currentNode.content);
        }
        if (inPlace) _sanitizeUnvisitedNodes(dirty, inPlaceNodes);
      } catch (error2) {
        if (inPlace) {
          _neutralizeRoot(dirty);
          _neutralizeDiscarded(dirty, inPlaceNodes);
        }
        throw error2;
      } finally {
        IN_PLACE_VISITED = outerVisited;
      }
      if (inPlace) {
        if (_neutralizeDiscarded(dirty, inPlaceNodes)) throw typeErrorCreate("a node selected for removal could not be safely returned; refusing to sanitize in place");
        if (SAFE_FOR_TEMPLATES) _scrubTemplateExpressions2(dirty);
        return dirty;
      }
      if (RETURN_DOM) {
        if (SAFE_FOR_TEMPLATES) _scrubTemplateExpressions2(body);
        if (RETURN_DOM_FRAGMENT) {
          returnNode = createDocumentFragment.call(body.ownerDocument);
          while (body.firstChild) returnNode.appendChild(body.firstChild);
        } else returnNode = body;
        if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) returnNode = importNode.call(originalDocument, returnNode, true);
        return returnNode;
      }
      let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
      if (WHOLE_DOCUMENT && ALLOWED_TAGS["!doctype"] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) serializedHTML = "<!DOCTYPE " + body.ownerDocument.doctype.name + ">\n" + serializedHTML;
      if (SAFE_FOR_TEMPLATES) serializedHTML = _stripTemplateExpressions(serializedHTML);
      return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? _createTrustedHTML(serializedHTML) : serializedHTML;
    };
    DOMPurify.setConfig = function() {
      let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      _parseConfig(cfg);
      SET_CONFIG = true;
      SET_CONFIG_ALLOWED_TAGS = ALLOWED_TAGS;
      SET_CONFIG_ALLOWED_ATTR = ALLOWED_ATTR;
    };
    DOMPurify.clearConfig = function() {
      CONFIG = null;
      SET_CONFIG = false;
      SET_CONFIG_ALLOWED_TAGS = null;
      SET_CONFIG_ALLOWED_ATTR = null;
      trustedTypesPolicy = defaultTrustedTypesPolicy;
      emptyHTML = "";
    };
    DOMPurify.isValidAttribute = function(tag, attr, value) {
      if (!CONFIG) _parseConfig({});
      const lcTag = transformCaseFunc(tag);
      const lcName = transformCaseFunc(attr);
      if (typeof value === "string" && (_isUnsafeAttributeValue(attr, value) || !ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(SELF_CLOSING_TAG, value))) return false;
      return _isValidAttribute(lcTag, lcName, value);
    };
    DOMPurify.addHook = function(entryPoint, hookFunction) {
      if (typeof hookFunction !== "function") return;
      if (!objectHasOwnProperty(hooks, entryPoint)) return;
      arrayPush(hooks[entryPoint], hookFunction);
    };
    DOMPurify.removeHook = function(entryPoint, hookFunction) {
      if (!objectHasOwnProperty(hooks, entryPoint)) return;
      if (hookFunction !== void 0) {
        const index = arrayLastIndexOf(hooks[entryPoint], hookFunction);
        return index === -1 ? void 0 : arraySplice(hooks[entryPoint], index, 1)[0];
      }
      return arrayPop(hooks[entryPoint]);
    };
    DOMPurify.removeHooks = function(entryPoint) {
      if (!objectHasOwnProperty(hooks, entryPoint)) return;
      hooks[entryPoint] = [];
    };
    DOMPurify.removeAllHooks = function() {
      hooks = _createHooksMap();
    };
    return DOMPurify;
  }
  var purify_default = createDOMPurify();

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/tokenizer/types.js
  var EOF = 0;
  var Ident = 1;
  var Function2 = 2;
  var AtKeyword = 3;
  var Hash = 4;
  var String2 = 5;
  var BadString = 6;
  var Url2 = 7;
  var BadUrl = 8;
  var Delim = 9;
  var Number2 = 10;
  var Percentage = 11;
  var Dimension = 12;
  var WhiteSpace = 13;
  var CDO = 14;
  var CDC = 15;
  var Colon = 16;
  var Semicolon = 17;
  var Comma = 18;
  var LeftSquareBracket = 19;
  var RightSquareBracket = 20;
  var LeftParenthesis = 21;
  var RightParenthesis = 22;
  var LeftCurlyBracket = 23;
  var RightCurlyBracket = 24;
  var Comment = 25;

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/tokenizer/char-code-definitions.js
  var EOF2 = 0;
  function isDigit(code3) {
    return code3 >= 48 && code3 <= 57;
  }
  function isHexDigit(code3) {
    return isDigit(code3) || // 0 .. 9
    code3 >= 65 && code3 <= 70 || // A .. F
    code3 >= 97 && code3 <= 102;
  }
  function isUppercaseLetter(code3) {
    return code3 >= 65 && code3 <= 90;
  }
  function isLowercaseLetter(code3) {
    return code3 >= 97 && code3 <= 122;
  }
  function isLetter2(code3) {
    return isUppercaseLetter(code3) || isLowercaseLetter(code3);
  }
  function isNonAscii(code3) {
    return code3 >= 128;
  }
  function isNameStart(code3) {
    return isLetter2(code3) || isNonAscii(code3) || code3 === 95;
  }
  function isName(code3) {
    return isNameStart(code3) || isDigit(code3) || code3 === 45;
  }
  function isNonPrintable(code3) {
    return code3 >= 0 && code3 <= 8 || code3 === 11 || code3 >= 14 && code3 <= 31 || code3 === 127;
  }
  function isNewline(code3) {
    return code3 === 10 || code3 === 13 || code3 === 12;
  }
  function isWhiteSpace2(code3) {
    return isNewline(code3) || code3 === 32 || code3 === 9;
  }
  function isValidEscape(first, second) {
    if (first !== 92) {
      return false;
    }
    if (isNewline(second) || second === EOF2) {
      return false;
    }
    return true;
  }
  function isIdentifierStart(first, second, third) {
    if (first === 45) {
      return isNameStart(second) || second === 45 || isValidEscape(second, third);
    }
    if (isNameStart(first)) {
      return true;
    }
    if (first === 92) {
      return isValidEscape(first, second);
    }
    return false;
  }
  function isNumberStart(first, second, third) {
    if (first === 43 || first === 45) {
      if (isDigit(second)) {
        return 2;
      }
      return second === 46 && isDigit(third) ? 3 : 0;
    }
    if (first === 46) {
      return isDigit(second) ? 2 : 0;
    }
    if (isDigit(first)) {
      return 1;
    }
    return 0;
  }
  function isBOM(code3) {
    if (code3 === 65279) {
      return 1;
    }
    if (code3 === 65534) {
      return 1;
    }
    return 0;
  }
  var CATEGORY = new Array(128);
  var EofCategory = 128;
  var WhiteSpaceCategory = 130;
  var DigitCategory = 131;
  var NameStartCategory = 132;
  var NonPrintableCategory = 133;
  for (let i = 0; i < CATEGORY.length; i++) {
    CATEGORY[i] = isWhiteSpace2(i) && WhiteSpaceCategory || isDigit(i) && DigitCategory || isNameStart(i) && NameStartCategory || isNonPrintable(i) && NonPrintableCategory || i || EofCategory;
  }
  function charCodeCategory(code3) {
    return code3 < 128 ? CATEGORY[code3] : NameStartCategory;
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/tokenizer/utils.js
  function getCharCode(source, offset) {
    return offset < source.length ? source.charCodeAt(offset) : 0;
  }
  function getNewlineLength(source, offset, code3) {
    if (code3 === 13 && getCharCode(source, offset + 1) === 10) {
      return 2;
    }
    return 1;
  }
  function cmpChar(testStr, offset, referenceCode) {
    let code3 = testStr.charCodeAt(offset);
    if (isUppercaseLetter(code3)) {
      code3 = code3 | 32;
    }
    return code3 === referenceCode;
  }
  function cmpStr(testStr, start, end, referenceStr) {
    if (end - start !== referenceStr.length) {
      return false;
    }
    if (start < 0 || end > testStr.length) {
      return false;
    }
    for (let i = start; i < end; i++) {
      const referenceCode = referenceStr.charCodeAt(i - start);
      let testCode = testStr.charCodeAt(i);
      if (isUppercaseLetter(testCode)) {
        testCode = testCode | 32;
      }
      if (testCode !== referenceCode) {
        return false;
      }
    }
    return true;
  }
  function findWhiteSpaceStart(source, offset) {
    for (; offset >= 0; offset--) {
      if (!isWhiteSpace2(source.charCodeAt(offset))) {
        break;
      }
    }
    return offset + 1;
  }
  function findWhiteSpaceEnd(source, offset) {
    for (; offset < source.length; offset++) {
      if (!isWhiteSpace2(source.charCodeAt(offset))) {
        break;
      }
    }
    return offset;
  }
  function findDecimalNumberEnd(source, offset) {
    for (; offset < source.length; offset++) {
      if (!isDigit(source.charCodeAt(offset))) {
        break;
      }
    }
    return offset;
  }
  function consumeEscaped(source, offset) {
    offset += 2;
    if (isHexDigit(getCharCode(source, offset - 1))) {
      for (const maxOffset = Math.min(source.length, offset + 5); offset < maxOffset; offset++) {
        if (!isHexDigit(getCharCode(source, offset))) {
          break;
        }
      }
      const code3 = getCharCode(source, offset);
      if (isWhiteSpace2(code3)) {
        offset += getNewlineLength(source, offset, code3);
      }
    }
    return offset;
  }
  function consumeName(source, offset) {
    for (; offset < source.length; offset++) {
      const code3 = source.charCodeAt(offset);
      if (isName(code3)) {
        continue;
      }
      if (isValidEscape(code3, getCharCode(source, offset + 1))) {
        offset = consumeEscaped(source, offset) - 1;
        continue;
      }
      break;
    }
    return offset;
  }
  function consumeNumber(source, offset) {
    let code3 = source.charCodeAt(offset);
    if (code3 === 43 || code3 === 45) {
      code3 = source.charCodeAt(offset += 1);
    }
    if (isDigit(code3)) {
      offset = findDecimalNumberEnd(source, offset + 1);
      code3 = source.charCodeAt(offset);
    }
    if (code3 === 46 && isDigit(source.charCodeAt(offset + 1))) {
      offset += 2;
      offset = findDecimalNumberEnd(source, offset);
    }
    if (cmpChar(
      source,
      offset,
      101
      /* e */
    )) {
      let sign = 0;
      code3 = source.charCodeAt(offset + 1);
      if (code3 === 45 || code3 === 43) {
        sign = 1;
        code3 = source.charCodeAt(offset + 2);
      }
      if (isDigit(code3)) {
        offset = findDecimalNumberEnd(source, offset + 1 + sign + 1);
      }
    }
    return offset;
  }
  function consumeBadUrlRemnants(source, offset) {
    for (; offset < source.length; offset++) {
      const code3 = source.charCodeAt(offset);
      if (code3 === 41) {
        offset++;
        break;
      }
      if (isValidEscape(code3, getCharCode(source, offset + 1))) {
        offset = consumeEscaped(source, offset);
      }
    }
    return offset;
  }
  function decodeEscaped(escaped) {
    if (escaped.length === 1 && !isHexDigit(escaped.charCodeAt(0))) {
      return escaped[0];
    }
    let code3 = parseInt(escaped, 16);
    if (code3 === 0 || // If this number is zero,
    code3 >= 55296 && code3 <= 57343 || // or is for a surrogate,
    code3 > 1114111) {
      code3 = 65533;
    }
    return String.fromCodePoint(code3);
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/tokenizer/names.js
  var names_default = [
    "EOF-token",
    "ident-token",
    "function-token",
    "at-keyword-token",
    "hash-token",
    "string-token",
    "bad-string-token",
    "url-token",
    "bad-url-token",
    "delim-token",
    "number-token",
    "percentage-token",
    "dimension-token",
    "whitespace-token",
    "CDO-token",
    "CDC-token",
    "colon-token",
    "semicolon-token",
    "comma-token",
    "[-token",
    "]-token",
    "(-token",
    ")-token",
    "{-token",
    "}-token",
    "comment-token"
  ];

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/tokenizer/adopt-buffer.js
  var MIN_SIZE = 16 * 1024;
  function adoptBuffer(buffer = null, size) {
    if (buffer === null || buffer.length < size) {
      return new Uint32Array(Math.max(size + 1024, MIN_SIZE));
    }
    return buffer;
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/tokenizer/OffsetToLocation.js
  var N = 10;
  var F = 12;
  var R = 13;
  function computeLinesAndColumns(host) {
    const source = host.source;
    const sourceLength = source.length;
    const startOffset = source.length > 0 ? isBOM(source.charCodeAt(0)) : 0;
    const lines = adoptBuffer(host.lines, sourceLength);
    const columns = adoptBuffer(host.columns, sourceLength);
    let line = host.startLine;
    let column = host.startColumn;
    for (let i = startOffset; i < sourceLength; i++) {
      const code3 = source.charCodeAt(i);
      lines[i] = line;
      columns[i] = column++;
      if (code3 === N || code3 === R || code3 === F) {
        if (code3 === R && i + 1 < sourceLength && source.charCodeAt(i + 1) === N) {
          i++;
          lines[i] = line;
          columns[i] = column;
        }
        line++;
        column = 1;
      }
    }
    lines[sourceLength] = line;
    columns[sourceLength] = column;
    host.lines = lines;
    host.columns = columns;
    host.computed = true;
  }
  var OffsetToLocation = class {
    constructor(source, startOffset, startLine, startColumn) {
      this.setSource(source, startOffset, startLine, startColumn);
      this.lines = null;
      this.columns = null;
    }
    setSource(source = "", startOffset = 0, startLine = 1, startColumn = 1) {
      this.source = source;
      this.startOffset = startOffset;
      this.startLine = startLine;
      this.startColumn = startColumn;
      this.computed = false;
    }
    getLocation(offset, filename) {
      if (!this.computed) {
        computeLinesAndColumns(this);
      }
      return {
        source: filename,
        offset: this.startOffset + offset,
        line: this.lines[offset],
        column: this.columns[offset]
      };
    }
    getLocationRange(start, end, filename) {
      if (!this.computed) {
        computeLinesAndColumns(this);
      }
      return {
        source: filename,
        start: {
          offset: this.startOffset + start,
          line: this.lines[start],
          column: this.columns[start]
        },
        end: {
          offset: this.startOffset + end,
          line: this.lines[end],
          column: this.columns[end]
        }
      };
    }
  };

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/tokenizer/TokenStream.js
  var OFFSET_MASK = 16777215;
  var TYPE_SHIFT = 24;
  var balancePair = new Uint8Array(32);
  balancePair[Function2] = RightParenthesis;
  balancePair[LeftParenthesis] = RightParenthesis;
  balancePair[LeftSquareBracket] = RightSquareBracket;
  balancePair[LeftCurlyBracket] = RightCurlyBracket;
  function isBlockOpenerToken(tokenType2) {
    return balancePair[tokenType2] !== 0;
  }
  var TokenStream = class {
    constructor(source, tokenize3) {
      this.setSource(source, tokenize3);
    }
    reset() {
      this.eof = false;
      this.tokenIndex = -1;
      this.tokenType = 0;
      this.tokenStart = this.firstCharOffset;
      this.tokenEnd = this.firstCharOffset;
    }
    setSource(source = "", tokenize3 = () => {
    }) {
      source = String(source || "");
      const sourceLength = source.length;
      const offsetAndType = adoptBuffer(this.offsetAndType, source.length + 1);
      const balance = adoptBuffer(this.balance, source.length + 1);
      let tokenCount = 0;
      let firstCharOffset = -1;
      let balanceCloseType = 0;
      let balanceStart = source.length;
      this.offsetAndType = null;
      this.balance = null;
      balance.fill(0);
      tokenize3(source, (type, start, end) => {
        const index = tokenCount++;
        offsetAndType[index] = type << TYPE_SHIFT | end;
        if (firstCharOffset === -1) {
          firstCharOffset = start;
        }
        balance[index] = balanceStart;
        if (type === balanceCloseType) {
          const prevBalanceStart = balance[balanceStart];
          balance[balanceStart] = index;
          balanceStart = prevBalanceStart;
          balanceCloseType = balancePair[offsetAndType[prevBalanceStart] >> TYPE_SHIFT];
        } else if (isBlockOpenerToken(type)) {
          balanceStart = index;
          balanceCloseType = balancePair[type];
        }
      });
      offsetAndType[tokenCount] = EOF << TYPE_SHIFT | sourceLength;
      balance[tokenCount] = tokenCount;
      for (let i = 0; i < tokenCount; i++) {
        const balanceStart2 = balance[i];
        if (balanceStart2 <= i) {
          const balanceEnd = balance[balanceStart2];
          if (balanceEnd !== i) {
            balance[i] = balanceEnd;
          }
        } else if (balanceStart2 > tokenCount) {
          balance[i] = tokenCount;
        }
      }
      this.source = source;
      this.firstCharOffset = firstCharOffset === -1 ? 0 : firstCharOffset;
      this.tokenCount = tokenCount;
      this.offsetAndType = offsetAndType;
      this.balance = balance;
      this.reset();
      this.next();
    }
    lookupType(offset) {
      offset += this.tokenIndex;
      if (offset < this.tokenCount) {
        return this.offsetAndType[offset] >> TYPE_SHIFT;
      }
      return EOF;
    }
    lookupTypeNonSC(idx) {
      for (let offset = this.tokenIndex; offset < this.tokenCount; offset++) {
        const tokenType2 = this.offsetAndType[offset] >> TYPE_SHIFT;
        if (tokenType2 !== WhiteSpace && tokenType2 !== Comment) {
          if (idx-- === 0) {
            return tokenType2;
          }
        }
      }
      return EOF;
    }
    lookupOffset(offset) {
      offset += this.tokenIndex;
      if (offset < this.tokenCount) {
        return this.offsetAndType[offset - 1] & OFFSET_MASK;
      }
      return this.source.length;
    }
    lookupOffsetNonSC(idx) {
      for (let offset = this.tokenIndex; offset < this.tokenCount; offset++) {
        const tokenType2 = this.offsetAndType[offset] >> TYPE_SHIFT;
        if (tokenType2 !== WhiteSpace && tokenType2 !== Comment) {
          if (idx-- === 0) {
            return offset - this.tokenIndex;
          }
        }
      }
      return EOF;
    }
    lookupValue(offset, referenceStr) {
      offset += this.tokenIndex;
      if (offset < this.tokenCount) {
        return cmpStr(
          this.source,
          this.offsetAndType[offset - 1] & OFFSET_MASK,
          this.offsetAndType[offset] & OFFSET_MASK,
          referenceStr
        );
      }
      return false;
    }
    getTokenStart(tokenIndex) {
      if (tokenIndex === this.tokenIndex) {
        return this.tokenStart;
      }
      if (tokenIndex > 0) {
        return tokenIndex < this.tokenCount ? this.offsetAndType[tokenIndex - 1] & OFFSET_MASK : this.offsetAndType[this.tokenCount] & OFFSET_MASK;
      }
      return this.firstCharOffset;
    }
    substrToCursor(start) {
      return this.source.substring(start, this.tokenStart);
    }
    isBalanceEdge(pos) {
      return this.balance[this.tokenIndex] < pos;
    }
    isDelim(code3, offset) {
      if (offset) {
        return this.lookupType(offset) === Delim && this.source.charCodeAt(this.lookupOffset(offset)) === code3;
      }
      return this.tokenType === Delim && this.source.charCodeAt(this.tokenStart) === code3;
    }
    skip(tokenCount) {
      let next = this.tokenIndex + tokenCount;
      if (next < this.tokenCount) {
        this.tokenIndex = next;
        this.tokenStart = this.offsetAndType[next - 1] & OFFSET_MASK;
        next = this.offsetAndType[next];
        this.tokenType = next >> TYPE_SHIFT;
        this.tokenEnd = next & OFFSET_MASK;
      } else {
        this.tokenIndex = this.tokenCount;
        this.next();
      }
    }
    next() {
      let next = this.tokenIndex + 1;
      if (next < this.tokenCount) {
        this.tokenIndex = next;
        this.tokenStart = this.tokenEnd;
        next = this.offsetAndType[next];
        this.tokenType = next >> TYPE_SHIFT;
        this.tokenEnd = next & OFFSET_MASK;
      } else {
        this.eof = true;
        this.tokenIndex = this.tokenCount;
        this.tokenType = EOF;
        this.tokenStart = this.tokenEnd = this.source.length;
      }
    }
    skipSC() {
      while (this.tokenType === WhiteSpace || this.tokenType === Comment) {
        this.next();
      }
    }
    skipUntilBalanced(startToken, stopConsume) {
      let cursor = startToken;
      let balanceEnd = 0;
      let offset = 0;
      loop:
        for (; cursor < this.tokenCount; cursor++) {
          balanceEnd = this.balance[cursor];
          if (balanceEnd < startToken) {
            break loop;
          }
          offset = cursor > 0 ? this.offsetAndType[cursor - 1] & OFFSET_MASK : this.firstCharOffset;
          switch (stopConsume(this.source.charCodeAt(offset))) {
            case 1:
              break loop;
            case 2:
              cursor++;
              break loop;
            default:
              if (isBlockOpenerToken(this.offsetAndType[cursor] >> TYPE_SHIFT)) {
                cursor = balanceEnd;
              }
          }
        }
      this.skip(cursor - this.tokenIndex);
    }
    forEachToken(fn) {
      for (let i = 0, offset = this.firstCharOffset; i < this.tokenCount; i++) {
        const start = offset;
        const item = this.offsetAndType[i];
        const end = item & OFFSET_MASK;
        const type = item >> TYPE_SHIFT;
        offset = end;
        fn(type, start, end, i);
      }
    }
    dump() {
      const tokens = new Array(this.tokenCount);
      this.forEachToken((type, start, end, index) => {
        tokens[index] = {
          idx: index,
          type: names_default[type],
          chunk: this.source.substring(start, end),
          balance: this.balance[index]
        };
      });
      return tokens;
    }
  };

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/tokenizer/index.js
  function tokenize(source, onToken) {
    function getCharCode2(offset2) {
      return offset2 < sourceLength ? source.charCodeAt(offset2) : 0;
    }
    function consumeNumericToken() {
      offset = consumeNumber(source, offset);
      if (isIdentifierStart(getCharCode2(offset), getCharCode2(offset + 1), getCharCode2(offset + 2))) {
        type = Dimension;
        offset = consumeName(source, offset);
        return;
      }
      if (getCharCode2(offset) === 37) {
        type = Percentage;
        offset++;
        return;
      }
      type = Number2;
    }
    function consumeIdentLikeToken() {
      const nameStartOffset = offset;
      offset = consumeName(source, offset);
      if (cmpStr(source, nameStartOffset, offset, "url") && getCharCode2(offset) === 40) {
        offset = findWhiteSpaceEnd(source, offset + 1);
        if (getCharCode2(offset) === 34 || getCharCode2(offset) === 39) {
          type = Function2;
          offset = nameStartOffset + 4;
          return;
        }
        consumeUrlToken();
        return;
      }
      if (getCharCode2(offset) === 40) {
        type = Function2;
        offset++;
        return;
      }
      type = Ident;
    }
    function consumeStringToken(endingCodePoint) {
      if (!endingCodePoint) {
        endingCodePoint = getCharCode2(offset++);
      }
      type = String2;
      for (; offset < source.length; offset++) {
        const code3 = source.charCodeAt(offset);
        switch (charCodeCategory(code3)) {
          // ending code point
          case endingCodePoint:
            offset++;
            return;
          // EOF
          // case EofCategory:
          // This is a parse error. Return the <string-token>.
          // return;
          // newline
          case WhiteSpaceCategory:
            if (isNewline(code3)) {
              offset += getNewlineLength(source, offset, code3);
              type = BadString;
              return;
            }
            break;
          // U+005C REVERSE SOLIDUS (\)
          case 92:
            if (offset === source.length - 1) {
              break;
            }
            const nextCode = getCharCode2(offset + 1);
            if (isNewline(nextCode)) {
              offset += getNewlineLength(source, offset + 1, nextCode);
            } else if (isValidEscape(code3, nextCode)) {
              offset = consumeEscaped(source, offset) - 1;
            }
            break;
        }
      }
    }
    function consumeUrlToken() {
      type = Url2;
      offset = findWhiteSpaceEnd(source, offset);
      for (; offset < source.length; offset++) {
        const code3 = source.charCodeAt(offset);
        switch (charCodeCategory(code3)) {
          // U+0029 RIGHT PARENTHESIS ())
          case 41:
            offset++;
            return;
          // EOF
          // case EofCategory:
          // This is a parse error. Return the <url-token>.
          // return;
          // whitespace
          case WhiteSpaceCategory:
            offset = findWhiteSpaceEnd(source, offset);
            if (getCharCode2(offset) === 41 || offset >= source.length) {
              if (offset < source.length) {
                offset++;
              }
              return;
            }
            offset = consumeBadUrlRemnants(source, offset);
            type = BadUrl;
            return;
          // U+0022 QUOTATION MARK (")
          // U+0027 APOSTROPHE (')
          // U+0028 LEFT PARENTHESIS (()
          // non-printable code point
          case 34:
          case 39:
          case 40:
          case NonPrintableCategory:
            offset = consumeBadUrlRemnants(source, offset);
            type = BadUrl;
            return;
          // U+005C REVERSE SOLIDUS (\)
          case 92:
            if (isValidEscape(code3, getCharCode2(offset + 1))) {
              offset = consumeEscaped(source, offset) - 1;
              break;
            }
            offset = consumeBadUrlRemnants(source, offset);
            type = BadUrl;
            return;
        }
      }
    }
    source = String(source || "");
    const sourceLength = source.length;
    let start = isBOM(getCharCode2(0));
    let offset = start;
    let type;
    while (offset < sourceLength) {
      const code3 = source.charCodeAt(offset);
      switch (charCodeCategory(code3)) {
        // whitespace
        case WhiteSpaceCategory:
          type = WhiteSpace;
          offset = findWhiteSpaceEnd(source, offset + 1);
          break;
        // U+0022 QUOTATION MARK (")
        case 34:
          consumeStringToken();
          break;
        // U+0023 NUMBER SIGN (#)
        case 35:
          if (isName(getCharCode2(offset + 1)) || isValidEscape(getCharCode2(offset + 1), getCharCode2(offset + 2))) {
            type = Hash;
            offset = consumeName(source, offset + 1);
          } else {
            type = Delim;
            offset++;
          }
          break;
        // U+0027 APOSTROPHE (')
        case 39:
          consumeStringToken();
          break;
        // U+0028 LEFT PARENTHESIS (()
        case 40:
          type = LeftParenthesis;
          offset++;
          break;
        // U+0029 RIGHT PARENTHESIS ())
        case 41:
          type = RightParenthesis;
          offset++;
          break;
        // U+002B PLUS SIGN (+)
        case 43:
          if (isNumberStart(code3, getCharCode2(offset + 1), getCharCode2(offset + 2))) {
            consumeNumericToken();
          } else {
            type = Delim;
            offset++;
          }
          break;
        // U+002C COMMA (,)
        case 44:
          type = Comma;
          offset++;
          break;
        // U+002D HYPHEN-MINUS (-)
        case 45:
          if (isNumberStart(code3, getCharCode2(offset + 1), getCharCode2(offset + 2))) {
            consumeNumericToken();
          } else {
            if (getCharCode2(offset + 1) === 45 && getCharCode2(offset + 2) === 62) {
              type = CDC;
              offset = offset + 3;
            } else {
              if (isIdentifierStart(code3, getCharCode2(offset + 1), getCharCode2(offset + 2))) {
                consumeIdentLikeToken();
              } else {
                type = Delim;
                offset++;
              }
            }
          }
          break;
        // U+002E FULL STOP (.)
        case 46:
          if (isNumberStart(code3, getCharCode2(offset + 1), getCharCode2(offset + 2))) {
            consumeNumericToken();
          } else {
            type = Delim;
            offset++;
          }
          break;
        // U+002F SOLIDUS (/)
        case 47:
          if (getCharCode2(offset + 1) === 42) {
            type = Comment;
            offset = source.indexOf("*/", offset + 2);
            offset = offset === -1 ? source.length : offset + 2;
          } else {
            type = Delim;
            offset++;
          }
          break;
        // U+003A COLON (:)
        case 58:
          type = Colon;
          offset++;
          break;
        // U+003B SEMICOLON (;)
        case 59:
          type = Semicolon;
          offset++;
          break;
        // U+003C LESS-THAN SIGN (<)
        case 60:
          if (getCharCode2(offset + 1) === 33 && getCharCode2(offset + 2) === 45 && getCharCode2(offset + 3) === 45) {
            type = CDO;
            offset = offset + 4;
          } else {
            type = Delim;
            offset++;
          }
          break;
        // U+0040 COMMERCIAL AT (@)
        case 64:
          if (isIdentifierStart(getCharCode2(offset + 1), getCharCode2(offset + 2), getCharCode2(offset + 3))) {
            type = AtKeyword;
            offset = consumeName(source, offset + 1);
          } else {
            type = Delim;
            offset++;
          }
          break;
        // U+005B LEFT SQUARE BRACKET ([)
        case 91:
          type = LeftSquareBracket;
          offset++;
          break;
        // U+005C REVERSE SOLIDUS (\)
        case 92:
          if (isValidEscape(code3, getCharCode2(offset + 1))) {
            consumeIdentLikeToken();
          } else {
            type = Delim;
            offset++;
          }
          break;
        // U+005D RIGHT SQUARE BRACKET (])
        case 93:
          type = RightSquareBracket;
          offset++;
          break;
        // U+007B LEFT CURLY BRACKET ({)
        case 123:
          type = LeftCurlyBracket;
          offset++;
          break;
        // U+007D RIGHT CURLY BRACKET (})
        case 125:
          type = RightCurlyBracket;
          offset++;
          break;
        // digit
        case DigitCategory:
          consumeNumericToken();
          break;
        // name-start code point
        case NameStartCategory:
          consumeIdentLikeToken();
          break;
        // EOF
        // case EofCategory:
        // Return an <EOF-token>.
        // break;
        // anything else
        default:
          type = Delim;
          offset++;
      }
      onToken(type, start, start = offset);
    }
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/utils/List.js
  var releasedCursors = null;
  var List = class _List {
    static createItem(data) {
      return {
        prev: null,
        next: null,
        data
      };
    }
    constructor() {
      this.head = null;
      this.tail = null;
      this.cursor = null;
    }
    createItem(data) {
      return _List.createItem(data);
    }
    // cursor helpers
    allocateCursor(prev, next) {
      let cursor;
      if (releasedCursors !== null) {
        cursor = releasedCursors;
        releasedCursors = releasedCursors.cursor;
        cursor.prev = prev;
        cursor.next = next;
        cursor.cursor = this.cursor;
      } else {
        cursor = {
          prev,
          next,
          cursor: this.cursor
        };
      }
      this.cursor = cursor;
      return cursor;
    }
    releaseCursor() {
      const { cursor } = this;
      this.cursor = cursor.cursor;
      cursor.prev = null;
      cursor.next = null;
      cursor.cursor = releasedCursors;
      releasedCursors = cursor;
    }
    updateCursors(prevOld, prevNew, nextOld, nextNew) {
      let { cursor } = this;
      while (cursor !== null) {
        if (cursor.prev === prevOld) {
          cursor.prev = prevNew;
        }
        if (cursor.next === nextOld) {
          cursor.next = nextNew;
        }
        cursor = cursor.cursor;
      }
    }
    *[Symbol.iterator]() {
      for (let cursor = this.head; cursor !== null; cursor = cursor.next) {
        yield cursor.data;
      }
    }
    // getters
    get size() {
      let size = 0;
      for (let cursor = this.head; cursor !== null; cursor = cursor.next) {
        size++;
      }
      return size;
    }
    get isEmpty() {
      return this.head === null;
    }
    get first() {
      return this.head && this.head.data;
    }
    get last() {
      return this.tail && this.tail.data;
    }
    // convertors
    fromArray(array) {
      let cursor = null;
      this.head = null;
      for (let data of array) {
        const item = _List.createItem(data);
        if (cursor !== null) {
          cursor.next = item;
        } else {
          this.head = item;
        }
        item.prev = cursor;
        cursor = item;
      }
      this.tail = cursor;
      return this;
    }
    toArray() {
      return [...this];
    }
    toJSON() {
      return [...this];
    }
    // array-like methods
    forEach(fn, thisArg = this) {
      const cursor = this.allocateCursor(null, this.head);
      while (cursor.next !== null) {
        const item = cursor.next;
        cursor.next = item.next;
        fn.call(thisArg, item.data, item, this);
      }
      this.releaseCursor();
    }
    forEachRight(fn, thisArg = this) {
      const cursor = this.allocateCursor(this.tail, null);
      while (cursor.prev !== null) {
        const item = cursor.prev;
        cursor.prev = item.prev;
        fn.call(thisArg, item.data, item, this);
      }
      this.releaseCursor();
    }
    reduce(fn, initialValue, thisArg = this) {
      let cursor = this.allocateCursor(null, this.head);
      let acc = initialValue;
      let item;
      while (cursor.next !== null) {
        item = cursor.next;
        cursor.next = item.next;
        acc = fn.call(thisArg, acc, item.data, item, this);
      }
      this.releaseCursor();
      return acc;
    }
    reduceRight(fn, initialValue, thisArg = this) {
      let cursor = this.allocateCursor(this.tail, null);
      let acc = initialValue;
      let item;
      while (cursor.prev !== null) {
        item = cursor.prev;
        cursor.prev = item.prev;
        acc = fn.call(thisArg, acc, item.data, item, this);
      }
      this.releaseCursor();
      return acc;
    }
    some(fn, thisArg = this) {
      for (let cursor = this.head; cursor !== null; cursor = cursor.next) {
        if (fn.call(thisArg, cursor.data, cursor, this)) {
          return true;
        }
      }
      return false;
    }
    map(fn, thisArg = this) {
      const result = new _List();
      for (let cursor = this.head; cursor !== null; cursor = cursor.next) {
        result.appendData(fn.call(thisArg, cursor.data, cursor, this));
      }
      return result;
    }
    filter(fn, thisArg = this) {
      const result = new _List();
      for (let cursor = this.head; cursor !== null; cursor = cursor.next) {
        if (fn.call(thisArg, cursor.data, cursor, this)) {
          result.appendData(cursor.data);
        }
      }
      return result;
    }
    nextUntil(start, fn, thisArg = this) {
      if (start === null) {
        return;
      }
      const cursor = this.allocateCursor(null, start);
      while (cursor.next !== null) {
        const item = cursor.next;
        cursor.next = item.next;
        if (fn.call(thisArg, item.data, item, this)) {
          break;
        }
      }
      this.releaseCursor();
    }
    prevUntil(start, fn, thisArg = this) {
      if (start === null) {
        return;
      }
      const cursor = this.allocateCursor(start, null);
      while (cursor.prev !== null) {
        const item = cursor.prev;
        cursor.prev = item.prev;
        if (fn.call(thisArg, item.data, item, this)) {
          break;
        }
      }
      this.releaseCursor();
    }
    // mutation
    clear() {
      this.head = null;
      this.tail = null;
    }
    copy() {
      const result = new _List();
      for (let data of this) {
        result.appendData(data);
      }
      return result;
    }
    prepend(item) {
      this.updateCursors(null, item, this.head, item);
      if (this.head !== null) {
        this.head.prev = item;
        item.next = this.head;
      } else {
        this.tail = item;
      }
      this.head = item;
      return this;
    }
    prependData(data) {
      return this.prepend(_List.createItem(data));
    }
    append(item) {
      return this.insert(item);
    }
    appendData(data) {
      return this.insert(_List.createItem(data));
    }
    insert(item, before = null) {
      if (before !== null) {
        this.updateCursors(before.prev, item, before, item);
        if (before.prev === null) {
          if (this.head !== before) {
            throw new Error("before doesn't belong to list");
          }
          this.head = item;
          before.prev = item;
          item.next = before;
          this.updateCursors(null, item);
        } else {
          before.prev.next = item;
          item.prev = before.prev;
          before.prev = item;
          item.next = before;
        }
      } else {
        this.updateCursors(this.tail, item, null, item);
        if (this.tail !== null) {
          this.tail.next = item;
          item.prev = this.tail;
        } else {
          this.head = item;
        }
        this.tail = item;
      }
      return this;
    }
    insertData(data, before) {
      return this.insert(_List.createItem(data), before);
    }
    remove(item) {
      this.updateCursors(item, item.prev, item, item.next);
      if (item.prev !== null) {
        item.prev.next = item.next;
      } else {
        if (this.head !== item) {
          throw new Error("item doesn't belong to list");
        }
        this.head = item.next;
      }
      if (item.next !== null) {
        item.next.prev = item.prev;
      } else {
        if (this.tail !== item) {
          throw new Error("item doesn't belong to list");
        }
        this.tail = item.prev;
      }
      item.prev = null;
      item.next = null;
      return item;
    }
    push(data) {
      this.insert(_List.createItem(data));
    }
    pop() {
      return this.tail !== null ? this.remove(this.tail) : null;
    }
    unshift(data) {
      this.prepend(_List.createItem(data));
    }
    shift() {
      return this.head !== null ? this.remove(this.head) : null;
    }
    prependList(list2) {
      return this.insertList(list2, this.head);
    }
    appendList(list2) {
      return this.insertList(list2);
    }
    insertList(list2, before) {
      if (list2.head === null) {
        return this;
      }
      if (before !== void 0 && before !== null) {
        this.updateCursors(before.prev, list2.tail, before, list2.head);
        if (before.prev !== null) {
          before.prev.next = list2.head;
          list2.head.prev = before.prev;
        } else {
          this.head = list2.head;
        }
        before.prev = list2.tail;
        list2.tail.next = before;
      } else {
        this.updateCursors(this.tail, list2.tail, null, list2.head);
        if (this.tail !== null) {
          this.tail.next = list2.head;
          list2.head.prev = this.tail;
        } else {
          this.head = list2.head;
        }
        this.tail = list2.tail;
      }
      list2.head = null;
      list2.tail = null;
      return this;
    }
    replace(oldItem, newItemOrList) {
      if ("head" in newItemOrList) {
        this.insertList(newItemOrList, oldItem);
      } else {
        this.insert(newItemOrList, oldItem);
      }
      this.remove(oldItem);
    }
  };

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/utils/create-custom-error.js
  function createCustomError(name50, message) {
    const error2 = Object.create(SyntaxError.prototype);
    const errorStack = new Error();
    return Object.assign(error2, {
      name: name50,
      message,
      get stack() {
        return (errorStack.stack || "").replace(/^(.+\n){1,3}/, `${name50}: ${message}
`);
      }
    });
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/parser/SyntaxError.js
  var MAX_LINE_LENGTH = 100;
  var OFFSET_CORRECTION = 60;
  var TAB_REPLACEMENT = "    ";
  function sourceFragment({ source, line, column, baseLine, baseColumn }, extraLines) {
    function processLines(start, end) {
      return lines.slice(start, end).map(
        (line2, idx) => String(start + idx + 1).padStart(maxNumLength) + " |" + line2
      ).join("\n");
    }
    const prelines = "\n".repeat(Math.max(baseLine - 1, 0));
    const precolumns = " ".repeat(Math.max(baseColumn - 1, 0));
    const lines = (prelines + precolumns + source).split(/\r\n?|\n|\f/);
    const startLine = Math.max(1, line - extraLines) - 1;
    const endLine = Math.min(line + extraLines, lines.length + 1);
    const maxNumLength = Math.max(4, String(endLine).length) + 1;
    let cutLeft = 0;
    column += (TAB_REPLACEMENT.length - 1) * (lines[line - 1].substr(0, column - 1).match(/\t/g) || []).length;
    if (column > MAX_LINE_LENGTH) {
      cutLeft = column - OFFSET_CORRECTION + 3;
      column = OFFSET_CORRECTION - 2;
    }
    for (let i = startLine; i <= endLine; i++) {
      if (i >= 0 && i < lines.length) {
        lines[i] = lines[i].replace(/\t/g, TAB_REPLACEMENT);
        lines[i] = (cutLeft > 0 && lines[i].length > cutLeft ? "\u2026" : "") + lines[i].substr(cutLeft, MAX_LINE_LENGTH - 2) + (lines[i].length > cutLeft + MAX_LINE_LENGTH - 1 ? "\u2026" : "");
      }
    }
    return [
      processLines(startLine, line),
      new Array(column + maxNumLength + 2).join("-") + "^",
      processLines(line, endLine)
    ].filter(Boolean).join("\n").replace(/^(\s+\d+\s+\|\n)+/, "").replace(/\n(\s+\d+\s+\|)+$/, "");
  }
  function SyntaxError2(message, source, offset, line, column, baseLine = 1, baseColumn = 1) {
    const error2 = Object.assign(createCustomError("SyntaxError", message), {
      source,
      offset,
      line,
      column,
      sourceFragment(extraLines) {
        return sourceFragment({ source, line, column, baseLine, baseColumn }, isNaN(extraLines) ? 0 : extraLines);
      },
      get formattedMessage() {
        return `Parse error: ${message}
` + sourceFragment({ source, line, column, baseLine, baseColumn }, 2);
      }
    });
    return error2;
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/parser/sequence.js
  function readSequence(recognizer) {
    const children = this.createList();
    let space = false;
    const context = {
      recognizer
    };
    while (!this.eof) {
      switch (this.tokenType) {
        case Comment:
          this.next();
          continue;
        case WhiteSpace:
          space = true;
          this.next();
          continue;
      }
      let child = recognizer.getNode.call(this, context);
      if (child === void 0) {
        break;
      }
      if (space) {
        if (recognizer.onWhiteSpace) {
          recognizer.onWhiteSpace.call(this, child, children, context);
        }
        space = false;
      }
      children.push(child);
    }
    if (space && recognizer.onWhiteSpace) {
      recognizer.onWhiteSpace.call(this, null, children, context);
    }
    return children;
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/parser/create.js
  var NOOP = () => {
  };
  var EXCLAMATIONMARK = 33;
  var NUMBERSIGN = 35;
  var SEMICOLON = 59;
  var LEFTCURLYBRACKET = 123;
  var NULL = 0;
  function createParseContext(name50) {
    return function() {
      return this[name50]();
    };
  }
  function fetchParseValues(dict) {
    const result = /* @__PURE__ */ Object.create(null);
    for (const name50 of Object.keys(dict)) {
      const item = dict[name50];
      const fn = item.parse || item;
      if (fn) {
        result[name50] = fn;
      }
    }
    return result;
  }
  function processConfig(config2) {
    const parseConfig = {
      context: /* @__PURE__ */ Object.create(null),
      features: Object.assign(/* @__PURE__ */ Object.create(null), config2.features),
      scope: Object.assign(/* @__PURE__ */ Object.create(null), config2.scope),
      atrule: fetchParseValues(config2.atrule),
      pseudo: fetchParseValues(config2.pseudo),
      node: fetchParseValues(config2.node)
    };
    for (const [name50, context] of Object.entries(config2.parseContext)) {
      switch (typeof context) {
        case "function":
          parseConfig.context[name50] = context;
          break;
        case "string":
          parseConfig.context[name50] = createParseContext(context);
          break;
      }
    }
    return {
      config: parseConfig,
      ...parseConfig,
      ...parseConfig.node
    };
  }
  function createParser(config2) {
    let source = "";
    let filename = "<unknown>";
    let needPositions = false;
    let onParseError = NOOP;
    let onParseErrorThrow = false;
    const locationMap = new OffsetToLocation();
    const parser = Object.assign(new TokenStream(), processConfig(config2 || {}), {
      parseAtrulePrelude: true,
      parseRulePrelude: true,
      parseValue: true,
      parseCustomProperty: false,
      readSequence,
      consumeUntilBalanceEnd: () => 0,
      consumeUntilLeftCurlyBracket(code3) {
        return code3 === LEFTCURLYBRACKET ? 1 : 0;
      },
      consumeUntilLeftCurlyBracketOrSemicolon(code3) {
        return code3 === LEFTCURLYBRACKET || code3 === SEMICOLON ? 1 : 0;
      },
      consumeUntilExclamationMarkOrSemicolon(code3) {
        return code3 === EXCLAMATIONMARK || code3 === SEMICOLON ? 1 : 0;
      },
      consumeUntilSemicolonIncluded(code3) {
        return code3 === SEMICOLON ? 2 : 0;
      },
      createList() {
        return new List();
      },
      createSingleNodeList(node) {
        return new List().appendData(node);
      },
      getFirstListNode(list2) {
        return list2 && list2.first;
      },
      getLastListNode(list2) {
        return list2 && list2.last;
      },
      parseWithFallback(consumer, fallback) {
        const startIndex = this.tokenIndex;
        try {
          return consumer.call(this);
        } catch (e) {
          if (onParseErrorThrow) {
            throw e;
          }
          this.skip(startIndex - this.tokenIndex);
          const fallbackNode = fallback.call(this);
          onParseErrorThrow = true;
          onParseError(e, fallbackNode);
          onParseErrorThrow = false;
          return fallbackNode;
        }
      },
      lookupNonWSType(offset) {
        let type;
        do {
          type = this.lookupType(offset++);
          if (type !== WhiteSpace && type !== Comment) {
            return type;
          }
        } while (type !== NULL);
        return NULL;
      },
      charCodeAt(offset) {
        return offset >= 0 && offset < source.length ? source.charCodeAt(offset) : 0;
      },
      substring(offsetStart, offsetEnd) {
        return source.substring(offsetStart, offsetEnd);
      },
      substrToCursor(start) {
        return this.source.substring(start, this.tokenStart);
      },
      cmpChar(offset, charCode) {
        return cmpChar(source, offset, charCode);
      },
      cmpStr(offsetStart, offsetEnd, str) {
        return cmpStr(source, offsetStart, offsetEnd, str);
      },
      consume(tokenType2) {
        const start = this.tokenStart;
        this.eat(tokenType2);
        return this.substrToCursor(start);
      },
      consumeFunctionName() {
        const name50 = source.substring(this.tokenStart, this.tokenEnd - 1);
        this.eat(Function2);
        return name50;
      },
      consumeNumber(type) {
        const number2 = source.substring(this.tokenStart, consumeNumber(source, this.tokenStart));
        this.eat(type);
        return number2;
      },
      eat(tokenType2) {
        if (this.tokenType !== tokenType2) {
          const tokenName = names_default[tokenType2].slice(0, -6).replace(/-/g, " ").replace(/^./, (m) => m.toUpperCase());
          let message = `${/[[\](){}]/.test(tokenName) ? `"${tokenName}"` : tokenName} is expected`;
          let offset = this.tokenStart;
          switch (tokenType2) {
            case Ident:
              if (this.tokenType === Function2 || this.tokenType === Url2) {
                offset = this.tokenEnd - 1;
                message = "Identifier is expected but function found";
              } else {
                message = "Identifier is expected";
              }
              break;
            case Hash:
              if (this.isDelim(NUMBERSIGN)) {
                this.next();
                offset++;
                message = "Name is expected";
              }
              break;
            case Percentage:
              if (this.tokenType === Number2) {
                offset = this.tokenEnd;
                message = "Percent sign is expected";
              }
              break;
          }
          this.error(message, offset);
        }
        this.next();
      },
      eatIdent(name50) {
        if (this.tokenType !== Ident || this.lookupValue(0, name50) === false) {
          this.error(`Identifier "${name50}" is expected`);
        }
        this.next();
      },
      eatDelim(code3) {
        if (!this.isDelim(code3)) {
          this.error(`Delim "${String.fromCharCode(code3)}" is expected`);
        }
        this.next();
      },
      getLocation(start, end) {
        if (needPositions) {
          return locationMap.getLocationRange(
            start,
            end,
            filename
          );
        }
        return null;
      },
      getLocationFromList(list2) {
        if (needPositions) {
          const head = this.getFirstListNode(list2);
          const tail = this.getLastListNode(list2);
          return locationMap.getLocationRange(
            head !== null ? head.loc.start.offset - locationMap.startOffset : this.tokenStart,
            tail !== null ? tail.loc.end.offset - locationMap.startOffset : this.tokenStart,
            filename
          );
        }
        return null;
      },
      error(message, offset) {
        const location = typeof offset !== "undefined" && offset < source.length ? locationMap.getLocation(offset) : this.eof ? locationMap.getLocation(findWhiteSpaceStart(source, source.length - 1)) : locationMap.getLocation(this.tokenStart);
        throw new SyntaxError2(
          message || "Unexpected input",
          source,
          location.offset,
          location.line,
          location.column,
          locationMap.startLine,
          locationMap.startColumn
        );
      }
    });
    const parse52 = function(source_, options) {
      source = source_;
      options = options || {};
      parser.setSource(source, tokenize);
      locationMap.setSource(
        source,
        options.offset,
        options.line,
        options.column
      );
      filename = options.filename || "<unknown>";
      needPositions = Boolean(options.positions);
      onParseError = typeof options.onParseError === "function" ? options.onParseError : NOOP;
      onParseErrorThrow = false;
      parser.parseAtrulePrelude = "parseAtrulePrelude" in options ? Boolean(options.parseAtrulePrelude) : true;
      parser.parseRulePrelude = "parseRulePrelude" in options ? Boolean(options.parseRulePrelude) : true;
      parser.parseValue = "parseValue" in options ? Boolean(options.parseValue) : true;
      parser.parseCustomProperty = "parseCustomProperty" in options ? Boolean(options.parseCustomProperty) : false;
      const { context = "default", onComment } = options;
      if (context in parser.context === false) {
        throw new Error("Unknown context `" + context + "`");
      }
      if (typeof onComment === "function") {
        parser.forEachToken((type, start, end) => {
          if (type === Comment) {
            const loc = parser.getLocation(start, end);
            const value = cmpStr(source, end - 2, end, "*/") ? source.slice(start + 2, end - 2) : source.slice(start + 2, end);
            onComment(value, loc);
          }
        });
      }
      const ast = parser.context[context].call(parser, options);
      if (!parser.eof) {
        parser.error();
      }
      return ast;
    };
    return Object.assign(parse52, {
      SyntaxError: SyntaxError2,
      config: parser.config
    });
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/generator/sourceMap.js
  var import_source_map_generator = __toESM(require_source_map_generator(), 1);
  var trackNodes = /* @__PURE__ */ new Set(["Atrule", "Selector", "Declaration"]);
  function generateSourceMap(handlers) {
    const map2 = new import_source_map_generator.SourceMapGenerator();
    const generated = {
      line: 1,
      column: 0
    };
    const original = {
      line: 0,
      // should be zero to add first mapping
      column: 0
    };
    const activatedGenerated = {
      line: 1,
      column: 0
    };
    const activatedMapping = {
      generated: activatedGenerated
    };
    let line = 1;
    let column = 0;
    let sourceMappingActive = false;
    const origHandlersNode = handlers.node;
    handlers.node = function(node) {
      if (node.loc && node.loc.start && trackNodes.has(node.type)) {
        const nodeLine = node.loc.start.line;
        const nodeColumn = node.loc.start.column - 1;
        if (original.line !== nodeLine || original.column !== nodeColumn) {
          original.line = nodeLine;
          original.column = nodeColumn;
          generated.line = line;
          generated.column = column;
          if (sourceMappingActive) {
            sourceMappingActive = false;
            if (generated.line !== activatedGenerated.line || generated.column !== activatedGenerated.column) {
              map2.addMapping(activatedMapping);
            }
          }
          sourceMappingActive = true;
          map2.addMapping({
            source: node.loc.source,
            original,
            generated
          });
        }
      }
      origHandlersNode.call(this, node);
      if (sourceMappingActive && trackNodes.has(node.type)) {
        activatedGenerated.line = line;
        activatedGenerated.column = column;
      }
    };
    const origHandlersEmit = handlers.emit;
    handlers.emit = function(value, type, auto) {
      for (let i = 0; i < value.length; i++) {
        if (value.charCodeAt(i) === 10) {
          line++;
          column = 0;
        } else {
          column++;
        }
      }
      origHandlersEmit(value, type, auto);
    };
    const origHandlersResult = handlers.result;
    handlers.result = function() {
      if (sourceMappingActive) {
        map2.addMapping(activatedMapping);
      }
      return {
        css: origHandlersResult(),
        map: map2
      };
    };
    return handlers;
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/generator/token-before.js
  var token_before_exports = {};
  __export(token_before_exports, {
    safe: () => safe,
    spec: () => spec
  });
  var PLUSSIGN = 43;
  var HYPHENMINUS = 45;
  var code2 = (type, value) => {
    if (type === Delim) {
      type = value;
    }
    if (typeof type === "string") {
      const charCode = type.charCodeAt(0);
      return charCode > 127 ? 32768 : charCode << 8;
    }
    return type;
  };
  var specPairs = [
    [Ident, Ident],
    [Ident, Function2],
    [Ident, Url2],
    [Ident, BadUrl],
    [Ident, "-"],
    [Ident, Number2],
    [Ident, Percentage],
    [Ident, Dimension],
    [Ident, CDC],
    [Ident, LeftParenthesis],
    [AtKeyword, Ident],
    [AtKeyword, Function2],
    [AtKeyword, Url2],
    [AtKeyword, BadUrl],
    [AtKeyword, "-"],
    [AtKeyword, Number2],
    [AtKeyword, Percentage],
    [AtKeyword, Dimension],
    [AtKeyword, CDC],
    [Hash, Ident],
    [Hash, Function2],
    [Hash, Url2],
    [Hash, BadUrl],
    [Hash, "-"],
    [Hash, Number2],
    [Hash, Percentage],
    [Hash, Dimension],
    [Hash, CDC],
    [Dimension, Ident],
    [Dimension, Function2],
    [Dimension, Url2],
    [Dimension, BadUrl],
    [Dimension, "-"],
    [Dimension, Number2],
    [Dimension, Percentage],
    [Dimension, Dimension],
    [Dimension, CDC],
    ["#", Ident],
    ["#", Function2],
    ["#", Url2],
    ["#", BadUrl],
    ["#", "-"],
    ["#", Number2],
    ["#", Percentage],
    ["#", Dimension],
    ["#", CDC],
    // https://github.com/w3c/csswg-drafts/pull/6874
    ["-", Ident],
    ["-", Function2],
    ["-", Url2],
    ["-", BadUrl],
    ["-", "-"],
    ["-", Number2],
    ["-", Percentage],
    ["-", Dimension],
    ["-", CDC],
    // https://github.com/w3c/csswg-drafts/pull/6874
    [Number2, Ident],
    [Number2, Function2],
    [Number2, Url2],
    [Number2, BadUrl],
    [Number2, Number2],
    [Number2, Percentage],
    [Number2, Dimension],
    [Number2, "%"],
    [Number2, CDC],
    // https://github.com/w3c/csswg-drafts/pull/6874
    ["@", Ident],
    ["@", Function2],
    ["@", Url2],
    ["@", BadUrl],
    ["@", "-"],
    ["@", CDC],
    // https://github.com/w3c/csswg-drafts/pull/6874
    [".", Number2],
    [".", Percentage],
    [".", Dimension],
    ["+", Number2],
    ["+", Percentage],
    ["+", Dimension],
    ["/", "*"]
  ];
  var safePairs = specPairs.concat([
    [Ident, Hash],
    [Dimension, Hash],
    [Hash, Hash],
    [AtKeyword, LeftParenthesis],
    [AtKeyword, String2],
    [AtKeyword, Colon],
    [Percentage, Percentage],
    [Percentage, Dimension],
    [Percentage, Function2],
    [Percentage, "-"],
    [RightParenthesis, Ident],
    [RightParenthesis, Function2],
    [RightParenthesis, Percentage],
    [RightParenthesis, Dimension],
    [RightParenthesis, Hash],
    [RightParenthesis, "-"]
  ]);
  function createMap(pairs) {
    const isWhiteSpaceRequired = new Set(
      pairs.map(([prev, next]) => code2(prev) << 16 | code2(next))
    );
    return function(prevCode, type, value) {
      const nextCode = code2(type, value);
      const nextCharCode = value.charCodeAt(0);
      const emitWs = nextCharCode === HYPHENMINUS && type !== Ident && type !== Function2 && type !== CDC || nextCharCode === PLUSSIGN ? isWhiteSpaceRequired.has(prevCode << 16 | nextCharCode << 8) : isWhiteSpaceRequired.has(prevCode << 16 | nextCode);
      if (emitWs) {
        this.emit(" ", WhiteSpace, true);
      }
      return nextCode;
    };
  }
  var spec = createMap(specPairs);
  var safe = createMap(safePairs);

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/generator/create.js
  var REVERSESOLIDUS = 92;
  function processChildren(node, delimeter) {
    if (typeof delimeter === "function") {
      let prev = null;
      node.children.forEach((node2) => {
        if (prev !== null) {
          delimeter.call(this, prev);
        }
        this.node(node2);
        prev = node2;
      });
      return;
    }
    node.children.forEach(this.node, this);
  }
  function processChunk(chunk) {
    tokenize(chunk, (type, start, end) => {
      this.token(type, chunk.slice(start, end));
    });
  }
  function createGenerator(config2) {
    const types = /* @__PURE__ */ new Map();
    for (let [name50, item] of Object.entries(config2.node)) {
      const fn = item.generate || item;
      if (typeof fn === "function") {
        types.set(name50, item.generate || item);
      }
    }
    return function(node, options) {
      let buffer = "";
      let prevCode = 0;
      let handlers = {
        node(node2) {
          if (types.has(node2.type)) {
            types.get(node2.type).call(publicApi, node2);
          } else {
            throw new Error("Unknown node type: " + node2.type);
          }
        },
        tokenBefore: safe,
        token(type, value) {
          prevCode = this.tokenBefore(prevCode, type, value);
          this.emit(value, type, false);
          if (type === Delim && value.charCodeAt(0) === REVERSESOLIDUS) {
            this.emit("\n", WhiteSpace, true);
          }
        },
        emit(value) {
          buffer += value;
        },
        result() {
          return buffer;
        }
      };
      if (options) {
        if (typeof options.decorator === "function") {
          handlers = options.decorator(handlers);
        }
        if (options.sourceMap) {
          handlers = generateSourceMap(handlers);
        }
        if (options.mode in token_before_exports) {
          handlers.tokenBefore = token_before_exports[options.mode];
        }
      }
      const publicApi = {
        node: (node2) => handlers.node(node2),
        children: processChildren,
        token: (type, value) => handlers.token(type, value),
        tokenize: processChunk
      };
      handlers.node(node);
      return handlers.result();
    };
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/convertor/create.js
  function createConvertor(walk3) {
    return {
      fromPlainObject(ast) {
        walk3(ast, {
          enter(node) {
            if (node.children && node.children instanceof List === false) {
              node.children = new List().fromArray(node.children);
            }
          }
        });
        return ast;
      },
      toPlainObject(ast) {
        walk3(ast, {
          leave(node) {
            if (node.children && node.children instanceof List) {
              node.children = node.children.toArray();
            }
          }
        });
        return ast;
      }
    };
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/walker/create.js
  var { hasOwnProperty: hasOwnProperty2 } = Object.prototype;
  var noop = function() {
  };
  function ensureFunction(value) {
    return typeof value === "function" ? value : noop;
  }
  function invokeForType(fn, type) {
    return function(node, item, list2) {
      if (node.type === type) {
        fn.call(this, node, item, list2);
      }
    };
  }
  function getWalkersFromStructure(name50, nodeType) {
    const structure50 = nodeType.structure;
    const walkers = [];
    for (const key in structure50) {
      if (hasOwnProperty2.call(structure50, key) === false) {
        continue;
      }
      let fieldTypes = structure50[key];
      const walker = {
        name: key,
        type: false,
        nullable: false
      };
      if (!Array.isArray(fieldTypes)) {
        fieldTypes = [fieldTypes];
      }
      for (const fieldType of fieldTypes) {
        if (fieldType === null) {
          walker.nullable = true;
        } else if (typeof fieldType === "string") {
          walker.type = "node";
        } else if (Array.isArray(fieldType)) {
          walker.type = "list";
        }
      }
      if (walker.type) {
        walkers.push(walker);
      }
    }
    if (walkers.length) {
      return {
        context: nodeType.walkContext,
        fields: walkers
      };
    }
    return null;
  }
  function getTypesFromConfig(config2) {
    const types = {};
    for (const name50 in config2.node) {
      if (hasOwnProperty2.call(config2.node, name50)) {
        const nodeType = config2.node[name50];
        if (!nodeType.structure) {
          throw new Error("Missed `structure` field in `" + name50 + "` node type definition");
        }
        types[name50] = getWalkersFromStructure(name50, nodeType);
      }
    }
    return types;
  }
  function createTypeIterator(config2, reverse) {
    const fields = config2.fields.slice();
    const contextName = config2.context;
    const useContext = typeof contextName === "string";
    if (reverse) {
      fields.reverse();
    }
    return function(node, context, walk3, walkReducer) {
      let prevContextValue;
      if (useContext) {
        prevContextValue = context[contextName];
        context[contextName] = node;
      }
      for (const field of fields) {
        const ref = node[field.name];
        if (!field.nullable || ref) {
          if (field.type === "list") {
            const breakWalk = reverse ? ref.reduceRight(walkReducer, false) : ref.reduce(walkReducer, false);
            if (breakWalk) {
              return true;
            }
          } else if (walk3(ref)) {
            return true;
          }
        }
      }
      if (useContext) {
        context[contextName] = prevContextValue;
      }
    };
  }
  function createFastTraveralMap({
    StyleSheet,
    Atrule,
    Rule,
    Block,
    DeclarationList
  }) {
    return {
      Atrule: {
        StyleSheet,
        Atrule,
        Rule,
        Block
      },
      Rule: {
        StyleSheet,
        Atrule,
        Rule,
        Block
      },
      Declaration: {
        StyleSheet,
        Atrule,
        Rule,
        Block,
        DeclarationList
      }
    };
  }
  function createWalker(config2) {
    const types = getTypesFromConfig(config2);
    const iteratorsNatural = {};
    const iteratorsReverse = {};
    const breakWalk = Symbol("break-walk");
    const skipNode = Symbol("skip-node");
    for (const name50 in types) {
      if (hasOwnProperty2.call(types, name50) && types[name50] !== null) {
        iteratorsNatural[name50] = createTypeIterator(types[name50], false);
        iteratorsReverse[name50] = createTypeIterator(types[name50], true);
      }
    }
    const fastTraversalIteratorsNatural = createFastTraveralMap(iteratorsNatural);
    const fastTraversalIteratorsReverse = createFastTraveralMap(iteratorsReverse);
    const walk3 = function(root, options) {
      function walkNode(node, item, list2) {
        const enterRet = enter.call(context, node, item, list2);
        if (enterRet === breakWalk) {
          return true;
        }
        if (enterRet === skipNode) {
          return false;
        }
        if (iterators.hasOwnProperty(node.type)) {
          if (iterators[node.type](node, context, walkNode, walkReducer)) {
            return true;
          }
        }
        if (leave.call(context, node, item, list2) === breakWalk) {
          return true;
        }
        return false;
      }
      let enter = noop;
      let leave = noop;
      let iterators = iteratorsNatural;
      let walkReducer = (ret, data, item, list2) => ret || walkNode(data, item, list2);
      const context = {
        break: breakWalk,
        skip: skipNode,
        root,
        stylesheet: null,
        atrule: null,
        atrulePrelude: null,
        rule: null,
        selector: null,
        block: null,
        declaration: null,
        function: null
      };
      if (typeof options === "function") {
        enter = options;
      } else if (options) {
        enter = ensureFunction(options.enter);
        leave = ensureFunction(options.leave);
        if (options.reverse) {
          iterators = iteratorsReverse;
        }
        if (options.visit) {
          if (fastTraversalIteratorsNatural.hasOwnProperty(options.visit)) {
            iterators = options.reverse ? fastTraversalIteratorsReverse[options.visit] : fastTraversalIteratorsNatural[options.visit];
          } else if (!types.hasOwnProperty(options.visit)) {
            throw new Error("Bad value `" + options.visit + "` for `visit` option (should be: " + Object.keys(types).sort().join(", ") + ")");
          }
          enter = invokeForType(enter, options.visit);
          leave = invokeForType(leave, options.visit);
        }
      }
      if (enter === noop && leave === noop) {
        throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function");
      }
      walkNode(root);
    };
    walk3.break = breakWalk;
    walk3.skip = skipNode;
    walk3.find = function(ast, fn) {
      let found = null;
      walk3(ast, function(node, item, list2) {
        if (fn.call(this, node, item, list2)) {
          found = node;
          return breakWalk;
        }
      });
      return found;
    };
    walk3.findLast = function(ast, fn) {
      let found = null;
      walk3(ast, {
        reverse: true,
        enter(node, item, list2) {
          if (fn.call(this, node, item, list2)) {
            found = node;
            return breakWalk;
          }
        }
      });
      return found;
    };
    walk3.findAll = function(ast, fn) {
      const found = [];
      walk3(ast, function(node, item, list2) {
        if (fn.call(this, node, item, list2)) {
          found.push(node);
        }
      });
      return found;
    };
    return walk3;
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/definition-syntax/generate.js
  function noop2(value) {
    return value;
  }
  function generateMultiplier(multiplier) {
    const { min, max, comma } = multiplier;
    if (min === 0 && max === 0) {
      return comma ? "#?" : "*";
    }
    if (min === 0 && max === 1) {
      return "?";
    }
    if (min === 1 && max === 0) {
      return comma ? "#" : "+";
    }
    if (min === 1 && max === 1) {
      return "";
    }
    return (comma ? "#" : "") + (min === max ? "{" + min + "}" : "{" + min + "," + (max !== 0 ? max : "") + "}");
  }
  function generateTypeOpts(node) {
    switch (node.type) {
      case "Range":
        return " [" + (node.min === null ? "-\u221E" : node.min) + "," + (node.max === null ? "\u221E" : node.max) + "]";
      default:
        throw new Error("Unknown node type `" + node.type + "`");
    }
  }
  function generateSequence(node, decorate, forceBraces, compact) {
    const combinator = node.combinator === " " || compact ? node.combinator : " " + node.combinator + " ";
    const result = node.terms.map((term) => internalGenerate(term, decorate, forceBraces, compact)).join(combinator);
    if (node.explicit || forceBraces) {
      return (compact || result[0] === "," ? "[" : "[ ") + result + (compact ? "]" : " ]");
    }
    return result;
  }
  function internalGenerate(node, decorate, forceBraces, compact) {
    let result;
    switch (node.type) {
      case "Group":
        result = generateSequence(node, decorate, forceBraces, compact) + (node.disallowEmpty ? "!" : "");
        break;
      case "Multiplier":
        return internalGenerate(node.term, decorate, forceBraces, compact) + decorate(generateMultiplier(node), node);
      case "Boolean":
        result = "<boolean-expr[" + internalGenerate(node.term, decorate, forceBraces, compact) + "]>";
        break;
      case "Type":
        result = "<" + node.name + (node.opts ? decorate(generateTypeOpts(node.opts), node.opts) : "") + ">";
        break;
      case "Property":
        result = "<'" + node.name + "'>";
        break;
      case "Keyword":
        result = node.name;
        break;
      case "AtKeyword":
        result = "@" + node.name;
        break;
      case "Function":
        result = node.name + "(";
        break;
      case "String":
      case "Token":
        result = node.value;
        break;
      case "Comma":
        result = ",";
        break;
      default:
        throw new Error("Unknown node type `" + node.type + "`");
    }
    return decorate(result, node);
  }
  function generate(node, options) {
    let decorate = noop2;
    let forceBraces = false;
    let compact = false;
    if (typeof options === "function") {
      decorate = options;
    } else if (options) {
      forceBraces = Boolean(options.forceBraces);
      compact = Boolean(options.compact);
      if (typeof options.decorate === "function") {
        decorate = options.decorate;
      }
    }
    return internalGenerate(node, decorate, forceBraces, compact);
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/lexer/error.js
  var defaultLoc = { offset: 0, line: 1, column: 1 };
  function locateMismatch(matchResult, node) {
    const tokens = matchResult.tokens;
    const longestMatch = matchResult.longestMatch;
    const mismatchNode = longestMatch < tokens.length ? tokens[longestMatch].node || null : null;
    const badNode = mismatchNode !== node ? mismatchNode : null;
    let mismatchOffset = 0;
    let mismatchLength = 0;
    let entries2 = 0;
    let css = "";
    let start;
    let end;
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i].value;
      if (i === longestMatch) {
        mismatchLength = token.length;
        mismatchOffset = css.length;
      }
      if (badNode !== null && tokens[i].node === badNode) {
        if (i <= longestMatch) {
          entries2++;
        } else {
          entries2 = 0;
        }
      }
      css += token;
    }
    if (longestMatch === tokens.length || entries2 > 1) {
      start = fromLoc(badNode || node, "end") || buildLoc(defaultLoc, css);
      end = buildLoc(start);
    } else {
      start = fromLoc(badNode, "start") || buildLoc(fromLoc(node, "start") || defaultLoc, css.slice(0, mismatchOffset));
      end = fromLoc(badNode, "end") || buildLoc(start, css.substr(mismatchOffset, mismatchLength));
    }
    return {
      css,
      mismatchOffset,
      mismatchLength,
      start,
      end
    };
  }
  function fromLoc(node, point) {
    const value = node && node.loc && node.loc[point];
    if (value) {
      return "line" in value ? buildLoc(value) : value;
    }
    return null;
  }
  function buildLoc({ offset, line, column }, extra) {
    const loc = {
      offset,
      line,
      column
    };
    if (extra) {
      const lines = extra.split(/\n|\r\n?|\f/);
      loc.offset += extra.length;
      loc.line += lines.length - 1;
      loc.column = lines.length === 1 ? loc.column + extra.length : lines.pop().length + 1;
    }
    return loc;
  }
  var SyntaxReferenceError = function(type, referenceName) {
    const error2 = createCustomError(
      "SyntaxReferenceError",
      type + (referenceName ? " `" + referenceName + "`" : "")
    );
    error2.reference = referenceName;
    return error2;
  };
  var SyntaxMatchError = function(message, syntax, node, matchResult) {
    const error2 = createCustomError("SyntaxMatchError", message);
    const {
      css,
      mismatchOffset,
      mismatchLength,
      start,
      end
    } = locateMismatch(matchResult, node);
    error2.rawMessage = message;
    error2.syntax = syntax ? generate(syntax) : "<generic>";
    error2.css = css;
    error2.mismatchOffset = mismatchOffset;
    error2.mismatchLength = mismatchLength;
    error2.message = message + "\n  syntax: " + error2.syntax + "\n   value: " + (css || "<empty string>") + "\n  --------" + new Array(error2.mismatchOffset + 1).join("-") + "^";
    Object.assign(error2, start);
    error2.loc = {
      source: node && node.loc && node.loc.source || "<unknown>",
      start,
      end
    };
    return error2;
  };

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/utils/names.js
  var keywords = /* @__PURE__ */ new Map();
  var properties = /* @__PURE__ */ new Map();
  var HYPHENMINUS2 = 45;
  var keyword = getKeywordDescriptor;
  var property = getPropertyDescriptor;
  function isCustomProperty(str, offset) {
    offset = offset || 0;
    return str.length - offset >= 2 && str.charCodeAt(offset) === HYPHENMINUS2 && str.charCodeAt(offset + 1) === HYPHENMINUS2;
  }
  function getVendorPrefix(str, offset) {
    offset = offset || 0;
    if (str.length - offset >= 3) {
      if (str.charCodeAt(offset) === HYPHENMINUS2 && str.charCodeAt(offset + 1) !== HYPHENMINUS2) {
        const secondDashIndex = str.indexOf("-", offset + 2);
        if (secondDashIndex !== -1) {
          return str.substring(offset, secondDashIndex + 1);
        }
      }
    }
    return "";
  }
  function getKeywordDescriptor(keyword2) {
    if (keywords.has(keyword2)) {
      return keywords.get(keyword2);
    }
    const name50 = keyword2.toLowerCase();
    let descriptor = keywords.get(name50);
    if (descriptor === void 0) {
      const custom = isCustomProperty(name50, 0);
      const vendor = !custom ? getVendorPrefix(name50, 0) : "";
      descriptor = Object.freeze({
        basename: name50.substr(vendor.length),
        name: name50,
        prefix: vendor,
        vendor,
        custom
      });
    }
    keywords.set(keyword2, descriptor);
    return descriptor;
  }
  function getPropertyDescriptor(property2) {
    if (properties.has(property2)) {
      return properties.get(property2);
    }
    let name50 = property2;
    let hack = property2[0];
    if (hack === "/") {
      hack = property2[1] === "/" ? "//" : "/";
    } else if (hack !== "_" && hack !== "*" && hack !== "$" && hack !== "#" && hack !== "+" && hack !== "&") {
      hack = "";
    }
    const custom = isCustomProperty(name50, hack.length);
    if (!custom) {
      name50 = name50.toLowerCase();
      if (properties.has(name50)) {
        const descriptor2 = properties.get(name50);
        properties.set(property2, descriptor2);
        return descriptor2;
      }
    }
    const vendor = !custom ? getVendorPrefix(name50, hack.length) : "";
    const prefix = name50.substr(0, hack.length + vendor.length);
    const descriptor = Object.freeze({
      basename: name50.substr(prefix.length),
      name: name50.substr(hack.length),
      hack,
      vendor,
      prefix,
      custom
    });
    properties.set(property2, descriptor);
    return descriptor;
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/lexer/generic-const.js
  var cssWideKeywords = [
    "initial",
    "inherit",
    "unset",
    "revert",
    "revert-layer"
  ];

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/lexer/generic-an-plus-b.js
  var PLUSSIGN2 = 43;
  var HYPHENMINUS3 = 45;
  var N2 = 110;
  var DISALLOW_SIGN = true;
  var ALLOW_SIGN = false;
  function isDelim(token, code3) {
    return token !== null && token.type === Delim && token.value.charCodeAt(0) === code3;
  }
  function skipSC(token, offset, getNextToken) {
    while (token !== null && (token.type === WhiteSpace || token.type === Comment)) {
      token = getNextToken(++offset);
    }
    return offset;
  }
  function checkInteger(token, valueOffset, disallowSign, offset) {
    if (!token) {
      return 0;
    }
    const code3 = token.value.charCodeAt(valueOffset);
    if (code3 === PLUSSIGN2 || code3 === HYPHENMINUS3) {
      if (disallowSign) {
        return 0;
      }
      valueOffset++;
    }
    for (; valueOffset < token.value.length; valueOffset++) {
      if (!isDigit(token.value.charCodeAt(valueOffset))) {
        return 0;
      }
    }
    return offset + 1;
  }
  function consumeB(token, offset_, getNextToken) {
    let sign = false;
    let offset = skipSC(token, offset_, getNextToken);
    token = getNextToken(offset);
    if (token === null) {
      return offset_;
    }
    if (token.type !== Number2) {
      if (isDelim(token, PLUSSIGN2) || isDelim(token, HYPHENMINUS3)) {
        sign = true;
        offset = skipSC(getNextToken(++offset), offset, getNextToken);
        token = getNextToken(offset);
        if (token === null || token.type !== Number2) {
          return 0;
        }
      } else {
        return offset_;
      }
    }
    if (!sign) {
      const code3 = token.value.charCodeAt(0);
      if (code3 !== PLUSSIGN2 && code3 !== HYPHENMINUS3) {
        return 0;
      }
    }
    return checkInteger(token, sign ? 0 : 1, sign, offset);
  }
  function anPlusB(token, getNextToken) {
    let offset = 0;
    if (!token) {
      return 0;
    }
    if (token.type === Number2) {
      return checkInteger(token, 0, ALLOW_SIGN, offset);
    } else if (token.type === Ident && token.value.charCodeAt(0) === HYPHENMINUS3) {
      if (!cmpChar(token.value, 1, N2)) {
        return 0;
      }
      switch (token.value.length) {
        // -n
        // -n <signed-integer>
        // -n ['+' | '-'] <signless-integer>
        case 2:
          return consumeB(getNextToken(++offset), offset, getNextToken);
        // -n- <signless-integer>
        case 3:
          if (token.value.charCodeAt(2) !== HYPHENMINUS3) {
            return 0;
          }
          offset = skipSC(getNextToken(++offset), offset, getNextToken);
          token = getNextToken(offset);
          return checkInteger(token, 0, DISALLOW_SIGN, offset);
        // <dashndashdigit-ident>
        default:
          if (token.value.charCodeAt(2) !== HYPHENMINUS3) {
            return 0;
          }
          return checkInteger(token, 3, DISALLOW_SIGN, offset);
      }
    } else if (token.type === Ident || isDelim(token, PLUSSIGN2) && getNextToken(offset + 1).type === Ident) {
      if (token.type !== Ident) {
        token = getNextToken(++offset);
      }
      if (token === null || !cmpChar(token.value, 0, N2)) {
        return 0;
      }
      switch (token.value.length) {
        // '+'? n
        // '+'? n <signed-integer>
        // '+'? n ['+' | '-'] <signless-integer>
        case 1:
          return consumeB(getNextToken(++offset), offset, getNextToken);
        // '+'? n- <signless-integer>
        case 2:
          if (token.value.charCodeAt(1) !== HYPHENMINUS3) {
            return 0;
          }
          offset = skipSC(getNextToken(++offset), offset, getNextToken);
          token = getNextToken(offset);
          return checkInteger(token, 0, DISALLOW_SIGN, offset);
        // '+'? <ndashdigit-ident>
        default:
          if (token.value.charCodeAt(1) !== HYPHENMINUS3) {
            return 0;
          }
          return checkInteger(token, 2, DISALLOW_SIGN, offset);
      }
    } else if (token.type === Dimension) {
      let code3 = token.value.charCodeAt(0);
      let sign = code3 === PLUSSIGN2 || code3 === HYPHENMINUS3 ? 1 : 0;
      let i = sign;
      for (; i < token.value.length; i++) {
        if (!isDigit(token.value.charCodeAt(i))) {
          break;
        }
      }
      if (i === sign) {
        return 0;
      }
      if (!cmpChar(token.value, i, N2)) {
        return 0;
      }
      if (i + 1 === token.value.length) {
        return consumeB(getNextToken(++offset), offset, getNextToken);
      } else {
        if (token.value.charCodeAt(i + 1) !== HYPHENMINUS3) {
          return 0;
        }
        if (i + 2 === token.value.length) {
          offset = skipSC(getNextToken(++offset), offset, getNextToken);
          token = getNextToken(offset);
          return checkInteger(token, 0, DISALLOW_SIGN, offset);
        } else {
          return checkInteger(token, i + 2, DISALLOW_SIGN, offset);
        }
      }
    }
    return 0;
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/lexer/generic-urange.js
  var PLUSSIGN3 = 43;
  var HYPHENMINUS4 = 45;
  var QUESTIONMARK = 63;
  var U = 117;
  function isDelim2(token, code3) {
    return token !== null && token.type === Delim && token.value.charCodeAt(0) === code3;
  }
  function startsWith(token, code3) {
    return token.value.charCodeAt(0) === code3;
  }
  function hexSequence(token, offset, allowDash) {
    let hexlen = 0;
    for (let pos = offset; pos < token.value.length; pos++) {
      const code3 = token.value.charCodeAt(pos);
      if (code3 === HYPHENMINUS4 && allowDash && hexlen !== 0) {
        hexSequence(token, offset + hexlen + 1, false);
        return 6;
      }
      if (!isHexDigit(code3)) {
        return 0;
      }
      if (++hexlen > 6) {
        return 0;
      }
      ;
    }
    return hexlen;
  }
  function withQuestionMarkSequence(consumed, length2, getNextToken) {
    if (!consumed) {
      return 0;
    }
    while (isDelim2(getNextToken(length2), QUESTIONMARK)) {
      if (++consumed > 6) {
        return 0;
      }
      length2++;
    }
    return length2;
  }
  function urange(token, getNextToken) {
    let length2 = 0;
    if (token === null || token.type !== Ident || !cmpChar(token.value, 0, U)) {
      return 0;
    }
    token = getNextToken(++length2);
    if (token === null) {
      return 0;
    }
    if (isDelim2(token, PLUSSIGN3)) {
      token = getNextToken(++length2);
      if (token === null) {
        return 0;
      }
      if (token.type === Ident) {
        return withQuestionMarkSequence(hexSequence(token, 0, true), ++length2, getNextToken);
      }
      if (isDelim2(token, QUESTIONMARK)) {
        return withQuestionMarkSequence(1, ++length2, getNextToken);
      }
      return 0;
    }
    if (token.type === Number2) {
      const consumedHexLength = hexSequence(token, 1, true);
      if (consumedHexLength === 0) {
        return 0;
      }
      token = getNextToken(++length2);
      if (token === null) {
        return length2;
      }
      if (token.type === Dimension || token.type === Number2) {
        if (!startsWith(token, HYPHENMINUS4) || !hexSequence(token, 1, false)) {
          return 0;
        }
        return length2 + 1;
      }
      return withQuestionMarkSequence(consumedHexLength, length2, getNextToken);
    }
    if (token.type === Dimension) {
      return withQuestionMarkSequence(hexSequence(token, 1, true), ++length2, getNextToken);
    }
    return 0;
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/lexer/generic.js
  var calcFunctionNames = ["calc(", "-moz-calc(", "-webkit-calc("];
  var balancePair2 = /* @__PURE__ */ new Map([
    [Function2, RightParenthesis],
    [LeftParenthesis, RightParenthesis],
    [LeftSquareBracket, RightSquareBracket],
    [LeftCurlyBracket, RightCurlyBracket]
  ]);
  function charCodeAt(str, index) {
    return index < str.length ? str.charCodeAt(index) : 0;
  }
  function eqStr(actual, expected) {
    return cmpStr(actual, 0, actual.length, expected);
  }
  function eqStrAny(actual, expected) {
    for (let i = 0; i < expected.length; i++) {
      if (eqStr(actual, expected[i])) {
        return true;
      }
    }
    return false;
  }
  function isPostfixIeHack(str, offset) {
    if (offset !== str.length - 2) {
      return false;
    }
    return charCodeAt(str, offset) === 92 && // U+005C REVERSE SOLIDUS (\)
    isDigit(charCodeAt(str, offset + 1));
  }
  function outOfRange(opts, value, numEnd) {
    if (opts && opts.type === "Range") {
      const num = Number(
        numEnd !== void 0 && numEnd !== value.length ? value.substr(0, numEnd) : value
      );
      if (isNaN(num)) {
        return true;
      }
      if (opts.min !== null && num < opts.min && typeof opts.min !== "string") {
        return true;
      }
      if (opts.max !== null && num > opts.max && typeof opts.max !== "string") {
        return true;
      }
    }
    return false;
  }
  function consumeFunction(token, getNextToken) {
    let balanceCloseType = 0;
    let balanceStash = [];
    let length2 = 0;
    scan:
      do {
        switch (token.type) {
          case RightCurlyBracket:
          case RightParenthesis:
          case RightSquareBracket:
            if (token.type !== balanceCloseType) {
              break scan;
            }
            balanceCloseType = balanceStash.pop();
            if (balanceStash.length === 0) {
              length2++;
              break scan;
            }
            break;
          case Function2:
          case LeftParenthesis:
          case LeftSquareBracket:
          case LeftCurlyBracket:
            balanceStash.push(balanceCloseType);
            balanceCloseType = balancePair2.get(token.type);
            break;
        }
        length2++;
      } while (token = getNextToken(length2));
    return length2;
  }
  function calc(next) {
    return function(token, getNextToken, opts) {
      if (token === null) {
        return 0;
      }
      if (token.type === Function2 && eqStrAny(token.value, calcFunctionNames)) {
        return consumeFunction(token, getNextToken);
      }
      return next(token, getNextToken, opts);
    };
  }
  function tokenType(expectedTokenType) {
    return function(token) {
      if (token === null || token.type !== expectedTokenType) {
        return 0;
      }
      return 1;
    };
  }
  function customIdent(token) {
    if (token === null || token.type !== Ident) {
      return 0;
    }
    const name50 = token.value.toLowerCase();
    if (eqStrAny(name50, cssWideKeywords)) {
      return 0;
    }
    if (eqStr(name50, "default")) {
      return 0;
    }
    return 1;
  }
  function dashedIdent(token) {
    if (token === null || token.type !== Ident) {
      return 0;
    }
    if (charCodeAt(token.value, 0) !== 45 || charCodeAt(token.value, 1) !== 45) {
      return 0;
    }
    return 1;
  }
  function customPropertyName(token) {
    if (!dashedIdent(token)) {
      return 0;
    }
    if (token.value === "--") {
      return 0;
    }
    return 1;
  }
  function hexColor(token) {
    if (token === null || token.type !== Hash) {
      return 0;
    }
    const length2 = token.value.length;
    if (length2 !== 4 && length2 !== 5 && length2 !== 7 && length2 !== 9) {
      return 0;
    }
    for (let i = 1; i < length2; i++) {
      if (!isHexDigit(charCodeAt(token.value, i))) {
        return 0;
      }
    }
    return 1;
  }
  function idSelector(token) {
    if (token === null || token.type !== Hash) {
      return 0;
    }
    if (!isIdentifierStart(charCodeAt(token.value, 1), charCodeAt(token.value, 2), charCodeAt(token.value, 3))) {
      return 0;
    }
    return 1;
  }
  function declarationValue(token, getNextToken) {
    if (!token) {
      return 0;
    }
    let balanceCloseType = 0;
    let balanceStash = [];
    let length2 = 0;
    scan:
      do {
        switch (token.type) {
          // ... <bad-string-token>, <bad-url-token>,
          case BadString:
          case BadUrl:
            break scan;
          // ... unmatched <)-token>, <]-token>, or <}-token>,
          case RightCurlyBracket:
          case RightParenthesis:
          case RightSquareBracket:
            if (token.type !== balanceCloseType) {
              break scan;
            }
            balanceCloseType = balanceStash.pop();
            break;
          // ... or top-level <semicolon-token> tokens
          case Semicolon:
            if (balanceCloseType === 0) {
              break scan;
            }
            break;
          // ... or <delim-token> tokens with a value of "!"
          case Delim:
            if (balanceCloseType === 0 && token.value === "!") {
              break scan;
            }
            break;
          case Function2:
          case LeftParenthesis:
          case LeftSquareBracket:
          case LeftCurlyBracket:
            balanceStash.push(balanceCloseType);
            balanceCloseType = balancePair2.get(token.type);
            break;
        }
        length2++;
      } while (token = getNextToken(length2));
    return length2;
  }
  function anyValue(token, getNextToken) {
    if (!token) {
      return 0;
    }
    let balanceCloseType = 0;
    let balanceStash = [];
    let length2 = 0;
    scan:
      do {
        switch (token.type) {
          // ... does not contain <bad-string-token>, <bad-url-token>,
          case BadString:
          case BadUrl:
            break scan;
          // ... unmatched <)-token>, <]-token>, or <}-token>,
          case RightCurlyBracket:
          case RightParenthesis:
          case RightSquareBracket:
            if (token.type !== balanceCloseType) {
              break scan;
            }
            balanceCloseType = balanceStash.pop();
            break;
          case Function2:
          case LeftParenthesis:
          case LeftSquareBracket:
          case LeftCurlyBracket:
            balanceStash.push(balanceCloseType);
            balanceCloseType = balancePair2.get(token.type);
            break;
        }
        length2++;
      } while (token = getNextToken(length2));
    return length2;
  }
  function dimension(type) {
    if (type) {
      type = new Set(type);
    }
    return function(token, getNextToken, opts) {
      if (token === null || token.type !== Dimension) {
        return 0;
      }
      const numberEnd = consumeNumber(token.value, 0);
      if (type !== null) {
        const reverseSolidusOffset = token.value.indexOf("\\", numberEnd);
        const unit = reverseSolidusOffset === -1 || !isPostfixIeHack(token.value, reverseSolidusOffset) ? token.value.substr(numberEnd) : token.value.substring(numberEnd, reverseSolidusOffset);
        if (type.has(unit.toLowerCase()) === false) {
          return 0;
        }
      }
      if (outOfRange(opts, token.value, numberEnd)) {
        return 0;
      }
      return 1;
    };
  }
  function percentage(token, getNextToken, opts) {
    if (token === null || token.type !== Percentage) {
      return 0;
    }
    if (outOfRange(opts, token.value, token.value.length - 1)) {
      return 0;
    }
    return 1;
  }
  function zero(next) {
    if (typeof next !== "function") {
      next = function() {
        return 0;
      };
    }
    return function(token, getNextToken, opts) {
      if (token !== null && token.type === Number2) {
        if (Number(token.value) === 0) {
          return 1;
        }
      }
      return next(token, getNextToken, opts);
    };
  }
  function number(token, getNextToken, opts) {
    if (token === null) {
      return 0;
    }
    const numberEnd = consumeNumber(token.value, 0);
    const isNumber2 = numberEnd === token.value.length;
    if (!isNumber2 && !isPostfixIeHack(token.value, numberEnd)) {
      return 0;
    }
    if (outOfRange(opts, token.value, numberEnd)) {
      return 0;
    }
    return 1;
  }
  function integer(token, getNextToken, opts) {
    if (token === null || token.type !== Number2) {
      return 0;
    }
    let i = charCodeAt(token.value, 0) === 43 || // U+002B PLUS SIGN (+)
    charCodeAt(token.value, 0) === 45 ? 1 : 0;
    for (; i < token.value.length; i++) {
      if (!isDigit(charCodeAt(token.value, i))) {
        return 0;
      }
    }
    if (outOfRange(opts, token.value, i)) {
      return 0;
    }
    return 1;
  }
  var tokenTypes = {
    "ident-token": tokenType(Ident),
    "function-token": tokenType(Function2),
    "at-keyword-token": tokenType(AtKeyword),
    "hash-token": tokenType(Hash),
    "string-token": tokenType(String2),
    "bad-string-token": tokenType(BadString),
    "url-token": tokenType(Url2),
    "bad-url-token": tokenType(BadUrl),
    "delim-token": tokenType(Delim),
    "number-token": tokenType(Number2),
    "percentage-token": tokenType(Percentage),
    "dimension-token": tokenType(Dimension),
    "whitespace-token": tokenType(WhiteSpace),
    "CDO-token": tokenType(CDO),
    "CDC-token": tokenType(CDC),
    "colon-token": tokenType(Colon),
    "semicolon-token": tokenType(Semicolon),
    "comma-token": tokenType(Comma),
    "[-token": tokenType(LeftSquareBracket),
    "]-token": tokenType(RightSquareBracket),
    "(-token": tokenType(LeftParenthesis),
    ")-token": tokenType(RightParenthesis),
    "{-token": tokenType(LeftCurlyBracket),
    "}-token": tokenType(RightCurlyBracket)
  };
  var productionTypes = {
    // token type aliases
    "string": tokenType(String2),
    "ident": tokenType(Ident),
    // percentage
    "percentage": calc(percentage),
    // numeric
    "zero": zero(),
    "number": calc(number),
    "integer": calc(integer),
    // complex types
    "custom-ident": customIdent,
    "dashed-ident": dashedIdent,
    "custom-property-name": customPropertyName,
    "hex-color": hexColor,
    "id-selector": idSelector,
    // element( <id-selector> )
    "an-plus-b": anPlusB,
    "urange": urange,
    "declaration-value": declarationValue,
    "any-value": anyValue
  };
  function createDemensionTypes(units) {
    const {
      angle: angle2,
      decibel: decibel2,
      frequency: frequency2,
      flex: flex2,
      length: length2,
      resolution: resolution2,
      semitones: semitones2,
      time: time2
    } = units || {};
    return {
      "dimension": calc(dimension(null)),
      "angle": calc(dimension(angle2)),
      "decibel": calc(dimension(decibel2)),
      "frequency": calc(dimension(frequency2)),
      "flex": calc(dimension(flex2)),
      "length": calc(zero(dimension(length2))),
      "resolution": calc(dimension(resolution2)),
      "semitones": calc(dimension(semitones2)),
      "time": calc(dimension(time2))
    };
  }
  function createGenericTypes(units) {
    return {
      ...tokenTypes,
      ...productionTypes,
      ...createDemensionTypes(units)
    };
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/lexer/units.js
  var units_exports = {};
  __export(units_exports, {
    angle: () => angle,
    decibel: () => decibel,
    flex: () => flex,
    frequency: () => frequency,
    length: () => length,
    resolution: () => resolution,
    semitones: () => semitones,
    time: () => time
  });
  var length = [
    // absolute length units https://www.w3.org/TR/css-values-3/#lengths
    "cm",
    "mm",
    "q",
    "in",
    "pt",
    "pc",
    "px",
    // font-relative length units https://drafts.csswg.org/css-values-4/#font-relative-lengths
    "em",
    "rem",
    "ex",
    "rex",
    "cap",
    "rcap",
    "ch",
    "rch",
    "ic",
    "ric",
    "lh",
    "rlh",
    // viewport-percentage lengths https://drafts.csswg.org/css-values-4/#viewport-relative-lengths
    "vw",
    "svw",
    "lvw",
    "dvw",
    "vh",
    "svh",
    "lvh",
    "dvh",
    "vi",
    "svi",
    "lvi",
    "dvi",
    "vb",
    "svb",
    "lvb",
    "dvb",
    "vmin",
    "svmin",
    "lvmin",
    "dvmin",
    "vmax",
    "svmax",
    "lvmax",
    "dvmax",
    // container relative lengths https://drafts.csswg.org/css-contain-3/#container-lengths
    "cqw",
    "cqh",
    "cqi",
    "cqb",
    "cqmin",
    "cqmax"
  ];
  var angle = ["deg", "grad", "rad", "turn"];
  var time = ["s", "ms"];
  var frequency = ["hz", "khz"];
  var resolution = ["dpi", "dpcm", "dppx", "x"];
  var flex = ["fr"];
  var decibel = ["db"];
  var semitones = ["st"];

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/definition-syntax/SyntaxError.js
  function SyntaxError3(message, input, offset) {
    return Object.assign(createCustomError("SyntaxError", message), {
      input,
      offset,
      rawMessage: message,
      message: message + "\n  " + input + "\n--" + new Array((offset || input.length) + 1).join("-") + "^"
    });
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/definition-syntax/scanner.js
  var TAB = 9;
  var N3 = 10;
  var F2 = 12;
  var R2 = 13;
  var SPACE = 32;
  var NAME_CHAR = new Uint8Array(128).map(
    (_, idx) => /[a-zA-Z0-9\-]/.test(String.fromCharCode(idx)) ? 1 : 0
  );
  var Scanner = class {
    constructor(str) {
      this.str = str;
      this.pos = 0;
    }
    charCodeAt(pos) {
      return pos < this.str.length ? this.str.charCodeAt(pos) : 0;
    }
    charCode() {
      return this.charCodeAt(this.pos);
    }
    isNameCharCode(code3 = this.charCode()) {
      return code3 < 128 && NAME_CHAR[code3] === 1;
    }
    nextCharCode() {
      return this.charCodeAt(this.pos + 1);
    }
    nextNonWsCode(pos) {
      return this.charCodeAt(this.findWsEnd(pos));
    }
    skipWs() {
      this.pos = this.findWsEnd(this.pos);
    }
    findWsEnd(pos) {
      for (; pos < this.str.length; pos++) {
        const code3 = this.str.charCodeAt(pos);
        if (code3 !== R2 && code3 !== N3 && code3 !== F2 && code3 !== SPACE && code3 !== TAB) {
          break;
        }
      }
      return pos;
    }
    substringToPos(end) {
      return this.str.substring(this.pos, this.pos = end);
    }
    eat(code3) {
      if (this.charCode() !== code3) {
        this.error("Expect `" + String.fromCharCode(code3) + "`");
      }
      this.pos++;
    }
    peek() {
      return this.pos < this.str.length ? this.str.charAt(this.pos++) : "";
    }
    error(message) {
      throw new SyntaxError3(message, this.str, this.pos);
    }
    scanSpaces() {
      return this.substringToPos(this.findWsEnd(this.pos));
    }
    scanWord() {
      let end = this.pos;
      for (; end < this.str.length; end++) {
        const code3 = this.str.charCodeAt(end);
        if (code3 >= 128 || NAME_CHAR[code3] === 0) {
          break;
        }
      }
      if (this.pos === end) {
        this.error("Expect a keyword");
      }
      return this.substringToPos(end);
    }
    scanNumber() {
      let end = this.pos;
      for (; end < this.str.length; end++) {
        const code3 = this.str.charCodeAt(end);
        if (code3 < 48 || code3 > 57) {
          break;
        }
      }
      if (this.pos === end) {
        this.error("Expect a number");
      }
      return this.substringToPos(end);
    }
    scanString() {
      const end = this.str.indexOf("'", this.pos + 1);
      if (end === -1) {
        this.pos = this.str.length;
        this.error("Expect an apostrophe");
      }
      return this.substringToPos(end + 1);
    }
  };

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/definition-syntax/parse.js
  var TAB2 = 9;
  var N4 = 10;
  var F3 = 12;
  var R3 = 13;
  var SPACE2 = 32;
  var EXCLAMATIONMARK2 = 33;
  var NUMBERSIGN2 = 35;
  var AMPERSAND = 38;
  var APOSTROPHE2 = 39;
  var LEFTPARENTHESIS = 40;
  var RIGHTPARENTHESIS = 41;
  var ASTERISK = 42;
  var PLUSSIGN4 = 43;
  var COMMA = 44;
  var HYPERMINUS = 45;
  var LESSTHANSIGN = 60;
  var GREATERTHANSIGN = 62;
  var QUESTIONMARK2 = 63;
  var COMMERCIALAT = 64;
  var LEFTSQUAREBRACKET = 91;
  var RIGHTSQUAREBRACKET = 93;
  var LEFTCURLYBRACKET2 = 123;
  var VERTICALLINE = 124;
  var RIGHTCURLYBRACKET = 125;
  var INFINITY = 8734;
  var COMBINATOR_PRECEDENCE = {
    " ": 1,
    "&&": 2,
    "||": 3,
    "|": 4
  };
  function readMultiplierRange(scanner) {
    let min = null;
    let max = null;
    scanner.eat(LEFTCURLYBRACKET2);
    scanner.skipWs();
    min = scanner.scanNumber(scanner);
    scanner.skipWs();
    if (scanner.charCode() === COMMA) {
      scanner.pos++;
      scanner.skipWs();
      if (scanner.charCode() !== RIGHTCURLYBRACKET) {
        max = scanner.scanNumber(scanner);
        scanner.skipWs();
      }
    } else {
      max = min;
    }
    scanner.eat(RIGHTCURLYBRACKET);
    return {
      min: Number(min),
      max: max ? Number(max) : 0
    };
  }
  function readMultiplier(scanner) {
    let range = null;
    let comma = false;
    switch (scanner.charCode()) {
      case ASTERISK:
        scanner.pos++;
        range = {
          min: 0,
          max: 0
        };
        break;
      case PLUSSIGN4:
        scanner.pos++;
        range = {
          min: 1,
          max: 0
        };
        break;
      case QUESTIONMARK2:
        scanner.pos++;
        range = {
          min: 0,
          max: 1
        };
        break;
      case NUMBERSIGN2:
        scanner.pos++;
        comma = true;
        if (scanner.charCode() === LEFTCURLYBRACKET2) {
          range = readMultiplierRange(scanner);
        } else if (scanner.charCode() === QUESTIONMARK2) {
          scanner.pos++;
          range = {
            min: 0,
            max: 0
          };
        } else {
          range = {
            min: 1,
            max: 0
          };
        }
        break;
      case LEFTCURLYBRACKET2:
        range = readMultiplierRange(scanner);
        break;
      default:
        return null;
    }
    return {
      type: "Multiplier",
      comma,
      min: range.min,
      max: range.max,
      term: null
    };
  }
  function maybeMultiplied(scanner, node) {
    const multiplier = readMultiplier(scanner);
    if (multiplier !== null) {
      multiplier.term = node;
      if (scanner.charCode() === NUMBERSIGN2 && scanner.charCodeAt(scanner.pos - 1) === PLUSSIGN4) {
        return maybeMultiplied(scanner, multiplier);
      }
      return multiplier;
    }
    return node;
  }
  function maybeToken(scanner) {
    const ch = scanner.peek();
    if (ch === "") {
      return null;
    }
    return maybeMultiplied(scanner, {
      type: "Token",
      value: ch
    });
  }
  function readProperty(scanner) {
    let name50;
    scanner.eat(LESSTHANSIGN);
    scanner.eat(APOSTROPHE2);
    name50 = scanner.scanWord();
    scanner.eat(APOSTROPHE2);
    scanner.eat(GREATERTHANSIGN);
    return maybeMultiplied(scanner, {
      type: "Property",
      name: name50
    });
  }
  function readTypeRange(scanner) {
    let min = null;
    let max = null;
    let sign = 1;
    scanner.eat(LEFTSQUAREBRACKET);
    if (scanner.charCode() === HYPERMINUS) {
      scanner.peek();
      sign = -1;
    }
    if (sign == -1 && scanner.charCode() === INFINITY) {
      scanner.peek();
    } else {
      min = sign * Number(scanner.scanNumber(scanner));
      if (scanner.isNameCharCode()) {
        min += scanner.scanWord();
      }
    }
    scanner.skipWs();
    scanner.eat(COMMA);
    scanner.skipWs();
    if (scanner.charCode() === INFINITY) {
      scanner.peek();
    } else {
      sign = 1;
      if (scanner.charCode() === HYPERMINUS) {
        scanner.peek();
        sign = -1;
      }
      max = sign * Number(scanner.scanNumber(scanner));
      if (scanner.isNameCharCode()) {
        max += scanner.scanWord();
      }
    }
    scanner.eat(RIGHTSQUAREBRACKET);
    return {
      type: "Range",
      min,
      max
    };
  }
  function readType(scanner) {
    let name50;
    let opts = null;
    scanner.eat(LESSTHANSIGN);
    name50 = scanner.scanWord();
    if (name50 === "boolean-expr") {
      scanner.eat(LEFTSQUAREBRACKET);
      const implicitGroup = readImplicitGroup(scanner, RIGHTSQUAREBRACKET);
      scanner.eat(RIGHTSQUAREBRACKET);
      scanner.eat(GREATERTHANSIGN);
      return maybeMultiplied(scanner, {
        type: "Boolean",
        term: implicitGroup.terms.length === 1 ? implicitGroup.terms[0] : implicitGroup
      });
    }
    if (scanner.charCode() === LEFTPARENTHESIS && scanner.nextCharCode() === RIGHTPARENTHESIS) {
      scanner.pos += 2;
      name50 += "()";
    }
    if (scanner.charCodeAt(scanner.findWsEnd(scanner.pos)) === LEFTSQUAREBRACKET) {
      scanner.skipWs();
      opts = readTypeRange(scanner);
    }
    scanner.eat(GREATERTHANSIGN);
    return maybeMultiplied(scanner, {
      type: "Type",
      name: name50,
      opts
    });
  }
  function readKeywordOrFunction(scanner) {
    const name50 = scanner.scanWord();
    if (scanner.charCode() === LEFTPARENTHESIS) {
      scanner.pos++;
      return {
        type: "Function",
        name: name50
      };
    }
    return maybeMultiplied(scanner, {
      type: "Keyword",
      name: name50
    });
  }
  function regroupTerms(terms, combinators) {
    function createGroup(terms2, combinator2) {
      return {
        type: "Group",
        terms: terms2,
        combinator: combinator2,
        disallowEmpty: false,
        explicit: false
      };
    }
    let combinator;
    combinators = Object.keys(combinators).sort((a, b) => COMBINATOR_PRECEDENCE[a] - COMBINATOR_PRECEDENCE[b]);
    while (combinators.length > 0) {
      combinator = combinators.shift();
      let i = 0;
      let subgroupStart = 0;
      for (; i < terms.length; i++) {
        const term = terms[i];
        if (term.type === "Combinator") {
          if (term.value === combinator) {
            if (subgroupStart === -1) {
              subgroupStart = i - 1;
            }
            terms.splice(i, 1);
            i--;
          } else {
            if (subgroupStart !== -1 && i - subgroupStart > 1) {
              terms.splice(
                subgroupStart,
                i - subgroupStart,
                createGroup(terms.slice(subgroupStart, i), combinator)
              );
              i = subgroupStart + 1;
            }
            subgroupStart = -1;
          }
        }
      }
      if (subgroupStart !== -1 && combinators.length) {
        terms.splice(
          subgroupStart,
          i - subgroupStart,
          createGroup(terms.slice(subgroupStart, i), combinator)
        );
      }
    }
    return combinator;
  }
  function readImplicitGroup(scanner, stopCharCode) {
    const combinators = /* @__PURE__ */ Object.create(null);
    const terms = [];
    let token;
    let prevToken = null;
    let prevTokenPos = scanner.pos;
    while (scanner.charCode() !== stopCharCode && (token = peek(scanner, stopCharCode))) {
      if (token.type !== "Spaces") {
        if (token.type === "Combinator") {
          if (prevToken === null || prevToken.type === "Combinator") {
            scanner.pos = prevTokenPos;
            scanner.error("Unexpected combinator");
          }
          combinators[token.value] = true;
        } else if (prevToken !== null && prevToken.type !== "Combinator") {
          combinators[" "] = true;
          terms.push({
            type: "Combinator",
            value: " "
          });
        }
        terms.push(token);
        prevToken = token;
        prevTokenPos = scanner.pos;
      }
    }
    if (prevToken !== null && prevToken.type === "Combinator") {
      scanner.pos -= prevTokenPos;
      scanner.error("Unexpected combinator");
    }
    return {
      type: "Group",
      terms,
      combinator: regroupTerms(terms, combinators) || " ",
      disallowEmpty: false,
      explicit: false
    };
  }
  function readGroup(scanner, stopCharCode) {
    let result;
    scanner.eat(LEFTSQUAREBRACKET);
    result = readImplicitGroup(scanner, stopCharCode);
    scanner.eat(RIGHTSQUAREBRACKET);
    result.explicit = true;
    if (scanner.charCode() === EXCLAMATIONMARK2) {
      scanner.pos++;
      result.disallowEmpty = true;
    }
    return result;
  }
  function peek(scanner, stopCharCode) {
    let code3 = scanner.charCode();
    switch (code3) {
      case RIGHTSQUAREBRACKET:
        break;
      case LEFTSQUAREBRACKET:
        return maybeMultiplied(scanner, readGroup(scanner, stopCharCode));
      case LESSTHANSIGN:
        return scanner.nextCharCode() === APOSTROPHE2 ? readProperty(scanner) : readType(scanner);
      case VERTICALLINE:
        return {
          type: "Combinator",
          value: scanner.substringToPos(
            scanner.pos + (scanner.nextCharCode() === VERTICALLINE ? 2 : 1)
          )
        };
      case AMPERSAND:
        scanner.pos++;
        scanner.eat(AMPERSAND);
        return {
          type: "Combinator",
          value: "&&"
        };
      case COMMA:
        scanner.pos++;
        return {
          type: "Comma"
        };
      case APOSTROPHE2:
        return maybeMultiplied(scanner, {
          type: "String",
          value: scanner.scanString()
        });
      case SPACE2:
      case TAB2:
      case N4:
      case R3:
      case F3:
        return {
          type: "Spaces",
          value: scanner.scanSpaces()
        };
      case COMMERCIALAT:
        code3 = scanner.nextCharCode();
        if (scanner.isNameCharCode(code3)) {
          scanner.pos++;
          return {
            type: "AtKeyword",
            name: scanner.scanWord()
          };
        }
        return maybeToken(scanner);
      case ASTERISK:
      case PLUSSIGN4:
      case QUESTIONMARK2:
      case NUMBERSIGN2:
      case EXCLAMATIONMARK2:
        break;
      case LEFTCURLYBRACKET2:
        code3 = scanner.nextCharCode();
        if (code3 < 48 || code3 > 57) {
          return maybeToken(scanner);
        }
        break;
      default:
        if (scanner.isNameCharCode(code3)) {
          return readKeywordOrFunction(scanner);
        }
        return maybeToken(scanner);
    }
  }
  function parse(source) {
    const scanner = new Scanner(source);
    const result = readImplicitGroup(scanner);
    if (scanner.pos !== source.length) {
      scanner.error("Unexpected input");
    }
    if (result.terms.length === 1 && result.terms[0].type === "Group") {
      return result.terms[0];
    }
    return result;
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/definition-syntax/walk.js
  var noop3 = function() {
  };
  function ensureFunction2(value) {
    return typeof value === "function" ? value : noop3;
  }
  function walk(node, options, context) {
    function walk3(node2) {
      enter.call(context, node2);
      switch (node2.type) {
        case "Group":
          node2.terms.forEach(walk3);
          break;
        case "Multiplier":
        case "Boolean":
          walk3(node2.term);
          break;
        case "Type":
        case "Property":
        case "Keyword":
        case "AtKeyword":
        case "Function":
        case "String":
        case "Token":
        case "Comma":
          break;
        default:
          throw new Error("Unknown type: " + node2.type);
      }
      leave.call(context, node2);
    }
    let enter = noop3;
    let leave = noop3;
    if (typeof options === "function") {
      enter = options;
    } else if (options) {
      enter = ensureFunction2(options.enter);
      leave = ensureFunction2(options.leave);
    }
    if (enter === noop3 && leave === noop3) {
      throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function");
    }
    walk3(node, context);
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/lexer/prepare-tokens.js
  var astToTokens = {
    decorator(handlers) {
      const tokens = [];
      let curNode = null;
      return {
        ...handlers,
        node(node) {
          const tmp = curNode;
          curNode = node;
          handlers.node.call(this, node);
          curNode = tmp;
        },
        emit(value, type, auto) {
          tokens.push({
            type,
            value,
            node: auto ? null : curNode
          });
        },
        result() {
          return tokens;
        }
      };
    }
  };
  function stringToTokens(str) {
    const tokens = [];
    tokenize(
      str,
      (type, start, end) => tokens.push({
        type,
        value: str.slice(start, end),
        node: null
      })
    );
    return tokens;
  }
  function prepare_tokens_default(value, syntax) {
    if (typeof value === "string") {
      return stringToTokens(value);
    }
    return syntax.generate(value, astToTokens);
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/lexer/match-graph.js
  var MATCH = { type: "Match" };
  var MISMATCH = { type: "Mismatch" };
  var DISALLOW_EMPTY = { type: "DisallowEmpty" };
  var LEFTPARENTHESIS2 = 40;
  var RIGHTPARENTHESIS2 = 41;
  function createCondition(match2, thenBranch, elseBranch) {
    if (thenBranch === MATCH && elseBranch === MISMATCH) {
      return match2;
    }
    if (match2 === MATCH && thenBranch === MATCH && elseBranch === MATCH) {
      return match2;
    }
    if (match2.type === "If" && match2.else === MISMATCH && thenBranch === MATCH) {
      thenBranch = match2.then;
      match2 = match2.match;
    }
    return {
      type: "If",
      match: match2,
      then: thenBranch,
      else: elseBranch
    };
  }
  function isFunctionType(name50) {
    return name50.length > 2 && name50.charCodeAt(name50.length - 2) === LEFTPARENTHESIS2 && name50.charCodeAt(name50.length - 1) === RIGHTPARENTHESIS2;
  }
  function isEnumCapatible(term) {
    return term.type === "Keyword" || term.type === "AtKeyword" || term.type === "Function" || term.type === "Type" && isFunctionType(term.name);
  }
  function groupNode(terms, combinator = " ", explicit = false) {
    return {
      type: "Group",
      terms,
      combinator,
      disallowEmpty: false,
      explicit
    };
  }
  function replaceTypeInGraph(node, replacements, visited = /* @__PURE__ */ new Set()) {
    if (!visited.has(node)) {
      visited.add(node);
      switch (node.type) {
        case "If":
          node.match = replaceTypeInGraph(node.match, replacements, visited);
          node.then = replaceTypeInGraph(node.then, replacements, visited);
          node.else = replaceTypeInGraph(node.else, replacements, visited);
          break;
        case "Type":
          return replacements[node.name] || node;
      }
    }
    return node;
  }
  function buildGroupMatchGraph(combinator, terms, atLeastOneTermMatched) {
    switch (combinator) {
      case " ": {
        let result = MATCH;
        for (let i = terms.length - 1; i >= 0; i--) {
          const term = terms[i];
          result = createCondition(
            term,
            result,
            MISMATCH
          );
        }
        ;
        return result;
      }
      case "|": {
        let result = MISMATCH;
        let map2 = null;
        for (let i = terms.length - 1; i >= 0; i--) {
          let term = terms[i];
          if (isEnumCapatible(term)) {
            if (map2 === null && i > 0 && isEnumCapatible(terms[i - 1])) {
              map2 = /* @__PURE__ */ Object.create(null);
              result = createCondition(
                {
                  type: "Enum",
                  map: map2
                },
                MATCH,
                result
              );
            }
            if (map2 !== null) {
              const key = (isFunctionType(term.name) ? term.name.slice(0, -1) : term.name).toLowerCase();
              if (key in map2 === false) {
                map2[key] = term;
                continue;
              }
            }
          }
          map2 = null;
          result = createCondition(
            term,
            MATCH,
            result
          );
        }
        ;
        return result;
      }
      case "&&": {
        if (terms.length > 5) {
          return {
            type: "MatchOnce",
            terms,
            all: true
          };
        }
        let result = MISMATCH;
        for (let i = terms.length - 1; i >= 0; i--) {
          const term = terms[i];
          let thenClause;
          if (terms.length > 1) {
            thenClause = buildGroupMatchGraph(
              combinator,
              terms.filter(function(newGroupTerm) {
                return newGroupTerm !== term;
              }),
              false
            );
          } else {
            thenClause = MATCH;
          }
          result = createCondition(
            term,
            thenClause,
            result
          );
        }
        ;
        return result;
      }
      case "||": {
        if (terms.length > 5) {
          return {
            type: "MatchOnce",
            terms,
            all: false
          };
        }
        let result = atLeastOneTermMatched ? MATCH : MISMATCH;
        for (let i = terms.length - 1; i >= 0; i--) {
          const term = terms[i];
          let thenClause;
          if (terms.length > 1) {
            thenClause = buildGroupMatchGraph(
              combinator,
              terms.filter(function(newGroupTerm) {
                return newGroupTerm !== term;
              }),
              true
            );
          } else {
            thenClause = MATCH;
          }
          result = createCondition(
            term,
            thenClause,
            result
          );
        }
        ;
        return result;
      }
    }
  }
  function buildMultiplierMatchGraph(node) {
    let result = MATCH;
    let matchTerm = buildMatchGraphInternal(node.term);
    if (node.max === 0) {
      matchTerm = createCondition(
        matchTerm,
        DISALLOW_EMPTY,
        MISMATCH
      );
      result = createCondition(
        matchTerm,
        null,
        // will be a loop
        MISMATCH
      );
      result.then = createCondition(
        MATCH,
        MATCH,
        result
        // make a loop
      );
      if (node.comma) {
        result.then.else = createCondition(
          { type: "Comma", syntax: node },
          result,
          MISMATCH
        );
      }
    } else {
      for (let i = node.min || 1; i <= node.max; i++) {
        if (node.comma && result !== MATCH) {
          result = createCondition(
            { type: "Comma", syntax: node },
            result,
            MISMATCH
          );
        }
        result = createCondition(
          matchTerm,
          createCondition(
            MATCH,
            MATCH,
            result
          ),
          MISMATCH
        );
      }
    }
    if (node.min === 0) {
      result = createCondition(
        MATCH,
        MATCH,
        result
      );
    } else {
      for (let i = 0; i < node.min - 1; i++) {
        if (node.comma && result !== MATCH) {
          result = createCondition(
            { type: "Comma", syntax: node },
            result,
            MISMATCH
          );
        }
        result = createCondition(
          matchTerm,
          result,
          MISMATCH
        );
      }
    }
    return result;
  }
  function buildMatchGraphInternal(node) {
    if (typeof node === "function") {
      return {
        type: "Generic",
        fn: node
      };
    }
    switch (node.type) {
      case "Group": {
        let result = buildGroupMatchGraph(
          node.combinator,
          node.terms.map(buildMatchGraphInternal),
          false
        );
        if (node.disallowEmpty) {
          result = createCondition(
            result,
            DISALLOW_EMPTY,
            MISMATCH
          );
        }
        return result;
      }
      case "Multiplier":
        return buildMultiplierMatchGraph(node);
      // https://drafts.csswg.org/css-values-5/#boolean
      case "Boolean": {
        const term = buildMatchGraphInternal(node.term);
        const matchNode = buildMatchGraphInternal(groupNode([
          groupNode([
            { type: "Keyword", name: "not" },
            { type: "Type", name: "!boolean-group" }
          ]),
          groupNode([
            { type: "Type", name: "!boolean-group" },
            groupNode([
              { type: "Multiplier", comma: false, min: 0, max: 0, term: groupNode([
                { type: "Keyword", name: "and" },
                { type: "Type", name: "!boolean-group" }
              ]) },
              { type: "Multiplier", comma: false, min: 0, max: 0, term: groupNode([
                { type: "Keyword", name: "or" },
                { type: "Type", name: "!boolean-group" }
              ]) }
            ], "|")
          ])
        ], "|"));
        const booleanGroup = buildMatchGraphInternal(
          groupNode([
            { type: "Type", name: "!term" },
            groupNode([
              { type: "Token", value: "(" },
              { type: "Type", name: "!self" },
              { type: "Token", value: ")" }
            ]),
            { type: "Type", name: "general-enclosed" }
          ], "|")
        );
        replaceTypeInGraph(booleanGroup, { "!term": term, "!self": matchNode });
        replaceTypeInGraph(matchNode, { "!boolean-group": booleanGroup });
        return matchNode;
      }
      case "Type":
      case "Property":
        return {
          type: node.type,
          name: node.name,
          syntax: node
        };
      case "Keyword":
        return {
          type: node.type,
          name: node.name.toLowerCase(),
          syntax: node
        };
      case "AtKeyword":
        return {
          type: node.type,
          name: "@" + node.name.toLowerCase(),
          syntax: node
        };
      case "Function":
        return {
          type: node.type,
          name: node.name.toLowerCase() + "(",
          syntax: node
        };
      case "String":
        if (node.value.length === 3) {
          return {
            type: "Token",
            value: node.value.charAt(1),
            syntax: node
          };
        }
        return {
          type: node.type,
          value: node.value.substr(1, node.value.length - 2).replace(/\\'/g, "'"),
          syntax: node
        };
      case "Token":
        return {
          type: node.type,
          value: node.value,
          syntax: node
        };
      case "Comma":
        return {
          type: node.type,
          syntax: node
        };
      default:
        throw new Error("Unknown node type:", node.type);
    }
  }
  function buildMatchGraph(syntaxTree, ref) {
    if (typeof syntaxTree === "string") {
      syntaxTree = parse(syntaxTree);
    }
    return {
      type: "MatchGraph",
      match: buildMatchGraphInternal(syntaxTree),
      syntax: ref || null,
      source: syntaxTree
    };
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/lexer/match.js
  var { hasOwnProperty: hasOwnProperty3 } = Object.prototype;
  var STUB = 0;
  var TOKEN = 1;
  var OPEN_SYNTAX = 2;
  var CLOSE_SYNTAX = 3;
  var EXIT_REASON_MATCH = "Match";
  var EXIT_REASON_MISMATCH = "Mismatch";
  var EXIT_REASON_ITERATION_LIMIT = "Maximum iteration number exceeded (please fill an issue on https://github.com/csstree/csstree/issues)";
  var ITERATION_LIMIT = 15e3;
  var totalIterationCount = 0;
  function reverseList(list2) {
    let prev = null;
    let next = null;
    let item = list2;
    while (item !== null) {
      next = item.prev;
      item.prev = prev;
      prev = item;
      item = next;
    }
    return prev;
  }
  function areStringsEqualCaseInsensitive(testStr, referenceStr) {
    if (testStr.length !== referenceStr.length) {
      return false;
    }
    for (let i = 0; i < testStr.length; i++) {
      const referenceCode = referenceStr.charCodeAt(i);
      let testCode = testStr.charCodeAt(i);
      if (testCode >= 65 && testCode <= 90) {
        testCode = testCode | 32;
      }
      if (testCode !== referenceCode) {
        return false;
      }
    }
    return true;
  }
  function isContextEdgeDelim(token) {
    if (token.type !== Delim) {
      return false;
    }
    return token.value !== "?";
  }
  function isCommaContextStart(token) {
    if (token === null) {
      return true;
    }
    return token.type === Comma || token.type === Function2 || token.type === LeftParenthesis || token.type === LeftSquareBracket || token.type === LeftCurlyBracket || isContextEdgeDelim(token);
  }
  function isCommaContextEnd(token) {
    if (token === null) {
      return true;
    }
    return token.type === RightParenthesis || token.type === RightSquareBracket || token.type === RightCurlyBracket || token.type === Delim && token.value === "/";
  }
  function internalMatch(tokens, state, syntaxes) {
    function moveToNextToken() {
      do {
        tokenIndex++;
        token = tokenIndex < tokens.length ? tokens[tokenIndex] : null;
      } while (token !== null && (token.type === WhiteSpace || token.type === Comment));
    }
    function getNextToken(offset) {
      const nextIndex = tokenIndex + offset;
      return nextIndex < tokens.length ? tokens[nextIndex] : null;
    }
    function stateSnapshotFromSyntax(nextState, prev) {
      return {
        nextState,
        matchStack,
        syntaxStack,
        thenStack,
        tokenIndex,
        prev
      };
    }
    function pushThenStack(nextState) {
      thenStack = {
        nextState,
        matchStack,
        syntaxStack,
        prev: thenStack
      };
    }
    function pushElseStack(nextState) {
      elseStack = stateSnapshotFromSyntax(nextState, elseStack);
    }
    function addTokenToMatch() {
      matchStack = {
        type: TOKEN,
        syntax: state.syntax,
        token,
        prev: matchStack
      };
      moveToNextToken();
      syntaxStash = null;
      if (tokenIndex > longestMatch) {
        longestMatch = tokenIndex;
      }
    }
    function openSyntax() {
      syntaxStack = {
        syntax: state.syntax,
        opts: state.syntax.opts || syntaxStack !== null && syntaxStack.opts || null,
        prev: syntaxStack
      };
      matchStack = {
        type: OPEN_SYNTAX,
        syntax: state.syntax,
        token: matchStack.token,
        prev: matchStack
      };
    }
    function closeSyntax() {
      if (matchStack.type === OPEN_SYNTAX) {
        matchStack = matchStack.prev;
      } else {
        matchStack = {
          type: CLOSE_SYNTAX,
          syntax: syntaxStack.syntax,
          token: matchStack.token,
          prev: matchStack
        };
      }
      syntaxStack = syntaxStack.prev;
    }
    let syntaxStack = null;
    let thenStack = null;
    let elseStack = null;
    let syntaxStash = null;
    let iterationCount = 0;
    let exitReason = null;
    let token = null;
    let tokenIndex = -1;
    let longestMatch = 0;
    let matchStack = {
      type: STUB,
      syntax: null,
      token: null,
      prev: null
    };
    moveToNextToken();
    while (exitReason === null && ++iterationCount < ITERATION_LIMIT) {
      switch (state.type) {
        case "Match":
          if (thenStack === null) {
            if (token !== null) {
              if (tokenIndex !== tokens.length - 1 || token.value !== "\\0" && token.value !== "\\9") {
                state = MISMATCH;
                break;
              }
            }
            exitReason = EXIT_REASON_MATCH;
            break;
          }
          state = thenStack.nextState;
          if (state === DISALLOW_EMPTY) {
            if (thenStack.matchStack === matchStack) {
              state = MISMATCH;
              break;
            } else {
              state = MATCH;
            }
          }
          while (thenStack.syntaxStack !== syntaxStack) {
            closeSyntax();
          }
          thenStack = thenStack.prev;
          break;
        case "Mismatch":
          if (syntaxStash !== null && syntaxStash !== false) {
            if (elseStack === null || tokenIndex > elseStack.tokenIndex) {
              elseStack = syntaxStash;
              syntaxStash = false;
            }
          } else if (elseStack === null) {
            exitReason = EXIT_REASON_MISMATCH;
            break;
          }
          state = elseStack.nextState;
          thenStack = elseStack.thenStack;
          syntaxStack = elseStack.syntaxStack;
          matchStack = elseStack.matchStack;
          tokenIndex = elseStack.tokenIndex;
          token = tokenIndex < tokens.length ? tokens[tokenIndex] : null;
          elseStack = elseStack.prev;
          break;
        case "MatchGraph":
          state = state.match;
          break;
        case "If":
          if (state.else !== MISMATCH) {
            pushElseStack(state.else);
          }
          if (state.then !== MATCH) {
            pushThenStack(state.then);
          }
          state = state.match;
          break;
        case "MatchOnce":
          state = {
            type: "MatchOnceBuffer",
            syntax: state,
            index: 0,
            mask: 0
          };
          break;
        case "MatchOnceBuffer": {
          const terms = state.syntax.terms;
          if (state.index === terms.length) {
            if (state.mask === 0 || state.syntax.all) {
              state = MISMATCH;
              break;
            }
            state = MATCH;
            break;
          }
          if (state.mask === (1 << terms.length) - 1) {
            state = MATCH;
            break;
          }
          for (; state.index < terms.length; state.index++) {
            const matchFlag = 1 << state.index;
            if ((state.mask & matchFlag) === 0) {
              pushElseStack(state);
              pushThenStack({
                type: "AddMatchOnce",
                syntax: state.syntax,
                mask: state.mask | matchFlag
              });
              state = terms[state.index++];
              break;
            }
          }
          break;
        }
        case "AddMatchOnce":
          state = {
            type: "MatchOnceBuffer",
            syntax: state.syntax,
            index: 0,
            mask: state.mask
          };
          break;
        case "Enum":
          if (token !== null) {
            let name50 = token.value.toLowerCase();
            if (name50.indexOf("\\") !== -1) {
              name50 = name50.replace(/\\[09].*$/, "");
            }
            if (hasOwnProperty3.call(state.map, name50)) {
              state = state.map[name50];
              break;
            }
          }
          state = MISMATCH;
          break;
        case "Generic": {
          const opts = syntaxStack !== null ? syntaxStack.opts : null;
          const lastTokenIndex2 = tokenIndex + Math.floor(state.fn(token, getNextToken, opts));
          if (!isNaN(lastTokenIndex2) && lastTokenIndex2 > tokenIndex) {
            while (tokenIndex < lastTokenIndex2) {
              addTokenToMatch();
            }
            state = MATCH;
          } else {
            state = MISMATCH;
          }
          break;
        }
        case "Type":
        case "Property": {
          const syntaxDict = state.type === "Type" ? "types" : "properties";
          const dictSyntax = hasOwnProperty3.call(syntaxes, syntaxDict) ? syntaxes[syntaxDict][state.name] : null;
          if (!dictSyntax || !dictSyntax.match) {
            throw new Error(
              "Bad syntax reference: " + (state.type === "Type" ? "<" + state.name + ">" : "<'" + state.name + "'>")
            );
          }
          if (syntaxStash !== false && token !== null && state.type === "Type") {
            const lowPriorityMatching = (
              // https://drafts.csswg.org/css-values-4/#custom-idents
              // When parsing positionally-ambiguous keywords in a property value, a <custom-ident> production
              // can only claim the keyword if no other unfulfilled production can claim it.
              state.name === "custom-ident" && token.type === Ident || // https://drafts.csswg.org/css-values-4/#lengths
              // ... if a `0` could be parsed as either a <number> or a <length> in a property (such as line-height),
              // it must parse as a <number>
              state.name === "length" && token.value === "0"
            );
            if (lowPriorityMatching) {
              if (syntaxStash === null) {
                syntaxStash = stateSnapshotFromSyntax(state, elseStack);
              }
              state = MISMATCH;
              break;
            }
          }
          openSyntax();
          state = dictSyntax.matchRef || dictSyntax.match;
          break;
        }
        case "Keyword": {
          const name50 = state.name;
          if (token !== null) {
            let keywordName = token.value;
            if (keywordName.indexOf("\\") !== -1) {
              keywordName = keywordName.replace(/\\[09].*$/, "");
            }
            if (areStringsEqualCaseInsensitive(keywordName, name50)) {
              addTokenToMatch();
              state = MATCH;
              break;
            }
          }
          state = MISMATCH;
          break;
        }
        case "AtKeyword":
        case "Function":
          if (token !== null && areStringsEqualCaseInsensitive(token.value, state.name)) {
            addTokenToMatch();
            state = MATCH;
            break;
          }
          state = MISMATCH;
          break;
        case "Token":
          if (token !== null && token.value === state.value) {
            addTokenToMatch();
            state = MATCH;
            break;
          }
          state = MISMATCH;
          break;
        case "Comma":
          if (token !== null && token.type === Comma) {
            if (isCommaContextStart(matchStack.token)) {
              state = MISMATCH;
            } else {
              addTokenToMatch();
              state = isCommaContextEnd(token) ? MISMATCH : MATCH;
            }
          } else {
            state = isCommaContextStart(matchStack.token) || isCommaContextEnd(token) ? MATCH : MISMATCH;
          }
          break;
        case "String":
          let string = "";
          let lastTokenIndex = tokenIndex;
          for (; lastTokenIndex < tokens.length && string.length < state.value.length; lastTokenIndex++) {
            string += tokens[lastTokenIndex].value;
          }
          if (areStringsEqualCaseInsensitive(string, state.value)) {
            while (tokenIndex < lastTokenIndex) {
              addTokenToMatch();
            }
            state = MATCH;
          } else {
            state = MISMATCH;
          }
          break;
        default:
          throw new Error("Unknown node type: " + state.type);
      }
    }
    totalIterationCount += iterationCount;
    switch (exitReason) {
      case null:
        console.warn("[csstree-match] BREAK after " + ITERATION_LIMIT + " iterations");
        exitReason = EXIT_REASON_ITERATION_LIMIT;
        matchStack = null;
        break;
      case EXIT_REASON_MATCH:
        while (syntaxStack !== null) {
          closeSyntax();
        }
        break;
      default:
        matchStack = null;
    }
    return {
      tokens,
      reason: exitReason,
      iterations: iterationCount,
      match: matchStack,
      longestMatch
    };
  }
  function matchAsTree(tokens, matchGraph, syntaxes) {
    const matchResult = internalMatch(tokens, matchGraph, syntaxes || {});
    if (matchResult.match === null) {
      return matchResult;
    }
    let item = matchResult.match;
    let host = matchResult.match = {
      syntax: matchGraph.syntax || null,
      match: []
    };
    const hostStack = [host];
    item = reverseList(item).prev;
    while (item !== null) {
      switch (item.type) {
        case OPEN_SYNTAX:
          host.match.push(host = {
            syntax: item.syntax,
            match: []
          });
          hostStack.push(host);
          break;
        case CLOSE_SYNTAX:
          hostStack.pop();
          host = hostStack[hostStack.length - 1];
          break;
        default:
          host.match.push({
            syntax: item.syntax || null,
            token: item.token.value,
            node: item.token.node
          });
      }
      item = item.prev;
    }
    return matchResult;
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/lexer/trace.js
  var trace_exports = {};
  __export(trace_exports, {
    getTrace: () => getTrace,
    isKeyword: () => isKeyword,
    isProperty: () => isProperty,
    isType: () => isType
  });
  function getTrace(node) {
    function shouldPutToTrace(syntax) {
      if (syntax === null) {
        return false;
      }
      return syntax.type === "Type" || syntax.type === "Property" || syntax.type === "Keyword";
    }
    function hasMatch(matchNode) {
      if (Array.isArray(matchNode.match)) {
        for (let i = 0; i < matchNode.match.length; i++) {
          if (hasMatch(matchNode.match[i])) {
            if (shouldPutToTrace(matchNode.syntax)) {
              result.unshift(matchNode.syntax);
            }
            return true;
          }
        }
      } else if (matchNode.node === node) {
        result = shouldPutToTrace(matchNode.syntax) ? [matchNode.syntax] : [];
        return true;
      }
      return false;
    }
    let result = null;
    if (this.matched !== null) {
      hasMatch(this.matched);
    }
    return result;
  }
  function isType(node, type) {
    return testNode(this, node, (match2) => match2.type === "Type" && match2.name === type);
  }
  function isProperty(node, property2) {
    return testNode(this, node, (match2) => match2.type === "Property" && match2.name === property2);
  }
  function isKeyword(node) {
    return testNode(this, node, (match2) => match2.type === "Keyword");
  }
  function testNode(match2, node, fn) {
    const trace = getTrace.call(match2, node);
    if (trace === null) {
      return false;
    }
    return trace.some(fn);
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/lexer/search.js
  function getFirstMatchNode(matchNode) {
    if ("node" in matchNode) {
      return matchNode.node;
    }
    return getFirstMatchNode(matchNode.match[0]);
  }
  function getLastMatchNode(matchNode) {
    if ("node" in matchNode) {
      return matchNode.node;
    }
    return getLastMatchNode(matchNode.match[matchNode.match.length - 1]);
  }
  function matchFragments(lexer2, ast, match2, type, name50) {
    function findFragments(matchNode) {
      if (matchNode.syntax !== null && matchNode.syntax.type === type && matchNode.syntax.name === name50) {
        const start = getFirstMatchNode(matchNode);
        const end = getLastMatchNode(matchNode);
        lexer2.syntax.walk(ast, function(node, item, list2) {
          if (node === start) {
            const nodes = new List();
            do {
              nodes.appendData(item.data);
              if (item.data === end) {
                break;
              }
              item = item.next;
            } while (item !== null);
            fragments.push({
              parent: list2,
              nodes
            });
          }
        });
      }
      if (Array.isArray(matchNode.match)) {
        matchNode.match.forEach(findFragments);
      }
    }
    const fragments = [];
    if (match2.matched !== null) {
      findFragments(match2.matched);
    }
    return fragments;
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/lexer/structure.js
  var { hasOwnProperty: hasOwnProperty4 } = Object.prototype;
  function isValidNumber(value) {
    return typeof value === "number" && isFinite(value) && Math.floor(value) === value && value >= 0;
  }
  function isValidLocation(loc) {
    return Boolean(loc) && isValidNumber(loc.offset) && isValidNumber(loc.line) && isValidNumber(loc.column);
  }
  function createNodeStructureChecker(type, fields) {
    return function checkNode(node, warn) {
      if (!node || node.constructor !== Object) {
        return warn(node, "Type of node should be an Object");
      }
      for (let key in node) {
        let valid = true;
        if (hasOwnProperty4.call(node, key) === false) {
          continue;
        }
        if (key === "type") {
          if (node.type !== type) {
            warn(node, "Wrong node type `" + node.type + "`, expected `" + type + "`");
          }
        } else if (key === "loc") {
          if (node.loc === null) {
            continue;
          } else if (node.loc && node.loc.constructor === Object) {
            if (typeof node.loc.source !== "string") {
              key += ".source";
            } else if (!isValidLocation(node.loc.start)) {
              key += ".start";
            } else if (!isValidLocation(node.loc.end)) {
              key += ".end";
            } else {
              continue;
            }
          }
          valid = false;
        } else if (fields.hasOwnProperty(key)) {
          valid = false;
          for (let i = 0; !valid && i < fields[key].length; i++) {
            const fieldType = fields[key][i];
            switch (fieldType) {
              case String:
                valid = typeof node[key] === "string";
                break;
              case Boolean:
                valid = typeof node[key] === "boolean";
                break;
              case null:
                valid = node[key] === null;
                break;
              default:
                if (typeof fieldType === "string") {
                  valid = node[key] && node[key].type === fieldType;
                } else if (Array.isArray(fieldType)) {
                  valid = node[key] instanceof List;
                }
            }
          }
        } else {
          warn(node, "Unknown field `" + key + "` for " + type + " node type");
        }
        if (!valid) {
          warn(node, "Bad value for `" + type + "." + key + "`");
        }
      }
      for (const key in fields) {
        if (hasOwnProperty4.call(fields, key) && hasOwnProperty4.call(node, key) === false) {
          warn(node, "Field `" + type + "." + key + "` is missed");
        }
      }
    };
  }
  function genTypesList(fieldTypes, path) {
    const docsTypes = [];
    for (let i = 0; i < fieldTypes.length; i++) {
      const fieldType = fieldTypes[i];
      if (fieldType === String || fieldType === Boolean) {
        docsTypes.push(fieldType.name.toLowerCase());
      } else if (fieldType === null) {
        docsTypes.push("null");
      } else if (typeof fieldType === "string") {
        docsTypes.push(fieldType);
      } else if (Array.isArray(fieldType)) {
        docsTypes.push("List<" + (genTypesList(fieldType, path) || "any") + ">");
      } else {
        throw new Error("Wrong value `" + fieldType + "` in `" + path + "` structure definition");
      }
    }
    return docsTypes.join(" | ");
  }
  function processStructure(name50, nodeType) {
    const structure50 = nodeType.structure;
    const fields = {
      type: String,
      loc: true
    };
    const docs = {
      type: '"' + name50 + '"'
    };
    for (const key in structure50) {
      if (hasOwnProperty4.call(structure50, key) === false) {
        continue;
      }
      const fieldTypes = fields[key] = Array.isArray(structure50[key]) ? structure50[key].slice() : [structure50[key]];
      docs[key] = genTypesList(fieldTypes, name50 + "." + key);
    }
    return {
      docs,
      check: createNodeStructureChecker(name50, fields)
    };
  }
  function getStructureFromConfig(config2) {
    const structure50 = {};
    if (config2.node) {
      for (const name50 in config2.node) {
        if (hasOwnProperty4.call(config2.node, name50)) {
          const nodeType = config2.node[name50];
          if (nodeType.structure) {
            structure50[name50] = processStructure(name50, nodeType);
          } else {
            throw new Error("Missed `structure` field in `" + name50 + "` node type definition");
          }
        }
      }
    }
    return structure50;
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/lexer/Lexer.js
  function dumpMapSyntax(map2, compact, syntaxAsAst) {
    const result = {};
    for (const name50 in map2) {
      if (map2[name50].syntax) {
        result[name50] = syntaxAsAst ? map2[name50].syntax : generate(map2[name50].syntax, { compact });
      }
    }
    return result;
  }
  function dumpAtruleMapSyntax(map2, compact, syntaxAsAst) {
    const result = {};
    for (const [name50, atrule] of Object.entries(map2)) {
      result[name50] = {
        prelude: atrule.prelude && (syntaxAsAst ? atrule.prelude.syntax : generate(atrule.prelude.syntax, { compact })),
        descriptors: atrule.descriptors && dumpMapSyntax(atrule.descriptors, compact, syntaxAsAst)
      };
    }
    return result;
  }
  function valueHasVar(tokens) {
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].value.toLowerCase() === "var(") {
        return true;
      }
    }
    return false;
  }
  function syntaxHasTopLevelCommaMultiplier(syntax) {
    const singleTerm = syntax.terms[0];
    return syntax.explicit === false && syntax.terms.length === 1 && singleTerm.type === "Multiplier" && singleTerm.comma === true;
  }
  function buildMatchResult(matched, error2, iterations) {
    return {
      matched,
      iterations,
      error: error2,
      ...trace_exports
    };
  }
  function matchSyntax(lexer2, syntax, value, useCssWideKeywords) {
    const tokens = prepare_tokens_default(value, lexer2.syntax);
    let result;
    if (valueHasVar(tokens)) {
      return buildMatchResult(null, new Error("Matching for a tree with var() is not supported"));
    }
    if (useCssWideKeywords) {
      result = matchAsTree(tokens, lexer2.cssWideKeywordsSyntax, lexer2);
    }
    if (!useCssWideKeywords || !result.match) {
      result = matchAsTree(tokens, syntax.match, lexer2);
      if (!result.match) {
        return buildMatchResult(
          null,
          new SyntaxMatchError(result.reason, syntax.syntax, value, result),
          result.iterations
        );
      }
    }
    return buildMatchResult(result.match, null, result.iterations);
  }
  var Lexer = class {
    constructor(config2, syntax, structure50) {
      this.cssWideKeywords = cssWideKeywords;
      this.syntax = syntax;
      this.generic = false;
      this.units = { ...units_exports };
      this.atrules = /* @__PURE__ */ Object.create(null);
      this.properties = /* @__PURE__ */ Object.create(null);
      this.types = /* @__PURE__ */ Object.create(null);
      this.structure = structure50 || getStructureFromConfig(config2);
      if (config2) {
        if (config2.cssWideKeywords) {
          this.cssWideKeywords = config2.cssWideKeywords;
        }
        if (config2.units) {
          for (const group of Object.keys(units_exports)) {
            if (Array.isArray(config2.units[group])) {
              this.units[group] = config2.units[group];
            }
          }
        }
        if (config2.types) {
          for (const [name50, type] of Object.entries(config2.types)) {
            this.addType_(name50, type);
          }
        }
        if (config2.generic) {
          this.generic = true;
          for (const [name50, value] of Object.entries(createGenericTypes(this.units))) {
            this.addType_(name50, value);
          }
        }
        if (config2.atrules) {
          for (const [name50, atrule] of Object.entries(config2.atrules)) {
            this.addAtrule_(name50, atrule);
          }
        }
        if (config2.properties) {
          for (const [name50, property2] of Object.entries(config2.properties)) {
            this.addProperty_(name50, property2);
          }
        }
      }
      this.cssWideKeywordsSyntax = buildMatchGraph(this.cssWideKeywords.join(" |  "));
    }
    checkStructure(ast) {
      function collectWarning(node, message) {
        warns.push({ node, message });
      }
      const structure50 = this.structure;
      const warns = [];
      this.syntax.walk(ast, function(node) {
        if (structure50.hasOwnProperty(node.type)) {
          structure50[node.type].check(node, collectWarning);
        } else {
          collectWarning(node, "Unknown node type `" + node.type + "`");
        }
      });
      return warns.length ? warns : false;
    }
    createDescriptor(syntax, type, name50, parent = null) {
      const ref = {
        type,
        name: name50
      };
      const descriptor = {
        type,
        name: name50,
        parent,
        serializable: typeof syntax === "string" || syntax && typeof syntax.type === "string",
        syntax: null,
        match: null,
        matchRef: null
        // used for properties when a syntax referenced as <'property'> in other syntax definitions
      };
      if (typeof syntax === "function") {
        descriptor.match = buildMatchGraph(syntax, ref);
      } else {
        if (typeof syntax === "string") {
          Object.defineProperty(descriptor, "syntax", {
            get() {
              Object.defineProperty(descriptor, "syntax", {
                value: parse(syntax)
              });
              return descriptor.syntax;
            }
          });
        } else {
          descriptor.syntax = syntax;
        }
        Object.defineProperty(descriptor, "match", {
          get() {
            Object.defineProperty(descriptor, "match", {
              value: buildMatchGraph(descriptor.syntax, ref)
            });
            return descriptor.match;
          }
        });
        if (type === "Property") {
          Object.defineProperty(descriptor, "matchRef", {
            get() {
              const syntax2 = descriptor.syntax;
              const value = syntaxHasTopLevelCommaMultiplier(syntax2) ? buildMatchGraph({
                ...syntax2,
                terms: [syntax2.terms[0].term]
              }, ref) : null;
              Object.defineProperty(descriptor, "matchRef", {
                value
              });
              return value;
            }
          });
        }
      }
      return descriptor;
    }
    addAtrule_(name50, syntax) {
      if (!syntax) {
        return;
      }
      this.atrules[name50] = {
        type: "Atrule",
        name: name50,
        prelude: syntax.prelude ? this.createDescriptor(syntax.prelude, "AtrulePrelude", name50) : null,
        descriptors: syntax.descriptors ? Object.keys(syntax.descriptors).reduce(
          (map2, descName) => {
            map2[descName] = this.createDescriptor(syntax.descriptors[descName], "AtruleDescriptor", descName, name50);
            return map2;
          },
          /* @__PURE__ */ Object.create(null)
        ) : null
      };
    }
    addProperty_(name50, syntax) {
      if (!syntax) {
        return;
      }
      this.properties[name50] = this.createDescriptor(syntax, "Property", name50);
    }
    addType_(name50, syntax) {
      if (!syntax) {
        return;
      }
      this.types[name50] = this.createDescriptor(syntax, "Type", name50);
    }
    checkAtruleName(atruleName) {
      if (!this.getAtrule(atruleName)) {
        return new SyntaxReferenceError("Unknown at-rule", "@" + atruleName);
      }
    }
    checkAtrulePrelude(atruleName, prelude) {
      const error2 = this.checkAtruleName(atruleName);
      if (error2) {
        return error2;
      }
      const atrule = this.getAtrule(atruleName);
      if (!atrule.prelude && prelude) {
        return new SyntaxError("At-rule `@" + atruleName + "` should not contain a prelude");
      }
      if (atrule.prelude && !prelude) {
        if (!matchSyntax(this, atrule.prelude, "", false).matched) {
          return new SyntaxError("At-rule `@" + atruleName + "` should contain a prelude");
        }
      }
    }
    checkAtruleDescriptorName(atruleName, descriptorName) {
      const error2 = this.checkAtruleName(atruleName);
      if (error2) {
        return error2;
      }
      const atrule = this.getAtrule(atruleName);
      const descriptor = keyword(descriptorName);
      if (!atrule.descriptors) {
        return new SyntaxError("At-rule `@" + atruleName + "` has no known descriptors");
      }
      if (!atrule.descriptors[descriptor.name] && !atrule.descriptors[descriptor.basename]) {
        return new SyntaxReferenceError("Unknown at-rule descriptor", descriptorName);
      }
    }
    checkPropertyName(propertyName) {
      if (!this.getProperty(propertyName)) {
        return new SyntaxReferenceError("Unknown property", propertyName);
      }
    }
    matchAtrulePrelude(atruleName, prelude) {
      const error2 = this.checkAtrulePrelude(atruleName, prelude);
      if (error2) {
        return buildMatchResult(null, error2);
      }
      const atrule = this.getAtrule(atruleName);
      if (!atrule.prelude) {
        return buildMatchResult(null, null);
      }
      return matchSyntax(this, atrule.prelude, prelude || "", false);
    }
    matchAtruleDescriptor(atruleName, descriptorName, value) {
      const error2 = this.checkAtruleDescriptorName(atruleName, descriptorName);
      if (error2) {
        return buildMatchResult(null, error2);
      }
      const atrule = this.getAtrule(atruleName);
      const descriptor = keyword(descriptorName);
      return matchSyntax(this, atrule.descriptors[descriptor.name] || atrule.descriptors[descriptor.basename], value, false);
    }
    matchDeclaration(node) {
      if (node.type !== "Declaration") {
        return buildMatchResult(null, new Error("Not a Declaration node"));
      }
      return this.matchProperty(node.property, node.value);
    }
    matchProperty(propertyName, value) {
      if (property(propertyName).custom) {
        return buildMatchResult(null, new Error("Lexer matching doesn't applicable for custom properties"));
      }
      const error2 = this.checkPropertyName(propertyName);
      if (error2) {
        return buildMatchResult(null, error2);
      }
      return matchSyntax(this, this.getProperty(propertyName), value, true);
    }
    matchType(typeName, value) {
      const typeSyntax = this.getType(typeName);
      if (!typeSyntax) {
        return buildMatchResult(null, new SyntaxReferenceError("Unknown type", typeName));
      }
      return matchSyntax(this, typeSyntax, value, false);
    }
    match(syntax, value) {
      if (typeof syntax !== "string" && (!syntax || !syntax.type)) {
        return buildMatchResult(null, new SyntaxReferenceError("Bad syntax"));
      }
      if (typeof syntax === "string" || !syntax.match) {
        syntax = this.createDescriptor(syntax, "Type", "anonymous");
      }
      return matchSyntax(this, syntax, value, false);
    }
    findValueFragments(propertyName, value, type, name50) {
      return matchFragments(this, value, this.matchProperty(propertyName, value), type, name50);
    }
    findDeclarationValueFragments(declaration2, type, name50) {
      return matchFragments(this, declaration2.value, this.matchDeclaration(declaration2), type, name50);
    }
    findAllFragments(ast, type, name50) {
      const result = [];
      this.syntax.walk(ast, {
        visit: "Declaration",
        enter: (declaration2) => {
          result.push.apply(result, this.findDeclarationValueFragments(declaration2, type, name50));
        }
      });
      return result;
    }
    getAtrule(atruleName, fallbackBasename = true) {
      const atrule = keyword(atruleName);
      const atruleEntry = atrule.vendor && fallbackBasename ? this.atrules[atrule.name] || this.atrules[atrule.basename] : this.atrules[atrule.name];
      return atruleEntry || null;
    }
    getAtrulePrelude(atruleName, fallbackBasename = true) {
      const atrule = this.getAtrule(atruleName, fallbackBasename);
      return atrule && atrule.prelude || null;
    }
    getAtruleDescriptor(atruleName, name50) {
      return this.atrules.hasOwnProperty(atruleName) && this.atrules.declarators ? this.atrules[atruleName].declarators[name50] || null : null;
    }
    getProperty(propertyName, fallbackBasename = true) {
      const property2 = property(propertyName);
      const propertyEntry = property2.vendor && fallbackBasename ? this.properties[property2.name] || this.properties[property2.basename] : this.properties[property2.name];
      return propertyEntry || null;
    }
    getType(name50) {
      return hasOwnProperty.call(this.types, name50) ? this.types[name50] : null;
    }
    validate() {
      function syntaxRef(name50, isType2) {
        return isType2 ? `<${name50}>` : `<'${name50}'>`;
      }
      function validate(syntax, name50, broken, descriptor) {
        if (broken.has(name50)) {
          return broken.get(name50);
        }
        broken.set(name50, false);
        if (descriptor.syntax !== null) {
          walk(descriptor.syntax, function(node) {
            if (node.type !== "Type" && node.type !== "Property") {
              return;
            }
            const map2 = node.type === "Type" ? syntax.types : syntax.properties;
            const brokenMap = node.type === "Type" ? brokenTypes : brokenProperties;
            if (!hasOwnProperty.call(map2, node.name)) {
              errors2.push(`${syntaxRef(name50, broken === brokenTypes)} used missed syntax definition ${syntaxRef(node.name, node.type === "Type")}`);
              broken.set(name50, true);
            } else if (validate(syntax, node.name, brokenMap, map2[node.name])) {
              errors2.push(`${syntaxRef(name50, broken === brokenTypes)} used broken syntax definition ${syntaxRef(node.name, node.type === "Type")}`);
              broken.set(name50, true);
            }
          }, this);
        }
      }
      const errors2 = [];
      let brokenTypes = /* @__PURE__ */ new Map();
      let brokenProperties = /* @__PURE__ */ new Map();
      for (const key in this.types) {
        validate(this, key, brokenTypes, this.types[key]);
      }
      for (const key in this.properties) {
        validate(this, key, brokenProperties, this.properties[key]);
      }
      const brokenTypesArray = [...brokenTypes.keys()].filter((name50) => brokenTypes.get(name50));
      const brokenPropertiesArray = [...brokenProperties.keys()].filter((name50) => brokenProperties.get(name50));
      if (brokenTypesArray.length || brokenPropertiesArray.length) {
        return {
          errors: errors2,
          types: brokenTypesArray,
          properties: brokenPropertiesArray
        };
      }
      return null;
    }
    dump(syntaxAsAst, pretty) {
      return {
        generic: this.generic,
        cssWideKeywords: this.cssWideKeywords,
        units: this.units,
        types: dumpMapSyntax(this.types, !pretty, syntaxAsAst),
        properties: dumpMapSyntax(this.properties, !pretty, syntaxAsAst),
        atrules: dumpAtruleMapSyntax(this.atrules, !pretty, syntaxAsAst)
      };
    }
    toString() {
      return JSON.stringify(this.dump());
    }
  };

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/config/mix.js
  function appendOrSet(a, b) {
    if (typeof b === "string" && /^\s*\|/.test(b)) {
      return typeof a === "string" ? a + b : b.replace(/^\s*\|\s*/, "");
    }
    return b || null;
  }
  function sliceProps(obj, props) {
    const result = /* @__PURE__ */ Object.create(null);
    for (const [key, value] of Object.entries(obj)) {
      if (value) {
        result[key] = {};
        for (const prop of Object.keys(value)) {
          if (props.includes(prop)) {
            result[key][prop] = value[prop];
          }
        }
      }
    }
    return result;
  }
  function mix(dest, src) {
    const result = { ...dest };
    for (const [prop, value] of Object.entries(src)) {
      switch (prop) {
        case "generic":
          result[prop] = Boolean(value);
          break;
        case "cssWideKeywords":
          result[prop] = dest[prop] ? [...dest[prop], ...value] : value || [];
          break;
        case "units":
          result[prop] = { ...dest[prop] };
          for (const [name50, patch] of Object.entries(value)) {
            result[prop][name50] = Array.isArray(patch) ? patch : [];
          }
          break;
        case "atrules":
          result[prop] = { ...dest[prop] };
          for (const [name50, atrule] of Object.entries(value)) {
            const exists = result[prop][name50] || {};
            const current = result[prop][name50] = {
              prelude: exists.prelude || null,
              descriptors: {
                ...exists.descriptors
              }
            };
            if (!atrule) {
              continue;
            }
            current.prelude = atrule.prelude ? appendOrSet(current.prelude, atrule.prelude) : current.prelude || null;
            for (const [descriptorName, descriptorValue] of Object.entries(atrule.descriptors || {})) {
              current.descriptors[descriptorName] = descriptorValue ? appendOrSet(current.descriptors[descriptorName], descriptorValue) : null;
            }
            if (!Object.keys(current.descriptors).length) {
              current.descriptors = null;
            }
          }
          break;
        case "types":
        case "properties":
          result[prop] = { ...dest[prop] };
          for (const [name50, syntax] of Object.entries(value)) {
            result[prop][name50] = appendOrSet(result[prop][name50], syntax);
          }
          break;
        case "scope":
        case "features":
          result[prop] = { ...dest[prop] };
          for (const [name50, props] of Object.entries(value)) {
            result[prop][name50] = { ...result[prop][name50], ...props };
          }
          break;
        case "parseContext":
          result[prop] = {
            ...dest[prop],
            ...value
          };
          break;
        case "atrule":
        case "pseudo":
          result[prop] = {
            ...dest[prop],
            ...sliceProps(value, ["parse"])
          };
          break;
        case "node":
          result[prop] = {
            ...dest[prop],
            ...sliceProps(value, ["name", "structure", "parse", "generate", "walkContext"])
          };
          break;
      }
    }
    return result;
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/create.js
  function createSyntax(config2) {
    const parse52 = createParser(config2);
    const walk3 = createWalker(config2);
    const generate52 = createGenerator(config2);
    const { fromPlainObject: fromPlainObject2, toPlainObject: toPlainObject2 } = createConvertor(walk3);
    const syntax = {
      lexer: null,
      createLexer: (config3) => new Lexer(config3, syntax, syntax.lexer.structure),
      tokenize,
      parse: parse52,
      generate: generate52,
      walk: walk3,
      find: walk3.find,
      findLast: walk3.findLast,
      findAll: walk3.findAll,
      fromPlainObject: fromPlainObject2,
      toPlainObject: toPlainObject2,
      fork(extension) {
        const base2 = mix({}, config2);
        return createSyntax(
          typeof extension === "function" ? extension(base2) : mix(base2, extension)
        );
      }
    };
    syntax.lexer = new Lexer({
      generic: config2.generic,
      cssWideKeywords: config2.cssWideKeywords,
      units: config2.units,
      types: config2.types,
      atrules: config2.atrules,
      properties: config2.properties,
      node: config2.node
    }, syntax);
    return syntax;
  }
  var create_default = (config2) => createSyntax(mix({}, config2));

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/dist/data.js
  var data_default = {
    "generic": true,
    "cssWideKeywords": [
      "initial",
      "inherit",
      "unset",
      "revert",
      "revert-layer"
    ],
    "units": {
      "angle": [
        "deg",
        "grad",
        "rad",
        "turn"
      ],
      "decibel": [
        "db"
      ],
      "flex": [
        "fr"
      ],
      "frequency": [
        "hz",
        "khz"
      ],
      "length": [
        "cm",
        "mm",
        "q",
        "in",
        "pt",
        "pc",
        "px",
        "em",
        "rem",
        "ex",
        "rex",
        "cap",
        "rcap",
        "ch",
        "rch",
        "ic",
        "ric",
        "lh",
        "rlh",
        "vw",
        "svw",
        "lvw",
        "dvw",
        "vh",
        "svh",
        "lvh",
        "dvh",
        "vi",
        "svi",
        "lvi",
        "dvi",
        "vb",
        "svb",
        "lvb",
        "dvb",
        "vmin",
        "svmin",
        "lvmin",
        "dvmin",
        "vmax",
        "svmax",
        "lvmax",
        "dvmax",
        "cqw",
        "cqh",
        "cqi",
        "cqb",
        "cqmin",
        "cqmax"
      ],
      "resolution": [
        "dpi",
        "dpcm",
        "dppx",
        "x"
      ],
      "semitones": [
        "st"
      ],
      "time": [
        "s",
        "ms"
      ]
    },
    "types": {
      "abs()": "abs( <calc-sum> )",
      "absolute-size": "xx-small|x-small|small|medium|large|x-large|xx-large|xxx-large",
      "acos()": "acos( <calc-sum> )",
      "alpha-value": "<number>|<percentage>",
      "angle-percentage": "<angle>|<percentage>",
      "angular-color-hint": "<angle-percentage>",
      "angular-color-stop": "<color>&&<color-stop-angle>?",
      "angular-color-stop-list": "[<angular-color-stop> [, <angular-color-hint>]?]# , <angular-color-stop>",
      "animateable-feature": "scroll-position|contents|<custom-ident>",
      "asin()": "asin( <calc-sum> )",
      "atan()": "atan( <calc-sum> )",
      "atan2()": "atan2( <calc-sum> , <calc-sum> )",
      "attachment": "scroll|fixed|local",
      "attr()": "attr( <attr-name> <type-or-unit>? [, <attr-fallback>]? )",
      "attr-matcher": "['~'|'|'|'^'|'$'|'*']? '='",
      "attr-modifier": "i|s",
      "attribute-selector": "'[' <wq-name> ']'|'[' <wq-name> <attr-matcher> [<string-token>|<ident-token>] <attr-modifier>? ']'",
      "auto-repeat": "repeat( [auto-fill|auto-fit] , [<line-names>? <fixed-size>]+ <line-names>? )",
      "auto-track-list": "[<line-names>? [<fixed-size>|<fixed-repeat>]]* <line-names>? <auto-repeat> [<line-names>? [<fixed-size>|<fixed-repeat>]]* <line-names>?",
      "axis": "block|inline|x|y",
      "baseline-position": "[first|last]? baseline",
      "basic-shape": "<inset()>|<xywh()>|<rect()>|<circle()>|<ellipse()>|<polygon()>|<path()>",
      "bg-image": "none|<image>",
      "bg-layer": "<bg-image>||<bg-position> [/ <bg-size>]?||<repeat-style>||<attachment>||<box>||<box>",
      "bg-position": "[[left|center|right|top|bottom|<length-percentage>]|[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]|[center|[left|right] <length-percentage>?]&&[center|[top|bottom] <length-percentage>?]]",
      "bg-size": "[<length-percentage>|auto]{1,2}|cover|contain",
      "blur()": "blur( <length> )",
      "blend-mode": "normal|multiply|screen|overlay|darken|lighten|color-dodge|color-burn|hard-light|soft-light|difference|exclusion|hue|saturation|color|luminosity",
      "box": "border-box|padding-box|content-box",
      "brightness()": "brightness( <number-percentage> )",
      "calc()": "calc( <calc-sum> )",
      "calc-sum": "<calc-product> [['+'|'-'] <calc-product>]*",
      "calc-product": "<calc-value> ['*' <calc-value>|'/' <number>]*",
      "calc-value": "<number>|<dimension>|<percentage>|<calc-constant>|( <calc-sum> )",
      "calc-constant": "e|pi|infinity|-infinity|NaN",
      "cf-final-image": "<image>|<color>",
      "cf-mixing-image": "<percentage>?&&<image>",
      "circle()": "circle( [<shape-radius>]? [at <position>]? )",
      "clamp()": "clamp( <calc-sum>#{3} )",
      "class-selector": "'.' <ident-token>",
      "clip-source": "<url>",
      "color": "<color-base>|currentColor|<system-color>|<device-cmyk()>|<light-dark()>|<-non-standard-color>",
      "color-stop": "<color-stop-length>|<color-stop-angle>",
      "color-stop-angle": "<angle-percentage>{1,2}",
      "color-stop-length": "<length-percentage>{1,2}",
      "color-stop-list": "[<linear-color-stop> [, <linear-color-hint>]?]# , <linear-color-stop>",
      "color-interpolation-method": "in [<rectangular-color-space>|<polar-color-space> <hue-interpolation-method>?|<custom-color-space>]",
      "combinator": "'>'|'+'|'~'|['|' '|']",
      "common-lig-values": "[common-ligatures|no-common-ligatures]",
      "compat-auto": "searchfield|textarea|push-button|slider-horizontal|checkbox|radio|square-button|menulist|listbox|meter|progress-bar|button",
      "composite-style": "clear|copy|source-over|source-in|source-out|source-atop|destination-over|destination-in|destination-out|destination-atop|xor",
      "compositing-operator": "add|subtract|intersect|exclude",
      "compound-selector": "[<type-selector>? <subclass-selector>*]!",
      "compound-selector-list": "<compound-selector>#",
      "complex-selector": "<complex-selector-unit> [<combinator>? <complex-selector-unit>]*",
      "complex-selector-list": "<complex-selector>#",
      "conic-gradient()": "conic-gradient( [from <angle>]? [at <position>]? , <angular-color-stop-list> )",
      "contextual-alt-values": "[contextual|no-contextual]",
      "content-distribution": "space-between|space-around|space-evenly|stretch",
      "content-list": "[<string>|contents|<image>|<counter>|<quote>|<target>|<leader()>|<attr()>]+",
      "content-position": "center|start|end|flex-start|flex-end",
      "content-replacement": "<image>",
      "contrast()": "contrast( [<number-percentage>] )",
      "cos()": "cos( <calc-sum> )",
      "counter": "<counter()>|<counters()>",
      "counter()": "counter( <counter-name> , <counter-style>? )",
      "counter-name": "<custom-ident>",
      "counter-style": "<counter-style-name>|symbols( )",
      "counter-style-name": "<custom-ident>",
      "counters()": "counters( <counter-name> , <string> , <counter-style>? )",
      "cross-fade()": "cross-fade( <cf-mixing-image> , <cf-final-image>? )",
      "cubic-bezier-timing-function": "ease|ease-in|ease-out|ease-in-out|cubic-bezier( <number [0,1]> , <number> , <number [0,1]> , <number> )",
      "deprecated-system-color": "ActiveBorder|ActiveCaption|AppWorkspace|Background|ButtonFace|ButtonHighlight|ButtonShadow|ButtonText|CaptionText|GrayText|Highlight|HighlightText|InactiveBorder|InactiveCaption|InactiveCaptionText|InfoBackground|InfoText|Menu|MenuText|Scrollbar|ThreeDDarkShadow|ThreeDFace|ThreeDHighlight|ThreeDLightShadow|ThreeDShadow|Window|WindowFrame|WindowText",
      "discretionary-lig-values": "[discretionary-ligatures|no-discretionary-ligatures]",
      "display-box": "contents|none",
      "display-inside": "flow|flow-root|table|flex|grid|ruby",
      "display-internal": "table-row-group|table-header-group|table-footer-group|table-row|table-cell|table-column-group|table-column|table-caption|ruby-base|ruby-text|ruby-base-container|ruby-text-container",
      "display-legacy": "inline-block|inline-list-item|inline-table|inline-flex|inline-grid",
      "display-listitem": "<display-outside>?&&[flow|flow-root]?&&list-item",
      "display-outside": "block|inline|run-in",
      "drop-shadow()": "drop-shadow( <length>{2,3} <color>? )",
      "east-asian-variant-values": "[jis78|jis83|jis90|jis04|simplified|traditional]",
      "east-asian-width-values": "[full-width|proportional-width]",
      "element()": "element( <custom-ident> , [first|start|last|first-except]? )|element( <id-selector> )",
      "ellipse()": "ellipse( [<shape-radius>{2}]? [at <position>]? )",
      "ending-shape": "circle|ellipse",
      "env()": "env( <custom-ident> , <declaration-value>? )",
      "exp()": "exp( <calc-sum> )",
      "explicit-track-list": "[<line-names>? <track-size>]+ <line-names>?",
      "family-name": "<string>|<custom-ident>+",
      "feature-tag-value": "<string> [<integer>|on|off]?",
      "feature-type": "@stylistic|@historical-forms|@styleset|@character-variant|@swash|@ornaments|@annotation",
      "feature-value-block": "<feature-type> '{' <feature-value-declaration-list> '}'",
      "feature-value-block-list": "<feature-value-block>+",
      "feature-value-declaration": "<custom-ident> : <integer>+ ;",
      "feature-value-declaration-list": "<feature-value-declaration>",
      "feature-value-name": "<custom-ident>",
      "fill-rule": "nonzero|evenodd",
      "filter-function": "<blur()>|<brightness()>|<contrast()>|<drop-shadow()>|<grayscale()>|<hue-rotate()>|<invert()>|<opacity()>|<saturate()>|<sepia()>",
      "filter-function-list": "[<filter-function>|<url>]+",
      "final-bg-layer": "<'background-color'>||<bg-image>||<bg-position> [/ <bg-size>]?||<repeat-style>||<attachment>||<box>||<box>",
      "fixed-breadth": "<length-percentage>",
      "fixed-repeat": "repeat( [<integer [1,\u221E]>] , [<line-names>? <fixed-size>]+ <line-names>? )",
      "fixed-size": "<fixed-breadth>|minmax( <fixed-breadth> , <track-breadth> )|minmax( <inflexible-breadth> , <fixed-breadth> )",
      "font-stretch-absolute": "normal|ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded|<percentage>",
      "font-variant-css21": "[normal|small-caps]",
      "font-weight-absolute": "normal|bold|<number [1,1000]>",
      "frequency-percentage": "<frequency>|<percentage>",
      "general-enclosed": "[<function-token> <any-value>? )]|[( <any-value>? )]",
      "generic-family": "<generic-script-specific>|<generic-complete>|<generic-incomplete>|<-non-standard-generic-family>",
      "generic-name": "serif|sans-serif|cursive|fantasy|monospace",
      "geometry-box": "<shape-box>|fill-box|stroke-box|view-box",
      "gradient": "<linear-gradient()>|<repeating-linear-gradient()>|<radial-gradient()>|<repeating-radial-gradient()>|<conic-gradient()>|<repeating-conic-gradient()>|<-legacy-gradient>",
      "grayscale()": "grayscale( <number-percentage> )",
      "grid-line": "auto|<custom-ident>|[<integer>&&<custom-ident>?]|[span&&[<integer>||<custom-ident>]]",
      "historical-lig-values": "[historical-ligatures|no-historical-ligatures]",
      "hsl()": "hsl( <hue> <percentage> <percentage> [/ <alpha-value>]? )|hsl( <hue> , <percentage> , <percentage> , <alpha-value>? )",
      "hsla()": "hsla( <hue> <percentage> <percentage> [/ <alpha-value>]? )|hsla( <hue> , <percentage> , <percentage> , <alpha-value>? )",
      "hue": "<number>|<angle>",
      "hue-rotate()": "hue-rotate( <angle> )",
      "hue-interpolation-method": "[shorter|longer|increasing|decreasing] hue",
      "hwb()": "hwb( [<hue>|none] [<percentage>|none] [<percentage>|none] [/ [<alpha-value>|none]]? )",
      "hypot()": "hypot( <calc-sum># )",
      "image": "<url>|<image()>|<image-set()>|<element()>|<paint()>|<cross-fade()>|<gradient>",
      "image()": "image( <image-tags>? [<image-src>? , <color>?]! )",
      "image-set()": "image-set( <image-set-option># )",
      "image-set-option": "[<image>|<string>] [<resolution>||type( <string> )]",
      "image-src": "<url>|<string>",
      "image-tags": "ltr|rtl",
      "inflexible-breadth": "<length-percentage>|min-content|max-content|auto",
      "inset()": "inset( <length-percentage>{1,4} [round <'border-radius'>]? )",
      "invert()": "invert( <number-percentage> )",
      "keyframes-name": "<custom-ident>|<string>",
      "keyframe-block": "<keyframe-selector># { <declaration-list> }",
      "keyframe-block-list": "<keyframe-block>+",
      "keyframe-selector": "from|to|<percentage>|<timeline-range-name> <percentage>",
      "lab()": "lab( [<percentage>|<number>|none] [<percentage>|<number>|none] [<percentage>|<number>|none] [/ [<alpha-value>|none]]? )",
      "layer()": "layer( <layer-name> )",
      "layer-name": "<ident> ['.' <ident>]*",
      "lch()": "lch( [<percentage>|<number>|none] [<percentage>|<number>|none] [<hue>|none] [/ [<alpha-value>|none]]? )",
      "leader()": "leader( <leader-type> )",
      "leader-type": "dotted|solid|space|<string>",
      "length-percentage": "<length>|<percentage>",
      "light-dark()": "light-dark( <color> , <color> )",
      "line-names": "'[' <custom-ident>* ']'",
      "line-name-list": "[<line-names>|<name-repeat>]+",
      "line-style": "none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset",
      "line-width": "<length>|thin|medium|thick",
      "linear-color-hint": "<length-percentage>",
      "linear-color-stop": "<color> <color-stop-length>?",
      "linear-gradient()": "linear-gradient( [[<angle>|to <side-or-corner>]||<color-interpolation-method>]? , <color-stop-list> )",
      "log()": "log( <calc-sum> , <calc-sum>? )",
      "mask-layer": "<mask-reference>||<position> [/ <bg-size>]?||<repeat-style>||<geometry-box>||[<geometry-box>|no-clip]||<compositing-operator>||<masking-mode>",
      "mask-position": "[<length-percentage>|left|center|right] [<length-percentage>|top|center|bottom]?",
      "mask-reference": "none|<image>|<mask-source>",
      "mask-source": "<url>",
      "masking-mode": "alpha|luminance|match-source",
      "matrix()": "matrix( <number>#{6} )",
      "matrix3d()": "matrix3d( <number>#{16} )",
      "max()": "max( <calc-sum># )",
      "media-and": "<media-in-parens> [and <media-in-parens>]+",
      "media-condition": "<media-not>|<media-and>|<media-or>|<media-in-parens>",
      "media-condition-without-or": "<media-not>|<media-and>|<media-in-parens>",
      "media-feature": "( [<mf-plain>|<mf-boolean>|<mf-range>] )",
      "media-in-parens": "( <media-condition> )|<media-feature>|<general-enclosed>",
      "media-not": "not <media-in-parens>",
      "media-or": "<media-in-parens> [or <media-in-parens>]+",
      "media-query": "<media-condition>|[not|only]? <media-type> [and <media-condition-without-or>]?",
      "media-query-list": "<media-query>#",
      "media-type": "<ident>",
      "mf-boolean": "<mf-name>",
      "mf-name": "<ident>",
      "mf-plain": "<mf-name> : <mf-value>",
      "mf-range": "<mf-name> ['<'|'>']? '='? <mf-value>|<mf-value> ['<'|'>']? '='? <mf-name>|<mf-value> '<' '='? <mf-name> '<' '='? <mf-value>|<mf-value> '>' '='? <mf-name> '>' '='? <mf-value>",
      "mf-value": "<number>|<dimension>|<ident>|<ratio>",
      "min()": "min( <calc-sum># )",
      "minmax()": "minmax( [<length-percentage>|min-content|max-content|auto] , [<length-percentage>|<flex>|min-content|max-content|auto] )",
      "mod()": "mod( <calc-sum> , <calc-sum> )",
      "name-repeat": "repeat( [<integer [1,\u221E]>|auto-fill] , <line-names>+ )",
      "named-color": "transparent|aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen",
      "namespace-prefix": "<ident>",
      "ns-prefix": "[<ident-token>|'*']? '|'",
      "number-percentage": "<number>|<percentage>",
      "numeric-figure-values": "[lining-nums|oldstyle-nums]",
      "numeric-fraction-values": "[diagonal-fractions|stacked-fractions]",
      "numeric-spacing-values": "[proportional-nums|tabular-nums]",
      "nth": "<an-plus-b>|even|odd",
      "opacity()": "opacity( [<number-percentage>] )",
      "overflow-position": "unsafe|safe",
      "outline-radius": "<length>|<percentage>",
      "page-body": "<declaration>? [; <page-body>]?|<page-margin-box> <page-body>",
      "page-margin-box": "<page-margin-box-type> '{' <declaration-list> '}'",
      "page-margin-box-type": "@top-left-corner|@top-left|@top-center|@top-right|@top-right-corner|@bottom-left-corner|@bottom-left|@bottom-center|@bottom-right|@bottom-right-corner|@left-top|@left-middle|@left-bottom|@right-top|@right-middle|@right-bottom",
      "page-selector-list": "[<page-selector>#]?",
      "page-selector": "<pseudo-page>+|<ident> <pseudo-page>*",
      "page-size": "A5|A4|A3|B5|B4|JIS-B5|JIS-B4|letter|legal|ledger",
      "path()": "path( [<fill-rule> ,]? <string> )",
      "paint()": "paint( <ident> , <declaration-value>? )",
      "perspective()": "perspective( [<length [0,\u221E]>|none] )",
      "polygon()": "polygon( <fill-rule>? , [<length-percentage> <length-percentage>]# )",
      "polar-color-space": "hsl|hwb|lch|oklch",
      "position": "[[left|center|right]||[top|center|bottom]|[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]?|[[left|right] <length-percentage>]&&[[top|bottom] <length-percentage>]]",
      "pow()": "pow( <calc-sum> , <calc-sum> )",
      "pseudo-class-selector": "':' <ident-token>|':' <function-token> <any-value> ')'",
      "pseudo-element-selector": "':' <pseudo-class-selector>|<legacy-pseudo-element-selector>",
      "pseudo-page": ": [left|right|first|blank]",
      "quote": "open-quote|close-quote|no-open-quote|no-close-quote",
      "radial-gradient()": "radial-gradient( [<ending-shape>||<size>]? [at <position>]? , <color-stop-list> )",
      "ratio": "<number [0,\u221E]> [/ <number [0,\u221E]>]?",
      "ray()": "ray( <angle>&&<ray-size>?&&contain?&&[at <position>]? )",
      "ray-size": "closest-side|closest-corner|farthest-side|farthest-corner|sides",
      "rectangular-color-space": "srgb|srgb-linear|display-p3|a98-rgb|prophoto-rgb|rec2020|lab|oklab|xyz|xyz-d50|xyz-d65",
      "relative-selector": "<combinator>? <complex-selector>",
      "relative-selector-list": "<relative-selector>#",
      "relative-size": "larger|smaller",
      "rem()": "rem( <calc-sum> , <calc-sum> )",
      "repeat-style": "repeat-x|repeat-y|[repeat|space|round|no-repeat]{1,2}",
      "repeating-conic-gradient()": "repeating-conic-gradient( [from <angle>]? [at <position>]? , <angular-color-stop-list> )",
      "repeating-linear-gradient()": "repeating-linear-gradient( [<angle>|to <side-or-corner>]? , <color-stop-list> )",
      "repeating-radial-gradient()": "repeating-radial-gradient( [<ending-shape>||<size>]? [at <position>]? , <color-stop-list> )",
      "reversed-counter-name": "reversed( <counter-name> )",
      "rgb()": "rgb( <percentage>{3} [/ <alpha-value>]? )|rgb( <number>{3} [/ <alpha-value>]? )|rgb( <percentage>#{3} , <alpha-value>? )|rgb( <number>#{3} , <alpha-value>? )",
      "rgba()": "rgba( <percentage>{3} [/ <alpha-value>]? )|rgba( <number>{3} [/ <alpha-value>]? )|rgba( <percentage>#{3} , <alpha-value>? )|rgba( <number>#{3} , <alpha-value>? )",
      "rotate()": "rotate( [<angle>|<zero>] )",
      "rotate3d()": "rotate3d( <number> , <number> , <number> , [<angle>|<zero>] )",
      "rotateX()": "rotateX( [<angle>|<zero>] )",
      "rotateY()": "rotateY( [<angle>|<zero>] )",
      "rotateZ()": "rotateZ( [<angle>|<zero>] )",
      "round()": "round( <rounding-strategy>? , <calc-sum> , <calc-sum> )",
      "rounding-strategy": "nearest|up|down|to-zero",
      "saturate()": "saturate( <number-percentage> )",
      "scale()": "scale( [<number>|<percentage>]#{1,2} )",
      "scale3d()": "scale3d( [<number>|<percentage>]#{3} )",
      "scaleX()": "scaleX( [<number>|<percentage>] )",
      "scaleY()": "scaleY( [<number>|<percentage>] )",
      "scaleZ()": "scaleZ( [<number>|<percentage>] )",
      "scroll()": "scroll( [<axis>||<scroller>]? )",
      "scroller": "root|nearest|self",
      "self-position": "center|start|end|self-start|self-end|flex-start|flex-end",
      "shape-radius": "<length-percentage>|closest-side|farthest-side",
      "sign()": "sign( <calc-sum> )",
      "skew()": "skew( [<angle>|<zero>] , [<angle>|<zero>]? )",
      "skewX()": "skewX( [<angle>|<zero>] )",
      "skewY()": "skewY( [<angle>|<zero>] )",
      "sepia()": "sepia( <number-percentage> )",
      "shadow": "inset?&&<length>{2,4}&&<color>?",
      "shadow-t": "[<length>{2,3}&&<color>?]",
      "shape": "rect( <top> , <right> , <bottom> , <left> )|rect( <top> <right> <bottom> <left> )",
      "shape-box": "<box>|margin-box",
      "side-or-corner": "[left|right]||[top|bottom]",
      "sin()": "sin( <calc-sum> )",
      "single-animation": "<'animation-duration'>||<easing-function>||<'animation-delay'>||<single-animation-iteration-count>||<single-animation-direction>||<single-animation-fill-mode>||<single-animation-play-state>||[none|<keyframes-name>]||<single-animation-timeline>",
      "single-animation-direction": "normal|reverse|alternate|alternate-reverse",
      "single-animation-fill-mode": "none|forwards|backwards|both",
      "single-animation-iteration-count": "infinite|<number>",
      "single-animation-play-state": "running|paused",
      "single-animation-timeline": "auto|none|<dashed-ident>|<scroll()>|<view()>",
      "single-transition": "[none|<single-transition-property>]||<time>||<easing-function>||<time>||<transition-behavior-value>",
      "single-transition-property": "all|<custom-ident>",
      "size": "closest-side|farthest-side|closest-corner|farthest-corner|<length>|<length-percentage>{2}",
      "sqrt()": "sqrt( <calc-sum> )",
      "step-position": "jump-start|jump-end|jump-none|jump-both|start|end",
      "step-timing-function": "step-start|step-end|steps( <integer> [, <step-position>]? )",
      "subclass-selector": "<id-selector>|<class-selector>|<attribute-selector>|<pseudo-class-selector>",
      "supports-condition": "not <supports-in-parens>|<supports-in-parens> [and <supports-in-parens>]*|<supports-in-parens> [or <supports-in-parens>]*",
      "supports-in-parens": "( <supports-condition> )|<supports-feature>|<general-enclosed>",
      "supports-feature": "<supports-decl>|<supports-selector-fn>",
      "supports-decl": "( <declaration> )",
      "supports-selector-fn": "selector( <complex-selector> )",
      "symbol": "<string>|<image>|<custom-ident>",
      "system-color": "AccentColor|AccentColorText|ActiveText|ButtonBorder|ButtonFace|ButtonText|Canvas|CanvasText|Field|FieldText|GrayText|Highlight|HighlightText|LinkText|Mark|MarkText|SelectedItem|SelectedItemText|VisitedText",
      "tan()": "tan( <calc-sum> )",
      "target": "<target-counter()>|<target-counters()>|<target-text()>",
      "target-counter()": "target-counter( [<string>|<url>] , <custom-ident> , <counter-style>? )",
      "target-counters()": "target-counters( [<string>|<url>] , <custom-ident> , <string> , <counter-style>? )",
      "target-text()": "target-text( [<string>|<url>] , [content|before|after|first-letter]? )",
      "time-percentage": "<time>|<percentage>",
      "timeline-range-name": "cover|contain|entry|exit|entry-crossing|exit-crossing",
      "easing-function": "linear|<cubic-bezier-timing-function>|<step-timing-function>",
      "track-breadth": "<length-percentage>|<flex>|min-content|max-content|auto",
      "track-list": "[<line-names>? [<track-size>|<track-repeat>]]+ <line-names>?",
      "track-repeat": "repeat( [<integer [1,\u221E]>] , [<line-names>? <track-size>]+ <line-names>? )",
      "track-size": "<track-breadth>|minmax( <inflexible-breadth> , <track-breadth> )|fit-content( <length-percentage> )",
      "transform-function": "<matrix()>|<translate()>|<translateX()>|<translateY()>|<scale()>|<scaleX()>|<scaleY()>|<rotate()>|<skew()>|<skewX()>|<skewY()>|<matrix3d()>|<translate3d()>|<translateZ()>|<scale3d()>|<scaleZ()>|<rotate3d()>|<rotateX()>|<rotateY()>|<rotateZ()>|<perspective()>",
      "transform-list": "<transform-function>+",
      "transition-behavior-value": "normal|allow-discrete",
      "translate()": "translate( <length-percentage> , <length-percentage>? )",
      "translate3d()": "translate3d( <length-percentage> , <length-percentage> , <length> )",
      "translateX()": "translateX( <length-percentage> )",
      "translateY()": "translateY( <length-percentage> )",
      "translateZ()": "translateZ( <length> )",
      "type-or-unit": "string|color|url|integer|number|length|angle|time|frequency|cap|ch|em|ex|ic|lh|rlh|rem|vb|vi|vw|vh|vmin|vmax|mm|Q|cm|in|pt|pc|px|deg|grad|rad|turn|ms|s|Hz|kHz|%",
      "type-selector": "<wq-name>|<ns-prefix>? '*'",
      "var()": "var( <custom-property-name> , <declaration-value>? )",
      "view()": "view( [<axis>||<'view-timeline-inset'>]? )",
      "viewport-length": "auto|<length-percentage>",
      "visual-box": "content-box|padding-box|border-box",
      "wq-name": "<ns-prefix>? <ident-token>",
      "-legacy-gradient": "<-webkit-gradient()>|<-legacy-linear-gradient>|<-legacy-repeating-linear-gradient>|<-legacy-radial-gradient>|<-legacy-repeating-radial-gradient>",
      "-legacy-linear-gradient": "-moz-linear-gradient( <-legacy-linear-gradient-arguments> )|-webkit-linear-gradient( <-legacy-linear-gradient-arguments> )|-o-linear-gradient( <-legacy-linear-gradient-arguments> )",
      "-legacy-repeating-linear-gradient": "-moz-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )|-webkit-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )|-o-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )",
      "-legacy-linear-gradient-arguments": "[<angle>|<side-or-corner>]? , <color-stop-list>",
      "-legacy-radial-gradient": "-moz-radial-gradient( <-legacy-radial-gradient-arguments> )|-webkit-radial-gradient( <-legacy-radial-gradient-arguments> )|-o-radial-gradient( <-legacy-radial-gradient-arguments> )",
      "-legacy-repeating-radial-gradient": "-moz-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )|-webkit-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )|-o-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )",
      "-legacy-radial-gradient-arguments": "[<position> ,]? [[[<-legacy-radial-gradient-shape>||<-legacy-radial-gradient-size>]|[<length>|<percentage>]{2}] ,]? <color-stop-list>",
      "-legacy-radial-gradient-size": "closest-side|closest-corner|farthest-side|farthest-corner|contain|cover",
      "-legacy-radial-gradient-shape": "circle|ellipse",
      "-non-standard-font": "-apple-system-body|-apple-system-headline|-apple-system-subheadline|-apple-system-caption1|-apple-system-caption2|-apple-system-footnote|-apple-system-short-body|-apple-system-short-headline|-apple-system-short-subheadline|-apple-system-short-caption1|-apple-system-short-footnote|-apple-system-tall-body",
      "-non-standard-color": "-moz-ButtonDefault|-moz-ButtonHoverFace|-moz-ButtonHoverText|-moz-CellHighlight|-moz-CellHighlightText|-moz-Combobox|-moz-ComboboxText|-moz-Dialog|-moz-DialogText|-moz-dragtargetzone|-moz-EvenTreeRow|-moz-Field|-moz-FieldText|-moz-html-CellHighlight|-moz-html-CellHighlightText|-moz-mac-accentdarkestshadow|-moz-mac-accentdarkshadow|-moz-mac-accentface|-moz-mac-accentlightesthighlight|-moz-mac-accentlightshadow|-moz-mac-accentregularhighlight|-moz-mac-accentregularshadow|-moz-mac-chrome-active|-moz-mac-chrome-inactive|-moz-mac-focusring|-moz-mac-menuselect|-moz-mac-menushadow|-moz-mac-menutextselect|-moz-MenuHover|-moz-MenuHoverText|-moz-MenuBarText|-moz-MenuBarHoverText|-moz-nativehyperlinktext|-moz-OddTreeRow|-moz-win-communicationstext|-moz-win-mediatext|-moz-activehyperlinktext|-moz-default-background-color|-moz-default-color|-moz-hyperlinktext|-moz-visitedhyperlinktext|-webkit-activelink|-webkit-focus-ring-color|-webkit-link|-webkit-text",
      "-non-standard-image-rendering": "optimize-contrast|-moz-crisp-edges|-o-crisp-edges|-webkit-optimize-contrast",
      "-non-standard-overflow": "overlay|-moz-scrollbars-none|-moz-scrollbars-horizontal|-moz-scrollbars-vertical|-moz-hidden-unscrollable",
      "-non-standard-size": "intrinsic|min-intrinsic|-webkit-fill-available|-webkit-fit-content|-webkit-min-content|-webkit-max-content|-moz-available|-moz-fit-content|-moz-min-content|-moz-max-content",
      "-webkit-gradient()": "-webkit-gradient( <-webkit-gradient-type> , <-webkit-gradient-point> [, <-webkit-gradient-point>|, <-webkit-gradient-radius> , <-webkit-gradient-point>] [, <-webkit-gradient-radius>]? [, <-webkit-gradient-color-stop>]* )",
      "-webkit-gradient-color-stop": "from( <color> )|color-stop( [<number-zero-one>|<percentage>] , <color> )|to( <color> )",
      "-webkit-gradient-point": "[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]",
      "-webkit-gradient-radius": "<length>|<percentage>",
      "-webkit-gradient-type": "linear|radial",
      "-webkit-mask-box-repeat": "repeat|stretch|round",
      "-ms-filter-function-list": "<-ms-filter-function>+",
      "-ms-filter-function": "<-ms-filter-function-progid>|<-ms-filter-function-legacy>",
      "-ms-filter-function-progid": "'progid:' [<ident-token> '.']* [<ident-token>|<function-token> <any-value>? )]",
      "-ms-filter-function-legacy": "<ident-token>|<function-token> <any-value>? )",
      "absolute-color-base": "<hex-color>|<absolute-color-function>|<named-color>|transparent",
      "absolute-color-function": "<rgb()>|<rgba()>|<hsl()>|<hsla()>|<hwb()>|<lab()>|<lch()>|<oklab()>|<oklch()>|<color()>",
      "age": "child|young|old",
      "anchor-name": "<dashed-ident>",
      "attr-name": "<wq-name>",
      "attr-fallback": "<any-value>",
      "bg-clip": "<box>|border|text",
      "bottom": "<length>|auto",
      "container-name": "<custom-ident>",
      "container-condition": "not <query-in-parens>|<query-in-parens> [[and <query-in-parens>]*|[or <query-in-parens>]*]",
      "coord-box": "content-box|padding-box|border-box|fill-box|stroke-box|view-box",
      "generic-voice": "[<age>? <gender> <integer>?]",
      "gender": "male|female|neutral",
      "generic-script-specific": "generic( kai )|generic( fangsong )|generic( nastaliq )",
      "generic-complete": "serif|sans-serif|system-ui|cursive|fantasy|math|monospace",
      "generic-incomplete": "ui-serif|ui-sans-serif|ui-monospace|ui-rounded",
      "-non-standard-generic-family": "-apple-system|BlinkMacSystemFont",
      "left": "<length>|auto",
      "color-base": "<hex-color>|<color-function>|<named-color>|<color-mix()>|transparent",
      "color-function": "<rgb()>|<rgba()>|<hsl()>|<hsla()>|<hwb()>|<lab()>|<lch()>|<oklab()>|<oklch()>|<color()>",
      "device-cmyk()": "<legacy-device-cmyk-syntax>|<modern-device-cmyk-syntax>",
      "legacy-device-cmyk-syntax": "device-cmyk( <number>#{4} )",
      "modern-device-cmyk-syntax": "device-cmyk( <cmyk-component>{4} [/ [<alpha-value>|none]]? )",
      "cmyk-component": "<number>|<percentage>|none",
      "color-mix()": "color-mix( <color-interpolation-method> , [<color>&&<percentage [0,100]>?]#{2} )",
      "color-space": "<rectangular-color-space>|<polar-color-space>|<custom-color-space>",
      "custom-color-space": "<dashed-ident>",
      "paint": "none|<color>|<url> [none|<color>]?|context-fill|context-stroke",
      "palette-identifier": "<dashed-ident>",
      "right": "<length>|auto",
      "scope-start": "<forgiving-selector-list>",
      "scope-end": "<forgiving-selector-list>",
      "forgiving-selector-list": "<complex-real-selector-list>",
      "forgiving-relative-selector-list": "<relative-real-selector-list>",
      "selector-list": "<complex-selector-list>",
      "complex-real-selector-list": "<complex-real-selector>#",
      "simple-selector-list": "<simple-selector>#",
      "relative-real-selector-list": "<relative-real-selector>#",
      "complex-selector-unit": "[<compound-selector>? <pseudo-compound-selector>*]!",
      "complex-real-selector": "<compound-selector> [<combinator>? <compound-selector>]*",
      "relative-real-selector": "<combinator>? <complex-real-selector>",
      "pseudo-compound-selector": "<pseudo-element-selector> <pseudo-class-selector>*",
      "simple-selector": "<type-selector>|<subclass-selector>",
      "legacy-pseudo-element-selector": "':' [before|after|first-line|first-letter]",
      "single-animation-composition": "replace|add|accumulate",
      "svg-length": "<percentage>|<length>|<number>",
      "svg-writing-mode": "lr-tb|rl-tb|tb-rl|lr|rl|tb",
      "top": "<length>|auto",
      "x": "<number>",
      "y": "<number>",
      "declaration": "<ident-token> : <declaration-value>? ['!' important]?",
      "declaration-list": "[<declaration>? ';']* <declaration>?",
      "url": "url( <string> <url-modifier>* )|<url-token>",
      "url-modifier": "<ident>|<function-token> <any-value> )",
      "number-zero-one": "<number [0,1]>",
      "number-one-or-greater": "<number [1,\u221E]>",
      "color()": "color( <colorspace-params> [/ [<alpha-value>|none]]? )",
      "colorspace-params": "[<predefined-rgb-params>|<xyz-params>]",
      "predefined-rgb-params": "<predefined-rgb> [<number>|<percentage>|none]{3}",
      "predefined-rgb": "srgb|srgb-linear|display-p3|a98-rgb|prophoto-rgb|rec2020",
      "xyz-params": "<xyz-space> [<number>|<percentage>|none]{3}",
      "xyz-space": "xyz|xyz-d50|xyz-d65",
      "oklab()": "oklab( [<percentage>|<number>|none] [<percentage>|<number>|none] [<percentage>|<number>|none] [/ [<alpha-value>|none]]? )",
      "oklch()": "oklch( [<percentage>|<number>|none] [<percentage>|<number>|none] [<hue>|none] [/ [<alpha-value>|none]]? )",
      "offset-path": "<ray()>|<url>|<basic-shape>",
      "rect()": "rect( [<length-percentage>|auto]{4} [round <'border-radius'>]? )",
      "xywh()": "xywh( <length-percentage>{2} <length-percentage [0,\u221E]>{2} [round <'border-radius'>]? )",
      "query-in-parens": "( <container-condition> )|( <size-feature> )|style( <style-query> )|<general-enclosed>",
      "size-feature": "<mf-plain>|<mf-boolean>|<mf-range>",
      "style-feature": "<declaration>",
      "style-query": "<style-condition>|<style-feature>",
      "style-condition": "not <style-in-parens>|<style-in-parens> [[and <style-in-parens>]*|[or <style-in-parens>]*]",
      "style-in-parens": "( <style-condition> )|( <style-feature> )|<general-enclosed>",
      "-non-standard-display": "-ms-inline-flexbox|-ms-grid|-ms-inline-grid|-webkit-flex|-webkit-inline-flex|-webkit-box|-webkit-inline-box|-moz-inline-stack|-moz-box|-moz-inline-box",
      "inset-area": "[[left|center|right|span-left|span-right|x-start|x-end|span-x-start|span-x-end|x-self-start|x-self-end|span-x-self-start|span-x-self-end|span-all]||[top|center|bottom|span-top|span-bottom|y-start|y-end|span-y-start|span-y-end|y-self-start|y-self-end|span-y-self-start|span-y-self-end|span-all]|[block-start|center|block-end|span-block-start|span-block-end|span-all]||[inline-start|center|inline-end|span-inline-start|span-inline-end|span-all]|[self-block-start|self-block-end|span-self-block-start|span-self-block-end|span-all]||[self-inline-start|self-inline-end|span-self-inline-start|span-self-inline-end|span-all]|[start|center|end|span-start|span-end|span-all]{1,2}|[self-start|center|self-end|span-self-start|span-self-end|span-all]{1,2}]",
      "position-area": "[[left|center|right|span-left|span-right|x-start|x-end|span-x-start|span-x-end|x-self-start|x-self-end|span-x-self-start|span-x-self-end|span-all]||[top|center|bottom|span-top|span-bottom|y-start|y-end|span-y-start|span-y-end|y-self-start|y-self-end|span-y-self-start|span-y-self-end|span-all]|[block-start|center|block-end|span-block-start|span-block-end|span-all]||[inline-start|center|inline-end|span-inline-start|span-inline-end|span-all]|[self-block-start|center|self-block-end|span-self-block-start|span-self-block-end|span-all]||[self-inline-start|center|self-inline-end|span-self-inline-start|span-self-inline-end|span-all]|[start|center|end|span-start|span-end|span-all]{1,2}|[self-start|center|self-end|span-self-start|span-self-end|span-all]{1,2}]",
      "anchor()": "anchor( <anchor-element>?&&<anchor-side> , <length-percentage>? )",
      "anchor-side": "inside|outside|top|left|right|bottom|start|end|self-start|self-end|<percentage>|center",
      "anchor-size()": "anchor-size( [<anchor-element>||<anchor-size>]? , <length-percentage>? )",
      "anchor-size": "width|height|block|inline|self-block|self-inline",
      "anchor-element": "<dashed-ident>",
      "try-size": "most-width|most-height|most-block-size|most-inline-size",
      "try-tactic": "flip-block||flip-inline||flip-start",
      "font-variant-css2": "normal|small-caps",
      "font-width-css3": "normal|ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded",
      "system-family-name": "caption|icon|menu|message-box|small-caption|status-bar"
    },
    "properties": {
      "--*": "<declaration-value>",
      "-ms-accelerator": "false|true",
      "-ms-block-progression": "tb|rl|bt|lr",
      "-ms-content-zoom-chaining": "none|chained",
      "-ms-content-zooming": "none|zoom",
      "-ms-content-zoom-limit": "<'-ms-content-zoom-limit-min'> <'-ms-content-zoom-limit-max'>",
      "-ms-content-zoom-limit-max": "<percentage>",
      "-ms-content-zoom-limit-min": "<percentage>",
      "-ms-content-zoom-snap": "<'-ms-content-zoom-snap-type'>||<'-ms-content-zoom-snap-points'>",
      "-ms-content-zoom-snap-points": "snapInterval( <percentage> , <percentage> )|snapList( <percentage># )",
      "-ms-content-zoom-snap-type": "none|proximity|mandatory",
      "-ms-filter": "<string>",
      "-ms-flow-from": "[none|<custom-ident>]#",
      "-ms-flow-into": "[none|<custom-ident>]#",
      "-ms-grid-columns": "none|<track-list>|<auto-track-list>",
      "-ms-grid-rows": "none|<track-list>|<auto-track-list>",
      "-ms-high-contrast-adjust": "auto|none",
      "-ms-hyphenate-limit-chars": "auto|<integer>{1,3}",
      "-ms-hyphenate-limit-lines": "no-limit|<integer>",
      "-ms-hyphenate-limit-zone": "<percentage>|<length>",
      "-ms-ime-align": "auto|after",
      "-ms-overflow-style": "auto|none|scrollbar|-ms-autohiding-scrollbar",
      "-ms-scrollbar-3dlight-color": "<color>",
      "-ms-scrollbar-arrow-color": "<color>",
      "-ms-scrollbar-base-color": "<color>",
      "-ms-scrollbar-darkshadow-color": "<color>",
      "-ms-scrollbar-face-color": "<color>",
      "-ms-scrollbar-highlight-color": "<color>",
      "-ms-scrollbar-shadow-color": "<color>",
      "-ms-scrollbar-track-color": "<color>",
      "-ms-scroll-chaining": "chained|none",
      "-ms-scroll-limit": "<'-ms-scroll-limit-x-min'> <'-ms-scroll-limit-y-min'> <'-ms-scroll-limit-x-max'> <'-ms-scroll-limit-y-max'>",
      "-ms-scroll-limit-x-max": "auto|<length>",
      "-ms-scroll-limit-x-min": "<length>",
      "-ms-scroll-limit-y-max": "auto|<length>",
      "-ms-scroll-limit-y-min": "<length>",
      "-ms-scroll-rails": "none|railed",
      "-ms-scroll-snap-points-x": "snapInterval( <length-percentage> , <length-percentage> )|snapList( <length-percentage># )",
      "-ms-scroll-snap-points-y": "snapInterval( <length-percentage> , <length-percentage> )|snapList( <length-percentage># )",
      "-ms-scroll-snap-type": "none|proximity|mandatory",
      "-ms-scroll-snap-x": "<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-x'>",
      "-ms-scroll-snap-y": "<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-y'>",
      "-ms-scroll-translation": "none|vertical-to-horizontal",
      "-ms-text-autospace": "none|ideograph-alpha|ideograph-numeric|ideograph-parenthesis|ideograph-space",
      "-ms-touch-select": "grippers|none",
      "-ms-user-select": "none|element|text",
      "-ms-wrap-flow": "auto|both|start|end|maximum|clear",
      "-ms-wrap-margin": "<length>",
      "-ms-wrap-through": "wrap|none",
      "-moz-appearance": "none|button|button-arrow-down|button-arrow-next|button-arrow-previous|button-arrow-up|button-bevel|button-focus|caret|checkbox|checkbox-container|checkbox-label|checkmenuitem|dualbutton|groupbox|listbox|listitem|menuarrow|menubar|menucheckbox|menuimage|menuitem|menuitemtext|menulist|menulist-button|menulist-text|menulist-textfield|menupopup|menuradio|menuseparator|meterbar|meterchunk|progressbar|progressbar-vertical|progresschunk|progresschunk-vertical|radio|radio-container|radio-label|radiomenuitem|range|range-thumb|resizer|resizerpanel|scale-horizontal|scalethumbend|scalethumb-horizontal|scalethumbstart|scalethumbtick|scalethumb-vertical|scale-vertical|scrollbarbutton-down|scrollbarbutton-left|scrollbarbutton-right|scrollbarbutton-up|scrollbarthumb-horizontal|scrollbarthumb-vertical|scrollbartrack-horizontal|scrollbartrack-vertical|searchfield|separator|sheet|spinner|spinner-downbutton|spinner-textfield|spinner-upbutton|splitter|statusbar|statusbarpanel|tab|tabpanel|tabpanels|tab-scroll-arrow-back|tab-scroll-arrow-forward|textfield|textfield-multiline|toolbar|toolbarbutton|toolbarbutton-dropdown|toolbargripper|toolbox|tooltip|treeheader|treeheadercell|treeheadersortarrow|treeitem|treeline|treetwisty|treetwistyopen|treeview|-moz-mac-unified-toolbar|-moz-win-borderless-glass|-moz-win-browsertabbar-toolbox|-moz-win-communicationstext|-moz-win-communications-toolbox|-moz-win-exclude-glass|-moz-win-glass|-moz-win-mediatext|-moz-win-media-toolbox|-moz-window-button-box|-moz-window-button-box-maximized|-moz-window-button-close|-moz-window-button-maximize|-moz-window-button-minimize|-moz-window-button-restore|-moz-window-frame-bottom|-moz-window-frame-left|-moz-window-frame-right|-moz-window-titlebar|-moz-window-titlebar-maximized",
      "-moz-binding": "<url>|none",
      "-moz-border-bottom-colors": "<color>+|none",
      "-moz-border-left-colors": "<color>+|none",
      "-moz-border-right-colors": "<color>+|none",
      "-moz-border-top-colors": "<color>+|none",
      "-moz-context-properties": "none|[fill|fill-opacity|stroke|stroke-opacity]#",
      "-moz-float-edge": "border-box|content-box|margin-box|padding-box",
      "-moz-force-broken-image-icon": "0|1",
      "-moz-image-region": "<shape>|auto",
      "-moz-orient": "inline|block|horizontal|vertical",
      "-moz-outline-radius": "<outline-radius>{1,4} [/ <outline-radius>{1,4}]?",
      "-moz-outline-radius-bottomleft": "<outline-radius>",
      "-moz-outline-radius-bottomright": "<outline-radius>",
      "-moz-outline-radius-topleft": "<outline-radius>",
      "-moz-outline-radius-topright": "<outline-radius>",
      "-moz-stack-sizing": "ignore|stretch-to-fit",
      "-moz-text-blink": "none|blink",
      "-moz-user-focus": "ignore|normal|select-after|select-before|select-menu|select-same|select-all|none",
      "-moz-user-input": "auto|none|enabled|disabled",
      "-moz-user-modify": "read-only|read-write|write-only",
      "-moz-window-dragging": "drag|no-drag",
      "-moz-window-shadow": "default|menu|tooltip|sheet|none",
      "-webkit-appearance": "none|button|button-bevel|caps-lock-indicator|caret|checkbox|default-button|inner-spin-button|listbox|listitem|media-controls-background|media-controls-fullscreen-background|media-current-time-display|media-enter-fullscreen-button|media-exit-fullscreen-button|media-fullscreen-button|media-mute-button|media-overlay-play-button|media-play-button|media-seek-back-button|media-seek-forward-button|media-slider|media-sliderthumb|media-time-remaining-display|media-toggle-closed-captions-button|media-volume-slider|media-volume-slider-container|media-volume-sliderthumb|menulist|menulist-button|menulist-text|menulist-textfield|meter|progress-bar|progress-bar-value|push-button|radio|scrollbarbutton-down|scrollbarbutton-left|scrollbarbutton-right|scrollbarbutton-up|scrollbargripper-horizontal|scrollbargripper-vertical|scrollbarthumb-horizontal|scrollbarthumb-vertical|scrollbartrack-horizontal|scrollbartrack-vertical|searchfield|searchfield-cancel-button|searchfield-decoration|searchfield-results-button|searchfield-results-decoration|slider-horizontal|slider-vertical|sliderthumb-horizontal|sliderthumb-vertical|square-button|textarea|textfield|-apple-pay-button",
      "-webkit-border-before": "<'border-width'>||<'border-style'>||<color>",
      "-webkit-border-before-color": "<color>",
      "-webkit-border-before-style": "<'border-style'>",
      "-webkit-border-before-width": "<'border-width'>",
      "-webkit-box-reflect": "[above|below|right|left]? <length>? <image>?",
      "-webkit-line-clamp": "none|<integer>",
      "-webkit-mask": "[<mask-reference>||<position> [/ <bg-size>]?||<repeat-style>||[<box>|border|padding|content|text]||[<box>|border|padding|content]]#",
      "-webkit-mask-attachment": "<attachment>#",
      "-webkit-mask-clip": "[<box>|border|padding|content|text]#",
      "-webkit-mask-composite": "<composite-style>#",
      "-webkit-mask-image": "<mask-reference>#",
      "-webkit-mask-origin": "[<box>|border|padding|content]#",
      "-webkit-mask-position": "<position>#",
      "-webkit-mask-position-x": "[<length-percentage>|left|center|right]#",
      "-webkit-mask-position-y": "[<length-percentage>|top|center|bottom]#",
      "-webkit-mask-repeat": "<repeat-style>#",
      "-webkit-mask-repeat-x": "repeat|no-repeat|space|round",
      "-webkit-mask-repeat-y": "repeat|no-repeat|space|round",
      "-webkit-mask-size": "<bg-size>#",
      "-webkit-overflow-scrolling": "auto|touch",
      "-webkit-tap-highlight-color": "<color>",
      "-webkit-text-fill-color": "<color>",
      "-webkit-text-stroke": "<length>||<color>",
      "-webkit-text-stroke-color": "<color>",
      "-webkit-text-stroke-width": "<length>",
      "-webkit-touch-callout": "default|none",
      "-webkit-user-modify": "read-only|read-write|read-write-plaintext-only",
      "accent-color": "auto|<color>",
      "align-content": "normal|<baseline-position>|<content-distribution>|<overflow-position>? <content-position>",
      "align-items": "normal|stretch|<baseline-position>|[<overflow-position>? <self-position>]",
      "align-self": "auto|normal|stretch|<baseline-position>|<overflow-position>? <self-position>",
      "align-tracks": "[normal|<baseline-position>|<content-distribution>|<overflow-position>? <content-position>]#",
      "all": "initial|inherit|unset|revert|revert-layer",
      "anchor-name": "none|<dashed-ident>#",
      "anchor-scope": "none|all|<dashed-ident>#",
      "animation": "<single-animation>#",
      "animation-composition": "<single-animation-composition>#",
      "animation-delay": "<time>#",
      "animation-direction": "<single-animation-direction>#",
      "animation-duration": "<time>#",
      "animation-fill-mode": "<single-animation-fill-mode>#",
      "animation-iteration-count": "<single-animation-iteration-count>#",
      "animation-name": "[none|<keyframes-name>]#",
      "animation-play-state": "<single-animation-play-state>#",
      "animation-range": "[<'animation-range-start'> <'animation-range-end'>?]#",
      "animation-range-end": "[normal|<length-percentage>|<timeline-range-name> <length-percentage>?]#",
      "animation-range-start": "[normal|<length-percentage>|<timeline-range-name> <length-percentage>?]#",
      "animation-timing-function": "<easing-function>#",
      "animation-timeline": "<single-animation-timeline>#",
      "appearance": "none|auto|textfield|menulist-button|<compat-auto>",
      "aspect-ratio": "auto||<ratio>",
      "azimuth": "<angle>|[[left-side|far-left|left|center-left|center|center-right|right|far-right|right-side]||behind]|leftwards|rightwards",
      "backdrop-filter": "none|<filter-function-list>",
      "backface-visibility": "visible|hidden",
      "background": "[<bg-layer> ,]* <final-bg-layer>",
      "background-attachment": "<attachment>#",
      "background-blend-mode": "<blend-mode>#",
      "background-clip": "<bg-clip>#",
      "background-color": "<color>",
      "background-image": "<bg-image>#",
      "background-origin": "<box>#",
      "background-position": "<bg-position>#",
      "background-position-x": "[center|[[left|right|x-start|x-end]? <length-percentage>?]!]#",
      "background-position-y": "[center|[[top|bottom|y-start|y-end]? <length-percentage>?]!]#",
      "background-repeat": "<repeat-style>#",
      "background-size": "<bg-size>#",
      "block-size": "<'width'>",
      "border": "<line-width>||<line-style>||<color>",
      "border-block": "<'border-top-width'>||<'border-top-style'>||<color>",
      "border-block-color": "<'border-top-color'>{1,2}",
      "border-block-style": "<'border-top-style'>",
      "border-block-width": "<'border-top-width'>",
      "border-block-end": "<'border-top-width'>||<'border-top-style'>||<color>",
      "border-block-end-color": "<'border-top-color'>",
      "border-block-end-style": "<'border-top-style'>",
      "border-block-end-width": "<'border-top-width'>",
      "border-block-start": "<'border-top-width'>||<'border-top-style'>||<color>",
      "border-block-start-color": "<'border-top-color'>",
      "border-block-start-style": "<'border-top-style'>",
      "border-block-start-width": "<'border-top-width'>",
      "border-bottom": "<line-width>||<line-style>||<color>",
      "border-bottom-color": "<'border-top-color'>",
      "border-bottom-left-radius": "<length-percentage>{1,2}",
      "border-bottom-right-radius": "<length-percentage>{1,2}",
      "border-bottom-style": "<line-style>",
      "border-bottom-width": "<line-width>",
      "border-collapse": "collapse|separate",
      "border-color": "<color>{1,4}",
      "border-end-end-radius": "<length-percentage>{1,2}",
      "border-end-start-radius": "<length-percentage>{1,2}",
      "border-image": "<'border-image-source'>||<'border-image-slice'> [/ <'border-image-width'>|/ <'border-image-width'>? / <'border-image-outset'>]?||<'border-image-repeat'>",
      "border-image-outset": "[<length>|<number>]{1,4}",
      "border-image-repeat": "[stretch|repeat|round|space]{1,2}",
      "border-image-slice": "<number-percentage>{1,4}&&fill?",
      "border-image-source": "none|<image>",
      "border-image-width": "[<length-percentage>|<number>|auto]{1,4}",
      "border-inline": "<'border-top-width'>||<'border-top-style'>||<color>",
      "border-inline-end": "<'border-top-width'>||<'border-top-style'>||<color>",
      "border-inline-color": "<'border-top-color'>{1,2}",
      "border-inline-style": "<'border-top-style'>",
      "border-inline-width": "<'border-top-width'>",
      "border-inline-end-color": "<'border-top-color'>",
      "border-inline-end-style": "<'border-top-style'>",
      "border-inline-end-width": "<'border-top-width'>",
      "border-inline-start": "<'border-top-width'>||<'border-top-style'>||<color>",
      "border-inline-start-color": "<'border-top-color'>",
      "border-inline-start-style": "<'border-top-style'>",
      "border-inline-start-width": "<'border-top-width'>",
      "border-left": "<line-width>||<line-style>||<color>",
      "border-left-color": "<color>",
      "border-left-style": "<line-style>",
      "border-left-width": "<line-width>",
      "border-radius": "<length-percentage>{1,4} [/ <length-percentage>{1,4}]?",
      "border-right": "<line-width>||<line-style>||<color>",
      "border-right-color": "<color>",
      "border-right-style": "<line-style>",
      "border-right-width": "<line-width>",
      "border-spacing": "<length> <length>?",
      "border-start-end-radius": "<length-percentage>{1,2}",
      "border-start-start-radius": "<length-percentage>{1,2}",
      "border-style": "<line-style>{1,4}",
      "border-top": "<line-width>||<line-style>||<color>",
      "border-top-color": "<color>",
      "border-top-left-radius": "<length-percentage>{1,2}",
      "border-top-right-radius": "<length-percentage>{1,2}",
      "border-top-style": "<line-style>",
      "border-top-width": "<line-width>",
      "border-width": "<line-width>{1,4}",
      "bottom": "<length>|<percentage>|auto",
      "box-align": "start|center|end|baseline|stretch",
      "box-decoration-break": "slice|clone",
      "box-direction": "normal|reverse|inherit",
      "box-flex": "<number>",
      "box-flex-group": "<integer>",
      "box-lines": "single|multiple",
      "box-ordinal-group": "<integer>",
      "box-orient": "horizontal|vertical|inline-axis|block-axis|inherit",
      "box-pack": "start|center|end|justify",
      "box-shadow": "none|<shadow>#",
      "box-sizing": "content-box|border-box",
      "break-after": "auto|avoid|always|all|avoid-page|page|left|right|recto|verso|avoid-column|column|avoid-region|region",
      "break-before": "auto|avoid|always|all|avoid-page|page|left|right|recto|verso|avoid-column|column|avoid-region|region",
      "break-inside": "auto|avoid|avoid-page|avoid-column|avoid-region",
      "caption-side": "top|bottom|block-start|block-end|inline-start|inline-end",
      "caret": "<'caret-color'>||<'caret-shape'>",
      "caret-color": "auto|<color>",
      "caret-shape": "auto|bar|block|underscore",
      "clear": "none|left|right|both|inline-start|inline-end",
      "clip": "<shape>|auto",
      "clip-path": "<clip-source>|[<basic-shape>||<geometry-box>]|none",
      "clip-rule": "nonzero|evenodd",
      "color": "<color>",
      "color-interpolation-filters": "auto|sRGB|linearRGB",
      "color-scheme": "normal|[light|dark|<custom-ident>]+&&only?",
      "column-count": "<integer>|auto",
      "column-fill": "auto|balance",
      "column-gap": "normal|<length-percentage>",
      "column-rule": "<'column-rule-width'>||<'column-rule-style'>||<'column-rule-color'>",
      "column-rule-color": "<color>",
      "column-rule-style": "<'border-style'>",
      "column-rule-width": "<'border-width'>",
      "column-span": "none|all",
      "column-width": "<length>|auto",
      "columns": "<'column-width'>||<'column-count'>",
      "contain": "none|strict|content|[[size||inline-size]||layout||style||paint]",
      "contain-intrinsic-size": "[auto? [none|<length>]]{1,2}",
      "contain-intrinsic-block-size": "auto? [none|<length>]",
      "contain-intrinsic-height": "auto? [none|<length>]",
      "contain-intrinsic-inline-size": "auto? [none|<length>]",
      "contain-intrinsic-width": "auto? [none|<length>]",
      "container": "<'container-name'> [/ <'container-type'>]?",
      "container-name": "none|<custom-ident>+",
      "container-type": "normal||[size|inline-size]",
      "content": "normal|none|[<content-replacement>|<content-list>] [/ [<string>|<counter>]+]?",
      "content-visibility": "visible|auto|hidden",
      "counter-increment": "[<counter-name> <integer>?]+|none",
      "counter-reset": "[<counter-name> <integer>?|<reversed-counter-name> <integer>?]+|none",
      "counter-set": "[<counter-name> <integer>?]+|none",
      "cursor": "[[<url> [<x> <y>]? ,]* [auto|default|none|context-menu|help|pointer|progress|wait|cell|crosshair|text|vertical-text|alias|copy|move|no-drop|not-allowed|e-resize|n-resize|ne-resize|nw-resize|s-resize|se-resize|sw-resize|w-resize|ew-resize|ns-resize|nesw-resize|nwse-resize|col-resize|row-resize|all-scroll|zoom-in|zoom-out|grab|grabbing|hand|-webkit-grab|-webkit-grabbing|-webkit-zoom-in|-webkit-zoom-out|-moz-grab|-moz-grabbing|-moz-zoom-in|-moz-zoom-out]]",
      "d": "none|path( <string> )",
      "cx": "<length>|<percentage>",
      "cy": "<length>|<percentage>",
      "direction": "ltr|rtl",
      "display": "[<display-outside>||<display-inside>]|<display-listitem>|<display-internal>|<display-box>|<display-legacy>|<-non-standard-display>",
      "dominant-baseline": "auto|use-script|no-change|reset-size|ideographic|alphabetic|hanging|mathematical|central|middle|text-after-edge|text-before-edge",
      "empty-cells": "show|hide",
      "field-sizing": "content|fixed",
      "fill": "<paint>",
      "fill-opacity": "<number-zero-one>",
      "fill-rule": "nonzero|evenodd",
      "filter": "none|<filter-function-list>|<-ms-filter-function-list>",
      "flex": "none|[<'flex-grow'> <'flex-shrink'>?||<'flex-basis'>]",
      "flex-basis": "content|<'width'>",
      "flex-direction": "row|row-reverse|column|column-reverse",
      "flex-flow": "<'flex-direction'>||<'flex-wrap'>",
      "flex-grow": "<number>",
      "flex-shrink": "<number>",
      "flex-wrap": "nowrap|wrap|wrap-reverse",
      "float": "left|right|none|inline-start|inline-end",
      "font": "[[<'font-style'>||<font-variant-css2>||<'font-weight'>||<font-width-css3>]? <'font-size'> [/ <'line-height'>]? <'font-family'>#]|<system-family-name>|<-non-standard-font>",
      "font-family": "[<family-name>|<generic-family>]#",
      "font-feature-settings": "normal|<feature-tag-value>#",
      "font-kerning": "auto|normal|none",
      "font-language-override": "normal|<string>",
      "font-optical-sizing": "auto|none",
      "font-palette": "normal|light|dark|<palette-identifier>",
      "font-variation-settings": "normal|[<string> <number>]#",
      "font-size": "<absolute-size>|<relative-size>|<length-percentage>",
      "font-size-adjust": "none|[ex-height|cap-height|ch-width|ic-width|ic-height]? [from-font|<number>]",
      "font-smooth": "auto|never|always|<absolute-size>|<length>",
      "font-stretch": "<font-stretch-absolute>",
      "font-style": "normal|italic|oblique <angle>?",
      "font-synthesis": "none|[weight||style||small-caps||position]",
      "font-synthesis-position": "auto|none",
      "font-synthesis-small-caps": "auto|none",
      "font-synthesis-style": "auto|none",
      "font-synthesis-weight": "auto|none",
      "font-variant": "normal|none|[<common-lig-values>||<discretionary-lig-values>||<historical-lig-values>||<contextual-alt-values>||stylistic( <feature-value-name> )||historical-forms||styleset( <feature-value-name># )||character-variant( <feature-value-name># )||swash( <feature-value-name> )||ornaments( <feature-value-name> )||annotation( <feature-value-name> )||[small-caps|all-small-caps|petite-caps|all-petite-caps|unicase|titling-caps]||<numeric-figure-values>||<numeric-spacing-values>||<numeric-fraction-values>||ordinal||slashed-zero||<east-asian-variant-values>||<east-asian-width-values>||ruby]",
      "font-variant-alternates": "normal|[stylistic( <feature-value-name> )||historical-forms||styleset( <feature-value-name># )||character-variant( <feature-value-name># )||swash( <feature-value-name> )||ornaments( <feature-value-name> )||annotation( <feature-value-name> )]",
      "font-variant-caps": "normal|small-caps|all-small-caps|petite-caps|all-petite-caps|unicase|titling-caps",
      "font-variant-east-asian": "normal|[<east-asian-variant-values>||<east-asian-width-values>||ruby]",
      "font-variant-emoji": "normal|text|emoji|unicode",
      "font-variant-ligatures": "normal|none|[<common-lig-values>||<discretionary-lig-values>||<historical-lig-values>||<contextual-alt-values>]",
      "font-variant-numeric": "normal|[<numeric-figure-values>||<numeric-spacing-values>||<numeric-fraction-values>||ordinal||slashed-zero]",
      "font-variant-position": "normal|sub|super",
      "font-weight": "<font-weight-absolute>|bolder|lighter",
      "forced-color-adjust": "auto|none|preserve-parent-color",
      "gap": "<'row-gap'> <'column-gap'>?",
      "grid": "<'grid-template'>|<'grid-template-rows'> / [auto-flow&&dense?] <'grid-auto-columns'>?|[auto-flow&&dense?] <'grid-auto-rows'>? / <'grid-template-columns'>",
      "grid-area": "<grid-line> [/ <grid-line>]{0,3}",
      "grid-auto-columns": "<track-size>+",
      "grid-auto-flow": "[row|column]||dense",
      "grid-auto-rows": "<track-size>+",
      "grid-column": "<grid-line> [/ <grid-line>]?",
      "grid-column-end": "<grid-line>",
      "grid-column-gap": "<length-percentage>",
      "grid-column-start": "<grid-line>",
      "grid-gap": "<'grid-row-gap'> <'grid-column-gap'>?",
      "grid-row": "<grid-line> [/ <grid-line>]?",
      "grid-row-end": "<grid-line>",
      "grid-row-gap": "<length-percentage>",
      "grid-row-start": "<grid-line>",
      "grid-template": "none|[<'grid-template-rows'> / <'grid-template-columns'>]|[<line-names>? <string> <track-size>? <line-names>?]+ [/ <explicit-track-list>]?",
      "grid-template-areas": "none|<string>+",
      "grid-template-columns": "none|<track-list>|<auto-track-list>|subgrid <line-name-list>?",
      "grid-template-rows": "none|<track-list>|<auto-track-list>|subgrid <line-name-list>?",
      "hanging-punctuation": "none|[first||[force-end|allow-end]||last]",
      "height": "auto|<length>|<percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|stretch|<-non-standard-size>",
      "hyphenate-character": "auto|<string>",
      "hyphenate-limit-chars": "[auto|<integer>]{1,3}",
      "hyphens": "none|manual|auto",
      "image-orientation": "from-image|<angle>|[<angle>? flip]",
      "image-rendering": "auto|crisp-edges|pixelated|optimizeSpeed|optimizeQuality|<-non-standard-image-rendering>",
      "image-resolution": "[from-image||<resolution>]&&snap?",
      "ime-mode": "auto|normal|active|inactive|disabled",
      "initial-letter": "normal|[<number> <integer>?]",
      "initial-letter-align": "[auto|alphabetic|hanging|ideographic]",
      "inline-size": "<'width'>",
      "input-security": "auto|none",
      "inset": "<'top'>{1,4}",
      "inset-block": "<'top'>{1,2}",
      "inset-block-end": "<'top'>",
      "inset-block-start": "<'top'>",
      "inset-inline": "<'top'>{1,2}",
      "inset-inline-end": "<'top'>",
      "inset-inline-start": "<'top'>",
      "interpolate-size": "numeric-only|allow-keywords",
      "isolation": "auto|isolate",
      "justify-content": "normal|<content-distribution>|<overflow-position>? [<content-position>|left|right]",
      "justify-items": "normal|stretch|<baseline-position>|<overflow-position>? [<self-position>|left|right]|legacy|legacy&&[left|right|center]",
      "justify-self": "auto|normal|stretch|<baseline-position>|<overflow-position>? [<self-position>|left|right]",
      "justify-tracks": "[normal|<content-distribution>|<overflow-position>? [<content-position>|left|right]]#",
      "left": "<length>|<percentage>|auto",
      "letter-spacing": "normal|<length-percentage>",
      "line-break": "auto|loose|normal|strict|anywhere",
      "line-clamp": "none|<integer>",
      "line-height": "normal|<number>|<length>|<percentage>",
      "line-height-step": "<length>",
      "list-style": "<'list-style-type'>||<'list-style-position'>||<'list-style-image'>",
      "list-style-image": "<image>|none",
      "list-style-position": "inside|outside",
      "list-style-type": "<counter-style>|<string>|none",
      "margin": "[<length>|<percentage>|auto]{1,4}",
      "margin-block": "<'margin-left'>{1,2}",
      "margin-block-end": "<'margin-left'>",
      "margin-block-start": "<'margin-left'>",
      "margin-bottom": "<length>|<percentage>|auto",
      "margin-inline": "<'margin-left'>{1,2}",
      "margin-inline-end": "<'margin-left'>",
      "margin-inline-start": "<'margin-left'>",
      "margin-left": "<length>|<percentage>|auto",
      "margin-right": "<length>|<percentage>|auto",
      "margin-top": "<length>|<percentage>|auto",
      "margin-trim": "none|in-flow|all",
      "marker": "none|<url>",
      "marker-end": "none|<url>",
      "marker-mid": "none|<url>",
      "marker-start": "none|<url>",
      "mask": "<mask-layer>#",
      "mask-border": "<'mask-border-source'>||<'mask-border-slice'> [/ <'mask-border-width'>? [/ <'mask-border-outset'>]?]?||<'mask-border-repeat'>||<'mask-border-mode'>",
      "mask-border-mode": "luminance|alpha",
      "mask-border-outset": "[<length>|<number>]{1,4}",
      "mask-border-repeat": "[stretch|repeat|round|space]{1,2}",
      "mask-border-slice": "<number-percentage>{1,4} fill?",
      "mask-border-source": "none|<image>",
      "mask-border-width": "[<length-percentage>|<number>|auto]{1,4}",
      "mask-clip": "[<geometry-box>|no-clip]#",
      "mask-composite": "<compositing-operator>#",
      "mask-image": "<mask-reference>#",
      "mask-mode": "<masking-mode>#",
      "mask-origin": "<geometry-box>#",
      "mask-position": "<position>#",
      "mask-repeat": "<repeat-style>#",
      "mask-size": "<bg-size>#",
      "mask-type": "luminance|alpha",
      "masonry-auto-flow": "[pack|next]||[definite-first|ordered]",
      "math-depth": "auto-add|add( <integer> )|<integer>",
      "math-shift": "normal|compact",
      "math-style": "normal|compact",
      "max-block-size": "<'max-width'>",
      "max-height": "none|<length-percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|stretch|<-non-standard-size>",
      "max-inline-size": "<'max-width'>",
      "max-lines": "none|<integer>",
      "max-width": "none|<length-percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|stretch|<-non-standard-size>",
      "min-block-size": "<'min-width'>",
      "min-height": "auto|<length>|<percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|stretch|<-non-standard-size>",
      "min-inline-size": "<'min-width'>",
      "min-width": "auto|<length>|<percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|stretch|<-non-standard-size>",
      "mix-blend-mode": "<blend-mode>|plus-lighter",
      "object-fit": "fill|contain|cover|none|scale-down",
      "object-position": "<position>",
      "offset": "[<'offset-position'>? [<'offset-path'> [<'offset-distance'>||<'offset-rotate'>]?]?]! [/ <'offset-anchor'>]?",
      "offset-anchor": "auto|<position>",
      "offset-distance": "<length-percentage>",
      "offset-path": "none|<offset-path>||<coord-box>",
      "offset-position": "normal|auto|<position>",
      "offset-rotate": "[auto|reverse]||<angle>",
      "opacity": "<alpha-value>",
      "order": "<integer>",
      "orphans": "<integer>",
      "outline": "[<'outline-width'>||<'outline-style'>||<'outline-color'>]",
      "outline-color": "auto|<color>",
      "outline-offset": "<length>",
      "outline-style": "auto|<'border-style'>",
      "outline-width": "<line-width>",
      "overflow": "[visible|hidden|clip|scroll|auto]{1,2}|<-non-standard-overflow>",
      "overflow-anchor": "auto|none",
      "overflow-block": "visible|hidden|clip|scroll|auto",
      "overflow-clip-box": "padding-box|content-box",
      "overflow-clip-margin": "<visual-box>||<length [0,\u221E]>",
      "overflow-inline": "visible|hidden|clip|scroll|auto",
      "overflow-wrap": "normal|break-word|anywhere",
      "overflow-x": "visible|hidden|clip|scroll|auto",
      "overflow-y": "visible|hidden|clip|scroll|auto",
      "overlay": "none|auto",
      "overscroll-behavior": "[contain|none|auto]{1,2}",
      "overscroll-behavior-block": "contain|none|auto",
      "overscroll-behavior-inline": "contain|none|auto",
      "overscroll-behavior-x": "contain|none|auto",
      "overscroll-behavior-y": "contain|none|auto",
      "padding": "[<length>|<percentage>]{1,4}",
      "padding-block": "<'padding-left'>{1,2}",
      "padding-block-end": "<'padding-left'>",
      "padding-block-start": "<'padding-left'>",
      "padding-bottom": "<length>|<percentage>",
      "padding-inline": "<'padding-left'>{1,2}",
      "padding-inline-end": "<'padding-left'>",
      "padding-inline-start": "<'padding-left'>",
      "padding-left": "<length>|<percentage>",
      "padding-right": "<length>|<percentage>",
      "padding-top": "<length>|<percentage>",
      "page": "auto|<custom-ident>",
      "page-break-after": "auto|always|avoid|left|right|recto|verso",
      "page-break-before": "auto|always|avoid|left|right|recto|verso",
      "page-break-inside": "auto|avoid",
      "paint-order": "normal|[fill||stroke||markers]",
      "perspective": "none|<length>",
      "perspective-origin": "<position>",
      "place-content": "<'align-content'> <'justify-content'>?",
      "place-items": "<'align-items'> <'justify-items'>?",
      "place-self": "<'align-self'> <'justify-self'>?",
      "pointer-events": "auto|none|visiblePainted|visibleFill|visibleStroke|visible|painted|fill|stroke|all|inherit",
      "position": "static|relative|absolute|sticky|fixed|-webkit-sticky",
      "position-anchor": "auto|<anchor-name>",
      "position-area": "none|<position-area>",
      "position-try": "<'position-try-order'>? <'position-try-fallbacks'>",
      "position-try-fallbacks": "none|[[<dashed-ident>||<try-tactic>]|<'position-area'>]#",
      "position-try-order": "normal|<try-size>",
      "position-visibility": "always|[anchors-valid||anchors-visible||no-overflow]",
      "print-color-adjust": "economy|exact",
      "quotes": "none|auto|[<string> <string>]+",
      "r": "<length>|<percentage>",
      "resize": "none|both|horizontal|vertical|block|inline",
      "right": "<length>|<percentage>|auto",
      "rotate": "none|<angle>|[x|y|z|<number>{3}]&&<angle>",
      "row-gap": "normal|<length-percentage>",
      "ruby-align": "start|center|space-between|space-around",
      "ruby-merge": "separate|collapse|auto",
      "ruby-position": "[alternate||[over|under]]|inter-character",
      "rx": "<length>|<percentage>",
      "ry": "<length>|<percentage>",
      "scale": "none|[<number>|<percentage>]{1,3}",
      "scrollbar-color": "auto|<color>{2}",
      "scrollbar-gutter": "auto|stable&&both-edges?",
      "scrollbar-width": "auto|thin|none",
      "scroll-behavior": "auto|smooth",
      "scroll-margin": "<length>{1,4}",
      "scroll-margin-block": "<length>{1,2}",
      "scroll-margin-block-start": "<length>",
      "scroll-margin-block-end": "<length>",
      "scroll-margin-bottom": "<length>",
      "scroll-margin-inline": "<length>{1,2}",
      "scroll-margin-inline-start": "<length>",
      "scroll-margin-inline-end": "<length>",
      "scroll-margin-left": "<length>",
      "scroll-margin-right": "<length>",
      "scroll-margin-top": "<length>",
      "scroll-padding": "[auto|<length-percentage>]{1,4}",
      "scroll-padding-block": "[auto|<length-percentage>]{1,2}",
      "scroll-padding-block-start": "auto|<length-percentage>",
      "scroll-padding-block-end": "auto|<length-percentage>",
      "scroll-padding-bottom": "auto|<length-percentage>",
      "scroll-padding-inline": "[auto|<length-percentage>]{1,2}",
      "scroll-padding-inline-start": "auto|<length-percentage>",
      "scroll-padding-inline-end": "auto|<length-percentage>",
      "scroll-padding-left": "auto|<length-percentage>",
      "scroll-padding-right": "auto|<length-percentage>",
      "scroll-padding-top": "auto|<length-percentage>",
      "scroll-snap-align": "[none|start|end|center]{1,2}",
      "scroll-snap-coordinate": "none|<position>#",
      "scroll-snap-destination": "<position>",
      "scroll-snap-points-x": "none|repeat( <length-percentage> )",
      "scroll-snap-points-y": "none|repeat( <length-percentage> )",
      "scroll-snap-stop": "normal|always",
      "scroll-snap-type": "none|[x|y|block|inline|both] [mandatory|proximity]?",
      "scroll-snap-type-x": "none|mandatory|proximity",
      "scroll-snap-type-y": "none|mandatory|proximity",
      "scroll-timeline": "[<'scroll-timeline-name'>||<'scroll-timeline-axis'>]#",
      "scroll-timeline-axis": "[block|inline|x|y]#",
      "scroll-timeline-name": "[none|<dashed-ident>]#",
      "shape-image-threshold": "<alpha-value>",
      "shape-margin": "<length-percentage>",
      "shape-outside": "none|[<shape-box>||<basic-shape>]|<image>",
      "shape-rendering": "auto|optimizeSpeed|crispEdges|geometricPrecision",
      "stroke": "<paint>",
      "stroke-dasharray": "none|[<svg-length>+]#",
      "stroke-dashoffset": "<svg-length>",
      "stroke-linecap": "butt|round|square",
      "stroke-linejoin": "miter|round|bevel",
      "stroke-miterlimit": "<number-one-or-greater>",
      "stroke-opacity": "<'opacity'>",
      "stroke-width": "<svg-length>",
      "tab-size": "<integer>|<length>",
      "table-layout": "auto|fixed",
      "text-align": "start|end|left|right|center|justify|match-parent",
      "text-align-last": "auto|start|end|left|right|center|justify",
      "text-anchor": "start|middle|end",
      "text-combine-upright": "none|all|[digits <integer>?]",
      "text-decoration": "<'text-decoration-line'>||<'text-decoration-style'>||<'text-decoration-color'>||<'text-decoration-thickness'>",
      "text-decoration-color": "<color>",
      "text-decoration-line": "none|[underline||overline||line-through||blink]|spelling-error|grammar-error",
      "text-decoration-skip": "none|[objects||[spaces|[leading-spaces||trailing-spaces]]||edges||box-decoration]",
      "text-decoration-skip-ink": "auto|all|none",
      "text-decoration-style": "solid|double|dotted|dashed|wavy",
      "text-decoration-thickness": "auto|from-font|<length>|<percentage>",
      "text-emphasis": "<'text-emphasis-style'>||<'text-emphasis-color'>",
      "text-emphasis-color": "<color>",
      "text-emphasis-position": "auto|[over|under]&&[right|left]?",
      "text-emphasis-style": "none|[[filled|open]||[dot|circle|double-circle|triangle|sesame]]|<string>",
      "text-indent": "<length-percentage>&&hanging?&&each-line?",
      "text-justify": "auto|inter-character|inter-word|none",
      "text-orientation": "mixed|upright|sideways",
      "text-overflow": "[clip|ellipsis|<string>]{1,2}",
      "text-rendering": "auto|optimizeSpeed|optimizeLegibility|geometricPrecision",
      "text-shadow": "none|<shadow-t>#",
      "text-size-adjust": "none|auto|<percentage>",
      "text-spacing-trim": "space-all|normal|space-first|trim-start|trim-both|trim-all|auto",
      "text-transform": "none|capitalize|uppercase|lowercase|full-width|full-size-kana",
      "text-underline-offset": "auto|<length>|<percentage>",
      "text-underline-position": "auto|from-font|[under||[left|right]]",
      "text-wrap": "<'text-wrap-mode'>||<'text-wrap-style'>",
      "text-wrap-mode": "auto|wrap|nowrap",
      "text-wrap-style": "auto|balance|stable|pretty",
      "timeline-scope": "none|<dashed-ident>#",
      "top": "<length>|<percentage>|auto",
      "touch-action": "auto|none|[[pan-x|pan-left|pan-right]||[pan-y|pan-up|pan-down]||pinch-zoom]|manipulation",
      "transform": "none|<transform-list>",
      "transform-box": "content-box|border-box|fill-box|stroke-box|view-box",
      "transform-origin": "[<length-percentage>|left|center|right|top|bottom]|[[<length-percentage>|left|center|right]&&[<length-percentage>|top|center|bottom]] <length>?",
      "transform-style": "flat|preserve-3d",
      "transition": "<single-transition>#",
      "transition-behavior": "<transition-behavior-value>#",
      "transition-delay": "<time>#",
      "transition-duration": "<time>#",
      "transition-property": "none|<single-transition-property>#",
      "transition-timing-function": "<easing-function>#",
      "translate": "none|<length-percentage> [<length-percentage> <length>?]?",
      "unicode-bidi": "normal|embed|isolate|bidi-override|isolate-override|plaintext|-moz-isolate|-moz-isolate-override|-moz-plaintext|-webkit-isolate|-webkit-isolate-override|-webkit-plaintext",
      "user-select": "auto|text|none|contain|all",
      "vector-effect": "none|non-scaling-stroke|non-scaling-size|non-rotation|fixed-position",
      "vertical-align": "baseline|sub|super|text-top|text-bottom|middle|top|bottom|<percentage>|<length>",
      "view-timeline": "[<'view-timeline-name'> <'view-timeline-axis'>?]#",
      "view-timeline-axis": "[block|inline|x|y]#",
      "view-timeline-inset": "[[auto|<length-percentage>]{1,2}]#",
      "view-timeline-name": "none|<dashed-ident>#",
      "view-transition-name": "none|<custom-ident>",
      "visibility": "visible|hidden|collapse",
      "white-space": "normal|pre|nowrap|pre-wrap|pre-line|break-spaces|[<'white-space-collapse'>||<'text-wrap'>||<'white-space-trim'>]",
      "white-space-collapse": "collapse|discard|preserve|preserve-breaks|preserve-spaces|break-spaces",
      "widows": "<integer>",
      "width": "auto|<length>|<percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|stretch|<-non-standard-size>",
      "will-change": "auto|<animateable-feature>#",
      "word-break": "normal|break-all|keep-all|break-word|auto-phrase",
      "word-spacing": "normal|<length>",
      "word-wrap": "normal|break-word",
      "writing-mode": "horizontal-tb|vertical-rl|vertical-lr|sideways-rl|sideways-lr|<svg-writing-mode>",
      "x": "<length>|<percentage>",
      "y": "<length>|<percentage>",
      "z-index": "auto|<integer>",
      "zoom": "normal|reset|<number>|<percentage>",
      "-moz-background-clip": "padding|border",
      "-moz-border-radius-bottomleft": "<'border-bottom-left-radius'>",
      "-moz-border-radius-bottomright": "<'border-bottom-right-radius'>",
      "-moz-border-radius-topleft": "<'border-top-left-radius'>",
      "-moz-border-radius-topright": "<'border-bottom-right-radius'>",
      "-moz-control-character-visibility": "visible|hidden",
      "-moz-osx-font-smoothing": "auto|grayscale",
      "-moz-user-select": "none|text|all|-moz-none",
      "-ms-flex-align": "start|end|center|baseline|stretch",
      "-ms-flex-item-align": "auto|start|end|center|baseline|stretch",
      "-ms-flex-line-pack": "start|end|center|justify|distribute|stretch",
      "-ms-flex-negative": "<'flex-shrink'>",
      "-ms-flex-pack": "start|end|center|justify|distribute",
      "-ms-flex-order": "<integer>",
      "-ms-flex-positive": "<'flex-grow'>",
      "-ms-flex-preferred-size": "<'flex-basis'>",
      "-ms-interpolation-mode": "nearest-neighbor|bicubic",
      "-ms-grid-column-align": "start|end|center|stretch",
      "-ms-grid-row-align": "start|end|center|stretch",
      "-ms-hyphenate-limit-last": "none|always|column|page|spread",
      "-webkit-background-clip": "[<box>|border|padding|content|text]#",
      "-webkit-column-break-after": "always|auto|avoid",
      "-webkit-column-break-before": "always|auto|avoid",
      "-webkit-column-break-inside": "always|auto|avoid",
      "-webkit-font-smoothing": "auto|none|antialiased|subpixel-antialiased",
      "-webkit-mask-box-image": "[<url>|<gradient>|none] [<length-percentage>{4} <-webkit-mask-box-repeat>{2}]?",
      "-webkit-print-color-adjust": "economy|exact",
      "-webkit-text-security": "none|circle|disc|square",
      "-webkit-user-drag": "none|element|auto",
      "-webkit-user-select": "auto|none|text|all",
      "alignment-baseline": "auto|baseline|before-edge|text-before-edge|middle|central|after-edge|text-after-edge|ideographic|alphabetic|hanging|mathematical",
      "baseline-shift": "baseline|sub|super|<svg-length>",
      "behavior": "<url>+",
      "cue": "<'cue-before'> <'cue-after'>?",
      "cue-after": "<url> <decibel>?|none",
      "cue-before": "<url> <decibel>?|none",
      "glyph-orientation-horizontal": "<angle>",
      "glyph-orientation-vertical": "<angle>",
      "kerning": "auto|<svg-length>",
      "pause": "<'pause-before'> <'pause-after'>?",
      "pause-after": "<time>|none|x-weak|weak|medium|strong|x-strong",
      "pause-before": "<time>|none|x-weak|weak|medium|strong|x-strong",
      "rest": "<'rest-before'> <'rest-after'>?",
      "rest-after": "<time>|none|x-weak|weak|medium|strong|x-strong",
      "rest-before": "<time>|none|x-weak|weak|medium|strong|x-strong",
      "src": "[<url> [format( <string># )]?|local( <family-name> )]#",
      "speak": "auto|never|always",
      "speak-as": "normal|spell-out||digits||[literal-punctuation|no-punctuation]",
      "unicode-range": "<urange>#",
      "voice-balance": "<number>|left|center|right|leftwards|rightwards",
      "voice-duration": "auto|<time>",
      "voice-family": "[[<family-name>|<generic-voice>] ,]* [<family-name>|<generic-voice>]|preserve",
      "voice-pitch": "<frequency>&&absolute|[[x-low|low|medium|high|x-high]||[<frequency>|<semitones>|<percentage>]]",
      "voice-range": "<frequency>&&absolute|[[x-low|low|medium|high|x-high]||[<frequency>|<semitones>|<percentage>]]",
      "voice-rate": "[normal|x-slow|slow|medium|fast|x-fast]||<percentage>",
      "voice-stress": "normal|strong|moderate|none|reduced",
      "voice-volume": "silent|[[x-soft|soft|medium|loud|x-loud]||<decibel>]",
      "white-space-trim": "none|discard-before||discard-after||discard-inner"
    },
    "atrules": {
      "charset": {
        "prelude": "<string>",
        "descriptors": null
      },
      "counter-style": {
        "prelude": "<counter-style-name>",
        "descriptors": {
          "additive-symbols": "[<integer>&&<symbol>]#",
          "fallback": "<counter-style-name>",
          "negative": "<symbol> <symbol>?",
          "pad": "<integer>&&<symbol>",
          "prefix": "<symbol>",
          "range": "[[<integer>|infinite]{2}]#|auto",
          "speak-as": "auto|bullets|numbers|words|spell-out|<counter-style-name>",
          "suffix": "<symbol>",
          "symbols": "<symbol>+",
          "system": "cyclic|numeric|alphabetic|symbolic|additive|[fixed <integer>?]|[extends <counter-style-name>]"
        }
      },
      "document": {
        "prelude": "[<url>|url-prefix( <string> )|domain( <string> )|media-document( <string> )|regexp( <string> )]#",
        "descriptors": null
      },
      "font-palette-values": {
        "prelude": "<dashed-ident>",
        "descriptors": {
          "base-palette": "light|dark|<integer [0,\u221E]>",
          "font-family": "<family-name>#",
          "override-colors": "[<integer [0,\u221E]> <absolute-color-base>]#"
        }
      },
      "font-face": {
        "prelude": null,
        "descriptors": {
          "ascent-override": "normal|<percentage>",
          "descent-override": "normal|<percentage>",
          "font-display": "[auto|block|swap|fallback|optional]",
          "font-family": "<family-name>",
          "font-feature-settings": "normal|<feature-tag-value>#",
          "font-variation-settings": "normal|[<string> <number>]#",
          "font-stretch": "<font-stretch-absolute>{1,2}",
          "font-style": "normal|italic|oblique <angle>{0,2}",
          "font-weight": "<font-weight-absolute>{1,2}",
          "line-gap-override": "normal|<percentage>",
          "size-adjust": "<percentage>",
          "src": "[<url> [format( <string># )]?|local( <family-name> )]#",
          "unicode-range": "<urange>#"
        }
      },
      "font-feature-values": {
        "prelude": "<family-name>#",
        "descriptors": null
      },
      "import": {
        "prelude": "[<string>|<url>] [layer|layer( <layer-name> )]? [supports( [<supports-condition>|<declaration>] )]? <media-query-list>?",
        "descriptors": null
      },
      "keyframes": {
        "prelude": "<keyframes-name>",
        "descriptors": null
      },
      "layer": {
        "prelude": "[<layer-name>#|<layer-name>?]",
        "descriptors": null
      },
      "media": {
        "prelude": "<media-query-list>",
        "descriptors": null
      },
      "namespace": {
        "prelude": "<namespace-prefix>? [<string>|<url>]",
        "descriptors": null
      },
      "page": {
        "prelude": "<page-selector-list>",
        "descriptors": {
          "bleed": "auto|<length>",
          "marks": "none|[crop||cross]",
          "page-orientation": "upright|rotate-left|rotate-right",
          "size": "<length>{1,2}|auto|[<page-size>||[portrait|landscape]]"
        }
      },
      "position-try": {
        "prelude": "<dashed-ident>",
        "descriptors": {
          "top": "<'top'>",
          "left": "<'left'>",
          "bottom": "<'bottom'>",
          "right": "<'right'>",
          "inset-block-start": "<'inset-block-start'>",
          "inset-block-end": "<'inset-block-end'>",
          "inset-inline-start": "<'inset-inline-start'>",
          "inset-inline-end": "<'inset-inline-end'>",
          "inset-block": "<'inset-block'>",
          "inset-inline": "<'inset-inline'>",
          "inset": "<'inset'>",
          "margin-top": "<'margin-top'>",
          "margin-left": "<'margin-left'>",
          "margin-bottom": "<'margin-bottom'>",
          "margin-right": "<'margin-right'>",
          "margin-block-start": "<'margin-block-start'>",
          "margin-block-end": "<'margin-block-end'>",
          "margin-inline-start": "<'margin-inline-start'>",
          "margin-inline-end": "<'margin-inline-end'>",
          "margin": "<'margin'>",
          "margin-block": "<'margin-block'>",
          "margin-inline": "<'margin-inline'>",
          "width": "<'width'>",
          "height": "<'height'>",
          "min-width": "<'min-width'>",
          "min-height": "<'min-height'>",
          "max-width": "<'max-width'>",
          "max-height": "<'max-height'>",
          "block-size": "<'block-size'>",
          "inline-size": "<'inline-size'>",
          "min-block-size": "<'min-block-size'>",
          "min-inline-size": "<'min-inline-size'>",
          "max-block-size": "<'max-block-size'>",
          "max-inline-size": "<'max-inline-size'>",
          "align-self": "<'align-self'>|anchor-center",
          "justify-self": "<'justify-self'>|anchor-center"
        }
      },
      "property": {
        "prelude": "<custom-property-name>",
        "descriptors": {
          "syntax": "<string>",
          "inherits": "true|false",
          "initial-value": "<declaration-value>?"
        }
      },
      "scope": {
        "prelude": "[( <scope-start> )]? [to ( <scope-end> )]?",
        "descriptors": null
      },
      "starting-style": {
        "prelude": null,
        "descriptors": null
      },
      "supports": {
        "prelude": "<supports-condition>",
        "descriptors": null
      },
      "container": {
        "prelude": "[<container-name>]? <container-condition>",
        "descriptors": null
      },
      "nest": {
        "prelude": "<complex-selector-list>",
        "descriptors": null
      }
    }
  };

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/index.js
  var node_exports = {};
  __export(node_exports, {
    AnPlusB: () => AnPlusB_exports,
    Atrule: () => Atrule_exports,
    AtrulePrelude: () => AtrulePrelude_exports,
    AttributeSelector: () => AttributeSelector_exports,
    Block: () => Block_exports,
    Brackets: () => Brackets_exports,
    CDC: () => CDC_exports,
    CDO: () => CDO_exports,
    ClassSelector: () => ClassSelector_exports,
    Combinator: () => Combinator_exports,
    Comment: () => Comment_exports,
    Condition: () => Condition_exports,
    Declaration: () => Declaration_exports,
    DeclarationList: () => DeclarationList_exports,
    Dimension: () => Dimension_exports,
    Feature: () => Feature_exports,
    FeatureFunction: () => FeatureFunction_exports,
    FeatureRange: () => FeatureRange_exports,
    Function: () => Function_exports,
    GeneralEnclosed: () => GeneralEnclosed_exports,
    Hash: () => Hash_exports,
    IdSelector: () => IdSelector_exports,
    Identifier: () => Identifier_exports,
    Layer: () => Layer_exports,
    LayerList: () => LayerList_exports,
    MediaQuery: () => MediaQuery_exports,
    MediaQueryList: () => MediaQueryList_exports,
    NestingSelector: () => NestingSelector_exports,
    Nth: () => Nth_exports,
    Number: () => Number_exports,
    Operator: () => Operator_exports,
    Parentheses: () => Parentheses_exports,
    Percentage: () => Percentage_exports,
    PseudoClassSelector: () => PseudoClassSelector_exports,
    PseudoElementSelector: () => PseudoElementSelector_exports,
    Ratio: () => Ratio_exports,
    Raw: () => Raw_exports,
    Rule: () => Rule_exports,
    Scope: () => Scope_exports,
    Selector: () => Selector_exports,
    SelectorList: () => SelectorList_exports,
    String: () => String_exports,
    StyleSheet: () => StyleSheet_exports,
    SupportsDeclaration: () => SupportsDeclaration_exports,
    TypeSelector: () => TypeSelector_exports,
    UnicodeRange: () => UnicodeRange_exports,
    Url: () => Url_exports,
    Value: () => Value_exports,
    WhiteSpace: () => WhiteSpace_exports
  });

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/AnPlusB.js
  var AnPlusB_exports = {};
  __export(AnPlusB_exports, {
    generate: () => generate2,
    name: () => name,
    parse: () => parse2,
    structure: () => structure
  });
  var PLUSSIGN5 = 43;
  var HYPHENMINUS5 = 45;
  var N5 = 110;
  var DISALLOW_SIGN2 = true;
  var ALLOW_SIGN2 = false;
  function checkInteger2(offset, disallowSign) {
    let pos = this.tokenStart + offset;
    const code3 = this.charCodeAt(pos);
    if (code3 === PLUSSIGN5 || code3 === HYPHENMINUS5) {
      if (disallowSign) {
        this.error("Number sign is not allowed");
      }
      pos++;
    }
    for (; pos < this.tokenEnd; pos++) {
      if (!isDigit(this.charCodeAt(pos))) {
        this.error("Integer is expected", pos);
      }
    }
  }
  function checkTokenIsInteger(disallowSign) {
    return checkInteger2.call(this, 0, disallowSign);
  }
  function expectCharCode(offset, code3) {
    if (!this.cmpChar(this.tokenStart + offset, code3)) {
      let msg = "";
      switch (code3) {
        case N5:
          msg = "N is expected";
          break;
        case HYPHENMINUS5:
          msg = "HyphenMinus is expected";
          break;
      }
      this.error(msg, this.tokenStart + offset);
    }
  }
  function consumeB2() {
    let offset = 0;
    let sign = 0;
    let type = this.tokenType;
    while (type === WhiteSpace || type === Comment) {
      type = this.lookupType(++offset);
    }
    if (type !== Number2) {
      if (this.isDelim(PLUSSIGN5, offset) || this.isDelim(HYPHENMINUS5, offset)) {
        sign = this.isDelim(PLUSSIGN5, offset) ? PLUSSIGN5 : HYPHENMINUS5;
        do {
          type = this.lookupType(++offset);
        } while (type === WhiteSpace || type === Comment);
        if (type !== Number2) {
          this.skip(offset);
          checkTokenIsInteger.call(this, DISALLOW_SIGN2);
        }
      } else {
        return null;
      }
    }
    if (offset > 0) {
      this.skip(offset);
    }
    if (sign === 0) {
      type = this.charCodeAt(this.tokenStart);
      if (type !== PLUSSIGN5 && type !== HYPHENMINUS5) {
        this.error("Number sign is expected");
      }
    }
    checkTokenIsInteger.call(this, sign !== 0);
    return sign === HYPHENMINUS5 ? "-" + this.consume(Number2) : this.consume(Number2);
  }
  var name = "AnPlusB";
  var structure = {
    a: [String, null],
    b: [String, null]
  };
  function parse2() {
    const start = this.tokenStart;
    let a = null;
    let b = null;
    if (this.tokenType === Number2) {
      checkTokenIsInteger.call(this, ALLOW_SIGN2);
      b = this.consume(Number2);
    } else if (this.tokenType === Ident && this.cmpChar(this.tokenStart, HYPHENMINUS5)) {
      a = "-1";
      expectCharCode.call(this, 1, N5);
      switch (this.tokenEnd - this.tokenStart) {
        // -n
        // -n <signed-integer>
        // -n ['+' | '-'] <signless-integer>
        case 2:
          this.next();
          b = consumeB2.call(this);
          break;
        // -n- <signless-integer>
        case 3:
          expectCharCode.call(this, 2, HYPHENMINUS5);
          this.next();
          this.skipSC();
          checkTokenIsInteger.call(this, DISALLOW_SIGN2);
          b = "-" + this.consume(Number2);
          break;
        // <dashndashdigit-ident>
        default:
          expectCharCode.call(this, 2, HYPHENMINUS5);
          checkInteger2.call(this, 3, DISALLOW_SIGN2);
          this.next();
          b = this.substrToCursor(start + 2);
      }
    } else if (this.tokenType === Ident || this.isDelim(PLUSSIGN5) && this.lookupType(1) === Ident) {
      let sign = 0;
      a = "1";
      if (this.isDelim(PLUSSIGN5)) {
        sign = 1;
        this.next();
      }
      expectCharCode.call(this, 0, N5);
      switch (this.tokenEnd - this.tokenStart) {
        // '+'? n
        // '+'? n <signed-integer>
        // '+'? n ['+' | '-'] <signless-integer>
        case 1:
          this.next();
          b = consumeB2.call(this);
          break;
        // '+'? n- <signless-integer>
        case 2:
          expectCharCode.call(this, 1, HYPHENMINUS5);
          this.next();
          this.skipSC();
          checkTokenIsInteger.call(this, DISALLOW_SIGN2);
          b = "-" + this.consume(Number2);
          break;
        // '+'? <ndashdigit-ident>
        default:
          expectCharCode.call(this, 1, HYPHENMINUS5);
          checkInteger2.call(this, 2, DISALLOW_SIGN2);
          this.next();
          b = this.substrToCursor(start + sign + 1);
      }
    } else if (this.tokenType === Dimension) {
      const code3 = this.charCodeAt(this.tokenStart);
      const sign = code3 === PLUSSIGN5 || code3 === HYPHENMINUS5;
      let i = this.tokenStart + sign;
      for (; i < this.tokenEnd; i++) {
        if (!isDigit(this.charCodeAt(i))) {
          break;
        }
      }
      if (i === this.tokenStart + sign) {
        this.error("Integer is expected", this.tokenStart + sign);
      }
      expectCharCode.call(this, i - this.tokenStart, N5);
      a = this.substring(start, i);
      if (i + 1 === this.tokenEnd) {
        this.next();
        b = consumeB2.call(this);
      } else {
        expectCharCode.call(this, i - this.tokenStart + 1, HYPHENMINUS5);
        if (i + 2 === this.tokenEnd) {
          this.next();
          this.skipSC();
          checkTokenIsInteger.call(this, DISALLOW_SIGN2);
          b = "-" + this.consume(Number2);
        } else {
          checkInteger2.call(this, i - this.tokenStart + 2, DISALLOW_SIGN2);
          this.next();
          b = this.substrToCursor(i + 1);
        }
      }
    } else {
      this.error();
    }
    if (a !== null && a.charCodeAt(0) === PLUSSIGN5) {
      a = a.substr(1);
    }
    if (b !== null && b.charCodeAt(0) === PLUSSIGN5) {
      b = b.substr(1);
    }
    return {
      type: "AnPlusB",
      loc: this.getLocation(start, this.tokenStart),
      a,
      b
    };
  }
  function generate2(node) {
    if (node.a) {
      const a = node.a === "+1" && "n" || node.a === "1" && "n" || node.a === "-1" && "-n" || node.a + "n";
      if (node.b) {
        const b = node.b[0] === "-" || node.b[0] === "+" ? node.b : "+" + node.b;
        this.tokenize(a + b);
      } else {
        this.tokenize(a);
      }
    } else {
      this.tokenize(node.b);
    }
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/Atrule.js
  var Atrule_exports = {};
  __export(Atrule_exports, {
    generate: () => generate3,
    name: () => name2,
    parse: () => parse3,
    structure: () => structure2,
    walkContext: () => walkContext
  });
  function consumeRaw() {
    return this.Raw(this.consumeUntilLeftCurlyBracketOrSemicolon, true);
  }
  function isDeclarationBlockAtrule() {
    for (let offset = 1, type; type = this.lookupType(offset); offset++) {
      if (type === RightCurlyBracket) {
        return true;
      }
      if (type === LeftCurlyBracket || type === AtKeyword) {
        return false;
      }
    }
    return false;
  }
  var name2 = "Atrule";
  var walkContext = "atrule";
  var structure2 = {
    name: String,
    prelude: ["AtrulePrelude", "Raw", null],
    block: ["Block", null]
  };
  function parse3(isDeclaration = false) {
    const start = this.tokenStart;
    let name50;
    let nameLowerCase;
    let prelude = null;
    let block2 = null;
    this.eat(AtKeyword);
    name50 = this.substrToCursor(start + 1);
    nameLowerCase = name50.toLowerCase();
    this.skipSC();
    if (this.eof === false && this.tokenType !== LeftCurlyBracket && this.tokenType !== Semicolon) {
      if (this.parseAtrulePrelude) {
        prelude = this.parseWithFallback(this.AtrulePrelude.bind(this, name50, isDeclaration), consumeRaw);
      } else {
        prelude = consumeRaw.call(this, this.tokenIndex);
      }
      this.skipSC();
    }
    switch (this.tokenType) {
      case Semicolon:
        this.next();
        break;
      case LeftCurlyBracket:
        if (hasOwnProperty.call(this.atrule, nameLowerCase) && typeof this.atrule[nameLowerCase].block === "function") {
          block2 = this.atrule[nameLowerCase].block.call(this, isDeclaration);
        } else {
          block2 = this.Block(isDeclarationBlockAtrule.call(this));
        }
        break;
    }
    return {
      type: "Atrule",
      loc: this.getLocation(start, this.tokenStart),
      name: name50,
      prelude,
      block: block2
    };
  }
  function generate3(node) {
    this.token(AtKeyword, "@" + node.name);
    if (node.prelude !== null) {
      this.node(node.prelude);
    }
    if (node.block) {
      this.node(node.block);
    } else {
      this.token(Semicolon, ";");
    }
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/AtrulePrelude.js
  var AtrulePrelude_exports = {};
  __export(AtrulePrelude_exports, {
    generate: () => generate4,
    name: () => name3,
    parse: () => parse4,
    structure: () => structure3,
    walkContext: () => walkContext2
  });
  var name3 = "AtrulePrelude";
  var walkContext2 = "atrulePrelude";
  var structure3 = {
    children: [[]]
  };
  function parse4(name50) {
    let children = null;
    if (name50 !== null) {
      name50 = name50.toLowerCase();
    }
    this.skipSC();
    if (hasOwnProperty.call(this.atrule, name50) && typeof this.atrule[name50].prelude === "function") {
      children = this.atrule[name50].prelude.call(this);
    } else {
      children = this.readSequence(this.scope.AtrulePrelude);
    }
    this.skipSC();
    if (this.eof !== true && this.tokenType !== LeftCurlyBracket && this.tokenType !== Semicolon) {
      this.error("Semicolon or block is expected");
    }
    return {
      type: "AtrulePrelude",
      loc: this.getLocationFromList(children),
      children
    };
  }
  function generate4(node) {
    this.children(node);
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/AttributeSelector.js
  var AttributeSelector_exports = {};
  __export(AttributeSelector_exports, {
    generate: () => generate5,
    name: () => name4,
    parse: () => parse5,
    structure: () => structure4
  });
  var DOLLARSIGN = 36;
  var ASTERISK2 = 42;
  var EQUALSSIGN = 61;
  var CIRCUMFLEXACCENT = 94;
  var VERTICALLINE2 = 124;
  var TILDE = 126;
  function getAttributeName() {
    if (this.eof) {
      this.error("Unexpected end of input");
    }
    const start = this.tokenStart;
    let expectIdent = false;
    if (this.isDelim(ASTERISK2)) {
      expectIdent = true;
      this.next();
    } else if (!this.isDelim(VERTICALLINE2)) {
      this.eat(Ident);
    }
    if (this.isDelim(VERTICALLINE2)) {
      if (this.charCodeAt(this.tokenStart + 1) !== EQUALSSIGN) {
        this.next();
        this.eat(Ident);
      } else if (expectIdent) {
        this.error("Identifier is expected", this.tokenEnd);
      }
    } else if (expectIdent) {
      this.error("Vertical line is expected");
    }
    return {
      type: "Identifier",
      loc: this.getLocation(start, this.tokenStart),
      name: this.substrToCursor(start)
    };
  }
  function getOperator() {
    const start = this.tokenStart;
    const code3 = this.charCodeAt(start);
    if (code3 !== EQUALSSIGN && // =
    code3 !== TILDE && // ~=
    code3 !== CIRCUMFLEXACCENT && // ^=
    code3 !== DOLLARSIGN && // $=
    code3 !== ASTERISK2 && // *=
    code3 !== VERTICALLINE2) {
      this.error("Attribute selector (=, ~=, ^=, $=, *=, |=) is expected");
    }
    this.next();
    if (code3 !== EQUALSSIGN) {
      if (!this.isDelim(EQUALSSIGN)) {
        this.error("Equal sign is expected");
      }
      this.next();
    }
    return this.substrToCursor(start);
  }
  var name4 = "AttributeSelector";
  var structure4 = {
    name: "Identifier",
    matcher: [String, null],
    value: ["String", "Identifier", null],
    flags: [String, null]
  };
  function parse5() {
    const start = this.tokenStart;
    let name50;
    let matcher = null;
    let value = null;
    let flags = null;
    this.eat(LeftSquareBracket);
    this.skipSC();
    name50 = getAttributeName.call(this);
    this.skipSC();
    if (this.tokenType !== RightSquareBracket) {
      if (this.tokenType !== Ident) {
        matcher = getOperator.call(this);
        this.skipSC();
        value = this.tokenType === String2 ? this.String() : this.Identifier();
        this.skipSC();
      }
      if (this.tokenType === Ident) {
        flags = this.consume(Ident);
        this.skipSC();
      }
    }
    this.eat(RightSquareBracket);
    return {
      type: "AttributeSelector",
      loc: this.getLocation(start, this.tokenStart),
      name: name50,
      matcher,
      value,
      flags
    };
  }
  function generate5(node) {
    this.token(Delim, "[");
    this.node(node.name);
    if (node.matcher !== null) {
      this.tokenize(node.matcher);
      this.node(node.value);
    }
    if (node.flags !== null) {
      this.token(Ident, node.flags);
    }
    this.token(Delim, "]");
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/Block.js
  var Block_exports = {};
  __export(Block_exports, {
    generate: () => generate6,
    name: () => name5,
    parse: () => parse6,
    structure: () => structure5,
    walkContext: () => walkContext3
  });
  var AMPERSAND2 = 38;
  function consumeRaw2() {
    return this.Raw(null, true);
  }
  function consumeRule() {
    return this.parseWithFallback(this.Rule, consumeRaw2);
  }
  function consumeRawDeclaration() {
    return this.Raw(this.consumeUntilSemicolonIncluded, true);
  }
  function consumeDeclaration() {
    if (this.tokenType === Semicolon) {
      return consumeRawDeclaration.call(this, this.tokenIndex);
    }
    const node = this.parseWithFallback(this.Declaration, consumeRawDeclaration);
    if (this.tokenType === Semicolon) {
      this.next();
    }
    return node;
  }
  var name5 = "Block";
  var walkContext3 = "block";
  var structure5 = {
    children: [[
      "Atrule",
      "Rule",
      "Declaration"
    ]]
  };
  function parse6(isStyleBlock) {
    const consumer = isStyleBlock ? consumeDeclaration : consumeRule;
    const start = this.tokenStart;
    let children = this.createList();
    this.eat(LeftCurlyBracket);
    scan:
      while (!this.eof) {
        switch (this.tokenType) {
          case RightCurlyBracket:
            break scan;
          case WhiteSpace:
          case Comment:
            this.next();
            break;
          case AtKeyword:
            children.push(this.parseWithFallback(this.Atrule.bind(this, isStyleBlock), consumeRaw2));
            break;
          default:
            if (isStyleBlock && this.isDelim(AMPERSAND2)) {
              children.push(consumeRule.call(this));
            } else {
              children.push(consumer.call(this));
            }
        }
      }
    if (!this.eof) {
      this.eat(RightCurlyBracket);
    }
    return {
      type: "Block",
      loc: this.getLocation(start, this.tokenStart),
      children
    };
  }
  function generate6(node) {
    this.token(LeftCurlyBracket, "{");
    this.children(node, (prev) => {
      if (prev.type === "Declaration") {
        this.token(Semicolon, ";");
      }
    });
    this.token(RightCurlyBracket, "}");
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/Brackets.js
  var Brackets_exports = {};
  __export(Brackets_exports, {
    generate: () => generate7,
    name: () => name6,
    parse: () => parse7,
    structure: () => structure6
  });
  var name6 = "Brackets";
  var structure6 = {
    children: [[]]
  };
  function parse7(readSequence2, recognizer) {
    const start = this.tokenStart;
    let children = null;
    this.eat(LeftSquareBracket);
    children = readSequence2.call(this, recognizer);
    if (!this.eof) {
      this.eat(RightSquareBracket);
    }
    return {
      type: "Brackets",
      loc: this.getLocation(start, this.tokenStart),
      children
    };
  }
  function generate7(node) {
    this.token(Delim, "[");
    this.children(node);
    this.token(Delim, "]");
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/CDC.js
  var CDC_exports = {};
  __export(CDC_exports, {
    generate: () => generate8,
    name: () => name7,
    parse: () => parse8,
    structure: () => structure7
  });
  var name7 = "CDC";
  var structure7 = [];
  function parse8() {
    const start = this.tokenStart;
    this.eat(CDC);
    return {
      type: "CDC",
      loc: this.getLocation(start, this.tokenStart)
    };
  }
  function generate8() {
    this.token(CDC, "-->");
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/CDO.js
  var CDO_exports = {};
  __export(CDO_exports, {
    generate: () => generate9,
    name: () => name8,
    parse: () => parse9,
    structure: () => structure8
  });
  var name8 = "CDO";
  var structure8 = [];
  function parse9() {
    const start = this.tokenStart;
    this.eat(CDO);
    return {
      type: "CDO",
      loc: this.getLocation(start, this.tokenStart)
    };
  }
  function generate9() {
    this.token(CDO, "<!--");
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/ClassSelector.js
  var ClassSelector_exports = {};
  __export(ClassSelector_exports, {
    generate: () => generate10,
    name: () => name9,
    parse: () => parse10,
    structure: () => structure9
  });
  var FULLSTOP = 46;
  var name9 = "ClassSelector";
  var structure9 = {
    name: String
  };
  function parse10() {
    this.eatDelim(FULLSTOP);
    return {
      type: "ClassSelector",
      loc: this.getLocation(this.tokenStart - 1, this.tokenEnd),
      name: this.consume(Ident)
    };
  }
  function generate10(node) {
    this.token(Delim, ".");
    this.token(Ident, node.name);
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/Combinator.js
  var Combinator_exports = {};
  __export(Combinator_exports, {
    generate: () => generate11,
    name: () => name10,
    parse: () => parse11,
    structure: () => structure10
  });
  var PLUSSIGN6 = 43;
  var SOLIDUS = 47;
  var GREATERTHANSIGN2 = 62;
  var TILDE2 = 126;
  var name10 = "Combinator";
  var structure10 = {
    name: String
  };
  function parse11() {
    const start = this.tokenStart;
    let name50;
    switch (this.tokenType) {
      case WhiteSpace:
        name50 = " ";
        break;
      case Delim:
        switch (this.charCodeAt(this.tokenStart)) {
          case GREATERTHANSIGN2:
          case PLUSSIGN6:
          case TILDE2:
            this.next();
            break;
          case SOLIDUS:
            this.next();
            this.eatIdent("deep");
            this.eatDelim(SOLIDUS);
            break;
          default:
            this.error("Combinator is expected");
        }
        name50 = this.substrToCursor(start);
        break;
    }
    return {
      type: "Combinator",
      loc: this.getLocation(start, this.tokenStart),
      name: name50
    };
  }
  function generate11(node) {
    this.tokenize(node.name);
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/Comment.js
  var Comment_exports = {};
  __export(Comment_exports, {
    generate: () => generate12,
    name: () => name11,
    parse: () => parse12,
    structure: () => structure11
  });
  var ASTERISK3 = 42;
  var SOLIDUS2 = 47;
  var name11 = "Comment";
  var structure11 = {
    value: String
  };
  function parse12() {
    const start = this.tokenStart;
    let end = this.tokenEnd;
    this.eat(Comment);
    if (end - start + 2 >= 2 && this.charCodeAt(end - 2) === ASTERISK3 && this.charCodeAt(end - 1) === SOLIDUS2) {
      end -= 2;
    }
    return {
      type: "Comment",
      loc: this.getLocation(start, this.tokenStart),
      value: this.substring(start + 2, end)
    };
  }
  function generate12(node) {
    this.token(Comment, "/*" + node.value + "*/");
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/Condition.js
  var Condition_exports = {};
  __export(Condition_exports, {
    generate: () => generate13,
    name: () => name12,
    parse: () => parse13,
    structure: () => structure12
  });
  var likelyFeatureToken = /* @__PURE__ */ new Set([Colon, RightParenthesis, EOF]);
  var name12 = "Condition";
  var structure12 = {
    kind: String,
    children: [[
      "Identifier",
      "Feature",
      "FeatureFunction",
      "FeatureRange",
      "SupportsDeclaration"
    ]]
  };
  function featureOrRange(kind) {
    if (this.lookupTypeNonSC(1) === Ident && likelyFeatureToken.has(this.lookupTypeNonSC(2))) {
      return this.Feature(kind);
    }
    return this.FeatureRange(kind);
  }
  var parentheses = {
    media: featureOrRange,
    container: featureOrRange,
    supports() {
      return this.SupportsDeclaration();
    }
  };
  function parse13(kind = "media") {
    const children = this.createList();
    scan: while (!this.eof) {
      switch (this.tokenType) {
        case Comment:
        case WhiteSpace:
          this.next();
          continue;
        case Ident:
          children.push(this.Identifier());
          break;
        case LeftParenthesis: {
          let term = this.parseWithFallback(
            () => parentheses[kind].call(this, kind),
            () => null
          );
          if (!term) {
            term = this.parseWithFallback(
              () => {
                this.eat(LeftParenthesis);
                const res = this.Condition(kind);
                this.eat(RightParenthesis);
                return res;
              },
              () => {
                return this.GeneralEnclosed(kind);
              }
            );
          }
          children.push(term);
          break;
        }
        case Function2: {
          let term = this.parseWithFallback(
            () => this.FeatureFunction(kind),
            () => null
          );
          if (!term) {
            term = this.GeneralEnclosed(kind);
          }
          children.push(term);
          break;
        }
        default:
          break scan;
      }
    }
    if (children.isEmpty) {
      this.error("Condition is expected");
    }
    return {
      type: "Condition",
      loc: this.getLocationFromList(children),
      kind,
      children
    };
  }
  function generate13(node) {
    node.children.forEach((child) => {
      if (child.type === "Condition") {
        this.token(LeftParenthesis, "(");
        this.node(child);
        this.token(RightParenthesis, ")");
      } else {
        this.node(child);
      }
    });
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/Declaration.js
  var Declaration_exports = {};
  __export(Declaration_exports, {
    generate: () => generate14,
    name: () => name13,
    parse: () => parse14,
    structure: () => structure13,
    walkContext: () => walkContext4
  });
  var EXCLAMATIONMARK3 = 33;
  var NUMBERSIGN3 = 35;
  var DOLLARSIGN2 = 36;
  var AMPERSAND3 = 38;
  var ASTERISK4 = 42;
  var PLUSSIGN7 = 43;
  var SOLIDUS3 = 47;
  function consumeValueRaw() {
    return this.Raw(this.consumeUntilExclamationMarkOrSemicolon, true);
  }
  function consumeCustomPropertyRaw() {
    return this.Raw(this.consumeUntilExclamationMarkOrSemicolon, false);
  }
  function consumeValue() {
    const startValueToken = this.tokenIndex;
    const value = this.Value();
    if (value.type !== "Raw" && this.eof === false && this.tokenType !== Semicolon && this.isDelim(EXCLAMATIONMARK3) === false && this.isBalanceEdge(startValueToken) === false) {
      this.error();
    }
    return value;
  }
  var name13 = "Declaration";
  var walkContext4 = "declaration";
  var structure13 = {
    important: [Boolean, String],
    property: String,
    value: ["Value", "Raw"]
  };
  function parse14() {
    const start = this.tokenStart;
    const startToken = this.tokenIndex;
    const property2 = readProperty2.call(this);
    const customProperty = isCustomProperty(property2);
    const parseValue = customProperty ? this.parseCustomProperty : this.parseValue;
    const consumeRaw6 = customProperty ? consumeCustomPropertyRaw : consumeValueRaw;
    let important = false;
    let value;
    this.skipSC();
    this.eat(Colon);
    const valueStart = this.tokenIndex;
    if (!customProperty) {
      this.skipSC();
    }
    if (parseValue) {
      value = this.parseWithFallback(consumeValue, consumeRaw6);
    } else {
      value = consumeRaw6.call(this, this.tokenIndex);
    }
    if (customProperty && value.type === "Value" && value.children.isEmpty) {
      for (let offset = valueStart - this.tokenIndex; offset <= 0; offset++) {
        if (this.lookupType(offset) === WhiteSpace) {
          value.children.appendData({
            type: "WhiteSpace",
            loc: null,
            value: " "
          });
          break;
        }
      }
    }
    if (this.isDelim(EXCLAMATIONMARK3)) {
      important = getImportant.call(this);
      this.skipSC();
    }
    if (this.eof === false && this.tokenType !== Semicolon && this.isBalanceEdge(startToken) === false) {
      this.error();
    }
    return {
      type: "Declaration",
      loc: this.getLocation(start, this.tokenStart),
      important,
      property: property2,
      value
    };
  }
  function generate14(node) {
    this.token(Ident, node.property);
    this.token(Colon, ":");
    this.node(node.value);
    if (node.important) {
      this.token(Delim, "!");
      this.token(Ident, node.important === true ? "important" : node.important);
    }
  }
  function readProperty2() {
    const start = this.tokenStart;
    if (this.tokenType === Delim) {
      switch (this.charCodeAt(this.tokenStart)) {
        case ASTERISK4:
        case DOLLARSIGN2:
        case PLUSSIGN7:
        case NUMBERSIGN3:
        case AMPERSAND3:
          this.next();
          break;
        // TODO: not sure we should support this hack
        case SOLIDUS3:
          this.next();
          if (this.isDelim(SOLIDUS3)) {
            this.next();
          }
          break;
      }
    }
    if (this.tokenType === Hash) {
      this.eat(Hash);
    } else {
      this.eat(Ident);
    }
    return this.substrToCursor(start);
  }
  function getImportant() {
    this.eat(Delim);
    this.skipSC();
    const important = this.consume(Ident);
    return important === "important" ? true : important;
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/DeclarationList.js
  var DeclarationList_exports = {};
  __export(DeclarationList_exports, {
    generate: () => generate15,
    name: () => name14,
    parse: () => parse15,
    structure: () => structure14
  });
  var AMPERSAND4 = 38;
  function consumeRaw3() {
    return this.Raw(this.consumeUntilSemicolonIncluded, true);
  }
  var name14 = "DeclarationList";
  var structure14 = {
    children: [[
      "Declaration",
      "Atrule",
      "Rule"
    ]]
  };
  function parse15() {
    const children = this.createList();
    scan:
      while (!this.eof) {
        switch (this.tokenType) {
          case WhiteSpace:
          case Comment:
          case Semicolon:
            this.next();
            break;
          case AtKeyword:
            children.push(this.parseWithFallback(this.Atrule.bind(this, true), consumeRaw3));
            break;
          default:
            if (this.isDelim(AMPERSAND4)) {
              children.push(this.parseWithFallback(this.Rule, consumeRaw3));
            } else {
              children.push(this.parseWithFallback(this.Declaration, consumeRaw3));
            }
        }
      }
    return {
      type: "DeclarationList",
      loc: this.getLocationFromList(children),
      children
    };
  }
  function generate15(node) {
    this.children(node, (prev) => {
      if (prev.type === "Declaration") {
        this.token(Semicolon, ";");
      }
    });
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/Dimension.js
  var Dimension_exports = {};
  __export(Dimension_exports, {
    generate: () => generate16,
    name: () => name15,
    parse: () => parse16,
    structure: () => structure15
  });
  var name15 = "Dimension";
  var structure15 = {
    value: String,
    unit: String
  };
  function parse16() {
    const start = this.tokenStart;
    const value = this.consumeNumber(Dimension);
    return {
      type: "Dimension",
      loc: this.getLocation(start, this.tokenStart),
      value,
      unit: this.substring(start + value.length, this.tokenStart)
    };
  }
  function generate16(node) {
    this.token(Dimension, node.value + node.unit);
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/Feature.js
  var Feature_exports = {};
  __export(Feature_exports, {
    generate: () => generate17,
    name: () => name16,
    parse: () => parse17,
    structure: () => structure16
  });
  var SOLIDUS4 = 47;
  var name16 = "Feature";
  var structure16 = {
    kind: String,
    name: String,
    value: ["Identifier", "Number", "Dimension", "Ratio", "Function", null]
  };
  function parse17(kind) {
    const start = this.tokenStart;
    let name50;
    let value = null;
    this.eat(LeftParenthesis);
    this.skipSC();
    name50 = this.consume(Ident);
    this.skipSC();
    if (this.tokenType !== RightParenthesis) {
      this.eat(Colon);
      this.skipSC();
      switch (this.tokenType) {
        case Number2:
          if (this.lookupNonWSType(1) === Delim) {
            value = this.Ratio();
          } else {
            value = this.Number();
          }
          break;
        case Dimension:
          value = this.Dimension();
          break;
        case Ident:
          value = this.Identifier();
          break;
        case Function2:
          value = this.parseWithFallback(
            () => {
              const res = this.Function(this.readSequence, this.scope.Value);
              this.skipSC();
              if (this.isDelim(SOLIDUS4)) {
                this.error();
              }
              return res;
            },
            () => {
              return this.Ratio();
            }
          );
          break;
        default:
          this.error("Number, dimension, ratio or identifier is expected");
      }
      this.skipSC();
    }
    if (!this.eof) {
      this.eat(RightParenthesis);
    }
    return {
      type: "Feature",
      loc: this.getLocation(start, this.tokenStart),
      kind,
      name: name50,
      value
    };
  }
  function generate17(node) {
    this.token(LeftParenthesis, "(");
    this.token(Ident, node.name);
    if (node.value !== null) {
      this.token(Colon, ":");
      this.node(node.value);
    }
    this.token(RightParenthesis, ")");
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/FeatureFunction.js
  var FeatureFunction_exports = {};
  __export(FeatureFunction_exports, {
    generate: () => generate18,
    name: () => name17,
    parse: () => parse18,
    structure: () => structure17
  });
  var name17 = "FeatureFunction";
  var structure17 = {
    kind: String,
    feature: String,
    value: ["Declaration", "Selector"]
  };
  function getFeatureParser(kind, name50) {
    const featuresOfKind = this.features[kind] || {};
    const parser = featuresOfKind[name50];
    if (typeof parser !== "function") {
      this.error(`Unknown feature ${name50}()`);
    }
    return parser;
  }
  function parse18(kind = "unknown") {
    const start = this.tokenStart;
    const functionName = this.consumeFunctionName();
    const valueParser = getFeatureParser.call(this, kind, functionName.toLowerCase());
    this.skipSC();
    const value = this.parseWithFallback(
      () => {
        const startValueToken = this.tokenIndex;
        const value2 = valueParser.call(this);
        if (this.eof === false && this.isBalanceEdge(startValueToken) === false) {
          this.error();
        }
        return value2;
      },
      () => this.Raw(null, false)
    );
    if (!this.eof) {
      this.eat(RightParenthesis);
    }
    return {
      type: "FeatureFunction",
      loc: this.getLocation(start, this.tokenStart),
      kind,
      feature: functionName,
      value
    };
  }
  function generate18(node) {
    this.token(Function2, node.feature + "(");
    this.node(node.value);
    this.token(RightParenthesis, ")");
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/FeatureRange.js
  var FeatureRange_exports = {};
  __export(FeatureRange_exports, {
    generate: () => generate19,
    name: () => name18,
    parse: () => parse19,
    structure: () => structure18
  });
  var SOLIDUS5 = 47;
  var LESSTHANSIGN2 = 60;
  var EQUALSSIGN2 = 61;
  var GREATERTHANSIGN3 = 62;
  var name18 = "FeatureRange";
  var structure18 = {
    kind: String,
    left: ["Identifier", "Number", "Dimension", "Ratio", "Function"],
    leftComparison: String,
    middle: ["Identifier", "Number", "Dimension", "Ratio", "Function"],
    rightComparison: [String, null],
    right: ["Identifier", "Number", "Dimension", "Ratio", "Function", null]
  };
  function readTerm() {
    this.skipSC();
    switch (this.tokenType) {
      case Number2:
        if (this.isDelim(SOLIDUS5, this.lookupOffsetNonSC(1))) {
          return this.Ratio();
        } else {
          return this.Number();
        }
      case Dimension:
        return this.Dimension();
      case Ident:
        return this.Identifier();
      case Function2:
        return this.parseWithFallback(
          () => {
            const res = this.Function(this.readSequence, this.scope.Value);
            this.skipSC();
            if (this.isDelim(SOLIDUS5)) {
              this.error();
            }
            return res;
          },
          () => {
            return this.Ratio();
          }
        );
      default:
        this.error("Number, dimension, ratio or identifier is expected");
    }
  }
  function readComparison(expectColon) {
    this.skipSC();
    if (this.isDelim(LESSTHANSIGN2) || this.isDelim(GREATERTHANSIGN3)) {
      const value = this.source[this.tokenStart];
      this.next();
      if (this.isDelim(EQUALSSIGN2)) {
        this.next();
        return value + "=";
      }
      return value;
    }
    if (this.isDelim(EQUALSSIGN2)) {
      return "=";
    }
    this.error(`Expected ${expectColon ? '":", ' : ""}"<", ">", "=" or ")"`);
  }
  function parse19(kind = "unknown") {
    const start = this.tokenStart;
    this.skipSC();
    this.eat(LeftParenthesis);
    const left = readTerm.call(this);
    const leftComparison = readComparison.call(this, left.type === "Identifier");
    const middle = readTerm.call(this);
    let rightComparison = null;
    let right = null;
    if (this.lookupNonWSType(0) !== RightParenthesis) {
      rightComparison = readComparison.call(this);
      right = readTerm.call(this);
    }
    this.skipSC();
    this.eat(RightParenthesis);
    return {
      type: "FeatureRange",
      loc: this.getLocation(start, this.tokenStart),
      kind,
      left,
      leftComparison,
      middle,
      rightComparison,
      right
    };
  }
  function generate19(node) {
    this.token(LeftParenthesis, "(");
    this.node(node.left);
    this.tokenize(node.leftComparison);
    this.node(node.middle);
    if (node.right) {
      this.tokenize(node.rightComparison);
      this.node(node.right);
    }
    this.token(RightParenthesis, ")");
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/Function.js
  var Function_exports = {};
  __export(Function_exports, {
    generate: () => generate20,
    name: () => name19,
    parse: () => parse20,
    structure: () => structure19,
    walkContext: () => walkContext5
  });
  var name19 = "Function";
  var walkContext5 = "function";
  var structure19 = {
    name: String,
    children: [[]]
  };
  function parse20(readSequence2, recognizer) {
    const start = this.tokenStart;
    const name50 = this.consumeFunctionName();
    const nameLowerCase = name50.toLowerCase();
    let children;
    children = recognizer.hasOwnProperty(nameLowerCase) ? recognizer[nameLowerCase].call(this, recognizer) : readSequence2.call(this, recognizer);
    if (!this.eof) {
      this.eat(RightParenthesis);
    }
    return {
      type: "Function",
      loc: this.getLocation(start, this.tokenStart),
      name: name50,
      children
    };
  }
  function generate20(node) {
    this.token(Function2, node.name + "(");
    this.children(node);
    this.token(RightParenthesis, ")");
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/GeneralEnclosed.js
  var GeneralEnclosed_exports = {};
  __export(GeneralEnclosed_exports, {
    generate: () => generate21,
    name: () => name20,
    parse: () => parse21,
    structure: () => structure20
  });
  var name20 = "GeneralEnclosed";
  var structure20 = {
    kind: String,
    function: [String, null],
    children: [[]]
  };
  function parse21(kind) {
    const start = this.tokenStart;
    let functionName = null;
    if (this.tokenType === Function2) {
      functionName = this.consumeFunctionName();
    } else {
      this.eat(LeftParenthesis);
    }
    const children = this.parseWithFallback(
      () => {
        const startValueToken = this.tokenIndex;
        const children2 = this.readSequence(this.scope.Value);
        if (this.eof === false && this.isBalanceEdge(startValueToken) === false) {
          this.error();
        }
        return children2;
      },
      () => this.createSingleNodeList(
        this.Raw(null, false)
      )
    );
    if (!this.eof) {
      this.eat(RightParenthesis);
    }
    return {
      type: "GeneralEnclosed",
      loc: this.getLocation(start, this.tokenStart),
      kind,
      function: functionName,
      children
    };
  }
  function generate21(node) {
    if (node.function) {
      this.token(Function2, node.function + "(");
    } else {
      this.token(LeftParenthesis, "(");
    }
    this.children(node);
    this.token(RightParenthesis, ")");
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/Hash.js
  var Hash_exports = {};
  __export(Hash_exports, {
    generate: () => generate22,
    name: () => name21,
    parse: () => parse22,
    structure: () => structure21,
    xxx: () => xxx
  });
  var xxx = "XXX";
  var name21 = "Hash";
  var structure21 = {
    value: String
  };
  function parse22() {
    const start = this.tokenStart;
    this.eat(Hash);
    return {
      type: "Hash",
      loc: this.getLocation(start, this.tokenStart),
      value: this.substrToCursor(start + 1)
    };
  }
  function generate22(node) {
    this.token(Hash, "#" + node.value);
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/Identifier.js
  var Identifier_exports = {};
  __export(Identifier_exports, {
    generate: () => generate23,
    name: () => name22,
    parse: () => parse23,
    structure: () => structure22
  });
  var name22 = "Identifier";
  var structure22 = {
    name: String
  };
  function parse23() {
    return {
      type: "Identifier",
      loc: this.getLocation(this.tokenStart, this.tokenEnd),
      name: this.consume(Ident)
    };
  }
  function generate23(node) {
    this.token(Ident, node.name);
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/IdSelector.js
  var IdSelector_exports = {};
  __export(IdSelector_exports, {
    generate: () => generate24,
    name: () => name23,
    parse: () => parse24,
    structure: () => structure23
  });
  var name23 = "IdSelector";
  var structure23 = {
    name: String
  };
  function parse24() {
    const start = this.tokenStart;
    this.eat(Hash);
    return {
      type: "IdSelector",
      loc: this.getLocation(start, this.tokenStart),
      name: this.substrToCursor(start + 1)
    };
  }
  function generate24(node) {
    this.token(Delim, "#" + node.name);
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/Layer.js
  var Layer_exports = {};
  __export(Layer_exports, {
    generate: () => generate25,
    name: () => name24,
    parse: () => parse25,
    structure: () => structure24
  });
  var FULLSTOP2 = 46;
  var name24 = "Layer";
  var structure24 = {
    name: String
  };
  function parse25() {
    let tokenStart = this.tokenStart;
    let name50 = this.consume(Ident);
    while (this.isDelim(FULLSTOP2)) {
      this.eat(Delim);
      name50 += "." + this.consume(Ident);
    }
    return {
      type: "Layer",
      loc: this.getLocation(tokenStart, this.tokenStart),
      name: name50
    };
  }
  function generate25(node) {
    this.tokenize(node.name);
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/LayerList.js
  var LayerList_exports = {};
  __export(LayerList_exports, {
    generate: () => generate26,
    name: () => name25,
    parse: () => parse26,
    structure: () => structure25
  });
  var name25 = "LayerList";
  var structure25 = {
    children: [[
      "Layer"
    ]]
  };
  function parse26() {
    const children = this.createList();
    this.skipSC();
    while (!this.eof) {
      children.push(this.Layer());
      if (this.lookupTypeNonSC(0) !== Comma) {
        break;
      }
      this.skipSC();
      this.next();
      this.skipSC();
    }
    return {
      type: "LayerList",
      loc: this.getLocationFromList(children),
      children
    };
  }
  function generate26(node) {
    this.children(node, () => this.token(Comma, ","));
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/MediaQuery.js
  var MediaQuery_exports = {};
  __export(MediaQuery_exports, {
    generate: () => generate27,
    name: () => name26,
    parse: () => parse27,
    structure: () => structure26
  });
  var name26 = "MediaQuery";
  var structure26 = {
    modifier: [String, null],
    mediaType: [String, null],
    condition: ["Condition", null]
  };
  function parse27() {
    const start = this.tokenStart;
    let modifier = null;
    let mediaType = null;
    let condition = null;
    this.skipSC();
    if (this.tokenType === Ident && this.lookupTypeNonSC(1) !== LeftParenthesis) {
      const ident = this.consume(Ident);
      const identLowerCase = ident.toLowerCase();
      if (identLowerCase === "not" || identLowerCase === "only") {
        this.skipSC();
        modifier = identLowerCase;
        mediaType = this.consume(Ident);
      } else {
        mediaType = ident;
      }
      switch (this.lookupTypeNonSC(0)) {
        case Ident: {
          this.skipSC();
          this.eatIdent("and");
          condition = this.Condition("media");
          break;
        }
        case LeftCurlyBracket:
        case Semicolon:
        case Comma:
        case EOF:
          break;
        default:
          this.error("Identifier or parenthesis is expected");
      }
    } else {
      switch (this.tokenType) {
        case Ident:
        case LeftParenthesis:
        case Function2: {
          condition = this.Condition("media");
          break;
        }
        case LeftCurlyBracket:
        case Semicolon:
        case EOF:
          break;
        default:
          this.error("Identifier or parenthesis is expected");
      }
    }
    return {
      type: "MediaQuery",
      loc: this.getLocation(start, this.tokenStart),
      modifier,
      mediaType,
      condition
    };
  }
  function generate27(node) {
    if (node.mediaType) {
      if (node.modifier) {
        this.token(Ident, node.modifier);
      }
      this.token(Ident, node.mediaType);
      if (node.condition) {
        this.token(Ident, "and");
        this.node(node.condition);
      }
    } else if (node.condition) {
      this.node(node.condition);
    }
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/MediaQueryList.js
  var MediaQueryList_exports = {};
  __export(MediaQueryList_exports, {
    generate: () => generate28,
    name: () => name27,
    parse: () => parse28,
    structure: () => structure27
  });
  var name27 = "MediaQueryList";
  var structure27 = {
    children: [[
      "MediaQuery"
    ]]
  };
  function parse28() {
    const children = this.createList();
    this.skipSC();
    while (!this.eof) {
      children.push(this.MediaQuery());
      if (this.tokenType !== Comma) {
        break;
      }
      this.next();
    }
    return {
      type: "MediaQueryList",
      loc: this.getLocationFromList(children),
      children
    };
  }
  function generate28(node) {
    this.children(node, () => this.token(Comma, ","));
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/NestingSelector.js
  var NestingSelector_exports = {};
  __export(NestingSelector_exports, {
    generate: () => generate29,
    name: () => name28,
    parse: () => parse29,
    structure: () => structure28
  });
  var AMPERSAND5 = 38;
  var name28 = "NestingSelector";
  var structure28 = {};
  function parse29() {
    const start = this.tokenStart;
    this.eatDelim(AMPERSAND5);
    return {
      type: "NestingSelector",
      loc: this.getLocation(start, this.tokenStart)
    };
  }
  function generate29() {
    this.token(Delim, "&");
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/Nth.js
  var Nth_exports = {};
  __export(Nth_exports, {
    generate: () => generate30,
    name: () => name29,
    parse: () => parse30,
    structure: () => structure29
  });
  var name29 = "Nth";
  var structure29 = {
    nth: ["AnPlusB", "Identifier"],
    selector: ["SelectorList", null]
  };
  function parse30() {
    this.skipSC();
    const start = this.tokenStart;
    let end = start;
    let selector2 = null;
    let nth2;
    if (this.lookupValue(0, "odd") || this.lookupValue(0, "even")) {
      nth2 = this.Identifier();
    } else {
      nth2 = this.AnPlusB();
    }
    end = this.tokenStart;
    this.skipSC();
    if (this.lookupValue(0, "of")) {
      this.next();
      selector2 = this.SelectorList();
      end = this.tokenStart;
    }
    return {
      type: "Nth",
      loc: this.getLocation(start, end),
      nth: nth2,
      selector: selector2
    };
  }
  function generate30(node) {
    this.node(node.nth);
    if (node.selector !== null) {
      this.token(Ident, "of");
      this.node(node.selector);
    }
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/Number.js
  var Number_exports = {};
  __export(Number_exports, {
    generate: () => generate31,
    name: () => name30,
    parse: () => parse31,
    structure: () => structure30
  });
  var name30 = "Number";
  var structure30 = {
    value: String
  };
  function parse31() {
    return {
      type: "Number",
      loc: this.getLocation(this.tokenStart, this.tokenEnd),
      value: this.consume(Number2)
    };
  }
  function generate31(node) {
    this.token(Number2, node.value);
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/Operator.js
  var Operator_exports = {};
  __export(Operator_exports, {
    generate: () => generate32,
    name: () => name31,
    parse: () => parse32,
    structure: () => structure31
  });
  var name31 = "Operator";
  var structure31 = {
    value: String
  };
  function parse32() {
    const start = this.tokenStart;
    this.next();
    return {
      type: "Operator",
      loc: this.getLocation(start, this.tokenStart),
      value: this.substrToCursor(start)
    };
  }
  function generate32(node) {
    this.tokenize(node.value);
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/Parentheses.js
  var Parentheses_exports = {};
  __export(Parentheses_exports, {
    generate: () => generate33,
    name: () => name32,
    parse: () => parse33,
    structure: () => structure32
  });
  var name32 = "Parentheses";
  var structure32 = {
    children: [[]]
  };
  function parse33(readSequence2, recognizer) {
    const start = this.tokenStart;
    let children = null;
    this.eat(LeftParenthesis);
    children = readSequence2.call(this, recognizer);
    if (!this.eof) {
      this.eat(RightParenthesis);
    }
    return {
      type: "Parentheses",
      loc: this.getLocation(start, this.tokenStart),
      children
    };
  }
  function generate33(node) {
    this.token(LeftParenthesis, "(");
    this.children(node);
    this.token(RightParenthesis, ")");
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/Percentage.js
  var Percentage_exports = {};
  __export(Percentage_exports, {
    generate: () => generate34,
    name: () => name33,
    parse: () => parse34,
    structure: () => structure33
  });
  var name33 = "Percentage";
  var structure33 = {
    value: String
  };
  function parse34() {
    return {
      type: "Percentage",
      loc: this.getLocation(this.tokenStart, this.tokenEnd),
      value: this.consumeNumber(Percentage)
    };
  }
  function generate34(node) {
    this.token(Percentage, node.value + "%");
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/PseudoClassSelector.js
  var PseudoClassSelector_exports = {};
  __export(PseudoClassSelector_exports, {
    generate: () => generate35,
    name: () => name34,
    parse: () => parse35,
    structure: () => structure34,
    walkContext: () => walkContext6
  });
  var name34 = "PseudoClassSelector";
  var walkContext6 = "function";
  var structure34 = {
    name: String,
    children: [["Raw"], null]
  };
  function parse35() {
    const start = this.tokenStart;
    let children = null;
    let name50;
    let nameLowerCase;
    this.eat(Colon);
    if (this.tokenType === Function2) {
      name50 = this.consumeFunctionName();
      nameLowerCase = name50.toLowerCase();
      if (this.lookupNonWSType(0) == RightParenthesis) {
        children = this.createList();
      } else if (hasOwnProperty.call(this.pseudo, nameLowerCase)) {
        this.skipSC();
        children = this.pseudo[nameLowerCase].call(this);
        this.skipSC();
      } else {
        children = this.createList();
        children.push(
          this.Raw(null, false)
        );
      }
      this.eat(RightParenthesis);
    } else {
      name50 = this.consume(Ident);
    }
    return {
      type: "PseudoClassSelector",
      loc: this.getLocation(start, this.tokenStart),
      name: name50,
      children
    };
  }
  function generate35(node) {
    this.token(Colon, ":");
    if (node.children === null) {
      this.token(Ident, node.name);
    } else {
      this.token(Function2, node.name + "(");
      this.children(node);
      this.token(RightParenthesis, ")");
    }
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/PseudoElementSelector.js
  var PseudoElementSelector_exports = {};
  __export(PseudoElementSelector_exports, {
    generate: () => generate36,
    name: () => name35,
    parse: () => parse36,
    structure: () => structure35,
    walkContext: () => walkContext7
  });
  var name35 = "PseudoElementSelector";
  var walkContext7 = "function";
  var structure35 = {
    name: String,
    children: [["Raw"], null]
  };
  function parse36() {
    const start = this.tokenStart;
    let children = null;
    let name50;
    let nameLowerCase;
    this.eat(Colon);
    this.eat(Colon);
    if (this.tokenType === Function2) {
      name50 = this.consumeFunctionName();
      nameLowerCase = name50.toLowerCase();
      if (this.lookupNonWSType(0) == RightParenthesis) {
        children = this.createList();
      } else if (hasOwnProperty.call(this.pseudo, nameLowerCase)) {
        this.skipSC();
        children = this.pseudo[nameLowerCase].call(this);
        this.skipSC();
      } else {
        children = this.createList();
        children.push(
          this.Raw(null, false)
        );
      }
      this.eat(RightParenthesis);
    } else {
      name50 = this.consume(Ident);
    }
    return {
      type: "PseudoElementSelector",
      loc: this.getLocation(start, this.tokenStart),
      name: name50,
      children
    };
  }
  function generate36(node) {
    this.token(Colon, ":");
    this.token(Colon, ":");
    if (node.children === null) {
      this.token(Ident, node.name);
    } else {
      this.token(Function2, node.name + "(");
      this.children(node);
      this.token(RightParenthesis, ")");
    }
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/Ratio.js
  var Ratio_exports = {};
  __export(Ratio_exports, {
    generate: () => generate37,
    name: () => name36,
    parse: () => parse37,
    structure: () => structure36
  });
  var SOLIDUS6 = 47;
  function consumeTerm() {
    this.skipSC();
    switch (this.tokenType) {
      case Number2:
        return this.Number();
      case Function2:
        return this.Function(this.readSequence, this.scope.Value);
      default:
        this.error("Number of function is expected");
    }
  }
  var name36 = "Ratio";
  var structure36 = {
    left: ["Number", "Function"],
    right: ["Number", "Function", null]
  };
  function parse37() {
    const start = this.tokenStart;
    const left = consumeTerm.call(this);
    let right = null;
    this.skipSC();
    if (this.isDelim(SOLIDUS6)) {
      this.eatDelim(SOLIDUS6);
      right = consumeTerm.call(this);
    }
    return {
      type: "Ratio",
      loc: this.getLocation(start, this.tokenStart),
      left,
      right
    };
  }
  function generate37(node) {
    this.node(node.left);
    this.token(Delim, "/");
    if (node.right) {
      this.node(node.right);
    } else {
      this.node(Number2, 1);
    }
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/Raw.js
  var Raw_exports = {};
  __export(Raw_exports, {
    generate: () => generate38,
    name: () => name37,
    parse: () => parse38,
    structure: () => structure37
  });
  function getOffsetExcludeWS() {
    if (this.tokenIndex > 0) {
      if (this.lookupType(-1) === WhiteSpace) {
        return this.tokenIndex > 1 ? this.getTokenStart(this.tokenIndex - 1) : this.firstCharOffset;
      }
    }
    return this.tokenStart;
  }
  var name37 = "Raw";
  var structure37 = {
    value: String
  };
  function parse38(consumeUntil, excludeWhiteSpace) {
    const startOffset = this.getTokenStart(this.tokenIndex);
    let endOffset;
    this.skipUntilBalanced(this.tokenIndex, consumeUntil || this.consumeUntilBalanceEnd);
    if (excludeWhiteSpace && this.tokenStart > startOffset) {
      endOffset = getOffsetExcludeWS.call(this);
    } else {
      endOffset = this.tokenStart;
    }
    return {
      type: "Raw",
      loc: this.getLocation(startOffset, endOffset),
      value: this.substring(startOffset, endOffset)
    };
  }
  function generate38(node) {
    this.tokenize(node.value);
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/Rule.js
  var Rule_exports = {};
  __export(Rule_exports, {
    generate: () => generate39,
    name: () => name38,
    parse: () => parse39,
    structure: () => structure38,
    walkContext: () => walkContext8
  });
  function consumeRaw4() {
    return this.Raw(this.consumeUntilLeftCurlyBracket, true);
  }
  function consumePrelude() {
    const prelude = this.SelectorList();
    if (prelude.type !== "Raw" && this.eof === false && this.tokenType !== LeftCurlyBracket) {
      this.error();
    }
    return prelude;
  }
  var name38 = "Rule";
  var walkContext8 = "rule";
  var structure38 = {
    prelude: ["SelectorList", "Raw"],
    block: ["Block"]
  };
  function parse39() {
    const startToken = this.tokenIndex;
    const startOffset = this.tokenStart;
    let prelude;
    let block2;
    if (this.parseRulePrelude) {
      prelude = this.parseWithFallback(consumePrelude, consumeRaw4);
    } else {
      prelude = consumeRaw4.call(this, startToken);
    }
    block2 = this.Block(true);
    return {
      type: "Rule",
      loc: this.getLocation(startOffset, this.tokenStart),
      prelude,
      block: block2
    };
  }
  function generate39(node) {
    this.node(node.prelude);
    this.node(node.block);
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/Scope.js
  var Scope_exports = {};
  __export(Scope_exports, {
    generate: () => generate40,
    name: () => name39,
    parse: () => parse40,
    structure: () => structure39
  });
  var name39 = "Scope";
  var structure39 = {
    root: ["SelectorList", "Raw", null],
    limit: ["SelectorList", "Raw", null]
  };
  function parse40() {
    let root = null;
    let limit = null;
    this.skipSC();
    const startOffset = this.tokenStart;
    if (this.tokenType === LeftParenthesis) {
      this.next();
      this.skipSC();
      root = this.parseWithFallback(
        this.SelectorList,
        () => this.Raw(false, true)
      );
      this.skipSC();
      this.eat(RightParenthesis);
    }
    if (this.lookupNonWSType(0) === Ident) {
      this.skipSC();
      this.eatIdent("to");
      this.skipSC();
      this.eat(LeftParenthesis);
      this.skipSC();
      limit = this.parseWithFallback(
        this.SelectorList,
        () => this.Raw(false, true)
      );
      this.skipSC();
      this.eat(RightParenthesis);
    }
    return {
      type: "Scope",
      loc: this.getLocation(startOffset, this.tokenStart),
      root,
      limit
    };
  }
  function generate40(node) {
    if (node.root) {
      this.token(LeftParenthesis, "(");
      this.node(node.root);
      this.token(RightParenthesis, ")");
    }
    if (node.limit) {
      this.token(Ident, "to");
      this.token(LeftParenthesis, "(");
      this.node(node.limit);
      this.token(RightParenthesis, ")");
    }
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/Selector.js
  var Selector_exports = {};
  __export(Selector_exports, {
    generate: () => generate41,
    name: () => name40,
    parse: () => parse41,
    structure: () => structure40
  });
  var name40 = "Selector";
  var structure40 = {
    children: [[
      "TypeSelector",
      "IdSelector",
      "ClassSelector",
      "AttributeSelector",
      "PseudoClassSelector",
      "PseudoElementSelector",
      "Combinator"
    ]]
  };
  function parse41() {
    const children = this.readSequence(this.scope.Selector);
    if (this.getFirstListNode(children) === null) {
      this.error("Selector is expected");
    }
    return {
      type: "Selector",
      loc: this.getLocationFromList(children),
      children
    };
  }
  function generate41(node) {
    this.children(node);
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/SelectorList.js
  var SelectorList_exports = {};
  __export(SelectorList_exports, {
    generate: () => generate42,
    name: () => name41,
    parse: () => parse42,
    structure: () => structure41,
    walkContext: () => walkContext9
  });
  var name41 = "SelectorList";
  var walkContext9 = "selector";
  var structure41 = {
    children: [[
      "Selector",
      "Raw"
    ]]
  };
  function parse42() {
    const children = this.createList();
    while (!this.eof) {
      children.push(this.Selector());
      if (this.tokenType === Comma) {
        this.next();
        continue;
      }
      break;
    }
    return {
      type: "SelectorList",
      loc: this.getLocationFromList(children),
      children
    };
  }
  function generate42(node) {
    this.children(node, () => this.token(Comma, ","));
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/String.js
  var String_exports = {};
  __export(String_exports, {
    generate: () => generate43,
    name: () => name42,
    parse: () => parse43,
    structure: () => structure42
  });

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/utils/string.js
  var REVERSE_SOLIDUS = 92;
  var QUOTATION_MARK = 34;
  var APOSTROPHE3 = 39;
  function decode3(str) {
    const len = str.length;
    const firstChar = str.charCodeAt(0);
    const start = firstChar === QUOTATION_MARK || firstChar === APOSTROPHE3 ? 1 : 0;
    const end = start === 1 && len > 1 && str.charCodeAt(len - 1) === firstChar ? len - 2 : len - 1;
    let decoded = "";
    for (let i = start; i <= end; i++) {
      let code3 = str.charCodeAt(i);
      if (code3 === REVERSE_SOLIDUS) {
        if (i === end) {
          if (i !== len - 1) {
            decoded = str.substr(i + 1);
          }
          break;
        }
        code3 = str.charCodeAt(++i);
        if (isValidEscape(REVERSE_SOLIDUS, code3)) {
          const escapeStart = i - 1;
          const escapeEnd = consumeEscaped(str, escapeStart);
          i = escapeEnd - 1;
          decoded += decodeEscaped(str.substring(escapeStart + 1, escapeEnd));
        } else {
          if (code3 === 13 && str.charCodeAt(i + 1) === 10) {
            i++;
          }
        }
      } else {
        decoded += str[i];
      }
    }
    return decoded;
  }
  function encode3(str, apostrophe) {
    const quote = apostrophe ? "'" : '"';
    const quoteCode = apostrophe ? APOSTROPHE3 : QUOTATION_MARK;
    let encoded = "";
    let wsBeforeHexIsNeeded = false;
    for (let i = 0; i < str.length; i++) {
      const code3 = str.charCodeAt(i);
      if (code3 === 0) {
        encoded += "\uFFFD";
        continue;
      }
      if (code3 <= 31 || code3 === 127) {
        encoded += "\\" + code3.toString(16);
        wsBeforeHexIsNeeded = true;
        continue;
      }
      if (code3 === quoteCode || code3 === REVERSE_SOLIDUS) {
        encoded += "\\" + str.charAt(i);
        wsBeforeHexIsNeeded = false;
      } else {
        if (wsBeforeHexIsNeeded && (isHexDigit(code3) || isWhiteSpace2(code3))) {
          encoded += " ";
        }
        encoded += str.charAt(i);
        wsBeforeHexIsNeeded = false;
      }
    }
    return quote + encoded + quote;
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/String.js
  var name42 = "String";
  var structure42 = {
    value: String
  };
  function parse43() {
    return {
      type: "String",
      loc: this.getLocation(this.tokenStart, this.tokenEnd),
      value: decode3(this.consume(String2))
    };
  }
  function generate43(node) {
    this.token(String2, encode3(node.value));
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/StyleSheet.js
  var StyleSheet_exports = {};
  __export(StyleSheet_exports, {
    generate: () => generate44,
    name: () => name43,
    parse: () => parse44,
    structure: () => structure43,
    walkContext: () => walkContext10
  });
  var EXCLAMATIONMARK4 = 33;
  function consumeRaw5() {
    return this.Raw(null, false);
  }
  var name43 = "StyleSheet";
  var walkContext10 = "stylesheet";
  var structure43 = {
    children: [[
      "Comment",
      "CDO",
      "CDC",
      "Atrule",
      "Rule",
      "Raw"
    ]]
  };
  function parse44() {
    const start = this.tokenStart;
    const children = this.createList();
    let child;
    scan:
      while (!this.eof) {
        switch (this.tokenType) {
          case WhiteSpace:
            this.next();
            continue;
          case Comment:
            if (this.charCodeAt(this.tokenStart + 2) !== EXCLAMATIONMARK4) {
              this.next();
              continue;
            }
            child = this.Comment();
            break;
          case CDO:
            child = this.CDO();
            break;
          case CDC:
            child = this.CDC();
            break;
          // CSS Syntax Module Level 3
          // §2.2 Error handling
          // At the "top level" of a stylesheet, an <at-keyword-token> starts an at-rule.
          case AtKeyword:
            child = this.parseWithFallback(this.Atrule, consumeRaw5);
            break;
          // Anything else starts a qualified rule ...
          default:
            child = this.parseWithFallback(this.Rule, consumeRaw5);
        }
        children.push(child);
      }
    return {
      type: "StyleSheet",
      loc: this.getLocation(start, this.tokenStart),
      children
    };
  }
  function generate44(node) {
    this.children(node);
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/SupportsDeclaration.js
  var SupportsDeclaration_exports = {};
  __export(SupportsDeclaration_exports, {
    generate: () => generate45,
    name: () => name44,
    parse: () => parse45,
    structure: () => structure44
  });
  var name44 = "SupportsDeclaration";
  var structure44 = {
    declaration: "Declaration"
  };
  function parse45() {
    const start = this.tokenStart;
    this.eat(LeftParenthesis);
    this.skipSC();
    const declaration2 = this.Declaration();
    if (!this.eof) {
      this.eat(RightParenthesis);
    }
    return {
      type: "SupportsDeclaration",
      loc: this.getLocation(start, this.tokenStart),
      declaration: declaration2
    };
  }
  function generate45(node) {
    this.token(LeftParenthesis, "(");
    this.node(node.declaration);
    this.token(RightParenthesis, ")");
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/TypeSelector.js
  var TypeSelector_exports = {};
  __export(TypeSelector_exports, {
    generate: () => generate46,
    name: () => name45,
    parse: () => parse46,
    structure: () => structure45
  });
  var ASTERISK5 = 42;
  var VERTICALLINE3 = 124;
  function eatIdentifierOrAsterisk() {
    if (this.tokenType !== Ident && this.isDelim(ASTERISK5) === false) {
      this.error("Identifier or asterisk is expected");
    }
    this.next();
  }
  var name45 = "TypeSelector";
  var structure45 = {
    name: String
  };
  function parse46() {
    const start = this.tokenStart;
    if (this.isDelim(VERTICALLINE3)) {
      this.next();
      eatIdentifierOrAsterisk.call(this);
    } else {
      eatIdentifierOrAsterisk.call(this);
      if (this.isDelim(VERTICALLINE3)) {
        this.next();
        eatIdentifierOrAsterisk.call(this);
      }
    }
    return {
      type: "TypeSelector",
      loc: this.getLocation(start, this.tokenStart),
      name: this.substrToCursor(start)
    };
  }
  function generate46(node) {
    this.tokenize(node.name);
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/UnicodeRange.js
  var UnicodeRange_exports = {};
  __export(UnicodeRange_exports, {
    generate: () => generate47,
    name: () => name46,
    parse: () => parse47,
    structure: () => structure46
  });
  var PLUSSIGN8 = 43;
  var HYPHENMINUS6 = 45;
  var QUESTIONMARK3 = 63;
  function eatHexSequence(offset, allowDash) {
    let len = 0;
    for (let pos = this.tokenStart + offset; pos < this.tokenEnd; pos++) {
      const code3 = this.charCodeAt(pos);
      if (code3 === HYPHENMINUS6 && allowDash && len !== 0) {
        eatHexSequence.call(this, offset + len + 1, false);
        return -1;
      }
      if (!isHexDigit(code3)) {
        this.error(
          allowDash && len !== 0 ? "Hyphen minus" + (len < 6 ? " or hex digit" : "") + " is expected" : len < 6 ? "Hex digit is expected" : "Unexpected input",
          pos
        );
      }
      if (++len > 6) {
        this.error("Too many hex digits", pos);
      }
      ;
    }
    this.next();
    return len;
  }
  function eatQuestionMarkSequence(max) {
    let count = 0;
    while (this.isDelim(QUESTIONMARK3)) {
      if (++count > max) {
        this.error("Too many question marks");
      }
      this.next();
    }
  }
  function startsWith2(code3) {
    if (this.charCodeAt(this.tokenStart) !== code3) {
      this.error((code3 === PLUSSIGN8 ? "Plus sign" : "Hyphen minus") + " is expected");
    }
  }
  function scanUnicodeRange() {
    let hexLength = 0;
    switch (this.tokenType) {
      case Number2:
        hexLength = eatHexSequence.call(this, 1, true);
        if (this.isDelim(QUESTIONMARK3)) {
          eatQuestionMarkSequence.call(this, 6 - hexLength);
          break;
        }
        if (this.tokenType === Dimension || this.tokenType === Number2) {
          startsWith2.call(this, HYPHENMINUS6);
          eatHexSequence.call(this, 1, false);
          break;
        }
        break;
      case Dimension:
        hexLength = eatHexSequence.call(this, 1, true);
        if (hexLength > 0) {
          eatQuestionMarkSequence.call(this, 6 - hexLength);
        }
        break;
      default:
        this.eatDelim(PLUSSIGN8);
        if (this.tokenType === Ident) {
          hexLength = eatHexSequence.call(this, 0, true);
          if (hexLength > 0) {
            eatQuestionMarkSequence.call(this, 6 - hexLength);
          }
          break;
        }
        if (this.isDelim(QUESTIONMARK3)) {
          this.next();
          eatQuestionMarkSequence.call(this, 5);
          break;
        }
        this.error("Hex digit or question mark is expected");
    }
  }
  var name46 = "UnicodeRange";
  var structure46 = {
    value: String
  };
  function parse47() {
    const start = this.tokenStart;
    this.eatIdent("u");
    scanUnicodeRange.call(this);
    return {
      type: "UnicodeRange",
      loc: this.getLocation(start, this.tokenStart),
      value: this.substrToCursor(start)
    };
  }
  function generate47(node) {
    this.tokenize(node.value);
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/Url.js
  var Url_exports = {};
  __export(Url_exports, {
    generate: () => generate48,
    name: () => name47,
    parse: () => parse48,
    structure: () => structure47
  });

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/utils/url.js
  var SPACE3 = 32;
  var REVERSE_SOLIDUS2 = 92;
  var QUOTATION_MARK2 = 34;
  var APOSTROPHE4 = 39;
  var LEFTPARENTHESIS3 = 40;
  var RIGHTPARENTHESIS3 = 41;
  function decode4(str) {
    const len = str.length;
    let start = 4;
    let end = str.charCodeAt(len - 1) === RIGHTPARENTHESIS3 ? len - 2 : len - 1;
    let decoded = "";
    while (start < end && isWhiteSpace2(str.charCodeAt(start))) {
      start++;
    }
    while (start < end && isWhiteSpace2(str.charCodeAt(end))) {
      end--;
    }
    for (let i = start; i <= end; i++) {
      let code3 = str.charCodeAt(i);
      if (code3 === REVERSE_SOLIDUS2) {
        if (i === end) {
          if (i !== len - 1) {
            decoded = str.substr(i + 1);
          }
          break;
        }
        code3 = str.charCodeAt(++i);
        if (isValidEscape(REVERSE_SOLIDUS2, code3)) {
          const escapeStart = i - 1;
          const escapeEnd = consumeEscaped(str, escapeStart);
          i = escapeEnd - 1;
          decoded += decodeEscaped(str.substring(escapeStart + 1, escapeEnd));
        } else {
          if (code3 === 13 && str.charCodeAt(i + 1) === 10) {
            i++;
          }
        }
      } else {
        decoded += str[i];
      }
    }
    return decoded;
  }
  function encode4(str) {
    let encoded = "";
    let wsBeforeHexIsNeeded = false;
    for (let i = 0; i < str.length; i++) {
      const code3 = str.charCodeAt(i);
      if (code3 === 0) {
        encoded += "\uFFFD";
        continue;
      }
      if (code3 <= 31 || code3 === 127) {
        encoded += "\\" + code3.toString(16);
        wsBeforeHexIsNeeded = true;
        continue;
      }
      if (code3 === SPACE3 || code3 === REVERSE_SOLIDUS2 || code3 === QUOTATION_MARK2 || code3 === APOSTROPHE4 || code3 === LEFTPARENTHESIS3 || code3 === RIGHTPARENTHESIS3) {
        encoded += "\\" + str.charAt(i);
        wsBeforeHexIsNeeded = false;
      } else {
        if (wsBeforeHexIsNeeded && isHexDigit(code3)) {
          encoded += " ";
        }
        encoded += str.charAt(i);
        wsBeforeHexIsNeeded = false;
      }
    }
    return "url(" + encoded + ")";
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/Url.js
  var name47 = "Url";
  var structure47 = {
    value: String
  };
  function parse48() {
    const start = this.tokenStart;
    let value;
    switch (this.tokenType) {
      case Url2:
        value = decode4(this.consume(Url2));
        break;
      case Function2:
        if (!this.cmpStr(this.tokenStart, this.tokenEnd, "url(")) {
          this.error("Function name must be `url`");
        }
        this.eat(Function2);
        this.skipSC();
        value = decode3(this.consume(String2));
        this.skipSC();
        if (!this.eof) {
          this.eat(RightParenthesis);
        }
        break;
      default:
        this.error("Url or Function is expected");
    }
    return {
      type: "Url",
      loc: this.getLocation(start, this.tokenStart),
      value
    };
  }
  function generate48(node) {
    this.token(Url2, encode4(node.value));
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/Value.js
  var Value_exports = {};
  __export(Value_exports, {
    generate: () => generate49,
    name: () => name48,
    parse: () => parse49,
    structure: () => structure48
  });
  var name48 = "Value";
  var structure48 = {
    children: [[]]
  };
  function parse49() {
    const start = this.tokenStart;
    const children = this.readSequence(this.scope.Value);
    return {
      type: "Value",
      loc: this.getLocation(start, this.tokenStart),
      children
    };
  }
  function generate49(node) {
    this.children(node);
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/WhiteSpace.js
  var WhiteSpace_exports = {};
  __export(WhiteSpace_exports, {
    generate: () => generate50,
    name: () => name49,
    parse: () => parse50,
    structure: () => structure49
  });
  var SPACE4 = Object.freeze({
    type: "WhiteSpace",
    loc: null,
    value: " "
  });
  var name49 = "WhiteSpace";
  var structure49 = {
    value: String
  };
  function parse50() {
    this.eat(WhiteSpace);
    return SPACE4;
  }
  function generate50(node) {
    this.token(WhiteSpace, node.value);
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/config/lexer.js
  var lexer_default = {
    generic: true,
    cssWideKeywords,
    ...data_default,
    node: node_exports
  };

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/scope/index.js
  var scope_exports = {};
  __export(scope_exports, {
    AtrulePrelude: () => atrulePrelude_default,
    Selector: () => selector_default,
    Value: () => value_default
  });

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/scope/default.js
  var NUMBERSIGN4 = 35;
  var ASTERISK6 = 42;
  var PLUSSIGN9 = 43;
  var HYPHENMINUS7 = 45;
  var SOLIDUS7 = 47;
  var U2 = 117;
  function defaultRecognizer(context) {
    switch (this.tokenType) {
      case Hash:
        return this.Hash();
      case Comma:
        return this.Operator();
      case LeftParenthesis:
        return this.Parentheses(this.readSequence, context.recognizer);
      case LeftSquareBracket:
        return this.Brackets(this.readSequence, context.recognizer);
      case String2:
        return this.String();
      case Dimension:
        return this.Dimension();
      case Percentage:
        return this.Percentage();
      case Number2:
        return this.Number();
      case Function2:
        return this.cmpStr(this.tokenStart, this.tokenEnd, "url(") ? this.Url() : this.Function(this.readSequence, context.recognizer);
      case Url2:
        return this.Url();
      case Ident:
        if (this.cmpChar(this.tokenStart, U2) && this.cmpChar(this.tokenStart + 1, PLUSSIGN9)) {
          return this.UnicodeRange();
        } else {
          return this.Identifier();
        }
      case Delim: {
        const code3 = this.charCodeAt(this.tokenStart);
        if (code3 === SOLIDUS7 || code3 === ASTERISK6 || code3 === PLUSSIGN9 || code3 === HYPHENMINUS7) {
          return this.Operator();
        }
        if (code3 === NUMBERSIGN4) {
          this.error("Hex or identifier is expected", this.tokenStart + 1);
        }
        break;
      }
    }
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/scope/atrulePrelude.js
  var atrulePrelude_default = {
    getNode: defaultRecognizer
  };

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/scope/selector.js
  var NUMBERSIGN5 = 35;
  var AMPERSAND6 = 38;
  var ASTERISK7 = 42;
  var PLUSSIGN10 = 43;
  var SOLIDUS8 = 47;
  var FULLSTOP3 = 46;
  var GREATERTHANSIGN4 = 62;
  var VERTICALLINE4 = 124;
  var TILDE3 = 126;
  function onWhiteSpace(next, children) {
    if (children.last !== null && children.last.type !== "Combinator" && next !== null && next.type !== "Combinator") {
      children.push({
        // FIXME: this.Combinator() should be used instead
        type: "Combinator",
        loc: null,
        name: " "
      });
    }
  }
  function getNode() {
    switch (this.tokenType) {
      case LeftSquareBracket:
        return this.AttributeSelector();
      case Hash:
        return this.IdSelector();
      case Colon:
        if (this.lookupType(1) === Colon) {
          return this.PseudoElementSelector();
        } else {
          return this.PseudoClassSelector();
        }
      case Ident:
        return this.TypeSelector();
      case Number2:
      case Percentage:
        return this.Percentage();
      case Dimension:
        if (this.charCodeAt(this.tokenStart) === FULLSTOP3) {
          this.error("Identifier is expected", this.tokenStart + 1);
        }
        break;
      case Delim: {
        const code3 = this.charCodeAt(this.tokenStart);
        switch (code3) {
          case PLUSSIGN10:
          case GREATERTHANSIGN4:
          case TILDE3:
          case SOLIDUS8:
            return this.Combinator();
          case FULLSTOP3:
            return this.ClassSelector();
          case ASTERISK7:
          case VERTICALLINE4:
            return this.TypeSelector();
          case NUMBERSIGN5:
            return this.IdSelector();
          case AMPERSAND6:
            return this.NestingSelector();
        }
        break;
      }
    }
  }
  var selector_default = {
    onWhiteSpace,
    getNode
  };

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/function/expression.js
  function expression_default() {
    return this.createSingleNodeList(
      this.Raw(null, false)
    );
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/function/var.js
  function var_default() {
    const children = this.createList();
    this.skipSC();
    children.push(this.Identifier());
    this.skipSC();
    if (this.tokenType === Comma) {
      children.push(this.Operator());
      const startIndex = this.tokenIndex;
      const value = this.parseCustomProperty ? this.Value(null) : this.Raw(this.consumeUntilExclamationMarkOrSemicolon, false);
      if (value.type === "Value" && value.children.isEmpty) {
        for (let offset = startIndex - this.tokenIndex; offset <= 0; offset++) {
          if (this.lookupType(offset) === WhiteSpace) {
            value.children.appendData({
              type: "WhiteSpace",
              loc: null,
              value: " "
            });
            break;
          }
        }
      }
      children.push(value);
    }
    return children;
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/scope/value.js
  function isPlusMinusOperator(node) {
    return node !== null && node.type === "Operator" && (node.value[node.value.length - 1] === "-" || node.value[node.value.length - 1] === "+");
  }
  var value_default = {
    getNode: defaultRecognizer,
    onWhiteSpace(next, children) {
      if (isPlusMinusOperator(next)) {
        next.value = " " + next.value;
      }
      if (isPlusMinusOperator(children.last)) {
        children.last.value += " ";
      }
    },
    "expression": expression_default,
    "var": var_default
  };

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/atrule/container.js
  var nonContainerNameKeywords = /* @__PURE__ */ new Set(["none", "and", "not", "or"]);
  var container_default = {
    parse: {
      prelude() {
        const children = this.createList();
        if (this.tokenType === Ident) {
          const name50 = this.substring(this.tokenStart, this.tokenEnd);
          if (!nonContainerNameKeywords.has(name50.toLowerCase())) {
            children.push(this.Identifier());
          }
        }
        children.push(this.Condition("container"));
        return children;
      },
      block(nested = false) {
        return this.Block(nested);
      }
    }
  };

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/atrule/font-face.js
  var font_face_default = {
    parse: {
      prelude: null,
      block() {
        return this.Block(true);
      }
    }
  };

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/atrule/import.js
  function parseWithFallback(parse52, fallback) {
    return this.parseWithFallback(
      () => {
        try {
          return parse52.call(this);
        } finally {
          this.skipSC();
          if (this.lookupNonWSType(0) !== RightParenthesis) {
            this.error();
          }
        }
      },
      fallback || (() => this.Raw(null, true))
    );
  }
  var parseFunctions = {
    layer() {
      this.skipSC();
      const children = this.createList();
      const node = parseWithFallback.call(this, this.Layer);
      if (node.type !== "Raw" || node.value !== "") {
        children.push(node);
      }
      return children;
    },
    supports() {
      this.skipSC();
      const children = this.createList();
      const node = parseWithFallback.call(
        this,
        this.Declaration,
        () => parseWithFallback.call(this, () => this.Condition("supports"))
      );
      if (node.type !== "Raw" || node.value !== "") {
        children.push(node);
      }
      return children;
    }
  };
  var import_default4 = {
    parse: {
      prelude() {
        const children = this.createList();
        switch (this.tokenType) {
          case String2:
            children.push(this.String());
            break;
          case Url2:
          case Function2:
            children.push(this.Url());
            break;
          default:
            this.error("String or url() is expected");
        }
        this.skipSC();
        if (this.tokenType === Ident && this.cmpStr(this.tokenStart, this.tokenEnd, "layer")) {
          children.push(this.Identifier());
        } else if (this.tokenType === Function2 && this.cmpStr(this.tokenStart, this.tokenEnd, "layer(")) {
          children.push(this.Function(null, parseFunctions));
        }
        this.skipSC();
        if (this.tokenType === Function2 && this.cmpStr(this.tokenStart, this.tokenEnd, "supports(")) {
          children.push(this.Function(null, parseFunctions));
        }
        if (this.lookupNonWSType(0) === Ident || this.lookupNonWSType(0) === LeftParenthesis) {
          children.push(this.MediaQueryList());
        }
        return children;
      },
      block: null
    }
  };

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/atrule/layer.js
  var layer_default = {
    parse: {
      prelude() {
        return this.createSingleNodeList(
          this.LayerList()
        );
      },
      block() {
        return this.Block(false);
      }
    }
  };

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/atrule/media.js
  var media_default = {
    parse: {
      prelude() {
        return this.createSingleNodeList(
          this.MediaQueryList()
        );
      },
      block(nested = false) {
        return this.Block(nested);
      }
    }
  };

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/atrule/nest.js
  var nest_default = {
    parse: {
      prelude() {
        return this.createSingleNodeList(
          this.SelectorList()
        );
      },
      block() {
        return this.Block(true);
      }
    }
  };

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/atrule/page.js
  var page_default = {
    parse: {
      prelude() {
        return this.createSingleNodeList(
          this.SelectorList()
        );
      },
      block() {
        return this.Block(true);
      }
    }
  };

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/atrule/scope.js
  var scope_default = {
    parse: {
      prelude() {
        return this.createSingleNodeList(
          this.Scope()
        );
      },
      block(nested = false) {
        return this.Block(nested);
      }
    }
  };

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/atrule/starting-style.js
  var starting_style_default = {
    parse: {
      prelude: null,
      block(nested = false) {
        return this.Block(nested);
      }
    }
  };

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/atrule/supports.js
  var supports_default = {
    parse: {
      prelude() {
        return this.createSingleNodeList(
          this.Condition("supports")
        );
      },
      block(nested = false) {
        return this.Block(nested);
      }
    }
  };

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/atrule/index.js
  var atrule_default = {
    container: container_default,
    "font-face": font_face_default,
    import: import_default4,
    layer: layer_default,
    media: media_default,
    nest: nest_default,
    page: page_default,
    scope: scope_default,
    "starting-style": starting_style_default,
    supports: supports_default
  };

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/pseudo/lang.js
  function parseLanguageRangeList() {
    const children = this.createList();
    this.skipSC();
    loop: while (!this.eof) {
      switch (this.tokenType) {
        case Ident:
          children.push(this.Identifier());
          break;
        case String2:
          children.push(this.String());
          break;
        case Comma:
          children.push(this.Operator());
          break;
        case RightParenthesis:
          break loop;
        default:
          this.error("Identifier, string or comma is expected");
      }
      this.skipSC();
    }
    return children;
  }

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/pseudo/index.js
  var selectorList = {
    parse() {
      return this.createSingleNodeList(
        this.SelectorList()
      );
    }
  };
  var selector = {
    parse() {
      return this.createSingleNodeList(
        this.Selector()
      );
    }
  };
  var identList = {
    parse() {
      return this.createSingleNodeList(
        this.Identifier()
      );
    }
  };
  var langList = {
    parse: parseLanguageRangeList
  };
  var nth = {
    parse() {
      return this.createSingleNodeList(
        this.Nth()
      );
    }
  };
  var pseudo_default = {
    "dir": identList,
    "has": selectorList,
    "lang": langList,
    "matches": selectorList,
    "is": selectorList,
    "-moz-any": selectorList,
    "-webkit-any": selectorList,
    "where": selectorList,
    "not": selectorList,
    "nth-child": nth,
    "nth-last-child": nth,
    "nth-last-of-type": nth,
    "nth-of-type": nth,
    "slotted": selector,
    "host": selector,
    "host-context": selector
  };

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/node/index-parse.js
  var index_parse_exports = {};
  __export(index_parse_exports, {
    AnPlusB: () => parse2,
    Atrule: () => parse3,
    AtrulePrelude: () => parse4,
    AttributeSelector: () => parse5,
    Block: () => parse6,
    Brackets: () => parse7,
    CDC: () => parse8,
    CDO: () => parse9,
    ClassSelector: () => parse10,
    Combinator: () => parse11,
    Comment: () => parse12,
    Condition: () => parse13,
    Declaration: () => parse14,
    DeclarationList: () => parse15,
    Dimension: () => parse16,
    Feature: () => parse17,
    FeatureFunction: () => parse18,
    FeatureRange: () => parse19,
    Function: () => parse20,
    GeneralEnclosed: () => parse21,
    Hash: () => parse22,
    IdSelector: () => parse24,
    Identifier: () => parse23,
    Layer: () => parse25,
    LayerList: () => parse26,
    MediaQuery: () => parse27,
    MediaQueryList: () => parse28,
    NestingSelector: () => parse29,
    Nth: () => parse30,
    Number: () => parse31,
    Operator: () => parse32,
    Parentheses: () => parse33,
    Percentage: () => parse34,
    PseudoClassSelector: () => parse35,
    PseudoElementSelector: () => parse36,
    Ratio: () => parse37,
    Raw: () => parse38,
    Rule: () => parse39,
    Scope: () => parse40,
    Selector: () => parse41,
    SelectorList: () => parse42,
    String: () => parse43,
    StyleSheet: () => parse44,
    SupportsDeclaration: () => parse45,
    TypeSelector: () => parse46,
    UnicodeRange: () => parse47,
    Url: () => parse48,
    Value: () => parse49,
    WhiteSpace: () => parse50
  });

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/config/parser.js
  var parser_default = {
    parseContext: {
      default: "StyleSheet",
      stylesheet: "StyleSheet",
      atrule: "Atrule",
      atrulePrelude(options) {
        return this.AtrulePrelude(options.atrule ? String(options.atrule) : null);
      },
      mediaQueryList: "MediaQueryList",
      mediaQuery: "MediaQuery",
      condition(options) {
        return this.Condition(options.kind);
      },
      rule: "Rule",
      selectorList: "SelectorList",
      selector: "Selector",
      block() {
        return this.Block(true);
      },
      declarationList: "DeclarationList",
      declaration: "Declaration",
      value: "Value"
    },
    features: {
      supports: {
        selector() {
          return this.Selector();
        }
      },
      container: {
        style() {
          return this.Declaration();
        }
      }
    },
    scope: scope_exports,
    atrule: atrule_default,
    pseudo: pseudo_default,
    node: index_parse_exports
  };

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/config/walker.js
  var walker_default = {
    node: node_exports
  };

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/syntax/index.js
  var syntax_default = create_default({
    ...lexer_default,
    ...parser_default,
    ...walker_default
  });

  // node_modules/.pnpm/css-tree@3.1.0/node_modules/css-tree/lib/index.js
  var {
    tokenize: tokenize2,
    parse: parse51,
    generate: generate51,
    lexer,
    createLexer,
    walk: walk2,
    find,
    findLast,
    findAll,
    toPlainObject,
    fromPlainObject,
    fork
  } = syntax_default;

  // src/render-message.js
  var md = new lib_default({ html: true, breaks: true, linkify: false });
  var escape3 = md.utils.escapeHtml;
  var assetUrl = (path) => "/api/asset/" + [...new TextEncoder().encode(path)].map((b) => b.toString(16).padStart(2, "0")).join("");
  function scopeCSS(source) {
    try {
      const ast = parse51(source);
      walk2(ast, { visit: "Atrule", enter(node, item, list2) {
        if (!["media", "supports", "container", "layer", "scope"].includes(node.name.toLowerCase())) {
          list2?.remove(item);
          return walk2.skip;
        }
      } });
      walk2(ast, { visit: "ClassSelector", enter(node) {
        if (!node.name.startsWith("x-risu-")) node.name = "x-risu-" + node.name;
      } });
      return `@scope (.x-risu-pr-book) {${generate51(ast)}}`;
    } catch {
      return "";
    }
  }
  function renderMessage(text3, character = {}) {
    const assets = new Map((character.additionalAssets || []).map((a) => [a[0].toLocaleLowerCase(), a[1]]));
    const emotions = new Map((character.emotionImages || []).map((a) => [a[0].toLocaleLowerCase(), a[1]]));
    text3 = text3.replace(/\{\{(img|image|asset|emotion|raw|path)::([^{}]+)\}\}/gi, (original, type, name50) => {
      const path = (type.toLowerCase() === "emotion" ? emotions : assets).get(name50.toLocaleLowerCase());
      if (!path) return original;
      const url = assetUrl(path);
      return ["raw", "path"].includes(type.toLowerCase()) ? url : `<img src="${url}" alt="${escape3(name50)}">`;
    }).replace(/\{\{(?:inlay|inlayed|inlayeddata)::([^{}]+)\}\}/gi, (_, id) => `<img src="${assetUrl("inlay/" + id)}" alt="\uCCA8\uBD80 \uC774\uBBF8\uC9C0">`);
    const dom = purify_default.sanitize(md.render(text3), {
      RETURN_DOM: true,
      FORCE_BODY: true,
      ADD_TAGS: ["style", "risu-style"],
      FORBID_TAGS: ["script", "iframe", "object", "embed", "form", "input", "button", "textarea", "select", "link", "meta", "base"],
      FORBID_ATTR: ["autofocus", "srcdoc", "formaction", "contenteditable", "id"]
    });
    let css = "";
    for (const style of dom.querySelectorAll("style,risu-style")) {
      let source = style.textContent;
      if (style.localName === "risu-style") try {
        source = new TextDecoder().decode(Uint8Array.from(source.match(/.{2}/g) || [], (n) => parseInt(n, 16)));
      } catch {
        source = "";
      }
      css += scopeCSS(source);
      style.remove();
    }
    for (const el of dom.querySelectorAll("[class]")) el.setAttribute("class", el.getAttribute("class").split(/\s+/).map((c) => c.startsWith("x-risu-") ? c : "x-risu-" + c).join(" "));
    for (const link2 of dom.querySelectorAll("a")) {
      link2.setAttribute("target", "_blank");
      link2.setAttribute("rel", "noopener noreferrer");
    }
    for (const img of dom.querySelectorAll("img")) {
      img.setAttribute("loading", "eager");
      img.setAttribute("decoding", "async");
      img.setAttribute("referrerpolicy", "no-referrer");
    }
    return { html: dom.innerHTML, css };
  }

  // src/reader.js
  var STORE = "pocketrisu.paper-reader.v1";
  var PREFIX = "x-risu-pr-";
  var GAP = 32;
  var escape4 = (value) => String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  var button = (action, label, extra = "") => `<button type="button" data-pr-action="${action}" ${extra}>${label}</button>`;
  async function main() {
    let prefs = { fontSize: 20, palette: "paper", positions: {} };
    try {
      const saved = JSON.parse(await Risuai.safeLocalStorage.getItem(STORE) || "null");
      if (saved && typeof saved === "object") {
        prefs.fontSize = Math.max(16, Math.min(28, Number(saved.fontSize) || 20));
        if (["paper", "white", "night"].includes(saved.palette)) prefs.palette = saved.palette;
        if (saved.positions && typeof saved.positions === "object" && !Array.isArray(saved.positions)) prefs.positions = saved.positions;
      }
    } catch {
    }
    let doc, screen, mount, root, book, viewport, end, contentStyle, globalStyle, composer;
    let disposed = false, busy = false, seenSelection = "", roomKey = "", character, rows = [], rowIndex = 0, page = 0, pages = 1, width = 1;
    let pollTimer, saveTimer, signature = "", lastLayout = "", loadVersion = 0, actionQueue = Promise.resolve();
    const listeners = [], nodes = /* @__PURE__ */ new Map();
    const q = async (selector2) => {
      if (selector2.includes("[open]") || selector2.includes(":focus") || selector2.includes("toc")) return root.querySelector(selector2);
      if (!nodes.has(selector2)) nodes.set(selector2, await root.querySelector(selector2));
      return nodes.get(selector2);
    };
    const run = (fn) => {
      actionQueue = actionQueue.then(() => disposed ? void 0 : fn()).catch((error2) => showError(error2));
      return actionQueue;
    };
    async function showError(error2) {
      console.error("[Paper Reader]", error2);
      if (root) await (await q("[data-pr-status]"))?.setTextContent("\uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC5B4\uC694. \uC0C8\uB85C\uACE0\uCE68\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694.");
    }
    async function persist() {
      try {
        await Risuai.safeLocalStorage.setItem(STORE, JSON.stringify(prefs));
      } catch {
      }
    }
    function saveSoon() {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(() => void persist(), 250);
    }
    function remember() {
      if (!roomKey || !rows[rowIndex]) return;
      prefs.positions[roomKey] = { id: rows[rowIndex].id, index: rows[rowIndex].index, fraction: page / Math.max(1, pages - 1), at: Date.now() };
      const keys = Object.keys(prefs.positions).sort((a, b) => (prefs.positions[b]?.at || 0) - (prefs.positions[a]?.at || 0));
      for (const key of keys.slice(150)) delete prefs.positions[key];
      saveSoon();
    }
    async function selection() {
      const ci = await Risuai.getCurrentCharacterIndex();
      if (ci < 0) return null;
      const ri = await Risuai.getCurrentChatIndex();
      return { ci, ri, key: `${ci}:${ri}` };
    }
    async function ensureDocument() {
      if (doc) return true;
      doc = await Risuai.getRootDocument();
      if (!doc) return false;
      globalStyle = await doc.createElement("style");
      await globalStyle.setAttribute("x-paper-style", "");
      await globalStyle.setTextContent(theme_default);
      const head = await doc.querySelector("head");
      await head.appendChild(globalStyle);
      contentStyle = await doc.createElement("style");
      await contentStyle.setAttribute("x-paper-content-style", "");
      await head.appendChild(contentStyle);
      head.release();
      listeners.push(["click", await doc.addEventListener("click", (e) => void run(() => onClick(e)))]);
      listeners.push(["keydown", await doc.addEventListener("keydown", (e) => void run(() => onKey(e)))]);
      let touch;
      listeners.push(["pointerdown", await doc.addEventListener("pointerdown", (e) => {
        touch = { x: e.clientX, y: e.clientY };
      })]);
      listeners.push(["pointerup", await doc.addEventListener("pointerup", (e) => {
        const start = touch;
        touch = null;
        if (!start || !viewport || Math.abs(e.clientX - start.x) < 70 || Math.abs(e.clientX - start.x) < Math.abs(e.clientY - start.y) * 1.5) return;
        void run(async () => {
          const r = await viewport.getBoundingClientRect();
          if (start.x >= r.left && start.x <= r.right && start.y >= r.top && start.y <= r.bottom) await turn(e.clientX < start.x ? 1 : -1);
        });
      })]);
      return true;
    }
    async function detach() {
      if (screen) await screen.setAttribute("x-paper-theme", "off");
      if (mount) await mount.remove();
      for (const node of nodes.values()) node?.release();
      nodes.clear();
      for (const node of [screen, mount, root, end, composer]) node?.release();
      screen = mount = root = book = viewport = end = composer = null;
      lastLayout = "";
      if (contentStyle) await contentStyle.setTextContent("");
    }
    async function attach() {
      const found = await doc.querySelector(".default-chat-screen");
      if (!found) {
        await detach();
        return false;
      }
      const existing = await found.querySelector("[data-pr-paper-root]");
      if (existing) {
        existing.release();
        found.release();
        return true;
      }
      await detach();
      screen = found;
      composer = await screen.querySelector(".text-input-area");
      if (!composer) return false;
      let parent = await composer.getParent();
      while (parent && !await parent.matches(".default-chat-screen > div")) {
        const next = await parent.getParent();
        parent.release();
        parent = next;
      }
      if (!parent) return false;
      await parent.setAttribute("x-paper-composer", "");
      parent.release();
      mount = await doc.createElement("div");
      await mount.setAttribute("x-paper-mount", "");
      await mount.setInnerHTML(`<section data-pr-paper-root="" class="${PREFIX}root" aria-label="\uC885\uC774\uCC45 \uCC44\uD305">
      <div class="${PREFIX}toolbar"><strong>\uC885\uC774\uCC45</strong><span data-pr-room-title="" class="${PREFIX}room"></span>
      <details class="${PREFIX}settings"><summary>Aa</summary><div>${button("smaller", "\uAE00\uC790 \u2212")}${button("larger", "\uAE00\uC790 +")}${button("paper", "\uC885\uC774")}${button("white", "\uBC1D\uAC8C")}${button("night", "\uC57C\uAC04")}</div></details></div>
      <div class="${PREFIX}reading"><div class="${PREFIX}paper"><div class="${PREFIX}head" data-pr-heading=""></div>
      <div class="${PREFIX}viewport" tabindex="0" aria-label="\uCC45 \uBCF8\uBB38"><article class="${PREFIX}entry"><div class="${PREFIX}book"></div></article></div>
      <p data-pr-status="" role="status" class="${PREFIX}status"></p></div>
      <nav class="${PREFIX}footer" aria-label="\uCC45\uC7A5 \uC774\uB3D9">${button("first", "\uCC98\uC74C")}${button("prev", "\u2039 \uC774\uC804")}<span data-pr-page-label="" aria-live="polite"></span>${button("next", "\uB2E4\uC74C \u203A")}${button("last", "\uCD5C\uADFC")}${button("refresh", "\uC0C8\uB85C\uACE0\uCE68")}</nav>
      <details class="${PREFIX}toc"><summary>\uB300\uD654 \uBAA9\uCC28</summary><div data-pr-toc=""></div></details></div></section>`);
      await screen.appendChild(mount);
      root = await mount.querySelector("[data-pr-paper-root]");
      viewport = await q("." + PREFIX + "viewport");
      book = await q("." + PREFIX + "book");
      await (await q("." + PREFIX + "entry")).setClassName("risu-chat " + PREFIX + "entry");
      await book.setClassName("chattext prose text chat-width " + PREFIX + "book");
      await applyPreferences();
      await screen.setAttribute("x-paper-theme", "on");
      return true;
    }
    async function applyPreferences() {
      if (!root) return;
      await root.setAttribute("x-palette", prefs.palette);
      await root.setStyleAttribute(`--pr-font:${prefs.fontSize}px`);
    }
    function collect(chat, char) {
      const list2 = [], greeting = chat.fmIndex >= 0 ? char.alternateGreetings?.[chat.fmIndex] : char.firstMessage;
      if (!chat.firstMessageDisabled && typeof greeting === "string" && greeting.trim()) list2.push({ id: "greeting", index: -1, text: greeting, role: "char" });
      for (let i = 0; i < (chat.message?.length || 0); i++) {
        const m = chat.message[i];
        list2.push({ id: m.chatId || `index-${i}`, index: i, text: String(m.data ?? ""), role: m.role, comment: m.isComment });
      }
      return list2;
    }
    async function refresh() {
      if (!await ensureDocument() || !await attach()) return;
      await root.setAttribute("x-ready", "false");
      const ticket = ++loadVersion, sel = await selection();
      if (!sel) return;
      const chat = await Risuai.getChatFromIndex(sel.ci, sel.ri), char = await Risuai.getCharacter();
      if (disposed || ticket !== loadVersion || (await selection())?.key !== sel.key) return;
      if (!chat || chat._placeholder) throw new Error("Chat is not loaded");
      remember();
      const nextKey = `${char.chaId || sel.ci}/${chat.id || sel.ri}`, saved = prefs.positions[nextKey];
      roomKey = nextKey;
      character = char;
      rows = collect(chat, char);
      seenSelection = sel.key;
      signature = JSON.stringify(chat.message);
      rowIndex = Math.max(0, rows.findIndex((r) => r.id === saved?.id || r.index === saved?.index));
      page = 0;
      pages = 1;
      await root.setAttribute("x-room", roomKey);
      await root.setAttribute("x-message-count", String(rows.length));
      await (await q("[data-pr-room-title]")).setTextContent(chat.name || char.name || "\uC5F4\uB9B0 \uCC44\uD305\uBC29");
      const tocBody = await q("[data-pr-toc]");
      await tocBody.setInnerHTML(rows.map((row, i) => button("jump", `${row.index < 0 ? "\uC778\uC0AC\uB9D0" : `#${row.index}`} \xB7 ${escape4(row.text.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").slice(0, 40))}`, `data-pr-index="${i}"`)).join(""));
      tocBody.release();
      await render(saved?.fraction || 0);
    }
    async function render(fraction = 0) {
      if (!root) return;
      await root.setAttribute("x-ready", "false");
      const row = rows[rowIndex];
      await book.setStyle("transform", "none");
      const output = renderMessage(row?.text || "\uC544\uC9C1 \uAE30\uB85D\uB41C \uB300\uD654\uAC00 \uC5C6\uC5B4\uC694.", character);
      await contentStyle.setTextContent(output.css);
      await book.setInnerHTML(output.html + `<span class="${PREFIX}end" aria-hidden="true">\u200B</span>`);
      end?.release();
      end = await book.querySelector(":scope > ." + PREFIX + "end:last-child");
      await (await q("." + PREFIX + "entry")).setAttribute("x-message-index", String(row?.index ?? -1));
      await (await q("[data-pr-heading]")).setTextContent(row ? `${row.index < 0 ? "\uCCAB \uC778\uC0AC\uB9D0" : `\uB300\uD654 ${row.index + 1}`} \xB7 ${row.comment ? "\uBA54\uBAA8" : row.role === "user" ? "\uB098" : character.name}` : "\uC5F4\uB9B0 \uCC44\uD305\uBC29");
      page = 0;
      lastLayout = "";
      await layout(fraction);
      remember();
      await root.setAttribute("x-ready", "true");
    }
    async function layout(fraction = null) {
      if (!end || !viewport) return;
      const [w, h] = await Promise.all([viewport.clientWidth(), viewport.clientHeight()]);
      if (w < 1 || h < 1) return;
      const oldFraction = page / Math.max(1, pages - 1), size = `${w}:${h}:${prefs.fontSize}`;
      width = w;
      await book.setStyle("width", `${width}px`);
      await book.setStyle("height", `${h}px`);
      await book.setStyle("maxHeight", `${h}px`);
      await root.setStyleAttribute(`--pr-font:${prefs.fontSize}px;--pr-height:${h}px`);
      const [b, r] = await Promise.all([book.getBoundingClientRect(), end.getBoundingClientRect()]);
      const scale = b.width / width || 1;
      pages = Math.max(1, Math.round((r.left - b.left) / scale / (width + GAP)) + 1);
      if (fraction !== null || size !== lastLayout) page = Math.round(Math.max(0, Math.min(1, fraction ?? oldFraction)) * (pages - 1));
      lastLayout = size;
      page = Math.max(0, Math.min(pages - 1, page));
      await paint();
    }
    async function paint() {
      if (!root) return;
      await book.setStyle("transform", `translateX(${-page * (width + GAP)}px)`);
      await root.setAttribute("x-page", String(page));
      await root.setAttribute("x-pages", String(pages));
      await (await q("[data-pr-page-label]")).setTextContent(`${rowIndex + 1} / ${rows.length} \uB300\uD654 \xB7 ${page + 1} / ${pages}\uCABD`);
      await (await q("[data-pr-status]")).setTextContent("");
    }
    async function turn(delta) {
      if (!rows.length) return;
      if (page + delta >= 0 && page + delta < pages) {
        page += delta;
        await paint();
        remember();
        return;
      }
      if (rowIndex + delta < 0 || rowIndex + delta >= rows.length) return;
      rowIndex += delta;
      await render(delta < 0 ? 1 : 0);
    }
    async function action(name50, index) {
      if (name50 === "refresh") {
        await refresh();
        return;
      }
      if (name50 === "prev" || name50 === "next") {
        await turn(name50 === "prev" ? -1 : 1);
        return;
      }
      if (name50 === "jump" || name50 === "first" || name50 === "last") {
        rowIndex = name50 === "first" ? 0 : name50 === "last" ? Math.max(0, rows.length - 1) : Math.max(0, Math.min(rows.length - 1, Number(index) || 0));
        await render(name50 === "last" ? 1 : 0);
        const toc = await q("." + PREFIX + "toc"), tocBody = await q("[data-pr-toc]"), html2 = await tocBody.getOuterHTML();
        tocBody.release();
        await toc.setOuterHTML(`<details class="${PREFIX}toc"><summary>\uB300\uD654 \uBAA9\uCC28</summary>${html2}</details>`);
        toc.release();
        return;
      }
      if (name50 === "smaller" || name50 === "larger") prefs.fontSize = Math.max(16, Math.min(28, prefs.fontSize + (name50 === "larger" ? 2 : -2)));
      if (["paper", "white", "night"].includes(name50)) prefs.palette = name50;
      await applyPreferences();
      await layout();
      saveSoon();
    }
    async function onClick(e) {
      if (!root) return;
      const r = await root.getBoundingClientRect();
      if ((e.clientX || e.clientY) && (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)) return;
      let control;
      if (e.clientX === 0 && e.clientY === 0) control = await q("button[data-pr-action]:focus");
      else {
        let scope = root, selector2 = ".x-risu-pr-toolbar > button, .x-risu-pr-footer button";
        for (const sel of [".x-risu-pr-toc[open] > div", ".x-risu-pr-settings[open] > div"]) {
          const popup = await q(sel);
          if (!popup) continue;
          const b = await popup.getBoundingClientRect();
          if (e.clientX >= b.left && e.clientX <= b.right && e.clientY >= b.top && e.clientY <= b.bottom) {
            scope = popup;
            selector2 = "button[data-pr-action]";
            break;
          }
          popup.release();
        }
        const controls = await scope.querySelectorAll(selector2), count = await controls.length();
        const candidates = await Promise.all(Array.from({ length: count }, (_, i) => controls.at(i)));
        const bounds = await Promise.all(candidates.map((c) => c.getBoundingClientRect()));
        for (let i = 0; i < count; i++) {
          const b = bounds[i], c = candidates[i];
          if (!control && b.width && b.height && e.clientX >= b.left && e.clientX <= b.right && e.clientY >= b.top && e.clientY <= b.bottom) control = c;
          else c.release();
        }
        controls.release();
        if (scope !== root) scope.release();
      }
      if (control) {
        const tag = new DOMParser().parseFromString(await control.getOuterHTML(), "text/html").querySelector("button");
        const name50 = tag?.getAttribute("data-pr-action"), index = tag?.getAttribute("data-pr-index");
        control.release();
        await action(name50, index);
      }
    }
    async function onKey(e) {
      if (!root || !await root.matches(":focus-within")) return;
      if (["ArrowRight", "PageDown"].includes(e.key)) await turn(1);
      else if (["ArrowLeft", "PageUp"].includes(e.key)) await turn(-1);
      else if (e.key === "Home") await action("first");
      else if (e.key === "End") await action("last");
    }
    async function poll() {
      if (disposed || busy) return;
      busy = true;
      try {
        const sel = await selection();
        if (!sel) {
          seenSelection = "";
          if (mount) {
            remember();
            await detach();
          }
          return;
        }
        if (!doc) {
          await refresh();
          return;
        }
        const existing = await doc.querySelector("[data-pr-paper-root]");
        if (sel.key !== seenSelection || !existing) {
          existing?.release();
          await refresh();
          return;
        }
        existing.release();
        {
          const chat = await Risuai.getChatFromIndex(sel.ci, sel.ri);
          if ((await selection())?.key !== sel.key) return;
          if (chat && !chat._placeholder && JSON.stringify(chat.message) !== signature) {
            const follow = rowIndex === rows.length - 1 && page === pages - 1;
            await refresh();
            if (follow) await action("last");
          } else await layout();
        }
      } catch (error2) {
        await showError(error2);
      } finally {
        busy = false;
      }
    }
    await Risuai.onUnload(async () => {
      disposed = true;
      loadVersion++;
      clearInterval(pollTimer);
      clearTimeout(saveTimer);
      await actionQueue;
      remember();
      clearTimeout(saveTimer);
      await persist();
      await detach();
      for (const [type, id] of listeners) await doc.removeEventListener(type, id);
      await globalStyle?.remove();
      await contentStyle?.remove();
    });
    pollTimer = setInterval(() => void run(poll), 700);
    await run(poll);
  }
  main().catch((error2) => console.error("[Paper Reader]", error2));
})();
/*! Bundled license information:

dompurify/dist/purify.es.mjs:
  (*! @license DOMPurify 3.4.17 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.17/LICENSE *)
  (*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE *)
*/

/*!
Third-party licenses for bundled reader dependencies

css-tree 3.1.0
Copyright (C) 2016-2024 by Roman Dvornov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


dompurify 3.4.17

                                 Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/

   TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

   1. Definitions.

      "License" shall mean the terms and conditions for use, reproduction,
      and distribution as defined by Sections 1 through 9 of this document.

      "Licensor" shall mean the copyright owner or entity authorized by
      the copyright owner that is granting the License.

      "Legal Entity" shall mean the union of the acting entity and all
      other entities that control, are controlled by, or are under common
      control with that entity. For the purposes of this definition,
      "control" means (i) the power, direct or indirect, to cause the
      direction or management of such entity, whether by contract or
      otherwise, or (ii) ownership of fifty percent (50%) or more of the
      outstanding shares, or (iii) beneficial ownership of such entity.

      "You" (or "Your") shall mean an individual or Legal Entity
      exercising permissions granted by this License.

      "Source" form shall mean the preferred form for making modifications,
      including but not limited to software source code, documentation
      source, and configuration files.

      "Object" form shall mean any form resulting from mechanical
      transformation or translation of a Source form, including but
      not limited to compiled object code, generated documentation,
      and conversions to other media types.

      "Work" shall mean the work of authorship, whether in Source or
      Object form, made available under the License, as indicated by a
      copyright notice that is included in or attached to the work
      (an example is provided in the Appendix below).

      "Derivative Works" shall mean any work, whether in Source or Object
      form, that is based on (or derived from) the Work and for which the
      editorial revisions, annotations, elaborations, or other modifications
      represent, as a whole, an original work of authorship. For the purposes
      of this License, Derivative Works shall not include works that remain
      separable from, or merely link (or bind by name) to the interfaces of,
      the Work and Derivative Works thereof.

      "Contribution" shall mean any work of authorship, including
      the original version of the Work and any modifications or additions
      to that Work or Derivative Works thereof, that is intentionally
      submitted to Licensor for inclusion in the Work by the copyright owner
      or by an individual or Legal Entity authorized to submit on behalf of
      the copyright owner. For the purposes of this definition, "submitted"
      means any form of electronic, verbal, or written communication sent
      to the Licensor or its representatives, including but not limited to
      communication on electronic mailing lists, source code control systems,
      and issue tracking systems that are managed by, or on behalf of, the
      Licensor for the purpose of discussing and improving the Work, but
      excluding communication that is conspicuously marked or otherwise
      designated in writing by the copyright owner as "Not a Contribution."

      "Contributor" shall mean Licensor and any individual or Legal Entity
      on behalf of whom a Contribution has been received by Licensor and
      subsequently incorporated within the Work.

   2. Grant of Copyright License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      copyright license to reproduce, prepare Derivative Works of,
      publicly display, publicly perform, sublicense, and distribute the
      Work and such Derivative Works in Source or Object form.

   3. Grant of Patent License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      (except as stated in this section) patent license to make, have made,
      use, offer to sell, sell, import, and otherwise transfer the Work,
      where such license applies only to those patent claims licensable
      by such Contributor that are necessarily infringed by their
      Contribution(s) alone or by combination of their Contribution(s)
      with the Work to which such Contribution(s) was submitted. If You
      institute patent litigation against any entity (including a
      cross-claim or counterclaim in a lawsuit) alleging that the Work
      or a Contribution incorporated within the Work constitutes direct
      or contributory patent infringement, then any patent licenses
      granted to You under this License for that Work shall terminate
      as of the date such litigation is filed.

   4. Redistribution. You may reproduce and distribute copies of the
      Work or Derivative Works thereof in any medium, with or without
      modifications, and in Source or Object form, provided that You
      meet the following conditions:

      (a) You must give any other recipients of the Work or
          Derivative Works a copy of this License; and

      (b) You must cause any modified files to carry prominent notices
          stating that You changed the files; and

      (c) You must retain, in the Source form of any Derivative Works
          that You distribute, all copyright, patent, trademark, and
          attribution notices from the Source form of the Work,
          excluding those notices that do not pertain to any part of
          the Derivative Works; and

      (d) If the Work includes a "NOTICE" text file as part of its
          distribution, then any Derivative Works that You distribute must
          include a readable copy of the attribution notices contained
          within such NOTICE file, excluding those notices that do not
          pertain to any part of the Derivative Works, in at least one
          of the following places: within a NOTICE text file distributed
          as part of the Derivative Works; within the Source form or
          documentation, if provided along with the Derivative Works; or,
          within a display generated by the Derivative Works, if and
          wherever such third-party notices normally appear. The contents
          of the NOTICE file are for informational purposes only and
          do not modify the License. You may add Your own attribution
          notices within Derivative Works that You distribute, alongside
          or as an addendum to the NOTICE text from the Work, provided
          that such additional attribution notices cannot be construed
          as modifying the License.

      You may add Your own copyright statement to Your modifications and
      may provide additional or different license terms and conditions
      for use, reproduction, or distribution of Your modifications, or
      for any such Derivative Works as a whole, provided Your use,
      reproduction, and distribution of the Work otherwise complies with
      the conditions stated in this License.

   5. Submission of Contributions. Unless You explicitly state otherwise,
      any Contribution intentionally submitted for inclusion in the Work
      by You to the Licensor shall be under the terms and conditions of
      this License, without any additional terms or conditions.
      Notwithstanding the above, nothing herein shall supersede or modify
      the terms of any separate license agreement you may have executed
      with Licensor regarding such Contributions.

   6. Trademarks. This License does not grant permission to use the trade
      names, trademarks, service marks, or product names of the Licensor,
      except as required for reasonable and customary use in describing the
      origin of the Work and reproducing the content of the NOTICE file.

   7. Disclaimer of Warranty. Unless required by applicable law or
      agreed to in writing, Licensor provides the Work (and each
      Contributor provides its Contributions) on an "AS IS" BASIS,
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
      implied, including, without limitation, any warranties or conditions
      of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
      PARTICULAR PURPOSE. You are solely responsible for determining the
      appropriateness of using or redistributing the Work and assume any
      risks associated with Your exercise of permissions under this License.

   8. Limitation of Liability. In no event and under no legal theory,
      whether in tort (including negligence), contract, or otherwise,
      unless required by applicable law (such as deliberate and grossly
      negligent acts) or agreed to in writing, shall any Contributor be
      liable to You for damages, including any direct, indirect, special,
      incidental, or consequential damages of any character arising as a
      result of this License or out of the use or inability to use the
      Work (including but not limited to damages for loss of goodwill,
      work stoppage, computer failure or malfunction, or any and all
      other commercial damages or losses), even if such Contributor
      has been advised of the possibility of such damages.

   9. Accepting Warranty or Additional Liability. While redistributing
      the Work or Derivative Works thereof, You may choose to offer,
      and charge a fee for, acceptance of support, warranty, indemnity,
      or other liability obligations and/or rights consistent with this
      License. However, in accepting such obligations, You may act only
      on Your own behalf and on Your sole responsibility, not on behalf
      of any other Contributor, and only if You agree to indemnify,
      defend, and hold each Contributor harmless for any liability
      incurred by, or claims asserted against, such Contributor by reason
      of your accepting any such warranty or additional liability.

   END OF TERMS AND CONDITIONS

   APPENDIX: How to apply the Apache License to your work.

      To apply the Apache License to your work, attach the following
      boilerplate notice, with the fields enclosed by brackets "[]"
      replaced with your own identifying information. (Don't include
      the brackets!)  The text should be enclosed in the appropriate
      comment syntax for the file format. We also recommend that a
      file or class name and description of purpose be included on the
      same "printed page" as the copyright notice for easier
      identification within third-party archives.

   Copyright [yyyy] [name of copyright owner]

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.


entities 4.5.0
Copyright (c) Felix Böhm
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

THIS IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS,
EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


linkify-it 5.0.2
Copyright (c) 2015 Vitaly Puzrin.

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.


markdown-it 14.1.0
Copyright (c) 2014 Vitaly Puzrin, Alex Kocharin.

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.


mdurl 2.1.0
Copyright (c) 2015 Vitaly Puzrin, Alex Kocharin.

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

--------------------------------------------------------------------------------

.parse() is based on Joyent's node.js `url` code:

Copyright Joyent, Inc. and other Node contributors. All rights reserved.
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.


punycode.js 2.3.1
Copyright Mathias Bynens <https://mathiasbynens.be/>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


source-map-js 1.2.2

Copyright (c) 2009-2011, Mozilla Foundation and contributors
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the names of the Mozilla Foundation nor the names of project
  contributors may be used to endorse or promote products derived from this
  software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


uc.micro 2.1.0
Copyright Mathias Bynens <https://mathiasbynens.be/>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

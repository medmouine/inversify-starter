/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.ts":
/*!****************!*\
  !*** ./app.ts ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(__dirname) {\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__webpack_require__(/*! reflect-metadata */ \"reflect-metadata\");\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\nconst compression = __webpack_require__(/*! compression */ \"compression\");\nconst cors = __webpack_require__(/*! cors */ \"cors\");\nconst errorHandler = __webpack_require__(/*! errorhandler */ \"errorhandler\");\nconst express = __webpack_require__(/*! express */ \"express\");\nconst expressStatusMonitor = __webpack_require__(/*! express-status-monitor */ \"express-status-monitor\");\nconst helmet = __webpack_require__(/*! helmet */ \"helmet\");\nconst inversify_1 = __webpack_require__(/*! inversify */ \"inversify\");\nconst inversify_express_utils_1 = __webpack_require__(/*! inversify-express-utils */ \"inversify-express-utils\");\nconst methodOverride = __webpack_require__(/*! method-override */ \"method-override\");\nconst morgan = __webpack_require__(/*! morgan */ \"morgan\");\nconst path = __webpack_require__(/*! path */ \"path\");\nconst logger_1 = __webpack_require__(/*! ./logger */ \"./logger/index.ts\");\nclass Server {\n    static bootstrap() {\n        return new Server();\n    }\n    constructor() {\n        this.container = new inversify_1.Container();\n        const inversifyApp = new inversify_express_utils_1.InversifyExpressServer(this.container);\n        // configure application\n        inversifyApp.setConfig((app) => {\n            return this.config(app);\n        });\n        this.app = inversifyApp.build();\n    }\n    config(app) {\n        // add static paths\n        app.use(express.static(path.join(__dirname, 'public')));\n        // mount logger\n        app.use(morgan('tiny', {\n            stream: {\n                write: (message) => logger_1.logger.info(message.trim()),\n            },\n        }));\n        app.use(bodyParser.urlencoded({\n            extended: true,\n        }));\n        app.use(bodyParser.json({ limit: '50mb' }));\n        app.use(helmet());\n        app.use(cors());\n        app.use(compression());\n        app.use(methodOverride());\n        app.use(expressStatusMonitor());\n        // catch 404 and forward to error handler\n        app.use((err, req, res, next) => {\n            err.status = 404;\n            next(err);\n        });\n        // error handling\n        app.use(errorHandler());\n    }\n}\nexports.Server = Server;\n\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hcHAudHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAudHM/NDYzMCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnJlcXVpcmUoXCJyZWZsZWN0LW1ldGFkYXRhXCIpO1xuY29uc3QgYm9keVBhcnNlciA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTtcbmNvbnN0IGNvbXByZXNzaW9uID0gcmVxdWlyZShcImNvbXByZXNzaW9uXCIpO1xuY29uc3QgY29ycyA9IHJlcXVpcmUoXCJjb3JzXCIpO1xuY29uc3QgZXJyb3JIYW5kbGVyID0gcmVxdWlyZShcImVycm9yaGFuZGxlclwiKTtcbmNvbnN0IGV4cHJlc3MgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTtcbmNvbnN0IGV4cHJlc3NTdGF0dXNNb25pdG9yID0gcmVxdWlyZShcImV4cHJlc3Mtc3RhdHVzLW1vbml0b3JcIik7XG5jb25zdCBoZWxtZXQgPSByZXF1aXJlKFwiaGVsbWV0XCIpO1xuY29uc3QgaW52ZXJzaWZ5XzEgPSByZXF1aXJlKFwiaW52ZXJzaWZ5XCIpO1xuY29uc3QgaW52ZXJzaWZ5X2V4cHJlc3NfdXRpbHNfMSA9IHJlcXVpcmUoXCJpbnZlcnNpZnktZXhwcmVzcy11dGlsc1wiKTtcbmNvbnN0IG1ldGhvZE92ZXJyaWRlID0gcmVxdWlyZShcIm1ldGhvZC1vdmVycmlkZVwiKTtcbmNvbnN0IG1vcmdhbiA9IHJlcXVpcmUoXCJtb3JnYW5cIik7XG5jb25zdCBwYXRoID0gcmVxdWlyZShcInBhdGhcIik7XG5jb25zdCBsb2dnZXJfMSA9IHJlcXVpcmUoXCIuL2xvZ2dlclwiKTtcbmNsYXNzIFNlcnZlciB7XG4gICAgc3RhdGljIGJvb3RzdHJhcCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZXJ2ZXIoKTtcbiAgICB9XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gbmV3IGludmVyc2lmeV8xLkNvbnRhaW5lcigpO1xuICAgICAgICBjb25zdCBpbnZlcnNpZnlBcHAgPSBuZXcgaW52ZXJzaWZ5X2V4cHJlc3NfdXRpbHNfMS5JbnZlcnNpZnlFeHByZXNzU2VydmVyKHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgLy8gY29uZmlndXJlIGFwcGxpY2F0aW9uXG4gICAgICAgIGludmVyc2lmeUFwcC5zZXRDb25maWcoKGFwcCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnKGFwcCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmFwcCA9IGludmVyc2lmeUFwcC5idWlsZCgpO1xuICAgIH1cbiAgICBjb25maWcoYXBwKSB7XG4gICAgICAgIC8vIGFkZCBzdGF0aWMgcGF0aHNcbiAgICAgICAgYXBwLnVzZShleHByZXNzLnN0YXRpYyhwYXRoLmpvaW4oX19kaXJuYW1lLCAncHVibGljJykpKTtcbiAgICAgICAgLy8gbW91bnQgbG9nZ2VyXG4gICAgICAgIGFwcC51c2UobW9yZ2FuKCd0aW55Jywge1xuICAgICAgICAgICAgc3RyZWFtOiB7XG4gICAgICAgICAgICAgICAgd3JpdGU6IChtZXNzYWdlKSA9PiBsb2dnZXJfMS5sb2dnZXIuaW5mbyhtZXNzYWdlLnRyaW0oKSksXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KSk7XG4gICAgICAgIGFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHtcbiAgICAgICAgICAgIGV4dGVuZGVkOiB0cnVlLFxuICAgICAgICB9KSk7XG4gICAgICAgIGFwcC51c2UoYm9keVBhcnNlci5qc29uKHsgbGltaXQ6ICc1MG1iJyB9KSk7XG4gICAgICAgIGFwcC51c2UoaGVsbWV0KCkpO1xuICAgICAgICBhcHAudXNlKGNvcnMoKSk7XG4gICAgICAgIGFwcC51c2UoY29tcHJlc3Npb24oKSk7XG4gICAgICAgIGFwcC51c2UobWV0aG9kT3ZlcnJpZGUoKSk7XG4gICAgICAgIGFwcC51c2UoZXhwcmVzc1N0YXR1c01vbml0b3IoKSk7XG4gICAgICAgIC8vIGNhdGNoIDQwNCBhbmQgZm9yd2FyZCB0byBlcnJvciBoYW5kbGVyXG4gICAgICAgIGFwcC51c2UoKGVyciwgcmVxLCByZXMsIG5leHQpID0+IHtcbiAgICAgICAgICAgIGVyci5zdGF0dXMgPSA0MDQ7XG4gICAgICAgICAgICBuZXh0KGVycik7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICBhcHAudXNlKGVycm9ySGFuZGxlcigpKTtcbiAgICB9XG59XG5leHBvcnRzLlNlcnZlciA9IFNlcnZlcjtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./app.ts\n");

/***/ }),

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst logger_1 = __webpack_require__(/*! @/logger */ \"./logger/index.ts\");\nconst config = __webpack_require__(/*! config */ \"config\");\n__webpack_require__(/*! reflect-metadata */ \"reflect-metadata\");\nconst app_1 = __webpack_require__(/*! ./app */ \"./app.ts\");\n__webpack_require__(/*! ./routes/helloWorldRoute */ \"./routes/helloWorldRoute.ts\");\n// create http server\nexports.app = app_1.Server.bootstrap().app;\nexports.server = exports.app.listen(config.get('port'));\nlogger_1.logger.info(`listening on port ${config.get('port')}`);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9pbmRleC50cy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2luZGV4LnRzPzMwYjQiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBsb2dnZXJfMSA9IHJlcXVpcmUoXCJAL2xvZ2dlclwiKTtcbmNvbnN0IGNvbmZpZyA9IHJlcXVpcmUoXCJjb25maWdcIik7XG5yZXF1aXJlKFwicmVmbGVjdC1tZXRhZGF0YVwiKTtcbmNvbnN0IGFwcF8xID0gcmVxdWlyZShcIi4vYXBwXCIpO1xucmVxdWlyZShcIi4vcm91dGVzL2hlbGxvV29ybGRSb3V0ZVwiKTtcbi8vIGNyZWF0ZSBodHRwIHNlcnZlclxuZXhwb3J0cy5hcHAgPSBhcHBfMS5TZXJ2ZXIuYm9vdHN0cmFwKCkuYXBwO1xuZXhwb3J0cy5zZXJ2ZXIgPSBleHBvcnRzLmFwcC5saXN0ZW4oY29uZmlnLmdldCgncG9ydCcpKTtcbmxvZ2dlcl8xLmxvZ2dlci5pbmZvKGBsaXN0ZW5pbmcgb24gcG9ydCAke2NvbmZpZy5nZXQoJ3BvcnQnKX1gKTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./index.ts\n");

/***/ }),

/***/ "./logger/index.ts":
/*!*************************!*\
  !*** ./logger/index.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nfunction __export(m) {\n    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\n}\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__export(__webpack_require__(/*! ./logger */ \"./logger/logger.ts\"));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9sb2dnZXIvaW5kZXgudHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9sb2dnZXIvaW5kZXgudHM/NzFmYyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbmZ1bmN0aW9uIF9fZXhwb3J0KG0pIHtcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XG59XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9sb2dnZXJcIikpO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./logger/index.ts\n");

/***/ }),

/***/ "./logger/logger.ts":
/*!**************************!*\
  !*** ./logger/logger.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst debug = __webpack_require__(/*! debug */ \"debug\");\nconst fs = __webpack_require__(/*! fs */ \"fs\");\nconst winston = __webpack_require__(/*! winston */ \"winston\");\nconst PATHS = {\n    LOG: `${process.cwd()}/logs`,\n    LOG_ERROR: `${process.cwd()}/logs/_error.log`,\n    LOG_INFO: `${process.cwd()}/logs/_info.log`,\n};\n// ensure log directory exists\n(() => fs.existsSync(PATHS.LOG) || fs.mkdirSync(PATHS.LOG))();\nexports.dbg = debug('express:server');\nexports.logger = winston.createLogger({\n    exitOnError: false,\n    format: winston.format.combine(winston.format.splat(), winston.format.simple()),\n    transports: [\n        new winston.transports.File({\n            filename: PATHS.LOG_INFO,\n            handleExceptions: true,\n            level: 'info',\n            maxFiles: 2,\n            maxsize: 5242880,\n        }),\n        new winston.transports.File({\n            filename: PATHS.LOG_ERROR,\n            handleExceptions: true,\n            level: 'error',\n            maxFiles: 2,\n            maxsize: 5242880,\n        }),\n        new winston.transports.Console({\n            handleExceptions: true,\n            level: 'debug',\n        }),\n    ],\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9sb2dnZXIvbG9nZ2VyLnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbG9nZ2VyL2xvZ2dlci50cz8xZDA2Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZGVidWcgPSByZXF1aXJlKFwiZGVidWdcIik7XG5jb25zdCBmcyA9IHJlcXVpcmUoXCJmc1wiKTtcbmNvbnN0IHdpbnN0b24gPSByZXF1aXJlKFwid2luc3RvblwiKTtcbmNvbnN0IFBBVEhTID0ge1xuICAgIExPRzogYCR7cHJvY2Vzcy5jd2QoKX0vbG9nc2AsXG4gICAgTE9HX0VSUk9SOiBgJHtwcm9jZXNzLmN3ZCgpfS9sb2dzL19lcnJvci5sb2dgLFxuICAgIExPR19JTkZPOiBgJHtwcm9jZXNzLmN3ZCgpfS9sb2dzL19pbmZvLmxvZ2AsXG59O1xuLy8gZW5zdXJlIGxvZyBkaXJlY3RvcnkgZXhpc3RzXG4oKCkgPT4gZnMuZXhpc3RzU3luYyhQQVRIUy5MT0cpIHx8IGZzLm1rZGlyU3luYyhQQVRIUy5MT0cpKSgpO1xuZXhwb3J0cy5kYmcgPSBkZWJ1ZygnZXhwcmVzczpzZXJ2ZXInKTtcbmV4cG9ydHMubG9nZ2VyID0gd2luc3Rvbi5jcmVhdGVMb2dnZXIoe1xuICAgIGV4aXRPbkVycm9yOiBmYWxzZSxcbiAgICBmb3JtYXQ6IHdpbnN0b24uZm9ybWF0LmNvbWJpbmUod2luc3Rvbi5mb3JtYXQuc3BsYXQoKSwgd2luc3Rvbi5mb3JtYXQuc2ltcGxlKCkpLFxuICAgIHRyYW5zcG9ydHM6IFtcbiAgICAgICAgbmV3IHdpbnN0b24udHJhbnNwb3J0cy5GaWxlKHtcbiAgICAgICAgICAgIGZpbGVuYW1lOiBQQVRIUy5MT0dfSU5GTyxcbiAgICAgICAgICAgIGhhbmRsZUV4Y2VwdGlvbnM6IHRydWUsXG4gICAgICAgICAgICBsZXZlbDogJ2luZm8nLFxuICAgICAgICAgICAgbWF4RmlsZXM6IDIsXG4gICAgICAgICAgICBtYXhzaXplOiA1MjQyODgwLFxuICAgICAgICB9KSxcbiAgICAgICAgbmV3IHdpbnN0b24udHJhbnNwb3J0cy5GaWxlKHtcbiAgICAgICAgICAgIGZpbGVuYW1lOiBQQVRIUy5MT0dfRVJST1IsXG4gICAgICAgICAgICBoYW5kbGVFeGNlcHRpb25zOiB0cnVlLFxuICAgICAgICAgICAgbGV2ZWw6ICdlcnJvcicsXG4gICAgICAgICAgICBtYXhGaWxlczogMixcbiAgICAgICAgICAgIG1heHNpemU6IDUyNDI4ODAsXG4gICAgICAgIH0pLFxuICAgICAgICBuZXcgd2luc3Rvbi50cmFuc3BvcnRzLkNvbnNvbGUoe1xuICAgICAgICAgICAgaGFuZGxlRXhjZXB0aW9uczogdHJ1ZSxcbiAgICAgICAgICAgIGxldmVsOiAnZGVidWcnLFxuICAgICAgICB9KSxcbiAgICBdLFxufSk7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./logger/logger.ts\n");

/***/ }),

/***/ "./routes/helloWorldRoute.ts":
/*!***********************************!*\
  !*** ./routes/helloWorldRoute.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__webpack_require__(/*! reflect-metadata */ \"reflect-metadata\");\nconst inversify_express_utils_1 = __webpack_require__(/*! inversify-express-utils */ \"inversify-express-utils\");\nconst BASE_ROUTE_URL = '';\nlet HelloWorldRoute = class HelloWorldRoute {\n    async getHelloWorld() {\n        return 'Hello World !';\n    }\n};\n__decorate([\n    inversify_express_utils_1.httpGet('/helloworld'),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", []),\n    __metadata(\"design:returntype\", Promise)\n], HelloWorldRoute.prototype, \"getHelloWorld\", null);\nHelloWorldRoute = __decorate([\n    inversify_express_utils_1.controller(BASE_ROUTE_URL)\n], HelloWorldRoute);\nexports.HelloWorldRoute = HelloWorldRoute;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yb3V0ZXMvaGVsbG9Xb3JsZFJvdXRlLnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcm91dGVzL2hlbGxvV29ybGRSb3V0ZS50cz9iOWQzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59O1xudmFyIF9fbWV0YWRhdGEgPSAodGhpcyAmJiB0aGlzLl9fbWV0YWRhdGEpIHx8IGZ1bmN0aW9uIChrLCB2KSB7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKGssIHYpO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnJlcXVpcmUoXCJyZWZsZWN0LW1ldGFkYXRhXCIpO1xuY29uc3QgaW52ZXJzaWZ5X2V4cHJlc3NfdXRpbHNfMSA9IHJlcXVpcmUoXCJpbnZlcnNpZnktZXhwcmVzcy11dGlsc1wiKTtcbmNvbnN0IEJBU0VfUk9VVEVfVVJMID0gJyc7XG5sZXQgSGVsbG9Xb3JsZFJvdXRlID0gY2xhc3MgSGVsbG9Xb3JsZFJvdXRlIHtcbiAgICBhc3luYyBnZXRIZWxsb1dvcmxkKCkge1xuICAgICAgICByZXR1cm4gJ0hlbGxvIFdvcmxkICEnO1xuICAgIH1cbn07XG5fX2RlY29yYXRlKFtcbiAgICBpbnZlcnNpZnlfZXhwcmVzc191dGlsc18xLmh0dHBHZXQoJy9oZWxsb3dvcmxkJyksXG4gICAgX19tZXRhZGF0YShcImRlc2lnbjp0eXBlXCIsIEZ1bmN0aW9uKSxcbiAgICBfX21ldGFkYXRhKFwiZGVzaWduOnBhcmFtdHlwZXNcIiwgW10pLFxuICAgIF9fbWV0YWRhdGEoXCJkZXNpZ246cmV0dXJudHlwZVwiLCBQcm9taXNlKVxuXSwgSGVsbG9Xb3JsZFJvdXRlLnByb3RvdHlwZSwgXCJnZXRIZWxsb1dvcmxkXCIsIG51bGwpO1xuSGVsbG9Xb3JsZFJvdXRlID0gX19kZWNvcmF0ZShbXG4gICAgaW52ZXJzaWZ5X2V4cHJlc3NfdXRpbHNfMS5jb250cm9sbGVyKEJBU0VfUk9VVEVfVVJMKVxuXSwgSGVsbG9Xb3JsZFJvdXRlKTtcbmV4cG9ydHMuSGVsbG9Xb3JsZFJvdXRlID0gSGVsbG9Xb3JsZFJvdXRlO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./routes/helloWorldRoute.ts\n");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),

/***/ "config":
/*!*************************!*\
  !*** external "config" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("config");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "debug":
/*!************************!*\
  !*** external "debug" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("debug");

/***/ }),

/***/ "errorhandler":
/*!*******************************!*\
  !*** external "errorhandler" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("errorhandler");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "express-status-monitor":
/*!*****************************************!*\
  !*** external "express-status-monitor" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express-status-monitor");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),

/***/ "inversify":
/*!****************************!*\
  !*** external "inversify" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("inversify");

/***/ }),

/***/ "inversify-express-utils":
/*!******************************************!*\
  !*** external "inversify-express-utils" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("inversify-express-utils");

/***/ }),

/***/ "method-override":
/*!**********************************!*\
  !*** external "method-override" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("method-override");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "reflect-metadata":
/*!***********************************!*\
  !*** external "reflect-metadata" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("reflect-metadata");

/***/ }),

/***/ "winston":
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ })

/******/ });
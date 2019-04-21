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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Regions = __webpack_require__(/*! ./models/regions.js */ \"./src/models/regions.js\");\nconst RegionsMenuView = __webpack_require__(/*! ./views/regions_menu_view.js */ \"./src/views/regions_menu_view.js\");\nconst RegionInfoView = __webpack_require__(/*! ./views/region_info_view.js */ \"./src/views/region_info_view.js\");\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  console.log('JavaScript loaded');\n\n  const navElement = document.querySelector('nav#menu-bar');\n  const regionsMenu = new RegionsMenuView(navElement);\n  regionsMenu.bindEvents();\n\n  const detailsContainer = document.querySelector('section#info-box');\n  const regionDetailsView = new RegionInfoView(detailsContainer);\n  regionDetailsView.bindEvents();\n\n  const regions = new Regions();\n  regions.getData();\n  regions.bindEvents();\n});\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/helpers/pub_sub.js":
/*!********************************!*\
  !*** ./src/helpers/pub_sub.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const PubSub = {\n  publish: function (channel, payload) {\n    const event = new CustomEvent(channel, {\n      detail: payload\n    });\n    document.dispatchEvent(event);\n  },\n\n  subscribe: function (channel, callback) {\n    document.addEventListener(channel, callback);\n  }\n};\n\nmodule.exports = PubSub;\n\n\n//# sourceURL=webpack:///./src/helpers/pub_sub.js?");

/***/ }),

/***/ "./src/helpers/request_helper.js":
/*!***************************************!*\
  !*** ./src/helpers/request_helper.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const RequestHelper = function (url) {\n  this.url = url;\n};\n\nRequestHelper.prototype.get = function () {\n  return fetch(this.url)\n    .then(response => response.json());\n};\n\nmodule.exports = RequestHelper;\n\n\n//# sourceURL=webpack:///./src/helpers/request_helper.js?");

/***/ }),

/***/ "./src/models/regions.js":
/*!*******************************!*\
  !*** ./src/models/regions.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const RequestHelper = __webpack_require__(/*! ../helpers/request_helper.js */ \"./src/helpers/request_helper.js\");\nconst PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\");\n\nconst Regions = function () {\n  this.regionsData = null;\n};\n\nRegions.prototype.getData = function () {\n  const requestHelper = new RequestHelper('https://api.carbonintensity.org.uk/regional');\n  requestHelper.get()\n    .then( (dataRegions) => {\n    this.regionsData = dataRegions.data[0].regions;\n    // console.log(\"get data\", this.regionsData);\n    PubSub.publish('Regions:regions-data-loaded', this.regionsData);\n  });\n};\n\nRegions.prototype.bindEvents = function () {\n  PubSub.subscribe('RegionsMenuView:region-clicked', (event) => {\n    const chosenRegion = event.detail;\n    // console.log(chosenRegion);//return an integer id\n    const clickedRegion = this.findByRegionId(chosenRegion);\n    PubSub.publish('Regions:region-clicked-ready', clickedRegion);\n  });\n};\n\nRegions.prototype.findByRegionId = function (searchId) {\n\n  const foundRegion = this.regionsData.find( (currentRegion) => {\n    // console.log(\"is it true?\", searchId == currentRegion.regionid);\n    // console.log(\"Region searched\", currentRegion);\n    // String is not equal to number, data types need standardized\n    return searchId == currentRegion.regionid;\n  });\n  // console.log(\"found region\", foundRegion);\n  return foundRegion;\n\n};\nmodule.exports = Regions;\n\n\n//# sourceURL=webpack:///./src/models/regions.js?");

/***/ }),

/***/ "./src/views/region_info_view.js":
/*!***************************************!*\
  !*** ./src/views/region_info_view.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\");\n\nconst RegionInfoView = function (container) {\n  this.container = container;\n};\n\nRegionInfoView.prototype.bindEvents = function () {\n  PubSub.subscribe('Regions:region-clicked-ready', (event) => {\n    const regionDetails = event.detail;\n    // console.log(event.detail);\n    this.render(regionDetails);\n  });\n};\n\nRegionInfoView.prototype.render = function (region) {\n  this.container.innerHTML = '';\n\n  const heading = this.createHeading(region);\n\n  this.container.appendChild(heading);\n\n}\n\nRegionInfoView.prototype.createHeading = function (regions) {\n  // console.log('name', regions.shortname);\n  const heading = this.createElement('h2', `${regions.shortname}`);\n  // console.log(\"heading\", heading);\n  return heading;\n}\n\nRegionInfoView.prototype.createElement = function (elementType, text) {\n  const element = document.createElement(elementType);\n  element.textContent = text;\n  return element;\n};\n\n\nmodule.exports = RegionInfoView;\n\n\n//# sourceURL=webpack:///./src/views/region_info_view.js?");

/***/ }),

/***/ "./src/views/regions_menu_view.js":
/*!****************************************!*\
  !*** ./src/views/regions_menu_view.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\");\n\nconst RegionsMenuView = function (navElement) {\n  this.navElement = navElement;\n};\n\nRegionsMenuView.prototype.bindEvents = function () {\n  PubSub.subscribe('Regions:regions-data-loaded', (event) => {\n    const regionsData = event.detail; // console.log(regionsData);\n    const regions = this.populateMenu(regionsData);\n  });\n};\n\n\nRegionsMenuView.prototype.populateMenu = function (regionsData) {\n  regionsData.forEach( (region) => {\n    const anchor = document.createElement('a');\n    anchor.textContent = region.shortname;\n    anchor.setAttribute(\"id\", `${region.regionid}`);\n    anchor.href = \"\";\n\n    anchor.addEventListener('click', (event) => {\n      event.preventDefault();\n      console.log(\"this has been clicked\");\n      const clickedRegionClassId = event.target.id;\n      // console.log(\"clicked region\", clickedRegionClassId);\n      PubSub.publish('RegionsMenuView:region-clicked', clickedRegionClassId);\n    });\n    this.navElement.appendChild(anchor);\n  });\n};\n\n\nmodule.exports = RegionsMenuView;\n\n\n//# sourceURL=webpack:///./src/views/regions_menu_view.js?");

/***/ })

/******/ });
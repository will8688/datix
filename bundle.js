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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {




class Data {
    constructor(type){
        this.type = type;
    }
    get weather(){
        return new Promise((resolve, reject) => {
            const xmlhttp = new XMLHttpRequest();
            const scope = this;
            xmlhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    const data = JSON.parse(this.responseText);
                    data.symbol = '&deg;';
                    data.service = data['service-name'];
                    if(scope.type ==='1'){
                        data.where = data['name'];
                        data.unit = data['main']['temp']['unit'];
                        data.temperature = data['main']['temp']['value'];
                        data.description = data['weather'][0]['description'];
                        data.service = data['service']['name'];
                        data.symbol = 'K';
                    }
                    resolve(data);
                }else if (this.status === 404){
                    reject(this.status);
                }
            };
            const url = `api/weather${this.type}.json`;
            xmlhttp.open('GET', url);
            xmlhttp.setRequestHeader('Content-Type', 'application/json');
            xmlhttp.send();

        
        });
    }
}
class Weather {
    constructor(data){
        const type ='0';
        this.data = new Data(type);
        const loadWeather = this.data.weather;
        loadWeather.then( (data) => {
		    this.render(data);
        });
        this.attachEventListeners();
    }
    getHtml(data){
        return `<h2>${data.where} <h2>
            <h3>${data.temperature}${data.symbol}</h3><span class="">${data.unit}</span>
            <h4>${data.description}</h4>`;  
    }
    render(data){
        document.getElementById('js-weather').innerHTML = '';
	    document.getElementById('js-weather').innerHTML = this.getHtml(data);
    }
    attachEventListeners(){
        const menu = document.getElementById('js-menu');
        const navigation = document.getElementById('js-navigation');
	    menu.addEventListener('click', (e) => {
            navigation.classList.toggle("is-active");
            menu.classList.toggle("is-active");
        });
        const switchElements = document.querySelectorAll('.js-switch');
	    if(switchElements){
            switchElements.forEach((el) => {
	      		el.addEventListener('click', (e) => {
                    this.data.type =  e.target.attributes['data-weather'].nodeValue;
                    const loadWeather = this.data.weather;
                    loadWeather.then( (data) => {
                        navigation.classList.toggle("is-active");
                        this.render(data);
                    });
			     });
	      })
	    }

	  }
}

module.exports = Data;

/***/ })
/******/ ]);
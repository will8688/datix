const Data = require('./data.js');
class App {
    constructor(data){
        const type ='0';
        this.data = new Data(type);
        const loadWeather = this.data.weather;
        loadWeather.then( (data) => {
            this.render(data);
            this.attachEventListeners();
        });
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
module.exports = App;
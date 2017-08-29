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
                    
                    if(scope.type ==='1'){
                        data.where = data['name'];
                        data.unit = data['main']['temp']['unit'];
                        data.temperature = data['main']['temp']['value'];
                        data.description = data['weather'][0]['description'];
                        data.service = data['service']['name'];
                        data.symbol = 'K';
                    }else{
                        data.symbol = '&deg;';
                        data.service = data['service-name'];
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
module.exports = Data;
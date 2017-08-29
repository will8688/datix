const Data = require('./data.js');

test('the data is the the Open weather', () => {
    const data = new Data('1');
    
    
    data.weather.then((data) => {
        expect(data.service).toBe('Open Weather');
    }).catch(()=>{
        
            });;
    
});

test('the data is the Tremendous weather', () => {
    const data = new Data('2');
    data.weather.then((data) => {
        expect(data.service).toBe('Tremendous weather');
    }).catch(()=>{

    });
    
});

test('the data is not there it was a 404', () => {
    const data = new Data('3');
    data.weather.then((data) => {
        
    }).catch((data)=>{
        expect(data);
    });
    
});
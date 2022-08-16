const { parse } = require('csv-parse');
const fs = require('fs');

const habitablePlanet = [];

function isHabitablePlanet(planet) {
    //https://www.centauri-dreams.org/2015/01/30/a-review-of-the-best-habitable-planet-candidates/
    return planet['koi_disposition'] === 'CONFIRMED' && planet['koi_insol']>0.36 &&planet['koi_insol']<1.11 && planet['koi_prad']<1.6;//above link give the constraints of habitable
}

fs.createReadStream('kepler_data.csv')
    .pipe(parse({
        comment: '#',
        columns:true,
    }))
    .on('data', (data) => {
        if (isHabitablePlanet(data)) {
            habitablePlanet.push(data);
        }
    })
    .on('error', (err) => {
        console.log(err);
    })
    .on('end', () => {
        console.log(habitablePlanet.map((planet) =>{
            return planet['kepler_name'];
        }));
        console.log(`${habitablePlanet.length} Habitable planet are found! `);
        console.log('done');
    });  
// parse();

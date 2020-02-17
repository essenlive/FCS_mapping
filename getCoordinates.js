const Airtable = require('airtable')
const MapboxClient = require('mapbox')

// baseID, apiKey, and tableName can alternatively be set by environment variables
const airtable = {
    baseID: 'appQ40AqEqtqZGPRX',
    apiKey: 'keyCR0YO43EYTDWTW',
    tableName: 'Workshop',
};
let base = new Airtable({ apiKey: airtable.apiKey }).base(airtable.baseID);

const mapbox = {
    token: 'pk.eyJ1IjoiZXNzZW4iLCJhIjoiY2p0MW1qN3VoMDk3OTN5cGd5c2Z1cHp0ZyJ9.75OcltBPnS9HdMtPoSXG0Q',
    style: 'mapbox://styles/essen/cjtsfp7dc00201fmfl8jllc3k',
};
var client = new MapboxClient(mapbox.token);

(async () => {
    let places = []
    try {
        let records = await base("Workshop").select({ view: "all" }).firstPage()
        
        for (const record of records) {

            if (typeof(record.fields.Longitude) === "undefined"){

                
                try {
                    let coordinates = await client.geocodeForward(record.fields.Adresse);
                    console.log(`${record.fields.Nom}, [${coordinates.entity.features[0].center}]`);
                    places.push({
                        name: record.fields.Nom,
                        coordinates: coordinates.entity.features[0].center
                    })
                } catch (error) {
                    places.push({
                        name: record.fields.Nom,
                        coordinates: [null,null]
                    })
                }
            }
        };
    } catch (error) { console.log(error); }

    let sortedPlaces = places.sort(function (a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    console.log(sortedPlaces);
    for (const place of sortedPlaces) {
        console.log(`${place.name}, ${place.coordinates[0]}, ${place.coordinates[1]}`);
        
        
    }

    
})();
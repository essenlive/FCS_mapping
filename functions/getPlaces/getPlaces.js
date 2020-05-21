const Airtable = require('airtable')
const MapboxClient = require('mapbox')

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  
  try {
    let base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);
    const client = new MapboxClient(process.env.REACT_APP_MAPBOX_TOKEN);

    let places = {
      "fabrication": [],
      "stores": [],
      "industrials": [],
      "incubators": [],
      "designers": [],
      "partners": [],
      "resources": [],
      "research": [],
      "hub": []
    };
    let records = await base(process.env.AIRTABLE_TABLE_NAME).select({ view: "all" }).firstPage();

    for (const record of records) {
        // Setup empty coordinates
        let coordinates = [];
        // If there are predefined coordinates, use those
        if ( typeof record.fields.Longitude === "number" && typeof record.fields.Latitude === "number") {
          coordinates = [record.fields.Longitude, record.fields.Latitude]
        } else if (typeof record.fields.Adresse !== "undefined") { //If an adress is setup, use mapbox to get the coordinates
          coordinates = await client.geocodeForward(record.fields.Adresse);
          coordinates = coordinates.entity.features[0].center;
        }

        let entry = {
          id: record.id,
          name: record.fields.Nom,
          adress: record.fields.Adresse,
          coordinates: coordinates,
          description: record.fields.Description,
          website: record.fields.Lien,
          type: record.fields.Type,
          image: typeof record.fields.Illustration === "undefined" ? null : record.fields.Illustration[0].url
        };

        // Sort places by type for each layer
        if (typeof record.fields.Type !== "undefined") {
          for (const type of record.fields.Type) {
            if (typeof places[type] !== "undefined") {
              places[type].push(entry)

            }
          }
        }
    };



    return {
      statusCode: 200,
      body: JSON.stringify(places)
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (err) {
    console.log(err);
    return { statusCode: 500, body: err.toString() }
  }
}

import React, { useState, useEffect } from 'react';
import ReactMap, { Layer, Feature, Popup } from 'react-mapbox-gl';
import Airtable from 'airtable'
import MapboxClient from 'mapbox'
import { Button, Container, Label } from 'semantic-ui-react'

// baseID, apiKey, and tableName can alternatively be set by environment variables
const airtable = {
  baseID: 'appQ40AqEqtqZGPRX',
  apiKey: 'keyCR0YO43EYTDWTW',
  tableName: 'Workshop',
};
let base = new Airtable({ apiKey: airtable.apiKey }).base(airtable.baseID);

const mapbox = {
  maxZoom: 15,
  token: 'pk.eyJ1IjoiZXNzZW4iLCJhIjoiY2p0MW1qN3VoMDk3OTN5cGd5c2Z1cHp0ZyJ9.75OcltBPnS9HdMtPoSXG0Q',
  style: 'mapbox://styles/essen/cjtsfp7dc00201fmfl8jllc3k',
};

const MapBox = ReactMap({accessToken : mapbox.token});
var client = new MapboxClient(mapbox.token);

// Define different types to display
const types = ["fabrication", "stores", "industrials", "incubators", "designers", "partners", "resources", "research", "actif", "passif"]

// Create an image for each Layer
let icons = {}, placesTypes = {};
for(const idx in types){
  icons[types[idx]] = new Image()
  icons[types[idx]].src = `/icons/${types[idx]}.svg`

  placesTypes[types[idx]] = [];
}



export const Map = (props) => {

  const [places, setPlaces] = useState(placesTypes);
  const [map, setMap] = useState({
    fitBounds: undefined,
    center: [2.385181, 48.897016],
    zoom: [11],
  });
  const [place, setPlace] = useState({
    place: undefined,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let places = placesTypes;
        let records = await base("Workshop").select({ view: "all" }).firstPage();
        
        for (const record of records) {
          try {
            let coordinates = [];
            if (typeof record.fields.Longitude === "undefined" || typeof record.fields.Latitude === "undefined") {
              coordinates = await client.geocodeForward(record.fields.Adresse);
              coordinates = coordinates.entity.features[0].center;
            } else {
              coordinates = [record.fields.Longitude, record.fields.Latitude]
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

            if (record.fields.Statuts === "actif") {places["actif"].push(entry) } else {places["passif"].push(entry)}
            for (const type of record.fields.Type) {places[type].push(entry)}

          } catch (error) {
            // console.log(error);
          }
        };
        
        console.log("request:", places);
        setPlaces(places);
        
        } catch (error) { console.log(error); }
    };

    fetchData();
  }, []);

  const close = () => {  if (place)  setPlace({ place: undefined }); };

  const onToggleHover = (cursor, { map }) => { map.getCanvas().style.cursor = cursor;}

  const markerClick = (place) => {
    setPlace({ place: place })
    setMap({ center: place.coordinates, zoom: [14] });
  };
  
  let layers = Object.keys(places);
  
  return (
    <div className="map">

      <MapBox
       // eslint-disable-next-line
      style={mapbox.style}
      fitBounds= {map.fitbounds}
      containerStyle={{height: '100vh', width: '100vw'}}
      center={map.center}
      onDrag={close.bind(this)}
      zoom={map.zoom}
      flyToOptions={{speed: 0.8}}
      >
      {layers.map((layer, idx) => {
        
      return (
        <Layer key={idx} type="symbol" id={layer} layout={{ 'icon-image': layer, "icon-allow-overlap": true, 'icon-size': 0.25 }} images={[layer, icons[layer]]}>
          {places[layer].map(item => (
            <Feature
              key={item.id}
              onMouseEnter={onToggleHover.bind(this, 'pointer')}
              onMouseLeave={onToggleHover.bind(this, '')}
              onClick={markerClick.bind(this, item)}
              coordinates={item.coordinates}
            />
          ))}
        </Layer>
      )})}


      {place.place && (
        <Popup 
        key={place.place.id} 
        coordinates={place.place.coordinates}
        maxWidth={"300px"}
        >
          {place.place.image && ( <img src={place.place.image} alt="illustration"/>)}
          <Container >
          <h2>{place.place.name}</h2>
          {place.place.type && (
              <div className="placeTags">
                {place.place.type.map((item, i) => (
                  <Label key={i} content={item} mini='true' className={item}/>
                ))}
              </div>
            )}
          {place.place.description && ( <p className="placeDescription"> {place.place.description}</p>)}
          {place.place.website && (<div> <Button as='a' href={place.place.website} content='See website' icon='right arrow' labelPosition='right' compact/></div>)}
          </Container>

        </Popup>
      )}

      </MapBox>
    </div>

    );
}

export default Map;
import React, { useState, useEffect } from 'react';
import ReactMap, { Layer, Feature, Popup } from 'react-mapbox-gl';
import mapboxgl from 'mapbox-gl'
import Airtable from 'airtable'
import MapboxClient from 'mapbox'
import { Segment, Button, Container, Label } from 'semantic-ui-react'

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
mapboxgl.accessToken = mapbox.token;
const MapBox = ReactMap(mapbox.token);
var client = new MapboxClient(mapbox.token);



export const Map = (props) => {

  const [places, setPlaces] = useState([]);
  const [map, setMap] = useState({
    fitBounds: undefined,
    center: [2.385181, 48.897016],
    zoom: [11],
    place: undefined,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let places = [];
        let records = await base("Workshop").select({ view: "all" }).firstPage();
        // console.log(records);
        
        for (const record of records) {
          try {
            let coordinates = [];
            
            if (typeof record.fields.Longitude === "undefined" || typeof record.fields.Latitude === "undefined"  ){
              coordinates = await client.geocodeForward(record.fields.Adresse);
              coordinates = coordinates.entity.features[0].center;          
            }else{
              coordinates = [record.fields.Longitude, record.fields.Latitude]
            }
            
            places.push({
              id: record.id,
              name: record.fields.Nom,
              adress: record.fields.Adresse,
              coordinates: coordinates,
              description: record.fields.Description,
              website: record.fields.Lien,
              type: record.fields.Type,
              image: typeof record.fields.Illustration === "undefined" ? null : record.fields.Illustration[0].url
            });
          } catch (error) {
            // console.log(error);
          }
        };
        
        console.log("request:", places);
        setPlaces(places);
        
        } catch (error) { console.log(error); }
    };

    fetchData();
  }, ["places"]);


  const onDrag = () => {
    
    if (map.place) {
      console.log(map);
      setMap({ place: undefined });
    }
  };

  const onToggleHover = (cursor, { map }) => { map.getCanvas().style.cursor = cursor;}

  const markerClick = (place) => {
    setMap({
      center: place.coordinates,
      zoom: [14],
      place : place
    });
  };
  
  return (
      <MapBox
       // eslint-disable-next-line
      style={mapbox.style}
      containerStyle={{height: '100vh', width: '100vw'}}
      center={map.center}
      onDrag={onDrag}
      zoom={map.zoom}
      flyToOptions={{speed: 0.8}}
      >

      <Layer 
      type="circle" 
      id="marker" 
      >
        {places.map(item => (
          <Feature 
            key={item.id}
            onMouseEnter={onToggleHover.bind(this, 'pointer')}
            onMouseLeave={onToggleHover.bind(this, '')}
            onClick={markerClick.bind(this, item)}
            coordinates={item.coordinates}
             />
          ))}
      </Layer>

      {map.place && (
        <Popup 
        key={map.place.id} 
        coordinates={map.place.coordinates}
        maxWidth={"300px"}
        >
          {map.place.image && (
            <img src={map.place.image} />
          )}
          <Container >
          <h2>{map.place.name}</h2>
          {map.place.type && (
              <div className="placeTags">
                {map.place.type.map(item => (
                <Label content={item} mini='true'/>
                ))}
              </div>
            )}
          {map.place.description && (
              <p basic className="placeDescription"> {map.place.description}</p>
          )}
          {map.place.website && (
            <div> <Button as='a' href={map.place.website} content='See website' icon='right arrow' labelPosition='right' compact/></div>
            )}
          </Container>

        </Popup>
      )}

      </MapBox>
    );
}

export default Map;
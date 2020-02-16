import React, { useState, useEffect } from 'react';
import ReactMap, { Layer, Feature, Popup } from 'react-mapbox-gl';
import mapboxgl from 'mapbox-gl'
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

// Create an image for the Layer
const icons = {
  fab: new Image(),
  ven: new Image(),
  ind: new Image(),
  inc: new Image(),
  des: new Image(),
  pub: new Image(),
  res: new Image(),
  actif: new Image(),
  passif: new Image(),
}
icons.fab.src = '/place-fab.svg';
icons.ven.src = '/place-ven.svg';
icons.ind.src = '/place-ind.svg';
icons.inc.src = '/place-inc.svg';
icons.des.src = '/place-des.svg';
icons.pub.src = '/place-pub.svg';
icons.res.src = '/place-res.svg';
icons.actif.src = '/place-actif.svg';
icons.passif.src = '/place-passif.svg';


export const Map = (props) => {

  const [places, setPlaces] = useState({
    "Fabrication": [],
    "Vente": [],
    "Industrialisation": [],
    "Incubation": [],
    "Designer": [],
    "Partenaires Public": [],
    "Ressourcerie": [],
    "Actif": [],
    "Passif": []
  });
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
        let places = {
          "Fabrication": [],
          "Vente": [],
          "Industrialisation": [],
          "Incubation": [],
          "Designer": [],
          "Partenaires Public": [],
          "Ressourcerie": [],
          "Actif": [],
          "Passif": []
        };
        let records = await base("Workshop").select({ view: "all" }).firstPage();
        // console.log(records);
        
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

            if (record.fields.Statuts === "Actif") {places["Actif"].push(entry)
            } else {places["Passif"].push(entry)}
          
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
  }, ["places"]);

const close = () => {
  console.log()
    if (place) {
      setPlace({
        place: undefined
      });
    };
  };

  const onToggleHover = (cursor, { map }) => { map.getCanvas().style.cursor = cursor;}

  const markerClick = (place) => {
    setMap({
      center: place.coordinates,
      zoom: [14]
    });
    setPlace({
      place: place
    })
  };
  
  return (
      <MapBox
       // eslint-disable-next-line
      style={mapbox.style}
      containerStyle={{height: '100vh', width: '100vw'}}
      center={map.center}
      onDrag={close.bind(this)}
      zoom={map.zoom}
      flyToOptions={{speed: 0.8}}
      >

      <Layer type="symbol" id="Fabrication" layout={{ 'icon-image': 'fab', "icon-allow-overlap": true, 'icon-size': 0.25 }} images={['fab', icons.fab]}>
        {places["Fabrication"].map(item => (
          <Feature
            key={item.id}
            onMouseEnter={onToggleHover.bind(this, 'pointer')}
            onMouseLeave={onToggleHover.bind(this, '')}
            onClick={markerClick.bind(this, item)}
            coordinates={item.coordinates}
          />
        ))}
      </Layer>
      <Layer type="symbol" id="Vente" layout={{ 'icon-image': 'ven', "icon-allow-overlap": true, 'icon-size': 0.25 }} images={['ven', icons.ven]}>
        {places["Vente"].map(item => (
          <Feature
          key={item.id}
          onMouseEnter={onToggleHover.bind(this, 'pointer')}
          onMouseLeave={onToggleHover.bind(this, '')}
          onClick={markerClick.bind(this, item)}
          coordinates={item.coordinates}
          />
          ))}
      </Layer>

      <Layer type="symbol" id="Industrialisation" layout={{ 'icon-image': 'ind', "icon-allow-overlap": true, 'icon-size': 0.25 }} images={['ind', icons.ind]}>
        {places["Industrialisation"].map(item => (
          <Feature
          key={item.id}
          onMouseEnter={onToggleHover.bind(this, 'pointer')}
          onMouseLeave={onToggleHover.bind(this, '')}
          onClick={markerClick.bind(this, item)}
          coordinates={item.coordinates}
          />
          ))}
      </Layer>

      <Layer type="symbol" id="Incubation" layout={{ 'icon-image': 'inc', "icon-allow-overlap": true, 'icon-size': 0.25 }} images={['inc', icons.inc]}>
        {places["Incubation"].map(item => (
          <Feature
            key={item.id}
            onMouseEnter={onToggleHover.bind(this, 'pointer')}
            onMouseLeave={onToggleHover.bind(this, '')}
            onClick={markerClick.bind(this, item)}
            coordinates={item.coordinates}
          />
        ))}
      </Layer>

    <Layer type="symbol" id="Designer" layout={{ 'icon-image': 'des', "icon-allow-overlap": true, 'icon-size': 0.25 }} images={['des', icons.des]}>
        {places["Designer"].map(item => (
          <Feature
            key={item.id}
            onMouseEnter={onToggleHover.bind(this, 'pointer')}
            onMouseLeave={onToggleHover.bind(this, '')}
            onClick={markerClick.bind(this, item)}
            coordinates={item.coordinates}
          />
        ))}
      </Layer>
      <Layer type="symbol" id="Partenaires Public" layout={{ 'icon-image': 'pub', "icon-allow-overlap": true, 'icon-size': 0.25 }} images={['pub', icons.pub]}>
        {places["Partenaires Public"].map(item => (
          <Feature
          key={item.id}
          onMouseEnter={onToggleHover.bind(this, 'pointer')}
          onMouseLeave={onToggleHover.bind(this, '')}
          onClick={markerClick.bind(this, item)}
          coordinates={item.coordinates}
          />
          ))}
      </Layer>

      <Layer type="symbol" id="Ressourcerie" layout={{ 'icon-image': 'res', "icon-allow-overlap": true, 'icon-size': 0.25 }} images={['res', icons.res]}>
        {places["Ressourcerie"].map(item => (
          <Feature
            key={item.id}
            onMouseEnter={onToggleHover.bind(this, 'pointer')}
            onMouseLeave={onToggleHover.bind(this, '')}
            onClick={markerClick.bind(this, item)}
            coordinates={item.coordinates}
          />
        ))}
      </Layer>
      <Layer type="symbol" id="Actif" layout={{ 'icon-image': 'actif', "icon-allow-overlap": true, 'icon-size': 0.25 }} images={['actif', icons.actif]}>
        {places["Actif"].map(item => (
          <Feature
            key={item.id}
            onMouseEnter={onToggleHover.bind(this, 'pointer')}
            onMouseLeave={onToggleHover.bind(this, '')}
            onClick={markerClick.bind(this, item)}
            coordinates={item.coordinates}
          />
        ))}
      </Layer>
      <Layer type="symbol" id="Passif" layout={{ 'icon-image': 'passif', "icon-allow-overlap": true, 'icon-size': 0.25 }} images={['passif', icons.passif]}>
        {places["Passif"].map(item => (
          <Feature
            key={item.id}
            onMouseEnter={onToggleHover.bind(this, 'pointer')}
            onMouseLeave={onToggleHover.bind(this, '')}
            onClick={markerClick.bind(this, item)}
            coordinates={item.coordinates}
          />
        ))}
      </Layer>

      {place.place && (
        <Popup 
        key={place.place.id} 
        coordinates={place.place.coordinates}
        maxWidth={"300px"}
        >
          {place.place.image && (
            <img src={place.place.image} />
          )}
          <Container >

          <h2>{place.place.name}</h2>
          {place.place.type && (
              <div className="placeTags">
                {place.place.type.map((item, i) => (
                  <Label key={i} content={item} mini='true' className={item}/>
                ))}
              </div>
            )}
          {place.place.description && (
              <p className="placeDescription"> {place.place.description}</p>
          )}
          {place.place.website && (
            <div> <Button as='a' href={place.place.website} content='See website' icon='right arrow' labelPosition='right' compact/></div>
            )}
          </Container>

        </Popup>
      )}

      </MapBox>
    );
}

export default Map;
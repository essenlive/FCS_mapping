import React, { useState, useEffect } from 'react';
import ReactMap, { Layer, Feature, Popup , ZoomControl } from 'react-mapbox-gl';
import { Button, Container, Label } from 'semantic-ui-react'

// SetUp Mapbox map component
const MapBox = ReactMap({ accessToken: process.env.REACT_APP_MAPBOX_TOKEN});

// Define different types to display
const types = ["fabrication", "stores", "industrials", "incubators", "designers", "partners", "resources", "research", "hub", "actif", "passif"]

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
  const [place, setPlace] = useState({ place: undefined });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let places = await fetch('/.netlify/functions/getPlaces');
        places = await places.json();
        setPlaces(places);

      } catch (error) { console.log(error); }
    };

    fetchData();
  }, []);

  // Close popup function
  const close = () => {  if (place)  setPlace({ place: undefined }); };
  // Toggle cursor on hover function
  const onToggleHover = (cursor, { map }) => { map.getCanvas().style.cursor = cursor;}
  // Select place on marker click function popup function
  const markerClick = (place) => {
    setPlace({ place: place })
    setMap({ center: place.coordinates, zoom: [14] });
  };
  
  let layers = Object.keys(places);

  
  
  return (
    <div className="map">

      <MapBox
       // eslint-disable-next-line
      style={process.env.REACT_APP_MAPBOX_STYLE_URL}
      fitBounds= {map.fitbounds}
      containerStyle={{height: '100vh', width: '100%'}}
      center={map.center}
      onDrag={close.bind(this)}
      zoom={map.zoom}
      flyToOptions={{speed: 0.8}}
      >
      <ZoomControl/>
      {layers.map((layer, idx) => {
      return (
        <Layer key={idx} type="symbol" id={layer} layout={{ 'icon-image': layer, "icon-allow-overlap": true, 'icon-size': 0.25 }} images={[layer, icons[layer]]}>
          {places[layer].map(item => {return(
            <Feature
              key={item.id}
              onMouseEnter={onToggleHover.bind(this, 'pointer')}
              onMouseLeave={onToggleHover.bind(this, '')}
              onClick={markerClick.bind(this, item)}
              coordinates={item.coordinates}
            />
          )})}
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
import React from 'react';
import Map from './Map.js';
import Presentation from './Presentation.js';
import Contribute from './Contribute.js';

const App = ()=>{

  return(
    <React.Fragment>
      <Presentation/>
      <Map/>
      <Contribute/>
    </React.Fragment>

  )
}

export default App;

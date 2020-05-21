import React from 'react';
import Map from './Map.js';
import Presentation from './Presentation.js';
import Contribute from './Contribute.js';
import { BrowserRouter as Router, Route} from "react-router-dom";


const Sections = (props) =>{
  const route = props.match.params.route !== "undefined" ? props.match.params.route : "" ;
  

  return (
    <React.Fragment >
      <Presentation />
      <Map />
      <Contribute visible={route === "contribute" ? true : false}/>
    </React.Fragment>
  );
}

const App = () => {

  return (
    <Router>
      <Route path="/:route" component={Sections} />
      <Route path="/" exact component={Sections}/>
    </Router>

  )
}

export default App;

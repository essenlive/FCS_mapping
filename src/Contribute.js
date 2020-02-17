import React, { useState, useEffect } from 'react';
import { Button, Container, Label } from 'semantic-ui-react'
import Iframe from 'react-iframe'

const Contribute = (props) => {


  return (


      <Iframe url="https://airtable.com/embed/shr2LbBOWbv7MiygR"
        width="70%"
        height="533"
        className="contribute"
        display="initial"/>

  );
}

export default Contribute;
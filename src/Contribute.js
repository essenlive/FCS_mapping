import React from 'react';
import Iframe from 'react-iframe'
import { Link } from "react-router-dom";

const Contribute = (props) => {


  return (
    <Link to="/" className={`contribute ${ props.visible ? "visible": ""}`} >

      <Iframe url={process.env.REACT_APP_AIRTABLE_FORM_URL}
      width="80%"
      height="533"
      className="contribute-form"
      display="initial" />
    </Link>
  )
}

export default Contribute;
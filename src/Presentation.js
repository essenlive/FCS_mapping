import React, { useState, useEffect } from 'react';
import { Image, Button, Label } from 'semantic-ui-react'

const Presentation = (props) => {


  return (


    <div className='presentation'>
      <Image src='https://store.fabcity.paris/wp-content/uploads/2019/02/logo.png' size='tiny' />
      <h1>Fab City Store</h1>
      <h2>SUPPORTING THE DESIGNERS OF THE SUSTAINABLE AND CONNECTED CITY.</h2>
      <p>
        The Fab City Store is an experimental project held by a community of <b>local and global actors</b>.
      </p>
      <p>
        It is orchestrated and supported by community of actors for the sustainable, social and durable fabrication; <b>Urban factories, stores, resourcers, manufacturers, incubators and public partners</b>.
        </p>
      {/* <Button.Group size='large'>
        <Button color='blue'>Contribute</Button>
      <Button.Or />
      <Button>Activate</Button> */}
  {/* </Button.Group> */}
    </div>

    );
}

export default Presentation;
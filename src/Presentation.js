import React from 'react';
import { List, Image, Button, Icon } from 'semantic-ui-react'
import { Link } from "react-router-dom";

const Presentation = (props) => {


  return (


    <div className='presentation'>
      <Image src='https://store.fabcity.paris/wp-content/uploads/2019/02/logo.png' size='tiny' />
      <div>

        <h1>Fab City Store</h1>
        <h2>Creating a network of spaces and organisations dedicated to the productive city.</h2>
        <p>
          We believe the productive cities will emerge from <b>local and global actors</b>.
        </p>
        <p>
          We must unite and enable local networks of stakeholders through global cooperation :
        It is orchestrated and supported by community of actors for the sustainable, social and durable fabrication; 
        </p>

        <div className="legend">
          <List className="expertise">
              <List.Item className="designers"> Designers </List.Item>
              <List.Item className="fabrication"> Fabrication </List.Item>
              <List.Item className="industrials"> Industrials </List.Item>
              <List.Item className="partners"> Partners </List.Item>
              <List.Item className="resources"> Resources </List.Item>
              <List.Item className="stores"> Stores </List.Item>
              <List.Item className="incubators"> Incubators </List.Item>
              <List.Item className="research"> Research </List.Item>
          </List>
          <List className="status">
            <List.Item className="hub"> Hub </List.Item>
            <List.Item className="active"> Active </List.Item>
            <List.Item className="pending"> Pending </List.Item>
          </List>
        </div>
        <Link to="/contribute">
          <Button icon labelPosition='left'>
            <Icon name='world' />
              Add your organisation
          </Button>
        </Link>

      </div>  
    </div>

    );
}

export default Presentation;
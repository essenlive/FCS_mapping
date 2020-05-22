## FCS Mapping
[![Netlify Status](https://api.netlify.com/api/v1/badges/05a75f29-e7eb-480a-bd37-26351648c584/deploy-status)](https://app.netlify.com/sites/networkfcs/deploys)

Small mapping interface.

### Setup
You will first need to create a Airtable and Mapbox account, and a Netlify account if you want to deploy for free on netlify.  

Then you will need to setup the following environment variables :
```
AIRTABLE_API_KEY = your airtable API key
AIRTABLE_BASE_ID = The Is of your airtable base
AIRTABLE_TABLE_NAME = The name of your table in your airtbale base 
REACT_APP_AIRTABLE_FORM_URL = The embed url of your Airtable form for your table 
MAPBOX_TOKEN = Your Mapbox API token
REACT_APP_MAPBOX_STYLE_URL = Your Mapbos map styles Url
REACT_APP_MAPBOX_TOKEN =  Your Mapbox API token
```
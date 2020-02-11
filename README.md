## High level objective:

Use the Airtable API to create a Google Maps-style interface for interacting with Airtable records that have location information.

## Constraints:

* By now we have emailed you with how long you should spend on this project, please do not spend any more time than specified. The goal is simply to implement as many features as you can within this time, with an emphasis on maintainable code that could easily be understood and modified by others in a team environment.

* This project should be implemented with only frontend code; you can make client-side requests directly to the Airtable API using our client-side library Airtable.js (https://github.com/Airtable/airtable.js) or manually if you prefer (using our library will probably save you some time).

* You may use any open source libraries and frameworks that you'd like (i.e. React, jQuery, Bootstrap, Mapbox, etc.).

* When you are complete run `git log` and make sure it shows all of your commits. Then zip up your project directory and email it back to us!

## Tips:

* Please be mindful of git hygiene. We suggest regularly committing code with commit messages, just as you would if you were working on a large team.

* This starter code was partially generated using create-react-app (https://github.com/facebookincubator/create-react-app). It uses React, and comes with Airtable.js (https://github.com/Airtable/airtable.js/blob/master/build/airtable.browser.js) and a helpful Google Maps component (https://github.com/istarkov/google-map-react) pre-installed. Please feel free to use as much or as little of the starter code as you'd like.

* To use the starter code: navigate to this project directory, run `npm install` to install dependencies (this takes a couple minutes), and then run `npm start` to initialize and connect to a node server with your default browser. The starter code supports hot-reloading, so anytime you save your code the browser will automatically update :)

* As part of this project, you will need to create an Airtable account and create a base with a table that has location data. You can then access API documentation for the Airtable base via going to https://airtable.com/api, selecting your base, and clicking the "node.js" tab to see examples of using Airtable.js to make API requests.

## Functionality:

Below are some features you can implement, in descending order of priority. This is an open ended assignment, so feel free to build fewer of these features and pursue ones that are not on the list.

- [x] 1. On your single-page app, use a URL query param to specify which Base ID, Table name and View name to display on the map (you only need to display one table/one view at a time).
- [x] 2. Use an input field to specify which column within that table to use as the address field. Since Airtable doesn’t currently have a built-in address field type, the address field can be any field. You can use the Google Maps Geocoding API (https://developers.google.com/maps/documentation/geocoding/intro) to convert the address for each record into lat-long coordinates that can then be displayed on the map. Your implementation should also support records that have lat-long coordinates in the location field. So to recap, both of these are valid values for a location field:
    - [x] 1. Address: “49 Powell St, San Francisco, CA, United States”
    - [x] 2. Lat-long: “37.7852426,-122.4080899”
- [x] 3. Basic read-only map view
    - [x] 1. Show pins for each record on the map (you don’t need to show records with invalid addresses).
    - [x] 2. Clicking on a pin should display an expanded version of the record. How this looks is  up to you (e.g. popover, sidebar, etc). Don’t spend too much time handling all the different field types in the expanded record: just handling text fields is sufficient.
- [x] 4. Implement name editing and deletion of records. From the expanded record, you should be able to edit the record’s name and delete the record.
- [x] 5. Implement address editing of records.
    - [ ] 1. For bonus points, implement autocomplete for the address field (https://developers.google.com/places/javascript/)
- [ ] 6. Allow creating records by clicking anywhere on the map. You can choose to store the lat-long coordinates directly in the new record’s location field or reverse geocode the coordinates to get an address.
- [ ] 7. Drag pins on the map to move records. When you drag a pin to a new location, the address field of that record should update to the new location.
- [ ] 8. Any other UI polish you can think of, if you have any time left. Bonus points for transition animations and design flair :) Some ideas:
    - [x] 1. Using a custom pin (maybe a miniature card view of each record)
    - [ ] 2. Collapsing locations with close proximity into a single numeric indicator
    - [ ] 3. Come up with your own ideas!

## Sample data:

Here is some sample test data, feel free to copy it into your Airtable base to get started.
```
Airtable	49 Powell St, SF	37.785363, -122.408255
SF Caltrain	700 4th St, 94107	37.777539, -122.394979
Dolores Park	 Dolores St & 19th St, San Francisco, CA	37.759808, -122.427079
San Francisco Zoo	1 Zoo Rd, San Francisco, CA 94132	37.734692, -122.505059
```

# Eat Out to Help Out - Visualised

> Disclaimer: The Eat Out to Help Out scheme has now ended; the API is now out of service and so the project will no longer work.

A NextJS webapp showing restaurants taking part in the UK's Eat Out to Help Out scheme on a geographical OpenStreetMap map. It can help users find local restaurants that they may wish to try out because of the 50% discount.

Users can view local restaurants in other areas in the UK by dragging to change the centre of the map.

Technologies used: Node.js, Next.js, TailwindCSS, React

## Demonstration

![alt text](https://i.imgur.com/5opS4uH.png "Image of the Eat Out to Help Out app")

To demonstrate and setup the application, clone this project

    $ git clone https://github.com/HilliamT/EotHo-Visualised.git
    $ npm install
    $ npm start

You will then be able to view the project at `http://localhost:3000/`

## How It Works

### Finding Restaurants
This webapp utilises a GOV.UK endpoint that provides a list of all participating non-chain restaurants within reason.

    GET https://www.tax.service.gov.uk/eat-out-to-help-out/find-a-restaurant/results?lookup=POSTCODE`

Entering a [correct](https://en.wikipedia.org/wiki/Postcodes_in_the_United_Kingdom) `POSTCODE` will display the 50 closests restaurants to that postcode, returning in the format:

    {
       data: [ distance: number, details: {
           name: string,
           address: {
               line1: string
               line2: string
               town: string
               postcode: string
           },
           location: [ latitude: number, longitude: number ]
       }]
    }

### Location Rendering
Making use of the Node.js module [`Leaflet`](https://www.npmjs.com/package/leaflet), a module for displaying interactive geographical maps using OpenStreetMap, one can display the geographical location and of nearby places. To default or set the location of the centre of the map, a pair of numerical `latitude` and `longitude` values are needed.

> MapElem.state.currentLocation: [51.505, -0.09]

The MapElem React component keeps track of the centre of the map as `currentLocation` and is updated via recalculation as the user drags the map to a different geographical location.

### Querying the API
To search for local restaurants from the centre of the map, the location, currently in the numerical pair format of `latitude` and `longitude`, would have to be converted to an appropriate `POSTCODE` to query the GOV.UK API. This is done using `node-postcodes.io`.

### Marking Restaurants

For each of the 50 closests restaurants, a marker is displayed on the geographical map to mark their location.

> MapElem.renderMarker

The wrapper library `react-leaflet-universal` has been used to provide a predefined React component that will place itself at the correct location on the `Leaflet` map when given a `[latitude, longitude]` pair.

The marker has also been edited to use a custom marker design that I have personally designed for this project. This design can be found within the `public/img` folder and can be changed by replacing marker images of the same name within that folder.
# Treihadwyl MapView Class

> Responsible for rendering the current first person view of the map

## Installation

This is a self-registering module so it’ll return an instance of the MapView class. To use it just needs to be appended to the DOM and rendered.

```
var mapView = require( 'map-view' );
mapView
  .attachTo( document.body )
  .render();
```

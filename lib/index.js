/**
 * Renders the first person view of the map
 * Copyright © 2014 Matt Styles <matt@veryfizzyjelly.com>
 * Licensed under the ISC license
 * ---
 *
 * Self-registering module
 */


var View = require( 'app-view' ),
    tmpl = require( 'templates/map-view' );


/**
 * MapView class
 */
var MapView = View.extend({

    init: function( el, opts ) {

        this._super( el, opts );
    }

});


/**
 * Export the mapView object ready to be attached to the DOM
 */
module.exports = (function() {

  // Return the mapView object, all ready to be attached
  return MapView.create( null, {
      tmpl: tmpl,
      model: {}
  });

})();

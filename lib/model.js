/**
 * Renders the first person view of the map
 * Copyright © 2014 Matt Styles <matt@veryfizzyjelly.com>
 * Licensed under the ISC license
 * ---
 *
 * Model for the map-view.
 * Just holds map data for the currently viewed section of the map, the actual map is implemented inside of its own module.
 */


var Model = require( 'app-model' );



/**
 * MapView Model
 */
var MapViewModel = module.exports = Model.extend({

    init: function( props ) {

        this._super( props );

        this.add({
            testProp: 'emits a lovely beat'
        });
    }

});

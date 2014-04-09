/**
 * Renders the first person view of the map
 * Copyright © 2014 Matt Styles <matt@veryfizzyjelly.com>
 * Licensed under the ISC license
 * ---
 *
 * Model for the map-view.
 * Just holds map data for the currently viewed section of the map, the actual map is implemented inside of its own module.
 */


var each = require( 'lodash-node/modern/collections/forEach' ),
    random = require( 'lodash-node/modern/utilities/random' ),

    Model = require( 'app-model' );



/**
 * MapView Model
 */
var MapViewModel = module.exports = Model.extend({

    init: function( props ) {

        this._super( props );

        this.add({
            testProp: 'emits a lovely beat'
        });

        this.add({
            segment: this.createSegment()
        });
    },

    createSegment: function() {
        var frames = [];

        for( var i = 0; i < 28; i++ ) {
            frames[ i ] = random( 1, 2 );
        }

        return frames;
    },

    alter: function( section, id ) {
        var newSegment = this.segment;

        newSegment[ section ] = id;

        this.segment = newSegment;
    }

});

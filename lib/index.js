/**
 * Renders the first person view of the map
 * Copyright © 2014 Matt Styles <matt@veryfizzyjelly.com>
 * Licensed under the ISC license
 * ---
 *
 * Self-registering module
 */


var PIXI = require( 'pixi.js' ),
    each = require( 'lodash-node/modern/collections/forEach' ),

    View = require( 'app-view' ),
    tmpl = require( 'templates/map-view' );


/**
 * Returns a rendering of the root element of the template.
 * This allows MapView to omit creating a new root element.
 * This is fine in this case as we wont be redrawing the DOM when the model
 * changes as rendering is handled by the canvas element.
 */
function createElement( el ) {
    var elem = document.createElement( 'div' );
    elem.innerHTML = el;

    return elem.firstElementChild;
}


/**
 * MapView class
 */
var MapView = View.extend({

    stage: null,
    container: null,
    renderer: null,
    sprites: null,

    init: function( el, opts ) {

        this._super( el, opts );

        // Create a new element
        // mapView can be extended like this because the template wont be redrawn
        // All rendering takes place in the canvas
        this.el = createElement( this.tmpl( this.model ) );

        // Create new draw context
        this.stage = new PIXI.Stage( 0xFFFFFF );
        this.renderer = PIXI.autoDetectRenderer( 320, 240 );
        this.el.appendChild( this.renderer.view );

        // Create container for sprites
        this.container = new PIXI.DisplayObjectContainer();
        this.container.position.x = 32;
        this.container.position.y = 44;
        this.sprites = [];

        this.stage.addChild( this.container );

        // Load the texture atlas
        var loader = new PIXI.JsonLoader( './resources/screen1.json' );
        loader.on( 'loaded', this.onAssetsLoaded );
        loader.load();
    },

    attachTo: function( el ) {
        el.appendChild( this.el );

        return this;
    },

    render: function() {
        this.renderer.render( this.stage );
    },


    onAssetsLoaded: function( event ) {
        var frames = event.content.json.frames;

        each( frames, function( frame, frameName ) {
            var spr = PIXI.Sprite.fromFrame( frameName );

            spr.position.x = frame.offset.x;
            spr.position.y = frame.offset.y;

            this.sprites.push( spr );

            // Pop all sprites on to the front
            // This is a crude form of z-indexing
            this.container.addChildAt( spr, 0 );
        }.bind( this ));

        this.render();
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

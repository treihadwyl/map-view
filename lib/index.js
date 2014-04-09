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
    bindAll = require( 'lodash-node/modern/functions/bindAll' ),

    Model = require( './model' ),
    View = require( 'app-view' ),
    events = require( 'app-events' ),
    tmpl = require( 'templates/map-view' ),
    tm = require( 'texture-manager' );


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


// var MapViewModel = Model.extend({
//     extra: 'some extra stuff on the mapviewmodel'
// });
//

/**
 * MapView class
 */
var MapView = View.extend({

    /*-------------------*
     *  Members
     *-------------------*/

    // @todo investigate - props are only set during init()?
    stage: null,
    container: null,
    renderer: null,
    sprites: null,
    model: null,


    /*-------------------*
     *  Methods
     *-------------------*/

    /**
     * Constructor
     * @constructs
     */
    init: function( el, opts ) {

        this._super( el, opts );
        bindAll( this );

        // Expose model for testing
        this.model = Model.create();
        window.mapmodel = this.model;

        this.model.on( 'change:segment', function( event ) {
            console.log( 'changing:', event );
            this.updateModel();
            this.render();
        }.bind( this ) );

        // Set Events
        events.on( events.RESOURCES.TEXTURES_LOADED, this.makeSprites );

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
        // This positioning only serves to center these assets in the middle of the canvas
        this.container.position.x = 32;
        this.container.position.y = 44;
        this.sprites = [];
        this.textures = [];

        this.stage.addChild( this.container );
    },


    /**
     * Attaches the root element of the template to the DOM
     */
    attachTo: function( el ) {
        el.appendChild( this.el );

        return this;
    },


    /**
     * Re-renders the canvas
     */
    render: function() {
        console.log( 'rendering mapView' );
        this.renderer.render( this.stage );
    },


    /**
     * Creates the sprites that represent the walls in the map view.
     * Uses a base texture atlas to get how many sprites to draw and the offsets.
     * Fired in response to a loaded event so we know the textures are ready.
     */
    makeSprites: function() {
        var frames = tm.get.atlas( 'screen1' );

        each( frames, function( frame ) {
            var spr = new PIXI.Sprite( frame.texture );

            spr.position.x = frame.data.offset.x;
            spr.position.y = frame.data.offset.y;

            this.sprites.push( spr );
            this.container.addChildAt( spr, 0 );
        }.bind( this ));

        // For now call updateModel here
        this.updateModel();
    },


    /**
     * Synchronises the sprites with data from the model
     */
    updateModel: function() {
        each( this.sprites, function( sprite, index ) {
            // If the wall does not exist then do not draw the sprite
            if ( this.model.segment[ index ] === 0 ) {
                sprite.visible = false;
                return;
            }


            // Draw stone or wood (only stone or wood in the current example)
            var data = tm.get.atlas( 'screen' + this.model.segment[ index ] )[ index ];

            sprite.texture = data.texture;

            // Given current texture model this is unnecessary
            // sprite.position.x = data.data.offset.x;
            // sprite.position.y = data.data.offset.y;
        }.bind( this ));
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

;(function ( $, window, document, undefined ) {

    var pluginName = "keepTheRhythm",
        defaults = {
            baseLine: 24,
            verticalAlignment: "center",
            spacing: "padding"
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.options = $.extend( {}, defaults, options );

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function() {
            var obj = $(this.element);
            var rhythmPlugin = this;

            $(window).resize(function () {
                rhythmPlugin.fixRhythm(obj);
            }).trigger("resize");
        },

        fixRhythm: function (obj) {
            var h = obj.height();
            var r = this.options.baseLine - (h % this.options.baseLine);

            //if the element is in rhythm: do nothing.
            if (r == this.options.baseLine) {
                r = 0;
            }

            var top = 0;
            var bottom = r;

            if (this.options.verticalAlignment == "center") {
                //if verticalAlignment is set to center; spread the padding to both top and bottom
                top = r / 2;
                bottom = r - top;
            } else if (this.options.verticalAlignment == "bottom") {
                //if the alignment is bottom; set to padding to the top!
                top = r;
                bottom = 0;
            }

            if (this.options.spacing == "margin") {
                obj.css({
                    marginTop: top + "px",
                    marginBottom: bottom + "px"
                });
            } else {
                obj.css({
                    paddingTop: top + "px",
                    paddingBottom: bottom + "px"
                });
            }
        }
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );
// --------------------------------------------------------------
//
// Renders a Text object.
//
//
// --------------------------------------------------------------
MyGame.render.TextRenderer = (function(graphics) {
    'use strict';

    function render(spec) {
        graphics.drawText(spec);
    }

    return {
        render: render
    };
}(MyGame.graphics));

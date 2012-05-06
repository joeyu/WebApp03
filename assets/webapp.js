$(document).ready(function() {
    var canvas_painting = $('<canvas id="canvas_painting" style="width:100%;height:80%"/>')
                            .appendTo($('body'));
    $('<a href="#">abc</a>').insertAfter('#canvas_painting');
                            
    CanvasDrawr({id:"canvas_painting", size: 15});
});
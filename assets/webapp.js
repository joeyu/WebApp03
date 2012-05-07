$(document).ready(function() {
    var canvas_painting = $('<canvas id="canvas_painting" style="width:100%;height:80%;border-bottom:1px solid black"/>')
                            .appendTo($('body'));
    $('<a id="a" href="#">abc</a>').insertAfter('#canvas_painting');
    $('<a id="b" href="#">abc</a>').insertAfter('#a');
    $('<a id="c" href="#">abc</a>').insertAfter('#b');
                            
    var canvasDrawr = CanvasDrawr({id:"canvas_painting", size: 5});
});
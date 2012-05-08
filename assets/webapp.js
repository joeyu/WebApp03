$(document).ready(function() {
    $('<p id="p"/>').appendTo($('body'));
    $('<span id="a" >a</span>').appendTo($('#p'));//.insertAfter('#canvas_painting');
    $('<span id="b" >b</span>').appendTo($('#p'));
    $('<span id="c" >c</span>').appendTo($('#p'));
    $('<span id="d" >d</span>').appendTo($('#p'));
    $('<canvas id="canvas_painting"/>')
    	.css({width:'100%', height:'80%', border:'1px solid black'})
    	.appendTo($('body'));
                           
    var canvasDrawr = new CanvasDrawr({id:"canvas_painting", size: 5});
});
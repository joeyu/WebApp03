          
function CanvasDrawr(options) {
    var canvas  = document.getElementById(options.id),
        context = canvas.getContext("2d");
    
    // Override dimension by CSS
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    canvas.style.width = '';
    canvas.style.height = '';
    $('#a').html("[" + canvas.width + "," + canvas.height + "]");

    // set props from options, but the defaults are for the cool kids
    context.lineWidth = options.size || 3;
    context.lineCap = options.lineCap || "round";
    context.strokeStyle = options.color || "red"; 
    context.pX = undefined;
    context.pY = undefined;
 
    var offset = $(canvas).offset();
    var touches = [,,];
     
    this.canvas = canvas;
//    this.context = context;
    
    canvas.addEventListener('touchstart', startDraw, false);
    canvas.addEventListener('touchmove', draw, false);
                       
    function startDraw (event) {
        $.each(event.touches, function(i, touch) {
            var id = touch.identifier;            
            touches[id] = { 
                x: this.pageX - offset.left, 
                y: this.pageY - offset.top, 
            };
        });

        event.preventDefault();
    }

    function draw(event) {
        $.each(event.touches, function(i, touch) {
            var id  = touch.identifier,
                x   = touches[id].x;
                y   = touches[id].y;
                toX = this.pageX - offset.left,
                toY = this.pageY - offset.top;

            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(toX, toY);
            context.stroke();
            context.closePath();
            
            touches[id].x = toX;
            touches[id].y = toY;
            $('#b').html("[" + toX + "," + toY + "]");
        });

        event.preventDefault();
    }
}




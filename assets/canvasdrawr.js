
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
 
    this.canvas = canvas;
//    this.context = context;
    
    /*
    this.multiTouch = new MultiTouch(canvas, {touchmove: draw});
                       
    function draw(event, multiTouch) {
        $.each(event.changedTouches, function(i, touch) {
            var id          = touch.identifier,
                touch         = multiTouch.mTouches[id][multiTouch.mTouches[id].length - 1],
                touchPre    = multiTouch.mTouches[id][multiTouch.mTouches[id].length - 2],
                offset        = $(multiTouch.element).offset();
                x           = touch.clientX - offset.left,
                y           = touch.clientY - offset.top,
                toX         = touchPre.clientX - offset.left,
                toY         = touchPre.clientY - offset.top;

            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(toX, toY);
            context.stroke();
            context.closePath();            
        });
    }
    */
    $(canvas).multiTouch({
       touchmove: function(event) {
            var self = this;
            
            //var context = self.context;//event.target.getContext("2d");
            var origEvent = event.originalEvent;
            $.each(origEvent.changedTouches, function(i, touch) {
                var id          = touch.identifier,
                    touch       = self.mTouches[id][self.mTouches[id].length - 1],
                    touchPre    = self.mTouches[id][self.mTouches[id].length - 2],
                    offset      = self.offset();
                    x           = touch.clientX - offset.left,
                    y           = touch.clientY - offset.top,
                    toX         = touchPre.clientX - offset.left,
                    toY         = touchPre.clientY - offset.top;

                context.beginPath();
                context.moveTo(x, y);
                context.lineTo(toX, toY);
                context.stroke();
                context.closePath();            
            });
        },
        touchend: function(event) {
            colors  = ["red", "green", "yellow", "blue", "magenta", "orangered"];
            context.strokeStyle = colors[Math.floor(Math.random() * colors.length)];
        },
    });
}




function MultiTouch(element, callbacks)
{
    this.touches 	= [];
    this.callbacks 	= callbacks;

	element.addEventListener('touchstart', 	onTouchstart, 	false);	
	element.addEventListener('touchmove', 	onTouchmove, 	false);
	element.addEventListener('touchend', 	onTouchend, 	false);

	var self = this;
	function onTouchstart(event) {
		console.log(event);
        $.each(event.changedTouches, function(i, touch) {
            var id = touch.identifier;            
            self.touches[id] = [{ 
                x: this.clientX, 
                y: this.clientY, 
            }];
    		$('#b').html("[" + id + ": " + this.clientX + "," + this.clientY + "]");
        });
        
        if (self.callbacks.touchstart) {
        	self.callbacks.touchstart(event);
		}
        
        event.preventDefault();
	}

	function onTouchmove(event) {
        $.each(event.changedTouches, function(i, touch) {
            var id = touch.identifier;            
            self.touches[id].push({ 
                x: this.clientX, 
                y: this.clientY, 
            });
            $('#c').html("[" + id + ": " + this.clientX + "," + this.clientY + "]");
        });
        if (self.callbacks.touchmove) {
        	self.callbacks.touchmove(event, self);
		}        
        event.preventDefault();
	}

	function onTouchend(event) {
		if (self.callbacks.touchend) {
			self.callbacks.touchend(event);
		}
        $.each(event.changedTouches, function(i, touch) {
            var id = touch.identifier;            
            delete self.touches[id];
            $('#d').html("[" + id + ": " + this.clientX + "," + this.clientY + "]");
        });
        
        event.preventDefault();
	}
}

MultiTouch.prototype.callback = function(callbacks) {
    this.callbacks = callbacks;
}

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
 
    var touches = [];
     
    this.canvas = canvas;
//    this.context = context;
    
    this.multiTouch = new MultiTouch(canvas, {touchmove: draw});
                       
    function draw(event, multiTouch) {
        $.each(event.changedTouches, function(i, touch) {
            var id  	= touch.identifier,
            	last 	= multiTouch.touches[id].length - 1,
                x   	= multiTouch.touches[id][last - 1].x,
                y   	= multiTouch.touches[id][last - 1].y,
                toX 	= multiTouch.touches[id][last].x,
                toY 	= multiTouch.touches[id][last].y;

            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(toX, toY);
            context.stroke();
            context.closePath();            
        });

        event.preventDefault();
    }
}




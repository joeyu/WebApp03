function MultiTouch(element, callbacks)
{
    this.mTouches 	= [];
    this.callbacks 	= callbacks;
    this.element 	= element;

	element.addEventListener('touchstart', 	onTouchstart, 	false);	
	element.addEventListener('touchmove', 	onTouchmove, 	false);
	element.addEventListener('touchend', 	onTouchend, 	false);

	var self = this;
	function onTouchstart(event) {
		console.log(event);
        $.each(event.changedTouches, function(i, touch) {
        	// filter target touches
        	if ($.inArray(touch, event.targetTouches) >= 0) {
        		touch.time 	= (new Date()).getTime();
        		touch.viX	= 0; 
        		touch.viY	= 0; 
        		self.mTouches[touch.identifier] = [touch];
        		$('#a').html("[" + touch.identifier + ": " + touch.clientX + "," + touch.clientY + "]");
        	}
        });
        
        if (self.callbacks.touchstart) {
        	self.callbacks.touchstart(event);
		}
        
        event.preventDefault();
	}

	function onTouchmove(event) {
        $.each(event.changedTouches, function(i, touch) {
        	// filter target touches
        	if ($.inArray(touch, event.targetTouches) >= 0) {
        		touch.time 		= (new Date()).getTime();
        		var touches 	= self.mTouches[touch.identifier],
        			touchPrev	= touches[touches.length - 1],
        		 	time 		= touch.time - touchPrev.time;
        		touch.vtX 		= (touch.clientX - touchPrev.clientX) / time; 
        		touch.vtY		= (touch.clientY - touchPrev.clientY) / time;
        		touches.push(touch);
                $('#b').html("[" + touch.identifier + ": " + touchPrev.clientX + "," + touch.clientY + "]");
        		$('#c').html("[" + touch.identifier + ": " + touch.vtX.toFixed(2) + "," + touch.vtY.toFixed(2) + "]");
        	}
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
		
		// dereferencing
        $.each(event.changedTouches, function(i, touch) {
        	if (touch.target === self.element) {
                delete self.mTouches[touch.identifier];
                $('#d').html("[" + touch.identifier + ": " + touch.clientX + "," + touch.clientY + "]");
        	}
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
 
    this.canvas = canvas;
//    this.context = context;
    
    this.multiTouch = new MultiTouch(canvas, {touchmove: draw});
                       
    function draw(event, multiTouch) {
        $.each(event.changedTouches, function(i, touch) {
            var id  		= touch.identifier,
        		touch 		= multiTouch.mTouches[id][multiTouch.mTouches[id].length - 1],
        		touchPre	= multiTouch.mTouches[id][multiTouch.mTouches[id].length - 2],
        		offset		= $(multiTouch.element).offset();
                x   		= touch.clientX - offset.left,
                y   		= touch.clientY - offset.top,
                toX 		= touchPre.clientX - offset.left,
                toY 		= touchPre.clientY - offset.top;

            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(toX, toY);
            context.stroke();
            context.closePath();            
        });
    }
}




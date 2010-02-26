steal.plugins('jquery/controller','jquery/event/drag/limit','jquery/dom/dimensions').then(function($){
	
	
	$.Controller.extend("Phui.Splitter",
	{
		defaults : {
			CHILD_CLASS_NAMES : "split",
			ACTIVE_STATE : "active",
			TYPES : [],
			HOVER_STATE : "split-hover",
			SPLITTER : "splitter"
		}
	},
	{
		init : function(){
			//determine if horizontal or vertical ...
			this.element.mixin.apply(this.element, this.Class.TYPES)
			//insert splitter
			var c = this.element.children(), splitters = c.length - 1;
			for(var i=0; i < c.length - 1; i++){
				$(c[i]).after("<div class='hsplitter'/>")
			}
			var splitterHeight = this.element.children(".hsplitter").outerHeight()
			//size everything
			var total  = this.element.height() - splitterHeight* splitters;
			for(var i=0; i < c.length; i++){
				var $c = $(c[i]);
				var cheight = $c.outerHeight();
				if(cheight > total){
					cheight = total;
				}
				$c.height(cheight).addClass("split");
				total = total - cheight;
			}
			//space guys accordingly	
		},
		".hsplitter mouseenter" : function(el){
			el.addClass(this.Class.HOVER_STATE)
		},
		".hsplitter mouseleave" : function(el){
			if(!this.dragging)
				el.removeClass(this.Class.HOVER_STATE)
		},
		".hsplitter dragstart" : function(el, ev, drag){
			drag.limit(this.element)
			drag.vertical()
			drag.ghost().addClass("move").addClass(this.Class.HOVER_STATE)
			this.dragging = true;
		},
		".hsplitter dragend" : function(el, ev, drag){
			//get top and size sibblings
			//get the difference ...
			this.dragging = false;
			
			var top = drag.movingElement.offset().top - el.offset().top || 0 ,
				prev = el.prev(),
				next = drag.movingElement.next(),
				prevH = prev.height(),
				nextH = next.height();
			
			//do the shrinking one first
			if(top > 0){
				next.height( nextH - top);
				prev.height( prevH + top)
			}else{
				prev.height( prevH + top)
				next.height( nextH - top);
			}
			
			
			
			
			//drag.movingElement.css("top","")
		},
		resize : function(){
			//go through children and resize
			var height = this.element.height();
			
			var c = this.element.children(":not(.hsplitter)");
			var splitters = this.element.children(".hsplitter");
			var splitterHeight = splitters.outerHeight();
			//size everything
			var total  = this.element.height() - splitterHeight* splitters.length;

			for(var i =0; i < c.length; i++){
				var $c = $(c[i]);
				var cheight = $c.outerHeight();

				if(cheight > total){
					cheight = total;
				}
				if(i == c.length - 1){

					$c.outerHeight(total);
				}else{
					$c.outerHeight(cheight);
				}
				total = total - cheight;
				
			}

		}
	})
})

function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
	}
	return array;
}

jQuery(document).ready(function($){
	
	/*
	 * Init shit
	 * @params	void
	 * @void	void
	 */
	var app = {
		init: function(){
				$(document).scroll(this.header);
				this.isotope();
				this.scrollTop();
				this.wordcount();
				
		},
		
		/*
		 * Change header class to trigger compression animation
		 * @params	void
		 * @void	void
		 */
		header: function(){
			if($(window).scrollTop() > 50){ 
				$('.header').addClass("scrolled") 
			} else {
				$('.header').removeClass("scrolled");
			};
		},
		
		/*
		 * Feedback word count to user on single page
		 * @params	void
		 * @void	void
		 */
		wordcount: function(){
			var $el = {
				excerpt: $('.excerpt'),
				content: $('.text'),
				display: $('.difference-value'),
				anchor: $('.count')
			}
			
			if ($el.content.length == 0) return;
			
			//Discard HTML comments, starting tags, closing tags and white space	
			var excerptText = $el.excerpt[0].innerHTML.replace(/(?:<.[^\/>]*|\t|\r|\n|>)/g,'');
			var contentText= $el.content[0].innerHTML.replace(/(?:<.[^\/>]*|\t|\r|\n|>)/g,'');
			//Matches format of letter/number + whitespace + letter/number
			var excerptMatch= excerptText.match(/[0-9a-zA-z\.]?[\ ][0-9a-zA-z\.]/g);
			var contentMatch= contentText.match(/[0-9a-zA-z\.]?[\ ][0-9a-zA-z\.]/g);
			var differenceValue = (excerptMatch && contentMatch ? contentMatch.length - excerptMatch.length : 0);
			$el.display.html(differenceValue);
			if (differenceValue){
				$el.anchor.addClass('init-show');
			} else {
				$el.anchor.remove();
			}
			
			$el.anchor.on('click',function(){
				var els = [$el.excerpt[0],$el.anchor[0],$el.content[0]];
				$(els).addClass('show');
				
			});
		},
		
		/*
		 * Trigger isotope layout
		 * @params	void
		 * @void	void
		 */
		isotope: function(){
			var $el = $('#content');
			if ($el.length){
				$el.isotope({
					itemSelector: '.post',
					masonry: {
						columnWidth: 310
					}
				});
				this.animateInit();
			}
		},
		
		animateInit:function(){
			new TimelineMax()
			.staggerFromTo('article.post',0.2,{css:{opacity:0,y:-5}},{delay:0.2,css:{opacity:1,x:0}},0.1);
		},
		
		/*
		 * Scroll to top of page
		 * @params	void
		 * @void	void
		 */
		scrollTop: function(){
		 $('.up').on('click',function(){
			 $('html, body').animate({scrollTop:0});
		 })
		}
	}
	app.init();
});
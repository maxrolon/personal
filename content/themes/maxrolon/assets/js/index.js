jQuery(document).ready(function($){
	
	var app = {
		init: function(){
				$(document).scroll(this.header);
				this.isotope();
				this.scrollTop();
				this.wordcount();
				
		},
		header: function(){
			if($(window).scrollTop() > 50){ 
				$('.header').addClass("scrolled") 
			} else {
				$('.header').removeClass("scrolled");
			};
		},
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
			if (differenceValue) $el.anchor.addClass('init-show');
			
			$el.anchor.on('click',function(){
				var els = [$el.excerpt[0],$el.anchor[0],$el.content[0]];
				$(els).addClass('show');
				
			});
		},
		isotope: function(){
			var $el = $('#content');
			if ($el.length){
				$el.isotope({
					itemSelector: '.post',
					masonry: {
						columnWidth: 310
					}
				});
				setTimeout(function(){
					$el.addClass('show');
				}, 50);
			}
		},
		scrollTop: function(){
		 $('.up').on('click',function(){
			 $('html, body').animate({scrollTop:0});
		 })
		}
	}
	app.init();
});
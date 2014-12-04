// Global Variables
_smScrn = '768';
_filterClass = '.category-filter-button';

// Make featured image extend to bottom (Jquery.php)
var bodyheight = jQuery(window).height() - '100';
var header = jQuery(".header").height();

jQuery(document).ready(function($){
	
	// Taken from jquery.php
	$('.ls-wp-fullwidth-container').css("height", bodyheight);
	$( 'p:empty' ).remove();
	$('.ls-bg').css("transform", "translateY(1px)");
	$('.isotope-loadmore a').click(function() {$('.isotope-loadmore a').text("Loading...");});
	$( ".dropdown > a" ).append( "<i class='icon-chevron-down'></i>");
	
	// Taken from jquery.php
	$(document).scroll(function(){
		if($(window).scrollTop() > 50){ 
			$('.header').addClass("header-scrolled") 
		} else {
			$('.header').removeClass("header-scrolled");
		};
	});

	
	//Filter Toggle
	$(_filterClass).click(function(){
		width = $(window).width();
		if (width <= _smScrn){
			$(_filterClass + '+ ul').toggleClass('show');
		} else {
			var test = $('.category-filter a.selected').parent().is(':last-child');
			if ( test ){$('.category-filter li:first-child a').trigger('click');return;};
			$('.category-filter a.selected').parent().next().children('a').trigger('click');
		}
	})

	$(".kern").lettering();
	
	$(".single__social-toggle").click(function(){
		$('#ssba').toggle('fade');
	});
	
	$(".filters i").click(function(){
		$('.filters, .filters .container').toggleClass('show');
	});
	
	function mr_moveShareButton(){
		var $destination = $('.word-count');
		var $shareContainer = $('.full-content').find('#ssba').remove();
		$destination.append($shareContainer);
	};
	
	function mr_wordCount(){
		mr_moveShareButton();
		var $excerpt = $('.excerpt-lg');
		var $content = $('.full-content');
		var $display = $('.difference-value');
		
		/*
		 * Don't run if not appropriate	
		 */
		if ($content.length == 0) return;
		
		/*
		 * Discard HTML comments, starting tags, closing tags and white space		
		 */
		 var $excerptText = $excerpt[0].innerHTML.replace(/\<\!\-\-.*\-\-\>/,'').replace(/\<[^\/]*>/g,'').replace(/\<\/.*>/g,'').replace(/[\t\r\n]/g,'');
		 var $contentText = $content[0].innerHTML.replace(/\<\!\-\-.*\-\-\>/,'').replace(/\<[^\/]*>/g,'').replace(/\<\/.*>/g,'').replace(/[\t\r\n]/g,'');
		 
		 /*
		 * Matches format of letter/number + whitespace + letter/number	
		 */
		 var $excerptMatch = $excerptText.match(/[0-9a-zA-z\.]?[\ ][0-9a-zA-z\.]/g);
		 var $contentMatch = $contentText.match(/[0-9a-zA-z\.]?[\ ][0-9a-zA-z\.]/g);
		 
		 var differenceValue = $contentMatch.length - $excerptMatch.length;
		 
		 $display[0].innerHTML = differenceValue;
	};
	
	//trigger wordcount function for use in single portfolio posts
	mr_wordCount();
	
	$(".single__expand").click(function(){
		$('.excerpt-lg,.full-content').toggleClass('show');
		$(this).toggleClass('expanded');
		
	});
		

});


// Taken from jquery.php
jQuery(window).load(function(){
	 jQuery('.isotope-preloader').css("display", "none");
	 jQuery('.isotope').css("opacity", "1");
});
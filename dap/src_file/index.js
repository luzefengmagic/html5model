define('ui/page/detail/index', function(require, exports, module){
	var $ = require('lib/jquery'),
		util = require('module/util'),
		Browser = require('util/browser'),
		ImgLazyLoad = require('ui/widget/imglazyload'),
		site = require('ui/page/site'),
		undefined;

	var Page = module.exports = {};
	var height = $('.j_page').height(), num=$('.j_page').length, count=1, footHeight=$('.footer').height(), isAnimate=false;
	function setPage(d, t){
		if (isAnimate) {
			return;
		};
		var direction = d, target = t;
		isAnimate = true;
		direction = direction || -1;
		(target==undefined) ? (target=-1):'';
		var top = parseInt($('.j_page').css('top'), 10);
		if (target != -1) {
			top = -height*(target-1);
		}else{
			if ((direction>0&&count<=1) || (direction<0&&count>=num)) {
				isAnimate = false;
				return;
			};
			if (direction > 0) {
				if (count == num) {
					top += footHeight;
				}else{
					top += height;
				}
			}else{
				if (count == num-1) {
					top -=footHeight;
				}else{
					top -= height;
				}
			}
		}
		$('.j_page').animate({'top':top+'px'}, {duration:600, easing:'swing'});
		$('.j_content_wrap').animate({top:(86+top)+'px'}, {duration:600, easing:'swing', complete:function(){
			if (target != -1) {
				count = target;
			}else{
				if (direction>0) {
					count--;
				}else{
					count++;
				}
			}
			var index = Math.max(Math.min(count, num-1), 1);
			var $ele = $('.j_content_nav a').eq(index-1), $active=$('.j_content_nav a').filter('.active');
			$active.removeClass('active');
			var activeSrc = $active.find('img').attr('src'),eleSrc = $ele.find('img').attr('src');
			activeSrc = activeSrc.replace('nav-o', 'nav-c');
			eleSrc = eleSrc.replace('nav-c', 'nav-o');
			$active.find('img').attr('src', activeSrc);
			$ele.find('img').attr('src', eleSrc);
			var $allNavImages = $('.j_content_nav a img');
			if (index == 5) {
				$allNavImages.each(function(index, item){
					var $item = $(item), src = $item.attr('src');
					src = src.replace('-white', '-red');
					$item.attr('src', src);
				});
			}else{
				$allNavImages.each(function(index, item){
					var $item = $(item), src = $item.attr('src');
					src = src.replace('-red', '-white');
					$item.attr('src', src);
				});
			}
			$ele.addClass('active');
			isAnimate=false;
		}});
	}

	function initEvent(){
		var scrollTimer;
		$(document).bind('mousewheel', function(evt, delta){
			clearTimeout(scrollTimer);
			scrollTimer = setTimeout(function(){
				isAnimate?'':setPage(delta);//-1:down, 1:up
			}, 100);
			return false;
		});
		$('.j_content_nav a').bind('click', function(event){
			var $a = $('.j_content_nav a'), activeIndex=$a.index($a.filter('.active')[0]), curIndex=$a.index(this), direction;
			direction = activeIndex-curIndex;
			if (direction == 0 && count != num) {
				return false;
			};
			direction = direction>0 ? 1 : -1;
			isAnimate?'':setPage(direction, curIndex+1);//-1:down, 1:up
			return false;
		});
		$('.j_download_area').bind('click', function(){
			$('.j_content_nav a').eq(4).click();
			return false;
		});
		$(document).keydown(function(evt){
			evt = evt || window.event;
			if (evt.keyCode == 40) {
				setPage(-1);
			}else if (evt.keyCode == 38) {
				setPage(1);
			};
		});
	}
	function fixPosition(){
		$('.j_header').css({'position':'absolute', 'left':0, 'top':0});
		$('.j_content_nav').css({'position':'absolute', 'right':'16px', 'top':'50%', 'margin-top':'-65px', 'z-index':'10'}).show();
	}
	function initSlider(){
		var num = $('.j_slides_ul li').length, liWidth = $('.j_slides_ul li').width(), width = liWidth*num;
		$('.j_slides_ul').width(width);
		function sliderPic(){
			$(".j_slides_ul").animate({'marginLeft' : "-"+ liWidth + "px"},600, "swing",function(){
				$('.j_slides_ul li').eq(0).appendTo('.j_slides_ul');
				$('.j_slides_ul').css('margin-left', '0px');
			});
		}
		setInterval(sliderPic, 3000);
	}

	function initPage(){
		if (Browser.ie == '6.0') {
			fixPosition();
		};
		initSlider();
	}

	Page.init = function(){
		site.init();
		initPage();
		initEvent();
		ImgLazyLoad.show();
	}
})
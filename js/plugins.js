// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/

window.log = function f() {
    log.history = log.history || [];
    log.history.push(arguments);
    if (this.console) {
        var args = arguments;
        var newarr;

        try {
            args.callee = f.caller;
        } catch(e) {

        }

        newarr = [].slice.call(args);

        if (typeof console.log === 'object') {
            log.apply.call(console.log, console, newarr);
        } else {
            console.log.apply(console, newarr);
        }
    }
};

// make it safe to use console.log always

(function(a) {
    function b() {}
    var c = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn";
    var d;
    for (c = c.split(","); !!(d = c.pop());) {
        a[d] = a[d] || b;
    }
})(function() {
    try {
        console.log();
        return window.console;
    } catch(a) {
        return (window.console = {});
    }
}());

// place any jQuery/helper plugins in here, instead of separate, slower script files.

/**
 *	Really Simple™ Slideshow jQuery plug-in 1.4.11
 *	---------------------------------------------------------
 *	Introduction, demos, docs, license, downloads, etc:
 *	http://reallysimpleworks.com/slideshow
 */
(function($){var methods={init:function(options){return this.each(function(){var slideshow=this,$slideshow=$(this),data=$slideshow.data('rsf_slideshow'),settings;if(!data){settings=$.extend(true,{},$.rsfSlideshow.defaults);if(typeof options==='object'){$.extend(true,settings,options);}
	$slideshow.data('rsf_slideshow',{slides:[],this_slide:0,effect_iterator:{this_effect:-1,direction:1},settings:settings,interval_id:false,loaded_imgs:[],queued:0});data=$slideshow.data('rsf_slideshow');}
	settings=data.settings;$slideshow.rsfSlideshow('getSlidesFromMarkup');if(settings.slides.length){$slideshow.rsfSlideshow('addSlides',settings.slides);settings.slides=[];}
	if(typeof settings.eventHandlers==='object'){$.each(settings.eventHandlers,function(evnt,fn){$slideshow.bind(evnt,function(e){fn($slideshow,e);});});}
	if(settings.controls.playPause.auto){$slideshow.rsfSlideshow('addControl','playPause');}
	if(settings.controls.previousSlide.auto){$slideshow.rsfSlideshow('addControl','previousSlide');}
	if(settings.controls.index.auto){$slideshow.rsfSlideshow('addControl','index');}
	if(settings.controls.nextSlide.auto){$slideshow.rsfSlideshow('addControl','nextSlide');}
	if(settings.autostart){$slideshow.rsfSlideshow('startShow');}});},addSlides:function(slides){return this.each(function(){if(slides instanceof Array){for(var i=0,len=slides.length;i<len;i++){RssPrivateMethods._addSlide($(this),slides[i]);}}
else{RssPrivateMethods._addSlide($(this),slides);}});},removeSlides:function(slide_keys){if(slide_keys===undefined){return this.each(function(){$(this).data('rsf_slideshow').slides=[];});}
else if(slide_keys instanceof Array){slide_keys.sort(function(a,b){return b-a;});var removed=[];return this.each(function(){for(var i=0,len=slide_keys.length;i<len;i++){if($.inArray(slide_keys[i],removed)===-1){RssPrivateMethods._removeSlide($(this),slide_keys[i]);removed.push(slide_keys[i]);}}});}
else{return this.each(function(){RssPrivateMethods._removeSlide($(this),slide_keys);});}},getSlideData:function(key){if(key===undefined){return this.data('rsf_slideshow').slides;}
	if(this.data('rsf_slideshow').slides[key]){return this.data('rsf_slideshow').slides[key];}
	return false;},startShow:function(interval,instant){return this.each(function(){var $slideshow=$(this);if(!$slideshow.data('rsf_slideshow').interval_id){if(instant){$slideshow.rsfSlideshow('nextSlide');}
	$slideshow.data('rsf_slideshow')._current_interval=interval;RssPrivateMethods._setTimeout($slideshow,interval);$slideshow.bind('_rsSlideReady',function(e,event_data){RssPrivateMethods._setTimeout($slideshow,interval);});RssPrivateMethods._trigger($slideshow,'rsStartShow');}});},stopShow:function(){return this.each(function(){var $slideshow=$(this),data=$slideshow.data('rsf_slideshow');if(data.interval_id){$slideshow.unbind('_rsSlideReady',function(e,event_data){RssPrivateMethods._setTimeout($slideshow,data._current_interval);});if(data.interval_id){clearTimeout(data.interval_id);data.interval_id=false;}
	RssPrivateMethods._trigger($(this),'rsStopShow');}});},toggleShow:function(){return this.each(function(){if($(this).rsfSlideshow('isRunning')){$(this).rsfSlideshow('stopShow');}
else{$(this).rsfSlideshow('startShow');}});},isRunning:function(){if(this.data('rsf_slideshow').interval_id){return true;}
	return false;},currentSlideKey:function(){var data=this.data('rsf_slideshow');return data.this_slide;},totalSlides:function(){var data=this.data('rsf_slideshow');return data.slides.length;},getSlidesFromMarkup:function(options){return this.each(function(){var data=$(this).data('rsf_slideshow');if(!options){options={};}
	if(!options.data_container){options.data_container=data.settings.data_container;}
	var $cntnr;if(options.data_container.charAt(0)==='#'){$cntnr=$(options.data_container);}
	else{$cntnr=$(this).children(options.data_container);}
	if(!$cntnr.length){return false;}
	if(!options.slide_data_container){options.slide_data_container=data.settings.slide_data_container;}
	var slide_data_selectors=$.extend(true,{},data.settings.slide_data_selectors);if(options.slide_data_selectors){$.extend(true,slide_data_selectors,options.slide_data_selectors);}
	options.slide_data_selectors=slide_data_selectors;var $self=$(this);$cntnr.children(options.slide_data_container).each(function(){var slide=RssPrivateMethods._findData($(this),options.slide_data_selectors);$self.rsfSlideshow('addSlides',slide);});});},nextSlide:function(){return this.each(function(){var data=$(this).data('rsf_slideshow');data.this_slide++;if(data.this_slide>=data.slides.length){if(data.settings.loop){data.this_slide=0;}
else{data.this_slide=data.slides.length-1;$(this).rsfSlideshow('stopShow');return true;}}
	$(this).rsfSlideshow('showSlide',data.slides[data.this_slide]);});},previousSlide:function(){return this.each(function(){var data=$(this).data('rsf_slideshow');data.this_slide--;if(data.this_slide<0){if(data.settings.loop){data.this_slide=data.slides.length-1;}
else{data.this_slide=0;$(this).rsfSlideshow('stopShow');return true;}}
	$(this).rsfSlideshow('showSlide',data.slides[data.this_slide]);});},goToSlide:function(key){return this.each(function(){var data=$(this).data('rsf_slideshow');if(typeof data.slides[key]==='object'){data.this_slide=key;$(this).rsfSlideshow('showSlide',data.slides[data.this_slide]);}});},showSlide:function(slide){var $slideshow=this,data=$slideshow.data('rsf_slideshow'),containerWidth=$slideshow.width(),containerHeight=$slideshow.height();RssPrivateMethods._trigger($slideshow,'rsPreTransition');$slideshow.children('img:first').css('z-index',0);var whenLoaded=function(img){var $img=$(img);$img.addClass('rsf-slideshow-image');var whenDimensions=function(width,height){RssPrivateMethods._trigger($slideshow,'rsImageReady');var leftOffset=0;if(width){leftOffset=Math.ceil((containerWidth/2)-(width/2));}
	var topOffset=0;if(height){topOffset=Math.ceil((containerHeight/2)-(height/2));}
	$img.css({left:leftOffset});$img.css({top:topOffset});if(slide.image_title){$img.attr('title',slide.image_title);}
	if(slide.image_alt){$img.attr('alt',slide.image_alt);}
	if(slide.link_to){$img=$('<a href="'+slide.link_to+'"></a>').append($img);}
	var $slide=$('<div></div>');$slide.addClass(data.settings.slide_container_class);$slide.append($img).css('display','none');if(slide.caption){var $capt=$('<div>'+slide.caption+'</div>');$capt.addClass(data.settings.slide_caption_class);$capt.appendTo($slide);if(slide.captionClass){$capt.addClass(slide.captionClass);}}
	var effect=data.settings.effect;if(slide.effect){effect=slide.effect;}
	RssPrivateMethods._trigger($slideshow,'_rsSlideReady',{$slide:$slide});RssPrivateMethods._trigger($slideshow,'rsSlideReady',{$slide:$slide});RssPrivateMethods._transitionWith($slideshow,$slide,effect);return true;};RssPrivateMethods._getImageDimensions($slideshow,$img,whenDimensions,(data.settings.interval*1000)/2,function(){whenDimensions();});};var newImg=new Image();$(newImg).bind('load',function(){whenLoaded(this);});newImg.src=slide.url;return this;},addControl:function(type){return this.each(function(){var $slideshow=$(this),settings=$slideshow.data('rsf_slideshow').settings;var $control=settings.controls[type].generate($slideshow);RssPrivateMethods._controlsContainer($slideshow);settings.controls[type].place($slideshow,$control);var bind_method='bind'+type.substr(0,1).toUpperCase()+type.substr(1,type.length);$slideshow.rsfSlideshow(bind_method,$control);});},bindPlayPause:function($playPause){return this.each(function(){var $slideshow=$(this);var data=$slideshow.data('rsf_slideshow');$playPause.bind('click.rsfSlideshow',function(e){e.preventDefault();$slideshow.rsfSlideshow('toggleShow');});});},bindPreviousSlide:function($prev,autostop){return this.each(function(){var $slideshow=$(this);var data=$slideshow.data('rsf_slideshow');if(!autostop){autostop=data.settings.controls.previousSlide.autostop;}
	$prev.bind('click.rsfSlideshow',function(e){e.preventDefault();$slideshow.rsfSlideshow('previousSlide');if(autostop){$slideshow.rsfSlideshow('stopShow');}});});},bindNextSlide:function($next,autostop){return this.each(function(){var $slideshow=$(this);var data=$slideshow.data('rsf_slideshow');if(!autostop){autostop=data.settings.controls.nextSlide.autostop;}
	$next.bind('click.rsfSlideshow',function(e){e.preventDefault();$slideshow.rsfSlideshow('nextSlide');if(autostop){$slideshow.rsfSlideshow('stopShow');}});});},bindIndex:function($index,autostop){return this.each(function(){var $slideshow=$(this),settings=$slideshow.data('rsf_slideshow').settings;if(!autostop){autostop=settings.controls.index.autostop;}
	var $indexLinks=settings.controls.index.getEach($slideshow);$indexLinks.bind('click.rsfSlideshow',function(e){e.preventDefault();var slide_key=settings.controls.index.getSlideKey($(this));if(slide_key){$slideshow.rsfSlideshow('goToSlide',slide_key);if(autostop){$slideshow.rsfSlideshow('stopShow');}}});RssPrivateMethods._bindActiveIndex($slideshow);});}};$.fn.rsfSlideshow=function(method){if(!this.length){return this;}
	if(methods[method]){return methods[method].apply(this,Array.prototype.slice.call(arguments,1));}
	else if(typeof method==='object'||!method){return methods.init.apply(this,arguments);}
	else{$.error('Method '+method+' does not exist on jQuery.rsfSlidehow');}};var RssPrivateMethods={_findData:function($slideData,slide_data_selectors){var slide={};var slide_attr;for(var key in slide_data_selectors){if(slide_data_selectors.hasOwnProperty(key)){var $slideDataClone=$slideData.clone();if(slide_data_selectors[key].selector){$slideDataClone=$slideDataClone.children(slide_data_selectors[key].selector);}
	if(slide_data_selectors[key].attr){slide_attr=$slideDataClone.attr(slide_data_selectors[key].attr);}
	else{slide_attr=$slideDataClone.html();}
	slide[key]=slide_attr;}}
	return slide;},_addSlide:function($slideshow,slide){var data=$slideshow.data('rsf_slideshow');if(typeof slide==='string'){var url=$.trim(slide);data.slides.push({url:url});}
else if(slide.url){for(var key in slide){if(slide.hasOwnProperty(key)){slide[key]=$.trim(slide[key]);}}
	data.slides.push(slide);}},_removeSlide:function($slideshow,key){$slideshow.data('rsf_slideshow').slides.splice(key,1);},_transitionWith:function($slideshow,$slide,effect){var data=$slideshow.data('rsf_slideshow'),effect_iteration='random',$prevSlide=$slideshow.find('.'+data.settings.slide_container_class+':last');if($prevSlide.length){$slide.insertAfter($prevSlide);}
else{$slide.prependTo($slideshow);}
	if(typeof effect==='object'&&effect.iteration&&effect.effects){effect_iteration=effect.iteration;effect=effect.effects;}
	if(effect instanceof Array){switch(effect_iteration){case'loop':data.effect_iterator.this_effect++;if(data.effect_iterator.this_effect>effect.length-1){data.effect_iterator.this_effect=0;}
		break;case'backAndForth':data.effect_iterator.this_effect+=data.effect_iterator.direction;if(data.effect_iterator.this_effect<0){data.effect_iterator.this_effect=1;data.effect_iterator.direction=data.effect_iterator.direction*-1;}
		if(data.effect_iterator.this_effect>effect.length-1){data.effect_iterator.this_effect=effect.length-2;data.effect_iterator.direction=data.effect_iterator.direction*-1;}
		break;default:data.effect_iterator.this_effect=Math.floor(Math.random()*effect.length);break;}
		effect=effect[data.effect_iterator.this_effect];}
	if($.rsfSlideshow.transitions[effect]&&typeof($.rsfSlideshow.transitions[effect])==='function'){$.rsfSlideshow.transitions[effect]($slideshow,$slide);}},_doSlide:function($slideshow,$slide,left_offset,top_offset){var data=$slideshow.data('rsf_slideshow'),$prevSlide=$slide.prev();$slide.css({top:top_offset,left:left_offset});$slide.css('display','block');$slide.stop().animate({top:0,left:0},data.settings.transition,data.settings.easing,function(){RssPrivateMethods._endTransition($slideshow,$slide);});$prevSlide.stop().animate({top:(0-top_offset),left:(0-left_offset)},data.settings.transition,data.settings.easing);},_getImageDimensions:function($slideshow,$img,sucesss,timeout,onTimeout,time){if(!time){time=0;$slideshow.prepend($img);}
	var width=$img.outerWidth();var height=$img.outerHeight();if(width&&height){$img.detach();sucesss(width,height);return true;}
	if(timeout&&time>timeout){$img.detach();if(onTimeout&&typeof(onTimeout)==='function'){onTimeout(timeout,time);}
		return false;}
	time+=200;setTimeout(function(){RssPrivateMethods._getImageDimensions($slideshow,$img,sucesss,timeout,onTimeout,time);},200);},_endTransition:function($slideshow,$slide){$slide.prev().remove();RssPrivateMethods._trigger($slideshow,'rsPostTransition');if($slideshow.rsfSlideshow('currentSlideKey')===$slideshow.rsfSlideshow('totalSlides')-1){RssPrivateMethods._trigger($slideshow,'rsLastSlide');}
else if($slideshow.rsfSlideshow('currentSlideKey')===0){RssPrivateMethods._trigger($slideshow,'rsFirstSlide');}},_bindActiveIndex:function($slideshow){var indexSettings=$slideshow.data('rsf_slideshow').settings.controls.index;$slideshow.bind('rsPreTransition',function(){var current_slide_key=$(this).rsfSlideshow('currentSlideKey');indexSettings.getEach($slideshow).removeClass(indexSettings.active_class);indexSettings.getSingleByKey($slideshow,current_slide_key).addClass(indexSettings.active_class);});},_controlsContainer:function($slideshow){var settings=$slideshow.data('rsf_slideshow').settings;if(!settings.controls.container.get($slideshow).length){var $container=settings.controls.container.generate($slideshow);settings.controls.container.place($slideshow,$container);}},_trigger:function($slideshow,e,event_data){var data=$slideshow.data('rsf_slideshow');if(typeof event_data!=='object'){event_data={};}
	$.extend(event_data,{slide_key:data.this_slide,slide:data.slides[data.this_slide]});$slideshow.trigger(e,event_data);},_setTimeout:function($slideshow,interval){var data=$slideshow.data('rsf_slideshow');if(data.interval_id){clearTimeout(data.interval_id);}
	if(!interval){interval=data.settings.interval;}
	if(interval<=data.settings.transition/1000){interval=(data.settings.transition/1000)+0.1;}
	data.interval_id=setTimeout(function(){$slideshow.rsfSlideshow('nextSlide');},interval*1000);}};$.rsfSlideshow={defaults:{interval:5,transition:1000,effect:'fade',easing:'swing',loop:true,autostart:true,slides:[],slide_container_class:'slide-container',slide_caption_class:'slide-caption',data_container:'ol.slides',slide_data_container:'li',slide_data_selectors:{url:{selector:'a',attr:'href'},caption:{selector:'a',attr:'title'},link_to:{selector:'a',attr:'data-link-to'},effect:{selector:'a',attr:'data-effect'}},eventHandlers:{rsStartShow:function(rssObj,e){var controlSettings=$(rssObj).data('rsf_slideshow').settings.controls.playPause;var $playPause=controlSettings.get($(rssObj));$playPause.html('Pause').addClass(controlSettings.playing_class);},rsStopShow:function(rssObj,e){var controlSettings=$(rssObj).data('rsf_slideshow').settings.controls.playPause;var $playPause=controlSettings.get($(rssObj));$playPause.html('Play').addClass(controlSettings.paused_class);}},controls:{playPause:{generate:function($slideshow){return $('<a href="#" class="rs-play-pause '+
	$slideshow.data('rsf_slideshow').settings.controls.playPause.paused_class+'" data-control-for="'+
	$slideshow.attr('id')+'">Play</a>');},place:function($slideshow,$control){var $container=$slideshow.data('rsf_slideshow').settings.controls.container.get($slideshow);$container.append($control);},get:function($slideshow){return $('.rs-play-pause[data-control-for="'+$slideshow.attr('id')+'"]');},playing_class:'rs-playing',paused_class:'rs-paused',auto:false},previousSlide:{generate:function($slideshow){return $('<a href="#" class="rs-prev" data-control-for="'+
	$slideshow.attr('id')+'">&lt;</a>');},place:function($slideshow,$control){var $container=$slideshow.data('rsf_slideshow').settings.controls.container.get($slideshow);$container.append($control);},get:function($slideshow){return $('.rs-prev[data-control-for="'+$slideshow.attr('id')+'"]');},autostop:true,auto:false},nextSlide:{generate:function($slideshow){return $('<a href="#" class="rs-next" data-control-for="'+
	$slideshow.attr('id')+'">&gt;</a>');},place:function($slideshow,$control){var $container=$slideshow.data('rsf_slideshow').settings.controls.container.get($slideshow);$container.append($control);},get:function($slideshow){return $('.rs-next[data-control-for="'+$slideshow.attr('id')+'"]');},autostop:true,auto:false},index:{generate:function($slideshow){var slide_count=$slideshow.rsfSlideshow('totalSlides'),$indexControl=$('<ul class="rs-index-list clearfix"></ul>');$indexControl.attr('data-control-for',$slideshow.attr('id'));for(var i=0;i<slide_count;i++){var $link=$('<a href="#"></a>');$link.addClass('rs-index');$link.attr('data-control-for',$slideshow.attr('id'));$link.attr('data-slide-key',i);$link.append(i+1);if(i===$slideshow.rsfSlideshow('currentSlideKey')){$link.addClass('rs-active');}
	var $li=$('<li></li>');$li.append($link);$indexControl.append($li);}
	return $indexControl;},place:function($slideshow,$control){var $container=$slideshow.data('rsf_slideshow').settings.controls.container.get($slideshow);$container.append($control);},get:function($slideshow){return $('.rs-index-list[data-control-for="'+$slideshow.attr('id')+'"]');},getEach:function($slideshow){return $('.rs-index[data-control-for="'+$slideshow.attr('id')+'"]');},getSingleByKey:function($slideshow,slide_key){return $('.rs-index[data-control-for="'+
	$slideshow.attr('id')+'"][data-slide-key="'+slide_key+'"]');},getSlideKey:function($controlItem){return $controlItem.attr('data-slide-key');},active_class:'rs-active',autostop:true,auto:false},container:{generate:function($slideshow){return $('<div class="rs-controls clearfix" id="rs-controls-'+$slideshow.attr('id')+'"></div>');},place:function($slideshow,$control){$slideshow.after($control);},get:function($slideshow){return $('#rs-controls-'+$slideshow.attr('id'));}}}},transitions:{none:function($slideshow,$slide){$slide.css('display','block');},fade:function($slideshow,$slide){$slide.fadeIn($slideshow.data('rsf_slideshow').settings.transition,function(){RssPrivateMethods._endTransition($slideshow,$slide);});},slideLeft:function($slideshow,$slide){var left_offset=$slide.outerWidth();RssPrivateMethods._doSlide($slideshow,$slide,left_offset,0);},slideRight:function($slideshow,$slide){var left_offset=0-$slide.outerWidth();RssPrivateMethods._doSlide($slideshow,$slide,left_offset,0);},slideUp:function($slideshow,$slide){var top_offset=$slide.outerHeight();RssPrivateMethods._doSlide($slideshow,$slide,0,top_offset);},slideDown:function($slideshow,$slide){var top_offset=0-$slide.outerHeight();RssPrivateMethods._doSlide($slideshow,$slide,0,top_offset);}}};})(jQuery);
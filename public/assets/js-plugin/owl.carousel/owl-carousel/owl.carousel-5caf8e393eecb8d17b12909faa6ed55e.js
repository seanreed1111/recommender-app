"function"!=typeof Object.create&&(Object.create=function(t){function e(){}return e.prototype=t,new e}),function(t,e,o,i){var n={init:function(e,o){var i=this;i.options=i.userOptions=t.extend({},t.fn.owlCarousel.options,e);var n=t(o);i.$elem=n,i.loadContent()},loadContent:function(){function e(t){if("function"==typeof o.options.jsonSuccess)o.options.jsonSuccess.apply(this,[t]);else{var e="";for(var i in t.owl)e+=t.owl[i].item;o.$elem.html(e)}o.logIn()}var o=this;if("function"==typeof o.options.beforeInit&&o.options.beforeInit.apply(this,[o.$elem]),"string"==typeof o.options.jsonPath){var i=o.options.jsonPath;t.getJSON(i,e)}else o.logIn()},logIn:function(){var e=this;e.baseClass(),e.$elem.css({opacity:0}),e.eventTypes(),e.checkBrowser(),e.wrapperWidth=0,e.currentItem=0,e.$userItems=e.$elem.children(),e.itemsAmount=e.$userItems.length,e.wrapItems(),e.owlItems=e.$elem.find(".owl-item"),e.$owlItems=t(e.owlItems),e.owlWrapper=e.$elem.find(".owl-wrapper"),e.orignalItems=e.options.items,e.playDirection="next",e.prevItem=0,e.checkVisible,e.customEvents(),e.onStartup()},onStartup:function(){var t=this;t.updateItems(),t.calculateAll(),t.buildControls(),t.updateControls(),t.response(),t.moveEvents(),t.stopOnHover(),t.owlStatus(),t.options.transitionStyle!==!1&&t.transitionTypes(t.options.transitionStyle),t.options.autoPlay===!0&&(t.options.autoPlay=5e3),t.play(),t.$elem.find(".owl-wrapper").css("display","block"),t.$elem.is(":visible")?setTimeout(function(){t.$elem.animate({opacity:1},200)},10):t.watchVisibility(),t.onstartup=!1,t.eachMoveUpdate(),"function"==typeof t.options.afterInit&&t.options.afterInit.apply(this,[t.$elem])},eachMoveUpdate:function(){var t=this;t.options.lazyLoad===!0&&t.lazyLoad(),t.options.autoHeight===!0&&t.autoHeight(),t.options.addClassActive===!0&&t.addClassActive(),"function"==typeof t.options.afterAction&&t.options.afterAction.apply(this,[t.$elem])},updateVars:function(){var t=this;t.watchVisibility(),t.updateItems(),t.calculateAll(),t.updatePosition(),t.updateControls(),t.eachMoveUpdate()},reload:function(){var t=this;setTimeout(function(){t.updateVars()},0)},watchVisibility:function(){var t=this;return t.$elem.is(":visible")!==!1?!1:(t.$elem.css({opacity:0}),clearInterval(t.autoPlayInterval),clearInterval(t.checkVisible),t.checkVisible=setInterval(function(){t.$elem.is(":visible")&&(t.reload(),t.$elem.animate({opacity:1},200),clearInterval(t.checkVisible))},500),void 0)},wrapItems:function(){var t=this;t.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>'),t.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">'),t.wrapperOuter=t.$elem.find(".owl-wrapper-outer"),t.$elem.css("display","block")},baseClass:function(){var t=this,e=t.$elem.hasClass(t.options.baseClass),o=t.$elem.hasClass(t.options.theme);e||t.$elem.addClass(t.options.baseClass),o||t.$elem.addClass(t.options.theme)},updateItems:function(){var e=this;if(e.options.responsive===!1)return!1;if(e.options.singleItem===!0)return e.options.items=e.orignalItems=1,e.options.itemsDesktop=!1,e.options.itemsDesktopSmall=!1,e.options.itemsTablet=!1,e.options.itemsTabletSmall=!1,e.options.itemsMobile=!1,!1;var o=t(e.options.responsiveBaseWidth).width();o>(e.options.itemsDesktop[0]||e.orignalItems)&&(e.options.items=e.orignalItems),o<=e.options.itemsDesktop[0]&&e.options.itemsDesktop!==!1&&(e.options.items=e.options.itemsDesktop[1]),o<=e.options.itemsDesktopSmall[0]&&e.options.itemsDesktopSmall!==!1&&(e.options.items=e.options.itemsDesktopSmall[1]),o<=e.options.itemsTablet[0]&&e.options.itemsTablet!==!1&&(e.options.items=e.options.itemsTablet[1]),o<=e.options.itemsTabletSmall[0]&&e.options.itemsTabletSmall!==!1&&(e.options.items=e.options.itemsTabletSmall[1]),o<=e.options.itemsMobile[0]&&e.options.itemsMobile!==!1&&(e.options.items=e.options.itemsMobile[1]),e.options.items>e.itemsAmount&&(e.options.items=e.itemsAmount)},response:function(){var o,i=this;if(i.options.responsive!==!0)return!1;var n=t(e).width();t(e).resize(function(){t(e).width()!==n&&(i.options.autoPlay!==!1&&clearInterval(i.autoPlayInterval),clearTimeout(o),o=setTimeout(function(){n=t(e).width(),i.updateVars()},i.options.responsiveRefreshRate))})},updatePosition:function(){var t=this;t.browser.support3d===!0?t.positionsInArray[t.currentItem]>t.maximumPixels?t.transition3d(t.positionsInArray[t.currentItem]):(t.transition3d(0),t.currentItem=0):t.positionsInArray[t.currentItem]>t.maximumPixels?t.css2slide(t.positionsInArray[t.currentItem]):(t.css2slide(0),t.currentItem=0),t.options.autoPlay!==!1&&t.checkAp()},appendItemsSizes:function(){var e=this,o=0,i=e.itemsAmount-e.options.items;e.owlItems.each(function(n){var s=t(this);s.css({width:e.itemWidth}).data("owl-item",Number(n)),(n%e.options.items===0||n===i)&&(n>i||(o+=1)),s.data("owl-roundPages",o).data("owl-originalStyles",s.attr("style"))})},appendWrapperSizes:function(){var t=this,e=0,e=t.owlItems.length*t.itemWidth;t.owlWrapper.css({width:2*e,left:0}),t.appendItemsSizes()},calculateAll:function(){var t=this;t.calculateWidth(),t.appendWrapperSizes(),t.loops(),t.max()},calculateWidth:function(){var t=this;t.itemWidth=Math.round(t.$elem.width()/t.options.items)},max:function(){var t=this;t.maximumItem=t.itemsAmount-t.options.items;var e=t.itemsAmount*t.itemWidth-t.options.items*t.itemWidth;return e=-1*e,t.maximumPixels=e,e},min:function(){return 0},loops:function(){var t=this;t.positionsInArray=[0];for(var e=0,o=0;o<t.itemsAmount;o++)e+=t.itemWidth,t.positionsInArray.push(-e)},buildControls:function(){var e=this;(e.options.navigation===!0||e.options.pagination===!0)&&(e.owlControls=t('<div class="owl-controls"/>').toggleClass("clickable",!e.browser.isTouch).appendTo(e.$elem)),e.options.pagination===!0&&e.buildPagination(),e.options.navigation===!0&&e.buildButtons()},buildButtons:function(){var e=this,o=t('<div class="owl-buttons"/>');e.owlControls.append(o),e.buttonPrev=t("<div/>",{"class":"owl-prev",html:e.options.navigationText[0]||""}),e.buttonNext=t("<div/>",{"class":"owl-next",html:e.options.navigationText[1]||""}),o.append(e.buttonPrev).append(e.buttonNext),o.on("touchend.owlControls mouseup.owlControls",'div[class^="owl"]',function(o){o.preventDefault(),t(this).hasClass("owl-next")?e.next():e.prev()})},buildPagination:function(){var e=this;e.paginationWrapper=t('<div class="owl-pagination"/>'),e.owlControls.append(e.paginationWrapper),e.paginationWrapper.on("touchend.owlControls mouseup.owlControls",".owl-page",function(o){o.preventDefault(),Number(t(this).data("owl-page"))!==e.currentItem&&e.goTo(Number(t(this).data("owl-page")),!0)})},updatePagination:function(){var e=this;if(e.options.pagination===!1)return!1;e.paginationWrapper.html("");for(var o=0,i=e.itemsAmount-e.itemsAmount%e.options.items,n=0;n<e.itemsAmount;n++)if(n%e.options.items===0){if(o+=1,i===n)var s=e.itemsAmount-e.options.items;var a=t("<div/>",{"class":"owl-page"}),r=t("<span></span>",{text:e.options.paginationNumbers===!0?o:"","class":e.options.paginationNumbers===!0?"owl-numbers":""});a.append(r),a.data("owl-page",i===n?s:n),a.data("owl-roundPages",o),e.paginationWrapper.append(a)}e.checkPagination()},checkPagination:function(){var e=this;return e.options.pagination===!1?!1:(e.paginationWrapper.find(".owl-page").each(function(){t(this).data("owl-roundPages")===t(e.owlItems[e.currentItem]).data("owl-roundPages")&&(e.paginationWrapper.find(".owl-page").removeClass("active"),t(this).addClass("active"))}),void 0)},checkNavigation:function(){var t=this;return t.options.navigation===!1?!1:(t.options.rewindNav===!1&&(0===t.currentItem&&0===t.maximumItem?(t.buttonPrev.addClass("disabled"),t.buttonNext.addClass("disabled")):0===t.currentItem&&0!==t.maximumItem?(t.buttonPrev.addClass("disabled"),t.buttonNext.removeClass("disabled")):t.currentItem===t.maximumItem?(t.buttonPrev.removeClass("disabled"),t.buttonNext.addClass("disabled")):0!==t.currentItem&&t.currentItem!==t.maximumItem&&(t.buttonPrev.removeClass("disabled"),t.buttonNext.removeClass("disabled"))),void 0)},updateControls:function(){var t=this;t.updatePagination(),t.checkNavigation(),t.owlControls&&(t.options.items===t.itemsAmount?t.owlControls.hide():t.owlControls.show())},destroyControls:function(){var t=this;t.owlControls&&t.owlControls.remove()},next:function(t){var e=this;if(e.isTransition)return!1;if(e.storePrevItem=e.currentItem,e.currentItem+=e.options.scrollPerPage===!0?e.options.items:1,e.currentItem>e.maximumItem+(1==e.options.scrollPerPage?e.options.items-1:0)){if(e.options.rewindNav!==!0)return e.currentItem=e.maximumItem,!1;e.currentItem=0,t="rewind"}e.goTo(e.currentItem,t)},prev:function(t){var e=this;if(e.isTransition)return!1;if(e.storePrevItem=e.currentItem,e.options.scrollPerPage===!0&&e.currentItem>0&&e.currentItem<e.options.items?e.currentItem=0:e.currentItem-=e.options.scrollPerPage===!0?e.options.items:1,e.currentItem<0){if(e.options.rewindNav!==!0)return e.currentItem=0,!1;e.currentItem=e.maximumItem,t="rewind"}e.goTo(e.currentItem,t)},goTo:function(t,e,o){var i=this;if(i.isTransition)return!1;if(i.getPrevItem(),"function"==typeof i.options.beforeMove&&i.options.beforeMove.apply(this,[i.$elem]),t>=i.maximumItem?t=i.maximumItem:0>=t&&(t=0),i.currentItem=i.owl.currentItem=t,i.options.transitionStyle!==!1&&"drag"!==o&&1===i.options.items&&i.browser.support3d===!0)return i.swapSpeed(0),i.browser.support3d===!0?i.transition3d(i.positionsInArray[t]):i.css2slide(i.positionsInArray[t],1),i.singleItemTransition(),i.afterGo(),!1;var n=i.positionsInArray[t];i.browser.support3d===!0?(i.isCss3Finish=!1,e===!0?(i.swapSpeed("paginationSpeed"),setTimeout(function(){i.isCss3Finish=!0},i.options.paginationSpeed)):"rewind"===e?(i.swapSpeed(i.options.rewindSpeed),setTimeout(function(){i.isCss3Finish=!0},i.options.rewindSpeed)):(i.swapSpeed("slideSpeed"),setTimeout(function(){i.isCss3Finish=!0},i.options.slideSpeed)),i.transition3d(n)):e===!0?i.css2slide(n,i.options.paginationSpeed):"rewind"===e?i.css2slide(n,i.options.rewindSpeed):i.css2slide(n,i.options.slideSpeed),i.afterGo()},getPrevItem:function(){var t=this;t.prevItem=t.owl.prevItem=t.storePrevItem===i?t.currentItem:t.storePrevItem,t.storePrevItem=i},jumpTo:function(t){var e=this;e.getPrevItem(),"function"==typeof e.options.beforeMove&&e.options.beforeMove.apply(this,[e.$elem]),t>=e.maximumItem?t=e.maximumItem:0>=t&&(t=0),e.swapSpeed(0),e.browser.support3d===!0?e.transition3d(e.positionsInArray[t]):e.css2slide(e.positionsInArray[t],1),e.currentItem=e.owl.currentItem=t,e.afterGo()},afterGo:function(){var t=this;t.checkPagination(),t.checkNavigation(),t.eachMoveUpdate(),"function"==typeof t.options.afterMove&&t.options.afterMove.apply(this,[t.$elem]),t.options.autoPlay!==!1&&t.checkAp()},stop:function(){var t=this;t.apStatus="stop",clearInterval(t.autoPlayInterval)},checkAp:function(){var t=this;"stop"!==t.apStatus&&t.play()},play:function(){var t=this;return t.apStatus="play",t.options.autoPlay===!1?!1:(clearInterval(t.autoPlayInterval),t.autoPlayInterval=setInterval(function(){t.next(!0)},t.options.autoPlay),void 0)},swapSpeed:function(t){var e=this;"slideSpeed"===t?e.owlWrapper.css(e.addCssSpeed(e.options.slideSpeed)):"paginationSpeed"===t?e.owlWrapper.css(e.addCssSpeed(e.options.paginationSpeed)):"string"!=typeof t&&e.owlWrapper.css(e.addCssSpeed(t))},addCssSpeed:function(t){return{"-webkit-transition":"all "+t+"ms ease","-moz-transition":"all "+t+"ms ease","-o-transition":"all "+t+"ms ease",transition:"all "+t+"ms ease"}},removeTransition:function(){return{"-webkit-transition":"","-moz-transition":"","-o-transition":"",transition:""}},doTranslate:function(t){return{"-webkit-transform":"translate3d("+t+"px, 0px, 0px)","-moz-transform":"translate3d("+t+"px, 0px, 0px)","-o-transform":"translate3d("+t+"px, 0px, 0px)","-ms-transform":"translate3d("+t+"px, 0px, 0px)",transform:"translate3d("+t+"px, 0px,0px)"}},transition3d:function(t){var e=this;e.owlWrapper.css(e.doTranslate(t))},css2move:function(t){var e=this;e.owlWrapper.css({left:t})},css2slide:function(t,e){var o=this;o.isCssFinish=!1,o.owlWrapper.stop(!0,!0).animate({left:t},{duration:e||o.options.slideSpeed,complete:function(){o.isCssFinish=!0}})},checkBrowser:function(){var t=this,i="translate3d(0px, 0px, 0px)",n=o.createElement("div");n.style.cssText="  -moz-transform:"+i+"; -ms-transform:"+i+"; -o-transform:"+i+"; -webkit-transform:"+i+"; transform:"+i;var s=/translate3d\(0px, 0px, 0px\)/g,a=n.style.cssText.match(s),r=null!==a&&1===a.length,l="ontouchstart"in e||navigator.msMaxTouchPoints;t.browser={support3d:r,isTouch:l}},moveEvents:function(){var t=this;(t.options.mouseDrag!==!1||t.options.touchDrag!==!1)&&(t.gestures(),t.disabledEvents())},eventTypes:function(){var t=this,e=["s","e","x"];t.ev_types={},t.options.mouseDrag===!0&&t.options.touchDrag===!0?e=["touchstart.owl mousedown.owl","touchmove.owl mousemove.owl","touchend.owl touchcancel.owl mouseup.owl"]:t.options.mouseDrag===!1&&t.options.touchDrag===!0?e=["touchstart.owl","touchmove.owl","touchend.owl touchcancel.owl"]:t.options.mouseDrag===!0&&t.options.touchDrag===!1&&(e=["mousedown.owl","mousemove.owl","mouseup.owl"]),t.ev_types.start=e[0],t.ev_types.move=e[1],t.ev_types.end=e[2]},disabledEvents:function(){var t=this;t.$elem.on("dragstart.owl","img",function(t){t.preventDefault()}),t.$elem.bind("mousedown.disableTextSelect",function(){return!1})},gestures:function(){function n(t){return t.touches?{x:t.touches[0].pageX,y:t.touches[0].pageY}:t.pageX!==i?{x:t.pageX,y:t.pageY}:{x:t.clientX,y:t.clientY}}function s(e){"on"===e?(t(o).on(p.ev_types.move,r),t(o).on(p.ev_types.end,l)):"off"===e&&(t(o).off(p.ev_types.move),t(o).off(p.ev_types.end))}function a(o){var o=o.originalEvent||o||e.event;if(p.isCssFinish===!1)return!1;if(p.isCss3Finish===!1)return!1;p.options.autoPlay!==!1&&clearInterval(p.autoPlayInterval),p.browser.isTouch===!0||p.owlWrapper.hasClass("grabbing")||p.owlWrapper.addClass("grabbing"),p.newPosX=0,p.newRelativeX=0,t(this).css(p.removeTransition());var i=t(this).position();m.relativePos=i.left,m.offsetX=n(o).x-i.left,m.offsetY=n(o).y-i.top,s("on"),m.sliding=!1,m.targetElement=o.target||o.srcElement}function r(i){var i=i.originalEvent||i||e.event;p.newPosX=n(i).x-m.offsetX,p.newPosY=n(i).y-m.offsetY,p.newRelativeX=p.newPosX-m.relativePos,"function"==typeof p.options.startDragging&&m.dragging!==!0&&0!==p.newPosX&&(m.dragging=!0,p.options.startDragging.apply(this)),(p.newRelativeX>8||p.newRelativeX<-8&&p.browser.isTouch===!0)&&(i.preventDefault?i.preventDefault():i.returnValue=!1,m.sliding=!0),(p.newPosY>10||p.newPosY<-10)&&m.sliding===!1&&t(o).off("touchmove.owl");var s=function(){return p.newRelativeX/5},a=function(){return p.maximumPixels+p.newRelativeX/5};p.newPosX=Math.max(Math.min(p.newPosX,s()),a()),p.browser.support3d===!0?p.transition3d(p.newPosX):p.css2move(p.newPosX)}function l(o){var o=o.originalEvent||o||e.event;if(o.target=o.target||o.srcElement,m.dragging=!1,p.browser.isTouch!==!0&&p.owlWrapper.removeClass("grabbing"),0!==p.newPosX){var i=p.getNewPosition();if(p.goTo(i,!1,"drag"),m.targetElement===o.target&&p.browser.isTouch!==!0){t(o.target).on("click.disable",function(e){e.stopImmediatePropagation(),e.stopPropagation(),e.preventDefault(),t(o.target).off("click.disable")});var n=t._data(o.target,"events").click,a=n.pop();n.splice(0,0,a)}}s("off")}var p=this,m={offsetX:0,offsetY:0,baseElWidth:0,relativePos:0,position:null,minSwipe:null,maxSwipe:null,sliding:null,dargging:null,targetElement:null};p.isCssFinish=!0,p.$elem.on(p.ev_types.start,".owl-wrapper",a)},clearEvents:function(){var e=this;e.$elem.off(".owl"),t(o).off(".owl")},getNewPosition:function(){var t,e=this,t=e.improveClosest();return t>e.maximumItem?(e.currentItem=e.maximumItem,t=e.maximumItem):e.newPosX>=0&&(t=0,e.currentItem=0),t},improveClosest:function(){var e=this,o=e.positionsInArray,i=e.newPosX,n=null;return t.each(o,function(t,s){i-e.itemWidth/20>o[t+1]&&i-e.itemWidth/20<s&&"left"===e.moveDirection()?(n=s,e.currentItem=t):i+e.itemWidth/20<s&&i+e.itemWidth/20>o[t+1]&&"right"===e.moveDirection()&&(n=o[t+1],e.currentItem=t+1)}),e.currentItem},moveDirection:function(){var t,e=this;return e.newRelativeX<0?(t="right",e.playDirection="next"):(t="left",e.playDirection="prev"),t},customEvents:function(){var t=this;t.$elem.on("owl.next",function(){t.next()}),t.$elem.on("owl.prev",function(){t.prev()}),t.$elem.on("owl.play",function(e,o){t.options.autoPlay=o,t.play(),t.hoverStatus="play"}),t.$elem.on("owl.stop",function(){t.stop(),t.hoverStatus="stop"}),t.$elem.on("owl.goTo",function(e,o){t.goTo(o)}),t.$elem.on("owl.jumpTo",function(e,o){t.jumpTo(o)})},stopOnHover:function(){var t=this;t.options.stopOnHover===!0&&t.browser.isTouch!==!0&&t.options.autoPlay!==!1&&(t.$elem.on("mouseover",function(){t.stop()}),t.$elem.on("mouseout",function(){"stop"!==t.hoverStatus&&t.play()}))},lazyLoad:function(){var e=this;if(e.options.lazyLoad===!1)return!1;for(var o=0;o<e.itemsAmount;o++){var n,s=t(e.owlItems[o]),a=s.data("owl-item"),r=s.find(".lazyOwl");if(s.data("owl-loaded")===i)r.hide(),s.addClass("loading").data("owl-loaded","checked");else if("loaded"===s.data("owl-loaded"))continue;if(n=e.options.lazyFollow===!0?a>=e.currentItem:!0,n&&a<e.currentItem+e.options.items){s.data("owl-loaded","loaded");var l=r.data("src");l&&(r[0].src=l,r.removeAttr("data-src")),r.fadeIn(200),s.removeClass("loading")}}},autoHeight:function(){function e(){a+=1,s.get(0).complete?o():50>=a?setTimeout(e,200):n.wrapperOuter.css("height","")}function o(){var e=t(n.owlItems[n.currentItem]).height();n.wrapperOuter.css("height",e+"px"),n.wrapperOuter.hasClass("autoHeight")||setTimeout(function(){n.wrapperOuter.addClass("autoHeight")},0)}var n=this,s=t(n.owlItems[n.currentItem]).find("img");if(s.get(0)!==i){var a=0;e()}else o()},addClassActive:function(){var e=this;t(e.owlItems).removeClass("active");for(var o=e.currentItem;o<e.currentItem+e.options.items;o++)t(e.owlItems[o]).addClass("active")},transitionTypes:function(t){var e=this;e.outClass="owl-"+t+"-out",e.inClass="owl-"+t+"-in"},singleItemTransition:function(){function t(t){return{position:"relative",left:t+"px"}}var e=this;e.isTransition=!0;var o=e.outClass,i=e.inClass,n=e.$owlItems.eq(e.currentItem),s=e.$owlItems.eq(e.prevItem),a=Math.abs(e.positionsInArray[e.currentItem])+e.positionsInArray[e.prevItem],r=Math.abs(e.positionsInArray[e.currentItem])+e.itemWidth/2;e.owlWrapper.addClass("owl-origin").css({"-webkit-transform-origin":r+"px","-moz-perspective-origin":r+"px","perspective-origin":r+"px"});var l="webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend";s.css(t(a,10)).addClass(o).on(l,function(){e.endPrev=!0,s.off(l),e.clearTransStyle(s,o)}),n.addClass(i).on(l,function(){e.endCurrent=!0,n.off(l),e.clearTransStyle(n,i)})},clearTransStyle:function(t,e){var o=this;t.attr("style",t.data("owl-originalStyles")).removeClass(e),o.endPrev&&o.endCurrent&&(o.owlWrapper.removeClass("owl-origin"),o.endPrev=!1,o.endCurrent=!1,o.isTransition=!1)},owlStatus:function(){var t=this;t.owl={userOptions:t.userOptions,baseElement:t.$elem,userItems:t.$userItems,owlItems:t.$owlItems,currentItem:t.currentItem,prevItem:t.prevItem,isTouch:t.browser.isTouch,browser:t.browser}}};t.fn.owlCarousel=function(e){return this.each(function(){var o=Object.create(n);o.init(e,this),t.data(this,"owlCarousel",o)})},t.fn.owlCarousel.options={items:5,itemsDesktop:[1199,4],itemsDesktopSmall:[979,3],itemsTablet:[768,2],itemsTabletSmall:!1,itemsMobile:[479,1],singleItem:!1,slideSpeed:200,paginationSpeed:800,rewindSpeed:1e3,autoPlay:!1,stopOnHover:!1,navigation:!1,navigationText:["prev","next"],rewindNav:!0,scrollPerPage:!1,pagination:!0,paginationNumbers:!1,responsive:!0,responsiveRefreshRate:200,responsiveBaseWidth:e,baseClass:"owl-carousel",theme:"owl-theme",lazyLoad:!1,lazyFollow:!0,autoHeight:!1,jsonPath:!1,jsonSuccess:!1,mouseDrag:!0,touchDrag:!0,addClassActive:!1,transitionStyle:!1,beforeInit:!1,afterInit:!1,beforeMove:!1,afterMove:!1,afterAction:!1,startDragging:!1}}(jQuery,window,document);
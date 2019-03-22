//  首页
var $$=require('jquery');

require('../module.js');
require('./index.css');
var _mm             = require('util/mm.js');
var templateBanner  = require('./index.string');
require('util/slider/index.js');//图片轮播
require('page/common/nav-simple/index.js');//头部导航
require('page/common/nav/index.js');//登录，注册，购物车，我的MMall，关于MMall
require('page/common/header/index.js'); //带搜索框的login

// 初始化图片轮播
$(function() {
    // 渲染banner的HTML
    var bannerHtml  = _mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    // 初始化banner
    var $slider     = $('.banner').unslider({
        dots:true
    });
    // 前一张和后一张的事件绑定
    $('.banner-con .banner-arrow').click(function(){
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    });

});


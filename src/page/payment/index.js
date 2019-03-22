// 支付页面
require('./index.css');
require('page/common/nav-simple/index.js');//头部导航
require('page/common/header/index.js'); //带搜索框的login
var nav             = require('page/common/nav/index.js');//登录，注册，购物车，我的MMall，关于MMall
var _mm             = require('util/mm.js');
var _payment        = require('service/payment -service.js');
var templateIndex   = require('./index.string');

//page逻辑部分
var page = {
    data : {
        orderNumber : _mm.getUrlParam('orderNumber')
    },
    init : function(){
        this.onLoad();
    },
    onLoad : function(){
        this.loadPaymentInfo();
    },
    // 
    loadPaymentInfo : function(){
        var _this           = this,
            paymentHtml     = '',
            $pageWrap       = $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>');
        _payment.getPaymentInfo(this.data.orderNumber, function(res){
            // 渲染html
            paymentHtml = _mm.renderHtml(templateIndex, res);
            $pageWrap.html(paymentHtml);
            _this.listenOrderStatus();
        }, function(errMsg){
            $pageWrap.html('<p class="err-tip">' + errMsg + '</p>');
        });
    },
    // 定时监听订单状态
    listenOrderStatus : function(){
        var _this = this;
        this.paymentTimer = window.setInterval(function(){
            _payment.getPaymentStatus(_this.data.orderNumber, function(res){
                if(res == true){
                    window.location.href= './result.html?type=payment&orderNumber=' + _this.data.orderNumber;
                }
            });
        }, 5e3);
    }
};

$(function(){
    page.init();
});
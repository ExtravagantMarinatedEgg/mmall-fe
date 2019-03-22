// 订单详情
require('./index.css');
require('page/common/nav-simple/index.js');//头部导航
require('page/common/header/index.js'); //带搜索框的login
var nav             = require('page/common/nav/index.js');//登录，注册，购物车，我的MMall，关于MMall
var navSide         = require('page/common/nav-side/index.js');//左侧导航
var _mm             = require('util/mm.js');
var _order          = require('service/order-service.js');
var templateIndex   = require('./index.string');

//page逻辑部分
var page = {
    data : {
        orderNumber : _mm.getUrlParam('orderNumber')
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        //初始化左侧菜单
        navSide.init({
            name : 'order-list'
        });
        // 加载detail数据
        this.loadDetail();
    },
    bindEvent : function(){
        var _this = this;
        $(document).on('click','.order-cancel',function(){
            if(window.confirm('确认要取消该订单吗❓')){
                _order.cancelOrder(_this.data.orderNumber,function(res){
                    _mm.successTips('该订单取消成功✅');
                    _this.loadDetail();
                },function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
            
        })
    },
    // 加载订单详细信息
    loadDetail : function(){
       var _this = this,
            orderDetalHtml = '',
            $content    = $('.content');
        $content.html('<div class="loading"></div>');
        _order.getOrderDetail(this.data.orderNumber,function(res){
            _this.dataFilter(res);
            // 渲染html
            orderDetalHtml = _mm.renderHtml(templateIndex,res);
            $content.html(orderDetalHtml);
        },function(errMsg){
            $content.html('<p class=""err-tip> ' + errMsg + '</p>');
        });
    },
    // 数据的适配
    dataFilter : function(data){
        data.needPay            = data.status == 10;
        data.isCancelable       = data.status == 10;
    }
};

$(function(){
    page.init();
});
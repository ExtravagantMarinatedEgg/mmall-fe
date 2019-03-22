// 订单列表
require('./index.css');
require('page/common/nav-simple/index.js');//头部导航
require('page/common/header/index.js'); //带搜索框的login
var nav             = require('page/common/nav/index.js');//登录，注册，购物车，我的MMall，关于MMall
var navSide         = require('page/common/nav-side/index.js');//左侧导航
var _mm             = require('util/mm.js');
var _order          = require('service/order-service.js');
var Pagination      = require('util/pagination/index.js');//分页
var templateIndex   = require('./index.string');

//page逻辑部分
var page = {
    data : {
        listParam : {
            pageNum     : 1,
            pageSize    : 2
        }
    },
    init : function(){
        this.onLoad();
    },
    onLoad : function(){
        this.loadOrderList();
        //初始化左侧菜单
        navSide.init({
            name : 'order-list'
        });
    },
    // 加载订单列表
    loadOrderList : function(){
        var _this           = this,
            orderListHtml   = '',
            $listCon        = $('.order-list-con');
        $listCon.html('<div class="loading"></div>');
        // 请求接口
        _order.getOrderList(this.data.listParam,function(res){
            // 渲染html
            orderListHtml = _mm.renderHtml(templateIndex , res);
            $listCon.html(orderListHtml);
            // 加载分页信息
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            });
        },function(errMsg){
            $listCon.html('<p class="err-tip">加载订单失败，请刷新后重试</p>');
        });
    },
    // 加载分页信息
    loadPagination : function(pageInfo){
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadOrderList();
            }
        }));
    }
};

$(function(){
    page.init();
});
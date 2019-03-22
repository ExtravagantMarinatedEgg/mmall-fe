// 商品详情页
require('./index.css');
require('page/common/nav-simple/index.js');//头部导航
require('page/common/nav/index.js');//登录，注册，购物车，我的MMall，关于MMall
require('page/common/header/index.js'); //带搜索框的login

var _mm             = require('util/mm.js');
var templateIndex   = require('./index.string');
var _product        = require('service/product-service.js');
var _cart           = require('service/cart-service.js');

var page = {
    data : {
        productId   : _mm.getUrlParam('productId') || ''
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 如果没有传productId就跳转到首页
        if(!this.data.productId){
            _mm.goHome();
        }
        this.loadDetail();
    },
    bindEvent : function(){
        var _this = this;
        // 图片预览
        $(document).on('mouseenter','.p-img-item',function(){
            var imageUrl = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src',imageUrl);
        });
        // 数量的处理
        $(document).on('click','.p-count-btn',function(){
            var type        = $(this).hasClass('plus') ? 'plus' : 'minuss', 
                $pCount     = $('.p-count'),
                currCount   = parseInt($pCount.val()),
                minCount    = 1,
                maxcount    = _this.data.detailInfo.stock || 1;
            // 加号的处理
            if(type === 'plus'){
                $pCount.val(currCount < maxcount ? currCount+1 :maxcount);
            }
            // 减号的处理
            if(type === 'minuss'){
                $pCount.val(currCount > minCount ? currCount-1 : minCount);
            }
        });
        // 加入购物车的点击事件
        $(document).on('click','.cart-add',function(){
            //请求加入购物车接口
            _cart.addToCart({
                productId   : _this.data.productId,
                count       : $('.p-count').val()
            },function(res){
                window.location.href = './result.html?type=cart-add';
            },function(errMsg){
                _mm.errorTips(errMsg);
            });
        });
    },
    // 加载商品详情信息
    loadDetail : function(){
        var 
            _this       = this,
            html        = '',
            $pageWrap   = $('.page-wrap');
        // loading
        $pageWrap.html('<div class="loading"></div>');
        // 请求商品详细接口
        _product.getProductDetail(this.data.productId,function(res){
            _this.filter(res);
            // 缓存返回的detail的数据
            _this.data.detailInfo = res;
            // 渲染HTML
            html = _mm.renderHtml(templateIndex,res);
            $pageWrap.html(html);
        },function(errMsg){
            $pageWrap.html('<p class="err_tip">嘤嘤嘤~~此商品太淘气了，找不到了！</p>');
        });
    },
    // 数据匹配
    filter : function(data){
        // 图片处理
        data.subImages = data.subImages.split(','); 
    }
};
$(function(){
    page.init();
})
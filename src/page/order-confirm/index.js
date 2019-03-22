// 订单确认页
require('./index.css');
require('page/common/nav-simple/index.js');//头部导航
require('page/common/header/index.js'); //带搜索框的login
require('page/common/nav/index.js');//登录，注册，购物车，我的MMall，关于MMall
var templateAddress = require('./address-list.string');
var templateProduct = require('./product-list.string');
var _mm             = require('util/mm.js');
var _order          = require('service/order-service.js');
var _address        = require('service/address-service.js');
var addressModal    = require('./address-modal.js');

//page逻辑部分
var page = {
    data : {
        selectedAddressId : null
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadAddressList();
        this.loadProductList();
    },
    bindEvent : function(){
        var _this =this;
        // 地址的选择
        $(document).on('click','.address-item',function(){
            $(this).addClass('active').siblings('.address-item').removeClass('active');
            _this.data.selectedAddressId = $(this).data('id');
        });
        // 订单的提交
        $(document).on('click','.order-submit',function(){
            var shippingId = _this.data.selectedAddressId;
            if(shippingId){
                _order.createOrder({
                    shippingId : shippingId
                },function(res){
                    window.location.href = './payment.html?orderNumber=' + res.orderNo;
                },function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }else{
                _mm.errorTips('请选择地址后再提交');
            }
        });
        // 地址的添加
        $(document).on('click','.address-add',function(){
            addressModal.show({
                isUpdate : false,
                onSuccess : function(){
                    _this.loadAddressList();
                }
            });
        });
         // 地址的编辑
        $(document).on('click','.address-update',function(e){
            e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            _address.getAddress(shippingId,function(res){
                addressModal.show({
                    isUpdate    : true,
                    data        : res,
                    onSuccess   : function(){
                        _this.loadAddressList();
                    }
                });
            },function(errMsg){
                _mm.errorTips(errMsg);
            });
        });
         // 地址的删除
        $(document).on('click', '.address-delete', function(e){
            e.stopPropagation();
            var id = $(this).parents('.address-item').data('id');
            if(window.confirm('确认要删除该地址？')){
                _address.deleteAddress(id, function(res){
                    _this.loadAddressList();
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
        });
    },
    //加载地址列表(弹窗)
    loadAddressList : function(){
        var _this       = this;
        $('.address-con').html('<div class="loading"></div>');
        // 获取地址列表
        _address.getAddressList(function(res){
            _this.addressFilter(res);
            var addressListHtml = _mm.renderHtml(templateAddress, res);
            $('.address-con').html(addressListHtml);
        }, function(errMsg){
            $('.address-con').html('<p class="err-tip">地址加载失败，请刷新后重试</p>');
        })
    },
    // 渲染商品信息
    loadProductList : function(){
        var _this =this;
        $('.product-con').html('<div class="loading"></div>');
        _order.getProductList(function(res){ 
            var productListHtml = _mm.renderHtml(templateProduct,res);
            $('.product-con').html(productListHtml);
            // alert(999);
        },function(errMsg){
            $('.product-con').html('<p class="err-tip">商品信息加载失败，请刷新后重试!</p>');
        });
    },
    // 处理地址列表中选中状态
    addressFilter : function(data){
        if(this.data.selectedAddressId){
            var selectedAddressIdFlag = false;
            for (var i = 0, length = data.list.length; i < length; i++) {
                if(data.list[i].id === this.data.selectedAddressId){
                    data.list[i].isActive = true;
                    selectedAddressIdFlag = true;
                }
            };
            // 如果以前选中的地址不在列表里，将其删除
            if(!selectedAddressIdFlag){
                this.data.selectedAddressId = null;
            }
        }
    }
};

$(function(){
    page.init();
});
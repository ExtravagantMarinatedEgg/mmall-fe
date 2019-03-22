// 购物车模块
var _mm= require('util/mm.js');

var _cart = {
	//获取购物车数量
	getCartCount : function(resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/cart/get_cart_product_count.do'),
			success : resolve,
			error 	: reject
		});
	},
    // 添加到购物车
    addToCart : function(productInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/add.do'),
            data    : productInfo,
            success : resolve,
            error   : reject
        });
    },
    // 加载购物车列表
    getCartList : function(resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('/cart/list.do'),
            success : resolve, 
            error   : reject
        });
    },
    //选中
    selectProduct : function(productId,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/select.do'),
            data    : {
                productId :productId
            },
            success : resolve, 
            error   : reject
        });
    },
    //取消选中
    unSelectProduct : function(productId,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/un_select.do'),
            data    : {
                productId :productId
            },
            success : resolve, 
            error   : reject
        });
    },
    //全部取消选中
    unSelectAllProduct : function(resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/un_select_all.do'),
            success : resolve, 
            error   : reject
        });
    },
    //全部选中 
    selectAllProduct : function(resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/select_all.do'),
            success : resolve, 
            error   : reject
        });
    },
    // 修改购物车商品数量
    updateProductCount  : function(productInfo,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/update.do'),
            data    : productInfo,
            success : resolve, 
            error   : reject
        });
    },
    // 删除
    deleteProduct   : function(productIds,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/delete_product.do'),
            data    : {
                productIds : productIds
            },
            success : resolve, 
            error   : reject
        });
    },
}
module.exports =_cart;
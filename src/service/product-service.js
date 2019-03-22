// 商品模块
var _mm =require('util/mm.js');

var _product = {
    // 获取商品列表
    getProductList : function(listParam,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/product/list.do'),
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },
    // 商品详情
    getProductDetail : function(productId,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/product/detail.do'),
            data    : {
                productId :productId
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _product;
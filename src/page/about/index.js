// 关于MMall
require('./index.css');
require('page/common/nav-simple/index.js');//头部导航
require('page/common/nav/index.js');//登录，注册，购物车，我的MMall，关于MMall
require('page/common/header/index.js'); //带搜索框的login
var navSide = require('page/common/nav-side/index.js');//左侧导航
var _mm = require('util/mm.js');


//page逻辑部分
var page = {
    init : function(){
        this.onLoad();
        this.bin();
    },
    onLoad : function(){
        //初始化左侧菜单
        navSide.init({
            name : 'about'
        });
    },
    bin : function(){
        $(document).on('click','.link.cs-a',function(){
            alert('买家账号:wvkaav4146@sandbox.com\n密码:111111\n支付密码:111111');
        });
        $(document).on('click','.link.cs-b',function(){
            alert('商家账号:qplxob7096@sandbox.com\n密码:111111\n支付密码:111111');
        });
    }
};

$(function(){
    page.init();
});
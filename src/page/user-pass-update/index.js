//  修改密码
require('./index.css');
require('page/common/nav-simple/index.js');//头部导航
require('page/common/nav/index.js');//登录，注册，购物车，我的MMall，关于MMall
require('page/common/header/index.js'); //带搜索框的login
var navSide = require('page/common/nav-side/index.js');//左侧导航
var _mm = require('util/mm.js');
var _user =require('service/user-service.js');

//page逻辑部分
var page = {
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		//初始化左侧菜单
		navSide.init({
			name : 'user-pass-update'
		});
	},
	//提交
	bindEvent : function(){
		var _this = this; 
		// 点击提交按钮的动作
		$(document).on('click','.btn-submit',function(){
			var userInfo = {
				password 		: $.trim($('#password').val()),
				passwordNew 	: $.trim($('#password-new').val()),
				passwordConfirm : $.trim($('#password-confirm').val())
			},
			//验证
			validateResult = _this.validateForm(userInfo);
			if(validateResult.status){
				//更改用户信息
				_user.updatePassword({
					passwordOld : userInfo.password,
					passwordNew :userInfo.passwordNew
				},function(res,msg){
					_mm.successTips(msg);
				},function(errMsg){
					_mm.errorTips(errMsg);
				});
			}
			else{
				_mm.errorTips(validateResult.msg);
			}
		});
	},
	// 验证字段信息
	validateForm : function(formData){
		var result = {
			status : false,
			msg	   : ''
		};
		//验证密码是否为空
		if(!_mm.validate(formData.password,'require')){
			result.msg = '原密码不能为空';
			return result;
		}
		//验证新密码
		if(!formData.passwordNew || formData.passwordNew.length < 6){
			result.msg = '新密码长度不能少于6位';
			return result;
		}
		//验证两次输入的密码是否一致
		if(formData.passwordNew !== formData.passwordConfirm){
			result.msg = '两次输入的密码不一致';
			return result;
		}
		// 通过验证，返回正确的提示
		result.status = true;
		result.msg    = '验证通过';
		return result;
	}
};

$(function(){
	page.init();
});
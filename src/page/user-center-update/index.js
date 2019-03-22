// 修改个人信息

require('./index.css');
require('page/common/nav-simple/index.js');//头部导航
require('page/common/nav/index.js');//登录，注册，购物车，我的MMall，关于MMall
require('page/common/header/index.js'); //带搜索框的login
var navSide = require('page/common/nav-side/index.js');//左侧导航
var _mm = require('util/mm.js');
var _user =require('service/user-service.js');
var templateIndex = require('./index.string');

//page逻辑部分
var page = {
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		//初始化左侧菜单
		navSide.init({
			name : 'user-center'
		});
		// 加载用户信息
		this.loadUserInfo();
	},
	//加载用户信息
	loadUserInfo : function(){
		var userHtml = '';
		_user.getUserInfo(function(res){
			userHtml = _mm.renderHtml(templateIndex,res);
			 $('.panel-body').html(userHtml);
		},function(errMsg){
			_mm.errorTips(errMsg);
		});
	},
	//提交
	bindEvent : function(){
		var _this = this; 
		// 点击提交按钮的动作
		$(document).on('click','.btn-submit',function(){
			var userInfo = {
				phone 		: $.trim($('#phone').val()),
				email 		: $.trim($('#email').val()),
				question 	: $.trim($('#question').val()),
				answer 		: $.trim($('#answer').val())
			},
			//验证
			validateResult = _this.validateForm(userInfo);
			if(validateResult.status){
				//更改用户信息
				_user.updateUserInfo(userInfo,function(res){
					_mm.successTips(res.msg);
					window.location.href='./user-center.html';
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
		//验证手机号码
		if(!_mm.validate(formData.phone,'phone')){
			result.msg = '请输入正确的手机号码';
			return result;
		}
		//验证邮箱
		if(!_mm.validate(formData.email,'email')){
			result.msg = '请输入正确的邮箱';
			return result;
		}
		//验证密码提示问题不能为空
		if(!_mm.validate(formData.question, 'require')){
			result.msg = '密码提示问题不能为空';
			return result;
		}
		//密码提示问题答案不能为空
		if(!_mm.validate(formData.answer, 'require')){
			result.msg = '密码提示问题答案不能为空';
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
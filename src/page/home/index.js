// 新首页
var $$=require('jquery');
var $$=require('jquery');

require('./index.css');
var _mm = require('util/mm.js');
require('page/common/nav-simple/index.js');//头部导航
require('page/common/nav/index.js');//登录，注册，购物车，我的MMall，关于MMall
require('page/common/header/index.js'); //带搜索框的login
// 渲染用

function byId(id) {
  return typeof(id) === "string" ? document.getElementById(id) : id
}

  var index = 0,
  timer = null,
  pics = byId("banner").getElementsByTagName("div"),
  size = pics.length,
  dots = byId("dots").getElementsByTagName("span"),
  prev = byId("prev"),
  next = byId("next"),
  menuItems = byId("menu-content").getElementsByTagName("div"),
  subMenu = byId("sub-menu"),
  subItems = subMenu.getElementsByClassName("inner-box");

function startAutoPlay() {
  timer = setInterval(function() {
    index++
    if (index >= size) {
      index = 0
    }
    changeImg()
  }, 3000)
}

function changeImg() {
  for (var i = 0; i < size; i++) {
    pics[i].style.display = "none"
    dots[i].className = ""
  }
  pics[index].style.display = "block"
  dots[index].className = "active"
}

function slideImg() {
  // 轮播图之定时器设置
  var main = byId("main"),
    banner = byId("banner"),
    menuContent = byId("menu-content");
  main.onmouseover = function() {
    if (timer) clearInterval(timer)
  }
  main.onmouseout = function() {
    startAutoPlay()
  }
  main.onmouseout()

  // 点击圆点切换图片.遍历所有点击，且绑定点击事件
  for (var i = 0; i < size; i++) {
    // 给所有span添加一个id的属性，值为i,作为当前span的索引
    dots[i].id = i
    dots[i].onclick = function() {
      index = this.id
      // 调用changeImg,实现切换图片
      changeImg()
    }
  }

  // 下一张
  next.onclick = function() {
    index++
    if (index >= size) {
      index = 0
    }
    changeImg()
  }

  // 上一张
  prev.onclick = function() {
    index--
    if (index < 0) {
      index = size - 1
    }
    changeImg()
  }

  // 主菜单添加自定义属性
  for (var i = 0; i < menuItems.length; i++) {
    menuItems[i].setAttribute("data-index", i)
    menuItems[i].onmouseover = function() {
      var idx = this.getAttribute("data-index")
      // 遍历每一个子菜单，将每一个都隐藏
      for (var j = 0; j < subItems.length; j++) {
        subItems[j].style.display = "none"
        menuItems[j].style.background = "none"
      }
      // 不再加hide类
      subMenu.className = "sub-menu"
      subItems[idx].style.display = "block"
      menuItems[idx].style.background = "rgba(0,0,0,0.1)"
    }
  }

  // 二级菜单显示和隐藏
  subMenu.onmouseover = function() {
    this.className = "sub-menu"
  }
  subMenu.onmouseout = function() {
    this.className = "sub-menu hide"
  }

  banner.onmouseout = function() {
    subMenu.className = "sub-menu hide"
  }

  menuContent.onmouseout = function() {
    subMenu.className = "sub-menu hide"
  }
}

slideImg()
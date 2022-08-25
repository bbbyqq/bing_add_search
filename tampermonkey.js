// ==UserScript==
// @name         必应新增常见搜索
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  在必应中新增了常见搜索
// @author       bbbyqq
// @match        *://www.cn.bing.com/*
// @match        *://cn.bing.com/*
// @match        *://www.bing.com/*
// @match        *://bing.com/*
// @grant        GM_addStyle
// @license      bbbyqq
// @require      https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js
// ==/UserScript==

(function () {
  'use strict'

  let div = `
    <div id="btn_list">
        <button class="add_btn" id="baidu_btn">百度</button>
        <button class="add_btn" id="segmentfault_btn">segmentfault</button>
        <button class="add_btn" id="google_btn">谷歌</button>
        <button class="add_btn" id="google_translate_btn">谷歌翻译</button>
        <button class="add_btn" id="zhihu_btn">知乎</button>
        <button class="add_btn" id="toutiao_btn">头条</button>
        <button class="add_btn" id="douban_btn">豆瓣</button>
        <button class="add_btn" id="douyin_btn">抖音</button>
    </div>
    `

  if ($('.b_scopebar').length) { // 搜索页
    $('#est_switch').after(div)
    $('#btn_list').attr("class", "btn_search")
    readyClick()
  } else { // 初始页
    setTimeout(() => {
      $('#est_switch').before(div)
      $('#btn_list').attr("class", "btn_home")
      readyClick('href')
    }, 500)
  }

  function readyClick(val) {
    const inputVal = $('#sb_form_q')

    $("#baidu_btn").click(function () {
      const url = `https://www.baidu.com/s?wd=${inputVal.val()}`
      val ? location.href = url : window.open(url, '_blank')
    })

    $("#segmentfault_btn").click(function () {
      const url = `https://cn.bing.com/search?q=site:segmentfault.com%20${inputVal.val()}`
      val ? location.href = url : window.open(url, '_blank')
    })

    $('#google_btn').click(function () {
      const url = `https://www.google.com/search?q=${inputVal.val()}`
      val ? location.href = url : window.open(url, '_blank')
    })

    $('#google_translate_btn').click(function () {
      const url = `https://translate.google.cn/?sl=auto&tl=en&text=${inputVal.val()}&op=translate`
      val ? location.href = url : window.open(url, '_blank')
    })

    $("#zhihu_btn").click(function () {
      const url = `https://www.zhihu.com/search?type=content&q=${inputVal.val()}`
      val ? location.href = url : window.open(url, '_blank')
    })

    $("#toutiao_btn").click(function () {
      const url = `https://so.toutiao.com/search?dvpf=pc&source=input&keyword=${inputVal.val()}`
      val ? location.href = url : window.open(url, '_blank')
    })

    $("#douban_btn").click(function () {
      const url = `https://www.douban.com/search?source=suggest&q=${inputVal.val()}`
      val ? location.href = url : window.open(url, '_blank')
    })

    $("#douyin_btn").click(function () {
      const url = `https://www.douyin.com/search/${inputVal.val()}`
      val ? location.href = url : window.open(url, '_blank')
    })
  }

  const css = `
  .btn_search {
    margin: 0 0 5px 160px;
  }
  
  .btn_home {
    margin-bottom: 5px;
  }
  
  .add_btn {
    color: #fff;
    background-color: #1890ff;
    border-color: #1890ff;
    text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
    line-height: 100%;
    position: relative;
    display: inline-block;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    background-image: none;
    box-shadow: 0 2px 0 rgb(0 0 0 / 2%);
    cursor: pointer;
    transition: all .3s cubic-bezier(.645,.045,.355,1);
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    touch-action: manipulation;
    height: 100%;
    padding: 5px 20px;
    font-size: 16px;
    border-radius: 30px;
    border: none;
    margin-right: 5px;
  }
  
  .add_btn:hover {
    color: #fff;
    background-color: #40a9ff;
  }`
  GM_addStyle(css)

})()

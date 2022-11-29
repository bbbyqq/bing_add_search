// ==UserScript==
// @name         必应新增常见搜索
// @namespace    http://tampermonkey.net/
// @version      1.6
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

  const btnList = [
    {
      id: 'baidu_btn',
      text: '百度',
      url: 'https://www.baidu.com/s?wd=',
    },
    {
      id: 'segmentfault_btn',
      text: 'segmentfault',
      url: 'https://cn.bing.com/search?q=site:segmentfault.com%20',
    },
    {
      id: 'google_btn',
      text: '谷歌',
      url: 'https://www.google.com/search?q=',
    },
    {
      id: 'zhihu_btn',
      text: '知乎',
      url: 'https://www.zhihu.com/search?type=content&q=',
    },
    {
      id: 'toutiao_btn',
      text: '头条',
      url: 'https://so.toutiao.com/search?dvpf=pc&source=input&keyword=',
    },
    {
      id: 'douban_btn',
      text: '豆瓣',
      url: 'https://www.douban.com/search?source=suggest&q=',
    },
    {
      id: 'douyin_btn',
      text: '抖音',
      url: 'https://www.douyin.com/search/',
    },
    {
      id: 'bilibili_btn',
      text: 'B站',
      url: 'https://search.bilibili.com/all?keyword=',
    },
    {
      id: 'youtube_btn',
      text: 'YouTube',
      url: 'https://www.youtube.com/results?search_query=',
    }
  ]

  let div = `<div id="btn_list"></div>`

  if ($('.b_scopebar').length) { // 搜索页
    $('#est_switch').append(div)
    btnList.forEach(item => {
      $('#btn_list').append(`
        <button class="add_btn" id="${item.id}">${item.text}</button>
      `)
    })
    $('#btn_list').attr("class", "btn_search")
    readyClick()
    $('#b_footer').css("display", "none")
  } else { // 初始页
    setTimeout(() => {
      $('#est_switch').append(div)
      btnList.forEach(item => {
        $('#btn_list').append(`
          <button class="add_btn" id="${item.id}">${item.text}</button>
       `)
      })
      $('#btn_list').attr("class", "btn_home")
      readyClick('href')
      $('#footer').css("display", "none")
      $('.tray_cont').css("display", "none")
      $('#scroll_cont').css("display", "none")
    }, 500)
  }

  function readyClick(val) {
    const inputVal = $('#sb_form_q')

    btnList.forEach(item => {
      $(`#${item.id}`).click(function () {
        const url = `${item.url + inputVal.val()}`
        val ? location.href = url : window.open(url, '_blank')
      })
    })
  }

  const css = `
  .btn_search {
    margin: 0 0 5px 145px;
    display: flex;
    position: absolute;
    top: 0;
  }
  
  .btn_home {
    position: absolute;
    top: 8px;
    margin-left: 160px;
    display: flex;
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
    padding: 5px 15px;
    font-size: 16px;
    border-radius: 30px;
    border: none;
    margin-right: 3px;
  }
  
  .add_btn:hover {
    color: #fff;
    background-color: #40a9ff;
  }`
  GM_addStyle(css)
})()

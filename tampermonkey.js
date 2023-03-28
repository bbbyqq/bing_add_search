// ==UserScript==
// @name         必应新增常见搜索
// @namespace    http://tampermonkey.net/
// @version      2.1
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

  let btnList = []

  let localStorageBtnList = localStorage.getItem('btnList') ? JSON.parse(localStorage.getItem('btnList')) : ''

  if (!localStorageBtnList) {  // localStorage没有btnList，则使用上面写死的btnList
    localStorage.setItem('btnList', JSON.stringify(btnList))
    localStorageBtnList = JSON.parse(localStorage.getItem('btnList'))
  } else {
    btnList = localStorageBtnList
  }

  let div = `
    <div id="btn_list"></div>`

  if ($('.b_scopebar').length) { // 搜索页
    $('#est_switch').append(div)
    localStorageBtnList.forEach(item => {
      $('#btn_list').append(`
        <button class="add_btn" id="${item.id}">${item.text}</button>
      `)
    })
    $('#btn_list').append(`
      <button class="add_btn" id="more_btn">+</button>
    `)
    $('#btn_list').attr("class", "btn_search")
    readyClick()
    handleMoreClick()
    $('#b_footer').css("display", "none")
  } else { // 初始页
    setTimeout(() => {
      $('#est_switch').append(div)
      localStorageBtnList.forEach(item => {
        $('#btn_list').append(`
          <button class="add_btn" id="${item.id}">${item.text}</button>
       `)
      })
      $('#btn_list').append(`
        <button class="add_btn" id="more_btn">+</button>
      `)
      $('#btn_list').attr("class", "btn_home")
      readyClick('href')
      handleMoreClick()
      $('#footer').css("display", "none")
      $('.tray_cont').css("display", "none")
      $('#scroll_cont').css("display", "none")
      $('#id_rh').css("display", "none")
      $('#id_qrcode').css("display", "none")
      $('#id_qrcode_popup_positioner').css("display", "none")
      $('html').css("overflowY", "hidden")
    }, 500)
  }

  // 点击按钮事件
  function readyClick(val) {
    let inputVal = $('#sb_form_q')
    localStorageBtnList.forEach(item => {
      $(`#${item.id}`).unbind("click").bind("click", function () {
        let url = `${item.url + inputVal.val()}`
        val ? location.href = url : window.open(url, '_blank')
      })
    })
  }

  // 点击更多，跳出弹窗
  let modal = `
  <div class="modal-mask">
    <div class="popIn">
      <div class="modal">
        <div class="modal-header">
          <div class="modal-header-title">更多设置</div>
          <div class="modal-close"><svg t="1673599630255" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2689" width="20" height="20"><path d="M544.448 499.2l284.576-284.576a32 32 0 0 0-45.248-45.248L499.2 453.952 214.624 169.376a32 32 0 0 0-45.248 45.248l284.576 284.576-284.576 284.576a32 32 0 0 0 45.248 45.248l284.576-284.576 284.576 284.576a31.904 31.904 0 0 0 45.248 0 32 32 0 0 0 0-45.248L544.448 499.2z" fill="#000000" p-id="2690"></path></svg></div>
        </div>
        <div class="modal-body">
          <div style="height: 85%;padding: 24px">
            <div id="new_btn_list"></div>
            <div style="margin-top: 40px;">
              <div style="margin-bottom: 20px;display: flex;align-items: center;">
                <span style="white-space: nowrap;">名称：</span>
                <input id="modal_text" type="text" style="outline-style: none ;border: 1px solid #ccc; border-radius: 3px;padding: 6px;width: 100%;font-size: 14px;box-sizing: border-box">
              </div>
              <div style="margin-bottom: 20px;display: flex;align-items: center;">
                <span style="white-space: nowrap;">URL：</span>
                <a href="https://picabstract-preview-ftn.weiyun.com/ftn_pic_abs_v3/4eb74635f55a56544a817b2bdf361cb7573cbc3155c48c5acc3d8d1b2a5a3896c8e691f588b7265ab9de757a543eca1e?pictype=scale&from=30013&version=3.3.3.3&fname=Snipaste_2023-03-27_17-52-10.png&size=750" target="_blank" style="display: flex;">
                  <svg t="1679909899172" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3888" width="20" height="20"><path d="M512 97.52381c228.912762 0 414.47619 185.563429 414.47619 414.47619s-185.563429 414.47619-414.47619 414.47619S97.52381 740.912762 97.52381 512 283.087238 97.52381 512 97.52381z m0 73.142857C323.486476 170.666667 170.666667 323.486476 170.666667 512s152.81981 341.333333 341.333333 341.333333 341.333333-152.81981 341.333333-341.333333S700.513524 170.666667 512 170.666667z m36.571429 268.190476v292.571428h-73.142858V438.857143h73.142858z m0-121.904762v73.142857h-73.142858v-73.142857h73.142858z" p-id="3889" fill="#333333"></path></svg>
                </a>
                <input id="modal_url" type="text" style="margin-left: 5px;outline-style: none ;border: 1px solid #ccc; border-radius: 3px;padding: 6px;width: 100%;font-size: 14px;box-sizing: border-box">
              </div>
              <div style="width: 100%;text-align: right;">
                <button id="modal_delete_btn" class="button" style="display: none">删除</button>
                <button id="modal_edit_btn" class="button button-primary" style="display: none">修改</button>
                <button id="modal_add_btn" class="button button-primary">新增</button>
              </div>
          </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="modal-close button">取消</button>  
          <button class="modal-confirm button button-primary">确定</button>
        </div>
      </div>
    </div>
  </div>`

  // 点击更多按钮
  function handleMoreClick() {
    $("#more_btn").unbind("click").bind("click", function () {
      // 弹出弹窗
      $('body').append(modal)
      localStorageBtnList.forEach(item => {
        $('#new_btn_list').append(`
          <button class="add_btn ${item.id}" id="${item.id}">${item.text}</button>
        `)
        handleClickBtn(item)
      })
      handleClose()
      handleModalAdd()
      handleConfirm()
      return
    })
  }

  // 点击弹窗按钮
  function handleClickBtn(item) {
    $(`.${item.id}`).unbind("click").bind("click", function () {
      // 把按钮信息赋值到输入框中
      $('#modal_text').val(item.text)
      $('#modal_url').val(item.url)
      // 隐藏新增按钮，显示删除，修改按钮
      $('#modal_add_btn').css('display', 'none')
      $('#modal_delete_btn').css('display', 'inline')
      $('#modal_edit_btn').css('display', 'inline')
      handleDelete(item)
      handleEdit(item)
    })
  }

  // 弹窗删除按钮
  function handleDelete(item) {
    $("#modal_delete_btn").unbind("click").bind("click", function () {
      // 清空输入框内容
      $('#modal_text').val("")
      $('#modal_url').val("")
      // 删除数组
      btnList = btnList.filter(iteml => {
        return iteml.id !== item.id
      })
      // 删除元素
      $(`.${item.id}`).remove()
      // 显示新增按钮，隐藏删除，修改按钮
      $('#modal_add_btn').css('display', 'inline')
      $('#modal_delete_btn').css('display', 'none')
      $('#modal_edit_btn').css('display', 'none')
    })
  }

  // 弹窗修改按钮
  function handleEdit(item) {
    $("#modal_edit_btn").unbind("click").bind("click", function () {
      btnList.forEach(iteml => {
        if (iteml.id === item.id) {
          iteml.text = $('#modal_text').val()
          iteml.url = $('#modal_url').val()
          $(`.${item.id}`).text($('#modal_text').val())
        }
      })
      // 清空输入框内容
      $('#modal_text').val("")
      $('#modal_url').val("")
      // 显示新增按钮，隐藏删除，修改按钮
      $('#modal_add_btn').css('display', 'inline')
      $('#modal_delete_btn').css('display', 'none')
      $('#modal_edit_btn').css('display', 'none')
    })
  }

  // 关闭弹窗
  function handleClose() {
    $(`.modal-close`).unbind("click").bind("click", function () {
      $('.modal-mask')[0].remove()
    })
  }

  // 确定弹窗
  function handleConfirm() {
    $(`.modal-confirm`).unbind("click").bind("click", function () {
      // 储存到localStorage
      localStorage.setItem('btnList', JSON.stringify(btnList))
      // 刷新页面
      location.reload()
    })
  }

  // 定义uuid
  function uuid() {
    let temp_url = URL.createObjectURL(new Blob())
    let uuid = temp_url.toString()
    URL.revokeObjectURL(temp_url)
    return uuid.substr(uuid.lastIndexOf("/") + 1)
  }

  // 新增
  function handleModalAdd() {
    $(`#modal_add_btn`).unbind("click").bind("click", function () {
      let obj = {
        id: uuid(),
        text: $('#modal_text').val(),
        url: $('#modal_url').val()
      }
      btnList.push(obj)
      // 弹窗新增元素
      $('#new_btn_list').append(`
        <button class="add_btn ${obj.id}" id="${obj.id}">${obj.text}</button>
      `)
      // 清空输入框内容
      $('#modal_text').val("")
      $('#modal_url').val("")
      handleClickBtn(obj)
    })
  }

  let css = `
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
    height: 25px;
    padding: 5px 15px;
    font-size: 16px;
    border-radius: 30px;
    border: none;
    margin: 3px 3px 0 0;
  }
  
  .add_btn:hover {
    color: #fff;
    background-color: #40a9ff;
  }
  
  .modal-mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 90;
    height: 100%;
    background-color: rgba(0,0,0,.45);
  }  

  .popIn {
    position: absolute;
    top: 15%;
    left: 50%;
    animation: fadeleftIn .3s;
    animation-name: fadelogIn;
    animation-iteration-count: 1;
  }
  
  @keyframes fadelogIn {
      0% {
        opacity: 0;
        transform: translateX(100%);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
  }
  
  .modal {
    width: 800px;
    height: 400px;
    background: #ffffff;
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99;
    border: 0;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .modal-header {
    height: 10%;
    color: rgba(0,0,0,.65);
    background: #fff;
    border-bottom: 1px solid #e8e8e8;
    border-radius: 4px 4px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
  }
  
  .modal-header-title {
    color: rgba(0,0,0,.85);
    font-weight: 500;
    font-size: 16px;
  }
  
  .modal-close {
    cursor:pointer;
  }
  
  .modal-body {
    height: 80%;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;
  }
  
  .modal-footer {
    height: 10%;
    background: transparent;
    border-top: 1px solid #e8e8e8;
    border-radius: 0 0 4px 4px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    justify-content: end;
  }
  
  .button {
    margin-right: 10px;
    display: inline-block;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    background-image: none;
    cursor: pointer;
    transition: all .3s cubic-bezier(.645,.045,.355,1);
    user-select: none;
    touch-action: manipulation;
    height: 25px;
    padding: 0 15px;
    font-size: 14px;
    border-radius: 4px;
    color: rgba(0,0,0,0.65);
    background-color: #fff;
    border: 1px solid #d9d9d9;
  }
  
  .button:hover {
    color: #40a9ff;
    border-color: #40a9ff;
  }
  
  .button-primary {
    color: #fff;
    background-color: #1890ff;
    border: 1px solid #1890ff;
  }
  
  .button-primary:hover {
    color: #fff;
    background-color: #40a9ff;
    border-color: #40a9ff;
  }`
  GM_addStyle(css)
})()

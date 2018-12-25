// pages/index/index.js
const user = require('../../services/user.js');
const util = require('../../utils/util.js')
const api = require('../../config/api.js')
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: api.ImgUrl,
    serverList: [],
    severIndex: 0,
    show: false
  },
  bindServeChange (e) {
    this.setData({
      severIndex: e.detail.value
    })
  },
  goOrderInfo () {
    let serviceCode = this.data.serverList[this.data.severIndex].serviceCode
    if (serviceCode){
      wx.navigateTo({
        url: '/pages/orederInfo/orederInfo?serviceCode=' + serviceCode,
      })
    }else{
      wx.showToast({
        title: '请选择服务项目！',
        icon: 'none',
        duration: 2000
      })
    }
  },
  getData () {
    wx.showLoading({ title: '加载中', mask: true })
    util.request(api.ServiceList, {}, 'get').then(res => {
      wx.hideLoading()
      if (res.ret_code == 0) {
        this.setData({
          serverList: res.data.list,
          show: true
        })
      }
    }).catch(err=>{
      console.log(err)
      wx.hideLoading()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    user.checkLogin().then(res => {
      console.log('res++++++++++++++', res)
      if (res) {
        this.getData()
      } else {
        user.loginByWeixin().then(data => {
          console.log('data++++++++++', data)
          this.getData()
        }).catch(err => {
          wx.showLoading({ title: err, mask: true })
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.getData(() => {
      util.refresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function () {

  // },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '眉吧服务预约',
      imageUrl: ''
    }
  }
})
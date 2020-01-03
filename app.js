//app.js
App({
  onLaunch: function () {
    // 111展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs ', logs)
    var that = this
    // 登录
    wx.login({
      success: res => {
        console.log(res)
        console.log("执行111")
        wx.request({
          url: that.globalData.url + '/login/getOpenid',
          data: {
            code: res.code
          },
          success(res) {
            console.log("执行successssss")
            console.log(res.data.data.id)
            var openid = res.data.data.openId
            
            var id = res.data.data.id;
            that.globalData.user_id = id
            wx.getSetting({
              success: res => {
                if (res.authSetting['scope.userInfo']) {
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                  wx.getUserInfo({
                    success: res => {
                      //保存信息到数据库中
                      // 可以将 res 发送给后台解码出 unionId
                      console.log(res.userInfo);
                      that.globalData.userInfo = res.userInfo
                      if (id == null){
                        wx.request({
                          url: that.globalData.url + '/login/saveUser',
                          method: 'post',
                          data: {
                            openId: openid,
                            nickName: res.userInfo.nickName,
                            headUrl: res.userInfo.avatarUrl,
                            sex: res.userInfo.gender,
                            city: res.userInfo.city,
                            country: res.userInfo.country,
                            province: res.userInfo.province,
                          },
                          header: {
                            'content-type': 'application/x-www-form-urlencoded'
                          },
                          success(res) {

                          },
                          fail(res) {
                          }
                        })
                      }
                      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                      // 所以此处加入 callback 以防止这种情况
                      if (that.userInfoReadyCallback) {
                        that.userInfoReadyCallback(res)
                      }
                    }
                  })
                }
              }
            })
          }
        })
      }
    })
    // 获取用户信息
    
  },
  globalData: {
    userInfo: null,
    user_id: null,
    //url:'http://localhost:8080'
    //url:'https://huangchaofei.xyz/wechartminiprogram'
    url:'http://106.52.245.135/wechartminiprogram'
  }
})
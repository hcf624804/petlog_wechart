// pages/sharepet/sharepet.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    max:140,
    content: '',
    files: [],
    urlArr: [],
    id:null,
    images:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '分享与他的点点滴滴',
    })
    //在页面加载时，先创建一条空的动态
    this.createEmptyContent();
    this.setData({
      selectFile: this.selectFile.bind(this),
      uplaodFile: this.uplaodFile.bind(this)
    })
  },
  //创建一条空的动态
  createEmptyContent: function(){
    var that = this
    console.log(app.globalData.url + '/content/createEmptyContent')
    wx.request({
      url: app.globalData.url + '/content/createEmptyContent',
      method: 'post',
      data: {
        "userId":app.globalData.user_id
      },
      header: {
        "Content-Type": "application/json"
      },
      success(res) {
        console.log("创建动态成功")
        that.setData({
          id:res.data.data.id
        })
      },
      fail(res) {
      }
    })
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
        console.log("需要上传的文件名" + res.tempFilePaths[0])
        

      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  selectFile(files) {
    //console.log('files', files)
    // 返回false可以阻止某次文件上传
  },
  uplaodFile(files) {
    var that = this
    console.log('upload files', files)
    // 文件上传的函数，返回一个promise
    return new Promise((resolve, reject) => {
      var tempFilePaths = files.tempFilePaths;
      //上传返回值
      var app = getApp();
      var that = this;
      that.setData({
        urlArr: [], //这用来存放上传多张时的路径数组
      });
      var object = {};
      for (var i = 0; i < tempFilePaths.length; i++) {
        console.log("第" + i + "次上传...")
        const upload_task = wx.uploadFile({
          // 模拟https
          url: app.globalData.url + "/content/upload", //需要用HTTPS，同时在微信公众平台后台添加服务器地址  
          filePath: files.tempFilePaths[i], //上传的文件本地地址    
          name: 'file',
          formData: {"id":that.data.id},
          header: {
            "Content-Type": "multipart/form-data"
          },
          //附近数据，这里为路径     
          success: function(res) {
            var images = that.data.images;
            var data = res;
            if(data.statusCode == 200){
              var data = JSON.parse(data.data)
              var url = app.globalData.url+"/content/image/"+data.imageid
              that.setData({
                urlArr: that.data.urlArr.concat(url), //拼接多个路径到数组中
              });
              object['urls'] = that.data.urlArr;
              that.setData({
                images: images + data.url + ";", //images用来存放路径字符串，保存到数据库中的是这个，用“;”分割，但是返回的路径没有“;”，就自己拼上了
              });
              console.log("urlArr:" + that.data.urlArr.length + ";;" + (tempFilePaths.length))
              console.log(that.data.images);
              if (that.data.urlArr.length == tempFilePaths.length) {
                resolve(object)  //这就是判断是不是最后一张已经上传了，用来返回，
              }
            } else {
              reject(res)
            }
          },
          fail: function(err) {
            console.log(err)
          }
        })
      }
    })
  },
  uploadError(e) {
    //console.log('upload error', e.detail)
  },
  uploadSuccess(e) {
    //console.log('upload success', e.detail)
  },
  submit(){
    var that = this
    wx.request({
      url: app.globalData.url + '/content/submitContent',
      method: 'post',
      data: {
        "id":that.data.id,
        "content":that.data.content,
        "userId":app.globalData.user_id
      },
      header: {
        "Content-Type": "application/json"
      },
      success(res) {
        console.log("提交动态成功")
        wx.navigateTo({
          url: '/pages/informationflow/index',
        })
      },
      fail(res) {
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  contentinput: function(e) {
    var value = e.detail.value;
    this.setData({
      content: value
    })
    var len = parseInt(value.length);
    if (len > this.data.max) return;

    this.setData({
      currentWordNumber: len
    });
    if (this.data.currentWordNumber == 140) {
      wx.showModal({
        title: '提示',
        content: '您输入的次数已达上限',
      })
    }
  }
})
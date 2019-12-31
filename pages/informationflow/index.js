// pages/informationflow/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mydata:[],
    promydata:[],
    page_index:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getContentFlow();
    // this.setData({
    //   mydata:[{
    //       text: '呼唤狗子最效率的方法是什么？当然是食物诱惑！只要你有吃的，它们一定会赶到你面前！',
    //       nickname: '汪星人日记',
    //       time: '2019-12-03 15:12:01',
    //       like: true,
    //       likecount:'321',
    //       talkcount:'27',
    //       watch:true,
    //     images: ['http://localhost:8080/upload/null.jpg', 'https://wx3.sinaimg.cn/mw690/69c732e4ly1g886zfmywjj20hs0hs76q.jpg','https://wx2.sinaimg.cn/mw690/69c732e4ly1g886zg1qx0j20hs0k6go1.jpg',
    //     'https://wx4.sinaimg.cn/mw690/69c732e4ly1g886zfn7w8j20hs0hr0uc.jpg']
    //     },{
    //       text: '随便写点什么111111111111111111111111111111111111111111111111111111111111111111111111111111111',
    //       nickname: '风毒翩翩',
    //       time: '2019-12-03 15:12:01',
    //       like: false,
    //       likecount: '209',
    //       talkcount: '23',
    //       watch: false,
    //     }, {
    //       text: '随便写点什么111111111111111111111111111111111111111111111111111111111111111111111111111111111',
    //       nickname: '风毒翩翩',
    //       time: '2019-12-03 15:12:01',
    //       like: false,
    //       likecount: '117',
    //       talkcount: '18',
    //       watch: false,
    //     }, {
    //       text: '随便写点什么111111111111111111111111111111111111111111111111111111111111111111111111111111111',
    //       nickname: '风毒翩翩',
    //       time: '2019-12-03 15:12:01',
    //       like: false,
    //       likecount: '87',
    //       talkcount: '13',
    //       watch: false,
    //     }, {
    //       text: '随便写点什么111111111111111111111111111111111111111111111111111111111111111111111111111111111',
    //       nickname: '风毒翩翩',
    //       time: '2019-12-03 15:12:01',
    //       like: true,
    //       likecount: '65',
    //       talkcount: '8',
    //       watch: false,
    //     }, {
    //       text: '随便写点什么111111111111111111111111111111111111111111111111111111111111111111111111111111111',
    //       nickname: '风毒翩翩',
    //       time: '2019-12-03 15:12:01',
    //       like: true,
    //       likecount: '21',
    //       talkcount: '6',
    //       watch: true,
    //     }]
    // })
  },
  //获取动态
  getContentFlow(){
    console.log("获取动态...")
    var that = this
    var page_index = this.data.page_index;
console.log(page_index)
    console.log(app.globalData.url + '/content/getContentFlow');
    wx.request({
      url: app.globalData.url + '/content/getContentFlow',
      method: 'post',
      data: {
        "page":page_index 
      },
      header: {
        "Content-Type": "application/json"
      },
      success(res) {
        console.log(res)
        var arr = res.data.data;
        let mydata = that.data.mydata
        for(var j = 0,len=arr.length; j < len; j++) {
          var images = arr[j].images.split(",");
          var imageArr = [];
          for(var i=0;i<images.length;i++){
            imageArr.push(app.globalData.url+"/content/image/"+images[i])
          }
          mydata.push({
            text: arr[j].content,
            images: imageArr,
            time:arr[j].sdfCreateDate
          })
        }
        page_index = page_index  + 1;
        that.setData({
          mydata: mydata,
          page_index :page_index 
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
  //点击事件  
  clickImg: function (event) {
    var src = event.currentTarget.dataset.imgsrc;//获取data-src
    var imgList = event.currentTarget.dataset.list;//获取data-list
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
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
  //刷新
  shuaxin:function(){
    this.setData({
      page_index :1,
      mydata:[]
    })
    this.getContentFlow()
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
  scrollHandler:function(){
    let mydata = this.data.mydata
    mydata.push({
      text: '随便写点什么4'
    })
    mydata.push({
      text: '随便写点什么5'
    })
    mydata.push({
      text: '随便写点什么6'
    })
    this.setData({
      mydata: mydata
    })
  },
  //秀一秀
  xiuyixiu:function(){
    wx.navigateTo({
      url: '/pages/sharepet/sharepet',
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
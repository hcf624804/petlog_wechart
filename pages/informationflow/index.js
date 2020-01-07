// pages/informationflow/index.js
var app = getApp()
var startX, endX;
var moveFlag = true;// 判断执行滑动事件
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mydata:[],
    promydata:[],
    page_index:1,
    animation:''
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
    if(page_index == 0){

    }else{
      console.log(page_index)
      console.log(app.globalData.url + '/content/getContentFlow');
      wx.request({
        url: app.globalData.url + '/content/getContentFlow',
        method: 'post',
        data: {
          "page":page_index,
          "userId":app.globalData.user_id
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
              id:arr[j].id,
              text: arr[j].content,
              images: imageArr,
              time:arr[j].sdfCreateDate,
              like:arr[j].like,
              likecount:arr[j].likeCount,
              nickname:arr[j].nickname,
              headimage:arr[j].headimage
            })
          }
          that.setData({
            mydata: mydata
          })

        },
        fail(res) {
        }
      })
    }
  },
  //红心
  likeContent:function(e){
      var that= this
      var id = e.currentTarget.dataset['contentid'];
      var mydata = that.data.mydata
      console.log("点赞" + id)
      wx.request({
        url: app.globalData.url + '/content/likeContent',
        method: 'post',
        data: {
          "id":id,
          "userId":app.globalData.user_id
        },
        header: {
          "Content-Type": "application/json"
        },
        success(res) {
          console.log(res)
          for(var i=0;i<mydata.length;i++){
            if(mydata[i].id == res.data.data.id){
              mydata[i].like = res.data.data.like
              mydata[i].likecount = res.data.data.likeCount
            }
          }
          that.setData({
            mydata: mydata
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
    // let mydata = this.data.mydata
    // mydata.push({
    //   text: '随便写点什么4'
    // })
    // mydata.push({
    //   text: '随便写点什么5'
    // })
    // mydata.push({
    //   text: '随便写点什么6'
    // })
    // this.setData({
    //   mydata: mydata
    // })
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

  },
  touchStart: function (e) {
    startX = e.touches[0].pageX; // 获取触摸时的原点
    moveFlag = true;
  },
  // 触摸移动事件
  touchMove: function (e) {
    endX = e.touches[0].pageX; // 获取触摸时的原点
    if (moveFlag) {
      if (endX - startX > 50) {
        console.log("move right");
        this.move2right();
        moveFlag = false;
      }
      if (startX - endX > 50) {
        console.log("move left");
        this.move2left();
        moveFlag = false;
      }
    }
  },
  // 触摸结束事件
  touchEnd: function (e) {
    moveFlag = true; // 回复滑动事件
  },
  //向左滑动操作
  move2left() {
    var that = this;
    if (this.data.page_index == 0) {
      return
    }
    var animation = wx.createAnimation({
      duration: 680,
      timingFunction: "ease",
    });
    animation.translateY(0).rotate(-20).translateX(-500).opacity(0).step();
    animation.translateY(0).translateX(0).opacity(1).rotate(0).step({
      duration: 10
    });
    this.setData({
      animation: animation.export()
    })
    var page_index = this.data.page_index;
    page_index = page_index + 1;
    setTimeout(function () {
      that.setData({
        page_index: page_index,
        mydata:[]
      });
      that.getContentFlow()
    }, 600)
  },
  //向右滑动操作
  move2right() {
    var that = this;
    if (this.data.page_index == 0) {
      return
    }
    var animation = wx.createAnimation({
      duration: 680,
      timingFunction: "ease",
    });
    animation.translateY(0).rotate(20).translateX(500).opacity(0).step();
    animation.translateY(0).translateX(0).opacity(1).rotate(0).step({
      duration: 10
    });
    this.setData({
      animation: animation.export()
    })
    var page_index = this.data.page_index;
    page_index = page_index - 1;
    setTimeout(function () {
      that.setData({
        page_index: page_index,
        mydata:[]
      });
      that.getContentFlow()
    }, 600)
  }
})
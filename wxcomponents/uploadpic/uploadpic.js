// components/uploadpic/uploadpic.js
var config = ''
let token = ''
let length = 0
Component({
  mixins: [],
  data: {
    imgList: [],//等待上傳列表
    files: [],// 已上傳列表
    uploadHidden: false,
    type: 'market',
    maskZindex: 10,
    current: 0,
    show: false,
    swiperHidden: true,
    canvas:'',
    blankImg: true
  },
  properties: {
    picid:String,
    bpmid:String,
    imgLength: Number
  },
  lifetimes: {
    ready: function() {
      let that = this
      wx.getStorage({
        key: 'api_path',
        success (res) {
          config = res
          console.log(that.properties)
          // 在组件实例进入页面节点树时执行
          that.setData({
            canvas: that.properties.picid,
            files: [{
              url:  that.properties.picid,
            }]
          },()=>{
            // this.ctx = wx.createCanvasContext(this.props.id);
            that.isUploadHidden()
            that.getPic()
          })
        }
      })
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    isUploadHidden(){
      // this.properties.onGetFiles(this.data.files)
      this.triggerEvent('onGetFiles' , this.data.files)
      if(this.data.files.length >= this.properties.imgLength){
        this.setData({
          uploadHidden: true
        })
      } else {
        this.setData({
          uploadHidden: false
        })
      }
    },
    // 图片上传
    uploadPic() {
      wx.showLoading({
        title: '请稍候',
      })
      this.getSYToken(5)
    },
     // 图片fanxian
     getPic() {
      wx.request({
        url: config.data.host + '/ODTMS/common/searchPath$m=query.service',
        method: 'POST',
        data: {
          prePid: this.properties.bpmid + '-' + this.properties.picid + '-',
        },
        header:{
          'content-type': 'application/json',  //默认值
          'M-Sy-AppId': '2019121819313665',
          'M-Sy-Service': 'odtmszs',
          'M-Sy-Version': '1.0.1'
        },
        // 期望返回的数据格式，默认json，支持json，text，base64
        dataType: 'json',
        // 调用成功的回调函数
        success: function (res) {
        },
        // 调用失败的回调函数
        fail: function (res) {
        },
        // 调用结束的回调函数（调用成功、失败都会执行）
        complete: (res)=> {
          let filesTem = this.data.files
          filesTem.shift()
          if(res.data.results.length>0){
            res.data.results.forEach(element => {
              filesTem.push({
                id: this.properties.picid,
                url: `${config.data.pichost}${element.path}`,
                prePid: element.pid,
                path: element.path
              })
            });
          }
          this.setData({
            files: filesTem,
            blankImg: false
          }, () => {
            this.isUploadHidden()
          })
        }
      })
    },
    getSYToken (i) {
      wx.request({
        url: config.data.host + '/ODTMS/common/getToken$m=query.service',
        method: 'POST',
        data: {
        },
        header:{
          'content-type': 'application/json',  //默认值
          'M-Sy-AppId': '2019121819313665',
          'M-Sy-Service': 'odtmszs',
          'M-Sy-Version': '1.0.1'
        },
        // 期望返回的数据格式，默认json，支持json，text，base64
        dataType: 'json',
        // 调用成功的回调函数
        success: function (res) {
        },
        // 调用失败的回调函数
        fail: function (res) {
        },
        // 调用结束的回调函数（调用成功、失败都会执行）
        complete: (res)=> {
          if(!res.data.success){
            if (i > 1) {
              i--; this.getSYToken(i)
            } else {
              wx.showToast({
                icon: "none",
                title: "网络错误，请重试！"
              });
            }
          } else {
            token = res.data.data.token
            wx.chooseImage({
              count: 1,
              sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
              sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
              success: (res) => {
                wx.showLoading({
                  title: '正在上传请稍候',
                })
                let imgs = []
                for (let i = 0; i < res.tempFiles.length; i++) {
                  let img = new Object();
                  img.imgsrc = "data:image/png;base64," + wx.getFileSystemManager().readFileSync(res.tempFilePaths[i], "base64");
                  img.size = res.tempFiles[i].size
                  imgs.push(img);
                }
                for (var img of imgs) {
                  var base64 = img.imgsrc;
                  var timerTem = new Date().getTime();
                  var size = img.size
                  this.upload(token, base64, timerTem, size)
                }
              },
              fail: (e) => {
                wx.hideLoading({
                  success: (res) => {},
                })
              }
            })
          }
        }
      })
    },
    upload(token, base64, timerTem, size){
      if(size > 1048576){
        wx.hideLoading({
          success: (res) => {
            wx.showToast({
              icon: 'error',
              title: '请小于1MB'
            })
          },
        })
        return
      } 
      let prePid = this.properties.bpmid + '-' + this.properties.picid + '-' + timerTem
      wx.request({
        url: config.data.host + '/ODTMS/common/uploadFileBase64$m=execute.service',
        method: 'POST',
        data: {
          token: token,
          base64: base64,
          prePid: prePid
        },
        header:{
          'content-type': 'application/json',  //默认值
          'M-Sy-AppId': '2019121819313665',
          'M-Sy-Service': 'odtmszs',
          'M-Sy-Version': '1.0.1'
        },
        // 期望返回的数据格式，默认json，支持json，text，base64
        dataType: 'json',
        // 调用成功的回调函数
        success: function (res) {
        },
        // 调用失败的回调函数
        fail: function (res) {
        },
        // 调用结束的回调函数（调用成功、失败都会执行）
        complete: (res)=> {
          let r = res
          wx.hideLoading({
            success: (res) => {
              if(r.data.success){
                wx.showToast({
                  icon: "success",
                  title: '上传成功',
                })
                let filesTem = this.properties.files
                filesTem.push({
                  id: this.properties.picid,
                  url: base64,
                  prePid: prePid,
                  path: r.data.data.path
                })
                this.setData({
                  files: filesTem
                }, () => {
                  this.isUploadHidden()
                })
              } else {
                wx.showToast({
                  icon: 'error',
                  title: '上传失败，请稍候再试',
                })
              }
            },
          })
        }
      })
    },
    // 图片删除
    deletePic(e) {
      wx.showLoading({
        title: '正在删除请稍候',
      })
      wx.request({
        url: config.data.host + '/ODTMS/common/deletePath$m=query.service',
        method: 'POST',
        data: {
          prePid: e.currentTarget.dataset.index.prePid
        },
        header:{
          'content-type': 'application/json',  //默认值
          'M-Sy-AppId': '2019121819313665',
          'M-Sy-Service': 'odtmszs',
          'M-Sy-Version': '1.0.1'
        },
        // 期望返回的数据格式，默认json，支持json，text，base64
        dataType: 'json',
        // 调用成功的回调函数
        success: function (res) {
        },
        // 调用失败的回调函数
        fail: function (res) {
        },
        // 调用结束的回调函数（调用成功、失败都会执行）
        complete: (res)=> {
          wx.hideLoading({
            success: (res) => {},
          })
          if(res.data.success){
            wx.showToast({
              icon: 'success',
              title: '删除成功',
            })
            let filesTem = []
            this.data.files.forEach(element => {
              if(element.prePid != e.currentTarget.dataset.index.prePid){
                filesTem.push(element)
              }
            })
            this.setData({
              files: filesTem
            }, () => {
              this.isUploadHidden()
            })
            wx.request({
              url: config.data.host + '/ODTMS/common/deletePath$m=deletezt.service',
              method: 'POST',
              data: {
                path: e.currentTarget.dataset.index.path
              },
              header:{
                'content-type': 'application/json',  //默认值
                'M-Sy-AppId': '2019121819313665',
                'M-Sy-Service': 'odtmszs',
                'M-Sy-Version': '1.0.1'
              },
              // 期望返回的数据格式，默认json，支持json，text，base64
              dataType: 'json',
              // 调用结束的回调函数（调用成功、失败都会执行）
              complete: (res)=> {
              }
            })
          } else {
            wx.showToast({
              icon: 'error',
              title: '网络错误',
            })
          }
        }
      })
    },
    ylClick(e){
      this.setData({
        current: e.currentTarget.dataset.index,
        show: true,
        swiperHidden: false
      })
    },
    hideyl(){
      this.setData({
        swiperHidden: true
      })
    }
  },
  externalClasses: ['my-mask','my-swiper']  // 可以是多个class名
})

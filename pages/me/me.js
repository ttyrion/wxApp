

const app = getApp()

Page({
    //data对象是提供给wxml视图中的组件进行数据绑定用的
    //wxml视图中的动态数据均来自于此
    data: {
        title: "我的",
        nickName: "无名"
    },

    onLoad: function() {
        console.log("me show.");
        wx.setNavigationBarTitle({
            title: this.data.title
        });

        this.setData({
            nickName: app.globalData.userInfo.nickName
        });
    },

    onShowAllOders: function() {
        wx.navigateTo({
            url: '../orderlist/orderlist?type=all'
        })
    },

    onPay: function() {
        wx.navigateTo({
            url: '../orderlist/orderlist?type=topay'
        })
    },

    onDeliver: function () {
        wx.navigateTo({
            url: '../orderlist/orderlist?type=todeliver'
        })
    },
    onTake: function () {
        wx.navigateTo({
            url: '../orderlist/orderlist?type=totake'
        })
    },
    onCustomerService: function () {
        wx.navigateTo({
            url: '../orderlist/orderlist?type=service'
        })
    },
    onAddressManageClick: function() {
        wx.navigateTo({
            url: '../address/address'
        })
    }
})
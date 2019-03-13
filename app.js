//app.js
//注册小程序
App({
    onLaunch: function () {
        loadUserInfo();

        // 获取本地缓存的订单信息
        try {
            var orders = null;
            this.globalData.orderList = wx.getStorageSync("orders");
        } catch (e) {

        } finally {
            console.log("App::onLaunch getStorageSync orders null.");
            if (!this.globalData.orderList) {
                this.globalData.orderList = {
                    //待支付订单
                    toPay: [

                    ],
                    // 待发货订单
                    toDeliver: [

                    ],
                    //带收货订单
                    toTake: [

                    ],
                    //已完成订单
                    finished: [

                    ]
                }
            }
        }

        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
    },

    onShow: function() {
        console.log("App onshow.");
    },

    saveAddressData: function(addr) {
        wx.setStorage({
            key: "addr",
            data: {
                //联系人
                contact: addr.contact,
                phone: addr.phone,
                city: addr.city,
                detailAddr: addr.detailAddr
            }
        })
    },

    getAddressData: function() {
        try {
            var addressData = null;
            addressData = wx.getStorageSync("addr");
            return addressData;
        } catch (e) {
            return null;
        }
    },

    getOrderList: function () {
        return this.globalData.orderList;
    },

    saveOrderList: function (orders) {
        this.globalData.orderList = orders;
        wx.setStorage({
            key: "orders",
            data: orders
        })
    },

    saveUserInfo: function(userInfo) {
        this.globalData.userInfo = userInfo;
        wx.setStorage({
            key: "userInfo",
            data: userInfo
        })
    },

    loadUserInfo: function() {
        try {
            var userInfo = null;
            userInfo = wx.getStorageSync("userInfo");
            if (userInfo) {
                this.globalData.userInfo = userInfo;
            }
        } catch (e) {

        }
    },

    globalData: {
        userInfo: null,
        sessionData: null,
        orderList: {
            //待支付订单
            toPay: [

            ],
            // 待发货订单
            toDeliver: [

            ],
            //带收货订单
            toTake: [

            ],
            //已完成订单
            finished: [

            ]
        }
    }
})
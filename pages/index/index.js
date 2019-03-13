//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        motto: '',
        //userInfo: {},
        roots: 360000,
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        showAuthBox: false,
        add_friend_btn_tip: "当前加成0%，邀请第一个好友加成12%哦",
        greet_icon_btns: [
        ],
        
        products: [
            {
                id: '001',
                product_image: "http://10.5.139.1:8080/static/running/index/img/product.png",
                product_title: "女士针织衫（抖音同款）",
                roots: 280000,
                exchanges: 3256
            },
            {
                id: '002',
                product_image: "http://10.5.139.1:8080/static/running/index/img/chair.jpg",
                product_title: "靠背椅升降弓形电脑椅办公",
                roots: 250000,
                exchanges: 1362
            },
            {
                id: '003',
                product_image: "http://10.5.139.1:8080/static/running/index/img/usb.jpg",
                product_title: "usb充电风扇台式宿舍夹家用学生床头上大风力蓄电池迷你10寸/8寸",
                roots: 150000,
                exchanges: 569
            },
            {
                id: '004',
                product_image: "http://10.5.139.1:8080/static/running/index/img/pen.jpg",
                product_title: "中性笔定做印LOGO广告笔",
                roots: 2000,
                exchanges: 96254
            }
            ,
            {
                id: '005',
                product_image: "http://10.5.139.1:8080/static/running/index/img/xiaomi.jpg",
                product_title: "小米9se全面屏尊享",
                roots: 3600000,
                exchanges: 3
            }
        ]
        
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
        url: '../logs/logs'
        })
    },

    onLoad: function () {
        this.loadProductsData();
        console.log("index page onLoad." + this.data.roots);
        
        return;

        var _this = this;
        wx.getSetting({
            success(res) {
                if (!res.authSetting['scope.userInfo']) {
                    _this.setData({
                        showAuthBox: true
                    })
                    console.log('no userInfo');
                } else {
                    _this.setData({
                        showAuthBox: false
                    })
                    _this.getUserInfo();
                }
            }
        });

        wx.getSetting({
            success(res) {
                if (!res.authSetting['scope.werun']) {
                    wx.authorize({
                        scope: 'scope.werun',
                        success() {
                            this.getWeRunData();
                        },
                        fail() {
                            wx.showModal({
                                title: '微信运动授权提示',
                                content: '步数宝需要您授权微信运动，以便您可以用步数换取礼品哦~',
                                cancelText: '拒绝授权',
                                confirmText: '同意授权',
                                success(res) {
                                    if (res.confirm) {
                                        
                                    } else if (res.cancel) {
                                        wx.openSetting({
                                            success(res) {
                                                console.log(res.authSetting)
                                            }
                                        });
                                    }
                                }
                            })
                        }
                    })
                } else {
                    this.getWeRunData();
                }
            }
        });
    },
    
    onHide: function () {
        console.log("index page onHide.");
    },

    getUserInfo: function() {
        var _this = this;
        wx.getUserInfo({
            success(res) {
                console.log("index getUserInfo success.");
                _this.setData({
                    //userInfo: res.userInfo,
                    showAuthBox: false,
                    hasUserInfo: true
                });
                app.saveUserInfo(res.userInfo);
                console.log(app.globalData.userInfo);
            }
        });
    },

    getWeRunData: function() {
        wx.getWeRunData({
            success(res) {
                const encryptedData = res.encryptedData
            }
        })
    },

    onAuthUserInfo: function() {
        console.log("index bindGetUserInfo.");
        this.getUserInfo();
    },

    onExchangeClick: function(e) {
        if (this.data.roots < e.currentTarget.dataset.product.roots) {
            wx.showToast({
                title: '您的步数不足~',
            })
        }
        else {
            let orders = app.globalData.orderList;
            let date = new Date();
            let fix2 = function (num) {
                let tmp = "00" + num;
                return tmp.substr(-2);
            }

            orders.toDeliver.push({
                product: e.currentTarget.dataset.product,
                time: (date.getYear() + 1900) + '-' + fix2(date.getMonth() + 1) + '-' + fix2(date.getDate()) + ' ' + fix2(date.getHours()) + ':' + fix2(date.getMinutes()) + ':' + fix2(date.getSeconds())
            });
            app.saveOrderList(orders);

            console.log(orders.toDeliver)

            var products = this.data.products;
            for (let i in products) {
                console.log(products[i].id + ":" + e.currentTarget.dataset.product.id)
                if (products[i].id == e.currentTarget.dataset.product.id) {
                    products[i].exchanges += 1;
                }
            }

            this.setData({
                products: products,
                roots: this.data.roots - e.currentTarget.dataset.product.roots
            });
            
            this.saveProductsData({
                products: this.data.products,
                roots: this.data.roots
            });

            wx.showToast({
                title: '恭喜，兑换成功~',
            })
        }
    },

    saveProductsData: function (data) {
        wx.setStorage({
            key: "products",
            data: data
        })
    },

    loadProductsData: function() {
        try {
            var data = null;
            data = wx.getStorageSync("products");
            if (data) {
                this.setData({
                    products: data.products,
                    roots: data.roots
                });
                console.log("loadProductsData success:" + data)
            }
            console.log("loadProductsData failed.")
        } catch (e) {
            console.log("loadProductsData exception.")
        }
    }
})

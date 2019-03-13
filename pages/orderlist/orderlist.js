

const app = getApp()

Page({
    //data对象是提供给wxml视图中的组件进行数据绑定用的
    //wxml视图中的动态数据均来自于此
    data: {
        title: "地址管理",
        showSelectAddress: false,
        value: [0,0,0],
        addressInfo: {
            provinces: ['上海'],
            cities: ['上海市'],
            areas: ['长宁区', '闵行区', '徐汇区', '静安区']
        },
        contactName: '',
        contactArea: '',
        currentOrderTab: 0,
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
    },

    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: this.data.title
        });
        console.log(options)

        var type = options['type'];
        var tab = 0;
        switch(type) {
            case 'all':
                break;
            case 'topay':
                tab = 1;
                break;
            case 'todeliver':
                tab = 2;
                break;
            case 'totake':
                tab = 3;
                break;
        }
        this.setData({
            currentOrderTab: tab,
            orderList: app.globalData.orderList
        })

        console.log(app.globalData.orderList);
        console.log(this.data.orderList)
    },

    onSwichOrderTab: function (e) {
        if (this.data.currentOrderTab === e.target.dataset.current) {
            return false;
        } else {
            this.setData({
                currentOrderTab: e.target.dataset.current
            })
        }
    }
})
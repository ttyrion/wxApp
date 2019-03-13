

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
        contactPhoneNum: '',
        contactCity: '',
        contactDetailAddr: ''
    },

    onLoad: function() {
        wx.setNavigationBarTitle({
            title: this.data.title
        });

        var addressData = app.getAddressData();
        if (addressData) {
            this.setData({
                contactName: addressData.contact,
                contactPhoneNum: addressData.phone,
                contactCity: addressData.city,
                contactDetailAddr: addressData.detailAddr
            });
        }

        console.log('address page onLoad: '+ addressData)
    },

    onShowAllOders: function() {
        console.log('显示所有订单');
    },

    onPay: function() {
        console.log('支付');
    },

    onDeliver: function () {
        console.log('发货');
    },
    onTake: function () {
        console.log('收货');
    },
    onCustomerService: function () {
        console.log('退款/售后');
    },
    onConfirmAddress: function() {
        this.setData({
            showSelectAddress: false
        })
    },
    onCancelAddress: function () {
        this.setData({
            showSelectAddress: false
        })
    },
    onSelectAddress: function() {
        this.setData({
            showSelectAddress: true
        })
    },
    onAddressChange: function (e) {
        var value = e.detail.value;
        console.log('onAddressChange' + value)
        var selectedProvince = this.data.addressInfo.provinces[value[0]];
        var selectedCity = this.data.addressInfo.cities[value[1]];
        var selectedArea = this.data.addressInfo.areas[value[2]];

        this.setData({
            contactCity: selectedProvince+ selectedCity + selectedArea
        })
    },
    onContactInput: function(e) {
        this.setData({
            contactName: e.detail.value
        })
        console.log(this.data.contactName)
    },
    onPhoneInput: function (e) {
        this.setData({
            contactPhoneNum: e.detail.value
        })
        console.log(this.data.contactPhoneNum)
    },
    onCityInput: function (e) {
        this.setData({
            contactCity: e.detail.value
        })
        console.log(this.data.contactCity)
    },
    onDetailAddrInput: function(e) {
        this.setData({
            contactDetailAddr: e.detail.value
        })
        console.log(this.data.contactDetailAddr)
    },
    onSaveAddress: function() {
        app.saveAddressData({
            contact: this.data.contactName,
            phone: this.data.contactPhoneNum,
            city: this.data.contactCity,
            detailAddr: this.data.contactDetailAddr
        });
    }
})
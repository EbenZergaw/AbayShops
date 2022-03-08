const mongoose = require('mongoose')

const SellerSchema = new mongoose.Schema({
    
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    storeCode: {
        type: String,
        unique: true
    },
    key: {
        type: String,
        unique: true,
        required: true,
    },
    telegramID: {

    },
    storeName: {
        type: String,
    },
    misc: {
        type: String
    },
    items: [],
    orders: []
})

module.exports = Seller = mongoose.model('seller', SellerSchema)
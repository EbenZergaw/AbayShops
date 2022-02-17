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
        type: Number,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    storeName: {
        type: String,
        unique: true
    },
    storeCode: {
        type: String,
        required: true,
    },
    id: {
        type: Number
    },
    items: [],
    orders: []
})

module.exports = Seller = mongoose.model('seller', SellerSchema)
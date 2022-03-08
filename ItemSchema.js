const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    
    
    imgString: {
        type: String,
    },
    itemName: {
        type: String,
    },
    price: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    desc: {
        type: String
    },
    sellerID: {
        type: String,
    }
})

module.exports = Item = mongoose.model('item', ItemSchema)
const {Telegraf} = require('telegraf')
const bot = new Telegraf('5277917728:AAFN0zY76KgCFm8x8UqqHG09ghj_b5h5dU4')
const Item = require('./ItemSchema')
const id = 574620466

bot.start(ctx => {
    // console.log(ctx.update.message.from.id);
})

const newOrderNotification = (item, buyer, seller) => {
    try {
        bot.telegram.sendMessage(id, `NEW ORDER
    Buyer:   ${buyer.firstName} ${buyer.lastName}
    Buyer Phone Number:  ${buyer.phone}
    Item: ${item.itemName}

    Seller: ${seller.firstName} ${seller.lastName}
    Seller Phone Number: ${seller.phone}`)
    } catch (error) {
        console.log(error)
    }
    
}

const newItemNotification = (seller, item) => {
    bot.telegram.sendMessage(id, `NEW ITEM
    Seller: ${seller.firstName} ${seller.lastName}
    Phone: ${seller.phone}

    Item: ${item.itemName}
    Price: ${item.price}`)
}

const clearedOrder = async(seller, itemID) => {

    let item = await Item.findById(itemID)

    bot.telegram.sendMessage(id, `ORDER CLEARED
    Seller: ${seller.firstName} ${seller.lastName}
    Phone: ${seller.phone}
    
    Item: ${item.itemName}
    Price: ${item.price}
    
    // Buyer: ${seller.orders[seller.orders.indexOf(itemID)]}
    `)
}

exports.newOrderNotification = newOrderNotification
exports.clearedOrder = clearedOrder
exports.newItemNotification = newItemNotification

bot.launch()
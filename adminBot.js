const {Telegraf} = require('telegraf')
const bot = new Telegraf(env("TELEGRAF)
const Item = require('./ItemSchema')
const id = 574620466

bot.start(ctx => {
    ctx.reply('Welcome')
    // console.log(ctx.update.message.from.id);
})
console.log('running');

const newOrderNotification = (item, buyer, seller) => {
    try {
        bot.telegram.sendMessage(id, `NEW ORDER
    Buyer:   ${buyer.firstName} ${buyer.lastName}
    Buyer Phone Number:  ${buyer.phone}
    Item: ${item.itemName}

    Seller: ${seller.name}
    Seller Phone Number: ${seller.phone}`)
    } catch (error) {
        console.log(error)
    }
    
}

const newItemNotification = (seller, item) => {
    bot.telegram.sendMessage(id, `NEW ITEM
    Seller: ${seller.name}
    Phone: ${seller.phone}

    Item: ${item.itemName}
    Price: ${item.price}`)
}

const clearedOrder = async(seller, itemIndex) => {
    try {
        if(seller.orders[itemIndex] !== undefined){
            let item = await Item.findById(seller.orders[itemIndex].imageID)
    
            bot.telegram.sendMessage(id, `ORDER CLEARED
            Seller: ${seller.name}
            Phone: ${seller.phone}
            
            Item: ${item.itemName}
            Price: ${item.price}
            
            Buyer: ${seller.orders[itemIndex].firstName} ${seller.orders[itemIndex].lastName}
            Buyer Number: ${seller.orders[itemIndex].phone}
            `)
        }
    } catch (error) {
        console.log(error)
    }
    
}

exports.newOrderNotification = newOrderNotification
exports.clearedOrder = clearedOrder
exports.newItemNotification = newItemNotification

bot.launch()

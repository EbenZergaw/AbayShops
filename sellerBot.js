const {Telegraf} = require('telegraf')
const bot = new Telegraf('5130311042:AAFkNnOOLPajXav4gNZQFK3j9orDv_CS5RQ')
const mongoose = require('mongoose')
const Seller = require('./SellerSchema')

bot.start(ctx => {
    ctx.reply(`Welcome ${ctx.chat.first_name}`)
    console.log(ctx.chat.id)
})

// Connect user to database
bot.command('/connect', async(ctx) => {
    let input = ctx.message.text
    let inputArr = input.split(" ")
    let storeCode = inputArr[1]

    let seller = await Seller.findOne({storeCode})

    if(!seller){
        ctx.reply("Please enter a valid code")
    } else {
        ctx.state.storeCode = storeCode
        ctx.state.storeName = seller.storeName
        seller.id = ctx.chat.id
        await seller.save()
        ctx.reply("You have connected!")
    }
})

bot.command('newItem', (ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, "Add New Item", {
        reply_markup: {
          inline_keyboard: [
            [
              { text: 'Add New Item', url: `http://localhost:5000/${ctx.state.storeName}/newitem?id=${ctx.chat.id}`}
            ]
          ]
        }
      })
})

const newItemNotification = (data) => {
    bot.telegram.sendMessage(data.id, "You have added a new item")

    const message = `
    Item Name: ${data.itemName}
    Price: ${data.price}
    Quantity: ${data.quantity}
    `
    
    bot.telegram.sendPhoto(data.id, {source: Buffer.from(data.imgString, 'base64')},{caption: message},)
}


bot.launch()

exports.newItemNotification = newItemNotification
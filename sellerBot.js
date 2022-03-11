const {Telegraf} = require('telegraf')
const bot = new Telegraf('5130311042:AAFkNnOOLPajXav4gNZQFK3j9orDv_CS5RQ')
const Seller = require('./SellerSchema')
const Item = require('./ItemSchema')
const adminBot = require('./adminBot')

bot.seller = {}

const helpMessage = `
  /connect (key)  = To connect your account
/newitem = To upload new item
/orders = To view all orders 
- Press 'CLEAR ORDER' button when an order is completed
/items = To show all your items
/help = To show this message again
`

bot.start(ctx => {
    ctx.reply(`Welcome ${ctx.chat.first_name}`)
    ctx.reply(helpMessage)
})

bot.help(ctx => {
  ctx.reply(helpMessage)
})

bot.use(async(ctx, next) => {

  if(ctx.update.message == undefined){
    next(ctx)
  } else if(!bot.seller.key && !ctx.update.message.text.includes('/connect')){
    ctx.reply('Please connect by using /connect and entering your key ')
  } else {
    next(ctx)
  }
  
})

// Connect user to database
bot.command('/connect', async(ctx, next) => {
    let input = ctx.message.text
    let inputArr = input.split(" ")
    let key = inputArr[1]

    let seller = await Seller.findOne({key})

    if(!seller){
        ctx.reply("Please enter a valid code")
    } else {

        bot.seller.key = seller.key
        bot.seller.storeCode = seller.storeCode
        seller.telegramID = ctx.update.message.chat.id
        await seller.save()
        ctx.reply("You have connected!")
    }
})


// Add new item
bot.command(['newItem', 'newitem'], (ctx) => {

    bot.telegram.sendMessage(ctx.chat.id, "Add New Item", {
        reply_markup: {
          inline_keyboard: [
            [
              { text: 'Add New Item', url: `www.abayshops.com/${bot.seller.storeCode}/newitem?key=${bot.seller.key}`}
            ]
          ]
        }
      })
})


// LIST OUT ORDERS
bot.command('orders', async(ctx) => {
  ctx.reply('Your orders are loading...')
  let seller = await Seller.findOne({storeCode: bot.seller.storeCode})

  if(seller.orders.length === 0){
    ctx.reply('You have no orders')
  } else {
    seller.orders.forEach(async(order, index) => {

      let item = await Item.findById(order.imageID)
  
      ctx.reply(
      `Buyer: ${order.firstName} ${order.lastName}
  Phone: ${order.phone}
  Item: ${item.itemName}`, {reply_markup: {
    inline_keyboard: [
      [
        { text: 'CLEAR ORDER', callback_data: `${item._id}`}
      ]
    ]
  }})
    })
  }
  
})

bot.action(String, async (ctx) => {
  let seller = await Seller.findOne({storeCode: bot.seller.storeCode})
  if(!seller){
    ctx.reply('Please connect with your key and try again')
  } else {
    let itemIndex = seller.orders.findIndex(item => item.imageID == ctx.callbackQuery.data)
    if(itemIndex == -1){
      ctx.reply('This order has already been cleared')
    } else {
      seller.orders.splice(itemIndex, 1)
      await seller.save()
      ctx.reply('Your order has been cleared')
      adminBot.clearedOrder(seller, itemIndex)
    }
  }
  ctx.answerCbQuery()
})

// LIST OUT ITEMS
bot.command('items', async(ctx) => {
  ctx.reply('Your items are loading...')
  let seller = await Seller.findOne({storeCode: bot.seller.storeCode})
  
  seller.items.forEach(async(id) => {
    let item = await Item.findById(id)
    if(item === null){
      seller.items.splice(seller.items.indexOf(id), 1)
      await seller.save()
    } else {
      ctx.replyWithPhoto({ source: Buffer.from(item.imgString, 'base64')}, 
        { caption: `${item.itemName}
        Price: ${item.price} birr
        Quantity: ${item.quantity}
        
        ${item.desc}`,
          reply_markup: {
            inline_keyboard: [
              [
                { text: 'BUY', url: `abayshops.com/${bot.seller.storeCode}`}
              ]
            ]
          }
        }
      )
    }
    
  })
})

const newItemNotification = async (id, data) => {

  if(bot.seller.storeCode === undefined){
    bot.telegram.sendMessage(id, "You have added a new item - Connect with your key and use /items to see it")
  } else {
    bot.telegram.sendMessage(id, "You have added a new item - Forward it to your group")

    const message = `
    ${data.itemName}
  Price: ${data.price} birr
  Quantity: ${data.quantity}

  ${data.desc}
  `    
  bot.telegram.sendPhoto(id, {source: Buffer.from(data.imgString, 'base64')}, {
    caption: message,
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'BUY', url: `abayshops.com/${bot.seller.storeCode}`}
        ]
      ]
    }
  })
  }
}

const newOrderNotification = (id, data, imageData) => {
  bot.telegram.sendMessage(id, "You have a new order")

  const message = `
  ${data.firstName} ${data.lastName} bought ${imageData.itemName}
  Buyers Phone: ${data.phone}
  `

  bot.telegram.sendPhoto(id, {source: Buffer.from(imageData.imgString, 'base64')}, {
    caption: message})
}


bot.launch()

exports.newItemNotification = newItemNotification
exports.newOrderNotification = newOrderNotification
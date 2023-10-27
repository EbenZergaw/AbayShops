const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const Seller = require('./SellerSchema')
const sellerBot = require('./sellerBot')
const adminBot = require('./adminBot')

const Item = require('./ItemSchema')

const mongoURI = env("MONGO_URI")

const axios = require('axios')
require('dotenv').config()

// Connect to database
const connectDB = async() => {
    try {
        await mongoose.connect(mongoURI, {
            keepAlive: true
        })
        console.log('MongoDB Connected')
    } catch (error) {
        console.log(error);
    }
}
connectDB()

// Start server 
app.listen(process.env.PORT || 27017, () => {
    console.log('Server listening on Port: 27017');
})
// Enabling CORS
app.use(cors({
    origin: '*'
}))
// Increasing file size limit for uploading base64 images
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


// GET ALL SELLERS
app.get('/all', async(req, res) => {
    let sellers = await Seller.find()
    res.json(sellers)
})

app.get('/keepalive', async(req, res) => {
    res.json('Active')
})

// REGISTER SELLER
app.post('/newseller', async(req, res) => {
    const {name, phone, username, storeCode, storeName, key, misc} = req.body;

    try {
        const seller = new Seller({
            name,
            phone,
            username,
            storeCode,
            key,
            storeName,
            misc
        })
        
        await seller.save()
    
        res.status(201).json({msg: 'Seller has been registered'})
    } catch (error) {
        console.log(error);
        res.json({msg: "ERROR"})
    }
})

// POST ITEM
app.post('/postItem', async(req, res) => {

    const data = req.body
    let seller = await Seller.findOne({storeCode: data.storeCode})
    if(!seller){
        res.status(404).send('Nah G')
    } else {

        let item = new Item({
            imgString: data.imgString,
            itemName: data.itemName,
            price: data.price,
            quantity: data.quantity,
            desc: data.desc,
        })
        await item.save()

        seller.items.push(item._id)
        await seller.save()
        
        res.send('Item Posted')

        sellerBot.newItemNotification(seller.telegramID, item)
        adminBot.newItemNotification(seller, item)
    }
})

// GET SELLER DATA
app.get(`/store/:storeCode`, async(req, res) => {
    const storeCode = req.params.storeCode

    let seller = await Seller.findOne({storeCode})

    if(!seller){
        res.status(404).send('Nah G')
    } else {
        res.send(seller)
    }
})

// GET ITEM DATA
app.get('/image/:itemID', async(req, res) => {
    const itemID = req.params.itemID
    // let seller = await Seller.findOne({storeCode})
    id = new mongoose.Types.ObjectId(itemID)
    let item = await Item.findById(id)
    // console.log(image._id);
    res.send(item)

})

app.get('/test/:text', (req, res) => {
    res.json(`test: ${req.params.text} :)`)
})

// NEW ORDER
app.post('/neworder/:storeCode/:itemID', async(req, res) => {

    let seller = await Seller.findOne({storeCode: req.params.storeCode})
    id = new mongoose.Types.ObjectId(req.params.itemID)
    let boughtItem = await Item.findById(id)

    if(boughtItem.quantity !== 1 && boughtItem.quantity > 0){
        boughtItem.quantity = boughtItem.quantity - 1
        await boughtItem.save()
    } else if (boughtItem.quantity === 1){

        let index = seller.items.indexOf(id)
        seller.items.splice(index, 1)

        await seller.save()
        await Item.findOneAndDelete({_id: req.params.itemID})
    }
    req.body.imageID = boughtItem._id
    seller.orders.push(req.body)

    await seller.save()
    res.json('Order Complete')
    
    sellerBot.newOrderNotification(seller.telegramID, req.body, boughtItem)
    adminBot.newOrderNotification(boughtItem, req.body, seller)
})

// VALIDATE KEY
app.get('/valkey/:storeCode/:key', async (req, res) => {
    const {storeCode, key} = req.params
    let seller = await Seller.findOne({key})

    if(!seller){
        res.status(401).json('Error')
    } else {
        if(seller.storeCode === storeCode){
            res.status(200).json('Valid')

        } else {
            res.status(401).json('Unauthorized')
        }
    }
})



// PREVENT IDLING
const keepAlive = () => {
    setInterval(() => {
        try {
            axios.get('https://abay-shops.herokuapp.com/keepalive')
            .then((res) => {
                console.log('Keep Alive - Ping')
            })
            .catch((err) => {
                console.log('Keep alive error!', err);
            })
        } catch (error) {
            console.log(error);
        }
    }, 1200000);
}
keepAlive()

const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const Seller = require('./SellerSchema')

// Connect to database
mongoose.connect('mongodb://localhost:27017/Abay_Shops');

// Start server
app.listen(5000, () => {
    console.log('Server listening on Port: 5000');
})
// Enabling CORS
app.use(cors({
    origin: '*'
}))
// Increasing file size limit for uploading base64 images
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// REGISTER SELLER
app.post('/newseller', async(req, res) => {
    const {firstName, lastName, phone, username, storeName, storeCode} = req.body;

    try {
        const seller = new Seller({
            firstName,
            lastName,
            phone,
            username,
            storeName,
            storeCode
        })
    
        await seller.save()
    
        res.json({msg: 'Seller has been registered'})
    } catch (error) {
        console.log(error);
        res.json({msg: "ERROR"})
    }
})
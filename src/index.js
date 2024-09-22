const express =  require("express")
const mongoose = require('mongoose');

const app = express()
app.use(express.json())
const port = 3000
mongoose.connect('mongodb+srv://<username>:<password>@webappapi.ppbei.mongodb.net/?retryWrites=true&w=majority&appName=WebAppAPI');

const Order = mongoose.model('Order', { 
    name: String,
    
});


app.get("/", async (req, res) =>{
    const orders = await Order.find()
    return res.send(orders)
})

app.delete("/:id", async(req,res) =>{
    const order = await Order.findByIdAndDelete(req.params.id)
    return res.send(order)
})

app.put("/:id", async (req,res) => {
    const order = await Order.findByIdAndUpdate(req.params.id,{
        name: req.body.name
    })

    return res.send(order)
})

app.post("/", async (req,res) =>{
    const order = new Order({
        name: req.body.name
    })

    await order.save()
    return res.send(order)
})

app.listen(port,() => {
    console.log('App running')
})
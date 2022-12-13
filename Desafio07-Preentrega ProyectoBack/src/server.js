const express = require('express')
const path = require('path')

const productosRouter = require('./routes/products.Router')
const carritosRouter = require('./routes/cart.Router')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))

app.use('/api/productos', productosRouter)
app.use('/api/carritos', carritosRouter)

app.get('/', async (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../public/productos.html'))
})
app.get('/carrito', async (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../public/carrito.html'))
})

app.get('*', function (req, res) {
    res.send({ status: "error", description: `ruta ${req.url} método ${req.method} no implementada` });
})

module.exports = app
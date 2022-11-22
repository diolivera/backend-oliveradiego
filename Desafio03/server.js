const express = require("express")
const app = express()
const port = 8088
const productos = require('./productos')
const productoRandom = require('./productsRandom')
const Contenedor = require('../Desafio02/Contenedor')
const contenedorClass = new Contenedor("./productos.txt")

const producto1 = {title: "Camisetas", price: 15000, thumbnail: "https://www.mercadolibre.com.ar/",}
const producto2 = {title: "Shorts", price: 10000, thumbnail: "https://www.mercadolibre.com.ar/",}
const producto3 = {title: "Botines", price: 20000, thumbnail: "https://www.mercadolibre.com.ar/",}

const test = async() =>{
    await contenedorClass.save(producto1)
    await contenedorClass.save(producto2)
    await contenedorClass.save(producto3)
}
test()

app.get('/productos', async (req, res)=>{
    const products = await productos()
    res.send(products)
})

app.get('/productoRandom', async (req,res)=> {
    const productRandom = await productoRandom()
    res.send(productRandom)
})


app.listen(port, (error)=>{
    error ?
    console.error(`Error al iniciar el servidor: ${error}`)
    :
    console.log(`Servidor escuchando puerto: ${port}`);
})
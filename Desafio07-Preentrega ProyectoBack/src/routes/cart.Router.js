const express = require('express')

const { Router } = express;
const carritosRouter = new Router();

const ContenedorArchivosCarritos = require('../contenedores/ContenedorArchivosCarritos');
const ContenedorArchivo = require('../contenedores/ContenedorArchivo');

const CartService = new ContenedorArchivosCarritos("./db/dbCarritos.json");
const ProductService = new ContenedorArchivo("./db/dbProductos.json");


function soloAdmins(req, res, next) {
    if (req.query.rol !== "admin") {
        res.status(500).send("Usuario no autorizado para acceder a esta caracteristica")
    }
    next()
}


carritosRouter.get('/', (req, res)=>{
    CartService.getAll().then(cart => {        
        res.json(cart)
    })
})

carritosRouter.post('/', soloAdmins, async (req, res) => {
    
    let today = Date.now();
    let fecha = new Date().toLocaleDateString()
    let id = Math.floor((1 + Math.random()) * 0x10000) 
    let newCart ={
        id: id,
        timestamp: today, 
        creationDate: fecha,
        products: []
    }

    CartService.postNewCart(newCart).then(CartService => {
        res.json(newCart.id)
    })
})

carritosRouter.delete('/:id', async (req, res) => {
    res.json(await CartService.deleteCart(req.params.id));
})

carritosRouter.get('/:id/products', async (req, res) => {
    res.json(await CartService.getById(parseInt(req.params.id)));
})

carritosRouter.post('/:idCart/:idProduct/products', async (req, res) => {
    const newProduct = await ProductService.listar(req.params.idProduct);
    res.json(await CartService.update(newProduct, parseInt(req.params.idCart)))
})

carritosRouter.delete('/:idCart/:idProduct/products', async (req, res) => {
    res.json(await CartService.deleteObjInCart(parseInt(req.params.idCart), parseInt(req.params.idProduct)));
})

module.exports = carritosRouter
const express = require('express')

const { Router } = express;
const productosRouter = new Router();

const ContenedorArchivo = require('../contenedores/ContenedorArchivo');

const ProductService = new ContenedorArchivo("./db/dbProductos.json");


function soloAdmins(req, res, next) {
    if (req.query.rol !== "admin") {
        res.status(500).send("Usuario no autorizado para acceder a esta caracteristica")
    }
    next()
}


productosRouter.get('/', async (req, res) => {
    res.json(await ProductService.listarAll());
})

productosRouter.get('/:id', async (req, res) => {
    res.json(await ProductService.listar(req.params.id));
})

productosRouter.post('/', soloAdmins, async (req, res) => {
    let idProductoNuevo = await ProductService.guardar(req.body)
    res.send({productoNuevo : idProductoNuevo});
})

productosRouter.put('/:id', soloAdmins, async (req, res) => {
    const data = req.body;
    res.json(await ProductService.actualizar(data, parseInt(req.params.id)))
})

productosRouter.delete('/:id', soloAdmins, async (req, res) => {
    res.json(await ProductService.borrar(req.params.id));
})


module.exports = productosRouter;
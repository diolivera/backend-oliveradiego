
const Contenedor = require('./Contenedor')

const container = new Contenedor("./productos.txt")

const product1 = {
        title: "Camisetas",
        price: 15000,
        thumbnail: "https://www.mercadolibre.com.ar/",
        }
const product2 = {
        title: "Botines",
        price: 20000,
        thumbnail: "https://www.mercadolibre.com.ar/",
        }

const test = async () => {
    console.log(await container.save(product1))
    console.log(await container.save(product2))
    console.log(await container.getAll())
    console.log(await container.getById(2))
    console.log(await container.getById(3))
    await container.deleteById(2)
    console.log(await container.getById(2))
    await container.deleteAll()
}
        
test()
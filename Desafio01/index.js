class Usuario{
    constructor(nombre,apellido,libros,mascotas){
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }
    getFullName(){
        return console.log(`${this.nombre} ${this.apellido}`)
    }
    addMascota(mascota){
        this.mascotas.push(mascota)
    }
    countMascotas(){
        return console.log(this.mascotas.length)
    }
    addBook(nombre, autor){
        this.libros.push({nombre: nombre, autor: autor})
    }
    getBookNames(){
        const bookNames = []
        this.libros.forEach(libro => {
            bookNames.push(libro.nombre)
        })
        return console.log(bookNames)
    }
}

const usuario1 = new Usuario("Diego", "Olivera", [{nombre: "Fuego y Sangre", autor: "George R. R. Martin"}], ["Ozil"])
usuario1.getFullName()
usuario1.addMascota("Blanqui")
usuario1.countMascotas()
usuario1.addBook("El código Da Vinci", "El Principito", "20 mil leguas de viaje submarino")
usuario1.getBookNames()
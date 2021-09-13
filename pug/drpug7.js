const express = require('express')

const prod = require('./api/productos')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('views', __dirname+'/views');
app.set('view engine','pug')


//Rutas
app.use('/api/productos', require('./rutas/rutas'))


app.get('/',(req,res)=>{
  res.render('form.pug')
})

app.get('/productos/vista',(req,res)=>{
  const productos = prod.getAll()
  res.render('vista.pug',{ productos: productos, hayProductos:  productos.length ? true : false})
})

// Middleware para manejar errores
app.use((error, req, res, next) => {
  res.status(error.code || 500).json({ error : error.message })
})

const puerto = 8080

const server = app.listen(puerto, () => {
  console.log(`servidor escuchando en http://localhost:${puerto}`)
})

server.on('error', error => {
  console.log('error en el servidor:', error)
})

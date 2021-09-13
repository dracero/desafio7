const express = require('express')
const handlebars = require('express-handlebars')


const prod = require('./api/productos')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('hbs',handlebars({
  extname: '.hbs',
  layoutsDir: __dirname + '/views/layouts', 
}))
app.set('view engine','hbs')
app.set('views', './views');


//Rutas
app.use('/api/productos', require('./rutas/rutas'))


app.get('/',(req,res)=>{
  res.render('form',{layout: 'index'})
})

app.get('/productos/vista',(req,res)=>{
  const productos = prod.getAll()
  console.log(productos)
  res.render('vista',{ layout: 'index',productos: productos, hayProductos:  productos.length ? true : false})
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

const express = require('express')

const router = express.Router()
const productos = require('../api/productos')

router.get('/listar', (req, res, next) => {
  const prods = productos.getAll()
  if (prods.length === 0) {
    next({ code: 404, message: 'No hay productos cargados' })
  }
  res.json(prods)
})

router.get('/listar/:id', (req, res, next) => {
  const { id } = req.params
  const producto = productos.getById(id)
  if (producto === undefined)
    next({ code: 404, message: 'No se encontro el producto' })
  res.json(producto)
})

router.post('/guardar', (req, res) => {
  const producto = productos.save(
    req.body.title,
    req.body.price,
    req.body.thumbnail
  )
  res.redirect('/')
})

router.put('/actualizar/:id', (req, res) => {
    console.log(req.query);
	  const { id } = req.params
	  const producto = productos.update(
		id,
		req.query.title,
		req.query.price,
		req.query.thumbnail
	  )
	  if (producto === undefined) throw new Error('producto no encontrado')
	  res.json(producto)
})

router.delete('/borrar/:id', (req, res) => {
  const { id } = req.params
	const prods = productos.delById(id)
	if (prods === undefined) throw new Error('producto no encontrado')
	res.json(prods)
})

module.exports = router

const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const manager = new ProductManager();

app.get('/products', async (req, res) => {
  const limit = req.query.limit; // Obtener el valor del parámetro de consulta "limit"

  try {
    const products = await manager.getProduct(); // Obtener todos los productos del gestor

    if (limit) {
      const limitedProducts = products.slice(0, limit); // Limitar el número de productos según el valor recibido
      res.json(limitedProducts); // Devolver los productos limitados como respuesta en formato JSON
    } else {
      res.json(products); // Devolver todos los productos como respuesta en formato JSON
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

app.get('/products/:pid', async (req, res) => {
  const pid = req.params.pid; // Obtener el valor del parámetro de ruta "pid"

  try {
    const product = await manager.getProductById(pid); // Obtener el producto por su id

    if (product) {
      res.json(product); // Devolver el producto solicitado como respuesta en formato JSON
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Servidor Express en ejecución en el puerto ${PORT}`);
});

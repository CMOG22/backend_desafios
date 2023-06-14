const fs = require('fs');
const path = require('path');

class ProductManager {
  constructor() {
    this.productsFilePath = path.join(__dirname, 'datos', 'productos.txt'); // Ruta al archivo "productos.txt"
    this.loadProductsFromFile(); // Cargar los productos desde el archivo al iniciar la clase
    this.productId = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1; // Inicializar el contador de id en base al último producto existente
  }

  addProduct(product) {
    // Validar que todos los campos sean obligatorios
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      console.log("Todos los campos son obligatorios");
      return;
    }

    // Validar que no se repita el campo "code"
    const existingProduct = this.products.find((p) => p.code === product.code);
    if (existingProduct) {
      console.log(`El producto con código ${product.code} ya existe`);
      return;
    }

    product.id = this.productId++; // Asignar el id actual y luego incrementar para el siguiente producto
    this.products.push(product); // Agregar el producto al arreglo

    this.saveProductsToFile(); // Guardar los productos en el archivo después de agregar uno nuevo
  }

  getProduct() {
    return this.products; // Devolver el arreglo de productos
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      return product; // Devolver el producto si se encuentra por id
    } else {
      console.log("Producto no encontrado");
    }
  }

  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.products[index] = { ...updatedProduct, id };
      this.saveProductsToFile(); // Guardar los productos actualizados en el archivo
      console.log("Producto actualizado correctamente");
    } else {
      console.log("Producto no encontrado");
    }
  }

  deleteProduct(id) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveProductsToFile(); // Guardar los productos actualizados en el archivo
      console.log("Producto eliminado correctamente");
    } else {
      console.log("Producto no encontrado");
    }
  }

  loadProductsFromFile() {
    try {
      const data = fs.readFileSync(this.productsFilePath, 'utf8');
      this.products = JSON.parse(data);
    } catch (err) {
      this.products = []; // Si ocurre un error al cargar el archivo, inicializar el arreglo de productos vacío
    }
  }

  saveProductsToFile() {
    // Verificar si la carpeta "datos" existe, si no, crearla
    const folderPath = path.dirname(this.productsFilePath);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    const productsData = JSON.stringify(this.products, null, 2); // Convertir los productos a una cadena de texto en formato JSON

    // Agregar la fecha de actualización al contenido del archivo
    const currentDate = new Date();
    const updatedData = `Última actualización: ${currentDate.toISOString()}\n\n${productsData}`;

    // Guardar los datos en el archivo productos.txt
    fs.writeFile(this.productsFilePath, updatedData, (err) => {
      if (err) {
        console.log('Error al guardar los productos:', err);
      } else {
        console.log('Los productos se han guardado correctamente.');
      }
    });
  }
}

const manager = new ProductManager();

const product1 = {
  title: "Poco X3 1",
  description: "Smartphone de gama media alta a precio de gama baja",
  price: 6999.99,
  thumbnail: "ruta-imagen-1.jpg",
  code: "001",
  stock: 100,
};

manager.addProduct(product1); // Agregar el producto al gestor

console.log(product1); // Imprimir el producto con el campo id asignado automáticamente

const product2 = {
  title: "Asus f15 2023",
  description: "Laptop Gamer Core i5",
  price: 21999.99,
  thumbnail: "ruta-imagen-2.jpg",
  code: "002",
  stock: 50,
};

manager.addProduct(product2); // Agregar otro producto al gestor

console.log(product2); // Imprimir el producto con el campo id asignado automáticamente

const products = manager.getProduct(); // Obtener todos los productos del gestor
console.log(products); // Imprimir el arreglo de productos

const updatedProduct = {
  title: "Poco X3 Pro",
  description: "Smartphone de gama media-alta con gran rendimiento",
  price: 7999.99,
  thumbnail: "ruta-imagen-3.jpg",
  code: "001",
  stock: 80,
};

manager.updateProduct(1, updatedProduct); // Actualizar el producto con id 1

manager.deleteProduct(2); // Eliminar el producto con id 2

console.log(manager.getProduct()); // Imprimir el arreglo de productos actualizado

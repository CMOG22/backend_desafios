class ProductManager {
    constructor() {
      this.products = []; // Arreglo para almacenar los productos
      this.productId = 1; // Inicializar el contador de id en 1
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
  }
  
  // Ejemplo de uso:
  const manager = new ProductManager();
  
  const product1 = {
    id: null, // El campo id se inicializa como null y se llenará automáticamente en el método addProduct
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
    id: null, // El campo id se inicializa como null y se llenará automáticamente en el método addProduct
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
const productos = {
    "Camisa": 120000,
    "Gorra": 60000,
    "Chaqueta": 240000
};

let carrito = {};
let total = 0;

function mostrarBienvenida() {
    alert("¡Bienvenido a la tienda virtual de Bordamita!");
}


function mostrarProductos() {
    const contenedorProductos = document.getElementById("productos");
    contenedorProductos.innerHTML = ""; 

    for (const [producto, precio] of Object.entries(productos)) {
        const elementoProducto = document.createElement("div");
        elementoProducto.innerHTML = `
            <h3>${producto}</h3>
            <p>Precio: ${precio.toLocaleString('es-CO')} COP</p>
            <button onclick="agregarProducto('${producto}')">Agregar</button>
        `;
    contenedorProductos.appendChild(elementoProducto);
    }
}


function agregarProducto(producto) {
    const cantidadStr = prompt(`¿Cuántas unidades de ${producto} desea?`);
    const cantidad = parseInt(cantidadStr);

    if (!isNaN(cantidad) && cantidad > 0) {
        if (!carrito[producto]) {
        carrito[producto] = 0;
    }

    carrito[producto] += cantidad;
    const precio = productos[producto];
    const subtotal = precio * cantidad;
    total += subtotal;

    actualizarCarrito();
        alert(`Se agregaron ${cantidad} unidades de ${producto} al carrito.`);
    } else {
        alert("Cantidad no válida. Ingrese un número mayor a 0.");
    }
}

function actualizarCarrito() {
    const totalProducto = document.getElementById("total-producto");
    const totalCantidad = document.getElementById("total-cantidad");
    const totalSubtotal = document.getElementById("total-subtotal");

    totalProducto.textContent = Object.keys(carrito).join(", ");
    totalCantidad.textContent = Object.values(carrito).join(", ");
    totalSubtotal.textContent = total.toLocaleString('es-CO') + " COP";
}


function calcularDescuento(cantidad, precio) {
    if (cantidad >= 5) {
      const descuento = precio * 0.1; // 10% de descuento
    return precio - descuento;
    } else {
    return precio;
    }
}


function mostrarPrecioFinal(producto, precio, cantidad) {
    const precioConDescuento = calcularDescuento(cantidad, precio);
    const totalConDescuento = precioConDescuento * cantidad;

    console.log(`Producto: ${producto}`);
    console.log(`Precio unitario: ${precio.toLocaleString('es-CO')} COP`);
    console.log(`Cantidad: ${cantidad}`);
    console.log(`Precio con descuento: ${precioConDescuento.toLocaleString('es-CO')} COP`);
    console.log(`Total con descuento: ${totalConDescuento.toLocaleString('es-CO')} COP`);
}


function eliminarProducto(producto) {
    if (carrito[producto]) {
        delete carrito[producto];
        actualizarCarrito();
        alert(`El producto ${producto} ha sido eliminado del carrito.`);
    } else {
        alert(`El producto ${producto} no está en el carrito.`);
    }
}


function vaciarCarrito() {
    carrito = {};
    total = 0;
    actualizarCarrito();
    alert("El carrito ha sido vaciado.");
}


function mostrarResumenCompra() {
    if (Object.keys(carrito).length === 0) {
    alert("El carrito está vacío.");
    return;
    }

    console.log("**Resumen de compra**");
    for (const [producto, cantidad] of Object.entries(carrito)) {
    const precio = productos[producto];
    mostrarPrecioFinal(producto, precio, cantidad);
    }
    console.log(`Total: ${total.toLocaleString('es-CO')} COP`);
}


mostrarBienvenida();
mostrarProductos();
const productos = {
    "Camisa": 120000,
    "Gorra": 60000,
    "Chaqueta": 240000
};

let carrito = {};
let total = 0;

document.addEventListener("DOMContentLoaded", function() {
    mostrarBienvenida();
    mostrarProductos();
    cargarCarritoDesdeStorage();
});

function mostrarBienvenida() {
    alert("¡Bienvenido a la tienda virtual de Bordamita!");
}

function mostrarProductos() {
    const contenedorProductos = document.getElementById("productos");
    contenedorProductos.innerHTML = "";

    for (const [producto, precio] of Object.entries(productos)) {
        const elementoProducto = document.createElement("div");
        elementoProducto.classList.add("producto");
        elementoProducto.innerHTML = `
            <h3>${producto}</h3>
            <p>Precio: ${precio.toLocaleString('es-CO')} COP</p>
            <button class="btn-agregar" data-producto="${producto}">Agregar</button>
        `;
        contenedorProductos.appendChild(elementoProducto);
    }

    const botonesAgregar = document.querySelectorAll(".btn-agregar");
    botonesAgregar.forEach(btn => {
        btn.addEventListener("click", () => {
            const producto = btn.getAttribute("data-producto");
            agregarProducto(producto);
        });
    });
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
        const subtotal = calcularSubtotal(precio, cantidad);
        total += subtotal;

        actualizarCarrito();
        guardarCarritoEnStorage();
        alert(`Se agregaron ${cantidad} unidades de ${producto} al carrito.`);
    } else {
        alert("Cantidad no válida. Ingrese un número mayor a 0.");
    }
}

function calcularSubtotal(precio, cantidad) {
    const precioConDescuento = calcularDescuento(cantidad, precio);
    return precioConDescuento * cantidad;
}

function actualizarCarrito() {
    const tbodyCarrito = document.getElementById("tbody-carrito");
    tbodyCarrito.innerHTML = ""; // Limpiamos el contenido previo

    for (const [producto, cantidad] of Object.entries(carrito)) {
        const precio = productos[producto];
        const subtotal = calcularSubtotal(precio, cantidad);

        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${producto}</td>
            <td>${cantidad}</td>
            <td>${subtotal.toLocaleString('es-CO')} COP</td>
        `;
        tbodyCarrito.appendChild(fila);
    }

    const totalCarrito = document.getElementById("total-carrito");
    totalCarrito.textContent = total.toLocaleString('es-CO') + " COP";
}

function guardarCarritoEnStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("total", total.toString());
}

function cargarCarritoDesdeStorage() {
    const carritoGuardado = localStorage.getItem("carrito");
    const totalGuardado = localStorage.getItem("total");

    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        total = parseInt(totalGuardado) || 0;
        actualizarCarrito();
    }
}

function vaciarCarrito() {
    carrito = {};
    total = 0;
    actualizarCarrito();
    guardarCarritoEnStorage();
    document.getElementById("resumen-compra-detalle").innerHTML = ""; // Limpiar resumen de compra
    alert("El carrito ha sido vaciado.");
}

function mostrarResumenCompra() {
    const resumenCompraDetalle = document.getElementById("resumen-compra-detalle");
    resumenCompraDetalle.innerHTML = ""; // Limpiamos el contenido previo

    if (Object.keys(carrito).length === 0) {
        resumenCompraDetalle.textContent = "El carrito está vacío.";
        return;
    }

    const fragmento = document.createDocumentFragment();

    for (const [producto, cantidad] of Object.entries(carrito)) {
        const precio = productos[producto];
        const subtotal = calcularSubtotal(precio, cantidad);

        const itemResumen = document.createElement("div");
        itemResumen.classList.add("item-resumen");
        itemResumen.innerHTML = `
            <p><strong>Producto:</strong> ${producto}</p>
            <p><strong>Cantidad:</strong> ${cantidad}</p>
            <p><strong>Precio unitario:</strong> ${precio.toLocaleString('es-CO')} COP</p>
            <p><strong>Subtotal:</strong> ${subtotal.toLocaleString('es-CO')} COP</p>
            <hr>
        `;
        fragmento.appendChild(itemResumen);
    }

    resumenCompraDetalle.appendChild(fragmento);
    const totalCompra = document.createElement("p");
    totalCompra.innerHTML = `<strong>Total: </strong>${total.toLocaleString('es-CO')} COP`;
    resumenCompraDetalle.appendChild(totalCompra);
}

function calcularDescuento(cantidad, precio) {
    if (cantidad >= 5) {
        const descuento = precio * 0.1; // 10% de descuento
        return precio - descuento;
    } else {
        return precio;
    }
}

const btnVaciarCarrito = document.getElementById("vaciar-carrito");
btnVaciarCarrito.addEventListener("click", vaciarCarrito);

const btnResumenCompra = document.getElementById("resumen-compra");
btnResumenCompra.addEventListener("click", mostrarResumenCompra);
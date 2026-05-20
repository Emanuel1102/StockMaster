import { addProduct } from './functions/addProduct';
import { getData } from './services/products.service';
import './styles/globals.css';

const endpoint = "http://localhost:3000/productos"
getData(endpoint)

const form = document.getElementById("product-form")
const productName = document.getElementById("nombre")
const unitaryPrice = document.getElementById("precio")
const stock = document.getElementById("stock")
const description = document.getElementById("descripcion")

form.addEventListener("submit", (event) => {
    event.preventDefault()

    const newProduct = {
        name: productName.value.toLowerCase().trim(),
        price: Number(unitaryPrice.value),
        stock: Number(stock.value),
        description: description.value.toLowerCase().trim()
    }

    addProduct(newProduct, endpoint)

    event.target.reset()
})







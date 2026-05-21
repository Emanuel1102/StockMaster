import { renderProducts } from "../functions/renderProducts"
import { totalProducts, totalInventory, statLowProducts } from "../functions/updateStadistics"

export const endpoint = "http://localhost:3000/productos"

export async function getData() {
    const response = await fetch(endpoint)
    const products = await response.json()
    renderProducts(products)
    totalProducts(products)
    totalInventory(products)
    statLowProducts(products)
}
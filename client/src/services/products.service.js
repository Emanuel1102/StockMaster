import { renderProducts } from "../functions/renderProducts"
import { totalProducts, totalInventory, statLowProducts } from "../functions/updateStadistics"

export async function getData(url) {
    const response = await fetch(url)
    const products = await response.json()
    renderProducts(products)
    totalProducts(products)
    totalInventory(products)
    statLowProducts(products)
}
import { renderProducts } from "../functions/renderProducts"
import { searchProduct } from "../functions/searchProduct"
import { totalProducts, totalInventory, statLowProducts } from "../functions/updateStadistics"

export const endpoint = "http://localhost:3000/productos"

export async function getData() {
    const response = await fetch(endpoint)
    const products = await response.json()
    totalProducts(products)
    totalInventory(products)
    statLowProducts(products)
    renderProducts(products)
    const input = document.getElementById('input-search')

    input.addEventListener('input', ({target})=>{
        if(!target.value){
            renderProducts(products)
        }else{
            searchProduct(target.value.trim(), products)
        }
    })
}
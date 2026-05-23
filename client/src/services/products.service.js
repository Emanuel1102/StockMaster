import { pagination } from "../functions/pagination"
import { renderProducts } from "../functions/renderProducts"
import { searchProduct } from "../functions/searchProduct"
import updateStadistics from "../functions/updateStadistics"

export const endpoint = "http://localhost:3000/productos"

const btnNext = document.getElementById('btn-next')
const btnPrev = document.getElementById('btn-prev')
const showCurrentPage = document.getElementById('show-quantity')

let currentPage = 1


export async function getData(url = `${endpoint}?_page=${currentPage}&_per_page=5`) {

    const res = await fetch(endpoint)
    const totalProducts = await res.json()
    updateStadistics(totalProducts)
    

    const pages = await fetch(url)
    const productPages = await pages.json()
    const { data, next, prev, pages:totalPages } = productPages
    renderProducts(data)
    showCurrentPage.textContent = `Página ${currentPage} de ${totalPages}, ${data.length} producto(s)`

    btnNext.disabled = next == null
    btnPrev.disabled = prev == null
    if (btnNext.disabled) {
        btnNext.classList.add('cursor-not-allowed')
        btnNext.classList.remove('cursor-pointer')
    }else{
        btnNext.classList.add('cursor-pointer')
        btnNext.classList.remove('cursor-not-allowed')
        

    }
    
    if (btnPrev.disabled) {
        btnPrev.classList.add('cursor-not-allowed')
        btnPrev.classList.remove('cursor-pointer')
    }else{
        btnPrev.classList.add('cursor-pointer')
        btnPrev.classList.remove('cursor-not-allowed')

    }

    const input = document.getElementById('input-search')
    input.addEventListener('input', ({target})=>{
        if(!target.value){
            renderProducts(data)
        }else{
            searchProduct(target.value.trim(), totalProducts)
        }
    })

}


btnNext.addEventListener('click', ()=>{
    currentPage = pagination('+')
    getData()     
})    

btnPrev.addEventListener('click', ()=>{
    currentPage = pagination('-')
    getData()    
})

import { endpoint } from "../services/products.service"

const statTotal = document.getElementById('stat-total')
const statValue = document.getElementById('stat-value')
const statLow = document.getElementById('stat-low')

const totalProducts = (products) => {
    statTotal.textContent = products.length
}

const totalInventory = (products) => {
    let total = products.reduce((acc, product)=>{
        return acc + product.price
    }, 0)
    statValue.textContent = `$${total}`
}

const statLowProducts = (products) => {
    let total = products.reduce((acc, product)=>{
        if(product.stock <= 3){
            acc += 1
        }
        return acc
    }, 0)
    statLow.textContent = total
}

const updateStadistics = async (statToUpdate) => {  
    totalProducts(statToUpdate)
    totalInventory(statToUpdate)
    statLowProducts(statToUpdate)
}

export default updateStadistics

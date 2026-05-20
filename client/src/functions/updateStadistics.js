const statTotal = document.getElementById('stat-total')
const statValue = document.getElementById('stat-value')
const statLow = document.getElementById('stat-low')

export const totalProducts = (products) => {
    statTotal.textContent = products.length
}

export const totalInventory = (products) => {
    let total = products.reduce((acc, product)=>{
        return acc + product.price
    }, 0)
    statValue.textContent = `$${total}`
}

export const statLowProducts = (products) => {
    let total = products.reduce((acc, product)=>{
        if(product.stock <= 3){
            acc += 1
        }
        return acc
    }, 0)
    statLow.textContent = total
}

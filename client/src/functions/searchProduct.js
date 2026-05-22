import { renderProducts } from "./renderProducts"

export const searchProduct = (text, products) => {
    const search = products.filter(p => {
        return p.name.includes(text)
    })
    renderProducts(search)
}




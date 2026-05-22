import { endpoint, getData } from "../services/products.service"

export const updateProduct = async (id, product) => {
    await fetch(`${endpoint}/${id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'aplication/json'
        },
        body: JSON.stringify(product)
    })

    getData()

}
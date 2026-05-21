import { endpoint, getData } from "../services/products.service";

export const deleteProduct = async (id) => {
    const response = await fetch(`${endpoint}/${id}`, {
        method: 'DELETE'
    })

    getData()
}


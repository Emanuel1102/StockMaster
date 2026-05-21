import { endpoint, getData } from "../services/products.service"
import { successAlert } from "../utils/alerts";

export async function addProduct(product) {
    const response = await fetch(endpoint,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify(product)
        }
    )

    if (response.ok) {
        getData()
        successAlert("Producto agregado exitosamente")
    }    
}
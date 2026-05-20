import { getData } from "../services/products.service"
import { successAlert } from "../utils/alerts";

export async function addProduct(product, url) {
    const response = await fetch(url,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify(product)
        }
    )

    if (response.ok) {
        getData(url)
        successAlert("Producto agregado exitosamente")
    }    
}
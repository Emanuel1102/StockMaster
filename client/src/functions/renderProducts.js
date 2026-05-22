import { deleteProduct } from "./daleteProduct"
import { updateProduct } from "./updateProduct"

export function renderProducts(products) {
    const productsList = document.getElementById("inventory-list")
    productsList.innerHTML = ``

    for (const product of products) {
        const { id, name, description, stock, price } = product
        productsList.innerHTML += `
        <tr class="hover:bg-slate-50/30 transition-colors group">
            <td class="px-8 py-6">
                <div class="flex flex-col">
                <span class="font-bold text-slate-900">${name}</span>
                <span class="text-xs text-slate-400 mt-1 line-clamp-1 max-w-[300px]">${description}</span>
                </div>
            </td>
            <td class="px-8 py-6 text-center">
                <span class="px-4 py-1.5 ${stock <= 3? 'bg-rose-50 text-rose-600 border-rose-100': 'bg-emerald-50 text-emerald-600 border-emerald-100'} rounded-xl text-[10px] font-black uppercase tracking-tight border ">${stock} unidades</span>
            </td>
            <td class="px-8 py-6 text-center font-bold text-slate-900">COP ${price}</td>
            <td class="px-8 py-6 text-right">
                <div class="flex justify-end gap-3">

                <button  data-id="${id}" class="btn-update w-10 h-10 flex items-center justify-center text-indigo-600 hover:bg-indigo-50 cursor-pointer rounded-xl transition-all border border-transparent hover:border-indigo-100" title="Editar">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </button>

                <dialog class="update-modal z-10 w-full h-full bg-transparent items-center justify-center">
                    <form class="update-form border border-indigo rounded-3xl bg-indigo-200 p-8 space-y-6 w-100 ">
                        <h1 class="text-center text-2xl">Actualizar producto</h1>
                        <div>
                            <label class="block text-sm font-bold text-slate-700 mb-2">Nombre del Producto</label>
                            <input type="text" id="nombre" value="${name}" name="nombre" required class="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all bg-slate-50/30">
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-bold text-slate-700 mb-2">Precio ($)</label>
                                <input type="number" step="0.01" id="precio" value=${price} name="precio" required  class="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all bg-slate-50/30">
                            </div>
                            <div>
                            <label class="block text-sm font-bold text-slate-700 mb-2">Stock Actual</label>
                            <input type="number" id="stock" value=${stock} name="stock" required class="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all bg-slate-50/30">
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-bold text-slate-700 mb-2">Descripción</label>
                            <textarea id="descripcion" value="descripcion" name="descripcion" rows="4" class="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-none bg-slate-50/30">${description}</textarea>
                        </div>

                        <div class="pt-2 flex flex-col gap-3">
                            <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 px-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] uppercase tracking-wider text-sm cursor-pointer">
                            confirmar
                            </button>
                            <button type="reset" class="btn-close w-full px-4 py-3 border border-slate-200 text-slate-500 font-bold rounded-2xl hover:bg-slate-50 transition-all text-xs uppercase tracking-widest cursor-pointer">
                            Cancelar
                            </button>
                        </div>
                    </form>
                </dialog>

                <button data-id="${id}"  class="btn-delete w-10 h-10 flex items-center justify-center text-rose-600 hover:bg-rose-50 cursor-pointer rounded-xl transition-all border border-transparent hover:border-rose-100" title="Eliminar">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
                </div>
            </td>
        </tr>
        `
    }

    const [...deleteButtons] = document.getElementsByClassName("btn-delete")

    deleteButtons.forEach((btn)=>{
        const id = btn.dataset.id
        const { name, stock } = products.find(p => p.id === id)
        btn.addEventListener('click', ()=>{
            const confirmDelete = confirm(`¿Seguro que quieres eliminar ${name}?, Aún quedan ${stock} unidades`)
            confirmDelete && deleteProduct(id)
        })  
    })

    const [...openButtons] = document.getElementsByClassName('btn-update')
    const [...closeButtons] = document.getElementsByClassName('btn-close')

    let idUpdate
    openButtons.forEach(btn=>{
        btn.addEventListener('click', function(){
            idUpdate = this.dataset.id            
            const modal = this.nextElementSibling
            modal.showModal()
        })
    })

    const [...updateForms] = document.getElementsByClassName('update-form')
    updateForms.forEach(form=>{
        const newName = form.querySelector('[name="nombre"]')
        const newPrice = form.querySelector('[name="precio"]')
        const newStock = form.querySelector('[name="stock"]')
        const newDecription = form.querySelector('[name="descripcion"]')
        form.addEventListener('submit', function(e){
            e.preventDefault()
            const updatedProduct = {
                name: newName.value.toLowerCase().trim(),
                price: Number(newPrice.value),
                stock: Number(newStock.value),
                description: newDecription.value.trim()
            }

            updateProduct(idUpdate, updatedProduct)

            this.closest('.update-modal').close()
        })
        
    })

    closeButtons.forEach((btn) => {
        btn.addEventListener("click", function () {
            const modal = this.closest(".update-modal");
            modal.close();
        });
    });
    
    
}
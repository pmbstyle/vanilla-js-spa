// Path: '/edit?id={id}': Product edit page
async function initEdit(id) {
    if(allProducts.length == 0 && !erased) {
        let items = await fetchData()
		products = items.products
		allProducts = items.products
    }

    let product = allProducts.find(p => p.id == id)
    document.querySelector('#form_title').value = product.title
    document.querySelector('#form_description').value = product.description
    document.querySelector('#form_price').value = product.price
    document.querySelector('#form_brand').value = product.brand
    newProduct = product

    var submitButton = document.querySelector('#form_edit')
    
    fileInputInit()

    //form submit handler
    submitButton.addEventListener('click', async function () {
        let valid = await validateForm()
        if (valid) {
            await editProduct()
        } else {
            showErrors()
        }
    })
    
}

async function editProduct() {
    newProduct.title = document.querySelector('#form_title').value
    newProduct.description = document.querySelector('#form_description').value
    newProduct.price = document.querySelector('#form_price').value
    newProduct.brand = document.querySelector('#form_brand').value
    if(newProduct.thumbnail.length == 0) {
        newProduct.thumbnail = 'https://via.placeholder.com/300x300'
    }

    //update product
    let index = allProducts.findIndex(p => p.id == newProduct.id)
    allProducts[index] = newProduct
    products = allProducts
    onRouteChange('/')
    showSuccess('Product updated successfully')
}
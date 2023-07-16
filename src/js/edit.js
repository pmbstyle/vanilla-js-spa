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
    var fileInput = document.querySelector('#form_thumbnail')

    // product image input handler
    fileInput.addEventListener('change', function (event) {
        let file = event.target.files[0]
        let valid = true
        if (file.type != 'image/jpeg' && file.type != 'image/png') {
            validationErrors.thumbnail = 'File must be an image'
            valid = false
            event.target.files = null
        }
        if (file.size > 1000000) {
            validationErrors.thumbnail = 'File must be less than 1MB'
            valid = false
            event.target.files = null
        }
        if (valid) {
            let reader = new FileReader()
            reader.onload = function (e) {
                newProduct.thumbnail = e.target.result
            }
            reader.readAsDataURL(file)
        } else {
            showErrors()
        }

    })

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
}
// Path: '/create': Product create page

async function initCreate() {
    newProduct = {
        id: 0,
        title: '',
        description: '',
        price: '',
        brand: '',
        thumbnail: ''
    }
    var submitButton = document.querySelector('#form_create')

    if(allProducts.length == 0 && !erased) {
        let items = await fetchData()
		products = items.products
		allProducts = items.products
    }

    fileInputInit()

    //form submit handler
    submitButton.addEventListener('click', async function () {
        let valid = await validateForm()
        if (valid) {
            await createProduct()
        } else {
            showErrors()
        }
    })

}

async function createProduct() {
    newProduct.title = document.querySelector('#form_title').value
    newProduct.description = document.querySelector('#form_description').value
    newProduct.price = document.querySelector('#form_price').value
    newProduct.brand = document.querySelector('#form_brand').value
    if(newProduct.thumbnail.length == 0) {
        newProduct.thumbnail = 'https://via.placeholder.com/300x300'
    }
    if(allProducts.length > 0) {
        //get max id from allProducts
        let maxId = Math.max.apply(Math, allProducts.map(function (product) {
            return product.id
        }))
        newProduct.id = maxId + 1
    } else {
        newProduct.id = 0
    }
    
    //add new product to allProducts array
    allProducts.push(newProduct)
    products = allProducts
    onRouteChange('/')
    showSuccess('Product created successfully')
}
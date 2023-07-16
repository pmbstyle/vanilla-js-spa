var newProduct = {
    id: 0,
    title: '',
    description: '',
    price: '',
    brand: '',
    thumbnail: ''
}

var validationErrors = {
    title: '',
    description: '',
    price: '',
    brand: '',
    thumbnail: ''
}

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
    var fileInput = document.querySelector('#form_thumbnail')

    if(allProducts.length == 0 && !erased) {
        let items = await fetchData()
		products = items.products
		allProducts = items.products
    }

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
            await createProduct()
        } else {
            showErrors()
        }
    })

}

async function validateForm() {
    validationErrors = {
        title: '',
        description: '',
        price: '',
        brand: '',
        thumbnail: ''
    }

    var titleInput = document.querySelector('#form_title')
    var descriptionInput = document.querySelector('#form_description')
    var priceInput = document.querySelector('#form_price')
    var brandInput = document.querySelector('#form_brand')

    let valid = true

    if(titleInput.value.length == 0) {
        validationErrors.title = 'Title is required'
        valid = false
    }
    if(descriptionInput.value.length == 0) {
        validationErrors.description = 'Description is required'
        valid = false
    }
    if(priceInput.value.length == 0) {
        validationErrors.price = 'Price is required'
        valid = false
    } else if(priceInput.value == 0) {
        validationErrors.price = 'Price must be greater than 0'
        valid = false
    }
    if(brandInput.value.length == 0) {
        validationErrors.brand = 'Brand is required'
        valid = false
    }

    return valid
}

function showErrors() {
    for (var key in validationErrors) {
        let errorElement = document.querySelector('#form_error_' + key)
        errorElement.innerHTML = validationErrors[key]
    }
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
}
//helper fns shared between create/edit views
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

function showSuccess(msg) {
    let successElement = document.getElementById('successToast')
    let msg_wrapper = successElement.querySelector('span')

    msg_wrapper.innerHTML = msg
    successElement.style.display = 'grid'

    setTimeout(function () {
        successElement.style.display = 'none'
    }, 2000)
}

function fileInputInit() {
    var fileInput = document.querySelector('#form_thumbnail')
    // product image input handler
    fileInput.addEventListener('change', function (event) {
        let file = event.target.files[0]
        let valid = true
        if (file.type != 'image/jpeg' && file.type != 'image/png') {
            validationErrors.thumbnail = 'File must be an image'
            valid = false
            let fileListArr = Array.from(fileInput.files)
            fileListArr.splice(1, 1)
            fileInput.value = ''
        }
        if (file.size > 1000000) {
            validationErrors.thumbnail = 'File must be less than 1MB'
            valid = false
            let fileListArr = Array.from(fileInput.files)
            fileListArr.splice(1, 1)
            fileInput.value = ''
        }
        if (valid) {
            validationErrors.thumbnail = ''
            let reader = new FileReader()
            reader.onload = function (e) {
                newProduct.thumbnail = e.target.result
            }
            reader.readAsDataURL(file)
        }

        showErrors()
    })
}
//global container
const app = document.getElementById('app')
var products = []

function pageInit(page) {
    switch (page) {
        case 'list':
            return initList()
        case 'create':
            return initCreate()
        case 'edit':
            return initEdit()
        default:
            return false
    }
}


async function fetchData() {
    let data = await fetch('https://dummyjson.com/products?limit=10')
        .then(res => {
            return res.json()
        })
        .catch(err => {
            console.log(err)
        })
    return data
}

// Path: '/': Product list page
async function initList() {
    let selectAll = document.querySelector('#selectAll')
    if(!products.length && !selectAll.checked) {
        let items = await fetchData()
        products = items.products
    }

    //create table tbody content
    let tableContent = ''
    products.forEach(product => {
        tableContent += `
            <tr>
                <td>
                    <label>
                        <input type="checkbox" class="checkbox" id="product-${product.id}" name="product-${product.id}"/>
                    </label>
                </td>
                <td>
                    <div class="flex items-center space-x-3">
                        <div class="avatar">
                            <div class="mask mask-squircle w-12 h-12">
                                <img src="${product.thumbnail}" alt="${product.title}" />
                            </div>
                        </div>
                        <div>
                            <div class="font-bold">${product.title}</div>
                            <div class="text-sm opacity-50">${product.brand}</div>
                        </div>
                    </div>
                </td>
                <td>
                    ${product.description}
                </td>
                <td>$${product.price}</td>
                <td>
                    <button onClick="onRouteChange('/edit/${product.id}')" class="btn btn-active btn-primary">Edit</button>
                </td>
            </tr>
        `
    })
    let tableBody = document.querySelector('#list table tbody')
    tableBody.innerHTML = tableContent
    selectAllInit()
}

// sort products by title, description, price
function sortProducts(sortBy,event) {
    let sortType = event.target.dataset.sortType
    let sortedProducts = []
    switch (sortBy) {
        case 'title':
            sortedProducts = products.sort((a, b) => {
                if (a.title < b.title) {
                    return -1
                }
                if (a.title > b.title) {
                    return 1
                }
                return 0
            })
            break
        case 'description':
            sortedProducts = products.sort((a, b) => {
                if (a.description < b.description) {
                    return -1
                }
                if (a.description > b.description) {
                    return 1
                }
                return 0
            })
            break
        case 'price':
            sortedProducts = products.sort((a, b) => {
                if (a.price < b.price) {
                    return -1
                }
                if (a.price > b.price) {
                    return 1
                }
                return 0
            })
            break
        default:
            sortedProducts = products
    }

    if (sortType === 'desc') {
        sortedProducts = sortedProducts.reverse()
        event.target.dataset.sortType = 'asc'
    } else {
        event.target.dataset.sortType = 'desc'
    }

    products = sortedProducts
    initList()
}

// select all checkbox
function selectAllInit() {
    let selectAll = document.querySelector('#selectAll')
    let checkboxes = document.querySelectorAll('#list table tbody .checkbox')
    selectAll.addEventListener('change', (event) => {
        checkboxes.forEach(checkbox => {
            checkbox.checked = event.target.checked
        })
    })
}

function showDeleteDialog() {
    deleteModal.showModal()
}

function deleteSelectedProducts() {
    let checkboxes = document.querySelectorAll('#list table tbody .checkbox')
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            let id = checkbox.id.split('-')[1]
            let index = products.findIndex(product => product.id == id)
            products.splice(index, 1)
        }
    })
    initList()
    deleteModal.close()
}

// Path: './create': Create product page
function initCreate() {
    console.log('create page')
    console.log(products)
}

// Path: './edit': Edit product page
function initEdit() {
    console.log('edit page')

    console.log(products)
}
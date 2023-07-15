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

// Path: '/'
// List page
async function initList() {
    if(!products.length) {
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
                        <input type="checkbox" class="checkbox" id="'product-'+${product.id}" name="'product-'+${product.id}"/>
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

}

// Path: './create'
// Create page
function initCreate() {
    console.log('create page')
    console.log(products)
}

// Path: './edit'
// Edit page
function initEdit() {
    console.log('edit page')

    console.log(products)
}
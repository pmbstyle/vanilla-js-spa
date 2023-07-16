//global container
const app = document.getElementById('app')
var allProducts = []
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
//global container
const app = document.getElementById('app')
var allProducts = []
var products = []
var erased = false

function pageInit(page, id = null) {
	switch (page) {
		case 'list':
			return initList()
		case 'create':
			return initCreate()
		case 'edit':
			return initEdit(id)
		default:
			return false
	}
}


async function fetchData() {
	erased = false
	let data = await fetch('https://dummyjson.com/products?limit=10')
		.then(res => {
			return res.json()
		})
		.catch(err => {
			console.log(err)
		})
	return data
}
// Path: '/': Product list page
async function initList(orig = false) {
	if(!orig) {
		let items = await fetchData()
		products = items.products
		allProducts = items.products
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
					<button onClick="onRouteChange('/edit/${product.id}')" class="btn btn-active btn-primary">
						<i class="fa-solid fa-pen"></i>
						Edit
					</button>
				</td>
			</tr>
		`
	})
	let tableBody = document.querySelector('#list table tbody')
	tableBody.innerHTML = tableContent

	//if initial load, init filters
	if(!orig) {
		initFilters()
	}
	selectAllInit()
}

function initFilters() {
	let brandSelect = document.querySelector('#filterBrands')
	let priceSelect = document.querySelector('#filterPrice')

	//dynamically create filter options
	let brands = []
	products.forEach(product => {
		if (!brands.includes(product.brand)) {
			brands.push(product.brand)
		}
	})
	let brandOptions = '<option value="" selected>All Brands</option>'
	brands.forEach(brand => {
		brandOptions += `<option value="${brand}">${brand}</option>`
	})

	brandSelect.innerHTML = brandOptions

	let prices = []
		products.forEach(product => {
			if (!prices.includes(product.price)) {
				prices.push(product.price)
			}
		})

	let priceOptions = '<option value="" selected>All Prices</option>'
	
	let priceRanges = []
	prices.forEach(price => {
		if (price < 100) {
			priceRanges.push(100)
		} else if (price < 500) {
			priceRanges.push(500)
		} else if (price < 1000) {
			priceRanges.push(1000)
		} else if (price < 2000) {
			priceRanges.push(2000)
		}
	})
	priceRanges = [...new Set(priceRanges)]
	priceRanges = priceRanges.sort((a, b) => a - b)
	priceRanges.forEach(price => {
		priceOptions += `<option value="${price}">Less then $${price}</option>`
	})
	priceSelect.innerHTML = priceOptions

	//add event listeners
	brandSelect.addEventListener('change', function (event) {
		filterProducts()
	})
	priceSelect.addEventListener('change', function (event) {
		filterProducts()
	})
}

// filter products by brand and/or price
function filterProducts() {
	let filteredProducts = []

	let brand = document.querySelector('#filterBrands').value
	let price = document.querySelector('#filterPrice').value

	if (brand.length > 0 && price.length > 0) {
		filteredProducts = allProducts.filter(product => product.brand == brand && product.price < price)
	} else if (brand.length > 0) {
		filteredProducts = allProducts.filter(product => product.brand == brand)
	} else if (price.length > 0) {
		filteredProducts = allProducts.filter(product => product.price < price)
	} else {
		filteredProducts = allProducts
	}
	products = filteredProducts
	initList(true)
}

// sort products by title, description, price
function sortProducts(sortBy,event) {
	let sortType = event.target.dataset.sortType
	let sortedProducts = []
	if(sortBy.length > 0) {
		sortedProducts = products.sort((a, b) => {
			if (a[sortBy] < b[sortBy]) {
				return -1
			}
			if (a[sortBy] > b[sortBy]) {
				return 1
			}
			return 0
		})
	} else {
		sortedProducts = products
	}

	if (sortType === 'desc') {
		sortedProducts = sortedProducts.reverse()
		event.target.dataset.sortType = 'asc'
	} else {
		event.target.dataset.sortType = 'desc'
	}

	products = sortedProducts
	initList(true)
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
	
	if(checkboxes.length == 0) return
	if(checkboxes.length == allProducts.length) {
		products = []
		allProducts = []
		initList(true)
		deleteModal.close()
		erased = true
		return
	}

	let indexes = []
	let allIndexes = []
	checkboxes.forEach(checkbox => {
		if (checkbox.checked) {
			let id = checkbox.id.split('-')[1]
			products.forEach((p,i) => {
				if(p.id == id) indexes.push(i)
			})
			allProducts.forEach((p,i) => {
				if(p.id == id) allIndexes.push(i)
			})
		}
	})
	indexes.forEach(index => {
		products.splice(index,1)
	})
	allIndexes.forEach(index => {
		allProducts.splice(index,1)
	})
	initList(true)
	deleteModal.close()
}
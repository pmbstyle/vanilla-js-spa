const routes = {
	'/' : 'list',
	'/create' : 'create',
	'/edit' : 'edit'
}

//get current path initial dom load
async function getDomContent(page) {
	app.innerHTML = ''
	page = !page ? '404' : page
	fetch(`./pages/${page}.html`)
		.then(response => response.text())
  		.then(text => app.innerHTML = text)
		.then(() => {
			updateBreadcrumbs(page)
			if(page === 'list' && allProducts.length > 0) {
				initList(true)
				initFilters()
			} else {
				pageInit(page)
			}
		})
}

function updateBreadcrumbs(page) {
	let create = document.getElementById('navCreate')
	let edit = document.getElementById('navEdit')
	if(page == 'list') {
		create.style.display = 'none'
		edit.style.display = 'none'
	} else if(page == 'create') {
		create.style.display = 'flex'
		edit.style.display = 'none'
	} else if(page == 'edit') {
		create.style.display = 'none'
		edit.style.display = 'flex'
	}
}

//initial content load
async function Init() {
	await getDomContent(routes[window.location.pathname])
}

//change content on route change
const onRouteChange = async (p, event = null) => {
	//prevent default link behavior
	if(event) event.preventDefault()
	//get path
	let path = ''
	if(p.split('/')[1] === 'edit') {
		path = '/edit'
	} else {
		path = p
	}
	//push state to history
	window.history.pushState({}, p, window.location.origin + p)
	await getDomContent(routes[path])
}

//listen for back/forward button
window.onpopstate = async () => {
	await getDomContent(routes[window.location.pathname])
}

Init()
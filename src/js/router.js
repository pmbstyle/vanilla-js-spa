const routes = {
	'/' : 'list',
	'/create' : 'create',
	'/edit' : 'edit'
}

//global container
const app = document.getElementById('app')

//get current path initial dom load
async function getDomContent(page) {
	page = !page ? '404' : page
	fetch(`./pages/${page}.html`)
		.then(response => response.text())
  		.then(text => app.innerHTML = text)
}

//initial content load
async function Init() {
	await getDomContent(routes[window.location.pathname])
}

//change content on route change
const onRouteChange = async (p) => {
	window.history.pushState({}, p, window.location.origin + p)
	await getDomContent(routes[pathname])
}

//listen for back/forward button
window.onpopstate = async () => {
	await getDomContent(routes[window.location.pathname])
}

Init()
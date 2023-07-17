# Vanilla Javascript SPA example

CRUD SPA using only vanilla javascript and dummy data.

LIVE: http://vjs-spa.trofimov.ca/

[![preview](http://vjs-spa.trofimov.ca/img/vjs-spa.png "preview")](http://vjs-spa.trofimov.ca/img/vjs-spa.png "preview")

## Running a project locally
clone the repo:  `git clone https://github.com/pmbstyle/vanilla-js-spa.git`

#### Using Docker
run from project root dir `docker-compose up -d`

open http://localhost:80

#### Using Nginx server
move contents of `./src folder` to nginx server public folder
copy contents of `./nginx-conf` to your server configuration folder ex.: `/etc/nginx/conf.d`
open your local server and navigate to the code location

## API data source
[DummyJSON](https://dummyjson.com "DummyJSON")

## Styling / fonts libs
[TailwindCSS](https://tailwindcss.com "TailwindCSS")

[DaisyUI](https://daisyui.com/ "DaisyUI")

[FontAwsome](https://fontawesome.com "FontAwsome")

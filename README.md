# Vanilla Javascript SPA example

Example of implementation simple CRUD SPA using vanilla javascript and dummy API source.

LIVE: http://vjs-spa.trofimov.ca/

[![preview](http://vjs-spa.trofimov.ca/img/vjs-spa.png "preview")](http://vjs-spa.trofimov.ca/img/vjs-spa.png "preview")

## Running a project locally
clone the repo:  `git clone https://github.com/pmbstyle/vanilla-js-spa.git`

#### Using Docker
run from project root dir `docker-compose up -d`
open http://localhost:80

#### Using Nginx server
move contents of `./src folder `to nginx server public folder
copy contents of `./nginx-conf ` to your server configuration folder ex.: `/etc/nginx/conf.d`
open your local server and navigate to the code location

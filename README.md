# koajs-example
example of koajs

npm install

npm start

##开发
node --harmony app.js

##部署
pm2 start app.js --node-args="--harmony"
pm2 list

###停止服务
pm2 stop 0
pm2 remove 0
pm2 delete 0

###重启服务
pm2 restart 0

# my-project


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Run with Docker

```
docker pull nginx
mkdir ~/goblog/AdminView
cd ~/goblog/AdminView
git clone git@github.com:520MianXiangDuiXiang520/BlogView.git
git checkout admin
git pull origin admin
docker run -d --name nginx -p 80:80 -v /root/goblog/BlogView/nginx/conf:/etc/nginx -v /root/goblog/BlogView/dist:/usr/share/nginx/html -v /root/goblog/BlogView/nginx/log:/var/log/nginx nginx
```
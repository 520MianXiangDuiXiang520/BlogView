# JuneBlog

[![Build Status](https://travis-ci.com/520MianXiangDuiXiang520/BlogView.svg?branch=master)](https://travis-ci.com/520MianXiangDuiXiang520/BlogView)

### Run with Docker

```sh
docker pull nginx
mkdir nginx/conf
# 添加配置文件
vim nginx.conf
mkdir nginx/blog/log
git clone git@github.com:520MianXiangDuiXiang520/BlogView.git
docker run -d --name nginx -p 80:80 -p 81:81 -v BlogView/nginx/conf:/etc/nginx -v BlogView/blog-view/dist:/usr/share/nginx/html -v BlogView/admin-view/dist:/usr/share/nginx/html/admin -v /root/goblog/BlogView/nginx/blog/log:/var/log/nginx -v /root/goblog/BlogView/nginx/log/admin:/var/log/nginx/admin nginx
```
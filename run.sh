Project_Path=$1
cd $Project_Path
git pull
cd $Project_Path/admin-view
cnpm install
cnpm run build
cd $Project_Path/blog-view
cnpm install
cnpm run build
docker restart nginx

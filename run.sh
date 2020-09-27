Project_Path=$1
cd $Project_Path
git pull
cnpm run build
docker restart nginx

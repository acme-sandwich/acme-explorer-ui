BASE_SITE=ec2-52-207-253-241.compute-1.amazonaws.com

# production
export NODE_ENV=production
export PORT=4201
export VIRTUAL_HOST=$BASE_SITE
export PORT_SERVER=3000
export VIRTUAL_HOST_SERVER=api.$BASE_SITE
docker-compose -p $VIRTUAL_HOST down

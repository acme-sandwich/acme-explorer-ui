BASE_SITE=ec2-54-152-184-65.compute-1.amazonaws.com

# production
export NODE_ENV=production
export PORT=4201
export VIRTUAL_HOST=$BASE_SITE
export PORT_SERVER=3000
export VIRTUAL_HOST_SERVER=api.$BASE_SITE
docker-compose -p $VIRTUAL_HOST down

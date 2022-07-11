#!/bin/bash

echo Version Number?
read VERSION

docker build -t pzrsa/mechkeebs:$VERSION .
docker push pzrsa/mechkeebs:$VERSION

ssh root@${YAGHI} "dokku git:from-image mechkeebs pzrsa/mechkeebs:$VERSION"
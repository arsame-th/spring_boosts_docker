# spring_boosts_docker
this app was created for interview test

# docker mysql
docker pull mysql
docker run -e MYSQL_ROOT_PASSWORD=Password -e MYSQL_DATABASE=mydb -d -p 3306:3306 --name mysqldb mysql:latest
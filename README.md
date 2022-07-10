# spring_boosts_docker
this app was created for interview test

# front-end
cd frontend <br />
npm start

# backend-end
cd backend <br />
mvn clean spring-boot:run

# docker mysql
docker pull mysql <br />
docker run -e MYSQL_ROOT_PASSWORD=Password -e MYSQL_DATABASE=mydb -d -p 3306:3306 --name mysqldb mysql:latest
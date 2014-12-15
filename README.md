##MongoDB IP:

Setup mongodb ip first.

Using env variable called `MONGODB_IP`

e.g. MONGODB_IP=192.168.0.100

##Debug mode:

Using env variable: `DEBUG=TEST`

##Endpoints:

    API_IP = {your_server_ip}

* Get list:

    `GET http://API_IP:8080/normal`

* Add a record:

    `POST http://API_IP:8080/normal`

* Get a record:

    `GET http://API_IP:8080/normal/{_id}`

* Run a long task:

    `GET http://API_IP:8080/longtask/{sec}` (sec range = 1 ~ 20)

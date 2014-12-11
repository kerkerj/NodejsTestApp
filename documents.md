Endpoints:

Docker:

    API_IP = "" 

None-Docker:

    API_IP = ""


* Get list:

    `GET http://API_IP:8080/normal`

* Add a record:

    `POST http://API_IP:8080/normal`

* Get a record:

    `GET http://API_IP:8080/normal/{_id}`

* Run a long task:

    `GET http://API_IP:8080/longtask/{sec}`

# NodeJS + MySql

Using NodeJS with MySql

## dev-example.js

Sample code to get started for learning purposes (not fit for production) 
which connects to the database and performs an SQL query. This runs for 
standalone connections i.e. one connection at a time (but in reality you
may get 100 or even 1000 connections in one particular time and your server 
should queue the requests if it is not powerful enough to serve them.)

### Run

```bash
node dev-example.js
```

## prod-example.js

Code for production that tests concurrent users using Pooling. Connection 
Pooling is a mechanism to maintain a cache of database connections. 
This way, that connection can be reused after releasing it.

### Run

```bash
node prod-example.js
```

### Testing concurrency

Install `siege`

```bash
sudo apt-get install siege
```

Run the following command while the app is running to fire 10 concurrent 
users for 1 minute.

```bash
siege -c10 -t1M http://localhost:3000
```

The 100-connection limit in code means that if we fire 1000 concurrent users 
and our MySQL server is configured to handle such traffic at one socket, 
then it will run and our code will manage the scheduling of concurrent 
connections. It will serve 100 connections a time but the remaining 900 
will be in queue. Thus, the code will not break.

```bash
siege -c1000 -t1M http://localhost:3000
```
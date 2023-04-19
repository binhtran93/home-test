## Installation

#### Install Docker
https://docs.docker.com/engine/install/ubuntu/

#### Install Docker Compose
https://docs.docker.com/compose/install/other/

#### Install Makefile
```bash
sudo apt install make
```


## Running the app

```bash
# Startup 
$ make startup

# Run migration
$ make migrate

# Import test data
$ make seed
```

## API documentation
http://localhost:5000/api/v1/docs

## Test

```bash
# unit tests & integration tests 
$ make run_test
```

## DB Design
<img src="db.png" width="50%" alt="db_design">

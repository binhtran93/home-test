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

## Test

```bash
# unit tests & integration tests 
$ make run_test
```

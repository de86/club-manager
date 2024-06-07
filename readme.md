# About

A club management SaaS allowing users to create beautiful and informative websites for their sports clubs

## Installation
### Requirements
- Node v22.2.0
- Docker
- Docker-Compose
- Install knex globally (Required for migrations) `npm install -g knex`

### DB
- `npm install`
- Run `sudo docker-compose -f ./docker/docker-compose-pg.yml up` to start DB. Accessible at localhost:5432. Connection config found in script at `./docker/db-entrypoint.sh`.
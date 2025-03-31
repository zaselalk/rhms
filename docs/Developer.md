## Developer Guide

Welcome to the developer docs, This guide is written for provide the comprehensive guide for developer to make sure that project has consistant.

### Backend Setup Guide

- Create a .env file to store credientials
- Add following defaults value to .env `/api/.env`

```
APPLICATION_PORT=3001

# Database Dvelopment
DATABASE_USER=root
DATABASE_PASSWORD=password
DATABASE_NAME=rmis_katugahahena

# Environment
NODE_ENV=development
```

### Create Migration

Migration files are important to track the changes happen inside the database, By using predefined commands now you can easily do migration related tasks with just simple commands.

- Run migration : `npm run migrate`
- Create new migration file: `npm run migrate:create {name}`
- Undo the last migration: `npm run migrate:undo`
- Undo all migrations: `npm run migrate:undo:all`
- Run all seeds : `npm run seed`
- Create new seed file: `npm run seed:create`
- Undo last seed : `npm run seed:undo`
- Undo all seeds :`npm run seed:undo:all`

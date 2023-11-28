#!/bin/bash
rm db/dev.db
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
sqlite3 < commands.sql

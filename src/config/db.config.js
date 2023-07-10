import Sequelize from 'sequelize'
import * as path from 'path'
import { fileURLToPath } from 'url'
import * as dotenv from 'dotenv'
import pg from 'pg'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
let dialectOptions = null

if (process.env.NODE_ENV === 'development') {
	dotenv.config({
		path: path.join(__dirname, '../../.env')
	})
} else {
	dotenv.config({
		path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`)
	})
	dialectOptions = {
		ssl: {
			require: true,
			rejectUnauthorized: false
		}
	}
}

const sequelize = new Sequelize(
	process.env.POSTGRES_DB,
	process.env.POSTGRES_USER,
	process.env.POSTGRES_PASS,
	{
		host: process.env.POSTGRES_HOST,
		port: process.env.DB_PORT || 5432,
		dialect: 'postgres',
		pool: {
			max: 5,
			min: 0,
			acquire: 20000,
			idle: 5000
		},
		dialectOptions,
		dialectModule: pg
	}
)

export default sequelize

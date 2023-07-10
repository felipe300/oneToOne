import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { create } from 'express-handlebars'

// ROUTES

import * as path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

// MIDDLEWARES
const hbs = create({
	partialsDir: [path.resolve(__dirname, './views/partials')]
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.use(express.urlencoded({ extended: true }))

app.use('/public', express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
	res.send({ message: 'ok' })
})

app.get('/home', async (req, res) => {
	res.render('home')
})

export default app

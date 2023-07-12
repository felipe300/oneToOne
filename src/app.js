import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { create } from 'express-handlebars'

// ROUTES
import userRouter from './routes/user.router.js'
import addressRouter from './routes/address.router.js'
import countryRouter from './routes/country.router.js'

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

app.use('/api/v1/users', userRouter)
app.use('/api/v1/address', addressRouter)
app.use('/api/v1/countries', countryRouter)

export default app

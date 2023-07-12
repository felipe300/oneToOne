import { Router } from 'express'
import {
	getAllCountries
} from '../controllers/country.controller.js'

const router = Router()

router.get('/', getAllCountries)

export default router

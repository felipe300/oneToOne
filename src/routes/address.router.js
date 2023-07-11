import { Router } from 'express'
import {
	getAllAddress
} from '../controllers/address.controller.js'

const router = Router()

router.get('/', getAllAddress)

export default router

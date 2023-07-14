import { Router } from 'express'
import {
	logout,
	signupGet,
	signupPost,
	loginGet,
	getHome,
	loginPost
} from '../controllers/auth.controller.js'

const router = Router()

// AUTH ROUTES
router.get(['/', '/home'], getHome)
router.get('/signup', signupGet)
router.post('/signup', signupPost)
router.get('/login', loginGet)
router.post('/login', loginPost)
router.get('/logout', logout)

export default router

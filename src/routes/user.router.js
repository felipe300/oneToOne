import { Router } from 'express'
import {
	addUser,
	getAllUsers,
	getUserById,
	getUserByEmail,
	updateUserById,
	deleteUserById
} from '../controllers/user.controller.js'
// import { emitToken } from '../middlewares/auth.middlerare.js'

const router = Router()

router.post('/', addUser)
router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.post('/:email', getUserByEmail)
router.put('/:id', updateUserById)
router.delete('/:id', deleteUserById)
// router.post('/login', emitToken, login)

export default router

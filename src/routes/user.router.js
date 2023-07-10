import { Router } from 'express'
import {
	addUser,
	getAllUsers,
	getUserById,
	updateUserById,
	deleteUserById
} from '../controllers/user.controller.js'
// import { emitToken } from '../middlewares/auth.middlerare.js'

const router = Router()

router.post('/', addUser)
router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.put('/:id', updateUserById)
router.delete('/:id', deleteUserById)
// router.post('/login', emitToken, login)

export default router

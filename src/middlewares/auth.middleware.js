import jwt from 'jsonwebtoken'
import User from '../models/User.model.js'
import 'dotenv'

// USE THEM IN THE USER ROUTER
export const emitToken = async (req, res, next) => {
	try {
		const { email, password } = req.body

		const user = await User.findOne({
			where: { email, password },
			attributes: ['id', 'username', 'email', 'role']
		})

		if (user === null) {
			res.status(400).send({ code: 400, message: 'authentication error' })
		}

		const token = jwt.sign({
			exp: Math.floor(Date.now() / 1000) * 1 * 10,
			data: JSON.stringify(user)
		}, process.env.SECRET_TOKEN)
		req.token = token
		next()
	} catch (err) {
		return console.log(`Error to generate token. ${err.message}`)
	}
}
export const verifyToken = async (req, res, next) => {
	try {
		let { token } = req.query
		if (!token) {
			token = req.headers.authorization
			token = token.split(' ')[1]

			if (token.length === 0) {
				throw new Error('There is no token')
			}
		}

		jwt.verify(token, process.env.SECRET_TOKEN, async (err, decoded) => {
			if (err) {
				return res.status(401).send({
					code: 401,
					message: `Must be provide a valid token! ${err.message}`
				})
			}

			const user = await User.findByPk(decoded.id, {
				attributes: ['id', 'username', 'email', 'role']
			})

			if (!user) {
				return res.status(400).json({
					code: 400,
					message: `User does not belongs to the system anymore! ${err.message}`
				})
			}

			req.user = user
			next()
		})
	} catch (err) {
		return console.log(`Error to generate token. ${err.message}`)
	}
}

// Si es 0 es usuario normal y si es 1 es administrador
// export const validateIsAdmin = async (req, res, next) => {
// 	try {
// 		const user = req.user

// 		if (!user.admin) {
// 			return res.status(403).json({
// 				code: 403,
// 				message:
// 					'User is not an admin, User is not allow to create products'
// 			})
// 		}
// 		next()
// 	} catch (err) {
// 		return console.log(`User is not allow to create products! ${err.message}`)
// 	}
// }

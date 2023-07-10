import User from '../models/User.model.js'

export const addUser = async (req, res) => {
	try {
		const { username, age, role, email, password } = req.body

		const [user, created] = await User.findOrCreate({
			where: { email },
			defaults: {
				username, age, role, email, password
			}
		})

		if (!created) {
			return res.status(400).send({
				code: 400,
				message: `User '${user.email}' already exists!`
			})
		}

		res.status(201).send({
			code: 201,
			message: 'User created successfully'
		})
	} catch (err) {
		return res.status(400).send({
			code: 400,
			message: `💩, Error to create a new User. ${err.message}`
		})
	}
}

export const getAllUsers = async (req, res) => {
	try {
		const users = await User.findAll({
			attributes: {
				exclude: ['password', 'createdAt', 'updatedAt', 'role']
			},
			order: [
				['id', 'ASC']
			]
		})

		res.status(201).send({
			code: 201,
			message: users.length === 0 ? 'There are no users' : 'Get all users successfully',
			data: users
		})
	} catch (err) {
		return res.status(400).send({
			code: 400,
			message: `💩, Error to get all users. ${err.message}`
		})
	}
}

export const getUserById = async (req, res) => {
	try {
		const { id } = req.params
		const found = await User.findByPk(id)

		if (!found) {
			return res
				.status(404)
				.send({ code: 404, message: `User with '${id}' not found!` })
		}

		res.status(201).send({
			code: 201,
			message: `Get user '${found.username}', successfully`,
			data: { username: found.username, age: found.age, email: found.email }
		})
	} catch (err) {
		return res.status(400).send({
			code: 400,
			message: `💩, Error to find user by id. ${err.message}`
		})
	}
}

export const getUserByEmail = async (req, res) => {
	try {
		const { email } = req.body
		const user = await User.findOne({
			where: {
				email
			},
			attributes: {
				exclude: ['password', 'createdAt', 'updatedAt', 'role']
			}
		})

		res.status(201).send({
			code: 201,
			message: `Get user '${user.username}', successfully`,
			data: user
		})
	} catch (err) {
		return res.status(400).send({
			code: 400,
			message: `💩, Error to get user by email. ${err.message}`
		})
	}
}

export const updateUserById = async (req, res) => {
	try {
		const { id } = req.params
		const { username, age, role, email, password } = req.body
		const found = await User.findByPk(id)

		if (!found) {
			return res
				.status(404)
				.send({ code: 404, message: `User with '${id}' not found!` })
		}

		const newUser = await found.update({
			username,
			age,
			role,
			email,
			password
		}, { where: { id } })

		console.log(newUser)

		res.status(201).send({
			code: 201,
			message: `User '${username}' updated successfully`,
			data: {
				username: newUser.username,
				age: newUser.age,
				email: newUser.email
			}
		})
	} catch (err) {
		return res.status(400).send({
			code: 400,
			message: `💩, Error to update user by id. ${err.message}`
		})
	}
}

export const deleteUserById = async (req, res) => {
	try {
		const { id } = req.params
		const found = await User.findByPk(id)

		if (!found) {
			return res
				.status(404)
				.send({ code: 404, message: `User with '${id}' not found!` })
		}

		await User.destroy({ where: { id } })

		res.status(201).send({
			code: 201,
			message: found === undefined
				? 'User do not exists'
				: `User '${found.email}' deleted successfully`
		})
	} catch (err) {
		return res.status(400).send({
			code: 400,
			message: `💩, Error to delete user by id. ${err.message}`
		})
	}
}

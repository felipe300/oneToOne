import Address from '../models/Address.model.js'
import Country from '../models/Country.model.js'
import Post from '../models/Post.model.js'
import User from '../models/User.model.js'

export const addUser = async (req, res) => {
	try {
		const { username, age, role, email, password, residence, country } = req.body

		const [user, created] = await User.findOrCreate({
			where: { email },
			defaults: {
				username, age, role, email, password, residence, country
			}
		})

		if (!created) {
			return res.status(400).send({
				code: 400,
				message: `User '${user.email}' already exists!`
			})
		}

		const [foundStreet, createdStreet] = await Address.findOrCreate({
			where: {
				street: residence
			},
			defaults: {
				street: residence, residente_id: user.id
			}
		})

		if (!createdStreet) {
			return res.status(400).send({
				code: 400,
				message: `Address '${foundStreet.street}' already exists!`
			})
		}

		const [foundCountry, createdCountry] = await Country.findOrCreate({
			where: {
				country
			},
			defaults: {
				country, country_id: user.id
			}
		})

		if (!createdCountry) {
			return res.status(400).send({
				code: 400,
				message: `Country '${foundCountry.country}' already exists!`
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
			include: [{
				model: Address,
				as: 'residence',
				attributes: ['street']
			}, {
				model: Country,
				as: 'nationality',
				attributes: ['country']
			}, {
				model: Post,
				as: 'publications',
				attributes: ['title', 'content', 'createdAt']
			}],
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
			message: `💩, Error to get all users. ${err}`
		})
	}
}

export const getUserById = async (req, res) => {
	try {
		const { id } = req.params
		const found = await User.findByPk(id, {
			include: [{
				model: Address,
				as: 'residence'
			}, {
				model: Country,
				as: 'nationality'
			}, {
				model: Post,
				as: 'publications',
				attributes: ['title', 'content', 'createdAt']
			}]
		})

		if (!found) {
			return res
				.status(404)
				.send({ code: 404, message: `User with '${id}' not found!` })
		}

		res.status(201).send({
			code: 201,
			message: `Get user '${found.username}', successfully`,
			data: {
				username: found.username,
				age: found.age,
				email: found.email,
				country: found.nationality.country,
				residence: found.residence.street,
				publications: found.publications
			}
		})
	} catch (err) {
		return res.status(400).send({
			code: 400,
			message: `💩, Error to find user by id. ${err}`
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
		const { username, age, role, email, password, residence, country: nationality } = req.body
		const found = await User.findByPk(id, {
			include: [{
				model: Address,
				as: 'residence',
				attributes: ['street']
			}, {
				model: Country,
				as: 'nationality',
				attributes: ['country']
			}]
		})

		if (!found) {
			return res
				.status(404)
				.send({ code: 404, message: `User with '${id}' not found!` })
		}

		const foundAddress = await Address.findOne({
			where: {
				street: found.residence.street
			},
			attributes: {
				exclude: ['createdAt', 'updatedAt']
			}
		})

		await foundAddress.update({ street: residence }, {
			where: { street: found.residence.street }
		})

		const foundCountry = await Country.findOne({
			where: {
				country: found.nationality.country
			},
			attributes: {
				exclude: ['createdAt', 'updatedAt']
			}
		})

		await foundCountry.update({ country: nationality }, {
			where: { country: found.nationality.country }
		})

		const newUser = await found.update({
			username,
			age,
			role,
			email,
			password,
			[residence.street]: residence,
			[nationality.country]: nationality
		}, { where: { id } })

		res.status(201).send({
			code: 201,
			message: `User '${username}' updated successfully`,
			data: {
				username: newUser.username,
				age: newUser.age,
				email: newUser.email,
				residence,
				country: nationality
			}
		})
	} catch (err) {
		return res.status(400).send({
			code: 400,
			message: `💩, Error to update user by id. ${err}`
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

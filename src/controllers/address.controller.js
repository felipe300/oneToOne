import Address from '../models/Address.model.js'
import User from '../models/User.model.js'

export const getAllAddress = async (req, res) => {
	try {
		const addresses = await Address.findAll({
			include: {
				model: User,
				as: 'residente',
				attributes: ['username', 'age']
			},
			order: [
				['id', 'ASC']
			]
		})

		res.status(201).send({
			code: 201,
			message: addresses.length === 0 ? 'There are no addresses' : 'Get all addresses successfully',
			data: addresses
		})
	} catch (err) {
		return res.status(400).send({
			code: 400,
			message: `💩, Error to get all address. ${err.message}`
		})
	}
}

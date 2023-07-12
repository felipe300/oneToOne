import Country from '../models/Country.model.js'
import User from '../models/User.model.js'

export const getAllCountries = async (req, res) => {
	try {
		const countries = await Country.findAll({
			include: {
				model: User,
				as: 'citizen',
				attributes: ['username', 'age']
			},
			order: [
				['id', 'ASC']
			]
		})

		res.status(201).send({
			code: 201,
			message: countries.length === 0 ? 'There are no countries' : 'Get all countries successfully',
			data: countries
		})
	} catch (err) {
		return res.status(400).send({
			code: 400,
			message: `💩, Error to get all countries. ${err.message}`
		})
	}
}

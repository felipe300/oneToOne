import { DataTypes } from 'sequelize'
import sequelize from '../config/db.config.js'

const Country = sequelize.define(
	'countries',
	{
		country: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'El campo no puede ser nulo'
				},
				len: {
					args: [3, 255],
					msg: 'El nombre tiene que ser entre 3 y 255 caracteres'
				}
			}
		}
	},
	{
		timestamps: true,
		tableName: 'countries'
	}
)

export default Country

import { DataTypes } from 'sequelize'
import sequelize from '../config/db.config.js'

const Address = sequelize.define(
	'address',
	{
		street: {
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
		tableName: 'address'
	}
)

export default Address

import { DataTypes } from 'sequelize'
import sequelize from '../config/db.config.js'

const User = sequelize.define(
	'users',
	{
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'El campo no puede ser nulo'
				},
				isAlpha: {
					args: true,
					msg: 'El nombre solo puede contener letras'
				},
				len: {
					args: [3, 255],
					msg: 'El nombre tiene que ser entre 3 y 255 caracteres'
				}
			}
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			isEmail: {
				args: true,
				msg: 'El campo tiene que ser un correo valido'
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		age: {
			type: DataTypes.INTEGER,
			validate: {
				isInt: {
					args: true,
					msg: 'La edad tiene que ser un numero'
				},
				min: {
					args: 1,
					msg: 'La edad tiene que ser mayor o igual que uno'
				},
				max: {
					args: 150,
					msg: 'La edad tiene que ser real'
				},
				esPar (value) {
					// 10 % 2 = 0 (false) 9 % 2 = 1 (true)
					if (value % 2) {
						throw new Error('La edad tiene que ser un numero par')
					}
				}
			}
		},
		// Si es 0 es usuario normal y si es 1 es administrador
		role: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		}
	},
	{
		timestamps: true,
		tableName: 'users'
	}
)

export default User

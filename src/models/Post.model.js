import { DataTypes } from 'sequelize'
import sequelize from '../config/db.config.js'

const Post = sequelize.define(
	'posts',
	{
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'El campo no puede ser nulo'
				},
				len: {
					args: [3, 255],
					msg: 'El titulo tiene que ser entre 3 y 255 caracteres'
				}
			}
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'El campo no puede ser nulo'
				}
			}
		}
	},
	{
		timestamps: true,
		tableName: 'posts'
	}
)

export default Post

import Address from './Address.model.js'
import User from './User.model.js'

User.hasOne(Address, {
	as: 'residence',
	onDelete: 'cascade',
	foreignKey: 'residente_id'
})

Address.belongsTo(User, { as: 'residente', foreignKey: 'residente_id' })

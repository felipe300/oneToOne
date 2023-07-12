import Address from './Address.model.js'
import User from './User.model.js'
import Country from './Country.model.js'

User.hasOne(Address, {
	as: 'residence',
	onDelete: 'cascade',
	foreignKey: 'residente_id'
})

Address.belongsTo(User, { as: 'residente', foreignKey: 'residente_id' })

User.hasOne(Country, {
	as: 'nationality',
	onDelete: 'cascade',
	foreignKey: 'country_id'
})

Country.belongsTo(User, { as: 'citizen', foreignKey: 'country_id' })

import Address from './Address.model.js'
import Country from './Country.model.js'
import User from './User.model.js'
import Post from './Post.model.js'

// ONE_TO_ONE
User.hasOne(Address, {
	as: 'residence',
	onDelete: 'cascade',
	foreignKey: 'residenteId'
})

Address.belongsTo(User, { as: 'residente', foreignKey: 'residenteId' })

User.hasOne(Country, {
	as: 'nationality',
	onDelete: 'cascade',
	foreignKey: 'countryId'
})

Country.belongsTo(User, { as: 'citizen', foreignKey: 'countryId' })

// ONE_TO_MANY
User.hasMany(Post, {
	as: 'publications',
	// uncomment this line to delete the user and its posts
	// otherwise, the authorId will be null
	// onDelete: 'cascade',
	foreignKey: 'authorId'
})

Post.belongsTo(User, { as: 'author' })

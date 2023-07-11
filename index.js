import sequelize from './src/config/db.config.js'
import app from './src/app.js'
import 'dotenv/config'

import './src/models/Associations.js'

const PORT = process.env.PORT || 5000

const main = async () => {
	try {
		await sequelize.authenticate()
		await sequelize.sync({ force: true, alter: true })
		app.listen(PORT, () =>
			console.log(`Server Listening on port => ${PORT}!🔥🔥🔥`)
		)
	} catch (err) {
		console.log(`Something went wrong, Error => ${err.message}`)
	}
}

main()

export const addUser = async (req, res) => {
	res.send({ message: 'create' })
}

export const getAllUsers = async (req, res) => {
	res.send({ message: 'get all' })
}

export const getUserById = async (req, res) => {
	res.send({ message: 'by id' })
}

export const updateUserById = async (req, res) => {
	res.send({ message: 'update' })
}

export const deleteUserById = async (req, res) => {
	res.send({ message: 'delete' })
}

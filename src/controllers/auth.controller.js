export const getHome = async (req, res) => {
	res.render('home')
}

export const signupGet = async (req, res) => {
	res.render('signup')
}

export const loginGet = async (req, res) => {
	res.render('login')
}

export const logout = async (req, res) => {
	res.send({ message: 'logout' })
}

// CREATEUSER
export const signupPost = async (req, res) => {
	const data = req.body
	res.send({ message: 'signup post view', data })
}

export const loginPost = async (req, res) => {
	const data = req.body
	res.send({ message: 'login post', data })
}

import Post from '../models/Post.model.js'
import User from '../models/User.model.js'

export const createPost = async (req, res) => {
	try {
		const { title, content, authorId } = req.body

		const [post, created] = await Post.findOrCreate({
			where: { title },
			defaults: {
				title, content, authorId
			}
		})

		if (!created) {
			return res.status(400).send({
				code: 400,
				message: `Post '${post.title}' already exists!`
			})
		}

		if (!post.authorId) {
			return res.status(400).send({
				code: 400,
				message: `Author of '${post.title}' do not exists!`
			})
		}

		res.status(201).send({
			code: 201,
			message: 'User created successfully'
		})
	} catch (err) {
		return res.status(400).send({
			code: 400,
			message: `💩, Error to create a new Post. ${err.message}`
		})
	}
}

export const getAllPosts = async (_req, res) => {
	try {
		const posts = await Post.findAll({
			include: [{
				model: User,
				as: 'author',
				attributes: ['username']
			}],
			attributes: ['title', 'content', 'createdAt']
		})

		res.status(201).send({
			code: 201,
			message: posts.length === 0 ? 'There are no posts' : 'Get all posts successfully',
			data: posts
		})
	} catch (err) {
		return res.status(400).send({
			code: 400,
			message: `💩, Error to get all posts. ${err}`
		})
	}
}

export const getPostById = async (req, res) => {
	try {
		const { id } = req.params
		const found = await Post.findByPk(id, {
			include: [{
				model: User,
				as: 'author'
			}]
		})

		if (!found) {
			return res
				.status(404)
				.send({ code: 404, message: `Post with '${id}' not found!` })
		}

		res.status(201).send({
			code: 201,
			message: `Get post '${found.title}', successfully`,
			data: {
				title: found.title,
				content: found.content,
				author: found.author.username
			}
		})
	} catch (err) {
		return res.status(400).send({
			code: 400,
			message: `💩, Error to find post by id. ${err}`
		})
	}
}

export const updatePostById = async (req, res) => {
	try {
		const { id } = req.params
		const { title, content } = req.body
		const found = await Post.findByPk(id, {
			include: [{
				model: User,
				as: 'author',
				attributes: ['username']
			}]
		})

		if (!found) {
			return res
				.status(404)
				.send({ code: 404, message: `Post with '${id}' not found!` })
		}

		const newPost = await found.update({
			title,
			content
		}, { where: { id } })

		res.status(201).send({
			code: 201,
			message: `Post '${title}' updated successfully`,
			data: {
				title: newPost.title,
				content: newPost.content,
				author: found.author
			}
		})
	} catch (err) {
		return res.status(400).send({
			code: 400,
			message: `💩, Error to update post by id. ${err}`
		})
	}
}

export const deletePostById = async (req, res) => {
	try {
		const { id } = req.params
		const found = await Post.findByPk(id)

		if (!found) {
			return res
				.status(404)
				.send({ code: 404, message: `Post with '${id}' not found!` })
		}

		await Post.destroy({ where: { id } })

		res.status(201).send({
			code: 201,
			message: found === undefined
				? 'Post do not exists'
				: `Post '${found.title}' deleted successfully`
		})
	} catch (err) {
		return res.status(400).send({
			code: 400,
			message: `💩, Error to delete post by id. ${err.message}`
		})
	}
}

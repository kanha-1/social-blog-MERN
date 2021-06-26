const conversation = require("../model/conversation");

module.exports = {
	// new conversation
	newConvo: async (req, res) => {
		const newConversation = new conversation({
			members: [req.body.senderId, req.body.receiverId],
		});
		try {
			const savedConversation = await newConversation.save();
			res.status(200).json(savedConversation);
		} catch (error) {
			res.status(500).json(error, "server error");
		}
	},
	// get a conversation
	getaConvo: async (req, res) => {
		try {
			const convo = await conversation.find({
				members: { $in: [req.params.id] },
			});
            res.status(200).json(convo)
		} catch (error) {
			res.status(500).json(error, "server error");
		}
	},
};

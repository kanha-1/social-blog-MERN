const Messages = require("../model/messages");

module.exports={
    addMessages: async(req,res)=>{
        const newMessages = new Messages(req.body)
        try {
            const savedMessages =  await newMessages.save()
            res.status(200).json(savedMessages)
        } catch (error) {
			res.status(500).json(error, "server error");
            
        }
    },
    getMessages: async(req,res)=>{
        try {
			const msg = await Messages.find({
				conversationId:req.params.id,
			});
            res.status(200).json(msg)
		} catch (error) {
			res.status(500).json(error, "server error");
		}
    },
}
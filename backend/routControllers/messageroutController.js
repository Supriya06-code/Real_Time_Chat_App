import Conversation from "../Models/conversationModels.js";
import Message from "../Models/messageSchema.js";

export const sendMessage =async(req, res)=>{
  try{
    console.log("Sender User:", req.user);
    if (!req.user || !req.user._id) {
      throw new Error('Sender ID is undefined. Please ensure user is authenticated.');
      
    }
const {message} = req.body;
const senderId = req.user._id;
const {id: receiverId} = req.params;

 // Check if senderId exists in req.user (debugging purpose)
 

// Check if senderId and receiverId are both present
if (!receiverId || !senderId) {
  return res.status(400).send({ success: false, message: "Receiver ID or Sender ID is missing" });
}
let chats = await Conversation.findOne({
  participants: { $all: [senderId, receiverId] },
})
if(!chats){
  chats = await Conversation.create({
    participants:[senderId, receiverId],
    messages: [] 
  });
}
const newMessages = new Message({
  senderId,
  receiverId,
  message,
  conversationId:chats._id,
});
console.log(chats);
// Ensure chats.messages is an array
if (!chats.messages) {
  chats.messages = [];
}
// if (!chats.messages) {
//   chats.messages = [];
// }
// if(newMessages){
  console.log('Current Messages:', chats.messages);

  chats.messages.push(newMessages._id)
// }
//Socket.IO function
// chats.save() 
// newMessages.save()
await Promise.all([chats.save(),newMessages.save()]);
res.status(201).send(newMessages);
  }  catch (error){
    console.error(error.message);
    res.status(500).send({
      success: false,
      message:error.message
    });
    // console.log(error);
  }
};

export const getMessages=async(req,res)=>{
  try{
    
    const {id: receiverId} = req.params;
    const senderId = req.user._id;
    const chats = await Conversation.findOne({
     participants:{$all:[senderId,receiverId]}
    }).populate("messages")
    if(!chats) return res.status(200).send([]);
    const message = chats.messages;
    res.status(200).send(message)
  }catch(error){
    res.status(500).send({
      success: false,
      message: error

    });
    console.log(error);
  }
};
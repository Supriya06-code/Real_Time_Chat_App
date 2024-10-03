import User from "../Models/userModels.js";
import Conversation from "../Models/conversationModels.js"; // Ensure the quotes are correct

export const getUserBySearch = async (req, res) => {
    try {
        const search = req.query.search || '';
        const currentUserID = req.user._id;
        const user = await User.find({
            $and: [
                {
                    $or: [
                        { username: { $regex: '.*' + search + '.*', $options: 'i' }
                        },
                        {
                            fullname: { $regex: '.*' + search + '.*', $options: 'i' }
                        }
                    ]
                },{
                    _id:{$ne:currentUserID}
                }
            ]
        }).select("-password").select("email")
        res.status(200).send(user)

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })
        console.log(error);
    }
}
// export const getCurrentChatters = async(req,res)=>{
//     try{
// const currentUserID = req.user._id;
// const currentChatters = await Conversation.find({
//     participants:currentUserID
// }).sort({
//     updatedAt: -1
// });

// if(!currentChatters || currentChatters.length === 0) return res.status(200).send([]);

// const participantsIDS = currentChatters.reduce((ids,conversation)=>{
//   const otherParticipants = conversation.participants.filter(id => id !== currentUserID);  
//   return [...ids, ...otherParticipants]
// },[]);
// const otherParticipantsIDS = participantsIDS.filter(id => id.toString() !== currentUserID.toString());
// const user = await User.find({_id:{$in:otherParticipantsIDS}}).select("-password").select("-email");
// const users = otherParticipantsIDS.map(id => user.find(user => user._id.toString() === id.toString()));
// res.status(200).send(users)

//     }catch (error) {
//         res.status(500).send({
//             success: false,
//             message: error
//         })
//         console.log(error);
//     }
// }
export const getCurrentChatters = async (req, res) => {
    try {
        const currentUserID = req.user._id;
        console.log("Current User ID:", currentUserID);

        const currentChatters = await Conversation.find({
            participants: currentUserID
        }).sort({
            updatedAt: -1
        });
        console.log("Current Chatters from DB:", currentChatters);


        // Check if there are no current chatters
        if (!currentChatters || currentChatters.length === 0) return res.status(200).send([]);

        // Reduce to get all other participant IDs
        const participantsIDS = currentChatters.reduce((ids, conversation) => {
            const otherParticipants = conversation.participants.filter(id => id && id !== currentUserID); // Check if id is not null
            return [...ids, ...otherParticipants];
        }, []); // Provide an empty array as the initial value

        // Filter out the current user ID from the list of other participant IDs
        const otherParticipantsIDS = participantsIDS.filter(id => id && id.toString() !== currentUserID.toString()); // Check if id is not null

        // Fetch user details for other participants
        const users = await User.find({
            _id: { $in: otherParticipantsIDS }
        }).select("-password -email");

        // Map users back to the other participant IDs
        const result = otherParticipantsIDS.map(id => users.find(user => user._id.toString() === id.toString()));

        // Send the response
        res.status(200).send(result);

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message // Use error.message for better clarity
        });
        console.log(error);
    }
};

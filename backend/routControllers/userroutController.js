import User from "../Models/userModels.js";
import bcryptjs from 'bcryptjs'
import jwtToken from '../utils/jwtwebToken.js'

export const userRegister = async (req, res) => {
    try {
        const { fullname, username, email, gender, password, profilepic } = req.body;
        console.log(req.body);
        const user = await User.findOne({ username, email });
        if (user) return res.status(500).send({ success: false, message: " UserName or Email Alredy Exist " });
        const hashPassword = bcryptjs.hashSync(password, 10);
        const profileBoy = profilepic || `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const profileGirl = profilepic || `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullname,
            username,
            email,
            password: hashPassword,
            gender,
            profilepic: gender === "male" ? profileBoy : profileGirl
        })

        if (newUser) {
            await newUser.save();
             jwtToken(newUser._id, res)
        } else {
            res.status(500).send({ success: false, message: "Inavlid User Data" })
        }

        res.status(201).send({
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            profilepic: newUser.profilepic,
            email: newUser.email,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })
        console.log(error);
    }
}

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) return res.status(500).send({ success: false, message: "Email Dosen't Exist Register" })
        const comparePasss = bcryptjs.compareSync(password, user.password || "");
        if (!comparePasss) return res.status(500).send({ success: false, message: "Email Or Password dosen't Matching" })
        
        jwtToken(user._id, res);

        res.status(200).send({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilepic: user.profilepic,
            email:user.email,
            message: "Succesfully LogIn"
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })
        console.log(error);
    }
}


export const userLogOut=async(req,res)=>{
    
    try {
        res.cookie("jwt",'',{
            maxAge:0
        })
        res.status(200).send({success:true ,message:"User LogOut"})

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })
        console.log(error);
    }
}
// export const userGuestLogin = async (req, res) => {
//     try {
//         // Create a temporary guest user with a random username or ID
//         const guestUser = {
//             fullname: "Guest User",
//             username: `guest_${Math.random().toString(36).substring(2, 15)}`,
//             email: null,  // Guest user doesn't need email
//             profilepic: `https://avatar.iran.liara.run/public/guest`,
//             role: 'guest'
//         };
        
//         // Assign a JWT token for the guest user (no need to store in DB)
//         jwtToken(guestUser.username, res); // Use username as a unique identifier for guest

//         // Respond with guest user data
//         res.status(200).send({
//             fullname: guestUser.fullname,
//             username: guestUser.username,
//             profilepic: guestUser.profilepic,
//             role: guestUser.role,
//             message: "Successfully logged in as Guest"
//         });
//     } catch (error) {
//         res.status(500).send({
//             success: false,
//             message: error
//         });
//         console.log(error);
//     }
// };


export const userGuestLogin = async (req, res) => {
    try {
        // Generate a random guest username
        const guestUsername = `guest_${Math.random().toString(36).substring(2, 15)}`;
        
        // Set a default profile picture for the guest user
        const profileBoy = `https://avatar.iran.liara.run/public/boy?username=${guestUsername}`;
        const profileGirl = `https://avatar.iran.liara.run/public/girl?username=${guestUsername}`;

        // Determine the profile picture based on optional gender input (if any)
        const profilepic = req.body.gender === "female" ? profileGirl : profileBoy;

        // Create a guest user object
        const guestUser = {
            fullname: "Guest User",
            username: guestUsername,
            email: null,  // Guest users don't need an email
            profilepic: profilepic,
            role: 'guest'
        };

        // Generate JWT token for guest user
        jwtToken(guestUser.username, res); // Use username as the unique identifier for guest

        // Respond with the guest user information
        res.status(200).send({
            fullname: guestUser.fullname,
            username: guestUser.username,
            profilepic: guestUser.profilepic,
            role: guestUser.role,
            message: "Successfully logged in as Guest"
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
        console.log(error);
    }
};

// import jwt from 'jsonwebtoken'
// import User from '../Models/userModels.js'

// export const isLogin = async (req,res,next)=>{
//     try{
//        // console.log(req.cookies.jwt);
        
//         const token = req.cookies.jwt;
//         console.log(token);
//    if(!token) return res.status(500).send({ success: false, message: "User Unauthorize"}) 
//     const decode = jwt.verify(token,process.env.JWT_SECRET)  
// if(!decode) return res.status(500).send({ success: false, message: "User Unauthorize-Invalid Token"}) 
//     const user = User.findById(decode.userId).select("-password");
// if(!user)return res.status(500).send({ success: false, message: "User not found"})
//     req.user = user;
// next();
//     }
//     catch(error){
//         console.log(`error in isLogin middleware ${error.message}`);
//         res.status(500).send({
//             success: false,
//             message: `Internal Server Error: ${error.message}`
//         })
        

//     }
// }

// export default isLogin;
import jwt from 'jsonwebtoken';
import User from '../Models/userModels.js';

export const isLogin = async (req, res, next) => {
    try {
        const token = req.cookies.jwt; // Get the token from cookies
        console.log(token);

        // Check if the token exists
        if (!token) {
            return res.status(401).send({ success: false, message: "User Unauthorized" });
        }

        // Verify the token
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) {
            return res.status(401).send({ success: false, message: "User Unauthorized - Invalid Token" });
        }

        // Fetch the user based on the userId in the token
        const user = await User.findById(decode.userId).select("-password"); // Await the user fetching
        if (!user) {
            return res.status(404).send({ success: false, message: "User not found" });
        }

        req.user = user; // Assign the found user to req.user
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.log(`Error in isLogin middleware: ${error.message}`);
        res.status(500).send({
            success: false,
            message: `Internal Server Error: ${error.message}`
        });
    }
};

export default isLogin;

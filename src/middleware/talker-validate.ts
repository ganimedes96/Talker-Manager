// import { Request, Response, NextFunction } from "express";

// export class TalkerValidate {
//   public talkerValidateInputs = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => {
//     const { name, email, password, age, rate} = req.body
//     const regex = /\S+@\S+\.\S+/;

    
//     if (!name ) {
//         return res.status(404).json({ message: 'name is required ' })
//     }
    
//     if (!email) {
//         return res.status(404).json({ message: 'email is required' } )
//     }
    
//     if (regex.test(email)) {
//         return res.status(401).json({message: 'Invalid email address'})
//     }
//     if (!password) {
//         return res.status(404).json({ message: 'password is required' } )
//     }

//     if (!age) {
//         return res.status(404).json({ message: 'age is required' } )
//     }

//     if (!rate) {
//         res.status(404).json({ message: 'rate is required'})
//     }

//     next();
//   };
// }

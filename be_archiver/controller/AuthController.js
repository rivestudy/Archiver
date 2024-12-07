import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        if (password !== user.password) {  
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, division: user.division } });
    } catch (error) {
        console.error("Error in loginUser:", error.message);  
        res.status(500).json({ msg: "Server Error", error: error.message });  
    }
};

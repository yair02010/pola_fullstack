    const ContactMessage = require("../models/ContactMessage");

    const sendMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        const newMessage = await ContactMessage.create({
        name,
        email,
        subject,
        message
        });

        res.status(201).json({ message: "Message sent successfully" });
    } catch (err) {
        res.status(400).json({ message: "Failed to send message", error: err.message });
    }
    };

    const getAllMessages = async (req, res) => {
    try {
        const messages = await ContactMessage.find();
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch messages" });
    }
    };

    module.exports = { sendMessage, getAllMessages };

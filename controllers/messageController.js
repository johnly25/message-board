const { render } = require("pug");
const db = require("../db/queries");
const { body, validationResult } = require("express-validator")

const lengthErr = 'must be less than 20 characters';
const messageErr = 'must be at least 1 character';
const validateMessage = [
    body('username')
        .trim()
        .isLength({ max: 20 }).withMessage(`username ${lengthErr}`),
    body('message')
        .trim()
        .isLength({ min: 1 }).withMessage(`message ${messageErr}`)
]

exports.messagesGet = async (req, res) => {
    const messages = await db.getAllMessages();
    const newMessages = messages.map((msg) => {
        const today = new Date();
        return { ...msg, today: today.toDateString() === new Date(msg.date).toDateString() }
    });
    res.render('index', { title: "Mini Messageboards", messages: newMessages });
}

exports.createMessageGet = (req, res) => {
    res.render('form', {});
}

exports.createMessagePost = [
    validateMessage,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("form", {
                title: "Form",
                errors: errors.array(),
            });
        }
        const {username, message} = req.body;
        db.insertMessage(username, message);
        res.redirect("/");
    }
]
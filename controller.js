const formData = require("form-data");
const Mailgun = require("mailgun.js");

const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
const MAIL_TO = process.env.MAIL_TO;
const MAIL_FROM = process.env.MAIL_FROM;

const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: "api",
  key: MAILGUN_API_KEY,
});

const sendFunction = async (req, res) => {
  try {
    const { name, email, phone, description } = req.body;
    if (!name || !email || !phone) {
      return res
        .status(400)
        .json({ message: "Name , Email , Phone are required" });
    }

    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    await mg.messages.create(MAILGUN_DOMAIN, {
      from: MAIL_FROM,
      to: MAIL_TO,
      subject: "Website Related",
      text: `Contact Enquiry Request On Your Website -
        Name:${name},
        Email:${email},
        Whatsapp Number:${phone}
        zLooking For:${description}`,
      "h:Reply-To": email,
    });

    return res.status(200).json({ message: "Email Sent Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { sendFunction };

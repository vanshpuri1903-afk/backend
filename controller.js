const formData = require("form-data");
const Mailgun = require("mailgun.js");

MAILGUN_API_KEY = "e3f37665512fed7ee47372ec23d08706-82cf32bf-e14125a0";
MAILGUN_DOMAIN = "sandbox5df026ac9d8548178e834435edb8c0fe.mailgun.org";
MAIL_TO = "vanshpuri1903@gmail.com";
MAIL_FROM =
  "Website <postmaster@sandbox5df026ac9d8548178e834435edb8c0fe.mailgun.org>";

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

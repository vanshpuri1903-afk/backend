const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kiteretsuplayz19@gmail.com",
    pass: "amkuzsruaqlrbrtj",
  },
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

    await transporter.sendMail({
      from: "kiteretsuplayz19@gmail.com",
      to: "vanshpuri1903@gmail.com",
      subject: "Website Related",
      text: `Contact Enquiry Request On Your Website -
      Name:${name},
      email:${email},
      Whatsapp Number:${phone}
      Looking For:${description}`,
    });

    return res.status(200).json({ message: "Email Sent Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { sendFunction };

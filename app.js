const express = require("express");
const bodyParser = require("body-parser");
const { ServerClient } = require("postmark");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

const PUBLIC_POSTMARK_TOKEN = "d1f74090-97a2-43bd-a51e-b80775a6d689";
const client = new ServerClient(PUBLIC_POSTMARK_TOKEN);

app.post("/send-email", async (req, res) => {
  const { subject, text } = req.body;

  try {
    const response = await client.sendEmail({
      From: "development@neodigital.co.id",
      To: "ayesa@neodigital.co.id",
      Subject: subject,
      TextBody: text,
    });
    console.log("Email sent successfully:", response);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Failed to send email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

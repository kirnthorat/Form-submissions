const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// ✅ Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// ✅ Serve index.html when accessing "/"
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ Handle form submission
app.post("/submit", (req, res) => {
    const { name, email, password, gender } = req.body;

    if (!name || !email || !password || !gender) {
        return res.json({ message: "All fields are required." });
    }

    if (!/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email)) {
        return res.json({ message: "Invalid email format." });
    }

    if (password.length < 6) {
        return res.json({ message: "Password must be at least 6 characters." });
    }

    res.json({ message: "Form submitted successfully!" });
});

// ✅ Start the server
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});

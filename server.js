const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const visaDatabase = [
    {
        appNum: "100065721984",
        docNum: "EQ2467360",
        nationality: "ETHIOPIA",
        status: "Approved"
    },
    {
        appNum: "100065721667",
        docNum: "EQ2580235",
        nationality: "ETHIOPIA",
        status: "Approved"
    }
];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/track', (req, res) => {
    const { appNum, docNum, nationality } = req.body;

    const match = visaDatabase.find(item => 
        item.appNum === appNum.trim() && 
        item.docNum.trim().toUpperCase() === docNum.trim().toUpperCase() &&
        item.nationality === nationality
    );

    if (match) {
        res.json({ success: true, data: match });
    } else {
        res.json({ success: false, message: "No records found. Please check your details." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const cors = require('cors');

// CORS Middleware
app.use(cors())


app.use(express.json());
app.use(bodyParser.json());

// GET Route Example
app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// POST Route Example
app.post('/bfhl', (req, res) => {
  const { data, file_b64 } = req.body;

  let numbers = [];
  let alphabets = [];
  let highestLowerCase = '';

  data.forEach(item => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (typeof item === 'string') {
      alphabets.push(item);
      if (/[a-z]/.test(item)) {
        highestLowerCase = item > highestLowerCase ? item : highestLowerCase;
      }
    }
  });

  const fileValid = !!file_b64;
  const fileMimeType = 'image/png'; 
  const fileSizeKB = file_b64 ? Math.round(Buffer.byteLength(file_b64, 'base64') / 1024) : 0;

  res.json({
    is_success: true,
    user_id: 'ayushi_singh_03092001',
    email: 'as7384@srmist.edu.in',
    roll_number: 'RA2111029010052',
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowerCase ? [highestLowerCase] : [],
    file_valid: fileValid,
    file_mime_type: fileMimeType,
    file_size_kb: fileSizeKB,
  });
});



// Server port
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
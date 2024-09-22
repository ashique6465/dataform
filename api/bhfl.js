// api/bfhl.js

export default async (req, res) => {
  // Enable CORS by setting appropriate headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  try {
    if (req.method === 'POST') {
      const { data, file_b64 } = req.body;
      
      // Validate JSON input, process the data
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
  
      // Mock file validation (in practice you'd handle Base64 decoding)
      const fileValid = !!file_b64;
      const fileMimeType = 'image/png'; // or derive from the Base64 header
      const fileSizeKB = file_b64 ? Math.round(Buffer.byteLength(file_b64, 'base64') / 1024) : 0;
  
      // Respond with data
      res.status(200).json({
        is_success: true,
        user_id: 'ayushi_singh_03092001',
        email: 'as7384@srmist.edu.in',
        roll_number: 'RA2111027010189',
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowerCase ? [highestLowerCase] : [],
        file_valid: fileValid,
        file_mime_type: fileMimeType,
        file_size_kb: fileSizeKB,
      });
    } else if (req.method === 'GET') {
      res.status(200).json({ operation_code: 1 });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

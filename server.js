const express = require('express');
const axios = require('axios');
const app = express();
const port = 9513; // Bạn có thể thay đổi cổng nếu cần

app.use(express.json());

app.get('/id', async (req, res) => {
    const username = req.query.username;

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    try {
        const apiUrl = `http://103.214.11.108:8080/api/usernames2?username=${username}&api_key=mizuharafreekey`;
        const response = await axios.get(apiUrl);

        console.log('API Response:', response.data); // Log phản hồi API

        if (response.status === 200 && response.data.key) {
            const key = response.data.key; // Trích xuất `key` từ phản hồi
            return res.json({
                Status: 'Success',
                key: key
            });
        } else {
            return res.status(404).json({ Status: 'username incorrect', error: 'Key not found in the response' });
        }
    } catch (error) {
        console.error('Error fetching key:', error.message);
        return res.status(500).json({ Status: 'Failure', error: 'An error occurred while fetching the key' });
    }
});

app.listen(port, () => {
    console.log(`API server is running on http://26.174.79.41:${port}`);
});

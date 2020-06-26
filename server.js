const express = require('express');
const app = express();
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000;

//method from db.js
connectDB();


app.get('/', (req, res) =>
    res.send('API Running')
)

// Define Routes
//if user goes to api/SOMETHING we will redirect to routes/api/SOMETHING
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))


app.listen(PORT, () =>
    console.log(`Server listening on port ${PORT}`)
)
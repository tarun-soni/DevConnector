const express = require('express');
const app = express();
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000;
const path = require('path')
//method from db.js
connectDB();

//Init middleware
app.use(express.json({ extended: false }))


// app.get('/', (req, res) =>
//     res.send('API Running')
// )

// Define Routes
//if user goes to api/SOMETHING we will redirect to routes/api/SOMETHING
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

// serve static assets in production
if (process.env.NODE_ENV === 'production') {

    //set static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


app.listen(PORT, () =>
    console.log(`Server listening on port ${PORT}`)
)
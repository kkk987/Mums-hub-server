const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport')
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const postRouter = require('./routes/posts_routes');
const authRouter = require("./routes/auth_routes");

const port = process.env.PORT || 3001;

require("./config/passport");

const app = express();

app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    credentials: true,
    origin: function(origin,callback) {
        console.log("origin:", origin)
        callback(null,true)
    }
}));
app.use(bodyParser.json());
const atlasMongo = 'mongodb+srv://dbadmin:dbadmin@mumshub-afzqt.mongodb.net/test?retryWrites=true&w=majority'
const dbConn = process.env.MONGODB_URI || atlasMongo
// Set three properties to avoid deprecation warnings:
// useNewUrlParser: true
// useUnifiedTopology: true
// useFileAndModify: false
mongoose.connect(dbConn, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    (err) => {
        if (err) {
            console.log('Error connecting to database', err);
        } else {
            console.log('Connected to database!');
        }
    });

// Routes
app.get('/', (req, res) => {
    console.log("get on /");
    res.send("got your request");
})

app.use('/posts', postRouter);
app.use("/auth", authRouter);


app.listen(port, () => {
    console.log(`Blog express app listening on port ${port}`);
});
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@apanscheme.bbxxvsc.mongodb.net/?retryWrites=true&w=majority`;

console.log(uri);
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
}).then(db => {
    console.log("connected to db")
})
    .catch(err => {
        console.log(err)
    })

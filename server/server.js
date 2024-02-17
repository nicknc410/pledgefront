const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');


const port = 3456;
const saltRounds = 10;
const app = express();

const jsonParser = bodyParser.json({ 'limit': '50mb' })
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const uri = "mongodb+srv://siegfiedkev:redbear7@pledging.scgicsd.mongodb.net/?retryWrites=true&w=majority"
async function connect() {
    try {
        await (mongoose.connect(uri));
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error);
    }
}

connect();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
app.use(bodyParser.json({ 'limit': '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const myDB = mongoose.connection;

const fuckUpSchema = mongoose.Schema({
    name: String,
    reason: String,
    count: Number
});

let FuckUp = mongoose.model('fuckups', fuckUpSchema);

app.get('/getFuck', async (req, res) => {
    try {
        const result = await FuckUp.aggregate([
            {
                $group: {
                    _id: null, // Grouping at null means to group all documents together
                    totalCount: { $sum: "$count" } // Sum all "count" fields
                }
            },
            {
                $project: {
                    _id: 0, // Do not include the _id field in the output
                    totalCount: 1 // Include the totalCount field in the output
                }
            }
        ]);

        if (result.length === 0) {
            return res.status(404).send({ success: false, message: "No documents found." });
        }

        // Send the result, which will have the total count
        res.status(200).json(result[0]); // result is an array, we want the first object
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

app.post("/addFuck", jsonParser, (req, res) => {
    const newFuck = new FuckUp({
        name : req.body.name,
        reason: req.body.reason,
        count: req.body.count
    });

    newFuck.save();
})


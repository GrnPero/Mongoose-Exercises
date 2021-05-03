// Uses the mongoose library
const mongoose = require('mongoose');

// Connects to our exercises database, what database is chosen is based on the string after '/localhost/'
mongoose.connect('mongodb://localhost/mongo-exercises', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Unable to connect to MongoDB...', err));

// Defines the database schema for the model
const courseSchema = new mongoose.Schema({
    tags: [ String ],
    date: { type: Date, default: Date.now },
    name: String,
    author: String,
    isPublished: Boolean,
    price: { type: Number },
    __v: { type: Number, default: 0 }
});

// Creates the Course model based on the Schema
const Course = mongoose.model('Course', courseSchema);

/* Defines the async function that:
 * 1. Grabs all the published courses >= 15 or 'by' in their title
 */
async function getCourses() {
    const courses = await Course
        .find({ isPublished: true })
        .or([
            { price: { $gte: 15 } },
            { name: /.*by.*/i }
        ])
        .sort('-price')
        .select('name author price');

    // Display the query result
    console.log(courses);
}

// Calls the function that queries the MongoDB database with Mongoose
getCourses();

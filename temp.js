// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     name: String,
//     age: Number,  // Ensures age must be a number
//     skills: String
// });

// const User = mongoose.model('User', userSchema);

// User.insertMany([
//     { "name": "DAVID", "age": 24, "skills": "finance" },
//     { "name": "SAM", "age": "KJBDSKQWBD", "skills": "Marketing Manager" }, // This will now throw an error!
//     { "name": "CHARLIE", "age": 21, "skills": "Marketing Manager" }
// ]).catch(err => console.log(err));
const data = [
  { name: 'DAVID', age: 24, skills: 'finance' },
  { name: 'SAM', age: 'KJBDSKQWBD', skills: 'Marketing Manager' },
  { name: 'CHARLIE', age: 21, skills: 'Marketing Manager' },
  { name: 'SAM', age: 21, skills: 'Marketing Manager' },
  { name: 'SAM', age: 21, skills: 'Sales Manager' },
  { name: 'SAM', age: 21, skills: 'Software Engineer' }
]
export default data;

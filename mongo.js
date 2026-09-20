// const mongoose = require('mongoose');

// // if (process.argv.length === 2) {
// //   console.log('give password as argument');
// //   process.exit(1);
// // }

// // if (process.argv.length > 2 && process.argv.length < 4) {
// //   console.log('give name as argument');
// //   process.exit(1);
// // }

// // if (process.argv.length < 5) {
// //   console.log('give phone as argument');
// //   process.exit(1);
// // }

// const password = process.argv[2];
// const name = process.argv[3];
// const phone = process.argv[4];

// const url = `mongodb+srv://admin:${password}@cluster0.uvqjlby.mongodb.net/?appName=Cluster0`;

// mongoose.set('strictQuery', false);

// mongoose.connect(url, { family: 4 });

// const personSchema = new mongoose.Schema({
//   name: String,
//   number: String,
// });

// const Person = mongoose.model('Person', personSchema);

// // const person = new Person({
// //   name: name,
// //   number: phone,
// // });

// // person.save().then((result) => {
// //   console.log('person saved!');
// //   mongoose.connection.close();
// // });

// Person.find({}).then((result) => {
//   console.log(`phonebook:`);
//   result.forEach((person) => {
//     console.log(`${person.name} ${person.number}`);
//   });
//   mongoose.connection.close();
// });

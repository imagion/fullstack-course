require('dotenv').config();
const express = require('express');
const Person = require('./models/person');

const app = express();

app.use(express.static('dist'));
app.use(express.json());

let persons = [];

const currentTime = new Date();

const generateId = () => {
  const maxId = Math.floor(Math.random() * 999999999);
  return String(maxId + 1);
};

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => res.json(persons));
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post('/api/persons', (req, res) => {
  const body = req.body;
  const duplicate = persons.some((person) => person.name === body.name);

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'The name or number is missing',
    });
  }

  if (duplicate) {
    return res.status(400).json({
      error: 'The name already exists in the phonebook',
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    id: generateId(),
  });

  person.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});

app.get('/api/info', (req, res) => {
  res.send(`
    <div>Phonebook has info for ${persons.length} people</div>
    <div>${currentTime}</div>
  `);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

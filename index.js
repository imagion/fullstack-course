const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());

morgan.token('data', (req) => {
  console.log(typeof req.body, req.body);
  return req.method === 'POST' ? JSON.stringify(req.body) : '';
});

app.use(
  morgan(`:method :url :status :res[content-length] - :response-time ms :data`),
);

let persons = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

const currentTime = new Date();

const generateId = () => {
  const maxId = Math.floor(Math.random() * 999999999);
  return String(maxId + 1);
};

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const person = persons.find((person) => person.id === id);

  person ? res.json(person) : res.status(404).end();
});

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  persons = persons.filter((note) => note.id !== id);

  res.status(204).end();
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

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);

  res.json(person);
});

app.get('/api/info', (req, res) => {
  res.send(`
    <div>Phonebook has info for ${persons.length} people</div>
    <div>${currentTime}</div>
  `);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

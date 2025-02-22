const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET_KEY = process.env.JWT_SECRET || 'shivghyar';


const agent = {
  username: 'imf_agent',
  password: '4102', 
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (username !== agent.username || password !== agent.password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ message: 'Login successful', token });
};

module.exports = { login };

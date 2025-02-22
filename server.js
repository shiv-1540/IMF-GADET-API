require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db');
const gadgetRoutes = require('./routes/gadgets');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
const { swaggerUi, specs } = require('./swagger');

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));

console.log(`Swagger docs available at http://localhost:${PORT}/api/docs`);

app.use('/api', gadgetRoutes);

app.use('/api', authRoutes);

sequelize.sync().then(() => {
  console.log("Database connected");

  const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  module.exports = server; // Export the server instance
}).catch(err => console.error("Database connection failed:", err));

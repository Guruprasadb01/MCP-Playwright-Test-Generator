require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const generateRoute = require('./routes/generate');
const testsRoute = require('./routes/tests');
const swaggerDoc = require('./swagger.json');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());
// Routes
app.use('/api/generate', generateRoute);
app.use('/api/tests', testsRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
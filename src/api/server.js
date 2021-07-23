require('dotenv').config();
const app = require('./app');

const PORT = process.env.port || 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));

const express = require(`express`);
const deviceRouter = require('../router/device.router.js')

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header('Access-Control-Allow-Headers', 'content-type');
    next();
  });
app.use(express.json());
app.use(express.urlencoded());

app.use('/api/v1/device',deviceRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
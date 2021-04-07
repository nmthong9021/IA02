const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const httpCode = require('./config/httpStatusCode');
require('express-async-errors');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(morgan("dev"));
app.use(cors());


app.get("/", (req, res) => {
    res.send("Hello from first 9021-app");
})

app.use('/api/v1/country', require('./routes/country.route'));


app.use((req, res, next) => {
    res.status(httpCode.CLIENT_ERRORS.NOT_FOUND).json({
        error_message: 'Endpoint not found'
      });
})

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(httpCode.SERVER_ERRORS.INTERNAL_SERVER_ERROR).json({
      error_message: 'Something broke!'
    });
  })

app.listen(PORT, (req, res) => {
    console.log(`server is running at http://localhost:${PORT}`);
})


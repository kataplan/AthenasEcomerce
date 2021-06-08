const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const cors = require('cors');
const hostname = 'localhost';
const port = '3000';

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req: any, res: any) => {
    
});

app.listen(port, hostname, () => {
    console.log('SERVIDOR EJECUTÁNDOSE EN http://localhost:' + port);
});

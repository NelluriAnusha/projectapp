const express = require('express');
const cors = require('cors');
const sql = require('mssql/msnodesqlv8');
const app = express();
app.use(express.json());
app.use(cors());
const config = {
  server: 'setopesql20q.sbl.com',
  database: 'SE2WebMart',
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true
  },
};
// Get inactive contracts
app.get('/inactiveContracts', (req, res) => {
  sql.connect(config, (err) => {
    if (err) {
      console.error('Database connection error:', err);
      res.status(500).send('Error connecting to the database');
    } else {
      const request = new sql.Request();
      request.query('SELECT * FROM del.SearchForContractsHidden WHERE isHidden=1', (err, result) => {
        if (err) {
          console.error('Error executing SQL query:', err);
          res.status(500).send('Error executing SQL query');
        } else {
          res.json(result.recordset);
        }
        sql.close();
      });
    }
  });
});
// Search for a contract by Account number/EntityName
app.get('/contracts/:searchTerm', (req, res) => {
  const searchTerm = req.params.searchTerm;
  sql.connect(config, (err) => {
    if (err) {
      console.error('Database connection error:', err);
      res.status(500).send('Error connecting to the database');
    } else {
      const request = new sql.Request();
      const query = `SELECT * FROM Contract WHERE AccountNumber = '${searchTerm}' OR EntityName = '${searchTerm}'`;
      request.query(query, (err, result) => {
        if (err) {
          console.error('Error executing SQL query:', err);
          res.status(500).send('Error executing SQL query');
        } else {
          res.json(result.recordset);
        }
        sql.close();
      });
    }
  });
});
// Inactivate a contract and insert it into ContractMaskDelaware table
app.post('/inactivateContract/:contractId', (req, res) => {
  const contractId = req.params.contractId;
  sql.connect(config, (err) => {
    if (err) {
      console.error('Database connection error:', err);
      res.status(500).send('Error connecting to the database');
    } else {
      const request = new sql.Request();
      const query = `INSERT INTO ContractMaskDelaware SELECT * FROM Contract WHERE ContractId = ${contractId}`;
      request.query(query, (err) => {
        if (err) {
          console.error('Error executing SQL query:', err);
          res.status(500).send('Error executing SQL query');
        } else {
          res.sendStatus(200);
        }
        sql.close();
      });
    }
  });
});
const port = 4000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
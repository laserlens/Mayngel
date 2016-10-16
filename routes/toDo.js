var router = require('express').Router();
var pg = require('pg');

var config = {
  database:'rho'
};


var pool = new pg.Pool(config);

router.get('/',function (req, res) {
  pool.connect(function (err, client, done) {
    if (err) {
    console.log('Error connectiong to DB', err);
    res.sendStatus(500);
    done();
    return;
    }
    // query the database to get the table information and send to client.js
    client.query('SELECT * FROM toDo ORDER BY mayngelpoints;', function(err, result) {
      done();
      if (err) {
      console.log('Error querrying to DB', err);
      res.sendStatus(500);
      return;
      }
      res.send(result.rows);
    });//end of query
  });// end of connection
});//end of get
router.post('/', function (req, res) {

  pool.connect(function (err,client,done) {
    if (err) {
      res.sendStatus(500);
      done();
      return;
    }
    // query client to add user input to database
    client.query('INSERT INTO toDo (list, mayngelpoints) VALUES ($1, $2);',
                  [req.body.list, req.body.mayngelpoints],
                  function (err, result) {
      done();
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      res.send(result.rows);
    });
  });//end of pool connection
});//end of post
router.delete('/', function (req, res) {
  console.log(req.body);
  pool.connect(function (err,client,done) {
    if (err) {
      res.sendStatus(500);
      done();
      return;
    }
    // query the database to delete desired row
    client.query('DELETE  FROM toDo WHERE id = $1;',
                  [req.body.id],
                  function (err, result) {
      done();
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
        }

        res.send(result.rows);

      });
    });
  });
  router.put('/', function (req, res) {
      var id = req.body.id;
      var mayngelpoints = req.body.mayngelpoints;
      pool.connect(function (err,client,done) {
       try{
        if (err) {
          res.sendStatus(500);
          return;
        }
        //query the database to update the changes to desired row
      client.query('UPDATE toDo SET mayngelpoints = $1 WHERE id = $2;',
                    [mayngelpoints, id],
                        function (err, result) {
                           if (err) {
                             console.log('Error querying database', err);
                             res.sendStatus(500);
                           }
                        });//end of query
      // query the table after update to send updated table to client.js
      client.query('SELECT * FROM toDo ORDER BY mayngelpoints;',
                        function(err, result) {
                          if (err) {
                          console.log('Error querrying to DB', err);
                          res.sendStatus(500);
                          return;
                          }
                          res.send(result.rows);
                        });//end of query

        }finally {
          done();
        }
      });//end of conect
    });//end of put


module.exports = router;

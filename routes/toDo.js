var router = require('express').Router();
var pg = require('pg');

var config = {
  database:'rho'
};

// initialize the database connection pool
var pool = new pg.Pool(config);



router.get('/',function (req, res) {

  //err - an error object, will be not null if there was an error connecting
  //   possible errors, db not running, config is wrong
  //client - object that is used to make queries against the db
  //done - function to call when you're done(returns connection back to pool)
  pool.connect(function (err, client, done) {
    if (err) {
    console.log('Error connectiong to DB', err);
    res.sendStatus(500);
    done();
    return;
    }
    //1. SQL string
    //2. (optional) input perameters
    //3. callback function to execute once the querry finishes
    //      takes an error object and a result object as args
    client.query('SELECT * FROM toDo;', function(err, result) {
      done();
      if (err) {
      console.log('Error querrying to DB', err);
      res.sendStatus(500);
      return;
      }
      console.log('Got rows from the DB',result.rows);
      res.send(result.rows);
    });//end of query

  });// end of connection

});//end of get

router.post('/', function (req, res) {
  console.log(req.body);
  pool.connect(function (err,client,done) {
    if (err) {
      res.sendStatus(500);
      done();
      return;
    }
    client.query('INSERT INTO toDo (list) VALUES ($1) returning *;',
                  [req.body.list],
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
    console.log(req.body);
    pool.connect(function (err,client,done) {
      if (err) {
        res.sendStatus(500);
        done();
        return;
      }
      client.query('INSERT INTO toDo (list) VALUES ($1) returning *;',
                    [req.body.mayngelpoints],
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


module.exports = router;

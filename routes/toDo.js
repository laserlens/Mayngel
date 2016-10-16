var router = require('express').Router();
var pg = require('pg');

var config = {
  database:'rho'
};

// initialize the database connection pool
var pool = new pg.Pool(config);



router.get('/',function (req, res) {

  pool.connect(function (err, client, done) {
    if (err) {
    console.log('Error connectiong to DB', err);
    res.sendStatus(500);
    done();
    return;
    }

    client.query('SELECT * FROM toDo ORDER BY mayngelpoints;', function(err, result) {
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
      console.log('whats id', id);

      pool.connect(function (err,client,done) {
       try{
        if (err) {
          res.sendStatus(500);
          return;
        }
      client.query('UPDATE toDo SET mayngelpoints = $1 WHERE id = $2;',
                    [mayngelpoints, id],
                        function (err, result) {
                           if (err) {
                             console.log('Error querying database', err);
                             res.sendStatus(500);
                           }

                        });//end of query
        }finally {
          done();
        }
      });//end of conect
    });//end of put


module.exports = router;

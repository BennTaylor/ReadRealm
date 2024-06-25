var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql2');
var path = require('path');
var connection = mysql.createConnection({
                host: '35.239.113.202',
                user: 'root',
                password: '',
                database: 'readrealm',
                multipleStatements: true
});

connection.connect(function(err) {
  if (err) {
    return console.error('error connecting: ' + err.stack);
  }
  console.log('connected as id ' + connection.threadId);
});


var app = express();

// set up ejs view engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '../public'));

/* GET home page, respond by rendering index.ejs */
app.get('/', function(req, res) {
  res.render('index', { title: 'Home Page' });
});

/* GET home page, respond by rendering index.ejs */
app.get('/gpdata', function(req, res) {
  res.render('gpdata', { title: 'Genre + Publisher Data' });
});
app.get('/usercreate', function(req, res) {
  res.render('usercreate', { title: 'Register' });
});

app.get('/reviews', function(req, res) {
  res.render('reviews', { title: 'Review' });
});
app.get('/authorsbooks', function(req, res) {
  res.render('authorsbooks', { title: 'Author Search' });
});

app.get('/moderns', function(req, res) {
  res.render('moderns', { title: 'Find Moderns' });
});

app.get('/search', (req, res) => {
  console.log('Received search term:', req.query.search); // Log the search term
  if (!req.query.search) {
      return res.status(400).send('Search term is empty'); // Return an error if the search term is empty
  }
  const searchTerm = req.query.search;
  const sql = `SELECT book_title FROM Books WHERE book_title LIKE ? LIMIT 15;`;
  console.log(sql);
  connection.query(sql, [`%${searchTerm}%`], (err, results) => {
      if (err) {
          console.error('Error in query:', err);
          return res.status(500).send('Database query failed');
      }
      console.log(results)
      res.json(results);
  });
});
app.get('/booktoID', (req, res) => {
  console.log('Received search term:', req.query.search); // Log the search term
  if (!req.query.search) {
      return res.status(400).send('Search term is empty'); // Return an error if the search term is empty
  }
  const searchTerm = req.query.search;
  const sql = `
  SELECT
    book_id,
    book_title
  FROM
    Books
  WHERE
    book_title LIKE ?
  LIMIT 1;
  `;
  console.log(sql);
  connection.query(sql, [`%${searchTerm}%`], (err, results) => {
      if (err) {
          console.error('Error in query:', err);
          return res.status(500).send('Database query failed');
      }
      console.log(results)
      res.json(results);
  });
});

app.get('/api/searchclassics', function(req, res) {
  console.log("hey");
  const year = req.query.year || '2010';
  const startYear = `${year}-01-01`;

  const sql = 'CALL SelectRecentPub(?)';
  connection.query(sql, [startYear], function(err, results) {
      if (err) {
          console.error(err);
          res.status(500).send("Database error");
          return;
      }
      console.log(results[0]);
      res.json(results[0]);
  });
});



app.get('/api/genres_popularity', function(req, res) {
  console.log("button pressed")
  const sql = `
      SELECT 
          G.genre_name,
          AVG(R.Stars) AS average_rating,
          COUNT(DISTINCT B.book_id) AS number_of_books
      FROM 
          Genres G
      JOIN Genres_Book GB ON G.genre_id = GB.genre_id
      JOIN Books B ON GB.book_id = B.book_id
      JOIN Reviews R ON B.book_id = R.book_id
      GROUP BY 
          G.genre_name
      HAVING 
          AVG(R.Stars) >= 4 AND
          COUNT(DISTINCT B.book_id) >= 5
      ORDER BY 
          average_rating DESC
      LIMIT 15;
  `;
  connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result)
      console.log("hey")
      res.json(result);
  });
}
);
app.get('/api/publishers_popularity', function(req, res) {
  const genreName = req.query.genre;  // Get genre from query parameters
  console.log("hello")
  const sql = `
      SELECT
          P.publisher_name,
          AVG(R.Stars) AS average_rating,
          COUNT(R.review_id) AS total_reviews
      FROM
          Publisher P
      JOIN Books B ON P.publisher_id = B.publisher_id
      JOIN Genres_Book GB ON B.book_id = GB.book_id
      JOIN Genres G ON GB.genre_id = G.genre_id AND G.genre_name LIKE ?
      JOIN Reviews R ON B.book_id = R.book_id
      WHERE P.publisher_name != "publisher_name"
      GROUP BY
          P.publisher_name
      HAVING
          COUNT(R.review_id) > 5
      ORDER BY
          AVG(R.Stars) DESC;
  `;
  connection.query(sql, [`%${genreName}%`], function (err, result) {
      if (err) throw err;
      console.log(result)
      console.log("hey")
      res.json(result);
  });
});


app.post('/register', (req, res) => {
  const { userId, firstName, lastName } = req.body;
  const sql = 'START TRANSACTION; INSERT INTO Users (user_id, first_name, last_name) VALUES (?, ?, ?); COMMIT;';
  
  connection.query(sql, [userId, firstName, lastName], (err, result) => {
      if (err) {
          console.error(err);
          if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
              res.status(409).json({ message: 'User ID already exists. Please try a different ID.' });
          } else {
              res.status(500).json({ message: 'Error registering user' });
          }
          return;
      }
      res.json({ message: 'User registered successfully!', userId: userId });
  });
});

app.get('/api/popular_authors', function(req, res) {
  console.log("button pressed")
  const sql = `
  SELECT 
    A.first_name,
    A.last_name,
    AVG(R.Stars) AS average_rating
FROM 
    Author A
JOIN Author_Book AB ON A.author_id = AB.author_id
JOIN Books B ON AB.book_id = B.book_id
JOIN Reviews R ON B.book_id = R.book_id
WHERE
    B.book_id IN (
        SELECT 
            R2.book_id
        FROM 
            Reviews R2
        GROUP BY 
            R2.book_id
        HAVING 
            COUNT(R2.review_id) >= 10
    )
GROUP BY 
    A.author_id
ORDER BY 
    AVG(R.Stars) DESC
LIMIT 15;
  `;
  connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result)
      console.log("hey")
      res.json(result);
  });
}
);

app.get('/api/popular_authors_books', function(req, res) {
  
  const { firstName, lastName } = req.query;
  console.log(firstName)
  console.log(lastName)
  const sql = `
  SELECT
  B.book_title,
  B.release_date
FROM
  Books B
JOIN Author_Book AB ON B.book_id = AB.book_id
JOIN Author A ON AB.author_id = A.author_id
WHERE
  A.first_name LIKE CONCAT('%', ?, '%') AND 
  A.last_name LIKE CONCAT('%', ?, '%')
ORDER BY
  B.release_date DESC
LIMIT 5;
  `;
  connection.query(sql, [firstName, lastName] ,function (err, result) {
      if (err) throw err;
      console.log()
      console.log("hey")
      res.json(result);
  });
}
);
app.post('/submit_review', (req, res) => {
  const { userId, rating, reviewText, bookId } = req.body;
  const sql = `
  START TRANSACTION; INSERT INTO Reviews (user_id, Stars, review_text, book_id) VALUES (?, ?, ?, ?); COMMIT;`;

  connection.query(sql, [userId, rating, reviewText, bookId], (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).json({ message: 'Error submitting review' });
          return;
      }
      res.json({ message: 'Review submitted successfully!' });
  });
});

app.get('/api/leaderboards', (req, res) => {
  console.log("hey")
  const query = `
    SELECT 
      U.user_id,
      U.first_name,
      U.last_name,
      UserStats.average_rating,
      UserStats.total_reviews
    FROM 
      (
        SELECT 
          R.user_id,
          AVG(R.Stars) AS average_rating,
          COUNT(R.review_id) AS total_reviews
        FROM 
          Reviews R
        GROUP BY 
          R.user_id
        HAVING 
          COUNT(R.review_id) >= 2
      ) AS UserStats
    JOIN Users U ON UserStats.user_id = U.user_id
    ORDER BY 
      UserStats.total_reviews DESC, UserStats.average_rating DESC
    LIMIT 15;
  `;
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error in SQL query', err);
      res.status(500).send('Error fetching user statistics');
      return;
    }
    console.log(results)
    res.json(results);
  });
});

app.listen(80, function () {
    console.log('Node app is running on port 80');
});

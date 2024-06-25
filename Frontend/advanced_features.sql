DELIMITER //
CREATE PROCEDURE SelectRecentPub(IN rel_date DATETIME)
BEGIN
    SELECT 
    B.book_title,
    AVG(R.Stars) AS average_rating,
    (
        SELECT COUNT(DISTINCT AB.author_id)
        FROM Author_Book AB
        WHERE AB.book_id = B.book_id
    ) AS author_count
    FROM 
    Books B
    LEFT JOIN Reviews R ON B.book_id = R.book_id
    WHERE 
        B.release_date > rel_date
    GROUP BY 
        B.book_id, B.book_title
    HAVING 
        COUNT(R.review_id) > 3
    ORDER BY 
        author_count DESC
    LIMIT 15;
END//
DELIMITER ;

START TRANSACTION;
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
INSERT INTO Reviews (review_id, user_id, Stars, review_text, book_id)
VALUES (?, ?, ?, ?);
ROLLBACK;

START TRANSACTION;
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
INSERT INTO Reviews (review_id, user_id, Stars, review_text, book_id)
VALUES (?, ?, ?, ?);
ROLLBACK;

START TRANSACTION;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
ALTER TABLE Reviews AUTO_INCREMENT = 300100;
ALTER TABLE Reviews MODIFY COLUMN review_id INT NOT NULL AUTO_INCREMENT;  
INSERT INTO Reviews (user_id, Stars, review_text, book_id)
VALUES (?, ?, ?, ?);
COMMIT;
DELIMITER //
CREATE TRIGGER prevent_duplicate_user
BEFORE INSERT ON Users
FOR EACH ROW
BEGIN
    DECLARE user_count INT;

    SELECT COUNT(*) INTO user_count
    FROM Users
    WHERE user_id = NEW.user_id;

    IF user_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'User already exists';
    END IF;
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER replace_existing_review
BEFORE INSERT ON Reviews
FOR EACH ROW
BEGIN
    DECLARE rev_count INT;

    SELECT COUNT(*) INTO rev_count
    FROM Reviews
    WHERE user_id = NEW.user_id AND book_id = NEW.book_id;

    IF rev_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Review for book from user already exists';
    END IF;
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER check_review_validity
BEFORE INSERT ON Reviews
FOR EACH ROW
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM Users
        WHERE user_id = NEW.user_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'user_id not found';
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM Books
        WHERE book_id = NEW.book_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'book_id not found';
    END IF;
END//
DELIMITER ;

/* TEST for replace_existing_review */
START TRANSACTION;
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
INSERT INTO Reviews (review_id, user_id, Stars, review_text, book_id)
VALUES (300000, 'pboicarti', 1, 'Nvm, hated it', 1);
ROLLBACK;

/* TEST for check_review_validity */
START TRANSACTION;
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
INSERT INTO Reviews (review_id, user_id, Stars, review_text, book_id)
VALUES (300000, 'pboicarti', 1, 'Nvm, hated it', 212404);
ROLLBACK;

/* review_id problem */
START TRANSACTION;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
ALTER TABLE Reviews AUTO_INCREMENT = 300100;
ALTER TABLE Reviews MODIFY COLUMN review_id INT NOT NULL AUTO_INCREMENT;  
INSERT INTO Reviews (user_id, Stars, review_text, book_id)
VALUES ('pboicarti', 4, 'pretty good', 2);
COMMIT;

/* RIGHT */
= Unify{
    ( Z=F(Y,X) ),
    ( g(Z,i,i)=l(Z) ),
    ( Z=f(l(Z),X) ),
    ( f(X,Y)=f(g(Z,b,Z),Y) )
}
/* WRONG */
= Unify{
    ( Z=F(Y,X) ),
    ( g(Z,i,i)=l(Z) ),
    ( Z=f(l(Z),X) ),
    ( X=g(Z,b,Z) ),
    ( Y=Y )
}
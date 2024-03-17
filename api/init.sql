CREATE DATABASE IF NOT EXISTS university;
USE university;


CREATE TABLE IF NOT EXISTS user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    isAdmin BOOLEAN NOT NULL DEFAULT false
);


CREATE TABLE IF NOT EXISTS student (
    user_id INT PRIMARY KEY,
    ra INT UNIQUE NOT NULL CHECK(ra > 6),
    cpf VARCHAR(11) UNIQUE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS authentication (
    user_id INT PRIMARY KEY,
    jwt_token VARCHAR(255) NOT NULL,
    expiration_date DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
);





---- Alteração para Delete ON CASCADE
ALTER TABLE student
DROP FOREIGN KEY student_ibfk_1;

ALTER TABLE student
ADD CONSTRAINT student_ibfk_1 FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE;



INSERT INTO user (name, email, isAdmin) VALUES
    ('Aluno 1', 'aluno1@example.com', false),
    ('Aluno 2', 'aluno2@example.com', false),
    ('Aluno 3', 'aluno3@example.com', false),
    ('Aluno 4', 'aluno4@example.com', false),
    ('Aluno 5', 'aluno5@example.com', false),
    ('Aluno 6', 'aluno6@example.com', false),
    ('Aluno 7', 'aluno7@example.com', false),
    ('Aluno 8', 'aluno8@example.com', false),
    ('Aluno 9', 'aluno9@example.com', false),
    ('Aluno 10', 'aluno10@example.com', false);


INSERT INTO user (name, email, isAdmin) VALUES
    ('Admin 1', 'admin1@example.com', true),
    ('Admin 2', 'admin2@example.com', true),
    ('Admin 3', 'admin3@example.com', true),
    ('Admin 4', 'admin4@example.com', true),
    ('Admin 5', 'admin5@example.com', true);


INSERT INTO student (user_id, ra, cpf) VALUES
    (1, 123456, '12345678901'),
    (2, 234567, '23456789012'),
    (3, 345678, '34567890123'),
    (4, 456789, '45678901234'),
    (5, 567890, '56789012345'),
    (6, 678901, '67890123456'),
    (7, 789012, '78901234567'),
    (8, 890123, '89012345678'),
    (9, 901234, '90123456789'),
    (10, 123456, '12345678901');


INSERT INTO authentication (user_id, jwt_token, expiration_date) VALUES
    (11, 'admin_jwt_1', '2022-12-31 23:59:59'),
    (12, 'admin_jwt_2', '2022-12-31 23:59:59'),
    (13, 'admin_jwt_3', '2022-12-31 23:59:59'),
    (14, 'admin_jwt_4', '2022-12-31 23:59:59'),
    (15, 'admin_jwt_5', '2022-12-31 23:59:59');



CREATE PROCEDURE create_student_procedure(
   	IN name VARCHAR(50),
    IN email VARCHAR(100),
    IN ra INT,
    IN cpf VARCHAR(11)
    OUT result VARCHAR(50)
)
LANGUAGE SQL
DETERMINISTIC
CONTAINS SQL
SQL SECURITY DEFINER
COMMENT ''
BEGIN
    DECLARE new_user_id INT;

    START TRANSACTION;

    INSERT INTO user (name, email, isAdmin) VALUES (name, email, false);

    SET new_user_id = LAST_INSERT_ID();

    INSERT INTO student (user_id, ra, cpf) VALUES (new_user_id, ra, cpf);

    COMMIT;
END


CREATE FUNCTION create_student(
    name VARCHAR(50),
    email VARCHAR(100),
    ra INT,
    cpf VARCHAR(11)
)
RETURNS BOOLEAN
LANGUAGE SQL
DETERMINISTIC
CONTAINS SQL
SQL SECURITY DEFINER
COMMENT ''
BEGIN
    DECLARE ra_exists BOOLEAN;
    DECLARE ra_int INT;

    IF ra_to_check REGEXP '^[0-9]+$' THEN

        SET ra_int = CAST(ra_to_check AS UNSIGNED);

        IF EXISTS (SELECT 1 FROM student WHERE ra = ra_int) THEN
            SET ra_exists = TRUE;
        ELSE
            SET ra_exists = FALSE;
        END IF;
    ELSE
        SET ra_exists = FALSE;
    END IF;

    RETURN ra_exists;
END




CREATE FUNCTION check_ra_exists(
    ra_to_check VARCHAR(20)
)
RETURNS BOOLEAN
LANGUAGE SQL
DETERMINISTIC
CONTAINS SQL
SQL SECURITY DEFINER
COMMENT ''
BEGIN
    DECLARE ra_exists BOOLEAN;
    DECLARE ra_int INT;

    IF ra_to_check REGEXP '^[0-9]+$' THEN

        SET ra_int = CAST(ra_to_check AS UNSIGNED);

        IF EXISTS (SELECT 1 FROM student WHERE ra = ra_int) THEN
            SET ra_exists = TRUE;
        ELSE
            SET ra_exists = FALSE;
        END IF;
    ELSE
        SET ra_exists = FALSE;
    END IF;

    RETURN ra_exists;
END



CREATE PROCEDURE create_student_procedure(
    IN name VARCHAR(50),
    IN email VARCHAR(100),
    IN ra INT,
    IN cpf VARCHAR(11),
    OUT result VARCHAR(50)
)
LANGUAGE SQL
DETERMINISTIC
CONTAINS SQL
SQL SECURITY DEFINER
COMMENT ''
BEGIN
    DECLARE new_user_id INT;
    DECLARE ra_exists BOOLEAN;

--    DECLARE CUSTOM_EXCEPTION_EMAIL CONDITION FOR SQLSTATE '45000';
--    
--     IF EXISTS (SELECT 1 FROM user WHERE email = email) THEN
--     	SIGNAL CUSTOM_EXCEPTION_EMAIL;
--         SET result = 'Error: Email already registered';
--     END IF;

    SET ra_exists = check_ra_exists(ra);

    IF ra_exists THEN
        SET result = 'Error: RA already exists in the database';
    ELSE
        START TRANSACTION;

        INSERT INTO user (name, email, isAdmin) VALUES (name, email, false);

        SET new_user_id = LAST_INSERT_ID();

        INSERT INTO student (user_id, ra, cpf) VALUES (new_user_id, ra, cpf);

        COMMIT;

        SET result = 'OK';
    END IF;
END



CREATE FUNCTION check_cpf_email_exists(
    cpf_to_check VARCHAR(11),
    email_to_check VARCHAR(100)
)
RETURNS BOOLEAN
LANGUAGE SQL
DETERMINISTIC
CONTAINS SQL
SQL SECURITY DEFINER
COMMENT ''
BEGIN
    DECLARE cpf_exists BOOLEAN;
    DECLARE email_exists BOOLEAN;


    IF EXISTS (SELECT 1 FROM student WHERE cpf = cpf_to_check) THEN
        SET cpf_exists = TRUE;
    ELSE
        SET cpf_exists = FALSE;
    END IF;


    IF EXISTS (SELECT 1 FROM user WHERE email = email_to_check) THEN
        SET email_exists = TRUE;
    ELSE
        SET email_exists = FALSE;
    END IF;

    RETURN (cpf_exists OR email_exists);
END;


SELECT check_ra_exists("123s456")

SELECt check_ra_exists('wrerw');

CALL create_student_procedure('Fulano teste 1', 'qenwe@example.com', 1283174, '12345678906', @result);

SELECT @result;
CREATE TABLE users (
user_id     INT(8) NOT NULL AUTO_INCREMENT,
user_name   VARCHAR(30) NOT NULL,
user_pass   VARCHAR(255) NOT NULL,
user_email  VARCHAR(255) NOT NULL,
user_date   DATETIME NOT NULL,
user_level  INT(8) NOT NULL,
UNIQUE INDEX user_name_unique (user_name),
PRIMARY KEY (user_id)
) TYPE=INNODB;

CREATE TABLE categories (
cat_id          INT(8) NOT NULL AUTO_INCREMENT,
cat_name        VARCHAR(255) NOT NULL,
cat_description     VARCHAR(255) NOT NULL,
UNIQUE INDEX cat_name_unique (cat_name),
PRIMARY KEY (cat_id)
) TYPE=INNODB;

CREATE TABLE topics (
topic_id        INT(8) NOT NULL AUTO_INCREMENT,
topic_title       VARCHAR(255) NOT NULL,
topic_date      DATETIME NOT NULL,
topic_cat      INT(8) NOT NULL, --may not need
topic_body      TEXT NOT NULL,
topic_author        INT(8) NOT NULL,
PRIMARY KEY (topic_id)
) TYPE=INNODB;

CREATE TABLE replies (
reply_id         INT(8) NOT NULL AUTO_INCREMENT,
reply_content        TEXT NOT NULL,
reply_date       DATETIME NOT NULL,
reply_topic      INT(8) NOT NULL,
reply_author     INT(8) NOT NULL,
PRIMARY KEY (reply_id)
) TYPE=INNODB;

ALTER TABLE topics ADD FOREIGN KEY(topic_cat) REFERENCES categories(cat_id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE topics ADD FOREIGN KEY(topic_author) REFERENCES users(user_id) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE replies ADD FOREIGN KEY(reply_topic) REFERENCES topics(topic_id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE replies ADD FOREIGN KEY(reply_author) REFERENCES users(user_id) ON DELETE RESTRICT ON UPDATE CASCADE;
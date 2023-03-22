CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE orders(
id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  userid uuid NOT NULL,
  status VARCHAR(255) NOT NULL,
      CONSTRAINT fk_orders_users
        FOREIGN KEY (userid)
            REFERENCES users(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE
);

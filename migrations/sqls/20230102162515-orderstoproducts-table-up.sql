CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE ordertoproducts (
id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  orderid uuid NOT NULL,
  productid uuid NOT NULL,
  productQuantity VARCHAR(255) NOT NULL,
    CONSTRAINT fk_order
        FOREIGN KEY (orderid)
            REFERENCES orders(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
    CONSTRAINT fk_products
        FOREIGN KEY (productid)
            REFERENCES products(id)
            ON DELETE CASCADE
            ON  UPDATE CASCADE
);
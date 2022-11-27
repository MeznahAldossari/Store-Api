CREATE TABLE Orders(
    id SERIAL PRIMARY KEY,
    userid INTEGER NOT NULL REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    order_status VARCHAR(50) NOT NULL CHECK(order_status IN ('active', 'completed'))
);
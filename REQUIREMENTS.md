# API Requirements

## API Endpoints

#### Products

- Index http://localhost:9466/api/all_products/ [GET]
- Show http://localhost:9466/api/productid/2 [GET]
- Create http://localhost:9466/api/product/ [POST]
- update http://localhost:9466/api/update_product/2 [PUT]
- delete http://localhost:9466/api/remove_Product/3 [DELETE]

#### Users

- Index http://localhost:9466/api/all_users/ [GET]
- Show http://localhost:9466/api/userid/4 [GET]
- Create http://localhost:9466/api/users/newuser/added [POST]
- update http://localhost:9466/api/update_user/4 [PUT]
- delete http://localhost:9466/api/remove_user/3 [DELETE]

#### Orders

- Index http://localhost:9466/api/all_orders/ [GET]
- Show http://localhost:9466/api/orderid/2 [GET]
- show all orders for specific user http://localhost:9466/api/user_orderid/userOrders/2 [GET]
- Create http://localhost:9466/api/order/ [POST]
- update http://localhost:9466/api/update_order/2 [PUT]
- delete http://localhost:9466/api/remove_order/4 [DELETE]
- Add Product to Order http://localhost:9466/api/product_order/addProduct/ [POST]
- show all products for specific order http://localhost:9466/api/order_products/orderProduct/1 [GET]

## Data Shapes

#### Product

- id SERIAL PRIMARY KEY,
- product_name VARCHAR(100) NOT NULL,
- price INTEGER NOT NULL

#### Users

- id SERIAL PRIMARY KEY,
- username VARCHAR(100) UNIQUE NOT NULL,
- firstname VARCHAR(100) NOT NULL,
- lastname VARCHAR(100) NOT NULL,
- user_password VARCHAR(100) NOT NULL

#### Orders

- id SERIAL PRIMARY KEY,
- userid INTEGER NOT NULL REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE,
- order_status VARCHAR(50) NOT NULL CHECK(order_status IN ('active', 'completed'))

#### orderproduct

- id SERIAL PRIMARY KEY,
- order_id INTEGER NOT NULL REFERENCES Orders(id) ON DELETE CASCADE ON UPDATE CASCADE,
- product_id INTEGER NOT NULL REFERENCES product(id) ON DELETE CASCADE ON UPDATE CASCADE,
- quantity INTEGER NOT NULL

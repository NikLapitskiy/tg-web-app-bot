CREATE DATABASE food_delivery;

USE food_delivery;

-- Таблица пользователей
CREATE TABLE users (
    user_id BIGINT PRIMARY KEY,
    username VARCHAR(50),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    role ENUM('user', 'admin', 'courier', 'restaurant') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Таблица ресторанов
CREATE TABLE restaurants (
    restaurant_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    phone VARCHAR(15),
    rating DECIMAL(2, 1),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Таблица категорий
CREATE TABLE categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

-- Таблица меню
CREATE TABLE menus (
    menu_id INT PRIMARY KEY AUTO_INCREMENT,
    restaurant_id INT,
    category_id INT,
    item_name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    available BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

-- Таблица ингредиентов
CREATE TABLE ingredients (
    ingredient_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

-- Таблица связи меню и ингредиентов
CREATE TABLE menu_ingredients (
    menu_ingredient_id INT PRIMARY KEY AUTO_INCREMENT,
    menu_id INT,
    ingredient_id INT,
    FOREIGN KEY (menu_id) REFERENCES menus(menu_id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id)
);

-- Таблица заказов
CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    restaurant_id INT,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'in_progress', 'completed', 'canceled') NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id)
);

-- Таблица позиций заказа
CREATE TABLE order_items (
    order_item_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    menu_id INT,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (menu_id) REFERENCES menus(menu_id)
);

-- Таблица отзывов
CREATE TABLE reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    restaurant_id INT,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id)
);

-- Таблица доставок
CREATE TABLE deliveries (
    delivery_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    courier_id BIGINT,
    status ENUM('pending', 'in_progress', 'delivered') NOT NULL,
    delivery_address VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (courier_id) REFERENCES users(user_id)
);


-- добавление строк в таблицы

INSERT INTO users (user_id, role, created_at) VALUES 
(1, 'admin', NOW());

-- Добавление категорий (если это еще не сделано)
INSERT INTO categories (name) VALUES 
('Пицца'),
('Суши'),
('Бургеры'),
('Десерты'),
('Напитки'),
('Салаты'),
('Закуски');

-- Добавление ресторанов
INSERT INTO restaurants (user_id, name, address, phone, rating) VALUES 
(1, 'Пиццерия Мама Миа', 'ул. Пиццы, 1', '1234567890', 4.5),
(1, 'Суши-Бар Находка', 'ул. Суши, 2', '0987654321', 4.7),
(1, 'Бургерная Бургер Кинг', 'ул. Бургеров, 3', '1122334455', 4.0),
(1, 'Кафе Сладкоежка', 'ул. Десертов, 4', '2233445566', 4.8),
(1, 'Салатный бар', 'ул. Здоровья, 5', '3344556677', 4.6),
(1, 'Закусочная Огонёк', 'ул. Закусок, 6', '4455667788', 4.2),
(1, 'Суши-Шоп', 'ул. Японии, 7', '5566778899', 4.9),
(1, 'Пиццерия Италия', 'ул. Итальянская, 8', '6677889900', 4.3),
(1, 'Кафе Уют', 'ул. Уюта, 9', '7788990011', 4.1),
(1, 'Бургерная Вкуснотища', 'ул. Вкуса, 10', '8899001122', 4.4);

-- Добавление блюд в меню
INSERT INTO menus (restaurant_id, category_id, item_name, description, price, available) VALUES 
(1, 1, 'Маргарита', 'Классическая пицца с томатами и моцареллой.', 500.00, TRUE),
(1, 1, 'Пепперони', 'Пицца с колбасой пепперони.', 600.00, TRUE),
(1, 1, 'Гавайская', 'Пицца с ананасами и ветчиной.', 650.00, TRUE),
(2, 2, 'Калифорнийские роллы', 'Роллы с крабом и авокадо.', 450.00, TRUE),
(2, 2, 'Филадельфия', 'Роллы с лососем и сливочным сыром.', 500.00, TRUE),
(2, 2, 'Дракон', 'Роллы с угрем и авокадо.', 550.00, TRUE),
(3, 3, 'Чизбургер', 'Бургер с сыром и говяжьей котлетой.', 300.00, TRUE),
(3, 3, 'Вегетарианский бургер', 'Бургер с овощами и соевым мясом.', 350.00, TRUE),
(3, 3, 'Бургер с грибами', 'Бургер с грибами и сыром.', 400.00, TRUE),
(4, 4, 'Торт Наполеон', 'Слойка с кремом и орехами.', 250.00, TRUE),
(4, 4, 'Мороженое', 'Разные сорта мороженого.', 100.00, TRUE),
(5, 5, 'Цезарь', 'Салат с курицей и пармезаном.', 350.00, TRUE),
(5, 5, 'Греческий', 'Салат с оливками и фетой.', 300.00, TRUE),
(6, 6, 'Картошка фри', 'Хрустящая картошка фри.', 150.00, TRUE),
(6, 6, 'Наггетсы', 'Куриные наггетсы с соусом.', 250.00, TRUE),
(7, 2, 'Кунг Пао', 'Курица в остром соусе.', 600.00, TRUE),
(7, 2, 'Суп Мисо', 'Традиционный японский суп.', 200.00, TRUE),
(8, 1, 'Пицца с морепродуктами', 'Пицца с морепродуктами.', 800.00, TRUE),
(9, 4, 'Шоколадный торт', 'Торт с шоколадным кремом.', 300.00, TRUE),
(10, 3, 'Бургер с беконом', 'Бургер с беконом и сыром.', 450.00, TRUE);

-- Добавление ингредиентов
INSERT INTO ingredients (name) VALUES 
('Томат'),
('Моцарелла'),
('Колбаса пепперони'),
('Краб'),
('Авокадо'),
('Лосось'),
('Сыр'),
('Овощи'),
('Крем'),
('Орехи'),
('Курица'),
('Бекон'),
('Салат'),
('Фета'),
('Угорь'),
('Грибы');

-- Добавление позиций заказа
INSERT INTO order_items (order_id, menu_id, quantity) VALUES 
(1, 1, 2),  -- 2 Маргариты
(1, 3, 1),  -- 1 Чизбургер
(2, 4, 3),  -- 3 Калифорнийских ролла
(2, 7, 1),  -- 1 Торт Наполеон
(3, 2, 5),  -- 5 Филадельфий
(3, 6, 2),  -- 2 Наггетса
(4, 1, 1),  -- 1 Гавайская
(4, 8, 1),  -- 1 Бургер с грибами
(5, 5, 2),  -- 2 Цезаря
(5, 10, 1); -- 1 Бургер с беконом

-- Добавление заказов
INSERT INTO orders (user_id, restaurant_id, total_amount, status) VALUES 
(1, 1, 1100.00, 'completed'),
(1, 2, 1450.00, 'pending'),
(1, 3, 800.00, 'completed'),
(1, 4, 500.00, 'pending'),
(1, 5, 700.00, 'completed'),
(1, 6, 400.00, 'completed'),
(1, 7, 900.00, 'completed'),
(1, 8, 1200.00, 'pending');

-- Добавление отзывов
INSERT INTO reviews (user_id, restaurant_id, rating, comment) VALUES 
(1, 1, 5, 'Отличная пицца, очень вкусно!'),
(1, 2, 4, 'Суши были свежими, но немного дороговаты.'),
(1, 3, 3, 'Бургер был обычным.'),
(1, 4, 5, 'Торт Наполеон просто великолепен!'),
(1, 5, 4, 'Салаты свежие и вкусные.'),
(1, 6, 4, 'Наггетсы хрустящие, но соус мог быть лучше.'),
(1, 7, 5, 'Лучшие суши в городе!'),
(1, 8, 4, 'Пицца с морепродуктами была хороша.');

-- Добавление доставок
INSERT INTO deliveries (order_id, courier_id, status, delivery_address) VALUES 
(1, 1, 'delivered', 'ул. Клиента, 10'),
(2, 2, 'pending', 'ул. Клиента, 20'),
(3, 3, 'delivered', 'ул. Клиента, 30'),
(4, 4, 'pending', 'ул. Клиента, 40'),
(5, 1, 'delivered', 'ул. Клиента, 50'),
(6, 2, 'delivered', 'ул. Клиента, 60'),
(7, 3, 'pending', 'ул. Клиента, 70'),
(8, 4, 'delivered', 'ул. Клиента, 80');

INSERT INTO restaurants (user_id, name, address, phone, rating) VALUES  
(1, 'Пиццерия Мама Миа', 'ул. Пиццы, 1', '1234567890', 4.5), 
(1, 'Суши-Бар Находка', 'ул. Суши, 2', '0987654321', 4.7),
(1, 'Бургерная Бургер Кинг', 'ул. Бургеров, 3', '1122334455', 4.0),
(1, 'Кафе Сладкоежка', 'ул. Десертов, 4', '2233445566', 4.8), 
(1, 'Салатный бар', 'ул. Здоровья, 5', '3344556677', 4.6),
(1, 'Закусочная Огонёк', 'ул. Закусок, 6', '4455667788', 4.2),
(1, 'Суши-Шоп', 'ул. Японии, 7', '5566778899', 4.9), 
(1, 'Пиццерия Италия', 'ул. Итальянская, 8', '6677889900', 4.3),
(1, 'Кафе Уют', 'ул. Уюта, 9', '7788990011', 4.1), 
(1, 'Бургерная Вкуснотища', 'ул. Вкуса, 10', '8899001122', 4.4)

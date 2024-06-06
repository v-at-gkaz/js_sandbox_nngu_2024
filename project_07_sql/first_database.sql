--DDL
CREATE TABLE public.users (
	id serial4 NOT NULL PRIMARY KEY,
	"login" varchar(100) NOT NULL,
	password varchar(100) NOT NULL,
	CONSTRAINT login_uniq UNIQUE (login)
);
CREATE TABLE public.customers (
	id serial4 NOT NULL PRIMARY KEY,
	"name" varchar(256) NOT NULL,
	email varchar(128) NOT NULL,
	CONSTRAINT customers_email_key UNIQUE (email)
);
CREATE TABLE public.orders (
	id serial4 NOT NULL PRIMARY KEY,
	customer_id int4 NULL,
	CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE public.products (
	id serial4 NOT NULL PRIMARY KEY,
	"name" varchar(256) NOT NULL,
	price numeric(10, 2) NOT NULL
);
CREATE TABLE public.order_product (
	order_id int4 NOT NULL,
	product_id int4 NOT NULL,
	quantity int4 NOT NULL,
	CONSTRAINT order_product_pk PRIMARY KEY (order_id, product_id),
	CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE ON UPDATE CASCADE
);

--DML
INSERT INTO public.products ("name",price) VALUES
('Сгущенное молоко',60),
('Сыр',200),
('Молоко',50),
('Сахар',150),
('Сливочное масло',150),
('Батон',35);

INSERT INTO public.customers ("name",email) VALUES
('Вася','vasya@mail.ru'),
('Маша','masha@ya.ru');

INSERT INTO public.orders (customer_id) VALUES
(1),(2);

INSERT INTO public.order_product (order_id, product_id, quantity) VALUES
(1, 1, 1),(1, 2, 2),(1, 3, 3),(2, 4, 3),(2, 5, 1),(2, 6, 2);

--select o.id "Номер заказа", c."name" "Заказчик", c.email "Электропочта", p."name" "Товар", p.id "Product Id", p.price "Цена", op.quantity "кол-во" from orders o, customers c, products p, order_product op where o.customer_id = c.id and c.id = 2 and o.id = op.order_id and op.product_id = p.id;
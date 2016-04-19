drop table if exists orders;
drop table if exists menu_items;

create table orders(
  order_id serial primary key unique,
  drink_name varchar(50),
  size varchar(1),
  price numeric,
  ready boolean not null default false,
  comments text
);

create table menu_items(
  item_id serial primary key unique,
  item_name varchar(50),
  base_price numeric
);

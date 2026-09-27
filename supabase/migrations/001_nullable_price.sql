-- Makes price optional: a product with no price shows "Contact for price"
-- on the site instead of an amount. Run this once in your Supabase
-- project's SQL editor (Dashboard -> SQL Editor -> New query -> paste -> Run).

alter table products alter column price drop not null;

-- A sale price only makes sense alongside a real price.
alter table products drop constraint if exists products_sale_price_check;
alter table products add constraint products_sale_price_check
  check (sale_price is null or (sale_price >= 0 and price is not null));

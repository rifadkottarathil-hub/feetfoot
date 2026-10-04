-- Adds "Sandals" as a valid product category. Sandals get their own
-- standalone /sandals page (brand filter only, no category filter) rather
-- than appearing in the regular Shop/brand category browsing.
alter table products drop constraint if exists products_category_check;
alter table products add constraint products_category_check
  check (category in ('Running', 'Lifestyle', 'Basketball', 'Training', 'Sandals'));

-- drop table if exists subscribers;

create table if not exists subscribers (
        id serial primary key,
        name text not null,
        email text not null unique
);

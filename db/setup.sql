create table users(
	 user_id serial primary key,
	 username varchar(50) unique not null,
	 password varchar(50) not null
);

create table messages(
	message_id serial primary key,
	user_id serial references users(user_id) not null,
	data varchar(140),
	date timestamp not null
);

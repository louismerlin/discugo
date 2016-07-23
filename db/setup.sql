create table messages(
	message_id serial primary key,
	user_name varchar(16) not null,
	body varchar(140),
	channel varchar(16) not null,
	time_sent timestamp not null
);

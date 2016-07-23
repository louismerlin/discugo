create table messages(
	message_id serial primary key,
	user_name varchar(16) not null,
	body varchar(140),
	time_sent timestamp not null
);

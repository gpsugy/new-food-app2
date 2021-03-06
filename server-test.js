var unirest = require('unirest');

unirest.get('http://localhost:8080/test').end(function(res) {
	if (res.body !== 'test') {
		'test route broke!!!';
	}
});

unirest.post('http://localhost:8080/test')
.headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
.send({
	id: 1,
	name: 'Sugy Ghang',
	email: 'gpsugy@gmail.com'
})
.end(function(res) {
	console.log(res.body);
});

// unirest.post('http://localhost:8080/signup')
// .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
// .send({
// 	email: 'test19@gmail.com',
// 	password: 'password'
// })
// .end(function(res) {
// 	console.log(res.body);
// });

// unirest.post('http://localhost:8080/login')
// .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
// .send({
// 	email: 'test17@gmail.com',
// 	password: 'password'
// })
// .end(function(res) {
// 	console.log('***Login***');
// 	console.log(res.body);
// });

unirest.post('http://localhost:8080/filter-defaults')
.headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
.send({
	email: 'test19@gmail.com',
	filters: {
		rating_si: 2,
		prices: [1, null, null, 4],
		distance_fi: 1
	}
})
.end(function(res) {
	console.log('***Filter Defaults***');
	console.log(res.body);
});

// unirest.post('http://localhost:8080/user')
// .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
// .send({
// 	id: 1,
// 	name: 'Sugy Ghang',
// 	email: 'gpsugy@gmail.com'
// })
// .end(function(res) {
// 	console.log(res.body);
// });

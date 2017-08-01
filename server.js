//configure servers routes in this file
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//port for heroku deployment
const port = process.env.PORT || 3000;
//make a new express App -- with no arguments
var app = express();

//support code per parcials
hbs.registerPartials(__dirname + '/views/partials');
//set express configurations
//view engine tells express what view engine we want to use
app.set('view engine', 'hbs');
//new deroctory views, defualt directory that express uses for our templates
//express middle ware - configure how express application works
app.use(express.static(__dirname + '/public')); //absolute path that want serve out

app.use((req, res, next) => { //we use next when module functionality is done
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err){
			console.log('Unbale to append to server.log');
		}
	});
	next()//next() it means application will continue to run
})

// app.use((req, res, next) => {
// 	res.render('mantainence.hbs');
// })

//create helpers, takes two argument, name and function --error-
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase()
});

//__dirname, stores the project path directory

//http handelers
//request -> all the request comming in, body, information 
//response -> respond to http request
app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to my Website'
	});
	//method res.sent('')
	//-res.send('<h1>Hello express!</h1>');
	//how to get json request
	// res.send({
	// 	name: 'Sebastian',
	// 	likes: [
	// 		'Biking',
	// 		'CrossFit',
	// 		'Coffe'
	// 	]
	// });
});

//adding mire routes
app.get('/about', (req, res) => {
	//to render tamplate use render method
	//res.send('<h1>About page</h1>')
	res.render('about.hbs', {
		//inject data
		pageTitle: 'About Page'
	});
});

//url + callbacks
app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to handle request'
	});
});

//to start listening, bind the application to a port
//take a second argument qhich is optional (it's a function)
app.listen(port, () => {
	console.log(`Server is up at port ${port}`);
});
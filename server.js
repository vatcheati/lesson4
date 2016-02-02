// link to the connect package
var connect = require('connect');

var accounting = require('accounting');

// link to the url module
var url = require('url');

// create a new app using connect
var app = connect();

// create a helloworld request / response
var helloWorld = function(req, res, next) {
    // set the header
    res.writeHead(200, {
        'Content-Type': 'text-json'
    });

    // send a hello response
    res.end('{ "name": "Rich", "age": 25 } ');
};

var goodbyeWorld = function(req, res, next) {
  res.writeHead(200, {
     'Content-Type': 'text-plain'
  });

    res.end('Goodbye World');
};

var calculateTax = function(req, res, next) {
    // get the subtotal from url's querystring
    var qs = url.parse(req.url, true).query;

    // get the subtotal from the querystring
    var subTotal = qs.subtotal;

    // calculate tax
    var tax = parseFloat(subTotal) * 0.13;

    // calculate total
    var total = parseFloat(subTotal) + tax;

    res.writeHead(200, {
        "Content-Type": "text-plain"
    });

    // display results
    res.write('SubTotal: ' + accounting.formatMoney(subTotal) + '\n');
    res.write('Tax: ' + accounting.formatMoney(tax) + '\n');
    res.write('Total: ' + accounting.formatMoney(total));

    res.end();
};

var loop = function (req, res, next) {
    res.writeHead(200, { 'Content-Type': 'text-plain' });

    for (var i = 1; i <= 20; i++) {
        res.write(i + '\n');

        console.log(i);
    }

    res.end();

};

var home = function(req, res, next) {
    res.writeHead(200, { 'Content-Type': 'text-plain'});
    res.write('home Page');
    res.end();
    
}

// route each url to proper function
app.use('/hello', helloWorld);
app.use('/goodbye', goodbyeWorld);
app.use('/tax-calculator', calculateTax);
app.use('/loop', loop);
app.use('/', home);

// listen for events
app.listen(3000);
console.log('Connect app running at http://localhost:3000');
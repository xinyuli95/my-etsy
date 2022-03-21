//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
    // res.end();
});

var Users = [
    { username : "admin", password : "admin", email : "admin@gmail.com"},
]

var items = [
  {"itemID" : "1", "Title" : "item 1", "price" : 1.5},
  {"itemID" : "2", "Title" : "item 2", "price" : 2.5},
  {"itemID" : "3", "Title" : "item 3", "price" : 3.5}
]

var shop = [{"shopID": "1", "owner": "owner", "items": ["1"]}]

//Route to get All items when user visits the Home Page
app.get('/home', function(req,res){
    console.log("Inside Home Login");    
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    console.log("items : ",JSON.stringify(items));
    res.end(JSON.stringify(items));
    
})

app.post('/search', function(req,res){
    const keyword = req.body.keyword;
    console.log("req: ", keyword)
    const results = items.filter((item) => {
        return item.Title.includes(keyword);    
    });
    console.log(results);

    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });

    res.end(JSON.stringify(results));
    
})

//Route to handle Post Request Call
app.post('/login',function(req,res){
    
    // Object.keys(req.body).forEach(function(key){
    //     req.body = JSON.parse(key);
    // });
    // var username = req.body.username;
    // var password = req.body.password;
    console.log("Inside Login Post Request");
    //console.log("Req Body : ", username + "password : ",password);
    console.log("Req Body : ",req.body);
    console.log("Users: ",Users);
    
    const result = Users.filter((user) => {
        return user.username === req.body.username && user.password === req.body.password;    
    });

    // No user found
    if( result.length === 0 ){
        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        });
        res.end("Failed Login");
    }else{
        res.cookie('cookie',result[0].username,{maxAge: 900000, httpOnly: false, path : '/'});
        req.session.user = result[0];
        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        });
        res.end("Successful Login");
    };

});

app.post('/signup', function (req, res) {
    console.log("Req Body : ", req.body);
    // Check if item ID is not duplicate
    const i = Users.findIndex( user => {
        return user.username === req.body.username;
    });

    const j = Users.findIndex( user => {
        return user.email === req.body.email;
    });

    if( i !== -1 ){
        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        });
        res.end("Username already exists");
    } else if( j !== -1 ){
        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        });
        res.end("Email already exists");
    } else {
        const user = { username: req.body.username, password: req.body.password, email: req.body.email };
        Users.push(user);
        //res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
        //req.session.user = user;
        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        });
        res.end("User creation successful");
    }       
    

});

app.post('/create', function (req, res) {
    if (!req.session.user) {
        res.redirect('/');
    } else {
        console.log("Req Body : ", req.body);
        // Check if item ID is not duplicate
        const i = items.findIndex( item => {
            return item.itemID === req.body.id;
        });

        if( i !== -1 ){
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            });
            res.end("Duplicate item id")
        } else {
            items.push({ "itemID": req.body.id, "Title": req.body.title, "price": req.body.price })
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            });
            res.end("item creation successful")
        }       
    }

});

app.post('/delete', function (req, res) {
    if (!req.session.user) {
        res.redirect('/');
    } else {
        console.log("Req Body : ", req.body);
        const i = items.findIndex( item => {
            return item.itemID === req.body.id;
        });
          
        if( i !== -1 ){
            items.splice(i, 1);
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            });
            res.end("item deletion successful")
        } else {
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            });
            res.end("item not found")
        }
        
    }
})

app.post('/edit-user', function (req, res) {
    
    if (!req.session.user) {
        res.redirect('/');
    } else {
        console.log("Users: ", Users);
        console.log("Req : ", req.body.name);
        Users.map( user => {
            console.log("name: ", user.username);
            if (req.body.name === user.username){
                
                if ("nameNew" in req.body){
                    user.username = req.body.nameNew;
                    res.cookie('cookie',user.username,{maxAge: 900000, httpOnly: false, path : '/'});
                }
            }
                           
        });
          
        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        });
        res.end("name changed")
        
    }
})

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");
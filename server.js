const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const names = {
     a: {
        first: ['Dirty', 'Big', 'Lil', 'Crazy', 'Young'],
        last: ['Smoke', 'Blade', 'Money', 'Grime', 'Flex']
    },

    b: {
        first: ['Ghost', 'Street', 'Black', 'Gold', 'Ruthless'],
        last: ['Boss', 'Stacks', 'Mack', 'Hustle', 'Chrome']
    },

    c: {
        first: ['Funky', 'Ice', 'Wild', 'Dope', 'Heavy'],
        last: ['Trigger', 'Cash', 'Knuckles', 'Pimp', 'Bandit']
    }
}
// New items, something that is new
function listTaker(list) {
    return list[Math.floor(Math.random() * list.length)];
}

// learning to make counts & how many times a b and c should show up and return that the highest # of returns wins

function mostPicked(answered) {
    const counts = {
        a: 0,
        b: 0,
        c: 0
    }
    answered.forEach(function (answer) {
        if (counts[answer] !== undefined) {
            counts[answer] += 1; // counts how many times a b or c is picked
        }
    });
    let winner = 'a';
    if (counts.b > counts[winner]) winner = 'b';
    
    if (counts.c > counts[winner]) winner = 'c'; //possible switch later on
    
    return winner;

}






const server = http.createServer((req, res) => {

    const page = url.parse(req.url).pathname;
    const params = querystring.parse(url.parse(req.url).query);

    // homepage or inital loading screne
    if (page == "/") {

        fs.readFile('index.html', (err, data) => {

            if (err) {
                res.writeHead(500);
                return res.end('Error loading file');
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            res.end(data);
        });

    }

    // CSS
    else if (page == '/css/styles.css') {

        fs.readFile('css/styles.css', (err, data) => {

            if (err) {
                res.writeHead(500);
                return res.end('Error loading CSS');
            }

            res.writeHead(200, {
                'Content-Type': 'text/css'
            });

            res.end(data);
        });

    }

    // frontend javascript
    else if (page == '/js/main.js') {

        fs.readFile('js/main.js', (err, data) => {

            if (err) {
                res.writeHead(500);
                return res.end('Error loading JavaScript');
            }

            res.writeHead(200, {
                'Content-Type': 'text/javascript'
            });

            res.end(data);
        });

    }

    // palindrome API
    else if (page == '/api') {
        const answer = [params.q1, params.q2, params.q3, params.q4, params.q5];
        const letter = mostPicked(answer);
        const group = names[letter]
        const name = listTaker(group.first) + ' ' + listTaker(group.last);
        res.writeHead(200, {'Content-Type': 'application/json'});
       res.end(JSON.stringify({name: name}));
    }
});

server.listen(8020, () => {
    console.log('Server is running on port 8020');
});
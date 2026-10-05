# Wu-Tang Name Generator

Answer five deeply scientific questions, yes, maybe, or no, and receive your official Wu-Tang name. "Ruthless Hustle" could be you. Runs on a handmade Node server, no Express.

![Wu-Tang Generator screenshot](screenshot.jpg)

## How the code works

The frontend is `wuTangGen()`, wired to the Generate button. It loops over the five questions and grabs each checked radio with `input[name="qN"]:checked`, mapping the picks to values. If any question is unanswered it bails early with "Please answer all questions.", a guard clause that keeps bad state from ever reaching the server. Otherwise it builds a query string like `q1=a&q2=c...` and fetches `/api` with it.

The server is where the fun is. It keeps three word banks, one per answer letter, each with first-half and last-half names. `mostPicked()` tallies the five answers and returns the majority letter, so your answers actually vote on the outcome instead of the whole thing being a dice roll. Then `listTaker()` picks a random first and last name from the winning bank. Majority vote plus randomness: the result feels earned because your answers steered it, but it's different every time because the pick is random within the bank.

I like this design because the naive version, pure random name generation, would make the quiz pointless. The vote is one small function, but it's the difference between a quiz and a slot machine.

Run it with `node server.js`. My code is on the `answer` branch.

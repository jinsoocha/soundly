# MisQueue
Collaborative music streamer and visualizer.


# Project Name

MisQueue


> Changing the way you view and queue music.

## Team

- __Product Owner__: Bill Ramsey
- __Scrum Master__: Aaron Brown
- __Development Team Members__: Jinsoo Cha, Sehoon Park


## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

MisQueue is a shared queue app.  A user can register and have a shared queue.  They can then
give out their room id to allow users to come in and add songs to their queue.  All playing on
the original users browser.  Users can rate the songs.  When they get two 'hearts' or two 'thumbs down'
it will move the song up or down in the queue.


## Requirements

## Development

tests can be run with
npm test

### Installing Dependencies

npm install
copy compiled/client/config/config.example.js to the same directory as config.js and put a sound cloud api key in it.
npm run hola
ctrl-c then run:
npm start


### Roadmap

Nice to haves:
Mobile view for adding to the queue. (or react native!)
Better restrictions how many times you can vote.
playing synchronized on multiple browsers.
store sound cloud api key on the server.

## Contributing

-In process. No contributions being taken at this time.

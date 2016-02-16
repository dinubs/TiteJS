'use strict';

const Tite = require('./lib/index.js');

let server = new Tite();

server.setIntro('Welcome to the TiteJS Chat');

server.start();

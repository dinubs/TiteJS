'use strict';

const net = require('net');
const Chatter = require('./chatter.js');

class Server {
  constructor() {
    this.chatters = [];
    this.command_differentiator = '\\';
  }
  config(ip, port) {
    this.ip = ip;
    this.port = port;
  }
  start() {
    this.listener = net.createServer(this.connect.bind(this));
    this.listener.listen(this.post || 1337, this.ip || '0.0.0.0');
  }
  setIntro(msg) {
    this.intro_message = msg;
  }
  connect(socket) {
    let chatter = new Chatter(socket, this);
    this.chatters.push(chatter);
  }
  remove(chatter) {
    let i = this.chatters.indexOf(chatter);
    if (i > -1) {
      this.chatters.slice(i, 1);
    }
  }
  runCommand(chatter) {
    if (chatter.current_message.indexOf('\\c') === 0) {
      this.broadcast(chatter.current_message.split('\\c')[1], chatter);
    }
  }
  broadcast(msg, chatter) {
    this.chatters.forEach(((c) => {
      if (c !== chatter) {
        c.write(msg);
      }
    }).bind(this));
  }
}

module.exports = Server;


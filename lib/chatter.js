'use strict';

class Chatter {
  constructor(socket, server) {
    this.socket = socket;
    this.server = server;
    this.current_message = '';
    this.socket.on('data', this.onData.bind(this));
    this.socket.on('close', this.onClose.bind(this));
    this.sendIntroMessage();
  }
  sendIntroMessage() {
    this.write(this.server.intro_message);
  }
  write(msg) {
    this.socket.write(`${msg}\r\n`);
  } 
  onData(data) {
    if (data.toString().indexOf('\r\n') === -1) {
      return this.current_message = this.current_message + data.toString();
    }

    this.current_message = this.current_message + data.toString();
    if (this.current_message.indexOf(this.server.command_differentiator) > -1) {
      this.server.runCommand(this);
    }
    this.current_message = '';
  }
  onClose() {
    this.server.remove(chatter);
  }
}

module.exports = Chatter;


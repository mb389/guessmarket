angular
  .module('fsaPreBuilt')
  .factory('Socket', Socket)

function Socket() {
    if (!window.io) throw new Error('socket.io not found!');
    return window.io(window.location.origin);
};

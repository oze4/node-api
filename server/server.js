'use strict'
const app = require('./app');


let server = app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});

function stop() {
  server.close();
}

module.exports = server;
module.exports.stop = stop;
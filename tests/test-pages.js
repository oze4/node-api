let expect  = require('chai').expect;
let request = require('request');
let app     = require('../server/app.js');
let config  = require('../utils/config.js');
// DB has to be here so we can close the DB connection, or else
/// mocha will just stay open due to processes (mongo) still running
let db      = require('../db/db.js'); 


var myVar = true;

describe('Loading Express...', function () {

    var server;
    before(function () {
        server = app.listen(config.port);
    });

    after(function (done) {        
        server.close();
        db.close(done);        
    });
    
    describe('Volkswagen Test', function () {
        it('myVar should equal true', function (done) {
            expect(myVar).to.equal(true);
            done();
        })
    });

    describe('Home Page', function () {
        it('should equal status code 200', function (done) {            
            request(String("http://localhost:" + config.port), function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                if (error) done(error);
                else done();
            })
        })
    })

})

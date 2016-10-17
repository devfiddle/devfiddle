var xhr = require('xhr');
var xhr2 = require('xhr2');
var xtend = require('xtend');
var querystring = require('querystring');
const config = require('../config');


var Client = module.exports = function Client (opts) {
    if (!(this instanceof Client)) {
        return new Client(opts)
    }
    opts = opts || {}
    this.baseUrl = config.api;

    this.headers = {
        'Content-Type': 'application/json'
    }
    if (opts.accessToken) {
        this.headers['x-access-token'] = opts.accessToken
    }
}

if (typeof window !== 'undefined') {
    window.FotoshootIO = Client
}

////// utility methods //////

Client.prototype.setAccessToken = function (token) {
    this.headers['x-access-token'] = token
    if (!token) {
        delete this.headers['x-access-token']
    }
}

Client.prototype.request = function (opts) {
    return new Promise((resolve,reject) => {
        var self = this
        var headers = xtend(self.headers)
        if (opts.accessToken) {
            headers['x-access-token'] = opts.accessToken
        }
        var qs = ''
        if (opts.query) {
            qs = '?' + querystring.stringify(opts.query)
        }
    
        if(opts.xhr_debug) {
            console.log({"client"  :"0.0.1" , "opts" : opts , "uri" : self.baseUrl + opts.uri + qs});
        }
    
        xhr({
            method: opts.method,
            uri: self.baseUrl + opts.uri + qs,
            headers: headers,
            json: opts.body,
            xhr: new xhr2()
        }, function (err, resp, body) {
            
            if (err) {
                return reject(err)
            }
            var ok = [200, 201]
            if (ok.indexOf(resp.statusCode) === -1) {
                return reject(body.error || body)
            }
    
            // console.log("REQ BODY: " , body);
            if(!body) {
                return reject("No response");
            }
    
            if(body.error) {
                return reject(body.error);
            }
    
            return resolve(body);
        })

    });
}

////// user endpoints //////

Client.prototype.save = function (app, data) {
    return this.request({
        method: 'put',
        uri: '/' + app,
        body: data
    }); 
}

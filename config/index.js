const merge = require('deepmerge');

var defaults = {
    api : 'https://devfiddle-api.herokuapp.com'
};

config_options = {
    development : {
        api : 'http://localhost:5000'
    }, 
};


var config = merge(defaults,
    config_options[process.env.NODE_ENV] || {}
);


console.log(process.env.NODE_ENV, config);
module.exports = config; 


var soda = require("soda"),
    assert = require("assert");

var browser = soda.createClient({
    url: 'https://www.google.com',
    browser: "googlechrome"
});
    
browser
    .chain
    .session()
    .open('/')
    .type('q', 'mitsuruog')
    .end(function(err){
        browser.testComplate(function(){
            console.log('done!');
            if(err) throw err;
        });
    });
    

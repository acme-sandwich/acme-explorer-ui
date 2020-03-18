//version.js
const path = require('path');
const jsonServer = require('json-server');

module.exports = (req, res, next) => {
    if(req.method === "PUT") {
        //editing entity, check version
        var typeEntity = req.path.substr(1, req.path.lastIndexOf('/') - 1);
        var idEntity = req.path.substr(req.path.lastIndexOf('/') + 1);
        var versionNum = parseInt(req.body.version);
        var router = jsonServer.router(path.join(__dirname, 'acme-explorer.json'));

        //load object
        var data = router.db.__wrapped__[typeEntity];
        var entity = data.filter(element => {return element.id === idEntity;})[0];

        // Compare version numbers
        if(versionNum != entity.version){
            console.log(versionNum);
            console.log(entity.version);
            res.status(412).send("Concurrency error");
        }else{
            versionNum ++;
            req.body.version = '' + versionNum;
            next();
        }
    }else{  
        next();
    }
};
'use strict';

const express = require ('express');

const cors = require ('cors');

const app = express();

const bodyParser = require ('body-parser');

let contacts = require ("./data.js");

app.use(bodyParser.urlencoded({extended:true}));

app.use(cors());

app.get('/api/contacts',function(request,response){
    if(!contacts)
    {
        response.status(404).json({message : "No contacts"});
    }

    response.json(contacts);
});

app.get('/api/contacts/:firstName',function(request,response){

const requestName = request.params.firstName;

        let contact = contacts.filter(function(contact){

            return contact.firstName == requestName;

        })

         if(!contacts)
        {
            response.status(404).json({message : "No contacts"});
        }


response.json(contact[0]);

});

const hostName = 'localhost';

const PORT = 3001;

app.listen(PORT,hostName,()=>{
console.log(`Server running at PORT: ${PORT} and hostName is ${hostName}`);
});

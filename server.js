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
        response.status(404).json({message : "No contacts Found"});
    }

    response.json(contacts);
});

app.get('/api/contacts/:id',function(request,response){

const requestid = request.params.id;

        let contact = contacts.filter(function(contact){

            return contact.id == requestid;

        });

         if(!contact)
        {
            response.status(404).json({message : "No contact found"});
        }


response.json(contact[0]);

})

app.post('/api/contacts/',function(request,response){

const contact = {
    id : contacts.length+1,
    firstName : request.body.firstName,
    lastName : request.body.lastName,
    email : request.body.email,
    website : request.body.website
}

contacts.push(contact);

response.json(contact);

});

app.put('/api/contacts/:id',function(request,response){

const requestid = request.params.id;

        let contact = contacts.filter(function(contact){

            return contact.id == requestid;

        })[0];

       const index = contacts.indexOf(contact);

       const keys = Object.keys(request.body);

       keys.forEach(function(key){
           
           contact[key]= request.body[key];
       
        });

        contacts[index] = contact;

        response.json(contacts[index]);

});

app.delete('/api/contacts/:id',function(request,response){

const requestid = request.params.id;

        let contact = contacts.filter(function(contact){

            return contact.id == requestid;

        })[0];

       const index = contacts.indexOf(contact);

       contacts.splice(index,1);

        response.json({message:`user ${requestid} deleted.`});

});



const hostName = 'localhost';

const PORT = 3001;

app.listen(PORT,hostName,()=>{
console.log(`Server running at PORT: ${PORT} and hostName is ${hostName}`);
});

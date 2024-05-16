
const url = 'http://localhost:3000/users'
/*
fetch(url, {
    method: 'GET'
})
.then(function(users){
    users.json()
})
.then(function(users){
    users.forEach(console.log(users.name))
})

*/

const userteste = "b"

const newEmails = []

fetch(url, {
  method: 'GET'
})
  .then(function (response) {
    response.json()
      .then(function (users) {
        users.map(function (user) {
         newEmails.push(user.email)
        });
      });
  })
  .catch(err => console.error(err));


  console.log(newEmails)

  

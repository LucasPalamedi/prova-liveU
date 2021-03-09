function saveInfo(){
  var data = {
    nome: document.getElementById('nome').value,
    sobrenome: document.getElementById('sobrenome').value,
    email: document.getElementById('email').value
  }

  fetch('/info', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
   })
   .then(response => response.text())
   .then(text => alert(text));
}
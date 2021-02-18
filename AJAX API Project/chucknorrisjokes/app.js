document.querySelector('.get-jokes').addEventListener('click', getJokes);

function getJokes(e) {

  const numberOfJokes = document.querySelector('input[type="number"]').value;

  if(numberOfJokes === '') {
    alert('Enter number of jokes');
  }

  const xhr = new XMLHttpRequest();

  xhr.open('GET', `http://api.icndb.com/jokes/random/${numberOfJokes}`, true);



  xhr.onload = function() {
    if(this.status == 200) {
      const response = JSON.parse(this.responseText);

      if(response.type === 'success') {
        let output = '';

        response.value.forEach(function(joke) {
          output += `<li>${joke.joke}</li>`;
        });

        const ul = document.querySelector('ul');
        ul.innerHTML = output;
      }
    }
    else {
      alert('Something went wrong');
    }
  }

  xhr.send();

  e.preventDefault();
}

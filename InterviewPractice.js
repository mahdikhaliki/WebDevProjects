document.querySelector('button').addEventListener('click', processForm);

let counter = 0;

console.log(document.querySelector('button'));
function processForm(e) {
    if(typeof localStorage.getItem('counter') !== undefined) {
        counter = localStorage.getItem('counter');
    }
    document.querySelector('#numClicks').innerHTML = `${++counter} number of clicks`;
    localStorage.setItem('counter', counter);
}
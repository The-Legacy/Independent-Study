const scriptURL = 'https://script.google.com/macros/s/AKfycbzQ9YQD4SHCsDVuj19AiziYd3QIvZs6LFJs7rK5P5kbwEe60ORDIWbMH7pSp27MJqQqdQ/exec'
const form = document.querySelector('#form')
const btn = document.querySelector('#submit')

const thx = document.querySelector('#thanks');

form.addEventListener('submit', e => {
    e.preventDefault()
    btn.disabled = true
    btn.innerHTML = "Loading..."
    thx.innerHTML = "";

    console.log(form)
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
        btn.disabled = false
        btn.innerHTML = "Submit"
        thx.innerHTML = "Thank you! Be sure to check you email for updates"})
    .catch(error => {
        btn.disabled = false
        btn.innerHTML = "Submit"
        alert('Error!', error.message)})
})

const navbar = document.querySelector('#navbar');
const ypos = navbar.scrollTop;

window.addEventListener("scroll", event => {
    let ypos = navbar.scrollTop;
    if (ypos > 50){
        navbar.style.display = "fixed";
    } else{
        navbar.style.display = "relative";
    }
});
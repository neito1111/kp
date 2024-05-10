const regBtn = document.getElementById('reg-btn')

regBtn.addEventListener('click', reg)

let name;
let surname;
let email;

function reg() {
    document
        .getElementById('reg-form')
        .addEventListener('submit', regFormHandler, {once: true})
}

function regFormHandler(event) {
    event.preventDefault()

    name1 = event.target.querySelector('#name').value
    surname = event.target.querySelector('#surname').value
    email = event.target.querySelector('#email').value
    const password = event.target.querySelector('#password').value
    const password1 = event.target.querySelector('#password1').value

    if(password1 !== password){
        console.log("Пароли не совпадают")
    }else{
        console.log(name1)
        console.log(surname)
        console.log(email)
        console.log(password)
        regWithEmailAndPassword( email, password,name1, surname)
    }
}

function regWithEmailAndPassword( email, password,name1, surname) {
    axios.post('http://localhost:5000/api/user/registration', {  email, password,name1, surname })
        .then(response => {
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            localStorage.setItem('name1', name1);
            localStorage.setItem('surname', surname);
            window.location.href = "../htm/main.html";
        })
        .catch(error => {
            console.error(error.response.data.message);
        });
}
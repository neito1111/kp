const enterBtn = document.getElementById('enter-button')

enterBtn.addEventListener('click', enter)
let email;
function enter() {
    document
        .getElementById('auth-form')
        .addEventListener('submit', authFormHandler, {once: true})
}

function authFormHandler(event) {
    event.preventDefault()

    email = event.target.querySelector('#Email').value
    
    const password = event.target.querySelector('#password').value
    

    console.log(email)
    console.log(password)
   

    authWithEmailAndPassword( email, password)
}

function authWithEmailAndPassword(email, password) {
    axios.post('http://localhost:5000/api/user/login', { email,password })
        .then(response => {
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
           // localStorage.setItem('role',response.data.role);
           // localStorage.setItem('name1', name1);
           // localStorage.setItem('surname', surname);
            window.location.href = "../htm/main.html";
        })
        .catch(error => {
            const errorMessage = error.response.data.message
            console.error(errorMessage);
            document.getElementById('error-message').innerHTML = errorMessage;
        });

        axios.get('http://localhost:5000/api/user/me', {
    params: { email: email, password: password }
})
    .then(response => {
        const user = response.data.data;
        localStorage.setItem('role',user.role);
    })
    .catch(error => {
        console.error(error);
    });
    
}
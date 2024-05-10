function checkAuth() {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    const profileButton = document.getElementById('profile-header');
    const loginButton = document.getElementById('login-button');
   // const registerButton = document.getElementById('exit-button');
    if (!token) {
        profileButton.style.display = 'none';
		//registerButton.style.display = 'none';
    }
    else{
        if (token && email && password) {
            profileButton.style.display = 'block';
            loginButton.style.display = 'none';
            //registerButton.style.display = 'block';
        } else {
            profileButton.style.display = 'none';
			
            loginButton.style.display = 'block';
            
        }
    }
}
checkAuth();
const emailEl = document.getElementById('email');
const roleEl = document.getElementById('role');
const nameEl = document.getElementById('name1');
const surnameEl = document.getElementById('surname');
const passwordForm = document.getElementById('change-password-form');
const passwordMessage = document.getElementById('password-message');
const token = localStorage.getItem('token');
const email = localStorage.getItem('email');
const password = localStorage.getItem('password');
const name1=localStorage.getItem('name1');
const surname=localStorage.getItem('surname');
const avatarInputEl=localStorage.getItem('img')
const avatarInput = document.getElementById('avatar-upload');
const avatarContainer = document.getElementById('avatar-container');
const avatarImg = document.getElementById('avatar-img');
const exBtn=document.getElementById("btn-exit");
const image=localStorage.getItem('IMG');
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const quitButton=document.getElementById('quitButt');
const inputs = document.querySelectorAll('input');
const changePassword=document.getElementById('change-password-form')
const divProfileContent=document.getElementById('profile-content')
if (id){
    console.log(id);

    axios.post(`http://localhost:5000/api/user/userInfoById`, {
        id
      })
    .then(response => {
      const user = response.data.data;
      emailEl.textContent = user.email;
      roleEl.textContent = user.role;
      nameEl.textContent = user.name1;
      surnameEl.textContent = user.surname;
      avatarImg.src = `../js/server/static/${user.img}`;
    })
    .catch(error => {
      console.error(error);
    });
    quitButton.style.display='none';
    inputs.forEach(input => {

     input.style.display = 'none';
    }
    );
    changePassword.style.display='none',
    divProfileContent.style.display='none'

}

    avatarInput.addEventListener('change',async (event) => {
        event.preventDefault();
        const email = localStorage.getItem('email');
        const file = avatarInput.files[0];
        const formData = new FormData();
        formData.append('img', file);
        formData.append('email', email);
        axios.put('http://localhost:5000/api/user/uploadAvatarIMG', formData, {})
        .then(response => {
            avatarImg.src = `../js/server/static/${response.data.fileName}`;
        }).catch(error => {
            console.error(error);
        });
    });
    // Получаем информацию о пользователе
    axios.get('http://localhost:5000/api/user/me', {
        params: { email: email, password: password }
    })
        .then(response => {
            const user = response.data.data;
            emailEl.textContent = user.email;
            localStorage.setItem('role',user.role);
            roleEl.textContent = user.role;
            nameEl.textContent=user.name1;
            surnameEl.textContent=user.surname;
            avatarImg.src=`../js/server/static/${user.img}`
            
    
        })
        .catch(error => {
            console.error(error);
        });
        async function onLogoutClick() {
            axios.post('http://localhost:5000/api/user/logout')
                .then(response => {
                    console.log(response.data);
                    console.log(response.data);
                    localStorage.removeItem('token');
                    localStorage.removeItem('email');
                    localStorage.removeItem('password');
                    localStorage.removeItem('role')
                    window.location.href = "SingIn.html";
                })
                .catch(error => {
                    console.error(error.response.data.message);
                });
        }
    
        passwordForm.addEventListener('submit', e => {
            e.preventDefault();
        
            const oldPassword = document.getElementById('old-password').value;
            const newPassword = document.getElementById('new-password').value;
            const repeatNewPassword = document.getElementById('repeat-new-password').value;
        
            if (newPassword !== repeatNewPassword) {
                passwordMessage.textContent = 'Пароли не совпадают';
                return;
            }
        
            axios.put('http://localhost:5000/api/user/change-password', {
                email: email,
                oldPassword: oldPassword,
                newPassword: newPassword,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(response => {
                    passwordMessage.textContent = response.data.message;
                })
                .catch(error => {
                    passwordMessage.textContent = error.response.data.message;
                });
        });



  /*  const UploadImage = () => {
        const [uploadedImage, setUploadedImage] = useState(null);
        const onDrop = async (acceptedFiles) => {
          try {
            const formData = new FormData();
            formData.append('image', acceptedFiles[0]);
            formData.append('email', email);
            // Отправляем данные на сервер
            const response = await axios.post('http://localhost:5000/api/user/uploadAvatarIMG', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
      
            // Обновляем состояние загруженного изображения
            setUploadedImage(response.data.imageUrl);
          } catch (error) {
            console.error(error);
          }
        };}*/
  
// Заполняем текущий пароль
//const currentPasswordEl = document.getElementById('current-password');
//currentPasswordEl.value = password;

// Обрабатываем форму смены пароля
/*passwordForm.addEventListener('submit', event => {
    event.preventDefault();
    const currentPassword = currentPasswordEl.value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (newPassword !== confirmPassword) {
        passwordMessage.textContent = 'Пароли не совпадают';
        return;
    }

    // Отправляем запрос на сервер
    axios.post('http://localhost:5000/api/user/change-password', {
        currentPassword: currentPassword,
        newPassword: newPassword
    }, {
        headers: { Authorization: `Bearer ${token}` }
    })
        .then(response => {
            console.log(response.data);
            passwordMessage.textContent = 'Пароль успешно изменен';
        })
        .catch(error => {
            console.error(error.response.data.message);
            passwordMessage.textContent = error.response.data.message;
        });
});
async function onLogoutClick() {
    axios.post('http://localhost:5000/api/user/logout')
        .then(response => {
            console.log(response.data);
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            localStorage.removeItem('password');
            window.location.href = 'index.html';
        })
        .catch(error => {
            console.error(error.response.data.message);
        });
}

avatarInput.addEventListener('change', handleAvatarChange);

function handleAvatarChange(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            const imageData = event.target.result;
            localStorage.setItem('avatar', imageData);
            setAvatar(imageData);
        });
        reader.readAsDataURL(file);
    }
}

function setAvatar(imageData) {
    if (imageData) {
        avatarImg.src = imageData;
        avatarContainer.classList.add('has-avatar');
    } else {
        avatarImg.removeAttribute('src');
        avatarContainer.classList.remove('has-avatar');
    }
}

window.addEventListener('load', () => {
    const imageData = localStorage.getItem('avatar');
    setAvatar(imageData);
});*/

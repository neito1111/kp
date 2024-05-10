function checkUserRole() {
	const AdminPanelButton=document.getElementById('AdminPanel')
    // Получаем данные о пользователе из локального хранилища
    const user = JSON.parse(localStorage.getItem('user'));
    const role=localStorage.getItem('role');
console.log(role);
    // Проверяем наличие роли у пользователя
    if (role) {
        // Проверяем конкретную роль (здесь предполагается роль 'admin')
        if (role === 'ADMIN') {
			AdminPanelButton.style.display='block';
            console.log('Пользователь имеет роль админа');
            return true;
        } else {AdminPanelButton.style.display='none';

            console.log('Пользователь не имеет роль админа');
            return false;
        }
    } else {
		AdminPanelButton.style.display='none';
        console.log('Данные о пользователе или роли отсутствуют в локальном хранилище');
        return false;
    }
}
checkUserRole();

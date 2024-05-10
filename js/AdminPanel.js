axios.get('http://localhost:5000/api/user/getInfoUser')
  .then(function (response) {
    const accountsList = document.getElementById('accounts-list');
    response.data.forEach(account => {
      const listItem = document.createElement('li');
      listItem.textContent = `ID: ${account.id}, Name: ${account.name1}, SurName: ${account.surname}, Role: ${account.role}`;
      accountsList.appendChild(listItem);
    });
  })
  .catch(function (error) {
    console.error('Error:', error);
  });

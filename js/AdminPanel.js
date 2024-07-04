axios.get('http://localhost:5000/api/user/getInfoUser')
  .then(function (response) {
    const accountsList = document.getElementById('accounts-list');
    response.data.forEach(account => {
      const listItem = document.createElement('li');
      
      // Create the account details element
      const accountDetails = document.createElement('span');
      accountDetails.textContent = `ID: ${account.id}, Name: ${account.name1}, SurName: ${account.surname}, Role: ${account.role}`;
      
      // Create the delete button
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'X';
      deleteButton.classList.add('delete-button');
      
      // Create the profile button
      const profileButton = document.createElement('button');
      profileButton.textContent = 'Profile';
      profileButton.classList.add('profile-button');
      profileButton.addEventListener('click', () => {
        window.location.href =`profile.html?id=${account.id}`;
      });
      
      // Show the delete button only if the user is not an admin
      if (account.role !== 'ADMIN') {
        deleteButton.addEventListener('click', () => {
          deleteAccount(account.id);
          console.log(`Deleting account with ID: ${account.id}`);
        });
        listItem.appendChild(deleteButton);
      }
      
      // Append the account details, delete button, and profile button to the list item
      listItem.appendChild(accountDetails);
      listItem.appendChild(profileButton);
      accountsList.appendChild(listItem);
    });
  })
  .catch(function (error) {
    console.error('Error:', error);
  });

function deleteAccount(id){
  axios.delete(`http://localhost:5000/api/user/deleteUser`, {
    data: { id }
  })
  .then(function (response) {
    console.log(`Deleted account with ID: ${id}`);
  })
  .catch(function (error) {
    console.error('Error deleting account:', error);
  });
}
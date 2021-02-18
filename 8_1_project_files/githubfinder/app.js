const searchUser = document.querySelector('#searchUser')

const gitAPI = new GitHub;
const ui = new UI;

searchUser.addEventListener('keyup', (e) => {
  if(e.target.value === '') {
    // Clear
    ui.clearProfile();
    return;
  }
  gitAPI.getUser(e.target.value).then(data => {
    if(data.message === 'Not Found') {
      // Show Alert
      ui.clearProfile();
      ui.showAlert('User not found', 'alert alert');
    }
    else {
      // Show Profile
      console.log(data);
      ui.showProfile(data);
    }
  });
});

  const userSession = JSON.parse(localStorage.getItem('userSession'));
  document.getElementById('name').innerText = `${userSession.first_name} ${userSession.last_name}`;

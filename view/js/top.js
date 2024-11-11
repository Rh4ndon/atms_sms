if(!localStorage.getItem('userSession')){
    window.location.href = "login.html";
  }
  
  function logout(){
    localStorage.removeItem('userSession');
    window.location.href = "login.html";
  }

import React from 'react';
import firebase from 'firebase';
import {Link} from 'react-router-dom';

function Login() {
    function login(){
      var email = document.getElementById("signEmail");
      var password = document.getElementById("signPassword");
      firebase.auth().signInWithEmailAndPassword(email.value , password.value).then().catch((e)=>{
        if(e){alert(e);};
      })

    }

  return (
    
      <div className="container">
          <form>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email Adresi</label>
    <input type="email" className="form-control" id="signEmail" aria-describedby="emailHelp" placeholder="E-posta..."/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Şifre</label>
    <input type="password" className="form-control" id="signPassword" placeholder="Şifre..."/>
  </div>
  <Link to='/'>
  <button onClick={login} className="btn btn-primary">Giriş Yap</button>
  </Link>
</form>
      </div>
    
  );
}

export default Login;
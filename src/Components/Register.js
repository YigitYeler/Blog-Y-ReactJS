import React,{Component} from 'react';
import * as firebase from 'firebase';
import {Link} from 'react-router-dom';
var firebaseConfig = {
  // firebase configs...
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

class Register extends Component{
  constructor(){
    super();
    this.state = {
      NickName:""
    };
  }
  
render(){
  function AddNickName(e){
    this.setState({
      NickName: e.target.value
    })
    }
  
  
  function createUser (e)  {
    var email = document.getElementById("inputEmail");
    var password = document.getElementById("inputPassword");
    
    firebase.auth().createUserWithEmailAndPassword(email.value , password.value).then(()=>{
      
      firebase.auth().signInWithEmailAndPassword(email.value , password.value);

    }).catch((err)=>{
      alert(err);
    })
    
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
      var current_user = user.uid;
          
         firebase.database().ref("UserNickNames").child("Kullanıcılar").child(current_user).child("Kullanıcı İsmi").set({
           NickName: this.state.NickName
         })          
      }})

      this.setState({
        NickName:""
      })

  }

   
  return (
    
      <div className="container">
          <form>
  <div className="form-row">
    <div className="form-group col-md-6">
      <label htmlFor="inputEmail4">Email</label>
      <input type="email" className="form-control" id="inputEmail" placeholder="E-posta..."/>
    </div>
    <div className="form-group col-md-6">
      <label htmlFor="inputPassword4">Şifre</label>
      <input type="password" className="form-control" id="inputPassword" placeholder="Şifre..."/>
    </div>
  </div>
  <div className="form-group">
    <label htmlFor="inputAddress">Kullanıcı Adı</label>
    <input type="text" onChange={AddNickName.bind(this)} value={this.state.NickName} className="form-control" id="inputNickName" placeholder="Kullanıcı Adı..."/>
  </div>
  <Link to='/'>
  <button onClick={createUser.bind(this)} className="btn btn-primary">Kayıt Ol</button>
  </Link>
</form>
      </div>
    
  );
}}

export default Register;
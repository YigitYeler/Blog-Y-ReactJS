import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import firebase from 'firebase'


class Nav extends Component{
    render(){
      
       function logout(){
        firebase.auth().signOut().then().catch((e)=>{
          if(e){alert(e);};
        })
      }
      
        //<a className="nav-link active" id="nickname"> <span className="sr-only">(current)</span></a>
    
      
      firebase.auth().onAuthStateChanged((user)=>{
        
        if(user){
          var current_user = user.uid;
          firebase.database().ref("UserNickNames").child("Kullanıcılar").child(current_user).child('Kullanıcı İsmi').on('value' , snapshots =>{
                //console.log(snapshots.val())
                  snapshots.forEach(nickname => {
                  //console.log(nickname.val())
                  document.getElementById("nickname").innerHTML=nickname.val();
                });
              });
          
          document.getElementById("nickname").style.display="block"
          document.getElementById("logout").style.display="block"
        }else{
          document.getElementById("nickname").style.display="none"
          document.getElementById("logout").style.display="none"

        }})
         
        
        return (
          <div className="App">
             <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand"  >Blog-Y</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to='/'>
            <a className="nav-link active">Anasayfa <span className="sr-only">(current)</span></a>
            </Link>
            <a className="nav-link">Hakkımızda</a>
            <Link to='/blogs'>
            <a className="nav-link">Bloglar</a>
            </Link>
            <Link to='myblogs'>
            <a className="nav-link">Bloglarım</a>
            </Link>
            <Link to='/register'>
            <button className="btn btn-outline-success my-2 my-sm-0">Kayıt Ol</button>
            </Link>
            <Link to='/login'>
            <button className="btn btn-outline-success my-2 my-sm-0">Giriş Yap</button>
            </Link>
          </div>
        </div>
        <form className="form-inline my-2 my-lg-0">
        <h5 id="nickname" style={{color:"white",margin:"10px"}}></h5>
          <Link to='/'>
            <button type="button" onClick={logout} className="btn btn-outline-danger" id="logout">Çıkış Yap</button>
          </Link>
    </form>
      </nav> 
            
          </div>
        );
    }
  

  

  
}

export default Nav;

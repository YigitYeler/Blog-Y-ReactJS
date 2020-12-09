import React, {Component} from 'react';
import firebase from 'firebase';
import {Link} from 'react-router-dom';
class MyBlogs extends Component {
    constructor(){
        super();
        this.state = {
          Title: "",
          Blog: "",
          myblogs:[],
          idx:"",
          nickname:""
        };
      }
        componentDidMount=()=>{
          this.listenForChange();
          document.getElementById("UpdateBtn").style.display="none";
        }

        listenForChange=()=>{
          firebase.auth().onAuthStateChanged((user)=>{
            if(user){
              var current_user = user.uid;
              firebase.database().ref("UserBlogs").child("Kullanıcılar").child(current_user).child("Blog").on('child_added', snapshot =>{
                let myblogs = {
                  id : snapshot.key,
                  title: snapshot.val().Title,
                  blog : snapshot.val().MyBlog
                }
                  let myblogsx = this.state.myblogs;
                  myblogsx.push(myblogs)
                  this.setState({
                    myblogs : myblogsx
                  })
                    //console.log(this.state.myblogs)
              })

              firebase.database().ref("UserNickNames").child("Kullanıcılar").child(current_user).child('Kullanıcı İsmi').on('value' , snapshots =>{
                //console.log(snapshots.val())
                  snapshots.forEach(nickname => {
                  //console.log(nickname.val())
                  this.setState({
                    nickname : nickname.val()
                  })
                });
              });

              this.kaydet=()=>{
                

                firebase.database().ref("UserBlogs").child("Kullanıcılar").child(current_user).child("Blog").push({
                  Title: this.state.Title,
                  MyBlog: this.state.Blog,
                  NickName: this.state.nickname
              }) 
                    document.getElementById("title").value="";
                    document.getElementById("blog").value="";
              }

                this.BlogUpdate=(id)=>{
                  firebase.database().ref("UserBlogs").child("Kullanıcılar").child(current_user).child("Blog").child(id).on('value' , dizi =>{
                    //console.log(dizi.val().Title)
                    document.getElementById("title").value=dizi.val().Title;
                    document.getElementById("blog").value=dizi.val().MyBlog;
                  })
                  this.setState({
                    idx : id
                  })
                    document.getElementById("UpdateBtn").style.display="block";
                }

                this.BlogUpdate2=()=>{
                  //console.log(this.state.idx);
                  var newData = {
                    Title : document.getElementById("title").value,
                    MyBlog : document.getElementById("blog").value
                  }
                  firebase.database().ref("UserBlogs").child("Kullanıcılar").child(current_user).child("Blog").child(this.state.idx).update(newData);
                  
                }
                

                this.BlogSil=(id)=>{
                  firebase.database().ref("UserBlogs").child("Kullanıcılar").child(current_user).child("Blog").child(id).remove();
                
                }

                firebase.database().ref("UserBlogs").child("Kullanıcılar").child(current_user).child("Blog").on("child_removed" ,rmvd =>{
                 /* this.state.myblogs=this.state.myblogs.filter(myblogs=> myblogs.id !==rmvd.key)
                  this.setState({
                  myblogs: this.state.myblogs
            })*/
                  this.setState({
                    myblogs: this.state.myblogs.filter(myblogs=> myblogs.id !==rmvd.key)
                  })
                })

         }})
        }

      Title(evt){
        this.setState({
          Title : evt.target.value
        })
      }
      Blog(evt){
        this.setState({
          Blog : evt.target.value
        })
      }

      

         
   
    render(){

  return (
    
      <div id="myblogs" className="container">
          <h1>Bloglar</h1>
          <div className="card w-75 text-white bg-dark mb-3">
                <div className="card-body">
                  <p className="card-title">Başlık:</p> 
                   <input onChange={(evt)=>this.Title(evt)} id={"title"} className="card-title"/>
                        <p className="card-text">Blog İçeriği:</p>
                        <textarea onChange={(evt)=>this.Blog(evt)} id={"blog"} className="card-title"/><br/>
                            <Link to='/myblogs'>
                            <button onClick={this.kaydet} className="btn btn-primary">Kaydet</button>
                            </Link>
                            <Link to='/blogs'>
                            <button onClick={this.BlogUpdate2} id={"UpdateBtn"} className="btn btn-warning">Güncelle</button>
                            </Link>
                </div>
            </div>
            {this.state.myblogs.map(myblogs=>{
              return(<div key={myblogs.id} className="card w-75 text-white bg-dark mb-3">
                <div className="card-body">
                  <p className="card-title">{myblogs.title}</p>
                  <p className="card-text">{myblogs.blog}</p>
                  <button onClick={()=>this.BlogSil(myblogs.id)} className="btn btn-danger">SİL</button>
                  <button onClick={()=>this.BlogUpdate(myblogs.id)} className="btn btn-warning">DÜZENLE</button>
                </div>
              </div>)
            })}
        
      </div>
    
  );
}}

export default MyBlogs;
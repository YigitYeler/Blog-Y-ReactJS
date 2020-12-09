import React,{Component} from 'react';
import firebase from 'firebase';

class Blogs extends Component {
    constructor(){
      super();
      this.state={
        AllBlogs:[]
      }
    }
  
    componentDidMount=()=>{
      firebase.database().ref("UserBlogs").child("Kullanıcılar").orderByKey().on('child_added', snapshot =>{
        snapshot.forEach(userid=>{
          //console.log(userid.val())
          userid.forEach(key=>{
            //console.log(key.key)
            var allblogs = {
              id:key.key,
              baslık:key.val().Title,
              blog:key.val().MyBlog,
              nickname:key.val().NickName
            }
            var allblogvar = this.state.AllBlogs;
            allblogvar.push(allblogs);
            this.setState({
              AllBlogs:allblogvar
            })
            //console.log(this.state.AllBlogs)
          })
        })
      })
    }




    render(){

  return (
    
      <div className="container">
          <h1>Bloglar</h1>
          {this.state.AllBlogs.map(allblogs=>{
              return(<div key={allblogs.id} className="card w-75 text-white bg-dark mb-3">
                <div className="card-body">
                  <p className="card-title"><strong>{allblogs.nickname}</strong></p>
                  <p className="card-title">{allblogs.baslık}</p>
                  <p className="card-text">{allblogs.blog}</p>
                </div>
              </div>)
            })}
          </div>
    
  );
}}

export default Blogs;
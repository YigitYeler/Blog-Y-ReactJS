import React from 'react';
import Nav from './Components/Header' 
import Home from './Components/Home' 
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from './Components/Register'
import Login from './Components/Login'
import Blogs from './Components/Blogs'
import MyBlogs from './Components/MyBlogs'
function App() {
    

  return (
    <Router>
      <div className="App">
          <Nav/>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/register" exact component={Register}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/blogs" exact component={Blogs}/>
            <Route path="/myblogs" exact component={MyBlogs}/>
          </Switch>
      </div>
    </Router>
  );
}

export default App;

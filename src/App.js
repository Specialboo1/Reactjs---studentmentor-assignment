import './App.css';
import Sidebar from './sidebar';
import Dashboard from './dashboard';
import Createstudent from './createstudent';
import Creatementor from './creatementor';
import Assign from './assign';
import Changementor from './changementor';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  
  return (   
<Router>
<div id="wrapper">
  <Sidebar></Sidebar>
   <div id="content-wrapper" class="d-flex flex-column">
   <div id="content">
  <div class="container-fluid">
    <Switch>
      <Route path="/" component={Dashboard} exact={true}/>
      <Route path="/createstudent" component={Createstudent} exact={true}/>
      <Route path="/creatementor" component={Creatementor} exact={true}/>
      <Route path="/assign" component={Assign} exact={true}/>
      <Route path="/changementor" component={Changementor} exact={true}/>
    </Switch>
   </div> 
   </div>
   </div>      
</div>
</Router>
  );
}

export default App;

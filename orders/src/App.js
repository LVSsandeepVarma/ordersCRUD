import logo from './logo.svg';
import Register from './components/register'
import Login from './components/login'
import Orders from './components/allOrders'
import Create from './components/createorder'
import Update from './components/updateorder'
import {
	BrowserRouter as Router,
	Route,
	Switch
} from "react-router-dom"
// import cors from 'cors'
import './App.css';

function App() {
  
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Register}/>
        <Route  exact path="/login" component={Login}/>
        <Route exact path="/orders/update/:id" component={Update}/>
        <Route exact path="/orders/:id" component={Orders} />
        <Route exact path="/create/:id" component={Create}/>
      </Switch>
    </Router>
  );
}

export default App;

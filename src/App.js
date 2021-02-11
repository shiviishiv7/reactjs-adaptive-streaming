
import { Route } from "react-router-dom";
import AuthCheck from "./GeneralComp/AuthCheck";
import UserdashBoard from './DashBoard/UserdashBoard'
import AppBarLayout from './GeneralComp/AppBarLayout';
import Home from './GeneralComp/Home';
import UserUpload from "./DashBoard/UserUpload";
import Watch from './GeneralComp/Watch';
import UserSearchResult from './/GeneralComp/UserSearchResult';
function App() {
  return (
    <div >
      <AppBarLayout/>
        <Route exact path="/"><Home/></Route>
        
        <Route exact path="/signIn"><AuthCheck/></Route>
        <Route exact path="/signUp"><AuthCheck/></Route>
        <Route exact path="/userupload"><UserUpload/></Route>
        <Route exact path="/UserdashBoard"><UserdashBoard/></Route>
        
        <Route exact path="/watch/:id"><Watch/></Route>
        <Route exact path="/searchResult/:title"><UserSearchResult/></Route>
    
        
    </div>
  );
}

export default App;

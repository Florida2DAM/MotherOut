import './App.css';
import {Switch, Route, NavLink, HashRouter} from "react-router-dom";
import {UserView} from "./Views/UserView";
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/bootstrap4-dark-purple/theme.css';
import 'primereact/resources/primereact.css';
import * as React from "react";
import {ReportView} from "./Views/ReportView";
import {Button} from 'primereact/button';

function App() {
  return (
      <HashRouter>
        <div className='background'>
          <div className={'menuBar'}>
            <Button className="p-button-raised p-button-text">
              <NavLink to="/users" activeClassName={'active'} className={'link'}>Usuarios</NavLink>
            </Button>
            <Button className="p-button-raised p-button-text">
              <NavLink to="/reports" activeClassName={'active'} className={'link'}>Informes</NavLink>
            </Button>
          </div>
          <Switch>
            <Route path={'/users'}>
              <UserView/>
            </Route>
            <Route path={'/reports'}>
              <ReportView/>
            </Route>
            <Route path={'*'} exact>
            </Route>
          </Switch>
        </div>
      </HashRouter>
  );
}

export default App;

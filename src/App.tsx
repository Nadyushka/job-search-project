import React from 'react';
import './App.css';
import {HeaderSimple} from "./3-UI/u1-components/c2-features/f1-header/Header";
import {RoutesComponent} from "./3-UI/u1-components/c3-commonComponents/routes/Routes";

function App() {

    const appLinks = [
        {link: 'vacancySearch', label: 'Поиск Вакансий'},
        {link: 'saved', label: 'Избранное'}]

    return (
        <div className="App">
            <HeaderSimple links={appLinks}/>
            <RoutesComponent/>
        </div>
    );
}

export default App;

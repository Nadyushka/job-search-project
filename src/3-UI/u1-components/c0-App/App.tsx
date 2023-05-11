import React from 'react';
import './App.css';
import {HeaderSimple} from "../c1-features/f1-header/Header";
import {RoutesComponent} from "../c2-commonComponents/routes/Routes";

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

import React from 'react';
import './App.css';
import {HeaderSimple} from "./3-UI/u1-components/c2-features/f1-header/Header";
import {RoutesComponent} from "./3-UI/u1-components/c3-commonComponents/routes/Routes";

function App() {
    return (
        <div className="App">
            <HeaderSimple links={[{link: 'vacancySearch', label: 'Поиск Вакансий'}, {
                link: 'saved',
                label: 'Избранное'
            }]}/>
            <RoutesComponent/>
        </div>
    );
}

export default App;

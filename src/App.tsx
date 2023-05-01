import React from 'react';
import './App.css';
import {HeaderSimple} from "./3-UI/u1-components/c2-features/f1-header/Header";
import { Main } from '3-UI/u1-components/c2-features/f2-main/Main';

function App() {
    return (
        <div className="App">
            <HeaderSimple links={[{link: 'vacancySearch', label: 'Поиск Вакансий'}, {
                link: 'saved',
                label: 'Избранное'
            }]}/>

            <Main/>
        </div>
    );
}

export default App;

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AppHeader from "../appHeader/AppHeader";
import {MainPage, ComicsPage, Page404, SingleComic} from '../pages';
import { Suspense } from 'react';
import Spinner from '../spinner/Spinner';
import CharPage from '../pages/CharPage';

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path='/' element={<MainPage/>}/>
                            <Route path='/comics' element={<ComicsPage/>}/>
                            <Route path='/comics/:comicId' element={<SingleComic/>}/>
                            <Route path='/character/:charId' element={<CharPage/>}/>
                            <Route path='*' element={<Page404/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;
import AppBanner from "../appBanner/AppBanner";
import ComicsList from '../comicsList/ComicsList';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import {Helmet} from "react-helmet";

const ComicsPage = () => {
    return (
        <div className="comics__content">
            <Helmet>    
                <title>Comics page</title>
                <meta name="description" content="Page with lits of our comics" />
            </Helmet>
            <AppBanner /> 
            <div className="comics_list">
                <ErrorBoundary>
                    <ComicsList/>
                </ErrorBoundary>
            </div>
        </div>
    )
}

export default ComicsPage;
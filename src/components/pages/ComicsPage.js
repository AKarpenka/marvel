import AppBanner from "../appBanner/AppBanner";
import ComicsList from '../comicsList/ComicsList';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const ComicsPage = () => {
    return (
        <div className="comics__content">
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
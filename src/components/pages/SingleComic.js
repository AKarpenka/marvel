import { useParams } from 'react-router-dom';
import {useAboutPage} from '../../hooks/aboutPage.hook/aboutPage.hook';

const SingleComic = () => {
    const {comicId} = useParams();
    const comic = useAboutPage('comic', comicId);

    return (
        <>
            {comic}
        </>
    )
}

export default SingleComic;
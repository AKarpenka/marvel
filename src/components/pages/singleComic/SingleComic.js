import { useEffect, useState } from 'react';
import './singleComic.scss';
import useMarvelService from '../../../services/MarvelService';
import ErrorMassage from '../../errorMassage/ErrorMassage';
import Spinner from '../../spinner/Spinner';
import { useParams, Link } from 'react-router-dom';

const SingleComic = (props) => {
    const [comic, setComic] = useState(null);
    const {comicId} = useParams();

    const {loading, error, clearError, getSingleComic} = useMarvelService();

    useEffect(()=> {
        updateComic();
    }, [comicId])

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const updateComic = () => {
        clearError();
        if(!comicId) return;

        getSingleComic(comicId)
            .then(onComicLoaded);
    }

    return (
        <div className="single-comic">
            {error ? <ErrorMassage/> : null}
            {loading ? <Spinner/> : null}
            {!(loading || error || !comic) ? <View comic={comic}/> : null}
        </div>
    )
}

const View = ({comic}) => {
    const {description, thumbnail, title, price, pageCount} = comic;
    return (
        <>
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: en-us</p>
                <div className="single-comic__price">{price? `${price}$`: 'NOT AVAILABLE'}</div>
            </div>
            <Link className="single-comic__back" to='/comics'>Back to all</Link>
        </>
    )
}

export default SingleComic;
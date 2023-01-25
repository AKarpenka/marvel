import { useEffect, useState } from 'react';
import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMassage from '../errorMassage/ErrorMassage';
import { Link } from 'react-router-dom';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);
    const [offset, setOffset] = useState(0);

    const {loading, error, getComicsList} = useMarvelService();

    useEffect(()=> {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
        getComicsList(offset)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = newComicsList => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewItemsLoading(false);
        setOffset((offset) => offset + 8);
        setComicsEnded(ended);

    }

    const renderItems = (comicsList) => {
        return (
            <ul className="comics__grid">
                {
                    comicsList.map(({id, title, thumbnail, price}, i) => {
                        return (
                            <li className="comics__item" key={i}>
                                <Link to={`/comics/${id}`}>
                                    <img src={thumbnail} alt={title} className="comics__item-img"/>
                                    <div className="comics__item-name">{title}</div>
                                    <div className="comics__item-price">{price? `${price}$`: 'NOT AVAILABLE'}</div>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    return (
        <div className="comics__list">
            { renderItems(comicsList) }
            {loading && !newItemsLoading ? <Spinner/> : null}
            {error ? <ErrorMassage/> : null}
            {newItemsLoading ? 
                <Spinner/> : 
                <button 
                    className="button button__main button__long"
                    disabled={newItemsLoading}
                    style={{'display': comicsEnded ? 'none' : 'block'}}
                    onClick={()=> onRequest(offset)}
                >
                    <div className="inner">load more</div>
                </button>
            }
        </div>
    )
}

export default ComicsList;
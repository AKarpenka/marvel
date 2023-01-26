import { useEffect, useState } from 'react';
import './aboutPage.scss';
import useMarvelService from '../../services/MarvelService';
import ErrorMassage from '../../components/errorMassage/ErrorMassage';
import Spinner from '../../components/spinner/Spinner';
import { Link } from 'react-router-dom';
import AppBanner from '../../components/appBanner/AppBanner';
import {Helmet} from "react-helmet";

export const useAboutPage = (component, itemId) => {
    const [item, setItem] = useState(null);

    const {
        loading, 
        error, 
        clearError, 
        getSingleComic,
        getCharacter
    } = useMarvelService();

    useEffect(()=> {
        updateItem();
    }, [itemId])

    const onItemLoaded = (item) => {
        setItem(item);
    }

    const updateItem = () => {
        clearError();
        if(!itemId) return;

        switch (component){
            case 'comic':
                getSingleComic(itemId)
                    .then(onItemLoaded);
                break;
            case 'char':
                getCharacter(itemId)
                    .then(onItemLoaded);
                break;
            default:
                throw new Error(`There is no such component - ${component}`);
        }
            
    }

    return (
        <>
            <AppBanner /> 
            <div className="single-comic">
                {error ? <ErrorMassage/> : null}
                {loading ? <Spinner/> : null}
                {!(loading || error || !item) ? <View item={item} component={component}/> : null}
            </div>
        </>
        
    )
}

const View = ({item, component}) => {
    // const {description, thumbnail, title, price, pageCount, language} = item;
    return (
        <>
            <Helmet>    
                <title>{item.name || item.title}</title>
                <meta name="description" content="Page with single comic or character" />
            </Helmet>
            <img src={item.thumbnail} alt={item.name || item.title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{item.name || item.title}</h2>
                <p className="single-comic__descr">{item.description}</p>
                {component === 'comic' ? <p className="single-comic__descr">{item.pageCount} pages</p> : null}
                {component === 'comic'? <p className="single-comic__descr">Language: {item.language}</p> : null}
                {component === 'comic'? <div className="single-comic__price">{item.price}</div>: null}
            </div>
            {component === 'comic'? <Link className="single-comic__back" to='/comics'>Back to all</Link> : null}
        </>
    )
}

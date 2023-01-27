import { useEffect, useState } from 'react';
import './aboutPage.scss';
import useMarvelService from '../../services/MarvelService';
import { Link } from 'react-router-dom';
import AppBanner from '../../components/appBanner/AppBanner';
import {Helmet} from "react-helmet";
import setContent from '../../utils/setContent';

export const useAboutPage = (component, itemId) => {
    const [item, setItem] = useState(null);

    const {
        setProcess, 
        process,
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
                    .then(onItemLoaded)
                    .then(()=>setProcess('confirmed'));
                break;
            case 'char':
                getCharacter(itemId)
                    .then(onItemLoaded)
                    .then(()=>setProcess('confirmed'));
                break;
            default:
                throw new Error(`There is no such component - ${component}`);
        }
            
    }

    return (
        <>
            <AppBanner /> 
            <div className="single-comic">
                {setContent(process, () => <View data={item} component={component}/>, item)}
            </div>
        </>
        
    )
}

const View = ({data, component}) => {
    return (
        <>
            <Helmet>    
                <title>{data.name || data.title}</title>
                <meta name="description" content="Page with single comic or character" />
            </Helmet>
            <img src={data.thumbnail} alt={data.name || data.title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{data.name || data.title}</h2>
                <p className="single-comic__descr">{data.description}</p>
                {component === 'comic' ? <p className="single-comic__descr">{data.pageCount} pages</p> : null}
                {component === 'comic'? <p className="single-comic__descr">Language: {data.language}</p> : null}
                {component === 'comic'? <div className="single-comic__price">{data.price}</div>: null}
            </div>
            {component === 'comic'? <Link className="single-comic__back" to='/comics'>Back to all</Link> : null}
        </>
    )
}

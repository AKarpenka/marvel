import './charList.scss';
import React, { useEffect, useState, useRef} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMassage from '../errorMassage/ErrorMassage';
import PropTypes from 'prop-types';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);


    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(()=>{
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial, ) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
       
        getAllCharacters(offset)
            .then(onCharListLoaded)
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList((charList) => [...charList, ...newCharList]);
        setNewItemsLoading(false);
        setOffset((offset) => offset + 9);
        setCharEnded(ended);
    }

    const itemRefs = useRef([]);

    const onClickChar = (id, i) => {
        props.onCharSelected(id);
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));

        itemRefs.current[i].classList.add('char__item_selected');
        itemRefs.current[i].focus();
    }

    const renderItems = (charList) => {
        const items = charList.map(({id, name, thumbnail}, i) => {
            return(
                <CSSTransition key={id} timeout={500} classNames='char__item' >
                    <li 
                        className='char__item'
                        tabIndex='0'
                        onClick={() => onClickChar(id, i)}
                        onKeyDown={(e) => {
                            if (e.key === ' ' || e.key === "Enter") {
                                onClickChar(id, i);
                            }
                        }}
                        ref={el => itemRefs.current[i] = el}
                    >
                        <img 
                            src={thumbnail} 
                            alt={name}
                            style = {
                                thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
                                ? {objectFit: 'contain'}
                                : {objectFit: 'cover'}
                            }
                        />
                        <div className="char__name">{name}</div>
                    </li>
                </CSSTransition>
            )
        })

        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }

    return (
        <div className="char__list">
            {renderItems(charList)}
            {loading && !newItemsLoading ? <Spinner/> : null}
            {error ? <ErrorMassage/> : null}
            {newItemsLoading ? 
                <Spinner/> : 
                <button 
                    className="button button__main button__long"
                    disabled={newItemsLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}
                >
                    <div className="inner">load more</div>
                </button>
            }
        </div>
    )

}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;
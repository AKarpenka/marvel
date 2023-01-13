import './charList.scss';
import React, { Component} from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMassage from '../errorMassage/ErrorMassage';
import PropTypes from 'prop-types';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        newItemsLoading: false,
        offset: 210,
        charEnded: false
    }

    componentDidMount() {
        this.onRequest();
    }

    marvelService = new MarvelService();

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemsLoading: true
        })
    }

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        this.setState(({offset, charList})=> ({
            charList: [...charList, ...newCharList],
            loading: false,
            error: false,
            newItemsLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    itemRefs = [];

    setRef = (ref) => {
        this.itemRefs.push(ref);
    }


    onClickChar = (id, i) => {
        this.props.onCharSelected(id);
        this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));

        this.itemRefs[i].classList.add('char__item_selected');
        this.itemRefs[i].focus();
    }


    renderItems = (charList) => {
        return (
            <ul className="char__grid">
                {charList.map(({id, name, thumbnail}, i) => {
                    return(
                        <li 
                            className='char__item' 
                            key={id}
                            tabIndex='0'
                            onClick={() => this.onClickChar(id, i)}
                            onKeyDown={(e) => {
                                if (e.key === ' ' || e.key === "Enter") {
                                    this.onClickChar(id, i);
                                }
                            }}
                            ref={this.setRef}
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
                    )
                })}
            </ul>
        )
    }

    render() {
        const {
            charList, 
            loading, 
            error, 
            newItemsLoading, 
            offset, 
            charEnded
        } = this.state;

        return (
            <div className="char__list">
                {!(loading || error) ? this.renderItems(charList) : null}
                {loading ? <Spinner/> : null}
                {error ? <ErrorMassage/> : null}
                {newItemsLoading ? 
                    <Spinner/> : 
                    <button 
                        className="button button__main button__long"
                        disabled={newItemsLoading}
                        style={{'display': charEnded ? 'none' : 'block'}}
                        onClick={() => this.onRequest(offset)}
                    >
                        <div className="inner">load more</div>
                    </button>
                }
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;
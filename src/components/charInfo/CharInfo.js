import { useState, useEffect } from 'react';
import './charInfo.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMassage from '../errorMassage/ErrorMassage';
import Skeleton from '../skeleton/Skeleton';
import SearchChar from '../searchChar/SearchChar';


const CharInfo = (props) => {

    const [char, setChar] = useState(null);

    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateCharacter();
    }, [props.charId]);

    const onCharacterLoaded = (char) => {
        setChar(char);
    }

    const updateCharacter = (id) => {
        clearError();
        const {charId} = props;
        if(!charId) return;

        getCharacter(charId)
            .then(onCharacterLoaded);
    }

    return (
        <div>
            <div className="char__info">
                {char || loading || error ? null : <Skeleton/>}
                {error ? <ErrorMassage/> : null}
                {loading ? <Spinner/> : null}
                {!(loading || error || !char) ? <View char={char}/> : null}
            </div>
            <SearchChar />
        </div>
    )

}


const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;

    return (
        <>
            <div className="char__basics">
                <img 
                    src={thumbnail} 
                    alt={name} 
                    style = {
                        thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
                        ? {objectFit: 'contain'}
                        : {objectFit: 'cover'}
                    }
                />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>

            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? 
                    comics.map(({name, resourceURI}, i) => {
                        if (i<10) {
                            return (
                                <li 
                                    className="char__comics-item"
                                    key={i}
                                >
                                    {name}
                                </li>
                            )
                        } else {
                            return null;
                        }
                    })
                    : 'No comics'
                }
            </ul>
        </>
    );
}

export default CharInfo;
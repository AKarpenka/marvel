import { Component } from 'react';
import './charInfo.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMassage from '../errorMassage/ErrorMassage';
import Skeleton from '../skeleton/Skeleton';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.getCharacter();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.charId !== this.props.charId) {
            this.getCharacter(this.props.charId);
        }
    }

    componentDidCatch(err, info) {
        console.log(err, info);

        this.setState({error: true})
    }

    onCharacterLoaded = (char) => {
        this.setState({
            char, 
            loading: false,
            error: false
        });
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }

    getCharacter = (id) => {
        const {charId} = this.props;
        if(!charId) return;

        this.onCharLoading();
        this.marvelService
            .getCharacter(charId)
            .then(this.onCharacterLoaded)
            .catch(this.onError);
    }

    render() {
        const {char, loading, error} = this.state;

        const skeleton = char || loading || error ? null : <Skeleton/>
        const errorMassage = error ? <ErrorMassage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMassage}
                {spinner}
                {content}
            </div>
        )
    }
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
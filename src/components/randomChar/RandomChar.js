import { useState, useEffect } from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

const RandomChar = () => {
    const [char, setChar] = useState({});

    useEffect(() => {
        getRandomCharecter();
    }, []);

    const {setProcess, process, getCharacter, clearError} = useMarvelService();

    const onCharacterLoaded = (char) => {
        setChar(char);
    }

    const getRandomCharecter = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then(onCharacterLoaded)
            .then(()=>setProcess('confirmed'))
    }

    return (
        <div className="randomchar">
            {setContent(process, View, char)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={getRandomCharecter}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
    
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki} = data;

    return (
        <div className="randomchar__block">
            <img 
                src={thumbnail} 
                alt="Random character" 
                className="randomchar__img" 
                style = {
                    thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
                    ? {objectFit: 'contain'}
                    : {objectFit: 'cover'}
                }
            />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

// class RandomChar extends Component {

//     state = {
//         char: {},
//         loading: true,
//         error: false
//     }

//     componentDidMount() {
//         this.getRandomCharecter();
//     }

//     marvelService = new MarvelService();

//     onCharacterLoaded = (char) => {
//         this.setState({
//             char, 
//             loading: false,
//             error: false
//         });
//     }

//     onCharLoading = () => {
//         this.setState({
//             loading: true
//         })
//     }

//     onError = () => {
//         this.setState({
//             loading: false,
//             error: true
//         });
//     }

//     getRandomCharecter = () => {
//         const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
//         this.onCharLoading();
//         this.marvelService
//             .getCharacter(id)
//             .then(this.onCharacterLoaded)
//             .catch(this.onError);
//     }


//     render() {
//         const {char, loading, error} = this.state;
//         const errorMassage = error ? <ErrorMassage/> : null;
//         const spinner = loading ? <Spinner/> : null;
//         const content = !(loading || error) ? <View char={char}/> : null;
//         return (
//             <div className="randomchar">
//                 {errorMassage}
//                 {spinner}
//                 {content}            
//                 <div className="randomchar__static">
//                     <p className="randomchar__title">
//                         Random character for today!<br/>
//                         Do you want to get to know him better?
//                     </p>
//                     <p className="randomchar__title">
//                         Or choose another one
//                     </p>
//                     <button className="button button__main" onClick={this.getRandomCharecter}>
//                         <div className="inner">try it</div>
//                     </button>
//                     <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
//                 </div>
//             </div>
//         )
//     }
    
// }

// const View = ({char}) => {
//     const {name, description, thumbnail, homepage, wiki} = char;

//     return (
//         <div className="randomchar__block">
//             <img 
//                 src={thumbnail} 
//                 alt="Random character" 
//                 className="randomchar__img" 
//                 style = {
//                     thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
//                     ? {objectFit: 'contain'}
//                     : {objectFit: 'cover'}
//                 }
//             />
//             <div className="randomchar__info">
//                 <p className="randomchar__name">{name}</p>
//                 <p className="randomchar__descr">
//                     {description}
//                 </p>
//                 <div className="randomchar__btns">
//                     <a href={homepage} className="button button__main">
//                         <div className="inner">homepage</div>
//                     </a>
//                     <a href={wiki} className="button button__secondary">
//                         <div className="inner">Wiki</div>
//                     </a>
//                 </div>
//             </div>
//         </div>
//     )
// }

export default RandomChar;
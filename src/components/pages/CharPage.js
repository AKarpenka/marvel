import { useParams } from 'react-router-dom';
import {useAboutPage} from '../../hooks/aboutPage.hook/aboutPage.hook';

const CharPage = () => {
    const {charId} = useParams();
    const char = useAboutPage('char', charId);
    console.log(charId);

    return (
        <>
            {char}
        </>
    )
}

export default CharPage;
import { useHttp } from "../hooks/http.hook";


const useMarvelService = () => {
    const {
        loading, 
        request, 
        error, 
        clearError, 
        process, 
        setProcess
    } = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=00d7e737c5dbd9babcbbdb9d201def68';
    const _baseOffset = 210;

    const _transformCharacter = (data) => {
        return {
            id: data.id,
            name: data.name, 
            thumbnail: `${data.thumbnail.path}.${data.thumbnail.extension}`, 
            description: (data.description.length > 50 ? data.description.substr(0, 200) + '...' : data.description ) || 'This guy does not have any description',
            homepage: data.urls[0].url,
            wiki: data.urls[1].url,
            comics: data.comics.items
        }
    }

    const _transformComics = (data) => {
        return {
            id: data.id,
            thumbnail: `${data.thumbnail.path}.${data.thumbnail.extension}`,
            title: data.title,
            price: data.prices[1]?.price || 'NOT AVAILABLE',
            pageCount: data.pageCount,
            description: data.description,
            language: data.textObjects[0]?.language || "en-us"
        }
    }

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id) => {
        const res =  await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);  
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?limit=1&name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    }

    const getComicsList = async (offset = 0) => {
        const res =  await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);  
    }

    const getSingleComic = async (id) => {
        const res =  await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);  
    }

    return {
        process,
        setProcess,
        loading, 
        error, 
        clearError,
        getAllCharacters, 
        getCharacter,
        getComicsList,
        getSingleComic,
        getCharacterByName
    }
}

export default useMarvelService;
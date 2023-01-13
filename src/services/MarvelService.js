class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=00d7e737c5dbd9babcbbdb9d201def68';
    _baseOffset = 210;

    _transformCharacter = (data) => {
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

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter)
    }

    getCharacter = async (id) => {
        const res =  await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);  
    }
}

export default MarvelService;
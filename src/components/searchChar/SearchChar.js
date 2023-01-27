import { useState } from 'react';
import {Formik, Form, Field, ErrorMessage } from 'formik';
import useMarvelService from '../../services/MarvelService';
import * as Yup from 'yup';
import './SearchChar.scss';
import { Link } from 'react-router-dom';

const SearchChar = () => {
    const [char, setChar] = useState();

    const {
        // loading, 
        // error, 
        process,
        setProcess,
        clearError, 
        getCharacterByName
    } = useMarvelService();

    const onItemLoaded = (item) => {
        setChar(item);
    }

    const updateItem = (name) => {
        clearError();

        getCharacterByName(name)
            .then(onItemLoaded)
            .then(()=>setProcess('confirmed'))
    }

    console.log(process);

    return (
        <>
            <Formik 
                initialValues = {{
                    name: ''
                }}

                validationSchema ={ Yup.object({
                    name: Yup.string()
                            .min(2, 'It should be 2 symbols at least')
                            .required('This field is required!')
                })}

                onSubmit={values => updateItem(values.name)}
            >
                <Form className="search__block">
                    <div className="search__block-name">Or find a character by name:</div>
                    <div className="search__basics">
                        <Field     
                            className='search__input-item'
                            id="name"
                            name="name"
                        />
                        <div className="search__btns">
                            <button 
                                className="button button__main"
                                type="submit"
                                disabled={process === 'loading'}
                            >
                                <div className="inner">find</div>
                            </button>
                        </div>
                    </div>
                    <ErrorMessage className='error' name='name' component='div'/>

                    {process === 'error' ? <div className="char__search-critical-error"><ErrorMessage /></div> : null}

                    {
                        !char ? null : char.length > 0 ? 
                                    <div className='search__basics success'>
                                        <p>There is! Wanna visit {char[0].name} page?</p>
                                        <div className="search__btns">
                                            <Link to={`/character/${char[0].id}`}  className="button button__secondary">
                                                <div className="inner">Wiki</div>
                                            </Link>
                                        </div>
                                    </div> : 
                                    <div className='error'>
                                        The character was not found. Chek the name and try again
                                    </div> 
                    }
                </Form>
            </Formik>
        </>
    )
}

export default SearchChar;
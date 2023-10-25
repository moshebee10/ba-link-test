import React, { useState, useEffect } from 'react';
import './mainPage.css';
import { getData } from '../api';
import MoviesListInfo from '../components/moviesListInfo';
import {
    Form,
    FormGroup,
    Label,
    Col,
    Input
} from 'reactstrap';


function MainPage() {

    const [movies, setMovies] = useState([]);
    const [filterMovies, setFilterMovies] = useState([]);
    const [value, setValue] = useState('');

    useEffect(() => {
        setFilterMovies(
            movies.filter(item => item.title.toLowerCase().includes(value.toLowerCase()))
        );
    }, [value, movies])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getData();
            setMovies(data.results);
            setFilterMovies(data.results);
        }

        fetchData().catch(console.error);
    }, [])

    return (
        <div>
            <Form
                className='main-page-form'
            >
                <FormGroup row>
                    <Label
                        for="searchInput"
                        sm={2}
                    >
                        Search
                    </Label>
                    <Col sm={10}>
                        <Input
                            id="searchInput"
                            name="search"
                            placeholder="Search a movie"
                            type="text"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </Col>
                </FormGroup>
            </Form>
            <MoviesListInfo
                data={filterMovies}
            />
        </div>
    );
}

export default MainPage;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './moviesListInfo.css';
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
} from 'reactstrap';


function MoviesListInfo(props) {

    const navigate = useNavigate();
    const [open, setOpen] = useState('1');
    // const [isOpen, setIOsOpen] = useState(true);
    const [currentMovie, setCurrentMovie] = useState({});
    // console.log(currentMovie);

    useEffect(() => {
        setCurrentMovie(props.data[0])
    }, [props.data]);

    let cellOnClick = (elm) => {
        navigate(
            '/movie-details',
            { state: elm }
        );
    }

    const toggle = async (id) => {
        // console.log(id);
        let realId = parseInt(id) - 1;
        console.log(props.data[realId]);
        if (open === id) {
            // console.log('close');
            setOpen('');
            // setIOsOpen(false);
        } else {
            setOpen(id);
            // console.log('open');
            // setIOsOpen(true);
        }
    };

    return (
        <div>
            <Accordion
                open={open}
                toggle={toggle}
            >
                {props.data.map((elm, i) => {
                    return (
                        <AccordionItem
                            onClick={(e) => {
                                // console.log(isOpen);
                            }}
                            key={`MovieInfoCell-${i}`}
                        // id={elm.id}
                        >
                            <AccordionHeader targetId={`${i + 1}`}>
                                <span className='movie-name'>
                                    {'Movie name:' + '\xa0'}
                                </span>
                                <h6>{elm.title}</h6>
                            </AccordionHeader>
                            <AccordionBody
                                accordionId={`${i + 1}`}
                                className='accordion-body'
                                onClick={() => cellOnClick(elm)}
                            >
                                <div>
                                    <div>{`release date:\xa0${elm.release_date}`}</div>
                                    <div>{`popularity:\xa0${elm.popularity}`}</div>
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                    )
                })}
            </Accordion>
        </div>
    );
}

export default MoviesListInfo;

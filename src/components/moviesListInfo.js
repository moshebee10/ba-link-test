import React, { useState } from 'react';
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

    let cellOnClick = (elm) => {
        navigate(
            '/movie-details',
            { state: elm }
        );
    }

    const toggle = async (id) => {
        if (open === id) {
            setOpen('');
        } else {
            setOpen(id);
        }
    };

    return (
        <div>
            <Accordion open={open} toggle={toggle}>
                {props.data.map((elm, i) => {
                    return (
                        <AccordionItem
                            key={`MovieInfoCell-${i}`}
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

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

    const toggle = (id) => {
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
                                <h6>{elm.title}</h6>
                            </AccordionHeader>
                            <AccordionBody
                                accordionId={`${i + 1}`}
                                className='accordion-body'
                                onClick={() => cellOnClick(elm)}
                            >
                                {elm.overview}
                            </AccordionBody>
                        </AccordionItem>
                    )
                })}
            </Accordion>
        </div>
    );
}

export default MoviesListInfo;

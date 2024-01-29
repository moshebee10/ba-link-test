import { useEffect, useState } from 'react';
import './movieDetailsPage.css';
import { useLocation } from 'react-router-dom';
import { getMovieImages } from '../api';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
} from 'reactstrap';


function MovieDetailsPage() {

    const { state } = useLocation();
    const [items, setItems] = useState([]);
    const [str, setStr] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const urlString = `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), 
        url(https://image.tmdb.org/t/p/w500/${str})`;

    useEffect(() => {
        let arr = [];
        const fetchData = async () => {
            const data = await getMovieImages(state.id);
            data.backdrops.forEach((x, i) => {
                arr.push(
                    {
                        src: `https://image.tmdb.org/t/p/w500/${x.file_path}`,
                        altText: '',
                        caption: '',
                        key: i + 1,
                    }
                )
            });
            setItems(arr);
            setStr(data.posters[0].file_path)
        }

        fetchData().catch(console.error);

    }, [state])

    useEffect(() => {
        let str = state.overview;
        let words = str.split(" ");

        let sentenceLength = 7;
        let sentences = [];

        for (let i = 0; i < words.length; i += sentenceLength) {
            let sentence = words.slice(i, i + sentenceLength).join(" ");
            sentences.push(sentence);
        }
        let aText = sentences
        let iSpeed = 100; // time delay of print out
        let iIndex = 0; // start printing array at this posision
        let iArrLength = aText[0].length; // the length of the text array
        let iScrollAt = 20; // start scrolling up at this many lines

        let iTextPos = 0; // initialise text position
        let sContents = ''; // initialise contents letiable
        let iRow; // initialise current row 
        let typewriter = () => {
            sContents = ' ';
            iRow = Math.max(0, iIndex - iScrollAt);
            let destination = document.getElementById("typedtext");
            if (iIndex > 4) {
                destination.scroll({
                    top: 200
                })
            }
            if (destination) {
                while (iRow < iIndex) {
                    sContents += aText[iRow++] + '<br />';
                }
                destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "_";
                if (iTextPos++ === iArrLength) {
                    iTextPos = 0;
                    iIndex++;
                    if (iIndex !== aText.length) {
                        iArrLength = aText[iIndex].length;
                        setTimeout(typewriter, 500);
                    }
                } else {
                    setTimeout(typewriter, iSpeed);
                }
            }
        }
        typewriter()
    }, [state.overview])

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };

    const slides = items.map((item) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.src}
            >
                <img
                    src={item.src}
                    alt={item.altText}
                    className='carousel-item-image'
                />
                <CarouselCaption
                    captionText={item.caption}
                    captionHeader={item.caption}
                />
            </CarouselItem>
        );
    });

    return (
        <div
            className='movie-details-main'
            style={{
                backgroundImage: str ? urlString : ''
            }}
        >
            <div className='overview-div' id='typedtext'></div>
            <div
                className='carousel-div'
            >
                <Carousel
                    activeIndex={activeIndex}
                    next={next}
                    previous={previous}
                >
                    <CarouselIndicators
                        items={items}
                        activeIndex={activeIndex}
                        onClickHandler={goToIndex}
                    />
                    {slides}
                    <CarouselControl
                        direction="prev"
                        directionText="Previous"
                        onClickHandler={previous}
                    />
                    <CarouselControl
                        direction="next"
                        directionText="Next"
                        onClickHandler={next}
                    />
                </Carousel>
            </div>
        </div>
    );
}

export default MovieDetailsPage;

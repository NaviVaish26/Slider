import { useEffect, useState } from 'react';
import { shortList, list, longList } from '../data';
import { FaQuoteRight } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Carousel = () => {
  const [people, setPeople] = useState(longList);
  const [currentPerson, setCurrentPerson] = useState(0);
  const prevSlide = () => {
    setCurrentPerson((current) => {
      return (current - 1 + people.length) % people.length;
    });
  };

  const nextSlide = () => {
    setCurrentPerson((current) => {
      return (current + 1) % people.length;
    });
  };

  useEffect(() => {
    let slider = setInterval(() => {
      nextSlide();
    }, 2000);
    return () => {
      clearInterval(slider);
    };
  }, [currentPerson]);

  return (
    <section className='slider-container'>
      {people.map((person, personId) => {
        const { id, image, name, title, quote } = person;
        return (
          <article
            key={id}
            className='slide'
            style={{
              transform: `translateX(${100 * (personId - currentPerson)}%)`,
              opacity: personId === currentPerson ? 1 : 0,
              visibility: personId === currentPerson ? 'visible' : 'hidden',
            }}
          >
            <img src={image} alt={name} className='person-img' />
            <h5 className='name'>{name}</h5>
            <p className='title'>{title}</p>
            <p className='text'>{quote}</p>
            <FaQuoteRight className='icon' />
          </article>
        );
      })}
      <button className='prev' type='button' onClick={prevSlide}>
        <FiChevronLeft />
      </button>
      <button className='next' type='button' onClick={nextSlide}>
        <FiChevronRight />
      </button>
    </section>
  );
};

export default Carousel;

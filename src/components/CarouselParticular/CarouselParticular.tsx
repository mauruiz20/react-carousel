import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ButtonContainer,
  Container,
  LeftButton,
  RightButton,
  Slide,
  Slider,
  SliderContainer,
  Tag,
} from './CarouselParticularStyled';

export interface CarouselItemInterface {
  id: number;
  src: string;
  alt: string;
}

interface CarouselParticularInterface {
  items: CarouselItemInterface[];
}

const CarouselParticular: React.FC<CarouselParticularInterface> = ({ items }) => {
  const slides = useMemo(() => {
    const SlideItems = items.map((item, index) => (
      <Slide key={index} src={item.src} alt={item.alt} />
    ));

    return [
      <Slide
        key={items.length + 1}
        src={items[items.length - 1].src}
        alt={items[items.length - 1].alt}
      />,
      ...SlideItems,
      <Slide key={items.length + 2} src={items[0].src} alt={items[0].alt} />,
    ];
  }, [items]);

  const [current, setCurrent] = useState<number>(1);
  const [translateX, setTranslateX] = useState<number>(current);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [startTouch, setStartTouch] = useState<number | null>(null);
  const [currentTouch, setCurrentTouch] = useState<number>(0);

  const handleNext = () => {
    if (!carouselRef.current) return;
    carouselRef.current.style.transitionDuration = '400ms';
    if (current >= items.length) {
      setTranslateX(items.length + 1);
      setCurrent(1);
    } else {
      setTranslateX(current + 1);
      setCurrent((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (!carouselRef.current) return;
    carouselRef.current.style.transitionDuration = '400ms';
    if (current <= 1) {
      setTranslateX(0);
      setCurrent(items.length);
    } else {
      setTranslateX(current - 1);
      setCurrent((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const transitionEnd = () => {
      if (current <= 1 && carouselRef.current) {
        carouselRef.current.style.transitionDuration = '0ms';
        setTranslateX(current);
      }

      if (current >= items.length && carouselRef.current) {
        carouselRef.current.style.transitionDuration = '0ms';
        setTranslateX(items.length);
      }
    };
    document.addEventListener('transitionend', transitionEnd);

    return () => document.removeEventListener('transitionend', transitionEnd);
  }, [current, carouselRef, items]);

  const handleTouchStart = (evt: React.TouchEvent<HTMLDivElement>) => {
    setStartTouch(evt.touches[0].clientX);
  };

  const handleTouchMove = (evt: React.TouchEvent<HTMLDivElement>) => {
    if (startTouch === null) {
      return;
    }

    const diffX = evt.touches[0].clientX - startTouch;
    setCurrentTouch(diffX);
  };

  const handleTouchEnd = () => {
    if (currentTouch < 0) {
      handleNext();
    } else if (currentTouch > 0) {
      handleBack();
    }

    setStartTouch(null);
    setCurrentTouch(0);
  };

  return (
    <Container>
      <SliderContainer>
        <Slider
          ref={carouselRef}
          $translateX={translateX}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {slides}
        </Slider>
      </SliderContainer>
      <Tag>HTTP {items[current - 1].alt.replace('t', 't ')}</Tag>
      <ButtonContainer>
        <LeftButton onClick={handleBack} />
        <RightButton onClick={handleNext} />
      </ButtonContainer>
    </Container>
  );
};

export default CarouselParticular;

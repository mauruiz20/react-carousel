import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ButtonContainer,
  Container,
  LeftButton,
  RightButton,
  Slide,
  Slider,
  SliderContainer,
} from './CarouselStyled';

interface CarouselInterface {
  children: JSX.Element[];
  showAllSlides?: boolean;
}

const Carousel: React.FC<CarouselInterface> = ({ children, showAllSlides = false }) => {
  const slides = useMemo(() => {
    if (children && children.length > 1) {
      const items = children.map((child, index) => <Slide key={index}>{child}</Slide>);

      return [
        <Slide key={children.length + 1}>{children[children.length - 1]}</Slide>,
        ...items,
        <Slide key={children.length + 2}>{children[0]}</Slide>,
      ];
    }

    return <Slide>{children[0]}</Slide>;
  }, [children]);

  const [current, setCurrent] = useState<number>(1);
  const [translateX, setTranslateX] = useState<number>(current);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [startTouch, setStartTouch] = useState<number | null>(null);
  const [currentTouch, setCurrentTouch] = useState<number>(0);

  const handleNext = () => {
    if (!carouselRef.current) return;
    carouselRef.current.style.transitionDuration = '400ms';
    if (current >= children.length) {
      setTranslateX(children.length + 1);
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
      setCurrent(children.length);
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

      if (current >= children.length && carouselRef.current) {
        carouselRef.current.style.transitionDuration = '0ms';
        setTranslateX(children.length);
      }
    };
    document.addEventListener('transitionend', transitionEnd);

    return () => document.removeEventListener('transitionend', transitionEnd);
  }, [current, carouselRef, children]);

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
      <SliderContainer $showAllSlides={showAllSlides}>
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
      <ButtonContainer>
        <LeftButton onClick={handleBack} />
        <RightButton onClick={handleNext} />
      </ButtonContainer>
    </Container>
  );
};

export default Carousel;

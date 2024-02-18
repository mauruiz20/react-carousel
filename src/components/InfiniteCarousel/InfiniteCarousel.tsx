import { useRef, useState } from 'react'
import useInfiniteCarousel from '../../hooks/useInfiniteCarousel'
import {
  Button,
  ButtonContainer,
  Container,
  InfiniteCarouselContainer,
  RangeContainer,
  Slide,
  Slider
} from './InfiniteCarouselStyled'

interface SlideInterface {
  name: string
  color: string
}

const SLIDES: SlideInterface[] = [
  { name: '1', color: 'lightgoldenrodyellow' },
  { name: '2', color: 'lightblue' },
  { name: '3', color: 'lightgreen' },
  { name: '4', color: 'lightcoral' },
  { name: '5', color: 'lightcyan' },
  { name: '6', color: 'lightgray' },
  { name: '7', color: 'lightpink' }
]

const SLIDER_ID = 'slider'
const SLIDE_CLASS_NAME = 'slide'

const InfiniteCarousel: React.FC = () => {
  const [visibleSlides, setVisibleSlides] = useState<number>(SLIDES.length)
  const [overflow, setOverflow] = useState<boolean>(true)
  const carouselRef = useRef<HTMLDivElement>(null)

  const { slides, prev, next } = useInfiniteCarousel<
    SlideInterface,
    HTMLDivElement
  >({
    items: SLIDES,
    ref: carouselRef,
    visibleSlides,
    sliderId: SLIDER_ID,
    slideClassName: SLIDE_CLASS_NAME
  })

  return (
    <Container>
      <RangeContainer>
        <input
          type='range'
          min={1}
          max={SLIDES.length}
          value={visibleSlides}
          onChange={(e) => setVisibleSlides(parseInt(e.target.value))}
        />
        <label>{visibleSlides}</label>
      </RangeContainer>
      <RangeContainer>
        <label>Overflow?</label>
        <input
          type='checkbox'
          checked={overflow}
          onChange={(e) => setOverflow(e.target.checked)}
        />
      </RangeContainer>
      <InfiniteCarouselContainer ref={carouselRef} $overflow={overflow}>
        <Slider id={SLIDER_ID}>
          {slides.map((slide, index) => (
            <Slide
              key={index}
              className={SLIDE_CLASS_NAME}
              $color={slide.color}
            >
              {slide.name}
            </Slide>
          ))}
        </Slider>
      </InfiniteCarouselContainer>
      <ButtonContainer>
        <Button onClick={prev}>Prev</Button>
        <Button onClick={next}>Next</Button>
      </ButtonContainer>
    </Container>
  )
}

export default InfiniteCarousel

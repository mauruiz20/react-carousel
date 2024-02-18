import { useRef } from 'react'
import useInfiniteCarousel from '../../hooks/useInfiniteCarousel'
import {
  Button,
  ButtonContainer,
  InfiniteCarouselContainer,
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
  const carouselRef = useRef<HTMLDivElement>(null)

  const { slides, prev, next } = useInfiniteCarousel<
    SlideInterface,
    HTMLDivElement
  >({
    items: SLIDES,
    ref: carouselRef,
    sliderId: SLIDER_ID,
    slideClassName: SLIDE_CLASS_NAME
  })

  return (
    <InfiniteCarouselContainer ref={carouselRef}>
      <Slider id={SLIDER_ID}>
        {slides.map((slide, index) => (
          <Slide key={index} className={SLIDE_CLASS_NAME} $color={slide.color}>
            {slide.name}
          </Slide>
        ))}
      </Slider>
      <ButtonContainer>
        <Button onClick={prev}>Prev</Button>
        <Button onClick={next}>Next</Button>
      </ButtonContainer>
    </InfiniteCarouselContainer>
  )
}

export default InfiniteCarousel

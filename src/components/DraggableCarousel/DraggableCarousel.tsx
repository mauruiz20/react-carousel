import { useRef, useState } from 'react'
import useCarousel from '../../hooks/useCarousel'
import {
  Box,
  Carousel,
  Cover,
  Dot,
  DotContainer,
  DraggableCarouselContainer
} from './DraggableCarouselStyled'

const BOXES = [1, 2, 3, 4, 5]

const DraggableCarousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleSlides, setVisibleSlides] = useState<number>(1)
  const { handleClickDot } = useCarousel({ containerRef, visibleSlides })

  const handleSlideChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setVisibleSlides(Number(evt.target.value))
  }

  return (
    <DraggableCarouselContainer ref={containerRef}>
      <Cover className='cover' />
      <input
        type='range'
        min='1'
        max={BOXES.length}
        value={visibleSlides}
        onChange={handleSlideChange}
      />
      <label>{visibleSlides}</label>
      <Carousel id='carousel'>
        {BOXES.map((box) => (
          <Box key={box} className='box'>
            {box}
          </Box>
        ))}
      </Carousel>
      <DotContainer>
        {BOXES.map((box, index) => (
          <Dot
            key={box}
            className='dot'
            onClick={() => handleClickDot(index)}
          />
        ))}
      </DotContainer>
      <Cover className='cover' />
    </DraggableCarouselContainer>
  )
}

export default DraggableCarousel

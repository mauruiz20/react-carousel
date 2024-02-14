import { useRef } from 'react'
import {
  Box,
  Carousel,
  DraggableCarouselContainer
} from './DraggableCarouselStyled'

const BOXES = [1, 2, 3, 4, 5]

const DraggableCarousel: React.FC = () => {
  const carouselContainerRef = useRef<HTMLDivElement>(null)

  return (
    <DraggableCarouselContainer ref={carouselContainerRef}>
      <Carousel id='carousel'>
        {BOXES.map((box) => (
          <Box key={box} className='box'>
            {box}
          </Box>
        ))}
      </Carousel>
    </DraggableCarouselContainer>
  )
}

export default DraggableCarousel

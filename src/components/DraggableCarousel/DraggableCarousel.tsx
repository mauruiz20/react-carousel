import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Draggable from 'gsap/Draggable'
import { useRef, useState } from 'react'
import {
  Box,
  Carousel,
  Cover,
  DraggableCarouselContainer
} from './DraggableCarouselStyled'

const BOXES = [1, 2, 3, 4, 5]

const DraggableCarousel: React.FC = () => {
  const carouselContainerRef = useRef<HTMLDivElement>(null)
  const [slidesToShow, setSlidesToShow] = useState(1)

  useGSAP(
    () => {
      gsap.registerPlugin(Draggable)

      const carouselWidth = gsap.getProperty('#carousel', 'width') as number
      const boxWidth = gsap.getProperty('.box', 'width') as number
      const coverWidth = carouselWidth - boxWidth * slidesToShow

      gsap.set('.cover', { width: coverWidth })

      gsap.set(carouselContainerRef.current, {
        width: carouselWidth * 2 - boxWidth * slidesToShow
      })

      let initialX = 0
      let initialTime = 0

      const getNextPosition = () => {
        const carouselX = Math.abs(gsap.getProperty('#carousel', 'x') as number)
        const nextBox = Math.round(carouselX / boxWidth)

        gsap.to('#carousel', {
          x: nextBox * -boxWidth,
          ease: 'none',
          duration: 0.2
        })
      }

      const handleDragStart = () => {
        initialX = gsap.getProperty('#carousel', 'x') as number
        initialTime = new Date().getTime()
      }

      const handleDragEnd = () => {
        return getNextPosition()

        const carouselX = gsap.getProperty('#carousel', 'x') as number
        const finalX = gsap.getProperty('#carousel', 'x') as number
        const finalTime = new Date().getTime()
        const diferentialTime = finalTime - initialTime
        if (diferentialTime < 50 || diferentialTime > 1500)
          return getNextPosition()

        const velocity = (finalX - initialX) / diferentialTime
        let adjustedVelocity = velocity * 200

        if (adjustedVelocity + carouselX > 0) {
          adjustedVelocity = -carouselX
        } else if (adjustedVelocity + carouselX - boxWidth < -carouselWidth) {
          adjustedVelocity = -(carouselWidth + carouselX - boxWidth)
        }

        gsap.to('#carousel', {
          x: `+=${adjustedVelocity}`,
          ease: 'power3.out',
          duration: 0.5,
          onComplete: getNextPosition
        })
      }

      Draggable.create('#carousel', {
        type: 'x',
        edgeResistance: slidesToShow === BOXES.length ? 1 : 0.9,
        dragResistance: 0.5,
        bounds: carouselContainerRef.current,
        onDragStart: handleDragStart,
        onDragEnd: handleDragEnd
      })
    },
    { scope: carouselContainerRef, dependencies: [slidesToShow] }
  )

  return (
    <DraggableCarouselContainer ref={carouselContainerRef}>
      <Cover className='cover' />
      <input
        type='range'
        min='1'
        max={BOXES.length}
        value={slidesToShow}
        onChange={(e) => setSlidesToShow(Number(e.target.value))}
      />
      <label>{slidesToShow}</label>
      <Carousel id='carousel'>
        {BOXES.map((box) => (
          <Box key={box} className='box'>
            {box}
          </Box>
        ))}
      </Carousel>
      <Cover className='cover' />
    </DraggableCarouselContainer>
  )
}

export default DraggableCarousel

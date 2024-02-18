import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

import { AutoCarouselContainer, Slide, Slider } from './AutoCarouselStyled'

interface SlideInterface {
  name: string
  color: string
}

const SLIDES: SlideInterface[] = [
  { name: '1', color: 'lightgoldenrodyellow' },
  { name: '2', color: 'lightblue' },
  { name: '3', color: 'lightgreen' },
  { name: '4', color: 'lightcoral' },
  { name: '5', color: 'lightcyan' }
]

const GROUPS = [1, 2]

interface AutoCarouselProps {
  direction?: 'left' | 'right'
}

const AutoCarousel: React.FC<AutoCarouselProps> = ({ direction = 'right' }) => {
  const carouselRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const slideWidth = gsap.getProperty('.slide', 'width') as number
      const sliderWidth = slideWidth * SLIDES.length

      gsap.set(carouselRef.current, {
        width: sliderWidth,
        justifyContent: direction === 'right' ? 'flex-end' : 'flex-start'
      })

      gsap.to('#slider', {
        x: 100 * SLIDES.length * (direction === 'right' ? 1 : -1),
        duration: 5,
        ease: 'linear',
        repeat: -1
      })
    },
    { scope: carouselRef }
  )

  return (
    <AutoCarouselContainer ref={carouselRef}>
      <Slider id='slider'>
        {GROUPS.map((group) =>
          SLIDES.map((el) => (
            <Slide key={el.name + group} $color={el.color} className='slide'>
              {el.name}
            </Slide>
          ))
        )}
      </Slider>
    </AutoCarouselContainer>
  )
}

export default AutoCarousel

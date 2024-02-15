import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Draggable from 'gsap/Draggable'

interface useCarouselInterface {
  containerRef: React.RefObject<HTMLDivElement>
  visibleSlides?: number
}

const useCarousel = ({
  containerRef,
  visibleSlides = 1
}: useCarouselInterface) => {
  useGSAP(
    () => {
      gsap.registerPlugin(Draggable)

      const carouselWidth = gsap.getProperty('#carousel', 'width') as number
      const boxes = gsap.utils.toArray<HTMLDivElement>('.box')
      const boxWidth = gsap.getProperty('.box', 'width') as number
      const coverWidth = carouselWidth - boxWidth * visibleSlides

      gsap.set('.cover', { width: coverWidth })

      gsap.set(containerRef.current, {
        width: carouselWidth * 2 - boxWidth * visibleSlides
      })

      const moveToNearSlide = () => {
        const carouselX = Math.abs(gsap.getProperty('#carousel', 'x') as number)
        const nextBox = Math.round(carouselX / boxWidth)

        gsap.to('#carousel', {
          x: nextBox * -boxWidth,
          ease: 'none',
          duration: 0.2
        })
      }

      Draggable.create('#carousel', {
        type: 'x',
        edgeResistance: visibleSlides === boxes.length ? 1 : 0.9,
        dragResistance: 0.5,
        bounds: containerRef.current,
        onDragEnd: moveToNearSlide
      })
    },
    { scope: containerRef, dependencies: [visibleSlides] }
  )
}

export default useCarousel

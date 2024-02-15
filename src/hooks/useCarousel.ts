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
  const { contextSafe } = useGSAP(
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

      const dotsTl = gsap.timeline({ id: 'dotsTl', paused: true })
      dotsTl.set('.dot', { backgroundColor: 'lightgray' })

      dotsTl.to(
        '.dot',
        {
          stagger: { each: 1, yoyo: true, repeat: 1, repeatDelay: 0.5 },
          backgroundColor: 'black'
        },
        0.5
      )

      const carouselX = gsap.getProperty('#carousel', 'x') as number
      const nextBox = carouselX / boxWidth
      gsap.set(dotsTl, { time: Math.abs(nextBox) + 1 })

      const handleDot = () => {
        const carouselX = gsap.getProperty('#carousel', 'x') as number
        const nextBox = carouselX / boxWidth
        gsap.set(dotsTl, { time: Math.abs(nextBox) + 1 })
      }

      const moveToNearSlide = () => {
        const carouselX = Math.abs(gsap.getProperty('#carousel', 'x') as number)
        const nextBox = Math.round(carouselX / boxWidth)

        gsap.to('#carousel', {
          x: nextBox * -boxWidth,
          ease: 'none',
          duration: 0.4,
          onUpdate: handleDot
        })
      }

      Draggable.create('#carousel', {
        type: 'x',
        edgeResistance: visibleSlides === boxes.length ? 1 : 0.9,
        dragResistance: 0.5,
        bounds: containerRef.current,
        onDrag: handleDot,
        onDragEnd: moveToNearSlide
      })
    },
    { scope: containerRef, dependencies: [visibleSlides] }
  )

  const handleClickDot = contextSafe((index: number) => {
    const boxWidth = gsap.getProperty('.box', 'width') as number
    const dotsTl = gsap.getById('dotsTl')
    gsap.set(dotsTl, { time: index + 1 })
    gsap.to('#carousel', { x: boxWidth * -index })
  })

  return { handleClickDot }
}

export default useCarousel

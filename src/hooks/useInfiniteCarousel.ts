import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useState } from 'react'

interface InfiniteCarouselInterface<T, J extends gsap.TweenTarget> {
  items: T[]
  ref: React.RefObject<J>
  visibleSlides?: number
  sliderId?: string
  slideClassName?: string
}

const useInfiniteCarousel = <T, J extends gsap.TweenTarget>({
  items,
  ref,
  visibleSlides = items.length,
  sliderId = 'slider',
  slideClassName = 'slide'
}: InfiniteCarouselInterface<T, J>) => {
  const [slides, setSlides] = useState([
    items[items.length - 1],
    ...items,
    items[0]
  ])

  const { contextSafe } = useGSAP(
    () => {
      const slides = gsap.utils.toArray<HTMLDivElement>(`.${slideClassName}`)
      const slideWidth = gsap.getProperty(slides[0], 'width') as number
      const sliderWidth = slideWidth * visibleSlides

      gsap.set(ref.current, { width: sliderWidth })
      gsap.set(`#${sliderId}`, { x: -slideWidth })
    },
    { scope: ref, dependencies: [visibleSlides] }
  )

  const prev = contextSafe(() => {
    const slideWidth = gsap.getProperty(`.${slideClassName}`, 'width') as number

    gsap.set(`#${sliderId}`, { x: `-=${slideWidth}` })

    gsap.fromTo(
      `#${sliderId}`,
      { x: -2 * slideWidth },
      { x: `+=${slideWidth}`, duration: 0.25 }
    )

    setSlides((prevSlides) => {
      const newSlides = [...prevSlides]
      newSlides.pop()
      newSlides.unshift(prevSlides[slides.length - 3])
      return newSlides
    })
  })

  const next = contextSafe(() => {
    const slideWidth = gsap.getProperty(`.${slideClassName}`, 'width') as number

    gsap.set(`#${sliderId}`, { x: `+=${slideWidth}` })

    gsap.fromTo(
      `#${sliderId}`,
      { x: 0 },
      { x: `-=${slideWidth}`, duration: 0.25 }
    )

    setSlides((prevSlides) => {
      const newSlides = [...prevSlides]
      newSlides.shift()
      newSlides.push(prevSlides[2])
      return newSlides
    })
  })

  return { slides, prev, next }
}

export default useInfiniteCarousel

import { Carousel, CarouselParticular } from '../../components'
import { CarouselItemInterface } from '../../components/CarouselParticular/CarouselParticular'
import CarouselParticular2 from '../../components/CarouselParticular2/CarouselParticular2'
import { Item, SimpleCarouselContainer } from '../LayoutStyled'

const CAROUSEL_ITEMS: CarouselItemInterface[] = [
  { id: 1, src: '/cat200.jpg', alt: 'cat200' },
  { id: 2, src: '/cat201.jpg', alt: 'cat201' },
  { id: 3, src: '/cat401.jpg', alt: 'cat401' },
  { id: 4, src: '/cat404.jpg', alt: 'cat404' },
  { id: 5, src: '/cat500.jpg', alt: 'cat500' },
  { id: 6, src: '/cat599.jpg', alt: 'cat599' }
]

const CAROUSEL_ITEMS_2: CarouselItemInterface[] = [
  { id: 1, src: '/cat200.jpg', alt: 'cat200' },
  { id: 2, src: '/cat201.jpg', alt: 'cat201' },
  { id: 3, src: '/cat401.jpg', alt: 'cat401' },
  { id: 4, src: '/cat404.jpg', alt: 'cat404' },
  { id: 5, src: '/cat500.jpg', alt: 'cat500' }
]

const SimpleCarousels: React.FC = () => {
  return (
    <SimpleCarouselContainer>
      <Carousel>
        {CAROUSEL_ITEMS.map((item) => (
          <Item key={item.id} src={item.src} alt={item.alt} />
        ))}
      </Carousel>
      <Carousel showAllSlides>
        {CAROUSEL_ITEMS.map((item) => (
          <Item key={item.id} src={item.src} alt={item.alt} />
        ))}
      </Carousel>
      <CarouselParticular items={CAROUSEL_ITEMS} />
      <CarouselParticular2 items={CAROUSEL_ITEMS_2} />
    </SimpleCarouselContainer>
  )
}

export default SimpleCarousels

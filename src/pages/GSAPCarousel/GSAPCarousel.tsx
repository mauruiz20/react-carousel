import AutoCarousel from '../../components/AutoCarousel/AutoCarousel'
import DraggableCarousel from '../../components/DraggableCarousel/DraggableCarousel'
import InfiniteCarousel from '../../components/InfiniteCarousel/InfiniteCarousel'

const GSAPCarousel: React.FC = () => {
  return (
    <>
      <AutoCarousel direction='right' />
      <AutoCarousel direction='left' />
      <InfiniteCarousel />
      <DraggableCarousel />
    </>
  )
}

export default GSAPCarousel

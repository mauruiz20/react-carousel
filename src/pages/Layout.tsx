import GSAPCarousel from './GSAPCarousel/GSAPCarousel'
import { Container, Title } from './LayoutStyled'
import ReactCarousels from './ReactCarousel/ReactCarousels'

const Layout: React.FC = () => {
  return (
    <Container>
      <Title>Carousels</Title>
      <GSAPCarousel />
      <ReactCarousels />
    </Container>
  )
}

export default Layout

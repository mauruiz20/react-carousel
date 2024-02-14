import { Container, Title } from './LayoutStyled'
import SimpleCarousels from './ReactCarousel/ReactCarousels'

const Layout: React.FC = () => {
  return (
    <Container>
      <Title>Carousels</Title>
      <SimpleCarousels />
    </Container>
  )
}

export default Layout

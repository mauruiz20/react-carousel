import { Container, Title } from './LayoutStyled'
import SimpleCarousels from './SimpleCarousels/SimpleCarousels'

const Layout: React.FC = () => {
  return (
    <Container>
      <Title>React Carousel</Title>
      <SimpleCarousels />
    </Container>
  )
}

export default Layout

import styled from 'styled-components'

interface CarouselProps {
  $overflow: boolean
}

interface SlideProps {
  $color: string
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
`

export const InfiniteCarouselContainer = styled.div<CarouselProps>`
  display: flex;
  position: relative;
  padding: 40px 0;
  background-color: white;
  overflow: ${(props) => (props.$overflow ? 'hidden' : 'visible')};
`

export const Slider = styled.div`
  display: flex;
`

export const Slide = styled.div<SlideProps>`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  background-color: ${(props) => props.$color};
`

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`

export const Button = styled.button`
  background-color: orange;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 16px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
    'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
`

export const RangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

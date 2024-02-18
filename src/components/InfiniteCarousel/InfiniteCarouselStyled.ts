import styled from 'styled-components'

interface SlideProps {
  $color: string
}

export const InfiniteCarouselContainer = styled.div`
  display: flex;
  position: relative;
  padding: 40px 0;
  padding-bottom: 100px;
  background-color: white;
  margin-bottom: 50px;
  justify-content: center;
  overflow: hidden;
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
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translate(-50%);
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

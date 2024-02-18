import styled from 'styled-components'

interface SlideInterface {
  $color: string
}

export const AutoCarouselContainer = styled.div`
  display: flex;
  background-color: white;
  overflow: hidden;
`

export const Slider = styled.div`
  display: flex;
`

export const Slide = styled.div<SlideInterface>`
  width: 100px;
  height: 100px;
  background-color: ${({ $color }) => $color};
  display: flex;
  justify-content: center;
  align-items: center;
`

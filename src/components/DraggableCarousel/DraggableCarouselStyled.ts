import styled from 'styled-components'

export const DraggableCarouselContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  background-color: white;
  height: 400px;
  overflow: hidden;
  border-radius: 10px;

  &::before {
    content: '';
    width: 1px;
    height: 100%;
    position: absolute;
    background-color: black;
    left: 50%;
    transform: translateX(-50%);
  }
`

export const Carousel = styled.div`
  display: flex;
  align-items: center;
  cursor: grab;
`

export const Box = styled.div`
  box-sizing: border-box;
  width: 150px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
`

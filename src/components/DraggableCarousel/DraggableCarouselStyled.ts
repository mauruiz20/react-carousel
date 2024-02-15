import styled from 'styled-components'

export const DraggableCarouselContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: white;
  height: 400px;
  overflow: hidden;
  border-radius: 10px;

  &::before {
    content: '';
    width: 1px;
    height: 65%;
    position: absolute;
    background-color: black;
    left: 50%;
    transform: translateX(-50%);
  }

  & input {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
  }

  & label {
    position: absolute;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
  }

  & .cover:last-child {
    right: 0;
    left: unset;
  }
`

export const Cover = styled.div`
  position: absolute;
  height: 100%;
  background-color: blue;
  opacity: 0.1;
  left: 0;
`

export const Carousel = styled.div`
  display: flex;
  align-items: center;
  cursor: grab;
`

export const Box = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 150px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;

  &::before {
    content: '';
    width: 1px;
    height: 30%;
    position: absolute;
    background-color: blue;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`

export const DotContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
`

export const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: lightgray;
`

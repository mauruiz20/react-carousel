import styled from 'styled-components'

export const Container = styled.main`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('/background.png');
  background-size: 1920px 1280px;
  background-repeat: repeat;
  background-position: left top;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
    'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-size: 24px;
  padding: 100px 0;
  gap: 50px;
  overflow: hidden;
`

export const SimpleCarouselContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
`

export const Title = styled.h1`
  font-size: 42px;
  font-weight: bold;
`

export const Item = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

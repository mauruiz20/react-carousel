import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const LeftButton = styled.button`
  width: 0;
  height: 0;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-right: 20px solid black;

  &:hover {
    border-right-color: blue;
  }
`;

export const RightButton = styled(LeftButton)`
  transform: rotate(180deg);
`;

export const SliderContainer = styled.div`
  width: 800px;
  height: 600px;
  overflow: hidden;
`;

export interface SliderInterface {
  $translateX: number;
}

export const Slider = styled.div<SliderInterface>`
  display: flex;
  height: 100%;
  transition: transform 0.4s;
  transform: translateX(-${({ $translateX }) => $translateX * 100}%);
`;

export const Slide = styled.img`
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Tag = styled.h3`
  font-size: 24px;
  text-transform: uppercase;
`;

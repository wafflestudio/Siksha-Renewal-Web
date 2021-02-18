import styled from 'styled-components'
import DateContainer from '../container/DateContainer'
import LogoContainer from './LogoContainer'
import MealContainer from '../container/MealContainer'

const FixedHeaderBlock = styled.div`
  @font-face {
    font-family: 'NanumSquare';
    src: url('/font/NanumSquareB.eot');
    src: url('/font/NanumSquareB.woff') format('woff'),
        url('/font/NanumSquareB.ttf') format("truetype");

    font-weight: bold;
  }

  @font-face {
    font-family: 'NanumSquare';
    src: url('/font/NanumSquareR.eot');
    src: url('/font/NanumSquareR.woff') format('woff'),
        url('/font/NanumSquareR.ttf') format("truetype");
    font-weight: normal;
  }

  @font-face {
    font-family: 'NanumSquare';
    src: url('/font/NanumSquareL.eot');
    src: url('/font/NanumSquareL.woff') format('woff'),
        url('/font/NanumSquareL.ttf') format("truetype");
    font-weight: 100;
  }

  height: 130px;
  width: 100vw;
  max-width: 100%;
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  z-index: 2;

  @media (max-width: 768px) {
    top: 100px;
    height: 103px;
  }
`

const TimeCard = styled.div`
  width: 55vw;
  max-width: 800px;

  z-index: 2;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const GradientHeader = styled.div`
  height: 80px;
  width: 100%;
  background: linear-gradient(to right, #fd7878 0%,#fe8662 65%,#ff9a44 100%);
  position: absolute;
  z-index: -1;
  left: 0;

  @media (max-width: 768px) {
    display: none;
  }
`

const GrayHeader = styled.div`
  height: 50px;
  width: 100%;
  background: #f8f8f8;
  position: absolute;
  top: 80px;
  z-index: -2;
  left: 0;

  @media (max-width: 768px) {
    top: 55px;
  }
`

const FixedHeader = () => {
  return (
    <FixedHeaderBlock>
      <LogoContainer />
      <TimeCard>
        <DateContainer />
        <MealContainer />
      </TimeCard>
      <GradientHeader />
      <GrayHeader />
    </FixedHeaderBlock>
  );
};

export default FixedHeader;
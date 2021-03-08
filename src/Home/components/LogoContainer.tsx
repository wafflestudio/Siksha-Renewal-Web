import styled, { css } from 'styled-components'
import logo from '../../asset/img/logo.png'

const LogoContainerBlock = styled.div`
  height: 150px;
  width: 280px;
  min-width: 150px;

  @media (max-width: 768px) {
    display: none;
  }
`

const RealLogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 80px;
  width: 100%;

  text-align: left !important;
`

const Logo = styled.img`
  object-fit: contain;
  height: 50px;
  width: 50px;
  
  margin: 0 20px;
  filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.05));
`

const TitleContainer = styled.div`
  
`

const SikshaTitle = styled.p<{ isTitle: boolean }>`
  margin: 0;
  font-family: 'NanumSquare';
  color: white;

  font-size: ${props => props.isTitle ? '17pt' : '10pt'};
  ${props => props.isTitle &&
    css`
      font-weight: bold;
      margin-bottom: 3px;
    `
  }
`

const LogoContainer = () => {
  return (
    <LogoContainerBlock>
      <RealLogoContainer>
        <Logo src={logo} alt="siksha-logo" />
        <TitleContainer>
          <SikshaTitle isTitle={true}>식 샤</SikshaTitle>
          <SikshaTitle isTitle={false}>서울대학교 식단 알리미</SikshaTitle>
        </TitleContainer>
      </RealLogoContainer>
    </LogoContainerBlock>
  );
};

export default LogoContainer
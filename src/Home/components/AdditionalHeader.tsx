import styled from 'styled-components'
import logo from '../../asset/img/logo.png'

const AdditionalHeaderBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 100%;
  z-index: 3;
  background: linear-gradient(to right, #fd7878 0%, #fe8662 65%, #ff9a44 100%);

  @media (max-width: 768px) {
    height: 85px;
    position: sticky;
    position: -webkit-sticky;
    top: 0;
  }
`

const Logo = styled.img`
  width: 45px;
  height: 45px;
  display: none;

  @media (max-width: 768px) {
    display: block;
    object-fit: contain;
    margin-top: 10px;
    filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.05));
  }
`

const AdditionalHeader = () => {
  return (
    <AdditionalHeaderBlock>
      <Logo src={logo} alt="siksha-logo" />
    </AdditionalHeaderBlock>
  )
}

export default AdditionalHeader
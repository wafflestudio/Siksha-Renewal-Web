import styled from 'styled-components'
import Image from 'next/image'

const AdditionalHeaderBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 100%;
  z-index: 3;
  background: linear-gradient(to right, #fd7878 0%, #fe8662 65%, #ff9a44 100%);

  @media (max-width: 768px) {
    position: sticky;
    position: -webkit-sticky;
    top: 0;
  }
`;

const ImagePanel = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    object-fit: contain;
    margin-top: 10px;
    filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.05));
  }
`;

const AdditionalHeader = () => {
  return (
    <AdditionalHeaderBlock>
      <ImagePanel>
        <Image src="/img/logo.png" alt="siksha-logo" width='45px' height='45px' />
      </ImagePanel>
    </AdditionalHeaderBlock>
  );
};

export default AdditionalHeader;
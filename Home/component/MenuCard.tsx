import styled from 'styled-components'
import ModalContainer from './ModalContainer'
import { Menu, Restaurant } from '../../interfaces'
import { useState } from 'react'
import { MdInfoOutline, MdLocationOn } from 'react-icons/md'
import { AiFillClockCircle } from 'react-icons/ai'

const MenuCardBlock = styled.div`
  @font-face {
    font-family: 'Lato';
    src: url('/font/Lato-Regular.ttf') format("truetype");
  }

  @font-face {
    font-family: 'NanumBarunGothic';
    font-style: normal;
    font-weight: 300;
    src: url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebLight.eot');
    src: url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebLight.eot?#iefix') format('embedded-opentype'), url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebLight.woff') format('woff'), url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebLight.ttf') format('truetype');
  }

  display: flex;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  flex-direction: column;
  align-items: flex-start;
  margin: 5px 25px 10px 25px;
  background: white;
  padding: 5px 20px;
  border-radius: 10px;

  p {
    text-align: left;
    font-size: 11.5pt;
    font-family: 'NanumBarunGothic', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`

const RestaurantNameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const RestaurantName = styled.h4`
  margin: 10px 0;
  color: #6c6b70;
  font-family: 'NanumSquare';
  font-weight: bold;
`

const InformationButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    background: none;
    padding: 0px;
    border: none;

    &:focus {
      outline: none;
    }
  }   
`

const InfoIcon = styled(MdInfoOutline)`
  font-size: 18pt;
  color: #FF9A44;
  padding-top: 3px;
`

const UnderLine = styled.div`
  width: 100%;
  height: 2px;
  background-color: #ff9a44;
`

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 30px 0;

  @media (max-width: 768px) {
    margin: 15px 0 12px 0;
  }
`

const RestaurantInfoContainer = styled.div`
  width: 50%;
  border-right: #d6d6d6 0.5px solid;
  padding: 0 20px;
  margin-top: -1.5px;

  @media (max-width: 768px) {
    display: none; 
  }
`

export const IconTextContainer = styled.div`
  display: flex;
  margin: 5px 0px 10px 0;
  padding: 0;
  
  & ~ & {
    margin: 10px 0px;
  }
`

export const LocationIcon = styled(MdLocationOn)`
  color: #fe8b5a;
  font-size: 21pt;
  margin-left: -3px;
`

const Location = styled.p`
  margin: 0 0 0 10px;
  display: flex;
  flex: 1;
  padding-top: 4px;
  line-height: 25px;
`

export const ClockIcon = styled(AiFillClockCircle)`
  color: #fe8b5a;
  font-size: 19pt;
  margin-left: -2px;
  margin-top: 1px;
`

const OperatingHours = styled.p`
  display: flex;
  flex: 1;
  white-space: pre-line;
  text-align: left;
  line-height: 25px;
  margin: 0 0 0 12px;
  padding-top: 3px;
`

const MenusContainer = styled.div`
  padding: 0 20px;
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 5px;
  }
`

const MenuInfoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  & ~ & {
    margin-top: 10px;
  }
`

const PriceContainer = styled.div`
  background-color: #fe8b5a;
  padding: 0 11px;
  height: 25px;
  display: flex;
  border-radius: 13px;
  margin-right: 11px;
  align-items: center;
`

const Price = styled.p<{ isNumber: boolean }>`
  color: white;
  white-space: nowrap;
  font-family: ${props => props.isNumber ? 'Lato' : 'NanumSquare'} !important;
  font-size: ${props => props.isNumber ? '11.5pt' : '10.5pt'} !important;
  font-weight: ${props => props.isNumber ? 'normal' : '600'} !important;
`

const MenuName = styled.p`
  word-break: break-all;
  white-space: pre-line;
  margin: 3.5px 0 0 0;
  line-height: 1.3;
`

interface MenuCardProps {
  restaurant: Restaurant;
}

const MenuCard: React.FC<MenuCardProps> = ({ restaurant }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <MenuCardBlock className={'a'+restaurant.code}>
      <RestaurantNameContainer>
        <RestaurantName>{restaurant.name_kr}</RestaurantName>
        <InformationButton onClick={() => setIsModalOpen(true)}>
          <InfoIcon />
        </InformationButton>
        {isModalOpen && <ModalContainer restaurant={restaurant} setIsModalOpen={setIsModalOpen} />}
      </RestaurantNameContainer>
      <UnderLine />
      <ContentContainer>
        <RestaurantInfoContainer>
          <IconTextContainer>
            <LocationIcon />
            <Location>
              {restaurant.addr || '위치 정보 없음'}
            </Location>
          </IconTextContainer>
          <IconTextContainer>
            <ClockIcon />
            <OperatingHours>
              9:00 ~ 11:00 <br />
              12:00 ~ 14:00 <br />
              17:00 ~ 19:00
            </OperatingHours>
          </IconTextContainer>
        </RestaurantInfoContainer>
        <MenusContainer>
          {restaurant.menus.map((menu: Menu) => (
            <MenuInfoContainer key={menu.id}>
              <PriceContainer>
                {menu.price ? <Price isNumber={true}>{menu.price}</Price> : <Price isNumber={false}>가격정보없음</Price>}
              </PriceContainer>
              <MenuName>{menu.name_kr}</MenuName>
            </MenuInfoContainer>
          ))}
        </MenusContainer>
      </ContentContainer>
    </MenuCardBlock>
  );
};

export default MenuCard;
import styled from 'styled-components'
import classNames from 'classnames'
import ModalContainer from './ModalContainer'
import { Menu, Restaurant } from '../../interfaces'
import { useState } from 'react'
import styles from '../../public/css/my-icons/my-icons.module.css'

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
    display: block !important;
    border: none;
    background: none;
    padding: 0px;

    &:focus {
      outline: none;
    }
  }   
`

const InfoIcon = styled.i`
  @media (max-width: 768px) {
    font-size: 15pt;
    color: #FF9A44;
  }
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
  margin: 10px 0px;
`

export const LocationIcon = styled.i`
  color: #fe8b5a;
  font-size: 17pt;
  padding: 0 3.5px;
  margin-top: 1px;
`

const Location = styled.p`
  margin: 0 15px;
  line-height: 25px;
`

export const ClockIcon = styled.i`
  color: #fe8b5a;
  font-size: 17pt;
  margin-top: 1px;
`

const OperatingHours = styled.p`
  white-space: pre-line;
  text-align: left;
  line-height: 25px;
  margin: 0 15px;
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

const Price = styled.p`
  color: white;
  font-family: 'Lato' !important;
`

const MenuName = styled.p`
  word-break: break-all;
  white-space: pre-line;
  margin: 3px 0 0 0;
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
          <InfoIcon className={classNames(styles['my-icon'], styles['my-icon-info-icon'])} />
        </InformationButton>
        {isModalOpen && <ModalContainer restaurant={restaurant} setIsModalOpen={setIsModalOpen} />}
      </RestaurantNameContainer>
      <UnderLine />
      <ContentContainer>
        <RestaurantInfoContainer>
          <IconTextContainer>
            <LocationIcon className={classNames(styles['my-icon'], styles['my-icon-location_full'])} />
            <Location>{restaurant.addr}</Location>
          </IconTextContainer>
          <IconTextContainer>
            <ClockIcon className={classNames(styles['my-icon'], styles['my-icon-clock_full'])} />
            <OperatingHours>
              나중에
            </OperatingHours>
          </IconTextContainer>
        </RestaurantInfoContainer>
        <MenusContainer>
          {restaurant.menus.map((menu: Menu) => (
            <MenuInfoContainer key={menu.id}>
              <PriceContainer>
                <Price>{menu.price}</Price>
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
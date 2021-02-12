import styled, { css } from 'styled-components'
import Image from 'next/image'
import { useStateContext } from '../../utils/hooks/ContextProvider'
import { menuData } from '../../utils/menuData'
import { useState } from 'react'
import { restaurant } from '../../interfaces'

const SidebarContainerBlock = styled.div`
  min-height: 300px;
  width: 280px;
  min-width: 280px;
  display: inline-block;
  position: sticky;
  position: -webkit-sticky;
  top: 155px;

  p {
    margin: 0;
  }

  @media (max-width: 768px) {
    display: none;
  }
`

const Sidebar = styled.div`
  width: inherit;
  z-index: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const SidebarButton = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  font-family: 'NanumSquare';
  padding: 10px 15px;
  color: #6c6b70;
  width: 80%;
  display: flex;
  text-align: left;
  font-weight: 500;
  display: flex;
  align-items: center;
  margin: 0 20px;

  &:hover {
    color: #ff9a44;
  }

  &:focus {
    color: #ff9a44;
    font-weight: bold;
    outline: none;
    background: white;
    box-shadow: 1px 1px 17px rgba(0,0,0,0.06);
  }
`

const Bullet = styled.div<{ focused: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  margin-right: 20px;
  ${props => props.focused && css`background: #ff9a44;`}
`

const Popper = styled.div`
  position: absolute;
  top: 380px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const ImagePanel = styled.div<{ clicked: boolean }>`
  width: 280px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  opacity: ${props => props.clicked ? '1' : '0.7'};
`

const ContactWaffle = styled.div`
  margin-left: 45px;
  background: white;
  white-space: pre-line;
  text-align: left;
  padding: 15px 15px;
  color: #6C6B70;
  box-shadow: 1px 1px 17px rgba(0,0,0,0.06);
  font: 'NanumSquare';
`

const WaffleStudio = styled.div`
  display: flex;
  padding-bottom: 3px;
`

const TextContainer = styled.p`
  font-size: 10pt;
  padding-right: 4pt;
`

const LinkContainer = styled.a`
  font-size: 9pt;
  color: #ff9a44;
`

const People = styled.p`
  font-size: 7pt;
`

function scrollRestaurant(restaurant: string) {
  let element = document.querySelector('.a'+restaurant)
  if(!element) {
    throw new Error('Cannot find element')
  }

  let headerOffset = 150
  let elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  let offsetPosition = elementPosition - headerOffset;
  if((navigator.userAgent.includes('Chrome') || navigator.userAgent.includes('Firefox')) && !navigator.userAgent.includes('Edge')) {
    window.scrollTo({
      top: offsetPosition ? offsetPosition : elementPosition,
      behavior: 'smooth'
    });
  }
  else {
    window.scrollTo(0, offsetPosition)
  }
}

const SidebarContainer = () => {
  const state = useStateContext();
  const { date, meal } = state;

  const [focusedRestaurant, setFocusedRestaurant] = useState<string>('')
  const [isContactBoxClosed, setContactBoxState] = useState<boolean>(true)

  const dateIndex = menuData.findIndex(day => day.date === date)

  return (
    <SidebarContainerBlock>
      <Sidebar>
        {(menuData[dateIndex] && menuData[dateIndex][meal]) && menuData[dateIndex][meal].map((restaurant: restaurant) => (
          <SidebarButton
            tabIndex={1}
            onClick={() => scrollRestaurant(restaurant.name_en.replace(/\s/g, ''))}
            onFocus={() => setFocusedRestaurant(restaurant.name_en)}
            onBlur={() => setFocusedRestaurant('')}
            key={restaurant.name_en}
          >
            <Bullet focused={restaurant.name_en === focusedRestaurant} />
            {restaurant.name_kr}
          </SidebarButton>
        ))}
      </Sidebar>
      <Popper>
        <ImagePanel clicked={!isContactBoxClosed} onClick={() => setContactBoxState(!isContactBoxClosed)}>
          <Image src="/img/waffle-logo.png" alt="waffle-logo" width='225' height='80' />
        </ImagePanel>
        {!isContactBoxClosed && (<ContactWaffle>
          <WaffleStudio>
            <TextContainer>와플스튜디오</TextContainer>
            <LinkContainer href="https://wafflestudio.com">wafflestudio.com</LinkContainer>
          </WaffleStudio>
          <People>
            조규상 박지유 박석현 박주현 조일현 <br />
            김도현 김상민 박종석 임유진 이유빈 신현지
          </People>
        </ContactWaffle>)}
      </Popper>
    </SidebarContainerBlock>
  );
};

export default SidebarContainer;
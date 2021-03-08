import styled, { css } from 'styled-components'
import { useStateContext } from '../../utils/ContextProvider'
import { useMemo, useState } from 'react'
import { Day, Restaurant } from '../../interfaces'
import logo from '../../asset/img/waffle-logo.png'

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

  animation: slidein .75s;
  -moz-animation: slidein .75s; /* Firefox */
  -webkit-animation: slidein .75s; /* Safari and Chrome */
  -o-animation: slidein .75s; /* Opera */

  @keyframes slidein {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @-moz-keyframes slidein { /* Firefox */
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @-webkit-keyframes slidein { /* Safari and Chrome */
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @-o-keyframes slidein { /* Opera */
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
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
  display: none;
`

const WaffleLogo = styled.img<{ clicked: boolean }>`
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
  let element = document.querySelector(".a"+restaurant)
  if(!element) {
    throw new Error('Cannot find element')
  }
  element.scrollIntoView({ behavior: "smooth", block: "center" })
}

const SidebarContainer: React.FC = () => {
  const state = useStateContext();
  const { date, meal, data } = state

  const menus: Day[] = useMemo(() => data ? data.result : [], [data])

  const [focusedRestaurant, setFocusedRestaurant] = useState<number>(-1)
  const [isContactBoxClosed] = useState<boolean>(true)

  const dateIndex = useMemo(() => menus.findIndex(day => new Date(day.date).toDateString() === date.toDateString()), [menus, date])

  return (
    <SidebarContainerBlock key={date+meal}>
      <Sidebar>
        {(menus[dateIndex] && menus[dateIndex][meal]) && menus[dateIndex][meal].map((restaurant: Restaurant, index) => (
          <SidebarButton
            tabIndex={1}
            onClick={() => scrollRestaurant(restaurant.code)}
            onFocus={() => setFocusedRestaurant(restaurant.id)}
            onBlur={() => setFocusedRestaurant(-1)}
            key={index}
          >
            <Bullet focused={restaurant.id === focusedRestaurant} />
            {restaurant.name_kr}
          </SidebarButton>
        ))}
      </Sidebar>
      <Popper>
        <WaffleLogo src={logo} alt="waffle-logo" clicked={isContactBoxClosed} />
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
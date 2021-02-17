import styled from 'styled-components'
import Image from 'next/image'
import MenuCard from './MenuCard'
import { Data, Restaurant } from '../../interfaces'
import { useStateContext } from '../../utils/hooks/ContextProvider'
import { useMemo } from 'react'

const MainContainerBlock = styled.div`
  display: inline-block;
  padding-bottom: 10px;
`

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60vw;

  color: #2c3e50;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  @media (max-width: 768px) {
    width: 100vw;
  }
`

const MenuCardContainer = styled.div`
  width: 100%;
  max-width: 800px;

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
`

const ImagePanel = styled.div`
  display: none;

  animation: logoSlidein .75s;
  -moz-animation: logoSlidein .75s; /* Firefox */
  -webkit-animation: logoSlidein .75s; /* Safari and Chrome */
  -o-animation: logoSlidein .75s; /* Opera */

  @keyframes logoSlidein {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 0.8;
      transform: translateY(0);
    }
  }
  @-moz-keyframes logoSlidein { /* Firefox */
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 0.8;
      transform: translateY(0);
    }
  }
  @-webkit-keyframes logoSlidein { /* Safari and Chrome */
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 0.8;
      transform: translateY(0);
    }
  }
  @-o-keyframes logoSlidein { /* Opera */
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 0.8;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    display: inline-block;
    opacity: 0.8;
    margin: 20px 0px;
    width: 60%;
  }
`

type Props = {
  data: Data
}

const MainContainer: React.FC<Props> = ({ data }) => {
  const state = useStateContext()
  const { date, meal } = state
  const menuData = data.result

  const dateIndex = useMemo(() => menuData.findIndex(day => new Date(day.date).toDateString() === date.toDateString()), [menuData, date])

  return (
    <MainContainerBlock>
      <MenuContainer>
        {(menuData[dateIndex] && menuData[dateIndex][meal]) && menuData[dateIndex][meal].map((restaurant: Restaurant) => (
          <MenuCardContainer key={restaurant.id+meal+date}>
            <MenuCard restaurant={restaurant} />
          </MenuCardContainer>
        ))}
      </MenuContainer>
      <ImagePanel key={date+meal}>
        <Image 
          src="/img/waffle-logo.png" 
          alt="waffle-logo" 
          width='329'
          height='117'
        />
      </ImagePanel>
    </MainContainerBlock>
  );
};

export default MainContainer;
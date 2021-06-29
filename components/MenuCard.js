import styled from "styled-components";
import RestaurantTime from "./RestaurantTime";
import Menu from "./Menu";
import {useDispatchContext} from "../utils/hooks/ContextProvider";

const RestInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 23px;
  width: 100%;

  @media (max-width: 768px) {
    padding-top: 17px;
  }
`

const DesktopContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border: solid 1px #E8E8E8;
  box-sizing: border-box;
  border-radius: 8px;
  width: 100%;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    display: none;
  }
`

const MobileContainer = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    background: white;
    border: solid 1px #E8E8E8;
    box-sizing: border-box;
    border-radius: 8px;
    width: calc(100% - 16px);
    margin-bottom: 16px;
  }
`

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`

const InfoIcon = styled.img`
  width: 16px;
  height: 16px;
  padding-left: 8px;
`

const Price = styled.div`
  font-size: 12px;
  line-height: 14px;
  font-weight: 100;
  color: #FE8B5A;
  padding-right: 24px;
`

const Rate = styled.div`
  font-size: 12px;
  line-height: 14px;
  font-weight: 100;
  color: #FE8B5A;
  padding-right: 22.5px;
`

const Name = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 27px;
  color: #242424;
  white-space: nowrap;
  padding-left: 35px;

  @media (max-width: 768px) {
    font-size: 15px;
    line-height: 17px;
    color: #E15618;
    padding-left: 16px;
  }
`

const Location = styled.div`
  display: flex;
  padding-top: 3px;
  padding-right: 35px;
`

const LocationIcon = styled.img`
  width: 14.4px;
  height: 20.21px;
`

const LocationText = styled.div`
  font-family: NanumSquare;
  font-weight: 100;
  font-size: 15px;
  line-height: 17px;
  padding-top: 1px;
  padding-left: 10px;
`

const HLine = styled.div`
  width: calc(100% - 70px);
  height: 2px;
  background: #FE8C59;
  margin: 10px auto 10px auto;
  
  @media (max-width: 768px) {
    width: calc(100% - 32px);
    height: 1px;
    margin: 8.5px auto 8.5px auto;
  }
`

const MenuInfo = styled.div`
  display: flex;
  padding-bottom: 12px;
`

const VLine = styled.div`
  width: 1px;
  background: #DCDCDC;
  margin-left: 17px;
  margin-right: 26px;
`

const Menus = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 3px 38px 4px 0;

  @media (max-width: 768px) {
    padding: 6px 12px 3px 16px;
  }
`

export default function MenuCard({ data }) {
    const dispatch = useDispatchContext();

    const setInfoData = (infoData) => dispatch({ type: 'SET_INFODATA', infoData: infoData })
    const toggleInfo = () => dispatch({ type: 'TOGGLE_SHOWINFO' })

    return (
        <>
            <DesktopContainer className={'a'+data.code}>
                <RestInfo>
                    <Name>{data.name_kr}</Name>
                    <Location>
                        <LocationIcon src={"/img/location.svg"}/>
                        <LocationText>{data.addr.slice(19)}</LocationText>
                    </Location>
                </RestInfo>
                <HLine/>
                <MenuInfo>
                    <RestaurantTime hours={data.etc ? data.etc.operating_hours : null} />
                    <VLine/>
                    <Menus>
                        {
                            data.menus.map((menu) =>
                                <Menu menu={menu} key={menu.id}/>
                            )
                        }
                    </Menus>
                </MenuInfo>
            </DesktopContainer>
            <MobileContainer className={'a'+data.code}>
                <RestInfo>
                    <HeaderContainer>
                        <Name>{data.name_kr}</Name>
                        <InfoIcon
                            src={"/img/info.svg"}
                            onClick={() => {
                                setInfoData(data);
                                toggleInfo();
                            }}
                        />
                    </HeaderContainer>
                    <HeaderContainer>
                        <Price>Price</Price>
                        <Rate>Rate</Rate>
                    </HeaderContainer>
                </RestInfo>
                <HLine />
                <Menus>
                    {
                        data.menus.map((menu) =>
                            <Menu menu={menu} key={menu.id}/>
                        )
                    }
                </Menus>
            </MobileContainer>
        </>
    );
}

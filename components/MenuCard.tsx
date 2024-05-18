import styled from "styled-components";
import RestaurantTime from "./RestaurantTime";
import Menu from "./Menu";
import { useDispatchContext } from "../hooks/ContextProvider";

export default function MenuCard({ data }) {
  const dispatch = useDispatchContext();

  const setInfoData = (infoData) => dispatch({ type: "SET_INFODATA", infoData: infoData });
  const toggleInfo = () => dispatch({ type: "TOGGLE_SHOWINFO" });

  const toggleFavorite = () => {};

  return (
    <>
      <DesktopContainer className={"a" + data.code}>
        <RestInfo>
          <HeaderContainer>
            <Name>{data.name_kr}</Name>
            <Favorite
              src={"/img/star-empty-orange.svg"}
              onClick={() => {
              }}
            />
          </HeaderContainer>
          <Location>
            <LocationIcon
              src={"/img/location.svg"}
              onClick={() => {
                setInfoData(data);
                toggleInfo();
              }}
            />
            <LocationText>{data.addr?.slice(19)}</LocationText>
          </Location>
        </RestInfo>
        <HLine />
        <MenuInfo>
          <RestaurantTime hours={data.etc ? data.etc.operating_hours : null} />
          <VLine />
          <Menus>
            {data.menus.map((menu) => (
              <Menu menu={menu} key={menu.id} />
            ))}
          </Menus>
        </MenuInfo>
      </DesktopContainer>
      <MobileContainer className={"a" + data.code}>
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
        </RestInfo>
        <HLine />
        <Menus>
          {data.menus.map((menu) => (
            <Menu menu={menu} key={menu.id} />
          ))}
        </Menus>
      </MobileContainer>
    </>
  );
}

const RestInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 23px;
  width: 100%;

  @media (max-width: 768px) {
    padding-top: 17px;
  }
`;

const DesktopContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border: solid 1px #e8e8e8;
  box-sizing: border-box;
  border-radius: 8px;
  width: 100%;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    background: white;
    border: solid 1px #e8e8e8;
    box-sizing: border-box;
    border-radius: 8px;
    width: 95vw;
    margin-bottom: 16px;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;

const InfoIcon = styled.img`
  width: 16px;
  height: 16px;
  padding-left: 6px;
  padding-bottom: 0.3px;
  cursor: pointer;
`;

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
    color: #ff9522;
    padding-left: 16px;
    white-space: normal;
  }
`;

const Favorite = styled.img`
  height: 27px;
  width: 27px;
  margin-left: 11px;
  cursor: pointer;
`;

const Location = styled.div`
  display: flex;
  padding-top: 3px;
  padding-right: 35px;

  @media (max-width: 768px) {
    padding-right: 16px;
  }
`;

const LocationIcon = styled.img`
  width: 14.4px;
  height: 20.21px;
  cursor: "pointer";
`;

const LocationText = styled.div`
  font-family: NanumSquare;
  font-weight: 400;
  font-size: 15px;
  line-height: 17px;
  padding-top: 1px;
  padding-left: 10px;
  color: #575757;
`;

const HLine = styled.div`
  width: calc(100% - 70px);
  height: 2px;
  background: #ff9522;
  margin: 10px auto 10px auto;

  @media (max-width: 768px) {
    width: calc(95vw - 32px);
    height: 1px;
    margin: 8.5px auto 8.5px auto;
  }
`;

const MenuInfo = styled.div`
  display: flex;
  padding-bottom: 12px;
`;

const VLine = styled.div`
  width: 1px;
  background: #dcdcdc;
  margin-left: 17px;
  margin-right: 26px;
`;

const Menus = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 3px 38px 4px 0;

  @media (max-width: 768px) {
    padding: 6px 12px 3px 16px;
  }
`;

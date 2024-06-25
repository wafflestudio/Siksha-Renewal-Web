import styled from "styled-components";
import RestaurantTime from "./RestaurantTime";
import Menu from "./Menu";
import { useDispatchContext } from "../hooks/ContextProvider";
import useFavorite from "../hooks/UseFavorite";

export default function MenuCard({ data }) {
  const { setInfoData, toggleShowInfo } = useDispatchContext();

  const { toggleFavorite, isFavorite } = useFavorite();

  return (
    <>
      <DesktopContainer className={"a" + data.code}>
        <RestInfo>
          <HeaderContainer>
            <Name>{data.name_kr}</Name>
            {isFavorite(data.id) ? (
              <Star src="/img/star.svg" onClick={() => toggleFavorite(data.id)} />
            ) : (
              <Star src="/img/star-empty.svg" onClick={() => toggleFavorite(data.id)} />
            )}
          </HeaderContainer>
          <Location>
            <LocationIcon
              src={"/img/location.svg"}
              onClick={() => {
                setInfoData(data);
                toggleShowInfo();
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
                toggleShowInfo();
              }}
            />
            {isFavorite(data.id) ? (
              <Star src="/img/star.svg" onClick={() => toggleFavorite(data.id)} />
            ) : (
              <Star src="/img/star-empty.svg" onClick={() => toggleFavorite(data.id)} />
            )}
          </HeaderContainer>
          <MenuInfoLabels>
            <div style={{ width: "45px", textAlign: "center", paddingRight: "12px" }}>Price</div>
            <div style={{ width: "42px", textAlign: "center", paddingRight: "9px" }}>Rate</div>
            <div>Like</div>
          </MenuInfoLabels>
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
  position: relative;
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
  padding: 0 54px 0 50px;

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
    padding: 0 16px;
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

  @media (max-width: 768px) {
    font-size: 15px;
    line-height: 17px;
    color: #ff9522;
    white-space: normal;
  }
`;

const Star = styled.img`
  width: 23px;
  height: 22px;
  margin: 0 0 2.5px 11px;
  cursor: pointer;

  /* App버전을 참고한 디자인 */
  @media (max-width: 768px) {
    width: 17px;
    height: 16px;
    margin: 0 0 2.5px 8px;
  }
`;

const Location = styled.div`
  display: flex;
  padding-top: 3px;

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

const MenuInfoLabels = styled.div`
  position: absolute;
  right: -2px;
  display: flex;
  color: #ff9522;
  font-size: 12px;
  font-weight: 400;
  justify-content: space-between;
`;

const HLine = styled.div`
  height: 2px;
  background: #ff9522;
  margin: 10px 0;

  @media (max-width: 768px) {
    width: calc(95vw - 32px);
    height: 1px;
    margin: 8.5px 0;
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
  padding: 3px 0 4px 0;

  @media (max-width: 768px) {
    padding: 6px 0 3px 0;
  }
`;

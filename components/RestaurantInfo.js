import styled from "styled-components";
import {useDispatchContext, useStateContext} from "../utils/hooks/ContextProvider";
import {useEffect} from "react";
import MobileOperatingHour from "./MobileOperatingHour";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  right: 0;
  
  z-index: 100;
`

const ClickArea = styled.div`
  width: 100vw;
  flex: 1;
`

const InfoBox = styled.div`
  background: white;
  border-radius: 15px 15px 0 0;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const RestName = styled.div`
  font-size: 20px;
  line-height: 23px;
  font-weight: 700;
  color: black;
  padding-top: 14px;
`

const CloseIcon = styled.img`
  width: 25px;
  position: absolute;
  padding-top: 16px;
  padding-right: 21.3px;
  right: 0;
`

const HLine = styled.div`
  width: calc(100vw - 32px);
  height: 1px;
  background: ${props => props.color};
  margin-top: ${props => props.margin};
`

const AboveMap = styled.div`
  width: calc(100vw - 32px);
  padding: 16px 16px 12px 16px;
  display: flex;
  justify-content: space-between;
`

const Text = styled.div`
  font-size: 14px;
  line-height: 16px;
  color: black;
  font-weight: 100;
`

const LocationBox = styled.div`
  display: flex;
`

const LocationIcon = styled.img`
  width: 16px;
`

const LocationText = styled.div`
  font-size: 14px;
  font-weight: 100;
  line-height: 16px;
  color: #575757;
  padding-left: 4px;
`

const Map = styled.div`
  width: calc(100vw - 32px);
  height: 247px;
`

const Division = styled.div`
  width: 100vw;
  height: 10px;
  background: rgba(145, 145, 145, 0.1);
  margin: 24px 0;
`

const BelowMap = styled.div`
  width: calc(100vw - 32px);
  display: flex;
  justify-content: flex-start;
`

const EmptyText = styled.div`
  font-size: 14px;
  line-height: 16px;
  color: #575757;
  padding-top: 25px;
  font-weight: 100;
`

const EmptyBox = styled.div`
  height: ${props => props.height};
  background: white;
  width: 100vw;
`

export default function RestaurantInfo() {
    const state = useStateContext();
    const dispatch = useDispatchContext();

    const { infoData } = state;
    const toggleShowInfo = () => dispatch({ type: 'TOGGLE_SHOWINFO' });

    useEffect(() => {
        console.log(infoData)
    }, [infoData])

    return (
        <Container>
            <ClickArea onClick={() => toggleShowInfo()}/>
            <InfoBox>
                <RestName>{infoData.name_kr}</RestName>
                <CloseIcon
                    src={"/img/close.svg"}
                    onClick={() => toggleShowInfo()}
                />
                <HLine color={'#FE8C59'} margin={'10px'}/>
                <AboveMap>
                    <Text>식당 위치</Text>
                    <LocationBox>
                        <LocationIcon src={"/img/mobile-location.svg"}/>
                        <LocationText>{infoData.addr.slice(19)}</LocationText>
                    </LocationBox>
                </AboveMap>
                <Map/>
                <Division/>
                <BelowMap>
                    <Text>영업시간</Text>
                </BelowMap>
                <HLine color={'#FE8C59'} margin={'8px'}/>
                {
                    infoData.etc && infoData.etc.operating_hours && infoData.etc.operating_hours.weekdays.length != 0 &&
                    <MobileOperatingHour type={'weekdays'}/>
                }
                {
                    infoData.etc && infoData.etc.operating_hours && infoData.etc.operating_hours.saturday.length != 0 &&
                    <>
                        <HLine color={'#ECECEC'} margin={'2px'}/>
                        <MobileOperatingHour type={'saturday'}/>
                    </>
                }
                {
                    infoData.etc && infoData.etc.operating_hours && infoData.etc.operating_hours.holiday.length != 0 &&
                    <>
                        <HLine color={'#ECECEC'} margin={'2px'}/>
                        <MobileOperatingHour type={'holiday'}/>
                    </>
                }
                {
                    (!infoData.etc || !infoData.etc.operating_hours) &&
                    <>
                        <EmptyText>운영 시간 정보가 없습니다.</EmptyText>
                        <EmptyBox height={'8px'}/>
                    </>
                }
                <EmptyBox height={'17px'}/>
            </InfoBox>
        </Container>
    );
}

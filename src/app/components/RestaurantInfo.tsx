'use client';

import styled from "styled-components";
import { useDispatchContext, useStateContext } from "../../providers/ContextProvider";
import { useEffect, useState } from "react";
import MobileOperatingHour from "./MobileOperatingHour";
import BackClickable from "../../components/general/BackClickable";

export default function RestaurantInfo() {
  const state = useStateContext();
  const { toggleShowInfo } = useDispatchContext();

  const { infoData } = state;

  const [ etc, setEtc ] = useState({ isFestival: false, isFoodTruck: false });

  useEffect(() => {
    const loadMap = () => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(infoData.lat, infoData.lng),
      };

      const map = new window.kakao.maps.Map(container, options);

      const markerPosition = new window.kakao.maps.LatLng(infoData.lat, infoData.lng);

      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });

      marker.setMap(map);
    };

    // LatLng를 못불러오는 오류가 발생해서 동적으로 import
    if (window.kakao && window.kakao.maps && window.kakao.maps.LatLng) loadMap();
    else if (document.head.querySelector("script[src*='dapi.kakao.com']")) {
      const script: HTMLScriptElement | null = document.head.querySelector(
        "script[src*='dapi.kakao.com']",
      );
      if (script)
        script.onload = () => {
          window.kakao.maps.load(loadMap);
        };
    } else {
      const apiKey = process.env.NEXT_PUBLIC_KAKAOMAP_RESTAPI;
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
      script.async = true;
      script.onload = () => {
        window.kakao.maps.load(loadMap);
      };
      document.head.appendChild(script);
    }

    setEtc({
      isFestival: infoData.name_kr.startsWith("[축제]"),
      isFoodTruck: infoData.name_kr.endsWith("(푸드트럭)")
    });
  }, [infoData]);

  return (
    <BackClickable onClickBackground={() => toggleShowInfo()}>
      <Container>
        {/* <FlexBox> */}
        <InfoBox>
          <RestName>{infoData.name_kr}</RestName>
          <CloseIcon src={"/img/close.svg"} onClick={() => toggleShowInfo()} alt="닫기" />
          <HLine color={"#FE8C59"} margin={"10px"} />
          <ScrollArea>
            <Wrapper>
              <AboveMap>
                <Text>식당 위치</Text>
                <LocationBox>
                  <LocationIcon src={"/img/mobile-location.svg"} alt="위치 정보" />
                  <LocationText>{infoData.addr ? infoData.addr.slice(19) : ""}</LocationText>
                </LocationBox>
              </AboveMap>
              <Map id={"map"} />
              <Division />
              <BelowMap>
                <Text>영업시간</Text>
              </BelowMap>
              <HLine color={"#FE8C59"} margin={"8px"} />
              {infoData.etc &&
                infoData.etc.operating_hours &&
                infoData.etc.operating_hours.weekdays.length != 0 && (
                  <MobileOperatingHour type={"weekdays"} etc={etc} />
                )}
              {infoData.etc &&
                infoData.etc.operating_hours &&
                infoData.etc.operating_hours.saturday.length != 0 && (
                  <>
                    <HLine color={"#ECECEC"} margin={"2px"} />
                    <MobileOperatingHour type={"saturday"} etc={etc} />
                  </>
                )}
              {infoData.etc &&
                infoData.etc.operating_hours &&
                infoData.etc.operating_hours.holiday.length != 0 && (
                  <>
                    <HLine color={"#ECECEC"} margin={"2px"} />
                    <MobileOperatingHour type={"holiday"} etc={etc} />
                  </>
                )}
              {(!infoData.etc || !infoData.etc.operating_hours) && (
                <>
                  <EmptyText>운영 시간 정보가 없습니다.</EmptyText>
                  <EmptyBox height={"8px"} />
                </>
              )}
              <EmptyBox height={"17px"} />
            </Wrapper>
          </ScrollArea>
        </InfoBox>
        {/* </FlexBox> */}
      </Container>
    </BackClickable>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -40%);
`;

const InfoBox = styled.div`
  background: white;
  border-radius: 15px;
  width: 90vw;
  max-width: 1000px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding: 0 16px;
`;

const RestName = styled.div`
  font-size: 20px;
  line-height: 23px;
  font-weight: 700;
  color: black;
  padding-top: 14px;
  white-space: nowrap;
`;

const CloseIcon = styled.img`
  width: 25px;
  position: absolute;
  padding-top: 16px;
  padding-right: 16px;
  right: 0;
  cursor: pointer;
`;

const HLine = styled.div<{ color: string; margin: string }>`
  width: 100%;
  height: 1px;
  background: ${(props) => props.color};
  margin-top: ${(props) => props.margin};
`;

const ScrollArea = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  margin-top: 16px;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
`;

const AboveMap = styled.div`
  width: 100%;
  padding-bottom: 12px;
  display: flex;
  justify-content: space-between;
`;

const Text = styled.div`
  font-size: 14px;
  line-height: 16px;
  color: black;
  font-weight: 400;
`;

const LocationBox = styled.div`
  display: flex;
`;

const LocationIcon = styled.img`
  width: 16px;
`;

const LocationText = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  color: #575757;
  padding-left: 4px;
`;

const Map = styled.div`
  width: 100%;
  width: 100%;
  height: 247px;
  min-height: 247px;
`;

const Division = styled.div`
  width: 100%;
  height: 10px;
  background: rgba(145, 145, 145, 0.1);
  margin: 24px 0;
`;

const BelowMap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const EmptyText = styled.div`
  font-size: 14px;
  line-height: 16px;
  color: #575757;
  padding-top: 25px;
  font-weight: 400;
`;

const EmptyBox = styled.div<{ height: string }>`
  height: ${(props) => props.height};
  background: white;
  width: 1px;
`;

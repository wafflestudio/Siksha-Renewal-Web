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
        <InfoBox>
          <Header>
            <RestName>{infoData.name_kr}</RestName>
            <CloseIcon src={"/img/close.svg"} onClick={() => toggleShowInfo()} alt="닫기" />
          </Header>
          <TitleDivider />
          
          <ContentArea>
            {/* Operating Hours Section */}
            <OperatingHoursSection>
              <SectionHeader>
                <ScheduleIcon src="/img/schedule.svg" alt="영업시간" />
                <SectionTitle>영업 시간</SectionTitle>
              </SectionHeader>
              <OperatingHoursContent>
                {infoData.etc?.operating_hours ? (
                  <>
                    {infoData.etc.operating_hours.weekdays?.length > 0 && (
                      <>
                        <MobileOperatingHour type={"weekdays"} etc={etc} />
                        {(infoData.etc.operating_hours.saturday?.length > 0 || infoData.etc.operating_hours.holiday?.length > 0) && <SectionDivider />}
                      </>
                    )}
                    
                    {infoData.etc.operating_hours.saturday?.length > 0 && (
                      <>
                        <MobileOperatingHour type={"saturday"} etc={etc} />
                        {infoData.etc.operating_hours.holiday?.length > 0 && <SectionDivider />}
                      </>
                    )}
                    
                    {infoData.etc.operating_hours.holiday?.length > 0 && (
                      <MobileOperatingHour type={"holiday"} etc={etc} />
                    )}
                  </>
                ) : (
                  <EmptyText>운영 시간 정보가 없습니다.</EmptyText>
                )}
              </OperatingHoursContent>
              <VerticalDivider />
            </OperatingHoursSection>
            
            {/* Location Section */}
            <LocationSection>
              <SectionHeader>
                <DistanceIcon src="/img/distance.svg" alt="식당위치" />
                <SectionTitle>식당 위치</SectionTitle>
              </SectionHeader>
              <MapContainer id="map" />
            </LocationSection>
          </ContentArea>
        </InfoBox>
      </Container>
    </BackClickable>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const InfoBox = styled.div`
  background: #ffffff;
  border-radius: 14px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  width: 90vw;
  max-width: 648px;
  max-height: 90vh;
  padding: 22px 30px 28px 30px;
  box-sizing: border-box;
  overflow: hidden;
  
  @media (max-width: 768px) {
    width: 95vw;
    padding: 16px 20px 20px 20px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const RestName = styled.h1`
  font-family: 'NanumSquare', sans-serif;
  font-size: 24px;
  font-weight: 800;
  line-height: 1.4;
  color: #262728;
  font-style: normal;
  letter-spacing: -0.3px;
`;

const CloseIcon = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const TitleDivider = styled.div`
  width: 100%;
  height: 2px;
  background: var(--Color-Foundation-orange-500, #ff9522);
  margin-bottom: 32px;
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
  font-size: 15px;
  line-height: 150%;
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
  font-family: 'NanumSquare', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: #575757;
  text-align: center;
  padding: 40px 0;
`;

const EmptyBox = styled.div<{ height: string }>`
  height: ${(props) => props.height};
  background: white;
  width: 1px;
`;

// Content Layout
const ContentArea = styled.div`
  display: flex;
  gap: 40px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
  }
`;

// Operating Hours Section
const OperatingHoursSection = styled.div`
  flex: 0 0 240px;
  position: relative;
  
  @media (max-width: 768px) {
    flex: none;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
`;

const ScheduleIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const DistanceIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const SectionTitle = styled.h2`
  font-family: 'NanumSquare', sans-serif;
  font-size: 20px;
  font-weight: 800;
  line-height: 1.4;
  color: #262728;
  margin: 0;
  letter-spacing: -0.3px;
`;

const OperatingHoursContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 12px;
`;

const SectionDivider = styled.div`
  width: 100%;
  height: 1px;
  background: #e5e6e9;
`;

const VerticalDivider = styled.div`
  position: absolute;
  left: 280px;
  top: 40px;
  width: 1px;
  height: 297px;
  background: #e5e6e9;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

// Location Section
const LocationSection = styled.div`
  flex: 0 0 300px;
  
  @media (max-width: 768px) {
    flex: none;
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 297px;
  min-height: 297px;
  background: #cbcdd3;
  border-radius: 10px;
  overflow: hidden;
`;

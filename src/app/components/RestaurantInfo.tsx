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
          <HeaderSection>
            <Header>
              <RestNameContainer>
                <RestName>{infoData.name_kr}</RestName>
              </RestNameContainer>
              <CloseIcon src={"/img/close.svg"} onClick={() => toggleShowInfo()} alt="닫기" />
            </Header>
            <TitleDivider />
          </HeaderSection>
          
          <ContentArea>
            {/* Operating Hours Section */}
            <OperatingHoursSection>
              <SectionHeader>
                <ScheduleIcon src="/img/schedule.svg" alt="영업시간" />
                <SectionTitle>영업 시간</SectionTitle>
              </SectionHeader>
              <OperatingHoursContent>
                <SectionDivider />
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
  display: inline-flex;
  width: 640px;
  height: 467px;
  padding: 22px 30px 28px 30px;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  border-radius: 14px;
  background: var(--SementicColor-Background-Secondary, #FFF);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.10);
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 95vw;
    height: auto;
    padding: 16px 20px 20px 20px;
  }
`;

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 40px;
`;

const RestNameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 1px 0;
  flex: 1;
  min-height: 38px;
`;

const RestName = styled.h1`
  font-family: 'NanumSquare', sans-serif;
  font-size: 24px;
  font-weight: 800;
  line-height: 1.4;
  color: var(--Color-Foundation-gray-900, #262728);
  font-style: normal;
  letter-spacing: -0.3px;
  margin: 0;
`;

const CloseIcon = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const TitleDivider = styled.div`
  width: 580px;
  height: 2px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='583' height='2' viewBox='0 0 583 2' fill='none'%3E%3Cpath d='M1.5 1H581.5' stroke='%23FF9522' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  align-self: stretch;
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


// Content Layout
const ContentArea = styled.div`
  display: flex;
  width: 580px;
  height: 337px;
  align-items: flex-start;
  align-content: flex-start;
  gap: 68px 40px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    flex-direction: column;
    gap: 24px;
    flex-wrap: nowrap;
  }
`;

// Operating Hours Section
const OperatingHoursSection = styled.div`
  display: flex;
  width: 240px;
  height: 337px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    flex: none;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  width: 100%;
  height: 28px;
  align-items: center;
  gap: 6px;
`;

const ScheduleIcon = styled.img`
  width: 24px;
  height: 24px;
  margin: 2px 0;
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
  width: 100%;
`;

const SectionDivider = styled.div`
  width: 100%;
  height: 2px;
  align-self: stretch;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='241' height='2' viewBox='0 0 241 2' fill='none'%3E%3Cpath d='M0.5 1H240.5' stroke='%23E5E6E9' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: 100% 100%;
`;

const VerticalDivider = styled.div`
  position: absolute;
  left: 71px;
  top: 40px;
  width: 1px;
  height: 297px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='299' viewBox='0 0 1 299' fill='none'%3E%3Cpath d='M0.5 1L0.500013 298' stroke='%23E5E6E9' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: 100% 100%;

  @media (max-width: 768px) {
    display: none;
  }
`;

// Location Section
const LocationSection = styled.div`
  flex: 0 0 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 768px) {
    flex: none;
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 299px;
  min-height: 299px;
  background: #cbcdd3;
  border-radius: 10px;
  overflow: hidden;
`;

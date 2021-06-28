import styled from "styled-components";
import OperatingHour from "./OperatingHour";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 188px;
  padding-left: 33px;
`

const Time = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
`

const TimeText = styled.div`
  font-family: NanumSquare, sans-serif;
  font-weight: 100;
  font-size: 14px;
  line-height: 16px;
  color: black;
  padding-top: 2px;
`

const Times = styled.div`
  display: flex;
  flex-direction: column;
`

const VLine = styled.div`
  width: 188px;
  height: 1px;
  background: #ECECEC;
  margin-top: 3px;
`

export default function RestaurantTime(props) {
    return (
        <Container>
            {
                props.hours.weekdays.length != 0 &&
                <Time>
                    <TimeText>주중</TimeText>
                    {
                        props.hours.weekdays.length == 3 ?
                            <Times>
                                <OperatingHour type={"BR"} hour={props.hours.weekdays[0]}/>
                                <OperatingHour type={"LU"} hour={props.hours.weekdays[1]}/>
                                <OperatingHour type={"DN"} hour={props.hours.weekdays[2]}/>
                            </Times> :
                            props.hours.weekdays.length == 2 ?
                                <Times>
                                    <OperatingHour type={"LU"} hour={props.hours.weekdays[0]}/>
                                    <OperatingHour type={"DN"} hour={props.hours.weekdays[1]}/>
                                </Times> :
                                <Times>
                                    <OperatingHour type={"LU"} hour={props.hours.weekdays[0]}/>
                                </Times>
                    }
                </Time>
            }
            {
                props.hours.saturday.length != 0 &&
                <>
                    <VLine />
                    <Time>
                        <TimeText>토요일</TimeText>
                        {
                            props.hours.saturday.length == 3 ?
                                <Times>
                                    <OperatingHour type={"BR"} hour={props.hours.saturday[0]}/>
                                    <OperatingHour type={"LU"} hour={props.hours.saturday[1]}/>
                                    <OperatingHour type={"DN"} hour={props.hours.saturday[2]}/>
                                </Times> :
                                props.hours.saturday.length == 2 ?
                                    <Times>
                                        <OperatingHour type={"LU"} hour={props.hours.saturday[0]}/>
                                        <OperatingHour type={"DN"} hour={props.hours.saturday[1]}/>
                                    </Times> :
                                    <Times>
                                        <OperatingHour type={"LU"} hour={props.hours.saturday[0]}/>
                                    </Times>
                        }
                    </Time>
                </>
            }
            {
                props.hours.holiday.length != 0 &&
                <>
                    <VLine />
                    <Time>
                        <TimeText>휴일</TimeText>
                        {
                            props.hours.holiday.length == 3 ?
                                <Times>
                                    <OperatingHour type={"BR"} hour={props.hours.holiday[0]}/>
                                    <OperatingHour type={"LU"} hour={props.hours.holiday[1]}/>
                                    <OperatingHour type={"DN"} hour={props.hours.holiday[2]}/>
                                </Times> :
                                props.hours.holiday.length == 2 ?
                                    <Times>
                                        <OperatingHour type={"LU"} hour={props.hours.holiday[0]}/>
                                        <OperatingHour type={"DN"} hour={props.hours.holiday[1]}/>
                                    </Times> :
                                    <Times>
                                        <OperatingHour type={"LU"} hour={props.hours.holiday[0]}/>
                                    </Times>
                        }
                    </Time>
                </>
            }
            {
                props.hours.weekdays.length == 0 &&
                props.hours.saturday.length == 0 &&
                props.hours.holiday.length == 0 &&
                <div>운영 시간 정보가 없습니다.</div>
            }
        </Container>
    );
}

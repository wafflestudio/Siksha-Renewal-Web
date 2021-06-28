import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 7px;
`

const HourText = styled.div`
  font-size: 15px;
  font-weight: 100;
  font-family: NanumSquare, sans-serif;
  color: #575757;
  padding-left: ${props => props.type == "BR" ? '8px' : props.type == "LU" ? '7px' : '8px'};
`

const Breakfast = styled.img`
  width: 14.1px;
`

const Lunch = styled.img`
  width: 16px;
`

const Dinner = styled.img`
  width: 12px;
`

export default function OperatingHour(props) {
    return (
        <Container>
            {props.type == "BR" ?
                <Breakfast src={"/img/breakfast.svg"} /> :
                props.type == "LU" ?
                    <Lunch src={"/img/lunch.svg"} /> :
                    <Dinner src={"/img/dinner.svg"} />
            }
            <HourText type={props.type}>{props.hour}</HourText>
        </Container>
    )
}

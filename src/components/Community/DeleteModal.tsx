import BackClickable from "components/general/BackClickable";
import styled from "styled-components";

interface DeleteModalProps {
  type: "post" | "comment";
  onClose: () => void;
  onSubmit: () => void;
}

export default function DeleteModal({ type, onClose, onSubmit }: DeleteModalProps) {
  const target = type === "post" ? "게시물" : "댓글";

  return (
    <BackClickable onClickBackground={onClose}>
      <Container>
        <Header>
          <Title>{target} 삭제</Title>
          <CloseButton onClick={onClose}>
            <Icon src="/img/modal-close.svg" />
          </CloseButton>
        </Header>
        <Message>해당 {target}을 삭제하시겠습니까?</Message>
        <Footer>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <DeleteButton onClick={onSubmit}>삭제</DeleteButton>
        </Footer>
      </Container>
    </BackClickable>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 47px 30px;
  position: fixed;
  left: 50%;
  top: 423px;
  transform: translateX(-50%);
  width: 497px;
  height: 230px;
  box-sizing: border-box;
  border-radius: 13px;
  padding: 27px 30px 30px 33px;
  background-color: white;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 800;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
`;
const Icon = styled.img``;
const Message = styled.div``;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 17px;
`;
const Button = styled.button`
  border: none;
  width: 80px;
  height: 46px;
  box-sizing: border-box;
  border-radius: 13px;
  cursor: pointer;
`;
const CancelButton = styled(Button)`
  background-color: #eeeeee;
  color: #8e8e8e;
`;
const DeleteButton = styled(Button)`
  background-color: #ff9522;
  color: white;
`;

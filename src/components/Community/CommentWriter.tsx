import { useState } from "react";
import styled from "styled-components";
import { setComment } from "utils/api/community";
import UseAccessToken from "hooks/UseAccessToken";
import { RawComment } from "types";
import { useStateContext } from "hooks/ContextProvider";
import useModals from "hooks/UseModals";

interface CommentWriterProps {
  postId: number;
  update: (raw: RawComment) => void;
}

export default function CommentWriter({ postId, update }: CommentWriterProps) {
  const { loginStatus } = useStateContext();
  const { openLoginModal } = useModals();
  const { checkAccessToken } = UseAccessToken();

  const [commentInput, setCommentInput] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const checkBoxImg = isAnonymous ? "/img/radio-full.svg" : "/img/radio-empty.svg";
  const isValid = commentInput.length >= 1;

  function initialize() {
    setCommentInput("");
    setIsAnonymous(false);
  }

  const submit = () => {
    if (!loginStatus) openLoginModal();
    else if (isValid)
      checkAccessToken().then((res: string | null) => {
        if (res !== null)
          setComment(postId, commentInput, isAnonymous, res)
            .then((res) => update(res.data))
            .then(initialize)
            .catch((e) => console.error(e));
      });
  };

  return (
    <Container>
      <MobileAnonymousButton isAnonymous={isAnonymous}>
        <Option onClick={() => setIsAnonymous(!isAnonymous)}>
          <Icon src={checkBoxImg} />
          <span>익명</span>
        </Option>
      </MobileAnonymousButton>
      <CommentInput
        placeholder="댓글을 입력하세요."
        value={commentInput}
        onChange={(e) => setCommentInput(e.target.value)}
      />
      <Options>
        <DesktopAnonymousButton isAnonymous={isAnonymous}>
          <Option onClick={() => setIsAnonymous(!isAnonymous)}>
            <Icon src={checkBoxImg} />
            <span>익명</span>
          </Option>
        </DesktopAnonymousButton>
        <SubmitButton isValid={isValid} onClick={submit}>
          올리기
        </SubmitButton>
      </Options>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  position: sticky;
  padding-top: 18.7px;
  padding-bottom: 24.7px;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  background-color: white;
`;
const CommentInput = styled.input`
  box-sizing: border-box;
  width: 100%;

  border: none;
  border-radius: 8px;
  background-color: #f8f8f8;
  padding: 14px 130px 14px 14.5px;

  font-weight: 400;
  font-size: 16px;
  line-height: 18px;

  outline: none;
  &::placeholder {
    color: #b7b7b7;
  }
  @media (max-width: 768px) {
    font-size: 12px;
    line-height: 13.62px;
    padding: 13px 73px 13px 60px;
  }
`;

const Options = styled.div`
  position: absolute;
  right: 0;

  padding: 0 6.5px;

  display: flex;
  align-items: center;
`;

const AnonymousButton = styled.button<{ isAnonymous?: boolean }>`
  background-color: transparent;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  border: none;
  color: ${(props) => (props.isAnonymous ? "#ff9522" : "#575757")};
  font-weight: ${(props) => (props.isAnonymous ? 700 : 400)};
  cursor: pointer;
  & span {
    padding-left: 8px;
    @media (max-width: 768px) {
      padding-left: 5px;
    }
  }
`;
const MobileAnonymousButton = styled(AnonymousButton)`
  display: none;
  position: absolute;
  top: -2px;
  height: 100%;
  font-size: 10px;
  line-height: 11.35px;
  padding-left: 11px;
  @media (max-width: 768px) {
    display: flex;
  }
`;
const DesktopAnonymousButton = styled(AnonymousButton)`
  font-size: 14px;
  line-height: 16px;
  padding-right: 18px;
  @media (max-width: 768px) {
    display: none;
  }
`;
const Option = styled.div`
  display: flex;
  align-items: center;
`;
const Icon = styled.img``;

const SubmitButton = styled.button<{ isValid: boolean }>`
  background-color: ${(props) => (props.isValid ? "#ff9522" : "#adadad")};

  color: #fff;
  padding: 8.5px 11.5px;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 6.5px 11px;
  }
`;

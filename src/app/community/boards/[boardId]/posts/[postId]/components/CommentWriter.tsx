import { useState } from "react";
import styled from "styled-components";
import useModals from "hooks/UseModals";
import UseAuth from "hooks/UseAuth";
import useError from "hooks/useError";

interface CommentWriterProps {
  addComment: (postId: number, commentInput: string, isAnonymous: boolean) => Promise<void>;
  postId: number;
}

export default function CommentWriter({ addComment, postId }: CommentWriterProps) {
  const { authStatus } = UseAuth();
  const { openLoginModal } = useModals();

  const [commentInput, setCommentInput] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const { onHttpError } = useError();

  const isValid = commentInput.length >= 1;

  const submit = () => {
    if (authStatus === "logout") openLoginModal();
    else if (isValid)
      addComment(postId, commentInput, isAnonymous)
        .then(() => {
          setCommentInput("");
          setIsAnonymous(false);
        })
        .catch(onHttpError);
  };

  return (
    <Wrapper>
      <Container>
        <AnonymousButton isAnonymous={isAnonymous}>
          <Option onClick={() => setIsAnonymous(!isAnonymous)}>
            <Icon
              src={isAnonymous ? "/img/radio-full.svg" : "/img/radio-empty.svg"}
              alt="익명 여부 선택"
            />
            <span>익명</span>
          </Option>
        </AnonymousButton>
        <CommentInput
          placeholder="댓글을 입력하세요."
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <SubmitButton isValid={isValid} onClick={submit}>
          올리기
        </SubmitButton>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: sticky;
  padding-top: 18.23px;
  padding-bottom: 24.7px;
  bottom: 0;
  left: 0;
  background-color: white;
  width: 100%;
  z-index: 1;

  @media (max-width: 768px) {
    position: fixed;
    box-sizing: border-box;
    padding: 4.69px 8.5px 9.53px;
  }
`;

const Container = styled.div`
  background-color: #f8f8f8;
  width: 100%;
  height: 46px;
  border-radius: 8px;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    height: 40px;
  }
`;

const AnonymousButton = styled.button<{ isAnonymous?: boolean }>`
  padding: 0;
  margin: 0;
  border: none;

  background-color: transparent;
  display: flex;
  align-items: center;
  color: ${(props) => (props.isAnonymous ? "#ff9522" : "#575757")};
  font-weight: ${(props) => (props.isAnonymous ? 700 : 400)};
  font-size: 14px;
  line-height: 16px;
  margin: 0 12.62px 0 16.59px;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 10px;
    line-height: 11.35px;
    margin: 0 12.5px 0 11.5px;
  }

  & span {
    width: 26px;
    padding-left: 8px;
    @media (max-width: 768px) {
      width: 18px;
      padding-left: 5px;
    }
  }
`;

const Option = styled.div`
  display: flex;
  align-items: center;
`;
const Icon = styled.img``;

const CommentInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  background-color: #f8f8f8;

  border: none;
  padding: 0;

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
  }
`;

const SubmitButton = styled.button<{ isValid: boolean }>`
  background-color: #ff9522;
  width: 58px;
  height: 32px;
  flex-shrink: 0;
  margin: 0 6.5px;

  justify-content: center;
  align-items: center;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 55px;
    height: 27px;
    font-size: 12px;
  }
`;

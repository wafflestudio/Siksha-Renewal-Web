"use client";

import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Board } from "types";
import { boardParser } from "utils/DataUtil";
import { getBoardList, getPost, setPost, updatePost } from "utils/api/community";
import MobileSubHeader from "components/general/MobileSubHeader";
import useIsMobile from "hooks/UseIsMobile";
import useModals from "hooks/UseModals";
import useAuth from "hooks/UseAuth";
import { ImagePreview } from "app/community/write/components/ImagePreview";
import useIsAnonymousWriter from "hooks/UseIsAnonymousWriter";
import { BoardSelectDropdown } from "app/community/write/components/BoardSelectDropdown";
import useError from "hooks/useError";

export type inputs = {
  title: string;
  content: string;
  boardId: number;
  images: (File | string)[];
  options: {
    anonymous: boolean;
  };
};

const emptyInputs: inputs = {
  title: "",
  content: "",
  boardId: 1,
  images: [],
  options: { anonymous: false },
};

export default function PostWriter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const boardId = searchParams?.get("boardId");
  const postId = searchParams?.get("postId");

  const [inputs, setInputs] = useState<inputs>(emptyInputs);
  const [boards, setBoards] = useState<Board[]>([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isMobile = useIsMobile();
  const { authStatus, getAccessToken } = useAuth();
  const { openLoginModal } = useModals();
  const { onHttpError } = useError();
  const { isAnonymousWriter, setIsAnonymousWriter } = useIsAnonymousWriter();
  const isValid = inputs.title.length > 0 && inputs.content.length > 0;

  useEffect(() => {
    if (authStatus === "logout") router.push("/community/boards/1");
    fetchBoards();
    fetchPreviousPost();
    // update inputs' isAnoymous state
    setInputs((prev) => ({ ...prev, options: { anonymous: isAnonymousWriter } }));
  }, []);

  // 게시판 초기 선택
  useEffect(() => {
    if (boardId && typeof boardId === "string")
      setInputs((prev) => ({ ...prev, boardId: Number(boardId) }));
  }, [boardId]);

  const fetchPreviousPost = () => {
    if (!postId) return;

    return getAccessToken()
      .then((accessToken) => getPost(Number(postId), accessToken))
      .then((data) => {
        const { title, content, board_id, etc, anonymous, is_mine } = data;
        if (is_mine) {
          setInputs({
            title: title,
            content: content,
            boardId: board_id,
            images: etc ? etc.images : [],
            options: { anonymous: anonymous },
          });
          setIsUpdate(true);
        }
      })
      .catch(onHttpError);
  };

  const toggleAnonymous = () => {
    setIsAnonymousWriter(!inputs.options.anonymous);
    setInputs({ ...inputs, options: { anonymous: !inputs.options.anonymous } });
  };

  const convertToBlob = async (image: string | File) => {
    if (typeof image === "string") {
      const response = await fetch(image);
      const blob = await response.blob();
      return blob;
    } else return image;
  };

  const handleSubmit = () => {
    if (isSubmitting) {
      return;
    }

    if (authStatus === "logout") openLoginModal();
    else {
      setIsSubmitting(true);
      const body = new FormData();
      body.append("board_id", String(inputs.boardId));
      body.append("title", inputs.title);
      body.append("content", inputs.content);
      body.append("anonymous", String(inputs.options.anonymous));

      return Promise.all(inputs.images.map(convertToBlob))
        .then((blobs) => blobs.forEach((blob) => body.append("images", blob)))
        .then(getAccessToken)
        .then((accessToken) => {
          const actionFunction = isUpdate
            ? () => updatePost(Number(postId), body, accessToken)
            : () => setPost(body, accessToken);
          return actionFunction();
        })
        .then((data) => {
          const { board_id, id } = data;
          router.push(`/community/boards/${board_id}/posts/${id}`);
        })
        .catch(onHttpError)
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  const fetchBoards = () => {
    return getBoardList()
      .then((data) => {
        setBoards([]);
        data.map((board) => setBoards((prev) => [...prev, boardParser(board)]));
      })
      .catch(onHttpError);
  };

  const resize = () => {
    let textarea = document.querySelector(".content-input") as HTMLTextAreaElement | null;
    const minHeight = isMobile ? 113 : 284;
    const maxHeight = isMobile ? 305 : 500;

    if (textarea) {
      textarea.style.height = "auto";
      const height = textarea.scrollHeight;
      textarea.style.height = `${Math.max(minHeight, Math.min(height, maxHeight))}px`;
    }
  };

  return (
    <>
      <MobileSubHeader title="글쓰기" handleBack={router.back} />
      <Container>
        <DesktopHeader>글쓰기</DesktopHeader>
        <BoardSelectDropdown
          boards={boards}
          onSelect={(boardId) =>
            setInputs((prev) => {
              return { ...prev, boardId };
            })
          }
        />
        <TitleInput
          type="text"
          placeholder="제목"
          value={inputs.title}
          onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
        />
        <ContentInput
          className="content-input"
          placeholder="내용을 입력하세요."
          value={inputs.content}
          onChange={(e) => setInputs({ ...inputs, content: e.target.value })}
          onKeyDown={resize}
          onKeyUp={resize}
        />
        <Footer>
          <Options>
            <Option className={inputs.options.anonymous ? "active" : ""} onClick={toggleAnonymous}>
              <Icon
                src={inputs.options.anonymous ? "/img/radio-full.svg" : "/img/radio-empty.svg"}
                style={{ width: "13px" }}
                alt={inputs.options.anonymous ? "익명" : "익명 아님"}
              />
              익명
            </Option>
          </Options>
          <ImagePreview images={inputs.images} setInputs={setInputs} />
        </Footer>
        {!isMobile ? (
          <ButtonContainer>
            <Button className="cancel" onClick={router.back}>
              취소
            </Button>
            <Button
              className={`submit ${isValid && isSubmitting === false ? "active" : ""}`}
              onClick={handleSubmit}
            >
              등록
            </Button>
          </ButtonContainer>
        ) : (
          <ButtonContainer>
            <Button
              className={`submit ${isValid && isSubmitting === false ? "active" : ""}`}
              onClick={handleSubmit}
            >
              올리기
            </Button>
          </ButtonContainer>
        )}
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
`;
const DesktopHeader = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: var(--Color-Foundation-orange-500);
  text-align: center;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--Color-Foundation-orange-500);
  margin: 19px 0 12px 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Icon = styled.img`
  width: 100%;
  height: 100%;
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 15px 14px;
  background-color: var(--SemanticColor-Element-Chip);
  border: none;
  outline: none;
  border-radius: 8px;
  box-sizing: border-box;
  margin-bottom: 25px;
  font-size: 18px;
  color: var(--Color-Foundation-base-black);

  &::placeholder {
    color: var(--Color-Foundation-gray-500);
    font-weight: bold;
  }

  @media (max-width: 768px) {
    margin-bottom: 14px;
    font-size: 14px;
  }
`;

const ContentInput = styled.textarea`
  width: 100%;
  padding: 0px 14px;
  border: none;
  outline: none;
  resize: none;
  box-sizing: border-box;
  min-height: 284px;
  margin-bottom: 51px;
  font-size: 16px;
  color: var(--Color-Foundation-base-black);
  background: transparent;

  &::placeholder {
    color: var(--Color-Foundation-gray-500);
    font-weight: bold;
  }

  @media (max-width: 768px) {
    min-height: 113px;
    margin-bottom: 37px;
    font-size: 12px;
  }
`;

const Footer = styled.div`
  margin-bottom: 71px;

  @media (max-width: 768px) {
    margin-bottom: 13px;
  }
`;
const Options = styled.div`
  height: 36px;
  border-bottom: 0.5px solid var(--SemanticColor-Border-Secondary);

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
const Option = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin-left: 4px;
  user-select: none;
  cursor: pointer;
  color: var(--Color-Foundation-base-black);

  &.active {
    color: var(--Color-Foundation-orange-500);
  }
`;

const ButtonContainer = styled.div`
  position: sticky;
  padding-bottom: 65px;
  padding-top: 10px;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 14px;
  background-color: var(--SemanticColor-Background-Primary);
  flex: 1;
  align-items: end;

  @media (max-width: 768px) {
    padding-bottom: 23px;
  }
`;

const Button = styled.button`
  width: 324px;
  height: 46px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  outline: none;
  box-sizing: border-box;
  cursor: pointer;

  &.cancel {
    color: var(--Color-Foundation-gray-600);
    background-color: var(--SemanticColor-Element-Chip);
  }
  &.submit {
    color: var(--Color-Foundation-base-white);
    background-color: var(--Color-Foundation-gray-600);
    &.active {
      background-color: var(--Color-Foundation-orange-500);
    }
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

import styled from "styled-components";
import Layout from "../layout";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Board, RawBoard } from "../../../types";
import { boardParser } from "utils/DataUtil";
import { getBoardList, getPost, setPost, updatePost } from "utils/api/community";
import MobileSubHeader from "components/MobileSubHeader";
import useIsMobile from "hooks/UseIsMobile";
import useModals from "hooks/UseModals";
import useAuth from "hooks/UseAuth";
import { ImagePreview } from "components/Community/write/ImagePreview";
import { BoardSelectModal } from "components/Community/write/BoardSelectModal";
import useIsAnonymousWriter from "hooks/UseIsAnonymousWriter";

export type inputs = {
  title: string;
  content: string;
  boardId: number;
  images: (File | string)[];
  options: {
    anonymous: boolean;
  };
};

type option = {
  anonymous: boolean;
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
  const { boardId, postId } = router.query;

  const [inputs, setInputs] = useState<inputs>(emptyInputs);
  const [boards, setBoards] = useState<Board[]>([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isMobile = useIsMobile();

  const { authStatus, getAccessToken } = useAuth();

  const { openLoginModal, openModal } = useModals();

  const { isAnonymousWriter, setIsAnonymousWriter } = useIsAnonymousWriter();

  const isValid = inputs.title.length > 0 && inputs.content.length > 0;
  const selectedBoardName = boards?.filter((board) => board.id === inputs.boardId)[0]?.name;

  const onClickBoardSelectMenu = () => {
    openModal(BoardSelectModal, {
      boards: boards,
      onClose: () => {},
      onSubmit: (board) =>
        setInputs((prev) => {
          return { ...prev, boardId: board.id };
        }),
    });
  };

  const toggleAnonymous = () => {
    setIsAnonymousWriter(!inputs.options.anonymous);
    setInputs({ ...inputs, options: { anonymous: !inputs.options.anonymous } });
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
        .then((blobs) => {
          for (let i = 0; i < blobs.length; i++) {
            body.append("images", blobs[i]);
          }
        })
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
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }

    async function convertToBlob(image: string | File) {
      if (typeof image === "string") {
        const response = await fetch(image);
        const blob = await response.blob();
        return blob;
      } else {
        return image;
      }
    }
  };

  const fetchBoards = () => {
    return getBoardList().then((data) => {
      setBoards([]);
      data.map((board) => setBoards((prev) => [...prev, boardParser(board)]));
    });
  };

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
      });
  };

  const resize = () => {
    let textarea = document.querySelector(".content-input") as HTMLTextAreaElement | null;
    const minHeight = isMobile ? 113 : 284;
    const maxHeight = isMobile ? 305 : 500;

    if (textarea) {
      textarea.style.height = "auto";
      const height = textarea.scrollHeight;

      if (height > minHeight && height < maxHeight) {
        textarea.style.height = `${height}px`;
      } else if (height >= maxHeight) {
        textarea.style.height = `${maxHeight}px`;
      } else {
        textarea.style.height = `${minHeight}px`;
      }
    }
  };

  // update inputs' isAnoymous state
  useEffect(() => {
    setInputs((prev) => ({ ...prev, options: { anonymous: isAnonymousWriter } }));
  }, []);

  // 게시판 초기 선택
  useEffect(() => {
    if (boardId && typeof boardId === "string")
      setInputs((prev) => ({ ...prev, boardId: Number(boardId) }));
  }, [boardId]);

  useEffect(() => {
    if (authStatus === "logout") {
      router.push("/community/boards/1");
    }
    fetchBoards();
    fetchPreviousPost();
  }, []);

  // hydration mismatch를 피하기 위해 authStatus state로 pre-rendering을 막습니다.
  if (authStatus === "login")
    return (
      <>
        <MobileSubHeader title="글쓰기" handleBack={router.back} />
        <Layout>
          <Container>
            <DesktopHeader>글쓰기</DesktopHeader>
            <BoardMenu id="board-select-menu" onClick={onClickBoardSelectMenu}>
              {selectedBoardName}
              <Icon src="/img/down-arrow.svg" style={{ width: "11px" }} />
            </BoardMenu>
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
                <Option
                  className={inputs.options.anonymous ? "active" : ""}
                  onClick={toggleAnonymous}
                >
                  <Icon
                    src={inputs.options.anonymous ? "/img/radio-full.svg" : "/img/radio-empty.svg"}
                    style={{ width: "13px" }}
                  />
                  익명
                </Option>
              </Options>
              <ImagePreview images={inputs.images} setInputs={setInputs} />
            </Footer>
            {!isMobile ? (
              <ButtonContainer>
                <Button className="cancel" onClick={router.back} isMobile>
                  취소
                </Button>
                <Button
                  className={`submit ${isValid && isSubmitting === false ? "active" : ""}`}
                  onClick={handleSubmit}
                  isMobile
                >
                  등록
                </Button>
              </ButtonContainer>
            ) : (
              <ButtonContainer>
                <Button
                  className={`submit ${isValid && isSubmitting === false ? "active" : ""}`}
                  onClick={handleSubmit}
                  isMobile
                >
                  올리기
                </Button>
              </ButtonContainer>
            )}
          </Container>
        </Layout>
      </>
    );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;

  @media (max-width: 768px) {
  }
`;
const DesktopHeader = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #ff9522;
  text-align: center;
  padding-bottom: 16px;
  border-bottom: 1px solid #ff9522;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    display: none;
  }
`;
const BoardMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 9px;
  width: 100%;
  border: 1px solid #dfdfdf;
  border-radius: 8px;
  cursor: pointer;
  height: 39px;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    margin-bottom: 6px;
    height: 35px;
  }
`;
const Icon = styled.img`
  width: 100%;
  height: 100%;
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 15px 14px;
  background-color: #f8f8f8;
  border: none;
  outline: none;
  border-radius: 8px;
  box-sizing: border-box;
  margin-bottom: 25px;
  font-size: 18px;

  &::placeholder {
    color: #b7b7b7;
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

  &::placeholder {
    color: #b7b7b7;
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
  border-bottom: 0.5px solid #b7b7b7;

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

  &.active {
    color: #ff9522;
  }
`;

const ButtonContainer = styled.div`
  position: sticky;
  padding-bottom: 65px;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 14px;
  background-color: white;
  flex: 1;
  align-items: end;

  @media (max-width: 768px) {
    padding-bottom: 23px;
  }
`;

const Button = styled.button<{ isMobile: boolean }>`
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
    color: #8e8e8e;
  }
  &.submit {
    color: white;
    background-color: #adadad;
    &.active {
      background-color: #ff9522;
    }
  }

  @media (max-width: 768px) {
    width: 343px;
  }
`;

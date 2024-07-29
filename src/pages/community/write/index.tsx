import styled from "styled-components";
import Layout from "../layout";
import { useEffect, useState } from "react";
import { useStateContext } from "../../../hooks/ContextProvider";
import { useRouter } from "next/router";
import { Board, RawBoard } from "../../../types";
import { boardParser } from "utils/DataUtil";
import { getBoardList, getPost, setPost, updatePost } from "utils/api/community";
import UseAccessToken from "hooks/UseAccessToken";
import MobileSubHeader from "components/MobileSubHeader";
import useIsMobile from "hooks/UseIsMobile";
import useModals from "hooks/UseModals";
import LoginModal from "components/Auth/LoginModal";

export type inputs = {
  title: string;
  content: string;
  boardId: number;
  photos: (File | string)[];
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
  photos: [],
  options: { anonymous: false },
};

export default function PostWriter() {
  const router = useRouter();
  const { postId } = router.query;

  const [inputs, setInputs] = useState<inputs>(emptyInputs);
  const [boards, setBoards] = useState<Board[]>([]);
  const [clicked, setClicked] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isMobile = useIsMobile();
  const { loginStatus } = useStateContext();
  const { openLoginModal } = useModals();
  const { getAccessToken } = UseAccessToken();

  const isValid = inputs.title.length > 0 && inputs.content.length > 0;
  const selectedBoardName = boards?.filter((board) => board.id === inputs.boardId)[0]?.name;

  const handleClickMenuItem = (id: number) => {
    setInputs({ ...inputs, boardId: id });
    setClicked(false);
  };

  const handlePhotoAttach = (photo: File | undefined) => {
    if (photo) {
      setInputs({ ...inputs, photos: [...inputs.photos, photo] });
    }
  };

  const handlePhotoDelete = (index: number) => {
    setInputs({ ...inputs, photos: inputs.photos.filter((_, i) => i !== index) });
  };

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = () => {
    if (isSubmitting) {
      return;
    }

    if (!loginStatus) openLoginModal();
    else {
      setIsSubmitting(true);
      const body = new FormData();
      body.append("board_id", String(inputs.boardId));
      body.append("title", inputs.title);
      body.append("content", inputs.content);
      body.append("anonymous", String(inputs.options.anonymous));

      return Promise.all(inputs.photos.map(convertToBlob))
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

  function setParsedBoards(board: RawBoard) {
    setBoards((prev) => [...prev, boardParser(board)]);
  }

  const fetchBoards = () => {
    return getBoardList().then((data) => {
      setBoards([]);
      data.map(setParsedBoards);
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
            photos: etc ? etc.images : [],
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

    if (textarea && textarea.scrollHeight > minHeight && textarea.scrollHeight < maxHeight) {
      textarea.style.height = "auto";
      const height = textarea.scrollHeight;
      textarea.style.height = `${height + 8}px`;
    }
  };

  useEffect(() => {
    if (loginStatus === false) {
      router.push("/community/boards/1");
    }
    fetchBoards();
    fetchPreviousPost();
  }, []);

  // hydration mismatch를 피하기 위해 loginStatus state로 pre-rendering을 막습니다.
  if (loginStatus)
    return (
      <>
        <MobileSubHeader title="글쓰기" handleBack={router.back} />
        <Layout>
          <Container>
            <DesktopHeader>글쓰기</DesktopHeader>
            <BoardMenu onClick={() => setClicked(!clicked)}>
              {selectedBoardName}
              <Icon src="/img/down-arrow.svg" style={{ width: "11px" }} />
            </BoardMenu>
            {clicked && (
              <BoardMenuList>
                {boards?.map((board, i) => (
                  <BoardMenuItem key={i} onClick={() => handleClickMenuItem(board.id)}>
                    {board.name}
                  </BoardMenuItem>
                ))}
              </BoardMenuList>
            )}
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
                  onClick={() =>
                    setInputs({ ...inputs, options: { anonymous: !inputs.options.anonymous } })
                  }
                >
                  <Icon
                    src={inputs.options.anonymous ? "/img/radio-full.svg" : "/img/radio-empty.svg"}
                    style={{ width: "13px" }}
                  />
                  익명
                </Option>
              </Options>
              <PhotoViewer>
                {inputs.photos.map((photo, i) => (
                  <PhotoContainer key={i}>
                    <Photo src={typeof photo === "string" ? photo : URL.createObjectURL(photo)} />
                    <DeleteButton onClick={() => handlePhotoDelete(i)}>
                      <Icon src="/img/photo-delete.svg" />
                    </DeleteButton>
                  </PhotoContainer>
                ))}
                {inputs.photos.length < 5 ? (
                  <PhotoAttacher>
                    <Icon
                      style={{
                        width: !isMobile && inputs.photos.length === 0 ? "25px" : "",
                        height: !isMobile && inputs.photos.length === 0 ? "25px" : "",
                      }}
                      src={
                        inputs.photos.length === 0
                          ? !isMobile
                            ? "/img/file.svg"
                            : "/img/file-big.svg"
                          : "/img/file-big.svg"
                      }
                    />
                    <FileInput
                      type="file"
                      accept="image/*"
                      onChange={(e) => handlePhotoAttach(e.target?.files?.[0])}
                    />
                  </PhotoAttacher>
                ) : null}
              </PhotoViewer>
            </Footer>
            {!isMobile ? (
              <ButtonContainer>
                <Button className="cancel" onClick={handleCancel} isMobile>
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
  /* gap: 12px 12px 25px 51px 25px; */

  @media (max-width: 768px) {
    /* gap: 6px 14px 37px 13px; */
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
const BoardMenuList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid #dfdfdf;
  border-radius: 8px;
  margin-top: -8px;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    margin-bottom: 6px;
  }
`;
const BoardMenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 39px;
  background: #ffffff;
  cursor: pointer;

  &:hover {
    background: #f6f6f6;
  }
  &:not(:last-child) {
    border-bottom: 1px solid #dfdfdf;
  }
  &:first-child {
    border-radius: 8px 8px 0 0;
  }
  &:last-child {
    border-radius: 0 0 8px 8px;
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
  margin-bottom: 20px;
  border-bottom: 0.5px solid #b7b7b7;

  @media (max-width: 768px) {
    margin-bottom: 13px;
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
const PhotoViewer = styled.div`
  display: flex;
  align-items: end;
  gap: 13px;
  padding: 0px 3px;
  /* overflow-x: auto; */
  z-index: 2;
  /* height: 135px; */

  &::-webkit-scrollbar {
    display: none;
  }
`;
const PhotoContainer = styled.div`
  position: relative;
`;
const Photo = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 106px;
    height: 106px;
  }
`;
const DeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(36%) translateY(-36%);
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;

const PhotoAttacher = styled.label`
  width: 120px;
  height: 120px;
  margin-left: 15px;
  cursor: pointer;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 106px;
    height: 106px;
  }
`;
const FileInput = styled.input`
  display: none;
`;

const ButtonContainer = styled.div`
  position: absolute;
  /* position: relative; */
  bottom: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;

  @media (max-width: 768px) {
    left: 50%;
    transform: translateX(-50%);
    bottom: 23px;
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

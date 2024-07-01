import styled from "styled-components";
import Layout from "../layout";
import { useEffect, useState } from "react";
import APIendpoint from "../../../constants/constants";
import { useDispatchContext, useStateContext } from "../../../hooks/ContextProvider";
import axios from "axios";
import { useRouter } from "next/router";
import { Board, RawBoard } from "../../../types";
import { boardParser } from "utils/DataUtil";

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
  const [isSubmitting, SetIsSubmitting] = useState(false);

  const { loginStatus } = useStateContext();
  const { setLoginModal } = useDispatchContext();

  const isValid = inputs.title.length > 0 && inputs.content.length > 0;

  function handleClickMenuItem(id: number) {
    setInputs({ ...inputs, boardId: id });
    setClicked(false);
  }
  function handlePhotoAttach(photo: File | undefined) {
    if (photo) {
      setInputs({ ...inputs, photos: [...inputs.photos, photo] });
    }
  }
  function hanldlePhotoDelete(index: number) {
    setInputs({ ...inputs, photos: inputs.photos.filter((_, i) => i !== index) });
  }
  function handleCancel() {
    router.back();
  }
  async function handleSubmit() {
    if (isSubmitting) {
      return;
    }

    if (loginStatus === false) {
      setLoginModal(true);
    } else {
      SetIsSubmitting(true);
      const body = new FormData();
      body.append("board_id", String(inputs.boardId));
      body.append("title", inputs.title);
      body.append("content", inputs.content);
      body.append("anonymous", String(inputs.options.anonymous));

      await Promise.all(inputs.photos.map(convertToBlob)).then((blobs) => {
        for (let i = 0; i < blobs.length; i++) {
          body.append("images", blobs[i]);
        }
      });

      try {
        const res = isUpdate
          ? await axios.patch(`${APIendpoint()}/community/posts/${postId}`, body, {
              headers: {
                "authorization-token": `Bearer ${localStorage.getItem("access_token")}`,
              },
            })
          : await axios.post(`${APIendpoint()}/community/posts`, body, {
              headers: {
                "authorization-token": `Bearer ${localStorage.getItem("access_token")}`,
              },
            });
        const { board_id, id } = res.data;
        router.push(`/community/boards/${board_id}/posts/${id}`);
      } catch (e) {
        console.log(e);
      } finally {
        SetIsSubmitting(false);
      }
    }

    async function convertToBlob(image: string | File) {
      if (typeof image === "string") {
        // 기존 업로드 이미지 url을 blob 객체로 변환하며 fetch 시에 CORS 발생
        // TODO: 기존 이미지 재업로드(?) 방법 찾기
        const response = await fetch("https://cors-anywhere.herokuapp.com/" + image);
        const blob = await response.blob();
        return blob;
      } else {
        return image;
      }
    }
  }

  function setParsedBoards(board: RawBoard) {
    setBoards((prev) => [...prev, boardParser(board)]);
  }
  async function fetchBoards() {
    const res = await axios.get(`${APIendpoint()}/community/boards`);
    setBoards([]);
    res.data.map(setParsedBoards);
  }

  async function fetchPreviousPost() {
    if (!postId) return;

    await axios
      .get(`${APIendpoint()}/community/posts/${postId}`, {
        headers: { "authorization-token": `Bearer ${localStorage.getItem("access_token")}` },
      })
      .then((res) => {
        const { title, content, board_id, etc, anonymous, is_mine } = res.data;
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
  }

  useEffect(() => {
    if (loginStatus === false) {
      router.push("/community/boards/1");
    }
    fetchBoards();
    fetchPreviousPost();
  }, []);
  return (
    <Layout>
      <Container>
        <Header>글쓰기</Header>
        <BoardMenu onClick={() => setClicked(!clicked)}>
          {boards?.filter((board) => board.id === inputs.boardId)[0]?.name}
          <Icon src="/img/down-arrow.svg" />
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
          placeholder="내용을 입력하세요."
          value={inputs.content}
          onChange={(e) => setInputs({ ...inputs, content: e.target.value })}
        />
        <Options>
          <Option
            className={inputs.options.anonymous ? "active" : ""}
            onClick={() =>
              setInputs({ ...inputs, options: { anonymous: !inputs.options.anonymous } })
            }
          >
            <Icon src={inputs.options.anonymous ? "/img/radio-full.svg" : "/img/radio-empty.svg"} />
            익명
          </Option>
        </Options>
        <PhotoViewer>
          {inputs.photos.map((photo, i) => (
            <PhotoContainer key={i}>
              <Photo src={typeof photo === "string" ? photo : URL.createObjectURL(photo)} />
              <DeleteButton onClick={() => hanldlePhotoDelete(i)}>
                <Icon src="/img/photo-delete.svg" />
              </DeleteButton>
            </PhotoContainer>
          ))}
          {inputs.photos.length < 5 ? (
            <PhotoAttacher>
              <Icon src={inputs.photos.length === 0 ? "/img/file.svg" : "/img/file-big.svg"} />
              <FileInput
                type="file"
                accept="image/*"
                onChange={(e) => handlePhotoAttach(e.target?.files?.[0])}
              />
            </PhotoAttacher>
          ) : null}
        </PhotoViewer>
        <ButtonContainer>
          <Button className="cancel" onClick={handleCancel}>
            취소
          </Button>
          <Button
            className={`submit ${isValid && isSubmitting === false ? "active" : ""}`}
            onClick={handleSubmit}
          >
            등록
          </Button>
        </ButtonContainer>
      </Container>
    </Layout>
  );
}

const Container = styled.div``;
const Header = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #ff9522;
  text-align: center;
  padding-bottom: 16px;
  border-bottom: 1px solid #ff9522;
  margin-bottom: 12px;
`;
const BoardMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 9px;
  width: 100%;
  height: 39px;
  border: 1px solid #dfdfdf;
  border-radius: 8px;
  margin-bottom: 12px;
  cursor: pointer;
`;
const BoardMenuList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid #dfdfdf;
  border-radius: 8px;
  margin-top: -8px;
  margin-bottom: 12px;
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

const Icon = styled.img``;
const TitleInput = styled.input`
  width: 100%;
  font-size: 18px;
  padding: 15px 14px;
  background-color: #f8f8f8;
  border: none;
  outline: none;
  border-radius: 8px;
  box-sizing: border-box;
  margin-bottom: 25px;

  &::placeholder {
    color: #b7b7b7;
    font-weight: bold;
  }
`;
const ContentInput = styled.textarea`
  width: 100%;
  height: 284px;
  font-size: 16px;
  padding: 0px 14px;
  border: none;
  outline: none;
  resize: none;
  box-sizing: border-box;

  &::placeholder {
    color: #b7b7b7;
    font-weight: bold;
  }
`;
const Options = styled.div`
  height: 36px;
  margin-bottom: 20px;
  border-bottom: 0.5px solid #b7b7b7;
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
  align-items: center;
  gap: 13px;
  padding: 0px 3px;
  margin-bottom: 70px;
`;
const PhotoContainer = styled.div`
  position: relative;
`;
const Photo = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 8px;
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
  margin-left: 15px;
  cursor: pointer;
`;
const FileInput = styled.input`
  display: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
`;
const Button = styled.button`
  width: 324px;
  height: 46px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  outline: none;
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
`;

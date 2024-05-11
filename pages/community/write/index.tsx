import styled from "styled-components";
import { Layout } from "../Layout";
import { useMemo, useState } from "react";
import { boards } from "../../../constants/constants";

type option = {
  anonymous: boolean;
};

export default function PostWriter() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [boardId, setBoardId] = useState(0);
  const [photos, setPhotos] = useState<File[]>([]);

  const [clicked, setClicked] = useState(false);
  const [options, setOptions] = useState<option>({ anonymous: false });

  const isValid = title.length > 0 && content.length > 0;

  function handleClickMenuItem(id: number) {
    setBoardId(id);
    setClicked(false);
  }
  function handlePhotoAttach(photo: File | undefined) {
    if (photo) {
      setPhotos([...photos, photo]);
    }
  }
  function hanldlePhotoDelete(index: number) {
    setPhotos(photos.filter((_, i) => i !== index));
  }

  return (
    <Layout>
      <Container>
        <Header>글쓰기</Header>
        <BoardMenu onClick={() => setClicked(!clicked)}>
          {boards.filter((board) => board.id === boardId)[0].name}
          <Icon src="/img/down-arrow.svg" />
        </BoardMenu>
        {clicked && (
          <BoardMenuList>
            {boards.map((board, i) => (
              <BoardMenuItem
                key={i}
                className={board.id === boardId ? "active" : ""}
                onClick={() => handleClickMenuItem(board.id)}
              >
                {board.name}
              </BoardMenuItem>
            ))}
          </BoardMenuList>
        )}
        <TitleInput
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <ContentInput
          placeholder="내용을 입력하세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Options>
          <Option
            className={options.anonymous ? "active" : ""}
            onClick={() => setOptions({ ...options, anonymous: !options.anonymous })}
          >
            <Icon src={options.anonymous ? "/img/radio-full.svg" : "/img/radio-empty.svg"} />
            익명
          </Option>
        </Options>
        <PhotoViewer>
          {photos.map((photo, i) => (
            <PhotoContainer key={i}>
              <Photo src={URL.createObjectURL(photo)} />
              <DeleteButton onClick={() => hanldlePhotoDelete(i)}>
                <Icon src="/img/photo-delete.svg" />
              </DeleteButton>
            </PhotoContainer>
          ))}
          {photos.length < 5 ? (
            <PhotoAttacher>
              <Icon src={photos.length === 0 ? "/img/file.svg" : "/img/file-big.svg"} />
              <FileInput
                type="file"
                accept="image/*"
                onChange={(e) => handlePhotoAttach(e.target?.files?.[0])}
              />
            </PhotoAttacher>
          ) : null}
        </PhotoViewer>
        <ButtonContainer>
          <Button className="cancel">취소</Button>
          <Button className={`submit ${isValid ? "active" : ""}`}>등록</Button>
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
  /* position: absolute; */

  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid #dfdfdf;
  border-radius: 8px;
  margin-top: -8px;
  margin-bottom: 12px;
  z-index: 2;
`;
const BoardMenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 39px;
  background: #ffffff;
  cursor: pointer;
  &.active {
    background: #f6f6f6;
  }
  &:not(:last-child) {
    border-bottom: 1px solid #dfdfdf;
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

import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Page404() {
  const menuId = "\\d+"; //역슬래시 치려면 역슬래시 두번 쳐야함(한번치면 작은 따옴표)
  const menuPath = `menu\/${menuId}`; //마찬가지로 역슬래시 통해 슬래시 이스케이핑
  const menuPhotosPath = `menu\/${menuId}\/photos`;

  const boardId = "[01]";
  const communityBoardsPath = `community\/boards\/${boardId}`;
  const communityPostsPath = `community\/boards\/${boardId}\/posts\/${menuId}`;
  const communityWritePath = `community\/boards\/write`;

  const redirectPathPattern = [
    menuPath,
    menuPhotosPath,
    communityBoardsPath,
    communityPostsPath,
    communityWritePath,
  ].join("|");

  const redirectPath = new RegExp(`^\/(${redirectPathPattern})\/?$`, "g");

  const router = useRouter();

  useEffect(() => {
    const pathName = window.location.pathname;

    if (pathName.match(redirectPath)) {
      router.push(pathName);
    } else {
      router.push("/");
    }
  }, []);

  return <></>;
}

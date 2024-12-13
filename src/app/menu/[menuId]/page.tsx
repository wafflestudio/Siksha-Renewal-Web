import { getMenuList } from "utils/api/menus";
import Menu from "./Menu";

/**
 * 모든 메뉴의 id를 가져와야 하나 사실상 불가능하므로, 일단 build된 날짜의
 * 메뉴 id만 staticParams에 포함시켰습니다. 추후 EC2 + docker로 수정 시
 * 리뷰 페이지 정상 접속을 위해 이 부분은 반드시 수정되어야 합니다!
 */
export async function generateStaticParams() {
  const dateString = new Date().toISOString().split("T")[0];
  const staticParams: { menuId: string }[] = [];
  const { result } = await getMenuList(dateString, true);
  result.map((rawMenuList) => {
    ["BR", "LU", "DN"].forEach((key) => {
      rawMenuList[key].map(({ menus }) => {
        menus.map(({ id: menuId }) => {
          staticParams.push({ menuId: menuId.toString() })
        });
      });
    });
  });

  return staticParams;
}

export default async function Page({ params }) {
  const { menuId } = (await params) ?? "";

  return (
    <>
      <Menu menuId={Number(menuId)} />
    </>
  );
}

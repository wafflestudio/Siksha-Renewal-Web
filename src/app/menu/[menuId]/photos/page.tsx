import { getMenuList } from "utils/api/menus";
import PhotoReviews from "./PhotoReviews";

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
      <PhotoReviews menuId={menuId} />
    </>
  );
}
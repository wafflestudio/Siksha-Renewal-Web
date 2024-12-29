import { getMenuList } from "utils/api/menus";
import Menu from "./Menu";

export default async function Page({ params }) {
  const { menuId } = (await params) ?? "";

  return (
    <>
      <Menu menuId={Number(menuId)} />
    </>
  );
}

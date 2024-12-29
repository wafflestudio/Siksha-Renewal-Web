import Menu from "./Menu";

export default async function Page({ params }) {
  const { menuId } = (await params) ?? "";

  return (
    <>
      <Menu menuId={Number(menuId)} />
    </>
  );
}

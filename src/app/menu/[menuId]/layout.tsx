import MenuProvider from "providers/MenuProvider";

export default async function Layout({ children, params }) {
  const { menuId } = (await params) ?? "";;

  return (
    <>
      <MenuProvider menuId={Number(menuId)}>
        {children}
      </MenuProvider>
    </>
  );
}
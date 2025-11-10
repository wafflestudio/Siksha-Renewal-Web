import Menu from "./Menu";

// Force dynamic rendering - menu data changes daily
export const dynamic = 'force-dynamic';

export default async function Page({ params }) {
  const { menuId } = (await params) ?? "";

  return (
    <>
      <Menu menuId={Number(menuId)} />
    </>
  );
}

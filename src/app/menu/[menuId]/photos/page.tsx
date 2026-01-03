import PhotoReviews from "./PhotoReviews";

// Force dynamic rendering - menu data changes daily
export const dynamic = 'force-dynamic';

export default async function Page({ params }) {
  const { menuId } = (await params) ?? "";

  return (
    <>
      <PhotoReviews menuId={menuId} />
    </>
  );
}

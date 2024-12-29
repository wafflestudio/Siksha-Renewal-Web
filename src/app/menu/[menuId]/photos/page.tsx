import PhotoReviews from "./PhotoReviews";

export default async function Page({ params }) {
  const { menuId } = (await params) ?? "";

  return (
    <>
    <PhotoReviews menuId={menuId} />
    </>
  );
}
export default async function Product({ params }: { params: { id: string } }) {
  console.log("params", params);
  const { id } = await params;
  return (
    <div>X PRODUCT {id}</div>
  )
}
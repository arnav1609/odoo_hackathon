"use client";

export default function UserProfilePage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  console.log(id);

  return <div className="text-2xl p-10">User Profile Page for ID: {id}</div>;
}

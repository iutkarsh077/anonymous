export const dynamic = 'force-dynamic';
export async function GetUserPosts() {
  const res = await fetch("http://localhost:3000/api/UserNewPost", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
        revalidate: 0
    }
  });
  const data = await res.json();
  console.log(data);
  return data.posts;
}

export default GetUserPosts;
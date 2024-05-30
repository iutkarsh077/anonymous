
export async function GetUserPosts(){
    const res = await (
        await fetch("/api/UserNewPost", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: 'no-store'
        })
      ).json();

      return res.posts;
}

export default GetUserPosts;

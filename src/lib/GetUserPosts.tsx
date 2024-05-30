
export async function GetUserPosts(){
    const res = await (
        await fetch("/api/UserNewPost", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();

      return res.posts;
}

export default GetUserPosts;

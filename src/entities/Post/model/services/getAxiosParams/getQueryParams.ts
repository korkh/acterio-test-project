import { PostSchema, Post } from "entities/Post";

export function getQueryParams(postParams: PostSchema): string {
  const params = new URLSearchParams();
  if (postParams) {
    if (postParams.total !== undefined)
      params.append("total", postParams.total.toString());
    if (postParams.skip !== undefined)
      params.append("skip", postParams.skip.toString());
    if (postParams.limit !== undefined)
      params.append("limit", postParams.limit.toString());
    if (postParams.select) params.append("select", postParams.select);
    if (postParams.posts && postParams.posts.length > 0) {
      postParams.posts.forEach((param: Post) => {
        if (param.title) params.append("title", param.title);
        if (param.reactions)
          params.append("reactions", param.reactions.toString());
        if (param.userId) params.append("userId", param.userId.toString());
      });
    }
  }
  console.log(String(params));
  return params.toString();
}

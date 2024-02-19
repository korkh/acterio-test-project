import { User } from "entities/Account";
import { Post } from "entities/Post";
import { PostSchema } from "entities/Post/model/types/PostSchema";

const BASE_URL = "https://dummyjson.com";

const responseBody = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json() as Promise<T>;
};

const requests = {
  get: async <T>(url: string, params?: URLSearchParams | string) => {
    let fullUrl = `${BASE_URL}/${url}`;
    if (params) {
      if (typeof params === "string") {
        fullUrl += `?${params}`;
      } else {
        fullUrl += `?${params.toString()}`;
      }
    }
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return responseBody<T>(response);
  },
  post: async <T>(url: string, body: object) => {
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return responseBody<T>(response);
  },
  put: async <T>(url: string, body: object) => {
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if needed
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return responseBody<T>(response);
  },

  deleteOne: async <T>(url: string) => {
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return responseBody<T>(response);
  },
  getOne: async <T>(url: string) => {
    const fullUrl = `${BASE_URL}/${url}`;

    const response = await fetch(fullUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return responseBody<T>(response);
  },
};

const Posts = {
  list: (params?: URLSearchParams | string) =>
    requests.get<PostSchema>("posts", params),
  details: (id: string) => requests.getOne<Post>(`posts/${id}`),
  deleteOne: (id: string) => requests.deleteOne<void>(`posts/${id}`),
  updateReactions: (id: string, reactions: number) =>
    requests.put<void>(`posts/${id}`, { reactions }),
  search: (searchQuery: string) =>
    requests.get<Post[]>("posts/search", `q=${searchQuery}`),
};

const Account = {
  login: (values: object) => requests.post<User>("auth/login", values),
  register: (values: object) => requests.post<User>("users/add", values),
  currentUser: () => requests.get<User>("auth/me"),
};

const agent = {
  Posts,
  Account,
};

export default agent;

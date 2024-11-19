import { API } from "./api";

export const getArticles = async () => {
  try {
    const response = await API.get("/articles");
    return response.data;
  } catch (error) {
    console.log("Error getting articles", error);
    throw error;
  }
};

export const createArticle = async (data) => {
  try {
    const response = await API.post("/articles", data);
    return response.data;
  } catch (error) {
    console.log("Error creating article", error);
    throw error;
  }
};

export const getArticleById = async (id) => {
  try {
    const response = await API.get(`/articles/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error getting article by id", error);
    throw error;
  }
};

export const updateArticle = async (id, data) => {
  try {
    const response = await API.put(`/articles/${id}`, data);
    return response.data;
  } catch (error) {
    console.log("Error updating article", error);
    throw error;
  }
};

export const deleteArticle = async (id) => {
  try {
    const response = await API.delete(`/articles/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error deleting post", error);
    throw error;
  }
};

import React, { useState, useEffect } from "react";
import styles from "./AdminPage.module.css";
import { Hourglass } from "react-loader-spinner";
import {
  createArticle,
  getArticles,
  deleteArticle,
  updateArticle,
} from "../../api/articleApi";
import Button from "../../utils/Button/Button";
import Modal from "../../utils/Modal/Modal";

function AdminPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Nouă stare pentru a verifica dacă este editare sau adăugare
  const [currentArticle, setCurrentArticle] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    author: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getArticles();
        setArticles(response.data);
      } catch (error) {
        console.log("Error fetching data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const openModal = (article = null) => {
    if (article) {
      setIsEditing(true);
      setCurrentArticle(article);
      setFormData({
        title: article.title,
        description: article.description,
        content: article.content,
        author: article.author,
      });
    } else {
      setIsEditing(false);
      setFormData({
        title: "",
        description: "",
        content: "",
        author: "",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentArticle(null);
  };

  const handleDeleteArticle = async (id) => {
    try {
      await deleteArticle(id);
      const updatedArticles = articles.filter((article) => article._id !== id);
      setArticles(updatedArticles);
    } catch (error) {
      console.log("Error deleting article", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateArticle(currentArticle._id, formData);
        const updatedArticles = articles.map((article) =>
          article._id === currentArticle._id
            ? { ...article, ...formData }
            : article
        );
        setArticles(updatedArticles);
      } else {
        await createArticle(formData);
        const newArticle = { ...formData };
        setArticles([...articles, newArticle]);
      }
      closeModal();
    } catch (error) {
      console.log("Error updating article", error);
    }
  };

  return (
    <>
      <section className={styles.homeContainer}>
        <h1 className={styles.titlePage}>Welcome to Prokarimi Blog</h1>
        <div className={styles.articleContainer}>
          {loading && <Hourglass visible={true} height="80" width="80" />}
          {!loading && articles.length === 0 && (
            <Button label="Add article" onClick={() => openModal()} />
          )}
          <ul className={styles.articleList}>
            {articles.map((article) => (
              <li key={article._id} className={styles.articleItemsContainer}>
                <span className={styles.articleButtonContainer}>
                  <Button
                    label="Delete article"
                    onClick={() => handleDeleteArticle(article._id)}
                  />
                  <Button
                    label="Edit article"
                    onClick={() => openModal(article)}
                  />
                  <Button label="Add article" onClick={() => openModal()} />
                </span>
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <p>{article.content}</p>
                <p className={styles.author}>{article.author}</p>
              </li>
            ))}
          </ul>
        </div>
        <Modal
          className={styles.modalAdminPage}
          isOpen={isModalOpen}
          onClose={closeModal}
        >
          <form onSubmit={handleSubmit} className={styles.editForm}>
            <h3>{isEditing ? "Edit article" : "Add article"}</h3>
            <Button
              label="x"
              onClick={closeModal}
              className={styles.closeModalButton}
            />
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder={isEditing ? "Edit title" : "Enter title"}
              value={formData.title}
              onChange={handleChange}
            />
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              placeholder={isEditing ? "Edit description" : "Enter description"}
              value={formData.description}
              onChange={handleChange}
            />
            <label htmlFor="content">Content</label>
            <input
              type="text"
              name="content"
              id="content"
              placeholder={isEditing ? "Edit content" : "Enter content"}
              value={formData.content}
              onChange={handleChange}
            />
            <label htmlFor="author">Author</label>
            <input
              type="text"
              name="author"
              id="author"
              placeholder={isEditing ? "Edit author" : "Enter author"}
              value={formData.author}
              onChange={handleChange}
            />
            <Button label={isEditing ? "Save" : "Add"} type="submit" />
          </form>
        </Modal>
      </section>
    </>
  );
}

export default AdminPage;

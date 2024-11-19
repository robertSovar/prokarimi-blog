import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import { getArticles } from "../../api/articleApi";
import { Hourglass } from "react-loader-spinner";

function HomePage() {
  const [articles, setArticles] = useState([]);
  const [loading, setIsLoading] = useState(true);

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

  return (
    <>
      <section className={styles.homeContainer}>
        <h1 className={styles.titlePage}> Welcome to Prokarimi Blog</h1>
        <div className={styles.articleContainer}>
          {loading && <Hourglass visible={true} height="80" width="80" />}
          {!loading && articles.length === 0 && <p className={styles.noArticles}>No articles found.</p>}
          <ul className={styles.articleList}>
            {articles.map((article) => (
              <li key={article._id} className={styles.articleItemsContainer}>
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <p>{article.content}</p>
                <p className={styles.author}>{article.author}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default HomePage;
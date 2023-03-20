import { useState, useEffect } from "react";
import { Container, Pagination, TextField, Stack, Link, CircularProgress } from "@mui/material";

const BASE_URL = "http://hn.algolia.com/api/v1/search?query=";

function App() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("react");
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getPosts = async () => {
    setLoading(true);

    const response = await fetch(BASE_URL + `${query}` + `&page=${page - 1}`);
    console.log(response);

    if (!response.ok) {
      setLoading(false);
      setError("Error!!!");
      return;
    }

    const data = await response.json();
    setLoading(false);
    setPosts(data.hits);
    setPageQty(data.nbPages);
  };

  useEffect(() => {
    getPosts();
  }, [query, page]);

  return (
    <>
      <Container>
        <TextField
          fullWidth
          label="query"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ m: "30px" }}
        />
        {loading && <CircularProgress />}
        {error && error}
        <Stack>
          {!!pageQty && (
            <Pagination
              count={pageQty}
              page={page}
              onChange={(_, num) => setPage(num)}
              sx={{ m: "30px" }}
            />
          )}
          {posts.map((post) => {
            return (
              <Link key={post.objectID} href={post.url} sx={{mb: "10px"}}>
                {post.title || post.story_title}
              </Link>
            );
          })}
        </Stack>
      </Container>
    </>
  );
}

export default App;

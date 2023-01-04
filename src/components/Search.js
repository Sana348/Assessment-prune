import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 50%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
`;

const SearchButton = styled.button`
  width: 10%;
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const classes = useStyles();


  //useeffect to use after components renders to have second argument it will run when value changes 

  useEffect(() => {
    const searchShows = async () => {
      try {
        const res = await axios.get(
          `https://api.tvmaze.com/search/shows?q=${query}`
        );
        setResults(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (query) {
      searchShows();
    }
  }, [query]);

  //handleclose to preventing close the snack bar to set false

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  /// to preventing submission
  const handleSearch = (event) => {
    event.preventDefault();
    if (query) {
      setOpen(false);
    } else {
      setMessage("Please enter a query");
      setOpen(true);
    }
  };

  return (
    <SearchContainer>
      <form onSubmit={handleSearch}>
        <SearchInput
          type="text"
          style={{
            maxWidth: "100%",
            maxHeight: "100px",
            minWidth: "100%",
            minHeight: "30px",
          }}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search TV Shows"
        />
        <SearchButton
          style={{
            maxWidth: "30px",
            maxHeight: "100px",
            minWidth: "100px",
            minHeight: "30px",
          }}
          type="submit"
        >
          Search
        </SearchButton>
     </form>
      {results.length > 0 ? (
        results.map((result) => (
          <Card className={classes.card} key={result.show.id}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {result.show.name}
              </Typography>
              <Typography variant="h5" component="h2">
                {result.show.type}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {result.show.language}
              </Typography>
              <Typography variant="body2" component="p">
                {result.show.summary}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={message}
          action={
            <>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          }
        />
      )}
    </SearchContainer>
  );
}

export default Search;

//SnackBar from mui

import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";

export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState("Action");

  const MOVIE_SEARCH_QUERY = gql`
    query MovieSearch($selectedGenre: String!) {
      movies(
        where: {
          genres_SOME: { name: $selectedGenre }
          imdbRating_GTE: 0.0
          poster_NOT: ""
        }
        options: { limit: 100, sort: { imdbRating: DESC } }
      ) {
        title
        plot
        poster
        imdbRating
        actors {
          name
        }
        genres {
          name
        }
        similar {
          title
          poster
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(MOVIE_SEARCH_QUERY, {
    variables: { selectedGenre },
  });

  if (error) return <p>Error</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Movies Search</h1>
      <form>
        <label>
          Select Movie Genre:
          <select
            value={selectedGenre}
            onChange={(event) => setSelectedGenre(event.target.value)}
          >
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Romance">Romance</option>
          </select>
        </label>
      </form>

      <h2>Results</h2>
      <table>
        <thead>
          <tr>
            <th>Poster</th>
            <th>Title</th>
            <th>Genre</th>
            <th>Rating</th>
            <th>Recommended</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.movies &&
            data.movies.map((m, i) => (
              <tr key={i}>
                <td>
                  <img src={m.poster} style={{ height: "50px" }}></img>
                </td>
                <td>{m.title}</td>
                <td>
                  {m.genres.reduce(
                    (acc, c, i) =>
                      acc + (i === 0 ? " " : ", ") + c.name,
                    ""
                  )}
                </td>
                <td>{m.imdbRating}</td>
                <td>{m.similar[0].title}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

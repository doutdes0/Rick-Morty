import "./App.css";
import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";
import { Character, Params, APIRes } from "../utils/types";
import Filter from "../Filter/Filter";
import List from "../List/List";
import Pagination from "../Pagination/Pagination";
import headerimg from "/Rick-and-Morty-title.jpg";

export default function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [params, setParams] = useState<Params>({});
  //Set page apart from params, bc it's not supposed to be debounced
  const [page, setPage] = useState(1);
  const debouncedParams = useDebounce(params, 500);
  const [res, status] = useFetch(debouncedParams, page);

  useEffect(() => {
    if (res !== undefined) setCharacters(res.results);
    else setCharacters([]);
  }, [res]);

  return (
    <>
      <header>
        <img height="100px" src={headerimg} alt="rick and morty logo" />
      </header>
      <main>
        <Filter params={params} setParams={setParams} />
        <List chars={characters} />
        <Pagination
          page={page}
          setPage={setPage}
          max={res ? res.info.pages : undefined}
          isLoading={status.isLoading}
        />
      </main>
    </>
  );
}

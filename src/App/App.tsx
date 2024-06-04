import "./App.css";
import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";
import { Character, Params, APIRes } from "../utils/types";
import Filter from "../Filter/Filter";
import List from "../List/List";
import Pagination from "../Pagination/Pagination";
import headerimg from "../assests/Rick-and-Morty-title.jpg";

export default function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [params, setParams] = useState<Params>({});
  //Set page apart from params, bc it's not supposed to be debounced
  const [pagination, setPagination] = useState({ page: 1, offset: 0 });
  const debouncedParams = useDebounce(params, 500);
  const [res, status] = useFetch(debouncedParams, pagination.page);

  useEffect(() => {
    if (res !== undefined && !status.error) setCharacters(res.results);
    else setCharacters([]);
  }, [res, status]);

  //Deafult pagination on params change
  useEffect(() => {
    setPagination({ offset: 0, page: 1 });
  }, [debouncedParams]);
  return (
    <>
      <header>
        <img height="100px" src={headerimg} alt="rick and morty logo" />
      </header>
      <main>
        <Filter params={params} setParams={setParams} />
        <List chars={characters} />
        <Pagination
          page={pagination.page}
          offset={pagination.offset}
          setPagination={setPagination}
          max={res ? res.info.pages : undefined}
          isLoading={status.isLoading}
        />
      </main>
    </>
  );
}

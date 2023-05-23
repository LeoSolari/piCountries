import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivities, getCountries } from "../redux/actions";
import Nav from "../components/Nav";
import Card from "../components/Card";
import Spinner from "../components/Spinner";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";
import Errors from "../components/Errors";
import Create from "../components/Create";

import Style from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const sorting = useSelector((state) => state.sorting);
  const error = useSelector((state) => state.error);

  const [form, setForm] = useState(false);
  const activities = useSelector((state) => state.activities);

  const [sort, setSort] = useState(true);
  // Pagination
  const [input, setInput] = useState(1);
  const [current, setCurrent] = useState(1);
  const [perPage] = useState(5);
  const max = Math.ceil(sorting.length / perPage);

  useEffect(() => {
    if (!sorting[0]) {
      dispatch(getCountries());
    }

    if (activities[0]) {
      dispatch(getActivities());
    }
  }, [dispatch, sorting, activities]);

  return (
    <div className={Style.container}>
      {sorting.length ? (
        <div className={Style.background}>
          <Nav />
          {error && <Errors />}
          {form && <Create setForm={setForm} />}
          <Filters
            setSort={setSort}
            sort={sort}
            setInput={setInput}
            setCurrent={setCurrent}
            setForm={setForm}
          />

          <div className={Style.flexContainer}>
            <div className={Style.flags}>
              {sorting
                ?.slice(
                  (current - 1) * perPage,
                  (current - 1) * perPage + perPage
                )
                .map((country) => {
                  return (
                    <div key={country.id}>
                      <Card
                        id={country.id}
                        name={country.name}
                        flag={country.flag}
                        continent={country.continent}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
          <Pagination
            current={current}
            setCurrent={setCurrent}
            max={max}
            input={input}
            setInput={setInput}
          />
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};
export default Home;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import FilmListesi from "./Filmler/FilmListesi";
import KaydedilenlerListesi from "./Filmler/KaydedilenlerListesi";
import Film from "./Filmler/Film";

export default function App() {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get("http://localhost:5001/api/filmler") // Burayı Postman'le çalışın
        .then((response) => {
          setMovieList(response.data);
          // Bu kısmı log statementlarıyla çalışın
          // ve burdan gelen response'u 'movieList' e aktarın
        })
        .catch((error) => {
          console.error("Sunucu Hatası", error);
        });
    };
    FilmleriAl();
  }, []);

  const KaydedilenlerListesineEkle = (id) => {
    if (!saved.includes(id)) {
      setSaved([...saved, id]);
    }
    // Burası esnek. Aynı filmin birden fazla kez "saved" e eklenmesini engelleyin
  };

  return (
    <Router>
      <div>
        <KaydedilenlerListesi
          list={[
            saved,
            /* Burası esnek */
          ]}
        />
        <Switch>
          <Route path="/" exact>
            <FilmListesi movies={movieList} />
          </Route>
          <Route path="/filmler/:id">
            <Film id={movieList.id} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

import React, { useEffect, useState } from "react";

import ChooseCountry from "../components/ChooseCountry";
import DataGridCountry from "../components/DataGridCountry";
import { Country } from "../models/country";
import { api, EndPoints } from "../http-client/config";
import { get, store } from "../utils/cache";
import { key } from "../config/localData";

const HomePage = () => {
  /* local states */
  const [countries, setCountries] = useState<Country[]>([]);
  const [localStorageCountries, setLocalStorageCountries] = useState<Country[]>(
    get(key.dev) ?? []
  );

  /* functions */
  const fetchCountries = async () => {
    const { data: fetchedCountries } = await api.get<Country[]>(EndPoints.all);
    setCountries(fetchedCountries);

    _removedCountriesAlreadySaved(fetchedCountries);
  };

  const getCountriesFromLocalStorage = () => {
    const countries = get(key.dev);
    if (!countries) return;

    setLocalStorageCountries(countries);
  };

  const handleSelectCountry = (country: Country) => {
    const newSavedCountries = [...localStorageCountries, country];
    setLocalStorageCountries(newSavedCountries);
    store(key.dev, newSavedCountries);
    setCountries(countries?.filter((c) => c.name !== country.name));
  };

  /* private function only for here */
  const _removedCountriesAlreadySaved = (allCountries: Country[]) => {
    if (localStorageCountries) {
      const filteredCountries = allCountries?.filter(
        (fetchedCountry) =>
          !localStorageCountries?.filter(
            (fromLocalStorageCountry) =>
              fromLocalStorageCountry.name === fetchedCountry.name
          ).length
      );
      setCountries(filteredCountries);
    }
  };

  /* life-cycle hook */
  useEffect(() => {
    fetchCountries();
    getCountriesFromLocalStorage();
  }, []);

  return (
    <>
      <ChooseCountry
        countries={countries}
        handleSelectCountry={handleSelectCountry}
      />
      <DataGridCountry countries={localStorageCountries} />
    </>
  );
};

export default HomePage;

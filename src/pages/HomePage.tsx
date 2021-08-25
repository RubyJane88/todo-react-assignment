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

  /* functions */
  const fetchCountries = async () => {
    const { data: fetchedCountries } = await api.get<Country[]>(EndPoints.all);
    setCountries(fetchedCountries);

    _removedCountriesAlreadySaved(fetchedCountries);
  };

  /* getting saved countries from localStorage */
  const getCountriesFromLocalStorage = () => {
    const countries: Country[] = get(key.dev);
    if (!countries) return;

    store(key.dev, countries);
  };

  const handleSelectCountry = (country: Country) => {
    /* nullish coalescing operator helps us to assign default
     values to null or undefined variables in Typescript*/
    const localStorageCountries: Country[] = get(key.dev) ?? [];
    const newSavedCountries = [...localStorageCountries, country];
    store(key.dev, newSavedCountries);
    setCountries(countries?.filter((c) => c.name !== country.name));
  };

  /* a private function that filters already saved countries after REST API call */
  const _removedCountriesAlreadySaved = (allCountries: Country[]) => {
    const localStorageCountries: Country[] = get(key.dev);

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
      <DataGridCountry />
    </>
  );
};

export default HomePage;

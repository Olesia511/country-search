import {
  Container,
  SearchForm,
  Section,
  Heading,
  Loader,
  CountryList,
} from 'components';
import { useEffect, useState } from 'react';
import { fetchByRegion } from '../service/country-service';
import { useSearchParams } from 'react-router-dom';

export const CountrySearch = () => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [regionCountries, setRegionCountries] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const region = searchParams.get('query');

    if (!region) {
      return;
    }
    async function getCountriesByRegion() {
      setIsLoading(true);
      try {
        const response  = await fetchByRegion(region);
        setRegionCountries(response);
      } catch (e) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getCountriesByRegion();
  }, [searchParams]);
  const handleSubmit = (val) => {
    setSearchParams({
      query: val
    });
  }
  console.log(query);
  return (
    <Section>
      <Container>
        {isLoading && <Loader /> }
        <SearchForm submit={handleSubmit} />
        {error && <Heading>Error!!! Somthing went wrong!</Heading>}
        <CountryList countries={regionCountries} />
      </Container>
    </Section>
  );
};

import { Container, CountryList, Heading, Loader, Section } from 'components';
import { useEffect, useState } from 'react';
import { getCountries } from 'service/country-service';

export const Home = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const arrCountries = async () => {
      setIsLoading(true);
      try {
        const data = await getCountries();
        setCountries(data);
        console.log(`data`, data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    arrCountries();
  }, []);

  return (
    <Section>
      <Container>
        {isLoading && <Loader />}
        {error && <Heading>ERROR...</Heading>}
        <CountryList countries={countries} />
      </Container>
    </Section>
  );
};

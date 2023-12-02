import { Section, Container, CountryInfo, Loader, Heading } from 'components';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchCountry } from 'service/country-service';
import { Link } from 'react-router-dom';
export const Country = () => {
  const { countryId } = useParams();
  const [country, setCountry] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const backLink = location?.state?.from ?? '/';
  useEffect(() => {
    const countryInfo = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCountry(countryId);
        setCountry(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    countryInfo();
  }, [countryId]);
  return (
    <Section>
      <div>
        <Link to={backLink}>Go Back</Link>
      </div>
      <Container>
        {isLoading && <Loader />}
        {error ? (
          <Heading>ERROR...{error}</Heading>
        ) : (
          <CountryInfo
            flag={country.flag}
            capital={country.capital}
            country={country.countryName}
            id={country.id}
            languages={country.languages}
            population={country.population}
          />
        )}
      </Container>
    </Section>
  );
};

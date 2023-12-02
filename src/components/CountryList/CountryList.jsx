import { Grid, GridItem } from 'components';
import { Link, useLocation } from 'react-router-dom';
import { Location } from 'react-router-dom';

export const CountryList = ({ countries }) => {
  const location = useLocation();
  return (
    <Grid>
      {countries.map(({ flag, country, id }) => {
        return (
          <GridItem key={id}>
            <Link to={`/country/${id}`} state={{ from: location }}>
              <img src={flag} alt={country} />
            </Link>
          </GridItem>
        );
      })}
    </Grid>
  );
};

import queryString from 'query-string'

const getUrlQueryString = (location: Location) => {
  const { search } = location;
  return queryString.parse(search);
}

export default getUrlQueryString;

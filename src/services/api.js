const getDataApi = () => {
  return fetch('https://rickandmortyapi.com/documentation/#get-all-characters')
    .then((response) => response.json())
    .then((data) => {
      const cleanData = data.results.map((characterApi) => {
        return {
          id: characterApi.id,
          name: characterApi.name,
          image: characterApi.image,
          species: characterApi.species,
        };
      });
      return cleanData;
    });
};
export default getDataApi;
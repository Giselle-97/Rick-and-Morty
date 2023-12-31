const getDataApi = () => {
  return fetch('https://rickandmortyapi.com/api/character')
    .then((response) => response.json())
    .then((data) => {
      const cleanData = data.results
        .map((characterApi) => {
          return {
            id: characterApi.id,
            name: characterApi.name,
            image: characterApi.image,
            species: characterApi.species,
            status: characterApi.status,
            origin: characterApi.origin.name,
            episode: characterApi.episode,
          };
        })
        .sort((a, b) => a.name.localeCompare(b.name));
      return cleanData;
    });
};
export default getDataApi;

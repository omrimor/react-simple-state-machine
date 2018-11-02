const URL = 'http://localhost:4001/starwars';

const getAll = async () => {
  try {
      const response = await fetch(URL);
      return await response.json();
    } catch (e) {
      console.log('API [getAll] Error: ', e)
    }
};

const updateById = async (id, data) => {
  try {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(`${URL}/${id}`, options);
    return await response.json();
  } catch (e) {
      console.log('API [updateById] Error: ', e)
    }
};

export { getAll, updateById };

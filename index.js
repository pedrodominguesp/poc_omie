const axios = require('axios');
const OMIE_API_URL = 'https://app.omie.com.br/api/v1/';

async function getOportunidades() {
    const response = await axios.get(`${OMIE_API_URL}crm/oportunidades/`, {
      headers: {
        'Content-Type': 'application/json',
        'app_key': '1062092937906',
        'app_secret': '17c7cd7495cf4653507cfe56e18b39e1',
        'call':'ListarOportunidades',
        param: [
            { pagina: 1, registros_por_pagina: 20 }
          ]
      },
      data: {
        call: 'ListarOportunidades',
        app_key: '38333295000',
        app_secret: '17c7cd7495cf4653507cfe56e18b39e1',
        param: [
          { pagina: 1, registros_por_pagina: 20 }
        ]
      }
    });
    console.log("XXXXX", response.data);
    return response.data;
}
getOportunidades();
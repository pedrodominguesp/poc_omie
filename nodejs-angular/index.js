const express = require("express");
const bodyParser = require('body-parser');
const axios = require('axios');
const request = require("request");

var app = express();
app.use(bodyParser.json());

// coloque seu app key e secret aqui, esse aqui é apenas um exemplo
const OMIE_APP_KEY = '1062092937906';
const OMIE_APP_SECRET = '17c7cd7495cf4653507cfe56e18b39e1';
const COD_SOLUCAO_MELHORIAS = 1872865858;
const COD_SOLUCAO_PROJETOS = 2014660108;
app.get("/api/clientes", async function (req, res) {

    const credentials = {
      "app_key": OMIE_APP_KEY,
      "app_secret": OMIE_APP_SECRET
    }
    const ListarOportunidades = {
      "call": "ListarOportunidades",
      "param": [{
        "pagina": 1,
        "registros_por_pagina": 400,
        "apenas_importado_api": "N",
        "mes_previsao_inicial":01,
        "ano_previsao_inicial":2023,
        "mes_previsao_final":12,
        "ano_previsao_final":2023,
        "status":"A"
      }],
      ...credentials
    }
  
    // const ListarSolucoes = {
    //   "call": "ListarSolucoes",
    //   "param": [{
    //     "pagina":1,
    //     "registros_por_pagina":100
    //   }],
    //   ...credentials
    // };
  
    const ListarOS = {
      "call": "ListarOS",
      "param": [{
        "pagina":1,
        "registros_por_pagina":362,
        "filtrar_por_cliente":1876596552
      }],
      ...credentials
    };
  
    const ListarClientes = {
      "call": "ListarClientes",
      "param": [{
        "pagina":1,
        "registros_por_pagina":400
      }],
      ...credentials
    };

    // const financas = {
    //   "call":"ObterListaFinancas",
    //   "param":[{}]
    // }

    // const ListarCategoria = {
    //   "call": "ListarCategorias",
    //   "param": [{
    //     "pagina":1,
    //     "registros_por_pagina":235,
    //   }],
    //   ...credentials
    // };

    // const resumoFinanceiro = {
    //   "call": "ObterResumoFinancas",
    //   "param": [{
    //     "lApenasResumo":"true",
    //     "lExibirCategoria":"true"
    //   }],
    //   ...credentials
    // };

    const ConsultarConta = {
      "call": "ConsultarConta",
      "param": [{
        "nCod": "2019520194"
      }],
      ...credentials
    };

    // const oportunidades = await axios.post('https://app.omie.com.br/api/v1//crm/oportunidades/', ListarOportunidades);

    //  const osFilteredByTemp = oportunidades.data.cadastros.filter(oportunidade => {
    //   return oportunidade.previsaoTemp.nTemperatura === 90
    // });

    // const osMelhorias = osFilteredByTemp.filter(os => {
    //   return os.identificacao.nCodSolucao === COD_SOLUCAO_MELHORIAS;
    // });

    // const consultarConta =  await axios.post('https://app.omie.com.br/api/v1/crm/contas/', ConsultarConta);
    // console.log('contas', consultarConta.data);
  
    // const osProjetos = osFilteredByTemp.filter(os => {
    //   return os.identificacao.nCodSolucao === COD_SOLUCAO_PROJETOS;
    // });
  
    // const osOutrasSolucoes = osFilteredByTemp.filter(os => {
    //   return os.identificacao.nCodSolucao !== COD_SOLUCAO_PROJETOS && os.identificacao.nCodSolucao !== COD_SOLUCAO_MELHORIAS;
    // });
    
    // console.log('OPORTUNIDADES MELHORIAS', osMelhorias);
    // console.log('OPORTUNIDADES PROJETOS', osProjetos.length);
    // console.log('OPORTUNIDADES OUTROS', osOutrasSolucoes.length);
  
    const ordemDeServico = await axios.post('https://app.omie.com.br/api/v1/servicos/os/', ListarOS);
    const os2944 = ordemDeServico.data.osCadastro.filter(os => {
     if(os.Observacoes.cObsOS){
      return os.Observacoes.cObsOS.includes('2944')
     }
    }); 

    const osFiltrada = os2944.map(objeto => {
      const reducao = 6.15 / 100; // 6% convertido em decimal
      let valor = objeto.Parcelas[0].nValor *  (1 - reducao);
      return Number(valor.toFixed(2));
    });

    console.log('xxx', osFiltrada)

    const somaValores =  osFiltrada.reduce(function(soma, i) {
      return soma + i;
  });

  const resultadoFinal = Number(somaValores).toFixed(2);

    console.log('SOMA DOS VALORES', resultadoFinal);
    // const clientes = await axios.post('https://app.omie.com.br/api/v1/geral/clientes/', ListarClientes)
    // const listarCategoria = await axios.post('https://app.omie.com.br/api/v1/geral/categorias/', ListarCategoria)
    // console.log('listarCategoria', listarCategoria.data);
// const ResumoFinanceiro = await axios.post('https://app.omie.com.br/api/v1/financas/resumo/', resumoFinanceiro)

    // const solucoes = await axios.post('https://app.omie.com.br/api/v1/crm/solucoes/', bodyParamsSolucoes);
    // // console.log("SOLUCOES", solucoes.data);
  
   
  
 
  res.json(os2944);
  
   
});
// });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

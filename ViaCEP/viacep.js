let loading = false;
let error = null;
let data = null;

function setLoading(v) { loading = v; }
function setError(v) { error = v; }
function setData(v) { data = v; }

async function fetchCepData (cep, uf, localidade, logradouro) {
    setLoading (true);
    setError (null);
    setData (null); 
    
    const resultDivCep = document.getElementById ("resultadoDiv");
    resultDivCep.innerHTML = "Carregando...";

    try {
        let url = "";

        if (cep && cep.trim() !== "") {
        url = `https://viacep.com.br/ws/${cep}/json/`; 
        }

        else if (uf && localidade && logradouro) {
        url = `https://viacep.com.br/ws/${uf}/${localidade}/${logradouro}/json/`; 
        }

        else {
            resultDivCep.innerHTML = "Preencha um dos campos";
            return;
        }

        const response = await fetch (url);
        const json = await response.json();

        if (json.erro || (Array.isArray(json) && json.length === 0)) {
            resultDivCep.innerHTML = "Endereço não encontrado";
        }
    
        else {
            if (Array.isArray(json)) {
                resultDivCep.innerHTML = json.map (item => 
                    `
                    <p>CEP: ${item.cep}</p>
                    <p>UF: ${item.uf}</p>
                    <p>Localidade: ${item.localidade}</p>
                    <p>Logradouro: ${item.logradouro}</p>
                    <hr>
                    `
                ).join ("");
            }

            else {
                resultDivCep.innerHTML = 
                `
                <p>CEP: ${json.cep}</p>
                <p>UF: ${json.uf}</p>
                <p>Localidade: ${json.localidade}</p>
                <p>Logradouro: ${json.logradouro}</p>
                <hr>
                `;
            }
        }

    }

    catch (err) {
    resultDivCep.innerHTML = "Erro ao pesquisar";
    console.error(err);
    }

    finally {
        setLoading(false);
    }
}

function buscarCep () {
    
    const cep = document.getElementById ("pesquisaCEP").value;
    fetchCepData(cep);
}

function limparCep () {
    const cepInput = document.getElementById ("pesquisaCEP");
    cepInput.value = '';
    
    const resultDivCep = document.getElementById ("resultadoDiv");
    resultDivCep.innerHTML = '';
}

function buscarEndereço () {
    const uf = document.getElementById ("pesquisaUF").value;
    const localidade = document.getElementById ("pesquisaLocalidade").value;
    const logradouro = document.getElementById ("pesquisaLogradouro").value;
    fetchCepData(null, uf, localidade, logradouro);
}

function limparEndereço () {
    const ufInput = document.getElementById ("pesquisaUF");
    const localidadeInput = document.getElementById ("pesquisaLocalidade");
    const logradouroInput = document.getElementById ("pesquisaLogradouro");

    ufInput.value = '';
    localidadeInput.value = '';
    logradouroInput.value = '';

    const resultDivCep = document.getElementById ("resultadoDiv");
    resultDivCep.innerHTML = '';
}




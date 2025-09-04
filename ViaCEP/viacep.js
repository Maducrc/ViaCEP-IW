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
    resultDivCep.innerHTML = "<div class='carregando'>Carregando...</div>";

    try {
        let url = "";

        if (cep && cep.trim() !== "") {
        url = `https://viacep.com.br/ws/${cep}/json/`; 
        }

        else if (uf && localidade && logradouro) {
        url = `https://viacep.com.br/ws/${uf}/${localidade}/${logradouro}/json/`; 
        }

        else {
            resultDivCep.innerHTML = "<div class='carregando'>Preencha um dos campos</div>";
            return;
        }

        const response = await fetch (url);
        const json = await response.json();

        if (json.erro || (Array.isArray(json) && json.length === 0)) {
            resultDivCep.innerHTML = "<div class='carregando'>Endereço não encontrado</div>";
        }
    
        else {
            if (Array.isArray(json)) {
                resultDivCep.innerHTML = json.map (item => 
                    `
                    <p><strong>CEP:</strong> ${item.cep}</p>
                    <p><strong>UF:</strong> ${item.uf}</p>
                    <p><strong>Localidade:</strong> ${item.localidade}</p>
                    <p><strong>Logradouro:</strong> ${item.logradouro}</p>
                    <hr style="border-top: 1px solid #d8b7dd;">
                    `
                ).join ("");
            }

            else {
                resultDivCep.innerHTML = 
                `
                <p><strong>CEP:</strong> ${json.cep}</p>
                <p><strong>UF:</strong> ${json.uf}</p>
                <p><strong>Localidade:</strong> ${json.localidade}</p>
                <p><strong>Logradouro:</strong> ${json.logradouro}</p>
                <hr>
                `;
            }
        }

    }

    catch (err) {
    resultDivCep.innerHTML = "<div class='carregando'>Erro ao pesquisar</div>";
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

function pesquisarPorCep() {
    document.getElementById("formCep").style.display = "block";
    document.getElementById("formEndereco").style.display = "none";
    document.getElementById("resultadoDiv").innerHTML = "";
}

function pesquisarPorEndereco() {
    document.getElementById("formCep").style.display = "none";
    document.getElementById("formEndereco").style.display = "block";
    document.getElementById("resultadoDiv").innerHTML = "";
}



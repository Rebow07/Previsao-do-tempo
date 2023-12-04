const chaveDaApi = "9a707d9e50da4b0b94b172642232311";
const botaoDeBusca = document.querySelector(".btn-busca");
const inputDeBusca = document.getElementById("input-busca");

botaoDeBusca.addEventListener("click", async () => {
    await buscarECarregarDados();
});

inputDeBusca.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        await buscarECarregarDados();
    }
});

async function buscarDadosDaCidade(cidade) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${chaveDaApi}&q=${cidade}&aqi=no&lang=pt`;
    const resposta = await fetch(apiUrl);

    if (resposta.status !== 200) return;

    const dados = await resposta.json();
    return dados;
}

async function buscarECarregarDados() {
    const cidade = inputDeBusca.value.trim();

    if (!cidade) return;

    const dados = await buscarDadosDaCidade(cidade);

    if (!dados) {
        console.error('Não foi possível encontrar dados para a cidade.');
        return;
    }

    preencherDadosNaTela(dados, cidade);
}

function preencherDadosNaTela(dados, cidade) {
    const temperatura = dados.current.temp_c;
    const condicao = dados.current.condition.text;
    const humidade = dados.current.humidity;
    const velocidadeDoVento = dados.current.wind_kph;
    const iconeCondicao = dados.current.condition.icon;

    document.getElementById("cidade").textContent = cidade;
    document.getElementById("temperatura").textContent = `${temperatura} °C`;
    document.getElementById("condicao").textContent = condicao;
    document.getElementById("humidade").textContent = `${humidade}%`;
    document.getElementById("velocidade-do-vento").textContent = `${velocidadeDoVento} km/h`;
    document.getElementById("icone-condicao").setAttribute("src", iconeCondicao);
}

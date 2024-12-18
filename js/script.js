class Atleta {
    constructor() {
        this.nomes = [];
        this.pais = [];
        this.sexos = [];
        this.temposClassif = [];
        this.temposFinal = [];
    }

    adicionarAtleta(nome, pais, sexo, tempoClassif, tempoFinal) {
        this.nomes.push(nome);
        this.pais.push(pais);
        this.sexos.push(sexo);
        this.temposClassif.push(tempoClassif);
        this.temposFinal.push(tempoFinal);
    }

    consultarPorPais(paisConsulta) {
        const atletas = this.nomes
            .map((nome, index) => ({
                nome,
                sexo: this.sexos[index],
                pais: this.pais[index]
            }))
            .filter(atleta => atleta.pais === paisConsulta);

        return atletas.length
            ? atletas.map(atleta => `- ${atleta.nome} (${atleta.sexo === "M" ? "Masculino" : "Feminino"})`).join("<br>")
            : "Nenhum atleta encontrado.";
    }

    mediaTempos() {
        let homens = 0, mulheres = 0, somaHomens = 0, somaMulheres = 0;

        for (let i = 0; i < this.nomes.length; i++) {
            if (this.sexos[i] === "M") {
                somaHomens += this.temposFinal[i];
                homens++;
            } else {
                somaMulheres += this.temposFinal[i];
                mulheres++;
            }
        }

        return {
            mediaHomens: homens ? (somaHomens / homens).toFixed(2) : "Nenhum homem registrado",
            mediaMulheres: mulheres ? (somaMulheres / mulheres).toFixed(2) : "Nenhuma mulher registrada"
        };
    }

    melhorTempo() {
        let melhor = Infinity, nomeMelhor = "", sexoMelhor = "", paisMelhor = "";

        for (let i = 0; i < this.nomes.length; i++) {
            const menorTempo = Math.min(this.temposClassif[i], this.temposFinal[i]);
            if (menorTempo < melhor) {
                melhor = menorTempo;
                nomeMelhor = this.nomes[i];
                sexoMelhor = this.sexos[i];
                paisMelhor = this.pais[i];
            }
        }

        return melhor < Infinity
            ? `Melhor Tempo: ${melhor}s<br>Nome: ${nomeMelhor}<br>Sexo: ${sexoMelhor === "M" ? "Masculino" : "Feminino"}<br>País: ${paisMelhor}`
            : "Nenhum atleta registrado.";
    }
}

// Instância
const atletas = new Atleta();

// Formulário de adição
document.getElementById("formAtleta").addEventListener("submit", event => {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const pais = document.getElementById("pais").value;
    const sexo = document.getElementById("sexo").value;
    const tempoClassif = parseFloat(document.getElementById("tempoClassif").value);
    const tempoFinal = parseFloat(document.getElementById("tempoFinal").value);

    atletas.adicionarAtleta(nome, pais, sexo, tempoClassif, tempoFinal);
    alert("Atleta adicionado com sucesso!");
    event.target.reset();
});

// Consulta por país
document.getElementById("btnConsultar").addEventListener("click", () => {
    const paisConsulta = document.getElementById("consultaPais").value;
    const resultadosDiv = document.getElementById("resultados");

    if (paisConsulta) {
        resultadosDiv.innerHTML = `<h2>Resultados:</h2><p>${atletas.consultarPorPais(paisConsulta)}</p>`;
    } else {
        alert("Selecione um país para consultar.");
    }
});

// Exibir média de tempos
document.getElementById("btnMediaTempos").addEventListener("click", () => {
    const resultadosDiv = document.getElementById("resultados");
    const medias = atletas.mediaTempos();
    resultadosDiv.innerHTML = `
        <h2>Média de Tempos:</h2>
        <p>Homens: ${medias.mediaHomens}</p>
        <p>Mulheres: ${medias.mediaMulheres}</p>
    `;
});

// Exibir melhor tempo
document.getElementById("btnMelhorTempo").addEventListener("click", () => {
    const resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = `
        <h2>Melhor Tempo:</h2>
        <p>${atletas.melhorTempo()}</p>
    `;
});
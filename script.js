const input = document.querySelector('.new-tarefa');
const adicionar = document.querySelector('.add-tarefa');
const tarefas = document.querySelector('.tarefa');
const dataTela = document.querySelector('.data')

function mostraData() {
    const data = new Date();
    dataTela.textContent += data.toLocaleDateString("pt-BR", { dateStyle: "full" });
}

function criaTarefa(inp, concluida) {
    const div = document.createElement('div');
    div.classList.add('div-botoes');

    const li = document.createElement('li');
    li.classList = 'li-tarefa';
    console.log(inp);
    li.innerHTML = `<p class="li-texto">${inp}</p>`;

    if (concluida) {
        li.classList = 'li-tarefa li-concluida';
    }

    criaBotaoExcluir(div);
    criaBotaoConcluir(div);
    li.appendChild(div);
    tarefas.appendChild(li);
    limpaInput();
    salvarTarefa();
}

function criaBotaoExcluir(li) {
    //Cria o botão para apagar tarefa
    const botao = document.createElement('button');
    botao.classList.add('apagar');
    botao.title = 'Apagar';

    const imagem = document.createElement('img');
    imagem.src = 'images/excluir.png';
    imagem.classList.add('imagem-excluir');

    botao.appendChild(imagem);
    li.appendChild(botao);
}

function criaBotaoConcluir(li) {
    //Cria o botão para concluir tarefa
    const botaoConcluir = document.createElement('button');
    botaoConcluir.classList.add('concluir');
    botaoConcluir.title = 'Concluir';

    const imagemConcluir = document.createElement('img');
    imagemConcluir.src = 'images/concluir.png';
    imagemConcluir.classList.add('imagem-concluir');

    botaoConcluir.appendChild(imagemConcluir);
    li.appendChild(botaoConcluir);

}

function salvarTarefa() {
    //Salva Tarefa no LocalStorage
    const litarefas = document.querySelectorAll('li');
    const listaTarefas = [];

    for (let tarefas of litarefas) {
        let tarefaC = tarefas.textContent;
        tarefaC = tarefaC.replace('Apagar', ' ').trim();
        listaTarefas.push({ texto: tarefaC, concluida: tarefas.classList.contains('li-concluida') });
    }

    const TarefasJSON = JSON.stringify(listaTarefas);
    localStorage.setItem('tarefasLS', TarefasJSON);

}

function carregaTarefas() {
    //Carrega tarefas contidas no LocalStorage
    const tarefas = localStorage.getItem('tarefasLS');
    const listaTarefas = JSON.parse(tarefas);

    for (let tarefa of listaTarefas) {
        criaTarefa(tarefa.texto, tarefa.concluida);
        console.log(tarefa);
    }

}

document.addEventListener('click', function (e) {
    //Identifica eventos de clique para apagar ou concluir uma tarefa
    const btn = e.target;

    if (btn.classList.contains('apagar')) {
        apagarTarefa(btn);
    }
    else if (btn.classList.contains('concluir')) {
        concluirtarefa(btn);
    }
});

function apagarTarefa(btn){
    console.log('botao apagar clicado!');
    const li = btn.closest(".li-tarefa");
    li.remove();
    salvarTarefa();
}

function concluirtarefa(btn) {
    console.log('botao concluir clicado!');
    const li = btn.closest('.li-tarefa');
    li.classList.add('li-concluida');
    salvarTarefa();
}

function limpaInput() {
    //Limpa o input para que uo usuário não precise apagar antes de escrever uma nova tarefa
    input.value = '';
    input.focus();
}

input.addEventListener('keypress', function (e) {
    //Permite que o botão enter seja entendido como o clique de adicionar tarefa
    if (e.keyCode === 13) {
        if (!input.value) {
            alert('Digite algo para continuar!');
            return;
        } else {
            criaTarefa(input.value);
        }
    }
});

adicionar.addEventListener('click', function () {
    //Impede que uma tarefa seja enviada sem texto
    if (!input.value) {
        alert('Digite algo para continuar!');
        return;
    }
    criaTarefa(input.value);
});
carregaTarefas();
mostraData();

let score = 0;
let questionIndex = { chemistry: 0, physics: 0, biology: 0 };

const questions = {
  chemistry: [
    {
      title: "Mistério Químico 1",
      content: "Escolha o reagente correto para gerar uma reação segura e estável.",
      hint: "Lembre-se: uma base fraca pode ser mais segura!",
      choices: [
        { text: "Água e Sódio", correct: false },
        { text: "Ácido e Base Fraca", correct: true },
        { text: "Peróxido e Água", correct: false }
      ]
    },
    {
      title: "Mistério Químico 2",
      content: "Qual composto é necessário para uma reação exotérmica controlada?",
      hint: "Alguns elementos reagem melhor em condições seguras.",
      choices: [
        { text: "Sódio", correct: false },
        { text: "Cloreto de Sódio", correct: true },
        { text: "Magnésio", correct: false }
      ]
    }
  ],
  physics: [
    {
      title: "Desafio de Física 1",
      content: "Equilibre o sistema ajustando a intensidade da força.",
      hint: "Forças moderadas podem evitar desequilíbrios!",
      choices: [
        { text: "Força Fraca", correct: false },
        { text: "Força Moderada", correct: true },
        { text: "Força Forte", correct: false }
      ]
    },
    {
      title: "Desafio de Física 2",
      content: "Escolha a direção da força para mover um objeto para cima.",
      hint: "Considere a direção da gravidade.",
      choices: [
        { text: "Para baixo", correct: false },
        { text: "Para cima", correct: true },
        { text: "Para o lado", correct: false }
      ]
    }
  ],
  biology: [
    {
      title: "Quebra-Cabeça Biológico 1",
      content: "Escolha a base do DNA para formar o par correto.",
      hint: "Bases complementares são a chave para pares perfeitos.",
      choices: [
        { text: "Adenina e Timina", correct: true },
        { text: "Citosina e Guanina", correct: true },
        { text: "Uracila e Timina", correct: false }
      ]
    },
    {
      title: "Quebra-Cabeça Biológico 2",
      content: "Qual organela é responsável pela respiração celular?",
      hint: "Pense em 'energia' para a célula.",
      choices: [
        { text: "Mitocôndria", correct: true },
        { text: "Ribossomo", correct: false },
        { text: "Núcleo", correct: false }
      ]
    }
  ]
};

function updateScore(points) {
  score += points;
  document.getElementById("score").innerText = score;
}

function startPuzzle(sector) {
  const currentQuestion = questions[sector][questionIndex[sector]];
  const { title, content, hint, choices } = currentQuestion;

  document.getElementById("dialog-title").innerText = title;
  document.getElementById("dialog-content").innerText = content;
  const choicesContainer = document.getElementById("choices");
  choicesContainer.innerHTML = "";

  // Exibir dica do Professor Elemento
  document.getElementById("character-dialog").innerText = hint;

  // Adicionar as opções de escolha
  choices.forEach(choice => {
    const button = document.createElement("button");
    button.innerText = choice.text;
    button.onclick = () => checkAnswer(choice.correct, sector);
    choicesContainer.appendChild(button);
  });

  // Exibir o diálogo e tocar som de clique
  document.getElementById("dialog-box").style.display = "block";
  document.getElementById("click-sound").play();
}

function checkAnswer(isCorrect, sector) {
  if (isCorrect) {
    document.getElementById("success-sound").play();
    updateScore(10);
    document.getElementById("character-dialog").innerText = "Muito bem! Resposta correta!";
    alert("Resposta Correta! Você ganhou 10 pontos.");
    
    // Avançar para a próxima pergunta
    questionIndex[sector]++;
    
    // Verificar se há mais perguntas para o setor
    if (questionIndex[sector] < questions[sector].length) {
      startPuzzle(sector);
    } else {
      alert("Você completou todas as perguntas deste setor!");
      questionIndex[sector] = 0;  // Reinicia o índice para futuras jogadas
      closeDialog();
    }
  } else {
    document.getElementById("character-dialog").innerText = "Essa não! Tente outra resposta.";
    alert("Resposta Incorreta! Tente outra opção.");
  }
}

function closeDialog() {
  document.getElementById("dialog-box").style.display = "none";
  document.getElementById("character-dialog").innerText = "Escolha outro setor para continuar!";
}

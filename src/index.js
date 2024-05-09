const player1 = {
    nome: 'Mario',
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0,
}


const player2 = {
    nome: 'Luigi',
    velocidade: 3,
    manobrabilidade: 4,
    poder: 4,
    pontos: 0,
}

async function logRollResult(characterName, block, diceResult, att) {
    console.log(`${characterName} 🎲 Rolou um dado de ${block} ${diceResult} + ${att} = ${diceResult + att} `)
}


async function rollDice() {
   return Math.floor( Math.random() * 6) + 1;
};


async function getBlock () {
    let random = Math.random()
    let result 

    switch (true) {
        case random < 0.33:
            result = 'Reta'
            break;
        case random < 0.66:
             result = 'Curva'
             break;    
        default:
            result = 'Confronto'
            break;
    }
    return result
}


async function raceEgine (character1, character2) {
    for(let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`)

        let block = await getBlock()
        console.log(`Bloco: ${block} `)

        let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();


    let totalSkill1 = 0;
    let totalSkill2 = 0;

    if(block == 'Reta'){

        totalSkill1 = diceResult1 + character1.velocidade;
        totalSkill2 = diceResult2 + character2.velocidade;

        await logRollResult(character1.nome, "Velocidade", diceResult1, character1.velocidade);
        await logRollResult(character2.nome, "Velocidade", diceResult2, character2.velocidade)
    }
    if(block == 'Curva'){
        totalSkill1 = diceResult1 + character1.manobrabilidade;
        totalSkill2 = diceResult2 + character2.manobrabilidade;

        await logRollResult(character1.nome, "Manobrabilidade", diceResult1, character1.manobrabilidade)
        await logRollResult(character2.nome, "Manobrabilidade", diceResult2, character2.manobrabilidade)
    }
    if(block == 'Confronto'){
        let powerResult1 = diceResult1 + character1.poder;
        let powerResult2 = diceResult2 + character2.poder;

        console.log(`${character1.nome} Confrontou ${character2.nome}! 🥊`)

        await logRollResult(character1.nome, "Poder", diceResult1, character1.poder)
        await logRollResult(character2.nome, "Poder", diceResult2, character2.poder)

        if(powerResult1 > powerResult2){
            if(character2.pontos > 0){
                console.log(`${character1.nome} Venceu o confronto! ${character2.nome} perdeu 1 ponto 🐢 `)
                character2.pontos--
            }
        }

        if(powerResult2 > powerResult1) {
            if(character1.pontos > 0){
                console.log(`${character2.nome} Venceu o confronto! ${character1.nome} perdeu 1 ponto 🐢`)
                character1.pontos--
            }


        } if ( powerResult2 === powerResult1) {
                console.log('Confronto Empatado! Nenhum ponto foi perdido')
        }

        
    }

    if(totalSkill1 > totalSkill2){
        console.log(`${character1.nome} Marcou um ponto!`);
        character1.pontos++;
    }else if (totalSkill2 > totalSkill1){
        console.log(`${character2.nome} Marcou um ponto!`);
        character2.pontos++;
    }


    console.log('----------------------------')

    }
}


async function declareWinner(character1, character2) {
console.log('Resultado Final:')
console.log(`${character1.nome}: ${character1.pontos} ponto(s)`)
console.log(`${character2.nome}: ${character2.pontos} ponto(s)`)

if(character1.pontos > character2.pontos) {
    console.log(`${character1.nome} venceu a corrida! parabéns! 🏆`);
} else if(character2.pontos > character1.pontos) {
    console.log(`${character2.nome} venceu a corrida! parabéns! 🏆`);
} else {
    console.log('A corrida terminou em Empate')
}
}


(async function main (){
    console.log(`🏁🚨 Corrida começando entre ${player1.nome} e ${player2.nome}... \n `);

    await raceEgine(player1, player2);
    await declareWinner(player1, player2)
})();


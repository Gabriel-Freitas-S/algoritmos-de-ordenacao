// Importa funções necessárias e a biblioteca readline para interação com o usuário
const { generateUniqueNumbersInWorker, saveToFile, processQuantities } = require('./numberGenerator');
const readline = require('readline');

// Configura a interface de readline para receber entrada e fornecer saída via console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Interage com o usuário para obter a quantidade de números
rl.question('Quantos números deseja gerar (use vírgula para múltiplas quantidades)? ', async (answer) => {
    // Divide a resposta do usuário em múltiplas quantidades, se houver, e converte para inteiro
    const quantidades = answer.split(',').map(q => parseInt(q.trim(), 10));
    // Verifica se alguma quantidade inserida é inválida (não é número ou é menor ou igual a zero)
    const invalidInput = quantidades.some(q => isNaN(q) || q <= 0);
    if (invalidInput) {
        console.log('Por favor, insira números válidos separados por vírgula.');
        rl.close();
        return;
    }
    try {
        // Para cada quantidade fornecida, gera números únicos em diferentes ordens
        for (const quantidade of quantidades) {
            // Ordem Aleatória
            const numerosAleatorios = await generateUniqueNumbersInWorker(quantidade, 'aleatorio');
            saveToFile(numerosAleatorios, quantidade, 'aleatoria');

            // Ordem Aleatória (Dobro)
            const numerosAleatoriosDobro = await generateUniqueNumbersInWorker(quantidade, 'aleatorio_dobro');
            saveToFile(numerosAleatoriosDobro, quantidade, 'aleatorio_dobro');

            // Ordem Decrescente
            const decrescente = numerosAleatorios.slice().sort((a, b) => b - a);
            saveToFile(decrescente, quantidade, 'decrescente');
        }
    } catch (error) {
        // Caso ocorra algum erro na geração de números, exibe uma mensagem de erro
        console.error('Erro na geração de números:', error);
    } finally {
        // Fecha a interface readline após a operação ser finalizada (com sucesso ou erro)
        rl.close();
    }
});
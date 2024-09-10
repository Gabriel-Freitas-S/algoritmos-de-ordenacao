const fs = require('fs'); // Importa o módulo do sistema de arquivos
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads'); // Importa funcionalidades de worker_threads
const path = require('path'); // Importa funcionalidades para manipulação de caminhos de arquivos

// Função para salvar os números gerados em um arquivo JSON
const saveToFile = (numeros, quantidade, forma) => {
    const jsonData = JSON.stringify({ numbers: numeros }, null, 2); // Converte os números para uma string JSON dentro do objeto "numbers"
    const dir = path.join(__dirname, 'amostras'); // Define o diretório "amostras"
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir); // Cria o diretório "amostras" se ele não existir
    }
    const filename = path.join(dir, `${quantidade}_${forma}.json`); // Define o caminho completo do arquivo dentro do diretório "amostras"
    fs.writeFile(filename, jsonData, (err) => { // Salva os dados JSON no arquivo
        if (err) {
            console.error('Erro ao salvar o arquivo:', err); // Imprime o erro, se ocorrer
        } else {
            console.log(`Números gerados e salvos em ${filename}`); // Confirmação de sucesso
        }
    });
};

// Código executado quando em um worker thread
if (!isMainThread) {
    const { quantidade, max } = workerData; // Obtém os dados passados pelo parent thread
    const numeros = new Set(); // Usa um Set para garantir unicidade
    while (numeros.size < quantidade) { // Gera números únicos até atingir a quantidade desejada
        numeros.add(Math.floor(Math.random() * max) + 1); // Adiciona um número aleatório ao Set
    }
    parentPort.postMessage([...numeros]); // Envia os números gerados de volta ao parent thread
} else {
    // Função para gerar números únicos em uma thread de trabalhador
    const generateUniqueNumbersInWorker = (quantidade, forma = 'aleatorio') => {
        var max;
        if (forma === 'aleatorio_dobro') {
            max = quantidade * 2; // Define o valor máximo para forma "aleatorio_dobro"
        } else {
            max = quantidade; // Define o valor máximo para forma padrão ("aleatorio")
        }
        return new Promise((resolve, reject) => { // Retorna uma promessa
            const worker = new Worker(__filename, { // Cria um novo worker thread
                workerData: { quantidade, max } // Passa os dados necessários para o worker
            });
            worker.on('message', (result) => resolve(result)); // Resolve a promessa com os resultados do worker
            worker.on('error', (error) => reject(error)); // Rejeita a promessa em caso de erro
            worker.on('exit', (code) => { // Verifica o código de saída do worker
                if (code !== 0)
                    reject(new Error(`Worker stopped with exit code ${code}`)); // Rejeita a promessa se houver um erro de saída
            });
        });
    };

    // Função para processar múltiplas quantidades separadas por vírgula
    const processQuantities = async (quantidadesStr, forma) => {
        const quantidades = quantidadesStr.split(',').map(q => parseInt(q.trim(), 10)); // Converte a string de quantidades em um array de números
        for (const quantidade of quantidades) {
            try {
                const numeros = await generateUniqueNumbersInWorker(quantidade, forma); // Gera os números para cada quantidade
                saveToFile(numeros, quantidade, forma); // Salva os números gerados no arquivo correspondente
            } catch (error) {
                console.error('Erro ao gerar ou salvar os números:', error); // Imprime o erro, se ocorrer
            }
        }
    };

    // Exporta as funções para uso em outros módulos
    module.exports = { generateUniqueNumbersInWorker, saveToFile, processQuantities };
}
const fs = require('fs');
const path = require('path');
const { setFlagsFromString } = require('v8');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Configurar o tamanho do heap de memória
setFlagsFromString('--max-old-space-size=4096');

const algoritmos = {
    bubbleSort: require('./algoritmos/bubbleSort'),
    bucketSort: require('./algoritmos/bucketSort'),
    countingSort: require('./algoritmos/countingSort'),
    heapSort: require('./algoritmos/heapSort'),
    insertionSort: require('./algoritmos/insertionSort'),
    mergeSort: require('./algoritmos/mergeSort'),
    quickSort: require('./algoritmos/quickSort'),
    radixSort: require('./algoritmos/radixSort'),
    selectionSort: require('./algoritmos/selectionSort')
};

const TIMEOUT = 120000; // 2 minutos em milissegundos

/**
 * Função para carregar números de um arquivo JSON
 * @param {string} filename - Caminho do arquivo JSON
 * @returns {Promise<Number[]>} - Promessa que resolve com um array de números
 */
const loadFromFile = (filename) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(JSON.parse(data).numbers);
        });
    });
};

/**
 * Função para executar o algoritmo com um limite de tempo (timeout)
 * @param {Function} algorithm - Algoritmo a ser executado
 * @param {Number[]} numbers - Conjunto de números a serem ordenados
 * @param {Number} timeout - Tempo limite em milissegundos
 * @returns {Promise<Number[]>} - Promessa que resolve com o resultado da ordenação
 */
const runWithTimeout = (algorithm, numbers, timeout) => {
    return new Promise((resolve, reject) => {
        let timedOut = false;
        const timer = setTimeout(() => {
            timedOut = true;
            reject(new Error('Timeout'));
        }, timeout);

        try {
            const result = algorithm(numbers);
            clearTimeout(timer);
            if (!timedOut) {
                resolve(result);
            }
        } catch (error) {
            clearTimeout(timer);
            if (!timedOut) {
                reject(error);
            }
        }
    });
};

/**
 * Função para executar o benchmark de um algoritmo
 * @param {string} algorithmName - Nome do algoritmo a ser testado
 * @param {Number[]} numbers - Conjunto de números a serem ordenados
 * @returns {Promise<Object>} - Promessa que resolve com o tempo ou erro
 */
const runBenchmark = async (algorithmName, numbers) => {
    if (!algoritmos[algorithmName]) {
        console.log(`Algoritmo ${algorithmName} não encontrado.`);
        return { error: 'Algoritmo não encontrado' };
    }

    try {
        const start = process.hrtime();
        await runWithTimeout(algoritmos[algorithmName], [...numbers], TIMEOUT); // Executar o algoritmo com cópia do array
        const end = process.hrtime(start);
        const timeInSeconds = end[0] + end[1] / 1e9; // Converter para segundos
        return { time: timeInSeconds.toFixed(9) }; // Retornar o tempo com precisão de nanosegundos
    } catch (error) {
        return { error: error.message || 'Erro desconhecido' };
    }
};

/**
 * Função para salvar o resultado em um arquivo JSON
 * @param {string} filename - Caminho do arquivo de saída
 * @param {Object} data - Dados a serem salvos
 * @returns {Promise<void>}
 */
const saveResultsToFile = (filename, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, JSON.stringify(data, null, 2), 'utf8', (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};

/**
 * Função para salvar o resultado em um arquivo CSV
 * @param {string} filename - Caminho do arquivo de saída
 * @param {Object[]} data - Dados a serem salvos
 * @returns {Promise<void>}
 */
const saveResultsToCSV = (filename, data) => {
    const records = [];
    data.forEach(fileResult => {
        fileResult.benchmarks.forEach(benchmark => {
            records.push({
                file: fileResult.file,
                algorithm: benchmark.algorithm,
                time: benchmark.time || '',
                error: benchmark.error || ''
            });
        });
    });

    const csvWriter = createCsvWriter({
        path: filename,
        header: [
            { id: 'file', title: 'File' },
            { id: 'algorithm', title: 'Algorithm' },
            { id: 'time', title: 'Time (s)' },
            { id: 'error', title: 'Error' }
        ]
    });

    return csvWriter.writeRecords(records);
};

/**
 * Função para executar benchmarks em todos os arquivos dentro da pasta 'amostras'
 * @returns {Promise<void>}
 */
const runBenchmarksForAllSamples = async () => {
    const samplesDir = path.join(__dirname, 'amostras');
    const results = [];

    fs.readdir(samplesDir, async (err, files) => {
        if (err) {
            return console.error('Erro ao ler o diretório de amostras:', err);
        }

        for (const file of files) {
            const filePath = path.join(samplesDir, file);
            console.log(`Iniciando benchmarks para o arquivo: ${file}`);

            try {
                const numbers = await loadFromFile(filePath);
                const fileResult = {
                    file,
                    benchmarks: []
                };

                for (const algorithmName in algoritmos) {
                    console.log(`Executando ${algorithmName} para o arquivo ${file}`);
                    const executionResult = await runBenchmark(algorithmName, numbers);
                    fileResult.benchmarks.push({
                        algorithm: algorithmName,
                        ...executionResult
                    });
                    console.log(`Resultado para ${algorithmName} no arquivo ${file}:`, executionResult);
                }

                results.push(fileResult);
            } catch (error) {
                results.push({
                    file,
                    error: error.message || 'Erro desconhecido'
                });
                console.error(`Erro ao processar o arquivo ${file}: ${error.message}`);
            }
        }

        const resultFilePathJSON = path.join(__dirname, 'benchmark_results.json');
        const resultFilePathCSV = path.join(__dirname, 'benchmark_results.csv');
        await saveResultsToFile(resultFilePathJSON, results);
        await saveResultsToCSV(resultFilePathCSV, results);

        console.log('Benchmarks concluídos. Resultados salvos em benchmark_results.json e benchmark_results.csv');
    });
};

// Executar os benchmarks
runBenchmarksForAllSamples();
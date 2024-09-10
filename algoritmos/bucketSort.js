// Importa a função de ordenação por inserção de outro módulo
const insertionSort = require('./insertionSort');

/**
 * A função bucketSort realiza a ordenação de um array utilizando o algoritmo de ordenação por baldes (bucket sort).
 *
 * O algoritmo de ordenação por baldes funciona distribuindo os elementos do array em um número de "baldes".
 * Cada balde é então ordenado individualmente, ou utilizando um algoritmo de ordenação diferente (neste caso, a ordenação por inserção).
 * Finalmente, os baldes são concatenados para formar o array ordenado.
 *
 * @param {number[]} arr - O array a ser ordenado.
 * @param {number} [bucketSize=5] - O tamanho dos baldes, que determina o intervalo de valores que cada balde contém.
 * @returns {number[]} - O array ordenado.
 */
module.exports = function bucketSort(arr, bucketSize = 5) {
    // Verifica se o array está vazio e, se estiver, retorna-o como está.
    if (arr.length === 0) {
        return arr;
    }

    // Encontra o valor mínimo e máximo no array.
    const minValue = Math.min(...arr);
    const maxValue = Math.max(...arr);

    // Calcula a quantidade de baldes necessários com base no tamanho dos baldes (bucketSize).
    const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;

    // Cria os baldes como arrays vazios.
    const buckets = new Array(bucketCount).fill(null).map(() => []);

    // Distribui os elementos do array de entrada nos baldes correspondentes.
    arr.forEach(num => buckets[Math.floor((num - minValue) / bucketSize)].push(num));

    // Inicializa um array vazio para armazenar os elementos ordenados.
    let sortedArray = [];

    // Ordena cada balde individualmente usando a ordenação por inserção
    // e concatena todos os baldes ordenados em um único array.
    buckets.forEach(bucket => {
        if (bucket.length > 0) {
            insertionSort(bucket); // Ordena o próprio balde
            sortedArray = sortedArray.concat(bucket); // Concatena o balde ordenado ao array resultado
        }
    });

    return sortedArray;
}
/**
 * Função para realizar a ordenação de um array utilizando o algoritmo "Bubble Sort".
 *
 * O Bubble Sort é um algoritmo de ordenação simples que percorre repetidamente a lista,
 * compara elementos adjacentes e os troca se estiverem na ordem errada. Este processo
 * é repetido até que a lista esteja ordenada.
 *
 * Complexidade de Tempo: O(n^2), onde n é o número de elementos no array.
 * Complexidade de Espaço: O(1), pois é uma ordenação in-place.
 *
 * @param {Array<number>} arr - O array que será ordenado.
 * @returns {Array<number>} - O array ordenado.
 */
module.exports = function bubbleSort(arr) {
    let n = arr.length; // Obtém o comprimento do array
    // Loop externo para iterar sobre todo o array
    for (let i = 0; i < n; i++) {
        // Loop interno para realizar a comparação e troca dos elementos adjacentes
        for (let j = 0; j < n - i - 1; j++) {
            // Se o elemento atual for maior que o próximo elemento, eles são trocados
            if (arr[j] > arr[j + 1]) {
                // Troca de posição dos elementos usando destructuring assignment
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    // Retorna o array ordenado
    return arr;
}
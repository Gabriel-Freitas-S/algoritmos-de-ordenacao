// mergeSort.js

/**
 * Merge Sort é um algoritmo de ordenação recursivo que usa a estratégia de divisão e conquista.
 * Ele divide a array original em subarrays menores até que cada subarray tenha apenas um elemento (o que significa que estão ordenados),
 * depois mescla essas subarrays menores em subarrays maiores de maneira ordenada até reconstruir a array original, agora ordenada.
 *
 * Complexidade de tempo:
 * - Pior caso: O(n log n)
 * - Melhor caso: O(n log n)
 * - Caso médio: O(n log n)
 *
 * Complexidade de espaço:
 * - O(n)
 *
 * @param {Array} arr - Array de elementos a ser ordenada
 * @returns {Array} - Array ordenada
 */
module.exports = function mergeSort(arr) {
    // Caso base: se o array tem 1 ou 0 elementos, ele já está ordenado
    if (arr.length <= 1) return arr;

    // Divide o array ao meio
    const mid = Math.floor(arr.length / 2);

    // Chamada recursiva para ordenar a metade esquerda
    const left = mergeSort(arr.slice(0, mid));

    // Chamada recursiva para ordenar a metade direita
    const right = mergeSort(arr.slice(mid));

    // Mescla as duas metades ordenadas
    return merge(left, right);
}

/**
 * Função auxiliar para mesclar duas arrays ordenadas em uma única array ordenada.
 * Compara os elementos e os adiciona na array resultante na ordem correta.
 *
 * @param {Array} left - Array ordenada da metade esquerda
 * @param {Array} right - Array ordenada da metade direita
 * @returns {Array} - Array mesclada e ordenada
 */
function merge(left, right) {
    let result = []; // Array resultante da mesclagem
    let leftIndex = 0; // Índice para percorrer a array 'left'
    let rightIndex = 0; // Índice para percorrer a array 'right'

    // Loop que percorre ambas as arrays comparando seus elementos
    while (leftIndex < left.length && rightIndex < right.length) {
        // Adiciona o menor elemento na array resultante
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    // Concatena os elementos restantes (se houver) à array resultante
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}
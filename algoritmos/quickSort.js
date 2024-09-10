/**
 * Algoritmo de Ordenação QuickSort
 *
 * O QuickSort é um algoritmo de ordenação eficiente baseado no princípio Dividir-para-Conquistar.
 * Ele foi desenvolvido por Tony Hoare em 1959 e é amplamente utilizado devido à sua eficiência
 * em ordenar grandes volumes de dados. A complexidade média do QuickSort é O(n log n), mas no pior
 * caso pode ser O(n^2). No entanto, o pior caso pode ser evitado com boas escolhas de pivô.
 *
 * A ideia principal do QuickSort é escolher um "pivô" e particionar o array em dois subarrays:
 * - Elementos menores que o pivô
 * - Elementos maiores que o pivô
 *
 * A função é então chamada recursivamente para cada um desses subarrays, e o array final ordenado
 * é obtido combinando os subarrays ordenados com o pivô.
 *
 * @function quickSort
 * @param {Array<number>} arr - Array de números a ser ordenado
 * @returns {Array<number>} - Array ordenado
 */
module.exports = function quickSort(arr) {
    // Caso base: arrays com 1 ou nenhum elemento já estão ordenados
    if (arr.length <= 1) return arr;

    // Escolhe o último elemento como pivô
    let pivot = arr[arr.length - 1];

    // Arrays para armazenar elementos menores e maiores que o pivô
    let left = [];
    let right = [];

    // Percorre todos os elementos, exceto o pivô
    for (let i = 0; i < arr.length - 1; i++) {
        // Se o elemento for menor que o pivô, adiciona ao array 'left'
        // Caso contrário, adiciona ao array 'right'
        arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);
    }

    // Chama recursivamente o quickSort nos subarrays 'left' e 'right'
    // e combina os resultados com o pivô
    return [...quickSort(left), pivot, ...quickSort(right)];
}
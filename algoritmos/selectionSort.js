/**
 * @function selectionSort
 * @description Esta função implementa o algoritmo de ordenação por seleção (Selection Sort).
 * O algoritmo divide o array em duas partes: a parte ordenada e a parte não ordenada.
 * A cada iteração, ele seleciona o menor elemento da parte não ordenada e o move para o final da parte ordenada.
 *
 * - Complexidade de Tempo:
 *   - Pior caso: O(n^2)
 *   - Caso médio: O(n^2)
 *   - Melhor caso: O(n^2)
 * - Complexidade de Espaço: O(1) (é um algoritmo in-place, não requer memória adicional para a ordenação)
 *
 * @param {Array<number>} arr - Array de números a ser ordenado
 * @returns {Array<number>} - Array ordenado
 */
module.exports = function selectionSort(arr) {
    let n = arr.length; // Obter o tamanho do array

    // Percorrer o array elemento por elemento
    for (let i = 0; i < n; i++) {
        let minIdx = i; // Inicializar o índice do menor elemento como i

        // Percorrer o array a partir do elemento seguinte até o final
        for (let j = i + 1; j < n; j++) {
            // Se encontrar um elemento menor que o atual 'minIdx', atualizar minIdx
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }

        // Fazer a troca do elemento atual com o menor elemento encontrado
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }

    // Retornar o array ordenado
    return arr;
}
/**
 * O algoritmo Heap Sort é um algoritmo de ordenação que aproveita as propriedades
 * de uma estrutura de dados chamada heap, que é uma árvore binária completa onde
 * o nó pai é maior (em um Max-Heap) ou menor (em um Min-Heap) que seus filhos.
 *
 * Este algoritmo tem um desempenho de tempo O(n log n) no pior caso, no caso médio
 * e no melhor caso, tornando-o um algoritmo eficiente e estável para ordenação.
 * Ele é particularmente útil em cenários onde não se pode alocar memória adicional
 * significativa para a ordenação.
 */

/**
 * Função principal que realiza o Heap Sort em um array.
 * @param {number[]} arr - O array de números a ser ordenado.
 * @returns {number[]} - O array ordenado.
 */
module.exports = function heapSort(arr) {
    let n = arr.length;

    // Constrói o heap (rearranja o array)
    // Começa do último nó não-folha e vai até a raiz
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    // Um a um extrair um elemento do heap
    for (let i = n - 1; i >= 0; i--) {
        // Move o root atual (maior item) para o fim do array
        [arr[0], arr[i]] = [arr[i], arr[0]];

        // Chama heapify na heap reduzida
        heapify(arr, i, 0);
    }

    return arr; // Retorna o array ordenado
}

/**
 * Função para reorganizar a estrutura de heap a partir de um dado índice.
 * Esta função assume que as sub-árvores esquerda e direita do nó estão em heap.
 * @param {number[]} arr - O array de números.
 * @param {number} n - O tamanho do heap.
 * @param {number} i - O índice do elemento raiz da sub-árvore.
 */
function heapify(arr, n, i) {
    let largest = i;       // Inicializa o maior como raiz
    let left = 2 * i + 1;  // Filho esquerdo
    let right = 2 * i + 2; // Filho direito

    // Se o filho esquerdo for maior que a raiz
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    // Se o filho direito for maior que o maior filho até então
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    // Se o maior filho não é a raiz
    if (largest !== i) {
        // Troca a raiz com o maior filho
        [arr[i], arr[largest]] = [arr[largest], arr[i]];

        // Recursivamente reorganiza a sub-árvore afetada
        heapify(arr, n, largest);
    }
}
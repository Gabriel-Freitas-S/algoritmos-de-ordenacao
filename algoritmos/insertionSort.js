/**
 * Função para realizar a ordenação por inserção em um array.
 *
 * O algoritmo de ordenação por inserção é uma técnica simples e intuitiva. Ele funciona da seguinte forma:
 * - Percorre o array da esquerda para a direita, começando do segundo elemento.
 * - Para cada elemento, ele compara com os elementos anteriores e vai movendo para a esquerda
 *   até encontrar a posição correta onde o elemento deve ser inserido.
 * - Repete esse processo até que todos os elementos estejam ordenados.
 * - A ordenação por inserção tem complexidade de tempo O(n^2), mas pode ser eficiente para
 *   pequenos conjuntos de dados ou quase ordenados.
 *
 * @param {number[]} arr - O array a ser ordenado.
 * @returns {number[]} - O array ordenado.
 */
module.exports = function insertionSort(arr) {
    // Obtém o comprimento do array.
    let n = arr.length;
    // Loop através de cada elemento do array, começando do segundo elemento.
    for (let i = 1; i < n; i++) {
        // Armazena o valor do elemento atual como chave.
        let key = arr[i];
        // Inicializa o índice `j` como o índice do elemento anterior ao elemento atual.
        let j = i - 1;
        // Move elementos do array[0..i-1], que são maiores que a chave, para uma posição à frente
        // da sua posição atual.
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        // Coloca a chave (o elemento atual) na sua posição correta.
        arr[j + 1] = key;
    }
    // Retorna o array ordenado.
    return arr;
}
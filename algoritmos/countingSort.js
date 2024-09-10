/**
 * Função para realizar a ordenação de um array utilizando o algoritmo "Counting Sort".
 *
 * O Counting Sort não é um algoritmo de ordenação por comparação. Em vez disso, ele
 * utiliza a contagem de elementos para determinar suas posições no array ordenado.
 *
 * Este algoritmo é eficiente para ordenar números inteiros em um intervalo finito.
 * Ele tem uma complexidade de tempo de O(n + k), onde n é o número de elementos no
 * array de entrada e k é o valor do maior elemento no array.
 *
 * No entanto, é importante notar que o Counting Sort não é aplicável para ordenar
 * dados com valores muito grandes ou infinitos, já que a criação do array de contagem
 * pode se tornar impraticável.
 *
 * @param {number[]} arr - O array de inteiros a ser ordenado.
 * @returns {number[]} - O array ordenado.
 */
module.exports = function countingSort(arr) {
    // Encontra o valor máximo no array para dimensionar o array de contagem
    const maxVal = Math.max(...arr);

    // Cria um array de contagem com tamanho maxVal + 1 e inicializa todos os elementos com zero
    const count = new Array(maxVal + 1).fill(0);

    // Inicializa o array de saída, que terá o mesmo comprimento do array de entrada
    const output = new Array(arr.length);

    // Conta as ocorrências de cada número no array de entrada
    arr.forEach(num => count[num]++);

    // Acumula as contagens para determinar as posições corretas dos elementos
    for (let i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
    }

    // Constrói o array de saída colocando os valores em suas posições corretas
    // Itera do final para o início para manter estável a ordenação
    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }

    // Retorna o array ordenado
    return output;
}
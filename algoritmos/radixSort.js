/**
 * Radix Sort é um algoritmo de ordenação não-comparativa que ordena inteiros processando os dígitos individuais.
 * Ele classifica números inteiros em múltiplos passos, onde cada passo utiliza uma posição de dígito particular.
 * A complexidade do Radix Sort é O(nk), onde n é o número de elementos e k é o número máximo de dígitos nos maiores números.
 * É eficiente para grandes listas de inteiros, mas pode ser menos eficiente para grandes valores k (muitos dígitos).
 *
 * @function radixSort
 * @param {Array<number>} arr - Array de números a ser ordenado.
 * @returns {Array<number>} - Array ordenado.
 */
module.exports = function radixSort(arr) {
    // Função auxiliar para obter o valor máximo do array.
    const getMax = arr => arr.reduce((max, num) => Math.max(max, num), 0);

    // Função auxiliar para obter o dígito em uma posição específica.
    const getDigit = (num, place) => Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;

    // Função auxiliar para contar a quantidade de dígitos em um número.
    const digitCount = num => (num === 0 ? 1 : Math.floor(Math.log10(Math.abs(num))) + 1);

    // Obtém a quantidade máxima de dígitos no número mais longo do array.
    const maxDigitCount = digitCount(getMax(arr));

    // Loop que percorre cada posição de dígito (unidades, dezenas, centenas, etc.).
    for (let k = 0; k < maxDigitCount; k++) {
        // Cria uma matriz de buckets, onde cada bucket é uma lista para cada dígito de 0 a 9.
        let digitBuckets = Array.from({ length: 10 }, () => []);

        // Preenche os buckets com os números do array, de acordo com o dígito da posição k.
        for (let i = 0; i < arr.length; i++) {
            let digit = getDigit(arr[i], k);
            digitBuckets[digit].push(arr[i]);
        }

        // Concatena todos os buckets para formar o array ordenado até a posição de dígito k.
        arr = [].concat(...digitBuckets);
    }

    // Retorna o array ordenado.
    return arr;
}
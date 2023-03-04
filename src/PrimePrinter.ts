export class PrimePrinter {
  static main() {
    return new PrimePrinterHelper().invoke();
  }
}

class PrimePrinterHelper {
  private numberOfPrimes = 1000;
  private linesPerPage = 50;
  private columns = 4;
  private ordmax = 30;
  private pageNumber: number;
  private pageOffset: number;
  private rowOffset: number;
  private candidate: number;
  private primeIndex: number;
  private possiblyPrime: boolean;
  private ord: number;
  private square?: number;
  private n = 0;
  private readonly primes = new Array<number>(this.numberOfPrimes + 1);
  private multiples = new Array<number>(this.ordmax + 1);

  invoke() {
    this.computePrimeNumbers();
    return this.printNumbers();
  }

  private computePrimeNumbers() {
    this.candidate = 1;
    this.primeIndex = 1;
    this.primes[1] = 2;

    while (this.primeIndex < this.numberOfPrimes) {
      do {
        this.candidate += 2;
        if (this.candidate === this.square) {
          this.ord++;
          this.square = this.primes[this.ord] * this.primes[this.ord];
          this.multiples[this.ord - 1] = this.candidate;
        }
        this.n = 2;
        this.possiblyPrime = true;
        while (this.n < this.ord && this.possiblyPrime) {
          while (this.multiples[this.n] < this.candidate) {
            this.multiples[this.n] += this.primes[this.n] + this.primes[this.n];
          }
          if (this.multiples[this.n] === this.candidate) {
            this.possiblyPrime = false;
          }
          this.n++;
        }
      } while (!this.possiblyPrime);
      this.primeIndex++;
      this.primes[this.primeIndex] = this.candidate;
    }
  }

  private printNumbers() {
    let result = "";

    this.pageNumber = 1;
    this.pageOffset = 1;

    while (this.pageOffset <= this.numberOfPrimes) {
      result +=
        "The First " +
        this.numberOfPrimes +
        " Prime Numbers --- Page " +
        this.pageNumber +
        "\n";
      for (
        this.rowOffset = this.pageOffset;
        this.rowOffset <= this.pageOffset + this.linesPerPage - 1;
        this.rowOffset++
      ) {
        let lineNumbers: number[] = [];
        for (let column = 0; column <= this.columns - 1; column++) {
          if (
            this.rowOffset + column * this.linesPerPage <=
            this.numberOfPrimes
          ) {
            lineNumbers.push(
              this.primes[this.rowOffset + column * this.linesPerPage]
            );
          }
        }
        result += lineNumbers.join("    ") + "\n";
      }
      result += "\n";
      this.pageNumber++;
      this.pageOffset += this.linesPerPage * this.columns;
    }
    return result;
  }
}

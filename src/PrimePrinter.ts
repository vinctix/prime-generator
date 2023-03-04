export class PrimePrinter {
  static main() {
    const M = 1000;
    const RR = 50;
    const CC = 4;
    const ORDMAX = 30;
    let P = new Array<number>(M + 1);
    let PAGENUMBER: number;
    let PAGEOFFSET: number;
    let ROWOFFSET: number;
    let C;
    let J;
    let K;
    let JPRIME: boolean;
    let ORD: number;
    let SQUARE: number | undefined = undefined;
    let N = 0;
    let MULT = new Array<number>(ORDMAX + 1);
    let result = "";

    J = 1;
    K = 1;
    P[1] = 2;
    ORD = 2;

    while (K < M) {
      do {
        J += 2;
        if (J === SQUARE) {
          ORD++;
          SQUARE = P[ORD] * P[ORD];
          MULT[ORD - 1] = J;
        }
        N = 2;
        JPRIME = true;
        while (N < ORD && JPRIME) {
          while (MULT[N] < J) {
            MULT[N] += P[N] + P[N];
          }
          if (MULT[N] === J) {
            JPRIME = false;
          }
          N++;
        }
      } while (!JPRIME);
      K++;
      P[K] = J;
    }
    PAGENUMBER = 1;
    PAGEOFFSET = 1;

    while (PAGEOFFSET <= M) {
      result +=
        "The First " + M + " Prime Numbers --- Page " + PAGENUMBER + "\n";
      for (
        ROWOFFSET = PAGEOFFSET;
        ROWOFFSET <= PAGEOFFSET + RR - 1;
        ROWOFFSET++
      ) {
        let lineNumbers: number[] = [];
        for (C = 0; C <= CC - 1; C++) {
          if (ROWOFFSET + C * RR <= M) {
            lineNumbers.push(P[ROWOFFSET + C * RR]);
          }
        }
        result += lineNumbers.join("    ") + "\n";
      }
      result += "\n";
      PAGENUMBER++;
      PAGEOFFSET += RR * CC;
    }

    return result;
  }
}

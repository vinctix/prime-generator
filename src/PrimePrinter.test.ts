import { PrimePrinter } from "./PrimePrinter";
import * as fs from "fs";
import { readStream } from "./utils";

describe("PrimePrinter tests", () => {
  test("Should return exactly the same result that the gold copy.", async () => {
    const gold = await readStream(fs.createReadStream("gold.txt"));
    const goldLines = gold.split("\n");

    const result = PrimePrinter.main();
    const resultLines = result.split("\n");

    goldLines.forEach((goldLine, index) => {
      const resultLine = resultLines[index];
      expect(resultLine).toBe(goldLine);
    });

    expect(resultLines.length).toBe(goldLines.length);
  });
});

import formatCurrency from "../scripts/utils/money.js";

describe("test suite: 'formatCurrency(priceCents)':", () => {
  it("convert cents into dollars:", () => {
    expect(formatCurrency(2095)).toEqual("20.95");
  });

  it("test the number 0:", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });

  describe("rounding:", () => {
    it("rounds up to the nearest cents:", () => {
      expect(formatCurrency(2000.5)).toEqual("20.01");
    });

    it("rounds down to nearest cents:", () => {
      expect(formatCurrency(2000.4)).toEqual("20.00");
    });
  });
});

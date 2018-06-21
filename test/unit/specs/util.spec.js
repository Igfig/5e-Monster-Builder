import {callIfFunction, chooseByCR, chooseByTier} from "../../../src/util";

describe ('Misc utility functions', function() {
  describe(callIfFunction.name, function() {
    it("is function", function() {
      callIfFunction(x => x * 2, 3).should.equal(6);
    });
    
    it("is not function", function() {
      callIfFunction(4, 3).should.equal(4);
    });
    
    it("is not function, but has fallback", function() {
      callIfFunction(4, 3, 9).should.equal(9);
    });
  });
});

describe ('Level utility functions', function() {
  describe (chooseByCR.name, function() {
    const thresholds = [
      [-3, "baby"],
      [1, 10],
      [13, x => x*2]
    ];
    
    it("is baby level", function() {
      chooseByCR(-2, thresholds).should.equal("baby")
    });
    
    it("is function return", function() {
      chooseByCR(15, thresholds).should.equal(30)
    });
    
    it("has fallback", function() {
      chooseByCR(-5, thresholds, "nada").should.equal("nada")
    });
  });
  
  describe (chooseByTier.name, function() {
    const tiers = ["zero", 1, x => x * 2];
    
    it("is tier 0", function() {
      chooseByTier(3, tiers).should.equal("zero")
    });
  
    it("is tier 1, at lower limit", function() {
      chooseByTier(5, tiers).should.equal(1)
    });
    
    it("is tier 1, at upper limit", function() {
      chooseByTier(10, tiers).should.equal(1)
    });
    
    it("is top tier", function() {
      chooseByTier(30, tiers).should.equal(60)
    });
  })
});
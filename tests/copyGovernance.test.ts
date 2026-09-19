import { describe, it, expect } from "vitest";
import { services } from "../src/data/services";
import { useCases } from "../src/data/useCases";
import { seoData } from "../src/data/seo";
import { implementationPatterns } from "../src/data/implementationPatterns";

describe("Business Claim & Copy Governance (Section 5, 154, 192)", () => {
  const forbiddenBuzzwords = [
    /\brevolutionize\b/i,
    /\bcutting-edge\b/i,
    /\bworld-class\b/i,
    /\b10x\b/i,
    /\btrusted by\b/i,
    /\baward-winning\b/i,
    /\bguaranteed roi\b/i,
    /\bseamless ecosystem\b/i,
    /\bsupercharge\b/i
  ];

  it("ensures services data contains zero forbidden marketing buzzwords", () => {
    const allText = JSON.stringify(services);
    for (const pattern of forbiddenBuzzwords) {
      expect(pattern.test(allText)).toBe(false);
    }
  });

  it("ensures use cases contain zero forbidden marketing buzzwords", () => {
    const allText = JSON.stringify(useCases);
    for (const pattern of forbiddenBuzzwords) {
      expect(pattern.test(allText)).toBe(false);
    }
  });

  it("ensures SEO meta titles and descriptions contain zero forbidden buzzwords", () => {
    const allText = JSON.stringify(seoData);
    for (const pattern of forbiddenBuzzwords) {
      expect(pattern.test(allText)).toBe(false);
    }
  });

  it("ensures implementation patterns contain zero fake percentage or dollar claims", () => {
    const allText = JSON.stringify(implementationPatterns);
    expect(allText).not.toMatch(/\$\d+ saved/i);
    expect(allText).not.toMatch(/\d+% cost reduction/i);
    expect(allText).not.toMatch(/\d+% revenue lift/i);
  });
});

import { every } from "../every";

test("test the every recursive function", () => {
  expect(every([true, 1, true, ""])).toBe(false);
});

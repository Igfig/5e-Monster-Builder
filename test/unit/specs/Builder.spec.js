import Vue from "vue";
import Builder from "@/components/Builder";

describe("Builder.vue", () => {
  it("should render correct contents", () => {
    const Constructor = Vue.extend(Builder);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector(".builder h1").textContent).to.equal("5e Monster Builder");
  });
});

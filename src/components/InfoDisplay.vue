<script>
export default {
  name: "InfoDisplay",
  functional: true,
  props: { info: { type: Object, default: () => ({}) } },
  render(createElement, context) {
    // TODO maybe let's do the jsx approach instead, this is not very readable
    return createElement("aside", { class: "info", props: { info: [] } }, [
      createElement("h3", {}, context.props.info.title),
      ...context.props.info.body
    ]);
  }
};
</script>

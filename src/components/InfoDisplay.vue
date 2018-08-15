<script>
export default {
  name: "InfoDisplay",
  functional: true,
  props: { info: Array },
  render(createElement, context) {
    return createElement("div", { props: { info: [] } }, context.props.info);
  }
};
</script>

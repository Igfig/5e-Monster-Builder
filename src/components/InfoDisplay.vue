<script>
export default {
  name: "InfoDisplay",
  functional: true,
  props: { info: Array },
  render(createElement, context) {
    return createElement("div", { props: { info: [] } }, context.props.info); // XXX kinda wish I didn't have to wrap it in a div always. If only we could put it in just like a Fragment or something. But that breaks
  }
};
</script>

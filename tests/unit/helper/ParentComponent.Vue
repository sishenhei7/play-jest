<template>
  <div>
    <child-component @custom="onCustom" />
    <p v-if="emitted">Emitted!</p>
    <p v-if="called">Called!</p>
  </div>
</template>

<script>
import ChildComponent from './ChildComponent';
import ChildModule from './ChildModule';

export default {
  name: 'ParentComponent',
  components: { ChildComponent },
  data() {
    return {
      emitted: false,
      called: false,
    };
  },
  created() {
    this.childModule = new ChildModule({
      callBack: () => {
        this.called = true;
      },
    });
  },
  beforeDestroy() {
    this.childModule.destroy();
  },
  methods: {
    onCustom() {
      this.emitted = true;
    },
  },
};
</script>

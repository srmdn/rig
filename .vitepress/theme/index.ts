import { onMounted } from 'vue'
import DefaultTheme from "vitepress/theme";
import "./custom.css";
import { animateFavicon } from './favicon-animate'

export default {
  extends: DefaultTheme,
  setup() {
    onMounted(() => {
      animateFavicon()
    })
  },
};

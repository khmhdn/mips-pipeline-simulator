import { useToast, PluginOptions, POSITION } from "vue-toastification";

const toast = useToast();

export const showNotification = (message: string, type: string) => {
  toast(message, {
    position: POSITION.TOP_CENTER,
    timeout: 4000,
    type: type,
    transition: "Vue-Toastification__fade",
  } as PluginOptions);
};

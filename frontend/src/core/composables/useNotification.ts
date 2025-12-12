import { useToast, type PluginOptions } from 'vue-toastification';

type ToastOptions = PluginOptions;

const DEFAULT_OPTIONS: Partial<ToastOptions> = {
    timeout: 4000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: 'button',
    icon: true,
    rtl: false
};

export const useNotification = () => {
    const toast = useToast();

    const success = (message: string, options?: Partial<ToastOptions>) => {
        toast.success(message, { ...DEFAULT_OPTIONS, ...options });
    };

    const error = (message: string, options?: Partial<ToastOptions>) => {
        toast.error(message, { ...DEFAULT_OPTIONS, ...options });
    };

    const warning = (message: string, options?: Partial<ToastOptions>) => {
        toast.warning(message, { ...DEFAULT_OPTIONS, ...options });
    };

    const info = (message: string, options?: Partial<ToastOptions>) => {
        toast.info(message, { ...DEFAULT_OPTIONS, ...options });
    };

    const clear = () => {
        toast.clear();
    };

    return {
        success,
        error,
        warning,
        info,
        clear
    };
};

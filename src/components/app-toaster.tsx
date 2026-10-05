import { Toaster } from 'sonner';

const AppToaster = () => {
  return (
    <Toaster
      duration={3000}
      richColors
      position='top-center'
      toastOptions={{
        classNames: {
          toast: 'border',
          success: '!bg-emerald-600 !text-white !border-emerald-600 !text-lg',
          error: '!bg-red-400 !text-white !border-red-400 !text-lg',
          warning: '!bg-yellow-500 !text-white !border-yellow-500 !text-lg',
          info: '!bg-blue-400 !text-white !border-blue-400 !text-lg',
        },
      }}
    />
  );
};
export default AppToaster;

export const toastError = (title: string, description: string, toast: any) => {
  toast({
    position: "top-right",
    title,
    description,
    status: "error",
    duration: 9000,
    isClosable: true,
  });
};

export const toastSuccess = (title: string, description: string, toast: any) => {
  toast({
    position: "top-right",
    title,
    description,
    status: "success",
    duration: 9000,
    isClosable: true,
  });
};
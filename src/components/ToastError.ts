import { useToast } from '@chakra-ui/react'

export default function ToastError(title: string, description: string) {

  const toast = useToast();
  toast({
    position: 'top-right',
    title,
    description,
    status: 'error',
    duration: 9000,
    isClosable: true,
  })
}

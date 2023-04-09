import { toast } from 'react-toastify';

export function onErrorToast(){
    toast.error("Please enter the correct query name!!!")
}

export function onErrorToastNoMore(){
    toast.error("No more images to load!!!")
}


import { create } from "zustand";
interface RentInfoModalStore{
    isOpen: boolean;
    open: ()=> void;
    close: ()=> void;
}
const useRentInfoModal = create<RentInfoModalStore>((set)=>(
    {
        isOpen: false,
        open: ()=> set({isOpen: true}),
        close:()=> set({isOpen:false}),
    }
));

export default useRentInfoModal;
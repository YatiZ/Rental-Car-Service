import { create } from "zustand";
interface AlertBoxStore{
    isOpen: boolean;
    open: ()=> void;
    close: ()=> void;
}
const useAlertBox = create<AlertBoxStore>((set)=>(
    {
        isOpen: false,
        open: ()=> set({isOpen: true}),
        close:()=> set({isOpen:false}),
    }
));

export default useAlertBox;
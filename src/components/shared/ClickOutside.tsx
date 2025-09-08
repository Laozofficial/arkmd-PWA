import { useRef, useEffect } from "react";


const useClickOutside = (handler: () => void) => {

    const domNode = useRef<any>(null);

    useEffect(() => {
        const maybeHandler = (event: any) => {
            if (domNode.current && !domNode.current.contains(event.target)) {
                handler();
            }
        };
        document.addEventListener("mousedown", maybeHandler);

        return () => {
            document.removeEventListener("mousedown", maybeHandler);
        };
    });

    return domNode;
};

export default useClickOutside;

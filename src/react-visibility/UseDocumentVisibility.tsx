import { useState,useEffect } from 'react';
import useDocumentVisibilityType from './UseDocumentVisibilityType';

const useDocumentVisibility = () => {
    const [isVisible, setIsVisible] = useState(useDocumentVisibilityType.getIsDocumentHidden());
    const [count, setcount] = useState(0);

    const onVisibilityChangeAll = () => {
      setIsVisible(useDocumentVisibilityType.getIsDocumentHidden());
      if(isVisible === false){
        setcount(count+1);
      }
    };
    useEffect(() => {
        const visibilityChange = useDocumentVisibilityType.getBrowserVisibilityProp();

        document.addEventListener(visibilityChange, onVisibilityChangeAll, false);


        return () => {
          document.removeEventListener(visibilityChange, onVisibilityChangeAll);
        };
      });

    const onVisibilityChange = (fun:any) =>{
      const visibilityChange = useDocumentVisibilityType.getBrowserVisibilityProp();

      document.addEventListener(visibilityChange, fun, false);
      return () => {
        document.removeEventListener(visibilityChange, fun);
      };
    };
  return { isVisible, count, onVisibilityChange};
};

export default useDocumentVisibility;

import { useState,useEffect, useRef } from 'react';
import useDocumentVisibilityType from './useDocumentVisibilityType';

function getDocumentHiddenBack() {
  if (typeof document === "undefined") {
    return true;
  }
  useDocumentVisibilityType.getIsDocumentHidden()
}

const useDocumentVisibility = () => {
  const [visible, setIsVisible] = useState(getDocumentHiddenBack());//useDocumentVisibilityType.getIsDocumentHidden()
  const [count, setcount] = useState(0);
  const Callbacks = useRef<(() => void)[]>([]);

  const onVisibilityChangeAll = () => {
    if(useDocumentVisibilityType.getIsDocumentHidden() === false){
        setcount(count => count + 1);
    }
    setIsVisible(useDocumentVisibilityType.getIsDocumentHidden());
  };

  const onVisibilityChange = (fun: (isVisible: boolean) => void) => {
    const visibilityChange = useDocumentVisibilityType.getBrowserVisibilityProp();
    const event = (() => fun(useDocumentVisibilityType.getIsDocumentHidden()));
    document.addEventListener(visibilityChange, event, false);
    Callbacks.current.push(() => document.removeEventListener(visibilityChange, event));

  };

  useEffect(() => {
    const visibilityChange = useDocumentVisibilityType.getBrowserVisibilityProp();
    document.addEventListener(visibilityChange, onVisibilityChangeAll, false);
    Callbacks.current.push(() => document.removeEventListener(visibilityChange, onVisibilityChangeAll));
    const cleanCallbacks = Callbacks.current;
    return () => {
      cleanCallbacks.forEach(element => {
        element();
      });
      cleanCallbacks.length = 0;
    };
  }, []);

  return { count,  visible, onVisibilityChange};
};

export default useDocumentVisibility;

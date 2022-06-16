import { useState,useEffect } from 'react';
import useDocumentVisibilityType from './useDocumentVisibilityType';

function getDocumentHiddenBack() {
  if (typeof document === "undefined") {
    return true;
  }
  useDocumentVisibilityType.getIsDocumentHidden()
}

const useDocumentVisibility = () => {
  const [Visible, setIsVisible] = useState(getDocumentHiddenBack());//useDocumentVisibilityType.getIsDocumentHidden()
  const [count, setcount] = useState(0);
  const [Callbacks, setCallbacks] = useState<(() => void)[]>([]);

  const onVisibilityChangeAll = () => {
    if(useDocumentVisibilityType.getIsDocumentHidden() === false){
        setcount(count => count + 1);
    }
    setIsVisible(useDocumentVisibilityType.getIsDocumentHidden());
  };

  const onVisibilityChange = (fun: (isVisible: boolean) => void) => {
    const visibilityChange = useDocumentVisibilityType.getBrowserVisibilityProp();
    const event = (() => fun(useDocumentVisibilityType.getIsDocumentHidden()));
    document.addEventListener(visibilityChange, event,false);//visibilityChange, fun, false
    setCallbacks(state => {
      state.push(() => document.removeEventListener(visibilityChange, event));
      return state;
    });
  };

  useEffect(() => {
    const visibilityChange = useDocumentVisibilityType.getBrowserVisibilityProp();
    document.addEventListener(visibilityChange, onVisibilityChangeAll,false);//visibilityChange, fun, false
    return () => {
      Callbacks.forEach(element => {
        element();
      });
      setCallbacks(state => {
        state.length = 0;
        return state;
      });
      document.removeEventListener(visibilityChange, onVisibilityChangeAll);
    };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { count, Visible, onVisibilityChange};
};

export default useDocumentVisibility;

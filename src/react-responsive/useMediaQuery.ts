import { useState, useEffect, useMemo} from 'react';


export interface UseMediaQueryProps{
  query: string;
  serverValue?: boolean;
}
const getMatchMedia = (query: string,serverValue:boolean) => {
  return window ? window.matchMedia(query):serverValue
}
const useMediaQuery = ({query,serverValue=true}:UseMediaQueryProps) =>{
  const mql = useMemo(() =>  getMatchMedia(query,serverValue) ,[query,serverValue]);
  const [visible, setVisible] = useState(false);

  function OnChange(ev: MediaQueryListEvent) {
    setVisible(ev.matches);
  }

  useEffect(() => {
    if (typeof  mql !== 'boolean') {
      setVisible(mql.matches);
      mql.addEventListener('change', OnChange);
    }
    return () => {
      if (typeof mql !== 'boolean') {
        mql.removeEventListener('change', OnChange);
      }
    };
    },[mql]);
    return visible;
};

export default useMediaQuery;

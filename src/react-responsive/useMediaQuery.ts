import { useState, useEffect, useMemo} from 'react';


export interface UseMediaQueryProps{
  query: string;
}

const useMediaQuery = ({query}:UseMediaQueryProps) =>{
  const mql = useMemo(() =>  window.matchMedia(query) ,[query]);
  const [visible, setVisible] = useState(false);

  function OnChange(ev: MediaQueryListEvent) {
    setVisible(ev.matches);
  }

  useEffect(() => {
      setVisible(mql.matches);
      mql.addEventListener('change', OnChange);
      return () => {
          mql.removeEventListener('change', OnChange);
      };
    },[mql]);
    return visible;
};

export default useMediaQuery;

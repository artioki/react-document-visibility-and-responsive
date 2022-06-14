import { useState, useEffect, useMemo} from 'react';


export interface useMediaQueryProps{
  query: string;
}
export interface screenTestProps {
  matches: boolean;
}
const useMediaQuery = ({query}:useMediaQueryProps) =>{
  const mql = useMemo(() => { return window.matchMedia(query); },[query]);
  const [Visible, setVisible] = useState(false);
  function screenTest(e:screenTestProps) {
  if (e.matches) {
      /* менее или равно */
      setVisible(true);
    } else {
      /* более */
      setVisible(false);
    }
  }
  useEffect(() => {
      setVisible(mql.matches);
      mql.addEventListener('change', screenTest);
      return () => {
          mql.removeEventListener('change', screenTest);
      };
    },[mql]);
    return Visible;
};

export default useMediaQuery;

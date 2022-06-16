import { useState, useEffect, useMemo} from 'react';


export interface UseMediaQueryProps{
  query: string;
}
export interface ScreenTestProps {
  matches: boolean;
}
const useMediaQuery = ({query}:UseMediaQueryProps) =>{
  const mql = useMemo(() =>  window.matchMedia(query) ,[query]);
  const [Visible, setVisible] = useState(false);
  function screenTest(e:ScreenTestProps) {
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
    },[query]);
    return Visible;
};

export default useMediaQuery;

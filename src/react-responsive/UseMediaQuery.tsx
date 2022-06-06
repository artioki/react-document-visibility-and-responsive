import { useState, useEffect} from 'react';

const useMediaQuery  = (arg:any) =>{
    const mql = window.matchMedia(arg.query);
    const [isQvery, setisQvery] = useState(false);
    function screenTest(e:any) {
        if (e.matches) {
          /* менее или равно */
          setisQvery(true);
        } else {
          /* более */
          setisQvery(false);
        }
      }
    useEffect(() => {
        setisQvery(window.matchMedia(arg.query).matches);
        mql.addEventListener('change', screenTest);
        return () => {
            mql.removeEventListener('change', screenTest);
        };
    },[arg.query, mql]);
    return isQvery;
};

export default useMediaQuery;

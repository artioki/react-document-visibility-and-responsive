
import React, {useEffect, FC} from 'react';
import useMediaQuery from './UseMediaQuery';
export function getParam(type:string,value:number|string,form?:string){
    if(typeof value === 'number'){
        return `(${type}: ${value}${form?form:''})`;
    }
    else if(typeof value === 'string'){
        return `(${type}: ${value})`;
    }
    else return '';

}
export function joinParam(mas:string[]){
    return mas.join(' and ');

}



export interface fun {
    (matches: any): React.ReactNode;
};
export interface MediaQueryProps{
    children: React.ReactNode|fun;
    minWidth?:string|number;
    maxWidth?:string|number;
    orientation?:string;
    minResolution?:string|number;
    maxResolution?:string|number;
}

const MediaQuery:FC<MediaQueryProps> = ({children,minWidth,maxWidth,orientation,minResolution,maxResolution}) => {
    const mas: string[] = [];

    if(typeof minWidth !== 'undefined'){
        mas.push(getParam('min-width',minWidth,'px'));
    }
    if(typeof maxWidth !== 'undefined'){
        mas.push(getParam('max-width',maxWidth,'px'));
    }
    if(typeof orientation !== 'undefined'){
        mas.push(getParam('orientation',orientation));
    }
    if(typeof minResolution !== 'undefined'){
        mas.push(getParam('min-resolution',minResolution,'dppx"'));
    }
    if(typeof maxResolution !== 'undefined'){
        mas.push(getParam('max-resolution',maxResolution,'dppx"'));
    }

    const query:string = joinParam(mas);

    const isDesktopOrLaptop = useMediaQuery({
        query,
    });

    useEffect(() => {
    }, [isDesktopOrLaptop]);


    return(
        <>
        {
            typeof children === 'function'
            ? children(isDesktopOrLaptop)
            : isDesktopOrLaptop
                ? children
                : ''
        }
        </>
    );

  };

export default MediaQuery;

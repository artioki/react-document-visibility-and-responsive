import React, { FC, useMemo} from 'react';
import useMediaQuery from './useMediaQuery';

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

export interface GetQueryProps{
    minWidth?: `${number}px` | number;
    maxWidth?: `${number}px` | number;
    orientation?: 'portrait'|'landscape';
    minResolution?: `${number}dppx` | number;
    maxResolution?: `${number}dppx` | number;
}
function getQuery(arg: GetQueryProps) {
    const mas: string[] = [];

    if(typeof arg.minWidth !== 'undefined'){
        mas.push(getParam('min-width',arg.minWidth,'px'));
    }
    if(typeof arg.maxWidth !== 'undefined'){
        mas.push(getParam('max-width',arg.maxWidth,'px'));
    }
    if(typeof arg.orientation !== 'undefined'){
        mas.push(getParam('orientation',arg.orientation));
    }
    if(typeof arg.minResolution !== 'undefined'){
        mas.push(getParam('min-resolution',arg.minResolution,'dppx'));
    }
    if(typeof arg.maxResolution !== 'undefined'){
        mas.push(getParam('max-resolution',arg.maxResolution,'dppx'));
    }

    let query: string = joinParam(mas);
    return query;
}
export interface Fun {
    (matches: boolean): React.ReactNode;
};
export interface MediaQueryProps extends GetQueryProps{
    children: React.ReactNode | Fun;
}
const MediaQuery:FC<MediaQueryProps> = ({children,minWidth,maxWidth,orientation,minResolution,maxResolution}) => {

    const query = useMemo(() => getQuery({ minWidth, maxWidth, orientation, minResolution, maxResolution }),
        [minWidth, maxWidth, orientation, minResolution, maxResolution]);
    const isDesktopOrLaptop = useMediaQuery({
        query,
    });

    return(
        <>
        {
            typeof children === 'function'
            ? children(isDesktopOrLaptop)
            : isDesktopOrLaptop
                ? children
                : null
        }
        </>
    );

  };

export default MediaQuery;

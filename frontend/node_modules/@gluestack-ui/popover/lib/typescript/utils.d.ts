type ArrowStyleProps = {
    height: number;
    width: number;
    actualPlacement: 'top' | 'bottom' | 'left' | 'right';
};
export declare const getContainerStyle: ({ placement, arrowHeight, }: {
    placement: string;
    arrowHeight: number;
}) => {
    marginBottom: number;
    marginTop?: undefined;
    marginRight?: undefined;
    marginLeft?: undefined;
} | {
    marginTop: number;
    marginBottom?: undefined;
    marginRight?: undefined;
    marginLeft?: undefined;
} | {
    marginRight: number;
    marginBottom?: undefined;
    marginTop?: undefined;
    marginLeft?: undefined;
} | {
    marginLeft: number;
    marginBottom?: undefined;
    marginTop?: undefined;
    marginRight?: undefined;
} | {
    marginBottom?: undefined;
    marginTop?: undefined;
    marginRight?: undefined;
    marginLeft?: undefined;
};
export declare const getArrowStyles: ({ height, width, actualPlacement, }: ArrowStyleProps) => any;
export {};
//# sourceMappingURL=utils.d.ts.map
export declare class Meta<C = number, I = string, S = string> {
    code: C;
    intro: I;
    state: S;
    match(code: any): boolean;
    constructor(code: C, intro: I, state?: S);
}
export default class UltMeta {
    private _inited;
    private mapping;
    /**
     * 列表
     */
    get list(): Meta<number, string, string>[];
    constructor();
    /**
     * 初始化map
     * @private
     */
    private initMapping;
    from(code: any): Meta | null;
    getIntroByCode<T = string>(code: number | string): T;
    getStateByCode<T = string>(code: number | string): T;
}

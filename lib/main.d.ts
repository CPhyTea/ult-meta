export declare class Meta {
    code: number | string;
    intro: string;
    state: number | undefined;
    constructor(code: number | string, intro: string, state?: number);
}
interface IUltMeta {
    getIntroByCode(code: number | string): string | null;
    getStateByCode(code: number | string): number | null;
    mapping: Map<number | string, Meta>;
}
export default class UltMeta implements IUltMeta {
    mapping: Map<number | string, Meta>;
    constructor();
    initMapping(): void;
    getIntroByCode(code: number | string): string | null;
    getStateByCode(code: number | string): number | null;
}
export {};

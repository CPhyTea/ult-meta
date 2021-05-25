// 常用类型定义
export class Meta {
    code: number | string;
    intro: string;
    state: number | undefined;

    constructor(code: number | string, intro: string, state?: number) {
        this.code = code;
        this.intro = intro;
        this.state = state;
    }
}

// 判断一个值是不是undefined
function isUndefined(value: any): boolean {
    return typeof value === 'undefined';
}

// 判断一个值是不是null
function isNull(value: any): boolean {
    return typeof value === 'object' && !value;
}

// 判断值是否为空
function isEmpty(value: any): boolean {
    return isNull(value) || isUndefined(value);
}

interface IUltMeta {
    // 通过code获取intro
    getIntroByCode(code: number | string): string | null;

    // 通过code获取状态
    getStateByCode(code: number | string): number | null;

    // code和Meta的映射
    mapping: Map<number | string, Meta>;
}

export default class UltMeta implements IUltMeta {
    mapping: Map<number | string, Meta>;

    constructor() {
        this.mapping = new Map();
    }

    initMapping() {
        if (Array.from(this.mapping.entries()).length) return;
        Object.keys(this).forEach((key, i, a) => {
            // 初始化每一个def实例
            // @ts-ignore
            if (key === 'mapping') return;
            // @ts-ignore
            this.mapping.set(this[key].code, this[key]);
        })
    }

    // 通过code获取intro
    getIntroByCode(code: number | string): string | null {
        this.initMapping();
        const def: Meta | undefined = this.mapping.get(code);
        if (isEmpty(def)) {
            return null;
        }
        return def!.intro;
    }

    // 通过code获取state
    getStateByCode(code: number | string): number | null {
        this.initMapping();
        const def: Meta | undefined = this.mapping.get(code);
        if (isEmpty(def) || (!isEmpty(def) && isUndefined(def!.state))) {
            return null;
        }
        return def!.state!;
    }
}



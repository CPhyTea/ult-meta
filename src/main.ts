// 常用类型定义
export class Meta {
  code: number | string;
  intro: string;
  state: string | undefined;

  // 是否匹配
  match(code: any): boolean {
    return code === this.code;
  }

  constructor(code: number | string, intro: string, state?: string) {
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
  getStateByCode(code: number | string): string | null;

  // code和Meta的映射
  mapping: Map<number | string, Meta>;

  list: Meta[];

  from(code: any): Meta | null
}

export default class UltMeta implements IUltMeta {
  mapping: Map<number | string, Meta>;

  get list() {
    this.initMapping();
    const list: Meta[] = [];
    this.mapping.forEach(value => list.push(value));
    return list;
  }

  constructor() {
    this.mapping = new Map();
  }

  initMapping() {
    if (Array.from(this.mapping.entries()).length) return;
    Object.keys(this).forEach((key, i, a) => {
      // 初始化每一个def实例
      // @ts-ignore
      if (['list', 'mapping'].includes(key)) return;
      // @ts-ignore
      this.mapping.set(this[key].code, this[key]);
    });
  }

  // 通过code获取Meta
  from(code: any): Meta | null {
    this.initMapping();
    const def: Meta | undefined = this.mapping.get(code);
    return def || null;
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
  getStateByCode(code: number | string): string | null {
    this.initMapping();
    const def: Meta | undefined = this.mapping.get(code);
    if (isEmpty(def) || (!isEmpty(def) && isUndefined(def!.state))) {
      return null;
    }
    return def!.state!;
  }
}



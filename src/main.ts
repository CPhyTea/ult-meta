// 常用类型定义
export class Meta<C = number,I = string, S = string> {
  code: C;
  intro: I;
  state: S;

  // 是否匹配
  match(code: any): boolean {
    return code === this.code;
  }

  constructor(code: C, intro: I, state: S = null) {
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

function isObject(value: any) {
  return typeof value === 'object' && value;
}

// 通过path获取对象的值
function getByPath(object: any, path: string) {
  if (!path || isEmpty(object)) return object ;
  let result = object;
  const pathArr = path.split('.');
  while (pathArr.length && !isEmpty(object)) {
    let pathItem = pathArr.shift();
    result = (result as any)[pathItem];
  }
  return result;
}

const privateKey = ['list', 'mapping', '_inited'];

export default class UltMeta {
  // 添加是否已经被初始化的属性
  private _inited: boolean = false;
  private mapping: Map<number | string, Meta>;

  /**
   * 列表
   */
  public get list() {
    this.initMapping();
    const list: Meta[] = [];
    this.mapping.forEach(value => list.push(value));
    return list;
  }

  constructor() {
    this.mapping = new Map();
  }

  /**
   * 初始化map
   * @private
   */
  private initMapping() {
    if (this._inited) return;
    if (Array.from(this.mapping.entries()).length) return;
    Object.keys(this).forEach((key, i, a) => {
      // 初始化每一个def实例
      if (privateKey.includes(key)) return;
      this.mapping.set(getByPath(this, `${key}.code`), getByPath(this, key));
    });
    this._inited = true;
  }

  // 通过code获取Meta
  public from(code: any): Meta | null {
    this.initMapping();
    const def: Meta | undefined = this.mapping.get(code);
    return def || null;
  }

  // 通过code获取intro
  public getIntroByCode<T = string>(code: number | string): T {
    this.initMapping();
    const def: Meta | undefined = this.mapping.get(code);
    return getByPath(def, 'intro');
  }

  // 通过code获取state
  public getStateByCode<T = string>(code: number | string): T {
    this.initMapping();
    const def: Meta | undefined = this.mapping.get(code);
    return getByPath(def, 'state');
  }
}



import UltMeta, {Meta} from "../src/main";

class AppCodeMeta extends UltMeta {
  ACCOUNT = new Meta(1, '001');
  ZM = new Meta("lianxin-zm", "002")
  AM = new Meta("lianxin-am", 3)
  WERM = new Meta("lianxin-werm", "004")
  FR = new Meta("lianxin-fr", "005", 'hello')
}

const APP_CODE_META = new AppCodeMeta();

test('测试常量getIntroByCode', () => {
  expect(APP_CODE_META.getIntroByCode<number>('lianxin-am')).toBe(3)
})

test('测试常量getStateByCode', () => {
  expect(APP_CODE_META.getStateByCode<string>('lianxin-fr')).toBe('hello')
})

test('测试常量code', () => {
  expect(APP_CODE_META.ACCOUNT.code).toBe(1)
})

test('测试常量001', () => {
  expect(APP_CODE_META.ACCOUNT.intro).toBe('001')
})

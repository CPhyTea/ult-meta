## 常量管理库
### 使用教程
`import UltMeta, {Meta} from "ult-meta";

class AppCodeMeta extends UltMeta {
    ACCOUNT = new Meta('lianxin-account', '001', 'processing');
    ZM = new Meta("lianxin-zm", "002")
    AM = new Meta("lianxin-am", "003")
    WERM = new Meta("lianxin-werm", "004")
    FR = new Meta("lianxin-fr", "005")
}

const APP_CODE_META = new AppCodeMeta();

### 获取常量code
APP_CODE_META.ACCOUNT.code; // 'lianxin-account'
### 获取常量intro
APP_CODE_META.ACCOUNT.intro; // 001'
### 获取常量状态
APP_CODE_META.ACCOUNT.state; // 'processing'
### 通过code获取intro
APP_CODE_META.getIntroByCode('lianxin-account'); // '001'
### 通过code获取state
APP_CODE_META.getStateByCode('lianxin-account');` // 'processing'
### 判断code是否匹配
APP_CODE_META.ACCOUNT.match('lianxin-account'); // true;
### 获取列表
APP_CODE_META.list // [new Meta('lianxin-account', '001', 'processing'), new Meta("lianxin-zm", "002"), new Meta("lianxin-am", "003"),...]


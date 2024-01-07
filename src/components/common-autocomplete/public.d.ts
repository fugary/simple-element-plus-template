import {CommonPage} from "../public";
import {CommonTableColumn} from "../common-table/public";

export interface CommonAutocompleteProps {
    // 自动完成配置
    autocompleteConfig: CommonAutocompleteOption;
    // 数据值
    modelValue?: string;
    // 默认选择label
    defaultLabel?: string;
    // 是否已id为默认输出
    useIdModel?: boolean;
    // 情空选项
    clearable?: boolean;
    // 只读选项
    readonly?: boolean;
    // 禁用选项
    disabled?: boolean;
    // 没有输入时是否可以搜索
    emptySearchEnabled?: boolean;
    // 自动完成标题
    title?: string;
    // 占位符
    placeholder?: string;
    // id字段名
    idKey?: string;
    // label字段名
    labelKey?: string;
    // 防抖延时
    debounceTime?: number;
    // 自动完成宽度
    autocompleteWidth?: string;
    // 输入框宽度
    inputWidth?: string;
    // 可选项页配置
    selectPageConfig?: CommonSelectPageOption;
    // 可选项列默认显示几列
    colSize?: number;
    // 加载提示loading
    loadingText?: string;
    // 最低高度
    minHeight?: string;
    // input自定义属性
    inputAttrs?: any;
    // 验证事件
    validateEvent?: boolean;
}

export interface CommonSelectPageOption {
    tabs: Array<{ id: string, label: string }>;
    /**搜索方法*/
    searchMethod: (tabId: string, callback: (items: Array<any>) => void) => Promise<any>;
}

export interface CommonAutocompleteOption {
    /**自动完成表格列配置*/
    columns: Array<CommonTableColumn>;
    /**空数据提示信息*/
    emptyMessage?: string;
    /**搜索方法*/
    searchMethod: (param: CommonSearchParam,
                   callback: (result: {
                       /**返回分分页*/
                       page: CommonPage,
                       /**返回的数据*/
                       items: Array<any>
                   }) => void) => Promise<any>;
}

/**
 * 搜索参数
 */
export interface CommonSearchParam {
    /** 搜索关键字 */
    query: string;
    /**分页信息*/
    page: CommonPage;
}

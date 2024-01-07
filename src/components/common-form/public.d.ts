import {RuleItem} from "async-validator/dist-types/interface";
import {FormInstance, FormProps} from "element-plus";

export interface CommonFormProps extends FormProps {
    /**配置选项*/
    options: Array<CommonFormOption>;
    /**label宽度*/
    labelWidth: string;
    /**model对象*/
    model: any;
    /**是否在rule改变时执行验证*/
    validateOnRuleChange: boolean;
    /**提交按钮的label*/
    submitLabel: string;
    /**重置按钮label*/
    resetLabel: string;
    /**返回按钮label*/
    backLabel: string;
    /**是否显示按钮区域*/
    showButtons: boolean;
    /**是否显示提交按钮*/
    showSubmit: boolean;
    /**是否显示重置按钮*/
    showReset: boolean;
    /**提交逻辑*/
    submitForm: (form: FormInstance) => void;
    /**返回地址*/
    backUrl: string;
}

export interface CommonFormOption {
    /**表单类型*/
    type: 'input' | 'input-number' | 'cascader' | 'radio'
        | 'radio-group' | 'radio-button' | 'checkbox' | 'checkbox-group' | 'checkbox-button' | 'date-picker'
        | 'time-picker' | 'switch' | 'select' | 'option' | 'slider' | 'transfer' | 'upload' | 'common-icon-select' | 'common-autocomplete' | 'tree-select';
    /**数据值*/
    value?: any;
    /**属性名*/
    prop: string | string[];
    /**表单标签*/
    label?: string;
    /**用于国际化的label*/
    labelKey?: string;
    /**是否必填,后面解析成为rules的一部分*/
    required?: boolean;
    /**正则表达式验证，解析成为rules的一部分*/
    pattern?: string | RegExp;
    /**正则表达式验证消息*/
    patternMsg?: string;
    /**是否禁用*/
    disabled?: boolean;
    /**是否只读*/
    readonly?: boolean;
    /**占位提示符*/
    placeholder?: string;
    /**其他可用属性*/
    attrs?: {
        showPassword: boolean,
        [key: string]: any
    };
    /**有些控件柚子节点*/
    children?: Array<CommonFormOption>;
    /**async-validator验证器*/
    rules: Array<RuleItem>;
    /**change事件*/
    change: (val: any) => void
}

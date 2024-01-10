import { ButtonProps, LinkProps, TableProps, PaginationProps } from 'element-plus'
import { CommonPage } from '../public'

/**
 * 表格列定义
 */
export interface CommonTableColumn {
    // 表格头
    label: string;
    // 表格头国际化key
    labelKey: string;
    // 属性名
    property: string;
    // 属性名，同property
    prop: string;
    // 宽度
    width: string;
    // 是否是可操作列
    isOperation: boolean;
    // 自定义插槽名称，用于自定义显示数据
    slot: string;
    // 自定义按钮
    buttons: Array<ButtonProps>
    // 可选属性
    attrs: any;
    // 链接可选属性
    linkAttrs: LinkProps;
    // 点击事件
    click: (data: any) => any;
    // 格式化函数
    formatter: (data: any, scope: any) => string;
}

/**
 * 表格配置
 */
export interface CommonTableProps extends TableProps<any> {
    /** 列配置 */
    columns: Array<CommonTableColumn>;
    /** 显示数据 */
    data: Array<any>;
    /** 高亮当前行 */
    highlightCurrentRow: boolean;
    /** stripe */
    stripe: boolean;
    /** 边框配置 */
    border: boolean;
    /** 自定义按钮配置 */
    buttons?: Array<ButtonProps>;
    /** buttons插槽 */
    buttonsSlot?: string;
    /** 默认的按钮大小 */
    buttonSize?: string;
    /** 按钮列配置 */
    buttonsColumnAttrs?: {
        [key: string]: any
    };
    /** 分页配置 */
    page?: CommonPage;
    /** 分页对齐 */
    pageAlign?: 'left' | 'center' | 'right';
    /** 其他分页配置项 */
    pageAttrs?: PaginationProps;
    /** loading状态 */
    loading?: boolean;
    /** loading显示消息 */
    loadingText?: string;
}

export interface CommonTableColumnProps {
    column: CommonTableColumn,
    buttonSize: '' | 'small' | 'large' | 'default'
}

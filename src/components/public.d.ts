/**
 * 分页参数
 */
export interface CommonPage {
    /** 当前第几页 */
    pageNumber: number;
    /** 每页数量 */
    pageSize: number;
    /** 总页数 */
    pageCount?: number;
    /** 数据总数 */
    totalCount?: number;
}

/**
 * element树结构
 */
export interface CommonTreeNode {
    value: string;
    label: string;
    children?: Array<CommonTreeNode>;
    isLeaf?: boolean;
}

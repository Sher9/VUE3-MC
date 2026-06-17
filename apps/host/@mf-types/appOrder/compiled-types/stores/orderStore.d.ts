export const useOrderStore: import("pinia").StoreDefinition<"order", import("pinia")._UnwrapAll<Pick<{
    orders: import("vue").Ref<{
        id: number;
        orderNo: string;
        customerName: string;
        amount: number;
        status: string;
        createTime: string;
    }[]>;
    currentOrder: import("vue").Ref<any>;
    getOrderById: (id: any) => {
        id: number;
        orderNo: string;
        customerName: string;
        amount: number;
        status: string;
        createTime: string;
    };
    getOrdersByStatus: (status: any) => {
        id: number;
        orderNo: string;
        customerName: string;
        amount: number;
        status: string;
        createTime: string;
    }[];
    addOrder: (order: any) => void;
}, "orders" | "currentOrder">>, Pick<{
    orders: import("vue").Ref<{
        id: number;
        orderNo: string;
        customerName: string;
        amount: number;
        status: string;
        createTime: string;
    }[]>;
    currentOrder: import("vue").Ref<any>;
    getOrderById: (id: any) => {
        id: number;
        orderNo: string;
        customerName: string;
        amount: number;
        status: string;
        createTime: string;
    };
    getOrdersByStatus: (status: any) => {
        id: number;
        orderNo: string;
        customerName: string;
        amount: number;
        status: string;
        createTime: string;
    }[];
    addOrder: (order: any) => void;
}, never>, Pick<{
    orders: import("vue").Ref<{
        id: number;
        orderNo: string;
        customerName: string;
        amount: number;
        status: string;
        createTime: string;
    }[]>;
    currentOrder: import("vue").Ref<any>;
    getOrderById: (id: any) => {
        id: number;
        orderNo: string;
        customerName: string;
        amount: number;
        status: string;
        createTime: string;
    };
    getOrdersByStatus: (status: any) => {
        id: number;
        orderNo: string;
        customerName: string;
        amount: number;
        status: string;
        createTime: string;
    }[];
    addOrder: (order: any) => void;
}, "getOrderById" | "getOrdersByStatus" | "addOrder">>;

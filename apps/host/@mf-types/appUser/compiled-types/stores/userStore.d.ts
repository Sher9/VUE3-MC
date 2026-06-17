export const useUserStore: import("pinia").StoreDefinition<"user", import("pinia")._UnwrapAll<Pick<{
    users: import("vue").Ref<{
        id: number;
        name: string;
        email: string;
        role: string;
        status: string;
    }[]>;
    currentUser: import("vue").Ref<any>;
    getUserById: (id: any) => {
        id: number;
        name: string;
        email: string;
        role: string;
        status: string;
    };
    addUser: (user: any) => void;
    removeUser: (id: any) => void;
}, "users" | "currentUser">>, Pick<{
    users: import("vue").Ref<{
        id: number;
        name: string;
        email: string;
        role: string;
        status: string;
    }[]>;
    currentUser: import("vue").Ref<any>;
    getUserById: (id: any) => {
        id: number;
        name: string;
        email: string;
        role: string;
        status: string;
    };
    addUser: (user: any) => void;
    removeUser: (id: any) => void;
}, never>, Pick<{
    users: import("vue").Ref<{
        id: number;
        name: string;
        email: string;
        role: string;
        status: string;
    }[]>;
    currentUser: import("vue").Ref<any>;
    getUserById: (id: any) => {
        id: number;
        name: string;
        email: string;
        role: string;
        status: string;
    };
    addUser: (user: any) => void;
    removeUser: (id: any) => void;
}, "getUserById" | "addUser" | "removeUser">>;

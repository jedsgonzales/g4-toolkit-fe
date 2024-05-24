export const PREFIX = process.env.NODE_ENV === "production" ? "prod_" : "dev_";

export const VAR = (varName: string) => `${PREFIX}${varName}`;

export const STORAGE_NAMES = {
    SESSION_ID: 'SessID'
}

export const getSessionId = () => {
    return localStorage.getItem( VAR( STORAGE_NAMES.SESSION_ID ) );
}

export const delSessionId = () => {
    return localStorage.removeItem( VAR( STORAGE_NAMES.SESSION_ID ) );
}

export const setSessionId = (sessId: string) => {
    return localStorage.setItem( VAR( STORAGE_NAMES.SESSION_ID ), sessId );
}

export const saveStorageObject = (varName:string, data: any) => {
    return localStorage.setItem( VAR( varName ), JSON.stringify(data) );
}

export const delStorageObject = (varName:string) => {
    return localStorage.removeItem( VAR( varName ) );
}

export const loadStorageObject = (varName:string) => {
    const data = localStorage.getItem( VAR( varName ));

    if(data){
        try {
            return JSON.parse(data);
        } catch (err) {
            console.error(`Error parsing stored data - ${varName}`, err);
            return undefined;
        }
    }

    return undefined;
}

export const saveStorageData = (varName:string, data: string) => {
    return localStorage.setItem( VAR( varName ), data );
}

export const delStorageData = (varName:string) => {
    return localStorage.removeItem( VAR( varName ) );
}

export const loadStorageData = (varName:string, data?: string) => {
    return localStorage.getItem( VAR( varName ) ) || data || null;
}
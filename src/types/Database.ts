export interface DBUser {
    username: string;
    password_hash: string;
    created_at: string;
}

export interface DBUserPreference {
    username: string;
    setting_key: string;
    setting_value: string;
}

// Type for database query results
export type DBQueryResult<T> = T | undefined; 
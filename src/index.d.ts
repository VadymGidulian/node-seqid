export interface Connection {
	/**
	 * Closes the connection to DB.
	 */
	close(): void;
	
	/**
	 * Creates generator instance with specified namespace.
	 *
	 * @param namespace - Namespace
	 */
	create(namespace?: string): Instance;
	
	/**
	 * Returns next sequential id.
	 *
	 * @param namespace - Namespace
	 */
	generate(namespace?: string): number;
	/**
	 * Returns last generated id.
	 *
	 * @param namespace - Namespace
	 */
	getLastId(namespace?: string): number;
	/**
	 * Sets last generated id.
	 *
	 * @param namespace - Namespace
	 * @param id        - Last id
	 */
	setLastId(namespace: string, id: number): void;
}

export interface Instance {
	/**
	 * Instance's namespace
	 */
	get namespace(): string;
	
	/**
	 * Returns next sequential id.
	 */
	generate(): number;
	/**
	 * Returns last generated id.
	 */
	getLastId(): number;
	/**
	 * Sets last generated id.
	 *
	 * @param id - Last id
	 */
	setLastId(id: number): void;
}

/**
 * Opens DB connection.
 *
 * @param [path] - Path to DB file
 */
export declare function connect({path}?: {path?: string}): Connection;

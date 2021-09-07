/**
 * Generates sequential ids.
 *
 * @param namespace - Namespace
 */
declare function seqid(namespace?: string): Promise<seqid.Result>;
declare namespace seqid {
	export interface Result {
		namespace: string;
		id:        number;
	}
	
	/**
	 * Creates generator instance with specified namespace.
	 *
	 * @param namespace - Namespace
	 */
	var create: (namespace?: string) => () => Promise<Result>;
}

export declare function connect({path}?: {path?: string}): typeof seqid;

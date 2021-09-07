'use strict';

const sqlite3 = require('sqlite3');

function connect({path = 'seqid.db'} = {}) {
	const db = new sqlite3.Database(path);
	
	db.serialize();
	
	db.run(`CREATE TABLE IF NOT EXISTS Ids (
	    namespace TEXT,
	    id        INTEGER,
	    PRIMARY KEY (namespace)
	)`);
	
	let busy = false;
	async function generate(namespace) {
		namespace = ((namespace != null) ? String(namespace) : '').trim();
		
		if (!busy) busy = true;
		else await new Promise(resolve => {
			const handler = setInterval(() => {
				if (!busy) {
					busy = true;
					clearInterval(handler);
					resolve();
				}
			});
		});
		
		try {
			await new Promise((resolve, reject) => db.run(
				'INSERT INTO Ids(namespace, id) VALUES ($namespace, 1) ' +
				'ON CONFLICT(namespace) DO UPDATE SET id = id + 1',
				{$namespace: namespace},
				err => {
					if (err) return reject(err);
					
					resolve();
				}
			));
			return await new Promise((resolve, reject) => db.get(
				'SELECT namespace, id FROM Ids WHERE namespace = $namespace',
				{$namespace: namespace},
				(err, {namespace, id}) => {
					if (err) return reject(err);
					
					resolve({namespace, id});
				}
			));
		} finally {
			busy = false;
		}
		
	}
	generate.create = function (namespace) {
		return () => generate(namespace);
	}
	
	return generate;
}

module.exports = {connect};

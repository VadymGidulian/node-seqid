'use strict';

const Sqlite3 = require('better-sqlite3');

function connect({path = 'seqid.db'} = {}) {
	const db = new Sqlite3(path);
	if (db.pragma('journal_mode = WAL')?.[0]?.journal_mode !== 'wal') console.warn('SQLite journaling mode hasn\'t been set to WAL');
	db.pragma('synchronous = NORMAL');
	
	db.exec(
		`CREATE TABLE IF NOT EXISTS Ids (
			namespace TEXT,
			id        INTEGER,
			PRIMARY KEY (namespace)
		)`
	);
	
	const stmt = db.prepare(
		`INSERT INTO Ids(namespace, id) VALUES ($namespace, 1)
		ON CONFLICT(namespace) DO UPDATE SET id = id + 1
		RETURNING id`
	).pluck();
	
	function generate(namespace) {
		namespace = (namespace != null) ? String(namespace).trim() : '';
		
		return stmt.get({namespace});
	}
	
	function getLastId(namespace) {
		namespace = (namespace != null) ? String(namespace).trim() : '';
		
		return db.prepare(
			`SELECT id
			FROM Ids
			WHERE namespace = $namespace`
		).pluck().get({namespace});
	}
	
	function setLastId(namespace, id) {
		namespace = (namespace != null) ? String(namespace).trim() : '';
		if (!Number.isInteger(id)) throw new TypeError('id must be integer');
		
		db.prepare(
			`INSERT INTO Ids(namespace, id) VALUES ($namespace, $id)
			ON CONFLICT(namespace) DO UPDATE SET id = $id`
		).run({namespace, id});
	}
	
	function create(namespace) {
		namespace = (namespace != null) ? String(namespace).trim() : '';
		
		return {
			get namespace() {
				return namespace;
			},
			generate:  () => generate(namespace),
			getLastId: () => getLastId(namespace),
			setLastId: id => setLastId(namespace, id)
		};
	}
	
	function close() {
		db.close();
	}
	
	return {close, create, generate, getLastId, setLastId};
}

module.exports = {connect};

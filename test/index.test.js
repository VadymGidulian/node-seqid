'use strict';

const SEQID_DB_PATH = 'test.db';

const fs    = require('fs');
const seqid = require('../src').connect({path: SEQID_DB_PATH});

afterAll(() => fs.unlinkSync(SEQID_DB_PATH));

describe('Serial', () => {
	test('Empty namespace', async () => {
		expect(await seqid()).toStrictEqual({namespace: '', id: 1});
		expect(await seqid()).toStrictEqual({namespace: '', id: 2});
		expect(await seqid()).toStrictEqual({namespace: '', id: 3});
	});
	
	test('Trim namespace', async () => {
		expect(await seqid('trimmed'))      .toStrictEqual({namespace: 'trimmed', id: 1});
		expect(await seqid('   trimmed'))   .toStrictEqual({namespace: 'trimmed', id: 2});
		expect(await seqid('trimmed   '))   .toStrictEqual({namespace: 'trimmed', id: 3});
		expect(await seqid('   trimmed   ')).toStrictEqual({namespace: 'trimmed', id: 4});
	});
});

describe('Parallel', () => {
	test('1000 promises (1 thread)', async () => {
		const NUMBER = 1_000;
		
		const ids = new Set();
		
		await Promise.all(Array(NUMBER).fill(undefined).map(() => seqid('1 thread')
			.then(({id}) => ids.add(id))));
		
		expect(ids.size).toBe(NUMBER);
	});
});

describe('Instance', () => {
	test('Create', async () => {
		const generator = seqid.create('instance');
		
		expect(await generator()).toStrictEqual({namespace: 'instance', id: 1});
		expect(await generator()).toStrictEqual({namespace: 'instance', id: 2});
		expect(await generator()).toStrictEqual({namespace: 'instance', id: 3});
	});
});

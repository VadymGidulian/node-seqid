'use strict';

const fs = require('node:fs');

const SEQID_DB_PATH = 'test.db';
const seqid = require('..').connect({path: SEQID_DB_PATH});

afterAll(() => {
	seqid.close();
	fs.unlinkSync(SEQID_DB_PATH);
});

describe('Serial', () => {
	test('Empty namespace', () => {
		expect(seqid.getLastId()).toBeUndefined();
		
		expect(seqid.generate()).toBe(1);
		expect(seqid.generate()).toBe(2);
		expect(seqid.generate()).toBe(3);
		
		expect(seqid.getLastId()).toBe(3);
	});
	
	test('Initialize namespace', () => {
		const NS = 'initialized';
		
		expect(seqid.getLastId(NS)).toBeUndefined();
		
		expect(() => seqid.setLastId(NS, 0.5)).toThrow(new TypeError('id must be integer'));
		seqid.setLastId(NS, 42);
		expect(seqid.getLastId(NS)).toBe(42);
		
		expect(seqid.generate(NS)).toBe(43);
		expect(seqid.generate(NS)).toBe(44);
	});
	
	test('Trim namespace', () => {
		expect(seqid.generate('trimmed'))      .toBe(1);
		expect(seqid.generate('   trimmed'))   .toBe(2);
		expect(seqid.generate('trimmed   '))   .toBe(3);
		expect(seqid.generate('   trimmed   ')).toBe(4);
	});
});

describe('Instance', () => {
	test('Create', () => {
		const NS = 'instance';
		
		const instance = seqid.create(NS);
		expect(instance.namespace).toBe(NS);
		
		expect(instance.getLastId()).toBeUndefined();
		
		expect(instance.generate()).toBe(1);
		expect(instance.generate()).toBe(2);
		expect(instance.generate()).toBe(3);
		
		instance.setLastId(42);
		expect(instance.getLastId()).toBe(42);
		
		expect(instance.generate()).toBe(43);
	});
});

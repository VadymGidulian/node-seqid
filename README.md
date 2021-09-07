# 🆔 seqid

A centralized sequential ids generator.

## 🎯 Motivation

This generator is designed to be simple and easy in use.

## ✨ Features

- Simple API
- Uses SQLite

## 📝 Usage

```js
const seqid = require('@vadym.gidulian/seqid').connect({
	// Optional
	path: 'seqid.db' // default
});

await seqid();           // {namespace: '',         id: 1}
await seqid('products'); // {namespace: 'products', id: 1}

const productIdGenerator = seqid.create('products');
await productIdGenerator(); // {namespace: 'products', id: 2}
```

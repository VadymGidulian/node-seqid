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

seqid.generate();           // 1
seqid.generate('products'); // 1

seqid.setLastId('products', 42);
seqid.generate('products');  // 43
seqid.getLastId('products'); // 43

const productIdGenerator = seqid.create('products');
productIdGenerator.namespace;  // 'products'
productIdGenerator.generate(); // 44

productIdGenerator.setLastId(0);
productIdGenerator.generate(); // 1

seqid.close();
```

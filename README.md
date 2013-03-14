prove
=====

Validation sugar with is-it

Installation
------------

```bash
npm install prove
```

Usage
-----

```javascript
var prove = require('prove')

if (var errs = prove(5).is('integer greaterThan(0)').errors) {
  // not valid
}
```

prove can also be chained:

```javascript
prove('foo').is('string').isnt('integer').errors
```

API
---

### prove(value)

Returns a chainable object with `is`, `isnt` and `errors`.

### .is(conditions)

Runs the listed conditions against the value provided in `prove`.

### .isnt(conditions)

Runs the conditions against the value provided in `prove` but negated.

### .errors

This property contains an array of invalid conditions, or `null`.

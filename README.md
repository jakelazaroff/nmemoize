# nmemoize

Memoize functions with an arbitrary number of arguments.

```js
import { memoize } from 'nmemoize';

const addOne = memoize(x => x + 1);
const add = memoize((x, y) => x + y);
```

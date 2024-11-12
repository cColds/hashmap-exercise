const HashMap = () => {
  const loadFactor = 0.75;
  let capacity = 16;
  let buckets = [];
  let entriesAmount = 0;

  function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  const resize = () => {
    console.log("Resizing bucket");

    capacity *= 2;
    let resizedBuckets = [];

    for (const bucket of buckets) {
      if (!bucket) continue;

      const [key, value] = bucket;

      const index = key % capacity;
      resizedBuckets[index] = value;
    }

    buckets = resizedBuckets;
  };

  const set = (key, value) => {
    const hashedCode = hash(key);

    const index = hashedCode % capacity;
    if (index < 0 || index >= capacity) {
      throw new Error("Trying to access index out of bounds");
    }
    const bucket = buckets[index];

    if (bucket) {
      console.log(
        `Key collision matches old value. Overwriting "${bucket[1]}" to "${value}"`
      );

      buckets[index] = [key, value];

      return;
    }

    const threshold = capacity * loadFactor;

    if (entriesAmount >= threshold) {
      resize();
      // May need to update the index because capacity changes
    }

    buckets[index] = [key, value];
    entriesAmount++;

    return buckets;
  };

  const get = (key) => {
    const index = key % capacity;

    const bucket = buckets[index];

    if (!bucket) return null;

    const value = bucket[1];

    return value;
  };

  const has = (key) => {
    const index = key % capacity;

    return !!buckets[index];
  };

  const remove = (key) => {
    const index = key % capacity;

    if (!buckets[index]) {
      return false;
    }

    buckets[index] = null;
    entriesAmount--;
    return true;
  };

  const length = () => entriesAmount;

  const keys = () => {
    const keysList = [];
    buckets.forEach((bucket) => {
      if (bucket) {
        keysList.push(bucket[0]);
      }
    });

    return keysList;
  };

  const clear = () => {
    buckets.forEach((bucket) => {
      if (bucket) {
        const key = bucket[0];

        remove(key);
      }
    });
  };

  const values = () => {
    const valuesList = [];
    buckets.forEach((bucket) => {
      if (bucket) {
        valuesList.push(bucket[1]);
      }
    });

    return valuesList;
  };

  const entries = () => {
    return buckets.filter((bucket) => bucket);
  };

  return {
    hash,
    set,
    get,
    has,
    remove,
    length,
    keys,
    clear,
    values,
    entries,
    buckets,
  };
};

const test = HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

test.set("lion", "goldenrod");
console.log(test.length());
test.set("moon", "silver");

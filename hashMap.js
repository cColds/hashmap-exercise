const HashMap = () => {
  const loadFactor = 0.75;
  let capacity = 16;
  let buckets = new Array(capacity).fill(null);
  let entriesAmount = 0;

  class ListNode {
    constructor(key, value, next = null) {
      this.key = key;
      this.value = value;
      this.next = next;
    }
  }

  function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  const resize = () => {
    const oldBuckets = buckets;
    capacity *= 2;
    buckets = new Array(capacity).fill(null);
    entriesAmount = 0;
    console.log("Resizing bucket");

    for (const bucket of oldBuckets) {
      if (bucket) {
        let current = bucket;
        while (current) {
          set(current.key, current.value);
          current = current.next;
        }
      }
    }

    return buckets;
  };

  const set = (key, value) => {
    const hashedCode = hash(key);

    const index = hashedCode % capacity;
    if (index < 0 || index >= capacity) {
      throw new Error("Trying to access index out of bounds");
    }
    const head = buckets[index];
    let current = head;

    // if node exists at bucket index, check if key matches
    while (current) {
      // overwrite value if key is the same and return
      if (current.key === key) {
        console.log(
          `Key collision: current key matches old key "${key}". Overwriting value "${current.value}" to "${value}"`
        );
        current.value = value;
        return;
      }
      // traverse through linked list
      current = current.next;
    }

    const newNode = new ListNode(key, value, head);
    buckets[index] = newNode;
    entriesAmount++;

    const threshold = capacity * loadFactor;
    if (entriesAmount > threshold) {
      resize();
    }
    return buckets;
  };

  const get = (key) => {
    const hashedCode = hash(key);

    const index = hashedCode % capacity;

    let current = buckets[index];

    while (current) {
      if (current.key === key) {
        return current.value;
      }
      current = current.next;
    }

    return null;
  };

  const has = (key) => {
    const hashedCode = hash(key);

    const index = hashedCode % capacity;

    let current = buckets[index];

    while (current) {
      if (current.key === key) {
        return current.value;
      }
      current = current.next;
    }

    return null;
  };

  const remove = (key) => {
    const hashedCode = hash(key);
    const index = hashedCode % capacity;

    let current = buckets[index];
    let prev = null;

    while (current) {
      if (current.key === key) {
        // point prevNext to the one after the removed node
        if (prev) {
          prev.next = current.next;
        } else {
          // if deleting head, prev will be null so just set head to curr.next
          buckets[index] = current.next;
        }
        entriesAmount--;
        return true;
      }
      prev = current;
      current = current.next;
    }

    return false; // Key not found
  };

  const length = () => entriesAmount;

  const keys = () => {
    const keysList = [];
    buckets.forEach((_, i) => {
      let current = buckets[i];

      while (current) {
        keysList.push(current.key);
        current = current.next;
      }
    });

    return keysList;
  };

  const clear = () => {
    buckets = new Array(capacity).fill(null);
    entriesAmount = 0;
  };

  const values = () => {
    const valuesList = [];
    buckets.forEach((_, i) => {
      let current = buckets[i];

      while (current) {
        valuesList.push(current.value);
        current = current.next;
      }
    });

    return valuesList;
  };

  const entries = () => {
    const entriesList = [];

    for (let i = 0; i < buckets.length; i++) {
      let current = buckets[i];

      while (current) {
        entriesList.push([current.key, current.value]);
        current = current.next;
      }
    }

    return entriesList;
  };

  const getBuckets = () => buckets;

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
    getBuckets,
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

// Overwriting an existing key
test.set("lion", "goldenrod");
console.log(test.length()); // Output: 12

// This should trigger a resize
test.set("moon", "silver");
console.log(test.length()); // Output: 13
console.log(test.getBuckets().length); // 32

console.log(test.get("moon")); // Output: "silver"
console.log(test.get("lion")); // Output: "goldenrod"

console.log(test.keys());
console.log(test.values());
console.log(test.entries());

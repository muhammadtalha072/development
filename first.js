// maps.js - JavaScript Maps Practice

console.log("=== JavaScript Maps Practice ===\n");

// 1. Creating Maps
console.log("1. Creating Maps:");
const map1 = new Map();
const map2 = new Map([
    ['name', 'John'],
    ['age', 30],
    [1, 'number key'],
    [true, 'boolean key']
]);

console.log("Empty map:", map1);
console.log("Pre-filled map:", map2);

// 2. Setting values
console.log("\n2. Setting Values:");
map1.set('firstName', 'Alice');
map1.set('lastName', 'Smith');
map1.set(42, 'answer');
map1.set({id: 1}, 'object key');

console.log("After setting values:", map1);

// 3. Getting values
console.log("\n3. Getting Values:");
console.log("firstName:", map1.get('firstName'));
console.log("Answer to everything:", map1.get(42));
console.log("Non-existent key:", map1.get('email'));

// 4. Checking if key exists
console.log("\n4. Checking Keys:");
console.log("Has firstName?", map1.has('firstName'));
console.log("Has email?", map1.has('email'));

// 5. Size
console.log("\n5. Map Size:");
console.log("Map1 size:", map1.size);
console.log("Map2 size:", map2.size);

// 6. Deleting
console.log("\n6. Deleting:");
console.log("Before delete:", map1.size);
map1.delete('lastName');
console.log("After deleting lastName:", map1.size);

// Exercise 1: User Management System
console.log("\n=== Exercise 1: User Management System ===");
const users = new Map();

function addUser(id, userData) {
    users.set(id, userData);
    console.log(`User ${id} added:`, userData);
}

function getUser(id) {
    return users.get(id);
}

function updateUser(id, newData) {
    if (users.has(id)) {
        const currentData = users.get(id);
        users.set(id, { ...currentData, ...newData });
        console.log(`User ${id} updated:`, users.get(id));
    } else {
        console.log(`User ${id} not found`);
    }
}

// Test the functions
addUser(1, { name: 'John', email: 'john@email.com' });
addUser(2, { name: 'Jane', email: 'jane@email.com' });
console.log("Get user 1:", getUser(1));
updateUser(1, { age: 25 });
console.log("Updated user 1:", getUser(1));

// Exercise 2: Word Counter
console.log("\n=== Exercise 2: Word Counter ===");
function countWords(text) {
    const wordCount = new Map();
    const words = text.toLowerCase().split(/\s+/);
    
    for (const word of words) {
        wordCount.set(word, (wordCount.get(word) || 0) + 1);
    }
    
    return wordCount;
}

const text = "hello world hello javascript world javascript is awesome";
const wordCounts = countWords(text);
console.log("Word counts:", wordCounts);

// Exercise 3: Iterating through Maps
console.log("\n=== Exercise 3: Iterating Maps ===");
const fruits = new Map([
    ['apple', 5],
    ['banana', 3],
    ['orange', 8],
    ['grape', 12]
]);

console.log("--- Keys ---");
for (const key of fruits.keys()) {
    console.log(key);
}

console.log("--- Values ---");
for (const value of fruits.values()) {
    console.log(value);
}

console.log("--- Entries ---");
for (const [key, value] of fruits.entries()) {
    console.log(`${key}: ${value}`);
}

console.log("--- Using forEach ---");
fruits.forEach((value, key) => {
    console.log(`${key} => ${value}`);
});

// Exercise 4: Map vs Object comparison
console.log("\n=== Exercise 4: Map vs Object ===");
const mapExample = new Map();
const objectExample = {};

// Different key types
mapExample.set('string', 'String key');
mapExample.set(1, 'Number key');
mapExample.set(true, 'Boolean key');

objectExample['string'] = 'String key';
objectExample[1] = 'Number key (converted to string)';
objectExample[true] = 'Boolean key (converted to string)';

console.log("Map keys:", [...mapExample.keys()]);
console.log("Object keys:", Object.keys(objectExample));
console.log("Map size:", mapExample.size);
console.log("Object size:", Object.keys(objectExample).length);

console.log("\n=== Maps Practice Complete! ===");
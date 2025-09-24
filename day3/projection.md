### MongoDB Notes with Examples and Coding Questions

### ** Projections in MongoDB
Projection in MongoDB is used to control which fields are included or excluded in the query result.

By default, MongoDB returns all fields in a document when you use find().
With projections, you can choose to include only specific fields or exclude unnecessary fields.


### **OR


#### **Projections in MongoDB**
- **Purpose:** Control the fields returned in a query.
- To include specific fields, use a projection value of `1` for the desired fields.
- To exclude fields, use a projection value of `0`.
- **Note:** You cannot include and exclude fields simultaneously in the same query projection.

**Example:**
```javascript
db.collection.find({}, { title: 1, author: 1 });
```
Returns only the `title` and `author` fields from each document.

---

#### **Embedded Documents in MongoDB**
- Used to store nested data structures.
- Access nested fields directly by specifying their paths.

**Operators for Embedded Documents:**
1. **$all**  
   Selects documents where an array field contains all specified elements.
2. **$elemMatch**  
   Matches documents containing an array field with at least one element that matches all specified query criteria.

The key difference between **`$all`** and **`$elemMatch`** lies in how they match array elements within a document:  

### ** 2️⃣ $all (All values must match)
Requires all the specified values to be present in the array.
Extra values are allowed, but the document must contain all values given in the query.

### ** Example Data

```
[
  { "_id": 1, "name": "Alice", "hobbies": ["reading", "coding", "chess"] },
  { "_id": 2, "name": "Bob", "hobbies": ["gaming", "coding"] },
  { "_id": 3, "name": "Charlie", "hobbies": ["reading", "chess"] }
]

```


### Query using $all

```
db.users.find({ hobbies: { $all: ["reading", "chess"] } })
```


### ** RESULT
```
[
  { "_id": 1, "name": "Alice", "hobbies": ["reading", "coding", "chess"] },
  { "_id": 3, "name": "Charlie", "hobbies": ["reading", "chess"] }
]

```


### ** Query using $in

```
db.users.find({ hobbies: { $in: ["reading", "gaming"] } })
```

### ** Result:

```
[
  { "_id": 1, "name": "Alice", "hobbies": ["reading", "coding", "chess"] },
  { "_id": 2, "name": "Bob", "hobbies": ["gaming", "coding"] },
  { "_id": 3, "name": "Charlie", "hobbies": ["reading", "chess"] }
]

```

### or

### **1. `$all`**
- **Purpose:** Checks if an array contains all the specified values.
- **Behavior:** It matches documents if *each specified value* exists **anywhere** in the array (but not necessarily in the same element).
- **Example Usage:**
  ```javascript
  db.comments.find({
    "metadata.likes": { $all: [45, 78] }
  });
  ```
  **Explanation:**
  - This query finds documents where the `likes` field contains **both** `45` and `78` (in any order and in any element of the array).

---

### **2. `$elemMatch`**
- **Purpose:** Checks if **a single element** in an array satisfies **all specified conditions**.
- **Behavior:** It matches documents if there exists **one array element** that meets all conditions simultaneously.

### Important Note:
```
 $elemMatch Kaha Use Karna Hai?
Agar array ke andar complex objects hain (jaise subject aur marks), tab $elemMatch kaam karega.
Agar sirf array values match karni hain, toh $all sahi hai.

✅ Agar tumne galti se $elemMatch likha tha, par actually $all use karna chah rahe the, toh upar wali query sahi hai.

Samajh aaya bhai? 😃

```

- **Example Usage:**
  ```javascript
  db.comments.find({
    "comments": {
      $elemMatch: { user: "user5", text: "Just what I needed to understand aggregations." }
    }
  });
  ```
  **Explanation:**
  - This query finds documents where the `comments` array has **at least one object** with both `user` equal to `"user5"` **and** `text` equal to `"Just what I needed to understand aggregations."`

---

### **Comparison Summary:**

| Feature         | **`$all`**                                                      | **`$elemMatch`**                                         |
|------------------|-----------------------------------------------------------------|---------------------------------------------------------|
| **Match Scope** | Checks **multiple elements** in an array.                       | Checks conditions on **a single element** of an array.  |
| **Logical Nature** | Matches if all values are found anywhere in the array.        | Matches if one element meets all conditions at once.    |
| **Use Case**    | When you care about **individual values** existing in the array.| When you need to ensure **multiple conditions** apply within one element. |



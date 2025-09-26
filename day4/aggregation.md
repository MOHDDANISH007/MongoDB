
<img width="1163" height="738" alt="image" src="https://github.com/user-attachments/assets/cec2746f-b827-469e-a00a-44f956080b1b" />






<img width="620" height="391" alt="image" src="https://github.com/user-attachments/assets/28bf2a72-35ff-46bf-b0d0-08e9e3a89b70" />







<img width="1229" height="799" alt="image" src="https://github.com/user-attachments/assets/30b3be52-1c6c-439a-ab85-e6844da1faeb" />









<img width="245" height="170" alt="image" src="https://github.com/user-attachments/assets/fc37fbfa-7a8a-47fb-b052-4024cce65907" />                    
                      
  





<img width="1180" height="629" alt="image" src="https://github.com/user-attachments/assets/9f612a4e-291e-4e07-9b49-7e10fe744f9a" />                    
                      
                      
                      
  





----------------------------------------------------------------------------------------OR----------------------------------------------------------------------------------                    
  



### MongoDB Aggregation Overview
- **Aggregation** in MongoDB is a way to process data records and return computed results.
- It involves a **pipeline** of operations where the output of one stage is the input to the next.
- Common operations include filtering, grouping, and transforming data.

### Key Concepts
1. **Pipeline**: A sequence of stages where each stage transforms the data.
2. **Stages**: Each stage in the pipeline performs a specific operation on the data.
3. **Operators**: MongoDB provides various operators like `$match`, `$group`, `$sort`, `$project`, etc.

### Common Aggregation Stages
- **$match**: Filters documents to pass only those that match the specified condition.
- **$group**: Groups documents by a specified field and can perform operations like sum, average, etc.
- **$sort**: Sorts the documents based on a specified field.
- **$project**: Reshapes each document in the stream, such as by adding or removing fields.

### Coding Examples

#### Example 1: Basic Aggregation with $match and $group
```javascript
db.collection.aggregate([
  { $match: { gender: "male" } }, // Filters documents where gender is male
  { $group: { _id: "$age", count: { $sum: 1 } } } // Groups by age and counts documents
])
```

#### Example 2: Using $sort
```javascript
db.collection.aggregate([[]
  { $match: { gender: "male" } },
  { $group: { _id: "$age", count: { $sum: 1 } } },
  { $sort: { count: -1 } } // Sorts the groups by count in descending order
])
```

#### Example 3: Calculating Average
```javascript
db.collection.aggregate([
  { $group: { _id: null, averageAge: { $avg: "$age" } } } // Calculates average age
])  
```

#### Example 4: Using $unwind and $push
```javascript
db.collection.aggregate([
  { $unwind: "$hobbies" }, // Deconstructs the array field hobbies
  { $group: { _id: "$age", hobbies: { $push: "$hobbies" } } } // Groups by age and collects hobbies
])
```

#### Example 5: Using $filter
```javascript
db.collection.aggregate([
  {
    $project: {
      scores: {
        $filter: {
          input: "$scores",
          as: "score",
          cond: { $gt: ["$$score", 20] } // Filters scores greater than 20
        }
      }
    }
  }
])
```

import express from 'express'
import User from '../model/user.model.js'

const router = express.Router()

// CRUD operations

// 1.post
router.post('/users', async (req, res) => {
  try {
    const { name, age, weight } = req.body
    const newUser = new User({ name, age, weight })
    await newUser.save()
    res.status(201).json({
      success: true,
      data: newUser
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
    console.log(`Error: ${err.message}`)
  }
})

// 2.get
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({
      age: { $gt: 20 }
    })
    res.status(200).json({
      success: true,
      data: users
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
    console.log(`Error: ${err.message}`)
  }
})

// 3.update
router.put('/update-users', async (req, res) => {
  try {
    const { name, age, weight } = req.body
    const users = await User.updateOne(
      {
        // equal to 20
        age: { $eq: 21 }
      },
      {
        $set: {
          name,
          age,
          weight
        }
      }
    )
    res.status(200).json({
      success: true,
      data: users
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
    console.log(`Error: ${err.message}`)
  }
})

// 4.delete
router.post('/delete-users', async (req, res) => {
  try {
    const { name } = req.body

    // Check if name is provided
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Name is required'
      })
    }

    const result = await User.deleteOne({ name })

    // Check if a user was actually deleted
    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
    console.log(`Error: ${err.message}`)
  }
})

// 4.delete with "findByIdAndDelete" method
router.post('/delete-user/:id', async (req, res) => {
  try {
    // Get the id from params
    const { id } = req.params

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Id is required'
      })
    }

    // Attempt to delete the user
    const result = await User.findByIdAndDelete(id)

    // Check if a user was actually deleted
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    })
  } catch (err) {
    console.error(`Error deleting user: ${err.message}`, err)
    res.status(500).json({
      success: false,
      message: 'Server error: ' + err.message
    })
  }
})

export default router

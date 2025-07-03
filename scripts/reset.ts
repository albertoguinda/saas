// scripts/reset.js
import dbConnect from '../lib/dbConnect.js'
import mongoose from 'mongoose'

;(async () => {
  await dbConnect()
  await mongoose.connection.db.dropDatabase()
  console.log('✅ Base de datos borrada')
  process.exit(0)
})().catch(err => {
  console.error(err)
  process.exit(1)
})

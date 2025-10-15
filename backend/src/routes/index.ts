import express from 'express'
import { getLanguages, getLanguageById } from '../controllers/languages'

const router = express.Router()

router.get('/languages', getLanguages)
router.get('/languages/:id', getLanguageById)

export default router

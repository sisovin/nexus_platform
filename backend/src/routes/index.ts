import express from 'express'
import { getLanguages, getLanguageById } from '../controllers/languages'
import { getUserBookmarks, addBookmark } from '../controllers/bookmarks'
import { authenticate } from '../middleware/auth'

const router = express.Router()

router.get('/languages', getLanguages)
router.get('/languages/:id', getLanguageById)

router.get('/user/bookmarks', authenticate, getUserBookmarks)
router.post('/user/bookmarks', authenticate, addBookmark)

export default router

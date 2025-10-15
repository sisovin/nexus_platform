import express from 'express'
import { getLanguages, getLanguageById } from '../controllers/languages'
import { getUserBookmarks, addBookmark } from '../controllers/bookmarks'
import { submitTestimonial, getTestimonials, updateTestimonial } from '../controllers/testimonials'
import { authenticate } from '../middleware/auth'

const router = express.Router()

router.get('/languages', getLanguages)
router.get('/languages/:id', getLanguageById)

router.get('/user/bookmarks', authenticate, getUserBookmarks)
router.post('/user/bookmarks', authenticate, addBookmark)

router.post('/testimonials', submitTestimonial)
router.get('/admin/testimonials', authenticate, getTestimonials)
router.put('/admin/testimonials/:id', authenticate, updateTestimonial)

export default router

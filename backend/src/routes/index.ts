import express, { Router } from 'express'
import { getLanguages, getLanguageById } from '../controllers/languages'
import { getUserBookmarks, addBookmark } from '../controllers/bookmarks'
import { submitTestimonial, getTestimonials, updateTestimonial } from '../controllers/testimonials'
import {
    getAllLanguages,
    getLanguageById as getAdminLanguageById,
    createLanguage,
    updateLanguage,
    deleteLanguage,
} from '../controllers/admin/languagesAdmin'
import {
    getAnalytics,
    getPageViewAnalytics,
    getLanguageViewAnalytics,
    getBookmarkAnalytics,
    getTestimonialAnalytics,
} from '../controllers/admin/analytics'
import { authenticate, requireAdmin } from '../middleware/auth'

const router: Router = express.Router()

router.get('/languages', getLanguages)
router.get('/languages/:id', getLanguageById)

router.get('/user/bookmarks', authenticate, getUserBookmarks)
router.post('/user/bookmarks', authenticate, addBookmark)

router.post('/testimonials', submitTestimonial)
router.get('/admin/testimonials', authenticate, getTestimonials)
router.put('/admin/testimonials/:id', authenticate, updateTestimonial)

router.get('/admin/languages', requireAdmin, getAllLanguages)
router.get('/admin/languages/:id', requireAdmin, getAdminLanguageById)
router.post('/admin/languages', requireAdmin, createLanguage)
router.put('/admin/languages/:id', requireAdmin, updateLanguage)
router.delete('/admin/languages/:id', requireAdmin, deleteLanguage)

router.get('/admin/analytics', requireAdmin, getAnalytics)
router.get('/admin/analytics/page-views', requireAdmin, getPageViewAnalytics)
router.get('/admin/analytics/language-views', requireAdmin, getLanguageViewAnalytics)
router.get('/admin/analytics/bookmarks', requireAdmin, getBookmarkAnalytics)
router.get('/admin/analytics/testimonials', requireAdmin, getTestimonialAnalytics)

export default router

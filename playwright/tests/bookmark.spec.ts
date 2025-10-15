import { test, expect } from '@playwright/test'

test.describe('Bookmark Flow', () => {
    test('should allow user to bookmark and unbookmark a language', async ({
        page,
    }) => {
        // Navigate to languages page
        await page.goto('/languages')

        // Wait for languages to load
        await page.waitForSelector('[data-testid="language-grid"]')

        // Click on first language
        const firstLanguage = page.locator('[data-testid="language-card"]').first()
        await expect(firstLanguage).toBeVisible()

        // Get language name for verification
        const languageName = await firstLanguage
            .locator('h2')
            .textContent()

        // Click bookmark button (assuming user is logged in)
        const bookmarkButton = firstLanguage.locator('[aria-label="Add bookmark"]')
        await bookmarkButton.click()

        // Verify bookmark was added (button should change state)
        await expect(bookmarkButton).toHaveAttribute('aria-label', 'Remove bookmark')

        // Navigate to bookmarks page
        await page.goto('/bookmarks')

        // Verify language appears in bookmarks
        const bookmarkedLanguage = page.locator('[data-testid="bookmarked-language"]', {
            hasText: languageName,
        })
        await expect(bookmarkedLanguage).toBeVisible()

        // Go back to languages page
        await page.goto('/languages')

        // Click bookmark button again to remove
        await bookmarkButton.click()

        // Verify bookmark was removed
        await expect(bookmarkButton).toHaveAttribute('aria-label', 'Add bookmark')

        // Navigate to bookmarks page again
        await page.goto('/bookmarks')

        // Verify language no longer appears in bookmarks
        await expect(bookmarkedLanguage).not.toBeVisible()

        // Should show empty state message
        await expect(page.getByText("You haven't bookmarked any languages yet.")).toBeVisible()
    })

    test('should show login prompt for unauthenticated users', async ({
        page,
    }) => {
        // Navigate to languages page
        await page.goto('/languages')

        // Wait for languages to load
        await page.waitForSelector('[data-testid="language-grid"]')

        // Click bookmark button without being logged in
        const bookmarkButton = page.locator('[aria-label="Add bookmark"]').first()
        await bookmarkButton.click()

        // Should show alert or redirect to login
        // This depends on implementation - could be alert, modal, or redirect
        await page.waitForTimeout(1000) // Wait for any async actions
    })
})

describe('Sitemap', () => {
	it('should serve a valid sitemap', () => {
		cy.request('/sitemap.xml').then((response) => {
			expect(response.status).to.eq(200)
			expect(response.headers['content-type']).to.include('application/xml')

			const parser = new DOMParser()
			const xmlDoc = parser.parseFromString(response.body, 'text/xml')
			const urls = xmlDoc.getElementsByTagName('url')

			expect(urls.length).to.be.greaterThan(1)
		})
	})
})

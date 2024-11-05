describe('Web App Manifest', () => {
	it('should have a link to the manifest file', () => {
		cy.visit('/', { failOnStatusCode: false })
		cy.get('link[rel="manifest"]').should('exist')
	})

	it('should serve a valid manifest file', () => {
		cy.request('/manifest.webmanifest').then((response) => {
			expect(response.status).to.eq(200)
			expect(response.headers['content-type']).to.include(
				'application/manifest+json',
			)

			const manifest = response.body
			expect(manifest.name).to.eq('Valencia Volunteering')
			expect(manifest.short_name).to.eq('ValenciaVolunteering')
			expect(manifest.lang).to.eq('en')
		})
	})
})

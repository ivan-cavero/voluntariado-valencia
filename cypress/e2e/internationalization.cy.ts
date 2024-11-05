describe('Internationalization', () => {
	it('should redirect to a valid locale when visiting /', () => {
		cy.visit('/', { failOnStatusCode: false })
		cy.url().should('match', /\/(en|es|ca)/)
	})

	it('should display content in English when visiting /en', () => {
		cy.visit('/en')
		cy.get('h1').should('contain', 'Welcome to Valencia Volunteering')
	})

	it('should display content in Spanish when visiting /es', () => {
		cy.visit('/es')
		cy.get('h1').should('contain', 'Bienvenido a Voluntariado Valencia')
	})

	it('should display content in Catalan when visiting /ca', () => {
		cy.visit('/ca')
		cy.get('h1').should('contain', 'Benvingut a Voluntariat València')
	})

	it('should have correct lang attribute on html element', () => {
		cy.visit('/en')
		cy.get('html').should('have.attr', 'lang', 'en')

		cy.visit('/es')
		cy.get('html').should('have.attr', 'lang', 'es')

		cy.visit('/ca')
		cy.get('html').should('have.attr', 'lang', 'ca')
	})
})

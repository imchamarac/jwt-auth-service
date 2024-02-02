describe('example to-do app', () => {
    it('Should display login form', () => {
        cy.visit('http://localhost:8080/login');

        cy.getByTestId('page-title').should('contain.text', 'Login');

        cy.getByTestId('login-button').should('be.visible');

        cy.getByTestId('login-form').within(() => {
            cy.get('[for="email"]')
                .should('be.visible')
                .should('contain.text', 'Email');
            cy.get('[name="email"]').should('be.visible');

            cy.get('[for="password"]')
                .should('be.visible')
                .should('contain.text', 'Password');
            cy.get('[name="password"]').should('be.visible');
        });
    });

    it('Should display error message on faild login attempts', () => {
        cy.visit('http://localhost:8080/login');

        cy.getByTestId('login-button')
            .as('submitButton')
            .should('be.visible')
            .click();

        cy.getByTestId('login-form').within(() => {
            cy.get('[name="email"]')
                .should('be.visible')
                .type('test@email.com', { delay: 50 });

            cy.get('[name="password"]')
                .should('be.visible')
                .type('123', { delay: 50 });

            cy.get('@submitButton').click();

            cy.getByTestId('login-error').should(
                'contain.text',
                'Incorrect email or password, please check again!'
            );
        });
    });

    it.only('Should login successfully', () => {
        cy.visit('http://localhost:8080/login');

        cy.getByTestId('login-button').as('submitButton');

        cy.getByTestId('login-form').within(() => {
            cy.get('[name="email"]')
                .should('be.visible')
                .type('chamara@gmail.com', { delay: 50 });

            cy.get('[name="password"]')
                .should('be.visible')
                .type('password', { delay: 50 });

            cy.get('@submitButton').click();
        });

        cy.getByTestId('welcome-message')
            .should('be.visible')
            .should('contain.text', 'Chamara');

        cy.getByTestId('account-button').should('be.visible').click();

        cy.getByTestId('page-title')
            .should('be.visible')
            .should('contain.text', 'Account');

        cy.getByTestId('home-button').should('be.visible').click();

        cy.getByTestId('logout-button').should('be.visible').click();
        cy.getByTestId('login-form').should('be.visible');
    });
});

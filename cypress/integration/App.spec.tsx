const getBriefs = () =>
    cy.request(`http://localhost:4001/briefs`)
        .its('body')

const addBrief = item =>
    cy.request('POST', `http://localhost:4001/briefs`, item)

const deleteBrief = item =>
    cy.request('DELETE', `http://localhost:4001/briefs/${item.id}`)

const deleteAllBriefs = () =>
    getBriefs()
        .each(deleteBrief)

const getProducts = () =>
    cy.request(`http://localhost:4001/products`)
        .its('body')

const addProduct = item =>
    cy.request('POST', `http://localhost:4001/products`, item)

const deleteProduct = item =>
    cy.request('DELETE', `http://localhost:4001/products/${item.id}`)

const deleteAllProducts = () =>
    getProducts()
        .each(deleteProduct)

const reset = () => {
    deleteAllProducts();
    deleteAllBriefs();
}

context('Brief creation tests', () => {

    beforeEach(() => {
        reset();
        addProduct({"label": "product 1"});
        cy.visit('http://localhost:4000');
    });

    it('test required fields', () => {
        cy.get("[type=submit]").click();
        cy.get('input[name=title]').should('have.attr', 'aria-invalid', 'true');
        cy.get('input[name=comment]').should('have.attr', 'aria-invalid', 'true');
    });

    it('test submit', () => {
        cy.get('[data-container=brief]').should('not.exist');
        cy.get('[data-container=empty-briefs-list]').should('be.visible');

        cy.get('input[name=title]').type('Brief title');
        cy.get('input[name=comment]').type('Brief comment');
        cy.get('#mui-component-select-product').click();
        cy.get('#menu-product ul li[data-value=1]').click();

        cy.get("[type=submit]").click();
        cy.get('[data-container=briefs-list]').find('[data-container=brief]').its('length').should('eq', 1);
        cy.get('[data-container=empty-briefs-list]').should('not.be.visible');

        cy.get('[data-container=brief]').find('[data-container=brief-title]').should("have.text", "Brief title");
        cy.get('[data-container=brief]').find('[data-container=brief-comment]').should("have.text", "Brief comment");
        cy.get('[data-container=brief]').find('[data-container=brief-product]').should("have.text", "product 1");
    });
});


context('Briefs list tests', () => {

    beforeEach(() => {
        reset();
        addProduct({"label": "product 1"});
        addProduct({"label": "product 2"});
        addBrief({"title": "Brief with product 1", "comment": "a comment", "productId": 1});
        addBrief({"title": "Brief with product 2", "comment": "a comment", "productId": 2});
        cy.visit('http://localhost:4000');
    });

    it('test briefs order', () => {
        cy.get('[data-container=briefs-list]').find('[data-container=brief]').its('length').should('eq', 2);

        cy.get('[data-container=briefs-list]').find('[data-container=brief]').eq(0).find('[data-container=brief-title]').should("have.text", "Brief with product 2");
        cy.get('[data-container=briefs-list]').find('[data-container=brief]').eq(0).find('[data-container=brief-comment]').should("have.text", "a comment");
        cy.get('[data-container=briefs-list]').find('[data-container=brief]').eq(0).find('[data-container=brief-product]').should("have.text", "product 2");

        cy.get('[data-container=briefs-list]').find('[data-container=brief]').eq(1).find('[data-container=brief-title]').should("have.text", "Brief with product 1");
        cy.get('[data-container=briefs-list]').find('[data-container=brief]').eq(1).find('[data-container=brief-comment]').should("have.text", "a comment");
        cy.get('[data-container=briefs-list]').find('[data-container=brief]').eq(1).find('[data-container=brief-product]').should("have.text", "product 1");
    });

    it('test briefs filtered', () => {
        cy.get('[data-container=briefs-list]').find('[data-container=brief]').its('length').should('eq', 2);
        cy.get('#mui-component-select-productId').click();
        cy.get('#menu-productId ul li[data-value=1]').click();
        cy.get('[data-container=briefs-list]').find('[data-container=brief]').its('length').should('eq', 1);

        cy.get('[data-container=brief]').find('[data-container=brief-title]').should("have.text", "Brief with product 1");
        cy.get('[data-container=brief]').find('[data-container=brief-comment]').should("have.text", "a comment");
        cy.get('[data-container=brief]').find('[data-container=brief-product]').should("have.text", "product 1");
    });
})

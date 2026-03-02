import home from '../../pages/home.page'

describe('Home', () => {

  it('loads correctly', () => {
    home.visit()
    home.header().should('be.visible')
  })

})

import home from '../../pages/home.page'

describe('Home', () => {

  it('carga correctamente', () => {
    home.visit()
    home.header().should('be.visible')
  })

})


let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server.js')
let should = chai.should()

chai.use(chaiHttp)

describe('Tests', function() {
  describe('/', () => {
    it('Server health check', (done) => {
      chai.request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200)
        done()
      })
    })
  })
})
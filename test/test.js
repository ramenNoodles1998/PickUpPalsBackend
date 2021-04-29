const { assert } = require('chai')
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server.js')
let should = chai.should()

chai.use(chaiHttp)

describe('Tests', function() {
  after(() => {
    setTimeout(() => {
      process.exit(1)
    }, 1500)
  })

  describe('/healthCheck', () => {
    it('Server health check', (done) => {
      chai.request(server)
      .get('/healthCheck')
      .end((err, res) => {
        assert.equal(res.text,'healthy server')
        res.should.have.status(200)
        done()
      })
    })
  })
})


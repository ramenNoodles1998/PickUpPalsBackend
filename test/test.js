let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server.js')
let should = chai.should()

chai.use(chaiHttp)

describe('Tests', function() {
  after(() => {
    setTimeout(() => {
      process.exit(0)
    }, 1500)
  })

  describe('/', () => {
    it('Server health check', (done) => {
      chai.request(server)
      .get('/')
      .end((err, res) => {
        console.log(res)
        res.should.have.status(200)
        done()
      })
    })
  })
})


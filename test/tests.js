
const should = chai.should();

describe('dailyJournal', function () {
  it('is an object', function () {
    (dailyJournal).should.be.a('object')
  })

  describe('#findJournalDate', function () {
    it('should be a function', function () {
      
      (dailyJournal.findJournalDate).should.be.a('function')
    })

    
    it('should return true when a date already exists on journal dates navbar', () => {
      let x = dailyJournal.findJournalDate();
      (x).should.equal(true);


    //   it('should add two numbers together', function () {
    //     expect(calculator.add(10,20)).to.equal(30)
    //   })
    // })

    // describe('#subtract', function () {
    //   it('should be a function', function () {
    //     expect(calculator.subtract).to.be.a('function')
    //   })

    //   it('should subtract one number from another number', function () {
    //     expect(calculator.subtract(10,20)).to.equal(-10)
    //   })
    // })
  })

  })

  
})

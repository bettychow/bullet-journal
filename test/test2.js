const should = chai.should();
const expect = chai.expect;

describe('monthlyHappy', function () {
  it('is an object', function () {
    (monthlyHappy).should.be.a('object')
  })

  describe('#updateMonthNav', function () {
    it('should be a function', function () {  
      (monthlyHappy.updateMonthNav).should.be.a('function')
     })

    it('should return an updated array of months if current month does not exist in the array passed as argument', () => {
      let currentMonth = nowDate.getMonth();
      const months    = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      let currentMonthInWord = months[currentMonth];

      let returnedArr = monthlyHappy.updateMonthNav(['January'], currentMonthInWord );
      expect(returnedArr.toString()).to.equal(`January,February`);
    })

  })

  describe('#isJournalMonth', function () {
    it('should be a function', function () {  
      (monthlyHappy.isJournalMonth).should.be.a('function')
     })

    it('should return true', () => {
      let currentMonth = nowDate.getMonth();
      const months    = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      let currentMonthInWord = months[currentMonth];

      expect(monthlyHappy.isJournalMonth(['January'], currentMonthInWord)).to.equal(false);
    })

  })
})
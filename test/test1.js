
const should = chai.should();
const expect = chai.expect;

describe('dailyJournal', function () {
  it('is an object', function () {
    (dailyJournal).should.be.a('object')
  })

  describe('#updateNavBar', function () {
    it('should be a function', function () {  
      (dailyJournal.updateNavBar).should.be.a('function')
    })

    it('should return an updated array of dates if date provided does not exist in the array passed as argument', () => {
      let date = (nowDate.getMonth()+1)+'/'+nowDate.getDate() + '/'+nowDate.getFullYear();
      let returnedArr = dailyJournal.updateNavBar(['2/14/2018', '2/15/2018'], date);
      expect(returnedArr.toString()).to.equal(`2/14/2018,2/15/2018,${date}`);
    })

  })
  
})



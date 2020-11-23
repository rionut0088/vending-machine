const Machine = require('../src/Machine')

describe('The vending machine', () => {
  it('is initialized with no items', () => {
    // SEAT
    // setup
    const vendingMachine = new Machine();

    // exercise & assert
    expect(vendingMachine.seeSelections()).toEqual([])

    // teardown, not needed
  })

  it('can stock one snack', () => {
    // setup
    const vendingMachine = new Machine();
    const snack = {
      name: 'macadamia nuts',
      price: 250
    }

    // exercise
    vendingMachine.stock([snack])

    // assert
    expect(vendingMachine.seeSelections()).toEqual([snack])


  })

  it('displays an error if no inventory comes with stocking', () => {
    // setup
    const vendingMachine = new Machine()
    const displayMessage = "please do not troll. you cannot stock nothing."

    // exercise & assert
    expect(() => vendingMachine.stock()).toThrow(displayMessage)
  })

  it("displays how much money the user has deposited in the vending machine", () => {
    const vendingMachine = new Machine()
    expect(vendingMachine.deposit(10)).toEqual('You have deposited $10.')
  })

  it("The vending machine only accepts 10,20,50,100 and 500 dollar bills", () => {
    const vendingMachine = new Machine()
    expect(() => vendingMachine.deposit(5)).toThrow("Please deposit valid bill")
  })

  it("The vending machine has to add denominations to display total amount deposited", () => {
    const vendingMachine = new Machine()
    expect(vendingMachine.deposit(10)).toEqual("You have deposited $10.")
    expect(vendingMachine.deposit(10)).toEqual("You have deposited $20.")
    expect(vendingMachine.deposit(10)).toEqual("You have deposited $30.")
  })

  it("It should return a message for unavailable items", () => {
    const vendingMachine = new Machine()
    const snack = {
      name: 'macadamia nuts',
      price: 250
    }

    // exercise
    vendingMachine.stock([snack])

    expect(vendingMachine.selectItem("candy bar")).toEqual('The item you selected is unavailable')
  
  })
  it ("It should return a message for insufficiant funds", () =>{
    
    const vendingMachine = new Machine()
    const snack = {
      name: 'macadamia nuts',
      price: 250
    }
    vendingMachine.stock([snack])
   
    expect(vendingMachine.selectItem("macadamia nuts")).toEqual(`Your deposit is insufficient. Please add $${snack.price} for this item.`)
  })
  it("It should return correct item and change", ()=>{
    const vendingMachine = new Machine()
    const snack = {
      name: 'macadamia nuts',
      price: 250
    }
    vendingMachine.deposit(500)
    vendingMachine.stock([snack])

    expect(vendingMachine.selectItem("macadamia nuts")).toEqual({item:snack.name, change:250})
  })
  it("It should return correct item and change", ()=>{
    const vendingMachine = new Machine()
    const snack = {
      name: 'macadamia nuts',
      price: 250
    }
    vendingMachine.deposit(500)
    

    expect(vendingMachine.cancel()).toEqual({change:[500]})
  })

})
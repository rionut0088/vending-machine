class Machine {
  constructor() {
    this.snacks = []
    this.balance = 0;
  }

  seeSelections() {
    return this.snacks
  }

  stock(inventory) {
    if (inventory == undefined) {
      throw Error("please do not troll. you cannot stock nothing.")
    }
    this.snacks = inventory
  }
  deposit(money) {
    let validBills = [10, 20, 50, 100, 500]
    if (validBills.indexOf(money) === -1) throw new Error("Please deposit valid bill")
    this.balance += money;

    return (`You have deposited $${this.balance}.`)
  }
  selectItem(item) {
    let itemIndex = this.snacks.map((el) => el.name).indexOf(item)
    if (itemIndex === -1) return ("The item you selected is unavailable")

    if (this.snacks[itemIndex].price > this.balance) return `Your deposit is insufficient. Please add $${this.snacks[itemIndex].price - this.balance} for this item.`
    else {
      let balance = this.balance
      this.balance = 0
      return { item: item, change: balance - this.snacks[itemIndex].price };
    }
  }

  cancel() {
    let balance = this.balance
    this.balance = 0
    return { change: [balance] }
  }
}

module.exports = Machine
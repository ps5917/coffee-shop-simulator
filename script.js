// Function to update the display with new messages
function updateDisplay(message) {
  const messagesDiv = document.getElementById('messages');
  if (messagesDiv) {
    messagesDiv.innerHTML += message + '<br>';
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  } else {
    console.error('Messages div not found');
  }
}

// Function to update the money and beans status
function updateStatus() {
  document.getElementById('money').textContent = coffeeShop.money;
  document.getElementById('beans').textContent = coffeeShop.beans;
}

// Main coffee shop object
var coffeeShop = {
  money: 200,
  beans: 40,
  // Amount of beans required for each drink
  drinkRequirements: {
    latte: 10,
    americano: 5,
    doubleShot: 15,
    frenchPress: 12
  },
  // Price charged for each drink
  drinkPrice: {
    latte: 8,
    americano: 5,
    doubleShot: 4,
    frenchPress: 9
  },
  // Cost of beans
  beanCost: {
    reviveBlend: 4,
  },
  
  // Method to buy beans
  buyBeans: function (beanPurchaseType, PurchaseQty){
    if(!this.beanCost.hasOwnProperty(beanPurchaseType)){
      updateDisplay("We don't use that type of bean");
    } else {
      if((this.beanCost[beanPurchaseType] * PurchaseQty) <= this.money) {
        this.money = this.money - (this.beanCost[beanPurchaseType] * PurchaseQty);
        this.beans += PurchaseQty;
        updateDisplay("More beans are 'a coming!");
        updateDisplay("Our account is down to $" + this.money + " left");
      } else {
        updateDisplay("Sorry, we don't have enough money for this purchase");
      }
    }
    updateStatus();
  },

  // Method to sell a drink
  sellDrink: function(drinkType){
    if(!this.drinkRequirements.hasOwnProperty(drinkType)){
      updateDisplay("Sorry, we don't make that drink");
    } else {
      if(this.beans >= this.drinkRequirements[drinkType]){
        this.money = this.money + this.drinkPrice[drinkType]; 
        updateDisplay("Cha-ching! That'll be $" + this.drinkPrice[drinkType] + " please");
        updateDisplay("We now have $" + this.money + " in total");
        this.makeDrink(drinkType);
      } else {
        updateDisplay("Sorry, we don't have enough beans to make that drink");
      }
    }
    updateStatus();
  },

  // Method to make a drink
  makeDrink: function(drinkType) {
    if(this.beans >= this.drinkRequirements[drinkType]){
      this.beans = this.beans - this.drinkRequirements[drinkType]; 
      updateDisplay(drinkType + " is ready");
      updateDisplay("We've got " + this.beans + " beans left");
    } else {
      updateDisplay("Scram kid, we're outta beans");
    }
    updateStatus();
  }
};

// Initialize display
updateStatus();
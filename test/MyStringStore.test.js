const MyStringStore = artifacts.require("./MyStringStore.sol");
const {
    expectEvent,  // Assertions for emitted events
} = require('@openzeppelin/test-helpers');


contract("MyStringStore", accounts => {
    let txObject;
    let myStringConInstance;

    before(async () => {
        myStringConInstance = await MyStringStore.new();
    })

    context('set', () => {
        it("should store the string 'Hey there!'", async () => {
            // Set myString to "Hey there!"
            txObject = await myStringConInstance.set("Hey there!", { from: accounts[0] });
            assert.equal(txObject.receipt.status, true, "Set string failed");
        });
        it('should verify the string is stored as expected', async () => {
            // Get myString from public variable getter
            const storedString = await myStringConInstance.myString.call();
            assert.equal(storedString, "Hey there!", "The string was not stored");
        })
        it('emits a SetString event on successful setting of string', async () => {
            expectEvent(txObject.receipt, 'SetString', {
                value: "Hey there!"
            })
        })
    })

    context('update', () => {
        it("should update string to 'I am here!'", async () => {
            // Set myString to "Hey there!"
            txObject = await myStringConInstance.update("I am here!", { from: accounts[0] });
            assert.equal(txObject.receipt.status, true, "Update string failed");
        });
        it('should verify the string is updated as expected', async () => {
            // Get myString from public variable getter
            const storedString = await myStringConInstance.myString.call();
            assert.equal(storedString, "I am here!", "The string was not updated");
        })
        it('emits a UpdateString event on succesful updation of string', async () => {
            expectEvent(txObject.receipt, 'UpdateString', {
                oldValue: "Hey there!",
                newValue: "I am here!"
            })
        })
    })

});

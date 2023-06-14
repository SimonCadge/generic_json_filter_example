import jmespath from 'jmespath';
import util from 'util';

const cart = {
    products: [
        {
            name: "Max Clean",
            category: "Toothbrush",
            brand: "Nike",
            color: "Red",
            price: 18.5,
            quantity: 15
        },
        {
            name: "Big comfort",
            category: "Swimming Trunks",
            brand: "Adidas",
            color: "Brown",
            price: 11,
            quantity: 2
        }
    ],
    address: {
        country: "America",
        state: "WA",
        number: 15,
        street: "Maple Avenue"
    },
    name: {
        firstName: "Bob",
        lastName: "Jones"
    }
}

const rules = [
    { //Rule by region
        orRules: [{path: "products[*].brand", values: ["Nike"]}],
        andRules: [{path: "name.firstName", values: ["Bob"]}],
    },
    {
        orRules: [
            {path: "products[*].color", values: ["Red", "Green"]},
            {path: "products[*].category", values: ["Swimming Trunks"]}
        ],
        andRules: [
            {path: "address.country", values: ["America"]},
            {path: "address.state", values: ["WA"]}
        ]
    },
    { //General rule
        orRules: [{path: "products[*].price", values: [18.5]}],
    },
    { //Non applicable rule
        orRules: [{path: "otherThings.name", values: [16]}]
    }
]

function applyRule(cart, rulePath, ruleValues) {
    let cartValues = jmespath.search(cart, rulePath);
    if (cartValues === null) {
        return false;
    } else if (Array.isArray(cartValues)) { //jmespath returned multiple possible values
        for (let value of cartValues) {
            if (ruleValues.includes(value)) {
                return true;
            }
        }
    } else { //jmespath returned a single value
        if (ruleValues.includes(cartValues)) {
            return true;
        }
    }
    return false;
}

function checkCart(cart, ruleset) {
    let orRulesApplies = false;
    let andRulesApplies = true;
    if (ruleset.orRules !== undefined) {
        for (let orRule of ruleset.orRules) {
            const ruleApplies = applyRule(cart, orRule.path, orRule.values);
            if (ruleApplies) {
                orRulesApplies = true;
                break;
            }
        }
    }
    if (ruleset.andRules !== undefined) {
        for (let andRule of ruleset.andRules) {
            const ruleApplies = applyRule(cart, andRule.path, andRule.values);
            if (!ruleApplies) {
                andRulesApplies = false;
                break;
            }
        }
    }
    if (orRulesApplies && andRulesApplies) {
        return true;
    }
    return false;
}

for (let ruleset of rules) {
    console.log("Ruleset to Check: ", util.inspect(ruleset, {depth: 3}));
    console.log("Is Filtered: ", checkCart(cart, ruleset), "\n");
}

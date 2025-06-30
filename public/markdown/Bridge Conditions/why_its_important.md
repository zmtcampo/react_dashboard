#### Percentage of Deficient Bridges by Ownership Type

chart:{
"type": "line",
"file": "Bridge_Conditions_1_fk.csv",
"xAxis": "year",
"yAxis": {
"type": "percentage"
},
"option": true,
"optionKey": "Value",
"optionLabel": "Select Condition Type",
"options": [
{"value": "Bridge", "label": "Bridge Condition"},
{"value": "Deck", "label": "Deck Condition"}
],
"ownershipType": {
"label": "Select Ownership",
"options": [
{"value": "All", "label": "All"},
{"value": "State", "label": "State"},
{"value": "Local", "label": "Local"},
{"value": "Other", "label": "Other"}
]
},
"lines": [
{"key": "northshore- All", "name": "Northshore All", "type": "All"},
{"key": "northshore- State", "name": "Northshore State", "type": "State"},
{"key": "northshore- Local", "name": "Northshore Local", "type": "Local"},
{"key": "northshore- Other", "name": "Northshore Other", "type": "Other"},
{"key": "waianae Counties- All", "name": "Waianae All", "type": "All"},
{"key": "waianae Counties- State", "name": "Waianae State", "type": "State"},
{"key": "waianae Counties- Local", "name": "Waianae Local", "type": "Local"},
{"key": "waianae Counties- Other", "name": "Waianae Other", "type": "Other"},
{"key": "centraloahu Suburbs- All", "name": "Centraloahu All", "type": "All"},
{"key": "centraloahu Suburbs- State", "name": "Centraloahu State", "type": "State"},
{"key": "centraloahu Suburbs- Local", "name": "Centraloahu Local", "type": "Local"},
{"key": "centraloahu Suburbs- Other", "name": "Centraloahu Other", "type": "Other"},
{"key": "ewa Suburbs- All", "name": "Ewa All", "type": "All"},
{"key": "ewa Suburbs- State", "name": "Ewa State", "type": "State"},
{"key": "ewa Suburbs- Local", "name": "Ewa Local", "type": "Local"},
{"key": "ewa Suburbs- Other", "name": "Ewa Other", "type": "Other"},
{"key": "puc- All", "name": "Puc All", "type": "All"},
{"key": "puc- State", "name": "Puc State", "type": "State"},
{"key": "puc- Local", "name": "Puc Local", "type": "Local"},
{"key": "puc- Other", "name": "Puc Other", "type": "Other"},
{"key": "easthonolulu- All", "name": "Easthonolulu All", "type": "All"},
{"key": "easthonolulu- State", "name": "Easthonolulu State", "type": "State"},
{"key": "easthonolulu- Local", "name": "Easthonolulu Local", "type": "Local"},
{"key": "easthonolulu- Other", "name": "Easthonolulu Other", "type": "Other"},
{"key": "koolauloa- All", "name": "Koolauloa All", "type": "All"},
{"key": "koolauloa- State", "name": "Koolauloa State", "type": "State"},
{"key": "koolauloa- Local", "name": "Koolauloa Local", "type": "Local"},
{"key": "koolauloa- Other", "name": "Koolauloa Other", "type": "Other"},
{"key": "koolaupoko- All", "name": "Koolaupoko All", "type": "All"},
{"key": "koolaupoko- State", "name": "Koolaupoko State", "type": "State"},
{"key": "koolaupoko- Local", "name": "Koolaupoko Local", "type": "Local"},
{"key": "koolaupoko- Other", "name": "Koolaupoko Other", "type": "Other"}
]
}

#### Deficient Bridges by Ownership Type

chart:{
"type": "bridgeStacked",
"file": "Bridge_Conditions_2_fk.csv",
"xAxis": "year",
"yAxis": {
"format": "number",
"label": "Square Feet (Thousands)",
"showValues": true,
"valueLabel": {
"position": "inside",
"fontSize": 12,
"fill": "#000000"
}
},
"options": [
{"value": "Bridge", "label": "Number of Bridges"},
{"value": "Deck", "label": "Bridge Deck Area"}
],
"bars": [
{"key": "MPO- All", "name": "All", "type": "All"},
{"key": "MPO- State", "name": "State", "type": "State"},
{"key": "MPO- Local", "name": "Local", "type": "Local"},
{"key": "MPO- Other", "name": "Other", "type": "Other"}
],
"defaultOption": "Bridge"
}

#### Bridges by Condition

chart:{
"type": "bridgeStacked1",
"file": "Bridge_Conditions_3_fk.csv",
"xAxis": "year",
"yAxis": {
"format": "number",
"label": "Square Feet (Thousands)",
"showValues": true,
"valueLabel": {
"position": "inside",
"fontSize": 12,
"fill": "#000000"
}
},
"options": [
{"value": "Deck", "label": "Bridge Deck Area"},
{"value": "Bridge", "label": "Number of Bridges"}
],
"bars": [
{"key": "MPO- All", "name": "All", "type": "All"},
{"key": "MPO- Poor", "name": "Poor", "type": "Poor"},
{"key": "MPO- Fair", "name": "Fair", "type": "Fair"},
{"key": "MPO- Good", "name": "Good", "type": "Good"}
],
"defaultOption": "Deck"
}

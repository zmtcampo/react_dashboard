#### Regional Job Distribution by County

chart:{
"type": "gdp1",
"file": "jobs_graph2.csv",
"xAxis": "year",
"yAxis": {
"label": "Percentage of Region",
"type": "number"
},
"locations": [
{"value": "northshore", "name": "North Shore"},
{"value": "waianae", "name": "Waianae"},
{"value": "centraloahu", "name": "Central Oahu"},
{"value": "ewa", "name": "Ewa"},
{"value": "puc", "name": "PUC"},
{"value": "easthonolulu", "name": "East Honolulu"},
{"value": "koolauloa", "name": "Koolauloa"},
{"value": "koolaupoko", "name": "Koolaupoko"}
]
}

#### Job Distribution by Industry

chart:{
"type": "jobgrowth",
"file": "jobs_graph3.csv",
"xAxis": "year",
"yAxis": {
"label": "Percentage of Total Jobs",
"type": "number"
},
"locations": [
{"value": "northshore_share", "name": "North Shore"},
{"value": "waianae_share", "name": "Waianae"},
{"value": "centraloahu_share", "name": "Central Oahu"},
{"value": "ewa_share", "name": "Ewa"},
{"value": "puc_share", "name": "PUC"},
{"value": "easthonolulu_share", "name": "East Honolulu"},
{"value": "koolauloa_share", "name": "Koolauloa"},
{"value": "koolaupoko_share", "name": "Koolaupoko"}
],
"timePeriods": {
"total": "Total",
"hmvmt": "Highway and Major Arterial",
"capita": "Per Capita"
},
"filters": {
"Value":
[
{ "value": "ag_for_fish_min", "label": "Agriculture, forestry, fishing, mining" },
{ "value": "art_ent_rec_acc_food", "label": "Arts, entertain., rec., food, accommodations" },
{ "value": "construction", "label": "Construction" },
{ "value": "ed_services", "label": "Educational services" },
{ "value": "fin_insur_real_est", "label": "Finance, insurance, real estate" },
{ "value": "health_social_assist", "label": "Health care and social assistance" },
{ "value": "information", "label": "Information" },
{ "value": "manufacturing", "label": "Manufacturing" },
{ "value": "other_services", "label": "Other services (except public admin)" },
{ "value": "prof_services", "label": "Professional services, scientific, tech services" },
{ "value": "gov", "label": "Public administration" },
{ "value": "retail_trade", "label": "Retail trade" },
{ "value": "transp_warehouse_util", "label": "Transportation, warehousing, utilities" },
{ "value": "wholesale_trade", "label": "Wholesale trade" }
]
},
"defaultOption": "total"
}

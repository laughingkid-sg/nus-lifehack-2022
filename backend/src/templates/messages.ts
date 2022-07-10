const welcomeMsg = (
    firstName: string,
) => `Hello ${firstName} 👋, nice to meet you! 😀
I am the <code>earncyclebot</code> where I will guide you on recycling in Singapore!

Here are somethings I can do
♻️ Remind you of upcoming doorstep collection for your recycables 
♻️ Help you identify if an item is recycable 
♻️ Help you schedule a collection

Learn more about each of the feature using the buttons below.
`

const postalUpdated = `Your postal code have been updated!`

const guidelines = `
You can use the blue bins or the allocated collection points for materials that are paper, plastic, glass or metal.

Before recycling these items, take note of the following: 

1. Items such as shampoo/detergent bottles, canned/bottled drinks, jam jars must be cleaned before recycling them.
2. Items such as cardboard or drink cartons should be flattened before recycling them.
3. Do not recycle single use disposables that are greasy or contains food

🛋️ For bulky items and renovation waste, please contact your respective Town Council for disposal.

🖥️ For electronic waste (e.g. laptops, batteries), please go to the allocated e-waste collection points. 
`

const checkRecyclable = `
🤔 Not sure if you can recycle something? No worries! 

📸 Send me a picture and I can tell you if that item can be recyclable!
`

export { welcomeMsg, postalUpdated, guidelines }

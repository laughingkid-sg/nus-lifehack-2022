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

const doorstepCollection  = `Have you seen flyers for doorstep collection for recyclables? 📝 

Well, we are improving it. From now on you will recieve reminders <b>1 week, 3 days and 1 day</b> before the collection 📅

To be subscribe to such messages, please set your postal 🏘️ by using the postal command (exmaple: /postal 123456) `

const guidelienes = `Use the blue bins or the allocated collection points for materials that are paper, plastic, glass or metal. ♻️

Before recycling these items, take note of the following ‼️

✅ Items such as shampoo/detergent bottles, canned/bottled drinks, jam jars must be cleaned before recycling them.
✅ Items such as cardboard or drink cartons should be flattened before recycling them.
✅ Do not recycle single use disposables that are greasy or contains food

🛋 For bulky items and renovation waste, please contact your respective Town Council for disposal.

🖥 For electronic waste (e.g. laptops, batteries), please go to the allocated e-waste collection points.

Checkout NEA website for more infomation using the buttons below ⬇️`

const canRecycle = `🤔 Not sure if you can recycle something? No worries! 

📸 Send me a picture and I can tell you if it is recyclable!`

const collection = `Use the 'Book a Collection' button to start out app which will allow you to submit a collection request.

Our team will be conducting door-to-door collection for your recycables. Let them know your collection Id to earn your points.`

export { welcomeMsg, postalUpdated, doorstepCollection, guidelienes, canRecycle, collection}
